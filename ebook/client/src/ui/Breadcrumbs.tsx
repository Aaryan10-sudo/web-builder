"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nameMap: Record<string, string> = {
  books: "Books",
  users: "Users",
  payments: "Payments",
  settings: "Settings",
  add: "Add",
  edit: "Edit",
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (!segments.includes("admin")) return null;

  const filteredSegments = segments.slice(1);

  return (
    <nav className="text-sm text-gray-600">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/admin" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
        </li>
        {filteredSegments.map((segment, index) => {
          const href =
            "/admin/" + filteredSegments.slice(0, index + 1).join("/");
          const isLast = index === filteredSegments.length - 1;
          const label = nameMap[segment] || decodeURIComponent(segment);

          return (
            <li key={href} className="flex items-center">
              <span className="mx-1">/</span>
              {isLast ? (
                <span className="text-gray-800 font-medium">{label}</span>
              ) : (
                <Link href={href} className="text-blue-600 hover:underline">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
