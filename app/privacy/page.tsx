import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Pryxon Studio",
  description: "Official Privacy Policy and Data Protection standards of Pryxon Studio — Next-Gen Software Development & Cloud Engineering.",
};

export default function PrivacyPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-blue-700 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Legal &amp; Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            Last Updated: November 2026. This policy outlines how Pryxon Studio (&ldquo;Pryxon&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) protects client confidential information, project source code, and user data across all software engineering engagements.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <Lock className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">1. Client Confidentiality &amp; NDA Standards</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              At Pryxon Studio, strict confidentiality is foundational. All client business logic, architectural diagrams, proprietary algorithms, database schemas, and commercial strategies shared with us are treated as Non-Disclosure Agreement (NDA) protected confidential assets. We never sell, lease, or monetize client data or project intelligence to any third party.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <Eye className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">2. Information We Collect</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              We collect information strictly necessary to provide elite software development services:
            </p>
            <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
              <li><strong className="text-slate-900">Inquiry Information:</strong> Name, professional email address, WhatsApp number, project specifications, and target budget submitted via our contact forms.</li>
              <li><strong className="text-slate-900">Technical Credentials:</strong> API keys, staging server credentials, and repository access tokens granted for development are securely isolated in encrypted secret vaults.</li>
              <li><strong className="text-slate-900">Telemetry:</strong> Anonymized visit logs for performance auditing and DDoS prevention.</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">3. Source Code &amp; Intellectual Property Ownership</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unless otherwise agreed in a customized Master Services Agreement (MSA), upon project milestone completion and final invoice settlement, 100% of bespoke source code, database architectures, and graphical assets are transferred to the client. Pryxon Studio retains zero proprietary claim over your custom application code.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">4. Third-Party Cloud Providers</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our engineering solutions integrate industry-standard enterprise cloud platforms, including Vercel, Amazon Web Services (AWS), Google Cloud Platform (GCP), Supabase, and Stripe. Each provider maintains independent SOC2 / ISO compliance. We configure all client cloud environments following least-privilege security principles.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-950">5. Contact Our Privacy Officer</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              For privacy inquiries, NDA requests, or data deletion requests, contact our compliance team directly at:
            </p>
            <div className="text-sm font-semibold text-slate-900">
              Email: <a href="mailto:contact@pryxon.in" className="text-blue-600 hover:underline">contact@pryxon.in</a><br />
              WhatsApp: <a href="https://wa.me/918141815695" className="text-emerald-600 hover:underline">+91 81418 15695</a><br />
              Location: Surat, Gujarat, India.
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pt-8 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Pryxon Studio. Engineered with integrity.
        </div>
      </div>
    </div>
  );
}

