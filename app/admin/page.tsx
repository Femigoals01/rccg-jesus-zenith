




// "use client";

// import { useEffect, useState } from "react";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState<any>(null);
//   const [attendanceStats, setAttendanceStats] = useState<any>(null);

//   useEffect(() => {
//     fetch("/api/admin/stats", { cache: "no-store" })
//       .then((r) => r.json())
//       .then(setStats)
//       .catch(() => {});

//     fetch("/api/admin/attendance-stats", { cache: "no-store" })
//       .then((r) => r.json())
//       .then(setAttendanceStats)
//       .catch(() => {});
//   }, []);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Welcome, Admin</h1>

//       <p className="text-white/70 mb-10">
//         Manage church programs, gallery uploads, testimonies, members, inbox and attendance from here.
//       </p>

//       {stats && (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
//           <div className="bg-white/5 border border-white/10 rounded-xl p-5">
//             <p className="text-sm text-white/60">Total Members</p>
//             <h2 className="text-3xl font-bold text-zenithGold">{stats.totalMembers}</h2>
//           </div>

//           <div className="bg-white/5 border border-white/10 rounded-xl p-5">
//             <p className="text-sm text-white/60">Unread Inbox</p>
//             <h2 className="text-3xl font-bold text-zenithGold">{stats.unreadInbox}</h2>
//           </div>

//           <div className="bg-white/5 border border-white/10 rounded-xl p-5">
//             <p className="text-sm text-white/60">Testimonies</p>
//             <h2 className="text-3xl font-bold text-zenithGold">{stats.testimonies}</h2>
//           </div>

//           <div className="bg-white/5 border border-white/10 rounded-xl p-5">
//             <p className="text-sm text-white/60">Gallery Albums</p>
//             <h2 className="text-3xl font-bold text-zenithGold">{stats.galleryAlbums}</h2>
//           </div>
//         </div>
//       )}

//       {attendanceStats && (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
//           <div className="bg-zenithGold text-black rounded-xl p-5">
//             <p className="text-sm opacity-70">Today Attendance</p>
//             <h2 className="text-3xl font-bold">{attendanceStats.todayAttendance}</h2>
//           </div>

//           <div className="bg-white/5 border border-white/10 rounded-xl p-5">
//             <p className="text-sm text-white/60">Men Today</p>
//             <h2 className="text-3xl font-bold">{attendanceStats.menToday}</h2>
//           </div>

//           <div className="bg-white/5 border border-white/10 rounded-xl p-5">
//             <p className="text-sm text-white/60">Women Today</p>
//             <h2 className="text-3xl font-bold">{attendanceStats.womenToday}</h2>
//           </div>

//           <div className="bg-white/5 border border-white/10 rounded-xl p-5">
//             <p className="text-sm text-white/60">Total Attendance Records</p>
//             <h2 className="text-3xl font-bold">{attendanceStats.totalAttendanceRecords}</h2>
//           </div>
//         </div>
//       )}

//       {stats && (
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
//           <div className="bg-black/30 border border-white/10 rounded-xl p-4">
//             Men: <strong>{stats.men}</strong>
//           </div>
//           <div className="bg-black/30 border border-white/10 rounded-xl p-4">
//             Women: <strong>{stats.women}</strong>
//           </div>
//           <div className="bg-black/30 border border-white/10 rounded-xl p-4">
//             Youth: <strong>{stats.youth}</strong>
//           </div>
//           <div className="bg-black/30 border border-white/10 rounded-xl p-4">
//             Children: <strong>{stats.children}</strong>
//           </div>
//         </div>
//       )}

//       {stats?.birthdaysToday?.length > 0 && (
//         <div className="bg-zenithGold text-black rounded-xl p-5 mb-10">
//           <h2 className="font-bold mb-2">🎉 Birthdays Today</h2>
//           <div className="space-y-1">
//             {stats.birthdaysToday.map((m: any) => (
//               <p key={m.id}>{m.name} — {m.phone}</p>
//             ))}
//           </div>
//         </div>
//       )}

//       {stats?.nextProgram && (
//         <div className="bg-white/5 border border-zenithGold/30 rounded-xl p-5 mb-10">
//           <h2 className="font-bold text-zenithGold mb-2">Next Program</h2>
//           <p className="font-semibold">{stats.nextProgram.title}</p>
//           <p className="text-sm text-white/70">
//             {stats.nextProgram.topic || "No topic"} — {stats.nextProgram.program_date} by {stats.nextProgram.start_time}
//           </p>
//         </div>
//       )}

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <a href="/admin/programs" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
//           <h3 className="font-semibold mb-2">Programs</h3>
//           <p className="text-sm text-white/60">Manage upcoming & live services</p>
//         </a>

//         <a href="/admin/gallery" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
//           <h3 className="font-semibold mb-2">Gallery</h3>
//           <p className="text-sm text-white/60">Upload & manage photo albums</p>
//         </a>

//         <a href="/admin/testimonies" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
//           <h3 className="font-semibold mb-2">Testimonies</h3>
//           <p className="text-sm text-white/60">Upload & manage testimonies</p>
//         </a>

//         <a href="/admin/members" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
//           <h3 className="font-semibold mb-2">Members</h3>
//           <p className="text-sm text-white/60">Church membership directory</p>
//         </a>

//         <a href="/admin/inbox" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
//           <h3 className="font-semibold mb-2">Inbox</h3>
//           <p className="text-sm text-white/60">Messages, prayer requests & food bank</p>
//         </a>

//         <a href="/admin/attendance" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
//           <h3 className="font-semibold mb-2">Attendance</h3>
//           <p className="text-sm text-white/60">Mark and track attendance</p>
//         </a>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [attendanceStats, setAttendanceStats] = useState<any>(null);
  const [departmentSummary, setDepartmentSummary] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/stats", { cache: "no-store" })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});

    fetch("/api/admin/attendance-stats", { cache: "no-store" })
      .then((r) => r.json())
      .then(setAttendanceStats)
      .catch(() => {});

    fetch("/api/admin/department-summary", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setDepartmentSummary(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome, Admin</h1>

      <p className="text-white/70 mb-10">
        Manage church programs, gallery uploads, testimonies, members, inbox,
        departments and attendance from here.
      </p>

      {stats && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-sm text-white/60">Total Members</p>
            <h2 className="text-3xl font-bold text-zenithGold">{stats.totalMembers}</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-sm text-white/60">Unread Inbox</p>
            <h2 className="text-3xl font-bold text-zenithGold">{stats.unreadInbox}</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-sm text-white/60">Testimonies</p>
            <h2 className="text-3xl font-bold text-zenithGold">{stats.testimonies}</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-sm text-white/60">Gallery Albums</p>
            <h2 className="text-3xl font-bold text-zenithGold">{stats.galleryAlbums}</h2>
          </div>
        </div>
      )}

      {attendanceStats && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-zenithGold text-black rounded-xl p-5">
            <p className="text-sm opacity-70">Today Attendance</p>
            <h2 className="text-3xl font-bold">{attendanceStats.todayAttendance}</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-sm text-white/60">Men Today</p>
            <h2 className="text-3xl font-bold">{attendanceStats.menToday}</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-sm text-white/60">Women Today</p>
            <h2 className="text-3xl font-bold">{attendanceStats.womenToday}</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-sm text-white/60">Total Attendance Records</p>
            <h2 className="text-3xl font-bold">{attendanceStats.totalAttendanceRecords}</h2>
          </div>
        </div>
      )}

      {departmentSummary.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-bold">Department Summary</h2>

            <a
              href="/admin/department-leaders"
              className="text-sm text-zenithGold hover:underline"
            >
              Manage Leaders
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departmentSummary.map((d) => (
              <div
                key={d.department}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
              >
                <p className="font-semibold">{d.department}</p>
                <div className="mt-3 flex justify-between text-sm text-white/70">
                  <span>Members</span>
                  <strong className="text-white">{d.members}</strong>
                </div>
                <div className="mt-1 flex justify-between text-sm text-white/70">
                  <span>Leaders</span>
                  <strong className="text-zenithGold">{d.leaders}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-black/30 border border-white/10 rounded-xl p-4">
            Men: <strong>{stats.men}</strong>
          </div>
          <div className="bg-black/30 border border-white/10 rounded-xl p-4">
            Women: <strong>{stats.women}</strong>
          </div>
          <div className="bg-black/30 border border-white/10 rounded-xl p-4">
            Youth: <strong>{stats.youth}</strong>
          </div>
          <div className="bg-black/30 border border-white/10 rounded-xl p-4">
            Children: <strong>{stats.children}</strong>
          </div>
        </div>
      )}

      {stats?.birthdaysToday?.length > 0 && (
        <div className="bg-zenithGold text-black rounded-xl p-5 mb-10">
          <h2 className="font-bold mb-2">🎉 Birthdays Today</h2>
          <div className="space-y-1">
            {stats.birthdaysToday.map((m: any) => (
              <p key={m.id}>{m.name} — {m.phone}</p>
            ))}
          </div>
        </div>
      )}

      {stats?.nextProgram && (
        <div className="bg-white/5 border border-zenithGold/30 rounded-xl p-5 mb-10">
          <h2 className="font-bold text-zenithGold mb-2">Next Program</h2>
          <p className="font-semibold">{stats.nextProgram.title}</p>
          <p className="text-sm text-white/70">
            {stats.nextProgram.topic || "No topic"} —{" "}
            {stats.nextProgram.program_date} by {stats.nextProgram.start_time}
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <a href="/admin/programs" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
          <h3 className="font-semibold mb-2">Programs</h3>
          <p className="text-sm text-white/60">Manage upcoming & live services</p>
        </a>

        <a href="/admin/gallery" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
          <h3 className="font-semibold mb-2">Gallery</h3>
          <p className="text-sm text-white/60">Upload & manage photo albums</p>
        </a>

        <a href="/admin/testimonies" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
          <h3 className="font-semibold mb-2">Testimonies</h3>
          <p className="text-sm text-white/60">Upload & manage testimonies</p>
        </a>

        <a href="/admin/members" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
          <h3 className="font-semibold mb-2">Members</h3>
          <p className="text-sm text-white/60">Church membership directory</p>
        </a>

        <a href="/admin/inbox" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
          <h3 className="font-semibold mb-2">Inbox</h3>
          <p className="text-sm text-white/60">Messages, prayer requests & food bank</p>
        </a>

        <a href="/admin/attendance" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
          <h3 className="font-semibold mb-2">Attendance</h3>
          <p className="text-sm text-white/60">Mark and track attendance</p>
        </a>

        <a href="/admin/department-leaders" className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-zenithGold transition">
          <h3 className="font-semibold mb-2">Department Leaders</h3>
          <p className="text-sm text-white/60">Assign and manage department leaders</p>
        </a>
      </div>
    </div>
  );
}