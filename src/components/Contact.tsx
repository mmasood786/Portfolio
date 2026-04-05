"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MessageCircle, Clock, MapPin, Send } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 bg-surface-950 relative" ref={ref}>
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-primary-600/10 to-transparent rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-6 py-3 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 font-medium mb-6">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6">
            Let's Talk About{" "}
            <span className="text-gradient">Your Website</span>
          </h2>
          <p className="text-xl text-surface-400 max-w-3xl mx-auto">
            Have a question? Want to discuss your project? I'd love to hear from you.
            No pressure, no hard sell—just a friendly conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Email */}
            <motion.a
              href="mailto:hello@devstudio.com"
              className="flex items-start gap-6 p-6 bg-card-gradient rounded-2xl border border-surface-700/50 card-hover group"
              whileHover={{ x: 8 }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-cyan to-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Mail className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Email Me
                </h3>
                <p className="text-neon-cyan font-medium group-hover:underline">
                  hello@devstudio.com
                </p>
                <p className="text-surface-400 mt-1">
                  I respond within 24 hours, usually much sooner
                </p>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/1234567890?text=Hi!%20I'm%20interested%20in%20your%20web%20design%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-6 p-6 bg-card-gradient rounded-2xl border border-surface-700/50 card-hover group"
              whileHover={{ x: 8 }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neon-lime to-neon-cyan flex items-center justify-center flex-shrink-0 shadow-lg">
                <MessageCircle className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  WhatsApp / DM
                </h3>
                <p className="text-neon-lime font-medium group-hover:underline">
                  Send me a message directly
                </p>
                <p className="text-surface-400 mt-1">
                  Quick questions? Chat with me on WhatsApp
                </p>
              </div>
            </motion.a>

            {/* Response time */}
            <div className="flex items-start gap-6 p-6 bg-card-gradient rounded-2xl border border-surface-700/50">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500 to-primary-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Clock className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Response Time
                </h3>
                <p className="text-surface-300">
                  I typically respond within a few hours during business hours
                  (9 AM - 6 PM, Monday to Saturday)
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-6 p-6 bg-card-gradient rounded-2xl border border-surface-700/50">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <MapPin className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Serving Local Businesses
                </h3>
                <p className="text-surface-300">
                  I work with businesses in the local area and can meet in person
                  if needed. Remote work is also available.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative p-8 md:p-10 rounded-3xl border-animated">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Prefer I reach out to you?
                </h3>
                <p className="text-surface-400 mb-8">
                  Drop your email and a brief message. I'll get back to you with
                  personalized suggestions for your website.
                </p>

                <form
                  className="space-y-5"
                  name="contact-form"
                  method="POST"
                  action="/success?form=contact"
                >
                  <input type="hidden" name="form-name" value="contact-form" />
                  <input type="hidden" name="bot-field" />
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-surface-800/50 border border-surface-700 placeholder-surface-500 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      required
                      className="w-full px-5 py-4 rounded-xl bg-surface-800/50 border border-surface-700 placeholder-surface-500 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Tell me about your website or what you need help with..."
                      rows={4}
                      required
                      className="w-full px-5 py-4 rounded-xl bg-surface-800/50 border border-surface-700 placeholder-surface-500 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full btn-accent flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message <Send size={20} />
                  </motion.button>
                </form>

                <p className="text-surface-500 text-sm text-center mt-6">
                  Or email me directly at{" "}
                  <a
                    href="mailto:hello@devstudio.com"
                    className="text-neon-cyan underline hover:text-primary-400"
                  >
                    hello@devstudio.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
