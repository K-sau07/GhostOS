"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 lg:px-20 relative">
      {/* Vertical ABOUT text on left */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-[2px] h-16 bg-[#f5f0e8]" />
        <span
          className="text-[#f5f0e8] text-sm font-semibold tracking-widest"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          ABOUT
        </span>
        <div className="w-[2px] h-16 bg-[#f5f0e8]/30" />
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Profile Picture with Pop Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8, 
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            viewport={{ once: true }}
            className="relative flex-shrink-0"
          >

            {/* Decorative rings */}
            <motion.div 
              className="absolute -inset-4 rounded-full border-2 border-[#3d2f4a]/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -inset-8 rounded-full border border-[#3d2f4a]/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Glowing background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 blur-2xl" />
            
            {/* Image container */}
            <motion.div 
              className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-[#2a2035] shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/me.jpg"
                alt="Saurabh Kashyap"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6"
          >

            <p className="text-lg md:text-xl text-[#9a8c98] leading-relaxed">
              I&apos;m a Software Engineer with a strong foundation in Java development and microservices architecture. 
              With over 2 years of industry experience, I&apos;ve successfully optimized system performance by 40% and 
              contributed to scalable applications serving thousands of users daily.
            </p>
            <p className="text-lg md:text-xl text-[#9a8c98] leading-relaxed">
              Currently pursuing my Master&apos;s in Software Engineering Systems at Northeastern University (GPA: 3.9/4.0), 
              I&apos;m passionate about cloud infrastructure, system design, and building robust backend solutions.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-xl bg-[#1a1225]/40 border border-[#2a2035]/50"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#f5f0e8]">2+</div>
                <div className="text-xs text-[#9a8c98] mt-1">Years Exp</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-xl bg-[#1a1225]/40 border border-[#2a2035]/50"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#f5f0e8]">40%</div>
                <div className="text-xs text-[#9a8c98] mt-1">Perf Boost</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-xl bg-[#1a1225]/40 border border-[#2a2035]/50"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#f5f0e8]">3.9</div>
                <div className="text-xs text-[#9a8c98] mt-1">GPA at NEU</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true }}
                className="text-center p-4 rounded-xl bg-[#1a1225]/40 border border-[#2a2035]/50"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#f5f0e8]">5+</div>
                <div className="text-xs text-[#9a8c98] mt-1">Projects</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
