"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useOS, WINDOWS, type WinId } from "@/lib/store";
import { launch, openUrl, showCard } from "@/lib/actions";
import { running, earlier, profile, sensei } from "@/lib/content";
import { leetcodeUrl } from "@/lib/live-types";

interface Hit { key: string; title: string; kind: string; words: string; run: () => void }

const POOL: Hit[] = [
  ...(Object.keys(WINDOWS) as WinId[]).map((id) => ({
    key: `w-${id}`, title: WINDOWS[id].title, kind: "window", words: id, run: () => launch(id),
  })),
  ...[...running, ...earlier].map((p) => ({
    key: `p-${p.id}`, title: p.name, kind: p.label.toLowerCase(),
    words: `${p.line} ${p.stack}`, run: () => showCard(p.id),
  })),
  { key: "c-mc", title: "Mission Control", kind: "action", words: "windows overview expose", run: () => useOS.getState().setMission(true) },
  { key: "c-nc", title: "Notification Center", kind: "action", words: "widgets today quote leetcode github", run: () => useOS.getState().setNc(true) },
  { key: "l-lc", title: "LeetCode", kind: "link", words: "problems solved dsa", run: () => openUrl(leetcodeUrl) },
  { key: "l-rs", title: "reposensei.com", kind: "link", words: sensei.pitch, run: () => openUrl(sensei.href) },
  { key: "l-gh", title: "GitHub", kind: "link", words: "code source", run: () => openUrl(profile.github) },
  { key: "l-li", title: "LinkedIn", kind: "link", words: "profile", run: () => openUrl(profile.linkedin) },
  { key: "l-em", title: "Email", kind: "link", words: `contact ${profile.email}`, run: () => openUrl(`mailto:${profile.email}`) },
];

export default function Spotlight() {
  const { spotlight, setSpotlight } = useOS();

  // ⌘K to summon, Esc to dismiss
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlight(!spotlight);
      }
      if (e.key === "Escape") setSpotlight(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [spotlight, setSpotlight]);

  // The panel owns its query and only exists while open, so closing resets it.
  return <AnimatePresence>{spotlight && <Panel />}</AnimatePresence>;
}

function Panel() {
  const { setSpotlight } = useOS();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return POOL.slice(0, 7);
    return POOL.filter((h) => `${h.title} ${h.kind} ${h.words}`.toLowerCase().includes(s)).slice(0, 8);
  }, [q]);

  useEffect(() => { input.current?.focus(); }, []);

  const run = (h: Hit) => { setSpotlight(false); h.run(); };

  return (
    <m.div
      className="fixed inset-0 z-[3000] flex items-start justify-center bg-bg/50 pt-[18vh]"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: .15 }}
      onClick={() => setSpotlight(false)}
    >
      <m.div
        role="dialog"
        aria-label="Spotlight"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: -8 }} animate={{ y: 0 }} exit={{ y: -6 }}
        transition={{ duration: .2, ease: [.2, .7, .2, 1] }}
        className="w-[min(560px,calc(100vw-32px))] overflow-hidden rounded-[14px] border border-line bg-bg shadow-[var(--shadow)]"
      >
        <div className="flex h-[52px] items-center gap-3 border-b border-line px-4">
          <span className="font-mono text-accent">›</span>
          <input
            ref={input} value={q}
            onChange={(e) => { setQ(e.target.value); setI(0); }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(v + 1, hits.length - 1)); }
              if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(v - 1, 0)); }
              if (e.key === "Enter" && hits[i]) run(hits[i]);
            }}
            placeholder="Search windows, projects, links"
            aria-label="Search"
            className="flex-1 bg-transparent font-mono text-[14px] outline-none placeholder:text-muted/70"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-muted">esc</kbd>
        </div>
        <div className="max-h-[320px] overflow-auto py-1.5">
          {hits.length === 0 && <div className="px-4 py-4 font-mono text-[12px] text-muted">nothing matches</div>}
          {hits.map((h, k) => (
            <button
              key={h.key}
              onMouseEnter={() => setI(k)}
              onClick={() => run(h)}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left ${k === i ? "bg-panel" : ""}`}
            >
              <span className="text-[14px]">{h.title}</span>
              <span className="label !text-[10px]">{h.kind}</span>
              {k === i && <span className="ml-auto font-mono text-[11px] text-muted">↩ open</span>}
            </button>
          ))}
        </div>
      </m.div>
    </m.div>
  );
}
