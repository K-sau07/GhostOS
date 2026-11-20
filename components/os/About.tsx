import { profile } from "@/lib/content";

const links = [
  { label: "résumé", href: profile.resume, note: "pdf" },
  { label: "linkedin", href: profile.linkedin, note: "↗" },
  { label: "github", href: profile.github, note: "↗" },
  { label: "email", href: `mailto:${profile.email}`, note: "↗" },
];

/** The header piece: who, what, and the three facts under a hairline. */
export default function About() {
  return (
    <div className="flex min-h-full flex-col px-7 pb-7 pt-9 lg:px-10 lg:pt-11">
      <div className="label">
        {profile.city}<span className="dot mx-2.5" />{profile.role}
      </div>

      <h1 className="mt-5 font-serif text-[clamp(44px,12vw,60px)] font-normal leading-[1.02] tracking-[-.01em] lg:text-[58px]">
        {profile.name}
      </h1>

      <p className="mt-5 max-w-[34ch] text-[18px] leading-[1.5] text-muted">{profile.line}</p>

      <div className="mt-8 border-t border-line pt-5 font-mono text-[13px] leading-[2.05] text-muted">
        {profile.facts.map((f) => <div key={f}>{f}</div>)}
        <div>
          now:{" "}
          <a href={profile.now.href} className="link-u text-fg">{profile.now.label}</a>
        </div>
      </div>

      <nav aria-label="Elsewhere" className="mt-auto pt-10">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12.5px]">
          {links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="link-u text-fg"
                 {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                {l.label}
              </a>
              <span className="ml-1.5 text-muted">{l.note}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-[11.5px] leading-[1.7] text-muted max-lg:hidden">
          Projects, a shell and the résumé are in the dock. ⌘K searches everything.
        </p>
      </nav>
    </div>
  );
}
