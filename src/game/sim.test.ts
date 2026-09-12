import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CAR_MAP, effectiveStats } from "./data/cars";
import { LEVELS } from "./data/levels";
import { emptyUpgrades } from "./data/cars";
import { applyResult, computePayout, starChecks, unlockLevels } from "./raceLogic";
import { defaultSave, migrate } from "./save";
import { runHeadlessRace } from "./simRace";
import { buildTrack } from "./trackGeom";
import { upgradePrice } from "./data/upgrades";

describe("tracks", () => {
  it("builds closed loops of usable length", () => {
    for (const id of ["harbor", "downtown", "ridge"] as const) {
      const t = buildTrack(id, false);
      const r = buildTrack(id, true);
      assert.ok(t.length > 400, `${id} too short ${t.length}`);
      assert.ok(t.cpCount >= 8);
      assert.equal(t.samples.length, r.samples.length);
      assert.ok(t.halfWidth > 4);
    }
  });
});

describe("save", () => {
  it("recovers corrupt and partial saves", () => {
    assert.equal(migrate(null).selectedCar, "skylark");
    assert.equal(migrate("{not json").selectedCar, "skylark");
    const d = migrate({ version: 1, money: -50, cars: { skylark: { owned: false } } });
    assert.equal(d.money, 0);
    assert.equal(d.cars.skylark.owned, true);
    const extra = migrate({ version: 1, money: 100, selectedCar: "skylark", cars: { skylark: { owned: true } } });
    assert.equal(extra.cars.ember.owned, false);
    assert.equal(extra.cars.heron.owned, false);
    assert.equal(extra.cars.marten.owned, false);
    assert.equal(extra.cars.arc.owned, false);
    assert.equal(extra.cars.comet.owned, false);
    assert.ok(Object.keys(extra.cars).length >= 10);
  });
});

describe("economy and stars", () => {
  it("does not double-pay the same race token", () => {
    const save = defaultSave();
    const level = LEVELS[0];
    const stars = starChecks(level, {
      finished: true,
      place: 1,
      collisions: 0,
      resets: 0,
      bestLap: 20,
    });
    assert.deepEqual(stars, [true, true, true]);
    const payout = computePayout(level, save, { finished: true, place: 1, collisions: 0, bestLap: 20 }, stars, [false, false, false]);
    const result = {
      token: "t1",
      levelId: level.id,
      place: 1,
      totalTime: 40,
      bestLap: 20,
      collisions: 0,
      resets: 0,
      driftMeters: 0,
      topSpeedKmh: 120,
      finished: true,
      standings: [],
      newStars: stars,
      alreadyStars: [false, false, false] as [boolean, boolean, boolean],
      payout: payout.total,
      breakdown: payout.breakdown,
    };
    const a = applyResult(save, result);
    const money = a.money;
    const b = applyResult(a, result);
    assert.equal(b.money, money);
    assert.equal(b.levels[level.id].cleared, true);
  });

  it("rejects duplicate upgrade purchases via max level", () => {
    assert.ok(upgradePrice("engine", 1) < upgradePrice("engine", 2));
  });

  it("upgrades actually change physics stats", () => {
    const car = CAR_MAP.skylark;
    const base = effectiveStats(car, emptyUpgrades());
    const up = emptyUpgrades();
    up.engine = 4;
    up.tires = 4;
    const next = effectiveStats(car, up);
    assert.ok(next.accel > base.accel);
    assert.ok(next.topSpeed > base.topSpeed);
    assert.ok(next.grip > base.grip);
  });

  it("unlocks later races after clearing previous", () => {
    const save = defaultSave();
    save.levels["l1-harbor"].cleared = true;
    save.levels["l1-harbor"].stars = [true, false, false];
    save.totalStars = 1;
    unlockLevels(save);
    assert.equal(save.levels["l2-harbor-rev"].unlocked, true);
  });
});

describe("headless race", () => {
  it("gets 8 cars around harbor without stacking forever", () => {
    const session = runHeadlessRace("l1-harbor", defaultSave(), 12);
    assert.equal(session.cars.length, 8);
    const moving = session.cars.filter((c) => c.trackDist > 20 || c.laps > 0 || c.speed > 5);
    assert.ok(moving.length >= 6, `only ${moving.length} cars progressed`);
  });

  it("lets AI complete a short harbor race", { timeout: 20000 }, () => {
    const session = runHeadlessRace("l1-harbor", defaultSave(), 90);
    const finished = session.cars.filter((c) => c.finished).length;
    assert.ok(finished >= 6, `only ${finished} finished: ${session.cars.map((c) => `${c.name} L${c.laps} cp${c.nextCp}`).join(" | ")}`);
    const places = session.cars.map((c) => c.place).sort();
    assert.deepEqual(places, [1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
