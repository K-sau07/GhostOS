"use client";
import { useTheme } from "next-themes";

/** Flips between light and dark. Until it's touched, the site follows the OS. */
export function useToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  return () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = useToggleTheme();
  return (
    <button onClick={toggle} aria-label="Switch between light and dark" title="Light / dark"
            className={`grid h-6 w-6 place-items-center text-muted transition-colors hover:text-fg ${className}`}>
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
        <circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
