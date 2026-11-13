import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pryxon Technologies | Turning Bold Ideas Into Powerful Digital Solutions",
  description: "Next-generation websites, bespoke software, mobile apps, e-commerce storefronts, and automated AI solutions built for scale.",
  icons: {
    icon: "/assets/images/logo_pryxon_studio.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-sky-500/20 selection:text-sky-900 font-sans relative">
        {/* Top Reading Progress Bar */}
        <div id="scrollProgressBar" className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-slate-900 via-blue-600 to-sky-400 z-[9999] pointer-events-none transition-all duration-75 w-0 shadow-[0_0_12px_rgba(56,189,248,0.4)]" />

        {/* Ambient Architectural Grid & Sunlight Beam */}
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
          <div className="absolute -top-[120px] right-[12%] w-[600px] h-[520px] bg-white/80 rounded-full blur-[65px] rotate-[20deg]" />
          <div className="absolute top-[35%] -left-[6%] w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[80px]" />
          <div className="absolute top-[60%] -right-[8%] w-[560px] h-[560px] bg-indigo-200/35 rounded-full blur-[80px]" />
          <div className="architectural-grid absolute inset-0 w-full h-full" />
        </div>

        {children}
      </body>
    </html>
  );
}
