"use client";
import { useEffect, useId, useRef, useState } from "react";
import { sensei } from "@/lib/content";
import SenseiShowcase from "./SenseiShowcase";

const layerColor = (l: string) => `var(--l-${l})`;
const ext = { target: "_blank", rel: "noreferrer" } as const;

/** OpenLens is named in the story; it should be a link there too. */
function Origin({ text }: { text: string }) {
  const at = text.indexOf("OpenLens");
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <a href="https://openlens-ten.vercel.app" {...ext} className="link-u text-fg">OpenLens</a>
      {text.slice(at + "OpenLens".length)}
    </>
  );
}

/**
 * The README's repo-sensei card, rebuilt as a component. The story is CSS
 * (see .rs in globals.css): the question types itself, the trace draws down
 * seven hops with a pulse, the answer lands with citation chips. Here we only
 * start it when it's on screen, replay it, and tie each chip to its row.
 */
export default function Sensei() {
  const root = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(0);
  const [hot, setHot] = useState<number | null>(null);
  const uid = useId().replace(/:/g, "");
  const hopId = (i: number) => `${uid}-hop-${i}`;

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      // On the first visit the desktop boots first; start once it's shown.
      const booting =
        !document.documentElement.dataset.booted &&
        window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches;
      t = setTimeout(() => { el.dataset.play = ""; }, booting ? 1700 : 150);
    }, { threshold: 0, rootMargin: "0px 0px -25% 0px" }); // the section is taller than the screen, so watch its top edge
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  const goto = (e: React.MouseEvent, hop: number) => {
    e.preventDefault();
    document.getElementById(hopId(hop))?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    setHot(hop);
  };

  return (
    <div ref={root} className="rs @container relative">
      <div aria-hidden className="dots pointer-events-none absolute inset-0 opacity-70"
           style={{ "--gx": "22%", "--gy": "48%" }} />

      <div key={run} className="relative px-6 pb-2 pt-8 @[640px]:px-10 @[640px]:pt-9">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-[34px] font-normal leading-none @[640px]:text-[40px]">{sensei.name}</h2>
          <a href={sensei.href} {...ext} className="link-u font-mono text-[13px] text-accent max-[420px]:hidden">
            reposensei.com
          </a>
        </div>
        <p className="mt-3 text-[16px] leading-[1.5] text-muted @[640px]:text-[17px]">{sensei.pitch}</p>

        {/* the question */}
        <div className="mt-6 flex h-12 min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-line bg-panel px-4
                        font-mono text-[12.5px] @[480px]:text-[14.5px]">
          <span className="text-accent">›</span>
          <span className="rs-q a" style={{ "--n": sensei.question.length }}>
            {sensei.question}
          </span>
          <span aria-hidden className="rs-caret -ml-2 inline-block h-[17px] w-[8px] rounded-[1.5px] bg-accent/80" />
        </div>

        {/* what it does, the pill walking across */}
        <div className="mt-3 flex justify-end">
          <ul aria-label="What repo-sensei does"
              className="relative grid w-full max-w-[480px] grid-cols-6">
            <li aria-hidden className="rs-pill a absolute inset-y-0 left-0 w-1/6 list-none rounded-full bg-accent/15" />
            {sensei.modes.map((m) => (
              <li key={m}
                  className="relative grid h-7 place-items-center font-mono text-[9px] uppercase tracking-[.6px]
                             text-muted @[480px]:text-[10.5px] @[480px]:tracking-[1.6px]">
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3 grid grid-cols-[minmax(0,1fr)] gap-5 @[680px]:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] @[680px]:items-start">
          {/* the trace */}
          <ol aria-label="The trace, from the login form to the table it reads" className="@container/trace relative min-w-0">
            <div aria-hidden className="absolute bottom-7 left-[15px] top-7 w-px @[600px]/trace:bottom-[21px] @[600px]/trace:top-[21px]">
              <div className="rs-rail a absolute inset-0 bg-line" />
              <div className="rs-pulse a absolute left-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent
                              shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_22%,transparent),0_0_16px_var(--accent)]" />
            </div>
            {sensei.hops.map((h, i) => {
              const k = sensei.cites.indexOf(i);
              return (
                <li
                  key={i}
                  id={hopId(i)}
                  data-hot={hot === i}
                  style={{ "--i": i, "--k": k }}
                  className={`rs-hop a relative grid h-14 scroll-m-4 grid-cols-[22px_66px_minmax(0,1fr)] grid-rows-2 @[440px]/trace:grid-cols-[22px_80px_minmax(0,1fr)] items-center
                              rounded-lg px-2.5 font-mono @[600px]/trace:h-[42px] @[600px]/trace:grid-rows-1
                              @[600px]/trace:grid-cols-[22px_80px_minmax(0,1fr)_auto]
                              ${k >= 0 ? "rs-cited" : ""}`}
                >
                  <span className="row-span-2 h-[11px] w-[11px] rounded-full border-[1.6px] bg-bg @[600px]/trace:row-span-1"
                        style={{ borderColor: layerColor(h.layer) }} />
                  <span className="row-span-2 text-[10px] uppercase tracking-[1.4px] @[440px]/trace:text-[10.5px] @[440px]/trace:tracking-[2px] @[600px]/trace:row-span-1" style={{ color: layerColor(h.layer) }}>
                    {h.layer}
                  </span>
                  <span className="self-end truncate text-[12px] text-fg @[440px]/trace:text-[13.5px] @[600px]/trace:self-center">{h.symbol}</span>
                  <span className="col-start-3 self-start truncate text-[10.5px] text-muted @[440px]/trace:text-[11px] @[600px]/trace:self-center @[600px]/trace:col-start-4 @[600px]/trace:pl-3 @[600px]/trace:text-right">
                    {h.path}:{h.line}
                  </span>
                </li>
              );
            })}
          </ol>

          {/* the answer */}
          <div className="rs-panel a rounded-[14px] border border-line bg-panel p-5">
            <div className="label flex items-center gap-2.5"><span className="dot" />Answer</div>
            <p className="rs-answer a mt-3 text-[15px] leading-[1.6]">{sensei.answer}</p>
            <ul className="mt-4 space-y-2" aria-label="Citations">
              {sensei.cites.map((hop, k) => {
                const h = sensei.hops[hop];
                return (
                  <li key={hop} className="flex items-center gap-3">
                    <a
                      href={`#${hopId(hop)}`}
                      onClick={(e) => goto(e, hop)}
                      onMouseEnter={() => setHot(hop)}
                      onMouseLeave={() => setHot(null)}
                      onFocus={() => setHot(hop)}
                      onBlur={() => setHot(null)}
                      data-hot={hot === hop}
                      aria-label={`Citation ${k + 1}: ${h.symbol}, ${h.path} line ${h.line}`}
                      style={{ "--k": k }}
                      className="rs-chip a grid h-[22px] min-w-[30px] place-items-center rounded-md border border-accent
                                 font-mono text-[11.5px] text-accent transition-colors"
                    >
                      {k + 1}
                    </a>
                    <span className="truncate font-mono text-[11.5px] text-muted">{h.path}:{h.line}</span>
                  </li>
                );
              })}
            </ul>
            <div className="rs-checked a mt-4 flex items-center justify-between gap-3 font-mono text-[11px] text-muted">
              <span>{sensei.checked}</span>
              <button
                onClick={() => { setHot(null); setRun((r) => r + 1); }}
                className="link-u shrink-0 text-accent"
              >
                ↻ replay
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 border-t border-line pt-4 font-mono text-[11.5px] leading-[1.7] text-muted">
          {sensei.source}
        </p>
      </div>

      <div className="relative space-y-4 px-6 pb-9 pt-4 text-[15px] leading-[1.7] @[640px]:px-10">
        <div className="flex items-center gap-5 pt-2">
          <h3 className="label shrink-0">Why I built it</h3>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>
        {sensei.story.map((t, i) => (
          <p key={i} className={`max-w-[64ch] ${i === 0 ? "font-serif text-[20px] leading-[1.5] text-fg" : "text-muted"}`}>
            <Origin text={t} />
          </p>
        ))}
        <div className="pt-8"><SenseiShowcase /></div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-8 text-[14.5px]">
          {sensei.links.map((l, i) => (
            <span key={l.label} className="flex items-center gap-3">
              <a href={l.href} {...ext} className={`link-u ${i === 0 ? "font-medium text-accent" : "text-fg"}`}>
                {l.label}
              </a>
              {i < sensei.links.length - 1 && <span aria-hidden className="text-muted">·</span>}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
