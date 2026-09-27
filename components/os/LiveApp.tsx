"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/content";
import { useOS } from "@/lib/store";
import { StatusBar } from "./MacChrome";

/* 3D coverflow of live project sites.
   Centre card is sharp and square-on; neighbours rotate away, blur and dim,
   so depth does the work of a colour accent. */
export default function LiveApp() {
  const { open } = useOS();
  // every project can appear here; ones without a live URL show as "local build"
  const cards = projects.filter((p) => p.featured || p.live);
  const [i, setI] = useState(() => Math.max(0, cards.findIndex((c) => c.live)));

  const go = (d: number) => setI((v) => (v + d + cards.length) % cards.length);
  const active = cards[i];

  return (
    <div className="h-full flex flex-col select-none">
      <div className="pt-7 pb-1 text-center shrink-0">
        <h2 className="text-[27px] font-extrabold uppercase tracking-[-.02em]">Live Projects</h2>
        <div className="mono text-[10px] tracking-[.2em] text-white/38 mt-2.5">
          CLICK A CARD FOR AN INSTANT LIVE PREVIEW
        </div>
      </div>

      <div className="flex-1 relative grid place-items-center min-h-0"
           style={{ perspective: 1500 }}>
        {cards.map((p, n) => {
          const d = n - i;
          const abs = Math.abs(d);
          if (abs > 2) return null;
          const shot = p.live ? `/shots/${p.id}.png` : null;

          return (
            <motion.button
              key={p.id}
              onClick={() => (d === 0 ? open(`safari:${p.id}`, "Safari", 1040, 700) : go(d))}
              animate={{
                x: d * 232,
                z: -abs * 190,
                rotateY: d * -26,
                scale: d === 0 ? 1 : 0.86,
                opacity: d === 0 ? 1 : 0.42,
                filter: d === 0 ? "blur(0px)" : "blur(2.5px)",
              }}
              transition={{ type: "spring", stiffness: 210, damping: 28, mass: .7 }}
              style={{ position: "absolute", transformStyle: "preserve-3d", zIndex: 10 - abs }}
              className="w-[310px] h-[218px] rounded-[10px] overflow-hidden
                         border border-white/14 bg-[#0F1013]
                         shadow-[0_26px_60px_-14px_rgba(0,0,0,.95)]"
            >
              {shot ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={shot} alt={p.name} className="w-full h-full object-cover object-top" />
              ) : (
                <div className="w-full h-full grid place-items-center px-5">
                  <div className="text-center">
                    <div className="mono text-[9.5px] tracking-[.22em] text-white/30 mb-3">
                      {p.file}
                    </div>
                    <div className="text-[19px] font-bold leading-tight text-white/82">{p.name}</div>
                    <div className="mono text-[9px] tracking-[.16em] text-white/28 mt-3.5">
                      LOCAL BUILD · NO PUBLIC URL
                    </div>
                  </div>
                </div>
              )}
            </motion.button>
          );
        })}

        {/* prev / next */}
        {[["‹", -1, "left-7"], ["›", 1, "right-7"]].map(([g, d, side]) => (
          <button
            key={side as string}
            onClick={() => go(d as number)}
            className={`absolute ${side} z-[40] w-9 h-9 rounded-full grid place-items-center
                        text-[17px] text-white/70 hover:text-white
                        bg-white/10 hover:bg-white/20 border border-white/14
                        backdrop-blur transition-colors`}
          >
            {g as string}
          </button>
        ))}
      </div>

      {/* active label + dots */}
      <div className="shrink-0 pb-6 flex flex-col items-center gap-4">
        <a
          href={active.live ?? active.repo ?? "#"}
          target="_blank" rel="noreferrer"
          onClick={(e) => { if (!active.live && !active.repo) e.preventDefault(); }}
          className="mono inline-flex items-center gap-2.5 text-[11px] tracking-[.14em]
                     rounded-full px-4 py-2 border border-white/22 bg-white/[.06]
                     hover:bg-white hover:text-black transition-colors duration-300"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${active.live ? "bg-white shadow-[0_0_9px_white]" : "bg-white/35"}`} />
          {active.name.toUpperCase()}
          <span className="opacity-60">↗</span>
        </a>

        <div className="flex items-center gap-1.5">
          {cards.map((p, n) => (
            <button
              key={p.id} onClick={() => setI(n)} aria-label={`Go to ${p.name}`}
              className="h-[5px] rounded-full transition-all duration-300"
              style={{
                width: n === i ? 22 : 5,
                background: n === i ? "#fff" : "rgba(255,255,255,.26)",
              }}
            />
          ))}
        </div>
      </div>

      <StatusBar>
        {cards.filter((c) => c.live).length} live · {cards.length - cards.filter((c) => c.live).length} local
        {" "}· {i + 1} of {cards.length}
      </StatusBar>
    </div>
  );
}
