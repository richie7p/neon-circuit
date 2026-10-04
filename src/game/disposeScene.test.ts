import assert from "node:assert/strict";
import { test } from "node:test";
import * as THREE from "three";
import { disposeScene } from "./disposeScene";
test("leaving a car preview disposes shared geometry/material/environment exactly once", () => {
 const scene=new THREE.Scene();const geometry=new THREE.BoxGeometry();const material=new THREE.MeshBasicMaterial();const environment=new THREE.Texture();
 let g=0,m=0,e=0;geometry.addEventListener("dispose",()=>g++);material.addEventListener("dispose",()=>m++);environment.addEventListener("dispose",()=>e++);
 scene.environment=environment;scene.add(new THREE.Mesh(geometry,material),new THREE.Mesh(geometry,material));disposeScene(scene);
 assert.deepEqual([g,m,e],[1,1,1]);
});
