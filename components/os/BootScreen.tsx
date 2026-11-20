import { running, earlier, sensei } from "@/lib/content";

const LINES = [
  "reading about.md ............ ok",
  `indexing projects ........... ${running.length} running, ${earlier.length} before`,
  `tracing ft-login ............ ${sensei.hops.length} hops`,
  "starting window server ...... ok",
];

/** Plays once per session on the desktop, in CSS only, so it never blocks the
    page underneath and costs nothing without JavaScript. */
export default function BootScreen() {
  return (
    <div className="boot" aria-hidden>
      <div className="w-[340px]">
        <div className="font-serif text-[34px] leading-none">Ghost OS</div>
        <div className="mt-7 space-y-1.5">
          {LINES.map((l, i) => (
            <div key={l} className="boot-line whitespace-pre font-mono text-[11px] text-muted"
                 style={{ "--d": `${0.12 + i * 0.2}s` }}>
              {l}
            </div>
          ))}
        </div>
        <div className="mt-6 h-px bg-line">
          <div className="boot-bar h-px bg-accent" />
        </div>
      </div>
    </div>
  );
}
