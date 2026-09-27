"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "ghost kernel 1.0.0 · darwin-arm64",
  "mounting /dev/fog ................ ok",
  "mounting /work ................... 6 volumes",
  "loading systems.app .............. ok",
  "spawning window server ........... ok",
  "condensing atmosphere ............ ok",
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // respect users who don't want motion — skip straight through
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }
    if (n < LINES.length) {
      const t = setTimeout(() => setN(n + 1), 150 + Math.random() * 110);
      return () => clearTimeout(t);
    }
    const a = setTimeout(() => setFading(true), 420);
    const b = setTimeout(onDone, 1180);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [n, onDone]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9000] bg-black flex flex-col items-center justify-center"
        animate={{ opacity: fading ? 0 : 1 }}
        transition={{ duration: .7, ease: [.16, 1, .3, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(22px)", scale: .97 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1.5, ease: [.16, 1, .3, 1] }}
          className="text-center mb-11"
        >
          <div className="ghost-type font-extrabold uppercase tracking-[-.03em]"
               style={{ fontSize: 62, lineHeight: 1 }}>
            GHOST
          </div>
          <div className="mono text-[11px] tracking-[.5em] text-white/34 mt-2 pl-[.5em]">
            OS 1.0
          </div>
        </motion.div>

        <div className="w-[330px] space-y-[5px]">
          {LINES.slice(0, n).map((l) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: .25 }}
              className="mono text-[10.5px] tracking-[.06em] text-white/38"
            >
              {l}
            </motion.div>
          ))}
        </div>

        <div className="w-[330px] h-px bg-white/10 mt-7 overflow-hidden">
          <motion.div
            className="h-full bg-white/60"
            initial={{ width: "0%" }}
            animate={{ width: `${(n / LINES.length) * 100}%` }}
            transition={{ ease: [.16, 1, .3, 1], duration: .35 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
