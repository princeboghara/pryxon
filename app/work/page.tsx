"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Lock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Footer from "@/components/sections/Footer";

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
    name: "KuraPay Fintech Gateway",
    hasLiveUrl: true,
    domain: "kurapay.in",
    url: "https://kurapay.in",
    category: "fintech",
    categoryLabel: "Fintech & Payments",
    image: "/assets/images/projects/project-kurapay.jpg",
    metric: "₹42 Cr Monthly Volume",
    statusBadge: "PCI-DSS Compliant",
    tags: ["Fintech Gateway", "B2B Payouts"],
    desc: "Next-generation financial technology infrastructure and payment aggregation gateway. Engineered with multi-bank routing, instant UPI intent callbacks, and automated merchant settlements.",
    pills: ["Payment Gateway", "UPI Deep-Link", "PCI-DSS Level 1", "Automated Payouts"],
  },
  {
    id: "nexflow",
    name: "NexFlow Workflow Studio",
    hasLiveUrl: false,
    category: "saas",
    categoryLabel: "Enterprise SaaS",
    image: "/assets/images/projects/project-nexflow.jpg",
    metric: "450+ Enterprise Teams",
    statusBadge: "SOC-2 Type II",
    tags: ["B2B SaaS", "Automation"],
    desc: "Visual workflow automation canvas and integration orchestrator for enterprise operations. Connects legacy SQL databases, Webhooks, and internal tools with drag-and-drop rule logic.",
    pills: ["React Flow Canvas", "Node.js Microservices", "PostgreSQL Cloud", "Multi-Tenant RBAC"],
  },
  {
    id: "pulsedesk",
    name: "PulseDesk Support CRM",
    hasLiveUrl: false,
    category: "saas",
    categoryLabel: "Enterprise SaaS",
    image: "/assets/images/projects/project-pulsedesk.jpg",
    metric: "0.2s Mean Response Time",
    statusBadge: "Omnichannel Desk",
    tags: ["Customer Support", "Ticketing CRM"],
    desc: "Unified customer intelligence platform consolidating WhatsApp, email, live chat, and voice tickets into a single high-velocity dashboard with automated agent routing.",
    pills: ["Meta Cloud API", "WebSocket Feeds", "Redis Cache", "Smart Intent Triage"],
  },
  {
    id: "cloudscale",
    name: "CloudScale Kubernetes Mesh",
    hasLiveUrl: false,
    category: "cloud-mobile",
    categoryLabel: "Cloud & DevOps",
    image: "/assets/images/projects/project-cloudscale.jpg",
    metric: "99.999% SLA",
    statusBadge: "High Availability",
    tags: ["DevOps", "Infrastructure"],
    desc: "Multi-region cloud infrastructure management dashboard. Provides real-time cluster health monitoring, automatic horizontal pod autoscaling, and zero-downtime rolling deploys.",
    pills: ["Kubernetes", "Prometheus Metrics", "Terraform", "Docker Swarm"],
  },
  {
    id: "zenora",
    name: "Zenora Luxury Timepieces",
    hasLiveUrl: false,
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    image: "/assets/images/projects/project-zenora.jpg",
    metric: "62% Repeat Buyer Rate",
    statusBadge: "Private Catalog",
    tags: ["Horology", "Luxury Goods"],
    desc: "Bespoke digital boutique for limited-edition Swiss horology timepieces and collectors. High-touch VIP concierge reservations, 3D bezel interactive viewer, and insured shipping.",
    pills: ["Headless Next.js", "Three.js 3D Bezel", "Stripe Private Link", "High Conversion"],
  },
  {
    id: "veloce",
    name: "Veloce Fleet Intelligence",
    hasLiveUrl: false,
    category: "cloud-mobile",
    categoryLabel: "Cloud & IoT",
    image: "/assets/images/projects/project-veloce.jpg",
    metric: "14,000+ Connected Vehicles",
    statusBadge: "Live Telemetry",
    tags: ["IoT Telemetry", "Logistics"],
    desc: "Real-time commercial fleet tracking and predictive maintenance telematics platform. Sub-second GPS geolocation updates, fuel-burn analysis, and driver safety scoring.",
    pills: ["IoT MQTT Broker", "TimescaleDB", "Leaflet Maps", "Real-Time Telemetry"],
  },
  {
    id: "healthsync",
    name: "HealthSync EHR & Telehealth",
    hasLiveUrl: false,
    category: "saas",
    categoryLabel: "Healthcare SaaS",
    image: "/assets/images/projects/project-healthsync.jpg",
    metric: "250k+ Secure Records",
    statusBadge: "HIPAA Compliant",
    tags: ["MedTech", "Telehealth"],
    desc: "HIPAA-grade electronic health records and encrypted video consultation software for multi-specialty hospital chains. Automated prescription issuing and lab sync.",
    pills: ["WebRTC Video", "End-to-End Encryption", "FHIR Standard", "PostgreSQL RBAC"],
  },
  {
    id: "artisanspirits",
    name: "Artisan Spirits Distillery",
    hasLiveUrl: false,
    category: "ecommerce",
    categoryLabel: "E-Commerce",
    image: "/assets/images/projects/project-artisanspirits.jpg",
    metric: "₹95L Launch Quarter",
    statusBadge: "Age-Gated D2C",
    tags: ["Craft Beverage", "D2C Brand"],
    desc: "Exclusive craft spirits, barrel reserve memberships, and tasting room booking storefront. Features legal age verification gateways, subscription billing, and cellar tracking.",
    pills: ["Shopify Liquid Pro", "Recurring Subscriptions", "Razorpay Route", "KYC Verification"],
  },
  {
    id: "bioharvest",
    name: "BioHarvest AgriTech ERP",
    hasLiveUrl: false,
    category: "saas",
    categoryLabel: "Enterprise SaaS",
    image: "/assets/images/projects/project-bioharvest.jpg",
    metric: "18,000 Acres Monitored",
    statusBadge: "Smart Farming",
    tags: ["AgriTech", "Supply Chain"],
    desc: "End-to-end agricultural supply chain ERP connecting contract farming collectives with organic food exporters. Satellite moisture indices, batch QR tracing, and MSP payouts.",
    pills: ["FastAPI Backend", "GIS Mapping", "QR Traceability", "Automated Billing"],
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

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "ecommerce" | "fintech" | "saas" | "cloud-mobile">("all");

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  return (
    <div className="relative min-h-screen text-slate-900 overflow-x-hidden selection:bg-blue-500/20">
      {/* Floating White Glassmorphic Navigation */}
      <header className="fixed top-3.5 left-0 w-full z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <nav
          aria-label="Work Navigation"
          className="pointer-events-auto w-full max-w-[1200px] h-[58px] sm:h-[66px] px-3.5 sm:px-6 rounded-2xl glass-topbar flex items-center justify-between shadow-sm"
        >
          {/* Brand Logo & Back to Home */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-28 sm:w-36 h-7 sm:h-9 transition-transform duration-200 group-hover:scale-[1.02]">
              <Image
                src="/assets/images/logo_pryxon_studio.png"
                alt="Pryxon Studio"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Quick Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100/70 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/services"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100/70 rounded-xl transition-colors"
            >
              Capabilities
            </Link>
            <Link
              href="/#pricing"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100/70 rounded-xl transition-colors"
            >
              Pricing
            </Link>
          </div>

          {/* Action CTA */}
          <Link href="/#contact" className="btn-get-started nav-cta-btn shadow-sm hover:shadow-md">
            <span>Commission Custom Software</span>
            <span className="btn-arrow-badge">
              <svg className="arrow-svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </nav>
      </header>

      {/* Hero Header Section */}
      <section className="relative pt-36 sm:pt-44 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Badge variant="default" className="mb-4 px-3.5 py-1">
            Production Portfolio &amp; Case Studies
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 mb-6 leading-[1.1]">
            14 Verified Software Systems, <br />
            <span className="gradient-text">Storefronts &amp; Cloud Engines.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore verified enterprise software, high-conversion D2C storefronts, and cloud microservices engineered by Pryxon Studio across India and globally.
          </p>

          {/* Category Filter Pills (Centered in Middle) */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2 flex-wrap">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === "all"
                  ? "bg-slate-950 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              All Systems ({projects.length})
            </button>
            <button
              onClick={() => setActiveFilter("ecommerce")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === "ecommerce"
                  ? "bg-slate-950 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              E-Commerce &amp; D2C (3)
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
              Fintech &amp; WealthTech (2)
            </button>
            <button
              onClick={() => setActiveFilter("cloud-mobile")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === "cloud-mobile"
                  ? "bg-slate-950 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:bg-slate-50"
              }`}
            >
              Cloud, IoT &amp; Mobile (5)
            </button>
          </div>
        </div>
      </section>

      {/* Projects Grid (Complete 14 Projects Showcase) */}
      <section className="relative py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white hover:shadow-[0_20px_45px_-10px_rgba(15,23,42,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Media Header */}
                <div className="relative w-full h-56 bg-slate-100 overflow-hidden border-b border-slate-200/70">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="text-[11px] font-bold text-white bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
                      {project.statusBadge}
                    </span>
                  </div>
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <span className="text-[11px] font-bold text-slate-900 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-slate-200 shadow-xs">
                      {project.metric}
                    </span>
                  </div>

                  {/* Live URL Button if applicable */}
                  {project.hasLiveUrl && project.url && (
                    <div className="absolute inset-0 bg-slate-950/0 hover:bg-slate-950/30 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100 z-20">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-white/95 px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg backdrop-blur-xs hover:bg-white transition-all transform scale-95 hover:scale-100"
                      >
                        <span>Visit Live Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Content Block */}
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

                    <h2 className="text-xl font-bold text-slate-950 mb-2">
                      {project.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {project.desc}
                    </p>
                  </div>

                  {/* Architecture Deliverable Pills */}
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Architecture &amp; Features:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
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
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center p-10 sm:p-14 rounded-3xl bg-slate-950 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-block text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-4">
              Pryxon Studio Engineering
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Have a Project in Mind? <br />
              Let’s Engineer It Together.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-8">
              Fixed quotes, strict delivery timelines, and direct senior engineer collaboration. Full source code and IP ownership guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact" className="btn-get-started !bg-white !text-slate-950 hover:!bg-slate-100 shadow-xl">
                <span>Start Your Project</span>
                <span className="btn-arrow-badge !bg-slate-950 !text-white">
                  <svg className="arrow-svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
              <Link href="/services" className="px-6 py-3 rounded-full text-sm font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all">
                Explore All Capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
