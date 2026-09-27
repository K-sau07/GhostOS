"use client";
/* macOS window furniture — toolbar, source-list sidebar, status bar.
   These are what make a window read as a Mac app rather than a div. */
import { useState } from "react";

/* ── unified toolbar ─────────────────────────────────────── */
export function Toolbar({
  back, forward, title, children,
}: {
  back?: () => void; forward?: () => void;
  title?: string; children?: React.ReactNode;
}) {
  return (
    <div className="h-[46px] shrink-0 flex items-center gap-3 px-3.5
                    border-b border-white/[.09] bg-white/[.022]">
      <div className="flex rounded-[6px] overflow-hidden border border-white/12">
        {[["‹", back], ["›", forward]].map(([g, fn], i) => (
          <button
            key={i}
            onClick={fn as () => void}
            disabled={!fn}
            className="w-[27px] h-[22px] grid place-items-center text-[14px] leading-none
                       text-white/60 enabled:hover:bg-white/10 enabled:hover:text-white
                       disabled:text-white/18 transition-colors
                       border-r border-white/10 last:border-r-0"
          >
            {g as string}
          </button>
        ))}
      </div>
      {title && (
        <span className="text-[13px] font-semibold text-white/88 tracking-[-.01em]">{title}</span>
      )}
      <div className="ml-auto flex items-center gap-2.5">{children}</div>
    </div>
  );
}

/* ── segmented control (view switcher) ───────────────────── */
export function Segmented<T extends string>({
  options, value, onChange,
}: {
  options: { id: T; glyph: React.ReactNode; label: string }[];
  value: T; onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-[6px] overflow-hidden border border-white/12">
      {options.map((o) => (
        <button
          key={o.id}
          aria-label={o.label}
          onClick={() => onChange(o.id)}
          className="w-[30px] h-[22px] grid place-items-center transition-colors duration-150
                     border-r border-white/10 last:border-r-0"
          style={{
            background: value === o.id ? "rgba(255,255,255,.17)" : "transparent",
            color: value === o.id ? "#fff" : "rgba(255,255,255,.52)",
          }}
        >
          {o.glyph}
        </button>
      ))}
    </div>
  );
}

/* ── search field ────────────────────────────────────────── */
export function SearchField({
  value, onChange, placeholder = "Search",
}: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="flex items-center gap-2 w-[168px] h-[24px] px-2.5 rounded-[6px]
                    bg-white/[.07] border border-white/10 focus-within:border-white/25
                    transition-colors">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2.2" className="text-white/40 shrink-0">
        <circle cx="11" cy="11" r="7" /><path d="M16.5 16.5L21 21" strokeLinecap="round" />
      </svg>
      <input
        value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent outline-none text-[12px] text-white
                   placeholder:text-white/30"
      />
      {value && (
        <button onClick={() => onChange("")} className="text-white/35 hover:text-white/80 text-[13px] leading-none">×</button>
      )}
    </div>
  );
}

/* ── source list ─────────────────────────────────────────── */
export function Sidebar({ children, width = 186 }: { children: React.ReactNode; width?: number }) {
  return (
    <nav style={{ width }}
         className="shrink-0 overflow-auto py-3 border-r border-white/[.09] bg-white/[.016]">
      {children}
    </nav>
  );
}

export function SidebarGroup({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="group w-full flex items-center gap-1 px-3.5 mb-1 text-left"
      >
        <span className="mono text-[9.5px] tracking-[.18em] text-white/34 group-hover:text-white/55
                         transition-colors">
          {label}
        </span>
        <span className="text-[8px] text-white/0 group-hover:text-white/45 transition-all"
              style={{ transform: open ? "rotate(90deg)" : "none" }}>▶</span>
      </button>
      {open && <div className="px-2 space-y-[1px]">{children}</div>}
    </div>
  );
}

export function SidebarItem({
  icon, label, active, onClick, badge,
}: {
  icon?: React.ReactNode; label: string; active?: boolean;
  onClick?: () => void; badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-2.5 py-[5px] rounded-[6px] text-left
                 transition-colors duration-150"
      style={{ background: active ? "rgba(255,255,255,.155)" : "transparent" }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,.06)"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >
      {icon && <span className={active ? "text-white" : "text-white/55"}>{icon}</span>}
      <span className={`text-[12.5px] truncate ${active ? "text-white" : "text-white/72"}`}>
        {label}
      </span>
      {badge && (
        <span className="mono ml-auto text-[9px] text-white/34 shrink-0">{badge}</span>
      )}
    </button>
  );
}

/* ── status bar ──────────────────────────────────────────── */
export function StatusBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[23px] shrink-0 grid place-items-center border-t border-white/[.09]
                    bg-white/[.02]">
      <span className="mono text-[9.5px] tracking-[.12em] text-white/38">{children}</span>
    </div>
  );
}

/* small glyphs for the view switcher */
export const GlyphGrid = (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" />
    <rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" />
  </svg>
);
export const GlyphList = (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="2" width="14" height="2" rx="1" /><rect x="1" y="7" width="14" height="2" rx="1" />
    <rect x="1" y="12" width="14" height="2" rx="1" />
  </svg>
);
export const GlyphColumns = (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="4" height="14" rx="1" /><rect x="6" y="1" width="4" height="14" rx="1" />
    <rect x="11" y="1" width="4" height="14" rx="1" />
  </svg>
);
