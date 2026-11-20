"use client";
import { useEffect, useMemo } from "react";
import { m, AnimatePresence } from "framer-motion";

export interface MenuItem {
  label?: string;
  shortcut?: string;
  onSelect?: () => void;
  disabled?: boolean;
  sep?: boolean;
}

/** shared dropdown surface for both the menu bar and right-click menus */
export function MenuPanel({ items, onClose }: { items: MenuItem[]; onClose: () => void }) {
  return (
    <m.div
      role="menu"
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -2 }}
      transition={{ duration: .12 }}
      onClick={(e) => e.stopPropagation()}
      className="z-[2000] min-w-[220px] rounded-[10px] border border-line bg-bg py-1.5 shadow-[var(--shadow)]"
    >
      {items.map((it, i) =>
        it.sep ? (
          <div key={i} className="mx-3 my-1.5 h-px bg-line" />
        ) : (
          <button
            key={i}
            role="menuitem"
            disabled={it.disabled}
            onClick={() => { it.onSelect?.(); onClose(); }}
            className="flex w-full items-center gap-6 px-3.5 py-[5px] text-left text-[13px]
                       transition-colors enabled:hover:bg-panel disabled:text-muted/60"
          >
            <span>{it.label}</span>
            {it.shortcut && <span className="ml-auto font-mono text-[11px] text-muted">{it.shortcut}</span>}
          </button>
        )
      )}
    </m.div>
  );
}

/** a single menu-bar title that opens its dropdown */
export function MenuBarMenu({
  label, items, open, setOpen, className = "",
}: {
  label: React.ReactNode; items: MenuItem[];
  open: boolean; setOpen: (v: boolean) => void; className?: string;
}) {
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => {
          // once a menu is open, hovering a sibling switches to it, like macOS
          if (document.querySelector("[data-menu-open='true']")) setOpen(true);
        }}
        data-menu-open={open}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`h-[22px] rounded-md px-2.5 transition-colors ${open ? "bg-panel text-fg" : "text-muted hover:text-fg"} ${className}`}
      >
        {label}
      </button>
      <AnimatePresence>
        {open && (
          <div className="absolute left-0 top-[27px]">
            <MenuPanel items={items} onClose={() => setOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** right-click menu on the desktop */
export function ContextMenu({
  at, items, onClose,
}: { at: { x: number; y: number } | null; items: MenuItem[]; onClose: () => void }) {
  // Clamped position is derived from `at`, not mirrored into state.
  const pos = useMemo(() => {
    if (!at) return null;
    const w = 228, h = items.length * 28 + 14;
    return {
      x: Math.min(at.x, window.innerWidth - w - 8),
      y: Math.min(at.y, window.innerHeight - h - 8),
    };
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
        <div className="fixed z-[2000]" style={{ left: pos.x, top: pos.y }}>
          <MenuPanel items={items} onClose={onClose} />
        </div>
      )}
    </AnimatePresence>
  );
}
