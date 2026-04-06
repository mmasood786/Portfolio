"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, Sparkles, TrendingUp, Users, Clock, MousePointer2, Star, Zap, Target, ChevronRight } from "lucide-react";

// ============================================
// INTERACTIVE PARTICLE SYSTEM
// ============================================
function InteractiveParticles({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; baseX: number; baseY: number; size: number; speed: number }>>([]);

  useEffect(() => {
    setMounted(true);
    const count = window.innerWidth < 768 ? 20 : 50;
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        baseX: Math.random() * 100,
        baseY: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.5,
      }))
    );

    const handleResize = () => {
      const newCount = window.innerWidth < 768 ? 20 : 50;
      setParticles(
        Array.from({ length: newCount }, (_, i) => ({
          id: i,
          baseX: Math.random() * 100,
          baseY: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.5,
        }))
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => {
        const dx = mousePosition.x - particle.baseX;
        const dy = mousePosition.y - particle.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 20;
        const repelStrength = Math.max(0, 1 - distance / maxDistance);
        const offsetX = dx * repelStrength * 2;
        const offsetY = dy * repelStrength * 2;

        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.baseX}%`,
              top: `${particle.baseY}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              x: offsetX,
              y: offsetY,
              background: `radial-gradient(circle, rgba(0, 245, 255, ${0.6 + repelStrength * 0.4}), rgba(139, 92, 246, ${0.3 + repelStrength * 0.3}))`,
              boxShadow: `0 0 ${8 + repelStrength * 12}px rgba(0, 245, 255, ${0.3 + repelStrength * 0.5})`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5 + repelStrength * 2, 1],
            }}
            transition={{
              duration: 3 + particle.speed * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

// ============================================
// MORPHING GEOMETRIC SHAPES
// ============================================
function MorphingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Hexagon */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          borderRadius: ["30%", "50%", "30%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: "linear-gradient(135deg, rgba(0, 245, 255, 0.08), rgba(139, 92, 246, 0.08))",
          border: "1px solid rgba(0, 245, 255, 0.1)",
          filter: "blur(1px)",
        }}
      />

      {/* Circle */}
      <motion.div
        className="absolute bottom-32 right-20 w-24 h-24 md:w-40 md:h-40"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.3, 1],
          borderRadius: ["50%", "20%", "50%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: "linear-gradient(135deg, rgba(236, 72, 153, 0.08), rgba(139, 92, 246, 0.08))",
          border: "1px solid rgba(236, 72, 153, 0.1)",
          filter: "blur(1px)",
        }}
      />

      {/* Triangle-like shape */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-20 h-20 md:w-32 md:h-32"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
          borderRadius: ["0%", "50%", "0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.06), rgba(0, 245, 255, 0.06))",
          border: "1px solid rgba(139, 92, 246, 0.08)",
        }}
      />
    </div>
  );
}

// ============================================
// 3D ROTATING TEXT CUBE
// ============================================
function RotatingTextCube() {
  const words = ["Salesperson", "Growth Engine", "Lead Generator", "Brand Ambassador"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="relative h-20 md:h-24 lg:h-28 mt-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className="absolute inset-0 inline-block"
          initial={{ rotateX: -90, opacity: 0, y: 30 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: 90, opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ perspective: 1000 }}
        >
          <span className="text-gradient">{words[currentIndex]}</span>
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ============================================
// MAGNETIC BUTTON COMPONENT
// ============================================
function MagneticButton({ children, href, variant = "primary" }: { 
  children: React.ReactNode; 
  href: string; 
  variant?: "primary" | "secondary";
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative inline-flex items-center gap-3 px-10 py-5 font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 ${
        variant === "primary"
          ? "text-white hover:shadow-[0_0_50px_rgba(0,245,255,0.6)]"
          : "text-white border-2 border-primary-500/50 hover:border-primary-500 hover:bg-primary-500/10 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]"
      }`}
    >
      {variant === "primary" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-primary-500 to-accent-500" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-accent-500 via-primary-500 to-neon-cyan"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}
      
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight size={22} />
        </motion.div>
      </span>
    </motion.a>
  );
}

// ============================================
// LIVE DASHBOARD STATS
// ============================================
function DashboardStats() {
  const stats = [
    { 
      icon: Users, 
      value: 150, 
      suffix: "+", 
      label: "Happy Clients",
      color: "from-neon-cyan to-primary-500",
      metric: "Client Satisfaction",
      percentage: 98
    },
    { 
      icon: TrendingUp, 
      value: 3, 
      suffix: "x", 
      label: "Avg Lead Increase",
      color: "from-accent-500 to-primary-600",
      metric: "Lead Generation",
      percentage: 87
    },
    { 
      icon: Clock, 
      value: 7, 
      suffix: " Days", 
      label: "Avg Launch Time",
      color: "from-neon-lime to-neon-cyan",
      metric: "Project Delivery",
      percentage: 95
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {stats.map((stat, index) => (
        <DashboardStatCard key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  );
}

function DashboardStatCard({ stat, index }: { stat: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setCount(Math.floor(eased * stat.value));
      setProgressWidth(eased * stat.percentage);
      
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    animate();
  }, [isInView, stat.value, stat.percentage]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group relative"
    >
      {/* Outer glow */}
      <motion.div
        className={`absolute -inset-3 bg-gradient-to-r ${stat.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
      />

      {/* Card */}
      <div className="relative bg-gradient-to-br from-surface-800/80 to-surface-900/80 backdrop-blur-xl rounded-3xl border border-surface-700/50 p-6 overflow-hidden group-hover:border-primary-500/40 transition-all duration-500">
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        {/* Header with icon */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
          >
            <stat.icon className="text-white" size={28} />
          </motion.div>
          
          {/* Live indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-900/50 rounded-full border border-surface-700/50">
            <motion.div
              className="w-2 h-2 bg-neon-lime rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-surface-400 font-medium">LIVE</span>
          </div>
        </div>

        {/* Counter */}
        <div className="text-5xl font-black text-white mb-2 tabular-nums">
          {count}{stat.suffix}
        </div>

        {/* Label */}
        <div className="text-surface-400 font-medium text-sm mb-4">
          {stat.label}
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-surface-500">{stat.metric}</span>
            <span className="text-white font-semibold">{stat.percentage}%</span>
          </div>
          <div className="h-2 bg-surface-900/50 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
              style={{ width: `${progressWidth}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// TRUST BADGES WITH WAVE EFFECT
// ============================================
function TrustBadges() {
  const badges = [
    { text: "Free Consultation", color: "bg-neon-lime" },
    { text: "No Commitment", color: "bg-neon-cyan" },
    { text: "100% Satisfaction", color: "bg-accent-500" },
    { text: "24/7 Support", color: "bg-primary-500" },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.text}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 + index * 0.1 }}
          className="group flex items-center gap-3 px-5 py-3 bg-surface-800/50 backdrop-blur-xl rounded-full border border-surface-700/50 hover:border-primary-500/50 transition-all duration-300 hover:bg-surface-800/80"
        >
          <motion.div
            className={`w-2.5 h-2.5 ${badge.color} rounded-full`}
            animate={{ scale: [1, 1.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
          />
          <span className="text-surface-300 text-sm font-medium group-hover:text-white transition-colors">
            {badge.text}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// SCROLL INDICATOR
// ============================================
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3 }}
    >
      <span className="text-surface-500 text-xs uppercase tracking-[0.2em] font-medium">
        Discover More
      </span>
      <motion.div
        className="relative w-8 h-14 border-2 border-primary-500/30 rounded-full flex items-start justify-center p-2 backdrop-blur-sm"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-2 h-2 bg-gradient-to-r from-neon-cyan to-primary-500 rounded-full"
          animate={{ y: [0, 20, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary-500/10 blur-md"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.div>
  );
}

// ============================================
// MAIN HERO COMPONENT
// ============================================
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Track mouse position for interactive particles
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surface-950"
    >
      {/* ============================================ */}
      {/* ANIMATED BACKGROUND LAYERS */}
      {/* ============================================ */}
      
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-primary-950/30 to-surface-950" />

      {/* Morphing blobs */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="absolute -top-1/2 -left-1/2 w-full h-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 245, 255, 0.12) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Animated grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <motion.div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "100px 100px"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Morphing geometric shapes */}
      <MorphingShapes />

      {/* Interactive particles */}
      <InteractiveParticles mousePosition={mousePosition} />

      {/* Parallax overlay */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-950/40 to-surface-950 pointer-events-none"
      />

      {/* ============================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================ */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
      >
        {/* Announcement badge with sparkle */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-primary-500/30 mb-8 relative group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-primary-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="text-neon-cyan relative z-10" size={18} />
          </motion.div>
          <span className="text-white/90 font-medium text-sm relative z-10">
            6+ Years Crafting Websites That Convert
          </span>
        </motion.div>

        {/* Main headline with 3D rotating text */}
        <div className="mb-8">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-block"
            >
              Your Website
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="inline-block mt-2"
            >
              Should Be Your Best
            </motion.span>
            
            {/* 3D Rotating text cube */}
            <RotatingTextCube />
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.p
          className="text-xl md:text-2xl text-surface-400 max-w-3xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          I build{" "}
          <span className="text-white font-semibold">beautiful, fast websites</span>
          {" "}that turn visitors into{" "}
          <span className="text-neon-cyan font-semibold">paying customers</span>.
          <br className="hidden sm:block" />
          No tech jargon—just results that grow your business.
        </motion.p>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <MagneticButton href="#audit" variant="primary">
            Get Your Free Website Audit
          </MagneticButton>

          <MagneticButton href="#portfolio" variant="secondary">
            See My Work
          </MagneticButton>
        </motion.div>

        {/* Live dashboard-style stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-12"
        >
          <DashboardStats />
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <TrustBadges />
        </motion.div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
