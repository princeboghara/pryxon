"use client";

import { motion } from "framer-motion";
import AtmosphericSky from "@/components/canvas/AtmosphericSky";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedWork from "@/components/sections/FeaturedWork";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen text-slate-900 overflow-x-hidden selection:bg-blue-500/20"
    >
      {/* 3D Hardware-Accelerated Procedural Cloud Sky */}
      <AtmosphericSky />

      {/* Floating Glassmorphic Topbar Navigation */}
      <Navbar />

      {/* Page Content Sections */}
      <main className="relative z-10">
        <Hero />
        <Services />
        <FeaturedWork />
        <About />
        <Contact />
      </main>

      {/* Monumental Footer */}
      <Footer />
    </motion.div>
  );
}
