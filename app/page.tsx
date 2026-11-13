"use client";

import { motion } from "framer-motion";
import CloudSky from "@/components/originkit/ui/cloud-sky";
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
      {/* Official Originkit Cloud Sky Component (Soft, Faded Ethereal Blue) */}
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <CloudSky
          background="#91bcee"
          baseColor="#edf5fc"
          accentColor="#FFFFFF"
          clouds={{
            cirrus: 85,
            shadow: 45,
            softness: 220,
          }}
          pointer={{
            wind: 160,
            damping: 50,
            parallax: 180,
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            minWidth: 0,
            minHeight: 0,
          }}
        />
        {/* Soft atmospheric fade wash for calm, faded luxury sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/35 pointer-events-none" />
      </div>

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
