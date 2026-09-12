import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import type { CarStyle, Paint } from "./types";

type Pt = [number, number];

type Spec = {
  width: number;
  cabinW: number;
  wheelR: number;
  wheelW: number;
  track: number;
  wheelZ: [number, number];
  lower: Pt[];
  cabin: Pt[];
  lights: "round" | "slim" | "quad" | "blade";
  spoiler: "none" | "lip" | "wing" | "swan";
  hoodScoop: boolean;
  splitter: boolean;
  diffuser: boolean;
  intakes: boolean;
  chrome: boolean;
  canopy: boolean;
};

const SPECS: Record<CarStyle, Spec> = {
  hatch: {
    width: 1.68,
    cabinW: 1.28,
    wheelR: 0.34,
    wheelW: 0.24,
    track: 0.86,
    wheelZ: [-0.98, 1.02],
    lower: [
      [-1.68, 0.1],
      [-1.68, 0.3],
      [-1.58, 0.46],
      [-1.28, 0.58],
      [-0.4, 0.62],
      [0.85, 0.64],
      [1.38, 0.58],
      [1.55, 0.4],
      [1.62, 0.24],
      [1.62, 0.1],
    ],
    cabin: [
      [-0.38, 0.62],
      [-0.18, 1.05],
      [0.42, 1.16],
      [0.92, 1.1],
      [1.22, 0.78],
      [1.28, 0.64],
    ],
    lights: "round",
    spoiler: "lip",
    hoodScoop: false,
    splitter: true,
    diffuser: false,
    intakes: false,
    chrome: false,
    canopy: false,
  },
  coupe: {
    width: 1.78,
    cabinW: 1.3,
    wheelR: 0.35,
    wheelW: 0.26,
    track: 0.92,
    wheelZ: [-1.12, 1.18],
    lower: [
      [-1.98, 0.1],
      [-1.98, 0.28],
      [-1.86, 0.44],
      [-1.5, 0.54],
      [-0.55, 0.58],
      [1.05, 0.6],
      [1.62, 0.54],
      [1.88, 0.36],
      [1.96, 0.22],
      [1.96, 0.1],
    ],
    cabin: [
      [-0.52, 0.58],
      [-0.28, 0.98],
      [0.35, 1.08],
      [1.05, 1.0],
      [1.42, 0.7],
      [1.48, 0.6],
    ],
    lights: "slim",
    spoiler: "lip",
    hoodScoop: false,
    splitter: true,
    diffuser: true,
    intakes: true,
    chrome: false,
    canopy: false,
  },
  muscle: {
    width: 1.92,
    cabinW: 1.42,
    wheelR: 0.37,
    wheelW: 0.28,
    track: 1.0,
    wheelZ: [-1.22, 1.28],
    lower: [
      [-2.12, 0.1],
      [-2.12, 0.32],
      [-2.0, 0.5],
      [-1.55, 0.62],
      [-0.4, 0.66],
      [1.15, 0.68],
      [1.78, 0.62],
      [2.02, 0.42],
      [2.12, 0.26],
      [2.12, 0.1],
    ],
    cabin: [
      [-0.35, 0.66],
      [-0.12, 1.12],
      [0.55, 1.22],
      [1.15, 1.16],
      [1.48, 0.82],
      [1.55, 0.68],
    ],
    lights: "quad",
    spoiler: "none",
    hoodScoop: true,
    splitter: false,
    diffuser: false,
    intakes: false,
    chrome: true,
    canopy: false,
  },
  supercar: {
    width: 1.9,
    cabinW: 1.18,
    wheelR: 0.36,
    wheelW: 0.3,
    track: 1.02,
    wheelZ: [-1.18, 1.28],
    lower: [
      [-2.05, 0.08],
      [-2.05, 0.22],
      [-1.92, 0.36],
      [-1.45, 0.44],
      [-0.5, 0.48],
      [1.15, 0.5],
      [1.72, 0.46],
      [1.98, 0.3],
      [2.08, 0.16],
      [2.08, 0.08],
    ],
    cabin: [
      [-0.55, 0.48],
      [-0.32, 0.86],
      [0.22, 0.94],
      [0.95, 0.88],
      [1.35, 0.58],
      [1.42, 0.5],
    ],
    lights: "blade",
    spoiler: "wing",
    hoodScoop: false,
    splitter: true,
    diffuser: true,
    intakes: true,
    chrome: false,
    canopy: true,
  },
  hyper: {
    width: 1.88,
    cabinW: 1.12,
    wheelR: 0.35,
    wheelW: 0.3,
    track: 1.04,
    wheelZ: [-1.22, 1.35],
    lower: [
      [-2.12, 0.07],
      [-2.12, 0.2],
      [-1.98, 0.32],
      [-1.4, 0.4],
      [-0.45, 0.42],
      [1.2, 0.44],
      [1.85, 0.4],
      [2.12, 0.24],
      [2.2, 0.14],
      [2.2, 0.07],
    ],
    cabin: [
      [-0.62, 0.42],
      [-0.38, 0.82],
      [0.15, 0.9],
      [0.88, 0.84],
      [1.38, 0.52],
      [1.48, 0.44],
    ],
    lights: "blade",
    spoiler: "swan",
    hoodScoop: false,
    splitter: true,
    diffuser: true,
    intakes: true,
    chrome: false,
    canopy: true,
  },
  wagon: {
    width: 1.82,
    cabinW: 1.4,
    wheelR: 0.36,
    wheelW: 0.26,
    track: 0.94,
    wheelZ: [-1.18, 1.32],
    lower: [
      [-2.08, 0.1],
      [-2.08, 0.3],
      [-1.95, 0.46],
      [-1.5, 0.58],
      [-0.4, 0.64],
      [1.2, 0.66],
      [1.85, 0.6],
      [2.08, 0.4],
      [2.16, 0.24],
      [2.16, 0.1],
    ],
    cabin: [
      [-0.48, 0.64],
      [-0.22, 1.14],
      [0.7, 1.24],
      [1.55, 1.2],
      [1.95, 0.82],
      [2.0, 0.66],
    ],
    lights: "slim",
    spoiler: "lip",
    hoodScoop: false,
    splitter: false,
    diffuser: false,
    intakes: false,
    chrome: true,
    canopy: false,
  },
  roadster: {
    width: 1.72,
    cabinW: 1.18,
    wheelR: 0.34,
    wheelW: 0.26,
    track: 0.9,
    wheelZ: [-1.05, 1.12],
    lower: [
      [-1.88, 0.09],
      [-1.88, 0.26],
      [-1.72, 0.4],
      [-1.28, 0.5],
      [-0.4, 0.52],
      [1.0, 0.54],
      [1.55, 0.48],
      [1.78, 0.32],
      [1.86, 0.2],
      [1.86, 0.09],
    ],
    cabin: [
      [-0.28, 0.52],
      [-0.08, 0.86],
      [0.22, 0.9],
      [0.55, 0.78],
      [0.72, 0.58],
      [0.78, 0.52],
    ],
    lights: "round",
    spoiler: "lip",
    hoodScoop: false,
    splitter: true,
    diffuser: true,
    intakes: false,
    chrome: false,
    canopy: false,
  },
};

export function createCarMesh(style: CarStyle, paint: Paint): THREE.Group {
  const spec = SPECS[style];
  const mats = makeMats(paint);
  const g = new THREE.Group();
  g.name = "car";

  const bodyGeos: THREE.BufferGeometry[] = [];
  const darkGeos: THREE.BufferGeometry[] = [];
  const chromeGeos: THREE.BufferGeometry[] = [];
  const glassGeos: THREE.BufferGeometry[] = [];
  const lightFGeos: THREE.BufferGeometry[] = [];
  const lightRGeos: THREE.BufferGeometry[] = [];

  const lower = extrudeProfile(spec.lower, spec.width, spec.wheelZ, spec.wheelR + 0.06, true);
  bodyGeos.push(lower);

  const cabin = extrudeProfile(spec.cabin, spec.cabinW, null, 0, false);
  bodyGeos.push(cabin);

  addWindows(spec, glassGeos);
  addLights(spec, lightFGeos, lightRGeos, darkGeos);
  addDetails(spec, bodyGeos, darkGeos, chromeGeos);

  const bodyMesh = new THREE.Mesh(mergeSafe(bodyGeos), mats.body);
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  const chassis = new THREE.Group();
  chassis.name = "chassis";
  chassis.add(bodyMesh);
  if (darkGeos.length) chassis.add(new THREE.Mesh(mergeSafe(darkGeos), mats.dark));
  if (chromeGeos.length) chassis.add(new THREE.Mesh(mergeSafe(chromeGeos), mats.chrome));
  if (glassGeos.length) chassis.add(new THREE.Mesh(mergeSafe(glassGeos), mats.glass));
  if (lightFGeos.length) chassis.add(new THREE.Mesh(mergeSafe(lightFGeos), mats.lightF));
  if (lightRGeos.length) chassis.add(new THREE.Mesh(mergeSafe(lightRGeos), mats.lightR));
  g.add(chassis);

  const wheels = new THREE.Group();
  wheels.name = "wheels";
  const [fz, rz] = spec.wheelZ;
  const positions: [number, number, number][] = [
    [-spec.track, spec.wheelR, fz],
    [spec.track, spec.wheelR, fz],
    [-spec.track, spec.wheelR, rz],
    [spec.track, spec.wheelR, rz],
  ];
  for (const [x, y, z] of positions) {
    const w = makeWheel(spec, mats);
    w.position.set(x, y, z);
    wheels.add(w);
  }
  g.add(wheels);

  g.userData.bodyMat = mats.body;
  g.userData.rimMat = mats.rim;
  g.userData.wheels = wheels;
  g.userData.chassis = chassis;
  g.userData.wheelRadius = spec.wheelR;
  g.userData.dims = { w: spec.width, h: spec.cabin[2]?.[1] ?? 1, l: spec.lower.at(-1)![0] - spec.lower[0][0] };
  g.rotation.order = "YXZ";
  return g;
}

export function applyPaint(group: THREE.Group, paint: Paint) {
  const body = group.userData.bodyMat as THREE.MeshPhysicalMaterial | undefined;
  const rim = group.userData.rimMat as THREE.MeshStandardMaterial | undefined;
  if (body) {
    body.color.set(paint.body);
    body.metalness = 0.12 + paint.metalness * 0.72;
    body.roughness = Math.max(0.08, 0.42 - paint.metalness * 0.28);
    body.clearcoat = 0.85;
    body.clearcoatRoughness = 0.06 + (1 - paint.metalness) * 0.08;
  }
  if (rim) rim.color.set(paint.rim);
}

export function spinWheels(group: THREE.Group, speed: number, steer: number, dt: number) {
  const wheels = group.userData.wheels as THREE.Group | undefined;
  const r = group.userData.wheelRadius as number;
  if (!wheels) return;
  const ang = (speed / Math.max(0.2, r)) * dt;
  wheels.children.forEach((w, i) => {
    const inner = w.getObjectByName("spin");
    if (inner) inner.rotation.x += ang;
    if (i < 2) w.rotation.y = steer * 0.45;
  });
}

export function createShowroomEnv(renderer: THREE.WebGLRenderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const s = new THREE.Scene();
  const hall = new THREE.Mesh(
    new THREE.BoxGeometry(28, 14, 28),
    new THREE.MeshBasicMaterial({ color: 0x6d8498, side: THREE.BackSide }),
  );
  s.add(hall);
  const glow = new THREE.Mesh(new THREE.SphereGeometry(1.8, 8, 8), new THREE.MeshBasicMaterial({ color: 0xf2f6ff }));
  glow.position.set(-4, 6, 5);
  s.add(glow);
  const glow2 = glow.clone();
  glow2.position.set(6, 5, -3);
  glow2.material = new THREE.MeshBasicMaterial({ color: 0x7ad7d0 });
  s.add(glow2);
  const tex = pmrem.fromScene(s, 0.04).texture;
  pmrem.dispose();
  return tex;
}

function makeMats(paint: Paint) {
  const body = new THREE.MeshPhysicalMaterial({
    color: paint.body,
    metalness: 0.12 + paint.metalness * 0.72,
    roughness: Math.max(0.08, 0.42 - paint.metalness * 0.28),
    clearcoat: 0.85,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.1,
  });
  const dark = new THREE.MeshStandardMaterial({ color: 0x12151c, metalness: 0.55, roughness: 0.38 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xc9d2de, metalness: 0.95, roughness: 0.18 });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x7eb8cc,
    metalness: 0.15,
    roughness: 0.06,
    transparent: true,
    opacity: 0.42,
    envMapIntensity: 1.6,
  });
  const rim = new THREE.MeshStandardMaterial({ color: paint.rim, metalness: 0.88, roughness: 0.22 });
  const tire = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.92, metalness: 0.05 });
  const disc = new THREE.MeshStandardMaterial({ color: 0x8a9098, metalness: 0.7, roughness: 0.35 });
  const lightF = new THREE.MeshStandardMaterial({
    color: 0xfff4d2,
    emissive: 0xffe09a,
    emissiveIntensity: 1.4,
  });
  const lightR = new THREE.MeshStandardMaterial({
    color: 0xff3355,
    emissive: 0xff2244,
    emissiveIntensity: 1.1,
  });
  return { body, dark, chrome, glass, rim, tire, disc, lightF, lightR };
}

function extrudeProfile(
  pts: Pt[],
  width: number,
  arches: [number, number] | null,
  archR: number,
  bevel: boolean,
) {
  const shape = new THREE.Shape();
  shape.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
  shape.closePath();
  if (arches) {
    for (const z of arches) {
      const hole = new THREE.Path();
      hole.absarc(z, 0.34, archR, 0, Math.PI * 2, true);
      shape.holes.push(hole);
    }
  }
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: width,
    bevelEnabled: bevel,
    bevelThickness: bevel ? 0.04 : 0,
    bevelSize: bevel ? 0.035 : 0,
    bevelSegments: bevel ? 2 : 0,
    curveSegments: 8,
  });
  geo.rotateY(-Math.PI / 2);
  geo.translate(width / 2, 0, 0);
  geo.computeVertexNormals();
  return geo;
}

function addWindows(spec: Spec, glass: THREE.BufferGeometry[]) {
  const c = spec.cabin;
  if (c.length < 5) return;
  const w = spec.cabinW * 0.58;
  glass.push(slopePanel(c[0], c[1], w, 0.03));
  glass.push(slopePanel(c[3], c[4], w * 0.92, 0.03));
  const midZ = (c[1][0] + c[3][0]) / 2;
  const midY = (c[1][1] + c[2][1]) * 0.48;
  const sideL = Math.abs(c[3][0] - c[1][0]) * 0.58;
  const sideH = Math.max(0.16, (c[2][1] - c[0][1]) * 0.42);
  const side = new THREE.BoxGeometry(0.03, sideH, sideL);
  const x = spec.cabinW * 0.5 - 0.02;
  glass.push(bake(side, [x, midY, midZ]));
  glass.push(bake(side.clone(), [-x, midY, midZ]));
}

function addLights(
  spec: Spec,
  front: THREE.BufferGeometry[],
  rear: THREE.BufferGeometry[],
  dark: THREE.BufferGeometry[],
) {
  const nose = spec.lower[0][0];
  const tail = spec.lower[spec.lower.length - 1][0];
  const yL = spec.lower[2][1] * 0.78;
  const x = spec.width * 0.32;
  if (spec.lights === "round") {
    const lens = new THREE.SphereGeometry(0.11, 10, 8);
    front.push(bake(lens, [-x, yL, nose - 0.02]));
    front.push(bake(lens.clone(), [x, yL, nose - 0.02]));
    const ring = new THREE.TorusGeometry(0.12, 0.02, 6, 10);
    dark.push(bake(ring, [-x, yL, nose - 0.01], [Math.PI / 2, 0, 0]));
    dark.push(bake(ring.clone(), [x, yL, nose - 0.01], [Math.PI / 2, 0, 0]));
  } else if (spec.lights === "slim") {
    const bar = new THREE.BoxGeometry(0.38, 0.08, 0.08);
    front.push(bake(bar, [-x, yL, nose - 0.02]));
    front.push(bake(bar.clone(), [x, yL, nose - 0.02]));
    dark.push(bake(new THREE.BoxGeometry(0.42, 0.12, 0.06), [-x, yL, nose + 0.02]));
    dark.push(bake(new THREE.BoxGeometry(0.42, 0.12, 0.06), [x, yL, nose + 0.02]));
  } else if (spec.lights === "quad") {
    const d = new THREE.CylinderGeometry(0.07, 0.07, 0.08, 10);
    d.rotateX(Math.PI / 2);
    for (const sx of [-1, 1]) {
      front.push(bake(d.clone(), [sx * x, yL + 0.06, nose - 0.02]));
      front.push(bake(d.clone(), [sx * x, yL - 0.08, nose - 0.02]));
    }
  } else {
    const blade = new THREE.BoxGeometry(spec.width * 0.42, 0.045, 0.06);
    front.push(bake(blade, [0, yL, nose - 0.03]));
    dark.push(bake(new THREE.BoxGeometry(spec.width * 0.46, 0.07, 0.05), [0, yL, nose + 0.01]));
  }

  const ty = spec.lower[spec.lower.length - 4][1] * 0.7;
  if (spec.lights === "blade" || spec.lights === "slim") {
    rear.push(bake(new THREE.BoxGeometry(spec.width * 0.72, 0.06, 0.06), [0, ty, tail + 0.02]));
  } else {
    const unit = new THREE.BoxGeometry(0.28, 0.1, 0.07);
    rear.push(bake(unit, [-x, ty, tail + 0.02]));
    rear.push(bake(unit.clone(), [x, ty, tail + 0.02]));
  }
}

function addDetails(
  spec: Spec,
  body: THREE.BufferGeometry[],
  dark: THREE.BufferGeometry[],
  chrome: THREE.BufferGeometry[],
) {
  const nose = spec.lower[0][0];
  const tail = spec.lower[spec.lower.length - 1][0];
  const belt = spec.lower[4][1];

  dark.push(bake(new THREE.BoxGeometry(spec.width * 0.7, 0.08, 0.06), [0, 0.22, nose - 0.01]));
  dark.push(bake(new THREE.BoxGeometry(spec.width * 0.55, 0.05, 0.16), [0, 0.16, tail + 0.02]));

  if (spec.splitter) {
    body.push(bake(new THREE.BoxGeometry(spec.width * 0.92, 0.04, 0.28), [0, 0.09, nose + 0.08]));
  }
  if (spec.diffuser) {
    dark.push(bake(new THREE.BoxGeometry(spec.width * 0.7, 0.1, 0.32), [0, 0.12, tail - 0.08]));
    for (const x of [-0.18, 0, 0.18]) {
      dark.push(bake(new THREE.BoxGeometry(0.03, 0.12, 0.28), [x, 0.14, tail - 0.06]));
    }
  }
  if (spec.hoodScoop) {
    body.push(bake(new THREE.BoxGeometry(0.42, 0.1, 0.55), [0, belt + 0.08, -0.85]));
    dark.push(bake(new THREE.BoxGeometry(0.32, 0.04, 0.22), [0, belt + 0.14, -0.7]));
  }
  if (spec.intakes) {
    dark.push(bake(new THREE.BoxGeometry(0.16, 0.22, 0.5), [spec.width * 0.48, 0.38, 0.15]));
    dark.push(bake(new THREE.BoxGeometry(0.16, 0.22, 0.5), [-spec.width * 0.48, 0.38, 0.15]));
  }

  const mirrorArm = new THREE.BoxGeometry(0.22, 0.04, 0.04);
  const mirrorGlass = new THREE.BoxGeometry(0.16, 0.09, 0.06);
  const my = belt + 0.12;
  const mz = spec.cabin[0][0] + 0.08;
  const mx = spec.cabinW * 0.5 + 0.12;
  dark.push(bake(mirrorArm, [mx, my, mz]));
  dark.push(bake(mirrorArm.clone(), [-mx, my, mz]));
  dark.push(bake(mirrorGlass, [mx + 0.08, my, mz]));
  dark.push(bake(mirrorGlass.clone(), [-mx - 0.08, my, mz]));

  const handle = new THREE.BoxGeometry(0.035, 0.025, 0.12);
  dark.push(bake(handle, [spec.cabinW * 0.5 + 0.02, belt + 0.02, 0.15]));
  dark.push(bake(handle.clone(), [-spec.cabinW * 0.5 - 0.02, belt + 0.02, 0.15]));

  if (spec.spoiler === "lip") {
    body.push(bake(new THREE.BoxGeometry(spec.cabinW * 0.95, 0.05, 0.18), [0, spec.cabin[2][1] - 0.02, spec.cabin[3][0] + 0.08]));
  }
  if (spec.spoiler === "wing" || spec.spoiler === "swan") {
    const y = spec.cabin[2][1] + (spec.spoiler === "swan" ? 0.18 : 0.08);
    const z = tail - 0.22;
    body.push(bake(new THREE.BoxGeometry(spec.width * 0.92, 0.05, 0.28), [0, y, z]));
    dark.push(bake(new THREE.BoxGeometry(0.05, 0.22, 0.05), [-spec.width * 0.28, y - 0.12, z]));
    dark.push(bake(new THREE.BoxGeometry(0.05, 0.22, 0.05), [spec.width * 0.28, y - 0.12, z]));
  }

  dark.push(bake(new THREE.CylinderGeometry(0.045, 0.05, 0.16, 8).rotateX(Math.PI / 2), [spec.width * 0.22, 0.16, tail + 0.06]));
  dark.push(bake(new THREE.CylinderGeometry(0.045, 0.05, 0.16, 8).rotateX(Math.PI / 2), [-spec.width * 0.22, 0.16, tail + 0.06]));

  if (spec.chrome) {
    chrome.push(bake(new THREE.BoxGeometry(spec.width * 0.88, 0.05, 0.08), [0, 0.26, nose - 0.01]));
    chrome.push(bake(new THREE.BoxGeometry(spec.width * 0.7, 0.04, 0.06), [0, 0.3, tail + 0.02]));
  }

  const c = spec.cabin;
  const aLen = Math.hypot(c[1][0] - c[0][0], c[1][1] - c[0][1]);
  const aPitch = Math.atan2(c[1][1] - c[0][1], c[1][0] - c[0][0]);
  const pillar = new THREE.BoxGeometry(0.05, 0.05, aLen);
  const px = spec.cabinW * 0.47;
  const py = (c[0][1] + c[1][1]) / 2;
  const pz = (c[0][0] + c[1][0]) / 2;
  body.push(bake(pillar, [px, py, pz], [aPitch, 0, 0]));
  body.push(bake(pillar.clone(), [-px, py, pz], [aPitch, 0, 0]));
}

function makeWheel(spec: Spec, mats: ReturnType<typeof makeMats>) {
  const g = new THREE.Group();
  const spin = new THREE.Group();
  spin.name = "spin";
  const tire = new THREE.Mesh(
    new THREE.CylinderGeometry(spec.wheelR, spec.wheelR, spec.wheelW, 16),
    mats.tire,
  );
  tire.rotation.z = Math.PI / 2;
  const sidewall = new THREE.Mesh(
    new THREE.CylinderGeometry(spec.wheelR * 0.78, spec.wheelR * 0.78, spec.wheelW * 1.05, 14),
    mats.dark,
  );
  sidewall.rotation.z = Math.PI / 2;
  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(spec.wheelR * 0.62, spec.wheelR * 0.62, spec.wheelW * 0.55, 14),
    mats.rim,
  );
  rim.rotation.z = Math.PI / 2;
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, spec.wheelW * 0.7, 10), mats.chrome);
  hub.rotation.z = Math.PI / 2;
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(spec.wheelR * 0.48, spec.wheelR * 0.48, 0.04, 12), mats.disc);
  disc.rotation.z = Math.PI / 2;
  spin.add(tire, sidewall, rim, hub, disc);
  const spokes = 5;
  for (let i = 0; i < spokes; i++) {
    const sp = new THREE.Mesh(new THREE.BoxGeometry(0.05, spec.wheelR * 0.9, 0.035), mats.rim);
    sp.rotation.x = (i / spokes) * Math.PI;
    spin.add(sp);
  }
  g.add(spin);
  return g;
}

function slopePanel(a: Pt, b: Pt, width: number, thick: number) {
  const dz = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dz, dy);
  const geo = new THREE.BoxGeometry(width, thick, len);
  const pitch = Math.atan2(dy, dz);
  return bake(geo, [0, (a[1] + b[1]) / 2, (a[0] + b[0]) / 2], [pitch, 0, 0]);
}

function bake(geo: THREE.BufferGeometry, pos: [number, number, number], rot?: [number, number, number]) {
  const g = geo.clone();
  const m = new THREE.Matrix4();
  const e = new THREE.Euler(rot?.[0] ?? 0, rot?.[1] ?? 0, rot?.[2] ?? 0);
  m.makeRotationFromEuler(e);
  m.setPosition(pos[0], pos[1], pos[2]);
  g.applyMatrix4(m);
  return g;
}

function mergeSafe(list: THREE.BufferGeometry[]) {
  const prepared = list.map((g) => {
    const src = g.index ? g.toNonIndexed() : g;
    const out = new THREE.BufferGeometry();
    out.setAttribute("position", src.getAttribute("position").clone());
    if (!src.getAttribute("normal")) src.computeVertexNormals();
    out.setAttribute("normal", src.getAttribute("normal").clone());
    if (src !== g) src.dispose();
    return out;
  });
  const merged = mergeGeometries(prepared, false);
  list.forEach((g) => g.dispose());
  prepared.forEach((g) => g.dispose());
  if (!merged) {
    const g = new THREE.BufferGeometry();
    return g;
  }
  merged.computeVertexNormals();
  return merged;
}
