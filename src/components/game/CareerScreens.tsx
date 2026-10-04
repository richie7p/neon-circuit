import { CARS, CAR_MAP, effectiveStats } from "@/game/data/cars";
import { LEVELS, LEVEL_MAP } from "@/game/data/levels";
import { starReason } from "@/game/raceLogic";
import { STORY } from "@/game/data/story";
import { ART, levelArt } from "@/lib/art";
import { cn } from "@/lib/utils";
import { moneyText, useCareer } from "@/store/career";
import { CarPreview } from "./CarPreview";
import { DialogueBox } from "./Dialogue";
import { Btn, Stage, Stars, TopBar } from "./uiBits";

export function LevelsScreen() {
  const save = useCareer((s) => s.save);
  const go = useCareer((s) => s.go);
  const openLevel = useCareer((s) => s.openLevel);
  const lockText = useCareer((s) => s.levelLockText);
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
      <div className="flex-1 overflow-auto p-4">
        <h2 className="mb-3 font-display text-xl font-semibold">{STORY.chapter}</h2>
        <div className="stagger-in grid gap-3 md:grid-cols-2">
          {LEVELS.map((lv) => {
            const st = save.levels[lv.id];
            const locked = !st.unlocked;
            return (
              <button
                key={lv.id}
                onClick={() => openLevel(lv.id)}
                disabled={locked}
                className="art-card min-h-36 rounded-xl text-left disabled:opacity-55"
              >
                <img src={levelArt(lv.id)} alt="" className={cn("absolute inset-0 h-full w-full object-cover", locked && "grayscale")} />
                <div className="art-fade absolute inset-0" />
                <span className="relative z-10 flex h-full flex-col justify-end p-4">
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-display text-lg font-semibold">
                      {lv.index}. {lv.name}
                    </span>
                    <Stars got={st.stars} />
                  </span>
                  <span className="mt-1 text-sm text-fg/80">{lv.subtitle}</span>
                  {locked ? <span className="mt-1 text-xs text-danger">解鎖：{lockText(lv.id)}</span> : null}
                  {st.bestPlace ? (
                    <span className="mt-1 text-xs text-primary">最佳：第 {st.bestPlace} 名</span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Stage>
  );
}

export function PreRaceScreen() {
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
  const cycle = (dir: number) => {
    if (owned.length < 2) return;
    const next = owned[(idx + dir + owned.length) % owned.length];
    selectCar(next.id);
  };
  return (
    <Stage src={levelArt(id)}>
      <TopBar
        money={moneyText(save.money)}
        stars={save.totalStars}
        car={def.name}
        right={
          <Btn variant="ghost" onClick={() => go("levels")}>
            返回
          </Btn>
        }
      />
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 overflow-auto p-5">
        <div>
          <p className="font-display text-xs tracking-[0.28em] text-primary">GRID BRIEFING</p>
          <h2 className="mt-1 font-display text-3xl font-semibold">{lv.name}</h2>
          <p className="text-sm text-fg/80">
            {lv.subtitle} 獎金基準 {moneyText(lv.prize)}
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="panel-solid rounded-xl p-4 text-sm">
            <p className="font-display text-primary">三星目標</p>
            <ul className="mt-2 space-y-1 text-fg/90">
              <li>完成比賽</li>
              <li>取得前 {lv.star2Place} 名</li>
              <li>{lv.star3.label}</li>
            </ul>
            <p className="mt-3 text-xs text-muted">提示：雨戰優先抓地，山道優先煞車與轉向。</p>
          </div>
          <div className="panel-solid overflow-hidden rounded-xl">
            <div className="h-28 bg-bg-2">
              <CarPreview style={def.style} paint={save.cars[save.selectedCar].paint} />
            </div>
            <div className="p-4 text-sm">
              <p>
                出戰：{def.name} {def.cls} 性能 {stats.score}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {owned.length > 1 ? (
                  <>
                    <Btn variant="ghost" onClick={() => cycle(-1)}>
                      上一台
                    </Btn>
                    <Btn variant="ghost" onClick={() => cycle(1)}>
                      下一台
                    </Btn>
                  </>
                ) : (
                  <Btn variant="ghost" onClick={() => go("garage")}>
                    更換車輛
                  </Btn>
                )}
                <Btn onClick={startRace}>開始比賽</Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

export function DialogueScreen() {
  const d = useCareer((s) => s.dialogue);
  const go = useCareer((s) => s.go);
  if (!d) return null;
  return <DialogueBox title={d.title} lines={d.lines} onDone={() => go(d.after)} />;
}

export function ResultsScreen() {
  const result = useCareer((s) => s.raceResult);
  const go = useCareer((s) => s.go);
  const save = useCareer((s) => s.save);
  if (!result) {
    return (
      <Stage src={ART.hub}>
        <div className="flex flex-1 items-center justify-center">
          <Btn onClick={() => go("hub")}>返回車庫</Btn>
        </div>
      </Stage>
    );
  }
  const lv = LEVEL_MAP[result.levelId];
  const starsNow = save.levels[result.levelId].stars;
  return (
    <Stage src={levelArt(result.levelId)}>
      <header className="border-b border-border/80 px-4 py-3">
        <h2 className="font-display text-xl font-semibold text-primary">賽後結算</h2>
        <p className="text-sm text-muted">{lv.name}</p>
      </header>
      <div className="mx-auto w-full max-w-lg flex-1 overflow-auto p-5">
        <p className="font-display text-4xl font-extrabold">
          {result.finished ? `第 ${result.place} 名` : "未完賽"}
        </p>
        <p className="mt-1 text-sm text-muted">
          總時間 {fmt(result.totalTime)} 最佳圈 {result.bestLap != null ? fmt(result.bestLap) : "--"}
        </p>
        <div className="mt-4 panel-solid rounded-xl p-4">
          <p className="font-display text-sm text-accent">星星</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>
              <StarsLine got={starsNow[0]} label="完成比賽" reason={result.finished ? "已達成" : "未完賽"} />
            </li>
            <li>
              <StarsLine
                got={starsNow[1]}
                label={`前 ${lv.star2Place} 名`}
                reason={starsNow[1] ? "已達成" : result.finished ? `名次第 ${result.place}` : "未完賽"}
              />
            </li>
            <li>
              <StarsLine
                got={starsNow[2]}
                label={lv.star3.label}
                reason={starReason(lv.star3, result.newStars[2] || starsNow[2], result, lv)}
              />
            </li>
          </ul>
        </div>
        <div className="mt-4 panel-solid rounded-xl p-4">
          <p className="font-display text-sm text-accent">獎金 {moneyText(result.payout)}</p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {result.breakdown.map((b) => (
              <li key={b.label} className="flex justify-between">
                <span>{b.label}</span>
                <span className="hud-num text-fg">{moneyText(b.amount)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 panel-solid rounded-xl p-4">
          <p className="font-display text-sm">最終排名</p>
          <ol className="mt-2 space-y-1 text-sm">
            {result.standings.map((s) => (
              <li key={s.place} className={s.isPlayer ? "text-primary" : ""}>
                {s.place}. {s.name}
                {s.finished && s.time != null ? ` ${fmt(s.time)}` : " DNF"}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Btn onClick={() => go("dialogue")}>聽賽後對話</Btn>
          <Btn variant="ghost" onClick={() => go("garage")}>
            前往車庫
          </Btn>
          <Btn variant="ghost" onClick={() => go("hub")}>
            返回大廳
          </Btn>
        </div>
      </div>
    </Stage>
  );
}

function StarsLine({ got, label, reason }: { got: boolean; label: string; reason: string }) {
  return (
    <div className="flex items-start gap-2">
      <span
        className={
          got
            ? "mt-1 inline-block size-2 shrink-0 rounded-full bg-accent"
            : "mt-1 inline-block size-2 shrink-0 rounded-full bg-muted/40"
        }
      />
      <span>
        {label}
        <span className="ml-2 text-xs text-muted">{reason}</span>
      </span>
    </div>
  );
}

function fmt(t: number) {
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  return `${m}:${s.toFixed(2).padStart(5, "0")}`;
}
