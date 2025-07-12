"use client";

import { List, LayoutGrid, ChevronDown } from "lucide-react";
import { useState } from "react";

interface BreadcrumbHeaderProps {
  title: string;
}

const BreadcrumbHeader = ({ title }: BreadcrumbHeaderProps) => {
  const [view, setView] = useState<"list" | "grid">("grid");

  return (
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
      {/* Left: Title and Genre Selector */}
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <div className="relative group">
          <button className="flex items-center px-6 py-3 text-sm font-semibold border border-white/30 bg-[#1f1f1f]/40 backdrop-blur-3xl hover:bg-[#1f1f1f]/20 transition-all">
            Genres <ChevronDown size={16} className="ml-2" />
          </button>
          <div className="absolute left-0 w-full -mt-0.5 bg-[#1f1f1f]/40 backdrop-blur-3xl shadow-md px-6 py-4 outline-2 outline-white/20 text-sm hidden group-hover:flex group-hover:flex-col gap-4">
            <div className="hover:text-[#4CFFAB] cursor-pointer">Fantasy</div>
            <div className="hover:text-[#4CFFAB] cursor-pointer">Romance</div>
            <div className="hover:text-[#4CFFAB] cursor-pointer">Mystery</div>
          </div>
        </div>
      </div>

      {/* Right: View Toggle */}
      <div className="flex items-center gap-2 border border-white/20 p-1 rounded-sm">
        <button
          onClick={() => setView("list")}
          className={`p-1 hover:bg-white/10 ${
            view === "list" ? "bg-white/10" : ""
          }`}
        >
          <List size={18} />
        </button>
        <button
          onClick={() => setView("grid")}
          className={`p-1 hover:bg-white/10 ${
            view === "grid" ? "bg-white/10" : ""
          }`}
        >
          <LayoutGrid size={18} />
        </button>
      </div>
    </div>
  );
};

export default BreadcrumbHeader;
