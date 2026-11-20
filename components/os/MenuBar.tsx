"use client";
import { useEffect, useState } from "react";
import { useOS, frontmost, WINDOWS, type WinId } from "@/lib/store";
import { launch, openUrl, showSection } from "@/lib/actions";
import { profile, sensei } from "@/lib/content";
import { MenuBarMenu, type MenuItem } from "./Menus";
import ThemeToggle, { useToggleTheme } from "./ThemeToggle";
import { useNow, fmtTime } from "./Widgets";

/** The clock opens Notification Center, as on a Mac. */
function Clock() {
  const now = useNow(20_000);
  const { nc, setNc } = useOS();
  return (
    <button
      onClick={() => setNc(!nc)}
      aria-label="Notification Center"
      aria-expanded={nc}
      className={`rounded-md px-2 py-0.5 font-mono text-[11.5px] tabular-nums transition-colors
                  ${nc ? "bg-panel text-fg" : "text-muted hover:text-fg"}`}
    >
      <span suppressHydrationWarning>
        {now.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
        {"  ·  "}
        {fmtTime(now)}
      </span>
    </button>
  );
}

export default function MenuBar() {
  const { wins, setSpotlight, close, minimize, toggleMax, mission, setMission, cycle, setNc } = useOS();
  const toggleTheme = useToggleTheme();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const top = frontmost(wins);

  // clicking anywhere else dismisses an open menu
  useEffect(() => {
    if (!openMenu) return;
    const h = () => setOpenMenu(null);
    window.addEventListener("click", h);
    return () => window.removeEventListener("click", h);
  }, [openMenu]);

  const shown = (Object.keys(wins) as WinId[]).filter((id) => wins[id].open);

  const MENUS: Record<string, MenuItem[]> = {
    "Ghost OS": [
      { label: "About Saurabh", onSelect: () => showSection("overview") },
      { label: "repo-sensei", onSelect: () => showSection("sensei") },
      { label: "Experience", onSelect: () => showSection("experience") },
      { sep: true },
      { label: "GitHub ↗", onSelect: () => openUrl(profile.github) },
      { label: "LinkedIn ↗", onSelect: () => openUrl(profile.linkedin) },
      { label: "reposensei.com ↗", onSelect: () => openUrl(sensei.href) },
    ],
    File: [
      { label: "Projects", onSelect: () => showSection("projects") },
      { label: "Open live.app", onSelect: () => launch("live") },
      { label: "Activity", onSelect: () => showSection("activity") },
      { label: "Open Shell", onSelect: () => launch("shell") },
      { label: "Open Résumé", onSelect: () => launch("resume") },
      { sep: true },
      { label: "Close Window", disabled: !top, onSelect: () => top && close(top) },
    ],
    View: [
      { label: "Mission Control", shortcut: "⌥↑", onSelect: () => setMission(!mission) },
      { label: "Notification Center", onSelect: () => setNc(true) },
      { label: "Light / Dark", onSelect: toggleTheme },
      { label: "Zoom Window", disabled: !top, onSelect: () => top && toggleMax(top) },
      { sep: true },
      { label: "Spotlight", shortcut: "⌘K", onSelect: () => setSpotlight(true) },
    ],
    Window: [
      { label: "Minimize", disabled: !top, onSelect: () => top && minimize(top) },
      { label: "Next Window", shortcut: "⌥`", onSelect: cycle },
      { label: "Snap: drag a window to an edge", disabled: true },
      { sep: true },
      ...(shown.length
        ? shown.map((id) => ({ label: WINDOWS[id].title, onSelect: () => launch(id) }))
        : [{ label: "No open windows", disabled: true }]),
    ],
    Help: [
      { label: `Email ${profile.name.split(" ")[0]}`, onSelect: () => openUrl(`mailto:${profile.email}`) },
      { label: "Download Résumé", onSelect: () => openUrl(profile.resume) },
    ],
  };

  return (
    <div
      className="fixed inset-x-0 top-0 z-[500] flex h-[30px] select-none items-center gap-0.5 border-b border-line
                 bg-bg px-3 max-lg:hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <MenuBarMenu
        label={<span className="font-serif text-[14.5px] text-fg">Ghost OS</span>}
        items={MENUS["Ghost OS"]}
        open={openMenu === "Ghost OS"}
        setOpen={(v) => setOpenMenu(v ? "Ghost OS" : null)}
      />
      <span className="px-2.5 font-mono text-[11.5px] text-fg">{top ? WINDOWS[top].title : "desktop"}</span>
      {["File", "View", "Window", "Help"].map((name) => (
        <MenuBarMenu
          key={name}
          label={<span className="font-mono text-[11.5px]">{name}</span>}
          items={MENUS[name]}
          open={openMenu === name}
          setOpen={(v) => setOpenMenu(v ? name : null)}
        />
      ))}

      <div className="ml-auto flex items-center gap-4">
        <button onClick={() => setSpotlight(true)}
                className="font-mono text-[11.5px] text-muted transition-colors hover:text-fg">
          ⌘K search
        </button>
        <button onClick={() => setMission(!mission)} aria-label="Mission Control" title="Mission Control (⌥↑)"
                className="grid h-6 w-6 place-items-center text-muted transition-colors hover:text-fg">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <rect x="1.5" y="2.5" width="5.5" height="4.5" rx="1" /><rect x="9" y="2.5" width="5.5" height="4.5" rx="1" />
            <rect x="1.5" y="9" width="5.5" height="4.5" rx="1" /><rect x="9" y="9" width="5.5" height="4.5" rx="1" />
          </svg>
        </button>
        <ThemeToggle />
        <Clock />
      </div>
    </div>
  );
}
