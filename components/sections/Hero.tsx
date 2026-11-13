"use client";

import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

const allTechIcons = [
  // Upper Left Flank
  { pos: "pos-1", title: "React", icon: "/assets/icons/react.svg", depth: 1.4, speed: 1.0, phase: 0.5 },
  { pos: "pos-2", title: "Next.js", icon: "/assets/icons/nextjs.svg", depth: 1.2, speed: 1.15, phase: 2.8 },
  { pos: "pos-3", title: "Render", icon: "/assets/icons/render.svg", depth: 1.5, speed: 0.95, phase: 1.4 },
  { pos: "pos-4", title: "Python", icon: "/assets/icons/python.svg", depth: 1.25, speed: 1.05, phase: 4.2 },
  { pos: "pos-5", title: "Node.js", icon: "/assets/icons/nodejs.svg", depth: 1.35, speed: 1.1, phase: 3.1 },

  // Mid Left Wing
  { pos: "pos-6", title: "PostgreSQL", icon: "/assets/icons/postgresql.svg", depth: 1.3, speed: 0.9, phase: 5.3 },
  { pos: "pos-7", title: "Tailwind CSS", icon: "/assets/icons/tailwindcss.svg", depth: 1.4, speed: 1.2, phase: 1.8 },
  { pos: "pos-8", title: "Vercel", icon: "/assets/icons/vercel.svg", depth: 1.15, speed: 1.0, phase: 3.9 },
  { pos: "pos-9", title: "FastAPI", icon: "/assets/icons/fastapi.svg", depth: 1.45, speed: 0.85, phase: 0.9 },

  // Lower Left to Center
  { pos: "pos-10", title: "Supabase", icon: "/assets/icons/supabase.svg", depth: 1.2, speed: 1.15, phase: 4.6 },
  { pos: "pos-11", title: "MongoDB", icon: "/assets/icons/mongodb.svg", depth: 1.35, speed: 0.95, phase: 2.3 },
  { pos: "pos-12", title: "Render", icon: "/assets/icons/render.svg", depth: 1.1, speed: 1.25, phase: 3.5 },
  { pos: "pos-13", title: "Next.js", icon: "/assets/icons/nextjs.svg", depth: 1.25, speed: 0.9, phase: 1.2 },
  { pos: "pos-14", title: "React", icon: "/assets/icons/react.svg", depth: 1.05, speed: 1.1, phase: 5.1 },

  // Upper Right Flank
  { pos: "pos-15", title: "Node.js", icon: "/assets/icons/nodejs.svg", depth: 1.4, speed: 1.05, phase: 1.0 },
  { pos: "pos-16", title: "Python", icon: "/assets/icons/python.svg", depth: 1.2, speed: 1.15, phase: 3.4 },
  { pos: "pos-17", title: "React", icon: "/assets/icons/react.svg", depth: 1.45, speed: 0.9, phase: 2.1 },
  { pos: "pos-18", title: "PostgreSQL", icon: "/assets/icons/postgresql.svg", depth: 1.3, speed: 1.1, phase: 4.8 },
  { pos: "pos-19", title: "Next.js", icon: "/assets/icons/nextjs.svg", depth: 1.35, speed: 1.2, phase: 0.7 },

  // Mid Right Wing
  { pos: "pos-20", title: "FastAPI", icon: "/assets/icons/fastapi.svg", depth: 1.2, speed: 0.95, phase: 3.2 },
  { pos: "pos-21", title: "Supabase", icon: "/assets/icons/supabase.svg", depth: 1.4, speed: 1.1, phase: 2.5 },
  { pos: "pos-22", title: "Tailwind CSS", icon: "/assets/icons/tailwindcss.svg", depth: 1.15, speed: 1.25, phase: 4.1 },
  { pos: "pos-23", title: "Vercel", icon: "/assets/icons/vercel.svg", depth: 1.45, speed: 1.0, phase: 1.6 },

  // Lower Right to Center
  { pos: "pos-24", title: "Angular", icon: "/assets/icons/angular.svg", depth: 1.25, speed: 0.9, phase: 5.0 },
  { pos: "pos-25", title: ".NET", icon: "/assets/icons/dotnet.svg", depth: 1.3, speed: 1.15, phase: 2.7 },
  { pos: "pos-26", title: "HTML5", icon: "/assets/icons/html5.svg", depth: 1.1, speed: 1.0, phase: 0.8 },
  { pos: "pos-27", title: "SQL", icon: "/assets/icons/mysql.svg", depth: 1.2, speed: 1.2, phase: 3.7 },
  { pos: "pos-28", title: "PHP", icon: "/assets/icons/php.svg", depth: 1.05, speed: 0.9, phase: 1.9 },
];

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      {/* 3D Floating Liquid Glass Tech Badges (All 28 Icons, Desktop & Mobile U-Shape) */}
      <div className="floating-tech-container" id="floatingTechContainer" aria-hidden="true">
        {allTechIcons.map((item, idx) => (
          <motion.div
            key={item.pos}
            className={`tech-card-3d ${item.pos}`}
            title={item.title}
            data-depth={item.depth}
            data-speed={item.speed}
            data-phase={item.phase}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -16, 0],
              x: [0, idx % 2 === 0 ? 8 : -8, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: idx * 0.02 },
              scale: { duration: 0.8, delay: idx * 0.02 },
              y: {
                duration: 5.2 + (idx % 4) * 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: (item.phase % 2) * 0.6,
              },
              x: {
                duration: 6.0 + (idx % 3) * 0.7,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: (item.phase % 3) * 0.5,
              },
            }}
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={24}
              height={24}
              className="tech-icon-img"
            />
          </motion.div>
        ))}
      </div>

      {/* Centered Hero Content */}
      <div className="hero-container">
        <div className="hero-centered-content">
          {/* Main Heading */}
          <motion.h1
            className="hero-heading"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-heading-lead">Turning Bold Ideas Into</span>
            <span className="gradient-text">Powerful Digital Solutions.</span>
          </motion.h1>

          {/* Value Description */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            We engineer next-generation websites, custom software, and innovative
            technology solutions that empower businesses to compete, innovate, and grow globally.
          </motion.p>

          {/* Centered Action Buttons (Bespoke Midnight Obsidian & Frosted Glass Pills) */}
          <motion.div
            className="hero-action-group"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="#contact" className="btn btn-hero-primary">
              <span>Start Your Project</span>
              <span className="btn-arrow-badge">
                <svg className="arrow-svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>

            <Link href="#services" className="btn btn-hero-secondary">
              <span className="btn-play-badge">
                <Play className="w-2.5 h-2.5 fill-current" />
              </span>
              <span>Explore Capabilities</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
