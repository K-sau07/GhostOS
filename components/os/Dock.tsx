"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useOS } from "@/lib/store";
import { DOCK_ITEMS } from "@/lib/apps";

/** macOS-style magnification: scale falls off with distance from the cursor. */
function useMagnify() {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const scaleFor = (el: HTMLElement | null) => {
    if (mouseX === null || !el) return 1;
    const r = el.getBoundingClientRect();
    const centre = r.left + r.width / 2;
    const d = Math.abs(mouseX - centre);
    const RANGE = 130;
    if (d > RANGE) return 1;
    return 1 + 0.62 * Math.pow(1 - d / RANGE, 1.8);
  };
  return { ref, setMouseX, scaleFor };
}

function DockIcon({
  item, scaleFor,
}: {
  item: (typeof DOCK_ITEMS)[number];
  scaleFor: (el: HTMLElement | null) => number;
}) {
  const el = useRef<HTMLButtonElement>(null);
  const { open, windows } = useOS();
  const running = windows.some((w) => w.id === item.id);
  const s = scaleFor(el.current);

  return (
    <div className="relative flex flex-col items-center">
      <motion.span
        className="mono pointer-events-none absolute -top-9 whitespace-nowrap rounded-md
                   px-2.5 py-1 text-[10px] tracking-[.12em] glass"
        initial={false}
        animate={{ opacity: s > 1.3 ? 1 : 0, y: s > 1.3 ? 0 : 6 }}
        transition={{ duration: .2 }}
      >
        {item.title}
      </motion.span>

      <motion.button
        ref={el}
        onClick={() => item.href ? window.open(item.href, "_blank") : open(item.id, item.title, item.w, item.h)}
        aria-label={item.title}
        animate={{ scale: s, y: -(s - 1) * 16 }}
        transition={{ type: "spring", stiffness: 420, damping: 26, mass: .5 }}
        className="grid place-items-center w-[46px] h-[46px] rounded-[11px]
                   text-white/78 hover:text-white glass origin-bottom"
      >
        <item.icon size={26} />
      </motion.button>

      <span
        className={`mt-[5px] h-[3px] w-[3px] rounded-full transition-opacity duration-300
                    ${running ? "bg-white/85 opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export default function Dock() {
  const { ref, setMouseX, scaleFor } = useMagnify();
  return (
    <div className="fixed bottom-2.5 left-0 right-0 z-[400] flex justify-center pointer-events-none">
      <div
        ref={ref}
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        className="pointer-events-auto flex items-end gap-2.5 px-3 pt-2 pb-1.5
                   rounded-[17px] glass"
      >
        {DOCK_ITEMS.map((it, i) => (
          <div key={it.id} className="flex items-end gap-2.5">
            {it.sep && <span className="w-px h-9 bg-white/14 mx-.5 mb-3" />}
            <DockIcon item={it} scaleFor={scaleFor} />
          </div>
        ))}
      </div>
    </div>
  );
}
