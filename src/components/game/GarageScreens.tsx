import { CARS, CAR_MAP, effectiveStats } from "@/game/data/cars";
import { UPGRADE_CATS, UPGRADE_MAX, upgradePrice } from "@/game/data/upgrades";
import { ART } from "@/lib/art";
import { cn } from "@/lib/utils";
import { moneyText, useCareer } from "@/store/career";
import type { CarId } from "@/game/types";
import { CarPreview } from "./CarPreview";
import { Btn, Stage, StatBar, TopBar } from "./uiBits";

export function GarageScreen() {
  const save = useCareer((s) => s.save);
  const go = useCareer((s) => s.go);
  const selectCar = useCareer((s) => s.selectCar);
  const owned = CARS.filter((c) => save.cars[c.id].owned);
  const selected = CAR_MAP[save.selectedCar];
  const selectedSave = save.cars[save.selectedCar];
  const selectedStats = effectiveStats(selected, selectedSave.upgrades);
  return (
    <Stage src={ART.dialogue} dim="scrim-soft">
      <TopBar
        money={moneyText(save.money)}
        stars={save.totalStars}
        car={selected.name}
        right={
          <Btn variant="ghost" onClick={() => go("hub")}>
            返回
          </Btn>
        }
      />
      <div className="grid min-h-0 flex-1 gap-3 overflow-auto p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="panel-solid flex min-h-56 flex-col overflow-hidden rounded-xl">
          <div className="relative h-48 bg-bg-2 sm:h-64">
            <CarPreview style={selected.style} paint={selectedSave.paint} />
          </div>
          <div className="p-4">
            <p className="font-display text-xs tracking-[0.28em] text-primary">ACTIVE</p>
            <h3 className="mt-1 font-display text-2xl font-semibold">{selected.name}</h3>
            <p className="text-sm text-muted">
              {selected.cls} · {selected.tagline}
            </p>
            <p className="mt-2 font-display text-accent">性能 {selectedStats.score}</p>
            <div className="mt-3 space-y-1">
              <StatBar label="極速" value={selectedStats.topSpeed} max={70} />
              <StatBar label="加速" value={selectedStats.accel} max={20} />
              <StatBar label="操控" value={selectedStats.handling} max={3.2} />
              <StatBar label="煞車" value={selectedStats.brake} max={28} />
              <StatBar label="抓地" value={selectedStats.grip} max={1} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Btn
                variant="ghost"
                onClick={() => useCareer.setState({ tuneCar: selected.id, screen: "tune" })}
              >
                升級
              </Btn>
              <Btn
                variant="ghost"
                onClick={() =>
                  useCareer.setState({
                    tuneCar: selected.id,
                    paintDraft: { ...selectedSave.paint },
                    screen: "paint",
                  })
                }
              >
                塗裝
              </Btn>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {owned.map((c) => {
            const st = effectiveStats(c, save.cars[c.id].upgrades);
            const active = save.selectedCar === c.id;
            return (
              <div key={c.id} className={cn("panel-solid rounded-xl p-4", active && "shadow-border-hover")}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                  {active ? <span className="text-xs tracking-widest text-primary">使用中</span> : <span className="text-xs text-muted">{c.cls}</span>}
                </div>
                <p className="text-sm text-muted">{c.tagline}</p>
                <p className="mt-1 font-display text-sm text-accent">性能 {st.score}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {!active ? (
                    <Btn onClick={() => selectCar(c.id)}>選用</Btn>
                  ) : (
                    <Btn disabled>已選用</Btn>
                  )}
                  <Btn
                    variant="ghost"
                    onClick={() => useCareer.setState({ tuneCar: c.id, screen: "tune" })}
                  >
                    升級
                  </Btn>
                  <Btn
                    variant="ghost"
                    onClick={() =>
                      useCareer.setState({
                        tuneCar: c.id,
                        paintDraft: { ...save.cars[c.id].paint },
                        screen: "paint",
                      })
                    }
                  >
                    塗裝
                  </Btn>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Stage>
  );
}

export function ShopScreen() {
  const save = useCareer((s) => s.save);
  const go = useCareer((s) => s.go);
  const buyCar = useCareer((s) => s.buyCar);
  const shopCar = useCareer((s) => s.shopCar);
  const def = CAR_MAP[shopCar];
  const owned = save.cars[shopCar].owned;
  const st = effectiveStats(def, save.cars[shopCar].upgrades);
  return (
    <Stage src={ART.hub} dim="scrim-soft">
      <TopBar
        money={moneyText(save.money)}
        stars={save.totalStars}
        car={CAR_MAP[save.selectedCar].name}
        right={
          <Btn variant="ghost" onClick={() => go("hub")}>
            返回
          </Btn>
        }
      />
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-4 md:flex-row">
        <div className="flex gap-2 overflow-auto md:w-52 md:flex-col">
          {CARS.map((c) => {
            const mine = save.cars[c.id].owned;
            const locked = save.totalStars < c.unlockStars && !mine;
            return (
              <button
                key={c.id}
                onClick={() => useCareer.setState({ shopCar: c.id })}
                className={cn(
                  "min-h-11 rounded-md px-3 py-2 text-left text-sm transition-transform duration-150 ease-out active:scale-[0.96]",
                  shopCar === c.id ? "bg-primary text-bg" : "bg-surface-2 text-fg shadow-border",
                )}
              >
                <span className="block">{c.name}</span>
                <span className={cn("block text-[11px]", shopCar === c.id ? "text-bg/70" : "text-muted")}>
                  {mine ? "已擁有" : locked ? `★${c.unlockStars}` : moneyText(c.price)}
                </span>
              </button>
            );
          })}
        </div>
        <div className="panel-solid flex-1 overflow-hidden rounded-xl">
          <div className="h-48 bg-bg-2 sm:h-56">
            <CarPreview style={def.style} paint={owned ? save.cars[shopCar].paint : def.defaultPaint} />
          </div>
          <div className="p-5">
            <h3 className="font-display text-2xl font-semibold">{def.name}</h3>
            <p className="text-sm text-muted">
              {def.nameEn} · {def.cls} · {def.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed">{def.blurb}</p>
            <p className="mt-3 font-display text-accent">
              售價 {def.price === 0 || owned ? "已擁有" : moneyText(def.price)}
            </p>
            <p className="text-xs text-muted">
              需要星星 {def.unlockStars}（目前 {save.totalStars}）
              {save.totalStars < def.unlockStars && !owned ? " · 尚未解鎖" : ""}
            </p>
            <div className="mt-4 space-y-1">
              <StatBar label="極速" value={st.topSpeed} max={70} />
              <StatBar label="加速" value={st.accel} max={20} />
              <StatBar label="操控" value={st.handling} max={3.2} />
              <StatBar label="煞車" value={st.brake} max={28} />
              <StatBar label="抓地" value={st.grip} max={1} />
            </div>
            {!owned && save.selectedCar !== def.id ? (
              <CompareNote id={def.id} />
            ) : null}
            <div className="mt-5">
              {owned ? (
                <Btn disabled>已擁有</Btn>
              ) : save.totalStars < def.unlockStars ? (
                <Btn disabled>星星不足</Btn>
              ) : save.money < def.price ? (
                <Btn disabled>資金不足</Btn>
              ) : (
                <Btn onClick={() => buyCar(def.id as CarId)}>購買</Btn>
              )}
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

function CompareNote({ id }: { id: CarId }) {
  const save = useCareer((s) => s.save);
  const mine = CAR_MAP[save.selectedCar];
  const other = CAR_MAP[id];
  const a = effectiveStats(mine, save.cars[mine.id].upgrades);
  const b = effectiveStats(other, save.cars[id].upgrades);
  const row = (label: string, d: number, digits = 1) => {
    if (Math.abs(d) < 0.05) return null;
    return (
      <span className={d > 0 ? "text-primary" : "text-danger"}>
        {label} {d > 0 ? "+" : ""}
        {d.toFixed(digits)}
      </span>
    );
  };
  return (
    <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
      相對 {mine.name}：
      {row("極速", b.topSpeed - a.topSpeed)}
      {row("加速", b.accel - a.accel)}
      {row("操控", b.handling - a.handling)}
      {row("煞車", b.brake - a.brake)}
      {row("抓地", b.grip - a.grip, 2)}
    </p>
  );
}

export function TuneScreen() {
  const save = useCareer((s) => s.save);
  const go = useCareer((s) => s.go);
  const id = useCareer((s) => s.tuneCar);
  const buyUpgrade = useCareer((s) => s.buyUpgrade);
  const def = CAR_MAP[id];
  const car = save.cars[id];
  const st = effectiveStats(def, car.upgrades);
  return (
    <Stage src={ART.dialogue} dim="scrim-soft">
      <TopBar
        money={moneyText(save.money)}
        stars={save.totalStars}
        car={def.name}
        right={
          <Btn variant="ghost" onClick={() => go("garage")}>
            返回車庫
          </Btn>
        }
      />
      <div className="mx-auto w-full max-w-lg flex-1 overflow-auto p-4">
        <div className="panel-solid mb-4 overflow-hidden rounded-xl">
          <div className="h-36 bg-bg-2">
            <CarPreview style={def.style} paint={car.paint} />
          </div>
          <div className="p-4">
            <h2 className="font-display text-xl font-semibold">{def.name} 升級</h2>
            <p className="text-sm text-accent">性能分數 {st.score}</p>
          </div>
        </div>
        <div className="space-y-3">
          {UPGRADE_CATS.map((cat) => {
            const lv = car.upgrades[cat.id];
            const maxed = lv >= UPGRADE_MAX;
            const price = maxed ? 0 : upgradePrice(cat.id, lv + 1);
            return (
              <div key={cat.id} className="panel-solid rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold">{cat.name}</span>
                  <span className="text-sm text-muted">
                    Lv.{lv}/{UPGRADE_MAX}
                  </span>
                </div>
                <p className="text-xs text-muted">{cat.desc}</p>
                <Btn className="mt-3" disabled={maxed} onClick={() => buyUpgrade(id, cat.id)}>
                  {maxed ? "已滿級" : `升級 ${moneyText(price)}`}
                </Btn>
              </div>
            );
          })}
        </div>
      </div>
    </Stage>
  );
}

export function PaintScreen() {
  const save = useCareer((s) => s.save);
  const go = useCareer((s) => s.go);
  const id = useCareer((s) => s.tuneCar);
  const draft = useCareer((s) => s.paintDraft);
  const applyPaint = useCareer((s) => s.applyPaint);
  const def = CAR_MAP[id];

  return (
    <Stage src={ART.dialogue} dim="scrim-soft">
      <TopBar
        money={moneyText(save.money)}
        stars={save.totalStars}
        car={def.name}
        right={
          <Btn variant="ghost" onClick={() => go("garage")}>
            返回車庫
          </Btn>
        }
      />
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 overflow-auto p-4">
        <div className="h-52 overflow-hidden rounded-xl bg-bg-2">
          <CarPreview style={def.style} paint={draft} />
        </div>
        <label className="text-sm">
          車身顏色
          <input
            type="color"
            className="ml-3 h-10 w-16 bg-transparent"
            value={toHex(draft.body)}
            onChange={(e) => useCareer.setState({ paintDraft: { ...draft, body: e.target.value } })}
          />
        </label>
        <label className="text-sm">
          輪圈顏色
          <input
            type="color"
            className="ml-3 h-10 w-16 bg-transparent"
            value={toHex(draft.rim)}
            onChange={(e) => useCareer.setState({ paintDraft: { ...draft, rim: e.target.value } })}
          />
        </label>
        <label className="text-sm">
          金屬光澤 {Math.round(draft.metalness * 100)}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={draft.metalness}
            onChange={(e) =>
              useCareer.setState({ paintDraft: { ...draft, metalness: Number(e.target.value) } })
            }
            className="mt-2 w-full accent-primary"
          />
        </label>
        <Btn onClick={() => applyPaint(id, draft)}>套用並保存</Btn>
      </div>
    </Stage>
  );
}

function toHex(c: string) {
  if (c.startsWith("#") && (c.length === 7 || c.length === 4)) return c;
  return "#2ee6d6";
}
