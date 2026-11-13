"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const projects = [
  {
    id: "dnora",
    name: "DNORA",
    domain: "dnora.in",
    url: "https://dnora.in",
    image: "/assets/images/projects/project-dnora.jpg",
    tags: ["E-Commerce", "Luxury Handbags"],
    desc: "High-end digital storefront for handcrafted bridal clutches, evening purses, and designer leather goods. Engineered with streamlined checkout, interactive collections, and fast mobile shopping.",
    pills: ["Next.js / Storefront", "Payment Gateway", "High Conversion", "99+ Speed"],
  },
  {
    id: "aviraglobal",
    name: "Avira Global",
    domain: "aviraglobal.in",
    url: "https://aviraglobal.in",
    image: "/assets/images/projects/project-aviraglobal.jpg",
    tags: ["D2C Wellness", "Healthcare"],
    desc: "Comprehensive Ayurvedic wellness and herbal healthcare D2C platform. Features an extensive multi-category product catalog, member portal, instant checkout, and automated fulfillment sync.",
    pills: ["E-Commerce Platform", "Member Portal", "Razorpay & UPI", "CRM Sync"],
  },
  {
    id: "diraa",
    name: "Diraa Engine",
    domain: "diraa.onrender.com",
    url: "https://diraa.onrender.com",
    image: "/assets/images/projects/project-diraa.jpg",
    tags: ["Cloud Engine", "Microservices"],
    desc: "High-availability cloud microservices and backend API engine hosted on Render. Ultra-low latency routing, automated security gateways, and 99.99% operational reliability.",
    pills: ["Render Cloud", "Microservices API", "FastAPI / Node", "99.99% Uptime"],
  },
];

export default function FeaturedWork() {
  return (
    <section id="work" className="relative py-20 px-4 sm:px-6 overflow-hidden">
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
            Portfolio
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            Featured Client Work.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Real-world e-commerce storefronts, high-growth brand platforms, and scalable cloud architectures engineered by Pryxon Studio.
          </p>
        </div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden rounded-3xl border border-slate-200/90 glass-panel hover:shadow-[0_16px_40px_-8px_rgba(15,23,42,0.12)] hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Project Visual Media with hover action */}
              <div className="relative w-full h-52 sm:h-56 bg-slate-100 overflow-hidden border-b border-slate-200/70">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg backdrop-blur-md hover:bg-white transition-all transform scale-95 group-hover:scale-100"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-bold text-slate-700 bg-slate-100/90 px-2.5 py-0.5 rounded-md border border-slate-200/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-sm"
                  >
                    <span>{project.domain}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2">
                  {project.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
                  {project.desc}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {project.pills.map((pill) => (
                    <span
                      key={pill}
                      className="text-[11px] font-medium text-slate-600 bg-slate-100/80 px-2.5 py-0.5 rounded-md"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Explore Button Styled Like Get Started */}
        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Link href="#contact" className="btn-get-started shadow-lg hover:shadow-xl transition-all">
            <span>Explore All Projects</span>
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
