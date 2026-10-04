import { TRACKS } from "./data/tracks";
import type { TrackDef, TrackId, TrackPoint } from "./types";

export type TrackSample = {
  x: number;
  y: number;
  z: number;
  tx: number;
  ty: number;
  tz: number;
  rx: number;
  rz: number;
  dist: number;
  kappa: number;
};

export type BuiltTrack = {
  id: TrackId;
  reverse: boolean;
  samples: TrackSample[];
  length: number;
  halfWidth: number;
  cpCount: number;
  cpDist: number[];
  theme: TrackDef["theme"];
  points: TrackPoint[];
};

function catmull(p0: number, p1: number, p2: number, p3: number, t: number) {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}

function lerpPts(pts: TrackPoint[], reverse: boolean): TrackPoint[] {
  const src = reverse ? [...pts].reverse() : pts;
  return src;
}

export function buildTrack(id: TrackId, reverse: boolean): BuiltTrack {
  const def = TRACKS[id];
  const pts = lerpPts(def.points, reverse);
  const n = pts.length;
  const raw: TrackPoint[] = [];
  const segs = 18;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    for (let s = 0; s < segs; s++) {
      const t = s / segs;
      raw.push({
        x: catmull(p0.x, p1.x, p2.x, p3.x, t),
        y: catmull(p0.y, p1.y, p2.y, p3.y, t),
        z: catmull(p0.z, p1.z, p2.z, p3.z, t),
      });
    }
  }
  const samples: TrackSample[] = [];
  let length = 0;
  const m = raw.length;
  for (let i = 0; i < m; i++) {
    const a = raw[i];
    const b = raw[(i + 1) % m];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const dz = b.z - a.z;
    const len = Math.hypot(dx, dy, dz) || 1;
    const tx = dx / len;
    const ty = dy / len;
    const tz = dz / len;
    const rx = tz;
    const rz = -tx;
    samples.push({ x: a.x, y: a.y, z: a.z, tx, ty, tz, rx, rz, dist: length, kappa: 0 });
    length += len;
  }
  for (let i = 0; i < m; i++) {
    const a = samples[(i - 2 + m) % m];
    const b = samples[(i + 2) % m];
    const dt = Math.hypot(b.tx - a.tx, b.tz - a.tz);
    const ds = Math.max(0.001, ((i + 2 < m ? samples[i + 2].dist : length + samples[(i + 2) % m].dist) - samples[(i - 2 + m) % m].dist + length) % length);
    samples[i].kappa = dt / Math.max(2, ds);
  }
  const cpCount = Math.max(8, Math.round(length / 78));
  const cpDist: number[] = [];
  for (let i = 0; i < cpCount; i++) cpDist.push((i * length) / cpCount);

  return {
    id,
    reverse,
    samples,
    length,
    halfWidth: def.width / 2,
    cpCount,
    cpDist,
    theme: def.theme,
    points: pts,
  };
}

export function sampleAt(track: BuiltTrack, dist: number): TrackSample {
  const len = track.length;
  const d = ((dist % len) + len) % len;
  const s = track.samples;
  let lo = 0;
  let hi = s.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (s[mid].dist <= d) lo = mid;
    else hi = mid - 1;
  }
  return s[lo];
}

export function nearestOnTrack(
  track: BuiltTrack,
  x: number,
  z: number,
  hint = 0,
): { idx: number; sample: TrackSample; lateral: number; along: number } {
  const s = track.samples;
  const n = s.length;
  let best = hint;
  let bestD = Infinity;
  const window = 40;
  for (let k = -8; k <= window; k++) {
    const i = ((hint + k) % n + n) % n;
    const dx = x - s[i].x;
    const dz = z - s[i].z;
    const d = dx * dx + dz * dz;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  if (bestD > 70 * 70) {
    for (let i = 0; i < n; i += 3) {
      const dx = x - s[i].x;
      const dz = z - s[i].z;
      const d = dx * dx + dz * dz;
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
  }
  const sm = s[best];
  const lx = x - sm.x;
  const lz = z - sm.z;
  const lateral = lx * sm.rx + lz * sm.rz;
  const along = lx * sm.tx + lz * sm.tz;
  return { idx: best, sample: sm, lateral, along };
}

export function wrapDist(d: number, length: number) {
  const l = length;
  return ((d % l) + l) % l;
}

export function distForward(from: number, to: number, length: number) {
  let d = to - from;
  if (d < 0) d += length;
  return d;
}

export function gateEnds(track: BuiltTrack, cp: number): { ax: number; az: number; bx: number; bz: number; tx: number; tz: number } {
  const sm = sampleAt(track, track.cpDist[cp]);
  const w = track.halfWidth * 1.35;
  return {
    ax: sm.x - sm.rx * w,
    az: sm.z - sm.rz * w,
    bx: sm.x + sm.rx * w,
    bz: sm.z + sm.rz * w,
    tx: sm.tx,
    tz: sm.tz,
  };
}

export function segIntersect(
  ax: number,
  az: number,
  bx: number,
  bz: number,
  cx: number,
  cz: number,
  dx: number,
  dz: number,
): boolean {
  const den = (bx - ax) * (dz - cz) - (bz - az) * (dx - cx);
  if (Math.abs(den) < 1e-8) return false;
  const ua = ((cx - ax) * (dz - cz) - (cz - az) * (dx - cx)) / den;
  const ub = ((cx - ax) * (bz - az) - (cz - az) * (bx - ax)) / den;
  return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}
