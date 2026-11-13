"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-10 glass-panel border-t border-slate-200/85 pt-10 sm:pt-16 pb-4 sm:pb-6 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-10 mb-8 sm:mb-14">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <Link href="#home" className="inline-block">
              <div className="relative w-32 sm:w-36 h-8 sm:h-9">
                <Image
                  src="/assets/images/logo_pryxon_studio.png"
                  alt="Pryxon Studio"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
              We engineer next-generation web platforms, bespoke software, and automated digital solutions that empower businesses to lead globally.
            </p>
            <div className="flex items-center gap-2 pt-1 sm:pt-2">
              <a
                href="https://wa.me/918141815695?text=Hello%20Pryxon%20Studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href="https://instagram.com/pryxonstudio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-pink-600 hover:text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href="https://github.com/princeboghara"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>

          {/* Navigation & Capabilities (Compact 2-Column Row on Mobile) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {/* Col 2: Navigation */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-900">
                Navigation
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-600">
                <li><Link href="#home" className="hover:text-slate-950 transition-colors">Home</Link></li>
                <li><Link href="#services" className="hover:text-slate-950 transition-colors">Capabilities</Link></li>
                <li><Link href="#work" className="hover:text-slate-950 transition-colors">Featured Work</Link></li>
                <li><Link href="#about" className="hover:text-slate-950 transition-colors">About Studio</Link></li>
                <li><Link href="#contact" className="hover:text-slate-950 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Col 3: Capabilities */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-900">
                Capabilities
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-600">
                <li><Link href="#services" className="hover:text-slate-950 transition-colors">Web Apps</Link></li>
                <li><Link href="#services" className="hover:text-slate-950 transition-colors">E-Commerce</Link></li>
                <li><Link href="#services" className="hover:text-slate-950 transition-colors">Mobile Apps</Link></li>
                <li><Link href="#services" className="hover:text-slate-950 transition-colors">Cloud &amp; DevOps</Link></li>
                <li><Link href="#services" className="hover:text-slate-950 transition-colors">WhatsApp CRM</Link></li>
                <li><Link href="#services" className="hover:text-slate-950 transition-colors">AI Workflows</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 4: Studio Connect */}
          <div className="lg:col-span-3 space-y-2 sm:space-y-3">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-900">
              Studio
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <a
                  href="https://wa.me/918141815695"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 font-medium transition-colors"
                >
                  +91 81418 15695 (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                <a
                  href="https://instagram.com/pryxonstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-700 font-medium transition-colors"
                >
                  @pryxonstudio (Instagram)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <a
                  href="mailto:contact@pryxon.in"
                  className="hover:text-slate-950 transition-colors"
                >
                  contact@pryxon.in
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Surat, Gujarat, India</span>
              </li>
            </ul>
            <div className="pt-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] sm:text-[11px] font-semibold text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-8 border-t border-slate-200/70 text-[11px] sm:text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Pryxon Studio. All rights reserved.</p>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-slate-900 transition-colors">Security</Link>
          </div>
        </div>
      </motion.div>

      {/* Massive Monumental Brand Watermark (Official PRYXON Typography - Compact on Mobile) */}
      <div className="w-full overflow-hidden pt-4 sm:pt-10 pb-2 sm:pb-4 flex items-center justify-center select-none pointer-events-none border-t border-slate-200/70 mt-4 sm:mt-8 bg-gradient-to-b from-transparent to-slate-100/50">
        <span
          style={{ fontFamily: "var(--font-brand)" }}
          className="text-[12vw] sm:text-[13vw] font-bold tracking-wider leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-slate-950/45 via-slate-900/30 to-slate-800/15 text-center whitespace-nowrap"
        >
          PRY<span className="text-sky-600/55">X</span>ON
        </span>
      </div>
    </footer>
  );
}
