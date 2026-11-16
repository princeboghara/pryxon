"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ProjectItem {
  id: string;
  name: string;
  hasLiveUrl: boolean;
  domain?: string;
  url?: string;
  category: "all" | "ecommerce" | "fintech" | "saas" | "cloud-mobile";
  categoryLabel: string;
  image: string;
  metric: string;
  statusBadge: string;
  desc: string;
  tags: string[];
  pills: string[];
}

const projects: ProjectItem[] = [
  {
    id: "dnora",
    name: "DNORA Luxury Storefront",
    hasLiveUrl: true,
    domain: "dnora.in",
    url: "https://dnora.in",
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    image: "/assets/images/projects/project-dnora.jpg",
    metric: "₹1.4 Cr+ Annual GMV",
    statusBadge: "Live Production",
    tags: ["E-Commerce", "Luxury Handbags"],
    desc: "High-end digital storefront for handcrafted bridal clutches, evening purses, and designer leather goods. Engineered with streamlined checkout, interactive collections, and fast mobile shopping.",
    pills: ["Next.js / Storefront", "Razorpay 1-Click", "High Conversion", "99+ Mobile Speed"],
  },
  {
    id: "aviraglobal",
    name: "Avira Global Wellness",
    hasLiveUrl: true,
    domain: "aviraglobal.in",
    url: "https://aviraglobal.in",
    category: "ecommerce",
    categoryLabel: "D2C Brand",
    image: "/assets/images/projects/project-aviraglobal.jpg",
    metric: "120k+ Active Orders",
    statusBadge: "Live Production",
    tags: ["D2C Wellness", "Healthcare"],
    desc: "Comprehensive Ayurvedic wellness and herbal healthcare D2C platform. Features an extensive multi-category product catalog, member portal, instant checkout, and automated fulfillment sync.",
    pills: ["E-Commerce Platform", "Member Portal", "Razorpay & UPI", "Automated CRM Sync"],
  },
  {
    id: "diraa",
    name: "Diraa Cloud Engine",
    hasLiveUrl: true,
    domain: "diraa.onrender.com",
    url: "https://diraa.onrender.com",
    category: "cloud-mobile",
    categoryLabel: "Cloud & DevOps",
    image: "/assets/images/projects/project-diraa.jpg",
    metric: "18M+ Monthly Requests",
    statusBadge: "99.99% Uptime",
    tags: ["Cloud Engine", "Microservices"],
    desc: "High-availability cloud microservices and backend API engine hosted on Render. Ultra-low latency routing, automated security gateways, and 99.99% operational reliability.",
    pills: ["Render Cloud", "Microservices API", "FastAPI / Node", "Sub-20ms Latency"],
  },
  {
    id: "kurapay",
    name: "Kura Pay Settlement Gateway",
    hasLiveUrl: true,
    domain: "kurapay.io",
    url: "https://kurapay.io",
    category: "fintech",
    categoryLabel: "Fintech & Payments",
    image: "/assets/images/projects/project-kurapay.jpg",
    metric: "₹45 Cr+ Settled",
    statusBadge: "Multi-Tenant B2B",
    tags: ["Fintech", "Payment Engine"],
    desc: "Next-gen B2B merchant payment reconciliation and instant payout settlement engine. Equipped with bank webhook retries, multi-tenant merchant portals, and automated dispute resolution.",
    pills: ["Node Microservices", "Instant UPI / NEFT", "Bank Webhooks", "Zero Reconciliation Lag"],
  },
  {
    id: "nexflow",
    name: "NexFlow Enterprise HRMS",
    hasLiveUrl: false,
    category: "saas",
    categoryLabel: "Enterprise SaaS",
    image: "/assets/images/projects/project-nexflow.jpg",
    metric: "8,500+ Active Employees",
    statusBadge: "Enterprise Core",
    tags: ["HR Tech", "Enterprise SaaS"],
    desc: "All-in-one workforce operations suite featuring automated Indian tax & PF payroll calculation, biometric attendance sync, leaves management, and employee self-service portal.",
    pills: ["Next.js 15", "PostgreSQL", "Statutory Compliance", "Automated Payslips"],
  },
  {
    id: "pulsedesk",
    name: "PulseDesk CRM & Support",
    hasLiveUrl: false,
    category: "saas",
    categoryLabel: "Enterprise SaaS",
    image: "/assets/images/projects/project-pulsedesk.jpg",
    metric: "3.2x Lead Conversion",
    statusBadge: "Meta Cloud API",
    tags: ["Omnichannel CRM", "Automation"],
    desc: "High-velocity sales pipeline and customer support platform with official WhatsApp Business API integration, shared team inboxes, deal stage tracking, and lead score analytics.",
    pills: ["React / Tailwind", "Meta Cloud API", "Real-Time WebSockets", "SLA Monitor"],
  },
  {
    id: "cloudscale",
    name: "CloudScale Multi-Store POS",
    hasLiveUrl: false,
    category: "saas",
    categoryLabel: "Retail & Cloud",
    image: "/assets/images/projects/project-cloudscale.jpg",
    metric: "450+ Retail Outlets",
    statusBadge: "Offline-First Sync",
    tags: ["Cloud POS", "Multi-Store Retail"],
    desc: "Modern point-of-sale system for retail chains with offline-first local database caching, instant Bluetooth thermal receipt printing, real-time inventory reconciliation, and UPI dynamic QR display.",
    pills: ["PWA / Offline SQLite", "Thermal ESC/POS", "Inventory Matrix", "Instant Sync"],
  },
  {
    id: "zenora",
    name: "Zenora Smart Living IoT",
    hasLiveUrl: false,
    category: "cloud-mobile",
    categoryLabel: "IoT & Mobile",
    image: "/assets/images/projects/project-zenora.jpg",
    metric: "25k+ Connected Devices",
    statusBadge: "MQTT Real-Time",
    tags: ["Smart Home", "IoT Platform"],
    desc: "IoT automation and luxury apartment concierge system. Connects smart door locks, HVAC systems, and lighting with real-time energy analytics and resident amenity booking.",
    pills: ["MQTT Broker", "React Native", "AWS IoT Core", "Sub-50ms Latency"],
  },
  {
    id: "veloce",
    name: "Veloce Fleet Logistics",
    hasLiveUrl: false,
    category: "cloud-mobile",
    categoryLabel: "Mobile & Logistics",
    image: "/assets/images/projects/project-veloce.jpg",
    metric: "1.2M Kms Tracked Daily",
    statusBadge: "Pan-India Fleet",
    tags: ["Logistics", "Fleet Telematics"],
    desc: "Pan-India interstate logistics management suite with live GPS route optimization, fuel consumption telemetry, automated e-way bill generation, and driver companion mobile apps.",
    pills: ["Mapbox GL", "Geofencing", "E-Way Bill API", "Driver PWA"],
  },
  {
    id: "healthsync",
    name: "HealthSync Doctor EMR",
    hasLiveUrl: false,
    category: "saas",
    categoryLabel: "HealthTech",
    image: "/assets/images/projects/project-healthsync.jpg",
    metric: "95k+ Consultations",
    statusBadge: "ABDM Compliant",
    tags: ["HealthTech", "ABDM Compliant"],
    desc: "ABDM-compliant electronic medical records and tele-consultation platform for multi-specialty hospitals and clinics. Generates signed digital prescriptions and patient health cards.",
    pills: ["HIPAA / ABDM Ready", "WebRTC Video", "SNOMED CT Database", "Digital Rx"],
  },
  {
    id: "artisanspirits",
    name: "Artisan Craft Spirits D2C",
    hasLiveUrl: false,
    category: "ecommerce",
    categoryLabel: "D2C Brand",
    image: "/assets/images/projects/project-artisanspirits.jpg",
    metric: "₹65L+ Monthly MRR",
    statusBadge: "Direct-to-Consumer",
    tags: ["D2C Beverage", "Subscription"],
    desc: "Direct-to-consumer luxury beverage and artisanal distillery marketplace. Features biometric age verification gate, recurring connoisseur club subscriptions, and temperature-controlled dispatch tracking.",
    pills: ["Shopify Headless", "Aadhaar Age Gate", "Subscription Billing", "Cold-Chain Tracking"],
  },
  {
    id: "bioharvest",
    name: "BioHarvest Agri Intelligence",
    hasLiveUrl: false,
    category: "cloud-mobile",
    categoryLabel: "AgriTech & AI",
    image: "/assets/images/projects/project-bioharvest.jpg",
    metric: "40k+ Farmer Network",
    statusBadge: "Vernacular Voice AI",
    tags: ["AgriTech", "Mandi Analytics"],
    desc: "Agricultural procurement and crop yield prediction portal. Provides live APMC mandi pricing across 28 states, satellite NDVI crop health indices, and vernacular voice search.",
    pills: ["OpenWeather Satellite", "Mandi Price Feeds", "Vernacular Audio AI", "Offline PWA"],
  },
  {
    id: "apexcap",
    name: "Apex Capital Markets",
    hasLiveUrl: false,
    category: "fintech",
    categoryLabel: "Fintech & Payments",
    image: "/assets/images/projects/project-apexcap.jpg",
    metric: "₹180 Cr AUM",
    statusBadge: "SEBI Compliant",
    tags: ["WealthTech", "Algorithmic Trading"],
    desc: "Institutional portfolio management and rule-based algorithmic trading platform. Features millisecond market tick processing, automated risk hedging, and direct depository settlement.",
    pills: ["Kite Connect API", "WebSocket Feeds", "Zero-Latency Engine", "Automated Hedging"],
  },
  {
    id: "fleetbyte",
    name: "FleetByte On-Demand App",
    hasLiveUrl: false,
    category: "cloud-mobile",
    categoryLabel: "Mobile & Logistics",
    image: "/assets/images/projects/project-fleetbyte.jpg",
    metric: "4.8★ App Store Rating",
    statusBadge: "iOS & Android",
    tags: ["Mobile App", "Hyperlocal Delivery"],
    desc: "Cross-platform mobile application for hyperlocal courier dispatch and on-demand delivery runners. Features turn-by-turn routing, customer tipping, and automated payout disbursement.",
    pills: ["React Native", "Google Maps SDK", "Razorpay Route", "Live WebSockets"],
  },
];

export default function FeaturedWork() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "ecommerce" | "fintech" | "saas" | "cloud-mobile">("all");

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -440 : 440;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="relative py-20 px-4 sm:px-6 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section Header with Side-Scroll Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <Badge variant="default" className="mb-3 px-3.5 py-1">
              Production Portfolio
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-3">
              Featured Client Work.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore 14 live software systems, D2C luxury storefronts, enterprise SaaS engines, and cloud microservices engineered by Pryxon Studio.
            </p>
          </div>

          {/* Swipe / Scroll Arrow Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full flex items-center justify-center bg-white hover:bg-slate-50 text-slate-800 shadow-sm border border-slate-200/90 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full flex items-center justify-center bg-white hover:bg-slate-50 text-slate-800 shadow-sm border border-slate-200/90 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 pt-1">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === "all"
                ? "bg-slate-950 text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            All Work ({projects.length})
          </button>
          <button
            onClick={() => setActiveFilter("ecommerce")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === "ecommerce"
                ? "bg-slate-950 text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            E-Commerce & D2C (3)
          </button>
          <button
            onClick={() => setActiveFilter("saas")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === "saas"
                ? "bg-slate-950 text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            Enterprise SaaS (4)
          </button>
          <button
            onClick={() => setActiveFilter("fintech")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === "fintech"
                ? "bg-slate-950 text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            Fintech & Payments (2)
          </button>
          <button
            onClick={() => setActiveFilter("cloud-mobile")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === "cloud-mobile"
                ? "bg-slate-950 text-white shadow-sm"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            Cloud, IoT & Mobile (5)
          </button>
        </div>

        {/* Side Scroll / Swipeable Horizontal Project Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 pt-2 px-1 no-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="w-[88vw] sm:w-[390px] md:w-[420px] shrink-0 snap-center group overflow-hidden rounded-3xl border border-slate-200/90 bg-white hover:shadow-[0_16px_40px_-8px_rgba(15,23,42,0.10)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              style={{ contain: "content" }}
            >
              {/* Project Visual Media Header */}
              <div className="relative w-full h-52 sm:h-56 bg-slate-100 overflow-hidden border-b border-slate-200/70">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 88vw, 420px"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-[11px] font-bold text-white bg-slate-950/75 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
                    {project.statusBadge}
                  </span>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-[11px] font-bold text-slate-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                    {project.metric}
                  </span>
                </div>

                {/* Live Visit Button ONLY for the starting projects that have URLs */}
                {project.hasLiveUrl && project.url && (
                  <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-20">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg backdrop-blur-xs hover:bg-white transition-all transform scale-95 group-hover:scale-100"
                    >
                      <span>Visit Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Show external link pill ONLY if project has live URL */}
                    {project.hasLiveUrl && project.url && project.domain ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-xs"
                      >
                        <span>{project.domain}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/80">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>Client System</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
                    {project.desc}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {project.pills.map((pill) => (
                    <span
                      key={pill}
                      className="text-[11px] font-medium text-slate-600 bg-slate-100/90 px-2.5 py-0.5 rounded-md"
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
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href="#contact" className="btn-get-started shadow-lg hover:shadow-xl transition-all">
            <span>Commission Custom Software</span>
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
