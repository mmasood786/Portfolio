"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Palette,
  RefreshCw,
  Target,
  MapPin,
  Bot,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Website Design From Scratch",
    description:
      "Get a stunning website built from the ground up—designed to impress your visitors and grow your business.",
    features: [
      "Custom design that matches your brand",
      "Mobile-friendly (looks great on phones)",
      "Built to convert visitors into customers",
    ],
    gradient: "from-neon-cyan to-primary-500",
    glowColor: "shadow-neon-cyan",
  },
  {
    icon: RefreshCw,
    title: "Website Redesign",
    description:
      "Turn your outdated website into a modern, lead-generating machine that makes you proud.",
    features: [
      "Modern, professional look",
      "Faster loading speed",
      "Better user experience",
    ],
    gradient: "from-accent-500 to-primary-600",
    glowColor: "shadow-neon-pink",
  },
  {
    icon: Target,
    title: "Conversion Optimization",
    description:
      "Make small tweaks that bring big results—more inquiries, more bookings, more sales.",
    features: [
      "Clear call-to-action buttons",
      "Strategic layout for sales",
      "Data-driven improvements",
    ],
    gradient: "from-neon-lime to-neon-cyan",
    glowColor: "shadow-neon",
  },
  {
    icon: MapPin,
    title: "Google Maps Optimization",
    description:
      "Help local customers find you first when they search for your services nearby.",
    features: [
      "Appear in local searches",
      "Better google business profile",
      "More foot traffic to your business",
    ],
    gradient: "from-primary-500 to-accent-600",
    glowColor: "shadow-neon",
  },
  {
    icon: Bot,
    title: "Voice AI Agent",
    description:
      "An AI assistant that answers customer calls, books appointments, and captures leads—even while you sleep.",
    features: [
      "24/7 customer inquiry handling",
      "Automatic appointment booking",
      "Never miss a lead again",
    ],
    gradient: "from-neon-cyan via-primary-500 to-accent-500",
    glowColor: "shadow-neon-cyan",
    href: "#ai-agent",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 bg-surface-950 relative" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary-600/10 via-accent-500/10 to-primary-600/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 font-medium mb-6">
            <Sparkles size={16} />
            What I Offer
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6">
            Services That{" "}
            <span className="text-gradient">Grow Your Business</span>
          </h2>
          <p className="text-xl text-surface-400 max-w-3xl mx-auto">
            No confusing tech talk. Just proven services that bring you more customers, 
            more bookings, and more revenue.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="relative group p-8 bg-card-gradient rounded-2xl border border-surface-700/50 card-hover"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -12 }}
            >
              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-10 rounded-2xl`} />
                <div className="absolute inset-px rounded-2xl bg-surface-900/90" />
              </div>

              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                >
                  <service.icon className="text-white" size={32} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-surface-400 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="text-neon-cyan mt-1">✓</span>
                      <span className="text-surface-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {service.href ? (
                  <a
                    href={service.href}
                    className="inline-flex items-center gap-2 text-neon-cyan font-semibold group-hover:gap-3 transition-all"
                  >
                    Learn more <ArrowRight size={18} />
                  </a>
                ) : (
                  <a
                    href="#audit"
                    className="inline-flex items-center gap-2 text-primary-400 font-semibold group-hover:gap-3 transition-all"
                  >
                    Get Started <ArrowRight size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <p className="text-lg text-surface-400 mb-6">
            Not sure which service you need? Let me help you figure it out.
          </p>
          <a href="#audit" className="btn-accent inline-flex items-center gap-3">
            Get Free Website Audit <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}