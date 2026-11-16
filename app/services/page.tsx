"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Code,
  Smartphone,
  ShoppingBag,
  Cpu,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Footer from "@/components/sections/Footer";

const serviceDetails = [
  {
    id: "web-dev",
    icon: Code,
    badge: "Core Discipline",
    title: "Web Development & Platform Engineering",
    tagline: "Ultra-fast, responsive web platforms engineered with Next.js 15 & TypeScript.",
    desc: "We build high-impact corporate web platforms, web applications, and customer portals tailored for enterprise scale. Engineered with Next.js App Router, React 19, Tailwind CSS, and edge computing for guaranteed 99+ Google PageSpeed and sub-second rendering.",
    deliverables: [
      "Custom Next.js 15 & TypeScript full-stack architecture",
      "99+ Google PageSpeed & mobile-first responsive UI",
      "Interactive lead inquiry, booking & CRM integration",
      "On-page SEO, OpenGraph tags & Search Console setup",
      "Automated CI/CD pipelines, SSL & Vercel deployment",
      "30–60 days dedicated technical warranty and maintenance",
    ],
    techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Vercel Edge", "PostgreSQL"],
    timeline: "7–18 Business Days",
    idealFor: "Corporate portals, digital agencies, tech startups, SaaS frontends, luxury brands",
  },
  {
    id: "mobile-app",
    icon: Smartphone,
    badge: "iOS & Android",
    title: "Mobile App Development",
    tagline: "Silky 60/120 FPS native-performance mobile applications published to both app stores.",
    desc: "End-to-end iOS and Android applications engineered for fluid user experiences, instant gestures, offline synchronization, and hardware-accelerated graphics. We guide your app from wireframe to Apple App Store and Google Play Store verification.",
    deliverables: [
      "Cross-platform React Native / Flutter unified codebase",
      "Apple App Store & Google Play Store release submissions",
      "Silky 60/120 FPS gesture physics & offline local caching",
      "Push alerts, biometric authentication (FaceID/Fingerprint)",
      "Secure REST / WebSocket API integration and real-time sync",
      "App performance telemetry and analytics integration",
    ],
    techStack: ["React Native", "Flutter", "iOS Swift", "Android Kotlin", "Firebase", "WebSockets"],
    timeline: "4–6 Weeks",
    idealFor: "On-demand services, consumer apps, B2B internal tools, hyperlocal logistics, fintech",
  },
  {
    id: "shopify-ecommerce",
    icon: ShoppingBag,
    badge: "E-Commerce",
    title: "Shopify Store & Headless E-Commerce",
    tagline: "High-conversion digital storefronts built to scale orders, revenue & retention.",
    desc: "Custom bespoke Shopify Liquid themes or headless Next.js digital storefronts tailored for modern D2C brands. Engineered with high-speed checkout flows, Indian payment gateways (Razorpay, UPI, COD), automated inventory sync, and WhatsApp order alerts.",
    deliverables: [
      "Custom Shopify Liquid theme or headless Next.js storefront",
      "Seamless Razorpay, Cashfree, UPI, Cards & NetBanking integration",
      "Multi-category product catalog & collection architecture",
      "Automated WhatsApp order confirmation & cart recovery alerts",
      "Conversion-rate optimized mobile checkout (+48% average lift)",
      "Comprehensive product training and inventory onboarding",
    ],
    techStack: ["Shopify Liquid", "Next.js", "Razorpay / UPI", "Meta Pixel", "Klaviyo", "Node.js"],
    timeline: "12–18 Business Days",
    idealFor: "D2C brands, luxury apparel, jewellery, wellness, electronics, consumer goods",
  },
  {
    id: "custom-software",
    icon: Cpu,
    badge: "Enterprise Scale",
    title: "Custom Software Solutions & SaaS",
    tagline: "Bespoke enterprise cloud portals, SaaS MVPs, and microservices engines.",
    desc: "Production-grade custom software built with relational cloud databases, role-based dashboards, and high-concurrency backend APIs. We architect internal ERPs, customer portals, client management systems, and proprietary cloud software with 99.99% uptime.",
    deliverables: [
      "Full-stack React / Next.js frontend + Python / Node.js backend",
      "Enterprise cloud database architecture (PostgreSQL, Supabase, MongoDB)",
      "Role-based access control (RBAC), multi-tenant auth & admin panel",
      "High-concurrency REST & Webhook APIs with sub-20ms response",
      "99.99% uptime cloud architecture hosted on Render or AWS",
      "Comprehensive technical documentation and architecture blueprints",
    ],
    techStack: ["Python / FastAPI", "Node.js", "PostgreSQL", "Supabase", "Docker", "Render / AWS"],
    timeline: "3–6 Weeks",
    idealFor: "Tech startups, corporate enterprises, multi-tenant SaaS, operations automation",
  },
  {
    id: "whatsapp-crm",
    icon: MessageCircle,
    badge: "Lead Engine",
    title: "WhatsApp CRM & Lead Automation",
    tagline: "Turn WhatsApp into a 24/7 autonomous sales and customer engagement engine.",
    desc: "Official Meta Cloud API integrations that turn your WhatsApp number into an automated sales machine. With 0.2s instant auto-replies, smart intent triage, automatic drip follow-ups, and 2-way CRM synchronization, you never lose another qualified prospect.",
    deliverables: [
      "Official Meta WhatsApp Cloud API provisioning & verification",
      "Sub-second (0.2s) instant lead qualification chatbot flows",
      "Automatic Google Sheets, HubSpot & custom CRM pipeline sync",
      "Automated multi-day drip follow-ups for abandoned inquiries",
      "Interactive button menus, catalog sharing & broadcast tools",
      "Multi-agent team chat desk for human handover",
    ],
    techStack: ["Meta Cloud API", "FastAPI / Node", "Webhooks", "PostgreSQL", "Google APIs"],
    timeline: "4–7 Business Days",
    idealFor: "Real estate developers, clinics, consulting agencies, retail brands, B2B services",
  },
];

const engineeringSteps = [
  {
    step: "01",
    title: "Discovery & Architecture Blueprint",
    desc: "We analyze your business model, target audience, technical requirements, and core metrics to design an unshakeable system architecture.",
  },
  {
    step: "02",
    title: "UI/UX Prototyping & Design Systems",
    desc: "We craft clean, pixel-perfect, accessible user interfaces following world-class human interface guidelines with interactive Figma prototypes.",
  },
  {
    step: "03",
    title: "Production Engineering & Full-Stack Build",
    desc: "We write clean, modular, strictly-typed TypeScript, React 19, and cloud backend code with comprehensive zero-compromise best practices.",
  },
  {
    step: "04",
    title: "Rigorous Security, Performance & QA Testing",
    desc: "Every system undergoes end-to-end device testing, Core Web Vitals profiling, automated security audits, and penetration checks.",
  },
  {
    step: "05",
    title: "Zero-Downtime Deployment & Cloud Setup",
    desc: "We deploy to high-availability global edge CDNs and cloud infrastructure with automated CI/CD pipelines, SSL, and monitoring.",
  },
  {
    step: "06",
    title: "24/7 SLA Monitoring & Warranty",
    desc: "Every delivery includes dedicated technical warranty, priority support, documentation, and continuous performance telemetry.",
  },
];

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen text-slate-900 overflow-x-hidden selection:bg-blue-500/20">
      {/* Floating White Glassmorphic Navigation */}
      <header className="fixed top-3.5 left-0 w-full z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <nav
          aria-label="Services Navigation"
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
              href="/work"
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100/70 rounded-xl transition-colors"
            >
              Our Work (14)
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
            <span>Start Your Project</span>
            <span className="btn-arrow-badge">
              <svg className="arrow-svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
        </nav>
      </header>

      {/* Hero Header Section */}
      <section className="relative pt-36 sm:pt-44 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Badge variant="default" className="mb-4 px-3.5 py-1">
            Engineering Capabilities &amp; Services
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 mb-6 leading-[1.1]">
            Full-Cycle Digital Engineering. <br />
            <span className="gradient-text">Built For Global Scale.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
            From modern responsive web applications and high-conversion D2C storefronts to native iOS/Android mobile apps and custom cloud microservices—we engineer systems that outperform.
          </p>

          {/* Trust Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs">
              <p className="text-2xl sm:text-3xl font-black text-slate-950">99.99%</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Uptime Reliability</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs">
              <p className="text-2xl sm:text-3xl font-black text-slate-950">&lt;0.8s</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Page Load Latency</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs">
              <p className="text-2xl sm:text-3xl font-black text-slate-950">14+</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Live Client Systems</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs">
              <p className="text-2xl sm:text-3xl font-black text-slate-950">100%</p>
              <p className="text-xs text-slate-500 font-medium mt-1">IP &amp; Source Ownership</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Deep Dive */}
      <section className="relative py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {serviceDetails.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={service.id}
                id={service.id}
                className="p-7 sm:p-10 rounded-3xl border border-slate-200/90 bg-white/95 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                  {/* Left Column: Core Info */}
                  <div className="lg:w-1/2 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 border border-blue-600/20">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/70">
                            {service.badge}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-3">
                        {service.title}
                      </h2>
                      <p className="text-sm font-semibold text-slate-800 mb-3">
                        {service.tagline}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {service.desc}
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-xs text-slate-700">
                        <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                        <span className="font-semibold text-slate-900">Typical Delivery:</span>
                        <span>{service.timeline}</span>
                      </div>
                      <div className="text-xs text-slate-600">
                        <span className="font-semibold text-slate-900">Best For: </span>
                        {service.idealFor}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Deliverables & Stack */}
                  <div className="lg:w-1/2 flex flex-col justify-between bg-slate-50/80 p-6 sm:p-8 rounded-2xl border border-slate-200/70">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-blue-600" />
                        <span>Included Deliverables:</span>
                      </p>
                      <ul className="space-y-3 mb-6">
                        {service.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-slate-200/80">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Core Technology Stack:
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-semibold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        href="/#contact"
                        className="btn-get-started w-full sm:w-auto text-xs sm:text-sm shadow-md"
                      >
                        <span>Commission This Service</span>
                        <span className="btn-arrow-badge">
                          <svg className="arrow-svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 6-Stage Engineering Process */}
      <section className="relative py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="default" className="mb-3 px-3.5 py-1">
              Methodology
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-3">
              How We Engineer Software.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              A transparent, battle-tested 6-stage delivery process with zero freelance middlemen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black text-blue-600/30 mb-3 block font-mono">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="relative py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center p-10 sm:p-14 rounded-3xl bg-slate-950 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-block text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-4">
              Get In Touch Today
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
              Ready to Turn Your Vision <br />
              Into High-Scale Software?
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-8">
              Discuss your project scope directly with our senior engineering team. Transparent pricing, strict deadlines, and 100% code ownership.
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
              <Link href="/work" className="px-6 py-3 rounded-full text-sm font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all">
                Explore Our Portfolio (14)
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
