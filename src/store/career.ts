import { create } from "zustand";
import { CARS, CAR_MAP, clonePaint } from "@/game/data/cars";
import { LEVELS, LEVEL_MAP } from "@/game/data/levels";
import { upgradePrice, UPGRADE_MAX } from "@/game/data/upgrades";
import {
  applyResult,
  computePayout,
  unlockLabel,
  unlockLevels,
} from "@/game/raceLogic";
import { recountStars } from "@/game/save";
import {
  clearSave,
  defaultSave,
  hasSaveFile,
  loadSave,
  persistSave,
} from "@/game/save";
import type {
  CarId,
  LevelId,
  Paint,
  RaceResult,
  SaveData,
  SettingsSave,
  UpgradeCat,
} from "@/game/types";

export type Screen =
  | "boot"
  | "menu"
  | "intro"
  | "hub"
  | "levels"
  | "prerace"
  | "dialogue"
  | "garage"
  | "shop"
  | "tune"
  | "paint"
  | "settings"
  | "help"
  | "race"
  | "results";

export type Toast = { id: number; text: string } | null;

type CareerState = {
  save: SaveData;
  hydrated: boolean;
  hasFile: boolean;
  screen: Screen;
  prevScreen: Screen;
  selectedLevel: LevelId;
  shopCar: CarId;
  tuneCar: CarId;
  paintDraft: Paint;
  dialogue: { lines: string[]; after: Screen; title?: string } | null;
  confirm: { title: string; body: string; action: "new" | "wipe" } | null;
  raceResult: RaceResult | null;
  toast: Toast;
  lastError: string | null;
  raceNonce: number;
  hydrate: () => void;
  persist: () => void;
  go: (s: Screen) => void;
  newGame: () => void;
  continueGame: () => void;
  requestNewGame: () => void;
  requestWipe: () => void;
  confirmYes: () => void;
  confirmNo: () => void;
  openLevel: (id: LevelId) => void;
  startRace: () => void;
  finishRace: (partial: Omit<RaceResult, "payout" | "breakdown" | "alreadyStars">) => void;
  leaveRace: () => void;
  buyCar: (id: CarId) => boolean;
  selectCar: (id: CarId) => boolean;
  buyUpgrade: (id: CarId, cat: UpgradeCat) => boolean;
  applyPaint: (id: CarId, paint: Paint) => void;
  setSettings: (p: Partial<SettingsSave>) => void;
  setToast: (text: string) => void;
  levelLockText: (id: LevelId) => string;
};

let toastN = 1;

export const useCareer = create<CareerState>((set, get) => ({
  save: defaultSave(),
  hydrated: false,
  hasFile: false,
  screen: "boot",
  prevScreen: "boot",
  selectedLevel: "l1-harbor",
  shopCar: "kestrel",
  tuneCar: "skylark",
  paintDraft: clonePaint(CARS[0].defaultPaint),
  dialogue: null,
  confirm: null,
  raceResult: null,
  toast: null,
  lastError: null,
  raceNonce: 0,

  hydrate: () => {
    try {
      const file = hasSaveFile();
      const save = file ? loadSave() : defaultSave();
      unlockLevels(save);
      recountStars(save);
      set({ save, hydrated: true, hasFile: file, screen: "boot" });
    } catch {
      set({ save: defaultSave(), hydrated: true, hasFile: false, lastError: "存檔讀取失敗，已使用新進度。" });
    }
  },

  persist: () => {
    if (persistSave(get().save)) set({ hasFile: true });
  },

  go: (s) => set({ prevScreen: get().screen, screen: s }),

  requestNewGame: () => {
    if (get().hasFile) {
      set({
        confirm: {
          title: "開始新遊戲？",
          body: "這會覆蓋目前的生涯進度、金錢、車輛與星星。",
          action: "new",
        },
      });
    } else get().newGame();
  },

  requestWipe: () =>
    set({
      confirm: {
        title: "清除存檔？",
        body: "所有生涯進度都會消失，而且無法復原。",
        action: "wipe",
      },
    }),

  confirmYes: () => {
    const c = get().confirm;
    set({ confirm: null });
    if (c?.action === "new") get().newGame();
    if (c?.action === "wipe") {
      clearSave();
      set({ save: defaultSave(), hasFile: false, screen: "boot", raceResult: null });
      get().setToast("已清除存檔");
    }
  },

  confirmNo: () => set({ confirm: null }),

  newGame: () => {
    const save = defaultSave();
    const saved = persistSave(save);
    set({
      save,
      hasFile: saved || get().hasFile,
      screen: "intro",
      dialogue: { lines: [], after: "hub" },
      selectedLevel: "l1-harbor",
      raceResult: null,
    });
  },

  continueGame: () => {
    if (!get().hasFile) return;
    const save = loadSave();
    unlockLevels(save);
    set({ save, screen: "hub" });
  },

  openLevel: (id) => {
    const save = get().save;
    if (!save.levels[id].unlocked) {
      get().setToast(unlockLabel(LEVEL_MAP[id], save));
      return;
    }
    const level = LEVEL_MAP[id];
    set({
      selectedLevel: id,
      dialogue: { lines: level.intro, after: "prerace", title: level.name },
      screen: "dialogue",
    });
  },

  startRace: () => set({ screen: "race", raceResult: null, raceNonce: get().raceNonce + 1 }),

  finishRace: (partial) => {
    const { save } = get();
    if (save.claimedTokens.includes(partial.token)) {
      const existing = get().raceResult;
      set({ screen: "results", raceResult: existing ?? (partial as RaceResult) });
      return;
    }
    const already = save.levels[partial.levelId].stars;
    const payout = computePayout(
      LEVEL_MAP[partial.levelId],
      save,
      partial,
      partial.newStars,
      already,
    );
    const result: RaceResult = {
      ...partial,
      alreadyStars: already,
      payout: payout.total,
      breakdown: payout.breakdown,
    };
    const next = applyResult(save, result);
    const saved = persistSave(next);
    const level = LEVEL_MAP[partial.levelId];
    const lines = partial.finished
      ? partial.place === 1
        ? level.outroWin
        : level.outroLose
      : ["que:沒跑完就回來了？先把車停好。"];
    set({
      save: next,
      hasFile: saved || get().hasFile,
      raceResult: result,
      screen: "results",
      dialogue: { lines, after: "hub", title: "賽後" },
    });
  },

  leaveRace: () => set({ screen: "hub", raceResult: null }),

  buyCar: (id) => {
    const save = structuredClone(get().save);
    const def = CAR_MAP[id];
    if (save.cars[id].owned) {
      get().setToast("已擁有這台車");
      return false;
    }
    if (save.totalStars < def.unlockStars) {
      get().setToast(`需要 ${def.unlockStars} 顆星星才能購買`);
      return false;
    }
    if (save.money < def.price) {
      get().setToast("資金不足");
      return false;
    }
    save.money -= def.price;
    save.cars[id].owned = true;
    save.selectedCar = id;
    unlockLevels(save);
    const saved = persistSave(save);
    set({ save, hasFile: saved || get().hasFile, tuneCar: id });
    get().setToast(`已購入 ${def.name}`);
    return true;
  },

  selectCar: (id) => {
    const save = structuredClone(get().save);
    if (!save.cars[id].owned) return false;
    save.selectedCar = id;
    persistSave(save);
    set({ save, tuneCar: id, paintDraft: clonePaint(save.cars[id].paint) });
    return true;
  },

  buyUpgrade: (id, cat) => {
    const save = structuredClone(get().save);
    const car = save.cars[id];
    if (!car.owned) return false;
    const nextLv = car.upgrades[cat] + 1;
    if (nextLv > UPGRADE_MAX) {
      get().setToast("已達最高等級");
      return false;
    }
    const price = upgradePrice(cat, nextLv);
    if (save.money < price) {
      get().setToast("資金不足");
      return false;
    }
    save.money -= price;
    car.upgrades[cat] = nextLv;
    persistSave(save);
    set({ save });
    get().setToast(`升級完成（Lv.${nextLv}）`);
    return true;
  },

  applyPaint: (id, paint) => {
    const save = structuredClone(get().save);
    if (!save.cars[id].owned) return;
    save.cars[id].paint = { ...paint };
    const saved = persistSave(save);
    set({ save, paintDraft: { ...paint } });
    get().setToast(saved ? "外觀已保存" : "外觀已套用，尚未儲存");
  },

  setSettings: (p) => {
    const save = structuredClone(get().save);
    save.settings = { ...save.settings, ...p };
    persistSave(save);
    set({ save });
  },

  setToast: (text) => {
    const id = toastN++;
    set({ toast: { id, text } });
    setTimeout(() => {
      if (get().toast?.id === id) set({ toast: null });
    }, 2400);
  },

  levelLockText: (id) => unlockLabel(LEVEL_MAP[id], get().save),
}));

export function moneyText(n: number) {
  return `₡${Math.max(0, Math.round(n)).toLocaleString("zh-Hant")}`;
}

export { LEVELS, CARS };
