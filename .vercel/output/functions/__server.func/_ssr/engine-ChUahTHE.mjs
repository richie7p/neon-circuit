import { a as CAR_MAP, c as collideCars, d as spawnCar, f as stepCar, g as LEVEL_MAP, h as sampleAt, i as starChecks, l as maybeFinish, m as distForward, n as sortField, o as effectiveStats, p as buildTrack, r as standingsOf, s as emptyUpgrades, u as resetCar } from "./routes-BVTIeHSY.mjs";
import { A as SRGBColorSpace, C as MeshPhysicalMaterial, D as PlaneGeometry, E as PerspectiveCamera, F as Vector3, M as Shape, N as SphereGeometry, O as Points, P as TorusGeometry, S as MeshBasicMaterial, T as Path, _ as Group, a as BoxGeometry, b as Matrix4, c as CircleGeometry, d as CylinderGeometry, f as DirectionalLight, g as Fog, h as Float32BufferAttribute, i as AmbientLight, j as Scene, k as PointsMaterial, l as Color, m as ExtrudeGeometry, n as PMREMGenerator, o as BufferAttribute, p as Euler, r as WebGLRenderer, s as BufferGeometry, t as mergeGeometries, u as ConeGeometry, v as HemisphereLight, w as MeshStandardMaterial, x as Mesh, y as MathUtils } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/engine-ChUahTHE.js
var SPECS = {
	hatch: {
		width: 1.68,
		cabinW: 1.28,
		wheelR: .34,
		wheelW: .24,
		track: .86,
		wheelZ: [-.98, 1.02],
		lower: [
			[-1.68, .1],
			[-1.68, .3],
			[-1.58, .46],
			[-1.28, .58],
			[-.4, .62],
			[.85, .64],
			[1.38, .58],
			[1.55, .4],
			[1.62, .24],
			[1.62, .1]
		],
		cabin: [
			[-.38, .62],
			[-.18, 1.05],
			[.42, 1.16],
			[.92, 1.1],
			[1.22, .78],
			[1.28, .64]
		],
		lights: "round",
		spoiler: "lip",
		hoodScoop: false,
		splitter: true,
		diffuser: false,
		intakes: false,
		chrome: false,
		canopy: false
	},
	coupe: {
		width: 1.78,
		cabinW: 1.3,
		wheelR: .35,
		wheelW: .26,
		track: .92,
		wheelZ: [-1.12, 1.18],
		lower: [
			[-1.98, .1],
			[-1.98, .28],
			[-1.86, .44],
			[-1.5, .54],
			[-.55, .58],
			[1.05, .6],
			[1.62, .54],
			[1.88, .36],
			[1.96, .22],
			[1.96, .1]
		],
		cabin: [
			[-.52, .58],
			[-.28, .98],
			[.35, 1.08],
			[1.05, 1],
			[1.42, .7],
			[1.48, .6]
		],
		lights: "slim",
		spoiler: "lip",
		hoodScoop: false,
		splitter: true,
		diffuser: true,
		intakes: true,
		chrome: false,
		canopy: false
	},
	muscle: {
		width: 1.92,
		cabinW: 1.42,
		wheelR: .37,
		wheelW: .28,
		track: 1,
		wheelZ: [-1.22, 1.28],
		lower: [
			[-2.12, .1],
			[-2.12, .32],
			[-2, .5],
			[-1.55, .62],
			[-.4, .66],
			[1.15, .68],
			[1.78, .62],
			[2.02, .42],
			[2.12, .26],
			[2.12, .1]
		],
		cabin: [
			[-.35, .66],
			[-.12, 1.12],
			[.55, 1.22],
			[1.15, 1.16],
			[1.48, .82],
			[1.55, .68]
		],
		lights: "quad",
		spoiler: "none",
		hoodScoop: true,
		splitter: false,
		diffuser: false,
		intakes: false,
		chrome: true,
		canopy: false
	},
	supercar: {
		width: 1.9,
		cabinW: 1.18,
		wheelR: .36,
		wheelW: .3,
		track: 1.02,
		wheelZ: [-1.18, 1.28],
		lower: [
			[-2.05, .08],
			[-2.05, .22],
			[-1.92, .36],
			[-1.45, .44],
			[-.5, .48],
			[1.15, .5],
			[1.72, .46],
			[1.98, .3],
			[2.08, .16],
			[2.08, .08]
		],
		cabin: [
			[-.55, .48],
			[-.32, .86],
			[.22, .94],
			[.95, .88],
			[1.35, .58],
			[1.42, .5]
		],
		lights: "blade",
		spoiler: "wing",
		hoodScoop: false,
		splitter: true,
		diffuser: true,
		intakes: true,
		chrome: false,
		canopy: true
	},
	hyper: {
		width: 1.88,
		cabinW: 1.12,
		wheelR: .35,
		wheelW: .3,
		track: 1.04,
		wheelZ: [-1.22, 1.35],
		lower: [
			[-2.12, .07],
			[-2.12, .2],
			[-1.98, .32],
			[-1.4, .4],
			[-.45, .42],
			[1.2, .44],
			[1.85, .4],
			[2.12, .24],
			[2.2, .14],
			[2.2, .07]
		],
		cabin: [
			[-.62, .42],
			[-.38, .82],
			[.15, .9],
			[.88, .84],
			[1.38, .52],
			[1.48, .44]
		],
		lights: "blade",
		spoiler: "swan",
		hoodScoop: false,
		splitter: true,
		diffuser: true,
		intakes: true,
		chrome: false,
		canopy: true
	},
	wagon: {
		width: 1.82,
		cabinW: 1.4,
		wheelR: .36,
		wheelW: .26,
		track: .94,
		wheelZ: [-1.18, 1.32],
		lower: [
			[-2.08, .1],
			[-2.08, .3],
			[-1.95, .46],
			[-1.5, .58],
			[-.4, .64],
			[1.2, .66],
			[1.85, .6],
			[2.08, .4],
			[2.16, .24],
			[2.16, .1]
		],
		cabin: [
			[-.48, .64],
			[-.22, 1.14],
			[.7, 1.24],
			[1.55, 1.2],
			[1.95, .82],
			[2, .66]
		],
		lights: "slim",
		spoiler: "lip",
		hoodScoop: false,
		splitter: false,
		diffuser: false,
		intakes: false,
		chrome: true,
		canopy: false
	},
	roadster: {
		width: 1.72,
		cabinW: 1.18,
		wheelR: .34,
		wheelW: .26,
		track: .9,
		wheelZ: [-1.05, 1.12],
		lower: [
			[-1.88, .09],
			[-1.88, .26],
			[-1.72, .4],
			[-1.28, .5],
			[-.4, .52],
			[1, .54],
			[1.55, .48],
			[1.78, .32],
			[1.86, .2],
			[1.86, .09]
		],
		cabin: [
			[-.28, .52],
			[-.08, .86],
			[.22, .9],
			[.55, .78],
			[.72, .58],
			[.78, .52]
		],
		lights: "round",
		spoiler: "lip",
		hoodScoop: false,
		splitter: true,
		diffuser: true,
		intakes: false,
		chrome: false,
		canopy: false
	}
};
function createCarMesh(style, paint) {
	const spec = SPECS[style];
	const mats = makeMats(paint);
	const g = new Group();
	g.name = "car";
	const bodyGeos = [];
	const darkGeos = [];
	const chromeGeos = [];
	const glassGeos = [];
	const lightFGeos = [];
	const lightRGeos = [];
	const lower = extrudeProfile(spec.lower, spec.width, spec.wheelZ, spec.wheelR + .06, true);
	bodyGeos.push(lower);
	const cabin = extrudeProfile(spec.cabin, spec.cabinW, null, 0, false);
	bodyGeos.push(cabin);
	addWindows(spec, glassGeos);
	addLights(spec, lightFGeos, lightRGeos, darkGeos);
	addDetails(spec, bodyGeos, darkGeos, chromeGeos);
	const bodyMesh = new Mesh(mergeSafe(bodyGeos), mats.body);
	bodyMesh.castShadow = true;
	bodyMesh.receiveShadow = true;
	const chassis = new Group();
	chassis.name = "chassis";
	chassis.add(bodyMesh);
	if (darkGeos.length) chassis.add(new Mesh(mergeSafe(darkGeos), mats.dark));
	if (chromeGeos.length) chassis.add(new Mesh(mergeSafe(chromeGeos), mats.chrome));
	if (glassGeos.length) chassis.add(new Mesh(mergeSafe(glassGeos), mats.glass));
	if (lightFGeos.length) chassis.add(new Mesh(mergeSafe(lightFGeos), mats.lightF));
	if (lightRGeos.length) chassis.add(new Mesh(mergeSafe(lightRGeos), mats.lightR));
	g.add(chassis);
	const wheels = new Group();
	wheels.name = "wheels";
	const [fz, rz] = spec.wheelZ;
	const positions = [
		[
			-spec.track,
			spec.wheelR,
			fz
		],
		[
			spec.track,
			spec.wheelR,
			fz
		],
		[
			-spec.track,
			spec.wheelR,
			rz
		],
		[
			spec.track,
			spec.wheelR,
			rz
		]
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
	g.userData.dims = {
		w: spec.width,
		h: spec.cabin[2]?.[1] ?? 1,
		l: spec.lower.at(-1)[0] - spec.lower[0][0]
	};
	g.rotation.order = "YXZ";
	return g;
}
function applyPaint(group, paint) {
	const body = group.userData.bodyMat;
	const rim = group.userData.rimMat;
	if (body) {
		body.color.set(paint.body);
		body.metalness = .12 + paint.metalness * .72;
		body.roughness = Math.max(.08, .42 - paint.metalness * .28);
		body.clearcoat = .85;
		body.clearcoatRoughness = .06 + (1 - paint.metalness) * .08;
	}
	if (rim) rim.color.set(paint.rim);
}
function spinWheels(group, speed, steer, dt) {
	const wheels = group.userData.wheels;
	const r = group.userData.wheelRadius;
	if (!wheels) return;
	const ang = speed / Math.max(.2, r) * dt;
	wheels.children.forEach((w, i) => {
		const inner = w.getObjectByName("spin");
		if (inner) inner.rotation.x += ang;
		if (i < 2) w.rotation.y = steer * .45;
	});
}
function createShowroomEnv(renderer) {
	const pmrem = new PMREMGenerator(renderer);
	const s = new Scene();
	const hall = new Mesh(new BoxGeometry(28, 14, 28), new MeshBasicMaterial({
		color: 7177368,
		side: 1
	}));
	s.add(hall);
	const glow = new Mesh(new SphereGeometry(1.8, 8, 8), new MeshBasicMaterial({ color: 15922943 }));
	glow.position.set(-4, 6, 5);
	s.add(glow);
	const glow2 = glow.clone();
	glow2.position.set(6, 5, -3);
	glow2.material = new MeshBasicMaterial({ color: 8050640 });
	s.add(glow2);
	const tex = pmrem.fromScene(s, .04).texture;
	pmrem.dispose();
	return tex;
}
function makeMats(paint) {
	return {
		body: new MeshPhysicalMaterial({
			color: paint.body,
			metalness: .12 + paint.metalness * .72,
			roughness: Math.max(.08, .42 - paint.metalness * .28),
			clearcoat: .85,
			clearcoatRoughness: .06,
			envMapIntensity: 1.1
		}),
		dark: new MeshStandardMaterial({
			color: 1185052,
			metalness: .55,
			roughness: .38
		}),
		chrome: new MeshStandardMaterial({
			color: 13226718,
			metalness: .95,
			roughness: .18
		}),
		glass: new MeshPhysicalMaterial({
			color: 8304844,
			metalness: .15,
			roughness: .06,
			transparent: true,
			opacity: .42,
			envMapIntensity: 1.6
		}),
		rim: new MeshStandardMaterial({
			color: paint.rim,
			metalness: .88,
			roughness: .22
		}),
		tire: new MeshStandardMaterial({
			color: 1710618,
			roughness: .92,
			metalness: .05
		}),
		disc: new MeshStandardMaterial({
			color: 9080984,
			metalness: .7,
			roughness: .35
		}),
		lightF: new MeshStandardMaterial({
			color: 16774354,
			emissive: 16769178,
			emissiveIntensity: 1.4
		}),
		lightR: new MeshStandardMaterial({
			color: 16724821,
			emissive: 16720452,
			emissiveIntensity: 1.1
		})
	};
}
function extrudeProfile(pts, width, arches, archR, bevel) {
	const shape = new Shape();
	shape.moveTo(pts[0][0], pts[0][1]);
	for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i][0], pts[i][1]);
	shape.closePath();
	if (arches) for (const z of arches) {
		const hole = new Path();
		hole.absarc(z, .34, archR, 0, Math.PI * 2, true);
		shape.holes.push(hole);
	}
	const geo = new ExtrudeGeometry(shape, {
		depth: width,
		bevelEnabled: bevel,
		bevelThickness: bevel ? .04 : 0,
		bevelSize: bevel ? .035 : 0,
		bevelSegments: bevel ? 2 : 0,
		curveSegments: 8
	});
	geo.rotateY(-Math.PI / 2);
	geo.translate(width / 2, 0, 0);
	geo.computeVertexNormals();
	return geo;
}
function addWindows(spec, glass) {
	const c = spec.cabin;
	if (c.length < 5) return;
	const w = spec.cabinW * .58;
	glass.push(slopePanel(c[0], c[1], w, .03));
	glass.push(slopePanel(c[3], c[4], w * .92, .03));
	const midZ = (c[1][0] + c[3][0]) / 2;
	const midY = (c[1][1] + c[2][1]) * .48;
	const sideL = Math.abs(c[3][0] - c[1][0]) * .58;
	const sideH = Math.max(.16, (c[2][1] - c[0][1]) * .42);
	const side = new BoxGeometry(.03, sideH, sideL);
	const x = spec.cabinW * .5 - .02;
	glass.push(bake(side, [
		x,
		midY,
		midZ
	]));
	glass.push(bake(side.clone(), [
		-x,
		midY,
		midZ
	]));
}
function addLights(spec, front, rear, dark) {
	const nose = spec.lower[0][0];
	const tail = spec.lower[spec.lower.length - 1][0];
	const yL = spec.lower[2][1] * .78;
	const x = spec.width * .32;
	if (spec.lights === "round") {
		const lens = new SphereGeometry(.11, 10, 8);
		front.push(bake(lens, [
			-x,
			yL,
			nose - .02
		]));
		front.push(bake(lens.clone(), [
			x,
			yL,
			nose - .02
		]));
		const ring = new TorusGeometry(.12, .02, 6, 10);
		dark.push(bake(ring, [
			-x,
			yL,
			nose - .01
		], [
			Math.PI / 2,
			0,
			0
		]));
		dark.push(bake(ring.clone(), [
			x,
			yL,
			nose - .01
		], [
			Math.PI / 2,
			0,
			0
		]));
	} else if (spec.lights === "slim") {
		const bar = new BoxGeometry(.38, .08, .08);
		front.push(bake(bar, [
			-x,
			yL,
			nose - .02
		]));
		front.push(bake(bar.clone(), [
			x,
			yL,
			nose - .02
		]));
		dark.push(bake(new BoxGeometry(.42, .12, .06), [
			-x,
			yL,
			nose + .02
		]));
		dark.push(bake(new BoxGeometry(.42, .12, .06), [
			x,
			yL,
			nose + .02
		]));
	} else if (spec.lights === "quad") {
		const d = new CylinderGeometry(.07, .07, .08, 10);
		d.rotateX(Math.PI / 2);
		for (const sx of [-1, 1]) {
			front.push(bake(d.clone(), [
				sx * x,
				yL + .06,
				nose - .02
			]));
			front.push(bake(d.clone(), [
				sx * x,
				yL - .08,
				nose - .02
			]));
		}
	} else {
		const blade = new BoxGeometry(spec.width * .42, .045, .06);
		front.push(bake(blade, [
			0,
			yL,
			nose - .03
		]));
		dark.push(bake(new BoxGeometry(spec.width * .46, .07, .05), [
			0,
			yL,
			nose + .01
		]));
	}
	const ty = spec.lower[spec.lower.length - 4][1] * .7;
	if (spec.lights === "blade" || spec.lights === "slim") rear.push(bake(new BoxGeometry(spec.width * .72, .06, .06), [
		0,
		ty,
		tail + .02
	]));
	else {
		const unit = new BoxGeometry(.28, .1, .07);
		rear.push(bake(unit, [
			-x,
			ty,
			tail + .02
		]));
		rear.push(bake(unit.clone(), [
			x,
			ty,
			tail + .02
		]));
	}
}
function addDetails(spec, body, dark, chrome) {
	const nose = spec.lower[0][0];
	const tail = spec.lower[spec.lower.length - 1][0];
	const belt = spec.lower[4][1];
	dark.push(bake(new BoxGeometry(spec.width * .7, .08, .06), [
		0,
		.22,
		nose - .01
	]));
	dark.push(bake(new BoxGeometry(spec.width * .55, .05, .16), [
		0,
		.16,
		tail + .02
	]));
	if (spec.splitter) body.push(bake(new BoxGeometry(spec.width * .92, .04, .28), [
		0,
		.09,
		nose + .08
	]));
	if (spec.diffuser) {
		dark.push(bake(new BoxGeometry(spec.width * .7, .1, .32), [
			0,
			.12,
			tail - .08
		]));
		for (const x of [
			-.18,
			0,
			.18
		]) dark.push(bake(new BoxGeometry(.03, .12, .28), [
			x,
			.14,
			tail - .06
		]));
	}
	if (spec.hoodScoop) {
		body.push(bake(new BoxGeometry(.42, .1, .55), [
			0,
			belt + .08,
			-.85
		]));
		dark.push(bake(new BoxGeometry(.32, .04, .22), [
			0,
			belt + .14,
			-.7
		]));
	}
	if (spec.intakes) {
		dark.push(bake(new BoxGeometry(.16, .22, .5), [
			spec.width * .48,
			.38,
			.15
		]));
		dark.push(bake(new BoxGeometry(.16, .22, .5), [
			-spec.width * .48,
			.38,
			.15
		]));
	}
	const mirrorArm = new BoxGeometry(.22, .04, .04);
	const mirrorGlass = new BoxGeometry(.16, .09, .06);
	const my = belt + .12;
	const mz = spec.cabin[0][0] + .08;
	const mx = spec.cabinW * .5 + .12;
	dark.push(bake(mirrorArm, [
		mx,
		my,
		mz
	]));
	dark.push(bake(mirrorArm.clone(), [
		-mx,
		my,
		mz
	]));
	dark.push(bake(mirrorGlass, [
		mx + .08,
		my,
		mz
	]));
	dark.push(bake(mirrorGlass.clone(), [
		-mx - .08,
		my,
		mz
	]));
	const handle = new BoxGeometry(.035, .025, .12);
	dark.push(bake(handle, [
		spec.cabinW * .5 + .02,
		belt + .02,
		.15
	]));
	dark.push(bake(handle.clone(), [
		-spec.cabinW * .5 - .02,
		belt + .02,
		.15
	]));
	if (spec.spoiler === "lip") body.push(bake(new BoxGeometry(spec.cabinW * .95, .05, .18), [
		0,
		spec.cabin[2][1] - .02,
		spec.cabin[3][0] + .08
	]));
	if (spec.spoiler === "wing" || spec.spoiler === "swan") {
		const y = spec.cabin[2][1] + (spec.spoiler === "swan" ? .18 : .08);
		const z = tail - .22;
		body.push(bake(new BoxGeometry(spec.width * .92, .05, .28), [
			0,
			y,
			z
		]));
		dark.push(bake(new BoxGeometry(.05, .22, .05), [
			-spec.width * .28,
			y - .12,
			z
		]));
		dark.push(bake(new BoxGeometry(.05, .22, .05), [
			spec.width * .28,
			y - .12,
			z
		]));
	}
	dark.push(bake(new CylinderGeometry(.045, .05, .16, 8).rotateX(Math.PI / 2), [
		spec.width * .22,
		.16,
		tail + .06
	]));
	dark.push(bake(new CylinderGeometry(.045, .05, .16, 8).rotateX(Math.PI / 2), [
		-spec.width * .22,
		.16,
		tail + .06
	]));
	if (spec.chrome) {
		chrome.push(bake(new BoxGeometry(spec.width * .88, .05, .08), [
			0,
			.26,
			nose - .01
		]));
		chrome.push(bake(new BoxGeometry(spec.width * .7, .04, .06), [
			0,
			.3,
			tail + .02
		]));
	}
	const c = spec.cabin;
	const aLen = Math.hypot(c[1][0] - c[0][0], c[1][1] - c[0][1]);
	const aPitch = Math.atan2(c[1][1] - c[0][1], c[1][0] - c[0][0]);
	const pillar = new BoxGeometry(.05, .05, aLen);
	const px = spec.cabinW * .47;
	const py = (c[0][1] + c[1][1]) / 2;
	const pz = (c[0][0] + c[1][0]) / 2;
	body.push(bake(pillar, [
		px,
		py,
		pz
	], [
		aPitch,
		0,
		0
	]));
	body.push(bake(pillar.clone(), [
		-px,
		py,
		pz
	], [
		aPitch,
		0,
		0
	]));
}
function makeWheel(spec, mats) {
	const g = new Group();
	const spin = new Group();
	spin.name = "spin";
	const tire = new Mesh(new CylinderGeometry(spec.wheelR, spec.wheelR, spec.wheelW, 16), mats.tire);
	tire.rotation.z = Math.PI / 2;
	const sidewall = new Mesh(new CylinderGeometry(spec.wheelR * .78, spec.wheelR * .78, spec.wheelW * 1.05, 14), mats.dark);
	sidewall.rotation.z = Math.PI / 2;
	const rim = new Mesh(new CylinderGeometry(spec.wheelR * .62, spec.wheelR * .62, spec.wheelW * .55, 14), mats.rim);
	rim.rotation.z = Math.PI / 2;
	const hub = new Mesh(new CylinderGeometry(.07, .07, spec.wheelW * .7, 10), mats.chrome);
	hub.rotation.z = Math.PI / 2;
	const disc = new Mesh(new CylinderGeometry(spec.wheelR * .48, spec.wheelR * .48, .04, 12), mats.disc);
	disc.rotation.z = Math.PI / 2;
	spin.add(tire, sidewall, rim, hub, disc);
	const spokes = 5;
	for (let i = 0; i < spokes; i++) {
		const sp = new Mesh(new BoxGeometry(.05, spec.wheelR * .9, .035), mats.rim);
		sp.rotation.x = i / spokes * Math.PI;
		spin.add(sp);
	}
	g.add(spin);
	return g;
}
function slopePanel(a, b, width, thick) {
	const dz = b[0] - a[0];
	const dy = b[1] - a[1];
	const geo = new BoxGeometry(width, thick, Math.hypot(dz, dy));
	const pitch = Math.atan2(dy, dz);
	return bake(geo, [
		0,
		(a[1] + b[1]) / 2,
		(a[0] + b[0]) / 2
	], [
		pitch,
		0,
		0
	]);
}
function bake(geo, pos, rot) {
	const g = geo.clone();
	const m = new Matrix4();
	const e = new Euler(rot?.[0] ?? 0, rot?.[1] ?? 0, rot?.[2] ?? 0);
	m.makeRotationFromEuler(e);
	m.setPosition(pos[0], pos[1], pos[2]);
	g.applyMatrix4(m);
	return g;
}
function mergeSafe(list) {
	const prepared = list.map((g) => {
		const src = g.index ? g.toNonIndexed() : g;
		const out = new BufferGeometry();
		out.setAttribute("position", src.getAttribute("position").clone());
		if (!src.getAttribute("normal")) src.computeVertexNormals();
		out.setAttribute("normal", src.getAttribute("normal").clone());
		if (src !== g) src.dispose();
		return out;
	});
	const merged = mergeGeometries(prepared, false);
	list.forEach((g) => g.dispose());
	prepared.forEach((g) => g.dispose());
	if (!merged) return new BufferGeometry();
	merged.computeVertexNormals();
	return merged;
}
var Input = class {
	keys = /* @__PURE__ */ new Set();
	injected = null;
	steerOverride = null;
	touch = {
		throttle: 0,
		brake: 0,
		steer: 0,
		handbrake: false,
		reset: false
	};
	pauseQueued = false;
	resetQueued = false;
	attach() {
		window.addEventListener("keydown", this.onDown);
		window.addEventListener("keyup", this.onUp);
		window.addEventListener("blur", this.onBlur);
		document.addEventListener("visibilitychange", this.onVis);
	}
	detach() {
		window.removeEventListener("keydown", this.onDown);
		window.removeEventListener("keyup", this.onUp);
		window.removeEventListener("blur", this.onBlur);
		document.removeEventListener("visibilitychange", this.onVis);
		this.keys.clear();
	}
	onDown = (e) => {
		if (e.repeat) {
			this.keys.add(e.code);
			return;
		}
		this.keys.add(e.code);
		if (e.code === "Escape") this.pauseQueued = true;
		if (e.code === "KeyR") this.resetQueued = true;
		const tag = e.target?.tagName;
		if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
		if ([
			"ArrowUp",
			"ArrowDown",
			"ArrowLeft",
			"ArrowRight",
			"Space"
		].includes(e.code)) e.preventDefault();
	};
	onUp = (e) => {
		this.keys.delete(e.code);
	};
	onBlur = () => this.keys.clear();
	onVis = () => {
		if (document.hidden) this.keys.clear();
	};
	has(code) {
		if (this.injected) return this.injected.includes(code);
		return this.keys.has(code);
	}
	setKeys(codes) {
		this.injected = codes;
	}
	clearInjected() {
		this.injected = null;
		this.steerOverride = null;
	}
	read() {
		const left = this.has("KeyA") || this.has("ArrowLeft");
		const right = this.has("KeyD") || this.has("ArrowRight");
		let steer = (left ? 1 : 0) + (right ? -1 : 0);
		steer += this.touch.steer;
		if (this.steerOverride != null) steer = this.steerOverride;
		steer = Math.max(-1, Math.min(1, steer));
		const throttle = this.has("KeyW") || this.has("ArrowUp") ? 1 : this.touch.throttle;
		const brake = this.has("KeyS") || this.has("ArrowDown") ? 1 : this.touch.brake;
		const handbrake = this.has("Space") || this.touch.handbrake;
		const reset = this.resetQueued || this.touch.reset;
		this.resetQueued = false;
		this.touch.reset = false;
		const pause = this.pauseQueued;
		this.pauseQueued = false;
		return {
			throttle,
			brake,
			steer,
			handbrake,
			reset,
			pause
		};
	}
};
function thinkAI(car, track, others, brain, dt, raceTime) {
	if (car.stuckTime > 1.8) {
		resetCar(car, track, false);
		car.stuckTime = 0;
	}
	if (car.wrongWay > 1.6) {
		resetCar(car, track, false);
		car.wrongWay = 0;
	}
	const look = 14 + car.speed * .55;
	car.aiLook += dt;
	if (car.aiLook > 1.4) {
		car.aiLook = 0;
		car.aiOffTarget = (hash(car.id + raceTime * .01) - .5) * 2.2 * (.4 + brain.aggression * .6);
	}
	car.aiOff += (car.aiOffTarget - car.aiOff) * Math.min(1, dt * 1.8);
	let block = 0;
	for (const o of others) {
		if (o.id === car.id || o.finished) continue;
		const dd = distForward(car.trackDist, o.trackDist, track.length);
		const lat = Math.hypot(o.x - car.x, o.z - car.z);
		if (dd > 2 && dd < 16 && lat < 6 && o.speed < car.speed * .92) {
			const side = Math.sign((o.x - car.x) * Math.cos(car.yaw) + (o.z - car.z) * -Math.sin(car.yaw) || 1);
			car.aiOffTarget = Math.max(-2.6, Math.min(2.6, car.aiOffTarget - side * (1.2 + brain.aggression)));
			if (dd < 7 && brain.aggression < .7) block = .35;
		}
	}
	const target = sampleAt(track, car.trackDist + look);
	const aimX = target.x + target.rx * car.aiOff;
	const aimZ = target.z + target.rz * car.aiOff;
	let err = wrapAngle(Math.atan2(-(aimX - car.x), -(aimZ - car.z)) - car.yaw);
	let kappa = 0;
	for (let d = 8; d <= 38; d += 6) {
		const s = sampleAt(track, car.trackDist + d);
		if (s.kappa > kappa) kappa = s.kappa;
	}
	const corner = Math.min(1, kappa * 22);
	const cap = car.stats.topSpeed * brain.speedScale * (1 - corner * (.42 - brain.skill * .12));
	let throttle = 1;
	let brake = 0;
	if (car.speed > cap) {
		throttle = .15;
		brake = Math.min(1, (car.speed - cap) * .18);
	}
	if (corner > .55 && car.speed > cap * .92) {
		brake = Math.max(brake, corner * .7);
		throttle = .05;
	}
	if (block) {
		throttle *= 1 - block;
		brake = Math.max(brake, block * .4);
	}
	if (hash(car.id * 17 + Math.floor(raceTime * 3)) < brain.mistakes * .02) {
		brake = Math.max(brake, .4);
		throttle *= .4;
	}
	const steer = Math.max(-1, Math.min(1, err * (1.6 + brain.skill)));
	const handbrake = corner > .72 && Math.abs(err) > .35 && car.speed > 16;
	return {
		throttle,
		brake,
		steer,
		handbrake
	};
}
function wrapAngle(a) {
	while (a > Math.PI) a -= Math.PI * 2;
	while (a < -Math.PI) a += Math.PI * 2;
	return a;
}
function hash(n) {
	const s = Math.sin(n * 12.9898) * 43758.5453;
	return s - Math.floor(s);
}
var DRIVERS = [
	{
		id: "yan",
		name: "阿焰",
		title: "紅區狂徒",
		color: "#ff5a2e",
		carId: "kestrel",
		skill: .62,
		aggression: .85,
		mistakes: .14,
		lineOffset: 1.6
	},
	{
		id: "bing",
		name: "冰雨",
		title: "冷靜線師",
		color: "#7ecbff",
		carId: "whale",
		skill: .78,
		aggression: .35,
		mistakes: .05,
		lineOffset: -1.1
	},
	{
		id: "zhou",
		name: "老周",
		title: "夜班修車王",
		color: "#c9a227",
		carId: "heron",
		skill: .7,
		aggression: .4,
		mistakes: .08,
		lineOffset: .8
	},
	{
		id: "cat",
		name: "霓虹貓",
		title: "外觀優先",
		color: "#e879f9",
		carId: "marten",
		skill: .58,
		aggression: .55,
		mistakes: .16,
		lineOffset: 2.1
	},
	{
		id: "tie",
		name: "鐵頭",
		title: "不會讓路",
		color: "#9aa3b5",
		carId: "ember",
		skill: .6,
		aggression: .7,
		mistakes: .1,
		lineOffset: -1.8
	},
	{
		id: "bei",
		name: "小北",
		title: "實習車手",
		color: "#86efac",
		carId: "skylark",
		skill: .48,
		aggression: .3,
		mistakes: .2,
		lineOffset: .4
	},
	{
		id: "ying",
		name: "影",
		title: "不留姓名",
		color: "#64748b",
		carId: "mako",
		skill: .8,
		aggression: .5,
		mistakes: .06,
		lineOffset: -.6
	},
	{
		id: "bai",
		name: "白澤",
		title: "銀線隊長",
		color: "#e8eef8",
		carId: "phantom",
		skill: .94,
		aggression: .65,
		mistakes: .03,
		lineOffset: .2
	}
];
var DRIVER_MAP = Object.fromEntries(DRIVERS.map((d) => [d.id, d]));
var STEP = 1 / 60;
function createSession(cfg) {
	const level = LEVEL_MAP[cfg.levelId];
	const track = buildTrack(level.trackId, level.reverse);
	const save = cfg.save;
	const field = 8;
	const cars = [];
	const brains = /* @__PURE__ */ new Map();
	const pCar = CAR_MAP[save.selectedCar];
	const pPaint = save.cars[save.selectedCar].paint;
	const pUp = save.cars[save.selectedCar].upgrades;
	const player = spawnCar(track, level.playerGrid, field, {
		id: 0,
		name: "林昊",
		isPlayer: true,
		isRival: false,
		color: pPaint.body,
		rim: pPaint.rim,
		metalness: pPaint.metalness,
		style: pCar.style,
		stats: effectiveStats(pCar, pUp),
		aiLook: 0,
		aiOff: 0,
		aiOffTarget: 0
	});
	cars.push(player);
	const used = /* @__PURE__ */ new Set([level.featuredRival ?? ""]);
	const pool = DRIVERS.filter((d) => d.id !== "bai" || level.featuredRival === "bai");
	const picks = [];
	if (level.featuredRival && DRIVER_MAP[level.featuredRival]) picks.push(DRIVER_MAP[level.featuredRival]);
	for (const d of pool) {
		if (picks.length >= 7) break;
		if (used.has(d.id) || picks.some((p) => p.id === d.id)) continue;
		picks.push(d);
	}
	while (picks.length < 7) picks.push(DRIVERS[picks.length % DRIVERS.length]);
	let slot = 0;
	for (let i = 0; i < 7; i++) {
		if (slot === level.playerGrid) slot++;
		const d = picks[i];
		const def = CAR_MAP[d.carId];
		const up = emptyUpgrades();
		const lv = Math.round(level.aiSkill * 3);
		Object.keys(up).forEach((k) => {
			up[k] = Math.max(0, Math.min(3, lv - (k === "tires" ? 0 : 1)));
		});
		const stats = effectiveStats(def, up);
		stats.topSpeed *= .9 + level.aiSpeed * .12;
		stats.accel *= .88 + level.aiSkill * .16;
		const car = spawnCar(track, slot, field, {
			id: i + 1,
			name: d.name,
			isPlayer: false,
			isRival: d.id === level.featuredRival,
			color: d.color,
			rim: "#d9dee8",
			metalness: .45,
			style: def.style,
			stats,
			aiLook: i * .2,
			aiOff: d.lineOffset,
			aiOffTarget: d.lineOffset
		});
		cars.push(car);
		brains.set(car.id, {
			skill: Math.min(.98, d.skill * .5 + level.aiSkill * .55),
			aggression: d.aggression,
			mistakes: Math.max(.02, d.mistakes * (1.35 - level.aiSkill * .5)),
			speedScale: .72 + level.aiSpeed * .28
		});
		slot++;
	}
	return {
		track,
		cars,
		brains,
		levelId: cfg.levelId,
		laps: level.laps,
		weatherGrip: level.weather === "rain" ? .82 : 1,
		time: 0,
		countdown: 3.2,
		goFlash: 0,
		started: false,
		over: false,
		paused: false,
		token: `${cfg.levelId}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
		playerId: 0,
		field
	};
}
function stepSession(session, playerInput, dt) {
	if (session.paused || session.over) return;
	if (!session.started) {
		session.countdown -= dt;
		if (session.countdown <= 0) {
			session.started = true;
			session.countdown = 0;
			session.goFlash = .8;
		}
	} else {
		session.time += dt;
		session.goFlash = Math.max(0, session.goFlash - dt);
	}
	const frozen = !session.started;
	const player = session.cars.find((c) => c.isPlayer);
	for (const car of session.cars) {
		let input;
		if (car.isPlayer) {
			input = frozen ? {
				throttle: 0,
				brake: 1,
				steer: 0,
				handbrake: false
			} : playerInput;
			if (playerInput.reset && !frozen) resetCar(car, session.track, true);
		} else {
			const brain = session.brains.get(car.id);
			input = frozen ? {
				throttle: 0,
				brake: 1,
				steer: 0,
				handbrake: false
			} : thinkAI(car, session.track, session.cars, brain, dt, session.time);
		}
		stepCar(car, session.track, input, dt, session.weatherGrip, frozen);
		if (!frozen) {
			car.currentLap += dt;
			if (car.laps === 0 && car.passedInLap === 0) car.lapStart = session.time;
		}
		maybeFinish(car, session.laps, session.time);
	}
	for (let i = 0; i < session.cars.length; i++) for (let j = i + 1; j < session.cars.length; j++) collideCars(session.cars[i], session.cars[j]);
	sortField(session.cars, session.track, session.laps);
	if (player.finished && !session.over) {
		const allDone = session.cars.every((c) => c.finished);
		const waited = session.time - (player.finishTime ?? 0) > 12;
		if (allDone || waited) session.over = true;
	}
}
function forceFinish(session, playerPlace) {
	const player = session.cars.find((c) => c.isPlayer);
	session.started = true;
	session.countdown = 0;
	session.over = true;
	const t = Math.max(session.time, 20);
	session.time = t;
	player.finished = true;
	player.laps = session.laps;
	player.finishTime = t;
	player.place = Math.max(1, Math.min(8, playerPlace));
	session.cars.filter((c) => !c.isPlayer).forEach((c, i) => {
		c.finished = true;
		c.laps = session.laps;
		const place = i + 1 >= player.place ? i + 2 : i + 1;
		c.place = place;
		c.finishTime = t + (place - player.place) * 1.7;
	});
	session.cars.sort((a, b) => a.place - b.place);
}
function buildLiveResult(session) {
	const level = LEVEL_MAP[session.levelId];
	const player = session.cars.find((c) => c.isPlayer);
	const stars = starChecks(level, {
		finished: player.finished,
		place: player.place,
		collisions: player.collisions,
		resets: player.resets,
		bestLap: player.bestLap
	});
	return {
		token: session.token,
		levelId: session.levelId,
		place: player.place,
		totalTime: player.finishTime ?? session.time,
		bestLap: player.bestLap,
		collisions: player.collisions,
		resets: player.resets,
		driftMeters: player.driftMeters,
		topSpeedKmh: player.topSpeed * 3.6,
		finished: player.finished,
		standings: standingsOf(session.cars),
		newStars: stars
	};
}
function buildWorld(track, time, quality) {
	const group = new Group();
	const pal = palette(track.theme, time);
	const ground = new Mesh(new CircleGeometry(520, 32), new MeshStandardMaterial({
		color: pal.ground,
		roughness: 1
	}));
	ground.rotation.x = -Math.PI / 2;
	ground.position.y = -.6;
	ground.receiveShadow = true;
	group.add(ground);
	group.add(buildRoad(track, pal));
	group.add(buildWalls(track, pal));
	group.add(buildStartLine(track));
	if (track.theme === "harbor") group.add(buildHarbor(track, pal, quality));
	if (track.theme === "city") group.add(buildCity(track, pal, quality));
	if (track.theme === "mountain") group.add(buildMountain(track, pal, quality));
	const lamps = new Group();
	if (time === "night" || time === "storm") lamps.add(buildLamps(track, quality === "high" ? 28 : 14));
	group.add(lamps);
	const hemi = new HemisphereLight(pal.sky, pal.ground, pal.hemi);
	const sun = new DirectionalLight(pal.sun, pal.sunInt);
	sun.position.set(pal.sunPos[0], pal.sunPos[1], pal.sunPos[2]);
	sun.castShadow = false;
	let rain = null;
	if (time === "storm") {
		const n = quality === "high" ? 900 : 400;
		const pos = new Float32Array(n * 3);
		for (let i = 0; i < n; i++) {
			pos[i * 3] = (Math.random() - .5) * 220;
			pos[i * 3 + 1] = Math.random() * 40;
			pos[i * 3 + 2] = (Math.random() - .5) * 220;
		}
		const geo = new BufferGeometry();
		geo.setAttribute("position", new BufferAttribute(pos, 3));
		rain = new Points(geo, new PointsMaterial({
			color: "#9ab0c8",
			size: .18,
			transparent: true,
			opacity: .55
		}));
		group.add(rain);
	}
	return {
		group,
		lamps,
		sun,
		hemi,
		rain
	};
}
function buildRoad(track, pal) {
	const s = track.samples;
	const n = s.length;
	const hw = track.halfWidth;
	const pos = [];
	const nrm = [];
	const uv = [];
	const idx = [];
	for (let i = 0; i < n; i++) {
		const a = s[i];
		s[(i + 1) % n];
		const i0 = i * 2;
		pos.push(a.x - a.rx * hw, a.y, a.z - a.rz * hw, a.x + a.rx * hw, a.y, a.z + a.rz * hw);
		nrm.push(0, 1, 0, 0, 1, 0);
		uv.push(0, a.dist * .12, 1, a.dist * .12);
		const i1 = (i + 1) % n * 2;
		idx.push(i0, i1, i0 + 1, i0 + 1, i1, i1 + 1);
	}
	const geo = new BufferGeometry();
	geo.setAttribute("position", new Float32BufferAttribute(pos, 3));
	geo.setAttribute("normal", new Float32BufferAttribute(nrm, 3));
	geo.setAttribute("uv", new Float32BufferAttribute(uv, 2));
	geo.setIndex(idx);
	const mesh = new Mesh(geo, new MeshStandardMaterial({
		color: pal.road,
		roughness: .82,
		metalness: .05
	}));
	mesh.receiveShadow = true;
	const g = new Group();
	g.add(mesh);
	const stripe = buildStripes(track);
	g.add(stripe);
	return g;
}
function buildStripes(track) {
	const s = track.samples;
	const n = s.length;
	const pos = [];
	const idx = [];
	let vi = 0;
	for (let i = 0; i < n; i++) {
		if (Math.floor(s[i].dist / 4) % 2 === 0) continue;
		const a = s[i];
		const b = s[(i + 1) % n];
		const w = .12;
		pos.push(a.x - a.rx * w, a.y + .02, a.z - a.rz * w, a.x + a.rx * w, a.y + .02, a.z + a.rz * w, b.x - b.rx * w, b.y + .02, b.z - b.rz * w, b.x + b.rx * w, b.y + .02, b.z + b.rz * w);
		idx.push(vi, vi + 2, vi + 1, vi + 1, vi + 2, vi + 3);
		vi += 4;
	}
	const geo = new BufferGeometry();
	geo.setAttribute("position", new Float32BufferAttribute(pos, 3));
	geo.setIndex(idx);
	geo.computeVertexNormals();
	return new Mesh(geo, new MeshBasicMaterial({ color: "#e8edf5" }));
}
function buildWalls(track, pal) {
	const g = new Group();
	const s = track.samples;
	const n = s.length;
	const hw = track.halfWidth + .15;
	const h = 1.15;
	for (const side of [-1, 1]) {
		const pos = [];
		const idx = [];
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
		const geo = new BufferGeometry();
		geo.setAttribute("position", new Float32BufferAttribute(pos, 3));
		geo.setIndex(idx);
		geo.computeVertexNormals();
		const col = side > 0 ? pal.wallA : pal.wallB;
		g.add(new Mesh(geo, new MeshStandardMaterial({
			color: col,
			roughness: .7
		})));
	}
	return g;
}
function buildStartLine(track) {
	const sm = track.samples[0];
	const w = track.halfWidth;
	const geo = new PlaneGeometry(w * 2, 2.2);
	geo.rotateX(-Math.PI / 2);
	const mesh = new Mesh(geo, new MeshBasicMaterial({ color: "#eef1f6" }));
	mesh.position.set(sm.x, sm.y + .03, sm.z);
	mesh.rotation.y = Math.atan2(sm.tx, sm.tz);
	return mesh;
}
function buildHarbor(track, pal, quality) {
	const g = new Group();
	const water = new Mesh(new CircleGeometry(280, 24), new MeshStandardMaterial({
		color: "#123044",
		metalness: .4,
		roughness: .35
	}));
	water.rotation.x = -Math.PI / 2;
	water.position.set(40, -.45, 40);
	g.add(water);
	const box = new BoxGeometry(10, 8, 18);
	const mat = new MeshStandardMaterial({
		color: pal.building,
		roughness: .9
	});
	const count = quality === "high" ? 18 : 10;
	for (let i = 0; i < count; i++) {
		const m = new Mesh(box, mat);
		const a = i / count * Math.PI * 2;
		m.position.set(Math.cos(a) * 175, 3.5, Math.sin(a) * 175);
		m.scale.set(1 + i % 3 * .4, .6 + i % 4 * .5, 1);
		g.add(m);
	}
	return g;
}
function buildCity(track, pal, quality) {
	const g = new Group();
	const geo = new BoxGeometry(1, 1, 1);
	const mats = [new MeshStandardMaterial({
		color: pal.building,
		roughness: .85
	}), new MeshStandardMaterial({
		color: "#1a2230",
		roughness: .7,
		emissive: "#1a3040",
		emissiveIntensity: .3
	})];
	const count = quality === "high" ? 55 : 28;
	for (let i = 0; i < count; i++) {
		const m = new Mesh(geo, mats[i % 2]);
		const a = i / count * Math.PI * 2 + i * .3;
		const r = 155 + i % 5 * 18;
		const h = 8 + i % 7 * 6;
		m.position.set(Math.cos(a) * r, h / 2, Math.sin(a) * r);
		m.scale.set(8 + i % 4 * 2, h, 8 + i * 3 % 4 * 2);
		g.add(m);
	}
	return g;
}
function buildMountain(track, pal, quality) {
	const g = new Group();
	const rock = new MeshStandardMaterial({
		color: pal.building,
		roughness: 1
	});
	const count = quality === "high" ? 22 : 12;
	for (let i = 0; i < count; i++) {
		const m = new Mesh(new ConeGeometry(10 + i % 5 * 3, 18 + i % 4 * 8, 5), rock);
		const a = i / count * Math.PI * 2;
		m.position.set(Math.cos(a) * 200, 6, Math.sin(a) * 200);
		g.add(m);
	}
	const treeMat = new MeshStandardMaterial({ color: "#163022" });
	const trunkMat = new MeshStandardMaterial({ color: "#2a1c12" });
	const tn = quality === "high" ? 40 : 18;
	for (let i = 0; i < tn; i++) {
		const t = new Group();
		const trunk = new Mesh(new CylinderGeometry(.25, .3, 2, 5), trunkMat);
		const cone = new Mesh(new ConeGeometry(1.4, 3.2, 6), treeMat);
		trunk.position.y = 1;
		cone.position.y = 3.1;
		t.add(trunk, cone);
		const a = i * .7;
		t.position.set(Math.cos(a) * 165, 0, Math.sin(a) * 165);
		g.add(t);
	}
	return g;
}
function buildLamps(track, count) {
	const g = new Group();
	const poleMat = new MeshStandardMaterial({ color: "#2a3038" });
	const bulbMat = new MeshStandardMaterial({
		color: "#ffe8a8",
		emissive: "#ffd27a",
		emissiveIntensity: 1.4
	});
	const step = Math.max(1, Math.floor(track.samples.length / count));
	for (let i = 0; i < track.samples.length; i += step) {
		const s = track.samples[i];
		const pole = new Mesh(new CylinderGeometry(.08, .1, 4.2, 5), poleMat);
		const bulb = new Mesh(new SphereGeometry(.22, 6, 6), bulbMat);
		const x = s.x + s.rx * (track.halfWidth + 1.4);
		const z = s.z + s.rz * (track.halfWidth + 1.4);
		pole.position.set(x, s.y + 2.1, z);
		bulb.position.set(x, s.y + 4.3, z);
		g.add(pole, bulb);
	}
	return g;
}
function palette(theme, time) {
	if (time === "night") return {
		ground: "#0b1018",
		road: "#2a3140",
		wallA: "#d4556a",
		wallB: "#eef1f6",
		building: "#151c28",
		sky: "#1a2a44",
		sun: "#8eb4ff",
		sunInt: .35,
		hemi: .28,
		sunPos: [
			40,
			80,
			20
		],
		fog: "#070b12",
		fogNear: 40,
		fogFar: 260
	};
	if (time === "storm") return {
		ground: "#12161c",
		road: "#262c36",
		wallA: "#c94b5e",
		wallB: "#cfd6e0",
		building: "#1a2028",
		sky: "#4a5868",
		sun: "#9aa8b8",
		sunInt: .25,
		hemi: .22,
		sunPos: [
			20,
			90,
			10
		],
		fog: "#1a222c",
		fogNear: 20,
		fogFar: 180
	};
	if (time === "dusk") return {
		ground: "#1a1410",
		road: "#35323a",
		wallA: "#e06a4f",
		wallB: "#f0e6d8",
		building: "#2a2220",
		sky: "#ffb08a",
		sun: "#ffb070",
		sunInt: .7,
		hemi: .45,
		sunPos: [
			-60,
			30,
			20
		],
		fog: "#2a1814",
		fogNear: 50,
		fogFar: 320
	};
	return {
		ground: theme === "harbor" ? "#1d3a28" : "#1c2a1c",
		road: "#3a414c",
		wallA: "#e24b62",
		wallB: "#f4f6fa",
		building: "#4a5564",
		sky: "#9ecfff",
		sun: "#fff4d6",
		sunInt: 1.15,
		hemi: .65,
		sunPos: [
			80,
			120,
			40
		],
		fog: "#b8d4ee",
		fogNear: 80,
		fogFar: 420
	};
}
function skyFog(time, theme) {
	return palette(theme, time);
}
var RaceEngine = class {
	renderer;
	scene;
	camera;
	session;
	input = new Input();
	audio;
	hooks;
	carMeshes = /* @__PURE__ */ new Map();
	world = null;
	camPos = new Vector3();
	look = new Vector3();
	running = false;
	acc = 0;
	last = 0;
	raf = 0;
	lastCd = 4;
	finishedSent = false;
	disposed = false;
	quality;
	shadows;
	save;
	canvas;
	shake = 0;
	constructor(canvas, save, levelId, audio, hooks) {
		this.canvas = canvas;
		this.save = save;
		this.audio = audio;
		this.hooks = hooks;
		this.quality = save.settings.quality;
		this.shadows = save.settings.shadows;
		this.session = createSession({
			levelId,
			save
		});
		this.renderer = new WebGLRenderer({
			canvas,
			antialias: this.quality === "high",
			alpha: false,
			powerPreference: "high-performance",
			preserveDrawingBuffer: true
		});
		this.renderer.setPixelRatio(this.quality === "high" ? Math.min(window.devicePixelRatio || 1, 1.6) : 1);
		this.renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight, false);
		this.renderer.outputColorSpace = SRGBColorSpace;
		this.renderer.toneMapping = 4;
		this.renderer.toneMappingExposure = 1.05;
		this.renderer.shadowMap.enabled = this.shadows;
		this.scene = new Scene();
		const level = LEVEL_MAP[levelId];
		const fog = skyFog(level.timeOfDay, this.session.track.theme);
		this.renderer.setClearColor(new Color(fog.fog), 1);
		this.scene.background = new Color(fog.fog);
		this.scene.fog = new Fog(fog.fog, fog.fogNear, fog.fogFar);
		this.camera = new PerspectiveCamera(68, 1, .1, 700);
		this.build();
		this.input.attach();
		this.resize();
		window.addEventListener("resize", this.resize);
		this.exposeQa();
	}
	build() {
		const level = LEVEL_MAP[this.session.levelId];
		this.world = buildWorld(this.session.track, level.timeOfDay, this.quality);
		this.scene.add(this.world.group);
		this.scene.add(this.world.hemi);
		this.scene.add(this.world.sun);
		this.scene.add(new AmbientLight(16777215, .28));
		this.scene.environment = createShowroomEnv(this.renderer);
		this.scene.environmentIntensity = .45;
		if (this.shadows) {
			this.world.sun.castShadow = true;
			this.world.sun.shadow.mapSize.set(1024, 1024);
		}
		for (const car of this.session.cars) {
			const mesh = createCarMesh(car.style, {
				body: car.color,
				rim: car.rim,
				metalness: car.metalness
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
		return this.session.cars.find((c) => c.isPlayer);
	}
	start() {
		if (this.running) return;
		this.running = true;
		this.last = performance.now();
		this.audio.startEngine();
		const loop = (now) => {
			if (!this.running || this.disposed) return;
			this.raf = requestAnimationFrame(loop);
			let dt = (now - this.last) / 1e3;
			this.last = now;
			if (dt > .1) dt = .1;
			if (this.session.paused) {
				this.render();
				this.pushHud();
				return;
			}
			this.acc += dt;
			let steps = 0;
			const inp = this.input.read();
			if (inp.pause && this.session.started && !this.session.over) this.session.paused = true;
			while (this.acc >= .016666666666666666 && steps < 5) {
				const prevCol = this.player().collisions;
				stepSession(this.session, inp, STEP);
				if (this.player().collisions > prevCol) {
					this.shake = Math.min(.7, this.shake + .38);
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
	afterSim(dt) {
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
		this.audio.updateEngine(this.player().speed, this.player().throttle, this.session.started && !this.session.over);
		if (this.world?.rain) {
			const pos = this.world.rain.geometry.getAttribute("position");
			const p = this.player();
			for (let i = 0; i < pos.count; i++) {
				let y = pos.getY(i) - 18 * dt;
				if (y < 0) y = 28;
				pos.setXYZ(i, p.x + i * 17 % 200 - 100, y, p.z + i * 31 % 200 - 100);
			}
			pos.needsUpdate = true;
		}
	}
	syncMesh(car, mesh, dt) {
		mesh.position.set(car.x, car.y, car.z);
		mesh.rotation.y = car.yaw;
		const chassis = mesh.userData.chassis;
		if (chassis) {
			const roll = -car.steer * Math.min(.14, .035 + car.speed * .0035);
			const pitch = car.throttle * .035 - (car.speed > 2 && car.throttle < .05 ? .02 : 0);
			chassis.rotation.z = MathUtils.lerp(chassis.rotation.z, roll, 1 - Math.exp(-dt * 8));
			chassis.rotation.x = MathUtils.lerp(chassis.rotation.x, pitch, 1 - Math.exp(-dt * 7));
		}
		spinWheels(mesh, car.speed, car.steer, dt);
	}
	followCam(dt) {
		const p = this.player();
		const fx = -Math.sin(p.yaw);
		const fz = -Math.cos(p.yaw);
		const rx = Math.cos(p.yaw);
		const rz = -Math.sin(p.yaw);
		const dist = 9.4 + Math.min(3.6, p.speed * .07);
		const height = 3.55 + Math.min(1.05, p.speed * .018);
		const lean = p.steer * Math.min(1.6, p.speed * .05);
		this.camPos.set(p.x - fx * dist + rx * lean, p.y + height, p.z - fz * dist + rz * lean);
		this.shake *= Math.exp(-dt * 6);
		this.camera.position.lerp(this.camPos, 1 - Math.exp(-dt * 7));
		this.camera.position.x += (Math.random() - .5) * this.shake;
		this.camera.position.y += (Math.random() - .5) * this.shake * .5;
		this.look.set(p.x + fx * 11 + rx * lean * 1.4, p.y + 1.05, p.z + fz * 11 + rz * lean * 1.4);
		this.camera.lookAt(this.look);
		const fov = 62 + Math.min(16, p.speed * .26);
		if (Math.abs(this.camera.fov - fov) > .2) {
			this.camera.fov = fov;
			this.camera.updateProjectionMatrix();
		}
	}
	render() {
		this.renderer.render(this.scene, this.camera);
	}
	pushHud() {
		const p = this.player();
		const level = LEVEL_MAP[this.session.levelId];
		const loop = this.session.track.samples.filter((_, i) => i % 6 === 0).map((s) => ({
			x: s.x,
			z: s.z
		}));
		const ahead = this.session.cars.find((c) => c.place === p.place - 1);
		let gapText = "領先";
		if (ahead) {
			const len = this.session.track.length;
			const gapS = Math.max(.5, (ahead.laps - p.laps) * len + (ahead.trackDist - p.trackDist) + (ahead.laps < p.laps ? len : 0)) / Math.max(10, p.speed);
			gapText = `${ahead.name}  +${gapS.toFixed(2)}s`;
		} else if (p.place !== 1) gapText = null;
		const hud = {
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
			wrongWay: p.wrongWay > .45,
			finished: p.finished,
			paused: this.session.paused,
			minimap: this.session.cars.map((c) => ({
				x: c.x,
				z: c.z,
				isPlayer: c.isPlayer,
				isRival: c.isRival
			})),
			trackLoop: loop,
			objectives: [
				"完賽",
				`前 ${level.star2Place} 名`,
				level.star3.label
			],
			hint: p.wrongWay > .45 ? "逆向！請掉頭" : p.offTrack ? "四輪離地！回跑道" : this.session.started ? null : "倒數結束前無法起步",
			gapText,
			offTrack: p.offTrack
		};
		this.hooks.onHud(hud);
	}
	setPaused(v) {
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
			const m = obj;
			if (m.geometry) m.geometry.dispose();
			const mat = m.material;
			if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
			else if (mat) mat.dispose();
		});
		this.renderer.dispose();
		delete window.__controlsTest;
		delete window.__qa;
	}
	exposeQa() {
		const self = this;
		window.__controlsTest = {
			getYaw: () => self.player().yaw,
			getSpeed: () => self.player().speed,
			setSteer: (v) => {
				self.input.steerOverride = v;
			},
			setKeys: (codes) => self.input.setKeys(codes)
		};
		window.__qa = {
			getRace: () => ({
				time: self.session.time,
				started: self.session.started,
				over: self.session.over,
				cars: self.session.cars.map((c) => ({
					name: c.name,
					lap: c.laps,
					cp: c.nextCp,
					dist: c.trackDist,
					speed: c.speed,
					place: c.place,
					finished: c.finished,
					x: c.x,
					z: c.z
				}))
			}),
			skipCountdown: () => {
				self.session.countdown = 0;
				self.session.started = true;
				self.session.goFlash = .4;
			},
			finishAt: (place) => {
				forceFinish(self.session, place);
				if (!self.finishedSent) {
					self.finishedSent = true;
					self.hooks.onFinish(buildLiveResult(self.session));
				}
			},
			resetPlayer: () => {
				resetCar(self.player(), self.session.track, true);
			}
		};
	}
};
function previewCar(canvas, style, paint) {
	const renderer = new WebGLRenderer({
		canvas,
		antialias: true,
		alpha: true
	});
	renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
	renderer.setSize(canvas.clientWidth || 320, canvas.clientHeight || 200, false);
	renderer.outputColorSpace = SRGBColorSpace;
	renderer.toneMapping = 4;
	renderer.toneMappingExposure = 1.15;
	const scene = new Scene();
	scene.environment = createShowroomEnv(renderer);
	scene.environmentIntensity = .9;
	scene.add(new HemisphereLight(14216447, 1711138, .7));
	const key = new DirectionalLight(16777215, 1.35);
	key.position.set(3.2, 5.5, 4.5);
	scene.add(key);
	const rim = new DirectionalLight(8050640, .55);
	rim.position.set(-4, 2.4, -3);
	scene.add(rim);
	const fill = new DirectionalLight(16770760, .35);
	fill.position.set(-2, 3, 5);
	scene.add(fill);
	const floor = new Mesh(new CircleGeometry(5.5, 36), new MeshStandardMaterial({
		color: 1316896,
		metalness: .35,
		roughness: .45
	}));
	floor.rotation.x = -Math.PI / 2;
	scene.add(floor);
	const mesh = createCarMesh(style, paint);
	scene.add(mesh);
	const cam = new PerspectiveCamera(36, 1.6, .1, 50);
	cam.position.set(3.55, 1.22, 4.35);
	cam.lookAt(0, .42, -.15);
	let raf = 0;
	let live = true;
	const loop = () => {
		if (!live) return;
		raf = requestAnimationFrame(loop);
		mesh.rotation.y += .008;
		renderer.render(scene, cam);
	};
	loop();
	return {
		setPaint(p) {
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
			scene.environment?.dispose();
			renderer.dispose();
		}
	};
}
//#endregion
export { RaceEngine, previewCar };
