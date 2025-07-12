"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/Button";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50 || currentScrollY < lastScrollY) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[#141414]/20 backdrop-blur-3xl z-50 transition-transform duration-300 py-6 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } `}
    >
      <div className="flex  mx-auto px-4  pb-0 gap-4">
        {/* Top Row */}
        <div className="flex max-w-7xl justify-between items-center mx-auto gap-4 w-full">
          <a href="/">
            <Image
              src="/logo.svg"
              alt="Stuzip"
              width={100}
              height={100}
              className="h-10 w-auto"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
