"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Sparkles,
  Palette,
  DollarSign,
  AlertCircle,
  MessageCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";

// Simple feature list in plain language
const FEATURES = [
  { key: "contact_form", label: "Contact Form", desc: "Let visitors reach you easily" },
  { key: "online_booking", label: "Online Booking", desc: "Let customers book appointments" },
  { key: "ecommerce", label: "Sell Products Online", desc: "Shopping cart & payments" },
  { key: "blog", label: "Blog or News", desc: "Share updates with customers" },
  { key: "gallery", label: "Photo Gallery", desc: "Showcase your work or products" },
  { key: "live_chat", label: "Live Chat", desc: "Chat with visitors in real-time" },
  { key: "ai_agent", label: "AI Phone Assistant", desc: "Never miss a customer call again" },
  { key: "newsletter", label: "Email Signup", desc: "Build your email list" },
];

// Third-party tools in simple language
const TOOLS = [
  "HubSpot or CRM system",
  "Mailchimp or email marketing",
  "Stripe or online payments",
  "Calendly or booking system",
  "Google Analytics",
  "Social media (Facebook, Instagram)",
  "QuickBooks or accounting",
  "WhatsApp Business",
  "Coupon / loyalty program",
  "I don't use any of these yet",
];

const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Not sure yet",
];

const STEPS = [
  { id: 0, title: "About You", icon: Building2 },
  { id: 1, title: "What You Need", icon: Sparkles },
  { id: 2, title: "Look & Feel", icon: Palette },
  { id: 3, title: "Budget & Timing", icon: DollarSign },
];

export default function ProjectBriefForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    // Step 1: About You
    businessName: "",
    industry: "",
    currentWebsite: "",
    contactName: "",
    contactEmail: "",
    projectType: "",

    // Step 2: What You Need
    features: [] as string[],
    existingTools: [] as string[],
    notes: "",

    // Step 3: Look & Feel
    exampleWebsites: "",
    stylePreference: "",
    hasContent: "",

    // Step 4: Budget & Timing
    budgetRange: "",
    desiredLaunchDate: "",
    deadline: "",
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (key: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(key)
        ? prev.features.filter((f) => f !== key)
        : [...prev.features, key],
    }));
  };

  const toggleTool = (tool: string) => {
    setFormData((prev) => ({
      ...prev,
      existingTools: prev.existingTools.includes(tool)
        ? prev.existingTools.filter((t) => t !== tool)
        : [...prev.existingTools, tool],
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 0:
        return !!(formData.businessName && formData.contactName && formData.contactEmail && formData.projectType);
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const handleNext = async () => {
    if (!validateStep()) return;
    
    if (currentStep === STEPS.length - 1) {
      // Final step - submit to API
      setIsSubmitting(true);
      setError("");
      setSubmitStatus(null);

      try {
        const response = await fetch("/api/project-brief", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (result.success) {
          setSubmitStatus({ success: true, message: result.message });
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Failed to submit. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      nextStep();
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-surface-400 text-sm">
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <span className="text-surface-400 text-sm">
            {STEPS[currentStep].title}
          </span>
        </div>
        <div className="w-full h-1.5 bg-surface-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-cyan to-primary-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
          <span className="text-red-400">{error}</span>
        </div>
      )}

      {/* Success message */}
      {submitStatus?.success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 flex items-start gap-3"
        >
          <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-green-400 font-medium">{submitStatus.message}</p>
            <button
              onClick={() => {
                setSubmitStatus(null);
                setCurrentStep(0);
                setFormData({
                  businessName: "",
                  industry: "",
                  currentWebsite: "",
                  contactName: "",
                  contactEmail: "",
                  projectType: "",
                  features: [],
                  existingTools: [],
                  notes: "",
                  exampleWebsites: "",
                  stylePreference: "",
                  hasContent: "",
                  budgetRange: "",
                  desiredLaunchDate: "",
                  deadline: "",
                });
              }}
              className="text-green-400 underline text-sm mt-2 hover:text-green-300"
            >
              Submit another brief
            </button>
          </div>
        </motion.div>
      )}

      {/* Form steps */}
      <AnimatePresence mode="wait">
        {/* Step 0: About You */}
        {currentStep === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Let's Start With the Basics</h3>
              <p className="text-surface-400">Just a few details so I know who you are.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-surface-300 font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => updateField("contactName", e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-surface-300 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => updateField("contactEmail", e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="john@yourbusiness.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-surface-300 font-medium mb-2">Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => updateField("businessName", e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="Smith's Bakery"
                />
              </div>
              <div>
                <label className="block text-surface-300 font-medium mb-2">What Kind of Business?</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => updateField("industry", e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="Restaurant, Salon, Retail..."
                />
              </div>
            </div>

            <div>
              <label className="block text-surface-300 font-medium mb-2">Current Website (if you have one)</label>
              <input
                type="url"
                value={formData.currentWebsite}
                onChange={(e) => updateField("currentWebsite", e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 outline-none transition-all"
                placeholder="https://yourwebsite.com — leave blank if you don't have one"
              />
            </div>

            <div>
              <label className="block text-surface-300 font-medium mb-3">What Do You Need?</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: "redesign", label: "Redesign My Site", desc: "I have one, it needs updating" },
                  { value: "new", label: "Build From Scratch", desc: "I need a brand new website" },
                  { value: "not-sure", label: "Not Sure Yet", desc: "I'd love your advice" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateField("projectType", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.projectType === option.value
                        ? "border-primary-500 bg-primary-500/10"
                        : "border-surface-700 bg-surface-800/50 hover:border-surface-600"
                    }`}
                  >
                    <div className="text-white font-semibold text-sm mb-0.5">{option.label}</div>
                    <div className="text-surface-500 text-xs">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: What You Need */}
        {currentStep === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">What Should Your Website Do?</h3>
              <p className="text-surface-400">Pick whatever applies — you can always add more later.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURES.map((feature) => (
                <button
                  key={feature.key}
                  onClick={() => toggleFeature(feature.key)}
                  className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                    formData.features.includes(feature.key)
                      ? "border-primary-500 bg-primary-500/10"
                      : "border-surface-700 bg-surface-800/50 hover:border-surface-600"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      formData.features.includes(feature.key)
                        ? "bg-primary-500 text-white"
                        : "border border-surface-600"
                    }`}
                  >
                    {formData.features.includes(feature.key) && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{feature.label}</div>
                    <div className="text-surface-500 text-xs">{feature.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-surface-300 font-medium mb-3">
                Do You Already Use Any of These Tools?
              </label>
              <p className="text-surface-500 text-sm mb-4">
                If you use any of these, I can connect them to your new website. If not — no worries!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TOOLS.map((tool) => (
                  <button
                    key={tool}
                    onClick={() => toggleTool(tool)}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all text-sm ${
                      formData.existingTools.includes(tool)
                        ? "border-primary-500 bg-primary-500/10 text-white"
                        : "border-surface-700 bg-surface-800/50 text-surface-400 hover:border-surface-600"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                        formData.existingTools.includes(tool)
                          ? "bg-primary-500"
                          : "border border-surface-600"
                      }`}
                    >
                      {formData.existingTools.includes(tool) && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    {tool}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-surface-300 font-medium mb-2">
                Anything Else I Should Know? <span className="text-surface-500">(optional)</span>
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                rows={2}
                className="w-full px-5 py-3.5 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 outline-none transition-all resize-none"
                placeholder="e.g., I need it before my grand opening on June 1st..."
              />
            </div>
          </motion.div>
        )}

        {/* Step 2: Look & Feel */}
        {currentStep === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">How Should It Look?</h3>
              <p className="text-surface-400">This helps me understand your style. None of this is required!</p>
            </div>

            <div>
              <label className="block text-surface-300 font-medium mb-2">
                Any Websites You Like the Look Of?
              </label>
              <input
                type="text"
                value={formData.exampleWebsites}
                onChange={(e) => updateField("exampleWebsites", e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 outline-none transition-all"
                placeholder="e.g., apple.com — or just describe what you like"
              />
            </div>

            <div>
              <label className="block text-surface-300 font-medium mb-3">Pick the Style That Feels Right</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { value: "modern", label: "Clean & Modern", emoji: "✨" },
                  { value: "corporate", label: "Professional & Trustworthy", emoji: "🏢" },
                  { value: "playful", label: "Fun & Colorful", emoji: "🎨" },
                  { value: "minimal", label: "Simple & Minimal", emoji: "○" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateField("stylePreference", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.stylePreference === option.value
                        ? "border-primary-500 bg-primary-500/10"
                        : "border-surface-700 bg-surface-800/50 hover:border-surface-600"
                    }`}
                  >
                    <span className="text-2xl mb-1 block">{option.emoji}</span>
                    <div className="text-white font-medium text-sm">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-surface-300 font-medium mb-3">
                Do You Have Content Ready?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: "ready", label: "Yes, I Have It", desc: "Text and images ready to go" },
                  { value: "partial", label: "Some of It", desc: "I need help with the rest" },
                  { value: "need-help", label: "Need Help", desc: "I'd love help writing it" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateField("hasContent", option.value)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.hasContent === option.value
                        ? "border-primary-500 bg-primary-500/10"
                        : "border-surface-700 bg-surface-800/50 hover:border-surface-600"
                    }`}
                  >
                    <div className="text-white font-semibold text-sm mb-0.5">{option.label}</div>
                    <div className="text-surface-500 text-xs">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Budget & Timing */}
        {currentStep === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Budget & Timing</h3>
              <p className="text-surface-400">This helps me recommend the right package for you.</p>
            </div>

            <div>
              <label className="block text-surface-300 font-medium mb-3">
                What Budget Range Feels Comfortable?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUDGET_RANGES.map((range) => (
                  <button
                    key={range}
                    onClick={() => updateField("budgetRange", range)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      formData.budgetRange === range
                        ? "border-primary-500 bg-primary-500/10 text-white"
                        : "border-surface-700 bg-surface-800/50 text-surface-400 hover:border-surface-600"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-surface-300 font-medium mb-2">
                When Do You Hope to Launch? <span className="text-surface-500">(approximate is fine)</span>
              </label>
              <input
                type="text"
                value={formData.desiredLaunchDate}
                onChange={(e) => updateField("desiredLaunchDate", e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 outline-none transition-all"
                placeholder="e.g., End of May, ASAP, No rush..."
              />
            </div>

            <div>
              <label className="block text-surface-300 font-medium mb-2">
                Do You Have a Hard Deadline? <span className="text-surface-500">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.deadline}
                onChange={(e) => updateField("deadline", e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-surface-800/50 border border-surface-700 text-white placeholder-surface-500 focus:border-primary-500 outline-none transition-all"
                placeholder="e.g., Grand opening on June 15th, holiday season..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-surface-700/50">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center gap-2 text-surface-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={!validateStep() || isSubmitting}
          className="btn-accent flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Submitting...
            </>
          ) : currentStep === STEPS.length - 1 ? (
            <>
              Submit & Get My Proposal
              <MessageCircle size={18} />
            </>
          ) : (
            <>
              Continue
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
