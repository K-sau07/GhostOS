/* Sourced from Saurabh Kashyap's resume — now `saurabh_master_resume_v4`
   (~/Documents/SaurabhBrain/Me/resume), updated 2026-11-02.
   Single source of truth for site copy — components read from here. */

export const profile = {
  name: "Saurabh Kashyap",
  first: "SAURABH",
  last: "Kashyap",
  role: "Software Engineer",
  location: "Boston, MA",
  email: "saurabh.k@itjobinbox.com",
  phone: "508-251-9255",
  github: "https://github.com/K-sau07",
  linkedin: "https://www.linkedin.com/in/saurabh-kashyap-b5a4ab22a/",
  years: "3+",
  summary:
    "Software Engineer with 3+ years building Java/Spring Boot microservices, React " +
    "applications, and AWS data workflows. Experienced in financial APIs, SQL performance, " +
    "production reliability, and RAG-based developer tools.",
  available: "OPEN TO SWE ROLES",
};

export const education = [
  {
    school: "Northeastern University",
    degree: "MS, Computer Software Engineering",
    detail: "GPA 3.75 / 4.00",
    where: "Boston, MA",
    when: "May 2026",
  },
  {
    school: "Guru Gobind Singh Indraprastha University",
    degree: "BTech, Computer Science",
    detail: "GPA 3.5 / 4.00",
    where: "Delhi, India",
    when: "Jul 2023",
  },
];

export const certifications = [
  "AWS Certified Solutions Architect",
  "Spring Professional Certification",
  "Claude Certified Architect",
];

export interface Role {
  company: string; title: string; where: string; when: string;
  bullets: string[]; stack: string[];
  metrics: [string, string][];
}

export const experience: Role[] = [
  {
    company: "ServiceNow",
    title: "Software Engineer",
    where: "Massachusetts, USA",
    when: "Feb 2026 — Present",
    bullets: [
      "Consolidated 45+ REST endpoints behind Spring Cloud Gateway, standardizing API routing across Java/Spring Boot workflow microservices and simplifying client integration.",
      "Orchestrated nightly workflow synchronization with Spring Batch and AWS S3, using parallel chunk processing, validation, and fault-tolerant error handling.",
      "Raised Redis cache hit rate from 62% to 89% through cache-aside reads and TTL tuning, limiting repeat MySQL queries in reporting services.",
      "Tuned MySQL reporting queries with composite indexes and query refactoring to improve dashboard data retrieval and reduce database overhead.",
      "Collaborated with QA and DevOps to centralize ELK logging and Kibana alerts across 8 microservices, cutting issue detection from 14 to under 4 minutes.",
    ],
    stack: ["Java", "Spring Boot", "Spring Cloud Gateway", "Spring Batch", "Redis", "AWS S3", "ELK", "MySQL"],
    metrics: [
      ["45+", "REST endpoints"],
      ["62→89%", "cache hit ratio"],
      ["8", "microservices"],
      ["14→4 min", "issue detection"],
    ],
  },
  {
    company: "Bhardwaj Tech IT Solutions Pvt. Ltd.",
    title: "Software Development Engineer",
    where: "Gurugram, India",
    when: "Mar 2022 — Jul 2024",
    bullets: [
      "Delivered 10+ Java/Spring Boot REST APIs for SMC’s mutual fund investment platform, supporting fund discovery, order placement, and transaction tracking.",
      "Automated BSE StAR MF payment-status checks with scheduled jobs, updating PENDING investment orders from exchange responses to keep transaction status current.",
      "Cut fund-search API latency from 650 ms to 180 ms through Redis caching, SQL query optimization, and database connection pooling.",
      "Implemented Spring Batch reconciliation with AWS S3 and OpenSearch to flag unmatched order IDs, detect discrepancies, and handle transient processing failures.",
      "Designed React fund-discovery dashboards with advanced filters, interactive performance charts, and API-backed investment data for customer research.",
      "Simplified React order-entry and tracking flows for 5 investment types through reusable forms, client-side validation, and API-driven status updates.",
    ],
    stack: ["Java", "Spring Boot", "Spring Batch", "React.js", "Redis", "AWS S3", "OpenSearch", "SQL"],
    metrics: [
      ["10+", "REST APIs"],
      ["650→180ms", "API latency"],
      ["5", "transaction types"],
    ],
  },
];

export type Kind = "ai" | "platform" | "infra" | "quality" | "data";

export interface Project {
  id: string;
  file: string;
  name: string;
  tagline: string;
  blurb: string;
  bullets: string[];
  stack: string[];
  repo?: string;
  live?: string;
  kind: Kind;
  /** rough scale, shown in Finder's size column */
  size: string;
  when: string;
  /** systems.app has a diagram for this */
  diagram?: boolean;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "repo-sensei",
    file: "repo-sensei.app",
    name: "Repo-Sensei",
    tagline: "AI Codebase Engineer",
    blurb:
      "An AI platform that answers questions about large codebases, combining hybrid keyword + " +
      "vector search with a code graph that links UI, API and database. It indexes 2.1M lines " +
      "(11.4K files) in about 3.5 minutes and traces features from page to database 2.3x more " +
      "accurately \u2014 recall 0.27 \u2192 0.62 on a 20-flow benchmark I built.",
    bullets: [
      "Indexed 2.1M lines across 11.4K files in ~3.5 minutes using hybrid search and a UI–API–database code graph, raising feature-trace recall from 0.27 to 0.62 (2.3x).",
      "Built FastAPI, PostgreSQL/pgvector, Celery/Redis, and Next.js with OAuth-secured MCP tools for Claude Code and IDEs; cut tool response time 78% and sandboxed AI code in gVisor with 4,000+ tests.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Celery", "Redis", "Next.js", "TypeScript", "MCP", "Docker"],
    repo: "https://github.com/K-sau07/repo-sensei",
    kind: "ai", size: "2.1M lines indexed", when: "Nov 2026", featured: true,
  },
  {
    id: "tassist",
    file: "tassist.app",
    name: "TAssist",
    tagline: "AI-Powered Course Doubt Resolution Platform",
    blurb:
      "A full-stack AI platform serving two roles — TA and student — with RAG-grounded answers " +
      "streamed in real time, freeing 8 hours a week previously spent on repetitive manual doubt " +
      "resolution. Answers are never invented; every one carries a citation.",
    bullets: [
      "Created a Spring AI RAG assistant with Claude, pgvector, and React, streaming cited answers and saving an estimated 8 hours/week of routine support.",
      "Indexed 100+ presentation slides using Apache POI and PostgreSQL embeddings, linking generated responses to source slide citations.",
    ],
    stack: ["Java", "Spring AI", "Anthropic Claude", "pgvector", "PostgreSQL", "React", "TypeScript", "Docker"],
    repo: "https://github.com/K-sau07/TAssist",
    live: "https://t-assist.vercel.app",
    kind: "ai", size: "386 files", when: "Aug 2026", diagram: true, featured: true,
  },
  {
    id: "watchdog",
    file: "watchdog.app",
    name: "Watchdog",
    tagline: "Continuous agent that catches job postings minutes after they go live",
    blurb:
      "Polls company ATS boards — Greenhouse, Lever, Ashby — on a schedule, detects brand-new " +
      "postings the moment they appear, filters them to the roles you're hunting, and surfaces " +
      "them on a radar dashboard, freshest first.",
    bullets: [
      "Named for the watchdog process pattern: continuously monitors a system and acts the instant something changes.",
      "Spec-first build under a written development constitution — 120 Java files behind a TypeScript dashboard.",
    ],
    stack: ["Java", "Spring Boot", "TypeScript", "React", "Scheduling"],
    repo: "https://github.com/K-sau07/Watchdog",
    live: "https://watchdog-sand.vercel.app",
    kind: "platform", size: "151 files", when: "Sep 2026", diagram: true, featured: true,
  },
  {
    id: "openlens",
    file: "openlens.app",
    name: "OpenLens",
    tagline: "AI-Powered Open-Source Contribution Guide Generator",
    blurb:
      "Generates personalised open-source contribution guides through LLM integration, analysing " +
      "100+ issues and merged PRs per repository to cut contributor onboarding from over an hour " +
      "to under ten minutes.",
    bullets: [
      "Architected in Java 21 and Spring Boot 3.2 using hexagonal architecture.",
      "Asynchronous GitHub API ingestion via Kafka, PostgreSQL + Flyway for migrations, Redis caching for repeated lookups.",
    ],
    stack: ["Java 21", "Spring Boot 3.2", "Kafka", "PostgreSQL", "Flyway", "Redis"],
    repo: "https://github.com/K-sau07/openlens",
    live: "https://openlens-ten.vercel.app",
    kind: "ai", size: "92 files", when: "May 2026", diagram: true, featured: true,
  },
  {
    id: "ecoplate",
    file: "ecoplate.app",
    name: "Ecoplate",
    tagline: "Food waste, priced dynamically",
    blurb:
      "Connects grocery stores with customers and NGOs to cut food waste. Surplus stock is " +
      "discounted dynamically as expiry approaches, and whatever still does not sell is routed " +
      "to NGOs for free distribution rather than thrown away.",
    bullets: [
      "Dynamic pricing tied to expiry, so the discount deepens as the window closes.",
      "Unsold stock routes to NGO claims instead of waste — the two flows share one inventory.",
      "Team project: Java/Spring backend with JaCoCo coverage enforced in CI.",
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "React", "JaCoCo", "Docker"],
    repo: "https://github.com/K-sau07/ecoplate",
    live: "https://ecoplate-gamma.vercel.app",
    kind: "platform", size: "80 Java files", when: "Dec 2025",
  },
  {
    id: "cloud-infra",
    file: "cloud-infra.tf",
    name: "Cloud-Native Auto-Scaling Infrastructure",
    tagline: "Multi-environment IaC on AWS",
    blurb:
      "Multi-environment cloud infrastructure in Terraform and AWS, provisioning fault-tolerant " +
      "multi-AZ deployments with IAM roles and KMS encryption to sustain 99.9% availability under load.",
    bullets: [
      "Provisioned multi-AZ AWS infrastructure (VPC, EC2, RDS, ALB) through Terraform, with IAM permissions and KMS encryption.",
      "Reduced deployment cycles by ~65% using Packer AMIs and GitHub Actions CI/CD, adding CloudWatch and StatsD release monitoring.",
    ],
    stack: ["Terraform", "AWS", "VPC", "EC2", "RDS", "ALB", "Packer", "GitHub Actions"],
    repo: "https://github.com/K-sau07/tf-aws-infrastructure",
    kind: "infra", size: "22 modules", when: "Feb 2026", diagram: true, featured: true,
  },
  {
    id: "webapp-infra",
    file: "webapp-infra.app",
    name: "Webapp + Infra",
    tagline: "Java 21 service on a Terraform-provisioned AWS stack",
    blurb:
      "RESTful backend handling file uploads to AWS S3 with metadata in PostgreSQL. Deployed to EC2 " +
      "via a custom Packer AMI, behind an autoscaling group and load balancer provisioned with Terraform.",
    bullets: [
      "Java 21 (Temurin LTS) with Spring Boot 3.2, Spring Data JPA and Flyway migrations.",
      "PostgreSQL 17 on AWS RDS, S3 for object storage.",
    ],
    stack: ["Java 21", "Spring Boot 3.2", "AWS S3", "RDS", "Packer", "Terraform", "Flyway"],
    repo: "https://github.com/K-sau07/Webapp-Infra",
    kind: "infra", size: "14 files", when: "Feb 2026",
  },
  {
    id: "syncpoll",
    file: "syncpoll.app",
    name: "SyncPoll",
    tagline: "Real-time audience engagement for classrooms and webinars",
    blurb:
      "Live polls with real-time results, automatic attendance tracking the moment a participant " +
      "answers, and per-user analytics across sessions — not just anonymous aggregates.",
    bullets: [
      "Hosts see who answered what, so attendance is a by-product of participation.",
      "51 Java files behind a React front end.",
    ],
    stack: ["Java", "Spring Boot", "WebSocket", "React", "Tailwind"],
    repo: "https://github.com/K-sau07/Syncpoll",
    kind: "platform", size: "86 files", when: "Mar 2026", diagram: true,
  },
  {
    id: "livermore",
    file: "livermore.app",
    name: "Livermore Trading Intelligence",
    tagline: "GenAI chatbot and stock backtesting on Jesse Livermore's philosophy",
    blurb:
      "Three models answer the same question side by side: a RAG retriever, a Transformer " +
      "hand-coded from scratch in PyTorch, and Groq LLaMA 3.3 70B — so you can see the gap between them.",
    bullets: [
      "The middle path is a real Transformer implementation, not a wrapper around a hosted model.",
      "Paired with a stock backtesting platform built on Livermore's documented strategies.",
    ],
    stack: ["Python", "PyTorch", "RAG", "Groq LLaMA", "Streamlit"],
    repo: "https://github.com/K-sau07/livermore-trading-bot",
    kind: "ai", size: "—", when: "May 2026", diagram: true,
  },
  {
    id: "sentiment-aura",
    file: "sentiment-aura.app",
    name: "Sentiment Aura",
    tagline: "Live speech → sentiment → generative art",
    blurb:
      "Captures spoken audio, transcribes it in real time, analyses emotional sentiment with an LLM, " +
      "and visualises the result as an interactive Perlin-noise particle system. Different emotions " +
      "drive distinct colours and movement.",
    bullets: [
      "WebSocket audio streaming into Deepgram for transcription and Groq for sub-second emotion detection.",
      "p5.js particle physics engine mapping 30+ emotion states across three animation modes.",
    ],
    stack: ["React", "Node.js", "p5.js", "Deepgram", "Groq", "WebSocket"],
    repo: "https://github.com/K-sau07/sentiment-aura",
    live: "https://livesentimentaura.vercel.app",
    kind: "ai", size: "—", when: "Nov 2025",
  },
  {
    id: "opencodeintel",
    file: "opencodeintel.app",
    name: "OpenCodeIntel",
    tagline: "Open-source code intelligence platform",
    blurb:
      "Code analysis backend in Python paired with a TypeScript and React front end — 62 Python " +
      "modules and 59 React components.",
    bullets: ["Companion project to OpenLens, focused on repository-level code understanding."],
    stack: ["Python", "TypeScript", "React", "Next.js"],
    repo: "https://github.com/K-sau07/opencodeintel-OpenSource",
    kind: "ai", size: "149 files", when: "Mar 2026",
  },
  {
    id: "ev-charging",
    file: "ev-charging.app",
    name: "EV Charging System",
    tagline: "Full-stack EV charging management platform",
    blurb:
      "Solves EV drivers being unable to reserve charging spots. Multi-stakeholder platform for " +
      "owners and station operators, on a normalised SQL Server database.",
    bullets: [
      "Email-OTP authentication, real-time charging session tracking with live timers, integrated billing.",
      "Automated reservation management across the operator and driver workflows.",
    ],
    stack: ["JavaScript", "React", "Node.js", "SQL Server"],
    repo: "https://github.com/K-sau07/EV_CHARGING_SYSTEM",
    kind: "platform", size: "50 files", when: "Dec 2025",
  },
  {
    id: "packngo",
    file: "packngo.app",
    name: "PackNGo",
    tagline: "Java travel-logistics application",
    blurb: "Java application built around packing and trip logistics workflows — 44 source files.",
    bullets: [],
    stack: ["Java"],
    kind: "platform", size: "44 files", when: "2025",
  },
  {
    id: "selenium",
    file: "selenium-qa.app",
    name: "Selenium Automation Framework",
    tagline: "Page Object Model test framework",
    blurb:
      "Test automation framework on the Page Object Model with TestNG, data-driven test cases, " +
      "and AES-encrypted credential handling.",
    bullets: [],
    stack: ["Java", "Selenium", "TestNG", "Maven", "AES"],
    repo: "https://github.com/K-sau07/Selenium-Automation-Framework",
    kind: "quality", size: "11 files", when: "May 2026",
  },
  {
    id: "ace-emr",
    file: "ace-emr.qa",
    name: "ACE-EMR QA Test Plan",
    tagline: "Clinical system test strategy",
    blurb:
      "Full QA test plan for the ACE-EMR clinical system — test strategy, coverage matrix and " +
      "execution tracking for a regulated healthcare workflow.",
    bullets: [],
    stack: ["Test Strategy", "QA", "Healthcare"],
    repo: "https://github.com/K-sau07/ACE-EMR-QA-Test-Plan",
    kind: "quality", size: "—", when: "May 2026",
  },
  {
    id: "neetcode",
    file: "neetcode.dsa",
    name: "NeetCode Submissions",
    tagline: "Data structures & algorithms practice",
    blurb: "Ongoing DSA practice in Java — pattern-organised solutions.",
    bullets: [],
    stack: ["Java", "DSA"],
    repo: "https://github.com/K-sau07/neetcode-submissions",
    kind: "data", size: "—", when: "May 2026",
  },
];

export interface WorkSystem {
  id: string; file: string; name: string; at: string;
  blurb: string; stack: string[];
}

/** production systems from the work history — these get diagrams too */
export const workSystems: WorkSystem[] = [
  {
    id: "gateway",
    file: "api-gateway.sys",
    name: "Enterprise API Gateway",
    at: "ServiceNow",
    blurb:
      "An enterprise workflow and reporting platform on a microservices architecture. I reengineered " +
      "the gateway layer with Spring Cloud Gateway, consolidating 45+ REST endpoints behind a " +
      "single entry point so clients get one consistent surface — with Redis cache-aside and " +
      "MySQL index work underneath it.",
    stack: ["Java", "Spring Boot", "Spring Cloud Gateway", "Redis", "MySQL"],
  },
  {
    id: "batch",
    file: "batch-sync.sys",
    name: "Nightly Data Synchronisation",
    at: "ServiceNow",
    blurb:
      "A fault-tolerant synchronisation engine pulling workflow records every night from " +
      "AWS S3. Parallel chunk processing replaced a sequential run, and skip-error handling means one " +
      "malformed record no longer takes the whole batch down.",
    stack: ["Java", "Spring Batch", "AWS S3", "MySQL"],
  },
  {
    id: "observability",
    file: "observability.sys",
    name: "Production Observability",
    at: "ServiceNow",
    blurb:
      "Centralised logging and monitoring across 8 microservices on the ELK stack, with dashboards " +
      "and alerting. Mean time to detect production anomalies dropped from 14 minutes to under 4.",
    stack: ["Elasticsearch", "Logstash", "Kibana", "ELK Stack"],
  },
  {
    id: "orders",
    file: "order-exec.sys",
    name: "Fintech Order Execution",
    at: "Bhardwaj Tech",
    blurb:
      "Order-execution platform for a mutual fund client across 5 order types (SIP, SWP, STP, " +
      "lump sum, redemption) with end-to-end validation, placement and reconciliation.",
    stack: ["Java", "Spring Boot", "Spring Batch", "OpenSearch", "AWS"],
  },
];

export const KIND_LABEL: Record<Kind, string> = {
  ai: "AI / LLM",
  platform: "Platform",
  infra: "Infrastructure",
  quality: "Quality",
  data: "Practice",
};

export const skills = {
  "Languages": ["Java", "Python", "SQL", "JavaScript", "TypeScript"],
  "Backend": ["Spring Boot", "Spring Batch", "Spring Data JPA", "Spring Cloud Gateway", "REST APIs", "gRPC", "Spring AI"],
  "Architecture": ["Microservices", "Distributed Systems", "Event-Driven", "Fault-Tolerant", "System Design", "SOLID"],
  "Cloud & DevOps": ["AWS", "EC2", "S3", "RDS", "Lambda", "CloudWatch", "OpenSearch", "Docker", "Kubernetes", "Terraform", "Jenkins"],
  "Data & Messaging": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "pgvector", "Kafka", "RabbitMQ", "Flyway"],
  "Frontend": ["React", "Node.js", "Express.js", "Tailwind CSS"],
  "Testing": ["JUnit", "Mockito", "TDD", "GitHub Actions", "Packer", "ELK Stack"],
  "AI": ["LLM Integration", "RAG", "Spring AI", "Anthropic Claude"],
};

/** headline numbers for the desktop + about */
export const headline: [string, string][] = [
  ["45+", "REST ENDPOINTS"],
  ["650→180ms", "API LATENCY"],
  ["3+", "YEARS SHIPPING"],
];
