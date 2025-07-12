"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";

const books = [
  { src: "/book1.jpg", href: "/book/1" },
  { src: "/book1.jpg", href: "/book/2" },
  { src: "/book1.jpg", href: "/book/3" },
  { src: "/book1.jpg", href: "/book/4" },
  { src: "/book1.jpg", href: "/book/5" },
  { src: "/book1.jpg", href: "/book/6" },
];

const Trandingnow = () => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "snap",
    slides: {
      perView: 1.5,
      spacing: 0,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 2.5,
          spacing: 0,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 0,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4,
          spacing: 0,
        },
      },
    },
  });

  return (
    <div className="text-white max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-10">Trending Now</h2>

      <div className="relative flex items-center max-w-6xl mx-auto gap-4">
        {/* Left Arrow */}
        <button
          onClick={() => slider.current?.prev()}
          className="hidden sm:flex absolute -left-6 z-10 p-3 h-full justify-center items-center rounded bg-[#1d1d1d]/80 hover:bg-[#333]"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="keen-slider w-full overflow-hidden px-2 max-w-5xl mx-auto "
        >
          {books.map((book, i) => (
            <div key={i} className="keen-slider__slide">
              <Link href={book.href} className="block w-full">
                <Image
                  src={book.src}
                  alt={`Book ${i + 1}`}
                  width={300}
                  height={450}
                  className="rounded-md object-cover aspect-[2/3] mx-auto w-full max-w-[200px]"
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => slider.current?.next()}
          className="hidden sm:flex absolute -right-6 z-10 p-3 rounded-sm h-full justify-center items-center bg-[#1d1d1d]/80 hover:bg-[#333]"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Trandingnow;
