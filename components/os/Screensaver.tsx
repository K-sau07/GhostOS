"use client";
import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useNow, useQuote, fmtDate, fmtTime } from "./Widgets";

const IDLE_MS = 60_000;

/** A minute without input on the desktop dims the screen to the time and the
    quote of the day. Any key, click, scroll or mouse move wakes it. */
export default function Screensaver() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      clearTimeout(t);
      if (wide.matches) t = setTimeout(() => !document.hidden && setOn(true), IDLE_MS);
    };
    const wake = () => { setOn(false); schedule(); };
    const events = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((ev) => window.addEventListener(ev, wake, { passive: true }));
    schedule();
    return () => { clearTimeout(t); events.forEach((ev) => window.removeEventListener(ev, wake)); };
  }, []);

  return <AnimatePresence>{on && <Saver />}</AnimatePresence>;
}

function Saver() {
  const q = useQuote();
  const now = useNow(1000);
  return (
    <m.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: .9 }}
      aria-hidden
      className="fixed inset-0 z-[8500] grid place-items-center bg-bg"
    >
      <div className="saver-grid dots absolute inset-0" style={{ "--gx": "50%", "--gy": "50%" }} />
      <div className="relative max-w-[760px] px-10 text-center">
        <div suppressHydrationWarning className="font-serif text-[104px] leading-none tabular-nums">{fmtTime(now)}</div>
        <div suppressHydrationWarning className="label mt-5">{fmtDate(now)}</div>
        <p className="mt-14 font-serif text-[30px] leading-[1.35]">&ldquo;{q.text}&rdquo;</p>
        <p className="mt-5 font-mono text-[12px] uppercase tracking-[2px] text-muted">
          {q.by}{q.where ? <span className="normal-case tracking-normal">, {q.where}</span> : null}
        </p>
      </div>
      <div className="absolute bottom-8 font-mono text-[11px] text-muted">move the mouse to wake</div>
    </m.div>
  );
}
