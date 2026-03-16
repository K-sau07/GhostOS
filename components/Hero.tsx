"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronRight, Download } from "lucide-react";
import { useTheme } from "next-themes";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const springConfig = { damping: 20, stiffness: 150 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      x.set(newX);
      y.set(newY);
      setCirclePos({ x: newX, y: newY });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 lg:px-20"
    >

      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1"
        >
          {/* Name container with hover effect */}
          <div
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className="relative cursor-pointer mb-6"
            style={{ width: 'fit-content' }}
          >
            {/* Main visible name */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-primary)] italic whitespace-nowrap select-none">
              Saurabh Kashyap
            </h1>
            
            {/* SVG mask layer for reveal effect */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <clipPath id="circleClip">
                  <circle
                    cx={isHovered ? circlePos.x : -1000}
                    cy={isHovered ? circlePos.y : -1000}
                    r={isHovered ? 110 : 0}
                  />
                </clipPath>
              </defs>

              {/* Circle background */}
              <motion.circle
                cx={circlePos.x}
                cy={circlePos.y}
                r={isHovered ? 110 : 0}
                fill={theme === "dark" ? "#f5f0e8" : "#1a1225"}
                initial={{ r: 0 }}
                animate={{ r: isHovered ? 110 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              
              {/* Hidden text revealed by circle */}
              <text
                x="0"
                y="45%"
                className="text-5xl md:text-6xl lg:text-7xl font-bold italic"
                fill={theme === "dark" ? "#0c0612" : "#f5f0e8"}
                clipPath="url(#circleClip)"
                style={{ fontFamily: 'inherit', fontSize: 'clamp(3rem, 5vw, 4.5rem)', opacity: isHovered ? 1 : 0 }}
              >
                Hello there ;))))))
              </text>
            </svg>
          </div>

          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-lg mb-8 leading-relaxed">
            A software engineer blending creativity and code to build impactful user experiences.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-color)] bg-transparent text-[var(--text-primary)] hover:border-[var(--accent)] transition-all duration-300"
            >
              <ChevronRight size={18} className="text-[var(--text-secondary)]" />
              <span>Contact Me</span>
            </a>

            <a
              href="/resume.pdf"
              download
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border-color)] bg-transparent text-[var(--text-primary)] hover:border-[var(--accent)] transition-all duration-300"
            >
              <Download size={18} className="text-[var(--text-secondary)]" />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>

        {/* Right Content - Three Characters */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 flex justify-center lg:justify-end"
        >
          <div className="relative w-[420px] h-[320px]">
            {/* Character 1 - Deep Blue */}
            <motion.div
              initial={{ y: 30, opacity: 0, rotate: -8 }}
              animate={{ y: 0, opacity: 1, rotate: -8 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute left-0 top-8 w-[150px] h-[190px] bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-[2rem] flex flex-col items-center justify-center shadow-2xl"
            >
              <div className="absolute -top-2 w-[90px] h-[20px] border-4 border-[#0f172a] rounded-t-full" />
              <div className="absolute top-2 left-4 w-5 h-8 bg-[#0f172a] rounded-lg" />
              <div className="absolute top-2 right-4 w-5 h-8 bg-[#0f172a] rounded-lg" />
              <div className="flex gap-5 mb-4 mt-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#0f172a] rounded-full" />
                </div>
                <div className="w-8 h-2 bg-white rounded-full mt-3" />
              </div>
              <div className="w-10 h-5 border-b-4 border-white rounded-b-full" />
            </motion.div>

            {/* Character 2 - Teal */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute left-[100px] top-6 w-[170px] h-[220px] bg-gradient-to-br from-[#0d9488] to-[#2dd4bf] rounded-[2.5rem] flex flex-col items-center justify-center shadow-2xl z-10"
            >
              <div className="absolute top-[70px] flex items-center">
                <div className="w-10 h-10 border-4 border-[#134e4a] rounded-full bg-white/20" />
                <div className="w-4 h-1 bg-[#134e4a]" />
                <div className="w-10 h-10 border-4 border-[#134e4a] rounded-full bg-white/20" />
              </div>
              <div className="flex gap-6 mb-3 mt-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-[#134e4a] rounded-full" />
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-[#134e4a] rounded-full" />
                </div>
              </div>
              <div className="w-8 h-10 bg-white rounded-full" />
            </motion.div>

            {/* Character 3 - Cyan */}
            <motion.div
              initial={{ y: 30, opacity: 0, rotate: 6 }}
              animate={{ y: 0, opacity: 1, rotate: 6 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute right-0 top-12 w-[155px] h-[200px] bg-gradient-to-br from-[#06b6d4] to-[#a5f3fc] rounded-[2rem] flex flex-col items-center justify-center shadow-2xl"
            >
              <div className="absolute -top-4 -right-2 text-2xl font-mono text-[#164e63] font-bold">&lt;/&gt;</div>
              <div className="flex gap-5 mb-4">
                <div className="w-9 h-5 bg-white rounded-full flex items-end justify-center overflow-hidden">
                  <div className="w-5 h-5 bg-[#164e63] rounded-full -mb-2" />
                </div>
                <div className="w-9 h-5 bg-white rounded-full flex items-end justify-center overflow-hidden">
                  <div className="w-5 h-5 bg-[#164e63] rounded-full -mb-2" />
                </div>
              </div>
              <div className="w-8 h-4 border-b-4 border-white rounded-b-full" />
              <div className="absolute -top-2 right-8 text-white/60 font-bold text-sm">z</div>
              <div className="absolute -top-6 right-4 text-white/40 font-bold text-xs">z</div>
            </motion.div>

            {/* Floating particles */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-[180px] w-3 h-3 bg-[#3b82f6] rounded-full opacity-60"
            />
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-10 right-[80px] w-2 h-2 bg-[#2dd4bf] rounded-full opacity-60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
