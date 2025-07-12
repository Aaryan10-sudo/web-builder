"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Package,
  List,
  Wallet,
  Heart,
  Gift,
  Headphones,
  Undo,
  Star,
  ShieldCheck,
  CreditCard,
  Repeat,
  LogOut,
} from "lucide-react";

const links = [
  { label: "My Account", href: "/account", icon: <User className="w-4 h-4" /> },
  {
    label: "My Orders",
    href: "/orders",
    icon: <Package className="w-4 h-4" />,
  },
  { label: "My Lists", href: "/lists", icon: <List className="w-4 h-4" /> },
  { label: "My Wallet", href: "/wallet", icon: <Wallet className="w-4 h-4" /> },
  {
    label: "Favourites Items",
    href: "/favourites",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    label: "Vouchers and gift cards",
    href: "/vouchers",
    icon: <Gift className="w-4 h-4" />,
  },
  {
    label: "Service",
    href: "/service",
    icon: <Headphones className="w-4 h-4" />,
  },
  { label: "My Returns", href: "/returns", icon: <Undo className="w-4 h-4" /> },
  { label: "My Reviews", href: "/reviews", icon: <Star className="w-4 h-4" /> },
  {
    label: "My Guarantees",
    href: "/guarantees",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    label: "Billing Data",
    href: "/billing",
    icon: <CreditCard className="w-4 h-4" />,
  },
  {
    label: "Subscriptions",
    href: "/subscriptions",
    icon: <Repeat className="w-4 h-4" />,
  },
  {
    label: "Log out",
    href: "/logout",
    icon: <LogOut className="w-4 h-4 text-red-600" />,
    isLogout: true,
  },
];

const ClientProfile = () => {
  return (
    <div className="relative group inline-block p-4">
      {/* Profile Image */}
      <Image
        src="/profile.webp"
        alt="Profile"
        height={40}
        width={40}
        className="rounded-full h-10 w-10 cursor-pointer object-cover"
      />

      {/* Hover Dropdown */}
      <div className="absolute -translate-y-2 z-50 right-0 mt-2 hidden group-hover:block bg-white  border-gray-200 rounded-lg p-4 shadow-2xl  w-60">
        <ul className="py-2 text-sm text-gray-700">
          {links.map(({ label, href, icon, isLogout }) => (
            <li key={label}>
              <Link
                href={href}
                className={`flex gap-4 items-center  px-4 py-2 rounded-md transition ${
                  isLogout
                    ? "text-red-600 hover:bg-red-50"
                    : "hover:bg-gray-100 text-gray-800"
                }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientProfile;
