import { create } from "zustand";

export type WinId = string;

export interface WinState {
  id: WinId;
  title: string;        // "openlens.app"
  x: number; y: number;
  w: number; h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
  /** geometry stashed before maximize so we can restore */
  prev?: { x: number; y: number; w: number; h: number };
}

interface OS {
  booted: boolean;
  wallpaperFocus: boolean;      // true when desktop itself is focused
  windows: WinState[];
  topZ: number;
  spotlight: boolean;

  boot: () => void;
  open: (id: WinId, title: string, w?: number, h?: number) => void;
  close: (id: WinId) => void;
  focus: (id: WinId) => void;
  minimize: (id: WinId) => void;
  toggleMax: (id: WinId) => void;
  move: (id: WinId, x: number, y: number) => void;
  resize: (id: WinId, w: number, h: number) => void;
  focusDesktop: () => void;
  setSpotlight: (v: boolean) => void;
}

const MENUBAR = 30;
const DOCK = 78;

/** cascade new windows so they never land exactly on top of each other */
function cascade(count: number, w: number, h: number) {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const step = 28;
  const baseX = Math.max(24, (vw - w) / 2 - 90);
  const baseY = Math.max(MENUBAR + 16, (vh - DOCK - h) / 2 - 30);
  // wrap the cascade every 6 windows so it can't march off screen
  const n = count % 6;
  return {
    x: Math.min(baseX + n * step, vw - w - 24),
    y: Math.min(baseY + n * step, vh - DOCK - h - 16),
  };
}

export const useOS = create<OS>((set, get) => ({
  booted: false,
  wallpaperFocus: true,
  windows: [],
  topZ: 10,
  spotlight: false,

  boot: () => set({ booted: true }),

  open: (id, title, w = 880, h = 560) => {
    const { windows, topZ } = get();
    const existing = windows.find((x) => x.id === id);
    // already open → just un-minimize and raise it
    if (existing) {
      set({
        topZ: topZ + 1,
        wallpaperFocus: false,
        windows: windows.map((x) =>
          x.id === id ? { ...x, minimized: false, z: topZ + 1 } : x
        ),
      });
      return;
    }
    const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    const ww = Math.min(w, vw - 48);
    const wh = Math.min(h, vh - MENUBAR - DOCK - 32);
    const { x, y } = cascade(windows.length, ww, wh);
    set({
      topZ: topZ + 1,
      wallpaperFocus: false,
      windows: [
        ...windows,
        { id, title, x, y, w: ww, h: wh, z: topZ + 1, minimized: false, maximized: false },
      ],
    });
  },

  close: (id) => set((s) => ({ windows: s.windows.filter((x) => x.id !== id) })),

  focus: (id) =>
    set((s) => ({
      topZ: s.topZ + 1,
      wallpaperFocus: false,
      windows: s.windows.map((x) => (x.id === id ? { ...x, z: s.topZ + 1 } : x)),
    })),

  minimize: (id) =>
    set((s) => ({
      windows: s.windows.map((x) => (x.id === id ? { ...x, minimized: true } : x)),
    })),

  toggleMax: (id) =>
    set((s) => ({
      windows: s.windows.map((x) => {
        if (x.id !== id) return x;
        if (x.maximized) {
          const p = x.prev ?? { x: 60, y: 60, w: 880, h: 560 };
          return { ...x, ...p, maximized: false, prev: undefined };
        }
        return {
          ...x,
          prev: { x: x.x, y: x.y, w: x.w, h: x.h },
          x: 0,
          y: MENUBAR,
          w: window.innerWidth,
          h: window.innerHeight - MENUBAR - DOCK + 12,
          maximized: true,
        };
      }),
    })),

  move: (id, x, y) =>
    set((s) => ({ windows: s.windows.map((k) => (k.id === id ? { ...k, x, y } : k)) })),

  resize: (id, w, h) =>
    set((s) => ({ windows: s.windows.map((k) => (k.id === id ? { ...k, w, h } : k)) })),

  focusDesktop: () => set({ wallpaperFocus: true }),
  setSpotlight: (v) => set({ spotlight: v }),
}));
