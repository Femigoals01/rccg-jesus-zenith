

"use client";

import { useState } from "react";

export default function AdminNextProgram() {
  const [form, setForm] = useState({
    title: "",
    topic: "",
    date: "",
    startTime: "",
    endTime: "",
    featured: true,
  });

  async function saveProgram() {
    await fetch("/api/programs/next", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    alert("Next program updated");
  }

  return (
    <section className="min-h-screen bg-zenithDeep px-6 py-24">
      <div className="max-w-xl mx-auto bg-white/5 p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6">
          Manage Next Program
        </h2>

        {["title", "topic", "date", "startTime", "endTime"].map((field) => (
          <input
            key={field}
            type={field.includes("Time") ? "time" : field === "date" ? "date" : "text"}
            placeholder={field}
            value={(form as any)[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
            className="w-full mb-4 px-4 py-2 rounded bg-black/30 border border-white/10"
          />
        ))}

        <button
          onClick={saveProgram}
          className="w-full py-3 bg-zenithGold text-black rounded-md font-semibold"
        >
          Save Next Program
        </button>
      </div>
    </section>
  );
}
