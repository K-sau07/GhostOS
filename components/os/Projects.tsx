"use client";
import { running, earlier, napNote, profile } from "@/lib/content";
import { browse, launch } from "@/lib/actions";
import MotifArt from "./Motifs";

const ext = { target: "_blank", rel: "noreferrer" } as const;

function Section({ title, id }: { title: string; id: string }) {
  return (
    <div className="flex items-center gap-6">
      <h2 id={id} className="label shrink-0 !text-[12px] !tracking-[3px]">{title}</h2>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}

const footLinks = [
  { label: "reposensei.com", href: profile.now.href },
  { label: "LinkedIn", href: profile.linkedin },
  { label: profile.email, href: `mailto:${profile.email}` },
  { label: "résumé (pdf)", href: profile.resume },
];

const Bar = () => <span aria-hidden className="hidden text-line @[900px]:inline">|</span>;

/** Also running, then before that, then the footer line. */
export default function Projects() {
  return (
    <div className="@container px-5 py-8 @[640px]:px-9">
      <section aria-labelledby="also-running">
        <Section title="Also running" id="also-running" />
        <button onClick={() => launch("live")}
                className="link-u mt-3 font-mono text-[12px] text-accent max-lg:hidden">
          see them all running in live.app ↗
        </button>
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 @[720px]:grid-cols-2">
          {running.map((p) => (
            <article key={p.id} id={`card-${p.id}`}
                     className="flex scroll-mt-6 flex-col rounded-[14px] border border-line px-5 pb-5 pt-6 @[480px]:px-7
                                transition-colors hover:border-muted/60">
              <div className="label flex items-center gap-2.5"><span className="dot" />{p.label}</div>
              <h3 className="mt-3 font-serif text-[30px] font-normal leading-tight">
                <a href={p.live} {...ext}>{p.name}</a>
              </h3>
              <p className="mt-2 max-w-[44ch] text-[15px] leading-[1.5] text-muted">{p.line}</p>
              <div className="mb-3 mt-4"><MotifArt id={p.id} /></div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-4
                              font-mono text-[12px] text-muted">
                <span>{p.stack}</span>
                <span className="ml-auto flex shrink-0 gap-4">
                  {p.id !== "ghostos" && (
                    <button onClick={() => browse(p.id)} className="link-u max-lg:hidden">preview</button>
                  )}
                  <a href={p.repo} {...ext} className="link-u" aria-label={`${p.name} source code`}>code ↗</a>
                  <a href={p.live} {...ext} className="link-u text-accent" aria-label={`${p.name} live demo`}>live ↗</a>
                </span>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-center text-[12.5px] italic text-muted">{napNote}</p>
      </section>

      <section aria-labelledby="before-that" className="mt-12">
        <Section title="Before that" id="before-that" />
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 @[720px]:grid-cols-2">
          {earlier.map((p) => (
            <a key={p.id} id={`card-${p.id}`} href={p.repo} {...ext}
               className="group block scroll-mt-6 rounded-[14px] border border-line px-5 py-5 transition-colors @[480px]:px-7
                          hover:border-muted/60">
              <div className="label">{p.label}</div>
              <h3 className="mt-2.5 font-serif text-[24px] font-normal leading-tight">{p.name}</h3>
              <p className="mt-1.5 text-[15px] leading-[1.5] text-muted">{p.line}</p>
              <div className="mt-4 flex justify-between gap-4 font-mono text-[12px] text-muted">
                <span className="truncate">{p.stack}</span>
                <span className="shrink-0 text-accent">code ↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="mt-14 flex flex-col gap-x-3 gap-y-1.5 border-t border-line pt-5 font-mono text-[11.5px]
                         leading-[1.8] text-muted @[900px]:flex-row @[900px]:flex-wrap">
        <span>{profile.stack}</span>
        <Bar />
        <span className="flex flex-wrap items-center gap-x-2">
          {footLinks.map((l, i) => (
            <span key={l.label} className="flex items-center gap-x-2">
              <a href={l.href} {...(l.href.startsWith("http") ? ext : {})} className="link-u py-1 text-fg">{l.label}</a>
              {i < footLinks.length - 1 && <span aria-hidden>·</span>}
            </span>
          ))}
        </span>
        <Bar />
        <span>{profile.open}</span>
      </footer>
    </div>
  );
}
