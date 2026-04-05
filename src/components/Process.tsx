"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, Rocket, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Free Website Audit",
    description:
      "I review your current website (or social media if you don't have one) and identify what's holding you back. You'll get a clear, easy-to-understand report with actionable insights.",
    deliverables: ["Performance check", "Mobile-friendliness test", "Lead generation gaps", "Competitor comparison"],
    color: "from-neon-cyan to-primary-600",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Strategy & Design",
    description:
      "Based on the audit, I create a custom plan for your website. You'll see mockups and designs before any development starts—so there are no surprises.",
    deliverables: ["Custom design mockups", "Content strategy", "Conversion plan", "Timeline & pricing"],
    color: "from-primary-500 to-accent-600",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Build & Launch",
    description:
      "I build your website, handle all the technical stuff, and launch it for you. You get a website you're proud of—without lifting a finger.",
    deliverables: ["Full development", "Testing on all devices", "SEO setup", "Training & handover"],
    color: "from-accent-500 to-neon-lime",
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 bg-surface-950 relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-accent-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-primary-500/10 border border-primary-500/20 text-primary-400 rounded-full font-medium mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Simple 3-Step Process
          </h2>
          <p className="text-xl text-surface-400 max-w-3xl mx-auto">
            No complicated contracts or hidden fees. Just a straightforward process
            that gets you results fast.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-primary-500 to-accent-500 rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Step card */}
                <div className="bg-card-gradient rounded-2xl border border-surface-700/50 p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Step number & icon */}
                  <div className="relative mb-6">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto shadow-lg`}
                    >
                      <step.icon className="text-white" size={36} />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-surface-800 text-neon-cyan rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-display font-bold text-white mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-surface-400 text-center mb-6">
                    {step.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-surface-300 text-sm uppercase tracking-wide">
                      What You Get:
                    </h4>
                    {step.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 text-surface-300"
                      >
                        <CheckCircle className="text-neon-cyan flex-shrink-0" size={18} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          {[
            { value: "100%", label: "Satisfaction Rate" },
            { value: "7 Days", label: "Average Launch" },
            { value: "24/7", label: "Support Available" },
            { value: "Free", label: "Revisions Included" },
          ].map((badge) => (
            <div
              key={badge.label}
              className="text-center p-6 bg-surface-900 rounded-xl"
            >
              <div className="text-2xl font-bold text-primary-600">
                {badge.value}
              </div>
              <div className="text-surface-400 text-sm mt-1">{badge.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <a href="#audit" className="btn-accent inline-flex items-center gap-2 text-lg">
            Start with a Free Audit <Rocket size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}