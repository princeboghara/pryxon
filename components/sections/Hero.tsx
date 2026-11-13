"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const floatingIcons = [
  { name: "React", icon: "/assets/icons/react.svg", top: "18%", left: "6%", size: 48, delay: 0 },
  { name: "Next.js", icon: "/assets/icons/nextjs.svg", top: "25%", left: "16%", size: 42, delay: 0.4 },
  { name: "TypeScript", icon: "/assets/icons/typescript.svg", top: "38%", left: "8%", size: 46, delay: 0.8 },
  { name: "Python", icon: "/assets/icons/python.svg", top: "52%", left: "5%", size: 44, delay: 1.2 },
  { name: "Node.js", icon: "/assets/icons/nodejs.svg", top: "68%", left: "14%", size: 46, delay: 0.6 },
  { name: "PostgreSQL", icon: "/assets/icons/postgresql.svg", top: "58%", left: "24%", size: 40, delay: 1.6 },
  { name: "Tailwind", icon: "/assets/icons/tailwindcss.svg", top: "82%", left: "18%", size: 42, delay: 0.2 },
  
  // Right Flank
  { name: "Supabase", icon: "/assets/icons/supabase.svg", top: "22%", right: "8%", size: 46, delay: 0.3 },
  { name: "MongoDB", icon: "/assets/icons/mongodb.svg", top: "34%", right: "18%", size: 44, delay: 0.9 },
  { name: "FastAPI", icon: "/assets/icons/fastapi.svg", top: "48%", right: "7%", size: 44, delay: 1.4 },
  { name: "Render", icon: "/assets/icons/render.svg", top: "62%", right: "15%", size: 42, delay: 0.5 },
  { name: "Angular", icon: "/assets/icons/angular.svg", top: "75%", right: "24%", size: 40, delay: 1.1 },
  { name: "Vercel", icon: "/assets/icons/vercel.svg", top: "82%", right: "10%", size: 44, delay: 0.7 },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Floating 3D Tech Icons (Hardware-accelerated Framer Motion, zero main-thread lag) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block overflow-hidden" aria-hidden="true">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -14, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: item.delay },
              scale: { duration: 0.8, delay: item.delay },
              y: {
                duration: 4.5 + (idx % 3),
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: item.delay,
              },
            }}
            style={{
              position: "absolute",
              top: item.top,
              left: item.left,
              right: item.right,
              width: item.size,
              height: item.size,
            }}
            className="rounded-2xl glass-panel p-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] flex items-center justify-center hover:scale-110 transition-transform duration-300 pointer-events-auto cursor-pointer"
            title={item.name}
          >
            <div className="relative w-full h-full">
              <Image
                src={item.icon}
                alt={item.name}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hero Content Center Stack */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Luminous Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.08] sm:leading-[1.1] mb-6"
        >
          Turning Bold Ideas Into{" "}
          <span className="bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800 bg-clip-text text-transparent">
            Powerful Digital Solutions.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
        >
          We engineer next-generation websites, custom software, and innovative
          technology solutions that empower businesses to compete, innovate, and
          grow globally.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-12.5 px-8 rounded-2xl text-base shadow-xl"
          >
            <Link href="#contact" className="flex items-center gap-3">
              <span>Start Your Project</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </Link>
          </Button>

          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto h-12.5 px-7 rounded-2xl text-base"
          >
            <Link href="#services" className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-slate-900/5 flex items-center justify-center">
                <Play className="w-3 h-3 text-slate-800 fill-slate-800" />
              </span>
              <span>Explore Capabilities</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
