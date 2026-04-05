"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Sparkles, Clock, ArrowRight } from "lucide-react";

export default function TopBanner() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const dismissedAt = localStorage.getItem("banner-dismissed");
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10);
      const sixtyMinutes = 60 * 60 * 1000;
      if (elapsed >= sixtyMinutes) {
        localStorage.removeItem("banner-dismissed");
        setIsVisible(true);
      }
    } else {
      setIsVisible(true);
    }
  }, []);

  if (!isMounted || !isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    const dismissTime = Date.now();
    localStorage.setItem("banner-dismissed", dismissTime.toString());
  };

  return (
    <motion.div
      id="top-banner"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative z-50"
    >
      {/* Main Banner - Optimized for mobile */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                               radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
              animation: "pulse 3s ease-in-out infinite",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left content - Flexible */}
            <div className="flex-1 min-w-0 flex items-center gap-2 sm:gap-4">
              {/* Fire icon with animation */}
              <motion.div
                className="flex-shrink-0 text-2xl sm:text-3xl"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔥
              </motion.div>

              {/* Text content */}
              <div className="min-w-0 flex-1">
                {/* Desktop text */}
                <div className="hidden sm:block">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Sparkles size={14} className="text-white/90 flex-shrink-0" />
                    <span className="text-white/90 text-sm font-medium">
                      Exclusive Offers — This Month Only
                    </span>
                  </div>
                  <p className="text-white text-sm lg:text-base">
                    Websites from <strong className="font-bold">$1,797</strong> •{" "}
                    <span className="line-through opacity-75">Save $1,003</span> •{" "}
                    <Clock size={12} className="inline" />{" "}
                    <CountdownTimer />
                  </p>
                </div>

                {/* Mobile text - Simplified */}
                <div className="sm:hidden">
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={12} className="text-white/90 flex-shrink-0" />
                    <span className="text-white text-xs sm:text-sm font-medium">
                      Exclusive: From <strong className="font-bold">$1,797</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button - Optimized */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <a
                href="/#exclusive-offers"
                className="group inline-flex items-center gap-1.5 sm:gap-2 bg-white text-primary-600 font-bold text-xs sm:text-sm px-3 py-2 sm:px-5 sm:py-2.5 rounded-full hover:bg-surface-50 transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap shadow-lg"
                onClick={(e) => {
                  // Handle navigation for different pages
                  if (window.location.pathname !== "/") {
                    e.preventDefault();
                    window.location.href = "/#exclusive-offers";
                  }
                }}
              >
                <span className="hidden sm:inline">Claim Offer</span>
                <span className="sm:hidden">Get Deal</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>

              {/* Dismiss button */}
              <button
                onClick={handleDismiss}
                className="p-1.5 sm:p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
                aria-label="Dismiss banner"
              >
                <X size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Lightweight countdown timer (only shows days)
function CountdownTimer() {
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const difference = endOfMonth.getTime() - now.getTime();
      setDaysLeft(Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))));
    };

    calculateDaysLeft();
    const interval = setInterval(calculateDaysLeft, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return <span className="font-bold">{daysLeft} days left</span>;
}
