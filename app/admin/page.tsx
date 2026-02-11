


// export default function AdminDashboard() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">
//         Welcome, Admin
//       </h1>

//       <p className="text-white/70 mb-10">
//         Manage church programs, gallery uploads, testimonies, members and inbox from here.
//       </p>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

//         <a
//           href="/admin/programs"
//           className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition"
//         >
//           <h3 className="font-semibold mb-2">Programs</h3>
//           <p className="text-sm text-white/60">
//             Manage upcoming & live services
//           </p>
//         </a>

//         <a
//           href="/admin/gallery"
//           className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition"
//         >
//           <h3 className="font-semibold mb-2">Gallery</h3>
//           <p className="text-sm text-white/60">
//             Upload & manage photo albums
//           </p>
//         </a>

//         <a
//           href="/admin/testimonies"
//           className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition"
//         >
//           <h3 className="font-semibold mb-2">Testimonies</h3>
//           <p className="text-sm text-white/60">
//             Upload & manage testimonies
//           </p>
//         </a>

//         <a
//           href="/admin/members"
//           className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition"
//         >
//           <h3 className="font-semibold mb-2">Members</h3>
//           <p className="text-sm text-white/60">
//             Church membership directory
//           </p>
//         </a>

//         <a
//           href="/admin/inbox"
//           className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition"
//         >
//           <h3 className="font-semibold mb-2">Inbox</h3>
//           <p className="text-sm text-white/60">
//             Messages, prayer requests & food bank
//           </p>
//         </a>

//         <a
//           href="/api/members/export"
//           className="bg-zenithGold text-black rounded-xl p-6 font-semibold text-center hover:opacity-90 transition"
//         >
//           Export Members CSV
//         </a>

//       </div>
//     </div>
//   );
// }



export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Welcome, Admin
      </h1>

      <p className="text-white/70 mb-10">
        Manage church programs, gallery uploads, testimonies, members and inbox from here.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <a
          href="/admin/programs"
          className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition"
        >
          <h3 className="font-semibold mb-2">Programs</h3>
          <p className="text-sm text-white/60">
            Manage upcoming & live services
          </p>
        </a>

        <a
          href="/admin/gallery"
          className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition"
        >
          <h3 className="font-semibold mb-2">Gallery</h3>
          <p className="text-sm text-white/60">
            Upload & manage photo albums
          </p>
        </a>

        <a
          href="/admin/testimonies"
          className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition"
        >
          <h3 className="font-semibold mb-2">Testimonies</h3>
          <p className="text-sm text-white/60">
            Upload & manage testimonies
          </p>
        </a>

        <a
          href="/admin/members"
          className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition"
        >
          <h3 className="font-semibold mb-2">Members</h3>
          <p className="text-sm text-white/60">
            Church membership directory
          </p>
        </a>

        <a
          href="/admin/inbox"
          className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition"
        >
          <h3 className="font-semibold mb-2">Inbox</h3>
          <p className="text-sm text-white/60">
            Messages, prayer requests & food bank
          </p>
        </a>

      </div>
    </div>
  );
}
