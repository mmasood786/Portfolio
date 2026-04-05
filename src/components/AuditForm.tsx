"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search, CheckCircle, AlertCircle, Loader2, Sparkles, Tag } from "lucide-react";
<<<<<<< HEAD
=======
import ThankYouPopup from "./ThankYouPopup";
>>>>>>> 9746ec8 (add a netlify form functionality)

const offers = {
  "from-scratch": {
    id: "from-scratch",
    name: "From Scratch Launch Package",
    price: "$2,497",
    originalPrice: "$3,500",
  },
  "ai-redesign": {
    id: "ai-redesign",
    name: "AI-Powered Website Redesign",
    price: "$1,797",
    originalPrice: "$2,800",
  },
};

export default function AuditForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
<<<<<<< HEAD
=======
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
>>>>>>> 9746ec8 (add a netlify form functionality)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    businessType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Check URL hash for pre-selected offer
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#offer-")) {
      const offerId = hash.replace("#offer-", "");
      if (offers[offerId as keyof typeof offers]) {
        setSelectedOffer(offerId);
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
<<<<<<< HEAD
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          selectedOffer: selectedOffer ? offers[selectedOffer as keyof typeof offers].name : null,
        }),
=======
      // Encode form data for Netlify Forms
      const formDataObj = new FormData();
      formDataObj.append("form-name", "audit-form");
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("website", formData.website || "");
      formDataObj.append("business_type", formData.businessType);
      formDataObj.append("message", formData.message || "");
      if (selectedOffer) {
        formDataObj.append("selected_offer", offers[selectedOffer as keyof typeof offers].name);
      }

      // Submit to Netlify Forms
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formDataObj as any).toString(),
>>>>>>> 9746ec8 (add a netlify form functionality)
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

<<<<<<< HEAD
      setIsSubmitted(true);
=======
      // Show thank you popup
      setIsSubmitted(true);
      setShowThankYouPopup(true);
>>>>>>> 9746ec8 (add a netlify form functionality)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<<<<<<< HEAD
=======
    <>
>>>>>>> 9746ec8 (add a netlify form functionality)
    <section
      id="audit"
      className="py-32 bg-surface-950 relative"
      ref={ref}
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary-600/10 to-transparent rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent-500/10 to-transparent rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Value proposition */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-6 py-3 bg-accent-500/10 border border-accent-500/20 rounded-full text-accent-400 font-medium mb-6">
              Free Offer — No Strings Attached
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">
              Get Your Free{" "}
              <span className="text-gradient">Website Audit</span>
            </h2>
            <p className="text-xl text-surface-400 mb-10 leading-relaxed">
              I'll personally review your website and send you a detailed report showing:
            </p>

            <div className="space-y-6 mb-10">
              {[
                "Why visitors might be leaving without contacting you",
                "Mobile issues you probably didn't know about",
                "Quick wins to get more calls and bookings",
                "How your website compares to your competitors",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-neon-lime/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="text-neon-lime" size={20} />
                  </div>
                  <span className="text-surface-300 text-lg">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Social proof */}
            <div className="bg-card-gradient rounded-2xl border border-surface-700/50 p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-accent-500 border-2 border-surface-900 flex items-center justify-center text-white text-sm font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="font-bold text-white">150+ Businesses Audited</div>
                  <div className="text-surface-400 text-sm">Last 12 months</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    ★
                  </span>
                ))}
                <span className="text-surface-400 ml-2">
                  Average rating from audit recipients
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative rounded-3xl overflow-hidden">
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-primary-500 to-accent-500 opacity-50 animate-gradient bg-[length:200%_auto]" style={{ padding: "2px" }}>
                <div className="w-full h-full bg-surface-900 rounded-3xl" />
              </div>
              
              <div className="relative bg-surface-900/95 backdrop-blur-xl p-8 md:p-10 m-[2px] rounded-3xl">
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-neon-lime/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="text-neon-lime" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Audit Request Received!
                    </h3>
                    <p className="text-surface-400 mb-4">
                      Thanks, {formData.name}! I'll review your website and send your
                      free audit report within 24 hours.
                    </p>
                    {selectedOffer && offers[selectedOffer as keyof typeof offers] && (
                      <div className="bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl p-4 mb-4">
                        <p className="text-neon-cyan font-semibold text-sm mb-1">
                          🎉 Great choice! You selected:
                        </p>
                        <p className="text-white font-bold">
                          {offers[selectedOffer as keyof typeof offers].name} — {offers[selectedOffer as keyof typeof offers].price}
                        </p>
                      </div>
                    )}
                    <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
                      <p className="text-primary-400 font-medium">
                        While you wait, think about what you'd most like to improve 
                        about your online presence.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-8">
                      <Search className="text-neon-cyan" size={28} />
                      <h3 className="text-2xl font-bold text-white">
                        Request Your Free Audit
                      </h3>
                    </div>

                    {/* Selected Offer Banner */}
                    {selectedOffer && offers[selectedOffer as keyof typeof offers] && (
                      <motion.div
                        className="mb-6 p-5 bg-gradient-to-r from-neon-cyan/10 via-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-xl"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <Tag size={24} className="text-neon-cyan flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-neon-cyan uppercase tracking-wider">
                                  Selected Offer
                                </span>
                              </div>
                              <h4 className="text-white font-bold text-lg">
                                {offers[selectedOffer as keyof typeof offers].name}
                              </h4>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-surface-500 line-through text-sm">
                                  {offers[selectedOffer as keyof typeof offers].originalPrice}
                                </span>
                                <span className="text-neon-cyan font-black text-xl">
                                  {offers[selectedOffer as keyof typeof offers].price}
                                </span>
                                <span className="px-2 py-1 bg-neon-lime/10 border border-neon-lime/30 rounded-full text-neon-lime text-xs font-bold">
                                  Save $1,003
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => setSelectedOffer(null)}
                            className="text-surface-500 hover:text-white transition-colors text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {error && (
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
                        <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
                        <span className="text-red-400">{error}</span>
                      </div>
                    )}

<<<<<<< HEAD
                    <form onSubmit={handleSubmit} className="space-y-5">
=======
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      name="audit-form"
                      method="POST"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      action="/success"
                    >
                      {/* Hidden field for Netlify Forms */}
                      <input type="hidden" name="form-name" value="audit-form" />
                      <input type="hidden" name="bot-field" />

>>>>>>> 9746ec8 (add a netlify form functionality)
                      <div>
                        <label className="block text-surface-300 font-medium mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                          placeholder="John Smith"
                        />
                      </div>

                      <div>
                        <label className="block text-surface-300 font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                          placeholder="john@yourbusiness.com"
                        />
                      </div>

                      <div>
                        <label className="block text-surface-300 font-medium mb-2">
                          Website URL (if you have one)
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="w-full px-5 py-4 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>

                      <div>
                        <label className="block text-surface-300 font-medium mb-2">
                          What type of business do you run? *
                        </label>
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          required
                          className="w-full px-5 py-4 rounded-xl bg-surface-800/50 border border-surface-700 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        >
                          <option value="" className="bg-surface-900">Select your industry</option>
                          <option value="restaurant" className="bg-surface-900">Restaurant / Cafe</option>
                          <option value="healthcare" className="bg-surface-900">Healthcare / Medical</option>
                          <option value="home-services" className="bg-surface-900">Home Services (Plumbing, HVAC, etc.)</option>
                          <option value="retail" className="bg-surface-900">Retail / E-commerce</option>
                          <option value="professional" className="bg-surface-900">Professional Services (Lawyer, Accountant, etc.)</option>
                          <option value="fitness" className="bg-surface-900">Fitness / Wellness</option>
                          <option value="beauty" className="bg-surface-900">Beauty / Salon</option>
                          <option value="other" className="bg-surface-900">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-surface-300 font-medium mb-2">
                          What's your biggest challenge right now? (optional)
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-5 py-4 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none"
                          placeholder="e.g., Not getting enough inquiries, website looks outdated..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-accent text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" size={20} />
                            Sending Request...
                          </>
                        ) : (
                          <>
                            Get My Free Audit <Search size={20} />
                          </>
                        )}
                      </motion.button>

                      <p className="text-surface-500 text-sm text-center">
                        No spam, no obligations. Just a free, honest review of your website.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
<<<<<<< HEAD
=======

    {/* Thank You Popup */}
    <ThankYouPopup
      isOpen={showThankYouPopup}
      onClose={() => setShowThankYouPopup(false)}
      name={formData.name}
      formType="audit"
    />
    </>
>>>>>>> 9746ec8 (add a netlify form functionality)
  );
}