export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50/90 text-slate-900 flex flex-col justify-between p-4 sm:p-8 animate-pulse overflow-hidden relative">
      {/* Top Navigation Skeleton Bar */}
      <div className="w-full max-w-5xl mx-auto h-16 rounded-2xl bg-white/70 border border-slate-200/80 shadow-sm flex items-center justify-between px-6 mb-12 backdrop-blur-md">
        <div className="h-7 w-32 rounded-lg bg-slate-200/80" />
        <div className="hidden md:flex items-center gap-6">
          <div className="h-4 w-16 rounded bg-slate-200/70" />
          <div className="h-4 w-16 rounded bg-slate-200/70" />
          <div className="h-4 w-16 rounded bg-slate-200/70" />
          <div className="h-4 w-16 rounded bg-slate-200/70" />
        </div>
        <div className="h-9 w-36 rounded-full bg-slate-900/15" />
      </div>

      {/* Hero Skeleton Center */}
      <div className="max-w-3xl mx-auto w-full text-center flex flex-col items-center my-auto space-y-6">
        {/* Badge Skeleton */}
        <div className="h-7 w-36 rounded-full bg-blue-100/70 border border-blue-200/60" />

        {/* Headline Skeletons */}
        <div className="h-10 sm:h-14 w-4/5 rounded-2xl bg-slate-300/70 max-w-xl mx-auto" />
        <div className="h-9 sm:h-12 w-3/5 rounded-2xl bg-slate-200/80 max-w-md mx-auto" />

        {/* Subtitle Skeletons */}
        <div className="space-y-2.5 w-full max-w-lg mx-auto pt-2">
          <div className="h-4 w-full rounded-md bg-slate-200/60" />
          <div className="h-4 w-3/4 mx-auto rounded-md bg-slate-200/60" />
        </div>

        {/* Buttons Skeletons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full">
          <div className="h-12 w-48 rounded-full bg-slate-900/80 shadow-md" />
          <div className="h-12 w-44 rounded-full bg-white border border-slate-200/80" />
        </div>
      </div>

      {/* Bottom Floating Cards Preview Skeleton */}
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 opacity-60">
        <div className="h-44 rounded-3xl bg-white/70 border border-slate-200/70 shadow-sm p-5 space-y-3">
          <div className="h-5 w-20 rounded bg-slate-200" />
          <div className="h-6 w-36 rounded bg-slate-300" />
          <div className="h-12 w-full rounded-xl bg-slate-100" />
        </div>
        <div className="h-44 rounded-3xl bg-white/70 border border-slate-200/70 shadow-sm p-5 space-y-3 hidden md:block">
          <div className="h-5 w-20 rounded bg-slate-200" />
          <div className="h-6 w-36 rounded bg-slate-300" />
          <div className="h-12 w-full rounded-xl bg-slate-100" />
        </div>
        <div className="h-44 rounded-3xl bg-white/70 border border-slate-200/70 shadow-sm p-5 space-y-3 hidden md:block">
          <div className="h-5 w-20 rounded bg-slate-200" />
          <div className="h-6 w-36 rounded bg-slate-300" />
          <div className="h-12 w-full rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
