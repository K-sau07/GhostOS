"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface MenuItem {
  label?: string;
  shortcut?: string;
  onSelect?: () => void;
  disabled?: boolean;
  sep?: boolean;
}

/** shared dropdown surface for both the menu bar and right-click menus */
export function MenuPanel({
  items, onClose, style,
}: { items: MenuItem[]; onClose: () => void; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -4, scale: .985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -3, scale: .99 }}
      transition={{ duration: .13, ease: [.16, 1, .3, 1] }}
      onClick={(e) => e.stopPropagation()}
      style={style}
      className="min-w-[204px] py-1.5 rounded-[7px] z-[2000]
                 bg-[#1D1F22]/97 border border-white/14
                 shadow-[0_18px_44px_-8px_rgba(0,0,0,.9)]"
    >
      {items.map((it, i) =>
        it.sep ? (
          <div key={i} className="h-px my-1.5 mx-2 bg-white/10" />
        ) : (
          <button
            key={i}
            disabled={it.disabled}
            onClick={() => { it.onSelect?.(); onClose(); }}
            className="w-full flex items-center gap-6 px-3 py-[5px] text-left
                       enabled:hover:bg-white/16 disabled:text-white/22 transition-colors"
          >
            <span className="text-[12.5px] text-inherit">{it.label}</span>
            {it.shortcut && (
              <span className="mono ml-auto text-[10.5px] text-white/34">{it.shortcut}</span>
            )}
          </button>
        )
      )}
    </motion.div>
  );
}

/** a single menu-bar title that opens its dropdown */
export function MenuBarMenu({
  label, items, open, setOpen, bold,
}: {
  label: string; items: MenuItem[];
  open: boolean; setOpen: (v: boolean) => void; bold?: boolean;
}) {
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={(e) => {
          // once a menu is open, hovering the siblings switches to them — like macOS
          if (document.querySelector("[data-menu-open='true']")) setOpen(true);
          e.currentTarget.blur();
        }}
        data-menu-open={open}
        className="px-2.5 h-[22px] rounded transition-colors duration-100"
        style={{ background: open ? "rgba(255,255,255,.18)" : "transparent" }}
      >
        <span className={`mono text-[11px] tracking-[.08em] ${
          bold ? "text-white font-medium" : open ? "text-white" : "text-white/58"
        }`}>
          {label}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <div className="absolute left-0 top-[26px]">
            <MenuPanel items={items} onClose={() => setOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** right-click menu anywhere on the desktop */
export function ContextMenu({
  at, items, onClose,
}: { at: { x: number; y: number } | null; items: MenuItem[]; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(at);

  useEffect(() => {
    if (!at) { setPos(null); return; }
    // keep the panel on screen
    const w = 212, h = items.length * 27 + 12;
    setPos({
      x: Math.min(at.x, window.innerWidth - w - 8),
      y: Math.min(at.y, window.innerHeight - h - 8),
    });
  }, [at, items.length]);

  useEffect(() => {
    if (!pos) return;
    const close = () => onClose();
    window.addEventListener("click", close);
    window.addEventListener("contextmenu", close);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("contextmenu", close);
    };
  }, [pos, onClose]);

  return (
    <AnimatePresence>
      {pos && (
        <div ref={ref} className="fixed z-[2000]" style={{ left: pos.x, top: pos.y }}>
          <MenuPanel items={items} onClose={onClose} />
        </div>
      )}
    </AnimatePresence>
  );
}
