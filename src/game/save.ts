import { CARS, clonePaint, emptyUpgrades } from "./data/cars";
import { LEVELS } from "./data/levels";
import type { CarId, LevelId, SaveData, SettingsSave } from "./types";

export const SAVE_KEY = "neon-circuit-save-v1";
export const SAVE_VERSION = 1;

function defaultSettings(): SettingsSave {
  return { master: 0.8, sfx: 0.85, muted: false, quality: "high", shadows: false };
}

export function defaultSave(): SaveData {
  const cars = {} as SaveData["cars"];
  for (const c of CARS) {
    cars[c.id] = {
      owned: c.id === "skylark",
      upgrades: emptyUpgrades(),
      paint: clonePaint(c.defaultPaint),
    };
  }
  const levels = {} as SaveData["levels"];
  for (const l of LEVELS) {
    levels[l.id] = {
      unlocked: !l.unlock.prev && !l.unlock.stars && !l.unlock.ownNonStarter,
      stars: [false, false, false],
      bestPlace: null,
      bestTime: null,
      bestLap: null,
      cleared: false,
    };
  }
  levels["l1-harbor"].unlocked = true;
  return {
    version: SAVE_VERSION,
    money: 2200,
    selectedCar: "skylark",
    cars,
    levels,
    storyFlag: 0,
    seenIntro: false,
    beatenFinale: false,
    claimedTokens: [],
    settings: defaultSettings(),
    totalStars: 0,
  };
}

function isCarId(v: unknown): v is CarId {
  return CARS.some((c) => c.id === v);
}

function isLevelId(v: unknown): v is LevelId {
  return LEVELS.some((l) => l.id === v);
}

export function migrate(raw: unknown): SaveData {
  const base = defaultSave();
  if (!raw || typeof raw !== "object") return base;
  const s = raw as Partial<SaveData>;
  const out = base;
  if (typeof s.money === "number" && Number.isFinite(s.money)) {
    out.money = Math.max(0, Math.round(s.money));
  }
  if (isCarId(s.selectedCar) && out.cars[s.selectedCar].owned) {
    out.selectedCar = s.selectedCar;
  }
  if (s.cars && typeof s.cars === "object") {
    for (const c of CARS) {
      const src = (s.cars as SaveData["cars"])[c.id];
      if (!src) continue;
      out.cars[c.id].owned = c.id === "skylark" ? true : Boolean(src.owned);
      if (src.upgrades) {
        for (const k of ["engine", "trans", "tires", "brakes", "weight"] as const) {
          const n = src.upgrades[k];
          if (typeof n === "number") out.cars[c.id].upgrades[k] = Math.max(0, Math.min(4, n | 0));
        }
      }
      if (src.paint && typeof src.paint.body === "string") {
        out.cars[c.id].paint = {
          body: String(src.paint.body).slice(0, 16),
          rim: String(src.paint.rim ?? c.defaultPaint.rim).slice(0, 16),
          metalness: Math.max(0, Math.min(1, Number(src.paint.metalness) || 0.4)),
        };
      }
    }
  }
  if (s.levels && typeof s.levels === "object") {
    for (const l of LEVELS) {
      const src = (s.levels as SaveData["levels"])[l.id];
      if (!src) continue;
      out.levels[l.id].unlocked = Boolean(src.unlocked) || out.levels[l.id].unlocked;
      out.levels[l.id].stars = [
        Boolean(src.stars?.[0]),
        Boolean(src.stars?.[1]),
        Boolean(src.stars?.[2]),
      ];
      out.levels[l.id].bestPlace =
        typeof src.bestPlace === "number" ? src.bestPlace : null;
      out.levels[l.id].bestTime = typeof src.bestTime === "number" ? src.bestTime : null;
      out.levels[l.id].bestLap = typeof src.bestLap === "number" ? src.bestLap : null;
      out.levels[l.id].cleared = Boolean(src.cleared);
    }
  }
  out.storyFlag = typeof s.storyFlag === "number" ? s.storyFlag : 0;
  out.seenIntro = Boolean(s.seenIntro);
  out.beatenFinale = Boolean(s.beatenFinale);
  if (Array.isArray(s.claimedTokens)) {
    out.claimedTokens = s.claimedTokens.filter((t) => typeof t === "string").slice(-30);
  }
  if (s.settings && typeof s.settings === "object") {
    out.settings = {
      master: clamp01(s.settings.master, 0.8),
      sfx: clamp01(s.settings.sfx, 0.85),
      muted: Boolean(s.settings.muted),
      quality: s.settings.quality === "low" ? "low" : "high",
      shadows: Boolean(s.settings.shadows),
    };
  }
  out.totalStars = recountStars(out);
  if (isCarId(s.selectedCar) && out.cars[s.selectedCar]?.owned) {
    out.selectedCar = s.selectedCar;
  }
  void isLevelId;
  return out;
}

function clamp01(n: unknown, d: number) {
  return typeof n === "number" && Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : d;
}

export function recountStars(save: SaveData): number {
  let n = 0;
  for (const l of LEVELS) {
    const st = save.levels[l.id].stars;
    n += (st[0] ? 1 : 0) + (st[1] ? 1 : 0) + (st[2] ? 1 : 0);
  }
  save.totalStars = n;
  return n;
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSave();
    return migrate(JSON.parse(raw));
  } catch {
    try {
      const bak = localStorage.getItem(SAVE_KEY + ":bak");
      if (bak) return migrate(JSON.parse(bak));
    } catch {
      /* ignore */
    }
    return defaultSave();
  }
}

export function persistSave(save: SaveData): void {
  try {
    const prev = localStorage.getItem(SAVE_KEY);
    if (prev) localStorage.setItem(SAVE_KEY + ":bak", prev);
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch {
    /* private mode / quota */
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
    localStorage.removeItem(SAVE_KEY + ":bak");
  } catch {
    /* ignore */
  }
}

export function hasSaveFile(): boolean {
  try {
    return Boolean(localStorage.getItem(SAVE_KEY));
  } catch {
    return false;
  }
}
