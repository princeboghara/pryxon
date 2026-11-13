import Link from "next/link";
import { ArrowLeft, Shield, Server, KeyRound, Cpu, Terminal, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security & Architecture Standards | Pryxon Studio",
  description: "Enterprise security architecture, data isolation, and DevSecOps engineering standards implemented by Pryxon Studio.",
};

export default function SecurityPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>DevSecOps &amp; Security</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
            Security Architecture Standards
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
            How Pryxon Studio protects enterprise web platforms, sensitive user databases, and custom cloud microservices against modern threats.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <Server className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">1. Edge Native Infrastructure &amp; DDoS Shielding</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              We deploy software across globally distributed edge networks (Vercel Edge, Cloudflare, AWS CloudFront) with automatic TLS 1.3 encryption, HTTP/3, and hardware-accelerated Anycast DDoS mitigation, ensuring your applications remain lightning-fast and impenetrable.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <KeyRound className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">2. Row-Level Security (RLS) &amp; Database Isolation</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              In multi-tenant SaaS and e-commerce platforms, we enforce PostgreSQL Row-Level Security (RLS) policies at the database layer. This ensures that even in the unlikely event of application-level vulnerability, cross-tenant data leakage is cryptographically impossible.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <Cpu className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">3. Zero-Hardcoded Secrets Policy</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              We enforce a strict zero-hardcoded secret standard. All database credentials, Stripe webhook secrets, and private API keys are injected at runtime via encrypted environment secret managers. Git repositories are continuously monitored using automated pre-commit scanners to prevent secret leakage.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                <Terminal className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">4. CI/CD Automated Vulnerability Scanning</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every pull request undergoes automated static application security testing (SAST), dependency audit checks (`npm audit`, Dependabot), and strict TypeScript compile-time validation before ever reaching production servers.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold text-slate-950">5. Responsible Vulnerability Disclosure</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              We welcome reports from independent security researchers. If you identify a potential security issue in any platform operated by Pryxon Studio, please email our security lead immediately at <a href="mailto:contact@pryxon.in" className="text-blue-600 hover:underline">contact@pryxon.in</a>. We acknowledge all reports within 24 hours.
            </p>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pt-8 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Pryxon Studio. Security engineered by default.
        </div>
      </div>
    </div>
  );
}

