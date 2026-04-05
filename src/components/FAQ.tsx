"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to build my website?",
    answer:
      "Most websites are completed in 5-14 days, depending on the package you choose. Starter websites take about a week, while Premium projects with custom features take up to 2 weeks. I'll give you a clear timeline before we start, and I always deliver on time.",
  },
  {
    question: "Do I need to provide the content (text and images)?",
    answer:
      "Not necessarily! For Starter and Professional packages, I can help you write basic content and use high-quality stock images if needed. The Premium package includes professional content writing. Of course, if you have your own content, that's great too—I'll optimize it for your site.",
  },
  {
    question: "What if I don't like the design?",
    answer:
      "I show you design mockups before building anything, so you can give feedback early. Every package includes revision rounds (1 for Starter, 2 for Professional, unlimited for Premium). My goal is to make you proud of your website—I'm not done until you love it.",
  },
  {
    question: "Will my website work on phones and tablets?",
    answer:
      "Absolutely! Every website I build is fully responsive—meaning it looks and works great on phones, tablets, and desktop computers. In fact, I design mobile-first since most of your visitors will likely browse on their phones.",
  },
  {
    question: "Do you handle hosting and domain setup?",
    answer:
      "Yes! I'll help you set up hosting and connect your domain (or get a new one). I'll recommend affordable, reliable hosting options (usually $10-15/month) and handle all the technical setup for you. Your website will be live and ready to go.",
  },
  {
    question: "What's included in the free website audit?",
    answer:
      "The free audit is a thorough review of your current website (or social media if you don't have a site). You'll get a clear report covering: mobile-friendliness, loading speed, SEO basics, lead-generation gaps, and how you compare to competitors. No tech jargon—just actionable insights you can use, even if you don't hire me.",
  },
  {
    question: "Can I update my website myself after it's built?",
    answer:
      "Yes! I build websites that are easy to manage. I'll provide a simple training session (recorded for your reference) showing you how to update text, images, and manage bookings or orders. Plus, you'll have my support for the included support period.",
  },
  {
    question: "What is the Voice AI Agent and do I need it?",
    answer:
      "The Voice AI Agent is an intelligent phone assistant that answers customer calls, books appointments, and captures leads—even when you're busy or asleep. It's perfect for businesses that miss calls after hours or during busy periods. If you've ever lost a customer because you couldn't answer the phone, the AI Agent pays for itself quickly.",
  },
  {
    question: "Is there a monthly fee or is it a one-time payment?",
    answer:
      "The website design and development is a one-time payment—no monthly fees from me. The only ongoing costs are hosting ($10-15/month) and your domain ($10-15/year). If you choose the Voice AI Agent, that has a small monthly fee for the AI service (usually $50-100/month depending on call volume).",
  },
  {
    question: "How do we get started?",
    answer:
      "Simple! Click 'Get Free Website Audit' and fill out the form. I'll review your current online presence and send you a detailed report within 24 hours. From there, we can chat about your goals and I'll recommend the best package for your needs. No pressure, no obligation.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-32 bg-surface-950 relative"
      ref={ref}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary-600/10 via-accent-500/10 to-primary-600/10 rounded-full blur-[140px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-6 py-3 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 font-medium mb-6">
            Got Questions?
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-surface-400">
            Everything you need to know before getting started. 
            Can't find your answer? Just reach out—I'm happy to help.
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-card-gradient rounded-2xl border border-surface-700/50 overflow-hidden card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1">
                  <HelpCircle className="text-neon-cyan flex-shrink-0 mt-1" size={24} />
                  <h3 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-surface-400 flex-shrink-0" size={24} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-2 border-t border-surface-700/30">
                      <p className="text-surface-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          className="mt-16 relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          <div className="relative z-10 p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h3>
            <p className="text-white/80 mb-8 text-lg">
              Every business is unique. Let's discuss your specific needs and find the best solution for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-white/90 transition-all"
              >
                Contact Me
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                WhatsApp Me
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}