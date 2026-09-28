"use client";
import { useState } from "react";
import {
  profile, education, experience, projects, skills,
  certifications, workSystems, type WorkSystem,
} from "@/lib/content";
import Architecture from "./Architecture";
import {
  Toolbar, Sidebar, SidebarGroup, SidebarItem, StatusBar, SearchField,
} from "./MacChrome";
import { IconDoc, IconSystems, IconApp } from "./Icons";

/* ── shared chrome ─────────────────────────────────────── */
const Pad = ({ children }: { children: React.ReactNode }) => (
  <div className="p-8">{children}</div>
);
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="mono text-[10px] tracking-[.28em] text-white/40 mb-4">{children}</div>
);
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="mono text-[10px] tracking-[.1em] text-white/70 border border-white/14
                   bg-white/[.04] rounded-[3px] px-2.5 py-1">{children}</span>
);

/** a macOS source-list app: toolbar, sidebar, content pane, status bar */
function Sectioned({
  sections, statusNote,
}: {
  sections: { n: string; label: string; body: React.ReactNode }[];
  statusNote?: string;
}) {
  const [active, setActive] = useState(0);
  const [hist, setHist] = useState<number[]>([0]);
  const [ptr, setPtr] = useState(0);

  const go = (i: number) => {
    setActive(i);
    const next = [...hist.slice(0, ptr + 1), i];
    setHist(next); setPtr(next.length - 1);
  };
  const back = ptr > 0 ? () => { setPtr(ptr - 1); setActive(hist[ptr - 1]); } : undefined;
  const fwd  = ptr < hist.length - 1 ? () => { setPtr(ptr + 1); setActive(hist[ptr + 1]); } : undefined;

  return (
    <div className="h-full flex flex-col">
      <Toolbar back={back} forward={fwd} title={sections[active].label} />
      <div className="flex-1 flex min-h-0">
        <Sidebar width={176}>
          <SidebarGroup label="SECTIONS">
            {sections.map((sec, i) => (
              <SidebarItem
                key={sec.n} label={sec.label} active={i === active}
                onClick={() => go(i)} badge={sec.n}
                icon={<IconDoc size={14} />}
              />
            ))}
          </SidebarGroup>
        </Sidebar>
        <div className="flex-1 overflow-auto">{sections[active].body}</div>
      </div>
      <StatusBar>
        {statusNote ?? `${sections.length} sections · ${sections[active].label}`}
      </StatusBar>
    </div>
  );
}

/* ── about.mdx ─────────────────────────────────────────── */
export function AboutApp() {
  return (
    <Sectioned
      sections={[
        {
          n: "01", label: "Overview",
          body: (
            <Pad>
              <Eyebrow>[ 01 // OVERVIEW ]</Eyebrow>
              <h2 className="ghost-type font-extrabold uppercase leading-[.9] tracking-[-.035em] text-[50px] mb-5">
                {profile.first}<br />
                <em className="serif ghost-type-dim not-italic font-normal" style={{ fontStyle: "italic" }}>
                  {profile.last}
                </em>
              </h2>
              <div className="mono text-[11px] tracking-[.16em] text-white/55 leading-[2] mb-6">
                {profile.role.toUpperCase()} · {profile.years} YEARS<br />
                {profile.location.toUpperCase()}<br />
                JAVA / SPRING BOOT / AWS
              </div>
              <div className="inline-flex items-center gap-2.5 border border-white/18 rounded-[3px] px-3 py-1.5 mb-7">
                <span className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                <span className="mono text-[10px] tracking-[.16em]">{profile.available}</span>
              </div>
              <p className="text-[15px] leading-[1.78] text-white/74 max-w-[54ch]">{profile.summary}</p>
            </Pad>
          ),
        },
        {
          n: "02", label: "Experience",
          body: (
            <Pad>
              <Eyebrow>[ 02 // EXPERIENCE ]</Eyebrow>
              {experience.map((x) => (
                <div key={x.company} className="mb-10 pb-10 border-b border-white/8 last:border-0 last:mb-0">
                  <div className="flex justify-between items-baseline gap-6 mb-1.5">
                    <h3 className="text-[19px] font-bold">{x.title}</h3>
                    <span className="mono text-[10px] tracking-[.12em] text-white/42 whitespace-nowrap">{x.when}</span>
                  </div>
                  <div className="serif text-[17px] text-white/70 mb-1">{x.company}</div>
                  <div className="mono text-[10px] tracking-[.14em] text-white/38 mb-5">{x.where}</div>

                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {x.metrics.map(([v, k]) => (
                      <div key={k} className="border border-white/10 rounded-[4px] px-3 py-2.5">
                        <div className="text-[17px] font-bold leading-none mb-1.5">{v}</div>
                        <div className="mono text-[8.5px] tracking-[.13em] text-white/40 leading-tight">
                          {k.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {x.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[13.5px] leading-[1.72] text-white/70">
                        <span className="text-white/26 mt-[3px]">—</span>{b}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">{x.stack.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                </div>
              ))}
            </Pad>
          ),
        },
        {
          n: "03", label: "Stack",
          body: (
            <Pad>
              <Eyebrow>[ 03 // STACK ]</Eyebrow>
              {Object.entries(skills).map(([k, v]) => (
                <div key={k} className="mb-5">
                  <div className="mono text-[10px] tracking-[.2em] text-white/40 mb-2.5">{k.toUpperCase()}</div>
                  <div className="flex flex-wrap gap-1.5">{v.map((t) => <Tag key={t}>{t}</Tag>)}</div>
                </div>
              ))}
            </Pad>
          ),
        },
        {
          n: "04", label: "Education",
          body: (
            <Pad>
              <Eyebrow>[ 04 // EDUCATION ]</Eyebrow>
              {education.map((e) => (
                <div key={e.school} className="mb-7 pb-7 border-b border-white/8">
                  <div className="flex justify-between items-baseline gap-6 mb-1.5">
                    <h3 className="text-[18px] font-bold">{e.school}</h3>
                    <span className="mono text-[10px] tracking-[.12em] text-white/42 whitespace-nowrap">{e.when}</span>
                  </div>
                  <div className="serif text-[16px] text-white/72 mb-2">{e.degree}</div>
                  <div className="mono text-[10.5px] tracking-[.1em] text-white/44">
                    {e.detail} &nbsp;·&nbsp; {e.where}
                  </div>
                </div>
              ))}
              <div className="mono text-[10px] tracking-[.2em] text-white/40 mb-3 mt-8">CERTIFICATIONS</div>
              <div className="space-y-2">
                {certifications.map((c) => (
                  <div key={c} className="flex items-center gap-3 text-[13.5px] text-white/74">
                    <span className="w-1 h-1 rounded-full bg-white/50" />{c}
                  </div>
                ))}
              </div>
            </Pad>
          ),
        },
      ]}
    />
  );
}

/* ── a single project window ───────────────────────────── */
export function ProjectApp({ id }: { id: string }) {
  const p = projects.find((x) => x.id === id);
  if (!p) return <Pad><div className="mono text-white/40">file not found</div></Pad>;
  return (
    <Pad>
      <Eyebrow>[ {p.kind.toUpperCase()} ]</Eyebrow>
      <h2 className="text-[32px] font-extrabold uppercase tracking-[-.02em] leading-[1.04] mb-2">
        {p.name}
      </h2>
      <div className="serif text-[18px] text-white/58 mb-6">{p.tagline}</div>
      <p className="text-[15px] leading-[1.75] text-white/74 max-w-[62ch] mb-5">{p.blurb}</p>
      <ul className="space-y-2.5 mb-7">
        {p.bullets.map((b) => (
          <li key={b} className="flex gap-3 text-[14px] leading-[1.7] text-white/66 max-w-[62ch]">
            <span className="text-white/26 mt-[3px]">—</span>{b}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5 mb-8">{p.stack.map((t) => <Tag key={t}>{t}</Tag>)}</div>

      {p.diagram && (
        <div className="border border-white/10 rounded-[6px] p-5 mb-7">
          <div className="mono text-[9.5px] tracking-[.2em] text-white/34 mb-4">ARCHITECTURE</div>
          <Architecture id={p.id} />
        </div>
      )}

      {p.repo && (
        <a href={p.repo} target="_blank" rel="noreferrer"
           className="mono inline-flex items-center gap-2 text-[11px] tracking-[.14em]
                      border border-white/20 rounded-[3px] px-4 py-2.5
                      hover:bg-white hover:text-black transition-colors duration-300">
          VIEW SOURCE ↗
        </a>
      )}
    </Pad>
  );
}

/* ── systems.app ───────────────────────────────────────── */
export function SystemsApp() {
  const prod = workSystems.map((w: WorkSystem) => ({
    id: w.id, file: w.file, name: w.name, note: w.at,
    blurb: w.blurb, stack: w.stack,
  }));
  const proj = projects.filter((p) => p.diagram).map((p) => ({
    id: p.id, file: p.file, name: p.name, note: p.tagline,
    blurb: p.blurb, stack: p.stack,
  }));
  const all = [...prod, ...proj];
  const [sel, setSel] = useState(all[0].id);
  const [q, setQ] = useState("");
  const e = all.find((x) => x.id === sel)!;

  const match = (x: { file: string; name: string }) =>
    !q.trim() || (x.file + x.name).toLowerCase().includes(q.trim().toLowerCase());

  return (
    <div className="h-full flex flex-col">
      <Toolbar title={e.name}>
        <SearchField value={q} onChange={setQ} placeholder="Search systems" />
      </Toolbar>

      <div className="flex-1 flex min-h-0">
        <Sidebar width={198}>
          <SidebarGroup label="PRODUCTION">
            {prod.filter(match).map((x) => (
              <SidebarItem key={x.id} label={x.file} active={x.id === sel}
                onClick={() => setSel(x.id)} icon={<IconSystems size={14} />} />
            ))}
          </SidebarGroup>
          <SidebarGroup label="PROJECTS">
            {proj.filter(match).map((x) => (
              <SidebarItem key={x.id} label={x.file} active={x.id === sel}
                onClick={() => setSel(x.id)} icon={<IconApp size={14} />} />
            ))}
          </SidebarGroup>
        </Sidebar>

        <div className="flex-1 overflow-auto p-7">
          <Eyebrow>[ {e.name.toUpperCase()} · {e.note.toUpperCase()} ]</Eyebrow>
          <p className="text-[14px] leading-[1.72] text-white/70 max-w-[64ch] mb-7">{e.blurb}</p>
          <Architecture id={e.id} />
          <div className="flex flex-wrap gap-1.5 mt-7">
            {e.stack.map((t: string) => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
      </div>

      <StatusBar>{all.length} systems · {prod.length} in production</StatusBar>
    </div>
  );
}

/* ── resume.pdf ────────────────────────────────────────── */
export function ResumeApp() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 px-5 h-[34px] border-b border-white/10 shrink-0">
        <span className="mono text-[9.5px] tracking-[.2em] text-white/38">PREVIEW</span>
        <a href="/resume.pdf" download
           className="mono ml-auto text-[9.5px] tracking-[.14em] text-white/70 hover:text-white
                      border border-white/16 rounded-[3px] px-2.5 py-1 transition-colors">
          DOWNLOAD ↓
        </a>
      </div>
      <iframe src="/resume.pdf#view=FitH" className="flex-1 w-full bg-white/[.03]" title="Resume" />
    </div>
  );
}

/* ── contact.mail ──────────────────────────────────────── */
export function ContactApp() {
  return (
    <Pad>
      <Eyebrow>[ NEW MESSAGE ]</Eyebrow>
      <div className="space-y-0 border border-white/10 rounded-[5px] overflow-hidden mb-7">
        {[["To", profile.email], ["From", "you@somewhere.com"], ["Subject", "Let's build something"]].map(([k, v]) => (
          <div key={k} className="flex border-b border-white/8 last:border-0">
            <span className="mono text-[10px] tracking-[.16em] text-white/38 w-[86px] px-4 py-3">{k.toUpperCase()}</span>
            <span className="text-[13.5px] text-white/82 py-3">{v}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2.5">
        {[["EMAIL", profile.email, `mailto:${profile.email}`],
          ["GITHUB", "K-sau07", profile.github],
          ["LINKEDIN", "saurabh-kashyap", profile.linkedin],
          ["PHONE", profile.phone, `tel:${profile.phone.replace(/\D/g, "")}`]].map(([k, v, href]) => (
          <a key={k} href={href} target="_blank" rel="noreferrer"
             className="flex items-baseline gap-5 py-2.5 border-b border-white/8 group">
            <span className="mono text-[10px] tracking-[.2em] text-white/38 w-[78px]">{k}</span>
            <span className="text-[14px] text-white/78 group-hover:text-white transition-colors">{v}</span>
            <span className="mono ml-auto text-[10px] text-white/26 group-hover:text-white/70 transition-colors">↗</span>
          </a>
        ))}
      </div>
    </Pad>
  );
}

/* ── trash ─────────────────────────────────────────────── */
export function TrashApp() {
  return (
    <Pad>
      <Eyebrow>[ TRASH ]</Eyebrow>
      <div className="space-y-2.5">
        {["jquery-spaghetti.js", "untested-hotfix.java", "TODO-refactor-later.txt", "final_FINAL_v3.psd"]
          .map((f) => (
            <div key={f} className="mono text-[12px] text-white/34 line-through py-2 border-b border-white/6">
              {f}
            </div>
          ))}
      </div>
      <div className="mono text-[10px] tracking-[.16em] text-white/26 mt-7">
        4 ITEMS · EMPTIED REGULARLY
      </div>
    </Pad>
  );
}
