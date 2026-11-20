import ThemeToggle from "./ThemeToggle";

const NAV = [
  { label: "about", href: "#win-about" },
  { label: "sensei", href: "#win-sensei" },
  { label: "projects", href: "#win-projects" },
  { label: "résumé", href: "/resume.pdf" },
];

/** Below the desktop breakpoint: a quiet top bar, and a dock that jumps between windows. */
export default function MobileBar() {
  return (
    <>
      <div className="flex h-12 items-center justify-between px-5 lg:hidden">
        <span className="font-serif text-[16px]">Ghost OS</span>
        <ThemeToggle />
      </div>
      <nav aria-label="Sections"
           className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden">
        <ul className="mx-auto flex max-w-[420px] gap-1 rounded-[14px] border border-line bg-bg p-1.5 shadow-[var(--shadow)]">
          {NAV.map((n) => (
            <li key={n.label} className="flex-1">
              <a href={n.href}
                 className="block rounded-[9px] py-2 text-center font-mono text-[10.5px] uppercase tracking-[1.4px]
                            text-muted active:bg-panel">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
