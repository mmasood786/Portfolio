"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  CreditCard,
  Users,
  MessageCircle,
  BarChart3,
  Calendar,
  Mail,
  Phone,
  Shield,
  ExternalLink,
  Info,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const integrations = [
  {
    icon: CreditCard,
    name: "Stripe",
    category: "Payment Processing",
    description: "Accept credit card payments securely on your website. Perfect for e-commerce and service businesses.",
    priceRange: "2.9% + $0.30 per transaction",
    priceType: "per-transaction",
    features: ["Online payments", "Invoicing", "Recurring billing", "Multi-currency"],
    gradient: "from-neon-cyan to-primary-500",
  },
  {
    icon: Users,
    name: "HubSpot CRM",
    category: "Customer Relationship Management",
    description: "Track leads, manage contacts, and automate follow-ups. Free tier available for small businesses.",
    priceRange: "$0-45/month",
    priceType: "monthly",
    features: ["Contact management", "Email tracking", "Deal pipeline", "Automation"],
    gradient: "from-accent-500 to-primary-600",
  },
  {
    icon: Calendar,
    name: "Calendly",
    category: "Appointment Scheduling",
    description: "Let clients book appointments automatically. Eliminates back-and-forth emails and no-shows.",
    priceRange: "$0-12/month",
    priceType: "monthly",
    features: ["Online booking", "Calendar sync", "Automated reminders", "Custom forms"],
    gradient: "from-neon-lime to-neon-cyan",
  },
  {
    icon: MessageCircle,
    name: "WhatsApp Business API",
    category: "Customer Communication",
    description: "Connect with customers on WhatsApp. Send booking confirmations, updates, and support messages.",
    priceRange: "Free-50/month",
    priceType: "monthly",
    features: ["Instant messaging", "Automated replies", "Broadcast messages", "Customer support"],
    gradient: "from-primary-500 to-accent-600",
  },
  {
    icon: BarChart3,
    name: "Google Analytics",
    category: "Analytics & Insights",
    description: "Understand your website visitors: where they come from, what they do, and how to convert them.",
    priceRange: "Free",
    priceType: "free",
    features: ["Visitor tracking", "Conversion goals", "Traffic sources", "Real-time data"],
    gradient: "from-neon-cyan via-primary-500 to-accent-500",
  },
  {
    icon: Mail,
    name: "Mailchimp",
    category: "Email Marketing",
    description: "Build your email list and send newsletters. Turn visitors into repeat customers with automated campaigns.",
    priceRange: "$0-20/month",
    priceType: "monthly",
    features: ["Email campaigns", "Contact lists", "Automation", "Analytics"],
    gradient: "from-accent-500 to-neon-lime",
  },
  {
    icon: Phone,
    name: "Twilio",
    category: "SMS & Voice",
    description: "Send SMS notifications, appointment reminders, and automate phone systems for your business.",
    priceRange: "$1-50/month",
    priceType: "usage-based",
    features: ["SMS notifications", "Voice calls", "Two-factor auth", "Automated alerts"],
    gradient: "from-primary-600 to-neon-cyan",
  },
  {
    icon: Shield,
    name: "Cloudflare",
    category: "Security & Performance",
    description: "Protect your website from attacks and make it load faster. Essential for security and reliability.",
    priceRange: "Free-20/month",
    priceType: "monthly",
    features: ["DDoS protection", "CDN", "SSL certificate", "DNS management"],
    gradient: "from-neon-lime to-primary-500",
  },
];

export default function Integrations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="integrations"
      className="py-24 bg-surface-950 relative overflow-hidden"
      ref={ref}
    >
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-primary-600/5 via-accent-500/5 to-neon-cyan/5 rounded-full blur-[150px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-primary-500/10 border border-primary-500/20 text-primary-400 rounded-full font-medium mb-4">
            Third-Party Integrations
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Powerful Tools to{" "}
            <span className="text-gradient">Grow Your Business</span>
          </h2>
          <p className="text-xl text-surface-400 max-w-3xl mx-auto mb-6">
            Your website can connect with industry-leading tools for payments, CRM, email marketing, and more. 
            These optional services have separate monthly costs paid directly to the providers.
          </p>
          <div className="inline-flex items-start gap-3 px-6 py-4 bg-surface-900/50 border border-surface-700/50 rounded-2xl max-w-2xl mx-auto">
            <Info className="flex-shrink-0 mt-0.5 text-neon-cyan" size={20} />
            <div className="text-left">
              <p className="text-surface-300 text-sm font-medium mb-1">
                Transparent Cost Information
              </p>
              <p className="text-surface-400 text-sm">
                These are optional third-party services. You pay providers directly—we never mark up these costs. 
                We'll recommend the best tools for your specific needs and budget during consultation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Integrations grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              className="relative group p-6 bg-card-gradient rounded-2xl border border-surface-700/50 card-hover h-full flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{ y: -8 }}
            >
              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 bg-gradient-to-r ${integration.gradient} opacity-10 rounded-2xl`} />
                <div className="absolute inset-px rounded-2xl bg-surface-900/90" />
              </div>

              {/* Glow effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${integration.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${integration.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
                  >
                    <integration.icon className="text-white" size={28} />
                  </div>
                  <ExternalLink className="text-surface-600 group-hover:text-primary-400 transition-colors" size={18} />
                </div>

                {/* Content */}
                <div className="mb-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-display font-bold text-white">
                      {integration.name}
                    </h3>
                  </div>
                  <span className="inline-block px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-xs font-medium mb-3">
                    {integration.category}
                  </span>
                  <p className="text-surface-400 text-sm leading-relaxed mb-4">
                    {integration.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {integration.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle className="flex-shrink-0 mt-0.5 text-neon-cyan" size={14} />
                      <span className="text-surface-300 text-xs">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="pt-4 border-t border-surface-700/50 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-surface-400 text-xs">Monthly Cost:</span>
                    <span className={`text-sm font-bold ${
                      integration.priceType === 'free' 
                        ? 'text-neon-lime' 
                        : integration.priceType === 'per-transaction'
                        ? 'text-neon-cyan'
                        : 'text-white'
                    }`}>
                      {integration.priceRange}
                    </span>
                  </div>
                  {integration.priceType !== 'free' && (
                    <p className="text-surface-500 text-xs mt-1">
                      {integration.priceType === 'per-transaction' 
                        ? 'Per transaction fee'
                        : integration.priceType === 'usage-based'
                        ? 'Based on your usage'
                        : 'Varies by plan'}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Key benefits */}
        <motion.div
          className="mb-16 bg-card-gradient rounded-3xl border border-surface-700/50 p-8 md:p-12 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Why Integrate These Tools?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "You Own Everything",
                description: "All accounts and data belong to you. No vendor lock-in, complete control over your business tools.",
                icon: Shield,
              },
              {
                title: "Scale As You Grow",
                description: "Start with free tiers and upgrade when you're ready. Pay only for what you actually need and use.",
                icon: BarChart3,
              },
              {
                title: "We Handle Setup",
                description: "We'll configure everything for you, provide training, and be there for ongoing support if needed.",
                icon: CheckCircle,
              },
            ].map((benefit, index) => (
              <div key={benefit.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan to-primary-500 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="text-white" size={32} />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{benefit.title}</h4>
                <p className="text-surface-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p className="text-lg text-surface-400 mb-6">
            Not sure which tools you need? Let's discuss your business requirements and I'll recommend the perfect stack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#audit" className="btn-primary inline-flex items-center gap-2">
              Get Free Consultation <ArrowRight size={20} />
            </a>
            <a href="#contact" className="btn-secondary inline-flex items-center gap-2">
              Contact Me <ArrowRight size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
