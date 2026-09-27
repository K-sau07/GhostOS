/* Sourced verbatim from Saurabh Kashyap's resume (the Downloads copy, Sept 2026).
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
  linkedin: "https://www.linkedin.com/in/saurabh-kashyap",
  years: "3+",
  summary:
    "Software engineer with 3+ years designing and shipping distributed backend systems in " +
    "Java and Spring Boot — from an enterprise API gateway and batch processing platforms to a " +
    "regulated fintech order-execution platform. Strong foundation in AWS, microservices, and " +
    "performance optimization, with hands-on LLM/RAG product experience.",
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
    where: "MA",
    when: "Sep 2025 — Apr 2026",
    bullets: [
      "Reengineered the RESTful API gateway layer with Spring Cloud Gateway, consolidating 45+ downstream endpoints and cutting client-side call latency 38% while processing 3.2M daily requests at 99.95% uptime.",
      "Built a fault-tolerant data synchronization engine using Spring Batch and AWS S3 that processed 1.2M+ workflow records nightly, reducing batch completion time 61% through parallel chunk processing and skip-error handling.",
      "Redesigned a high-traffic caching strategy with Redis using a cache-aside pattern and TTL tuning, improving cache hit ratio from 62% to 89% and reducing database load 44%.",
      "Implemented centralized logging and monitoring with the ELK stack across 8 microservices, cutting mean time to detection for production anomalies from 14 minutes to under 4.",
      "Optimized MySQL query performance through composite indexing and query refactoring, accelerating page load times 52% and improving user satisfaction scores 27% over six months.",
    ],
    stack: ["Spring Cloud Gateway", "Spring Batch", "Redis", "AWS S3", "ELK", "MySQL"],
    metrics: [
      ["3.2M", "daily requests"],
      ["38%", "latency cut"],
      ["99.95%", "uptime"],
      ["61%", "faster batches"],
    ],
  },
  {
    company: "Bhardwaj Tech IT Solutions Pvt Ltd",
    title: "Software Development Engineer",
    where: "Gurugram, India",
    when: "Mar 2022 — Jul 2024",
    bullets: [
      "Architected a scalable order-execution platform for a mutual fund client across 5 order types (SIP, SWP, STP, lump sum, redemption), scaling to 6,000 orders/day with end-to-end validation, placement, and reconciliation.",
      "Built 10+ RESTful APIs in Java and Spring Boot for fund listings, advanced filtering, and live graph data, integrating third-party exchange APIs with transaction-safe order placement.",
      "Reduced API latency from 650ms to 180ms through Redis caching, connection pooling, and SQL query optimization, for 1,000+ concurrent users during peak market hours.",
      "Engineered fault-tolerant microservices with automated CI/CD, Docker containerization on AWS (EC2, RDS), and production monitoring, sustaining 99.9% uptime and cutting deployment time 55%.",
      "Designed a resilient data reconciliation pipeline using Java and Spring Batch, processing 1M+ records/day from Amazon S3 and querying OpenSearch APIs to detect missing order IDs.",
      "Shipped 25+ full-stack production features using React, JavaScript, and Node.js.",
    ],
    stack: ["Java", "Spring Boot", "Spring Batch", "Redis", "AWS", "Docker", "OpenSearch"],
    metrics: [
      ["6,000", "orders / day"],
      ["650→180ms", "API latency"],
      ["99.9%", "uptime"],
      ["1M+", "records / day"],
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
    id: "tassist",
    file: "tassist.app",
    name: "TAssist",
    tagline: "AI-Powered Course Doubt Resolution Platform",
    blurb:
      "A full-stack AI platform serving two roles — TA and student — with RAG-grounded answers " +
      "streamed in real time, freeing 8 hours a week previously spent on repetitive manual doubt " +
      "resolution. Answers are never invented; every one carries a citation.",
    bullets: [
      "Ingestion pipeline using Apache POI for PPT extraction into PostgreSQL + pgvector via Spring AI and Anthropic Claude.",
      "React + TypeScript frontend delivering slide-level citations across 100+ slides.",
      "277 Java source files across ingestion, retrieval, and chat services.",
    ],
    stack: ["Java", "Spring AI", "Anthropic Claude", "pgvector", "PostgreSQL", "React", "TypeScript", "Docker"],
    repo: "https://github.com/K-sau07/TAssist",
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
    kind: "ai", size: "92 files", when: "May 2026", diagram: true, featured: true,
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
      "End-to-end CI/CD via GitHub Actions and Packer for custom AMI builds.",
      "CloudWatch monitoring, StatsD metrics and centralised logging — cutting deployment cycles ~65% through full IaC automation.",
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
      "the gateway layer with Spring Cloud Gateway, consolidating 45+ downstream endpoints behind a " +
      "single entry point serving 3.2M requests a day at 99.95% uptime — with Redis cache-aside and " +
      "MySQL index work underneath it.",
    stack: ["Java", "Spring Boot", "Spring Cloud Gateway", "Redis", "MySQL"],
  },
  {
    id: "batch",
    file: "batch-sync.sys",
    name: "Nightly Data Synchronisation",
    at: "ServiceNow",
    blurb:
      "A fault-tolerant synchronisation engine processing 1.2M+ workflow records every night from " +
      "AWS S3. Parallel chunk processing replaced a sequential run, and skip-error handling means one " +
      "malformed record no longer takes the whole batch down. Completion time fell 61%.",
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
      "Order-execution platform for a mutual fund client across 5 order types, scaling to 6,000 " +
      "orders a day with end-to-end validation, placement and reconciliation.",
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
  ["3.2M", "REQUESTS / DAY"],
  ["99.95%", "UPTIME"],
  ["3+", "YEARS SHIPPING"],
];
