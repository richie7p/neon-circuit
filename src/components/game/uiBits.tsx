import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Btn({
  children,
  onClick,
  variant = "primary",
  className,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger" | "accent";
  className?: string;
  disabled?: boolean;
  type?: "button";
}) {
  const v = {
    primary: "bg-primary text-bg hover:brightness-110 font-semibold",
    accent: "bg-accent text-bg hover:brightness-110 font-semibold",
    ghost: "bg-surface-2/80 text-fg shadow-border hover:shadow-border-hover",
    danger: "bg-danger text-fg hover:brightness-110 font-semibold",
  }[variant];
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm tracking-wide",
        "transition-[box-shadow,filter,transform,background-color] duration-150 ease-out",
        "active:not-disabled:scale-[0.96]",
        v,
        className,
      )}
    >
      {children}
    </button>
  );
}

export function StatBar({ label, value, max = 1 }: { label: string; value: number; max?: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="grid grid-cols-[3.5rem_1fr_2.2rem] items-center gap-2 text-xs sm:grid-cols-[4.5rem_1fr_2.2rem]">
      <span className="text-muted">{label}</span>
      <div className="h-1.5 overflow-hidden rounded-full bg-bg">
        <div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
      <span className="hud-num text-right text-fg">{Math.round(pct)}</span>
    </div>
  );
}

function StarMark({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("inline size-3.5", filled ? "text-accent" : "text-muted/40")} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.6 14.4 8.4l6.3.6-4.8 4.1 1.4 6.1L12 16.6 6.7 19.2l1.4-6.1-4.8-4.1 6.3-.6L12 2.6z"
      />
    </svg>
  );
}

export function Stars({ got }: { got: [boolean, boolean, boolean] }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${got.filter(Boolean).length} 顆星`}>
      {got.map((g, i) => (
        <StarMark key={i} filled={g} />
      ))}
    </span>
  );
}

export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose?: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/70 p-4">
      <div className="panel-solid w-full max-w-md rounded-xl p-5 shadow-lift">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-primary">{title}</h2>
          {onClose ? (
            <button className="grid size-11 place-items-center text-muted hover:text-fg" onClick={onClose} aria-label="關閉">
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
                <path fill="currentColor" d="M6.4 5.3 12 10.9l5.6-5.6 1.1 1.1L13.1 12l5.6 5.6-1.1 1.1L12 13.1l-5.6 5.6-1.1-1.1L10.9 12 5.3 6.4z" />
              </svg>
            </button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  );
}

export function TopBar({
  money,
  stars,
  car,
  right,
}: {
  money: string;
  stars: number;
  car: string;
  right?: ReactNode;
}) {
  return (
    <header className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-bg/55 px-4 py-3 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-4">
        <span className="font-display text-sm font-semibold tracking-[0.22em] text-primary">NEON CIRCUIT</span>
        <span className="hud-num text-sm text-fg">{money}</span>
        <span className="inline-flex items-center gap-1 text-sm text-accent">
          <StarMark filled />
          {stars}
        </span>
        <span className="hidden truncate text-sm text-muted sm:inline">{car}</span>
      </div>
      {right}
    </header>
  );
}

export function Stage({
  src,
  children,
  dim = "scrim",
}: {
  src?: string;
  children: ReactNode;
  dim?: "scrim" | "scrim-soft";
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col overflow-hidden bg-bg">
      {src ? (
        <img
          src={src}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className={cn("pointer-events-none absolute inset-0", dim)} />
      <div className="pointer-events-none absolute inset-0 vignette" />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
