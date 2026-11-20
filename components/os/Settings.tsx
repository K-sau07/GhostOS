"use client";
import { useState } from "react";
import { useOS, SECTIONS, type SectionId } from "@/lib/store";
import { launch } from "@/lib/actions";
import { profile, sensei, experience, skills, education, certifications } from "@/lib/content";
import Sensei from "./Sensei";
import Projects from "./Projects";
import Activity from "./Widgets";

const ext = { target: "_blank", rel: "noreferrer" } as const;

/* ── sidebar icons: small coloured tiles, as in System Settings ─────────── */

const GLYPH: Record<Exclude<SectionId, "overview">, React.ReactNode> = {
  sensei: <><circle cx="7" cy="7" r="3.6" /><path d="M9.7 9.7 13 13" /></>,
  experience: <><rect x="2.5" y="5" width="11" height="8" rx="1.5" /><path d="M6 5V3.6h4V5M2.5 8.5h11" /></>,
  projects: <><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" /><rect x="9" y="2.5" width="4.5" height="4.5" rx="1" /><rect x="2.5" y="9" width="4.5" height="4.5" rx="1" /><rect x="9" y="9" width="4.5" height="4.5" rx="1" /></>,
  skills: <><path d="M8 2.5 13.5 5.5 8 8.5 2.5 5.5Z" /><path d="M2.5 8.5 8 11.5l5.5-3M2.5 11 8 14l5.5-3" /></>,
  education: <><path d="M8 3 14 6 8 9 2 6Z" /><path d="M4.5 7.3v3.2c1 1 2.2 1.5 3.5 1.5s2.5-.5 3.5-1.5V7.3" /></>,
  activity: <path d="M1.5 8.5h3l1.8-4 3 8 1.8-4h3.4" />,
  contact: <><rect x="2" y="3.5" width="12" height="9" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></>,
};
const TINT: Record<Exclude<SectionId, "overview">, string> = {
  sensei: "var(--l-state)", experience: "var(--l-ui)", projects: "var(--l-handler)",
  skills: "var(--l-service)", education: "var(--l-client)", activity: "var(--l-db)", contact: "var(--muted)",
};

function Tile({ id, size = 22 }: { id: Exclude<SectionId, "overview">; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-[6px]" style={{ width: size, height: size, background: TINT[id] }}>
      <svg width={size * 0.64} height={size * 0.64} viewBox="0 0 16 16" fill="none" stroke="#fff"
           strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {GLYPH[id]}
      </svg>
    </span>
  );
}

const Avatar = ({ size }: { size: number }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/avatar.webp" alt="Saurabh Kashyap" width={size} height={size}
       className="shrink-0 rounded-full border border-line object-cover" style={{ width: size, height: size }} />
);

/* ── building blocks for the panes ───────────────────────────────────────── */

function Pane({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="px-6 pb-10 pt-8 @[640px]:px-10">
      <h2 className="font-serif text-[30px] font-normal leading-tight">{title}</h2>
      {sub && <p className="mt-1.5 text-[15px] text-muted">{sub}</p>}
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  );
}

/** a grouped list, like the rounded panels in System Settings */
function Group({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div>
      {label && <div className="label mb-2 px-1">{label}</div>}
      <div className="divide-y divide-line overflow-hidden rounded-[12px] border border-line bg-panel/60">{children}</div>
    </div>
  );
}

function Row({ k, children, onClick, href }: {
  k: string; children: React.ReactNode; onClick?: () => void; href?: string;
}) {
  const inner = (
    <>
      <span className="w-[92px] shrink-0 text-[13.5px] text-muted @[560px]:w-[120px]">{k}</span>
      <span className="min-w-0 flex-1 text-[14px]">{children}</span>
      {(onClick || href) && <span aria-hidden className="font-mono text-[12px] text-muted">{href ? "↗" : "›"}</span>}
    </>
  );
  const cls = "flex w-full items-center gap-4 px-4 py-3 text-left";
  if (href) return <a href={href} {...(href.startsWith("http") ? ext : {})} className={`${cls} transition-colors hover:bg-panel`}>{inner}</a>;
  if (onClick) return <button onClick={onClick} className={`${cls} transition-colors hover:bg-panel`}>{inner}</button>;
  return <div className={cls}>{inner}</div>;
}

/* ── the panes ───────────────────────────────────────────────────────────── */

function Overview({ go }: { go: (s: SectionId) => void }) {
  return (
    <div className="px-6 pb-10 pt-10 @[640px]:px-10">
      <div className="flex flex-col items-center text-center">
        <Avatar size={104} />
        <div className="label mt-6">{profile.city}<span className="dot mx-2.5" />{profile.role}</div>
        <h1 className="mt-3 font-serif text-[clamp(38px,9vw,52px)] font-normal leading-[1.05]">{profile.name}</h1>
        <p className="mt-3 max-w-[40ch] text-[17px] leading-[1.5] text-muted">{profile.line}</p>
      </div>
      <div className="mx-auto mt-9 max-w-[620px] space-y-5">
        <Group>
          <Row k="Experience" onClick={() => go("experience")}>{profile.facts[0]}</Row>
          <Row k="Education" onClick={() => go("education")}>{profile.facts[1]}</Row>
          <Row k="Now" onClick={() => go("sensei")}>repo-sensei, <span className="text-muted">a search engine for your whole codebase</span></Row>
          <Row k="Open to">{profile.open.replace(/^Open to s/, "S")}</Row>
        </Group>
        <Group>
          <Row k="Résumé" href={profile.resume}>PDF</Row>
          <Row k="LinkedIn" href={profile.linkedin}>saurabh-kashyap</Row>
          <Row k="GitHub" href={profile.github}>K-sau07</Row>
          <Row k="Email" href={`mailto:${profile.email}`}>{profile.email}</Row>
        </Group>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <Pane title="Experience" sub="3+ years building software, mostly the backend.">
      {experience.map((r) => (
        <Group key={r.title + r.when}>
          <div className="px-5 pb-5 pt-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[16px] font-semibold">{r.title}</h3>
              <span className="font-mono text-[11.5px] text-muted">{r.when}</span>
            </div>
            <div className="mt-0.5 text-[14px] text-muted">{r.org}, {r.where}</div>
            <ul className="mt-4 space-y-2">
              {r.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[14px] leading-[1.6]">
                  <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />{b}
                </li>
              ))}
            </ul>
            <div className="mt-4 font-mono text-[11.5px] text-muted">{r.stack}</div>
          </div>
        </Group>
      ))}
    </Pane>
  );
}

function Skills() {
  return (
    <Pane title="Skills" sub="What I reach for, and what I've shipped with.">
      <Group>
        {skills.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-2 px-4 py-3.5 @[560px]:flex-row @[560px]:gap-4">
            <span className="w-[120px] shrink-0 pt-1 text-[13.5px] text-muted">{k}</span>
            <span className="flex flex-wrap gap-1.5">
              {v.map((t) => (
                <span key={t} className="rounded-md border border-line bg-bg px-2 py-0.5 font-mono text-[11.5px]">{t}</span>
              ))}
            </span>
          </div>
        ))}
      </Group>
    </Pane>
  );
}

function Education() {
  return (
    <Pane title="Education">
      <Group>
        {education.map((e) => (
          <div key={e.school} className="px-5 py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[15.5px] font-semibold">{e.school}</h3>
              <span className="font-mono text-[11.5px] text-muted">{e.when}</span>
            </div>
            <div className="mt-0.5 text-[14px] text-muted">{e.degree} · {e.where} · {e.note}</div>
          </div>
        ))}
      </Group>
      <Group label="Certifications">
        {certifications.map((c) => <Row key={c} k="Certified">{c}</Row>)}
      </Group>
    </Pane>
  );
}

function Contact() {
  return (
    <Pane title="Contact" sub={profile.open}>
      <Group>
        <Row k="Email" href={`mailto:${profile.email}`}>{profile.email}</Row>
        <Row k="LinkedIn" href={profile.linkedin}>saurabh-kashyap-b5a4ab22a</Row>
        <Row k="GitHub" href={profile.github}>K-sau07</Row>
        <Row k="repo-sensei" href={sensei.href}>reposensei.com</Row>
        <Row k="Résumé" href={profile.resume}>PDF</Row>
      </Group>
    </Pane>
  );
}

/* ── the window ──────────────────────────────────────────────────────────── */

const WORDS: Record<SectionId, string> = {
  overview: "about profile saurabh boston",
  sensei: "repo sensei search codebase trace benchmark",
  experience: "work job history roles spring",
  projects: "openlens tassist watchdog ghost ecoplate aura live demos",
  skills: "stack java python aws tech",
  education: "northeastern degree certifications aws",
  activity: "github leetcode quote contributions",
  contact: "email linkedin resume hire",
};

/**
 * About, shaped like macOS System Settings: a sidebar of sections and a pane.
 * Every pane is in the HTML; the desktop shows the selected one, and below
 * 1024px they all stack into one page.
 */
export default function Settings() {
  const section = useOS((s) => s.section);
  const setSection = useOS((s) => s.setSection);
  const [q, setQ] = useState("");
  const go = (id: SectionId) => setSection(id);
  const shown = SECTIONS.filter((s) => !q.trim() || `${s.label} ${WORDS[s.id]}`.toLowerCase().includes(q.trim().toLowerCase()));

  const pane = (id: SectionId, node: React.ReactNode) => (
    <section id={`sec-${id}`} aria-label={SECTIONS.find((s) => s.id === id)!.label}
             className={`scroll-mt-14 max-lg:border-t max-lg:border-line max-lg:first:border-t-0 ${section === id ? "" : "lg:hidden"}`}>
      {node}
    </section>
  );

  return (
    <div className="h-full lg:flex">
      <aside className="flex w-[236px] shrink-0 flex-col gap-1 overflow-auto border-r border-line bg-panel p-3 max-lg:hidden">
        <input
          value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" aria-label="Search sections"
          className="mb-2 h-8 rounded-[8px] border border-line bg-bg px-3 text-[13px] outline-none placeholder:text-muted/70
                     focus:border-accent/60"
        />
        <button onClick={() => go("overview")}
                className={`mb-2 flex items-center gap-3 rounded-[10px] p-2 text-left transition-colors
                            ${section === "overview" ? "bg-accent/15" : "hover:bg-bg"}`}>
          <Avatar size={40} />
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-semibold">{profile.name}</span>
            <span className="block truncate text-[12px] text-muted">{profile.role}, {profile.city}</span>
          </span>
        </button>
        {shown.filter((s) => s.id !== "overview").map((s) => (
          <button key={s.id} onClick={() => go(s.id)}
                  className={`flex items-center gap-2.5 rounded-[8px] px-2 py-[6px] text-left text-[13.5px] transition-colors
                              ${section === s.id ? "bg-accent/15 text-fg" : "hover:bg-bg"}`}>
            <Tile id={s.id as Exclude<SectionId, "overview">} />{s.label}
          </button>
        ))}
        <div className="mt-auto px-2 pt-6">
          <button onClick={() => launch("live")} className="link-u font-mono text-[11.5px] text-accent">open live.app ↗</button>
        </div>
      </aside>

      <div className="@container min-w-0 flex-1 overflow-auto lg:h-full">
        {pane("overview", <Overview go={go} />)}
        {pane("sensei", <Sensei />)}
        {pane("experience", <Experience />)}
        {pane("projects", <Projects />)}
        {pane("skills", <Skills />)}
        {pane("education", <Education />)}
        {pane("activity", <Activity />)}
        {pane("contact", <Contact />)}
      </div>
    </div>
  );
}
