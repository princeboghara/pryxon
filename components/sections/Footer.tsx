"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-10 glass-panel border-t border-slate-200/85 pt-10 sm:pt-14 pb-4 sm:pb-6 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top Footer Grid (Clean Symmetrical 2-Column Agency Layout — No Navigation/Capabilities) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-8 sm:mb-12">
          {/* Col 1: Brand & Agency Positioning */}
          <div className="md:col-span-7 space-y-3.5">
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
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              We engineer next-generation web applications, bespoke software, and automated digital workflows that empower ambitious businesses to innovate and lead globally.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://wa.me/918141815695?text=Hello%20Pryxon%20Studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-emerald-600 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/pryxonstudio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-pink-600 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/princeboghara"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Studio Connect & Direct Comms */}
          <div className="md:col-span-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Direct Studio Desk
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href="https://wa.me/918141815695"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-700 font-semibold transition-colors"
                >
                  +91 81418 15695 (WhatsApp Priority)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-pink-600 shrink-0" />
                <a
                  href="https://instagram.com/pryxonstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-700 font-medium transition-colors"
                >
                  @pryxonstudio (Official Instagram)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <a
                  href="mailto:contact@pryxon.in"
                  className="hover:text-slate-950 font-medium transition-colors"
                >
                  contact@pryxon.in
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Surat, Gujarat, India &bull; Global Remote Delivery</span>
              </li>
            </ul>

            <div className="pt-1.5 flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-semibold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar with Software Agency Legal Compliance Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-slate-200/70 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Pryxon Studio. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/security" className="hover:text-slate-900 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Monumental Brand Watermark (Normal Big, Elegant & Punchy) */}
      <div className="w-full overflow-hidden pt-6 sm:pt-10 pb-3 sm:pb-5 flex items-center justify-center select-none pointer-events-none border-t border-slate-200/70 mt-6 sm:mt-8 bg-gradient-to-b from-transparent to-slate-100/50">
        <span
          style={{ fontFamily: "var(--font-brand)" }}
          className="text-[13vw] sm:text-[12vw] md:text-[11vw] font-bold tracking-wider leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-slate-950/45 via-slate-900/30 to-slate-800/15 text-center whitespace-nowrap"
        >
          PRY<span className="text-sky-600/55">X</span>ON
        </span>
      </div>
    </footer>
  );
}
