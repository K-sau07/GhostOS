import { create } from "zustand";

/** Every window the OS knows about. They all exist in the page from the first
    byte, so the content is readable without JavaScript; the store only decides
    which ones the desktop shows and where. */
export const WINDOWS = {
  about:    { title: "about" },
  sensei:   { title: "repo-sensei" },
  projects: { title: "projects" },
  shell:    { title: "shell" },
  resume:   { title: "résumé.pdf" },
} as const;

export type WinId = keyof typeof WINDOWS;

export interface Geo { x: number; y: number; w: number; h: number }

export interface WinState {
  open: boolean;
  min: boolean;
  max: boolean;
  z: number;
  /** null until the window is dragged or resized; until then CSS places it */
  geo: Geo | null;
}

interface OS {
  wins: Record<WinId, WinState>;
  topZ: number;
  spotlight: boolean;

  open: (id: WinId) => void;
  close: (id: WinId) => void;
  focus: (id: WinId) => void;
  minimize: (id: WinId) => void;
  toggleMax: (id: WinId) => void;
  place: (id: WinId, geo: Geo) => void;
  setSpotlight: (v: boolean) => void;
}

const closed: WinState = { open: false, min: false, max: false, z: 10, geo: null };

export const useOS = create<OS>((set) => ({
  // Same on server and client, so the first paint and hydration agree.
  wins: {
    about:    { ...closed, open: true, z: 11 },
    sensei:   { ...closed, open: true, z: 12 },
    projects: closed,
    shell:    closed,
    resume:   closed,
  },
  topZ: 12,
  spotlight: false,

  open: (id) =>
    set((s) => ({
      topZ: s.topZ + 1,
      wins: { ...s.wins, [id]: { ...s.wins[id], open: true, min: false, z: s.topZ + 1 } },
    })),

  close: (id) =>
    set((s) => ({ wins: { ...s.wins, [id]: { ...s.wins[id], open: false, max: false } } })),

  focus: (id) =>
    set((s) =>
      s.wins[id].z === s.topZ
        ? s
        : { topZ: s.topZ + 1, wins: { ...s.wins, [id]: { ...s.wins[id], z: s.topZ + 1 } } }),

  minimize: (id) =>
    set((s) => ({ wins: { ...s.wins, [id]: { ...s.wins[id], min: true } } })),

  toggleMax: (id) =>
    set((s) => ({ wins: { ...s.wins, [id]: { ...s.wins[id], max: !s.wins[id].max } } })),

  place: (id, geo) =>
    set((s) => ({ wins: { ...s.wins, [id]: { ...s.wins[id], geo } } })),

  setSpotlight: (v) => set({ spotlight: v }),
}));

/** the window in front, if any is showing */
export function frontmost(wins: Record<WinId, WinState>): WinId | null {
  let best: WinId | null = null;
  for (const id of Object.keys(wins) as WinId[]) {
    const w = wins[id];
    if (!w.open || w.min) continue;
    if (!best || w.z > wins[best].z) best = id;
  }
  return best;
}
