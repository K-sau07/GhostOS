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
    period: "Aug 2023 - Jul 2024",
    title: "Software Engineer",
    company: "Bhardwaj Tech IT Solutions Pvt Ltd",
    location: "Gurugram, India",
    bullets: [
      "Built and shipped backend services for an LMS platform serving 1,000+ users using Java and Spring Boot, implementing course management, student enrollment, and progress tracking APIs",
      "Designed and deployed RESTful APIs for payment processing modules integrating third-party UPI services, resolving 15+ production issues and ensuring secure, reliable transaction handling",
      "Improved application stability by 25% through comprehensive unit testing with JUnit, database query optimization, and legacy code refactoring across production services",
      "Delivered 3+ major releases to production environments with full CI/CD pipelines using GitHub Actions and Maven, collaborating in Agile/Scrum teams across cross-functional projects",
    ],
  },

  {
    period: "Jun 2022 - Jul 2023",
    title: "Software Engineer Intern",
    company: "Bhardwaj Tech IT Solutions Pvt Ltd",
    location: "Gurugram, India",
    bullets: [
      "Developed and maintained full-stack features across multiple client projects using Node.js, Express.js, and React.js, handling both frontend and backend responsibilities",
      "Built REST APIs for user authentication, data management, and business logic modules, integrating with MongoDB and MySQL databases",
      "Revamped frontend components using React.js with lazy loading and code splitting, improving page load performance by 40%",
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
