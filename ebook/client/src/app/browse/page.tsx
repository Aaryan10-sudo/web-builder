"use client";

import GenreSection from "@/components/Browse/GenreSection";
import HeroSection from "@/components/Browse/Hero";

const trendingbooks = [
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
  { src: "/book1.jpg", alt: "1984 by George Orwell" },
];

export default function BrowsePage() {
  return (
    <div>
      <HeroSection />
      <GenreSection title="Trending Now" books={trendingbooks} />
      <GenreSection title="Popular Picks" books={trendingbooks} />
      <GenreSection title="Fantasy" books={trendingbooks} />
    </div>
  );
}
