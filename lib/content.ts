/* Everything the site says, in one file. Components read from here and hold no copy.

   Sources: ~/Documents/SaurabhBrain/Me/about.md, the GitHub profile README
   (github.com/K-sau07) and each project's repo. No number appears here that isn't
   published somewhere I can point to. The current employer is named only in
   Experience (and on the résumé), never in the headline copy. */

export const profile = {
  name: "Saurabh Kashyap",
  role: "Software Engineer",
  city: "Boston",
  line: "I build software, and the tools that help people understand it.",
  facts: ["3+ years building software", "M.S. Northeastern University"],
  now: { label: "reposensei.com", href: "https://reposensei.com" },
  email: "saurabh.k@itjobinbox.com",
  github: "https://github.com/K-sau07",
  linkedin: "https://www.linkedin.com/in/saurabh-kashyap-b5a4ab22a/",
  resume: "/resume.pdf",
  stack: "Java · Spring · Python · TypeScript · Postgres · AWS",
  open: "Open to software engineering roles. Boston, happy to relocate.",
  degree: "M.S. Computer Software Engineering, Northeastern University, May 2026",
};

/* ── repo-sensei ─────────────────────────────────────────────────────────── */

export type Layer = "ui" | "state" | "client" | "handler" | "service" | "db";

export interface Hop {
  layer: Layer;
  symbol: string;
  path: string;
  line: number;
}

export const sensei = {
  name: "repo-sensei",
  href: "https://reposensei.com",
  pitch: "A search engine for your whole codebase. Every answer cites the lines it stands on.",
  question: "where does signing in read the user?",
  modes: ["Ask", "Search", "Trace", "Diagrams", "Impact", "MCP"],
  /** CrossLayerBench flow ft-login, fastapi/full-stack-fastapi-template */
  hops: [
    { layer: "ui",      symbol: "Login",                         path: "frontend/src/routes/login.tsx",   line: 53 },
    { layer: "state",   symbol: "useAuth",                       path: "frontend/src/hooks/useAuth.ts",   line: 18 },
    { layer: "client",  symbol: "LoginService.loginAccessToken", path: "frontend/src/client/sdk.gen.ts",  line: 27 },
    { layer: "handler", symbol: "login_access_token",            path: "backend/app/api/routes/login.py", line: 23 },
    { layer: "service", symbol: "authenticate",                  path: "backend/app/crud.py",             line: 45 },
    { layer: "service", symbol: "get_user_by_email",             path: "backend/app/crud.py",             line: 34 },
    { layer: "db",      symbol: "User",                          path: "backend/app/models.py",           line: 51 },
  ] satisfies Hop[],
  answer:
    "Signing in posts the form to login_access_token, which calls authenticate. " +
    "That looks the user up by email and reads the User row.",
  /** indexes into hops */
  cites: [4, 5, 6],
  checked: "each claim checked against its lines",
  source:
    "fastapi/full-stack-fastapi-template · flow ft-login, one of 101 hand-labelled flows in CrossLayerBench",
  origin: [
    "It started with OpenLens, which found you a first open-source issue and the files to touch. " +
      "OpenLens never read the code.",
    "repo-sensei does: it answers questions about a repository with citations to the exact lines, " +
      "traces features across TypeScript, Python and Java, and plugs into Claude Code, Cursor and " +
      "VS Code over MCP.",
  ],
  bench:
    "I hold it to a benchmark I built and published. 0.95 hop recall on the repo I tuned it on, " +
    "0.23 to 0.33 on repos it has never seen. The second number is the one I'm working on.",
  links: [
    { label: "Try it", href: "https://reposensei.com" },
    { label: "Source", href: "https://github.com/K-sau07/repo-sensei" },
    { label: "CrossLayerBench", href: "https://github.com/K-sau07/crosslayerbench" },
    { label: "How it's measured", href: "https://reposensei.com/benchmarks" },
  ],
};

/* ── projects ────────────────────────────────────────────────────────────── */

export type Motif = "openlens" | "tassist" | "watchdog" | "ghostos" | "ecoplate" | "aura";

export interface Running {
  id: Motif;
  label: string;
  name: string;
  line: string;
  stack: string;
  live: string;
  repo: string;
}

export const running: Running[] = [
  {
    id: "openlens", label: "Open source", name: "OpenLens",
    line: "Your first open-source PR, mapped out. Five questions, then a guide for that repo.",
    stack: "Java 21 · Spring Boot · Kafka · Claude",
    live: "https://openlens-ten.vercel.app", repo: "https://github.com/K-sau07/openlens",
  },
  {
    id: "tassist", label: "Retrieval", name: "TAssist",
    line: "Answers over your lecture slides, each one pointing back to the slide it came from.",
    stack: "Spring AI · pgvector · Claude · React",
    live: "https://t-assist.vercel.app", repo: "https://github.com/K-sau07/TAssist",
  },
  {
    id: "watchdog", label: "Agents", name: "Watchdog",
    line: "New job postings from Greenhouse, Lever and Ashby, freshest first.",
    stack: "Spring Boot · TypeScript · React",
    live: "https://watchdog-sand.vercel.app", repo: "https://github.com/K-sau07/Watchdog",
  },
  {
    id: "ghostos", label: "Interfaces", name: "Ghost OS",
    line: "My portfolio, as an operating system. Windows, dock, Spotlight, a real shell. No UI kit.",
    stack: "Next.js · TypeScript · Framer Motion",
    live: "https://ghost-os-pied.vercel.app", repo: "https://github.com/K-sau07/GhostOS",
  },
  {
    id: "ecoplate", label: "Marketplace", name: "Ecoplate",
    line: "Surplus groceries, discounted before they expire. What's left goes to NGOs.",
    stack: "Spring Boot · React · JaCoCo",
    live: "https://ecoplate-gamma.vercel.app", repo: "https://github.com/K-sau07/ecoplate",
  },
  {
    id: "aura", label: "Creative", name: "Sentiment Aura",
    line: "Live speech, read for sentiment, drawn as generative art.",
    stack: "p5.js · Deepgram · Groq",
    live: "https://livesentimentaura.vercel.app", repo: "https://github.com/K-sau07/sentiment-aura",
  },
];

export const napNote =
  "The demos run on free tiers and nap when idle. Give the first request about 50 seconds.";

export interface Earlier {
  id: string;
  label: string;
  name: string;
  line: string;
  stack: string;
  repo: string;
}

export const earlier: Earlier[] = [
  {
    id: "infra", label: "Infrastructure", name: "Cloud-native AWS",
    line: "Multi-AZ Terraform, Packer-built AMIs, CI to deploy.",
    stack: "Terraform · AWS · Packer", repo: "https://github.com/K-sau07/tf-aws-infrastructure",
  },
  {
    id: "ev", label: "Full stack", name: "EV Charging",
    line: "Reserve a charger before you drive there.",
    stack: "React · Node.js · SQL Server", repo: "https://github.com/K-sau07/EV_CHARGING_SYSTEM",
  },
  {
    id: "livermore", label: "Machine learning", name: "Livermore",
    line: "A Transformer written by hand in PyTorch, plus RAG.",
    stack: "Python · PyTorch · RAG", repo: "https://github.com/K-sau07/livermore-trading-bot",
  },
  {
    id: "syncpoll", label: "Real time", name: "SyncPoll",
    line: "Live polling over WebSockets, where attendance comes from answering.",
    stack: "Java · WebSocket", repo: "https://github.com/K-sau07/Syncpoll",
  },
];

/* ── the rest of the settings window ─────────────────────────────────────── */

export interface Role {
  title: string;
  org: string;
  where: string;
  when: string;
  bullets: string[];
  stack: string;
}

export const experience: Role[] = [
  {
    title: "Software Engineer",
    org: "ServiceNow",
    where: "Massachusetts",
    when: "Feb 2026 to now",
    bullets: [
      "Moved the workflow microservices behind Spring Cloud Gateway, so every client has one consistent way in.",
      "Nightly workflow sync with Spring Batch and S3: parallel chunks, validation, and errors that skip a record instead of failing the run.",
      "Redis cache-aside reads and TTL tuning, so reporting stops asking MySQL the same question twice.",
      "Composite indexes and query rewrites behind the reporting dashboards.",
      "Centralized ELK logging and Kibana alerts across the services with QA and DevOps.",
    ],
    stack: "Java · Spring Boot · Spring Cloud Gateway · Spring Batch · Redis · S3 · MySQL · ELK",
  },
  {
    title: "Software Development Engineer",
    org: "Bhardwaj Tech IT Solutions",
    where: "Gurugram, India",
    when: "Mar 2022 to Jul 2024",
    bullets: [
      "Java and Spring Boot REST APIs for SMC's mutual fund platform: fund discovery, order placement and transaction tracking.",
      "Scheduled jobs that check BSE StAR MF payment status and move pending orders forward.",
      "Made fund search fast with Redis caching, SQL tuning and connection pooling.",
      "Spring Batch reconciliation with S3 and OpenSearch that flags orders that don't match.",
      "React dashboards for fund discovery, and order flows for SIP, SWP, STP, lump sum and redemption.",
    ],
    stack: "Java · Spring Boot · Spring Batch · React · Redis · S3 · OpenSearch · SQL",
  },
];

export const skills: [string, string[]][] = [
  ["Languages", ["Java", "Python", "SQL", "JavaScript", "TypeScript"]],
  ["Backend & AI", ["Spring Boot", "Spring Batch", "Spring Cloud Gateway", "Spring Data JPA", "FastAPI", "Spring AI", "RAG", "MCP"]],
  ["Cloud & data", ["AWS", "Terraform", "Docker", "PostgreSQL", "MySQL", "Redis", "pgvector", "OpenSearch", "Kafka"]],
  ["Frontend", ["React", "Next.js", "HTML/CSS"]],
  ["Practice", ["System design", "Low-level design", "SOLID", "Design patterns", "JUnit", "Mockito", "CI/CD", "GitHub Actions", "ELK"]],
];

export const education = [
  { school: "Northeastern University", degree: "M.S. Computer Software Engineering", where: "Boston", when: "May 2026", note: "GPA 3.75" },
  { school: "Guru Gobind Singh Indraprastha University", degree: "B.Tech Computer Science", where: "Delhi", when: "Jul 2023", note: "GPA 3.5" },
];

export const certifications = [
  "AWS Certified Solutions Architect",
  "Spring Professional",
  "Claude Certified Architect",
];
