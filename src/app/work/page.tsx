"use client";

import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WorkPage() {
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
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-surface-400 hover:text-neon-cyan transition-colors mb-6"
            >
              <ArrowLeft size={18} />
              Back to Home
            </a>
            <h1 className="text-4xl md:text-6xl font-display font-black text-white mb-6">
              Real Results for{" "}
              <span className="text-gradient">Real Businesses</span>
            </h1>
            <p className="text-xl text-surface-400 max-w-3xl mx-auto">
              Don't just take my word for it. See how I've helped businesses like yours 
              get more customers through better websites.
            </p>
          </motion.div>
        </div>
      </section>

      <Portfolio />
      <Footer />
    </main>
  );
}