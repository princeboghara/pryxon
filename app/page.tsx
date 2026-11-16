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
    <div className="relative min-h-screen text-slate-900 overflow-x-hidden selection:bg-blue-500/20">
      {/* Official Originkit Cloud Sky Component (Rich Vibrant Sky with Dreamy Dissolve - No Separation) */}
      <div
        className="absolute top-0 left-0 w-full h-[125vh] min-h-[920px] pointer-events-none z-0 overflow-hidden"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 45%, rgba(0,0,0,0.68) 72%, rgba(0,0,0,0.2) 88%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 45%, rgba(0,0,0,0.68) 72%, rgba(0,0,0,0.2) 88%, rgba(0,0,0,0) 100%)",
        }}
        aria-hidden="true"
      >
        <CloudSky
          background="#4fa5f8"
          baseColor="#bde1fc"
          accentColor="#FFFFFF"
          clouds={{
            cirrus: 75,
            shadow: 35,
            softness: 230,
          }}
          pointer={{
            wind: 140,
            damping: 50,
            parallax: 160,
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
      </div>

      {/* Floating Glassmorphic Topbar Navigation */}
      <Navbar />

      {/* Page Content Sections with Atmospheric Light Sky + Crisp White Ambient Gradients */}
      <main className="relative z-10">
        {/* Soft Ambient Sky + Cloud Gradients (Zero GPU overhead, pure CSS radial gradients placed below Hero) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
          {/* Services Section Sky Bloom */}
          <div
            className="absolute top-[1250px] -left-[10%] w-[900px] h-[850px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(186, 230, 253, 0.45) 0%, rgba(224, 242, 254, 0.20) 45%, transparent 70%)",
            }}
          />
          {/* Portfolio Section Sky & White Luster */}
          <div
            className="absolute top-[2150px] -right-[12%] w-[1000px] h-[950px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(199, 210, 254, 0.35) 0%, rgba(186, 230, 253, 0.25) 50%, transparent 70%)",
            }}
          />
          {/* Pricing Section Sky Aura */}
          <div
            className="absolute top-[3150px] -left-[8%] w-[950px] h-[850px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(186, 230, 253, 0.40) 0%, rgba(224, 242, 254, 0.20) 48%, transparent 70%)",
            }}
          />
          {/* Contact Section Sky Glow */}
          <div
            className="absolute bottom-[250px] right-[2%] w-[850px] h-[750px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(186, 230, 253, 0.45) 0%, rgba(219, 234, 254, 0.25) 50%, transparent 70%)",
            }}
          />
        </div>

        <Hero />
        <Services />
        <FeaturedWork />
        <Pricing />
        <Contact />
      </main>

      {/* Monumental Footer */}
      <Footer />
    </div>
  );
}
