import BreadcrumbHeader from "@/components/Browse/BreadcrumbHeader";
import GenreSection from "@/components/Browse/GenreSection";
import HeroSection from "@/components/Browse/Hero";

import React from "react";

const trendingbooks = [
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  // Add more...
];

const page = () => {
  return (
    <div className="flex flex-col  relative">
      <div className="absolute inset-0 z-10 translate-y-24">
        <BreadcrumbHeader title="Audio Books" />
      </div>
      <HeroSection />

      <GenreSection title="Trending Now" books={trendingbooks} />
      <GenreSection title="Popular Picks" books={trendingbooks} />
      <GenreSection title="Fantasy" books={trendingbooks} />
    </div>
  );
};

export default page;
