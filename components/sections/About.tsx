"use client";

import { Code2, Compass, UserCheck, Layers, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="relative py-6 sm:py-10 px-4 sm:px-6 overflow-hidden">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Compact Section Header */}
        <div className="text-center max-w-lg mx-auto mb-6 sm:mb-8">
          <Badge variant="default" className="mb-2 px-2.5 py-0.5 text-[11px]">
            About Pryxon
          </Badge>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mb-1.5">
            Crafting Category-Defining Products.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-normal">
            High-performance engineering, human-first design, and resilient cloud architecture.
          </p>
        </div>

        {/* Compact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* Pillar 1: High Performance Tech */}
          <Card className="lg:col-span-2 glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-between border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-md border border-blue-100">
                  Zero Bloat
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-1.5">
                Engineered with Modern, Ultra-Fast Tech
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Next.js 15, TypeScript, Python, and edge-native architectures. Zero sluggish templates — written clean for speed and security.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
              <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50/90 border border-slate-200/50 text-center">
                <div className="text-base sm:text-lg font-extrabold text-slate-950">99+</div>
                <div className="text-[9px] text-slate-500 font-medium">PageSpeed</div>
              </div>
              <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50/90 border border-slate-200/50 text-center">
                <div className="text-base sm:text-lg font-extrabold text-slate-950">&lt; 0.8s</div>
                <div className="text-[9px] text-slate-500 font-medium">Edge Speed</div>
              </div>
              <div className="p-1.5 sm:p-2 rounded-lg bg-slate-50/90 border border-slate-200/50 text-center">
                <div className="text-base sm:text-lg font-extrabold text-slate-950">99.99%</div>
                <div className="text-[9px] text-slate-500 font-medium">Uptime SLA</div>
              </div>
            </div>
          </Card>

          {/* Pillar 2: UX Card */}
          <Card className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-between border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md border border-emerald-100">
                  Conversion First
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-1.5">
                Intuitive Human UI/UX
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interfaces crafted to minimize friction, guide users effortlessly, and maximize conversion rates.
              </p>
            </div>
          </Card>

          {/* Pillar 3: Leadership Card */}
          <Card className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-between border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-100">
                  Founder Led
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-1.5">
                Direct Senior Team
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No middlemen or junior handoffs. You work directly with lead engineers who care about your results.
              </p>
            </div>
          </Card>

          {/* Pillar 4: Wide Lifecycle Card */}
          <Card className="lg:col-span-2 glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-between border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50/80 px-2 py-0.5 rounded-md border border-purple-100">
                  Full Stack
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-950 mb-1.5">
                Concept to Cloud Scale
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Full-cycle product delivery: discovery, UI/UX, full-stack development, database architecture, and managed deployments.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-slate-100">
              {[
                "100% Code Ownership",
                "CI/CD Automation",
                "Post-Launch Support",
                "High Security",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-700 bg-slate-100/90 px-2 py-0.5 rounded-md border border-slate-200/60"
                >
                  <Check className="w-2.5 h-2.5 text-emerald-600" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
