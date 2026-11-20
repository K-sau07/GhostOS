"use client";
import { useEffect, useRef } from "react";
import { useOS, frontmost, WINDOWS, type WinId, type Geo, type Snap } from "@/lib/store";

const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

const MENUBAR = 30, DOCK_ROOM = 100;

/** Where a window lands when dropped against an edge. */
export function snapGeo(s: Exclude<Snap, null>): Geo {
  const W = window.innerWidth, H = window.innerHeight - MENUBAR - DOCK_ROOM;
  if (s === "left") return { x: 0, y: MENUBAR, w: W / 2, h: H };
  if (s === "right") return { x: W / 2, y: MENUBAR, w: W / 2, h: H };
  return { x: 0, y: MENUBAR, w: W, h: H };
}

/** Follow the pointer until release. `apply` gets the distance moved. */
function track(
  e: React.PointerEvent,
  apply: (dx: number, dy: number, ev: PointerEvent) => void,
  done?: () => void,
) {
  e.preventDefault();
  const sx = e.clientX, sy = e.clientY;
  const move = (ev: PointerEvent) => apply(ev.clientX - sx, ev.clientY - sy, ev);
  const up = () => {
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", up);
    done?.();
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
  const mission = useOS((s) => s.mission);
  // a string, so the selector result is stable between renders
  const shownKey = useOS((s) =>
    (Object.keys(s.wins) as WinId[]).filter((k) => s.wins[k].open && !s.wins[k].min).join(","));
  const { focus, place, toggleMax, setSnap, setMission } = useOS();
  const ref = useRef<HTMLElement>(null);
  const title = WINDOWS[id].title;

  const start = (): Geo | null => {
    const el = ref.current;
    if (!el || !isDesktop() || w.max) return null;
    const r = el.getBoundingClientRect();
    return { x: r.left, y: r.top, w: r.width, h: r.height };
  };

  const drag = (e: React.PointerEvent) => {
    if (e.button !== 0 || mission) return;
    const g = start();
    if (!g) return;
    track(
      e,
      (dx, dy, ev) => {
        place(id, {
          ...g,
          x: Math.min(Math.max(g.x + dx, 120 - g.w), window.innerWidth - 120),
          y: Math.min(Math.max(g.y + dy, MENUBAR), window.innerHeight - 120),
        });
        // push against an edge to snap: left and right halves, or the top to fill
        const W = window.innerWidth;
        setSnap(ev.clientX <= 6 ? "left" : ev.clientX >= W - 6 ? "right" : ev.clientY <= MENUBAR + 4 ? "max" : null);
      },
      () => {
        const s = useOS.getState().snap;
        setSnap(null);
        if (s) place(id, snapGeo(s));
      },
    );
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

  const shown = w.open && !w.min;

  // Mission Control: every shown window scaled into a grid. Uses the separate
  // `translate`/`scale` properties so it never fights the rise animation.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!mission || !shown) { el.style.translate = ""; el.style.scale = ""; return; }
    const ids = shownKey.split(",");
    const i = ids.indexOf(id), n = ids.length;
    const W = window.innerWidth, top = 84, bottom = 120, pad = 56;
    const cols = Math.ceil(Math.sqrt(n)), rows = Math.ceil(n / cols);
    const cw = (W - pad * 2) / cols, ch = (window.innerHeight - top - bottom) / rows;
    const row = Math.floor(i / cols), inLast = n - cols * (rows - 1);
    const shift = row === rows - 1 ? ((cols - inLast) * cw) / 2 : 0;
    const r = { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
    const scale = Math.min((cw - 48) / r.w, (ch - 48) / r.h, 0.85);
    const cx = pad + shift + cw * ((i % cols) + 0.5), cy = top + ch * (row + 0.5);
    el.style.translate = `${cx - (r.x + r.w / 2)}px ${cy - (r.y + r.h / 2)}px`;
    el.style.scale = String(scale);
  }, [mission, shown, shownKey, id, w.geo, w.max]);

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
      data-mission={mission || undefined}
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

      {mission && shown && (
        <button
          aria-label={`Show ${title}`}
          onClick={() => { focus(id); setMission(false); }}
          className="absolute inset-0 z-10 rounded-[14px] outline-none ring-accent transition-shadow hover:ring-2 max-lg:hidden"
        />
      )}

      <div
        onPointerDown={resize}
        aria-hidden
        className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize max-lg:hidden"
      />
    </section>
  );
}
