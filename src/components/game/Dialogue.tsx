import { useState } from "react";
import { SPEAKERS } from "@/game/data/story";
import { ART, portraitOf } from "@/lib/art";
import { cn } from "@/lib/utils";
import { Btn, Stage } from "./uiBits";

export function DialogueBox({
  title,
  lines,
  onDone,
}: {
  title?: string;
  lines: string[];
  onDone: () => void;
}) {
  const [i, setI] = useState(0);
  const safe = lines.length ? lines : ["que:準備好了就上場。"];
  const line = safe[Math.min(i, safe.length - 1)];
  const idx = line.indexOf(":");
  const who = idx >= 0 ? line.slice(0, idx) : "que";
  const text = idx >= 0 ? line.slice(idx + 1) : line;
  const speaker = SPEAKERS[who] ?? { name: who, tone: "text-primary" };
  const last = i >= safe.length - 1;
  const portrait = portraitOf(who);

  return (
    <Stage src={ART.dialogue}>
      <div className="flex min-h-0 flex-1 flex-col justify-end">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[58%] sm:inset-y-0 sm:right-auto sm:left-6 sm:h-auto sm:w-[42%]">
          <img
            key={who}
            src={portrait}
            alt=""
            className="h-full w-full object-cover object-[center_18%] sm:object-top"
          />
          <div className="portrait-fade absolute inset-0" />
        </div>
        <div className="relative z-10 m-3 rounded-xl border border-border/70 bg-surface/90 p-4 shadow-lift sm:m-5 sm:ml-auto sm:max-w-xl sm:p-5">
          {title ? (
            <p className="mb-2 font-display text-xs tracking-[0.28em] text-primary">{title}</p>
          ) : null}
          <p className={cn("font-display text-sm font-semibold", speaker.tone)}>{speaker.name}</p>
          <p className="mt-2 min-h-16 text-base leading-relaxed text-fg">{text}</p>
          <div className="mt-4 flex justify-end gap-2">
            <Btn variant="ghost" onClick={onDone}>
              跳過
            </Btn>
            <Btn onClick={() => (last ? onDone() : setI(i + 1))}>{last ? "繼續" : "下一句"}</Btn>
          </div>
        </div>
      </div>
    </Stage>
  );
}
