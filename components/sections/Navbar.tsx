"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reading progress bar
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledRatio = height > 0 ? (winScroll / height) * 100 : 0;
      const progressBar = document.getElementById("scrollProgressBar");
      if (progressBar) {
        progressBar.style.width = `${scrolledRatio}%`;
      }

      setScrolled(winScroll > 30);

      // Active section spy
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-3.5 left-0 w-full z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <nav
          aria-label="Main Navigation"
          className="pointer-events-auto w-full max-w-[1200px] h-[66px] px-4 sm:px-6 rounded-2xl glass-topbar flex items-center justify-between transition-all duration-300"
        >
          {/* Brand Logo */}
          <Link href="#home" className="flex items-center shrink-0 pr-4 group">
            <div className="relative w-32 sm:w-36 h-9 transition-transform duration-200 group-hover:scale-[1.02]">
              <Image
                src="/assets/images/logo_pryxon_studio.png"
                alt="Pryxon Studio"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                      isActive
                        ? "text-slate-950 font-semibold"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/60"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-slate-950 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Action Items */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="#contact"
              className="btn-get-started"
            >
              <span>Start Your Project</span>
              <span className="btn-arrow-badge">
                <svg className="arrow-svg" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100/80 text-slate-800 hover:bg-slate-200/80 transition-colors"
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-4 right-4 p-5 rounded-2xl glass-panel shadow-2xl z-50 md:hidden flex flex-col gap-2"
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "bg-slate-900 text-white font-semibold"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-200/80 mt-1">
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 rounded-xl text-sm font-semibold h-11 bg-slate-900 text-white shadow-md"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
