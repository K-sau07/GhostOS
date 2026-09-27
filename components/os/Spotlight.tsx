"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOS } from "@/lib/store";
import { DOCK_ITEMS, PROJECT_FILES } from "@/lib/apps";

export default function Spotlight() {
  const { spotlight, setSpotlight, open } = useOS();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const pool = useMemo(() => [...DOCK_ITEMS, ...PROJECT_FILES], []);
  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return pool.slice(0, 6);
    return pool.filter((a) => a.title.toLowerCase().includes(s)).slice(0, 7);
  }, [q, pool]);

  // ⌘K / ⌘Space to summon, Esc to dismiss
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.code === "Space")) {
        e.preventDefault();
        setSpotlight(!spotlight);
      }
      if (e.key === "Escape") setSpotlight(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [spotlight, setSpotlight]);

  useEffect(() => {
    if (spotlight) { setQ(""); setI(0); setTimeout(() => input.current?.focus(), 60); }
  }, [spotlight]);

  const run = (a: (typeof pool)[number]) => {
    setSpotlight(false);
    if (a.href) window.open(a.href, "_blank");
    else open(a.id, a.title, a.w, a.h);
  };

  return (
    <AnimatePresence>
      {spotlight && (
        <motion.div
          className="fixed inset-0 z-[3000] flex items-start justify-center pt-[19vh]"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: .2 }}
          onClick={() => setSpotlight(false)}
          style={{ background: "rgba(0,0,0,.42)", backdropFilter: "blur(3px)" }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -14, scale: .97 }} animate={{ y: 0, scale: 1 }} exit={{ y: -10, scale: .98 }}
            transition={{ duration: .3, ease: [.16, 1, .3, 1] }}
            className="w-[540px] rounded-[13px] overflow-hidden glass"
          >
            <div className="flex items-center gap-3 px-4 h-[52px] border-b border-white/10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="1.6" className="text-white/45">
                <circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" strokeLinecap="round" />
              </svg>
              <input
                ref={input} value={q}
                onChange={(e) => { setQ(e.target.value); setI(0); }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(v + 1, hits.length - 1)); }
                  if (e.key === "ArrowUp")   { e.preventDefault(); setI((v) => Math.max(v - 1, 0)); }
                  if (e.key === "Enter" && hits[i]) run(hits[i]);
                }}
                placeholder="Search Ghost OS"
                className="flex-1 bg-transparent outline-none text-[15px] text-white
                           placeholder:text-white/28"
              />
              <kbd className="mono text-[9.5px] tracking-[.1em] text-white/34 border border-white/14
                              rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            <div className="py-1.5 max-h-[300px] overflow-auto">
              {hits.length === 0 && (
                <div className="mono text-[11px] text-white/32 px-4 py-4">no results</div>
              )}
              {hits.map((a, k) => (
                <button
                  key={a.id}
                  onMouseEnter={() => setI(k)}
                  onClick={() => run(a)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                  style={{ background: k === i ? "rgba(255,255,255,.10)" : "transparent" }}
                >
                  <span className="text-white/72"><a.icon size={19} /></span>
                  <span className="mono text-[12px] tracking-[.06em] text-white/88">{a.title}</span>
                  {k === i && (
                    <span className="mono ml-auto text-[9.5px] tracking-[.12em] text-white/34">↩ OPEN</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
