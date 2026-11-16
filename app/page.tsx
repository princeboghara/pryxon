"use client";

import { motion } from "framer-motion";
import CloudSky from "@/components/originkit/ui/cloud-sky";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Pricing from "@/components/sections/Pricing";
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
      {/* Official Originkit Cloud Sky Component (Hero Sky Backdrop with Smooth Bottom Dissolve) */}
      <div
        className="absolute top-0 left-0 w-full h-[105vh] min-h-[760px] max-h-[980px] pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <CloudSky
          background="#3894f6"
          baseColor="#b8defc"
          accentColor="#FFFFFF"
          clouds={{
            cirrus: 80,
            shadow: 50,
            softness: 210,
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
        {/* Soft atmospheric gradient blend into scene background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-65% to-[#eaf4fc] pointer-events-none" />
      </div>

      {/* Floating Glassmorphic Topbar Navigation */}
      <Navbar />

      {/* Page Content Sections */}
      <main className="relative z-10">
        <Hero />
        <Services />
        <FeaturedWork />
        <Pricing />
        <Contact />
      </main>

      {/* Monumental Footer */}
      <Footer />
    </motion.div>
  );
}
