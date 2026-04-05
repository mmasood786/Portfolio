"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectBriefForm from "@/components/ProjectBriefForm";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, Sparkles, CheckCircle, Clock, DollarSign, ArrowRight, Zap, Target, Layers } from "lucide-react";
import Link from "next/link";

// Floating shapes for background
const floatingShapes = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: Math.random() * 60 + 20,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 20 + 10,
  delay: Math.random() * 5,
  color: i % 3 === 0 ? "from-neon-cyan/20" : i % 3 === 1 ? "from-primary-500/15" : "from-accent-500/15",
  rotation: Math.random() * 360,
}));

// Animated stats
const stats = [
  { icon: Zap, value: "150+", label: "Projects Delivered" },
  { icon: Target, value: "98%", label: "Client Satisfaction" },
  { icon: Layers, value: "7", label: "Steps, That's All" },
];

export default function StartProjectPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothProgress, [0, 1], [0, -100]);
  const opacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.8], [1, 0.9]);

  return (
    <main className="min-h-screen bg-surface-950">
      <Navbar />

      {/* Hero section - completely redesigned */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-surface-950"
      >
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-primary-600/30 via-transparent to-transparent rounded-full blur-[150px]"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-neon-cyan/25 via-transparent to-transparent rounded-full blur-[140px]"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-accent-500/15 via-transparent to-transparent blur-[120px]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {floatingShapes.map((shape) => (
            <motion.div
              key={shape.id}
              className={`absolute bg-gradient-to-br ${shape.color} to-transparent rounded-2xl`}
              style={{
                width: shape.size,
                height: shape.size,
                left: `${shape.x}%`,
                top: `${shape.y}%`,
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, Math.sin(shape.rotation) * 30, 0],
                rotate: [0, shape.rotation, shape.rotation * 2],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                delay: shape.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Animated grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Radial fade overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-transparent to-surface-950/50" />

        {/* Content */}
        <motion.div
          style={{ y, opacity, scale }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Text */}
            <div>
              {/* Back link */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-surface-400 hover:text-neon-cyan transition-colors mb-8 group"
                >
                  <motion.div
                    className="w-8 h-8 rounded-lg bg-surface-800 flex items-center justify-center group-hover:bg-surface-700 transition-colors"
                    whileHover={{ x: -3 }}
                  >
                    <ArrowLeft size={16} />
                  </motion.div>
                  <span className="text-sm">Back to Home</span>
                </Link>
              </motion.div>

              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-3 px-5 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-primary-500/30 mb-8 glow-purple"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={18} className="text-neon-cyan" />
                </motion.div>
                <span className="text-white/90 font-medium text-sm">
                  Start Your Project Today
                </span>
              </motion.div>

              {/* Main heading with word-by-word animation */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white mb-8 leading-[1.1]">
                {["Tell", "Me", "About"].map((word, i) => (
                  <motion.span
                    key={word}
                    className="inline-block mr-4"
                    initial={{ opacity: 0, y: 40, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                <span className="relative inline-block">
                  <motion.span
                    className="text-gradient"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    Your Dream
                  </motion.span>
                  <br />
                  <motion.span
                    className="text-gradient"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.95, duration: 0.8 }}
                  >
                    Project
                  </motion.span>
                  {/* Animated underline */}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-primary-500 to-accent-500 rounded-full"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.3, duration: 0.8, ease: "easeOut" }}
                  />
                </span>
              </h1>

              {/* Description */}
              <motion.p
                className="text-xl md:text-2xl text-surface-400 mb-10 leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                Answer a few questions and I'll prepare a{" "}
                <span className="text-white font-semibold">personalized proposal</span> with
                timeline, pricing, and recommendations — within{" "}
                <span className="text-neon-cyan font-semibold">24 hours</span>.
              </motion.p>

              {/* Stats */}
              <motion.div
                className="flex flex-wrap gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="flex items-center gap-3 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + i * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-neon-cyan/20 to-primary-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      <stat.icon className="text-neon-cyan relative z-10" size={24} />
                    </div>
                    <div>
                      <div className="text-2xl font-black text-white">{stat.value}</div>
                      <div className="text-surface-500 text-xs font-medium">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right side - Visual cards */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              {/* Stacked glass cards with staggered animation */}
              <div className="relative">
                {/* Card 1 - Process */}
                <motion.div
                  className="bg-glass backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                  initial={{ y: 40, opacity: 0, rotate: 3 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan to-primary-500 flex items-center justify-center">
                      <Target size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">7-Step Process</div>
                      <div className="text-surface-400 text-sm">Simple & focused</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {["Business Info", "Features", "Integrations", "Budget"].map((step, i) => (
                      <motion.div
                        key={step}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                      >
                        <div className="w-6 h-6 rounded-full bg-neon-lime/20 flex items-center justify-center">
                          <CheckCircle size={14} className="text-neon-lime" />
                        </div>
                        <span className="text-surface-300 text-sm">{step}</span>
                      </motion.div>
                    ))}
                    <div className="text-surface-500 text-sm ml-9">+ 3 more...</div>
                  </div>
                </motion.div>

                {/* Card 2 - Timeline (floating below) */}
                <motion.div
                  className="bg-glass backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl mt-6 ml-8"
                  initial={{ y: 60, opacity: 0, rotate: -2 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-500 to-primary-600 flex items-center justify-center">
                      <Clock size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">Proposal in 24 Hours</div>
                      <div className="text-surface-400 text-xs">Personalized & detailed</div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-neon-cyan to-primary-500 rounded-full px-4 py-2 shadow-neon"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-white font-bold text-sm">100% Free</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="text-surface-500 text-xs font-medium uppercase tracking-widest">Scroll to begin</span>
          <motion.div
            className="w-6 h-10 border-2 border-surface-600 rounded-full flex items-start justify-center p-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-neon-cyan rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits strip */}
      <section className="py-8 border-y border-surface-800 bg-surface-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 justify-center">
              <Clock className="text-neon-cyan flex-shrink-0" size={24} />
              <div>
                <div className="text-white font-semibold">5 Minutes to Complete</div>
                <div className="text-surface-500 text-sm">Short and focused</div>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <DollarSign className="text-neon-lime flex-shrink-0" size={24} />
              <div>
                <div className="text-white font-semibold">No Obligation, Free</div>
                <div className="text-surface-500 text-sm">Zero commitment</div>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <CheckCircle className="text-accent-400 flex-shrink-0" size={24} />
              <div>
                <div className="text-white font-semibold">Proposal Within 24 Hours</div>
                <div className="text-surface-500 text-sm">Detailed & personalized</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="py-16 bg-surface-950 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-primary-600/5 via-accent-500/5 to-primary-600/5 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-card-gradient rounded-3xl border border-surface-700/50 p-6 sm:p-10 shadow-2xl">
            <ProjectBriefForm />
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="py-16 border-t border-surface-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Why Fill This Out?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                className="bg-surface-900/50 rounded-xl p-6 border border-surface-800 text-left"
              >
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-surface-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}