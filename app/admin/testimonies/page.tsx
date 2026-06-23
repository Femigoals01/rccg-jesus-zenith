


// "use client";

// import { useEffect, useState } from "react";

// export default function AdminTestimonies() {
//   const [items, setItems] = useState<any[]>([]);
//   const [form, setForm] = useState({
//     name: "",
//     title: "",
//     category: "",
//     text: "",
//   });

//   async function load() {
//     const res = await fetch("/api/testimonies");
//     setItems(await res.json());
//   }

//   useEffect(() => {
//     load();
//   }, []);

//   async function addTestimony() {
//     await fetch("/api/testimonies", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     setForm({ name: "", title: "", category: "", text: "" });
//     load();
//   }

//   async function deleteTestimony(id: number) {
//     await fetch("/api/testimonies", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });

//     load();
//   }

//   return (
//     <section className="min-h-screen bg-zenithDeep px-6 py-24">
//       <div className="max-w-3xl mx-auto space-y-10">

//         <h2 className="text-2xl font-bold">Manage Testimonies</h2>

//         {/* Add Form */}
//         <div className="bg-white/5 p-6 rounded-xl space-y-4">
//           {["name", "title", "category"].map((f) => (
//             <input
//               key={f}
//               placeholder={f}
//               value={(form as any)[f]}
//               onChange={(e) =>
//                 setForm({ ...form, [f]: e.target.value })
//               }
//               className="w-full p-2 rounded bg-black/30"
//             />
//           ))}

//           <textarea
//             placeholder="Testimony text"
//             value={form.text}
//             onChange={(e) =>
//               setForm({ ...form, text: e.target.value })
//             }
//             className="w-full p-2 rounded bg-black/30"
//           />

//           <button
//             onClick={addTestimony}
//             className="px-6 py-2 bg-zenithGold text-black rounded font-semibold"
//           >
//             Add Testimony
//           </button>
//         </div>

//         {/* List */}
//         <div className="space-y-4">
//           {items.map((t) => (
//             <div
//               key={t.id}
//               className="bg-white/5 p-4 rounded-xl flex justify-between items-start"
//             >
//               <div>
//                 <p className="font-semibold">{t.title}</p>
//                 <p className="text-sm text-white/70">{t.name}</p>
//               </div>

//               {/* <button
//                 onClick={() => deleteTestimony(t.id)}
//                 className="text-red-400 text-sm"
//               >
//                 Delete
//               </button> */}

              
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }




"use client";

import { useEffect, useState } from "react";

export default function AdminTestimonies() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    title: "",
    category: "",
    text: "",
  });

  async function load() {
    try {
      const res = await fetch("/api/testimonies", { cache: "no-store" });
      const data = await res.json();

      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
      }
    } catch {
      setItems([]);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function addTestimony() {
    if (!form.name || !form.title || !form.text) {
      alert("Please fill name, title and testimony text.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/testimonies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to add testimony.");
      return;
    }

    setForm({ name: "", title: "", category: "", text: "" });
    load();
  }

  async function deleteTestimony(id: string) {
    if (!confirm("Delete this testimony?")) return;

    setDeletingId(id);

    const res = await fetch("/api/testimonies/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setDeletingId(null);

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      alert(error?.error || "Failed to delete testimony.");
      return;
    }

    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  return (
    <section className="min-h-screen bg-zenithDeep px-6 py-24">
      <div className="max-w-3xl mx-auto space-y-10">
        <h2 className="text-2xl font-bold">Manage Testimonies</h2>

        <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 rounded bg-black/30 border border-white/10 text-white"
          />

          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 rounded bg-black/30 border border-white/10 text-white"
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-3 rounded bg-black/30 border border-white/10 text-white"
          />

          <textarea
            placeholder="Testimony text"
            value={form.text}
            rows={5}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            className="w-full p-3 rounded bg-black/30 border border-white/10 text-white"
          />

          <button
            onClick={addTestimony}
            disabled={loading}
            className="px-6 py-2 bg-zenithGold text-black rounded font-semibold disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Testimony"}
          </button>
        </div>

        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-white/60">No testimonies yet.</p>
          ) : (
            items.map((t) => (
              <div
                key={t.id}
                className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
              >
                <div>
                  <p className="font-semibold">{t.title}</p>
                  <p className="text-sm text-white/70">{t.name}</p>
                  {t.category && (
                    <p className="text-xs text-zenithGold mt-1">
                      {t.category}
                    </p>
                  )}
                  <p className="text-sm text-white/70 mt-3 leading-relaxed">
                    {t.text}
                  </p>
                </div>

                <button
                  onClick={() => deleteTestimony(t.id)}
                  disabled={deletingId === t.id}
                  className="text-red-400 text-sm hover:underline disabled:opacity-50"
                >
                  {deletingId === t.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}