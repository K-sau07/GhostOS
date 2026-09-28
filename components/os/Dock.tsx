"use client";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useOS } from "@/lib/store";
import { DOCK_ITEMS } from "@/lib/apps";

const MAGNIFY_RANGE = 130;

/** Scale falls off with distance from the cursor, like the macOS dock. */
function scaleAt(mouseX: number | null, centre: number | undefined): number {
  if (mouseX === null || centre === undefined) return 1;
  const d = Math.abs(mouseX - centre);
  if (d > MAGNIFY_RANGE) return 1;
  return 1 + 0.62 * Math.pow(1 - d / MAGNIFY_RANGE, 1.8);
}

function DockIcon({
  item, mouseX, onMeasure,
}: {
  item: (typeof DOCK_ITEMS)[number];
  mouseX: number | null;
  onMeasure: (id: string, centre: number) => void;
}) {
  const { open, windows } = useOS();
  const running = windows.some((w) => w.id === item.id);
  const [centre, setCentre] = useState<number | undefined>(undefined);
  const s = scaleAt(mouseX, centre);

  // Measure once mounted rather than reading a ref while rendering.
  const measure = useCallback((node: HTMLButtonElement | null) => {
    if (!node) return;
    const r = node.getBoundingClientRect();
    const c = r.left + r.width / 2;
    setCentre(c);
    onMeasure(item.id, c);
  }, [item.id, onMeasure]);

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
        ref={measure}
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
  const [mouseX, setMouseX] = useState<number | null>(null);
  const noteCentre = useCallback(() => {}, []);
  return (
    <div className="fixed bottom-2.5 left-0 right-0 z-[400] flex justify-center pointer-events-none">
      <div
        onMouseMove={(e) => setMouseX(e.clientX)}
        onMouseLeave={() => setMouseX(null)}
        className="pointer-events-auto flex items-end gap-2.5 px-3 pt-2 pb-1.5
                   rounded-[17px] glass"
      >
        {DOCK_ITEMS.map((it) => (
          <div key={it.id} className="flex items-end gap-2.5">
            {it.sep && <span className="w-px h-9 bg-white/14 mx-.5 mb-3" />}
            <DockIcon item={it} mouseX={mouseX} onMeasure={noteCentre} />
          </div>
        ))}
      </div>
    </div>
  );
}
