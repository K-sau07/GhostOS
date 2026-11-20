"use client";
import { useCallback, useEffect, useState } from "react";
import { useOS } from "@/lib/store";
import { launch, openUrl, showSection } from "@/lib/actions";
import { profile } from "@/lib/content";
import { ContextMenu, type MenuItem } from "./Menus";
import { IconPDF, IconFolder, IconTerminal, IconMail, IconMovie } from "./Icons";
import { useToggleTheme } from "./ThemeToggle";
import { QuoteWidget, GitHubWidget, LeetCodeWidget } from "./Widgets";

const ICONS = [
  { label: "résumé.pdf", Icon: IconPDF, run: () => launch("resume") },
  { label: "live.app", Icon: IconMovie, run: () => launch("live") },
  { label: "projects", Icon: IconFolder, run: () => showSection("projects") },
  { label: "shell", Icon: IconTerminal, run: () => launch("shell") },
  { label: "contact.mail", Icon: IconMail, run: () => openUrl(`mailto:${profile.email}`) },
];

/** The wallpaper: icons down the left, live widgets down the right, and a right-click menu. */
export default function Desktop() {
  const { setSpotlight, setMission, setNc } = useOS();
  const toggleTheme = useToggleTheme();
  const [sel, setSel] = useState<string | null>(null);
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const closeCtx = useCallback(() => setCtx(null), []);

  // Once the boot has played, later windows should rise without waiting for it.
  useEffect(() => {
    const t = setTimeout(() => { document.documentElement.dataset.booted = "1"; }, 2700);
    return () => clearTimeout(t);
  }, []);

  const items: MenuItem[] = [
    { label: "About Saurabh", onSelect: () => showSection("overview") },
    { label: "Experience", onSelect: () => showSection("experience") },
    { label: "Projects", onSelect: () => showSection("projects") },
    { label: "Open live.app", onSelect: () => launch("live") },
    { label: "Open Shell", onSelect: () => launch("shell") },
    { sep: true },
    { label: "Mission Control", shortcut: "⌥↑", onSelect: () => setMission(true) },
    { label: "Notification Center", onSelect: () => setNc(true) },
    { label: "Spotlight", shortcut: "⌘K", onSelect: () => setSpotlight(true) },
    { label: "Light / Dark", onSelect: toggleTheme },
    { sep: true },
    { label: "Download Résumé", onSelect: () => openUrl(profile.resume) },
  ];

  return (
    <div
      onClick={() => setSel(null)}
      onContextMenu={(e) => { e.preventDefault(); setCtx({ x: e.clientX, y: e.clientY }); }}
      className="absolute inset-0 z-[1] max-lg:hidden"
    >
      <div className="absolute left-3 top-[46px] flex flex-col gap-1">
        {ICONS.map(({ label, Icon, run }, i) => (
          <button
            key={label}
            onClick={(e) => { e.stopPropagation(); setSel(label); }}
            onDoubleClick={run}
            onKeyDown={(e) => e.key === "Enter" && run()}
            title="Double-click to open"
            style={{ "--d": `${0.3 + i * 0.06}s` }}
            className="rise group flex w-[88px] flex-col items-center gap-1.5 rounded-lg p-2 outline-none"
          >
            <span className={`transition-colors ${sel === label ? "text-fg" : "text-muted group-hover:text-fg"}`}>
              <Icon size={38} />
            </span>
            <span className={`rounded px-1.5 font-mono text-[10.5px] leading-tight
                              ${sel === label ? "bg-accent/15 text-fg" : "text-muted"}`}>
              {label}
            </span>
          </button>
        ))}
      </div>
      <div className="desk-widgets" onClick={(e) => e.stopPropagation()}>
        <div className="rise" style={{ "--d": ".3s" }}><QuoteWidget size="sm" /></div>
        <div className="rise" style={{ "--d": ".4s" }}><GitHubWidget compact /></div>
        <div className="w-leetcode rise" style={{ "--d": ".5s" }}><LeetCodeWidget /></div>
      </div>
      <ContextMenu at={ctx} items={items} onClose={closeCtx} />
    </div>
  );
}
