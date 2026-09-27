"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useOS } from "@/lib/store";
import { DESKTOP_LEFT, DESKTOP_RIGHT, type Launchable } from "@/lib/apps";
import { profile, headline } from "@/lib/content";
import { ContextMenu, type MenuItem } from "./Menus";

function DesktopIcon({ item, i }: { item: Launchable; i: number }) {
  const { open } = useOS();
  const [sel, setSel] = useState(false);

  const activate = () =>
    item.href ? window.open(item.href, "_blank") : open(item.id, item.title, item.w, item.h);

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: .5 + i * .07, duration: .6, ease: [.16, 1, .3, 1] }}
      onClick={(e) => { e.stopPropagation(); setSel(true); }}
      onDoubleClick={activate}
      onBlur={() => setSel(false)}
      className="group w-[92px] flex flex-col items-center gap-1.5 p-2 rounded-lg
                 outline-none transition-colors duration-200"
      style={{ background: sel ? "rgba(255,255,255,.10)" : "transparent" }}
    >
      <span className="text-white/72 group-hover:text-white transition-colors duration-300
                       drop-shadow-[0_0_18px_rgba(255,255,255,.18)]">
        <item.icon size={40} />
      </span>
      <span className="mono text-[10px] tracking-[.08em] text-white/78 text-center leading-tight
                       px-1 rounded"
            style={{ background: sel ? "rgba(255,255,255,.14)" : "transparent" }}>
        {item.title}
      </span>
    </motion.button>
  );
}

export default function Desktop() {
  const { focusDesktop, windows, open, setSpotlight } = useOS();
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);

  const ctxItems: MenuItem[] = [
    { label: "Open About", onSelect: () => open("about", "about.mdx", 840, 640) },
    { label: "Open Projects", onSelect: () => open("finder", "work", 900, 580) },
    { label: "Open Systems", onSelect: () => open("systems", "systems.app", 1060, 700) },
    { sep: true },
    { label: "Spotlight\u2026", shortcut: "\u2318K", onSelect: () => setSpotlight(true) },
    { sep: true },
    { label: "Download R\u00e9sum\u00e9", onSelect: () => window.open("/resume.pdf") },
  ];
  const anyOpen = windows.some((w) => !w.minimized);
  return (
    <div
      onClick={focusDesktop}
      onContextMenu={(e) => { e.preventDefault(); setCtx({ x: e.clientX, y: e.clientY }); }}
      className="absolute inset-0 pt-[38px] pb-[92px] px-4 z-[1]
                 flex justify-between pointer-events-auto"
    >
      <div className="flex flex-col gap-1">
        {DESKTOP_LEFT.map((it, i) => <DesktopIcon key={it.id} item={it} i={i} />)}
      </div>

      {/* the ghost — centre stage, behind everything, non-interactive */}
      <div className="flex-1 grid place-items-center pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 26, filter: "blur(16px)" }}
          animate={{ opacity: anyOpen ? 0 : 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: anyOpen ? 0 : .25, duration: anyOpen ? .5 : 1.5, ease: [.16, 1, .3, 1] }}
          className="text-center -mt-6"
        >
          <div className="mono text-[11px] tracking-[.34em] text-white/42 mb-5">
            [ {profile.role.toUpperCase()} · {profile.years} YEARS ]
          </div>
          {/* pr keeps the italic descender of the serif from clipping at the viewport edge */}
          <h1 className="ghost-type font-extrabold uppercase leading-[.9] tracking-[-.042em] pr-[.12em]"
              style={{ fontSize: "clamp(48px,6.6vw,104px)" }}>
            {profile.first}{" "}
            <em className="serif ghost-type-dim font-normal not-italic"
                style={{ fontStyle: "italic" }}>
              {profile.last}
            </em>
          </h1>

          <div className="flex items-stretch justify-center gap-8 mt-9">
            {headline.map(([v, k], i) => (
              <div key={k} className={i > 0 ? "pl-8 border-l border-white/12" : ""}>
                <div className="text-[25px] font-bold leading-none text-white/92">{v}</div>
                <div className="mono text-[9px] tracking-[.2em] text-white/38 mt-2">{k}</div>
              </div>
            ))}
          </div>

          <div className="mono text-[10px] tracking-[.22em] text-white/32 mt-10">
            DOUBLE-CLICK AN ICON &nbsp;·&nbsp; ⌘K FOR SPOTLIGHT
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-1 items-end">
        {DESKTOP_RIGHT.map((it, i) => <DesktopIcon key={it.id} item={it} i={i + 4} />)}
      </div>

      <ContextMenu at={ctx} items={ctxItems} onClose={() => setCtx(null)} />
    </div>
  );
}
