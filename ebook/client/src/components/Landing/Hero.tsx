"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { SquarePlus, IdCard, BookHeadphones } from "lucide-react";

const steps = [
  {
    icon: <SquarePlus size={28} />,
    title: "Create your Account",
  },
  {
    icon: <IdCard size={28} />,
    title: "Choose your plan",
  },
  {
    icon: <BookHeadphones size={28} />,
    title: "Start reading or listening instantly",
  },
];

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-48 pb-28 sm:pb-40 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
          Unlimited eBooks, audiobooks, <br /> and more
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-white font-medium">
          Starts at $24.99. Cancel Anytime.
        </p>

        <p className="mt-6 text-sm text-gray-300">
          Ready to read? Enter your email to create or restart your membership
        </p>

        {/* Email Form */}
        <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <input
            type="email"
            placeholder="Email Address"
            className="px-4 py-2 text-white bg-white/10 w-72 rounded-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
          <Button className="px-6 py-2 rounded-sm bg-[#4CFFAB] hover:bg-[#00FF67] text-black">
            Get Started
          </Button>
        </div>

        {/* Steps */}
        <div className="mt-20 text-center">
          <h3 className="text-white font-semibold text-lg mb-10">
            How it Works
          </h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-12 text-sm text-gray-300">
            {steps.map(({ icon, title }, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 w-60"
              >
                {icon}
                <p className="text-center leading-snug">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-10">
        <Image
          src="/herogra.svg"
          alt="Bottom Mask"
          width={1920}
          height={400}
          className="w-full h-auto"
          priority
        />
      </div>
    </section>
  );
};

export default HeroSection;
