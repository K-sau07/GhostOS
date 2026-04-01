"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    period: "Jan 2026 - Present",
    title: "Graduate Teaching Assistant, CSYE 7230 Software Engineering",
    company: "Northeastern University",
    location: "Boston, MA",
    bullets: [
      "Conducted technical code reviews on 25+ student projects, evaluating software architecture, design patterns, and SOLID principles compliance",
      "Mentored 20+ students on design patterns implementation and test-driven development, improving project test coverage by 80% and reducing code complexity across submissions",
      "Analyzed and resolved software issues spanning backend services, database performance, third-party integrations, and deployment configurations across diverse technology stacks",
    ],
  },
  {
    period: "Sep 2023 - Jul 2024",
    title: "Software Development Engineer",
    company: "Bhardwaj Tech IT Solutions Pvt Ltd",
    location: "Gurugram, India",
    bullets: [
      "SMC Mutual Fund App: Designed and deployed 10+ RESTful APIs using Java and Spring Boot for fund listings, advanced filters, top/popular funds, single-fund details, and graph data services",
      "Architected end-to-end Mutual Fund Order Execution System handling 5 transaction types (lumpsum, SIP, SWP, STP, redemption) — covering validation, placement, acknowledgment, and reconciliation for 10K+ users",
      "Integrated third-party exchange APIs to manage complete order lifecycle including payment status tracking and failure-safe processing across high-volume transactions",
      "Optimized API performance and implemented production monitoring ensuring high availability and reliability in a live fintech environment",
    ],
  },

  {
    period: "Jun 2022 - Jul 2023",
    title: "Software Engineer Intern",
    company: "Bhardwaj Tech IT Solutions Pvt Ltd",
    location: "Gurugram, India",
    bullets: [
      "Engineered CMOTS data ingestion pipeline for 360 ONE Wealth integrating 3+ external APIs with S3 and relational databases, optimized for near real-time data access",
      "Built authentication and order-flow APIs supporting onboarding and transaction processing across 2 user tiers (UHNI/HNI), and developed 5+ modules including user dashboards and watchlist",
      "Automated failure monitoring via scheduled cron jobs with MS Teams alerting, reducing manual intervention for production incidents",
    ],
  },
];

export default function Work() {
  return (
    <section id="work" className="py-20 px-6 lg:px-20 relative">
      {/* Vertical WORK text on right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-[2px] h-16 bg-[var(--text-primary)]" />
        <span
          className="text-[var(--text-primary)] text-sm font-semibold tracking-widest"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          WORK
        </span>
        <div className="w-[2px] h-16 bg-[var(--text-primary)]/30" />
      </div>

      <div className="max-w-5xl mx-auto lg:mr-32">
        <div className="space-y-6">

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 rounded-3xl bg-[var(--bg-secondary)]/60 border border-[var(--border-color)]"
            >
              <span className="text-sm text-[var(--text-secondary)]">{exp.period}</span>
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mt-3">
                {exp.title}
              </h3>
              <p className="text-[var(--text-secondary)] text-lg mt-1">{exp.company}</p>
              <p className="text-[var(--text-muted)] text-sm">{exp.location}</p>
              
              <ul className="mt-6 space-y-3">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-[var(--text-secondary)] leading-relaxed flex gap-3">
                    <span className="text-[var(--accent)] mt-1.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
