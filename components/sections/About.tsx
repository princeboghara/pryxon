"use client";

import { Code2, Compass, UserCheck } from "lucide-react";
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

        {/* 3 Compact & Short Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {/* Card 1: Tech */}
          <Card className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-between border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50/80 px-2 py-0.5 rounded-md border border-blue-100">
                  Speed &amp; Tech
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-1.5">
                Edge-Native &amp; Ultra Fast
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Next.js 15, TypeScript &amp; Python architectures engineered for sub-second page loads and zero bloat.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Performance</span>
              <span className="font-bold text-slate-900">99+ PageSpeed</span>
            </div>
          </Card>

          {/* Card 2: UX */}
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
              <h3 className="text-base font-bold text-slate-950 mb-1.5">
                Intuitive Human UI/UX
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Interfaces crafted to minimize friction, guide users effortlessly, and maximize conversion rates.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Experience</span>
              <span className="font-bold text-emerald-700">Frictionless UX</span>
            </div>
          </Card>

          {/* Card 3: Team & Ownership */}
          <Card className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col justify-between border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50/80 px-2 py-0.5 rounded-md border border-purple-100">
                  Direct Access
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-950 mb-1.5">
                Senior Team &amp; Ownership
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No middlemen or junior handoffs. You work directly with lead engineers and own 100% of your source code.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <span>Code &amp; IP</span>
              <span className="font-bold text-purple-700">100% Client Owned</span>
            </div>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
