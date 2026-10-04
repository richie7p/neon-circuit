import { useEffect, useRef, useState } from "react";
import type { HudSnap, RaceResult } from "@/game/types";
import { GameAudio } from "@/game/audio";
import { useCareer } from "@/store/career";
import { Btn } from "./uiBits";

export function RaceView({ audio }: { audio: GameAudio }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<{ dispose: () => void; setPaused: (v: boolean) => void } | null>(null);
  const save = useCareer((s) => s.save);
  const levelId = useCareer((s) => s.selectedLevel);
  const finishRace = useCareer((s) => s.finishRace);
  const leaveRace = useCareer((s) => s.leaveRace);
  const startRace = useCareer((s) => s.startRace);
  const [hud, setHud] = useState<HudSnap | null>(null);
  const [paused, setPaused] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const touch = useRef({ throttle: 0, brake: 0, steer: 0, handbrake: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let engine: import("@/game/engine").RaceEngine | null = null;
    (async () => {
      try {
        const { RaceEngine } = await import("@/game/engine");
        if (cancelled || !canvasRef.current) return;
        engine = new RaceEngine(canvasRef.current, save, levelId, audio, {
          onHud: (h) => {
            setHud(h);
            if (h.paused) setPaused(true);
          },
          onFinish: (partial) => {
            const result = partial as Omit<RaceResult, "payout" | "breakdown" | "alreadyStars">;
            finishRace(result);
          },
          onCountdown: (n) => audio.countdown(n),
          onCollide: () => audio.collide(),
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
  }, [levelId, audio, save, finishRace]);

  const bindTouch = (partial: Partial<typeof touch.current>, on: boolean) => {
    Object.assign(touch.current, on ? partial : zeroTouch(partial));
    const eng = engineRef.current as unknown as { input?: { touch: typeof touch.current } } | null;
    if (eng && "input" in eng && eng.input) {
      Object.assign(eng.input.touch, touch.current);
    }
  };

  if (err) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 bg-bg p-6">
        <p className="text-danger">{err}</p>
        <Btn onClick={leaveRace}>返回</Btn>
      </div>
    );
  }

  return (
    <div className="relative h-full bg-bg">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full touch-none bg-bg-2" />
      {hud ? <Hud hud={hud} /> : <div className="absolute inset-0 flex items-center justify-center text-muted">載入賽道…</div>}
      {hud?.countdown != null && hud.countdown > 0 ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-display text-8xl font-extrabold text-primary drop-shadow-lg">{hud.countdown}</span>
        </div>
      ) : null}
      {hud && hud.goFlash > 0.05 && hud.countdown == null ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-display text-7xl font-extrabold text-accent drop-shadow-lg">GO</span>
        </div>
      ) : null}
      {paused ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-bg/70 p-4">
          <div className="panel-solid w-full max-w-sm rounded-xl p-5 shadow-lift">
            <h2 className="font-display text-xl font-semibold">暫停</h2>
            <div className="mt-4 flex flex-col gap-2">
              <Btn
                onClick={() => {
                  setPaused(false);
                  engineRef.current?.setPaused(false);
                }}
              >
                繼續比賽
              </Btn>
              <Btn
                variant="ghost"
                onClick={() => {
                  engineRef.current?.dispose();
                  startRace();
                }}
              >
                重新開始
              </Btn>
              <Btn variant="danger" onClick={leaveRace}>
                離開比賽
              </Btn>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="absolute top-3 right-3 z-10 min-h-11 rounded-md bg-surface/80 px-3 text-sm shadow-border"
          onClick={() => {
            setPaused(true);
            engineRef.current?.setPaused(true);
          }}
        >
          暫停
        </button>
      )}
      <div className="absolute inset-x-0 bottom-2 z-10 flex justify-between px-2 md:hidden">
        <div className="flex gap-2">
          <TouchBtn label="←" on={(v) => bindTouch({ steer: v ? 1 : 0 }, v)} />
          <TouchBtn label="→" on={(v) => bindTouch({ steer: v ? -1 : 0 }, v)} />
        </div>
        <div className="flex gap-2">
          <TouchBtn label="煞" on={(v) => bindTouch({ brake: v ? 1 : 0 }, v)} />
          <TouchBtn label="手煞" on={(v) => bindTouch({ handbrake: v }, v)} />
          <TouchBtn label="油" on={(v) => bindTouch({ throttle: v ? 1 : 0 }, v)} />
        </div>
      </div>
    </div>
  );
}

function zeroTouch(p: object) {
  const o: Record<string, number | boolean> = {};
  for (const k of Object.keys(p)) o[k] = typeof (p as Record<string, unknown>)[k] === "boolean" ? false : 0;
  return o;
}

function TouchBtn({ label, on }: { label: string; on: (v: boolean) => void }) {
  return (
    <button
      className="min-h-14 min-w-14 rounded-lg bg-surface/80 text-lg font-semibold shadow-border"
      onPointerDown={(e) => {
        e.preventDefault();
        on(true);
      }}
      onPointerUp={() => on(false)}
      onPointerCancel={() => on(false)}
      onPointerLeave={() => on(false)}
    >
      {label}
    </button>
  );
}

function Hud({ hud }: { hud: HudSnap }) {
  return (
    <div className="pointer-events-none absolute inset-0 p-3 text-sm">
      <div className="flex justify-between gap-3">
        <div className="panel rounded-lg px-3 py-2">
          <div className="font-display text-3xl font-semibold text-primary">
            {hud.place}
            <span className="text-base text-muted">/{hud.field}</span>
          </div>
          <div className="text-xs text-muted">
            圈 {hud.lap}/{hud.laps}
          </div>
          {hud.gapText ? <div className="mt-1 text-xs text-accent">{hud.gapText}</div> : null}
        </div>
        <div className="panel rounded-lg px-4 py-2 text-right">
          <div className="hud-num text-4xl font-semibold leading-none">{Math.round(hud.speedKmh)}</div>
          <div className="text-xs tracking-widest text-muted">KM/H</div>
        </div>
      </div>
      <div className="mt-2 flex justify-between gap-3">
        <div className="panel rounded-lg px-3 py-2 text-xs leading-relaxed">
          <div>時間 {fmt(hud.time)}</div>
          <div>本圈 {fmt(hud.lapTime)}</div>
          <div>最佳 {hud.bestLap != null ? fmt(hud.bestLap) : "--"}</div>
        </div>
        <Minimap hud={hud} />
      </div>
      <div className="panel mt-2 max-w-xs rounded-lg px-3 py-2 text-xs text-muted">
        {hud.objectives.map((o, i) => (
          <div key={o}>
            {i + 1}. {o}
          </div>
        ))}
        {hud.hint ? <div className="mt-1 text-danger">{hud.hint}</div> : null}
      </div>
    </div>
  );
}

function Minimap({ hud }: { hud: HudSnap }) {
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
  const sx = (x: number) => ((x - minX) / Math.max(1, maxX - minX)) * (w - 8) + 4;
  const sz = (z: number) => ((z - minZ) / Math.max(1, maxZ - minZ)) * (h - 8) + 4;
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.x).toFixed(1)} ${sz(p.z).toFixed(1)}`).join(" ");
  return (
    <svg width={w} height={h} className="panel rounded-lg">
      <path d={`${d} Z`} fill="none" stroke="var(--color-primary)" strokeWidth="2" />
      {hud.minimap.map((c, i) => (
        <circle
          key={i}
          cx={sx(c.x)}
          cy={sz(c.z)}
          r={c.isPlayer ? 4 : 2.5}
          fill={c.isPlayer ? "var(--color-accent)" : c.isRival ? "var(--color-danger)" : "var(--color-fg)"}
        />
      ))}
    </svg>
  );
}

function fmt(t: number) {
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  return `${m}:${s.toFixed(2).padStart(5, "0")}`;
}
