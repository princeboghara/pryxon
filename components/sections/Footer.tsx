"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 glass-panel border-t border-slate-200/85 pt-16 pb-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="#home" className="inline-block">
              <div className="relative w-36 h-9">
                <Image
                  src="/assets/images/logo_pryxon_studio.png"
                  alt="Pryxon Studio"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              We engineer next-generation web platforms, bespoke software, and automated digital solutions that empower businesses to lead globally.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://github.com/princeboghara"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-pink-600 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="#home" className="hover:text-slate-950 transition-colors">Home</Link></li>
              <li><Link href="#services" className="hover:text-slate-950 transition-colors">Capabilities</Link></li>
              <li><Link href="#work" className="hover:text-slate-950 transition-colors">Featured Work</Link></li>
              <li><Link href="#about" className="hover:text-slate-950 transition-colors">About Studio</Link></li>
              <li><Link href="#contact" className="hover:text-slate-950 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Capabilities */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Capabilities
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="#services" className="hover:text-slate-950 transition-colors">Web Applications</Link></li>
              <li><Link href="#services" className="hover:text-slate-950 transition-colors">E-Commerce &amp; D2C</Link></li>
              <li><Link href="#services" className="hover:text-slate-950 transition-colors">iOS &amp; Android Apps</Link></li>
              <li><Link href="#services" className="hover:text-slate-950 transition-colors">Custom Cloud Architecture</Link></li>
              <li><Link href="#services" className="hover:text-slate-950 transition-colors">WhatsApp CRM Engines</Link></li>
              <li><Link href="#services" className="hover:text-slate-950 transition-colors">AI Automation Workflows</Link></li>
            </ul>
          </div>

          {/* Col 4: Studio Connect */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Studio
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>contact@pryxon.in</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Surat, Gujarat, India</span>
              </li>
            </ul>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-semibold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200/70 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Pryxon Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-slate-900 transition-colors">Security</Link>
          </div>
        </div>
      </div>

      {/* Massive Monumental Brand Watermark (Official PRYXON Typography) */}
      <div className="w-full overflow-hidden pt-12 pb-4 flex items-center justify-center select-none pointer-events-none border-t border-slate-200/60 mt-8 bg-gradient-to-b from-transparent to-white/40">
        <span
          style={{ fontFamily: "var(--font-brand)" }}
          className="text-[13vw] font-bold tracking-wider leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-slate-900/10 to-slate-900/2 text-center whitespace-nowrap"
        >
          PRY<span className="text-sky-500/25">X</span>ON
        </span>
      </div>
    </footer>
  );
}
