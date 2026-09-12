import type { SimCar } from "./carSim";
import { resetCar, type CarInput } from "./carSim";
import { distForward, sampleAt, type BuiltTrack } from "./trackGeom";

export type AiBrain = {
  skill: number;
  aggression: number;
  mistakes: number;
  speedScale: number;
};

export function thinkAI(
  car: SimCar,
  track: BuiltTrack,
  others: SimCar[],
  brain: AiBrain,
  dt: number,
  raceTime: number,
): CarInput {
  if (car.stuckTime > 1.8) {
    resetCar(car, track, false);
    car.stuckTime = 0;
  }
  if (car.wrongWay > 1.6) {
    resetCar(car, track, false);
    car.wrongWay = 0;
  }

  const look = 14 + car.speed * 0.55;
  car.aiLook += dt;
  if (car.aiLook > 1.4) {
    car.aiLook = 0;
    const jitter = (hash(car.id + raceTime * 0.01) - 0.5) * 2.2;
    car.aiOffTarget = jitter * (0.4 + brain.aggression * 0.6);
  }
  car.aiOff += (car.aiOffTarget - car.aiOff) * Math.min(1, dt * 1.8);

  let block = 0;
  for (const o of others) {
    if (o.id === car.id || o.finished) continue;
    const dd = distForward(car.trackDist, o.trackDist, track.length);
    const lat = Math.hypot(o.x - car.x, o.z - car.z);
    if (dd > 2 && dd < 16 && lat < 6 && o.speed < car.speed * 0.92) {
      const side = Math.sign((o.x - car.x) * Math.cos(car.yaw) + (o.z - car.z) * -Math.sin(car.yaw) || 1);
      car.aiOffTarget = Math.max(-2.6, Math.min(2.6, car.aiOffTarget - side * (1.2 + brain.aggression)));
      if (dd < 7 && brain.aggression < 0.7) block = 0.35;
    }
  }

  const target = sampleAt(track, car.trackDist + look);
  const aimX = target.x + target.rx * car.aiOff;
  const aimZ = target.z + target.rz * car.aiOff;
  const desiredYaw = Math.atan2(-(aimX - car.x), -(aimZ - car.z));
  let err = wrapAngle(desiredYaw - car.yaw);

  let kappa = 0;
  for (let d = 8; d <= 38; d += 6) {
    const s = sampleAt(track, car.trackDist + d);
    if (s.kappa > kappa) kappa = s.kappa;
  }
  const corner = Math.min(1, kappa * 22);
  const cap = car.stats.topSpeed * brain.speedScale * (1 - corner * (0.42 - brain.skill * 0.12));
  let throttle = 1;
  let brake = 0;
  if (car.speed > cap) {
    throttle = 0.15;
    brake = Math.min(1, (car.speed - cap) * 0.18);
  }
  if (corner > 0.55 && car.speed > cap * 0.92) {
    brake = Math.max(brake, corner * 0.7);
    throttle = 0.05;
  }
  if (block) {
    throttle *= 1 - block;
    brake = Math.max(brake, block * 0.4);
  }
  if (hash(car.id * 17 + Math.floor(raceTime * 3)) < brain.mistakes * 0.02) {
    brake = Math.max(brake, 0.4);
    throttle *= 0.4;
  }

  const steer = Math.max(-1, Math.min(1, err * (1.6 + brain.skill)));
  const handbrake = corner > 0.72 && Math.abs(err) > 0.35 && car.speed > 16;

  return { throttle, brake, steer, handbrake };
}

function wrapAngle(a: number) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function hash(n: number) {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
}
