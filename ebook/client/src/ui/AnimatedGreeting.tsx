"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const AnimatedGreeting = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning !";
    if (hour < 18) return "Good Afternoon !";
    return "Good Evening !";
  };

  const greeting = getGreeting();

  return (
    <div className=" bg-cover bg-center md:h-[580px]  h-[250px] overflow-hidden flex items-center justify-center">
      <h1 className="text-center text-[#4cffab] font-bold text-[25px]">
        <TypeAnimation
          sequence={["Hello Admin", 2000, greeting]}
          speed={50}
          repeat={0}
          style={{ fontSize: "1rem", display: "inline-block" }}
        />
      </h1>
    </div>
  );
};

export default AnimatedGreeting;
