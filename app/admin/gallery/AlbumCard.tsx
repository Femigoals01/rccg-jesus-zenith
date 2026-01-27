


// "use client";

// import { useState } from "react";
// import { deleteAlbum, updateAlbum } from "./actions";

// export default function AlbumCard({ album, onChange, onDelete }: any) {
//   const [editing, setEditing] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const [form, setForm] = useState({
//     title: album.title,
//     description: album.description,
//     eventDate: album.eventDate,
//   });

//   async function handleSave() {
//     setSaving(true);
//     const updated = await updateAlbum(album.groupId, form);
//     onChange({ ...album, ...updated });
//     setSaving(false);
//     setEditing(false);
//   }

//   async function handleDelete() {
//     if (!confirm("Delete this entire album? This cannot be undone.")) return;
//     await deleteAlbum(album.groupId);
//     onDelete(album.groupId);
//   }

//   async function toggleFeatured() {
//     await fetch("/api/gallery/feature", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         groupId: album.groupId,
//         featured: !album.featured,
//       }),
//     });

//     onChange({ ...album, featured: !album.featured });
//   }

//   return (
//     <div className="bg-white/5 border border-white/10 rounded-xl p-6">
//       {editing ? (
//         <>
//           <input
//             className="w-full mb-2 px-3 py-2 rounded bg-black/30 border border-white/10"
//             value={form.title}
//             onChange={(e) =>
//               setForm({ ...form, title: e.target.value })
//             }
//           />

//           <textarea
//             className="w-full mb-2 px-3 py-2 rounded bg-black/30 border border-white/10"
//             value={form.description}
//             onChange={(e) =>
//               setForm({ ...form, description: e.target.value })
//             }
//           />

//           <input
//             type="date"
//             className="w-full mb-4 px-3 py-2 rounded bg-black/30 border border-white/10"
//             value={form.eventDate}
//             onChange={(e) =>
//               setForm({ ...form, eventDate: e.target.value })
//             }
//           />

//           <div className="flex gap-4">
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="px-4 py-2 bg-zenithGold text-black rounded font-semibold"
//             >
//               {saving ? "Saving..." : "Save"}
//             </button>
//             <button
//               onClick={() => setEditing(false)}
//               className="px-4 py-2 border border-white/30 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </>
//       ) : (
//         <>
//           <h3 className="text-lg font-semibold flex items-center gap-2">
//             {album.title}
//             {album.featured && (
//               <span className="text-xs bg-zenithGold text-black px-2 py-0.5 rounded">
//                 Featured
//               </span>
//             )}
//           </h3>

//           <p className="text-sm text-white/70 mt-1">
//             {album.description}
//           </p>

//           <p className="text-xs text-white/60 mt-2">
//             {album.eventDate}
//           </p>

//           <div className="mt-6 flex flex-wrap gap-4 text-sm">
//             <button
//               onClick={() => setEditing(true)}
//               className="text-zenithGold"
//             >
//               Edit
//             </button>

//             <button
//               onClick={toggleFeatured}
//               className="text-zenithGold"
//             >
//               {album.featured ? "Unfeature" : "Feature"}
//             </button>

//             <button
//               onClick={handleDelete}
//               className="text-red-400"
//             >
//               Delete
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import Image from "next/image";
import { deleteAlbum, updateAlbum } from "./actions";

export default function AlbumCard({ album, onChange, onDelete }: any) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: album.title,
    description: album.description,
    eventDate: album.eventDate,
  });

  async function handleSave() {
    setSaving(true);
    const updated = await updateAlbum(album.groupId, form);
    onChange({ ...album, ...updated });
    setSaving(false);
    setEditing(false);
  }

  async function handleDelete() {
    if (!confirm("Delete this entire album? This cannot be undone.")) return;
    await deleteAlbum(album.groupId);
    onDelete(album.groupId);
  }

  async function setCover(publicId: string) {
    await fetch("/api/gallery/cover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupId: album.groupId,
        publicId,
      }),
    });

    onChange({ ...album, coverPublicId: publicId });
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
      {editing ? (
        <>
          <input
            className="w-full px-3 py-2 rounded bg-black/30 border border-white/10"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="w-full px-3 py-2 rounded bg-black/30 border border-white/10"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            type="date"
            className="w-full px-3 py-2 rounded bg-black/30 border border-white/10"
            value={form.eventDate}
            onChange={(e) =>
              setForm({ ...form, eventDate: e.target.value })
            }
          />

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-zenithGold text-black rounded font-semibold"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 border border-white/30 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold">
            {album.title}
          </h3>

          <p className="text-sm text-white/70">{album.description}</p>
          <p className="text-xs text-white/60">{album.eventDate}</p>

          {/* Image thumbnails */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {album.images?.map((img: any) => (
              <div key={img.id} className="relative h-20 group">
                <Image
                  src={img.url}
                  alt=""
                  fill
                  className="object-cover rounded"
                />
                <button
                  onClick={() => setCover(img.id)}
                  className="absolute inset-0 bg-black/60 text-xs text-white opacity-0 group-hover:opacity-100 transition"
                >
                  Set as cover
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-4 text-sm">
            <button
              onClick={() => setEditing(true)}
              className="text-zenithGold"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
