import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-slate-950 text-white text-center">
      <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-2xl font-bold mb-6">
        404
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
        Page Not Found
      </h1>
      <p className="text-slate-400 max-w-md mb-8 text-sm sm:text-base">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="btn-get-started shadow-lg"
      >
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
}

