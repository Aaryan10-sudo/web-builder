"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const plans = ["Basic", "Standard", "Plus", "Premium", "Family Plan"];

const pricing = {
  yearly: ["$149.99", "$249.99", "$349.99", "$449.99", "$599.99"],
  monthly: ["$12.99", "$24.99", "$34.99", "$44.99", "$59.99"],
};

const features = [
  {
    title: "Access to eBooks",
    values: [
      "Up to 10/month",
      "Unlimited",
      "Unlimited",
      "Unlimited",
      "Unlimited",
    ],
  },
  {
    title: "Offline Reading",
    values: ["-", "-", "✔", "✔", "✔"],
  },
  {
    title: "Bookmarks",
    values: {
      yearly: ["-", "5/month", "✔", "✔", "✔"],
      monthly: ["-", "5/month", "✔", "✔", "✔"],
    },
  },
  {
    title: "Family Sharing",
    values: ["-", "-", "-", "-", "4 accounts"],
  },
  {
    title: "Early Access to new Titles",
    values: ["-", "-", "-", "✔", "✔"],
  },
  {
    title: "Priority Support",
    values: ["-", "-", "✔", "✔", "✔"],
  },
  {
    title: "Audio Playback and Speed Control",
    values: ["-", "✔", "✔", "✔", "✔"],
  },
  {
    title: "Chapter Navigation (Audio Books)",
    values: ["-", "✔", "✔", "✔", "✔"],
  },
  {
    title: "Book Rating and Reviews",
    values: ["✔", "✔", "✔", "✔", "✔"],
  },
  {
    title: "Reading Start and Achievements",
    values: ["-", "✔", "✔", "✔", "✔"],
  },
];

const PricingTable = () => {
  const [isYearly, setIsYearly] = useState(true);
  const billingType = isYearly ? "yearly" : "monthly";

  return (
    <section className="relative px-4 py-16 text-white overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bggradient.svg"
          alt="Gradient"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-16 bg-[#616161]/13 rounded-xl border border-white/10 shadow-xl backdrop-blur-4xl">
        <div className="text-center px-6 py-10">
          <h2 className="text-3xl sm:text-4xl font-semibold">Stuzip Pricing</h2>
          <p className="text-sm text-gray-300 mt-2">
            Billed {isYearly ? "Yearly" : "Monthly"}
          </p>

          <div className="mt-4 inline-flex p-1 border border-[#A1A1A1]/50 rounded-md">
            {["Yearly", "Monthly"].map((label, idx) => {
              const active = (label === "Yearly") === isYearly;
              return (
                <button
                  key={label}
                  onClick={() => setIsYearly(label === "Yearly")}
                  className={`px-4 py-1 text-sm rounded-sm transition-all ${
                    active
                      ? "bg-[#4CFFAB] text-black font-semibold"
                      : "text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table with sticky column + row */}
        <div className="overflow-x-auto h-96 md:h-full ">
          <table className="w-full  table-fixed  border-collapse min-w-[700px] text-sm text-left">
            <thead>
              <tr className="text-white border-b border-white/20 bg-[#141414]/80   backdrop-blur-xl z-30  sticky top-0 ">
                <th className="p-4 font-semibold sticky left-0 z-30 bg-[#141414]/90  backdrop-blur-xl">
                  Features
                </th>
                {plans.map((plan, i) => (
                  <th key={i} className="p-4 text-center font-semibold">
                    <div>{plan}</div>
                    <div className="text-gray-300 text-sm">
                      {pricing[billingType][i]}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => {
                const values = Array.isArray(feature.values)
                  ? feature.values
                  : feature.values[billingType];

                return (
                  <tr key={idx} className="border-b border-white/10   ">
                    <td className="p-4 font-medium sticky left-0 bg-[#141414]/80  backdrop-blur-xl z-20">
                      {feature.title}
                    </td>
                    {values.map((cell, i) => (
                      <td key={i} className="p-4 text-center text-gray-200">
                        {cell === "✔" ? (
                          <Check className="mx-auto text-[#F5F5F5]" size={18} />
                        ) : (
                          cell
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr>
                <td className="sticky left-0 bg-[#141414]/80 rounded-bl-md  backdrop-blur-xl z-20" />
                {plans.map((_, i) => (
                  <td key={i} className="p-4 text-center">
                    <Button className="bg-[#4CFFAB] text-black  hover:bg-[#00FF67] w-full rounded-sm">
                      Purchase
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
