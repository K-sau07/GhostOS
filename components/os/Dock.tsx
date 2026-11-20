"use client";
import { useRef, useState } from "react";
import { m } from "framer-motion";
import { useOS, type SectionId } from "@/lib/store";
import { launch, openUrl, showSection } from "@/lib/actions";
import { profile } from "@/lib/content";

type Item = { label: string; sec?: SectionId; win?: "live" | "shell" | "resume"; href?: string; sep?: boolean };

const ITEMS: Item[] = [
  { label: "about", sec: "overview" },
  { label: "repo-sensei", sec: "sensei" },
  { label: "experience", sec: "experience" },
  { label: "projects", sec: "projects" },
  { label: "live", win: "live", sep: true },
  { label: "shell", win: "shell" },
  { label: "résumé", win: "resume" },
  { label: "github ↗", href: profile.github, sep: true },
  { label: "linkedin ↗", href: profile.linkedin },
];

const RANGE = 150;
/** Scale falls off with distance from the cursor, like the macOS dock, but quieter. */
const scaleAt = (x: number, centre: number) => {
  const d = Math.abs(x - centre);
  return d > RANGE ? 1 : 1 + 0.12 * Math.pow(1 - d / RANGE, 1.6);
};

export default function Dock() {
  const wins = useOS((s) => s.wins);
  const section = useOS((s) => s.section);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const [scales, setScales] = useState<number[]>(() => ITEMS.map(() => 1));

  const onMove = (e: React.MouseEvent) =>
    setScales(tiles.current.map((el) => {
      if (!el) return 1;
      const r = el.getBoundingClientRect();
      return scaleAt(e.clientX, r.left + r.width / 2);
    }));

  return (
    <nav aria-label="Dock"
         className="pointer-events-none fixed inset-x-0 bottom-3 z-[400] flex justify-center max-lg:hidden">
      <div
        onMouseMove={onMove}
        onMouseLeave={() => setScales(ITEMS.map(() => 1))}
        className="rise pointer-events-auto flex items-end gap-2 rounded-[16px] border border-line bg-bg px-2 pb-1.5 pt-2
                   shadow-[var(--shadow)]"
        style={{ "--d": ".35s" }}
      >
        {ITEMS.map((it, i) => {
          const on = it.sec ? wins.settings.open && !wins.settings.min && section === it.sec
            : it.win ? wins[it.win].open : false;
          return (
            <div key={it.label} className="flex items-end gap-2">
              {it.sep && <span aria-hidden className="mx-1 mb-2.5 h-8 w-px bg-line" />}
              <div className="flex flex-col items-center">
                <m.button
                  ref={(el) => { tiles.current[i] = el; }}
                  onClick={() => (it.sec ? showSection(it.sec) : it.win ? launch(it.win) : openUrl(it.href!))}
                  animate={{ scale: scales[i], y: -(scales[i] - 1) * 20 }}
                  transition={{ type: "spring", stiffness: 420, damping: 28, mass: .5 }}
                  className={`h-11 min-w-[64px] origin-bottom rounded-[10px] border bg-bg px-3 font-mono text-[10.5px]
                              uppercase tracking-[1.6px] transition-colors
                              ${on ? "border-muted/70 text-fg" : "border-line text-muted hover:text-fg"}`}
                >
                  {it.label}
                </m.button>
                <span aria-hidden
                      className={`mt-[5px] h-[3px] w-[3px] rounded-full bg-accent transition-opacity ${on ? "" : "opacity-0"}`} />
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
