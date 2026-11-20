"use client";
import { useEffect, useState } from "react";
import { useOS, frontmost, WINDOWS, type WinId } from "@/lib/store";
import { launch, openUrl } from "@/lib/actions";
import { profile, sensei } from "@/lib/content";
import { MenuBarMenu, type MenuItem } from "./Menus";
import ThemeToggle, { useToggleTheme } from "./ThemeToggle";

function Clock() {
  // Server and client disagree by definition; the node opts out of the check.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 20_000);
    return () => clearInterval(t);
  }, []);
  return (
    <span suppressHydrationWarning className="font-mono text-[11.5px] tabular-nums text-muted">
      {now.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
      {"  ·  "}
      {now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
    </span>
  );
}

export default function MenuBar() {
  const { wins, setSpotlight, close, minimize, toggleMax } = useOS();
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
      { label: "About Saurabh", onSelect: () => launch("about") },
      { label: "repo-sensei", onSelect: () => launch("sensei") },
      { sep: true },
      { label: "GitHub ↗", onSelect: () => openUrl(profile.github) },
      { label: "LinkedIn ↗", onSelect: () => openUrl(profile.linkedin) },
      { label: "reposensei.com ↗", onSelect: () => openUrl(sensei.href) },
    ],
    File: [
      { label: "Open Projects", onSelect: () => launch("projects") },
      { label: "Open Shell", onSelect: () => launch("shell") },
      { label: "Open Résumé", onSelect: () => launch("resume") },
      { sep: true },
      { label: "Close Window", disabled: !top, onSelect: () => top && close(top) },
    ],
    View: [
      { label: "Light / Dark", onSelect: toggleTheme },
      { label: "Zoom Window", disabled: !top, onSelect: () => top && toggleMax(top) },
      { sep: true },
      { label: "Spotlight", shortcut: "⌘K", onSelect: () => setSpotlight(true) },
    ],
    Window: [
      { label: "Minimize", disabled: !top, onSelect: () => top && minimize(top) },
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
        <ThemeToggle />
        <Clock />
      </div>
    </div>
  );
}
