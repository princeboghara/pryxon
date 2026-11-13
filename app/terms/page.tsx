import Link from "next/link";
import { ArrowLeft, Scale, Code, CreditCard, ShieldAlert, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Pryxon Studio",
  description: "Official Master Services Agreement and Terms of Service of Pryxon Studio — Software Development & Cloud Engineering Agency.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-500/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors bg-white px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Pryxon Studio</span>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Client Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            Effective Date: November 2026. These terms govern all software development, web engineering, custom architecture, and consulting services delivered by Pryxon Studio to commercial clients worldwide.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <Code className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">1. Scope of Work &amp; Agile Deliverables</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every client project begins with an explicit Statement of Work (SOW) defining specifications, milestone deliverables, technical architecture, and agreed timelines. Any client modifications or feature additions outside the baseline SOW are handled via formal change orders with scoped cost and timeline adjustments.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <Award className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">2. 100% Intellectual Property &amp; Code Transfer</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upon receipt of final milestone payment, Pryxon Studio irrevocably assigns all right, title, and interest in and to the bespoke software, source code repositories (GitHub/GitLab), customized database models, and UI designs created specifically for the client. The client owns 100% of their intellectual property.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <CreditCard className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">3. Milestone Payments &amp; Invoicing</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Engagements are structured around transparent milestone billing: an upfront kickoff deposit (typically 30–50%), intermediate sprint deliverables, and final production deployment sign-off. Invoices are payable within 7 business days via international wire, Razorpay, or Stripe.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">4. 30-Day Post-Launch Bug-Fix Guarantee</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every production deployment includes a complimentary 30-day warranty period starting on launch day. Pryxon Studio immediately remedies any bugs, logic regressions, or performance bottlenecks that deviate from the agreed SOW at zero additional cost to the client.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">5. Limitation of Liability &amp; Jurisdiction</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Pryxon Studio is not liable for indirect, incidental, or consequential damages resulting from third-party hosting outages (e.g. AWS/Vercel downtime) or unauthorized client credential compromises. These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Surat, Gujarat.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pt-8 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Pryxon Studio. Built with elite craftsmanship.
        </div>
      </div>
    </div>
  );
}

