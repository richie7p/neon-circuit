import * as THREE from "three";
import { createCarMesh, createShowroomEnv, spinWheels } from "./carMesh";
import { Input } from "./input";
import { LEVEL_MAP } from "./data/levels";
import { GameAudio } from "./audio";
import { resetCar, type SimCar } from "./carSim";
import {
  STEP,
  buildLiveResult,
  createSession,
  forceFinish,
  stepSession,
  type RaceSession,
} from "./simRace";
import { skyFog, buildWorld, type WorldBuilt } from "./world";
import type { CarStyle, HudSnap, LevelId, SaveData } from "./types";

export type EngineHooks = {
  onHud: (h: HudSnap) => void;
  onFinish: (snap: ReturnType<typeof buildLiveResult>) => void;
  onCountdown: (n: number) => void;
  onCollide: () => void;
};

export class RaceEngine {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  session: RaceSession;
  input = new Input();
  audio: GameAudio;
  hooks: EngineHooks;
  carMeshes = new Map<number, THREE.Group>();
  world: WorldBuilt | null = null;
  camPos = new THREE.Vector3();
  look = new THREE.Vector3();
  running = false;
  acc = 0;
  last = 0;
  raf = 0;
  lastCd = 4;
  finishedSent = false;
  disposed = false;
  quality: "low" | "high";
  shadows: boolean;
  save: SaveData;
  private canvas: HTMLCanvasElement;
  private shake = 0;

  constructor(
    canvas: HTMLCanvasElement,
    save: SaveData,
    levelId: LevelId,
    audio: GameAudio,
    hooks: EngineHooks,
  ) {
    this.canvas = canvas;
    this.save = save;
    this.audio = audio;
    this.hooks = hooks;
    this.quality = save.settings.quality;
    this.shadows = save.settings.shadows;
    this.session = createSession({ levelId, save });
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: this.quality === "high",
      alpha: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    this.renderer.setPixelRatio(this.quality === "high" ? Math.min(window.devicePixelRatio || 1, 1.6) : 1);
    this.renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.enabled = this.shadows;
    this.scene = new THREE.Scene();
    const level = LEVEL_MAP[levelId];
    const fog = skyFog(level.timeOfDay, this.session.track.theme);
    this.renderer.setClearColor(new THREE.Color(fog.fog), 1);
    this.scene.background = new THREE.Color(fog.fog);
    this.scene.fog = new THREE.Fog(fog.fog, fog.fogNear, fog.fogFar);
    this.camera = new THREE.PerspectiveCamera(68, 1, 0.1, 700);
    this.build();
    this.input.attach();
    this.resize();
    window.addEventListener("resize", this.resize);
    this.exposeQa();
  }

  private build() {
    const level = LEVEL_MAP[this.session.levelId];
    this.world = buildWorld(this.session.track, level.timeOfDay, this.quality);
    this.scene.add(this.world.group);
    this.scene.add(this.world.hemi);
    this.scene.add(this.world.sun);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.28));
    this.scene.environment = createShowroomEnv(this.renderer);
    this.scene.environmentIntensity = 0.45;
    if (this.shadows) {
      this.world.sun.castShadow = true;
      this.world.sun.shadow.mapSize.set(1024, 1024);
    }
    for (const car of this.session.cars) {
      const mesh = createCarMesh(car.style as CarStyle, {
        body: car.color,
        rim: car.rim,
        metalness: car.metalness,
      });
      this.carMeshes.set(car.id, mesh);
      this.scene.add(mesh);
      this.syncMesh(car, mesh, 0);
    }
    const p = this.player();
    const fx = -Math.sin(p.yaw);
    const fz = -Math.cos(p.yaw);
    this.camera.position.set(p.x - fx * 12, p.y + 5.5, p.z - fz * 12);
    this.camera.lookAt(p.x, p.y + 1.2, p.z);
  }

  player() {
    return this.session.cars.find((c) => c.isPlayer)!;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this.audio.startEngine();
    const loop = (now: number) => {
      if (!this.running || this.disposed) return;
      this.raf = requestAnimationFrame(loop);
      let dt = (now - this.last) / 1000;
      this.last = now;
      if (dt > 0.1) dt = 0.1;
      if (this.session.paused) {
        this.render();
        this.pushHud();
        return;
      }
      this.acc += dt;
      let steps = 0;
      const inp = this.input.read();
      if (inp.pause && this.session.started && !this.session.over) {
        this.session.paused = true;
      }
      while (this.acc >= STEP && steps < 5) {
        const prevCol = this.player().collisions;
        stepSession(this.session, inp, STEP);
        if (this.player().collisions > prevCol) {
          this.shake = Math.min(0.7, this.shake + 0.38);
          this.hooks.onCollide();
        }
        this.acc -= STEP;
        steps++;
      }
      this.afterSim(dt);
      this.render();
      this.pushHud();
      if (this.session.over && !this.finishedSent) {
        this.finishedSent = true;
        this.hooks.onFinish(buildLiveResult(this.session));
      }
    };
    this.raf = requestAnimationFrame(loop);
  }

  private afterSim(dt: number) {
    const cd = this.session.started ? 0 : Math.ceil(this.session.countdown);
    if (cd !== this.lastCd && cd >= 0 && cd <= 3) {
      this.hooks.onCountdown(cd);
      this.lastCd = cd;
    }
    for (const car of this.session.cars) {
      const mesh = this.carMeshes.get(car.id);
      if (mesh) this.syncMesh(car, mesh, dt);
    }
    this.followCam(dt);
    this.audio.updateEngine(
      this.player().speed,
      this.player().throttle,
      this.session.started && !this.session.over,
    );
    if (this.world?.rain) {
      const pos = this.world.rain.geometry.getAttribute("position") as THREE.BufferAttribute;
      const p = this.player();
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i) - 18 * dt;
        if (y < 0) y = 28;
        pos.setXYZ(i, p.x + ((i * 17) % 200) - 100, y, p.z + ((i * 31) % 200) - 100);
      }
      pos.needsUpdate = true;
    }
  }

  private syncMesh(car: SimCar, mesh: THREE.Group, dt: number) {
    mesh.position.set(car.x, car.y, car.z);
    mesh.rotation.y = car.yaw;
    const chassis = mesh.userData.chassis as THREE.Group | undefined;
    if (chassis) {
      const roll = -car.steer * Math.min(0.14, 0.035 + car.speed * 0.0035);
      const pitch = car.throttle * 0.035 - (car.speed > 2 && car.throttle < 0.05 ? 0.02 : 0);
      chassis.rotation.z = THREE.MathUtils.lerp(chassis.rotation.z, roll, 1 - Math.exp(-dt * 8));
      chassis.rotation.x = THREE.MathUtils.lerp(chassis.rotation.x, pitch, 1 - Math.exp(-dt * 7));
    }
    spinWheels(mesh, car.speed, car.steer, dt);
  }

  private followCam(dt: number) {
    const p = this.player();
    const fx = -Math.sin(p.yaw);
    const fz = -Math.cos(p.yaw);
    const rx = Math.cos(p.yaw);
    const rz = -Math.sin(p.yaw);
    const dist = 9.4 + Math.min(3.6, p.speed * 0.07);
    const height = 3.55 + Math.min(1.05, p.speed * 0.018);
    const lean = p.steer * Math.min(1.6, p.speed * 0.05);
    this.camPos.set(
      p.x - fx * dist + rx * lean,
      p.y + height,
      p.z - fz * dist + rz * lean,
    );
    this.shake *= Math.exp(-dt * 6);
    this.camera.position.lerp(this.camPos, 1 - Math.exp(-dt * 7));
    this.camera.position.x += (Math.random() - 0.5) * this.shake;
    this.camera.position.y += (Math.random() - 0.5) * this.shake * 0.5;
    this.look.set(p.x + fx * 11 + rx * lean * 1.4, p.y + 1.05, p.z + fz * 11 + rz * lean * 1.4);
    this.camera.lookAt(this.look);
    const fov = 62 + Math.min(16, p.speed * 0.26);
    if (Math.abs(this.camera.fov - fov) > 0.2) {
      this.camera.fov = fov;
      this.camera.updateProjectionMatrix();
    }
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
  }

  private pushHud() {
    const p = this.player();
    const level = LEVEL_MAP[this.session.levelId];
    const loop = this.session.track.samples
      .filter((_, i) => i % 6 === 0)
      .map((s) => ({ x: s.x, z: s.z }));
    const ahead = this.session.cars.find((c) => c.place === p.place - 1);
    let gapText: string | null = "領先";
    if (ahead) {
      const len = this.session.track.length;
      const gapM = Math.max(0.5, (ahead.laps - p.laps) * len + (ahead.trackDist - p.trackDist) + (ahead.laps < p.laps ? len : 0));
      const gapS = gapM / Math.max(10, p.speed);
      gapText = `${ahead.name}  +${gapS.toFixed(2)}s`;
    } else if (p.place !== 1) {
      gapText = null;
    }
    const hud: HudSnap = {
      place: p.place,
      field: this.session.field,
      lap: Math.min(this.session.laps, p.laps + 1),
      laps: this.session.laps,
      speedKmh: p.speed * 3.6,
      time: this.session.time,
      lapTime: p.currentLap,
      bestLap: p.bestLap,
      countdown: this.session.started ? null : Math.ceil(this.session.countdown),
      goFlash: this.session.goFlash,
      wrongWay: p.wrongWay > 0.45,
      finished: p.finished,
      paused: this.session.paused,
      minimap: this.session.cars.map((c) => ({
        x: c.x,
        z: c.z,
        isPlayer: c.isPlayer,
        isRival: c.isRival,
      })),
      trackLoop: loop,
      objectives: ["完賽", `前 ${level.star2Place} 名`, level.star3.label],
      hint: p.wrongWay > 0.45 ? "逆向！請掉頭" : p.offTrack ? "四輪離地！回跑道" : this.session.started ? null : "倒數結束前無法起步",
      gapText,
      offTrack: p.offTrack,
    };
    this.hooks.onHud(hud);
  }

  setPaused(v: boolean) {
    this.session.paused = v;
  }

  resize = () => {
    const w = this.canvas.clientWidth || window.innerWidth;
    const h = this.canvas.clientHeight || window.innerHeight;
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  };

  dispose() {
    this.disposed = true;
    this.running = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.resize);
    this.input.detach();
    this.audio.stopEngine();
    this.scene.environment?.dispose();
    this.scene.environment = null;
    this.scene.traverse((obj) => {
      const m = obj as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mat = m.material;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else if (mat) (mat as THREE.Material).dispose();
    });
    this.renderer.dispose();
    delete window.__controlsTest;
    delete window.__qa;
  }

  private exposeQa() {
    window.__controlsTest = {
      getYaw: () => this.player().yaw,
      getSpeed: () => this.player().speed,
      setSteer: (v: number) => {
        this.input.steerOverride = v;
      },
      setKeys: (codes: string[]) => this.input.setKeys(codes),
    };
    window.__qa = {
      getRace: () => ({
        time: this.session.time,
        started: this.session.started,
        over: this.session.over,
        cars: this.session.cars.map((c) => ({
          name: c.name,
          lap: c.laps,
          cp: c.nextCp,
          dist: c.trackDist,
          speed: c.speed,
          place: c.place,
          finished: c.finished,
          x: c.x,
          z: c.z,
        })),
      }),
      skipCountdown: () => {
        this.session.countdown = 0;
        this.session.started = true;
        this.session.goFlash = 0.4;
      },
      finishAt: (place: number) => {
        forceFinish(this.session, place);
        if (!this.finishedSent) {
          this.finishedSent = true;
          this.hooks.onFinish(buildLiveResult(this.session));
        }
      },
      resetPlayer: () => {
        resetCar(this.player(), this.session.track, true);
      },
    };
  }
}

declare global {
  interface Window {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      setSteer?: (v: number) => void;
      setKeys?: (codes: string[]) => void;
    };
    __qa?: {
      getRace: () => unknown;
      skipCountdown: () => void;
      finishAt: (place: number) => void;
      resetPlayer: () => void;
    };
  }
}
