"use client";
import { useOS } from "@/lib/store";
import { liveSites as running, napNote } from "@/lib/content";

const SHOTS: Record<string, string> = {
  sensei: "/shots/repo-sensei.webp",
  openlens: "/shots/openlens.webp", tassist: "/shots/tassist.webp", watchdog: "/shots/watchdog.webp",
  ecoplate: "/shots/ecoplate.webp", aura: "/shots/sentiment-aura.webp",
};

/** A browser window that loads the project's real site. A captured snapshot
    sits behind it while the free-tier server wakes up. */
export default function SafariApp() {
  const open = useOS((s) => s.wins.browser.open);
  const page = useOS((s) => s.page);
  const setPage = useOS((s) => s.setPage);
  const p = running.find((x) => x.id === page) ?? running[0];
  const tabs = running.filter((x) => x.id !== "ghostos");

  return (
    <div className="flex h-full flex-col">
      {/* tabs */}
      <div className="flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-panel px-2 pt-2">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setPage(t.id)}
                  className={`shrink-0 rounded-t-[8px] border border-b-0 px-3.5 py-1.5 text-[12.5px] transition-colors
                              ${t.id === p.id ? "border-line bg-bg text-fg" : "border-transparent text-muted hover:text-fg"}`}>
            {t.name}
          </button>
        ))}
      </div>
      {/* address bar */}
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-line px-3">
        <div className="flex h-7 min-w-0 flex-1 items-center gap-2 rounded-[8px] border border-line bg-panel px-3">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" className="shrink-0 text-muted" aria-hidden>
            <rect x="3" y="7" width="10" height="7" rx="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
          </svg>
          <span className="truncate font-mono text-[12px]">{p.live.replace(/^https?:\/\//, "")}</span>
        </div>
        <a href={p.live} target="_blank" rel="noreferrer" className="link-u shrink-0 font-mono text-[12px] text-accent">open ↗</a>
      </div>
      {/* page */}
      <div className="relative min-h-0 flex-1 bg-panel">
        {open && SHOTS[p.id] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={SHOTS[p.id]} alt="" className={`absolute inset-0 h-full w-full object-cover object-top ${p.frameable ? "opacity-40" : ""}`} />
        )}
        {p.frameable && <div className="absolute inset-x-0 bottom-3 z-0 text-center font-mono text-[11px] text-muted">{napNote}</div>}
        {!p.frameable && (
          <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center">
            <a href={p.live} target="_blank" rel="noreferrer"
               className="rounded-full border border-line bg-bg px-4 py-2 text-[13px] shadow-[var(--shadow)] transition-colors hover:border-accent/60">
              {p.name} keeps itself out of frames, for security. <span className="text-accent">Open it ↗</span>
            </a>
          </div>
        )}
        {open && p.frameable && (
          <iframe key={p.id} src={p.live} title={`${p.name}, live`}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  className="relative z-10 h-full w-full border-0" />
        )}
      </div>
    </div>
  );
}
