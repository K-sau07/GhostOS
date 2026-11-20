"use client";
import { createContext, useContext } from "react";
import type { LiveData } from "./live-types";

const Ctx = createContext<LiveData>({ leetcode: null, contributions: null, quote: 0 });

export function LiveProvider({ value, children }: { value: LiveData; children: React.ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLive = () => useContext(Ctx);
