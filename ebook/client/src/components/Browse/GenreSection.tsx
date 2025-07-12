"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

type Book = {
  src: string;
  href?: string;
};

interface GenreSectionProps {
  title: string;
  books: Book[];
}

const GenreSection = ({ title, books }: GenreSectionProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "snap",
    slides: {
      perView: 1.3,
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 480px)": {
        slides: { perView: 2, spacing: 2 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 3 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    const current = containerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-white max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 transition-opacity duration-700 ease-in-out"
      style={{ opacity: isVisible ? 1 : 0.2 }}
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-10">
        {title}
      </h2>

      {isVisible && (
        <div className="relative flex items-center w-full overflow-hidden">
          {/* Left Arrow - hidden on < md */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="hidden md:flex absolute left-0 z-10 p-2 md:p-3 h-full justify-center items-center rounded bg-black/40 hover:bg-black/60 backdrop-blur-sm"
          >
            <ArrowLeft size={20} />
          </button>

          {/* Slider */}
          <div
            ref={sliderRef}
            className="keen-slider w-full px-2 sm:px-4 overflow-x-hidden"
          >
            {books.map((book, i) => (
              <div key={i} className="keen-slider__slide flex justify-center">
                {book.href ? (
                  <Link href={book.href} className="block">
                    <Image
                      src={book.src}
                      alt={`Book ${i + 1}`}
                      width={200}
                      height={300}
                      loading="lazy"
                      className="rounded-md object-cover aspect-[2/3] w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
                    />
                  </Link>
                ) : (
                  <Image
                    src={book.src}
                    alt={`Book ${i + 1}`}
                    width={200}
                    height={300}
                    loading="lazy"
                    className="rounded-md object-cover aspect-[2/3] w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right Arrow - hidden on < md */}
          <button
            onClick={() => instanceRef.current?.next()}
            className="hidden md:flex absolute right-0 z-10 p-2 md:p-3 rounded h-full justify-center items-center bg-black/40 hover:bg-black/60 backdrop-blur-sm"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GenreSection;
