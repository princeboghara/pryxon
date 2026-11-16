export default function Loading() {
  return (
    <div
      className="relative min-h-screen text-slate-900 overflow-x-hidden selection:bg-blue-500/20 animate-pulse"
      style={{
        background: "linear-gradient(180deg, #4fa5f8 0%, #6db5fa 12%, #96cbfa 24%, #bde1fc 38%, #def0fd 52%, #f4faff 64%, #ffffff 74%, #eef7fe 86%, #dceefd 100%)",
      }}
    >
      {/* Top Reading Progress Bar placeholder */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-blue-600/30 z-50" />

      {/* Floating White Glassmorphic Topbar Skeleton */}
      <header className="fixed top-3.5 left-0 w-full z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <div className="w-full max-w-[1200px] h-[58px] sm:h-[66px] px-4 sm:px-6 rounded-2xl glass-topbar flex items-center justify-between shadow-sm">
          {/* Brand Logo Placeholder */}
          <div className="h-7 sm:h-9 w-28 sm:w-36 rounded-xl bg-slate-900/15" />

          {/* Desktop Nav Links Placeholder */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <div className="h-8 w-16 rounded-xl bg-slate-900/10" />
            <div className="h-8 w-20 rounded-xl bg-slate-900/10" />
            <div className="h-8 w-20 rounded-xl bg-slate-900/10" />
            <div className="h-8 w-16 rounded-xl bg-slate-900/10" />
            <div className="h-8 w-18 rounded-xl bg-slate-900/10" />
          </div>

          {/* CTA Button Placeholder */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block h-10 w-40 rounded-full bg-slate-900/25" />
            <div className="md:hidden h-10 w-10 rounded-xl bg-slate-900/10" />
          </div>
        </div>
      </header>

      {/* Hero Section Skeleton with 1:1 Layout Match */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 overflow-hidden">
        {/* Floating 3D Tech Icon Skeletons in realistic perimeter layout */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Left Wing Floaters */}
          <div className="absolute top-[22%] left-[10%] w-14 h-14 rounded-full bg-white/75 border border-white/90 shadow-sm" />
          <div className="absolute top-[36%] left-[6%] w-14 h-14 rounded-full bg-white/75 border border-white/90 shadow-sm" />
          <div className="absolute top-[52%] left-[12%] w-14 h-14 rounded-full bg-white/75 border border-white/90 shadow-sm" />
          <div className="absolute top-[68%] left-[18%] w-14 h-14 rounded-full bg-white/75 border border-white/90 shadow-sm" />

          {/* Right Wing Floaters */}
          <div className="absolute top-[22%] right-[10%] w-14 h-14 rounded-full bg-white/75 border border-white/90 shadow-sm" />
          <div className="absolute top-[36%] right-[6%] w-14 h-14 rounded-full bg-white/75 border border-white/90 shadow-sm" />
          <div className="absolute top-[52%] right-[12%] w-14 h-14 rounded-full bg-white/75 border border-white/90 shadow-sm" />
          <div className="absolute top-[68%] right-[18%] w-14 h-14 rounded-full bg-white/75 border border-white/90 shadow-sm" />
        </div>

        {/* Centered Hero Content Skeleton */}
        <div className="max-w-3xl mx-auto w-full text-center flex flex-col items-center z-10 space-y-5">
          {/* Main Heading Skeletons */}
          <div className="h-10 sm:h-14 w-4/5 max-w-xl rounded-2xl bg-slate-900/20 mx-auto" />
          <div className="h-9 sm:h-12 w-3/5 max-w-md rounded-2xl bg-blue-700/20 mx-auto" />

          {/* Value Subtitle Skeletons */}
          <div className="space-y-2 w-full max-w-lg mx-auto pt-2">
            <div className="h-4 w-full rounded-md bg-slate-900/15" />
            <div className="h-4 w-4/5 mx-auto rounded-md bg-slate-900/15" />
          </div>

          {/* Action Buttons Skeletons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 w-full">
            <div className="h-12 w-48 rounded-full bg-slate-900/70 shadow-md" />
            <div className="h-12 w-44 rounded-full bg-white/85 border border-white/90 shadow-xs" />
          </div>
        </div>
      </section>
    </div>
  );
}
