"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Code2, ArrowRight, ArrowLeft, Loader2, Sparkles, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function MemberLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("developer@pryxon.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If already authenticated, redirect directly to member portal
    const isAuth = sessionStorage.getItem("pryxon_member_auth");
    if (isAuth === "true") {
      router.push("/member");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "member" }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      sessionStorage.setItem("pryxon_member_auth", "true");
      sessionStorage.setItem("pryxon_member_token", data.token);
      sessionStorage.setItem("pryxon_member_user", JSON.stringify(data.user));

      router.push("/member");
    } catch (err: any) {
      setError(err.message || "Invalid team member credentials.");
    } finally {
      setLoading(false);
    }
  };

  const useDemoCredentials = () => {
    setEmail("developer@pryxon.com");
    setPassword("pryxon@team2026");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between relative overflow-hidden selection:bg-blue-500/20">
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-40 architectural-grid" />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-32 h-8 transition-transform group-hover:scale-[1.02]">
            <Image
              src="/assets/images/logo_pryxon_studio.png"
              alt="Pryxon Studio"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/login"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors bg-white px-3.5 py-1.5 rounded-lg border border-slate-200/80 shadow-sm"
          >
            Switch to Admin Portal →
          </Link>
          <Link
            href="/"
            className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </Link>
        </div>
      </header>

      {/* Center Auth Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)] border border-slate-200/90 relative"
        >
          {/* Badge */}
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-sky-900 text-white">
              <Code2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Team Workspace</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Developer Portal
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-2">
            Member Workspace.
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
            Access assigned client repositories, active sprint tasks, Figma designs, and daily standup submissions.
          </p>

          {/* Quick Demo Pill */}
          <div
            onClick={useDemoCredentials}
            className="mb-6 p-3 rounded-xl bg-sky-50/80 border border-sky-100 flex items-center justify-between cursor-pointer hover:bg-sky-100/70 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
              <div className="text-left">
                <p className="text-[11px] font-bold text-sky-900">One-Click Member Fill</p>
                <p className="text-[10px] text-sky-700">developer@pryxon.com • pryxon@team2026</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-sky-700 group-hover:translate-x-0.5 transition-transform">
              Auto-fill →
            </span>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                Workplace Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@pryxon.com"
                  className="w-full h-11 pl-10 pr-4 text-sm font-medium rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Team Passcode
                </label>
                <span className="text-[11px] text-slate-400">Encrypted</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter employee passcode..."
                  className="w-full h-11 pl-10 pr-10 text-sm font-medium rounded-xl border border-slate-200 bg-slate-50/70 focus:bg-white focus:border-slate-900 focus:outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 transition-colors p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-get-started w-full py-3.5 mt-2 shadow-lg hover:shadow-xl transition-all justify-center text-sm font-semibold cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Logging in to Workspace...</span>
                </>
              ) : (
                <>
                  <span>Enter Team Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>

      {/* Footer Note */}
      <footer className="relative z-10 py-6 text-center text-xs text-slate-500">
        Pryxon Technologies &copy; {new Date().getFullYear()} • Engineering Workspace Portal
      </footer>
    </div>
  );
}

