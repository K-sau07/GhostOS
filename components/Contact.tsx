"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 lg:px-20 relative">
      {/* Vertical CONTACT text on right */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <div className="w-[2px] h-16 bg-[#f5f0e8]" />
        <span
          className="text-[#f5f0e8] text-sm font-semibold tracking-widest"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          CONTACT
        </span>
        <div className="w-[2px] h-16 bg-[#f5f0e8]/30" />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#f5f0e8] mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-[#9a8c98] text-lg">
            Ready to bring your backend ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <a
              href="mailto:saurabhkashyapworkplace@gmail.com"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#1a1225]/30 border border-[#2a2035]/50 hover:border-[#3d2f4a] transition-all"
            >
              <div className="p-3 rounded-full bg-[#2a2035]">
                <Mail size={20} className="text-[#f5f0e8]" />
              </div>
              <div>
                <p className="text-sm text-[#9a8c98]">Email</p>
                <p className="text-[#f5f0e8]">saurabhkashyapworkplace@gmail.com</p>
              </div>
            </a>

            <a
              href="tel:+18575406565"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#1a1225]/30 border border-[#2a2035]/50 hover:border-[#3d2f4a] transition-all"
            >
              <div className="p-3 rounded-full bg-[#2a2035]">
                <Phone size={20} className="text-[#f5f0e8]" />
              </div>
              <div>
                <p className="text-sm text-[#9a8c98]">Phone</p>
                <p className="text-[#f5f0e8]">+1 (857) 540-6565</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#1a1225]/30 border border-[#2a2035]/50">
              <div className="p-3 rounded-full bg-[#2a2035]">
                <MapPin size={20} className="text-[#f5f0e8]" />
              </div>
              <div>
                <p className="text-sm text-[#9a8c98]">Location</p>
                <p className="text-[#f5f0e8]">Boston, MA</p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <a
              href="https://www.linkedin.com/in/saurabh-kashyap-b5a4ab22a/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#1a1225]/30 border border-[#2a2035]/50 hover:border-[#3d2f4a] transition-all"
            >
              <div className="p-3 rounded-full bg-[#2a2035]">
                <Linkedin size={20} className="text-[#f5f0e8]" />
              </div>
              <div>
                <p className="text-sm text-[#9a8c98]">LinkedIn</p>
                <p className="text-[#f5f0e8]">saurabh-kashyap</p>
              </div>
            </a>

            <a
              href="https://github.com/K-sau07"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#1a1225]/30 border border-[#2a2035]/50 hover:border-[#3d2f4a] transition-all"
            >
              <div className="p-3 rounded-full bg-[#2a2035]">
                <Github size={20} className="text-[#f5f0e8]" />
              </div>
              <div>
                <p className="text-sm text-[#9a8c98]">GitHub</p>
                <p className="text-[#f5f0e8]">K-sau07</p>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
