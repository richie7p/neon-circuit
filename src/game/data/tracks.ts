import type { TrackDef, TrackId, TrackPoint } from "../types";

function pts(list: [number, number, number?][]): TrackPoint[] {
  return list.map(([x, z, y]) => ({ x, y: y ?? 0, z }));
}

const HARBOR: TrackDef = {
  id: "harbor",
  name: "港灣迴環",
  nameEn: "Harbor Loop",
  width: 16,
  theme: "harbor",
  points: pts([
    [0, -118],
    [48, -122],
    [96, -108],
    [132, -72],
    [148, -22],
    [146, 32],
    [122, 78],
    [72, 108],
    [12, 118],
    [-52, 110],
    [-108, 78],
    [-138, 28],
    [-142, -28],
    [-118, -78],
    [-68, -110],
    [-22, -118],
  ]),
};

const DOWNTOWN: TrackDef = {
  id: "downtown",
  name: "城芯街道",
  nameEn: "Downtown Grid",
  width: 12.5,
  theme: "city",
  points: pts([
    [0, -96],
    [42, -98],
    [70, -88],
    [78, -58],
    [80, -12],
    [92, 8],
    [128, 12],
    [142, 28],
    [144, 68],
    [128, 92],
    [78, 102],
    [36, 96],
    [18, 72],
    [16, 36],
    [-18, 32],
    [-46, 58],
    [-92, 72],
    [-128, 52],
    [-140, 12],
    [-136, -36],
    [-108, -72],
    [-58, -94],
    [-18, -98],
  ]),
};

const RIDGE: TrackDef = {
  id: "ridge",
  name: "雲脊山道",
  nameEn: "Cloud Ridge",
  width: 11.2,
  theme: "mountain",
  points: pts([
    [0, -140, 0],
    [50, -148, 2],
    [110, -130, 6],
    [150, -82, 10],
    [158, -20, 14],
    [132, 36, 18],
    [78, 70, 22],
    [20, 86, 20],
    [-24, 64, 16],
    [-18, 18, 12],
    [-50, -8, 10],
    [-110, 8, 14],
    [-156, 48, 18],
    [-188, 20, 14],
    [-176, -40, 8],
    [-140, -96, 4],
    [-72, -132, 1],
    [-20, -140, 0],
  ]),
};

export const TRACKS: Record<TrackId, TrackDef> = {
  harbor: HARBOR,
  downtown: DOWNTOWN,
  ridge: RIDGE,
};
