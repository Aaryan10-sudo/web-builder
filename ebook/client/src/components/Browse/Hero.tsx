"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useAppSelector } from "@/redux/hooks/hooks";

const HeroSection = () => {
  const name = useAppSelector((state) => state.user.name);
  return (
    <section className="relative w-full min-h-[100vh]  text-white overflow-hidden">
      <Image
        src="/browsehero.jpg"
        alt="Hero Background"
        fill
        className="object-cover object-center -z-10"
        priority
      />

      {/* Gradient overlay on left */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#4CFFAB] via-transparent to-transparent sm:bg-gradient-to-r md:bg-gradient-to-tr lg:bg-gradient-to-br xl:bg-gradient-to-r z-0
  "
      />

      {/* Content */}
      <div className="realtive translate-y-70 bottom-10 max-w-7xl mx-auto items-center justify-center z-10 block p-4 ">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          The Wandering Mind {name}
        </h1>
        <p className="mt-4 text-lg text-white/90 max-w-md">
          An exploration of the restless human mind and its search for meaning
          in a chaotic world.
        </p>
        <div className="mt-8 flex gap-4">
          <Button className="px-6 py-2 rounded-sm bg-[#4CFFAB] hover:bg-[#00FF67] text-black">
            Read Now
          </Button>
          <Button
            variant="ghost"
            className="px-6 py-2 text-white hover:text-[#4CFFAB]"
          >
            Add to List
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
