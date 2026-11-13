"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    id: "web-dev",
    tag: "Web Platforms",
    title: "Web Development",
    desc: "Ultra-fast, responsive web platforms built with Next.js & TypeScript. Engineered for 99+ speed scores and effortless conversions.",
    image: "/assets/images/services/service-web-dashboard-light.jpg",
    pills: ["Next.js", "React", "TypeScript", "High Speed"],
    linkText: "Explore Web Solutions",
  },
  {
    id: "ecommerce",
    tag: "Online Stores",
    title: "E-Commerce Development",
    desc: "High-conversion digital storefronts with instant checkout flows, secure payment gateways, inventory management, and fast shopping.",
    image: "/assets/images/services/service-ecommerce-light.jpg",
    pills: ["Shopify", "Custom Stores", "Stripe & UPI", "+48% Sales"],
    linkText: "Explore E-Commerce",
  },
  {
    id: "mobile-app",
    tag: "iOS & Android",
    title: "Mobile App Development",
    desc: "Sleek iOS and Android applications with silky 60/120 FPS gestures, offline syncing, real-time push alerts, and biometric security.",
    image: "/assets/images/services/service-mobile-app.jpg",
    pills: ["React Native", "Flutter", "iOS & Android", "Offline Sync"],
    linkText: "Explore Mobile Apps",
  },
  {
    id: "custom-software",
    tag: "Enterprise Systems",
    title: "Custom Software Solutions",
    desc: "Bespoke enterprise cloud portals, microservices, and automated internal tools engineered with 99.99% uptime and high security.",
    image: "/assets/images/services/service-custom-software.jpg",
    pills: ["Cloud DB", "Microservices", "Docker / K8s", "High Scale"],
    linkText: "Explore Custom Software",
  },
  {
    id: "whatsapp-crm",
    tag: "Instant Sales Bot",
    title: "WhatsApp CRM & Lead",
    desc: "Turn WhatsApp into a 24/7 lead generation engine. 0.2s auto-replies, verified business messaging, auto-followups, and live CRM sync.",
    image: "/assets/images/services/service-whatsapp-crm.jpg",
    pills: ["Meta API", "Smart Chatbot", "Auto Leads", "CRM Pipeline"],
    linkText: "Explore WhatsApp CRM",
  },
  {
    id: "ai-automation",
    tag: "Autonomous Agents",
    title: "AI Automations",
    desc: "Autonomous AI workflows and custom LLM agents that run 24/7. Auto-qualify leads, extract documents, and save 18+ hours every week.",
    image: "/assets/images/services/service-ai-automation.jpg",
    pills: ["GPT-4o & Claude", "AI Agents", "Task Auto", "Zero Error"],
    linkText: "Explore AI Automations",
  },
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="services" className="relative py-20 px-4 sm:px-6 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="default" className="mb-3 px-3.5 py-1">
            Capabilities
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            What We Build.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Next-generation websites, bespoke software, and automated digital solutions built for scale.
          </p>
        </div>

        {/* 3D Coverflow Container (Circular Infinite Loop) */}
        <div className="relative w-full max-w-4xl mx-auto min-h-[580px] sm:min-h-[540px] flex items-center justify-center">
          {/* Side Navigation Arrow Buttons (Outside card zone, zero overlap) */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous service"
            className="hidden sm:flex absolute -left-2 md:-left-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full items-center justify-center bg-white/95 hover:bg-white text-slate-800 shadow-lg border border-slate-200/80 transition-all hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next service"
            className="hidden sm:flex absolute -right-2 md:-right-8 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full items-center justify-center bg-white/95 hover:bg-white text-slate-800 shadow-lg border border-slate-200/80 transition-all hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="relative w-full h-[540px] flex items-center justify-center">
            {services.map((service, index) => {
              // Circular continuous infinite wrap
              const len = services.length;
              let offset = (index - currentIndex) % len;
              if (offset > len / 2) offset -= len;
              if (offset < -len / 2) offset += len;

              const absOffset = Math.abs(offset);
              const isVisible = absOffset <= 2;

              if (!isVisible) return null;

              // 3D positioning transform
              const xTranslate = offset * 220;
              const zTranslate = -absOffset * 140;
              const rotateY = offset * -18;
              const scale = 1 - absOffset * 0.12;
              const opacity = 1 - absOffset * 0.28;
              const zIndex = 30 - absOffset * 10;

              return (
                <motion.div
                  key={service.id}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -40) nextSlide();
                    else if (info.offset.x > 40) prevSlide();
                  }}
                  animate={{
                    x: xTranslate,
                    z: zTranslate,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 25 }}
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => setCurrentIndex(index)}
                  className={`absolute w-full max-w-[360px] sm:max-w-[420px] rounded-3xl glass-panel p-6 sm:p-7 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.12)] cursor-pointer select-none border border-slate-200/90 ${
                    offset === 0 ? "ring-2 ring-blue-500/20 shadow-2xl" : "hover:opacity-90"
                  }`}
                >
                  {/* Card Media Preview */}
                  <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-slate-200/70 shadow-inner">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 420px"
                    />
                  </div>

                  {/* Card Meta Tag */}
                  <div className="mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50/90 px-2.5 py-0.5 rounded-md border border-blue-100">
                      {service.tag}
                    </span>
                  </div>

                  {/* Card Title & Desc */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {service.desc}
                  </p>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.pills.map((pill) => (
                      <span
                        key={pill}
                        className="text-[11px] font-medium text-slate-700 bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200/60"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>

                  {/* CTA Link */}
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors group"
                  >
                    <span>{service.linkText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Explore Button Styled Like Get Started */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Link href="#contact" className="btn-get-started shadow-lg hover:shadow-xl transition-all">
            <span>Explore All Capabilities</span>
            <span className="btn-arrow-badge">
              <svg className="arrow-svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
