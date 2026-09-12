export type UpgradeCat = "engine" | "trans" | "tires" | "brakes" | "weight";

export type Paint = {
  body: string;
  rim: string;
  metalness: number;
};

export type Upgrades = Record<UpgradeCat, number>;

export type CarId =
  | "skylark"
  | "ember"
  | "kestrel"
  | "heron"
  | "whale"
  | "marten"
  | "arc"
  | "mako"
  | "comet"
  | "phantom";

export type TrackId = "harbor" | "downtown" | "ridge";

export type TimeOfDay = "day" | "dusk" | "night" | "storm";

export type Weather = "clear" | "rain";

export type CarDef = {
  id: CarId;
  name: string;
  nameEn: string;
  tagline: string;
  blurb: string;
  price: number;
  unlockStars: number;
  topSpeed: number;
  accel: number;
  handling: number;
  brake: number;
  mass: number;
  grip: number;
  defaultPaint: Paint;
  style: CarStyle;
  cls: string;
};

export type CarStyle = "hatch" | "coupe" | "muscle" | "wagon" | "roadster" | "supercar" | "hyper";

export type EffectiveStats = {
  topSpeed: number;
  accel: number;
  handling: number;
  brake: number;
  mass: number;
  grip: number;
  score: number;
};

export type TrackPoint = { x: number; y: number; z: number };

export type TrackDef = {
  id: TrackId;
  name: string;
  nameEn: string;
  width: number;
  points: TrackPoint[];
  theme: "harbor" | "city" | "mountain";
};

export type LevelId =
  | "l1-harbor"
  | "l2-harbor-rev"
  | "l3-downtown"
  | "l4-downtown-rain"
  | "l5-ridge"
  | "l6-finale";

export type StarGoal = {
  id: string;
  label: string;
  hint: string;
};

export type LevelDef = {
  id: LevelId;
  index: number;
  name: string;
  subtitle: string;
  trackId: TrackId;
  reverse: boolean;
  laps: number;
  timeOfDay: TimeOfDay;
  weather: Weather;
  aiSkill: number;
  aiSpeed: number;
  featuredRival?: string;
  playerGrid: number;
  prize: number;
  star2Place: number;
  star3: StarGoal;
  targetLap?: number;
  maxCollisions?: number;
  unlock: UnlockRule;
  intro: string[];
  outroWin: string[];
  outroLose: string[];
};

export type UnlockRule = {
  prev?: LevelId;
  stars?: number;
  ownNonStarter?: boolean;
};

export type DriverDef = {
  id: string;
  name: string;
  title: string;
  color: string;
  carId: CarId;
  skill: number;
  aggression: number;
  mistakes: number;
  lineOffset: number;
};

export type SaveCar = {
  owned: boolean;
  upgrades: Upgrades;
  paint: Paint;
};

export type LevelSave = {
  unlocked: boolean;
  stars: [boolean, boolean, boolean];
  bestPlace: number | null;
  bestTime: number | null;
  bestLap: number | null;
  cleared: boolean;
};

export type SettingsSave = {
  master: number;
  sfx: number;
  muted: boolean;
  quality: "low" | "high";
  shadows: boolean;
};

export type SaveData = {
  version: number;
  money: number;
  selectedCar: CarId;
  cars: Record<CarId, SaveCar>;
  levels: Record<LevelId, LevelSave>;
  storyFlag: number;
  seenIntro: boolean;
  beatenFinale: boolean;
  claimedTokens: string[];
  settings: SettingsSave;
  totalStars: number;
};

export type RaceResult = {
  token: string;
  levelId: LevelId;
  place: number;
  totalTime: number;
  bestLap: number | null;
  collisions: number;
  resets: number;
  driftMeters: number;
  topSpeedKmh: number;
  finished: boolean;
  standings: Standing[];
  newStars: [boolean, boolean, boolean];
  alreadyStars: [boolean, boolean, boolean];
  payout: number;
  breakdown: { label: string; amount: number }[];
};

export type Standing = {
  name: string;
  isPlayer: boolean;
  place: number;
  finished: boolean;
  time: number | null;
  carColor: string;
};

export type HudSnap = {
  place: number;
  field: number;
  lap: number;
  laps: number;
  speedKmh: number;
  time: number;
  lapTime: number;
  bestLap: number | null;
  countdown: number | null;
  goFlash: number;
  wrongWay: boolean;
  finished: boolean;
  paused: boolean;
  minimap: MinimapDot[];
  trackLoop: { x: number; z: number }[];
  objectives: string[];
  hint: string | null;
  gapText: string | null;
  offTrack: boolean;
};

export type MinimapDot = {
  x: number;
  z: number;
  isPlayer: boolean;
  isRival: boolean;
};

export type InputState = {
  throttle: number;
  brake: number;
  steer: number;
  handbrake: boolean;
  reset: boolean;
  pause: boolean;
};
