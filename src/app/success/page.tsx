import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | DevStudio",
  description: "Your submission has been received. We'll be in touch soon!",
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-surface-950 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="w-24 h-24 rounded-full bg-neon-lime/10 flex items-center justify-center mx-auto mb-8 animate-pulse">
          <svg
            className="w-12 h-12 text-neon-lime"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black text-white mb-4">
          Thank You! 🎉
        </h1>
        <p className="text-xl text-surface-400 mb-8">
          Your submission has been received. I'll review it and get back to you within 24 hours.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-neon-cyan via-primary-500 to-accent-500 text-white font-bold text-lg rounded-2xl hover:shadow-[0_0_50px_rgba(0,245,255,0.6)] transition-all"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
