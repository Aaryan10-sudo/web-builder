"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes! You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your current billing cycle.",
  },
  {
    question: "What devices can I use to access Stuzip?",
    answer:
      "You can access Stuzip on mobile, tablet, and desktop devices with an internet connection.",
  },
  {
    question: "Can I download books for offline use?",
    answer:
      "Yes, offline access is available for premium plan users through our mobile app.",
  },
  {
    question: "Is audiobook progress saved across devices?",
    answer:
      "Yes, your progress syncs automatically across all your logged-in devices.",
  },
  {
    question: "What types of content does Stuzip offer?",
    answer:
      "We offer a wide range of eBooks, audiobooks, and exclusive reading collections.",
  },
];

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-white">
      <h2 className="text-xl font-semibold mb-6">Frequently ask questions</h2>

      <div className="space-y-2 max-w-5xl mx-auto">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="border-b border-[#2b2b2b] transition-colors duration-300"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center py-4 text-left font-medium cursor-pointer"
            >
              <span>{item.question}</span>
              {openIndex === i ? <X size={18} /> : <ChevronDown size={18} />}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === i
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="pb-4 text-sm text-gray-300">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqAccordion;
