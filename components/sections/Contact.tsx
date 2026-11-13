"use client";

import { useState } from "react";
import { Mail, MessageCircle, MapPin, ArrowRight, CheckCircle2, AlertCircle, Loader2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    service: "",
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
        message: "Thank you! Your project inquiry has been received. We will get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        service: "",
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
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <Badge variant="default" className="mb-3 px-3.5 py-1">
                Get In Touch
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-4 leading-tight">
                Let’s Build Something Exceptional Together.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                Have a project in mind, need to revamp an existing platform, or looking to deploy an automated AI workflow? Tell us about your vision.
              </p>
            </div>

            {/* Contact Method Cards */}
            <div className="space-y-3">
              <a
                href="mailto:contact@pryxon.in"
                className="group flex items-center justify-between p-4.5 rounded-2xl glass-panel hover:border-slate-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email Us Directly
                    </div>
                    <div className="text-sm sm:text-base font-bold text-slate-900">
                      contact@pryxon.in
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </a>

              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4.5 rounded-2xl glass-panel hover:border-emerald-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Quick Chat on WhatsApp
                    </div>
                    <div className="text-sm sm:text-base font-bold text-slate-900">
                      +91 (Instant Response)
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </a>

              <div className="flex items-center gap-4 p-4.5 rounded-2xl glass-panel">
                <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Studio Headquarters
                  </div>
                  <div className="text-sm sm:text-base font-bold text-slate-900">
                    Surat, Gujarat, India (Global Remote)
                  </div>
                </div>
              </div>
            </div>

            {/* Live Availability Status */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/70 border border-emerald-200/60 shadow-sm backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <div className="text-xs text-slate-700">
                <strong className="text-slate-900">Available for Q1 / Q2 Projects:</strong>{" "}
                Selective client onboardings &amp; dedicated product sprints.
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <Card className="glass-panel p-7 sm:p-9 rounded-3xl shadow-[0_16px_48px_-12px_rgba(15,23,42,0.09)]">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-950 mb-1.5">
                  Send a Project Inquiry
                </h3>
                <p className="text-sm text-slate-600">
                  Fill out the details below and we&apos;ll reply within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="service" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Service Needed
                  </label>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="flex h-11 w-full rounded-xl border border-slate-200/90 bg-white/95 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 transition-all text-slate-800"
                  >
                    <option value="" disabled>Select a primary service</option>
                    <option value="web-dev">Web Development &amp; SaaS Platforms</option>
                    <option value="ecommerce">E-Commerce &amp; D2C Storefronts</option>
                    <option value="mobile-app">Mobile App (iOS &amp; Android)</option>
                    <option value="custom-software">Custom Enterprise Software / Cloud</option>
                    <option value="whatsapp-crm">WhatsApp CRM &amp; Lead Generation</option>
                    <option value="ai-automation">AI Automations &amp; LLM Workflows</option>
                    <option value="other">Other / Custom Scope</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Estimated Project Budget
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {budgetOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.value}
                        onClick={() => setFormData({ ...formData, budget: opt.value })}
                        className={`h-10 rounded-xl text-xs font-semibold transition-all border ${
                          formData.budget === opt.value
                            ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                            : "bg-white/80 text-slate-700 border-slate-200 hover:bg-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="details" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Project Details
                  </label>
                  <Textarea
                    id="details"
                    required
                    placeholder="Briefly describe your goals, timeline, and any specific requirements..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="w-full h-12 rounded-xl text-base shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>

                {status && (
                  <div
                    className={`flex items-start gap-3 p-4 rounded-xl text-sm ${
                      status.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
