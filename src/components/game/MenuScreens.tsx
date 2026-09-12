import { Settings } from "lucide-react";
import { STORY } from "@/game/data/story";
import { CAR_MAP } from "@/game/data/cars";
import { ART } from "@/lib/art";
import { moneyText, useCareer } from "@/store/career";
import { CarPreview } from "./CarPreview";
import { DialogueBox } from "./Dialogue";
import { Btn, Modal, Stage, TopBar } from "./uiBits";

export function BootScreen() {
  const hasFile = useCareer((s) => s.hasFile);
  const requestNewGame = useCareer((s) => s.requestNewGame);
  const continueGame = useCareer((s) => s.continueGame);
  const go = useCareer((s) => s.go);
  return (
    <Stage src={ART.boot}>
      <div className="flex min-h-0 flex-1 flex-col justify-end px-5 pb-8 sm:px-10 sm:pb-12">
        <div className="stagger-in mx-auto w-full max-w-lg sm:mx-0">
          <p className="font-display text-xs tracking-[0.48em] text-primary">ARCADE CAREER</p>
          <h1 className="mt-3 font-display text-5xl font-extrabold tracking-wide text-fg sm:text-6xl">
            {STORY.title}
          </h1>
          <p className="mt-2 font-display text-sm tracking-[0.32em] text-muted">{STORY.titleEn}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-fg/85">{STORY.chapter}</p>
          <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
            {hasFile ? (
              <Btn onClick={continueGame} className="w-full">
                繼續遊戲
              </Btn>
            ) : null}
            <Btn onClick={requestNewGame} variant={hasFile ? "ghost" : "primary"} className="w-full">
              新遊戲
            </Btn>
            <div className="grid grid-cols-2 gap-3">
              <Btn onClick={() => go("help")} variant="ghost" className="w-full">
                操作說明
              </Btn>
              <Btn onClick={() => go("settings")} variant="ghost" className="w-full">
                設定
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

export function HubScreen() {
  const save = useCareer((s) => s.save);
  const go = useCareer((s) => s.go);
  const def = CAR_MAP[save.selectedCar];
  const car = save.cars[save.selectedCar];
  return (
    <Stage src={ART.hub} dim="scrim-soft">
      <TopBar
        money={moneyText(save.money)}
        stars={save.totalStars}
        car={def.name}
        right={
          <div className="flex gap-2">
            <Btn variant="ghost" onClick={() => go("settings")} className="px-3">
              <Settings className="size-4" />
              <span className="ml-2 hidden sm:inline">設定</span>
            </Btn>
            <Btn variant="ghost" onClick={() => go("boot")}>
              主選單
            </Btn>
          </div>
        }
      />
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-auto p-4 md:grid-cols-2">
        <HubArt
          src={ART.levels["l3-downtown"]}
          kicker="CHAPTER 01"
          title="故事賽事"
          desc={STORY.chapter}
          onClick={() => go("levels")}
          className="min-h-44 md:row-span-2 md:min-h-0"
        />
        <HubArt
          src={ART.dialogue}
          kicker="GARAGE"
          title="車庫"
          desc="選車、升級、塗裝"
          onClick={() => go("garage")}
          className="min-h-36"
        />
        <HubArt
          src={ART.levels["l1-harbor"]}
          kicker="DEALER"
          title="車店"
          desc="用獎金購入更快的車"
          onClick={() => go("shop")}
          className="min-h-36"
        />
        <div className="panel-solid flex min-h-36 items-stretch overflow-hidden rounded-xl md:col-span-2">
          <div className="relative hidden w-56 shrink-0 bg-bg-2 sm:block">
            <CarPreview style={def.style} paint={car.paint} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center p-4">
            <p className="text-xs tracking-[0.28em] text-muted">目前座車</p>
            <p className="mt-1 font-display text-xl font-semibold">{def.name}</p>
            <p className="truncate text-sm text-muted">
              {def.tagline}　引擎 Lv.{car.upgrades.engine}　輪胎 Lv.{car.upgrades.tires}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Btn variant="ghost" onClick={() => go("garage")}>
                開進車庫
              </Btn>
              <Btn variant="ghost" onClick={() => go("help")}>
                操作說明
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </Stage>
  );
}

function HubArt({
  src,
  kicker,
  title,
  desc,
  onClick,
  className,
}: {
  src: string;
  kicker: string;
  title: string;
  desc: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button onClick={onClick} className={`art-card rounded-xl text-left ${className ?? ""}`}>
      <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="art-fade absolute inset-0" />
      <span className="relative z-10 flex h-full flex-col justify-end p-5">
        <span className="font-display text-xs tracking-[0.32em] text-primary">{kicker}</span>
        <span className="mt-1 block font-display text-2xl font-semibold">{title}</span>
        <span className="mt-1 block text-sm text-fg/80">{desc}</span>
      </span>
    </button>
  );
}

export function HelpScreen() {
  const go = useCareer((s) => s.go);
  const save = useCareer((s) => s.save);
  const back = save.seenIntro ? "hub" : "boot";
  return (
    <Stage src={ART.boot} dim="scrim-soft">
      <header className="flex items-center justify-between px-4 py-3">
        <h2 className="font-display text-lg font-semibold text-primary">操作說明</h2>
        <Btn variant="ghost" onClick={() => go(back)}>
          返回
        </Btn>
      </header>
      <div className="mx-auto w-full max-w-xl flex-1 overflow-auto p-5">
        <div className="panel-solid rounded-xl p-5">
          <ul className="space-y-3 text-sm leading-relaxed">
            <HelpRow k="W / ↑" v="加速" />
            <HelpRow k="S / ↓" v="煞車與倒車" />
            <HelpRow k="A / ←" v="左轉" />
            <HelpRow k="D / →" v="右轉" />
            <HelpRow k="空白鍵" v="手煞車／漂移" />
            <HelpRow k="R" v="重置到最近的有效賽道位置" />
            <HelpRow k="Esc" v="暫停" />
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-muted">
            與 7 台 AI 同場競技。車店共 10 台原創車輛，星星與獎金用來解鎖、購買與升級。必須依序通過檢查點才算圈數。
          </p>
        </div>
      </div>
    </Stage>
  );
}

function HelpRow({ k, v }: { k: string; v: string }) {
  return (
    <li className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2 last:border-0 last:pb-0">
      <span className="font-display text-primary">{k}</span>
      <span className="text-fg/90">{v}</span>
    </li>
  );
}

export function SettingsScreen() {
  const save = useCareer((s) => s.save);
  const setSettings = useCareer((s) => s.setSettings);
  const go = useCareer((s) => s.go);
  const requestWipe = useCareer((s) => s.requestWipe);
  const s = save.settings;
  const back = save.seenIntro ? "hub" : "boot";
  return (
    <Stage src={ART.hub} dim="scrim-soft">
      <header className="flex items-center justify-between px-4 py-3">
        <h2 className="font-display text-lg font-semibold">設定</h2>
        <Btn variant="ghost" onClick={() => go(back)}>
          返回
        </Btn>
      </header>
      <div className="mx-auto w-full max-w-lg flex-1 space-y-4 overflow-auto p-5">
        <div className="panel-solid space-y-5 rounded-xl p-5">
          <label className="block text-sm">
            主音量 {Math.round(s.master * 100)}
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={s.master}
              onChange={(e) => setSettings({ master: Number(e.target.value) })}
              className="mt-2 w-full accent-primary"
            />
          </label>
          <label className="block text-sm">
            音效音量 {Math.round(s.sfx * 100)}
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={s.sfx}
              onChange={(e) => setSettings({ sfx: Number(e.target.value) })}
              className="mt-2 w-full accent-primary"
            />
          </label>
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <input type="checkbox" checked={s.muted} onChange={(e) => setSettings({ muted: e.target.checked })} />
            靜音
          </label>
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={s.quality === "high"}
              onChange={(e) => setSettings({ quality: e.target.checked ? "high" : "low" })}
            />
            高畫質
          </label>
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <input type="checkbox" checked={s.shadows} onChange={(e) => setSettings({ shadows: e.target.checked })} />
            陰影
          </label>
        </div>
        <Btn variant="ghost" onClick={() => go("help")} className="w-full">
          操作說明
        </Btn>
        <Btn variant="danger" onClick={requestWipe} className="w-full">
          清除遊戲進度
        </Btn>
      </div>
    </Stage>
  );
}

export function ConfirmHost() {
  const confirm = useCareer((s) => s.confirm);
  const confirmYes = useCareer((s) => s.confirmYes);
  const confirmNo = useCareer((s) => s.confirmNo);
  if (!confirm) return null;
  return (
    <Modal title={confirm.title}>
      <p className="text-sm leading-relaxed text-muted">{confirm.body}</p>
      <div className="mt-5 flex justify-end gap-2">
        <Btn variant="ghost" onClick={confirmNo}>
          取消
        </Btn>
        <Btn variant="danger" onClick={confirmYes}>
          確定
        </Btn>
      </div>
    </Modal>
  );
}

export function ToastHost() {
  const toast = useCareer((s) => s.toast);
  if (!toast) return null;
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md bg-surface-2 px-4 py-2 text-sm shadow-lift">
      {toast.text}
    </div>
  );
}

export function IntroScreen() {
  return (
    <DialogueBox
      title={STORY.chapter}
      lines={STORY.opening}
      onDone={() => {
        const cur = useCareer.getState();
        const save = structuredClone(cur.save);
        save.seenIntro = true;
        cur.save.seenIntro = true;
        useCareer.setState({ save, screen: "hub" });
        cur.persist();
      }}
    />
  );
}
