"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  profile, headline, experience, projects, workSystems,
  skills, education, certifications,
} from "@/lib/content";
import Architecture from "./Architecture";

const rise = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: .7, ease: [.16, 1, .3, 1] as const },
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="mono text-[10px] tracking-[.26em] text-white/40 mb-4">{children}</div>
);
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="mono text-[10px] tracking-[.1em] text-white/70 border border-white/14
                   bg-white/[.04] rounded-[3px] px-2.5 py-1">{children}</span>
);
const Section = ({ n, title, children }: { n: string; title: string; children: React.ReactNode }) => (
  <motion.section {...rise} id={`s-${n}`} className="px-6 py-14 border-t border-white/8 scroll-mt-14">
    <Eyebrow>{`[ ${n} // ${title} ]`}</Eyebrow>
    {children}
  </motion.section>
);

/** The six sections, in order. Drives both the status bar and the dock. */
const SECTIONS = [
  { n: "01", title: "EXPERIENCE", short: "EXP" },
  { n: "02", title: "SYSTEMS",    short: "SYS" },
  { n: "03", title: "PROJECTS",   short: "WORK" },
  { n: "04", title: "STACK",      short: "STACK" },
  { n: "05", title: "EDUCATION",  short: "EDU" },
  { n: "06", title: "CONTACT",    short: "HI" },
];

/**
 * Mobile navigation. The desktop is an OS, so the phone gets the two pieces of
 * one that survive a small screen: a status bar that says where you are, and a
 * dock that takes you somewhere. Without them this page is 15,000px of scroll
 * with no way through it.
 */
function MobileChrome() {
  const [active, setActive] = useState<string | null>(null);
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Track which section owns the upper third of the screen.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id.replace("s-", ""));
      },
      { rootMargin: "-56px 0px -65% 0px", threshold: 0 },
    );
    SECTIONS.forEach((x) => {
      const el = document.getElementById(`s-${x.n}`);
      if (el) io.observe(el);
    });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const current = SECTIONS.find((x) => x.n === active);

  return (
    <>
      {/* status bar — appears once you leave the hero, so the hero stays clean */}
      <div
        className={`md:hidden fixed top-0 inset-x-0 z-50 h-11 px-4 flex items-center gap-2.5
                    bg-black/80 backdrop-blur-xl border-b border-white/8 transition-all duration-300
                    ${past ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <span className="text-[13px] leading-none">👻</span>
        <span className="mono text-[10px] tracking-[.2em] text-white/80">
          {current ? current.title : "GHOST OS"}
        </span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mono ml-auto text-[9.5px] tracking-[.18em] text-white/45"
        >
          TOP ↑
        </button>
      </div>

      {/* dock — the desktop metaphor, reduced to what a thumb can reach */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 pb-[env(safe-area-inset-bottom)]
                      before:content-[''] before:absolute before:inset-x-0 before:-top-10 before:h-10
                      before:bg-gradient-to-t before:from-black/80 before:to-transparent
                      before:pointer-events-none">
        <div className="mx-3 mb-3 px-1.5 py-1.5 rounded-[15px] border border-white/10
                        bg-black/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,.7)]
                        flex items-center justify-between gap-0.5">
          {SECTIONS.map((x) => {
            const on = x.n === active;
            return (
              <button
                key={x.n}
                onClick={() =>
                  document.getElementById(`s-${x.n}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className={`mono flex-1 rounded-[10px] py-2 text-[9px] tracking-[.12em] transition-colors
                            ${on ? "bg-white/12 text-white" : "text-white/45"}`}
              >
                {x.short}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}


/** One project card. Extracted so the list can render a short set by default. */
const ProjectCard = ({ p }: { p: (typeof projects)[number] }) => (
  <div className="mb-9 last:mb-0 pb-9 border-b border-white/8 last:border-0">
    <div className="mono text-[10px] text-white/34 mb-1.5">{p.file}</div>
    <h3 className="text-[18px] font-bold">{p.name}</h3>
    <div className="serif text-[15px] text-white/56 mt-1 mb-3">{p.tagline}</div>
    <p className="text-[13.5px] leading-[1.7] text-white/68 mb-3">{p.blurb}</p>
    <ul className="space-y-2 mb-4">
      {p.bullets.map((b) => (
        <li key={b} className="flex gap-2.5 text-[13px] leading-[1.65] text-white/62">
          <span className="text-white/26 mt-[3px]">—</span>{b}
        </li>
      ))}
    </ul>
    <div className="flex flex-wrap gap-1.5">{p.stack.map((t) => <Tag key={t}>{t}</Tag>)}</div>
    <div className="flex flex-wrap gap-2 mt-4">
      {p.live && (
        <a href={p.live} target="_blank" rel="noreferrer"
           className="mono inline-flex items-center gap-1.5 text-[10.5px] tracking-[.14em]
                      bg-white text-black rounded-[3px] px-3.5 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-black/70" /> LIVE ↗
        </a>
      )}
      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer"
           className="mono inline-block text-[10.5px] tracking-[.14em]
                      border border-white/20 rounded-[3px] px-3.5 py-2">
          SOURCE ↗
        </a>
      )}
    </div>
  </div>
);

/**
 * Every project expanded made this page ~15,000px tall on a phone. The deployed
 * and featured ones lead; the rest stay one tap away rather than twelve screens
 * of scrolling past.
 */
function ProjectList() {
  const [all, setAll] = useState(false);
  const lead = projects.filter((p) => p.live || p.featured);
  const rest = projects.filter((p) => !(p.live || p.featured));
  const shown = all ? [...lead, ...rest] : lead;

  return (
    <>
      {shown.map((p) => <ProjectCard key={p.id} p={p} />)}
      {!all && rest.length > 0 && (
        <button
          onClick={() => setAll(true)}
          className="mono w-full mt-2 py-3.5 rounded-[4px] border border-white/16
                     text-[10.5px] tracking-[.16em] text-white/70"
        >
          SHOW {rest.length} MORE ↓
        </button>
      )}
    </>
  );
}


/**
 * A system, with its architecture diagram behind a tap. The diagrams are drawn
 * at 640px and sideways-scroll on a phone, so rendering all of them inline made
 * this one section 4,500px tall — more than a third of the entire page.
 */
function SystemCard({ id, name, blurb, stack }:
  { id: string; name: string; blurb: string; stack: readonly string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-9 last:mb-0 pb-9 border-b border-white/8 last:border-0">
      <h3 className="text-[17px] font-bold">{name}</h3>
      <p className="text-[13.5px] leading-[1.7] text-white/68 mt-2.5 mb-4">{blurb}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">{stack.map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="mono w-full py-2.5 rounded-[4px] border border-white/16
                   text-[10px] tracking-[.16em] text-white/65"
      >
        {open ? "HIDE DIAGRAM ↑" : "ARCHITECTURE ↓"}
      </button>
      {open && (
        <div className="mt-4">
          <div className="-mx-6 px-6 overflow-x-auto">
            <div className="min-w-[640px]"><Architecture id={id} /></div>
          </div>
          <div className="mono text-[9px] tracking-[.14em] text-white/30 mt-2">SWIPE TO PAN →</div>
        </div>
      )}
    </div>
  );
}

export default function MobileView() {
  return (
    <div className="md:hidden relative min-h-screen overflow-x-hidden pb-24">
      <MobileChrome />
      <div className="fog-layer">
        <i className="fog-1" /><i className="fog-2" /><i className="fog-3" />
      </div>

      <div className="relative z-10">
        {/* hero */}
        <header className="px-6 pt-24 pb-14">
          <div className="mono text-[10px] tracking-[.26em] text-white/42 mb-5">
            [ {profile.role.toUpperCase()} · {profile.years} YEARS ]
          </div>
          <h1 className="ghost-type font-extrabold uppercase leading-[.88] tracking-[-.04em] text-[clamp(44px,13vw,72px)]">
            {profile.first}<br />
            <em className="serif ghost-type-dim font-normal not-italic" style={{ fontStyle: "italic" }}>
              {profile.last}
            </em>
          </h1>

          <div className="grid grid-cols-3 gap-3 mt-9">
            {headline.map(([v, k]) => (
              <div key={k}>
                <div className="text-[19px] font-bold leading-none">{v}</div>
                <div className="mono text-[8px] tracking-[.14em] text-white/38 mt-2 leading-tight">{k}</div>
              </div>
            ))}
          </div>

          <p className="text-[14.5px] leading-[1.75] text-white/72 mt-9">{profile.summary}</p>

          <div className="flex flex-wrap gap-2.5 mt-8">
            <a href="/resume.pdf" download
               className="mono text-[10.5px] tracking-[.14em] bg-white text-black rounded-[3px] px-4 py-2.5">
              RESUME ↓
            </a>
            <a href={`mailto:${profile.email}`}
               className="mono text-[10.5px] tracking-[.14em] border border-white/22 rounded-[3px] px-4 py-2.5">
              EMAIL ↗
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer"
               className="mono text-[10.5px] tracking-[.14em] border border-white/22 rounded-[3px] px-4 py-2.5">
              GITHUB ↗
            </a>
          </div>

          <div className="mono text-[10px] tracking-[.16em] text-white/36 mt-8 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
            {profile.available} · {profile.location.toUpperCase()}
          </div>
        </header>

        {/* experience */}
        <Section n="01" title="EXPERIENCE">
          {experience.map((x) => (
            <div key={x.company} className="mb-11 last:mb-0">
              <h3 className="text-[19px] font-bold leading-tight">{x.title}</h3>
              <div className="serif text-[16px] text-white/72 mt-1">{x.company}</div>
              <div className="mono text-[9.5px] tracking-[.14em] text-white/38 mt-1.5">
                {x.when} · {x.where}
              </div>
              <div className="grid grid-cols-2 gap-2.5 my-5">
                {x.metrics.map(([v, k]) => (
                  <div key={k} className="border border-white/10 rounded-[4px] px-3 py-2.5">
                    <div className="text-[15px] font-bold leading-none">{v}</div>
                    <div className="mono text-[8px] tracking-[.12em] text-white/40 mt-1.5">{k.toUpperCase()}</div>
                  </div>
                ))}
              </div>
              <ul className="space-y-2.5">
                {x.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[13.5px] leading-[1.7] text-white/70">
                    <span className="text-white/26 mt-[3px]">—</span>{b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-5">{x.stack.map((t) => <Tag key={t}>{t}</Tag>)}</div>
            </div>
          ))}
        </Section>

        {/* systems — the differentiator, diagrams scroll horizontally on phone */}
        <Section n="02" title="SYSTEMS">
          {[...workSystems, ...projects.filter((p) => p.diagram)].map((e) => (
            <SystemCard key={e.id} id={e.id} name={e.name} blurb={e.blurb} stack={e.stack} />
          ))}
        </Section>

        {/* projects */}
        <Section n="03" title="PROJECTS">
          <ProjectList />
        </Section>

        {/* stack */}
        <Section n="04" title="STACK">
          {Object.entries(skills).map(([k, v]) => (
            <div key={k} className="mb-5">
              <div className="mono text-[9.5px] tracking-[.18em] text-white/40 mb-2.5">{k.toUpperCase()}</div>
              <div className="flex flex-wrap gap-1.5">{v.map((t) => <Tag key={t}>{t}</Tag>)}</div>
            </div>
          ))}
        </Section>

        {/* education */}
        <Section n="05" title="EDUCATION">
          {education.map((e) => (
            <div key={e.school} className="mb-6">
              <h3 className="text-[16px] font-bold leading-tight">{e.school}</h3>
              <div className="serif text-[15px] text-white/70 mt-1">{e.degree}</div>
              <div className="mono text-[9.5px] tracking-[.12em] text-white/42 mt-1.5">
                {e.detail} · {e.where} · {e.when}
              </div>
            </div>
          ))}
          <div className="mono text-[9.5px] tracking-[.18em] text-white/40 mt-8 mb-3">CERTIFICATIONS</div>
          {certifications.map((c) => (
            <div key={c} className="flex items-center gap-2.5 text-[13px] text-white/72 mb-2">
              <span className="w-1 h-1 rounded-full bg-white/50" />{c}
            </div>
          ))}
        </Section>

        {/* contact */}
        <Section n="06" title="CONTACT">
          {[["EMAIL", profile.email, `mailto:${profile.email}`],
            ["PHONE", profile.phone, `tel:${profile.phone.replace(/\D/g, "")}`],
            ["GITHUB", "K-sau07", profile.github],
            ["LINKEDIN", "saurabh-kashyap-b5a4ab22a", profile.linkedin]].map(([k, v, href]) => (
            <a key={k} href={href} target="_blank" rel="noreferrer"
               className="flex items-baseline gap-4 py-3 border-b border-white/8">
              <span className="mono text-[9.5px] tracking-[.18em] text-white/38 w-[68px] shrink-0">{k}</span>
              <span className="text-[13.5px] text-white/80 break-all">{v}</span>
              <span className="mono ml-auto text-[10px] text-white/28">↗</span>
            </a>
          ))}
          <div className="mono text-[9px] tracking-[.2em] text-white/22 mt-12 text-center">
            GHOST OS · BEST VIEWED ON DESKTOP
          </div>
        </Section>
      </div>

      <div className="grain" />
    </div>
  );
}
