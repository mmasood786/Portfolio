"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  CheckCircle, 
  Clock, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  Star,
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Globe,
  Smartphone,
  Shield,
  Gift
} from "lucide-react";

// ============================================
// COUNTDOWN TIMER COMPONENT
// ============================================
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
      const difference = endOfMonth.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center gap-1 sm:gap-2">
          <motion.div
            className="bg-surface-900/80 backdrop-blur-sm border border-primary-500/30 rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-3 min-w-[50px] sm:min-w-[70px]"
            initial={{ scale: 1 }}
            animate={{ scale: unit.label === "Seconds" ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              key={unit.value}
              className="text-lg sm:text-2xl md:text-3xl font-black text-white text-center tabular-nums"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {String(unit.value).padStart(2, "0")}
            </motion.div>
            <div className="text-[10px] sm:text-xs text-surface-400 text-center font-medium mt-1">
              {unit.label}
            </div>
          </motion.div>
          {index < timeUnits.length - 1 && (
            <motion.div
              className="text-lg sm:text-2xl text-primary-500 font-bold"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              :
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

// ============================================
// SPOTS COUNTER COMPONENT
// ============================================
function SpotsCounter({ spotsLeft, totalSpots }: { spotsLeft: number; totalSpots: number }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-surface-900/60 rounded-full border border-surface-700/50">
      <motion.div
        className="w-2.5 h-2.5 bg-neon-lime rounded-full"
        animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-sm text-surface-300 font-medium">
        Only <span className="text-neon-cyan font-bold">{spotsLeft}</span> of {totalSpots} spots left
      </span>
    </div>
  );
}

// ============================================
// OFFER CARD COMPONENT
// ============================================
function OfferCard({ 
  offer, 
  index, 
  isBestValue 
}: { 
  offer: any; 
  index: number; 
  isBestValue: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.7 }}
      className="relative group"
      onMouseMove={handleMouseMove}
    >
      {/* Outer glow effect */}
      <motion.div
        className={`absolute -inset-4 bg-gradient-to-r ${offer.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
      />

      {/* Best Value Badge */}
      {isBestValue && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-neon-cyan via-primary-500 to-accent-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
            <Star size={16} className="animate-pulse" />
            BEST VALUE
            <Star size={16} className="animate-pulse" />
          </div>
        </motion.div>
      )}

      {/* Main Card */}
      <div className="relative bg-gradient-to-br from-surface-800/90 to-surface-900/90 backdrop-blur-xl rounded-3xl border border-surface-700/50 overflow-hidden group-hover:border-primary-500/40 transition-all duration-500">
        {/* Mouse-follow gradient */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`,
          }}
        />

        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${offer.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        <div className="relative p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Icon */}
            <motion.div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${offer.gradient} flex items-center justify-center mx-auto mb-4 shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <offer.icon className="text-white" size={40} />
            </motion.div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {offer.title}
            </h3>

            {/* Subtitle */}
            <p className="text-surface-400 text-sm md:text-base">
              {offer.subtitle}
            </p>
          </div>

          {/* Pricing */}
          <div className="text-center mb-8 pb-6 border-b border-surface-700/50">
            {/* Original price */}
            <div className="text-surface-500 line-through text-lg mb-2">
              ${offer.originalPrice}
            </div>
            
            {/* Current price */}
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-surface-400 text-xl">$</span>
              <motion.span
                className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-primary-500 to-accent-500"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
              >
                {offer.price}
              </motion.span>
            </div>
            
            {/* Savings badge */}
            <div className="inline-block px-4 py-2 bg-neon-lime/10 border border-neon-lime/30 rounded-full mb-3">
              <span className="text-neon-lime font-bold text-sm">
                Save ${offer.savings} ({offer.savingsPercent}%)
              </span>
            </div>

            {/* Timeframe */}
            <p className="text-surface-400 text-sm">
              {offer.timeframe}
            </p>
          </div>

          {/* Why You Need This */}
          <div className="mb-8 p-5 bg-surface-900/50 rounded-2xl border border-surface-700/30">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <AlertTriangle size={20} className="text-neon-cyan" />
              Why You Need This:
            </h4>
            <ul className="space-y-3">
              {offer.whyNeed.map((item: string, i: number) => (
                <motion.li
                  key={i}
                  className="text-surface-300 text-sm flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 + index * 0.2 }}
                >
                  <span className="text-neon-cyan mt-0.5 flex-shrink-0">→</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* What's Included */}
          <div className="mb-8">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <CheckCircle size={20} className="text-neon-lime" />
              What's Included:
            </h4>
            <ul className="space-y-3">
              {offer.features.map((feature: string, i: number) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-surface-300 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08 + index * 0.2 }}
                >
                  <CheckCircle size={18} className="text-neon-lime flex-shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: feature }} />
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Bonus */}
          {offer.bonus && (
            <motion.div
              className="mb-8 p-5 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-2xl border border-primary-500/30"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.2 }}
            >
              <div className="flex items-start gap-3">
                <Gift size={24} className="text-neon-pink flex-shrink-0 mt-1" />
                <div>
                  <h5 className="text-white font-bold mb-1">BONUS INCLUDED:</h5>
                  <p className="text-surface-300 text-sm">{offer.bonus}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Urgency */}
          <div className="mb-6 text-center">
            <SpotsCounter spotsLeft={offer.spotsLeft} totalSpots={offer.totalSpots} />
            <p className="text-surface-400 text-xs mt-3">
              {offer.urgencyText}
            </p>
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => {
              window.location.hash = `#offer-${offer.title === "From Scratch Launch Package" ? "from-scratch" : "ai-redesign"}`;
              setTimeout(() => {
                document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className={`block text-center py-5 rounded-2xl font-bold text-lg transition-all duration-300 relative overflow-hidden w-full ${
              isBestValue
                ? "text-white hover:shadow-[0_0_50px_rgba(0,245,255,0.6)]"
                : "text-white bg-surface-800 border-2 border-primary-500/50 hover:border-primary-500 hover:bg-primary-500/10 hover:shadow-[0_0_40px_rgba(139,92,246,0.4)]"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isBestValue && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-primary-500 to-accent-500" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-500 via-primary-500 to-neon-cyan"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </>
            )}
            <span className="relative z-10 flex items-center justify-center gap-2">
              {offer.cta}
              <ArrowRight size={20} />
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// STATISTICS COMPONENT
// ============================================
function StatItem({ stat, index }: { stat: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * stat.value));

      if (progress < 1) requestAnimationFrame(animate);
    };

    animate();
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-4 p-5 bg-surface-800/50 rounded-2xl border border-surface-700/30 hover:border-primary-500/40 transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center flex-shrink-0`}>
        <stat.icon className="text-white" size={24} />
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-black text-white tabular-nums">
            {count}{stat.suffix}
          </span>
        </div>
        <p className="text-surface-400 text-sm">{stat.text}</p>
      </div>
    </motion.div>
  );
}

// ============================================
// MAIN EXCLUSIVE OFFERS COMPONENT
// ============================================
export default function ExclusiveOffers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const offers = [
    {
      title: "From Scratch Launch Package",
      subtitle: "Get a Stunning Website Built From Scratch",
      icon: Globe,
      originalPrice: "3,500",
      price: "2,497",
      savings: "1,003",
      savingsPercent: "29",
      timeframe: "7-10 days delivery",
      gradient: "from-neon-cyan/20 to-primary-500/20",
      spotsLeft: 4,
      totalSpots: 8,
      urgencyText: "⚡ Order this week → Launch in 7 days",
      whyNeed: [
        "68% of customers check you online before visiting",
        "First impressions form in just 0.05 seconds",
        "Outdated websites lose 94% of first impressions",
        "Your competitors are already investing in their site",
      ],
      features: [
        "Custom 5-7 page website (built from scratch)",
        "100% mobile-friendly design",
        "Lightning-fast loading (&lt;1 second)",
        "SEO-optimized (get found on Google)",
        "Contact form + Google Maps integration",
        "1 round of revisions included",
        "30 days priority support",
      ],
      bonus: "Free 30-day priority support after launch ($300 value) — I'll be here if you need anything!",
      cta: "Claim This Offer",
    },
    {
      title: "AI-Powered Website Redesign",
      subtitle: "Turn Your Old Website Into a Lead Machine",
      icon: Zap,
      originalPrice: "2,800",
      price: "1,797",
      savings: "1,003",
      savingsPercent: "36",
      timeframe: "5-7 days delivery",
      gradient: "from-accent-500/20 to-primary-600/20",
      spotsLeft: 3,
      totalSpots: 6,
      urgencyText: "🚀 Your competitor is 1 click from stealing your customer",
      whyNeed: [
        "Your competitors already upgraded their websites",
        "AI-designed sites convert 3x better than traditional",
        "Don't lose customers to better-looking competitors",
        "First-mover advantage won't last forever",
      ],
      features: [
        "🤖 AI-enhanced design (faster, smarter, better)",
        "Complete redesign of your existing website",
        "AI chatbot integration for 24/7 engagement",
        "Analytics + conversion tracking setup",
        "All your content migrated seamlessly",
        "Performance optimization (speed boost)",
        "60 days priority support included",
      ],
      bonus: "Free 60-day support package + conversion optimization tips ($300 value)",
      cta: "Upgrade My Website",
    },
  ];

  const stats = [
    {
      icon: Users,
      value: 75,
      suffix: "%",
      text: "of consumers judge your credibility based on your website design",
      gradient: "from-neon-cyan to-primary-500",
    },
    {
      icon: AlertTriangle,
      value: 88,
      suffix: "%",
      text: "of online consumers won't return after a bad website experience",
      gradient: "from-accent-500 to-primary-600",
    },
    {
      icon: TrendingUp,
      value: 40,
      suffix: "%",
      text: "faster growth for small businesses with professional websites",
      gradient: "from-neon-lime to-neon-cyan",
    },
    {
      icon: Smartphone,
      value: 67,
      suffix: "%",
      text: "more conversions from mobile-optimized websites",
      gradient: "from-primary-500 to-accent-500",
    },
  ];

  return (
    <section
      id="exclusive-offers"
      className="py-24 bg-gradient-to-b from-surface-950 via-primary-950/20 to-surface-950 relative overflow-hidden"
      ref={ref}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96"
          style={{
            background: "radial-gradient(circle, rgba(0, 245, 255, 0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================ */}
        {/* HEADER WITH COUNTDOWN */}
        {/* ============================================ */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Fire badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-full border border-orange-500/30 mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="text-2xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🔥
            </motion.span>
            <span className="text-white font-bold text-sm uppercase tracking-wider">
              Exclusive Offers — This Month Only
            </span>
          </motion.div>

          {/* Main headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-6 leading-tight">
            Transform Your Business
            <br />
            <span className="text-gradient">Before Month End</span>
          </h2>

          <p className="text-xl text-surface-400 max-w-3xl mx-auto mb-8">
            Limited-time packages that turn your website into a{" "}
            <span className="text-white font-semibold">customer-generating machine</span>.
            <br />
            Choose one before spots fill up.
          </p>

          {/* Countdown Timer */}
          <div className="mb-6">
            <p className="text-surface-400 text-sm mb-4 font-medium">
              ⏰ Offer expires in:
            </p>
            <CountdownTimer />
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* OFFER CARDS */}
        {/* ============================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-20">
          {offers.map((offer, index) => (
            <OfferCard
              key={offer.title}
              offer={offer}
              index={index}
              isBestValue={index === 0}
            />
          ))}
        </div>

        {/* ============================================ */}
        {/* WHY YOU NEED A PROFESSIONAL WEBSITE */}
        {/* ============================================ */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan rounded-full font-medium mb-4">
              The Hard Truth
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Why Your Business <span className="text-gradient">NEEDS</span> a Professional Website
            </h3>
            <p className="text-lg text-surface-400 max-w-2xl mx-auto">
              These aren't just numbers. They're your potential customers walking away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <StatItem key={stat.text} stat={stat} index={index} />
            ))}
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* GUARANTEE & SOCIAL PROOF */}
        {/* ============================================ */}
        <motion.div
          className="mb-16 p-8 md:p-12 bg-gradient-to-br from-surface-800/80 to-surface-900/80 backdrop-blur-xl rounded-3xl border border-surface-700/50"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Guarantee */}
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-neon-lime/10 border border-neon-lime/30 rounded-full mb-4">
                <Shield size={24} className="text-neon-lime" />
                <span className="text-neon-lime font-bold">100% Money-Back Guarantee</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">
                No Risk. All Reward.
              </h4>
              <p className="text-surface-400 text-lg">
                If I can't deliver what you need, you get a full refund. 
                If you're not satisfied, I'll revise until you are. 
                Your investment is completely protected.
              </p>
            </div>

            {/* Testimonial */}
            <div className="bg-surface-900/60 rounded-2xl p-6 border border-surface-700/30">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-white text-lg mb-4 italic leading-relaxed">
                "Got 47 leads in the first week after our redesign. Best investment we've ever made. 
                Our new website paid for itself within the first month!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-cyan to-primary-500 flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <div className="text-white font-semibold">Sarah Mitchell</div>
                  <div className="text-surface-400 text-sm">Restaurant Owner • 150+ clients served</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* FINAL CTA */}
        {/* ============================================ */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Not Sure What You Need?
          </h4>
          <p className="text-lg text-surface-400 mb-8 max-w-2xl mx-auto">
            Send me a message via email, WhatsApp, or DM and I'll tell you exactly what will work for your business.
            No pressure, no commitment—just honest advice.
          </p>
          <motion.button
            onClick={() => {
              document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-neon-cyan via-primary-500 to-accent-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-[0_0_50px_rgba(0,245,255,0.6)] transition-all duration-300 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-500 via-primary-500 to-neon-cyan"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Get in Touch
              <ArrowRight size={22} />
            </span>
          </motion.button>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-surface-400 text-sm">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-neon-lime rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Free Consultation</span>
            </div>
            <span className="text-surface-700">•</span>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-neon-cyan rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <span>No Commitment Required</span>
            </div>
            <span className="text-surface-700">•</span>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-2 h-2 bg-accent-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
              <span>24/7 Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
