import { sensei } from "@/lib/content";

const ext = { target: "_blank", rel: "noreferrer" } as const;

const ICON: Record<string, React.ReactNode> = {
  ask: <><path d="M3 4.5h10v6H8l-3 2.5v-2.5H3z" /></>,
  trace: <><circle cx="3.5" cy="3.5" r="1.5" /><circle cx="12.5" cy="12.5" r="1.5" /><path d="M5 3.5h4.5a2 2 0 0 1 0 4h-3a2 2 0 0 0 0 4H11" /></>,
  diagrams: <><rect x="2" y="2.5" width="4.5" height="3.5" rx="1" /><rect x="9.5" y="10" width="4.5" height="3.5" rx="1" /><path d="M4.2 6v3.5a1.5 1.5 0 0 0 1.5 1.5h3.8" /></>,
  impact: <><circle cx="8" cy="8" r="1.8" /><circle cx="8" cy="8" r="4.2" /><circle cx="8" cy="8" r="6.5" opacity=".5" /></>,
  branches: <><circle cx="4" cy="3.5" r="1.5" /><circle cx="4" cy="12.5" r="1.5" /><circle cx="12" cy="6" r="1.5" /><path d="M4 5v6M12 7.5c0 2.5-4 2-7.2 3.8" /></>,
  fix: <><path d="M10.5 2.5a3 3 0 0 0-3.6 3.9L2.5 10.8l2.7 2.7 4.4-4.4a3 3 0 0 0 3.9-3.6l-1.9 1.9-1.8-.4-.4-1.8z" /></>,
  mcp: <><path d="M5.5 4.5 2 8l3.5 3.5M10.5 4.5 14 8l-3.5 3.5M9 3l-2 10" /></>,
};
const TINT: Record<string, string> = {
  ask: "var(--l-state)", trace: "var(--l-ui)", diagrams: "var(--l-client)", impact: "var(--l-handler)",
  branches: "var(--l-service)", fix: "var(--l-db)", mcp: "var(--muted)",
};

function Shot({ src, alt, w, h, caption }: { src: string; alt: string; w: number; h: number; caption: string }) {
  return (
    <figure>
      <a href={sensei.href} {...ext}
         className="group block overflow-hidden rounded-[12px] border border-line bg-panel transition-colors hover:border-muted/60">
        <div className="flex h-8 items-center gap-2 border-b border-line px-3">
          {[0, 1, 2].map((i) => <span key={i} className="h-[9px] w-[9px] rounded-full border border-line" />)}
          <span className="mx-auto font-mono text-[11px] text-muted">reposensei.com</span>
          <span className="font-mono text-[11px] text-muted opacity-0 transition-opacity group-hover:opacity-100">↗</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={w} height={h} loading="lazy" className="block h-auto w-full" />
      </a>
      <figcaption className="mt-2.5 font-mono text-[11.5px] leading-[1.6] text-muted">{caption}</figcaption>
    </figure>
  );
}

function Head({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-5">
      <h3 className="label shrink-0">{children}</h3>
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}

/** Everything below the animated card: the real product, what it does, how
    it's measured, and why it's safe to point at private code. */
export default function SenseiShowcase() {
  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <Head>The product</Head>
        <Shot src="/shots/repo-sensei.webp" alt="reposensei.com: Understand any codebase, with answers you can verify."
              w={1600} h={1111} caption="reposensei.com. Paste a GitHub URL and it reads the whole repository." />
        <Shot src="/shots/repo-sensei-trace.webp" alt="repo-sensei tracing sign-in from the Login page through the API and services to the user table"
              w={1600} h={746} caption="The engine's own trace of fastapi/full-stack-fastapi-template: 9 hops from the page to the data, each with its lines." />
        <ul className="flex flex-wrap gap-2">
          {sensei.promises.map((p) => (
            <li key={p} className="flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 text-[13px]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--l-service)" }} />{p}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-5">
        <Head>What it does</Head>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-3 @[640px]:grid-cols-2">
          {sensei.features.map((f) => (
            <div key={f.id} className={`rounded-[12px] border border-line bg-panel/60 p-4 ${f.id === "fix" ? "@[640px]:col-span-2" : ""}`}>
              <div className="flex items-center gap-2.5">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-[6px]" style={{ background: TINT[f.id] }}>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.5"
                       strokeLinecap="round" strokeLinejoin="round" aria-hidden>{ICON[f.id]}</svg>
                </span>
                <h4 className="text-[15px] font-semibold">{f.name}</h4>
              </div>
              <p className="mt-2 text-[14px] leading-[1.6] text-muted">{f.line}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <Head>How it&apos;s measured</Head>
        <p className="max-w-[64ch] text-[15px] leading-[1.7] text-muted">{sensei.bench}</p>
        <div className="rounded-[12px] border border-line bg-panel/60 p-5">
          <div className="flex items-baseline justify-between gap-4">
            <span className="text-[14px] font-semibold">CrossLayerBench, hop recall</span>
            <a href="https://reposensei.com/benchmarks" {...ext} className="link-u font-mono text-[11.5px] text-accent">full results ↗</a>
          </div>
          <ul className="mt-4 space-y-2.5">
            {sensei.results.map((r) => (
              <li key={r.repo} className="grid grid-cols-[minmax(0,130px)_1fr_40px] items-center gap-3 font-mono text-[12px] @[560px]:grid-cols-[180px_1fr_40px]">
                <span className="truncate">{r.repo}{r.tuned && <span className="text-accent">*</span>}</span>
                <span className="h-[6px] overflow-hidden rounded-full bg-line/70">
                  <span className="block h-full rounded-full" style={{ width: `${r.recall * 100}%`, background: r.tuned ? "var(--accent)" : "var(--l-ui)" }} />
                </span>
                <span className="text-right tabular-nums">{r.recall.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12.5px] leading-[1.6] text-muted">
            * tuned on. 101 hand-labelled flows over five open-source full-stack repositories; the tracer makes no model calls.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <Head>Safe to point at private code</Head>
        <ul className="space-y-2.5">
          {sensei.safety.map((s) => (
            <li key={s} className="flex gap-3 text-[14.5px] leading-[1.6]">
              <span aria-hidden className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent" />{s}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-5">
        <Head>Under the hood</Head>
        <pre className="overflow-x-auto rounded-[12px] border border-line bg-panel/60 p-4 font-mono text-[11.5px] leading-[1.7] text-muted">
{`GitHub ─webhooks─▶ API (FastAPI) ─▶ Postgres: pgvector, BM25, row-level security
                     │                      ▲
  web (Next.js) ─────┘   Redis queues ─▶ workers (Celery): parse, embed, graph, index,
                                         Ask and Fix agents ─▶ Docker + gVisor sandbox`}
        </pre>
        <ul className="flex flex-wrap gap-1.5">
          {sensei.stack.map((t) => (
            <li key={t} className="rounded-md border border-line bg-bg px-2 py-0.5 font-mono text-[11.5px]">{t}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
