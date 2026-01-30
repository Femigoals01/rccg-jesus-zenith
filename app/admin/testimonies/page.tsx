
"use client";

import { useEffect, useState } from "react";

export default function AdminTestimonies() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    title: "",
    category: "",
    text: "",
  });

  async function load() {
    const res = await fetch("/api/testimonies");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function addTestimony() {
    await fetch("/api/testimonies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", title: "", category: "", text: "" });
    load();
  }

  async function deleteTestimony(id: number) {
    await fetch("/api/testimonies", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    load();
  }

  return (
    <section className="min-h-screen bg-zenithDeep px-6 py-24">
      <div className="max-w-3xl mx-auto space-y-10">

        <h2 className="text-2xl font-bold">Manage Testimonies</h2>

        {/* Add Form */}
        <div className="bg-white/5 p-6 rounded-xl space-y-4">
          {["name", "title", "category"].map((f) => (
            <input
              key={f}
              placeholder={f}
              value={(form as any)[f]}
              onChange={(e) =>
                setForm({ ...form, [f]: e.target.value })
              }
              className="w-full p-2 rounded bg-black/30"
            />
          ))}

          <textarea
            placeholder="Testimony text"
            value={form.text}
            onChange={(e) =>
              setForm({ ...form, text: e.target.value })
            }
            className="w-full p-2 rounded bg-black/30"
          />

          <button
            onClick={addTestimony}
            className="px-6 py-2 bg-zenithGold text-black rounded font-semibold"
          >
            Add Testimony
          </button>
        </div>

        {/* List */}
        <div className="space-y-4">
          {items.map((t) => (
            <div
              key={t.id}
              className="bg-white/5 p-4 rounded-xl flex justify-between items-start"
            >
              <div>
                <p className="font-semibold">{t.title}</p>
                <p className="text-sm text-white/70">{t.name}</p>
              </div>

              <button
                onClick={() => deleteTestimony(t.id)}
                className="text-red-400 text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
