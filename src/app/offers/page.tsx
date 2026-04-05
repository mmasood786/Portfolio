"use client";

import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-surface-950">
      <Navbar />
      
      {/* Hero header for the page */}
      <section className="pt-32 pb-16 bg-surface-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary-600/10 via-accent-500/10 to-primary-600/10 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <a
              href="/#pricing"
              className="inline-flex items-center gap-2 text-surface-400 hover:text-neon-cyan transition-colors mb-6"
            >
              <ArrowLeft size={18} />
              Back to Home
            </a>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6">
              Simple, Honest{" "}
              <span className="text-gradient">Pricing</span>
            </h1>
            <p className="text-xl text-surface-400 max-w-3xl mx-auto">
              No hidden fees, no surprises. Choose the package that fits your needs 
              and budget. All prices are one-time, not monthly.
            </p>
          </motion.div>
        </div>
      </section>

      <Pricing />
      <Footer />
    </main>
  );
}