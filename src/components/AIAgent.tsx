"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Bot,
  Phone,
  Calendar,
  MessageSquare,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play,
} from "lucide-react";

const features = [
  {
    icon: Phone,
    title: "Answers Calls 24/7",
    description:
      "Your AI receptionist never sleeps, takes breaks, or misses a call. It handles customer inquiries professionally—anytime, day or night.",
  },
  {
    icon: Calendar,
    title: "Books Appointments Automatically",
    description:
      "Customers can book, reschedule, or cancel appointments through natural conversation. It syncs directly with your calendar.",
  },
  {
    icon: MessageSquare,
    title: "Answers Common Questions",
    description:
      "Pricing? Hours? Location? Services? The AI knows your business inside out and provides instant, accurate answers.",
  },
  {
    icon: Clock,
    title: "Never Miss a Lead Again",
    description:
      "Every call is answered. Every inquiry is captured. You'll get a summary of all conversations and hot leads delivered to your inbox.",
  },
];

const stats = [
  { value: "90%", label: "Of calls answered after hours" },
  { value: "3.5x", label: "More leads captured monthly" },
  { value: "$2.4K", label: "Average monthly revenue increase" },
  { value: "< 1s", label: "Average response time" },
];

export default function AIAgent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="ai-agent"
      className="py-24 bg-surface-950 relative overflow-hidden"
      ref={ref}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-accent-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-primary-500/20 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Bot className="text-neon-cyan" size={20} />
            <span className="text-white font-medium">
              AI-Powered Customer Service
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
            Your 24/7 AI Receptionist
          </h2>
          <p className="text-xl text-surface-400 max-w-3xl mx-auto">
            Imagine never missing a customer call again. An AI voice agent answers inquiries,
            books appointments, and captures leads—automatically. While you focus on running your business.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-surface-900/50 backdrop-blur-sm border border-surface-700/50 rounded-2xl p-6 text-center"
              whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="text-3xl md:text-4xl font-bold text-neon-cyan mb-2">
                {stat.value}
              </div>
              <div className="text-surface-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-surface-900/50 border border-surface-700/50 rounded-2xl p-8 card-hover"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-cyan to-accent-500 flex items-center justify-center mb-6">
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-surface-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "We Set It Up",
                description:
                  "I configure your AI agent with your business information, services, pricing, and calendar. Takes about 2 days.",
              },
              {
                step: "2",
                title: "Customers Call",
                description:
                  "When you can't answer, the AI picks up. It sounds natural, answers questions, and handles bookings just like a real receptionist.",
              },
              {
                step: "3",
                title: "You Get Leads",
                description:
                  "Every conversation is summarized and sent to you. Hot leads are highlighted so you can follow up and close more deals.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing hint */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-accent-500/20 border border-accent-500/30 rounded-2xl">
            <TrendingUp className="text-accent-400" size={24} />
            <span className="text-white font-medium">
              Most clients see ROI within the first 2 weeks
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <a href="#audit" className="btn-accent inline-flex items-center gap-2 text-lg">
            See If AI Agent Is Right for Your Business <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}