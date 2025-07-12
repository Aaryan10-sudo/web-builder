"use client";
import { useState } from "react";
import Breadcrumbs from "@/ui/Breadcrumbs";
import DownArrowIcon from "@/ui/icons/DownArrowIcon";
import NotificationIcon from "@/ui/icons/NotificationIcon";
import { useRouter } from "next/navigation";
import AnimatedGreeting from "@/ui/AnimatedGreeting";

const notifications = [
  { id: 1, title: "New user registered", time: "2 min ago" },
  { id: 2, title: "Order #1234 placed", time: "10 min ago" },
  { id: 3, title: "Payment received from Alex", time: "30 min ago" },
];

const adminUser = {
  name: "Admin John",
  email: "admin@example.com",
};

const AdminNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="h-[80px] w-full px-10 flex items-center justify-between bg-[#1E1E1E] ">
      <AnimatedGreeting />
      <section className="flex items-center gap-8 relative">
        <div
          className="relative"
          onClick={() => {
            setShowDropdown(!showDropdown);
            setUserDropdown(false);
          }}
        >
          <div className="relative cursor-pointer">
            <NotificationIcon />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#4cffab] ring-2 ring-white"></span>
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-[30px] w-80 bg-transparent backdrop-blur-3xl rounded- shadow-lg ring-1 ring-[#4cffab] z-50 animate-fade-in rounded-md">
              <div className="p-4 border-b border-[#4cffab] font-bold text-white text-2xl">
                Notifications
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    className="flex items-start gap-3 p-4 hover:bg-gray-200 hover:text-gray-800 text-white transition"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm hover:text-gray-800 font-medium">
                        {n.title}
                      </span>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        {n.time}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-3 text-sm text-center text-blue-400 hover:underline cursor-pointer font-semibold">
                View All
              </div>
            </div>
          )}
        </div>

        <span className="nav-image"></span>

        <div
          className="relative cursor-pointer"
          onClick={() => {
            setUserDropdown(!userDropdown);
            setShowDropdown(false);
          }}
        >
          <DownArrowIcon />
          {userDropdown && (
            <div className="absolute right-0 mt-[30px] w-64 bg-white rounded-md shadow-lg ring-1 ring-gray-200 z-50 animate-fade-in">
              <div className="p-4 border-b">
                <p className="text-sm font-semibold text-gray-800">
                  {adminUser.name}
                </p>
                <p className="text-xs text-gray-500">{adminUser.email}</p>
              </div>
              <button
                onClick={() => handleLogout()}
                className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </section>
    </nav>
  );
};

export default AdminNavbar;
