"use client";
import { LazyMotion, domAnimation } from "framer-motion";

/** Loads only the animation features the OS uses, and requires `m.*` components. */
export default function Motion({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation} strict>{children}</LazyMotion>;
}
