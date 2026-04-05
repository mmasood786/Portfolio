"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Star, Zap, Crown, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    icon: Star,
    description: "Perfect for small businesses getting online for the first time",
    price: "1,500",
    timeframe: "5-7 days delivery",
    iconGradient: "from-neon-cyan to-primary-500",
    features: [
      "Up to 5 pages website",
      "Mobile-friendly design",
      "Contact form integration",
      "Basic SEO setup",
      "Google Maps integration",
      "1 round of revisions",
      "30 days support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    icon: Zap,
    description: "Best for growing businesses that want to stand out",
    price: "3,500",
    timeframe: "7-10 days delivery",
    iconGradient: "from-accent-500 to-primary-600",
    features: [
      "Up to 10 pages website",
      "Premium custom design",
      "Online booking/contact system",
      "Advanced SEO optimization",
      "Google Business setup",
      "Social media integration",
      "WhatsApp chat widget",
      "2 rounds of revisions",
      "60 days priority support",
      "Performance analytics setup",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Premium",
    icon: Crown,
    description: "Complete solution for serious businesses ready to dominate",
    price: "6,500",
    timeframe: "10-14 days delivery",
    iconGradient: "from-neon-lime to-neon-cyan",
    features: [
      "Unlimited pages website",
      "Premium custom design + animations",
      "Full e-commerce or booking system",
      "Voice AI Agent integration",
      "Complete SEO package",
      "Content writing included",
      "Professional photography tips",
      "Google Ads setup assistance",
      "Unlimited revisions",
      "90 days VIP support",
      "Monthly performance reports",
      "Competitor analysis",
    ],
    cta: "Go Premium",
    popular: false,
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="pricing"
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
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Simple, Honest Pricing
          </h2>
          <p className="text-xl text-surface-400 max-w-3xl mx-auto">
            No hidden fees, no surprises. Choose the package that fits your needs
            and budget. All prices are one-time, not monthly.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-3xl overflow-hidden bg-card-gradient border border-surface-700/50 card-hover ${
                plan.popular
                  ? "md:-mt-4 md:mb-4 shadow-2xl"
                  : "shadow-xl"
              }`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ y: -8 }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-accent-500 to-primary-600 text-white text-sm font-bold px-6 py-2 rounded-bl-2xl z-10">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8 h-full">
                {/* Plan header */}
                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.iconGradient} flex items-center justify-center mx-auto mb-4`}
                  >
                    <plan.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-surface-400 text-sm mb-4">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-6 pb-6 border-b border-surface-700/50">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-surface-400 text-lg">$</span>
                    <span className="text-5xl font-bold text-white">
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-surface-400 text-sm mt-2">
                    {plan.timeframe}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-surface-300"
                    >
                      <CheckCircle
                        className="flex-shrink-0 mt-0.5 text-neon-cyan"
                        size={18}
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="#audit"
                  className={`block text-center py-4 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "btn-accent"
                      : "bg-surface-800 border border-surface-700 text-white hover:border-primary-500"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {plan.cta} <ArrowRight size={18} />
                  </span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          className="mt-16 bg-card-gradient rounded-3xl border border-surface-700/50 p-8 md:p-12 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-neon-lime/10 text-neon-lime rounded-full font-semibold mb-6">
              <CheckCircle size={24} />
              100% Satisfaction Guarantee
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Not Happy? I'll Make It Right.
            </h3>
            <p className="text-lg text-surface-400 max-w-3xl mx-auto">
              If you're not completely satisfied with your website, I'll revise it until you are.
              Your investment is protected—no questions asked. Plus, if I can't deliver what you need,
              you get a full refund.
            </p>
          </div>
        </motion.div>

        {/* Custom quote CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p className="text-lg text-surface-400 mb-4">
            Need something custom? Every business is different—let's talk about what works for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn-primary inline-flex items-center gap-2">
              Get Custom Quote <ArrowRight size={20} />
            </a>
            <a href="/offers" className="btn-secondary inline-flex items-center gap-2">
              View Full Pricing <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}