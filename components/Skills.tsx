"use client";

import { motion } from "framer-motion";

const row1Skills = [
  { name: "Java", color: "#f89820" },
  { name: "Python", color: "#3776ab" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "C++", color: "#00599C" },
  { name: "Spring Boot", color: "#6db33f" },
  { name: "Node.js", color: "#339933" },
  { name: "Express.js", color: "#6b5b7a" },
  { name: "FastAPI", color: "#009688" },
  { name: "React.js", color: "#61dafb" },
  { name: "TypeScript", color: "#3178c6" },
];

const row2Skills = [
  { name: "AWS", color: "#ff9900" },
  { name: "Docker", color: "#2496ed" },
  { name: "Terraform", color: "#7b42bc" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "MongoDB", color: "#47a248" },
  { name: "Redis", color: "#dc382d" },
  { name: "MySQL", color: "#4479a1" },
  { name: "GitHub Actions", color: "#2088ff" },
  { name: "Linux", color: "#fcc624" },
  { name: "Hibernate", color: "#59666c" },
];

const row3Skills = [
  { name: "TensorFlow", color: "#ff6f00" },
  { name: "Pandas", color: "#150458" },
  { name: "LangChain", color: "#1c3c3c" },
  { name: "Git", color: "#f05032" },
  { name: "JUnit", color: "#25a162" },
  { name: "Maven", color: "#c71a36" },
  { name: "Microservices", color: "#6366f1" },
  { name: "REST APIs", color: "#0ea5e9" },
  { name: "Design Patterns", color: "#8b5cf6" },
  { name: "DSA", color: "#ec4899" },
];

const SkillPill = ({ name, color }: { name: string; color: string }) => (
  <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] whitespace-nowrap">
    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-[var(--text-primary)] font-medium">{name}</span>
  </div>
);

const InfiniteCarousel = ({ 
  skills, 
  direction = "left",
  speed = 25 
}: { 
  skills: typeof row1Skills; 
  direction?: "left" | "right";
  speed?: number;
}) => {
  const duplicatedSkills = [...skills, ...skills, ...skills];
  
  return (
    <div className="relative overflow-hidden py-3">
      {/* Gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10" />

      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"],
        }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <SkillPill key={`${skill.name}-${index}`} {...skill} />
        ))}
      </motion.div>
    </div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Vertical SKILLS text on left */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-20">
        <div className="w-[2px] h-16 bg-[var(--text-primary)]" />
        <span
          className="text-[var(--text-primary)] text-sm font-semibold tracking-widest"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          SKILLS
        </span>
        <div className="w-[2px] h-16 bg-[var(--text-primary)]/30" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Technical Arsenal
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Technologies I work with
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Carousels */}
      <div className="space-y-4">
        <InfiniteCarousel skills={row1Skills} direction="left" speed={30} />
        <InfiniteCarousel skills={row2Skills} direction="right" speed={35} />
        <InfiniteCarousel skills={row3Skills} direction="left" speed={28} />
      </div>
    </section>
  );
}
