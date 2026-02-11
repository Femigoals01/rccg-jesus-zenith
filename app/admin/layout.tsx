

// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();

//   function logout() {
//     document.cookie = "admin_auth=; path=/; max-age=0";
//     router.push("/admin/login");
//   }

//   return (
//     <div className="min-h-screen flex bg-zenithDeep text-white">
//       {/* Sidebar */}
//       <aside className="w-64 bg-black/40 border-r border-white/10 p-6 space-y-6">
//         <h2 className="text-xl font-bold text-zenithGold">
//           Admin Dashboard
//         </h2>

//         <nav className="space-y-3 text-sm">
//           <Link href="/admin/inbox" className="block hover:text-zenithGold">
//             📥 Inbox
//           </Link>
//           <Link href="/admin/programs" className="block hover:text-zenithGold">
//             📅 Programs
//           </Link>
//           <Link href="/admin/gallery" className="block hover:text-zenithGold">
//             🖼 Gallery
//           </Link>
//         </nav>

//         <button
//           onClick={logout}
//           className="mt-8 w-full py-2 text-sm border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-black transition"
//         >
//           Logout
//         </button>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         {children}
//       </main>
//     </div>
//   );
// }



import AdminSidebar from "../../components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zenithDeep text-white">
      <AdminSidebar />
      <main className="flex-1 px-6 py-24 md:ml-64">
        {children}
      </main>
    </div>
  );
}
