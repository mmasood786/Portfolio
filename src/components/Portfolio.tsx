"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useSpring as useSpringHook } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, ArrowRight, TrendingUp } from "lucide-react";

const projects = [
  {
    title: "Local Restaurant Website Redesign",
    category: "Restaurant & Hospitality",
    problem:
      "A popular family restaurant had an outdated website from 2015. Customers couldn't view the menu online, make reservations, or find their hours. They were losing 40+ potential customers per week to competitors with better websites.",
    solution:
      "Built a modern, mobile-first website with online reservations, digital menu with photos, Google Maps integration, and prominent call-to-action buttons. Added professional food photography and an inviting gallery.",
    results: [
      "180% increase in online reservations within 30 days",
      "Online orders increased by 95%",
      "Google reviews doubled from 47 to 98 in 3 months",
    ],
    metrics: { leads: "+180%", revenue: "+65%", speed: "2.1s → 0.8s" },
    image: "🍽️",
    bgColor: "from-surface-900 to-surface-800",
    accentColor: "bg-orange-500",
  },
  {
    title: "Dental Practice Website & Booking System",
    category: "Healthcare & Medical",
    problem:
      "A dental clinic had no online booking system. Patients had to call during office hours to schedule appointments. The website looked unprofessional and didn't inspire trust. They were losing patients to modern clinics.",
    solution:
      "Created a clean, professional website with integrated online booking, patient testimonials, service pages with clear pricing, and a friendly team section. Added WhatsApp chat widget for quick questions.",
    results: [
      "220% increase in new patient inquiries",
      "60% of bookings now happen online (even after hours)",
      "Patient retention improved by 45%",
    ],
    metrics: { leads: "+220%", revenue: "+85%", speed: "3.5s → 1.2s" },
    image: "🦷",
    bgColor: "from-surface-900 to-surface-800",
    accentColor: "bg-neon-cyan",
  },
  {
    title: "Home Services Company Website + AI Agent",
    category: "Home Services & Trades",
    problem:
      "A plumbing & HVAC company was missing calls after hours and on weekends. Their competitor with an AI voice agent was capturing all the emergency calls. They estimated losing $15,000+ per month in missed opportunities.",
    solution:
      "Designed a trust-building website with before/after photos, emergency service highlights, and integrated a Voice AI Agent to handle after-hours calls. The AI books appointments, answers FAQs, and routes emergencies.",
    results: [
      "Captured 90% of after-hours calls (previously 0%)",
      "$28,000 additional revenue in the first month",
      "Emergency bookings increased by 340%",
    ],
    metrics: { leads: "+340%", revenue: "+180%", speed: "4.2s → 1.0s" },
    image: "🔧",
    bgColor: "from-surface-900 to-surface-800",
    accentColor: "bg-accent-500",
  },
];

// Magnetic Button Component
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpringHook(x, { stiffness: 300, damping: 20 });
  const springY = useSpringHook(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothProgress, [0, 1], [100, -100]);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (hoveredProject === index) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section
      id="portfolio"
      className="py-24 bg-surface-950"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-primary-500/10 border border-primary-500/20 text-primary-400 rounded-full font-medium mb-4">
            My Work
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Real Results for Real Businesses
          </h2>
          <p className="text-xl text-surface-400 max-w-3xl mx-auto">
            Don't just take my word for it. See how I've helped businesses like yours
            get more customers through better websites.
          </p>
        </motion.div>

        {/* Projects */}
        <motion.div style={{ y }} className="space-y-20 lg:space-y-28">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start ${
                index % 2 === 1 ? "lg:order-2" : ""
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.7 }}
            >
              {/* Visual Card */}
              <motion.div
                className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${project.bgColor} border border-surface-700/50 min-h-[450px] lg:min-h-[500px] flex flex-col justify-between`}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Mouse follow gradient effect */}
                {hoveredProject === index && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.15), transparent 40%)`,
                    }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                {/* Background decoration */}
                <div
                  className={`absolute top-0 right-0 w-40 h-40 ${project.accentColor} opacity-20 rounded-full blur-3xl`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-32 h-32 ${project.accentColor} opacity-20 rounded-full blur-2xl`}
                />

                {/* Main content - with padding to prevent overlap */}
                <div className="relative p-8 lg:p-12 flex-1 flex flex-col justify-center items-center text-center z-10">
                  <motion.div
                    className="text-8xl mb-6"
                    animate={hoveredProject === index ? { scale: 1.1, rotate: [0, -5, 5, 0] } : { scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {project.image}
                  </motion.div>
                  <span
                    className={`inline-block px-4 py-2 bg-primary-500/10 border border-primary-500/20 text-primary-400 rounded-full text-sm font-medium mb-4`}
                  >
                    {project.category}
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>

                {/* Metrics - Separate section with clear spacing */}
                <div className="relative z-10 p-6 lg:p-8 bg-surface-900/60 backdrop-blur-sm border-t border-surface-700/50">
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div
                      className="bg-surface-800/80 rounded-xl p-4 text-center shadow-lg border border-surface-700/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      <TrendingUp className="text-neon-cyan mx-auto mb-2" size={24} />
                      <div className="text-xl lg:text-2xl font-bold text-white">
                        {project.metrics.leads}
                      </div>
                      <div className="text-xs lg:text-sm text-surface-400 font-medium">More Leads</div>
                    </motion.div>
                    <motion.div
                      className="bg-surface-800/80 rounded-xl p-4 text-center shadow-lg border border-surface-700/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-neon-cyan to-primary-500 bg-clip-text text-transparent">
                        {project.metrics.revenue}
                      </div>
                      <div className="text-xs lg:text-sm text-surface-400 font-medium">Revenue Growth</div>
                    </motion.div>
                    <motion.div
                      className="bg-surface-800/80 rounded-xl p-4 text-center shadow-lg border border-surface-700/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      <div className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent">
                        {project.metrics.speed}
                      </div>
                      <div className="text-xs lg:text-sm text-surface-400 font-medium">Load Speed</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="space-y-6 pt-8 lg:pt-24">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.15 }}
                >
                  <span className="text-neon-cyan font-semibold text-sm uppercase tracking-wider">
                    The Problem
                  </span>
                  <p className="text-surface-400 text-lg mt-2 leading-relaxed">
                    {project.problem}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.15 }}
                >
                  <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">
                    The Solution
                  </span>
                  <p className="text-surface-400 text-lg mt-2 leading-relaxed">
                    {project.solution}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15 }}
                >
                  <span className="text-accent-400 font-semibold text-sm uppercase tracking-wider">
                    The Results
                  </span>
                  <ul className="mt-3 space-y-3">
                    {project.results.map((result, i) => (
                      <motion.li
                        key={result}
                        className="flex items-start gap-3 text-surface-400"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + i * 0.1 + index * 0.15 }}
                      >
                        <span className="text-neon-cyan text-xl mt-1">→</span>
                        {result}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <MagneticButton className="inline-block">
                  <motion.a
                    href="#audit"
                    className="inline-flex items-center gap-2 text-primary-400 font-semibold hover:gap-3 transition-all group"
                    whileHover={{ x: 5 }}
                  >
                    Want similar results for your business?
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg text-surface-400 mb-6">
            Ready to see what your website could achieve?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton className="inline-block">
              <a href="#audit" className="btn-primary inline-flex items-center gap-2">
                Get Your Free Audit <ExternalLink size={20} />
              </a>
            </MagneticButton>
            <MagneticButton className="inline-block">
              <a href="/work" className="btn-secondary inline-flex items-center gap-2">
                View All Projects <ArrowRight size={20} />
              </a>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}