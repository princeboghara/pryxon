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
      {/* Official Originkit Cloud Sky Component */}
      <div
        className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <CloudSky
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            minWidth: 0,
            minHeight: 0,
          }}
        />
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
