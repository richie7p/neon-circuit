import type { CarDef, CarId, EffectiveStats, Paint, Upgrades } from "../types";
import { UPGRADE_MAX } from "./upgrades";

export const CARS: CarDef[] = [
  {
    id: "skylark",
    name: "雲雀 Mk.I",
    nameEn: "Skylark",
    tagline: "好開的入門街跑",
    blurb: "鵲從零件堆裡拼出來的第一台車。極速普通，但轉向聽話，適合把賽道記進骨頭裡。",
    price: 0,
    unlockStars: 0,
    topSpeed: 38,
    accel: 9.2,
    handling: 2.45,
    brake: 14,
    mass: 1120,
    grip: 0.9,
    defaultPaint: { body: "#2ee6d6", rim: "#d9dee8", metalness: 0.35 },
    style: "hatch",
    cls: "入門",
  },
  {
    id: "ember",
    name: "流火 Mk.II",
    nameEn: "Ember",
    tagline: "輕量改的第二台掀背",
    blurb: "把雲雀的殼削薄、引擎往前推。直線變快，後輪在雨裡會先說話。適合想換車又還沒存夠赤隼的人。",
    price: 8200,
    unlockStars: 1,
    topSpeed: 42,
    accel: 11.1,
    handling: 2.38,
    brake: 15.2,
    mass: 980,
    grip: 0.86,
    defaultPaint: { body: "#ff7a18", rim: "#1a1a1a", metalness: 0.4 },
    style: "hatch",
    cls: "進攻",
  },
  {
    id: "kestrel",
    name: "赤隼 S",
    nameEn: "Crimson Kestrel",
    tagline: "均衡的進攻型跑車",
    blurb: "城內改裝店的常客。加速乾脆，出彎有信心，是新人跨入正式賽的第一台武器。",
    price: 16500,
    unlockStars: 2,
    topSpeed: 46,
    accel: 12.4,
    handling: 2.25,
    brake: 16.5,
    mass: 1040,
    grip: 0.84,
    defaultPaint: { body: "#ff4d6a", rim: "#f5b942", metalness: 0.45 },
    style: "coupe",
    cls: "進攻",
  },
  {
    id: "heron",
    name: "青鷺 Touring",
    nameEn: "Azure Heron",
    tagline: "雨戰與長距離的穩",
    blurb: "旅行車底盤、寬胎、長軸距。極速不嚇人，但抓地與煞車在暴雨和山道最值錢。",
    price: 19800,
    unlockStars: 3,
    topSpeed: 43,
    accel: 10.4,
    handling: 2.18,
    brake: 18.8,
    mass: 1280,
    grip: 0.96,
    defaultPaint: { body: "#3d7dff", rim: "#e8eef8", metalness: 0.5 },
    style: "wagon",
    cls: "全能",
  },
  {
    id: "whale",
    name: "鐵鯨 GT",
    nameEn: "Iron Whale",
    tagline: "重、穩、剎得住",
    blurb: "老周留下的重量級GT。笨重但抓地驚人，碰撞後不容易甩尾，適合雨戰與山道。",
    price: 24800,
    unlockStars: 4,
    topSpeed: 44,
    accel: 10.1,
    handling: 2.05,
    brake: 20.5,
    mass: 1420,
    grip: 0.94,
    defaultPaint: { body: "#4a5a78", rim: "#c9a227", metalness: 0.55 },
    style: "muscle",
    cls: "重裝",
  },
  {
    id: "marten",
    name: "迅狸 Targa",
    nameEn: "Swift Marten",
    tagline: "最聽話的彎道刀",
    blurb: "敞篷骨架、極輕。直線會被超跑咬住，但髮夾彎裡它幾乎不推頭。手感最接近「車在聽你的」。",
    price: 28600,
    unlockStars: 5,
    topSpeed: 47,
    accel: 13.2,
    handling: 2.72,
    brake: 16.2,
    mass: 890,
    grip: 0.83,
    defaultPaint: { body: "#b6ff3a", rim: "#111318", metalness: 0.38 },
    style: "roadster",
    cls: "輕盈",
  },
  {
    id: "arc",
    name: "弧光 RS",
    nameEn: "Arc Light",
    tagline: "中堅 GT，什麼都能跑",
    blurb: "銀線外圍車隊的量產試作。極速、加速、抓地都沒短板，是夜鯊之前最安全的進階選擇。",
    price: 36500,
    unlockStars: 6,
    topSpeed: 51,
    accel: 13.8,
    handling: 2.35,
    brake: 17.6,
    mass: 990,
    grip: 0.85,
    defaultPaint: { body: "#7b5cff", rim: "#f4f1ff", metalness: 0.62 },
    style: "coupe",
    cls: "全能",
  },
  {
    id: "mako",
    name: "夜鯊 X",
    nameEn: "Night Mako",
    tagline: "直線怪物，尾部較滑",
    blurb: "地下零件商的試作。極速與加速都兇，但抓地偏少，彎前剎車晚一秒就會改寫排名。",
    price: 42000,
    unlockStars: 7,
    topSpeed: 55,
    accel: 14.6,
    handling: 1.85,
    brake: 15.5,
    mass: 960,
    grip: 0.76,
    defaultPaint: { body: "#1a1f2e", rim: "#2ee6d6", metalness: 0.7 },
    style: "supercar",
    cls: "超跑",
  },
  {
    id: "comet",
    name: "彗星 VX",
    nameEn: "Comet VX",
    tagline: "準廠隊的半成品",
    blurb: "從銀線流出的第二套底盤。幾乎摸到幻影的速度，但轉向還差一口氣。價錢比原型車人道。",
    price: 54000,
    unlockStars: 9,
    topSpeed: 57,
    accel: 15.5,
    handling: 2.4,
    brake: 18.2,
    mass: 930,
    grip: 0.86,
    defaultPaint: { body: "#ffd24a", rim: "#1a1f2e", metalness: 0.78 },
    style: "hyper",
    cls: "超跑",
  },
  {
    id: "phantom",
    name: "幻影 Zero",
    nameEn: "Phantom Zero",
    tagline: "銀線車隊的原型車",
    blurb: "白澤不承認這台曾流失到民間。全面頂尖的廠隊底盤，價錢也一樣不講道理。",
    price: 78000,
    unlockStars: 12,
    topSpeed: 58,
    accel: 16.2,
    handling: 2.62,
    brake: 19.5,
    mass: 910,
    grip: 0.9,
    defaultPaint: { body: "#eef1f6", rim: "#ff4d6a", metalness: 0.82 },
    style: "hyper",
    cls: "原型",
  },
];

export const CAR_MAP: Record<CarId, CarDef> = Object.fromEntries(
  CARS.map((c) => [c.id, c]),
) as Record<CarId, CarDef>;

export function emptyUpgrades(): Upgrades {
  return { engine: 0, trans: 0, tires: 0, brakes: 0, weight: 0 };
}

export function clonePaint(p: Paint): Paint {
  return { body: p.body, rim: p.rim, metalness: p.metalness };
}

export function effectiveStats(car: CarDef, up: Upgrades): EffectiveStats {
  const e = clampLv(up.engine);
  const t = clampLv(up.trans);
  const ti = clampLv(up.tires);
  const b = clampLv(up.brakes);
  const w = clampLv(up.weight);
  const topSpeed = car.topSpeed * (1 + 0.03 * e + 0.055 * t);
  const accel = car.accel * (1 + 0.08 * e + 0.03 * t + 0.04 * w);
  const handling = car.handling * (1 + 0.06 * ti + 0.04 * w);
  const brake = car.brake * (1 + 0.1 * b);
  const mass = car.mass * (1 - 0.055 * w);
  const grip = Math.min(0.98, car.grip * (1 + 0.05 * ti));
  const score = Math.round(
    (topSpeed / 62) * 28 +
      (accel / 18) * 22 +
      (handling / 3) * 20 +
      (brake / 26) * 10 +
      grip * 14 +
      (1 - mass / 1500) * 6,
  );
  return { topSpeed, accel, handling, brake, mass, grip, score };
}

function clampLv(n: number) {
  return Math.max(0, Math.min(UPGRADE_MAX, n | 0));
}
