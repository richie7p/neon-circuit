import { i as __toESM } from "../_runtime.mjs";
import { I as require_jsx_runtime, L as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Settings } from "../_libs/lucide-react.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BVTIeHSY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var LEVELS = [
	{
		id: "l1-harbor",
		index: 1,
		name: "港口熱身",
		subtitle: "港灣迴環 · 日間 · 2 圈",
		trackId: "harbor",
		reverse: false,
		laps: 2,
		timeOfDay: "day",
		weather: "clear",
		aiSkill: .55,
		aiSpeed: .78,
		playerGrid: 7,
		prize: 2800,
		star2Place: 3,
		star3: {
			id: "no-reset",
			label: "完賽且不使用重置",
			hint: "中途不要按 R 重置車輛"
		},
		unlock: {},
		intro: [
			"que:港灣那組業餘賽缺人。雲雀夠用，別想太多。",
			"hao:我還沒正式比過。",
			"que:所以才叫熱身。油門是勇，剎車是命。"
		],
		outroWin: ["que:還行。名次先記著，錢才是能改車的東西。"],
		outroLose: ["que:沒關係，港灣還會再辦。先把彎前剎車練熟。"]
	},
	{
		id: "l2-harbor-rev",
		index: 2,
		name: "黃昏逆走",
		subtitle: "港灣迴環逆向 · 黃昏 · 3 圈",
		trackId: "harbor",
		reverse: true,
		laps: 3,
		timeOfDay: "dusk",
		weather: "clear",
		aiSkill: .64,
		aiSpeed: .86,
		playerGrid: 7,
		prize: 3600,
		star2Place: 3,
		star3: {
			id: "clean",
			label: "碰撞少於 3 次並完賽",
			hint: "少撞牆、少撞車"
		},
		maxCollisions: 2,
		unlock: { prev: "l1-harbor" },
		intro: [
			"que:同一條港灣，反向跑。你會發現昨天的加速點全是陷阱。",
			"hao:他們為什麼要逆向？",
			"que:因為觀眾愛看人迷路。"
		],
		outroWin: ["yan:嘿，菜鳥還挺能跟。下次城裡見。"],
		outroLose: ["que:逆向最怕猜彎。下次早點收油。"]
	},
	{
		id: "l3-downtown",
		index: 3,
		name: "夜城街賽",
		subtitle: "城芯街道 · 夜晚 · 3 圈",
		trackId: "downtown",
		reverse: false,
		laps: 3,
		timeOfDay: "night",
		weather: "clear",
		aiSkill: .72,
		aiSpeed: .92,
		playerGrid: 6,
		prize: 4800,
		star2Place: 3,
		star3: {
			id: "lap",
			label: "最佳圈速低於 42 秒",
			hint: "做出一圈乾淨的快圈"
		},
		targetLap: 42,
		unlock: {
			prev: "l2-harbor-rev",
			stars: 2
		},
		intro: [
			"que:城芯是銀線的地盤。別跟車燈比帥，跟路線比準。",
			"cat:新面孔？外觀先過關再說。",
			"hao:……我是來比賽的。"
		],
		outroWin: ["que:冰雨剛才在看你。她不看廢物。"],
		outroLose: ["que:街角別貪。寬度只有港灣的三分之二。"]
	},
	{
		id: "l4-downtown-rain",
		index: 4,
		name: "雨夜逆襲",
		subtitle: "城芯街道逆向 · 暴雨 · 3 圈",
		trackId: "downtown",
		reverse: true,
		laps: 3,
		timeOfDay: "storm",
		weather: "rain",
		aiSkill: .78,
		aiSpeed: .95,
		playerGrid: 6,
		prize: 5600,
		star2Place: 2,
		star3: {
			id: "no-reset-top3",
			label: "不重置且進入前三",
			hint: "雨戰盡量用油門修方向，少按 R"
		},
		unlock: { prev: "l3-downtown" },
		intro: [
			"que:雨會把抓地吃掉一截。鐵鯨這種重車今晚會很煩。",
			"tie:讓路。我看不清。",
			"hao:那你就減速。"
		],
		outroWin: ["ying:還可以。山道見。"],
		outroLose: ["que:雨地別點死油。滑了就早點回正。"]
	},
	{
		id: "l5-ridge",
		index: 5,
		name: "山道試煉",
		subtitle: "雲脊山道 · 黎明 · 4 圈",
		trackId: "ridge",
		reverse: false,
		laps: 4,
		timeOfDay: "dusk",
		weather: "clear",
		aiSkill: .86,
		aiSpeed: 1,
		featuredRival: "ying",
		playerGrid: 5,
		prize: 7200,
		star2Place: 2,
		star3: {
			id: "lap",
			label: "最佳圈速低於 48 秒",
			hint: "髮夾彎要早剎車"
		},
		targetLap: 48,
		unlock: {
			prev: "l4-downtown-rain",
			stars: 4
		},
		intro: [
			"que:白澤會派人來量你。雲脊沒有護欄能原諒你。",
			"ying:隊長說，讓你活著跑完。",
			"hao:那我爭取跑在前面。"
		],
		outroWin: ["que:他開始把你當對手了。去車庫把車摸到亮。"],
		outroLose: ["que:山道吃的是節奏。再練，別急著買最快的車。"]
	},
	{
		id: "l6-finale",
		index: 6,
		name: "銀線終局",
		subtitle: "雲脊山道逆向 · 夜戰 · 4 圈",
		trackId: "ridge",
		reverse: true,
		laps: 4,
		timeOfDay: "night",
		weather: "clear",
		aiSkill: .95,
		aiSpeed: 1.08,
		featuredRival: "bai",
		playerGrid: 4,
		prize: 9800,
		star2Place: 2,
		star3: {
			id: "win-clean",
			label: "第一名且碰撞少於 4 次",
			hint: "贏，而且別把車撞爛"
		},
		maxCollisions: 3,
		unlock: {
			prev: "l5-ridge",
			stars: 5
		},
		intro: [
			"bai:民間車手也能爬到這裡。少見。",
			"hao:我不是來參觀的。",
			"bai:那就把燈關掉。跟著我的尾燈，或者超過它。",
			"que:林昊。這台車跟你一起從零件堆走出來。去把終點撕開。"
		],
		outroWin: ["bai:銀線會記得這個名字。下次別只帶一台車來。", "que:哈。第一章，過了。錢先入帳，車再長。"],
		outroLose: ["bai:還差一口氣。回去改車，我還在這條山脊上。", "que:沒被甩出跑道就算資格賽通過。再來。"]
	}
];
var LEVEL_MAP = Object.fromEntries(LEVELS.map((l) => [l.id, l]));
function pts(list) {
	return list.map(([x, z, y]) => ({
		x,
		y: y ?? 0,
		z
	}));
}
var TRACKS = {
	harbor: {
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
			[-22, -118]
		])
	},
	downtown: {
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
			[-18, -98]
		])
	},
	ridge: {
		id: "ridge",
		name: "雲脊山道",
		nameEn: "Cloud Ridge",
		width: 11.2,
		theme: "mountain",
		points: pts([
			[
				0,
				-140,
				0
			],
			[
				50,
				-148,
				2
			],
			[
				110,
				-130,
				6
			],
			[
				150,
				-82,
				10
			],
			[
				158,
				-20,
				14
			],
			[
				132,
				36,
				18
			],
			[
				78,
				70,
				22
			],
			[
				20,
				86,
				20
			],
			[
				-24,
				64,
				16
			],
			[
				-18,
				18,
				12
			],
			[
				-50,
				-8,
				10
			],
			[
				-110,
				8,
				14
			],
			[
				-156,
				48,
				18
			],
			[
				-188,
				20,
				14
			],
			[
				-176,
				-40,
				8
			],
			[
				-140,
				-96,
				4
			],
			[
				-72,
				-132,
				1
			],
			[
				-20,
				-140,
				0
			]
		])
	}
};
function catmull(p0, p1, p2, p3, t) {
	const t2 = t * t;
	const t3 = t2 * t;
	return .5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}
function lerpPts(pts, reverse) {
	return reverse ? [...pts].reverse() : pts;
}
function buildTrack(id, reverse) {
	const def = TRACKS[id];
	const pts = lerpPts(def.points, reverse);
	const n = pts.length;
	const raw = [];
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
				z: catmull(p0.z, p1.z, p2.z, p3.z, t)
			});
		}
	}
	const samples = [];
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
		samples.push({
			x: a.x,
			y: a.y,
			z: a.z,
			tx,
			ty,
			tz,
			rx,
			rz,
			dist: length,
			kappa: 0
		});
		length += len;
	}
	for (let i = 0; i < m; i++) {
		const a = samples[(i - 2 + m) % m];
		const b = samples[(i + 2) % m];
		const dt = Math.hypot(b.tx - a.tx, b.tz - a.tz);
		const ds = Math.max(.001, ((i + 2 < m ? samples[i + 2].dist : length + samples[(i + 2) % m].dist) - samples[(i - 2 + m) % m].dist + length) % length);
		samples[i].kappa = dt / Math.max(2, ds);
	}
	const cpCount = Math.max(8, Math.round(length / 78));
	const cpDist = [];
	for (let i = 0; i < cpCount; i++) cpDist.push(i * length / cpCount);
	return {
		id,
		reverse,
		samples,
		length,
		halfWidth: def.width / 2,
		cpCount,
		cpDist,
		theme: def.theme,
		points: pts
	};
}
function sampleAt(track, dist) {
	const len = track.length;
	let d = (dist % len + len) % len;
	const s = track.samples;
	let lo = 0;
	let hi = s.length - 1;
	while (lo < hi) {
		const mid = lo + hi + 1 >> 1;
		if (s[mid].dist <= d) lo = mid;
		else hi = mid - 1;
	}
	return s[lo];
}
function nearestOnTrack(track, x, z, hint = 0) {
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
	if (bestD > 4900) for (let i = 0; i < n; i += 3) {
		const dx = x - s[i].x;
		const dz = z - s[i].z;
		const d = dx * dx + dz * dz;
		if (d < bestD) {
			bestD = d;
			best = i;
		}
	}
	const sm = s[best];
	const lx = x - sm.x;
	const lz = z - sm.z;
	const lateral = lx * sm.rx + lz * sm.rz;
	const along = lx * sm.tx + lz * sm.tz;
	return {
		idx: best,
		sample: sm,
		lateral,
		along
	};
}
function wrapDist(d, length) {
	const l = length;
	return (d % l + l) % l;
}
function distForward(from, to, length) {
	let d = to - from;
	if (d < 0) d += length;
	return d;
}
function gateEnds(track, cp) {
	const sm = sampleAt(track, track.cpDist[cp]);
	const w = track.halfWidth * 1.35;
	return {
		ax: sm.x - sm.rx * w,
		az: sm.z - sm.rz * w,
		bx: sm.x + sm.rx * w,
		bz: sm.z + sm.rz * w,
		tx: sm.tx,
		tz: sm.tz
	};
}
function segIntersect(ax, az, bx, bz, cx, cz, dx, dz) {
	const den = (bx - ax) * (dz - cz) - (bz - az) * (dx - cx);
	if (Math.abs(den) < 1e-8) return false;
	const ua = ((cx - ax) * (dz - cz) - (cz - az) * (dx - cx)) / den;
	const ub = ((cx - ax) * (bz - az) - (cz - az) * (bx - ax)) / den;
	return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
}
function spawnCar(track, slot, field, partial) {
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
		place: field - slot
	};
}
function resetCar(car, track, keepPenalty = true) {
	const sm = sampleAt(track, car.trackDist);
	const lat = Math.max(-track.halfWidth * .35, Math.min(track.halfWidth * .35, 0));
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
function stepCar(car, track, input, dt, gripMul, frozen) {
	car.lastX = car.x;
	car.lastZ = car.z;
	if (frozen || car.finished) {
		car.vx *= .9;
		car.vz *= .9;
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
	if (brake > 0 && fwd > .6) fwd -= st.brake * brake * dt;
	else if (brake > 0 && fwd <= .6) {
		fwd -= st.accel * .42 * brake * dt;
		fwd = Math.max(fwd, -st.topSpeed * .28);
	}
	if (throttle > 0) {
		const headroom = 1 - Math.max(0, fwd) / (st.topSpeed * 1.12);
		fwd += st.accel * throttle * Math.max(.15, headroom) * dt;
	}
	fwd *= Math.max(0, 1 - (.28 + (throttle < .05 && brake < .05 ? .7 : 0)) * dt);
	if (fwd > st.topSpeed) fwd = st.topSpeed + (fwd - st.topSpeed) * .4;
	const spd = Math.abs(fwd);
	const speedFactor = Math.min(1, spd / 6.2) * (.58 + .42 * (1 - Math.min(1, spd / st.topSpeed)));
	const reverse = fwd >= 0 ? 1 : -1;
	const turn = st.handling * (input.handbrake ? 1.22 : 1) * Math.min(1.16, 1180 / st.mass);
	car.yaw += car.steer * turn * speedFactor * reverse * dt;
	let grip = st.grip * gripMul;
	if (input.handbrake) grip *= .32;
	if (car.offTrack) grip *= .42;
	const kill = 1 - Math.pow(1 - grip, dt * 58);
	lat *= 1 - kill;
	if (input.handbrake && spd > 8) {
		lat += car.steer * 4.5 * dt;
		car.driftMeters += spd * dt * .25;
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
function collideTrack(car, track, dt) {
	const near = nearestOnTrack(track, car.x, car.z, car.sampleIdx);
	car.y = near.sample.y;
	const hw = track.halfWidth;
	const lat = near.lateral;
	car.offTrack = Math.abs(lat) > hw * .72;
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
		car.vx *= .72;
		car.vz *= .72;
		const impulse = Math.min(4, pen * 8 + Math.abs(out));
		car.yaw += -sign * .15 * impulse * (900 / car.stats.mass) * dt * 12;
		if (impulse > 1.2) car.collisions += 1;
	} else if (car.offTrack) {
		car.vx *= 1 - 1.6 * dt;
		car.vz *= 1 - 1.6 * dt;
	}
}
function updateProgress(car, track, dt) {
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
	if (car.speed > 4 && tang < -.25) car.wrongWay += dt;
	else car.wrongWay = Math.max(0, car.wrongWay - dt * 2);
	const gate = gateEnds(track, car.nextCp);
	if (segIntersect(car.lastX, car.lastZ, car.x, car.z, gate.ax, gate.az, gate.bx, gate.bz)) {
		if ((car.x - car.lastX) * gate.tx + (car.z - car.lastZ) * gate.tz > 0) {
			const hit = car.nextCp;
			car.passedInLap += 1;
			if (hit === 0 && car.passedInLap >= track.cpCount) {
				const t = car.currentLap;
				if (t > .5) {
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
	if (car.speed < 1.2 && Math.abs(near.lateral) > track.halfWidth * .85) car.stuckTime += dt;
	else if (car.speed < .4) car.stuckTime += dt * .5;
	else car.stuckTime = 0;
}
function collideCars(a, b) {
	const dx = b.x - a.x;
	const dz = b.z - a.z;
	const d = Math.hypot(dx, dz);
	const min = 2.35;
	if (d < .001 || d >= min) return false;
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
		const j = -1.25 * rel / (invA + invB);
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
function progressKey(car, track, totalLaps) {
	if (car.finished && car.finishTime != null) return 1e9 - car.finishTime;
	const toNext = distForward(car.trackDist, track.cpDist[car.nextCp], track.length);
	const seg = track.length / track.cpCount;
	const frac = 1 - Math.min(1, toNext / seg);
	return car.laps * 1e4 + car.passedInLap * 100 + frac * 10 + car.trackDist / track.length;
}
function maybeFinish(car, totalLaps, raceTime) {
	if (!car.finished && car.laps >= totalLaps) {
		car.finished = true;
		car.finishTime = raceTime;
		car.vx *= .4;
		car.vz *= .4;
	}
}
var UPGRADE_CATS = [
	{
		id: "engine",
		name: "引擎",
		desc: "提高加速，並小幅提升極速。"
	},
	{
		id: "trans",
		name: "變速箱",
		desc: "提高極速與加速效率。"
	},
	{
		id: "tires",
		name: "輪胎",
		desc: "提高抓地、轉向與彎道穩定。"
	},
	{
		id: "brakes",
		name: "煞車",
		desc: "縮短煞車距離，提高減速效率。"
	},
	{
		id: "weight",
		name: "減重",
		desc: "改善加速、轉向反應與操控。"
	}
];
function upgradePrice(cat, nextLevel) {
	const base = {
		engine: 900,
		trans: 850,
		tires: 800,
		brakes: 750,
		weight: 820
	};
	const lv = Math.max(1, Math.min(4, nextLevel));
	return Math.round(base[cat] * Math.pow(2, lv - 1));
}
var CARS = [
	{
		id: "skylark",
		name: "雲雀 Mk.I",
		nameEn: "Skylark",
		tagline: "好開的入門街跑",
		blurb: "鵲從零件堆裡拼出來的第一台車。極速普通，但轉向聽話，適合把賽道記進骨頭裡。",
		price: 0,
		unlockStars: 0,
		topSpeed: 38,
		accel: 9.2,
		handling: 2.45,
		brake: 14,
		mass: 1120,
		grip: .9,
		defaultPaint: {
			body: "#2ee6d6",
			rim: "#d9dee8",
			metalness: .35
		},
		style: "hatch",
		cls: "入門"
	},
	{
		id: "ember",
		name: "流火 Mk.II",
		nameEn: "Ember",
		tagline: "輕量改的第二台掀背",
		blurb: "把雲雀的殼削薄、引擎往前推。直線變快，後輪在雨裡會先說話。適合想換車又還沒存夠赤隼的人。",
		price: 8200,
		unlockStars: 1,
		topSpeed: 42,
		accel: 11.1,
		handling: 2.38,
		brake: 15.2,
		mass: 980,
		grip: .86,
		defaultPaint: {
			body: "#ff7a18",
			rim: "#1a1a1a",
			metalness: .4
		},
		style: "hatch",
		cls: "進攻"
	},
	{
		id: "kestrel",
		name: "赤隼 S",
		nameEn: "Crimson Kestrel",
		tagline: "均衡的進攻型跑車",
		blurb: "城內改裝店的常客。加速乾脆，出彎有信心，是新人跨入正式賽的第一台武器。",
		price: 16500,
		unlockStars: 2,
		topSpeed: 46,
		accel: 12.4,
		handling: 2.25,
		brake: 16.5,
		mass: 1040,
		grip: .84,
		defaultPaint: {
			body: "#ff4d6a",
			rim: "#f5b942",
			metalness: .45
		},
		style: "coupe",
		cls: "進攻"
	},
	{
		id: "heron",
		name: "青鷺 Touring",
		nameEn: "Azure Heron",
		tagline: "雨戰與長距離的穩",
		blurb: "旅行車底盤、寬胎、長軸距。極速不嚇人，但抓地與煞車在暴雨和山道最值錢。",
		price: 19800,
		unlockStars: 3,
		topSpeed: 43,
		accel: 10.4,
		handling: 2.18,
		brake: 18.8,
		mass: 1280,
		grip: .96,
		defaultPaint: {
			body: "#3d7dff",
			rim: "#e8eef8",
			metalness: .5
		},
		style: "wagon",
		cls: "全能"
	},
	{
		id: "whale",
		name: "鐵鯨 GT",
		nameEn: "Iron Whale",
		tagline: "重、穩、剎得住",
		blurb: "老周留下的重量級GT。笨重但抓地驚人，碰撞後不容易甩尾，適合雨戰與山道。",
		price: 24800,
		unlockStars: 4,
		topSpeed: 44,
		accel: 10.1,
		handling: 2.05,
		brake: 20.5,
		mass: 1420,
		grip: .94,
		defaultPaint: {
			body: "#4a5a78",
			rim: "#c9a227",
			metalness: .55
		},
		style: "muscle",
		cls: "重裝"
	},
	{
		id: "marten",
		name: "迅狸 Targa",
		nameEn: "Swift Marten",
		tagline: "最聽話的彎道刀",
		blurb: "敞篷骨架、極輕。直線會被超跑咬住，但髮夾彎裡它幾乎不推頭。手感最接近「車在聽你的」。",
		price: 28600,
		unlockStars: 5,
		topSpeed: 47,
		accel: 13.2,
		handling: 2.72,
		brake: 16.2,
		mass: 890,
		grip: .83,
		defaultPaint: {
			body: "#b6ff3a",
			rim: "#111318",
			metalness: .38
		},
		style: "roadster",
		cls: "輕盈"
	},
	{
		id: "arc",
		name: "弧光 RS",
		nameEn: "Arc Light",
		tagline: "中堅 GT，什麼都能跑",
		blurb: "銀線外圍車隊的量產試作。極速、加速、抓地都沒短板，是夜鯊之前最安全的進階選擇。",
		price: 36500,
		unlockStars: 6,
		topSpeed: 51,
		accel: 13.8,
		handling: 2.35,
		brake: 17.6,
		mass: 990,
		grip: .85,
		defaultPaint: {
			body: "#7b5cff",
			rim: "#f4f1ff",
			metalness: .62
		},
		style: "coupe",
		cls: "全能"
	},
	{
		id: "mako",
		name: "夜鯊 X",
		nameEn: "Night Mako",
		tagline: "直線怪物，尾部較滑",
		blurb: "地下零件商的試作。極速與加速都兇，但抓地偏少，彎前剎車晚一秒就會改寫排名。",
		price: 42e3,
		unlockStars: 7,
		topSpeed: 55,
		accel: 14.6,
		handling: 1.85,
		brake: 15.5,
		mass: 960,
		grip: .76,
		defaultPaint: {
			body: "#1a1f2e",
			rim: "#2ee6d6",
			metalness: .7
		},
		style: "supercar",
		cls: "超跑"
	},
	{
		id: "comet",
		name: "彗星 VX",
		nameEn: "Comet VX",
		tagline: "準廠隊的半成品",
		blurb: "從銀線流出的第二套底盤。幾乎摸到幻影的速度，但轉向還差一口氣。價錢比原型車人道。",
		price: 54e3,
		unlockStars: 9,
		topSpeed: 57,
		accel: 15.5,
		handling: 2.4,
		brake: 18.2,
		mass: 930,
		grip: .86,
		defaultPaint: {
			body: "#ffd24a",
			rim: "#1a1f2e",
			metalness: .78
		},
		style: "hyper",
		cls: "超跑"
	},
	{
		id: "phantom",
		name: "幻影 Zero",
		nameEn: "Phantom Zero",
		tagline: "銀線車隊的原型車",
		blurb: "白澤不承認這台曾流失到民間。全面頂尖的廠隊底盤，價錢也一樣不講道理。",
		price: 78e3,
		unlockStars: 12,
		topSpeed: 58,
		accel: 16.2,
		handling: 2.62,
		brake: 19.5,
		mass: 910,
		grip: .9,
		defaultPaint: {
			body: "#eef1f6",
			rim: "#ff4d6a",
			metalness: .82
		},
		style: "hyper",
		cls: "原型"
	}
];
var CAR_MAP = Object.fromEntries(CARS.map((c) => [c.id, c]));
function emptyUpgrades() {
	return {
		engine: 0,
		trans: 0,
		tires: 0,
		brakes: 0,
		weight: 0
	};
}
function clonePaint(p) {
	return {
		body: p.body,
		rim: p.rim,
		metalness: p.metalness
	};
}
function effectiveStats(car, up) {
	const e = clampLv(up.engine);
	const t = clampLv(up.trans);
	const ti = clampLv(up.tires);
	const b = clampLv(up.brakes);
	const w = clampLv(up.weight);
	const topSpeed = car.topSpeed * (1 + .03 * e + .055 * t);
	const accel = car.accel * (1 + .08 * e + .03 * t + .04 * w);
	const handling = car.handling * (1 + .06 * ti + .04 * w);
	const brake = car.brake * (1 + .1 * b);
	const mass = car.mass * (1 - .055 * w);
	const grip = Math.min(.98, car.grip * (1 + .05 * ti));
	return {
		topSpeed,
		accel,
		handling,
		brake,
		mass,
		grip,
		score: Math.round(topSpeed / 62 * 28 + accel / 18 * 22 + handling / 3 * 20 + brake / 26 * 10 + grip * 14 + (1 - mass / 1500) * 6)
	};
}
function clampLv(n) {
	return Math.max(0, Math.min(4, n | 0));
}
function sortField(cars, track, laps) {
	const arr = [...cars];
	arr.sort((a, b) => {
		if (a.finished && b.finished) return (a.finishTime ?? 0) - (b.finishTime ?? 0);
		if (a.finished !== b.finished) return a.finished ? -1 : 1;
		return progressKey(b, track, laps) - progressKey(a, track, laps);
	});
	arr.forEach((c, i) => {
		c.place = i + 1;
	});
	return arr;
}
function starChecks(level, result) {
	return [
		result.finished,
		result.finished && result.place <= level.star2Place,
		result.finished && evalStar3(level, result)
	];
}
function evalStar3(level, result) {
	const id = level.star3.id;
	if (id === "no-reset") return result.resets === 0;
	if (id === "clean") return result.collisions <= (level.maxCollisions ?? 2);
	if (id === "lap") return result.bestLap != null && result.bestLap <= (level.targetLap ?? 999);
	if (id === "no-reset-top3") return result.resets === 0 && result.place <= 3;
	if (id === "win-clean") return result.place === 1 && result.collisions <= (level.maxCollisions ?? 3);
	return result.place === 1;
}
function starReason(goal, got, result, level) {
	if (got) return "已達成";
	if (!result.finished) return "未完賽";
	if (goal.id === "no-reset") return `使用了 ${result.resets} 次重置`;
	if (goal.id === "clean") return `碰撞 ${result.collisions} 次（需 ≤ ${level.maxCollisions ?? 2}）`;
	if (goal.id === "lap") {
		const t = result.bestLap;
		return t == null ? "沒有有效圈速" : `最佳圈 ${t.toFixed(2)}s（需 ≤ ${level.targetLap}s）`;
	}
	if (goal.id === "no-reset-top3") {
		if (result.resets > 0) return `使用了 ${result.resets} 次重置`;
		return `名次第 ${result.place}（需前三）`;
	}
	if (goal.id === "win-clean") {
		if (result.place !== 1) return `名次第 ${result.place}（需第一）`;
		return `碰撞 ${result.collisions} 次（需 ≤ ${level.maxCollisions ?? 3}）`;
	}
	return "未達成";
}
function computePayout(level, save, result, newStars, already) {
	const breakdown = [];
	if (!result.finished) return {
		total: 0,
		breakdown: [{
			label: "未完賽",
			amount: 0
		}]
	};
	const placeMul = [
		1,
		1,
		.7,
		.48,
		.32,
		.22,
		.16,
		.12,
		.08
	][result.place] ?? .08;
	const base = Math.round(level.prize * placeMul);
	breakdown.push({
		label: `第 ${result.place} 名獎金`,
		amount: base
	});
	if (!save.levels[level.id].cleared) {
		const b = Math.round(level.prize * .45);
		breakdown.push({
			label: "首次通關",
			amount: b
		});
	}
	let starBonus = 0;
	for (let i = 0; i < 3; i++) if (newStars[i] && !already[i]) starBonus += 700 + i * 250;
	if (starBonus) breakdown.push({
		label: "新星星獎勵",
		amount: starBonus
	});
	if (result.collisions <= 1) breakdown.push({
		label: "乾淨駕駛",
		amount: 400
	});
	if (result.place === 1) breakdown.push({
		label: "優勝加給",
		amount: Math.round(level.prize * .15)
	});
	return {
		total: breakdown.reduce((a, b) => a + b.amount, 0),
		breakdown
	};
}
function applyResult(save, result) {
	if (save.claimedTokens.includes(result.token)) return save;
	const next = structuredClone(save);
	next.claimedTokens = [...next.claimedTokens, result.token].slice(-30);
	next.money = Math.max(0, next.money + result.payout);
	const lv = next.levels[result.levelId];
	lv.stars = [
		lv.stars[0] || result.newStars[0],
		lv.stars[1] || result.newStars[1],
		lv.stars[2] || result.newStars[2]
	];
	if (result.finished) {
		lv.cleared = true;
		if (lv.bestPlace == null || result.place < lv.bestPlace) lv.bestPlace = result.place;
		if (lv.bestTime == null || result.totalTime < lv.bestTime) lv.bestTime = result.totalTime;
		if (result.bestLap != null && (lv.bestLap == null || result.bestLap < lv.bestLap)) lv.bestLap = result.bestLap;
	}
	if (result.levelId === "l6-finale" && result.finished && result.place === 1) {
		next.beatenFinale = true;
		next.storyFlag = Math.max(next.storyFlag, 2);
	}
	next.totalStars = Object.values(next.levels).reduce((n, l) => n + l.stars.filter(Boolean).length, 0);
	unlockLevels(next);
	return next;
}
function unlockLevels(save) {
	const ownOther = Object.entries(save.cars).some(([id, c]) => id !== "skylark" && c.owned);
	for (const level of Object.values(LEVEL_MAP)) {
		const u = level.unlock;
		let ok = true;
		if (u.prev && !save.levels[u.prev].cleared) ok = false;
		if (u.stars && save.totalStars < u.stars) ok = false;
		if (u.ownNonStarter && !ownOther) ok = false;
		if (!u.prev && !u.stars && !u.ownNonStarter) ok = true;
		if (level.id === "l1-harbor") ok = true;
		if (ok) save.levels[level.id].unlocked = true;
	}
	if (save.levels["l5-ridge"].cleared) save.levels["l6-finale"].unlocked = true;
}
function unlockLabel(level, save) {
	if (save.levels[level.id].unlocked) return "";
	const parts = [];
	const u = level.unlock;
	if (u.prev && !save.levels[u.prev].cleared) parts.push("完成上一關");
	if (u.stars && save.totalStars < u.stars) parts.push(`累積 ${u.stars} 顆星星（目前 ${save.totalStars}）`);
	if (u.ownNonStarter) {
		if (!Object.entries(save.cars).some(([id, c]) => id !== "skylark" && c.owned)) parts.push("擁有雲雀以外的車輛");
	}
	return parts.join("、") || "尚未解鎖";
}
function standingsOf(cars) {
	return [...cars].sort((a, b) => a.place - b.place).map((c) => ({
		name: c.isPlayer ? "林昊" : c.name,
		isPlayer: c.isPlayer,
		place: c.place,
		finished: c.finished,
		time: c.finishTime,
		carColor: c.color
	}));
}
var GameAudio = class {
	ctx = null;
	master = null;
	sfx = null;
	engineGain = null;
	osc = null;
	osc2 = null;
	noise = null;
	masterVol = .8;
	sfxVol = .85;
	muted = false;
	unlocked = false;
	engineOn = false;
	unlock = () => {
		try {
			if (!this.ctx) {
				const Ctx = window.AudioContext || window.webkitAudioContext;
				this.ctx = new Ctx({ latencyHint: "interactive" });
				this.master = this.ctx.createGain();
				this.sfx = this.ctx.createGain();
				this.engineGain = this.ctx.createGain();
				this.sfx.connect(this.master);
				this.engineGain.connect(this.master);
				this.master.connect(this.ctx.destination);
				this.applyVol();
			}
			if (this.ctx.state === "suspended") this.ctx.resume();
			this.unlocked = true;
		} catch {}
	};
	setVolumes(master, sfx, muted) {
		this.masterVol = master;
		this.sfxVol = sfx;
		this.muted = muted;
		this.applyVol();
	}
	applyVol() {
		if (!this.master || !this.sfx || !this.engineGain || !this.ctx) return;
		const m = this.muted ? 0 : this.masterVol * this.masterVol;
		this.master.gain.setTargetAtTime(m, this.ctx.currentTime, .02);
		this.sfx.gain.setTargetAtTime(this.sfxVol * this.sfxVol, this.ctx.currentTime, .02);
	}
	resume() {
		if (this.ctx?.state === "suspended") this.ctx.resume();
	}
	startEngine() {
		if (!this.ctx || !this.engineGain || this.engineOn) return;
		try {
			this.osc = this.ctx.createOscillator();
			this.osc2 = this.ctx.createOscillator();
			this.osc.type = "sawtooth";
			this.osc2.type = "square";
			const g1 = this.ctx.createGain();
			const g2 = this.ctx.createGain();
			g1.gain.value = .04;
			g2.gain.value = .015;
			const filt = this.ctx.createBiquadFilter();
			filt.type = "lowpass";
			filt.frequency.value = 420;
			this.osc.connect(g1);
			this.osc2.connect(g2);
			g1.connect(filt);
			g2.connect(filt);
			filt.connect(this.engineGain);
			this.engineGain.gain.value = 0;
			this.osc.start();
			this.osc2.start();
			this.engineOn = true;
		} catch {}
	}
	updateEngine(speed, throttle, racing) {
		if (!this.ctx || !this.osc || !this.osc2 || !this.engineGain) return;
		if (!racing) {
			this.engineGain.gain.setTargetAtTime(0, this.ctx.currentTime, .05);
			return;
		}
		const rpm = 48 + speed * 7.4 + throttle * 28;
		this.osc.frequency.setTargetAtTime(rpm, this.ctx.currentTime, .04);
		this.osc2.frequency.setTargetAtTime(rpm * .48 + 12, this.ctx.currentTime, .04);
		const vol = .018 + throttle * .075 + Math.min(.06, speed * .0024);
		this.engineGain.gain.setTargetAtTime(vol, this.ctx.currentTime, .04);
	}
	stopEngine() {
		try {
			this.osc?.stop();
			this.osc2?.stop();
		} catch {}
		this.osc = null;
		this.osc2 = null;
		this.engineOn = false;
	}
	beep(freq, dur = .12, type = "square", vol = .08) {
		if (!this.ctx || !this.sfx) return;
		try {
			const o = this.ctx.createOscillator();
			const g = this.ctx.createGain();
			o.type = type;
			o.frequency.value = freq;
			g.gain.value = vol;
			g.gain.exponentialRampToValueAtTime(1e-4, this.ctx.currentTime + dur);
			o.connect(g);
			g.connect(this.sfx);
			o.start();
			o.stop(this.ctx.currentTime + dur);
		} catch {}
	}
	click() {
		this.beep(880, .05, "square", .04);
	}
	countdown(n) {
		if (n <= 0) this.beep(880, .28, "square", .1);
		else this.beep(440, .12, "square", .07);
	}
	collide() {
		this.beep(90, .14, "sawtooth", .09);
	}
	finish() {
		this.beep(523, .18, "triangle", .08);
		setTimeout(() => this.beep(659, .18, "triangle", .08), 140);
		setTimeout(() => this.beep(784, .28, "triangle", .1), 280);
	}
	dispose() {
		this.stopEngine();
		try {
			this.ctx?.close();
		} catch {}
		this.ctx = null;
	}
};
var SAVE_KEY = "neon-circuit-save-v1";
function defaultSettings() {
	return {
		master: .8,
		sfx: .85,
		muted: false,
		quality: "high",
		shadows: false
	};
}
function defaultSave() {
	const cars = {};
	for (const c of CARS) cars[c.id] = {
		owned: c.id === "skylark",
		upgrades: emptyUpgrades(),
		paint: clonePaint(c.defaultPaint)
	};
	const levels = {};
	for (const l of LEVELS) levels[l.id] = {
		unlocked: !l.unlock.prev && !l.unlock.stars && !l.unlock.ownNonStarter,
		stars: [
			false,
			false,
			false
		],
		bestPlace: null,
		bestTime: null,
		bestLap: null,
		cleared: false
	};
	levels["l1-harbor"].unlocked = true;
	return {
		version: 1,
		money: 2200,
		selectedCar: "skylark",
		cars,
		levels,
		storyFlag: 0,
		seenIntro: false,
		beatenFinale: false,
		claimedTokens: [],
		settings: defaultSettings(),
		totalStars: 0
	};
}
function isCarId(v) {
	return CARS.some((c) => c.id === v);
}
function migrate(raw) {
	const base = defaultSave();
	if (!raw || typeof raw !== "object") return base;
	const s = raw;
	const out = base;
	if (typeof s.money === "number" && Number.isFinite(s.money)) out.money = Math.max(0, Math.round(s.money));
	if (isCarId(s.selectedCar) && out.cars[s.selectedCar].owned) out.selectedCar = s.selectedCar;
	if (s.cars && typeof s.cars === "object") for (const c of CARS) {
		const src = s.cars[c.id];
		if (!src) continue;
		out.cars[c.id].owned = c.id === "skylark" ? true : Boolean(src.owned);
		if (src.upgrades) for (const k of [
			"engine",
			"trans",
			"tires",
			"brakes",
			"weight"
		]) {
			const n = src.upgrades[k];
			if (typeof n === "number") out.cars[c.id].upgrades[k] = Math.max(0, Math.min(4, n | 0));
		}
		if (src.paint && typeof src.paint.body === "string") out.cars[c.id].paint = {
			body: String(src.paint.body).slice(0, 16),
			rim: String(src.paint.rim ?? c.defaultPaint.rim).slice(0, 16),
			metalness: Math.max(0, Math.min(1, Number(src.paint.metalness) || .4))
		};
	}
	if (s.levels && typeof s.levels === "object") for (const l of LEVELS) {
		const src = s.levels[l.id];
		if (!src) continue;
		out.levels[l.id].unlocked = Boolean(src.unlocked) || out.levels[l.id].unlocked;
		out.levels[l.id].stars = [
			Boolean(src.stars?.[0]),
			Boolean(src.stars?.[1]),
			Boolean(src.stars?.[2])
		];
		out.levels[l.id].bestPlace = typeof src.bestPlace === "number" ? src.bestPlace : null;
		out.levels[l.id].bestTime = typeof src.bestTime === "number" ? src.bestTime : null;
		out.levels[l.id].bestLap = typeof src.bestLap === "number" ? src.bestLap : null;
		out.levels[l.id].cleared = Boolean(src.cleared);
	}
	out.storyFlag = typeof s.storyFlag === "number" ? s.storyFlag : 0;
	out.seenIntro = Boolean(s.seenIntro);
	out.beatenFinale = Boolean(s.beatenFinale);
	if (Array.isArray(s.claimedTokens)) out.claimedTokens = s.claimedTokens.filter((t) => typeof t === "string").slice(-30);
	if (s.settings && typeof s.settings === "object") out.settings = {
		master: clamp01(s.settings.master, .8),
		sfx: clamp01(s.settings.sfx, .85),
		muted: Boolean(s.settings.muted),
		quality: s.settings.quality === "low" ? "low" : "high",
		shadows: Boolean(s.settings.shadows)
	};
	out.totalStars = recountStars(out);
	if (isCarId(s.selectedCar) && out.cars[s.selectedCar]?.owned) out.selectedCar = s.selectedCar;
	return out;
}
function clamp01(n, d) {
	return typeof n === "number" && Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : d;
}
function recountStars(save) {
	let n = 0;
	for (const l of LEVELS) {
		const st = save.levels[l.id].stars;
		n += (st[0] ? 1 : 0) + (st[1] ? 1 : 0) + (st[2] ? 1 : 0);
	}
	save.totalStars = n;
	return n;
}
function loadSave() {
	try {
		const raw = localStorage.getItem(SAVE_KEY);
		if (!raw) return defaultSave();
		return migrate(JSON.parse(raw));
	} catch {
		try {
			const bak = localStorage.getItem(SAVE_KEY + ":bak");
			if (bak) return migrate(JSON.parse(bak));
		} catch {}
		return defaultSave();
	}
}
function persistSave(save) {
	try {
		const prev = localStorage.getItem(SAVE_KEY);
		if (prev) localStorage.setItem(SAVE_KEY + ":bak", prev);
		localStorage.setItem(SAVE_KEY, JSON.stringify(save));
	} catch {}
}
function clearSave() {
	try {
		localStorage.removeItem(SAVE_KEY);
		localStorage.removeItem(SAVE_KEY + ":bak");
	} catch {}
}
function hasSaveFile() {
	try {
		return Boolean(localStorage.getItem(SAVE_KEY));
	} catch {
		return false;
	}
}
var toastN = 1;
var useCareer = create((set, get) => ({
	save: defaultSave(),
	hydrated: false,
	hasFile: false,
	screen: "boot",
	prevScreen: "boot",
	selectedLevel: "l1-harbor",
	shopCar: "kestrel",
	tuneCar: "skylark",
	paintDraft: clonePaint(CARS[0].defaultPaint),
	dialogue: null,
	confirm: null,
	raceResult: null,
	toast: null,
	lastError: null,
	raceNonce: 0,
	hydrate: () => {
		try {
			const file = hasSaveFile();
			const save = file ? loadSave() : defaultSave();
			unlockLevels(save);
			recountStars(save);
			set({
				save,
				hydrated: true,
				hasFile: file,
				screen: "boot"
			});
		} catch {
			set({
				save: defaultSave(),
				hydrated: true,
				hasFile: false,
				lastError: "存檔讀取失敗，已使用新進度。"
			});
		}
	},
	persist: () => {
		persistSave(get().save);
		set({ hasFile: true });
	},
	go: (s) => set({
		prevScreen: get().screen,
		screen: s
	}),
	requestNewGame: () => {
		if (get().hasFile) set({ confirm: {
			title: "開始新遊戲？",
			body: "這會覆蓋目前的生涯進度、金錢、車輛與星星。",
			action: "new"
		} });
		else get().newGame();
	},
	requestWipe: () => set({ confirm: {
		title: "清除存檔？",
		body: "所有生涯進度都會消失，而且無法復原。",
		action: "wipe"
	} }),
	confirmYes: () => {
		const c = get().confirm;
		set({ confirm: null });
		if (c?.action === "new") get().newGame();
		if (c?.action === "wipe") {
			clearSave();
			set({
				save: defaultSave(),
				hasFile: false,
				screen: "boot",
				raceResult: null
			});
			get().setToast("已清除存檔");
		}
	},
	confirmNo: () => set({ confirm: null }),
	newGame: () => {
		const save = defaultSave();
		persistSave(save);
		set({
			save,
			hasFile: true,
			screen: "intro",
			dialogue: {
				lines: [],
				after: "hub"
			},
			selectedLevel: "l1-harbor",
			raceResult: null
		});
	},
	continueGame: () => {
		if (!get().hasFile) return;
		const save = loadSave();
		unlockLevels(save);
		set({
			save,
			screen: "hub"
		});
	},
	openLevel: (id) => {
		const save = get().save;
		if (!save.levels[id].unlocked) {
			get().setToast(unlockLabel(LEVEL_MAP[id], save));
			return;
		}
		const level = LEVEL_MAP[id];
		set({
			selectedLevel: id,
			dialogue: {
				lines: level.intro,
				after: "prerace",
				title: level.name
			},
			screen: "dialogue"
		});
	},
	startRace: () => set({
		screen: "race",
		raceResult: null,
		raceNonce: get().raceNonce + 1
	}),
	finishRace: (partial) => {
		const { save } = get();
		if (save.claimedTokens.includes(partial.token)) {
			const existing = get().raceResult;
			set({
				screen: "results",
				raceResult: existing ?? partial
			});
			return;
		}
		const already = save.levels[partial.levelId].stars;
		const payout = computePayout(LEVEL_MAP[partial.levelId], save, partial, partial.newStars, already);
		const result = {
			...partial,
			alreadyStars: already,
			payout: payout.total,
			breakdown: payout.breakdown
		};
		const next = applyResult(save, result);
		persistSave(next);
		const level = LEVEL_MAP[partial.levelId];
		set({
			save: next,
			hasFile: true,
			raceResult: result,
			screen: "results",
			dialogue: {
				lines: partial.finished ? partial.place === 1 ? level.outroWin : level.outroLose : ["que:沒跑完就回來了？先把車停好。"],
				after: "hub",
				title: "賽後"
			}
		});
	},
	leaveRace: () => set({
		screen: "hub",
		raceResult: null
	}),
	buyCar: (id) => {
		const save = structuredClone(get().save);
		const def = CAR_MAP[id];
		if (save.cars[id].owned) {
			get().setToast("已擁有這台車");
			return false;
		}
		if (save.totalStars < def.unlockStars) {
			get().setToast(`需要 ${def.unlockStars} 顆星星才能購買`);
			return false;
		}
		if (save.money < def.price) {
			get().setToast("資金不足");
			return false;
		}
		save.money -= def.price;
		save.cars[id].owned = true;
		save.selectedCar = id;
		unlockLevels(save);
		persistSave(save);
		set({
			save,
			hasFile: true,
			tuneCar: id
		});
		get().setToast(`已購入 ${def.name}`);
		return true;
	},
	selectCar: (id) => {
		const save = structuredClone(get().save);
		if (!save.cars[id].owned) return false;
		save.selectedCar = id;
		persistSave(save);
		set({
			save,
			tuneCar: id,
			paintDraft: clonePaint(save.cars[id].paint)
		});
		return true;
	},
	buyUpgrade: (id, cat) => {
		const save = structuredClone(get().save);
		const car = save.cars[id];
		if (!car.owned) return false;
		const nextLv = car.upgrades[cat] + 1;
		if (nextLv > 4) {
			get().setToast("已達最高等級");
			return false;
		}
		const price = upgradePrice(cat, nextLv);
		if (save.money < price) {
			get().setToast("資金不足");
			return false;
		}
		save.money -= price;
		car.upgrades[cat] = nextLv;
		persistSave(save);
		set({ save });
		get().setToast(`升級完成（Lv.${nextLv}）`);
		return true;
	},
	applyPaint: (id, paint) => {
		const save = structuredClone(get().save);
		if (!save.cars[id].owned) return;
		save.cars[id].paint = { ...paint };
		persistSave(save);
		set({
			save,
			paintDraft: { ...paint }
		});
		get().setToast("外觀已保存");
	},
	setSettings: (p) => {
		const save = structuredClone(get().save);
		save.settings = {
			...save.settings,
			...p
		};
		persistSave(save);
		set({ save });
	},
	setToast: (text) => {
		const id = toastN++;
		set({ toast: {
			id,
			text
		} });
		setTimeout(() => {
			if (get().toast?.id === id) set({ toast: null });
		}, 2400);
	},
	levelLockText: (id) => unlockLabel(LEVEL_MAP[id], get().save)
}));
function moneyText(n) {
	return `₡${Math.max(0, Math.round(n)).toLocaleString("zh-Hant")}`;
}
var STORY = {
	title: "霓虹環道",
	titleEn: "NEON CIRCUIT",
	chapter: "第一章　夜城入場券",
	player: {
		id: "hao",
		name: "林昊"
	},
	mentor: {
		id: "que",
		name: "鵲"
	},
	rival: {
		id: "bai",
		name: "白澤"
	},
	opening: [
		"que:這座城的夜晚只承認兩件事：圈速，和還得起的帳單。",
		"hao:我只有一台拼起來的雲雀。",
		"que:夠了。港灣業餘賽今晚缺人，贏了就有入場券。輸了……就再欠我一頓夜宵。",
		"hao:那我去報名。"
	],
	ending: [
		"que:銀線不是終點。只是他們終於肯看你。",
		"hao:下一章呢？",
		"que:先把車庫燈打開。車還沒睡，你也別睡。"
	],
	credits: "林昊　新銳車手　　鵲　夜班技師　　白澤　銀線隊長"
};
var SPEAKERS = {
	hao: {
		name: "林昊",
		tone: "text-primary"
	},
	que: {
		name: "鵲",
		tone: "text-accent"
	},
	bai: {
		name: "白澤",
		tone: "text-speaker-bai"
	},
	yan: {
		name: "阿焰",
		tone: "text-speaker-yan"
	},
	cat: {
		name: "霓虹貓",
		tone: "text-speaker-cat"
	},
	tie: {
		name: "鐵頭",
		tone: "text-muted"
	},
	ying: {
		name: "影",
		tone: "text-muted"
	}
};
var ART = {
	boot: "/art/boot.jpg",
	hub: "/art/hub.jpg",
	dialogue: "/art/dialogue.jpg",
	levels: {
		"l1-harbor": "/art/l1-harbor.jpg",
		"l2-harbor-rev": "/art/l2-harbor.jpg",
		"l3-downtown": "/art/l3-downtown.jpg",
		"l4-downtown-rain": "/art/l4-rain.jpg",
		"l5-ridge": "/art/l5-ridge.jpg",
		"l6-finale": "/art/l6-finale.jpg"
	},
	portraits: {
		hao: "/art/hao.jpg",
		que: "/art/que.jpg",
		bai: "/art/bai.jpg",
		yan: "/art/yan.jpg",
		cat: "/art/cat.jpg",
		tie: "/art/tie.jpg",
		ying: "/art/ying.jpg"
	}
};
function levelArt(id) {
	return ART.levels[id];
}
function portraitOf(id) {
	return ART.portraits[id] ?? ART.portraits.que;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function CarPreview({ style, paint, className }) {
	const canvasRef = (0, import_react.useRef)(null);
	const api = (0, import_react.useRef)(null);
	const paintRef = (0, import_react.useRef)(paint);
	paintRef.current = paint;
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		let dead = false;
		let p = null;
		(async () => {
			try {
				const { previewCar } = await import("./engine-ChUahTHE.mjs");
				if (dead || !canvasRef.current) return;
				p = previewCar(canvasRef.current, style, paintRef.current);
				api.current = p;
				p.resize();
			} catch {}
		})();
		const ro = new ResizeObserver(() => api.current?.resize());
		ro.observe(canvas);
		return () => {
			dead = true;
			ro.disconnect();
			p?.dispose();
			api.current = null;
		};
	}, [style]);
	(0, import_react.useEffect)(() => {
		api.current?.setPaint(paint);
	}, [paint]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref: canvasRef,
		className: cn("block h-full w-full", className)
	});
}
function Btn({ children, onClick, variant = "primary", className, disabled, type = "button" }) {
	const v = {
		primary: "bg-primary text-bg hover:brightness-110 font-semibold",
		accent: "bg-accent text-bg hover:brightness-110 font-semibold",
		ghost: "bg-surface-2/80 text-fg shadow-border hover:shadow-border-hover",
		danger: "bg-danger text-fg hover:brightness-110 font-semibold"
	}[variant];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		disabled,
		onClick,
		className: cn("inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm tracking-wide", "transition-[box-shadow,filter,transform,background-color] duration-150 ease-out", "active:not-disabled:scale-[0.96]", v, className),
		children
	});
}
function StatBar({ label, value, max = 1 }) {
	const pct = Math.max(0, Math.min(100, value / max * 100));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[3.5rem_1fr_2.2rem] items-center gap-2 text-xs sm:grid-cols-[4.5rem_1fr_2.2rem]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1.5 overflow-hidden rounded-full bg-bg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-primary",
					style: { width: `${pct}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hud-num text-right text-fg",
				children: Math.round(pct)
			})
		]
	});
}
function StarMark({ filled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: cn("inline size-3.5", filled ? "text-accent" : "text-muted/40"),
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M12 2.6 14.4 8.4l6.3.6-4.8 4.1 1.4 6.1L12 16.6 6.7 19.2l1.4-6.1-4.8-4.1 6.3-.6L12 2.6z"
		})
	});
}
function Stars({ got }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex items-center gap-0.5",
		"aria-label": `${got.filter(Boolean).length} 顆星`,
		children: got.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarMark, { filled: g }, i))
	});
}
function Modal({ title, children, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-bg/70 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel-solid w-full max-w-md rounded-xl p-5 shadow-lift",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold text-primary",
					children: title
				}), onClose ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "grid size-11 place-items-center text-muted hover:text-fg",
					onClick: onClose,
					"aria-label": "關閉",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						viewBox: "0 0 24 24",
						className: "size-4",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							fill: "currentColor",
							d: "M6.4 5.3 12 10.9l5.6-5.6 1.1 1.1L13.1 12l5.6 5.6-1.1 1.1L12 13.1l-5.6 5.6-1.1-1.1L10.9 12 5.3 6.4z"
						})
					})
				}) : null]
			}), children]
		})
	});
}
function TopBar({ money, stars, car, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-bg/55 px-4 py-3 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-sm font-semibold tracking-[0.22em] text-primary",
					children: "NEON CIRCUIT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hud-num text-sm text-fg",
					children: money
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 text-sm text-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarMark, { filled: true }), stars]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden truncate text-sm text-muted sm:inline",
					children: car
				})
			]
		}), right]
	});
}
function Stage({ src, children, dim = "scrim" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full min-h-0 flex-col overflow-hidden bg-bg",
		children: [
			src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				className: "pointer-events-none absolute inset-0 h-full w-full object-cover"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("pointer-events-none absolute inset-0", dim) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 vignette" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 flex min-h-0 flex-1 flex-col",
				children
			})
		]
	});
}
function DialogueBox({ title, lines, onDone }) {
	const [i, setI] = (0, import_react.useState)(0);
	const safe = lines.length ? lines : ["que:準備好了就上場。"];
	const line = safe[Math.min(i, safe.length - 1)];
	const idx = line.indexOf(":");
	const who = idx >= 0 ? line.slice(0, idx) : "que";
	const text = idx >= 0 ? line.slice(idx + 1) : line;
	const speaker = SPEAKERS[who] ?? {
		name: who,
		tone: "text-primary"
	};
	const last = i >= safe.length - 1;
	const portrait = portraitOf(who);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
		src: ART.dialogue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col justify-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 h-[58%] sm:inset-y-0 sm:right-auto sm:left-6 sm:h-auto sm:w-[42%]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: portrait,
					alt: "",
					className: "h-full w-full object-cover object-[center_18%] sm:object-top"
				}, who), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "portrait-fade absolute inset-0" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 m-3 rounded-xl border border-border/70 bg-surface/90 p-4 shadow-lift sm:m-5 sm:ml-auto sm:max-w-xl sm:p-5",
				children: [
					title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 font-display text-xs tracking-[0.28em] text-primary",
						children: title
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("font-display text-sm font-semibold", speaker.tone),
						children: speaker.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 min-h-16 text-base leading-relaxed text-fg",
						children: text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "ghost",
							onClick: onDone,
							children: "跳過"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => last ? onDone() : setI(i + 1),
							children: last ? "繼續" : "下一句"
						})]
					})
				]
			})]
		})
	});
}
function LevelsScreen() {
	const save = useCareer((s) => s.save);
	const go = useCareer((s) => s.go);
	const openLevel = useCareer((s) => s.openLevel);
	const lockText = useCareer((s) => s.levelLockText);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
		src: ART.hub,
		dim: "scrim-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			money: moneyText(save.money),
			stars: save.totalStars,
			car: CAR_MAP[save.selectedCar].name,
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "ghost",
				onClick: () => go("hub"),
				children: "返回"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 overflow-auto p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-display text-xl font-semibold",
				children: STORY.chapter
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stagger-in grid gap-3 md:grid-cols-2",
				children: LEVELS.map((lv) => {
					const st = save.levels[lv.id];
					const locked = !st.unlocked;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => openLevel(lv.id),
						disabled: locked,
						className: "art-card min-h-36 rounded-xl text-left disabled:opacity-55",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: levelArt(lv.id),
								alt: "",
								className: cn("absolute inset-0 h-full w-full object-cover", locked && "grayscale")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "art-fade absolute inset-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative z-10 flex h-full flex-col justify-end p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-lg font-semibold",
											children: [
												lv.index,
												". ",
												lv.name
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { got: st.stars })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 text-sm text-fg/80",
										children: lv.subtitle
									}),
									locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-1 text-xs text-danger",
										children: ["解鎖：", lockText(lv.id)]
									}) : null,
									st.bestPlace ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-1 text-xs text-primary",
										children: [
											"最佳：第 ",
											st.bestPlace,
											" 名"
										]
									}) : null
								]
							})
						]
					}, lv.id);
				})
			})]
		})]
	});
}
function PreRaceScreen() {
	const save = useCareer((s) => s.save);
	const id = useCareer((s) => s.selectedLevel);
	const go = useCareer((s) => s.go);
	const startRace = useCareer((s) => s.startRace);
	const selectCar = useCareer((s) => s.selectCar);
	const lv = LEVEL_MAP[id];
	const owned = CARS.filter((c) => save.cars[c.id].owned);
	const def = CAR_MAP[save.selectedCar];
	const stats = effectiveStats(def, save.cars[save.selectedCar].upgrades);
	const idx = Math.max(0, owned.findIndex((c) => c.id === save.selectedCar));
	const cycle = (dir) => {
		if (owned.length < 2) return;
		const next = owned[(idx + dir + owned.length) % owned.length];
		selectCar(next.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
		src: levelArt(id),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			money: moneyText(save.money),
			stars: save.totalStars,
			car: def.name,
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "ghost",
				onClick: () => go("levels"),
				children: "返回"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 overflow-auto p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xs tracking-[0.28em] text-primary",
					children: "GRID BRIEFING"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl font-semibold",
					children: lv.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-fg/80",
					children: [
						lv.subtitle,
						"　獎金基準 ",
						moneyText(lv.prize)
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-solid rounded-xl p-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-primary",
							children: "三星目標"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 space-y-1 text-fg/90",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "完成比賽" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"取得前 ",
									lv.star2Place,
									" 名"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: lv.star3.label })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: "提示：雨戰優先抓地，山道優先煞車與轉向。"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-solid overflow-hidden rounded-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-28 bg-bg-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarPreview, {
							style: def.style,
							paint: save.cars[save.selectedCar].paint
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"出戰：",
							def.name,
							"　",
							def.cls,
							"　性能 ",
							stats.score
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [owned.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "ghost",
								onClick: () => cycle(-1),
								children: "上一台"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "ghost",
								onClick: () => cycle(1),
								children: "下一台"
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "ghost",
								onClick: () => go("garage"),
								children: "更換車輛"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: startRace,
								children: "開始比賽"
							})]
						})]
					})]
				})]
			})]
		})]
	});
}
function DialogueScreen() {
	const d = useCareer((s) => s.dialogue);
	const go = useCareer((s) => s.go);
	if (!d) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogueBox, {
		title: d.title,
		lines: d.lines,
		onDone: () => go(d.after)
	});
}
function ResultsScreen() {
	const result = useCareer((s) => s.raceResult);
	const go = useCareer((s) => s.go);
	const save = useCareer((s) => s.save);
	if (!result) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
		src: ART.hub,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => go("hub"),
				children: "返回車庫"
			})
		})
	});
	const lv = LEVEL_MAP[result.levelId];
	const starsNow = save.levels[result.levelId].stars;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
		src: levelArt(result.levelId),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-border/80 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold text-primary",
				children: "賽後結算"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: lv.name
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-lg flex-1 overflow-auto p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl font-extrabold",
					children: result.finished ? `第 ${result.place} 名` : "未完賽"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						"總時間 ",
						fmt$1(result.totalTime),
						"　最佳圈 ",
						result.bestLap != null ? fmt$1(result.bestLap) : "--"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 panel-solid rounded-xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm text-accent",
						children: "星星"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarsLine, {
								got: starsNow[0],
								label: "完成比賽",
								reason: result.finished ? "已達成" : "未完賽"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarsLine, {
								got: starsNow[1],
								label: `前 ${lv.star2Place} 名`,
								reason: starsNow[1] ? "已達成" : result.finished ? `名次第 ${result.place}` : "未完賽"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarsLine, {
								got: starsNow[2],
								label: lv.star3.label,
								reason: starReason(lv.star3, result.newStars[2] || starsNow[2], result, lv)
							}) })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 panel-solid rounded-xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-sm text-accent",
						children: ["獎金 ", moneyText(result.payout)]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1 text-sm text-muted",
						children: result.breakdown.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hud-num text-fg",
								children: moneyText(b.amount)
							})]
						}, b.label))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 panel-solid rounded-xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm",
						children: "最終排名"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-2 space-y-1 text-sm",
						children: result.standings.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: s.isPlayer ? "text-primary" : "",
							children: [
								s.place,
								". ",
								s.name,
								s.finished && s.time != null ? `　${fmt$1(s.time)}` : "　DNF"
							]
						}, s.place))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							onClick: () => go("dialogue"),
							children: "聽賽後對話"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "ghost",
							onClick: () => go("garage"),
							children: "前往車庫"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "ghost",
							onClick: () => go("hub"),
							children: "返回大廳"
						})
					]
				})
			]
		})]
	});
}
function StarsLine({ got, label, reason }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: got ? "mt-1 inline-block size-2 shrink-0 rounded-full bg-accent" : "mt-1 inline-block size-2 shrink-0 rounded-full bg-muted/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-2 text-xs text-muted",
			children: reason
		})] })]
	});
}
function fmt$1(t) {
	const m = Math.floor(t / 60);
	return `${m}:${(t - m * 60).toFixed(2).padStart(5, "0")}`;
}
function GarageScreen() {
	const save = useCareer((s) => s.save);
	const go = useCareer((s) => s.go);
	const selectCar = useCareer((s) => s.selectCar);
	const owned = CARS.filter((c) => save.cars[c.id].owned);
	const selected = CAR_MAP[save.selectedCar];
	const selectedSave = save.cars[save.selectedCar];
	const selectedStats = effectiveStats(selected, selectedSave.upgrades);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
		src: ART.dialogue,
		dim: "scrim-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			money: moneyText(save.money),
			stars: save.totalStars,
			car: selected.name,
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "ghost",
				onClick: () => go("hub"),
				children: "返回"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-0 flex-1 gap-3 overflow-auto p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-solid flex min-h-56 flex-col overflow-hidden rounded-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative h-48 bg-bg-2 sm:h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarPreview, {
						style: selected.style,
						paint: selectedSave.paint
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xs tracking-[0.28em] text-primary",
							children: "ACTIVE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 font-display text-2xl font-semibold",
							children: selected.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								selected.cls,
								" · ",
								selected.tagline
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-accent",
							children: ["性能 ", selectedStats.score]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBar, {
									label: "極速",
									value: selectedStats.topSpeed,
									max: 70
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBar, {
									label: "加速",
									value: selectedStats.accel,
									max: 20
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBar, {
									label: "操控",
									value: selectedStats.handling,
									max: 3.2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBar, {
									label: "煞車",
									value: selectedStats.brake,
									max: 28
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBar, {
									label: "抓地",
									value: selectedStats.grip,
									max: 1
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "ghost",
								onClick: () => useCareer.setState({
									tuneCar: selected.id,
									screen: "tune"
								}),
								children: "升級"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "ghost",
								onClick: () => useCareer.setState({
									tuneCar: selected.id,
									paintDraft: { ...selectedSave.paint },
									screen: "paint"
								}),
								children: "塗裝"
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: owned.map((c) => {
					const st = effectiveStats(c, save.cars[c.id].upgrades);
					const active = save.selectedCar === c.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("panel-solid rounded-xl p-4", active && "shadow-border-hover"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-semibold",
									children: c.name
								}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs tracking-widest text-primary",
									children: "使用中"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: c.cls
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: c.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-sm text-accent",
								children: ["性能 ", st.score]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									!active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										onClick: () => selectCar(c.id),
										children: "選用"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										disabled: true,
										children: "已選用"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										variant: "ghost",
										onClick: () => useCareer.setState({
											tuneCar: c.id,
											screen: "tune"
										}),
										children: "升級"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										variant: "ghost",
										onClick: () => useCareer.setState({
											tuneCar: c.id,
											paintDraft: { ...save.cars[c.id].paint },
											screen: "paint"
										}),
										children: "塗裝"
									})
								]
							})
						]
					}, c.id);
				})
			})]
		})]
	});
}
function ShopScreen() {
	const save = useCareer((s) => s.save);
	const go = useCareer((s) => s.go);
	const buyCar = useCareer((s) => s.buyCar);
	const shopCar = useCareer((s) => s.shopCar);
	const def = CAR_MAP[shopCar];
	const owned = save.cars[shopCar].owned;
	const st = effectiveStats(def, save.cars[shopCar].upgrades);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
		src: ART.hub,
		dim: "scrim-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			money: moneyText(save.money),
			stars: save.totalStars,
			car: CAR_MAP[save.selectedCar].name,
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "ghost",
				onClick: () => go("hub"),
				children: "返回"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-4 md:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-auto md:w-52 md:flex-col",
				children: CARS.map((c) => {
					const mine = save.cars[c.id].owned;
					const locked = save.totalStars < c.unlockStars && !mine;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => useCareer.setState({ shopCar: c.id }),
						className: cn("min-h-11 rounded-md px-3 py-2 text-left text-sm transition-transform duration-150 ease-out active:scale-[0.96]", shopCar === c.id ? "bg-primary text-bg" : "bg-surface-2 text-fg shadow-border"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block",
							children: c.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("block text-[11px]", shopCar === c.id ? "text-bg/70" : "text-muted"),
							children: mine ? "已擁有" : locked ? `★${c.unlockStars}` : moneyText(c.price)
						})]
					}, c.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-solid flex-1 overflow-hidden rounded-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-48 bg-bg-2 sm:h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarPreview, {
						style: def.style,
						paint: owned ? save.cars[shopCar].paint : def.defaultPaint
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-semibold",
							children: def.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								def.nameEn,
								" · ",
								def.cls,
								" · ",
								def.tagline
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed",
							children: def.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 font-display text-accent",
							children: ["售價 ", def.price === 0 || owned ? "已擁有" : moneyText(def.price)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								"需要星星 ",
								def.unlockStars,
								"（目前 ",
								save.totalStars,
								"）",
								save.totalStars < def.unlockStars && !owned ? " · 尚未解鎖" : ""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBar, {
									label: "極速",
									value: st.topSpeed,
									max: 70
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBar, {
									label: "加速",
									value: st.accel,
									max: 20
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBar, {
									label: "操控",
									value: st.handling,
									max: 3.2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBar, {
									label: "煞車",
									value: st.brake,
									max: 28
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatBar, {
									label: "抓地",
									value: st.grip,
									max: 1
								})
							]
						}),
						!owned && save.selectedCar !== def.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareNote, { id: def.id }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5",
							children: owned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								disabled: true,
								children: "已擁有"
							}) : save.totalStars < def.unlockStars ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								disabled: true,
								children: "星星不足"
							}) : save.money < def.price ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								disabled: true,
								children: "資金不足"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: () => buyCar(def.id),
								children: "購買"
							})
						})
					]
				})]
			})]
		})]
	});
}
function CompareNote({ id }) {
	const save = useCareer((s) => s.save);
	const mine = CAR_MAP[save.selectedCar];
	const other = CAR_MAP[id];
	const a = effectiveStats(mine, save.cars[mine.id].upgrades);
	const b = effectiveStats(other, save.cars[id].upgrades);
	const row = (label, d, digits = 1) => {
		if (Math.abs(d) < .05) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: d > 0 ? "text-primary" : "text-danger",
			children: [
				label,
				" ",
				d > 0 ? "+" : "",
				d.toFixed(digits)
			]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted",
		children: [
			"相對 ",
			mine.name,
			"：",
			row("極速", b.topSpeed - a.topSpeed),
			row("加速", b.accel - a.accel),
			row("操控", b.handling - a.handling),
			row("煞車", b.brake - a.brake),
			row("抓地", b.grip - a.grip, 2)
		]
	});
}
function TuneScreen() {
	const save = useCareer((s) => s.save);
	const go = useCareer((s) => s.go);
	const id = useCareer((s) => s.tuneCar);
	const buyUpgrade = useCareer((s) => s.buyUpgrade);
	const def = CAR_MAP[id];
	const car = save.cars[id];
	const st = effectiveStats(def, car.upgrades);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
		src: ART.dialogue,
		dim: "scrim-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			money: moneyText(save.money),
			stars: save.totalStars,
			car: def.name,
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "ghost",
				onClick: () => go("garage"),
				children: "返回車庫"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-lg flex-1 overflow-auto p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-solid mb-4 overflow-hidden rounded-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-36 bg-bg-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarPreview, {
						style: def.style,
						paint: car.paint
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-xl font-semibold",
						children: [def.name, " 升級"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-accent",
						children: ["性能分數 ", st.score]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: UPGRADE_CATS.map((cat) => {
					const lv = car.upgrades[cat.id];
					const maxed = lv >= 4;
					const price = maxed ? 0 : upgradePrice(cat.id, lv + 1);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-solid rounded-xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display font-semibold",
									children: cat.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm text-muted",
									children: [
										"Lv.",
										lv,
										"/",
										4
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: cat.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								className: "mt-3",
								disabled: maxed,
								onClick: () => buyUpgrade(id, cat.id),
								children: maxed ? "已滿級" : `升級 ${moneyText(price)}`
							})
						]
					}, cat.id);
				})
			})]
		})]
	});
}
function PaintScreen() {
	const save = useCareer((s) => s.save);
	const go = useCareer((s) => s.go);
	const id = useCareer((s) => s.tuneCar);
	const draft = useCareer((s) => s.paintDraft);
	const applyPaint = useCareer((s) => s.applyPaint);
	const def = CAR_MAP[id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
		src: ART.dialogue,
		dim: "scrim-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			money: moneyText(save.money),
			stars: save.totalStars,
			car: def.name,
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "ghost",
				onClick: () => go("garage"),
				children: "返回車庫"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 overflow-auto p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-52 overflow-hidden rounded-xl bg-bg-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarPreview, {
						style: def.style,
						paint: draft
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: ["車身顏色", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "color",
						className: "ml-3 h-10 w-16 bg-transparent",
						value: toHex(draft.body),
						onChange: (e) => useCareer.setState({ paintDraft: {
							...draft,
							body: e.target.value
						} })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: ["輪圈顏色", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "color",
						className: "ml-3 h-10 w-16 bg-transparent",
						value: toHex(draft.rim),
						onChange: (e) => useCareer.setState({ paintDraft: {
							...draft,
							rim: e.target.value
						} })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: [
						"金屬光澤 ",
						Math.round(draft.metalness * 100),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 1,
							step: .01,
							value: draft.metalness,
							onChange: (e) => useCareer.setState({ paintDraft: {
								...draft,
								metalness: Number(e.target.value)
							} }),
							className: "mt-2 w-full accent-primary"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => applyPaint(id, draft),
					children: "套用並保存"
				})
			]
		})]
	});
}
function toHex(c) {
	if (c.startsWith("#") && (c.length === 7 || c.length === 4)) return c;
	return "#2ee6d6";
}
function BootScreen() {
	const hasFile = useCareer((s) => s.hasFile);
	const requestNewGame = useCareer((s) => s.requestNewGame);
	const continueGame = useCareer((s) => s.continueGame);
	const go = useCareer((s) => s.go);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
		src: ART.boot,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 flex-1 flex-col justify-end px-5 pb-8 sm:px-10 sm:pb-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stagger-in mx-auto w-full max-w-lg sm:mx-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs tracking-[0.48em] text-primary",
						children: "ARCADE CAREER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-5xl font-extrabold tracking-wide text-fg sm:text-6xl",
						children: STORY.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-sm tracking-[0.32em] text-muted",
						children: STORY.titleEn
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-sm leading-relaxed text-fg/85",
						children: STORY.chapter
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex w-full max-w-xs flex-col gap-3",
						children: [
							hasFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: continueGame,
								className: "w-full",
								children: "繼續遊戲"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: requestNewGame,
								variant: hasFile ? "ghost" : "primary",
								className: "w-full",
								children: "新遊戲"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									onClick: () => go("help"),
									variant: "ghost",
									className: "w-full",
									children: "操作說明"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									onClick: () => go("settings"),
									variant: "ghost",
									className: "w-full",
									children: "設定"
								})]
							})
						]
					})
				]
			})
		})
	});
}
function HubScreen() {
	const save = useCareer((s) => s.save);
	const go = useCareer((s) => s.go);
	const def = CAR_MAP[save.selectedCar];
	const car = save.cars[save.selectedCar];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
		src: ART.hub,
		dim: "scrim-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			money: moneyText(save.money),
			stars: save.totalStars,
			car: def.name,
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
					variant: "ghost",
					onClick: () => go("settings"),
					className: "px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 hidden sm:inline",
						children: "設定"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "ghost",
					onClick: () => go("boot"),
					children: "主選單"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-auto p-4 md:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubArt, {
					src: ART.levels["l3-downtown"],
					kicker: "CHAPTER 01",
					title: "故事賽事",
					desc: STORY.chapter,
					onClick: () => go("levels"),
					className: "min-h-44 md:row-span-2 md:min-h-0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubArt, {
					src: ART.dialogue,
					kicker: "GARAGE",
					title: "車庫",
					desc: "選車、升級、塗裝",
					onClick: () => go("garage"),
					className: "min-h-36"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubArt, {
					src: ART.levels["l1-harbor"],
					kicker: "DEALER",
					title: "車店",
					desc: "用獎金購入更快的車",
					onClick: () => go("shop"),
					className: "min-h-36"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-solid flex min-h-36 items-stretch overflow-hidden rounded-xl md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative hidden w-56 shrink-0 bg-bg-2 sm:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarPreview, {
							style: def.style,
							paint: car.paint
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-1 flex-col justify-center p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.28em] text-muted",
								children: "目前座車"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl font-semibold",
								children: def.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm text-muted",
								children: [
									def.tagline,
									"　引擎 Lv.",
									car.upgrades.engine,
									"　輪胎 Lv.",
									car.upgrades.tires
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									variant: "ghost",
									onClick: () => go("garage"),
									children: "開進車庫"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									variant: "ghost",
									onClick: () => go("help"),
									children: "操作說明"
								})]
							})
						]
					})]
				})
			]
		})]
	});
}
function HubArt({ src, kicker, title, desc, onClick, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: `art-card rounded-xl text-left ${className ?? ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: "",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "art-fade absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "relative z-10 flex h-full flex-col justify-end p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xs tracking-[0.32em] text-primary",
						children: kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block font-display text-2xl font-semibold",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm text-fg/80",
						children: desc
					})
				]
			})
		]
	});
}
function HelpScreen() {
	const go = useCareer((s) => s.go);
	const back = useCareer((s) => s.save).seenIntro ? "hub" : "boot";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
		src: ART.boot,
		dim: "scrim-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold text-primary",
				children: "操作說明"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "ghost",
				onClick: () => go(back),
				children: "返回"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto w-full max-w-xl flex-1 overflow-auto p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-solid rounded-xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-3 text-sm leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpRow, {
							k: "W / ↑",
							v: "加速"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpRow, {
							k: "S / ↓",
							v: "煞車與倒車"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpRow, {
							k: "A / ←",
							v: "左轉"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpRow, {
							k: "D / →",
							v: "右轉"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpRow, {
							k: "空白鍵",
							v: "手煞車／漂移"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpRow, {
							k: "R",
							v: "重置到最近的有效賽道位置"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpRow, {
							k: "Esc",
							v: "暫停"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-sm leading-relaxed text-muted",
					children: "與 7 台 AI 同場競技。車店共 10 台原創車輛，星星與獎金用來解鎖、購買與升級。必須依序通過檢查點才算圈數。"
				})]
			})
		})]
	});
}
function HelpRow({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-baseline justify-between gap-4 border-b border-border/60 pb-2 last:border-0 last:pb-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-primary",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-fg/90",
			children: v
		})]
	});
}
function SettingsScreen() {
	const save = useCareer((s) => s.save);
	const setSettings = useCareer((s) => s.setSettings);
	const go = useCareer((s) => s.go);
	const requestWipe = useCareer((s) => s.requestWipe);
	const s = save.settings;
	const back = save.seenIntro ? "hub" : "boot";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stage, {
		src: ART.hub,
		dim: "scrim-soft",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold",
				children: "設定"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "ghost",
				onClick: () => go(back),
				children: "返回"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-lg flex-1 space-y-4 overflow-auto p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-solid space-y-5 rounded-xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: [
								"主音量 ",
								Math.round(s.master * 100),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 0,
									max: 1,
									step: .01,
									value: s.master,
									onChange: (e) => setSettings({ master: Number(e.target.value) }),
									className: "mt-2 w-full accent-primary"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: [
								"音效音量 ",
								Math.round(s.sfx * 100),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 0,
									max: 1,
									step: .01,
									value: s.sfx,
									onChange: (e) => setSettings({ sfx: Number(e.target.value) }),
									className: "mt-2 w-full accent-primary"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-center gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: s.muted,
								onChange: (e) => setSettings({ muted: e.target.checked })
							}), "靜音"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-center gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: s.quality === "high",
								onChange: (e) => setSettings({ quality: e.target.checked ? "high" : "low" })
							}), "高畫質"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-center gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: s.shadows,
								onChange: (e) => setSettings({ shadows: e.target.checked })
							}), "陰影"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "ghost",
					onClick: () => go("help"),
					className: "w-full",
					children: "操作說明"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "danger",
					onClick: requestWipe,
					className: "w-full",
					children: "清除遊戲進度"
				})
			]
		})]
	});
}
function ConfirmHost() {
	const confirm = useCareer((s) => s.confirm);
	const confirmYes = useCareer((s) => s.confirmYes);
	const confirmNo = useCareer((s) => s.confirmNo);
	if (!confirm) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: confirm.title,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-relaxed text-muted",
			children: confirm.body
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex justify-end gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "ghost",
				onClick: confirmNo,
				children: "取消"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "danger",
				onClick: confirmYes,
				children: "確定"
			})]
		})]
	});
}
function ToastHost() {
	const toast = useCareer((s) => s.toast);
	if (!toast) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md bg-surface-2 px-4 py-2 text-sm shadow-lift",
		children: toast.text
	});
}
function IntroScreen() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogueBox, {
		title: STORY.chapter,
		lines: STORY.opening,
		onDone: () => {
			const cur = useCareer.getState();
			const save = structuredClone(cur.save);
			save.seenIntro = true;
			cur.save.seenIntro = true;
			useCareer.setState({
				save,
				screen: "hub"
			});
			cur.persist();
		}
	});
}
function RaceView({ audio }) {
	const canvasRef = (0, import_react.useRef)(null);
	const engineRef = (0, import_react.useRef)(null);
	const save = useCareer((s) => s.save);
	const levelId = useCareer((s) => s.selectedLevel);
	const finishRace = useCareer((s) => s.finishRace);
	const leaveRace = useCareer((s) => s.leaveRace);
	const startRace = useCareer((s) => s.startRace);
	const [hud, setHud] = (0, import_react.useState)(null);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const touch = (0, import_react.useRef)({
		throttle: 0,
		brake: 0,
		steer: 0,
		handbrake: false
	});
	(0, import_react.useEffect)(() => {
		if (!canvasRef.current) return;
		let cancelled = false;
		let engine = null;
		(async () => {
			try {
				const { RaceEngine } = await import("./engine-ChUahTHE.mjs");
				if (cancelled || !canvasRef.current) return;
				engine = new RaceEngine(canvasRef.current, save, levelId, audio, {
					onHud: (h) => {
						setHud(h);
						if (h.paused) setPaused(true);
					},
					onFinish: (partial) => {
						finishRace(partial);
					},
					onCountdown: (n) => audio.countdown(n),
					onCollide: () => audio.collide()
				});
				engine.start();
				engineRef.current = engine;
			} catch (e) {
				setErr(e instanceof Error ? e.message : "無法啟動 3D 畫面");
			}
		})();
		return () => {
			cancelled = true;
			engine?.dispose();
			engineRef.current = null;
		};
	}, [levelId]);
	const bindTouch = (partial, on) => {
		Object.assign(touch.current, on ? partial : zeroTouch(partial));
		const eng = engineRef.current;
		if (eng && "input" in eng && eng.input) Object.assign(eng.input.touch, touch.current);
	};
	if (err) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center gap-3 bg-bg p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-danger",
			children: err
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: leaveRace,
			children: "返回"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-full bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute inset-0 h-full w-full touch-none bg-bg-2"
			}),
			hud ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, { hud }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center text-muted",
				children: "載入賽道…"
			}),
			hud?.countdown != null && hud.countdown > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-8xl font-extrabold text-primary drop-shadow-lg",
					children: hud.countdown
				})
			}) : null,
			hud && hud.goFlash > .05 && hud.countdown == null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-7xl font-extrabold text-accent drop-shadow-lg",
					children: "GO"
				})
			}) : null,
			paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-20 flex items-center justify-center bg-bg/70 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-solid w-full max-w-sm rounded-xl p-5 shadow-lift",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-semibold",
						children: "暫停"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								onClick: () => {
									setPaused(false);
									engineRef.current?.setPaused(false);
								},
								children: "繼續比賽"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "ghost",
								onClick: () => {
									engineRef.current?.dispose();
									startRace();
								},
								children: "重新開始"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "danger",
								onClick: leaveRace,
								children: "離開比賽"
							})
						]
					})]
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "absolute top-3 right-3 z-10 min-h-11 rounded-md bg-surface/80 px-3 text-sm shadow-border",
				onClick: () => {
					setPaused(true);
					engineRef.current?.setPaused(true);
				},
				children: "暫停"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-2 z-10 flex justify-between px-2 md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchBtn, {
						label: "←",
						on: (v) => bindTouch({ steer: v ? 1 : 0 }, v)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchBtn, {
						label: "→",
						on: (v) => bindTouch({ steer: v ? -1 : 0 }, v)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchBtn, {
							label: "煞",
							on: (v) => bindTouch({ brake: v ? 1 : 0 }, v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchBtn, {
							label: "手煞",
							on: (v) => bindTouch({ handbrake: v }, v)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchBtn, {
							label: "油",
							on: (v) => bindTouch({ throttle: v ? 1 : 0 }, v)
						})
					]
				})]
			})
		]
	});
}
function zeroTouch(p) {
	const o = {};
	for (const k of Object.keys(p)) o[k] = typeof p[k] === "boolean" ? false : 0;
	return o;
}
function TouchBtn({ label, on }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: "min-h-14 min-w-14 rounded-lg bg-surface/80 text-lg font-semibold shadow-border",
		onPointerDown: (e) => {
			e.preventDefault();
			on(true);
		},
		onPointerUp: () => on(false),
		onPointerCancel: () => on(false),
		onPointerLeave: () => on(false),
		children: label
	});
}
function Hud({ hud }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 p-3 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel rounded-lg px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-display text-3xl font-semibold text-primary",
							children: [hud.place, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-base text-muted",
								children: ["/", hud.field]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted",
							children: [
								"圈 ",
								hud.lap,
								"/",
								hud.laps
							]
						}),
						hud.gapText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-accent",
							children: hud.gapText
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel rounded-lg px-4 py-2 text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hud-num text-4xl font-semibold leading-none",
						children: Math.round(hud.speedKmh)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs tracking-widest text-muted",
						children: "KM/H"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel rounded-lg px-3 py-2 text-xs leading-relaxed",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["時間 ", fmt(hud.time)] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["本圈 ", fmt(hud.lapTime)] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["最佳 ", hud.bestLap != null ? fmt(hud.bestLap) : "--"] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimap, { hud })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-2 max-w-xs rounded-lg px-3 py-2 text-xs text-muted",
				children: [hud.objectives.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					i + 1,
					". ",
					o
				] }, o)), hud.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-danger",
					children: hud.hint
				}) : null]
			})
		]
	});
}
function Minimap({ hud }) {
	const pts = hud.trackLoop;
	if (!pts.length) return null;
	let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
	for (const p of pts) {
		minX = Math.min(minX, p.x);
		maxX = Math.max(maxX, p.x);
		minZ = Math.min(minZ, p.z);
		maxZ = Math.max(maxZ, p.z);
	}
	const w = 112;
	const h = 112;
	const sx = (x) => (x - minX) / Math.max(1, maxX - minX) * 104 + 4;
	const sz = (z) => (z - minZ) / Math.max(1, maxZ - minZ) * 104 + 4;
	const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.x).toFixed(1)} ${sz(p.z).toFixed(1)}`).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: w,
		height: h,
		className: "panel rounded-lg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `${d} Z`,
			fill: "none",
			stroke: "var(--color-primary)",
			strokeWidth: "2"
		}), hud.minimap.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: sx(c.x),
			cy: sz(c.z),
			r: c.isPlayer ? 4 : 2.5,
			fill: c.isPlayer ? "var(--color-accent)" : c.isRival ? "var(--color-danger)" : "var(--color-fg)"
		}, i))]
	});
}
function fmt(t) {
	const m = Math.floor(t / 60);
	return `${m}:${(t - m * 60).toFixed(2).padStart(5, "0")}`;
}
function GameApp() {
	const screen = useCareer((s) => s.screen);
	const hydrate = useCareer((s) => s.hydrate);
	const hydrated = useCareer((s) => s.hydrated);
	const save = useCareer((s) => s.save);
	const raceNonce = useCareer((s) => s.raceNonce);
	const audioRef = (0, import_react.useRef)(null);
	if (!audioRef.current) audioRef.current = new GameAudio();
	const audio = audioRef.current;
	(0, import_react.useEffect)(() => {
		hydrate();
		const unlock = () => audio.unlock();
		window.addEventListener("pointerdown", unlock);
		window.addEventListener("keydown", unlock);
		const vis = () => {
			if (!document.hidden) audio.resume();
		};
		document.addEventListener("visibilitychange", vis);
		return () => {
			window.removeEventListener("pointerdown", unlock);
			window.removeEventListener("keydown", unlock);
			document.removeEventListener("visibilitychange", vis);
		};
	}, [hydrate, audio]);
	(0, import_react.useEffect)(() => {
		audio.setVolumes(save.settings.master, save.settings.sfx, save.settings.muted);
	}, [
		audio,
		save.settings.master,
		save.settings.sfx,
		save.settings.muted
	]);
	(0, import_react.useEffect)(() => {
		const onClick = (e) => {
			const t = e.target;
			if (t && t.closest("button")) audio.click();
		};
		window.addEventListener("click", onClick);
		return () => window.removeEventListener("click", onClick);
	}, [audio]);
	(0, import_react.useEffect)(() => {
		window.__careerQa = {
			getSave: () => useCareer.getState().save,
			getScreen: () => useCareer.getState().screen,
			newGame: () => useCareer.getState().newGame(),
			go: (s) => useCareer.getState().go(s),
			buyCar: (id) => useCareer.getState().buyCar(id),
			buyUpgrade: (id, cat) => useCareer.getState().buyUpgrade(id, cat),
			selectCar: (id) => useCareer.getState().selectCar(id),
			applyPaint: (id, paint) => useCareer.getState().applyPaint(id, paint),
			openLevel: (id) => useCareer.getState().openLevel(id),
			startRace: () => useCareer.getState().startRace()
		};
	}, []);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmHost, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastHost, {})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-dvh w-full overflow-hidden bg-bg text-fg",
		children: [
			screen === "boot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootScreen, {}),
			screen === "intro" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroScreen, {}),
			screen === "hub" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubScreen, {}),
			screen === "levels" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LevelsScreen, {}),
			screen === "prerace" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreRaceScreen, {}),
			screen === "dialogue" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogueScreen, {}),
			screen === "garage" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GarageScreen, {}),
			screen === "shop" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopScreen, {}),
			screen === "tune" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TuneScreen, {}),
			screen === "paint" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaintScreen, {}),
			screen === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsScreen, {}),
			screen === "help" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpScreen, {}),
			screen === "race" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RaceView, { audio }, raceNonce),
			screen === "results" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsScreen, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmHost, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastHost, {})
		]
	});
}
var routes_exports = /* @__PURE__ */ __exportAll({ component: () => Home });
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameApp, {});
}
//#endregion
export { CAR_MAP as a, collideCars as c, spawnCar as d, stepCar as f, LEVEL_MAP as g, sampleAt as h, starChecks as i, maybeFinish as l, distForward as m, sortField as n, effectiveStats as o, buildTrack as p, standingsOf as r, emptyUpgrades as s, routes_exports as t, resetCar as u };
