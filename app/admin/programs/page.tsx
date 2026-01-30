

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

  const [preview, setPreview] = useState(false);


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

        {preview && (
  <div className="mt-6 border border-white/10 rounded-xl p-4 bg-black/40">
    <p className="text-sm text-white/60 mb-2">Badge Preview</p>
    <div className="inline-block px-4 py-2 rounded-full bg-green-600 text-white font-semibold">
      {form.title} — {form.topic}
    </div>
  </div>
)}

        <button
          onClick={saveProgram}
          className="w-full py-3 bg-zenithGold text-black rounded-md font-semibold"
        >
          Save Next Program
        </button>


        <button
  onClick={() => setPreview((p) => !p)}
  className="mt-4 w-full py-2 border border-white/30 rounded-md"
>
  {preview ? "Hide Preview" : "Preview Badge"}
</button>


      </div>
    </section>
  );
}
