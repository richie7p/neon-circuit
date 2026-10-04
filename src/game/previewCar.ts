import * as THREE from "three";
import { createCarMesh, createShowroomEnv, applyPaint } from "./carMesh";
import type { CarStyle, Paint } from "./types";
import { disposeScene } from "./disposeScene";
export function previewCar(canvas: HTMLCanvasElement, style: CarStyle, paint: Paint) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.setSize(canvas.clientWidth || 320, canvas.clientHeight || 200, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  const scene = new THREE.Scene();
  scene.environment = createShowroomEnv(renderer);
  scene.environmentIntensity = 0.9;
  scene.add(new THREE.HemisphereLight(0xd8ecff, 0x1a1c22, 0.7));
  const key = new THREE.DirectionalLight(0xffffff, 1.35);
  key.position.set(3.2, 5.5, 4.5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x7ad7d0, 0.55);
  rim.position.set(-4, 2.4, -3);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffe6c8, 0.35);
  fill.position.set(-2, 3, 5);
  scene.add(fill);
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(5.5, 36),
    new THREE.MeshStandardMaterial({ color: 0x141820, metalness: 0.35, roughness: 0.45 }),
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);
  const mesh = createCarMesh(style, paint);
  scene.add(mesh);
  const cam = new THREE.PerspectiveCamera(36, 1.6, 0.1, 50);
  cam.position.set(3.55, 1.22, 4.35);
  cam.lookAt(0, 0.42, -0.15);
  let raf = 0;
  let live = true;
  const loop = () => {
    if (!live) return;
    raf = requestAnimationFrame(loop);
    mesh.rotation.y += 0.008;
    renderer.render(scene, cam);
  };
  loop();
  return {
    setPaint(p: Paint) {
      applyPaint(mesh, p);
    },
    resize() {
      const w = canvas.clientWidth || 320;
      const h = canvas.clientHeight || 200;
      cam.aspect = w / Math.max(1, h);
      cam.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    },
    dispose() {
      live = false;
      cancelAnimationFrame(raf);
      disposeScene(scene);
      renderer.dispose();
    },
  };
}
