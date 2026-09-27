"use client";
import { useEffect, useState } from "react";
import { useOS } from "@/lib/store";
import { MenuBarMenu, MenuPanel, type MenuItem } from "./Menus";
import { profile } from "@/lib/content";


function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  // null until mounted so server and client markup agree (no hydration mismatch)
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000 * 20);
    return () => clearInterval(t);
  }, []);
  if (!now) return <span className="mono text-[11px] tracking-[.1em] opacity-0">00:00</span>;
  return (
    <span className="mono text-[11px] tracking-[.1em] text-white/72">
      {now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
      {"  "}
      {now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
    </span>
  );
}

export default function MenuBar() {
  const { windows, setSpotlight, open, close, minimize, toggleMax } = useOS();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const top = windows.length ? windows.reduce((a, b) => (a.z > b.z ? a : b)) : null;
  const active = top && !top.minimized ? top.title : "Finder";

  // clicking anywhere else dismisses an open menu
  useEffect(() => {
    if (!openMenu) return;
    const h = () => setOpenMenu(null);
    window.addEventListener("click", h);
    return () => window.removeEventListener("click", h);
  }, [openMenu]);

  const set = (name: string) => (v: boolean) => setOpenMenu(v ? name : null);

  const MENUS: Record<string, MenuItem[]> = {
    Ghost: [
      { label: "About This Ghost", onSelect: () => open("about", "about.mdx", 840, 640) },
      { sep: true },
      { label: "Résumé…", shortcut: "⌘R", onSelect: () => open("resume", "resume.pdf", 820, 660) },
      { label: "Systems…", onSelect: () => open("systems", "systems.app", 1060, 700) },
      { sep: true },
      { label: "GitHub ↗", onSelect: () => window.open(profile.github, "_blank") },
      { label: "LinkedIn ↗", onSelect: () => window.open(profile.linkedin, "_blank") },
    ],
    File: [
      { label: "New Finder Window", shortcut: "⌘N", onSelect: () => open("finder", "work", 900, 580) },
      { label: "Open Terminal", shortcut: "⌘T", onSelect: () => open("terminal", "terminal.app", 720, 440) },
      { sep: true },
      { label: "Close Window", shortcut: "⌘W", disabled: !top, onSelect: () => top && close(top.id) },
    ],
    Edit: [
      { label: "Undo", shortcut: "⌘Z", disabled: true },
      { label: "Redo", shortcut: "⇧⌘Z", disabled: true },
      { sep: true },
      { label: "Find…", shortcut: "⌘K", onSelect: () => setSpotlight(true) },
    ],
    View: [
      { label: "Enter Full Screen", shortcut: "⌃⌘F", disabled: !top, onSelect: () => top && toggleMax(top.id) },
      { sep: true },
      { label: "Show Spotlight", shortcut: "⌘K", onSelect: () => setSpotlight(true) },
    ],
    Window: [
      { label: "Minimise", shortcut: "⌘M", disabled: !top, onSelect: () => top && minimize(top.id) },
      { label: "Zoom", disabled: !top, onSelect: () => top && toggleMax(top.id) },
      { sep: true },
      ...(windows.length
        ? windows.map((w) => ({ label: w.title, onSelect: () => open(w.id, w.title) }))
        : [{ label: "No Open Windows", disabled: true }]),
    ],
    Help: [
      { label: "Email Saurabh", onSelect: () => window.open(`mailto:${profile.email}`) },
      { label: "Download Résumé", onSelect: () => window.open("/resume.pdf") },
    ],
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[30px] z-[500] flex items-center
                 px-3 gap-0.5 select-none glass !border-x-0 !border-t-0"
      style={{ borderRadius: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ghost mark, in place of the apple */}
      <div className="relative">
        <button
          onClick={() => setOpenMenu(openMenu === "Ghost" ? null : "Ghost")}
          className="px-2.5 h-[22px] grid place-items-center rounded transition-colors"
          style={{ background: openMenu === "Ghost" ? "rgba(255,255,255,.18)" : "transparent" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 2.6c-4.1 0-7.1 3.1-7.1 7.2v11.6l2.6-2 2.4 2 2.1-2 2.1 2 2.4-2 2.6 2V9.8c0-4.1-3-7.2-7.1-7.2z"
                  stroke="currentColor" strokeWidth="1.2" className="text-white/85" />
            <circle cx="9.4" cy="10.2" r="1.15" fill="currentColor" className="text-white/85" />
            <circle cx="14.6" cy="10.2" r="1.15" fill="currentColor" className="text-white/85" />
          </svg>
        </button>
        {openMenu === "Ghost" && (
          <div className="absolute left-0 top-[26px]">
            <MenuPanel items={MENUS.Ghost} onClose={() => setOpenMenu(null)} />
          </div>
        )}
      </div>

      <span className="mono text-[11px] tracking-[.16em] text-white font-medium px-2">
        {active}
      </span>

      {["File", "Edit", "View", "Window", "Help"].map((m) => (
        <MenuBarMenu
          key={m} label={m} items={MENUS[m]}
          open={openMenu === m} setOpen={set(m)}
        />
      ))}

      <div className="ml-auto flex items-center gap-3.5">
        <button
          onClick={() => setSpotlight(true)}
          aria-label="Spotlight search"
          className="opacity-65 hover:opacity-100 transition"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" />
          </svg>
        </button>
        {/* wifi */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="1.5" strokeLinecap="round" className="text-white/65">
          <path d="M3.5 8.5a13 13 0 0117 0M6.8 12a8.4 8.4 0 0110.4 0M10 15.3a3.6 3.6 0 014 0" />
          <circle cx="12" cy="18.6" r=".9" fill="currentColor" stroke="none" />
        </svg>
        {/* battery */}
        <svg width="20" height="14" viewBox="0 0 28 14" fill="none" stroke="currentColor"
             strokeWidth="1.1" className="text-white/65">
          <rect x=".7" y="2.2" width="22" height="9.6" rx="2.6" />
          <rect x="2.5" y="4" width="15" height="6" rx="1.2" fill="currentColor" stroke="none" />
          <path d="M24.4 5.6v2.8" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <Clock />
      </div>
    </div>
  );
}
