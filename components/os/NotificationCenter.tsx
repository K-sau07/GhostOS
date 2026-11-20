"use client";
import { useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { useOS } from "@/lib/store";
import { launch } from "@/lib/actions";
import { QuoteWidget, GitHubWidget, LeetCodeWidget, useNow, fmtDate, fmtTime } from "./Widgets";

/** The panel behind the menu-bar clock: today, the quote, and the live widgets. */
export default function NotificationCenter() {
  const { nc, setNc } = useOS();

  useEffect(() => {
    if (!nc) return;
    const close = () => setNc(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [nc, setNc]);

  return (
    <AnimatePresence>
      {nc && (
        <m.aside
          aria-label="Notification Center"
          initial={{ x: 380, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 380, opacity: 0 }}
          transition={{ duration: .35, ease: [.2, .7, .2, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-3 right-3 top-[38px] z-[450] w-[360px] space-y-3 overflow-auto rounded-[16px]
                     border border-line bg-panel p-3 shadow-[var(--shadow)] max-lg:hidden"
        >
          <Today />
          <QuoteWidget size="sm" />
          <GitHubWidget compact />
          <LeetCodeWidget />
          <button
            onClick={() => { setNc(false); launch("activity"); }}
            className="w-full rounded-[12px] border border-line bg-bg py-2.5 font-mono text-[11px] uppercase tracking-[1.6px]
                       text-muted transition-colors hover:text-fg"
          >
            Open activity
          </button>
        </m.aside>
      )}
    </AnimatePresence>
  );
}

function Today() {
  const now = useNow(1000);
  return (
    <div className="px-2 pb-1 pt-2">
      <div suppressHydrationWarning className="font-serif text-[44px] leading-none tabular-nums">{fmtTime(now)}</div>
      <div suppressHydrationWarning className="mt-2 font-mono text-[11.5px] text-muted">{fmtDate(now)}</div>
    </div>
  );
}
