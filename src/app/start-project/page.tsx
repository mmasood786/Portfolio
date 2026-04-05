"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectBriefForm from "@/components/ProjectBriefForm";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, CheckCircle, Clock, DollarSign, Zap, Target } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Zap, value: "150+", label: "Projects Delivered" },
  { icon: Target, value: "98%", label: "Client Satisfaction" },
];

export default function StartProjectPage() {
  return (
    <main className="min-h-screen bg-surface-950">
      <Navbar />

      {/* Hero section - lightweight for mobile */}
      <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-surface-950">
        {/* Simple background glow (reduced from 3 heavy orbs to 1) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary-600/15 via-transparent to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-surface-400 hover:text-neon-cyan transition-colors mb-6 group"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back to Home</span>
          </Link>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-full border border-primary-500/20 mb-6">
            <Sparkles size={14} className="text-neon-cyan" />
            <span className="text-white/90 font-medium text-xs sm:text-sm">
              Start Your Project Today
            </span>
          </div>

          {/* Heading - no word-by-word animation, just simple fade-in */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-[1.1]">
            Tell Me About{" "}
            <span className="text-gradient">Your Dream Project</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-surface-400 mb-8 max-w-xl">
            Answer a few questions and I'll prepare a{" "}
            <span className="text-white font-semibold">personalized proposal</span> with
            timeline, pricing, and recommendations — within{" "}
            <span className="text-neon-cyan font-semibold">24 hours</span>.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-3">
                <stat.icon className="text-neon-cyan flex-shrink-0" size={20} />
                <div>
                  <div className="text-xl font-black text-white">{stat.value}</div>
                  <div className="text-surface-500 text-xs font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits strip */}
      <section className="py-6 border-y border-surface-800 bg-surface-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Clock className="text-neon-cyan flex-shrink-0" size={20} />
              <div>
                <div className="text-white font-semibold text-sm">5 Minutes to Complete</div>
                <div className="text-surface-500 text-xs">Short and focused</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="text-neon-lime flex-shrink-0" size={20} />
              <div>
                <div className="text-white font-semibold text-sm">No Obligation, Free</div>
                <div className="text-surface-500 text-xs">Zero commitment</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-accent-400 flex-shrink-0" size={20} />
              <div>
                <div className="text-white font-semibold text-sm">Proposal Within 24 Hours</div>
                <div className="text-surface-500 text-xs">Detailed & personalized</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="py-12 sm:py-16 bg-surface-950 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-card-gradient rounded-3xl border border-surface-700/50 p-4 sm:p-8 md:p-10 shadow-2xl">
            <ProjectBriefForm />
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-12 border-t border-surface-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-8 text-center">Why Fill This Out?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                title: "Accurate Pricing",
                desc: "I can give you a precise quote instead of a vague range. No surprises later.",
              },
              {
                title: "Saves Time",
                desc: "Instead of 5-7 emails back and forth, I have everything I need upfront.",
              },
              {
                title: "Better Recommendations",
                desc: "Knowing your integrations and goals lets me suggest the perfect package.",
              },
              {
                title: "Shows You're Serious",
                desc: "Clients who fill this out typically get priority scheduling and faster turnaround.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-surface-900/50 rounded-xl p-5 sm:p-6 border border-surface-800"
              >
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-surface-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
