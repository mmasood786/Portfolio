"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import ThankYouPopup from "@/components/ThankYouPopup";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({
    name: "",
    message: "",
    steps: [] as { step: string; text: string }[],
  });

  useEffect(() => {
    const form = searchParams?.get("form");
    const name = searchParams?.get("name") || "there";

    if (form === "contact") {
      setPopupData({
        name,
        message: "Your message has been received! I'll get back to you within 24 hours with a personalized response.",
        steps: [
          { step: "1", text: "I read your message and understand your needs" },
          { step: "2", text: "I prepare a thoughtful response with recommendations" },
          { step: "3", text: "I email you within 24 hours" },
        ],
      });
      setShowPopup(true);
    } else if (form === "audit") {
      setPopupData({
        name,
        message: "Your website audit request has been received! I'll personally review your site and send a detailed report within 24 hours.",
        steps: [
          { step: "1", text: "I analyze your website for issues" },
          { step: "2", text: "I prepare a detailed audit report with recommendations" },
          { step: "3", text: "I email your free report within 24 hours" },
        ],
      });
      setShowPopup(true);
    } else if (form === "project") {
      setPopupData({
        name,
        message: "Your project brief has been received! I'll review everything and send you a personalized proposal with pricing and timeline within 24 hours.",
        steps: [
          { step: "1", text: "I review your project requirements" },
          { step: "2", text: "I prepare a custom proposal with pricing" },
          { step: "3", text: "I email your proposal within 24 hours" },
        ],
      });
      setShowPopup(true);
    }
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-surface-950 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
        <p className="text-surface-400 mb-8">Your submission has been received.</p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-neon-cyan via-primary-500 to-accent-500 text-white font-bold rounded-full hover:shadow-[0_0_50px_rgba(0,245,255,0.6)] transition-all"
        >
          Back to Home
        </a>
      </div>

      <ThankYouPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        name={popupData.name}
        message={popupData.message}
        steps={popupData.steps}
      />
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-950" />}>
      <SuccessContent />
    </Suspense>
  );
}
