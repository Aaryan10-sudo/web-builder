"use client";

import { Headphones, BookOpen, Moon, DownloadCloud } from "lucide-react";

const features = [
  {
    icon: <Headphones size={28} />,
    title: "High-quality audiobooks",
  },
  {
    icon: <BookOpen size={28} />,
    title: "Read eBooks on any device",
  },
  {
    icon: <Moon size={28} />,
    title: "Night mode & custom reader settings",
  },
  {
    icon: <DownloadCloud size={28} />,
    title: "Offline access for premium users",
  },
];

const TopFeatures = () => {
  return (
    <section className="w-full bg-[#141414] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto  space-y-10">
        <h2 className="text-xl  text-center sm:text-left font-semibold">
          Top Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm text-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center space-y-3 text-[#ffffff]/60"
            >
              <div className="">{feature.icon}</div>
              <p className="leading-tight ">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopFeatures;
