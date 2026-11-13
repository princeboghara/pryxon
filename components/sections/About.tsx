"use client";

import { Code2, Compass, UserCheck, Layers, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="relative py-10 sm:py-14 px-4 sm:px-6 overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Compact Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <Badge variant="default" className="mb-2.5 px-3 py-0.5 text-xs">
            About Pryxon
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mb-2.5">
            Crafting Category-Defining Products.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            High-performance engineering, human-first design, and resilient cloud architecture for ambitious brands.
          </p>
        </div>

        {/* Compact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Pillar 1: High Performance Tech */}
          <Card className="lg:col-span-2 glass-panel p-5 sm:p-6 rounded-2xl flex flex-col justify-between border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <Code2 className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-md border border-blue-100">
                  Zero Bloat
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-2">
                Engineered with Modern, Ultra-Fast Tech
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                Next.js 15, TypeScript, Python, and edge-native architectures. Zero sluggish templates — written clean for speed and security.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-slate-100">
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/50 text-center">
                <div className="text-lg sm:text-xl font-extrabold text-slate-950">99+</div>
                <div className="text-[10px] text-slate-500 font-medium">PageSpeed</div>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/50 text-center">
                <div className="text-lg sm:text-xl font-extrabold text-slate-950">&lt; 0.8s</div>
                <div className="text-[10px] text-slate-500 font-medium">Edge Speed</div>
              </div>
              <div className="p-2 sm:p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/50 text-center">
                <div className="text-lg sm:text-xl font-extrabold text-slate-950">99.99%</div>
                <div className="text-[10px] text-slate-500 font-medium">Uptime SLA</div>
              </div>
            </div>
          </Card>

          {/* Pillar 2: UX Card */}
          <Card className="glass-panel p-5 sm:p-6 rounded-2xl flex flex-col justify-between border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <Compass className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50/80 px-2 py-0.5 rounded-md border border-emerald-100">
                  Conversion First
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-2">
                Intuitive Human UI/UX
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Interfaces crafted to minimize friction, guide users effortlessly, and maximize conversion rates.
              </p>
            </div>
          </Card>

          {/* Pillar 3: Leadership Card */}
          <Card className="glass-panel p-5 sm:p-6 rounded-2xl flex flex-col justify-between border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                  <UserCheck className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-100">
                  Founder Led
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-2">
                Direct Senior Team
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No middlemen or junior handoffs. You work directly with lead engineers who care about your results.
              </p>
            </div>
          </Card>

          {/* Pillar 4: Wide Lifecycle Card */}
          <Card className="lg:col-span-2 glass-panel p-5 sm:p-6 rounded-2xl flex flex-col justify-between border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                  <Layers className="w-4.5 h-4.5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50/80 px-2 py-0.5 rounded-md border border-purple-100">
                  Full Stack
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-950 mb-2">
                Concept to Cloud Scale
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Full-cycle product delivery: discovery, UI/UX, full-stack development, database architecture, and managed deployments.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
              {[
                "100% Code Ownership",
                "CI/CD Automation",
                "Post-Launch Support",
                "High Security",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-700 bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200/60"
                >
                  <Check className="w-3 h-3 text-emerald-600" />
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
