import type { EffectiveStats } from "./types";
import {
  distForward,
  gateEnds,
  nearestOnTrack,
  sampleAt,
  segIntersect,
  wrapDist,
  type BuiltTrack,
} from "./trackGeom";

export type SimCar = {
  id: number;
  name: string;
  isPlayer: boolean;
  isRival: boolean;
  color: string;
  rim: string;
  metalness: number;
  style: string;
  stats: EffectiveStats;
  x: number;
  y: number;
  z: number;
  yaw: number;
  vx: number;
  vz: number;
  speed: number;
  steer: number;
  throttle: number;
  sampleIdx: number;
  trackDist: number;
  laps: number;
  nextCp: number;
  passedInLap: number;
  finished: boolean;
  finishTime: number | null;
  lapStart: number;
  bestLap: number | null;
  currentLap: number;
  collisions: number;
  resets: number;
  driftMeters: number;
  topSpeed: number;
  stuckTime: number;
  offTrack: boolean;
  wrongWay: number;
  aiLook: number;
  aiOff: number;
  aiOffTarget: number;
  lastX: number;
  lastZ: number;
  place: number;
};

export type CarInput = {
  throttle: number;
  brake: number;
  steer: number;
  handbrake: boolean;
  reset?: boolean;
};

export function spawnCar(
  track: BuiltTrack,
  slot: number,
  field: number,
  partial: Omit<
    SimCar,
    | "x"
    | "y"
    | "z"
    | "yaw"
    | "vx"
    | "vz"
    | "speed"
    | "steer"
    | "throttle"
    | "sampleIdx"
    | "trackDist"
    | "laps"
    | "nextCp"
    | "passedInLap"
    | "finished"
    | "finishTime"
    | "lapStart"
    | "bestLap"
    | "currentLap"
    | "collisions"
    | "resets"
    | "driftMeters"
    | "topSpeed"
    | "stuckTime"
    | "offTrack"
    | "wrongWay"
    | "lastX"
    | "lastZ"
    | "place"
  >,
): SimCar {
  const row = Math.floor(slot / 2);
  const col = slot % 2 === 0 ? -1 : 1;
  const dist = wrapDist(track.length - 8 - row * 7.2, track.length);
  const sm = sampleAt(track, dist);
  const lat = col * 2.4;
  return {
    ...partial,
    x: sm.x + sm.rx * lat,
    y: sm.y,
    z: sm.z + sm.rz * lat,
    yaw: Math.atan2(-sm.tx, -sm.tz),
    vx: 0,
    vz: 0,
    speed: 0,
    steer: 0,
    throttle: 0,
    sampleIdx: nearestOnTrack(track, sm.x, sm.z).idx,
    trackDist: dist,
    laps: 0,
    nextCp: 1,
    passedInLap: 0,
    finished: false,
    finishTime: null,
    lapStart: 0,
    bestLap: null,
    currentLap: 0,
    collisions: 0,
    resets: 0,
    driftMeters: 0,
    topSpeed: 0,
    stuckTime: 0,
    offTrack: false,
    wrongWay: 0,
    lastX: sm.x,
    lastZ: sm.z,
    place: field - slot,
  };
}

export function resetCar(car: SimCar, track: BuiltTrack, keepPenalty = true) {
  const sm = sampleAt(track, car.trackDist);
  const lat = Math.max(-track.halfWidth * 0.35, Math.min(track.halfWidth * 0.35, 0));
  car.x = sm.x + sm.rx * lat;
  car.y = sm.y;
  car.z = sm.z + sm.rz * lat;
  car.yaw = Math.atan2(-sm.tx, -sm.tz);
  car.vx = 0;
  car.vz = 0;
  car.speed = 0;
  car.steer = 0;
  car.stuckTime = 0;
  car.wrongWay = 0;
  if (keepPenalty) car.resets += 1;
}

export function stepCar(
  car: SimCar,
  track: BuiltTrack,
  input: CarInput,
  dt: number,
  gripMul: number,
  frozen: boolean,
) {
  car.lastX = car.x;
  car.lastZ = car.z;
  if (frozen || car.finished) {
    car.vx *= 0.9;
    car.vz *= 0.9;
    return;
  }

  const st = car.stats;
  const fx = -Math.sin(car.yaw);
  const fz = -Math.cos(car.yaw);
  const rx = Math.cos(car.yaw);
  const rz = -Math.sin(car.yaw);
  let fwd = car.vx * fx + car.vz * fz;
  let lat = car.vx * rx + car.vz * rz;

  const throttle = Math.max(0, Math.min(1, input.throttle));
  const brake = Math.max(0, Math.min(1, input.brake));
  car.throttle = throttle;
  car.steer = Math.max(-1, Math.min(1, input.steer));

  if (brake > 0 && fwd > 0.6) {
    fwd -= st.brake * brake * dt;
  } else if (brake > 0 && fwd <= 0.6) {
    fwd -= st.accel * 0.42 * brake * dt;
    fwd = Math.max(fwd, -st.topSpeed * 0.28);
  }
  if (throttle > 0) {
    const headroom = 1 - Math.max(0, fwd) / (st.topSpeed * 1.12);
    fwd += st.accel * throttle * Math.max(0.15, headroom) * dt;
  }

  const rolling = 0.28 + (throttle < 0.05 && brake < 0.05 ? 0.7 : 0);
  fwd *= Math.max(0, 1 - rolling * dt);
  if (fwd > st.topSpeed) fwd = st.topSpeed + (fwd - st.topSpeed) * 0.4;

  const spd = Math.abs(fwd);
  const speedFactor =
    Math.min(1, spd / 6.2) * (0.58 + 0.42 * (1 - Math.min(1, spd / st.topSpeed)));
  const reverse = fwd >= 0 ? 1 : -1;
  const turn = st.handling * (input.handbrake ? 1.22 : 1) * Math.min(1.16, 1180 / st.mass);
  car.yaw += car.steer * turn * speedFactor * reverse * dt;

  let grip = st.grip * gripMul;
  if (input.handbrake) grip *= 0.32;
  if (car.offTrack) grip *= 0.42;
  const kill = 1 - Math.pow(1 - grip, dt * 58);
  lat *= 1 - kill;
  if (input.handbrake && spd > 8) {
    lat += car.steer * 4.5 * dt;
    car.driftMeters += spd * dt * 0.25;
  }

  const nfx = -Math.sin(car.yaw);
  const nfz = -Math.cos(car.yaw);
  const nrx = Math.cos(car.yaw);
  const nrz = -Math.sin(car.yaw);
  car.vx = nfx * fwd + nrx * lat;
  car.vz = nfz * fwd + nrz * lat;
  car.x += car.vx * dt;
  car.z += car.vz * dt;
  car.speed = Math.hypot(car.vx, car.vz);
  if (car.speed > car.topSpeed) car.topSpeed = car.speed;

  collideTrack(car, track, dt);
  updateProgress(car, track, dt);
}

function collideTrack(car: SimCar, track: BuiltTrack, dt: number) {
  const near = nearestOnTrack(track, car.x, car.z, car.sampleIdx);
  car.y = near.sample.y;
  const hw = track.halfWidth;
  const lat = near.lateral;
  car.offTrack = Math.abs(lat) > hw * 0.72;
  if (Math.abs(lat) > hw) {
    const sign = lat >= 0 ? 1 : -1;
    const pen = Math.abs(lat) - hw;
    car.x -= near.sample.rx * sign * pen;
    car.z -= near.sample.rz * sign * pen;
    const out = car.vx * near.sample.rx + car.vz * near.sample.rz;
    if (out * sign > 0) {
      car.vx -= out * near.sample.rx * 1.35;
      car.vz -= out * near.sample.rz * 1.35;
    }
    car.vx *= 0.72;
    car.vz *= 0.72;
    const impulse = Math.min(4, pen * 8 + Math.abs(out));
    car.yaw += -sign * 0.15 * impulse * (900 / car.stats.mass) * dt * 12;
    if (impulse > 1.2) car.collisions += 1;
  } else if (car.offTrack) {
    car.vx *= 1 - 1.6 * dt;
    car.vz *= 1 - 1.6 * dt;
  }
}

function updateProgress(car: SimCar, track: BuiltTrack, dt: number) {
  const near = nearestOnTrack(track, car.x, car.z, car.sampleIdx);
  const n = track.samples.length;
  let dIdx = near.idx - car.sampleIdx;
  if (dIdx > n / 2) dIdx -= n;
  if (dIdx < -n / 2) dIdx += n;
  if (dIdx > -8 && dIdx < 48 && Math.abs(near.lateral) < track.halfWidth * 1.7) {
    car.sampleIdx = near.idx;
    car.trackDist = wrapDist(near.sample.dist + near.along, track.length);
  }
  const fx = -Math.sin(car.yaw);
  const fz = -Math.cos(car.yaw);
  const tang = fx * near.sample.tx + fz * near.sample.tz;
  if (car.speed > 4 && tang < -0.25) car.wrongWay += dt;
  else car.wrongWay = Math.max(0, car.wrongWay - dt * 2);

  const gate = gateEnds(track, car.nextCp);
  if (segIntersect(car.lastX, car.lastZ, car.x, car.z, gate.ax, gate.az, gate.bx, gate.bz)) {
    const movingFwd = (car.x - car.lastX) * gate.tx + (car.z - car.lastZ) * gate.tz;
    if (movingFwd > 0) {
      const hit = car.nextCp;
      car.passedInLap += 1;
      if (hit === 0 && car.passedInLap >= track.cpCount) {
        const t = car.currentLap;
        if (t > 0.5) {
          if (car.bestLap == null || t < car.bestLap) car.bestLap = t;
        }
        car.laps += 1;
        car.passedInLap = 0;
        car.lapStart = 0;
        car.currentLap = 0;
      }
      car.nextCp = (car.nextCp + 1) % track.cpCount;
    }
  }

  if (car.speed < 1.2 && Math.abs(near.lateral) > track.halfWidth * 0.85) {
    car.stuckTime += dt;
  } else if (car.speed < 0.4) {
    car.stuckTime += dt * 0.5;
  } else {
    car.stuckTime = 0;
  }
}

export function collideCars(a: SimCar, b: SimCar) {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const d = Math.hypot(dx, dz);
  const min = 2.35;
  if (d < 0.001 || d >= min) return false;
  const nx = dx / d;
  const nz = dz / d;
  const overlap = min - d;
  const invA = 1 / a.stats.mass;
  const invB = 1 / b.stats.mass;
  const share = overlap / (invA + invB);
  a.x -= nx * share * invA;
  a.z -= nz * share * invA;
  b.x += nx * share * invB;
  b.z += nz * share * invB;
  const rel = (b.vx - a.vx) * nx + (b.vz - a.vz) * nz;
  if (rel < 0) {
    const e = 0.25;
    const j = (-(1 + e) * rel) / (invA + invB);
    a.vx -= j * nx * invA;
    a.vz -= j * nz * invA;
    b.vx += j * nx * invB;
    b.vz += j * nz * invB;
    if (Math.abs(j) > 180) {
      a.collisions += 1;
      b.collisions += 1;
    }
  }
  return true;
}

export function progressKey(car: SimCar, track: BuiltTrack, _totalLaps: number): number {
  if (car.finished && car.finishTime != null) {
    return 1e9 - car.finishTime;
  }
  const toNext = distForward(car.trackDist, track.cpDist[car.nextCp], track.length);
  const seg = track.length / track.cpCount;
  const frac = 1 - Math.min(1, toNext / seg);
  return car.laps * 10000 + car.passedInLap * 100 + frac * 10 + car.trackDist / track.length;
}

export function maybeFinish(car: SimCar, totalLaps: number, raceTime: number) {
  if (!car.finished && car.laps >= totalLaps) {
    car.finished = true;
    car.finishTime = raceTime;
    car.vx *= 0.4;
    car.vz *= 0.4;
  }
}
