import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { CarStyle, Paint } from "@/game/types";

export function CarPreview({
  style,
  paint,
  className,
}: {
  style: CarStyle;
  paint: Paint;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ setPaint: (p: Paint) => void; resize: () => void; dispose: () => void } | null>(
    null,
  );
  const paintRef = useRef(paint);
  paintRef.current = paint;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let dead = false;
    let p: typeof api.current = null;
    (async () => {
      try {
        const { previewCar } = await import("@/game/previewCar");
        if (dead || !canvasRef.current) return;
        p = previewCar(canvasRef.current, style, paintRef.current);
        api.current = p;
        p.resize();
      } catch {
        /* webgl optional for menus */
      }
    })();
    const ro = new ResizeObserver(() => api.current?.resize());
    ro.observe(canvas);
    return () => {
      dead = true;
      ro.disconnect();
      p?.dispose();
      api.current = null;
    };
    // paint is applied via setPaint; style rebuilds the mesh
  }, [style]);

  useEffect(() => {
    api.current?.setPaint(paint);
  }, [paint]);

  return <canvas ref={canvasRef} className={cn("block h-full w-full", className)} />;
}
