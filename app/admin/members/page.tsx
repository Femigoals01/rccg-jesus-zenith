


// "use client";

// import { useEffect, useMemo, useState } from "react";

// export default function AdminMembersPage() {
//   const [members, setMembers] = useState<any[]>([]);
//   const [activeMember, setActiveMember] = useState<any | null>(null);
//   const [search, setSearch] = useState("");

//   /* ---------------- FETCH MEMBERS ---------------- */
//   useEffect(() => {
//     fetch("/api/members") // ✅ correct API
//       .then((r) => r.json())
//       .then(setMembers)
//       .catch(() => {});
//   }, []);

//   /* ---------------- SEARCH FILTER ---------------- */
//   const filteredMembers = useMemo(() => {
//     return members.filter((m) =>
//       `${m.name} ${m.phone}`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );
//   }, [members, search]);

//   /* ---------------- BIRTHDAY LOGIC ---------------- */
//   const today = new Date();
//   const todayDay = today.getDate();
//   const todayMonth = today.getMonth() + 1;

//   function isBirthdayToday(m: any) {
//     return (
//       Number(m.birthDay) === todayDay &&
//       Number(m.birthMonth) === todayMonth
//     );
//   }

//   function isBirthdaySoon(m: any) {
//     const bday = new Date(
//       today.getFullYear(),
//       Number(m.birthMonth) - 1,
//       Number(m.birthDay)
//     );
//     const diff =
//       (bday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
//     return diff > 0 && diff <= 7;
//   }

//   return (
//     <section className="min-h-screen px-4 sm:px-6 py-8">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//         <h1 className="text-2xl font-bold">👥 Members Directory</h1>

//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             placeholder="Search name or phone…"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="px-4 py-2 rounded-md bg-black/30 border border-white/10 text-sm"
//           />

//           <a
//             href="/api/members/export"
//             className="px-4 py-2 rounded-md bg-zenithGold text-black font-semibold text-sm text-center hover:opacity-90"
//           >
//             📤 Export CSV
//           </a>
//         </div>
//       </div>

//       {/* MEMBERS TABLE */}
//       <div className="bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
//         {filteredMembers.length === 0 ? (
//           <p className="p-6 text-white/60">No members found.</p>
//         ) : (
//           <table className="min-w-[900px] w-full text-sm">
//             <thead className="bg-black/40 text-white/70">
//               <tr>
//                 <th className="p-4 text-left">Photo</th>
//                 <th className="p-4 text-left">Name</th>
//                 <th className="p-4 text-left">Phone</th>
//                 <th className="p-4 text-left">Birthday</th>
//                 <th className="p-4 text-left">Status</th>
//                 <th className="p-4 text-left">Joined</th>
//                 <th className="p-4 text-left">Action</th>
//                 <th className="p-4 text-left">Group</th>
//                 <th className="p-4 text-left">Department</th>
//                 {/* <th className="p-4 text-left">Anniversary</th> */}

//               </tr>
//             </thead>

//             <tbody>
//               {filteredMembers.map((m) => (
//                 <tr
//                   key={m.id}
//                   className="border-t border-white/10 hover:bg-white/5"
//                 >
//                   {/* PHOTO */}
//                   <td className="p-4">
//                     {m.photo ? (
//                       <img
//                         src={m.photo}
//                         alt={m.name}
//                         className="w-10 h-10 rounded-full object-cover cursor-pointer"
//                         onClick={() => setActiveMember(m)}
//                       />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs">
//                         N/A
//                       </div>
//                     )}
//                   </td>

//                   <td className="p-4 font-medium">{m.name}</td>
//                   <td className="p-4">{m.phone}</td>
//                   <td className="p-4">{m.group || "—"}</td>
//                 <td className="p-4">{m.department || "—"}</td>

//                   <td className="p-4">
//                     {m.birthDay}/{m.birthMonth}
//                   </td>

//                   {/* BIRTHDAY STATUS */}
//                   <td className="p-4">
//                     {isBirthdayToday(m) && (
//                       <span className="px-2 py-1 rounded bg-green-600 text-xs">
//                         🎉 Today
//                       </span>
//                     )}
//                     {!isBirthdayToday(m) && isBirthdaySoon(m) && (
//                       <span className="px-2 py-1 rounded bg-yellow-500 text-xs">
//                         🎂 Soon
//                       </span>
//                     )}
//                   </td>

//                   <td className="p-4 text-white/60">
//                     {new Date(m.createdAt).toLocaleDateString()}
//                   </td>

//                   <td className="p-4">
//                     <button
//                       onClick={() => setActiveMember(m)}
//                       className="text-zenithGold text-xs underline"
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* MEMBER PROFILE MODAL */}
//       {activeMember && (
//         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
//           <div className="bg-zenithDeep max-w-md w-full rounded-xl p-6 relative">
//             <button
//               onClick={() => setActiveMember(null)}
//               className="absolute top-3 right-3 text-white/60 hover:text-white"
//             >
//               ✕
//             </button>

//             {activeMember.photo && (
//               <img
//                 src={activeMember.photo}
//                 className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
//               />
//             )}

//             <h2 className="text-xl font-bold text-center mb-4">
//               {activeMember.name}
//             </h2>

            

//             <div className="space-y-2 text-sm text-white/80">

//             <p><strong>Email:</strong> {activeMember.email}</p>

//               <p><strong>Phone:</strong> {activeMember.phone}</p>
//               <p><strong>Address:</strong> {activeMember.address || "—"}</p>
//               <p>
//                 <strong>Birthday:</strong>{" "}
//                 {activeMember.birthDay}/{activeMember.birthMonth}
//               </p>

//               {activeMember.anniversary && (
//                 <p>
//                   <strong>Anniversary:</strong> {activeMember.anniversary}
//                 </p>
//               )}

//               <p><strong>Group:</strong> {activeMember.group || "—"}</p>
//             <p><strong>Department:</strong> {activeMember.department || "—"}</p>


//               <p className="text-white/50 text-xs pt-2">
//                 Joined:{" "}
//                 {new Date(activeMember.createdAt).toLocaleString()}
//               </p>
//             </div>

//             {/* FUTURE */}
//             <div className="mt-6 flex justify-center gap-3">
//               {/* <button className="px-4 py-2 text-xs bg-white/10 rounded">
//                 🪪 Generate Card
//               </button> */}

//               <a
//     href={`/api/members/card/${activeMember.id}`}
//     target="_blank"
//     className="px-4 py-2 text-xs bg-zenithGold text-black rounded"
//   >
//     🪪 Print Membership Card
//   </a>
//               <button className="px-4 py-2 text-xs bg-white/10 rounded">
//                 🎂 Send Birthday Wish
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }



// "use client";

// import { useEffect, useMemo, useState } from "react";

// export default function AdminMembersPage() {
//   const [members, setMembers] = useState<any[]>([]);
//   const [activeMember, setActiveMember] = useState<any | null>(null);
//   const [search, setSearch] = useState("");

//   /* ---------------- FETCH MEMBERS ---------------- */
//   useEffect(() => {
//     fetch("/api/members")
//       .then((r) => r.json())
//       .then(setMembers)
//       .catch(() => {});
//   }, []);

//   /* ---------------- SEARCH FILTER ---------------- */
//   const filteredMembers = useMemo(() => {
//     return members.filter((m) =>
//       `${m.name} ${m.phone} ${m.email}`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );
//   }, [members, search]);

//   /* ---------------- BIRTHDAY LOGIC ---------------- */
//   const today = new Date();
//   const todayDay = today.getDate();
//   const todayMonth = today.getMonth() + 1;

//   function isBirthdayToday(m: any) {
//     return (
//       Number(m.birthDay) === todayDay &&
//       Number(m.birthMonth) === todayMonth
//     );
//   }

//   function isBirthdaySoon(m: any) {
//     const bday = new Date(
//       today.getFullYear(),
//       Number(m.birthMonth) - 1,
//       Number(m.birthDay)
//     );
//     const diff =
//       (bday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
//     return diff > 0 && diff <= 7;
//   }

//   return (
//     <section className="min-h-screen px-4 sm:px-6 py-8">
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
//         <h1 className="text-2xl font-bold">👥 Members Directory</h1>

//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             placeholder="Search name, phone or email…"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="px-4 py-2 rounded-md bg-black/30 border border-white/10 text-sm"
//           />

//           <a
//             href="/api/members/export"
//             className="px-4 py-2 rounded-md bg-zenithGold text-black font-semibold text-sm text-center hover:opacity-90"
//           >
//             📤 Export CSV
//           </a>
//         </div>
//       </div>

//       {/* MEMBERS TABLE */}
//       <div className="bg-white/5 border border-white/10 rounded-xl">
//         {filteredMembers.length === 0 ? (
//           <p className="p-6 text-white/60">No members found.</p>
//         ) : (
//         //   <table className="min-w-[1100px] w-full text-sm">
//         //     <thead className="bg-black/40 text-white/70">
//         //       <tr>
//         //         <th className="p-4 text-left">Photo</th>
//         //         <th className="p-4 text-left">Name</th>
//         //         <th className="p-4 text-left">Email</th>
//         //         <th className="p-4 text-left">Phone</th>
//         //         <th className="p-4 text-left">Birthday</th>
//         //         <th className="p-4 text-left">Status</th>
//         //         <th className="p-4 text-left">Group</th>
//         //         <th className="p-4 text-left">Department</th>
//         //         <th className="p-4 text-left">Joined</th>
//         //         <th className="p-4 text-left">Action</th>
//         //       </tr>
//         //     </thead>

//         //     <tbody>
//         //       {filteredMembers.map((m) => (
//         //         <tr
//         //           key={m.id}
//         //           className="border-t border-white/10 hover:bg-white/5"
//         //         >
//         //           {/* PHOTO */}
//         //           <td className="p-4">
//         //             {m.photo ? (
//         //               <img
//         //                 src={m.photo}
//         //                 alt={m.name}
//         //                 className="w-10 h-10 rounded-full object-cover cursor-pointer"
//         //                 onClick={() => setActiveMember(m)}
//         //               />
//         //             ) : (
//         //               <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs">
//         //                 N/A
//         //               </div>
//         //             )}
//         //           </td>

//         //           <td className="p-4 font-medium">{m.name}</td>
//         //           <td className="p-4">{m.email || "—"}</td>
//         //           <td className="p-4">{m.phone}</td>

//         //           <td className="p-4">
//         //             {m.birthDay}/{m.birthMonth}
//         //           </td>

//         //           {/* BIRTHDAY STATUS */}
//         //           <td className="p-4">
//         //             {isBirthdayToday(m) && (
//         //               <span className="px-2 py-1 rounded bg-green-600 text-xs">
//         //                 🎉 Today
//         //               </span>
//         //             )}
//         //             {!isBirthdayToday(m) && isBirthdaySoon(m) && (
//         //               <span className="px-2 py-1 rounded bg-yellow-500 text-xs">
//         //                 🎂 Soon
//         //               </span>
//         //             )}
//         //           </td>

//         //           <td className="p-4">{m.group || "—"}</td>
//         //           <td className="p-4">{m.department || "—"}</td>

//         //           <td className="p-4 text-white/60">
//         //             {new Date(m.createdAt).toLocaleDateString()}
//         //           </td>

//         //           <td className="p-4">
//         //             <button
//         //               onClick={() => setActiveMember(m)}
//         //               className="text-zenithGold text-xs underline"
//         //             >
//         //               View
//         //             </button>
//         //           </td>
//         //         </tr>
//         //       ))}
//         //     </tbody>
//         //   </table>

//         <div className="hidden lg:block">
//   <table className="w-full text-sm">
//     <thead className="bg-black/40 text-white/70">
//       <tr>
//         <th className="p-3 text-left">Photo</th>
//         <th className="p-3 text-left">Name</th>
//         <th className="p-3 text-left">Email</th>
//         <th className="p-3 text-left">Phone</th>
//         <th className="p-3 text-left">Birthday</th>
//         <th className="p-3 text-left">Group</th>
//         <th className="p-3 text-left">Department</th>
//         <th className="p-3 text-left">Action</th>
//       </tr>
//     </thead>

//     <tbody>
//       {filteredMembers.map((m) => (
//         <tr key={m.id} className="border-t border-white/10 hover:bg-white/5">
//           <td className="p-3">
//             {m.photo ? (
//               <img
//                 src={m.photo}
//                 className="w-10 h-10 rounded-full object-cover cursor-pointer"
//                 onClick={() => setActiveMember(m)}
//               />
//             ) : (
//               <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs">
//                 N/A
//               </div>
//             )}
//           </td>

//           <td className="p-3">{m.name}</td>
//           <td className="p-3">{m.email || "—"}</td>
//           <td className="p-3">{m.phone}</td>
//           <td className="p-3">{m.birthDay}/{m.birthMonth}</td>
//           <td className="p-3">{m.group || "—"}</td>
//           <td className="p-3">{m.department || "—"}</td>

//           <td className="p-3">
//             <button
//               onClick={() => setActiveMember(m)}
//               className="text-zenithGold text-xs underline"
//             >
//               View
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>

//         )}
//       </div>

//       {/* MEMBER PROFILE MODAL */}
//       {activeMember && (
//         <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
//           <div className="bg-zenithDeep max-w-md w-full rounded-xl p-6 relative">
//             <button
//               onClick={() => setActiveMember(null)}
//               className="absolute top-3 right-3 text-white/60 hover:text-white"
//             >
//               ✕
//             </button>

//             {activeMember.photo && (
//               <img
//                 src={activeMember.photo}
//                 className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
//               />
//             )}

//             <h2 className="text-xl font-bold text-center mb-4">
//               {activeMember.name}
//             </h2>

//             <div className="space-y-2 text-sm text-white/80">
//               <p><strong>Email:</strong> {activeMember.email || "—"}</p>
//               <p><strong>Phone:</strong> {activeMember.phone}</p>
//               <p><strong>Address:</strong> {activeMember.address || "—"}</p>
//               <p>
//                 <strong>Birthday:</strong>{" "}
//                 {activeMember.birthDay}/{activeMember.birthMonth}
//               </p>

//               {activeMember.anniversary && (
//                 <p>
//                   <strong>Anniversary:</strong> {activeMember.anniversary}
//                 </p>
//               )}

//               <p><strong>Group:</strong> {activeMember.group || "—"}</p>
//               <p><strong>Department:</strong> {activeMember.department || "—"}</p>

//               <p className="text-white/50 text-xs pt-2">
//                 Joined:{" "}
//                 {new Date(activeMember.createdAt).toLocaleString()}
//               </p>
//             </div>

//             <div className="mt-6 flex justify-center gap-3">
//               <a
//                 href={`/api/members/card/${activeMember.id}`}
//                 target="_blank"
//                 className="px-4 py-2 text-xs bg-zenithGold text-black rounded"
//               >
//                 🪪 Print Membership Card
//               </a>

//               <button className="px-4 py-2 text-xs bg-white/10 rounded">
//                 🎂 Send Birthday Wish
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }





"use client";

import { useEffect, useMemo, useState } from "react";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [activeMember, setActiveMember] = useState<any | null>(null);
  const [search, setSearch] = useState("");

  /* ---------------- FETCH MEMBERS ---------------- */
  useEffect(() => {
    fetch("/api/members", { cache: "no-store" })
      .then((r) => r.json())
      .then(setMembers)
      .catch(() => {});
  }, []);

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredMembers = useMemo(() => {
    return members.filter((m) =>
      `${m.name} ${m.phone} ${m.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [members, search]);

  /* ---------------- BIRTHDAY LOGIC ---------------- */
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;

  function isBirthdayToday(m: any) {
    return (
      Number(m.birthDay) === todayDay &&
      Number(m.birthMonth) === todayMonth
    );
  }

  function isBirthdaySoon(m: any) {
    const bday = new Date(
      today.getFullYear(),
      Number(m.birthMonth) - 1,
      Number(m.birthDay)
    );
    const diff =
      (bday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 7;
  }

  return (
    <section className="min-h-screen px-4 sm:px-6 py-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">👥 Members Directory</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            placeholder="Search name, phone or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-md bg-black/30 border border-white/10 text-sm"
          />

          <a
            href="/api/members/export"
            className="px-4 py-2 rounded-md bg-zenithGold text-black font-semibold text-sm text-center hover:opacity-90 transition"
          >
            📤 Export CSV
          </a>
        </div>
      </div>

      {/* MEMBERS TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-x-auto">
        {filteredMembers.length === 0 ? (
          <p className="p-6 text-white/60">No members found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-black/40 text-white/70">
              <tr>
                <th className="p-3 text-left">Photo</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Birthday</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Group</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.map((m) => (
                <tr
                  key={m.id}
                  className="border-t border-white/10 hover:bg-white/5"
                >
                  {/* PHOTO */}
                  <td className="p-3">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                        onClick={() => setActiveMember(m)}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs">
                        N/A
                      </div>
                    )}
                  </td>

                  <td className="p-3 font-medium">{m.name}</td>
                  <td className="p-3">{m.email || "—"}</td>
                  <td className="p-3">{m.phone}</td>
                  <td className="p-3">
                    {m.birthDay}/{m.birthMonth}
                  </td>

                  {/* BIRTHDAY STATUS */}
                  <td className="p-3">
                    {isBirthdayToday(m) && (
                      <span className="px-2 py-1 rounded bg-green-600 text-xs">
                        Today
                      </span>
                    )}
                    {!isBirthdayToday(m) && isBirthdaySoon(m) && (
                      <span className="px-2 py-1 rounded bg-yellow-500 text-xs">
                        Soon
                      </span>
                    )}
                    {!isBirthdayToday(m) && !isBirthdaySoon(m) && (
                      <span className="text-white/40 text-xs">—</span>
                    )}
                  </td>

                  <td className="p-3">{m.group || "—"}</td>
                  <td className="p-3">{m.department || "—"}</td>

                  <td className="p-3">
                    <button
                      onClick={() => setActiveMember(m)}
                      className="text-zenithGold text-xs underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MEMBER PROFILE MODAL */}
      {activeMember && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-zenithDeep max-w-md w-full rounded-xl p-6 relative">

            <button
              onClick={() => setActiveMember(null)}
              className="absolute top-3 right-3 text-white/60 hover:text-white"
            >
              ✕
            </button>

            {activeMember.photo && (
              <img
                src={activeMember.photo}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
            )}

            <h2 className="text-xl font-bold text-center mb-4">
              {activeMember.name}
            </h2>

            <div className="space-y-2 text-sm text-white/80">
              <p><strong>Email:</strong> {activeMember.email || "—"}</p>
              <p><strong>Phone:</strong> {activeMember.phone}</p>
              <p><strong>Address:</strong> {activeMember.address || "—"}</p>
              <p>
                <strong>Birthday:</strong>{" "}
                {activeMember.birthDay}/{activeMember.birthMonth}
              </p>

              {activeMember.anniversary && (
                <p>
                  <strong>Anniversary:</strong> {activeMember.anniversary}
                </p>
              )}

              <p><strong>Group:</strong> {activeMember.group || "—"}</p>
              <p><strong>Department:</strong> {activeMember.department || "—"}</p>

              <p className="text-white/50 text-xs pt-2">
                Joined:{" "}
                {new Date(activeMember.createdAt).toLocaleString()}
              </p>
            </div>

            {/* <div className="mt-6 flex justify-center gap-3">
              <a
                href={`/api/members/card/${activeMember.id}`}
                target="_blank"
                className="px-4 py-2 text-xs bg-zenithGold text-black rounded"
              >
                🪪 Print Membership Card
              </a>

              <button className="px-4 py-2 text-xs bg-white/10 rounded">
                🎂 Send Birthday Wish
              </button>
            </div> */}

            <div className="mt-6 flex justify-center gap-3 flex-wrap">

  {/* PRINT CARD */}
  <a
    href={`/api/members/card/${activeMember.id}`}
    target="_blank"
    className="px-4 py-2 text-xs bg-zenithGold text-black rounded"
  >
    🪪 Print Card
  </a>

  {/* EDIT */}
  <button
    onClick={async () => {
      const newName = prompt("Edit name:", activeMember.name);
      if (!newName) return;

      await fetch("/api/members", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...activeMember,
          name: newName,
        }),
      });

      location.reload();
    }}
    className="px-4 py-2 text-xs bg-blue-600 rounded"
  >
    ✏ Edit
  </button>

  {/* DELETE */}
  <button
    onClick={async () => {
      if (!confirm("Delete this member?")) return;

      await fetch("/api/members", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: activeMember.id }),
      });

      location.reload();
    }}
    className="px-4 py-2 text-xs bg-red-600 rounded"
  >
    🗑 Delete
  </button>

</div>


          </div>
        </div>
      )}
    </section>
  );
}
