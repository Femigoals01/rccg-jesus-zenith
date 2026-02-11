
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const links = [
    { name: "Dashboard", href: "/admin" },
    { name: "Programs", href: "/admin/programs" },
    { name: "Gallery", href: "/admin/gallery" },
    { name: "Testimonies", href: "/admin/testimonies" },
    { name: "Members", href: "/admin/members" },
    { name: "Inbox", href: "/admin/inbox" },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-black/40 border-r border-white/10 px-6 py-10 hidden md:flex flex-col">
      <h2 className="text-xl font-bold mb-10 text-zenithGold">
        RCCG Admin
      </h2>

      <nav className="flex flex-col gap-4 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition ${
              pathname === link.href
                ? "text-zenithGold font-semibold"
                : "text-white/80 hover:text-zenithGold"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mt-auto px-4 py-2 text-sm bg-red-600 rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </aside>
  );
}
