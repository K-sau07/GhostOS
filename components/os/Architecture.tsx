"use client";
/* Architecture diagrams for Saurabh's real systems.
   Declared as layered node graphs, laid out automatically, rendered as
   thin-stroke SVG so they read as etchings in fog like the rest of the OS. */

interface Node { id: string; label: string; sub?: string; accent?: boolean }
interface Diagram {
  caption: string;
  layers: Node[][];
  /** explicit edges by node id; "a>b" */
  edges: string[];
  note?: string;
}

const W = 150, H = 54, GAP_X = 80, GAP_Y = 26, PAD = 20;

const DIAGRAMS: Record<string, Diagram> = {
  tassist: {
    caption: "Slides in → grounded answers out",
    layers: [
      [{ id: "ppt", label: "Course Slides", sub: "PPT decks" }],
      [{ id: "poi", label: "Apache POI", sub: "extraction" }],
      [{ id: "embed", label: "Spring AI", sub: "embeddings", accent: true }],
      [{ id: "pg", label: "pgvector", sub: "PostgreSQL" }],
      [{ id: "rag", label: "RAG Retrieval", sub: "top-k slides" }],
      [{ id: "claude", label: "Claude", sub: "grounded answer", accent: true }],
      [{ id: "ui", label: "React + TS", sub: "streamed · cited" }],
    ],
    edges: ["ppt>poi", "poi>embed", "embed>pg", "pg>rag", "rag>claude", "claude>ui"],
    note: "Answers stream back with slide-level citations across 100+ slides, so a student can jump straight to the source. Freed ~8 hours a week of manual doubt resolution.",
  },
  openlens: {
    caption: "Hexagonal · async ingestion · cached lookups",
    layers: [
      [{ id: "gh", label: "GitHub API", sub: "issues · merged PRs" }],
      [{ id: "kafka", label: "Kafka", sub: "async ingestion", accent: true }],
      [{ id: "core", label: "Domain Core", sub: "hexagonal", accent: true },
       { id: "redis", label: "Redis", sub: "repeat lookups" }],
      [{ id: "pg", label: "PostgreSQL", sub: "Flyway migrations" }],
      [{ id: "llm", label: "LLM Guide Gen", sub: "personalised" }],
      [{ id: "ui", label: "Contributor", sub: "< 10 min onboard" }],
    ],
    edges: ["gh>kafka", "kafka>core", "core>redis", "core>pg", "pg>llm", "redis>llm", "llm>ui"],
    note: "Java 21 + Spring Boot 3.2. Ports and adapters keep the GitHub ingestion, persistence and LLM generation swappable. Cuts contributor onboarding from 1+ hours to under 10 minutes.",
  },
  "cloud-infra": {
    caption: "Multi-AZ, fully declarative",
    layers: [
      [{ id: "gha", label: "GitHub Actions", sub: "CI/CD" },
       { id: "packer", label: "Packer", sub: "custom AMI" }],
      [{ id: "tf", label: "Terraform", sub: "plan · apply", accent: true }],
      [{ id: "vpc", label: "VPC", sub: "multi-AZ" }],
      [{ id: "alb", label: "ALB", sub: "public tier" }],
      [{ id: "asg", label: "EC2 / ASG", sub: "auto-scaled", accent: true },
       { id: "rds", label: "RDS", sub: "KMS encrypted" }],
      [{ id: "cw", label: "CloudWatch", sub: "StatsD · logs" }],
    ],
    edges: ["gha>tf", "packer>tf", "tf>vpc", "vpc>alb", "alb>asg", "asg>rds", "asg>cw", "rds>cw"],
    note: "IAM roles and KMS encryption throughout, sustaining 99.9% availability under load. Full IaC automation cut deployment cycles ~65%.",
  },
  gateway: {
    caption: "One entry point, 45+ endpoints behind it",
    layers: [
      [{ id: "user", label: "Enterprise User", sub: "dashboard · 3.2M/day" }],
      [{ id: "gw", label: "Spring Cloud Gateway", sub: "single entry point", accent: true }],
      [{ id: "auth", label: "Auth + Routing", sub: "rejected at the edge" }],
      [{ id: "wf", label: "Workflow Service", sub: "/api/workflows" },
       { id: "rep", label: "Reporting Service", sub: "/api/reports" },
       { id: "usr", label: "User Service", sub: "/api/users" }],
      [{ id: "redis", label: "Redis", sub: "cache-aside · TTL", accent: true }],
      [{ id: "sql", label: "MySQL", sub: "composite indexes" }],
    ],
    edges: ["user>gw", "gw>auth", "auth>wf", "auth>rep", "auth>usr",
            "wf>redis", "rep>redis", "usr>redis", "redis>sql"],
    note:
      "The gateway consolidates 45+ downstream endpoints so clients get one consistent entry " +
      "point, and unauthorised requests are rejected before they reach any service. Services check " +
      "Redis first; on a miss they query MySQL and write the result back. Cache hit ratio moved " +
      "62% → 89%, database load fell 44%, client-side latency fell 38%.",
  },
  batch: {
    caption: "1.2M records a night, nothing blocks on one bad row",
    layers: [
      [{ id: "src", label: "Source Systems", sub: "workflow data" }],
      [{ id: "s3", label: "AWS S3", sub: "nightly drop" }],
      [{ id: "batch", label: "Spring Batch", sub: "chunked reader", accent: true }],
      [{ id: "w1", label: "Worker 1", sub: "chunk" },
       { id: "w2", label: "Worker 2", sub: "chunk" },
       { id: "w3", label: "Worker N", sub: "chunk" }],
      [{ id: "tx", label: "Validate + Transform", sub: "business rules" }],
      [{ id: "skip", label: "Skip-Error", sub: "log · continue", accent: true }],
      [{ id: "sql", label: "MySQL", sub: "reporting-ready" }],
    ],
    edges: ["src>s3", "s3>batch", "batch>w1", "batch>w2", "batch>w3",
            "w1>tx", "w2>tx", "w3>tx", "tx>skip", "skip>sql"],
    note:
      "Instead of one huge sequential transaction, records are split into chunks and processed in " +
      "parallel. Skip-error handling means a single invalid record is logged and stepped over rather " +
      "than failing the whole run — batch completion time fell 61%.",
  },
  observability: {
    caption: "8 services, one pane of glass",
    layers: [
      [{ id: "svc", label: "8 Microservices", sub: "application logs" }],
      [{ id: "ls", label: "Logstash", sub: "ingest · parse" }],
      [{ id: "es", label: "Elasticsearch", sub: "indexed", accent: true }],
      [{ id: "kb", label: "Kibana", sub: "dashboards" }],
      [{ id: "alert", label: "Alerts", sub: "MTTD < 4 min", accent: true }],
    ],
    edges: ["svc>ls", "ls>es", "es>kb", "kb>alert"],
    note:
      "Before centralisation, debugging meant checking each service by hand. Centralised logs plus " +
      "dashboards and alerting took mean time to detect production anomalies from 14 minutes to " +
      "under 4 — covering API failures, exception patterns, slow requests and batch failures.",
  },
  orders: {
    caption: "5 order types, 6,000 a day, reconciled nightly",
    layers: [
      [{ id: "ui", label: "Client", sub: "1,000+ concurrent" }],
      [{ id: "api", label: "Order APIs", sub: "10+ REST", accent: true }],
      [{ id: "val", label: "Validation", sub: "SIP·SWP·STP·LS·RD" }],
      [{ id: "exch", label: "Exchange API", sub: "third-party" },
       { id: "cache", label: "Redis", sub: "650→180ms" }],
      [{ id: "batch", label: "Spring Batch", sub: "reconciliation", accent: true }],
      [{ id: "src", label: "S3 + OpenSearch", sub: "1M+ records/day" }],
    ],
    edges: ["ui>api", "api>val", "val>exch", "api>cache", "exch>batch", "cache>batch", "batch>src"],
    note: "Transaction-safe placement across high-volume trading flows in a regulated fintech environment. Redis caching and connection pooling took API latency from 650ms to 180ms.",
  },
};

function layout(d: Diagram) {
  const cols = d.layers.length;
  const maxRows = Math.max(...d.layers.map((l) => l.length));
  const width = PAD * 2 + cols * W + (cols - 1) * GAP_X;
  const hasFeedback = d.edges.some((e) => {
    const [a, b] = e.split('>');
    const ai = d.layers.findIndex((l) => l.some((n) => n.id === a));
    const bi = d.layers.findIndex((l) => l.some((n) => n.id === b));
    return bi < ai;
  });
  const height = PAD * 2 + maxRows * H + (maxRows - 1) * GAP_Y + (hasFeedback ? 34 : 0);
  const pos: Record<string, { x: number; y: number; n: Node }> = {};
  d.layers.forEach((layer, c) => {
    const colH = layer.length * H + (layer.length - 1) * GAP_Y;
    const y0 = (height - (hasFeedback ? 34 : 0) - colH) / 2;
    layer.forEach((n, r) => {
      pos[n.id] = { x: PAD + c * (W + GAP_X), y: y0 + r * (H + GAP_Y), n };
    });
  });
  return { width, height, pos };
}

export default function Architecture({ id }: { id: string }) {
  const d = DIAGRAMS[id];
  if (!d) {
    return (
      <div className="mono text-[10.5px] tracking-[.14em] text-white/30 p-7 text-center">
        NO DIAGRAM ON FILE
      </div>
    );
  }
  const { width, height, pos } = layout(d);

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto"
           style={{ maxHeight: 400 }} role="img" aria-label={`${d.caption} architecture diagram`}>
        <defs>
          <marker id={`ar-${id}`} viewBox="0 0 8 8" refX="7" refY="4"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 1l6 3-6 3z" fill="rgba(255,255,255,.5)" />
          </marker>
        </defs>

        {d.edges.map((e) => {
          const [a, b] = e.split(">");
          const A = pos[a], B = pos[b];
          if (!A || !B) return null;
          let path: string;
          if (A.x === B.x) {
            // same column → drop straight down between them
            const x = A.x + W / 2;
            const top = A.y < B.y ? A.y + H : A.y;
            const bot = A.y < B.y ? B.y : B.y + H;
            path = `M${x} ${top} V${bot}`;
          } else if (B.x < A.x) {
            // feedback edge → route under the whole diagram
            const y = Math.max(A.y, B.y) + H + GAP_Y * 0.55;
            path = `M${A.x + W / 2} ${A.y + H} V${y} H${B.x + W / 2} V${B.y + H}`;
          } else {
            const x1 = A.x + W, y1 = A.y + H / 2;
            const x2 = B.x,     y2 = B.y + H / 2;
            const mid = x1 + (x2 - x1) / 2;
            // orthogonal routing reads as a wiring diagram, not a mind map
            path = y1 === y2 ? `M${x1} ${y1} H${x2}` : `M${x1} ${y1} H${mid} V${y2} H${x2}`;
          }
          return (
            <path key={e} d={path} fill="none" stroke="rgba(255,255,255,.3)"
                  strokeWidth="1" markerEnd={`url(#ar-${id})`} />
          );
        })}

        {Object.values(pos).map(({ x, y, n }) => (
          <g key={n.id}>
            <rect x={x} y={y} width={W} height={H} rx="4"
                  fill={n.accent ? "rgba(255,255,255,.11)" : "rgba(255,255,255,.035)"}
                  stroke={n.accent ? "rgba(255,255,255,.55)" : "rgba(255,255,255,.2)"}
                  strokeWidth="1" />
            <text x={x + W / 2} y={y + (n.sub ? 23 : 32)} textAnchor="middle"
                  fill="rgba(255,255,255,.92)" fontSize="12"
                  fontFamily="var(--font-mono), ui-monospace, monospace">
              {n.label}
            </text>
            {n.sub && (
              <text x={x + W / 2} y={y + 38} textAnchor="middle"
                    fill="rgba(255,255,255,.42)" fontSize="9" letterSpacing=".5"
                    fontFamily="var(--font-mono), ui-monospace, monospace">
                {n.sub}
              </text>
            )}
          </g>
        ))}
      </svg>

      <div className="mono text-[9.5px] tracking-[.2em] text-white/34 mt-4">
        {d.caption.toUpperCase()}
      </div>
      {d.note && (
        <p className="text-[13px] leading-[1.7] text-white/62 mt-3 max-w-[62ch]">{d.note}</p>
      )}
    </div>
  );
}
