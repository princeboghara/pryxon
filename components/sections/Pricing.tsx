"use client";

import { useRef } from "react";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  isPopular?: boolean;
  price: string;
  period: string;
  delivery: string;
  description: string;
  features: string[];
  bestFor: string;
  ctaText: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: "starter-web",
    name: "Business Web Starter",
    badge: "Fast Turnaround",
    price: "₹29,999",
    period: "one-time",
    delivery: "7–10 Business Days",
    tagline: "For modern brands & boutique companies demanding an ultra-fast web presence.",
    description: "High-performance corporate website engineered with Next.js 15, sub-second page loads, and conversion-focused architecture.",
    features: [
      "Custom Next.js 15 & TypeScript architecture",
      "99+ Google PageSpeed & mobile-first UI",
      "Interactive lead inquiry & contact form",
      "On-page SEO & Google Search Console setup",
      "Free SSL, domain linking & Vercel deployment",
      "30 days dedicated post-launch support",
    ],
    bestFor: "Corporate profiles, agencies, local businesses, portfolios",
    ctaText: "Choose Starter Web",
  },
  {
    id: "shopify-ecommerce",
    name: "Shopify & E-Commerce Pro",
    badge: "Most Popular ⭐",
    isPopular: true,
    price: "₹59,999",
    period: "one-time",
    delivery: "14–18 Business Days",
    tagline: "High-conversion digital storefront built to scale sales, orders & revenue.",
    description: "Custom Shopify Liquid or headless Next.js storefront with instant Indian payment gateways, automated notifications, and 1-click checkout.",
    features: [
      "Custom bespoke Shopify theme or Next.js store",
      "Seamless Razorpay, UPI, Cards, NetBanking & COD",
      "Up to 100 products setup & catalog architecture",
      "Automated WhatsApp order tracking & cart recovery",
      "Speed-optimized mobile shopping (+40% conversions)",
      "60 days dedicated priority maintenance warranty",
    ],
    bestFor: "D2C brands, apparel, jewellery, luxury retail storefronts",
    ctaText: "Choose E-Commerce Pro",
  },
  {
    id: "custom-software",
    name: "Custom Software & SaaS",
    badge: "High Scale",
    price: "₹1,19,999",
    period: "milestone-based",
    delivery: "3–4 Weeks",
    tagline: "Bespoke enterprise cloud portals, SaaS MVPs, and microservices engines.",
    description: "Production-grade custom software built with relational cloud databases, role-based dashboards, and high-concurrency backend APIs.",
    features: [
      "Full-stack React / Next.js + Python / Node.js backend",
      "Enterprise cloud DB (PostgreSQL / Supabase / MongoDB)",
      "Role-based access control, secure auth & admin panel",
      "High-concurrency REST & Webhook APIs",
      "99.99% uptime cloud architecture (Render / AWS)",
      "90 days technical support & architecture docs",
    ],
    bestFor: "Tech startups, SaaS platforms, internal business portals",
    ctaText: "Choose Custom Software",
  },
  {
    id: "mobile-app",
    name: "Mobile App (iOS & Android)",
    badge: "Full Platform",
    price: "₹1,79,999",
    period: "milestone-based",
    delivery: "4–6 Weeks",
    tagline: "Silky 60/120 FPS native-performance mobile apps published to both app stores.",
    description: "End-to-end iOS and Android development with real-time cloud synchronization, push notifications, and biometric security.",
    features: [
      "Cross-platform React Native / Flutter unified codebase",
      "Apple App Store & Google Play Store release setup",
      "Silky 60/120 FPS gestures physics & offline caching",
      "Push alerts, biometric login & device hardware APIs",
      "Live cloud database sync with admin control dashboard",
      "90 days app store maintenance & bug warranty",
    ],
    bestFor: "On-demand apps, consumer products, mobile-first businesses",
    ctaText: "Choose Mobile App",
  },
  {
    id: "whatsapp-crm",
    name: "WhatsApp CRM & Lead Bot",
    badge: "Sales Multiplier",
    price: "₹39,999",
    period: "setup + config",
    delivery: "5–7 Business Days",
    tagline: "Turn WhatsApp into a 24/7 automated sales and customer conversion machine.",
    description: "Official Meta WhatsApp Cloud API verified integration with intelligent lead qualification flows, auto-replies, and live CRM pipeline sync.",
    features: [
      "Official Meta WhatsApp Cloud API verified onboarding",
      "Smart 24/7 lead qualification & auto-reply chatbot",
      "CRM sync (Google Sheets / Zoho / custom dashboard)",
      "Automated broadcast messaging & cart abandonment nudges",
      "0.2s ultra-low latency response routing",
      "30 days team training & live monitoring",
    ],
    bestFor: "Real estate, clinics, consulting, e-commerce re-engagement",
    ctaText: "Choose WhatsApp CRM",
  },
];

export default function Pricing() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -410 : 410;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="relative py-20 px-4 sm:px-6 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section Header with Side-Scroll Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left max-w-2xl">
            <Badge variant="default" className="mb-3 px-3.5 py-1">
              Transparent Investment
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-3">
              Predictable, High-ROI Pricing.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Transparent packages in INR (₹) with zero hidden fees. Swipe or scroll horizontally to explore our tailored tiers. All plans include 100% source code ownership and direct senior engineer collaboration.
            </p>
          </div>

          {/* Swipe / Scroll Arrow Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-11 h-11 rounded-full flex items-center justify-center bg-white/95 hover:bg-white text-slate-800 shadow-md border border-slate-200/80 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-11 h-11 rounded-full flex items-center justify-center bg-white/95 hover:bg-white text-slate-800 shadow-md border border-slate-200/80 transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Side Scroll / Swipeable Horizontal Pricing Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-8 pt-2 px-1 no-scrollbar cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`w-[88vw] sm:w-[370px] md:w-[400px] shrink-0 snap-center rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                plan.isPopular
                  ? "bg-white border-2 border-blue-600 shadow-[0_16px_40px_-8px_rgba(37,99,235,0.18)] ring-4 ring-blue-500/10"
                  : "bg-white/95 border border-slate-200/90 shadow-[0_12px_36px_-6px_rgba(15,23,42,0.08)] hover:shadow-xl hover:-translate-y-1"
              }`}
            >
              {/* Popular Star Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 fill-current" />
                  <span>Most Popular</span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                    plan.isPopular
                      ? "text-blue-700 bg-blue-50 border-blue-200"
                      : "text-slate-700 bg-slate-100 border-slate-200/70"
                  }`}>
                    {plan.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    ⏱️ {plan.delivery}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-1.5">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-5 min-h-[36px]">
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/70 mb-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      / {plan.period}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">
                    + applicable taxes • Milestone-based payment terms available
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Deliverables & Inclusions:
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 leading-normal">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer & CTA */}
              <div className="pt-4 border-t border-slate-100 mt-auto">
                <div className="mb-4 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Best for: </span>
                  {plan.bestFor}
                </div>

                <Link
                  href="#contact"
                  className={`w-full flex items-center justify-center gap-2 rounded-xl text-xs sm:text-sm font-semibold h-11 transition-all ${
                    plan.isPopular
                      ? "bg-slate-950 text-white hover:bg-slate-900 shadow-md hover:shadow-lg"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200/80"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Trust Guarantee Badge */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">100% Full Source Code &amp; IP Ownership</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="font-medium">Fixed-Price Quotes &amp; Strict Delivery Timelines</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="font-medium">Zero Freelance Middlemen • Senior Developers Only</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

