"use client";
import { useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useOS } from "@/lib/store";
import { snapGeo } from "./Window";

const desktop = () => window.matchMedia("(min-width: 1024px)").matches;

/** System shortcuts: ⌥↑ Mission Control, ⌥` next window, Esc backs out. */
export function Keys() {
  const { mission, setMission, cycle, setNc } = useOS();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!desktop()) return;
      if (e.altKey && e.code === "ArrowUp") { e.preventDefault(); setMission(!mission); }
      else if (e.altKey && e.code === "Backquote") { e.preventDefault(); cycle(); }
      else if (e.key === "Escape") { setMission(false); setNc(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mission, setMission, cycle, setNc]);
  return null;
}

/** The backdrop behind Mission Control. The windows arrange themselves. */
export function MissionControl() {
  const { mission, setMission } = useOS();
  return (
    <AnimatePresence>
      {mission && (
        <m.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: .3 }}
          onClick={() => setMission(false)}
          className="fixed inset-0 z-[9] bg-bg/85 max-lg:hidden"
        >
          <div aria-hidden className="dots absolute inset-0" style={{ "--gx": "50%", "--gy": "50%" }} />
          <div className="absolute inset-x-0 top-[44px] text-center">
            <span className="label">Mission Control</span>
            <span className="ml-3 font-mono text-[11px] text-muted">click a window · esc to leave</span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

/** Where a window will land if it's dropped against an edge now. */
export function SnapPreview() {
  const snap = useOS((s) => s.snap);
  const g = snap ? snapGeo(snap) : null;
  return (
    <AnimatePresence>
      {g && (
        <m.div
          key={snap}
          initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: .18 }}
          style={{ left: g.x + 8, top: g.y + 8, width: g.w - 16, height: g.h - 16 }}
          className="pointer-events-none fixed z-[300] rounded-[14px] border-[1.5px] border-accent/70 bg-accent/[.07]"
        />
      )}
    </AnimatePresence>
  );
}
