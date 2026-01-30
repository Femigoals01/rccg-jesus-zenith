"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="w-64 bg-black/40 border-r border-white/10 p-6 hidden md:flex flex-col">
      <h2 className="text-xl font-bold mb-8 text-zenithGold">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-4 text-sm">
        <Link href="/admin" className="hover:text-zenithGold">
          Dashboard
        </Link>
        <Link href="/admin/programs" className="hover:text-zenithGold">
          Programs
        </Link>
        <Link href="/admin/gallery" className="hover:text-zenithGold">
          Gallery
        </Link>
        <Link href="/admin/testimonies" className="hover:text-zenithGold">
          Testimonies
        </Link>
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
