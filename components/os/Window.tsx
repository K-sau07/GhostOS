"use client";
import { useRef } from "react";
import { useOS, frontmost, WINDOWS, type WinId, type Geo } from "@/lib/store";

const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

/** Follow the pointer until release. `apply` gets the distance moved. */
function track(e: React.PointerEvent, apply: (dx: number, dy: number) => void) {
  e.preventDefault();
  const sx = e.clientX, sy = e.clientY;
  const move = (ev: PointerEvent) => apply(ev.clientX - sx, ev.clientY - sy);
  const up = () => {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
  };
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
}

function Lights({ id }: { id: WinId }) {
  const { close, minimize, toggleMax } = useOS();
  const btn =
    "grid h-[11px] w-[11px] place-items-center rounded-full border border-line text-[8px] " +
    "leading-none text-transparent transition-colors group-hover/l:text-muted hover:!text-fg hover:border-muted";
  return (
    <div className="group/l flex gap-[7px] max-lg:hidden" onPointerDown={(e) => e.stopPropagation()}>
      <button aria-label="Close" className={btn} onClick={() => close(id)}>×</button>
      <button aria-label="Minimize" className={btn} onClick={() => minimize(id)}>–</button>
      <button aria-label="Zoom" className={btn} onClick={() => toggleMax(id)}>+</button>
    </div>
  );
}

export default function Window({
  id, delay = 0, lgOnly, children,
}: {
  id: WinId; delay?: number; lgOnly?: boolean; children: React.ReactNode;
}) {
  const w = useOS((s) => s.wins[id]);
  const front = useOS((s) => frontmost(s.wins) === id);
  const { focus, place, toggleMax } = useOS();
  const ref = useRef<HTMLElement>(null);
  const title = WINDOWS[id].title;

  const start = (): Geo | null => {
    const el = ref.current;
    if (!el || !isDesktop() || w.max) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left, y: r.top, w: r.width, h: r.height };
  };

  const drag = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const g = start();
    if (!g) return;
    track(e, (dx, dy) =>
      place(id, {
        ...g,
        x: Math.min(Math.max(g.x + dx, 120 - g.w), window.innerWidth - 120),
        y: Math.min(Math.max(g.y + dy, 30), window.innerHeight - 120),
      }));
  };

  const resize = (e: React.PointerEvent) => {
    e.stopPropagation();
    const g = start();
    if (!g) return;
    track(e, (dx, dy) =>
      place(id, {
        ...g,
        w: Math.max(380, Math.min(g.w + dx, window.innerWidth - g.x - 8)),
        h: Math.max(240, Math.min(g.h + dy, window.innerHeight - g.y - 8)),
      }));
  };

  const geo = w.geo && !w.max
    ? { "--x": `${w.geo.x}px`, "--y": `${w.geo.y}px`, "--w": `${w.geo.w}px`, "--h": `${w.geo.h}px` }
    : {};

  return (
    <section
      ref={ref}
      id={`win-${id}`}
      aria-label={title}
      data-shown={w.open && !w.min}
      data-max={w.max}
      data-lg-only={lgOnly ? "true" : undefined}
      onPointerDown={() => focus(id)}
      style={{ zIndex: w.z, "--d": `${delay}s`, ...geo }}
      className={`win win-${id} rise scroll-mt-16 overflow-hidden rounded-[14px] border border-line bg-bg
                  lg:shadow-[var(--shadow)]`}
    >
      <header
        onPointerDown={drag}
        onDoubleClick={() => isDesktop() && toggleMax(id)}
        className="relative flex h-[38px] shrink-0 select-none items-center border-b border-line px-3.5"
      >
        <Lights id={id} />
        <span
          className={`label absolute left-1/2 -translate-x-1/2 whitespace-nowrap transition-opacity
                      ${front ? "" : "lg:opacity-60"}`}
        >
          {title}
        </span>
      </header>

      <div className="min-h-0 flex-1 overflow-auto overscroll-contain">{children}</div>

      <div
        onPointerDown={resize}
        aria-hidden
        className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize max-lg:hidden"
      />
    </section>
  );
}
