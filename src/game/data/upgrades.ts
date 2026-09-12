import type { UpgradeCat } from "../types";

export const UPGRADE_MAX = 4;

export const UPGRADE_CATS: {
  id: UpgradeCat;
  name: string;
  desc: string;
}[] = [
  { id: "engine", name: "引擎", desc: "提高加速，並小幅提升極速。" },
  { id: "trans", name: "變速箱", desc: "提高極速與加速效率。" },
  { id: "tires", name: "輪胎", desc: "提高抓地、轉向與彎道穩定。" },
  { id: "brakes", name: "煞車", desc: "縮短煞車距離，提高減速效率。" },
  { id: "weight", name: "減重", desc: "改善加速、轉向反應與操控。" },
];

export function upgradePrice(cat: UpgradeCat, nextLevel: number): number {
  const base: Record<UpgradeCat, number> = {
    engine: 900,
    trans: 850,
    tires: 800,
    brakes: 750,
    weight: 820,
  };
  const lv = Math.max(1, Math.min(UPGRADE_MAX, nextLevel));
  return Math.round(base[cat] * Math.pow(2, lv - 1));
}
