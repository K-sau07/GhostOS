"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";

const projects = [
  {
    title: "Cloud-Native Auto-Scaling Infrastructure",
    description:
      "Architected multi-environment cloud infrastructure using Terraform and AWS (VPC, EC2, RDS, ALB), reducing deployment time by 85% through automated provisioning. Achieved 99.9% application availability through fault-tolerant multi-AZ deployment with IAM roles and KMS encryption.",
    image: "/projects/cloud-infra.png",
    github: "https://github.com/K-sau07/tf-aws-infrastructure",
    tech: ["AWS", "Terraform", "Packer", "GitHub Actions", "VPC", "EC2", "RDS", "KMS"],
  },
  {
    title: "EcoPlate - Food Waste Reduction",
    description:
      "Architected full-stack platform with role-based access control, dynamic pricing engine adjusting food listings based on real-time weather and demand, and interactive maps for live availability tracking. Implemented JWT authentication, BCrypt password hashing, and Spring Security with sub-1-second API response times for 30+ concurrent users.",
    image: "/projects/ecoplate.gif",
    github: "https://github.com/CanNortheastern/CSYE7230Group1",
    tech: ["Spring Boot", "React", "JWT", "MySQL", "Docker"],
  },
  {
    title: "EV Charging System",
    description:
      "Comprehensive data management system for electric vehicle charging infrastructure. Features complex database design, real-time availability tracking, and efficient query optimization.",
    image: "/projects/ev-charging.gif",
    github: "https://github.com/K-sau07/EV_CHARGING_SYSTEM",
    tech: ["Java", "PostgreSQL", "Database Design", "Spring Boot", "React"],
  },

  {
    title: "Sentiment Aura Analysis",
    description:
      "Real-time sentiment analysis platform with AI integration. Features interactive visualizations and processes live data streams for instant sentiment insights.",
    image: "/projects/sentiment-aura.gif",
    github: "https://github.com/K-sau07/sentiment-aura",
    tech: ["Python", "Flask", "NLP", "React", "TailwindCSS"],
  },
  {
    title: "Apple TV Redesign",
    description:
      "UI/UX design project focused on reimagining the Apple TV interface. Conducted user experience research and created comprehensive wireframes using modern design principles.",
    image: "/projects/apple-tv.gif",
    github: "https://github.com/CodelikeSaurabh/AppleTv-UI-UX-Figma-",
    tech: ["Figma", "UI/UX Design", "Prototyping", "User Research"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 lg:px-20 relative">
      {/* Vertical PROJECTS text on left */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-[2px] h-16 bg-[var(--text-primary)]" />
        <span
          className="text-[var(--text-primary)] text-sm font-semibold tracking-widest"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          PROJECTS
        </span>
        <div className="w-[2px] h-16 bg-[var(--text-primary)]/30" />
      </div>

      <div className="max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-8 lg:gap-12 mb-24 last:mb-0`}
          >
            {/* Project Image */}
            <div className="flex-1 relative group">
              <div className="relative w-full rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4">
                <div className="relative">
                  <div className="absolute -top-2 -left-2 w-full h-full bg-[var(--border-color)] rounded-xl transform -rotate-2" />
                  <div className="absolute -top-1 -left-1 w-full h-full bg-[var(--bg-secondary)] rounded-xl transform -rotate-1" />
                  <div className="relative rounded-xl overflow-hidden shadow-2xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        if (target.parentElement) {
                          target.parentElement.innerHTML = `<div class="w-full aspect-video bg-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)]"><span>${project.title}</span></div>`;
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="flex-1 space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]">
                {project.title}
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {project.description}
              </p>
              
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent)] transition-all duration-300"
              >
                <Github size={18} />
                <span>View Code</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
