"use client";
import React from "react";

const products = [
  {
    id: 1,
    name: "Muna madan",
    author: "Aaryan Sharma",
    sales: 1200,
    revenue: "Rs. 24,000",
  },
  {
    id: 2,
    name: "Jiban Kada ki ful",
    author: "KP Sharma Oli",
    sales: 950,
    revenue: "Rs. 19,000",
  },
  {
    id: 3,
    name: "Sikri Harayeko manchey",
    author: "Durga Prasai",
    sales: 780,
    revenue: "Rs. 15,600",
  },
  {
    id: 4,
    name: "Quantam Computing",
    author: "Aaryan Sharma",
    sales: 700,
    revenue: "Rs. 14,000",
  },
];

const TopSelling = () => {
  return (
    <section className="w-full shadow-xl p-5 h-[430px] rounded-md ">
      <h1 className="text-xl font-bold mb-4 text-white">Top Selling</h1>
      <div className="overflow-x-auto h-[340px]">
        <table className="min-w-full border border-[#4cffab] rounded-xl">
          <thead className="bg-[#4cffab]  text-gray-700  text-left text-sm uppercase">
            <tr>
              <th className="py-3 px-4">Book</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">Total Sales</th>
              <th className="py-3 px-4">Revenue</th>
            </tr>
          </thead>
          <tbody className="text-slate-200 d-100 text-sm">
            {products.map((product) => (
              <tr key={product.id} className="border-b border-[#4cffab]">
                <td className="py-3 px-4 font-medium">{product.name}</td>
                <td className="py-3 px-4">{product.author}</td>
                <td className="py-3 px-4">{product.sales}</td>
                <td className="py-3 px-4">{product.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TopSelling;
