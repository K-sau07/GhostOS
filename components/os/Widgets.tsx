"use client";
import { useEffect, useMemo, useState } from "react";
import { useLive } from "@/lib/live-context";
import { leetcodeUrl, GITHUB_USER, type Contributions } from "@/lib/live-types";
import { QUOTES } from "@/lib/quotes";
import gitlog from "@/lib/generated/gitlog.json";

const ext = { target: "_blank", rel: "noreferrer" } as const;

/** Re-renders on an interval. Server and client clocks differ, so the text
    nodes that show it opt out of the hydration check. */
export function useNow(ms = 15_000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

export const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
export const fmtTime = (d: Date) =>
  d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export function useQuote() {
  return QUOTES[useLive().quote] ?? QUOTES[0];
}

function Card({ label, right, children, className = "" }: {
  label: string; right?: React.ReactNode; children: React.ReactNode; className?: string;
}) {
  return (
    <section className={`rounded-[14px] border border-line bg-bg p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="label flex items-center gap-2.5"><span className="dot" />{label}</h3>
        {right}
      </div>
      {children}
    </section>
  );
}

/* ── quote of the day ────────────────────────────────────── */

export function QuoteWidget({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const q = useQuote();
  const now = useNow();
  const text = size === "lg" ? "text-[21px] leading-[1.4] @[560px]:text-[26px] @[560px]:leading-[1.35]" : size === "md" ? "text-[19px] leading-[1.45]" : "text-[16px] leading-[1.5]";
  return (
    <Card
      label="Quote of the day"
      right={
        <span suppressHydrationWarning className="font-mono text-[11px] tabular-nums text-muted">
          {fmtTime(now)}
        </span>
      }
    >
      <div suppressHydrationWarning className="mt-1.5 font-mono text-[11px] text-muted">{fmtDate(now)}</div>
      <blockquote className={`mt-4 font-serif ${text}`}>
        <p>&ldquo;{q.text}&rdquo;</p>
        <footer className="mt-3 font-mono text-[11.5px] uppercase tracking-[1.6px] text-muted">
          {q.by}{q.where ? <span className="normal-case tracking-normal">, {q.where}</span> : null}
        </footer>
      </blockquote>
    </Card>
  );
}

/* ── GitHub contributions ────────────────────────────────── */

const LEVEL = [
  "color-mix(in srgb, var(--line) 70%, transparent)",
  "color-mix(in srgb, var(--accent) 32%, var(--panel))",
  "color-mix(in srgb, var(--accent) 55%, var(--panel))",
  "color-mix(in srgb, var(--accent) 78%, var(--panel))",
  "var(--accent)",
];

function weeksOf(c: Contributions, take: number) {
  const cols: (Contributions["days"][number] | null)[][] = [];
  let col: (Contributions["days"][number] | null)[] = [];
  const first = new Date(`${c.days[0].date}T00:00:00Z`).getUTCDay();
  for (let i = 0; i < first; i++) col.push(null);
  for (const d of c.days) {
    col.push(d);
    if (col.length === 7) { cols.push(col); col = []; }
  }
  if (col.length) cols.push(col);
  return cols.slice(-take);
}

export function Heatmap({ c, weeks = 53, cell = 10, gap = 3, months = true }: {
  c: Contributions; weeks?: number; cell?: number; gap?: number; months?: boolean;
}) {
  const cols = useMemo(() => weeksOf(c, weeks), [c, weeks]);
  const step = cell + gap;
  const top = months ? 16 : 0;
  const labels: { x: number; m: string }[] = [];
  if (months) {
    let last = "";
    cols.forEach((col, i) => {
      const d = col.find(Boolean);
      if (!d) return;
      const m = new Date(`${d.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
      if (m !== last && Number(d.date.slice(8)) <= 7) labels.push({ x: i * step, m });
      last = m;
    });
  }
  return (
    <svg viewBox={`0 0 ${cols.length * step - gap} ${top + 7 * step - gap}`} className="block h-auto w-full"
         role="img" aria-label={`${c.total} GitHub contributions in the last year`}>
      {labels.map((l) => (
        <text key={l.x} x={l.x} y={10} fontSize={9} fill="var(--muted)" style={{ fontFamily: "var(--font-mono)" }}>{l.m}</text>
      ))}
      {cols.map((col, i) =>
        col.map((d, j) => d && (
          <rect key={d.date} x={i * step} y={top + j * step} width={cell} height={cell} rx={cell / 4.5}
                style={{ fill: LEVEL[d.level] ?? LEVEL[0] }}>
            {months && <title>{`${d.count || "No"} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}</title>}
          </rect>
        )))}
    </svg>
  );
}

export function GitHubWidget({ compact }: { compact?: boolean }) {
  const { contributions: c } = useLive();
  const href = `https://github.com/${GITHUB_USER}`;
  return (
    <Card label="GitHub" right={<a href={href} {...ext} className="link-u font-mono text-[11px] text-accent">@{GITHUB_USER} ↗</a>}>
      {c ? (
        <>
          <p className="mt-3 text-[14px] text-muted">
            <span className="font-serif text-[28px] leading-none text-fg">{c.total.toLocaleString("en-US")}</span>
            {" "}contributions in the last year
          </p>
          <div className="mt-4">
            {compact ? (
              <Heatmap c={c} weeks={26} cell={9} gap={2.5} months={false} />
            ) : (
              <>
                {/* a phone gets the last six months, big enough to read */}
                <div className="@[560px]:hidden"><Heatmap c={c} weeks={26} cell={10} gap={3} /></div>
                <div className="hidden @[560px]:block"><Heatmap c={c} /></div>
              </>
            )}
          </div>
          {!compact && (
            <div className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10.5px] text-muted">
              less{LEVEL.map((f) => <span key={f} className="h-[9px] w-[9px] rounded-[2px]" style={{ background: f }} />)}more
            </div>
          )}
        </>
      ) : (
        <p className="mt-3 text-[14px] text-muted">
          The graph lives on <a href={href} {...ext} className="link-u text-fg">my GitHub profile</a>.
        </p>
      )}
    </Card>
  );
}

/* ── LeetCode ────────────────────────────────────────────── */

export function LeetCodeWidget() {
  const { leetcode: l } = useLive();
  return (
    <Card label="LeetCode" right={<a href={leetcodeUrl} {...ext} className="link-u font-mono text-[11px] text-accent">profile ↗</a>}>
      {l ? (
        <>
          <p className="mt-3 text-[14px] text-muted">
            <span className="font-serif text-[28px] leading-none text-fg">{l.solved}</span> problems solved
          </p>
          <ul className="mt-4 space-y-2.5">
            {([["easy", l.easy, "var(--l-service)"], ["medium", l.medium, "var(--l-handler)"], ["hard", l.hard, "var(--l-db)"]] as const)
              .map(([k, n, col]) => (
                <li key={k} className="grid grid-cols-[64px_1fr_34px] items-center gap-3 font-mono text-[11.5px]">
                  <span className="uppercase tracking-[1.6px]" style={{ color: col }}>{k}</span>
                  <span className="h-[5px] overflow-hidden rounded-full bg-line/70">
                    <span className="block h-full rounded-full" style={{ width: `${(n / Math.max(l.solved, 1)) * 100}%`, background: col }} />
                  </span>
                  <span className="text-right tabular-nums text-fg">{n}</span>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <p className="mt-3 text-[14px] text-muted">
          Solved problems are on <a href={leetcodeUrl} {...ext} className="link-u text-fg">my LeetCode profile</a>.
        </p>
      )}
    </Card>
  );
}

/* ── the activity window ─────────────────────────────────── */

export default function Activity() {
  return (
    <div className="@container space-y-4 px-5 py-7 @[640px]:px-8">
      <QuoteWidget size="lg" />
      <GitHubWidget />
      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 @[640px]:grid-cols-2">
        <LeetCodeWidget />
        <ThisSite />
      </div>
    </div>
  );
}

/* the last few commits to this site, read from git at build time */
function ThisSite() {
  const commits = (gitlog as { hash: string; date: string; subject: string }[]).slice(0, 5);
  return (
    <Card label="This site" right={<a href="https://github.com/K-sau07/GhostOS/commits/main" {...ext} className="link-u font-mono text-[11px] text-accent">history ↗</a>}>
      {commits.length ? (
        <ul className="mt-4 space-y-2.5">
          {commits.map((c) => (
            <li key={c.hash} className="grid grid-cols-[58px_1fr] gap-3 font-mono text-[11.5px]">
              <span className="text-accent">{c.hash}</span>
              <span className="truncate text-muted" title={c.subject}>{c.subject}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-[14px] text-muted">Built in the open on GitHub.</p>
      )}
    </Card>
  );
}
