

// "use client";

// import { useEffect, useMemo, useState } from "react";

// export default function AdminAttendancePage() {
//   const [members, setMembers] = useState<any[]>([]);
//   const [attendance, setAttendance] = useState<any[]>([]);
//   const [selected, setSelected] = useState<string[]>([]);
//   const [serviceTitle, setServiceTitle] = useState("");
//   const [serviceDate, setServiceDate] = useState("");
//   const [search, setSearch] = useState("");
//   const [saving, setSaving] = useState(false);

//   async function load() {
//     const [membersRes, attendanceRes] = await Promise.all([
//       fetch("/api/members", { cache: "no-store" }),
//       fetch("/api/attendance", { cache: "no-store" }),
//     ]);

//     setMembers(await membersRes.json());
//     setAttendance(await attendanceRes.json());
//   }

//   useEffect(() => {
//     load().catch(() => {});
//   }, []);

//   const filteredMembers = useMemo(() => {
//     return members.filter((m) =>
//       `${m.name} ${m.phone} ${m.email}`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );
//   }, [members, search]);

//   function toggleMember(id: string) {
//     setSelected((prev) =>
//       prev.includes(id)
//         ? prev.filter((x) => x !== id)
//         : [...prev, id]
//     );
//   }

//   async function saveAttendance() {
//     if (!serviceTitle || !serviceDate || selected.length === 0) {
//       alert("Enter service title, date, and select at least one member.");
//       return;
//     }

//     setSaving(true);

//     const res = await fetch("/api/attendance", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         serviceTitle,
//         serviceDate,
//         memberIds: selected,
//       }),
//     });

//     setSaving(false);

//     if (!res.ok) {
//       const error = await res.json().catch(() => null);
//       alert(error?.error || "Failed to save attendance.");
//       return;
//     }

//     setSelected([]);
//     setServiceTitle("");
//     setServiceDate("");
//     await load();
//   }

//   return (
//     <section className="min-h-screen px-4 sm:px-6 py-8">
//       <h1 className="text-2xl font-bold mb-8">📋 Attendance</h1>

//       <div className="grid lg:grid-cols-2 gap-8">
//         <div className="bg-white/5 border border-white/10 rounded-xl p-6">
//           <h2 className="font-bold mb-4">Mark Attendance</h2>

//           <input
//             placeholder="Service title e.g. Sunday Worship"
//             value={serviceTitle}
//             onChange={(e) => setServiceTitle(e.target.value)}
//             className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
//           />

//           <input
//             type="date"
//             value={serviceDate}
//             onChange={(e) => setServiceDate(e.target.value)}
//             className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
//           />

//           <input
//             placeholder="Search member..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
//           />

//           <div className="max-h-[420px] overflow-y-auto space-y-2">
//             {filteredMembers.map((m) => (
//               <label
//                 key={m.id}
//                 className="flex items-center gap-3 bg-black/20 rounded p-3 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   checked={selected.includes(m.id)}
//                   onChange={() => toggleMember(m.id)}
//                 />
//                 <span>
//                   {m.name}
//                   <span className="block text-xs text-white/50">
//                     {m.phone} • {m.group || "—"}
//                   </span>
//                 </span>
//               </label>
//             ))}
//           </div>

//           <button
//             onClick={saveAttendance}
//             disabled={saving}
//             className="mt-6 w-full py-3 bg-zenithGold text-black rounded font-semibold disabled:opacity-60"
//           >
//             {saving ? "Saving..." : `Save Attendance (${selected.length})`}
//           </button>

          
//         </div>

        

//         <div className="bg-white/5 border border-white/10 rounded-xl p-6">
//           <h2 className="font-bold mb-4">Recent Attendance</h2>

//           <div className="space-y-3 max-h-[600px] overflow-y-auto">
//             {attendance.length === 0 ? (
//               <p className="text-white/60">No attendance records yet.</p>
//             ) : (
//               attendance.slice(0, 30).map((a) => (
//                 <div
//                   key={a.id}
//                   className="bg-black/20 rounded p-3 text-sm"
//                 >
//                   <p className="font-semibold">{a.members?.name}</p>
//                   <p className="text-white/60">
//                     {a.service_title} — {a.service_date}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import { useEffect, useMemo, useState } from "react";

export default function AdminAttendancePage() {
  const [members, setMembers] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [filterDate, setFilterDate] = useState("");
const [filterService, setFilterService] = useState("");
const [filterGroup, setFilterGroup] = useState("");
const [filterDepartment, setFilterDepartment] = useState("");

  async function load() {
    const [membersRes, attendanceRes] = await Promise.all([
      fetch("/api/members", { cache: "no-store" }),
      fetch("/api/attendance", { cache: "no-store" }),
    ]);

    const membersData = await membersRes.json();
    const attendanceData = await attendanceRes.json();

    setMembers(Array.isArray(membersData) ? membersData : []);
    setAttendance(Array.isArray(attendanceData) ? attendanceData : []);
  }

  useEffect(() => {
    load().catch(() => {});
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter((m) =>
      `${m.name} ${m.phone} ${m.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [members, search]);

  function toggleMember(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  function selectAllVisible() {
    const ids = filteredMembers.map((m) => m.id);
    setSelected((prev) => Array.from(new Set([...prev, ...ids])));
  }

  function clearSelection() {
    setSelected([]);
  }

  async function saveAttendance() {
    if (!serviceTitle || !serviceDate || selected.length === 0) {
      alert("Enter service title, date, and select at least one member.");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceTitle,
        serviceDate,
        memberIds: selected,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      alert(error?.error || "Failed to save attendance.");
      return;
    }

    setSelected([]);
    setServiceTitle("");
    setServiceDate("");
    await load();
  }


  const filteredAttendance = useMemo(() => {
  return attendance.filter((a) => {
    const matchesDate = filterDate
      ? a.service_date === filterDate
      : true;

    const matchesService = filterService
      ? a.service_title
          ?.toLowerCase()
          .includes(filterService.toLowerCase())
      : true;

    const matchesGroup = filterGroup
      ? a.members?.group_name === filterGroup
      : true;

    const matchesDepartment = filterDepartment
      ? a.members?.department === filterDepartment
      : true;

    return matchesDate && matchesService && matchesGroup && matchesDepartment;
  });
}, [attendance, filterDate, filterService, filterGroup, filterDepartment]);


const attendanceSummary = useMemo(() => {
  const summary: Record<string, any> = {};

  attendance.forEach((a) => {
    const key = `${a.service_title}-${a.service_date}`;

    if (!summary[key]) {
      summary[key] = {
        serviceTitle: a.service_title,
        serviceDate: a.service_date,
        total: 0,
        men: 0,
        women: 0,
        youth: 0,
        children: 0,
      };
    }

    summary[key].total += 1;

    const group = a.members?.group_name;

    if (group === "Men") summary[key].men += 1;
    if (group === "Women") summary[key].women += 1;
    if (group === "Youth") summary[key].youth += 1;
    if (group === "Children") summary[key].children += 1;
  });

  return Object.values(summary);
}, [attendance]);


async function deleteAttendance(id: string) {
  if (!confirm("Remove this attendance record?")) return;

  const res = await fetch("/api/attendance", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    alert("Failed to remove attendance record.");
    return;
  }

  setAttendance((prev) => prev.filter((x) => x.id !== id));
}

  return (
    <section className="min-h-screen px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">📋 Attendance</h1>
          <p className="text-white/60 text-sm mt-1">
            Mark attendance and export attendance records.
          </p>
        </div>

        <a
          href="/api/attendance/export"
          className="inline-flex items-center justify-center px-4 py-2 bg-zenithGold text-black rounded font-semibold text-sm hover:opacity-90 transition"
        >
          📤 Export Attendance CSV
        </a>

        <a
  href="/admin/attendance/report"
  className="inline-flex items-center justify-center px-4 py-2 bg-white/10 rounded font-semibold text-sm hover:bg-white/20 transition"
>
  Print Report
</a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
  {attendanceSummary.slice(0, 6).map((s: any) => (
    <div
      key={`${s.serviceTitle}-${s.serviceDate}`}
      className="bg-white/5 border border-white/10 rounded-xl p-5"
    >
      <p className="font-semibold">{s.serviceTitle}</p>
      <p className="text-sm text-white/50 mb-3">{s.serviceDate}</p>

      <p className="text-2xl font-bold text-zenithGold mb-3">
        {s.total} Present
      </p>

      <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
        <span>Men: {s.men}</span>
        <span>Women: {s.women}</span>
        <span>Youth: {s.youth}</span>
        <span>Children: {s.children}</span>
      </div>
    </div>
  ))}
</div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="font-bold mb-4">Mark Attendance</h2>

          <input
            placeholder="Service title e.g. Sunday Worship"
            value={serviceTitle}
            onChange={(e) => setServiceTitle(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
          />

          <input
            type="date"
            value={serviceDate}
            onChange={(e) => setServiceDate(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
          />

          <input
            placeholder="Search member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
          />

          <div className="flex flex-wrap gap-3 mb-4">
            <button
              onClick={selectAllVisible}
              className="px-3 py-2 text-xs rounded bg-white/10 hover:bg-white/20"
            >
              Select Visible
            </button>

            <button
              onClick={clearSelection}
              className="px-3 py-2 text-xs rounded bg-white/10 hover:bg-white/20"
            >
              Clear Selection
            </button>

            <span className="text-xs text-white/60 flex items-center">
              Selected: {selected.length}
            </span>
          </div>

          <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1">
            {filteredMembers.length === 0 ? (
              <p className="text-white/60 text-sm">No members found.</p>
            ) : (
              filteredMembers.map((m) => (
                <label
                  key={m.id}
                  className="flex items-center gap-3 bg-black/20 rounded p-3 cursor-pointer hover:bg-black/30"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(m.id)}
                    onChange={() => toggleMember(m.id)}
                  />

                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs">
                      N/A
                    </div>
                  )}

                  <span>
                    {m.name}
                    <span className="block text-xs text-white/50">
                      {m.phone} • {m.group || "—"} • {m.department || "—"}
                    </span>
                  </span>
                </label>
              ))
            )}
          </div>

          <button
            onClick={saveAttendance}
            disabled={saving}
            className="mt-6 w-full py-3 bg-zenithGold text-black rounded font-semibold disabled:opacity-60"
          >
            {saving ? "Saving..." : `Save Attendance (${selected.length})`}
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="font-bold mb-4">Recent Attendance</h2>


          <div className="grid sm:grid-cols-2 gap-3 mb-4">
  <input
    type="date"
    value={filterDate}
    onChange={(e) => setFilterDate(e.target.value)}
    className="p-3 rounded bg-black/30 border border-white/10 text-sm"
  />

  <input
    placeholder="Filter by service"
    value={filterService}
    onChange={(e) => setFilterService(e.target.value)}
    className="p-3 rounded bg-black/30 border border-white/10 text-sm"
  />

  <select
    value={filterGroup}
    onChange={(e) => setFilterGroup(e.target.value)}
    className="p-3 rounded bg-black/30 border border-white/10 text-sm"
  >
    <option value="">All Groups</option>
    <option value="Men">Men</option>
    <option value="Women">Women</option>
    <option value="Youth">Youth</option>
    <option value="Children">Children</option>
  </select>

  <select
    value={filterDepartment}
    onChange={(e) => setFilterDepartment(e.target.value)}
    className="p-3 rounded bg-black/30 border border-white/10 text-sm"
  >
    <option value="">All Departments</option>
    <option>Ushering</option>
    <option>Sunday School Teacher</option>
    <option>Welfare</option>
    <option>Evangelism</option>
    <option>Media</option>
    <option>Prayer</option>
    <option>Choir</option>
    <option>Children Teacher</option>
    <option>Sanitation</option>
    <option>Protocol</option>
    <option>Security</option>
  </select>
</div>

<button
  onClick={() => {
    setFilterDate("");
    setFilterService("");
    setFilterGroup("");
    setFilterDepartment("");
  }}
  className="mb-4 text-xs text-zenithGold hover:underline"
>
  Clear filters
</button>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {attendance.length === 0 ? (
              <p className="text-white/60">No attendance records yet.</p>
            ) : (
            //   attendance.slice(0, 30).map((a) => (
            filteredAttendance.slice(0, 30).map((a) => (
                <div
                  key={a.id}
                  className="bg-black/20 rounded p-3 text-sm"
                >
                  <p className="font-semibold">
                    {a.members?.name || "Unknown Member"}
                  </p>
                  <p className="text-white/60">
                    {a.service_title} — {a.service_date}
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    {a.members?.group_name || "—"} •{" "}
                    {a.members?.department || "—"}
                  </p>

                  <button
  onClick={() => deleteAttendance(a.id)}
  className="mt-2 text-xs text-red-400 hover:underline"
>
  Remove
</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}