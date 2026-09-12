import { CAR_MAP, effectiveStats } from "./data/cars";
import { LEVEL_MAP } from "./data/levels";
import type {
  LevelDef,
  LevelId,
  RaceResult,
  SaveData,
  Standing,
  StarGoal,
} from "./types";
import type { SimCar } from "./carSim";
import { progressKey } from "./carSim";
import type { BuiltTrack } from "./trackGeom";

export function sortField(cars: SimCar[], track: BuiltTrack, laps: number): SimCar[] {
  const arr = [...cars];
  arr.sort((a, b) => {
    if (a.finished && b.finished) return (a.finishTime ?? 0) - (b.finishTime ?? 0);
    if (a.finished !== b.finished) return a.finished ? -1 : 1;
    return progressKey(b, track, laps) - progressKey(a, track, laps);
  });
  arr.forEach((c, i) => {
    c.place = i + 1;
  });
  return arr;
}

export function starChecks(
  level: LevelDef,
  result: {
    finished: boolean;
    place: number;
    collisions: number;
    resets: number;
    bestLap: number | null;
  },
): [boolean, boolean, boolean] {
  const s1 = result.finished;
  const s2 = result.finished && result.place <= level.star2Place;
  const s3 = result.finished && evalStar3(level, result);
  return [s1, s2, s3];
}

export function evalStar3(
  level: LevelDef,
  result: { place: number; collisions: number; resets: number; bestLap: number | null },
): boolean {
  const id = level.star3.id;
  if (id === "no-reset") return result.resets === 0;
  if (id === "clean") return result.collisions <= (level.maxCollisions ?? 2);
  if (id === "lap") return result.bestLap != null && result.bestLap <= (level.targetLap ?? 999);
  if (id === "no-reset-top3") return result.resets === 0 && result.place <= 3;
  if (id === "win-clean") return result.place === 1 && result.collisions <= (level.maxCollisions ?? 3);
  return result.place === 1;
}

export function starReason(goal: StarGoal, got: boolean, result: RaceResult, level: LevelDef): string {
  if (got) return "已達成";
  if (!result.finished) return "未完賽";
  if (goal.id === "no-reset") return `使用了 ${result.resets} 次重置`;
  if (goal.id === "clean") return `碰撞 ${result.collisions} 次（需 ≤ ${level.maxCollisions ?? 2}）`;
  if (goal.id === "lap") {
    const t = result.bestLap;
    return t == null ? "沒有有效圈速" : `最佳圈 ${t.toFixed(2)}s（需 ≤ ${level.targetLap}s）`;
  }
  if (goal.id === "no-reset-top3") {
    if (result.resets > 0) return `使用了 ${result.resets} 次重置`;
    return `名次第 ${result.place}（需前三）`;
  }
  if (goal.id === "win-clean") {
    if (result.place !== 1) return `名次第 ${result.place}（需第一）`;
    return `碰撞 ${result.collisions} 次（需 ≤ ${level.maxCollisions ?? 3}）`;
  }
  return "未達成";
}

export function computePayout(
  level: LevelDef,
  save: SaveData,
  result: {
    finished: boolean;
    place: number;
    collisions: number;
    bestLap: number | null;
  },
  newStars: [boolean, boolean, boolean],
  already: [boolean, boolean, boolean],
): { total: number; breakdown: { label: string; amount: number }[] } {
  const breakdown: { label: string; amount: number }[] = [];
  if (!result.finished) return { total: 0, breakdown: [{ label: "未完賽", amount: 0 }] };
  const placeMul = [1, 1, 0.7, 0.48, 0.32, 0.22, 0.16, 0.12, 0.08][result.place] ?? 0.08;
  const base = Math.round(level.prize * placeMul);
  breakdown.push({ label: `第 ${result.place} 名獎金`, amount: base });
  const firstClear = !save.levels[level.id].cleared;
  if (firstClear) {
    const b = Math.round(level.prize * 0.45);
    breakdown.push({ label: "首次通關", amount: b });
  }
  let starBonus = 0;
  for (let i = 0; i < 3; i++) {
    if (newStars[i] && !already[i]) starBonus += 700 + i * 250;
  }
  if (starBonus) breakdown.push({ label: "新星星獎勵", amount: starBonus });
  if (result.collisions <= 1) {
    breakdown.push({ label: "乾淨駕駛", amount: 400 });
  }
  if (result.place === 1) breakdown.push({ label: "優勝加給", amount: Math.round(level.prize * 0.15) });
  const total = breakdown.reduce((a, b) => a + b.amount, 0);
  return { total, breakdown };
}

export function applyResult(save: SaveData, result: RaceResult): SaveData {
  if (save.claimedTokens.includes(result.token)) return save;
  const next: SaveData = structuredClone(save);
  next.claimedTokens = [...next.claimedTokens, result.token].slice(-30);
  next.money = Math.max(0, next.money + result.payout);
  const lv = next.levels[result.levelId];
  lv.stars = [
    lv.stars[0] || result.newStars[0],
    lv.stars[1] || result.newStars[1],
    lv.stars[2] || result.newStars[2],
  ];
  if (result.finished) {
    lv.cleared = true;
    if (lv.bestPlace == null || result.place < lv.bestPlace) lv.bestPlace = result.place;
    if (lv.bestTime == null || result.totalTime < lv.bestTime) lv.bestTime = result.totalTime;
    if (result.bestLap != null && (lv.bestLap == null || result.bestLap < lv.bestLap)) {
      lv.bestLap = result.bestLap;
    }
  }
  if (result.levelId === "l6-finale" && result.finished && result.place === 1) {
    next.beatenFinale = true;
    next.storyFlag = Math.max(next.storyFlag, 2);
  }
  next.totalStars = Object.values(next.levels).reduce(
    (n, l) => n + l.stars.filter(Boolean).length,
    0,
  );
  unlockLevels(next);
  return next;
}

export function unlockLevels(save: SaveData) {
  const ownOther = Object.entries(save.cars).some(([id, c]) => id !== "skylark" && c.owned);
  for (const level of Object.values(LEVEL_MAP)) {
    const u = level.unlock;
    let ok = true;
    if (u.prev && !save.levels[u.prev].cleared) ok = false;
    if (u.stars && save.totalStars < u.stars) ok = false;
    if (u.ownNonStarter && !ownOther) ok = false;
    if (!u.prev && !u.stars && !u.ownNonStarter) ok = true;
    if (level.id === "l1-harbor") ok = true;
    if (ok) save.levels[level.id].unlocked = true;
  }
  // Softlock guard: finishing previous always eventually unlocks next if stars
  // are the only blocker AND player has all currently available stars from
  // cleared races still short — they can replay. Additional escape:
  // Softlock guard: clearing the previous race always eventually unlocks the next
  // once the star floor from star-1 finishes is met. Extra cars are optional.
  if (save.levels["l5-ridge"].cleared) save.levels["l6-finale"].unlocked = true;

}

export function unlockLabel(level: LevelDef, save: SaveData): string {
  if (save.levels[level.id].unlocked) return "";
  const parts: string[] = [];
  const u = level.unlock;
  if (u.prev && !save.levels[u.prev].cleared) parts.push("完成上一關");
  if (u.stars && save.totalStars < u.stars) parts.push(`累積 ${u.stars} 顆星星（目前 ${save.totalStars}）`);
  if (u.ownNonStarter) {
    const ownOther = Object.entries(save.cars).some(([id, c]) => id !== "skylark" && c.owned);
    if (!ownOther) parts.push("擁有雲雀以外的車輛");
  }
  return parts.join("、") || "尚未解鎖";
}

export function standingsOf(cars: SimCar[]): Standing[] {
  return [...cars]
    .sort((a, b) => a.place - b.place)
    .map((c) => ({
      name: c.isPlayer ? "林昊" : c.name,
      isPlayer: c.isPlayer,
      place: c.place,
      finished: c.finished,
      time: c.finishTime,
      carColor: c.color,
    }));
}

export function playerStats(save: SaveData) {
  const def = CAR_MAP[save.selectedCar];
  const owned = save.cars[save.selectedCar];
  return effectiveStats(def, owned.upgrades);
}

export function canStartLevel(save: SaveData, id: LevelId) {
  return save.levels[id]?.unlocked === true;
}
