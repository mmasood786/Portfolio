"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Star, ArrowRight, Mail, Clock, Phone } from "lucide-react";

interface ThankYouPopupProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  formType: "audit" | "project";
}

export default function ThankYouPopup({ isOpen, onClose, name, formType }: ThankYouPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <div className="relative max-w-lg w-full bg-gradient-to-br from-surface-800 to-surface-900 rounded-3xl border border-surface-700/50 shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 text-surface-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                <X size={20} />
              </button>

              {/* Animated background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-neon-cyan/20 via-primary-500/20 to-accent-500/20 rounded-full blur-3xl" />

              {/* Content */}
              <div className="relative p-8 md:p-10">
                {/* Success icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-cyan via-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <CheckCircle className="text-white" size={40} />
                  </motion.div>
                </motion.div>

                {/* Thank you message */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl font-display font-black text-white text-center mb-3"
                >
                  Thank You, {name.split(" ")[0]}! 🎉
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-surface-400 text-center mb-8"
                >
                  {formType === "audit"
                    ? "I'll review your website and send you a detailed audit report within 24 hours."
                    : "I'll review your project brief and send you a personalized proposal within 24 hours."}
                </motion.p>

                {/* What happens next */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-surface-900/50 rounded-2xl p-6 mb-8 border border-surface-700/30"
                >
                  <h3 className="text-white font-bold mb-4">What happens next?</h3>
                  <div className="space-y-4">
                    {[
                      {
                        step: "1",
                        text: formType === "audit" ? "I analyze your website" : "I review your requirements",
                      },
                      {
                        step: "2",
                        text: "I prepare a detailed report/proposal for you",
                      },
                      {
                        step: "3",
                        text: "I email you within 24 hours with next steps",
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-primary-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {item.step}
                        </div>
                        <p className="text-surface-300 flex-1">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Contact info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3 mb-8"
                >
                  <div className="flex items-center gap-3 text-surface-400">
                    <Clock size={18} className="text-neon-cyan flex-shrink-0" />
                    <span className="text-sm">Average response time: <strong className="text-white">2-4 hours</strong></span>
                  </div>
                  <div className="flex items-center gap-3 text-surface-400">
                    <Mail size={18} className="text-primary-500 flex-shrink-0" />
                    <span className="text-sm">Check your email (and spam folder)</span>
                  </div>
                </motion.div>

                {/* Stars */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-center gap-1 mb-6"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <Star size={20} className="text-yellow-500 fill-yellow-500" />
                    </motion.div>
                  ))}
                  <span className="text-surface-400 text-sm ml-2">4.9/5 from 150+ happy clients</span>
                </motion.div>

                {/* CTA button */}
                <motion.a
                  href="/"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={onClose}
                  className="block text-center py-4 rounded-2xl bg-gradient-to-r from-neon-cyan via-primary-500 to-accent-500 text-white font-bold text-lg hover:shadow-[0_0_50px_rgba(0,245,255,0.6)] transition-all"
                >
                  <span className="flex items-center justify-center gap-2">
                    Back to Home
                    <ArrowRight size={20} />
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
