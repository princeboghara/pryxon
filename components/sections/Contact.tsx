"use client";

import { useState } from "react";
import {
  Mail,
  MessageCircle,
  Instagram,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Sparkles,
  Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const serviceChips = [
  "Web Development",
  "E-Commerce",
  "Mobile Apps",
  "Custom Software",
  "WhatsApp CRM",
  "AI Automations",
];

const budgetOptions = [
  { label: "$1k – $3k", value: "1k-3k" },
  { label: "$3k – $8k", value: "3k-8k" },
  { label: "$8k – $15k", value: "8k-15k" },
  { label: "$15k+", value: "15k+" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Web Development",
    budget: "3k-8k",
    details: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry.");
      }

      setStatus({
        type: "success",
        message: "Thank you! Your project inquiry has been received. Our team will contact you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        service: "Web Development",
        budget: "3k-8k",
        details: "",
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 overflow-hidden">
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
            Get In Touch
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            Let’s Build Something Exceptional.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Have a project in mind, need to revamp an existing platform, or deploy an automated AI workflow? Tell us about your vision.
          </p>
        </div>

        {/* 2-Column Luxury Rebuilt Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Direct Communication Channels (Rich & Balanced on Desktop, Responsive on Mobile) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* WhatsApp Priority Card */}
            <a
              href="https://wa.me/918141815695?text=Hello%20Pryxon%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-emerald-500/25 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 block overflow-hidden bg-gradient-to-br from-white/95 via-white/90 to-emerald-50/40"
            >
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Instant Reply</span>
                </div>
              </div>

              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                WhatsApp Business Priority
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-1.5">
                +91 81418 15695
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                Chat directly with our lead architects. Get instant scope estimates, technical feasibility reviews, and project kickoffs.
              </p>

              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors">
                <span>Start WhatsApp Chat</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>

            {/* Instagram Official Card */}
            <a
              href="https://instagram.com/pryxonstudio"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-pink-500/20 hover:border-pink-500/40 hover:shadow-lg transition-all duration-300 block overflow-hidden bg-gradient-to-br from-white/95 via-white/90 to-pink-50/30"
            >
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pink-100/70 border border-pink-200 text-pink-700">
                  @pryxonstudio
                </span>
              </div>

              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-pink-700 mb-1">
                Instagram Official
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-1.5">
                @pryxonstudio
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                Explore our latest UI design drops, client showcase teasers, behind-the-scenes engineering, or send us a direct message.
              </p>

              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-pink-700 group-hover:text-pink-800 transition-colors">
                <span>Open @pryxonstudio</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </a>

            {/* Direct Email Card */}
            <a
              href="mailto:contact@pryxon.in"
              className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-blue-500/20 hover:border-blue-500/40 hover:shadow-lg transition-all duration-300 block overflow-hidden bg-gradient-to-br from-white/95 via-white/90 to-blue-50/30"
            >
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold">
                  <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                  <span>Surat &bull; Global Remote</span>
                </div>
              </div>

              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
                Official Inquiries & RFPs
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-1.5 break-all">
                contact@pryxon.in
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                Send technical briefs, RFP documents, or partnership requests. Guaranteed response within 24 hours.
              </p>

              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-700 group-hover:text-blue-800 transition-colors">
                <span>Send Direct Email</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </a>
          </div>

          {/* Right Column: Rebuilt Interactive Form */}
          <div className="lg:col-span-7">
            <Card className="glass-panel p-6 sm:p-9 rounded-3xl border border-slate-200/90 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.08)] h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-1">
                      Start Your Project
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Share your requirements and receive a scoped proposal within 24 hours.
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-blue-600 shrink-0 hidden sm:block" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Service Selection Chips */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Select Service Needed
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {serviceChips.map((chip) => (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: chip })}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                            formData.service === chip
                              ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                              : "bg-white/80 text-slate-700 border-slate-200/80 hover:bg-slate-100/80"
                          }`}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="rounded-xl border-slate-200/80 bg-white/70 focus:bg-white text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="rounded-xl border-slate-200/80 bg-white/70 focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  {/* Estimated Budget Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: opt.value })}
                          className={`text-xs font-semibold py-2 px-2.5 rounded-xl border transition-all text-center ${
                            formData.budget === opt.value
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "bg-white/80 text-slate-700 border-slate-200/80 hover:bg-slate-100/80"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Project Details Textarea */}
                  <div className="space-y-1.5">
                    <label htmlFor="details" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Project Vision &amp; Goals
                    </label>
                    <Textarea
                      id="details"
                      required
                      rows={3}
                      placeholder="Tell us about what you want to build, existing links, reference designs, or timeline goals..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="rounded-xl border-slate-200/80 bg-white/70 focus:bg-white text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button (Styled like Get Started) */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-get-started w-full py-3.5 shadow-lg hover:shadow-xl transition-all justify-center text-sm font-semibold cursor-pointer disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <span className="btn-arrow-badge">
                          <svg className="arrow-svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </>
                    )}
                  </button>

                  {/* Submission Status Notice */}
                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3.5 rounded-xl text-xs font-medium flex items-start gap-2.5 ${
                        status.type === "success"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      {status.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                      )}
                      <span>{status.message}</span>
                    </motion.div>
                  )}
                </form>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
