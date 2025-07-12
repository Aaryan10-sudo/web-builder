import AdminActivity from "@/components/Dashboard/AdminActivity";
import ChartsSection from "@/components/Dashboard/ChartSection";
import TopSelling from "@/components/Dashboard/TopSelling";
import React from "react";

const page = () => {
  return (
    <main className="p-5 flex flex-col gap-5 bg-[#292828] ">
      <ChartsSection />
      <section className="flex justify-center gap-5 items-center">
        <AdminActivity />
        <TopSelling />
      </section>
    </main>
  );
};

export default page;
