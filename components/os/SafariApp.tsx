"use client";
import { useState } from "react";
import { projects } from "@/lib/content";

/* Safari-style window in a device bezel.
   Defaults to a real iframe of the live site — these are Saurabh's own Vercel
   deploys so framing is allowed. A captured screenshot sits behind as the
   poster, and a toggle lets you fall back to it if a host blocks embedding. */
export default function SafariApp({ id }: { id: string }) {
  const p = projects.find((x) => x.id === id);
  const [mode, setMode] = useState<"live" | "shot">("live");
  const [loaded, setLoaded] = useState(false);

  if (!p) return <div className="mono text-white/40 p-7">page not found</div>;
  const url = p.live ?? "";
  const shot = p.live ? `/shots/${p.id}.png` : null;
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : "about:blank";

  return (
    <div className="h-full flex flex-col p-4 gap-0 bg-[#0A0B0D]">
      {/* device bezel */}
      <div className="flex-1 min-h-0 rounded-[18px] border border-white/12 bg-[#141518]
                      p-2.5 flex flex-col shadow-[0_24px_60px_-18px_rgba(0,0,0,.9)]">
        {/* camera dot */}
        <div className="h-[9px] grid place-items-center shrink-0">
          <span className="w-[5px] h-[5px] rounded-full bg-white/18" />
        </div>

        {/* url bar */}
        <div className="flex items-center gap-2.5 h-[36px] shrink-0 px-3 mb-2.5 mt-1
                        rounded-[11px] bg-black/55 border border-white/10">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="1.9" className="text-white/45 shrink-0">
            <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z" />
          </svg>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="1.6" className="text-white/40 shrink-0">
            <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
          </svg>
          <span className="mono text-[12px] text-white/78 truncate flex-1">{host}</span>

          {shot && (
            <button
              onClick={() => setMode(mode === "live" ? "shot" : "live")}
              className="mono text-[9px] tracking-[.12em] text-white/50 hover:text-white
                         border border-white/14 rounded-[5px] px-2 py-1 transition-colors shrink-0"
            >
              {mode === "live" ? "LIVE" : "SNAPSHOT"}
            </button>
          )}
          <a href={url || "#"} target="_blank" rel="noreferrer"
             onClick={(e) => { if (!url) e.preventDefault(); }}
             className="mono text-[10px] font-medium tracking-[.1em] shrink-0
                        bg-white text-black rounded-[7px] px-3 py-[5px]
                        hover:bg-white/85 transition-colors">
            OPEN ↗
          </a>
        </div>

        {/* viewport */}
        <div className="flex-1 min-h-0 rounded-[11px] overflow-hidden bg-white/[.03] relative">
          {!url ? (
            <div className="h-full grid place-items-center px-10 text-center">
              <div>
                <div className="text-[21px] font-bold mb-3">{p.name}</div>
                <p className="text-[13.5px] leading-[1.7] text-white/58 max-w-[44ch] mb-6">{p.tagline}</p>
                <div className="mono text-[9.5px] tracking-[.16em] text-white/30 mb-5">
                  NO PUBLIC DEPLOYMENT — SOURCE ONLY
                </div>
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer"
                     className="mono text-[10.5px] tracking-[.13em] border border-white/20
                                rounded-[4px] px-4 py-2.5 hover:bg-white hover:text-black transition-colors">
                    VIEW SOURCE ↗
                  </a>
                )}
              </div>
            </div>
          ) : mode === "shot" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shot!} alt={`${p.name} homepage`} className="w-full" />
          ) : (
            <>
              {/* poster keeps the frame filled until the live page paints */}
              {!loaded && shot && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={shot} alt="" className="absolute inset-0 w-full opacity-45" />
              )}
              <iframe
                src={url}
                title={`${p.name} live site`}
                onLoad={() => setLoaded(true)}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                className="w-full h-full border-0 relative"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
