import { thinkAI, type AiBrain } from "./ai";
import { CAR_MAP, effectiveStats, emptyUpgrades } from "./data/cars";
import { DRIVERS, DRIVER_MAP } from "./data/drivers";
import { LEVEL_MAP } from "./data/levels";
import {
  collideCars,
  maybeFinish,
  resetCar,
  spawnCar,
  stepCar,
  type CarInput,
  type SimCar,
} from "./carSim";
import { sortField, starChecks, standingsOf } from "./raceLogic";
import { buildTrack, type BuiltTrack } from "./trackGeom";
import type { LevelId, Paint, SaveData, UpgradeCat, Upgrades } from "./types";

export const STEP = 1 / 60;

export type RaceConfig = {
  levelId: LevelId;
  save: SaveData;
};

export type RaceSession = {
  track: BuiltTrack;
  cars: SimCar[];
  brains: Map<number, AiBrain>;
  levelId: LevelId;
  laps: number;
  weatherGrip: number;
  time: number;
  countdown: number;
  goFlash: number;
  started: boolean;
  over: boolean;
  paused: boolean;
  token: string;
  playerId: number;
  field: number;
};

export function createSession(cfg: RaceConfig): RaceSession {
  const level = LEVEL_MAP[cfg.levelId];
  const track = buildTrack(level.trackId, level.reverse);
  const save = cfg.save;
  const field = 8;
  const cars: SimCar[] = [];
  const brains = new Map<number, AiBrain>();

  const pCar = CAR_MAP[save.selectedCar];
  const pPaint: Paint = save.cars[save.selectedCar].paint;
  const pUp: Upgrades = save.cars[save.selectedCar].upgrades;
  const player = spawnCar(track, level.playerGrid, field, {
    id: 0,
    name: "林昊",
    isPlayer: true,
    isRival: false,
    color: pPaint.body,
    rim: pPaint.rim,
    metalness: pPaint.metalness,
    style: pCar.style,
    stats: effectiveStats(pCar, pUp),
    aiLook: 0,
    aiOff: 0,
    aiOffTarget: 0,
  });
  cars.push(player);

  const used = new Set<string>([level.featuredRival ?? ""]);
  const pool = DRIVERS.filter((d) => d.id !== "bai" || level.featuredRival === "bai");
  const picks: typeof DRIVERS = [];
  if (level.featuredRival && DRIVER_MAP[level.featuredRival]) {
    picks.push(DRIVER_MAP[level.featuredRival]);
  }
  for (const d of pool) {
    if (picks.length >= 7) break;
    if (used.has(d.id) || picks.some((p) => p.id === d.id)) continue;
    picks.push(d);
  }
  while (picks.length < 7) picks.push(DRIVERS[picks.length % DRIVERS.length]);

  let slot = 0;
  for (let i = 0; i < 7; i++) {
    if (slot === level.playerGrid) slot++;
    const d = picks[i];
    const def = CAR_MAP[d.carId];
    const up = emptyUpgrades();
    const lv = Math.round(level.aiSkill * 3);
    (Object.keys(up) as UpgradeCat[]).forEach((k) => {
      up[k] = Math.max(0, Math.min(3, lv - (k === "tires" ? 0 : 1)));
    });
    const stats = effectiveStats(def, up);
    stats.topSpeed *= 0.9 + level.aiSpeed * 0.12;
    stats.accel *= 0.88 + level.aiSkill * 0.16;
    const car = spawnCar(track, slot, field, {
      id: i + 1,
      name: d.name,
      isPlayer: false,
      isRival: d.id === level.featuredRival,
      color: d.color,
      rim: "#d9dee8",
      metalness: 0.45,
      style: def.style,
      stats,
      aiLook: i * 0.2,
      aiOff: d.lineOffset,
      aiOffTarget: d.lineOffset,
    });
    cars.push(car);
    brains.set(car.id, {
      skill: Math.min(0.98, d.skill * 0.5 + level.aiSkill * 0.55),
      aggression: d.aggression,
      mistakes: Math.max(0.02, d.mistakes * (1.35 - level.aiSkill * 0.5)),
      speedScale: 0.72 + level.aiSpeed * 0.28,
    });
    slot++;
  }

  return {
    track,
    cars,
    brains,
    levelId: cfg.levelId,
    laps: level.laps,
    weatherGrip: level.weather === "rain" ? 0.82 : 1,
    time: 0,
    countdown: 3.2,
    goFlash: 0,
    started: false,
    over: false,
    paused: false,
    token: `${cfg.levelId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    playerId: 0,
    field,
  };
}

export function stepSession(session: RaceSession, playerInput: CarInput, dt: number) {
  if (session.paused || session.over) return;
  if (!session.started) {
    session.countdown -= dt;
    if (session.countdown <= 0) {
      session.started = true;
      session.countdown = 0;
      session.goFlash = 0.8;
    }
  } else {
    session.time += dt;
    session.goFlash = Math.max(0, session.goFlash - dt);
  }
  const frozen = !session.started;
  const player = session.cars.find((c) => c.isPlayer)!;
  for (const car of session.cars) {
    let input: CarInput;
    if (car.isPlayer) {
      input = frozen ? { throttle: 0, brake: 1, steer: 0, handbrake: false } : playerInput;
      if (playerInput.reset && !frozen) {
        resetCar(car, session.track, true);
      }
    } else {
      const brain = session.brains.get(car.id)!;
      input = frozen
        ? { throttle: 0, brake: 1, steer: 0, handbrake: false }
        : thinkAI(car, session.track, session.cars, brain, dt, session.time);
    }
    stepCar(car, session.track, input, dt, session.weatherGrip, frozen);
    if (!frozen) {
      car.currentLap += dt;
      if (car.laps === 0 && car.passedInLap === 0) car.lapStart = session.time;
    }
    maybeFinish(car, session.laps, session.time);
  }
  for (let i = 0; i < session.cars.length; i++) {
    for (let j = i + 1; j < session.cars.length; j++) {
      collideCars(session.cars[i], session.cars[j]);
    }
  }
  sortField(session.cars, session.track, session.laps);
  if (player.finished && !session.over) {
    const allDone = session.cars.every((c) => c.finished);
    const waited = session.time - (player.finishTime ?? 0) > 12;
    if (allDone || waited) session.over = true;
  }
}

export function forceFinish(session: RaceSession, playerPlace: number) {
  const player = session.cars.find((c) => c.isPlayer)!;
  session.started = true;
  session.countdown = 0;
  session.over = true;
  const t = Math.max(session.time, 20);
  session.time = t;
  player.finished = true;
  player.laps = session.laps;
  player.finishTime = t;
  player.place = Math.max(1, Math.min(8, playerPlace));
  const others = session.cars.filter((c) => !c.isPlayer);
  others.forEach((c, i) => {
    c.finished = true;
    c.laps = session.laps;
    const place = i + 1 >= player.place ? i + 2 : i + 1;
    c.place = place;
    c.finishTime = t + (place - player.place) * 1.7;
  });
  session.cars.sort((a, b) => a.place - b.place);
}

export function buildLiveResult(session: RaceSession) {
  const level = LEVEL_MAP[session.levelId];
  const player = session.cars.find((c) => c.isPlayer)!;
  const stars = starChecks(level, {
    finished: player.finished,
    place: player.place,
    collisions: player.collisions,
    resets: player.resets,
    bestLap: player.bestLap,
  });
  return {
    token: session.token,
    levelId: session.levelId,
    place: player.place,
    totalTime: player.finishTime ?? session.time,
    bestLap: player.bestLap,
    collisions: player.collisions,
    resets: player.resets,
    driftMeters: player.driftMeters,
    topSpeedKmh: player.topSpeed * 3.6,
    finished: player.finished,
    standings: standingsOf(session.cars),
    newStars: stars,
  };
}

export function runHeadlessRace(levelId: LevelId, save: SaveData, maxTime = 180) {
  const session = createSession({ levelId, save });
  session.countdown = 0;
  session.started = true;
  session.brains.set(0, { skill: 0.85, aggression: 0.35, mistakes: 0.04, speedScale: 0.92 });
  const dt = STEP;
  let guard = 0;
  const maxSteps = Math.ceil(maxTime / dt);
  while (guard++ < maxSteps && !session.cars.every((c) => c.finished)) {
    const player = session.cars.find((c) => c.isPlayer)!;
    const brain = session.brains.get(0)!;
    const input = thinkAI(player, session.track, session.cars, brain, dt, session.time);
    stepSession(session, input, dt);
    if (session.cars.every((c) => c.finished)) session.over = true;
  }
  session.over = true;
  return session;
}
