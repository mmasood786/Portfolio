"use client";

import { motion } from "framer-motion";
import { ArrowUp, Mail, MessageCircle, Code, Instagram } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-surface-950 border-t border-surface-800 py-16 relative">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12">
                <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                  <rect width="64" height="64" rx="14" fill="url(#footer-bg)"/>
                  <path d="M24 40L16 32L24 24" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M40 40L48 32L40 24" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M36 22L28 42" stroke="url(#footer-accent)" strokeWidth="3.5" strokeLinecap="round"/>
                  <circle cx="46" cy="18" r="3" fill="url(#footer-accent)"/>
                  <defs>
                    <linearGradient id="footer-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0f172a"/>
                      <stop offset="1" stopColor="#1e293b"/>
                    </linearGradient>
                    <linearGradient id="footer-accent" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00f5ff"/>
                      <stop offset="1" stopColor="#8b5cf6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="text-3xl font-display font-black">
                <span className="bg-gradient-to-r from-neon-cyan to-primary-500 bg-clip-text text-transparent">Dev</span>
                <span className="text-white">Studio</span>
              </h3>
            </div>
            <p className="text-surface-400 mb-6 max-w-md leading-relaxed">
              Helping local businesses grow through professional website design, 
              conversion optimization, and AI-powered customer service solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:hello@devstudio.com"
                className="w-12 h-12 rounded-xl bg-surface-800 flex items-center justify-center hover:bg-primary-500/20 hover:border-primary-500/50 border border-surface-700 transition-all group"
              >
                <Mail size={20} className="text-surface-400 group-hover:text-neon-cyan transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/devstudio.hub/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-surface-800 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/50 border border-surface-700 transition-all group"
              >
                <Instagram size={20} className="text-surface-400 group-hover:text-pink-500 transition-colors" />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-surface-800 flex items-center justify-center hover:bg-neon-lime/20 hover:border-neon-lime/50 border border-surface-700 transition-all group"
              >
                <MessageCircle size={20} className="text-surface-400 group-hover:text-neon-lime transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: "Services", href: "#services" },
                { name: "My Work", href: "/work" },
                { name: "Offers", href: "/offers" },
                { name: "Process", href: "#process" },
                { name: "AI Agent", href: "#ai-agent" },
                { name: "FAQ", href: "#faq" },
                { name: "Free Audit", href: "#audit" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-surface-400 hover:text-neon-cyan transition-colors relative group inline-block"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-cyan group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-6">Services</h4>
            <ul className="space-y-4">
              {[
                "Website Design",
                "Website Redesign",
                "Conversion Optimization",
                "Google Maps SEO",
                "Voice AI Agent",
              ].map((service) => (
                <li key={service} className="flex items-center gap-2 text-surface-400">
                  <Code size={14} className="text-primary-500" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-surface-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-surface-500 text-sm">
            © {new Date().getFullYear()} DevStudio. All rights reserved.
          </p>
          <p className="text-surface-500 text-sm">
            Built with 💜 for local businesses that deserve great websites.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-xl bg-surface-800 flex items-center justify-center hover:bg-primary-500/20 hover:border-primary-500/50 border border-surface-700 transition-all"
            whileHover={{ y: -4 }}
          >
            <ArrowUp size={20} className="text-surface-400" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}