import type { ReactNode } from "react";

type SidebarItem = {
  name: string;
  link: string;
  icon?: ReactNode;
};

export const SidebarItems: SidebarItem[] = [
  { name: "Dashboard", link: "/admin" },
  { name: "Books", link: "/books" },
  { name: "Users", link: "/users" },
  { name: "General Setting", link: "/settings" },
];
