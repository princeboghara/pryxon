"use client";

import { Code2, Compass, UserCheck, Layers, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="default" className="mb-3 px-3.5 py-1">
            About Pryxon
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            Crafting Category-Defining Digital Products.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We combine cutting-edge engineering, bespoke design, and scalable cloud architecture to help ambitious founders and businesses thrive globally.
          </p>
        </div>

        {/* Bento Grid Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1: Large Bento Card */}
          <Card className="lg:col-span-2 glass-panel p-7 sm:p-9 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-100 shadow-sm">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50/80 px-2.5 py-0.5 rounded-md border border-blue-100 mb-3 inline-block">
                Zero Bloat
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-3">
                Built with Modern, High-Performance Tech
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mb-8">
                We engineer with Next.js 15, TypeScript, Python, and edge-native architectures. Zero slow templates or legacy code — every line is written for speed, security, and sub-800ms global load times.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-200/50">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950">99+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">PageSpeed Score</div>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-200/50">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950">&lt; 0.8s</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Global Edge Latency</div>
              </div>
              <div className="p-3 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-200/50">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950">99.99%</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Uptime SLA</div>
              </div>
            </div>
          </Card>

          {/* Pillar 2: UX Card */}
          <Card className="glass-panel p-7 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100 shadow-sm">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50/80 px-2.5 py-0.5 rounded-md border border-emerald-100 mb-3 inline-block">
                Design That Converts
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-3">
                Intuitive Human-Centric UI/UX
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every interface is crafted to reduce friction and guide users seamlessly toward conversion. We design for clarity, trust, and lasting engagement.
              </p>
            </div>
          </Card>

          {/* Pillar 3: Leadership Card */}
          <Card className="glass-panel p-7 sm:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 border border-amber-100 shadow-sm">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50/80 px-2.5 py-0.5 rounded-md border border-amber-100 mb-3 inline-block">
                Founder-Led
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-3">
                Direct Senior Leadership
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No junior handoffs or convoluted agency layers. You collaborate directly with senior architects and developers who genuinely care about your product&apos;s outcome.
              </p>
            </div>
          </Card>

          {/* Pillar 4: Wide Bento Card */}
          <Card className="lg:col-span-2 glass-panel p-7 sm:p-9 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 border border-purple-100 shadow-sm">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50/80 px-2.5 py-0.5 rounded-md border border-purple-100 mb-3 inline-block">
                Full Lifecycle
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-3">
                From Concept Wireframe to Scaled Cloud Deployment
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mb-8">
                We handle the entire journey: product strategy, interactive Figma prototyping, frontend development, database engineering, payment integration, and post-launch maintenance.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-100">
              {[
                "100% Code Ownership",
                "Automated CI/CD Deployment",
                "Dedicated Post-Launch Support",
                "Enterprise Security Standards",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100/90 px-3 py-1.5 rounded-xl border border-slate-200/70"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
