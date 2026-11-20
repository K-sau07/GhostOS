"use client";
import { useState } from "react";
import { m } from "framer-motion";
import { running } from "@/lib/content";
import { browse } from "@/lib/actions";
import MotifArt from "./Motifs";

const ext = { target: "_blank", rel: "noreferrer" } as const;
/** captured homepages; Ghost OS is this site, so it gets its motif instead */
const SHOTS: Record<string, string> = {
  openlens: "/shots/openlens.png", tassist: "/shots/tassist.png", watchdog: "/shots/watchdog.png",
  ecoplate: "/shots/ecoplate.png", aura: "/shots/sentiment-aura.png",
};

/* A coverflow of the deployed projects. The centre card is square-on; its
   neighbours turn away and dim, so depth does the work. Click the centre card
   to load the live site in the browser window. */
export default function LiveApp() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + running.length) % running.length);
  const p = running[i];

  return (
    <div
      className="flex h-full select-none flex-col outline-none"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); if (e.key === "Enter") browse(p.id); }}
    >
      <div className="shrink-0 pt-7 text-center">
        <div className="label">Live projects</div>
        <h2 className="mt-2 font-serif text-[30px] font-normal">Running right now</h2>
      </div>

      <div className="relative grid min-h-[300px] flex-1 place-items-center overflow-hidden" style={{ perspective: 1500 }}>
        {running.map((c, n) => {
          let d = n - i;
          if (d > running.length / 2) d -= running.length;
          if (d < -running.length / 2) d += running.length;
          const abs = Math.abs(d);
          if (abs > 2) return null;
          const shot = SHOTS[c.id];
          return (
            <m.button
              key={c.id}
              onClick={() => (d === 0 ? (c.id === "ghostos" ? undefined : browse(c.id)) : go(d))}
              aria-label={d === 0 ? `Open ${c.name} in the browser` : `Show ${c.name}`}
              animate={{
                x: d * 250, z: -abs * 200, rotateY: d * -28,
                scale: d === 0 ? 1 : 0.84, opacity: d === 0 ? 1 : 0.45,
              }}
              transition={{ type: "spring", stiffness: 210, damping: 28, mass: .7 }}
              style={{ position: "absolute", transformStyle: "preserve-3d", zIndex: 10 - abs }}
              className="h-[230px] w-[340px] overflow-hidden rounded-[14px] border border-line bg-panel shadow-[var(--shadow)]"
            >
              {shot ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={shot} alt={`${c.name} homepage`} className="h-full w-full object-cover object-top" loading="lazy" />
              ) : (
                <div className="flex h-full flex-col justify-center px-6 text-left">
                  <div className="label">{c.label}</div>
                  <div className="mt-2 font-serif text-[26px]">{c.name}</div>
                  <MotifArt id={c.id} />
                  <div className="font-mono text-[11px] text-muted">you&apos;re looking at it</div>
                </div>
              )}
            </m.button>
          );
        })}
        {([["‹", -1, "left-6"], ["›", 1, "right-6"]] as const).map(([g, d, side]) => (
          <button key={side} onClick={() => go(d)} aria-label={d < 0 ? "Previous" : "Next"}
                  className={`absolute ${side} z-40 grid h-9 w-9 place-items-center rounded-full border border-line bg-bg
                              text-[17px] text-muted transition-colors hover:text-fg`}>
            {g}
          </button>
        ))}
      </div>

      <div className="flex shrink-0 flex-col items-center gap-3 px-6 pb-6 text-center">
        <div>
          <span className="font-serif text-[22px]">{p.name}</span>
          <p className="mt-1 max-w-[52ch] text-[14px] text-muted">{p.line}</p>
        </div>
        <div className="flex items-center gap-4 font-mono text-[12px]">
          {p.id !== "ghostos" && (
            <button onClick={() => browse(p.id)} className="rounded-full border border-accent/60 px-4 py-1.5 text-accent transition-colors hover:bg-accent/10">
              open in safari
            </button>
          )}
          <a href={p.live} {...ext} className="link-u text-fg">live ↗</a>
          <a href={p.repo} {...ext} className="link-u text-muted">code ↗</a>
        </div>
        <div className="flex items-center gap-1.5">
          {running.map((c, n) => (
            <button key={c.id} onClick={() => setI(n)} aria-label={`Go to ${c.name}`}
                    className="h-[5px] rounded-full transition-all duration-300"
                    style={{ width: n === i ? 22 : 5, background: n === i ? "var(--accent)" : "var(--line)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
