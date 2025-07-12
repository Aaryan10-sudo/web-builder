"use client"; // Needed if you're using App Router
import BookIcon from "@/ui/icons/BookIcon";
import DashboardIcon from "@/ui/icons/DashboardIcon";
import PaymentIcon from "@/ui/icons/PaymentIcon";
import SettingIcon from "@/ui/icons/SettingIcon";
import UserIcon from "@/ui/icons/UserIcon";
import Link from "next/link";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import OrderIcon from "@/ui/icons/OrderIcon";

type SidebarItem = {
  name: string;
  link: string;
  icon: ReactNode;
};

const SidebarItems: SidebarItem[] = [
  { name: "Dashboard", link: "", icon: <DashboardIcon /> },
  { name: "Orders", link: "/orders", icon: <OrderIcon /> },
  { name: "Books", link: "/books", icon: <BookIcon /> },
  { name: "Users", link: "/users", icon: <UserIcon /> },
  { name: "Subscriptions", link: "/subscription", icon: <PaymentIcon /> },
  { name: "General Setting", link: "/settings", icon: <SettingIcon /> },
];

const AdminSideBar = () => {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-[400px] shadow-[0px_4px_6px_rgba(0,255,192,0.3)] bg-[#1E1E1E]">
      <div className="flex items-center justify-center">
        <img
          src={"/logo.svg"}
          className="py-5 self-center
      "
        />
      </div>
      <section className="flex flex-col gap-10 justify-center p-5">
        {SidebarItems.map((value, index) => {
          const isActive =
            pathname === `/admin${value.link}` ||
            (value.link === "" && pathname === "/admin");

          return (
            <Link
              href={`/admin${value.link}`}
              key={index}
              className={`w-full p-3 rounded-md flex gap-3 items-center text-[20px] transition-colors duration-200 ${
                isActive
                  ? "bg-[#4cffab] text-black"
                  : "hover:bg-green-300 hover:text-black text-slate-300"
              }`}
            >
              {value.icon}
              {value.name}
            </Link>
          );
        })}
      </section>
    </aside>
  );
};

export default AdminSideBar;
