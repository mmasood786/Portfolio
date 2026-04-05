"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import TopBanner from "./TopBanner";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "My Work", href: "/work" },
  { name: "Offers", href: "/offers" },
  { name: "Process", href: "#process" },
  { name: "AI Agent", href: "#ai-agent" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Resolve href based on current page
  const resolveHref = (href: string) => {
    if (isHomePage) return href;
    if (href.startsWith("#")) return `/${href}`;
    return href;
  };

  return (
    <>
      {/* Top Banner - Appears on all pages */}
      <TopBanner />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-surface-950/90 backdrop-blur-xl shadow-2xl shadow-primary-500/5 border-b border-primary-500/10"
            : "bg-surface-950/70 backdrop-blur-md"
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-3 relative group"
            whileHover={{ scale: 1.05 }}
          >
            {/* Glow behind logo */}
            <div className="absolute -inset-2 bg-gradient-to-r from-neon-cyan/20 to-primary-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="w-10 h-10 relative">
              <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
                <rect width="64" height="64" rx="14" fill="url(#nav-gradient-bg)"/>
                <path d="M24 40L16 32L24 24" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M40 40L48 32L40 24" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M36 22L28 42" stroke="url(#nav-gradient-accent)" strokeWidth="3.5" strokeLinecap="round"/>
                <circle cx="46" cy="18" r="3" fill="url(#nav-gradient-accent)"/>
                <defs>
                  <linearGradient id="nav-gradient-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0f172a"/>
                    <stop offset="1" stopColor="#1e293b"/>
                  </linearGradient>
                  <linearGradient id="nav-gradient-accent" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00f5ff"/>
                    <stop offset="1" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="text-2xl font-display font-bold tracking-tight relative">
              <span className="bg-gradient-to-r from-neon-cyan to-primary-500 bg-clip-text text-transparent">Dev</span>
              <span className="text-white">Studio</span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const href = resolveHref(link.href);
              const isAnchor = href.startsWith("#");
              const Component = isAnchor ? "a" : "a";
              
              return (
                <motion.a
                  key={link.name}
                  href={href}
                  className="font-medium text-surface-300 hover:text-white transition-colors text-sm px-4 py-2 rounded-lg hover:bg-white/5 relative group"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-neon-cyan to-primary-500 group-hover:w-4/5 transition-all duration-300 rounded-full" />
                </motion.a>
              );
            })}
            <motion.a
              href={resolveHref("#audit")}
              className="btn-secondary px-5 py-2 text-sm ml-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Free Audit</span>
            </motion.a>
            <motion.a
              href="/start-project"
              className="btn-accent px-5 py-2 text-sm ml-2 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Start a Project</span>
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-surface-950/95 backdrop-blur-xl border-t border-primary-500/10"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => {
                const href = resolveHref(link.href);
                return (
                  <a
                    key={link.name}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="block text-surface-300 hover:text-white hover:bg-white/5 font-medium py-3 px-4 rounded-lg transition-all"
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <a
                  href={resolveHref("#audit")}
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary block text-center text-sm"
                >
                  Free Audit
                </a>
                <a
                  href="/start-project"
                  onClick={() => setIsOpen(false)}
                  className="btn-accent block text-center text-sm"
                >
                  Start a Project
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    </>
  );
}