import * as THREE from "three";
import type { BuiltTrack } from "./trackGeom";
import type { TimeOfDay } from "./types";

export type WorldBuilt = {
  group: THREE.Group;
  lamps: THREE.Group;
  sun: THREE.DirectionalLight;
  hemi: THREE.HemisphereLight;
  rain: THREE.Points | null;
};

export function buildWorld(track: BuiltTrack, time: TimeOfDay, quality: "low" | "high"): WorldBuilt {
  const group = new THREE.Group();
  const pal = palette(track.theme, time);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(520, 32),
    new THREE.MeshStandardMaterial({ color: pal.ground, roughness: 1 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.6;
  ground.receiveShadow = true;
  group.add(ground);

  group.add(buildRoad(track, pal));
  group.add(buildWalls(track, pal));
  group.add(buildStartLine(track));

  if (track.theme === "harbor") group.add(buildHarbor(track, pal, quality));
  if (track.theme === "city") group.add(buildCity(track, pal, quality));
  if (track.theme === "mountain") group.add(buildMountain(track, pal, quality));

  const lamps = new THREE.Group();
  if (time === "night" || time === "storm") {
    lamps.add(buildLamps(track, quality === "high" ? 28 : 14));
  }
  group.add(lamps);

  const hemi = new THREE.HemisphereLight(pal.sky, pal.ground, pal.hemi);
  const sun = new THREE.DirectionalLight(pal.sun, pal.sunInt);
  sun.position.set(pal.sunPos[0], pal.sunPos[1], pal.sunPos[2]);
  sun.castShadow = false;

  let rain: THREE.Points | null = null;
  if (time === "storm") {
    const n = quality === "high" ? 900 : 400;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 220;
      pos[i * 3 + 1] = Math.random() * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 220;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    rain = new THREE.Points(
      geo,
      new THREE.PointsMaterial({ color: "#9ab0c8", size: 0.18, transparent: true, opacity: 0.55 }),
    );
    group.add(rain);
  }

  return { group, lamps, sun, hemi, rain };
}

function buildRoad(track: BuiltTrack, pal: Pal) {
  const s = track.samples;
  const n = s.length;
  const hw = track.halfWidth;
  const pos: number[] = [];
  const nrm: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i < n; i++) {
    const a = s[i];
    const b = s[(i + 1) % n];
    const i0 = i * 2;
    pos.push(a.x - a.rx * hw, a.y, a.z - a.rz * hw, a.x + a.rx * hw, a.y, a.z + a.rz * hw);
    nrm.push(0, 1, 0, 0, 1, 0);
    uv.push(0, a.dist * 0.12, 1, a.dist * 0.12);
    const i1 = ((i + 1) % n) * 2;
    void b;
    idx.push(i0, i1, i0 + 1, i0 + 1, i1, i1 + 1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color: pal.road, roughness: 0.82, metalness: 0.05 }),
  );
  mesh.receiveShadow = true;

  const g = new THREE.Group();
  g.add(mesh);
  const stripe = buildStripes(track);
  g.add(stripe);
  return g;
}

function buildStripes(track: BuiltTrack) {
  const s = track.samples;
  const n = s.length;
  const pos: number[] = [];
  const idx: number[] = [];
  let vi = 0;
  for (let i = 0; i < n; i++) {
    if (Math.floor(s[i].dist / 4) % 2 === 0) continue;
    const a = s[i];
    const b = s[(i + 1) % n];
    const w = 0.12;
    pos.push(
      a.x - a.rx * w, a.y + 0.02, a.z - a.rz * w,
      a.x + a.rx * w, a.y + 0.02, a.z + a.rz * w,
      b.x - b.rx * w, b.y + 0.02, b.z - b.rz * w,
      b.x + b.rx * w, b.y + 0.02, b.z + b.rz * w,
    );
    idx.push(vi, vi + 2, vi + 1, vi + 1, vi + 2, vi + 3);
    vi += 4;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: "#e8edf5" }));
}

function buildWalls(track: BuiltTrack, pal: Pal) {
  const g = new THREE.Group();
  const s = track.samples;
  const n = s.length;
  const hw = track.halfWidth + 0.15;
  const h = 1.15;
  for (const side of [-1, 1]) {
    const pos: number[] = [];
    const idx: number[] = [];
    for (let i = 0; i < n; i++) {
      const a = s[i];
      const b = s[(i + 1) % n];
      const ax = a.x + a.rx * hw * side;
      const az = a.z + a.rz * hw * side;
      const bx = b.x + b.rx * hw * side;
      const bz = b.z + b.rz * hw * side;
      const base = i * 4;
      pos.push(ax, a.y, az, ax, a.y + h, az, bx, b.y, bz, bx, b.y + h, bz);
      idx.push(base, base + 2, base + 1, base + 1, base + 2, base + 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const col = side > 0 ? pal.wallA : pal.wallB;
    g.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: col, roughness: 0.7 })));
  }
  return g;
}

function buildStartLine(track: BuiltTrack) {
  const sm = track.samples[0];
  const w = track.halfWidth;
  const geo = new THREE.PlaneGeometry(w * 2, 2.2);
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: "#eef1f6" }));
  mesh.position.set(sm.x, sm.y + 0.03, sm.z);
  mesh.rotation.y = Math.atan2(sm.tx, sm.tz);
  return mesh;
}

function buildHarbor(track: BuiltTrack, pal: Pal, quality: "low" | "high") {
  const g = new THREE.Group();
  const water = new THREE.Mesh(
    new THREE.CircleGeometry(280, 24),
    new THREE.MeshStandardMaterial({ color: "#123044", metalness: 0.4, roughness: 0.35 }),
  );
  water.rotation.x = -Math.PI / 2;
  water.position.set(40, -0.45, 40);
  g.add(water);
  const box = new THREE.BoxGeometry(10, 8, 18);
  const mat = new THREE.MeshStandardMaterial({ color: pal.building, roughness: 0.9 });
  const count = quality === "high" ? 18 : 10;
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(box, mat);
    const a = (i / count) * Math.PI * 2;
    m.position.set(Math.cos(a) * 175, 3.5, Math.sin(a) * 175);
    m.scale.set(1 + (i % 3) * 0.4, 0.6 + (i % 4) * 0.5, 1);
    g.add(m);
  }
  return g;
}

function buildCity(track: BuiltTrack, pal: Pal, quality: "low" | "high") {
  const g = new THREE.Group();
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mats = [
    new THREE.MeshStandardMaterial({ color: pal.building, roughness: 0.85 }),
    new THREE.MeshStandardMaterial({ color: "#1a2230", roughness: 0.7, emissive: "#1a3040", emissiveIntensity: 0.3 }),
  ];
  const count = quality === "high" ? 55 : 28;
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(geo, mats[i % 2]);
    const a = (i / count) * Math.PI * 2 + i * 0.3;
    const r = 155 + (i % 5) * 18;
    const h = 8 + (i % 7) * 6;
    m.position.set(Math.cos(a) * r, h / 2, Math.sin(a) * r);
    m.scale.set(8 + (i % 4) * 2, h, 8 + ((i * 3) % 4) * 2);
    g.add(m);
  }
  return g;
}

function buildMountain(track: BuiltTrack, pal: Pal, quality: "low" | "high") {
  const g = new THREE.Group();
  const rock = new THREE.MeshStandardMaterial({ color: pal.building, roughness: 1 });
  const count = quality === "high" ? 22 : 12;
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(new THREE.ConeGeometry(10 + (i % 5) * 3, 18 + (i % 4) * 8, 5), rock);
    const a = (i / count) * Math.PI * 2;
    m.position.set(Math.cos(a) * 200, 6, Math.sin(a) * 200);
    g.add(m);
  }
  const treeMat = new THREE.MeshStandardMaterial({ color: "#163022" });
  const trunkMat = new THREE.MeshStandardMaterial({ color: "#2a1c12" });
  const tn = quality === "high" ? 40 : 18;
  for (let i = 0; i < tn; i++) {
    const t = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.3, 2, 5), trunkMat);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.4, 3.2, 6), treeMat);
    trunk.position.y = 1;
    cone.position.y = 3.1;
    t.add(trunk, cone);
    const a = i * 0.7;
    t.position.set(Math.cos(a) * 165, 0, Math.sin(a) * 165);
    g.add(t);
  }
  return g;
}

function buildLamps(track: BuiltTrack, count: number) {
  const g = new THREE.Group();
  const poleMat = new THREE.MeshStandardMaterial({ color: "#2a3038" });
  const bulbMat = new THREE.MeshStandardMaterial({ color: "#ffe8a8", emissive: "#ffd27a", emissiveIntensity: 1.4 });
  const step = Math.max(1, Math.floor(track.samples.length / count));
  for (let i = 0; i < track.samples.length; i += step) {
    const s = track.samples[i];
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 4.2, 5), poleMat);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 6), bulbMat);
    const x = s.x + s.rx * (track.halfWidth + 1.4);
    const z = s.z + s.rz * (track.halfWidth + 1.4);
    pole.position.set(x, s.y + 2.1, z);
    bulb.position.set(x, s.y + 4.3, z);
    g.add(pole, bulb);
  }
  return g;
}

type Pal = {
  ground: string;
  road: string;
  wallA: string;
  wallB: string;
  building: string;
  sky: string;
  sun: string;
  sunInt: number;
  hemi: number;
  sunPos: [number, number, number];
  fog: string;
  fogNear: number;
  fogFar: number;
};

function palette(theme: BuiltTrack["theme"], time: TimeOfDay): Pal {
  if (time === "night") {
    return {
      ground: "#0b1018",
      road: "#2a3140",
      wallA: "#d4556a",
      wallB: "#eef1f6",
      building: "#151c28",
      sky: "#1a2a44",
      sun: "#8eb4ff",
      sunInt: 0.35,
      hemi: 0.28,
      sunPos: [40, 80, 20],
      fog: "#070b12",
      fogNear: 40,
      fogFar: 260,
    };
  }
  if (time === "storm") {
    return {
      ground: "#12161c",
      road: "#262c36",
      wallA: "#c94b5e",
      wallB: "#cfd6e0",
      building: "#1a2028",
      sky: "#4a5868",
      sun: "#9aa8b8",
      sunInt: 0.25,
      hemi: 0.22,
      sunPos: [20, 90, 10],
      fog: "#1a222c",
      fogNear: 20,
      fogFar: 180,
    };
  }
  if (time === "dusk") {
    return {
      ground: "#1a1410",
      road: "#35323a",
      wallA: "#e06a4f",
      wallB: "#f0e6d8",
      building: "#2a2220",
      sky: "#ffb08a",
      sun: "#ffb070",
      sunInt: 0.7,
      hemi: 0.45,
      sunPos: [-60, 30, 20],
      fog: "#2a1814",
      fogNear: 50,
      fogFar: 320,
    };
  }
  return {
    ground: theme === "harbor" ? "#1d3a28" : "#1c2a1c",
    road: "#3a414c",
    wallA: "#e24b62",
    wallB: "#f4f6fa",
    building: "#4a5564",
    sky: "#9ecfff",
    sun: "#fff4d6",
    sunInt: 1.15,
    hemi: 0.65,
    sunPos: [80, 120, 40],
    fog: "#b8d4ee",
    fogNear: 80,
    fogFar: 420,
  };
}

export function skyFog(time: TimeOfDay, theme: BuiltTrack["theme"]) {
  return palette(theme, time);
}
