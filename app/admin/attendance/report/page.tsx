

"use client";

import { useEffect, useMemo, useState } from "react";

export default function AttendanceReportPage() {
  const [attendance, setAttendance] = useState<any[]>([]);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    fetch("/api/attendance", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setAttendance(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    if (!filterDate) return attendance;
    return attendance.filter((a) => a.service_date === filterDate);
  }, [attendance, filterDate]);

  return (
    <section className="min-h-screen bg-white text-black px-8 py-10">
      <div className="print:hidden mb-8 flex gap-3 items-center">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Print Report
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">RCCG Jesus Zenith</h1>
        <p>Attendance Report</p>
        {filterDate && <p>Date: {filterDate}</p>}
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border p-2 text-left">Member</th>
            <th className="border p-2 text-left">Phone</th>
            <th className="border p-2 text-left">Group</th>
            <th className="border p-2 text-left">Department</th>
            <th className="border p-2 text-left">Service</th>
            <th className="border p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((a) => (
            <tr key={a.id}>
              <td className="border p-2">{a.members?.name || "—"}</td>
              <td className="border p-2">{a.members?.phone || "—"}</td>
              <td className="border p-2">{a.members?.group_name || "—"}</td>
              <td className="border p-2">{a.members?.department || "—"}</td>
              <td className="border p-2">{a.service_title}</td>
              <td className="border p-2">{a.service_date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-6 font-semibold">
        Total Present: {filtered.length}
      </p>
    </section>
  );
}