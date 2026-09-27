"use client";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { useOS, type WinState } from "@/lib/store";

const MENUBAR = 30;
const DOCK = 78;

function TrafficLights({ id }: { id: string }) {
  const { close, minimize, toggleMax } = useOS();
  // Monochrome traffic lights: rings in fog that fill with light on hover.
  const base =
    "w-[12px] h-[12px] rounded-full border border-white/30 grid place-items-center " +
    "text-[8px] leading-none text-black/0 hover:text-black/70 transition-all duration-200";
  return (
    <div className="flex gap-2 group/lights">
      <button
        aria-label="Close"
        onClick={(e) => { e.stopPropagation(); close(id); }}
        className={`${base} hover:bg-white hover:border-white`}
      >✕</button>
      <button
        aria-label="Minimize"
        onClick={(e) => { e.stopPropagation(); minimize(id); }}
        className={`${base} hover:bg-white/70 hover:border-white/70`}
      >–</button>
      <button
        aria-label="Maximize"
        onClick={(e) => { e.stopPropagation(); toggleMax(id); }}
        className={`${base} hover:bg-white/45 hover:border-white/45`}
      >+</button>
    </div>
  );
}

export default function Window({
  win,
  children,
}: {
  win: WinState;
  children: React.ReactNode;
}) {
  const { focus, move, resize, toggleMax, windows } = useOS();
  const dragControls = useDragControls();
  const isTop = win.z === Math.max(...windows.map((w) => w.z));

  /** hand-rolled corner resize — pointer events, clamped to sane minimums */
  const startResize = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const sx = e.clientX, sy = e.clientY, sw = win.w, sh = win.h;
    const onMove = (ev: PointerEvent) => {
      resize(
        win.id,
        Math.max(420, Math.min(sw + (ev.clientX - sx), window.innerWidth - win.x - 8)),
        Math.max(260, Math.min(sh + (ev.clientY - sy), window.innerHeight - win.y - 8))
      );
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <AnimatePresence>
      {!win.minimized && (
        <motion.div
          drag={!win.maximized}
          dragMomentum={false}
          dragElastic={0}
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={{
            left: -win.w + 140,
            top: 0,
            right: window.innerWidth - 140,
            bottom: window.innerHeight - DOCK - 40,
          }}
          onDragEnd={(_, info) => move(win.id, win.x + info.offset.x, win.y + info.offset.y)}
          onPointerDown={() => focus(win.id)}
          initial={{ opacity: 0, scale: .96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: .97, y: 8 }}
          transition={{ duration: .34, ease: [.16, 1, .3, 1] }}
          style={{
            position: "absolute",
            left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z,
          }}
          className="flex flex-col rounded-[11px] overflow-hidden glass-window"
        >
          {/* title bar — the drag handle */}
          <div
            onPointerDown={(e) => {
              focus(win.id);
              if (!win.maximized) dragControls.start(e);
            }}
            onDoubleClick={() => toggleMax(win.id)}
            className="relative h-[34px] shrink-0 flex items-center px-3.5 cursor-default select-none
                       border-b border-white/10 bg-white/[.035]"
          >
            <TrafficLights id={win.id} />
            <span
              className={`mono absolute left-1/2 -translate-x-1/2 text-[11px] tracking-[.14em]
                          transition-opacity duration-300
                          ${isTop ? "text-white/70" : "text-white/28"}`}
            >
              {win.title}
            </span>
          </div>

          {/* content */}
          <div className="flex-1 overflow-auto overscroll-contain">{children}</div>

          {/* resize grip */}
          {!win.maximized && (
            <div
              onPointerDown={startResize}
              className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
            />
          )}

          {/* unfocused windows recede into the fog */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            style={{ background: "rgba(0,0,0,.42)", opacity: isTop ? 0 : 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
