

"use client";

import { useEffect, useMemo, useState } from "react";

const departments = [
  "Ushering",
  "Sunday School Teacher",
  "Welfare",
  "Evangelism",
  "Media",
  "Prayer",
  "Choir",
  "Children Teacher",
  "Sanitation",
  "Protocol",
  "Security",
];

export default function DepartmentLeadersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [leaders, setLeaders] = useState<any[]>([]);
  const [memberId, setMemberId] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("Leader");
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    const [membersRes, leadersRes] = await Promise.all([
      fetch("/api/members", { cache: "no-store" }),
      fetch("/api/department-leaders", { cache: "no-store" }),
    ]);

    const membersData = await membersRes.json();
    const leadersData = await leadersRes.json();

    setMembers(Array.isArray(membersData) ? membersData : []);
    setLeaders(Array.isArray(leadersData) ? leadersData : []);
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

  async function assignLeader() {
    if (!memberId || !department) {
      alert("Select a member and department.");
      return;
    }

    setSaving(true);

    const res = await fetch("/api/department-leaders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberId, department, role }),
    });

    setSaving(false);

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      alert(error?.error || "Failed to assign leader.");
      return;
    }

    setMemberId("");
    setDepartment("");
    setRole("Leader");
    setSearch("");
    await load();
  }

  async function removeLeader(id: string) {
    if (!confirm("Remove this leader?")) return;

    const res = await fetch("/api/department-leaders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      alert("Failed to remove leader.");
      return;
    }

    setLeaders((prev) => prev.filter((l) => l.id !== id));
  }

  return (
    <section className="min-h-screen px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold mb-8">
        🧑‍💼 Department Leaders
      </h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="font-bold mb-4">Assign Department Leader</h2>

          <input
            placeholder="Search member by name, phone or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
          />

          <select
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
          >
            <option value="">Select Member</option>
            {filteredMembers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} — {m.phone}
              </option>
            ))}
          </select>

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full mb-4 p-3 rounded bg-black/30 border border-white/10"
          >
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <input
            placeholder="Role e.g. Leader, Assistant Leader"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-6 p-3 rounded bg-black/30 border border-white/10"
          />

          <button
            onClick={assignLeader}
            disabled={saving}
            className="w-full py-3 bg-zenithGold text-black rounded font-semibold disabled:opacity-60"
          >
            {saving ? "Saving..." : "Assign Leader"}
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="font-bold mb-4">Current Leaders</h2>

          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {leaders.length === 0 ? (
              <p className="text-white/60">No department leaders yet.</p>
            ) : (
              leaders.map((l) => (
                <div
                  key={l.id}
                  className="bg-black/20 rounded p-4 text-sm flex justify-between gap-4"
                >
                  <div>
                    <p className="font-semibold">
                      {l.members?.name || "Unknown Member"}
                    </p>
                    <p className="text-white/60">
                      {l.department} — {l.role}
                    </p>
                    <p className="text-xs text-white/40 mt-1">
                      {l.members?.phone || "—"} • {l.members?.email || "—"}
                    </p>
                  </div>

                  <button
                    onClick={() => removeLeader(l.id)}
                    className="text-red-400 text-xs hover:underline"
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