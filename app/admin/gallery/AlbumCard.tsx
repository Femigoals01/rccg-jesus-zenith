


// "use client";

// import { useState } from "react";
// import Image from "next/image";
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

//   async function setCover(publicId: string) {
//     await fetch("/api/gallery/cover", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         groupId: album.groupId,
//         publicId,
//       }),
//     });

//     onChange({ ...album, coverPublicId: publicId });
//   }

//   return (
//     <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
//       {editing ? (
//         <>
//           <input
//             className="w-full px-3 py-2 rounded bg-black/30 border border-white/10"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//           />

//           <textarea
//             className="w-full px-3 py-2 rounded bg-black/30 border border-white/10"
//             value={form.description}
//             onChange={(e) =>
//               setForm({ ...form, description: e.target.value })
//             }
//           />

//           <input
//             type="date"
//             className="w-full px-3 py-2 rounded bg-black/30 border border-white/10"
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
//           <h3 className="text-lg font-semibold">
//             {album.title}
//           </h3>

//           <p className="text-sm text-white/70">{album.description}</p>
//           <p className="text-xs text-white/60">{album.eventDate}</p>

//           {/* Image thumbnails */}
//           <div className="grid grid-cols-3 gap-2 mt-4">
//             {album.images?.map((img: any) => (
//               <div key={img.id} className="relative h-20 group">
//                 <Image
//                   src={img.url}
//                   alt=""
//                   fill
//                   className="object-cover rounded"
//                 />
//                 <button
//                   onClick={() => setCover(img.id)}
//                   className="absolute inset-0 bg-black/60 text-xs text-white opacity-0 group-hover:opacity-100 transition"
//                 >
//                   Set as cover
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="mt-4 flex gap-4 text-sm">
//             <button
//               onClick={() => setEditing(true)}
//               className="text-zenithGold"
//             >
//               Edit
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
  const [openAlbum, setOpenAlbum] = useState(false);
  const [activeImage, setActiveImage] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: album.title,
    description: album.description,
    eventDate: album.eventDate,
  });

  const cover =
    album.images?.find((img: any) => img.id === album.coverPublicId) ||
    album.images?.[0];

  async function handleSave() {
    setSaving(true);
    const updated = await updateAlbum(album.groupId, form);
    onChange({ ...album, ...updated });
    setSaving(false);
    setEditing(false);
  }

  async function handleDelete() {
    if (!confirm("Delete this entire album?")) return;
    await deleteAlbum(album.groupId);
    onDelete(album.groupId);
  }

  async function setCover(publicId: string) {
    await fetch("/api/gallery/cover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupId: album.groupId, publicId }),
    });

    onChange({ ...album, coverPublicId: publicId });
  }

  async function downloadImage(img: any) {
    const res = await fetch(img.url);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${album.title || "gallery-image"}.jpg`;
    a.click();

    window.URL.revokeObjectURL(url);
  }

  async function shareImage(img: any) {
    if (navigator.share) {
      await navigator.share({
        title: album.title,
        text: album.description,
        url: img.url,
      });
    } else {
      await navigator.clipboard.writeText(img.url);
      alert("Image link copied.");
    }
  }

  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        {cover && (
          <div className="relative h-56">
            <Image
              src={cover.url}
              alt={album.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6 space-y-4">
          {editing ? (
            <>
              <input
                className="w-full px-3 py-2 rounded bg-black/30 border border-white/10"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
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
              <h3 className="text-lg font-semibold">{album.title}</h3>
              <p className="text-sm text-white/70">{album.description}</p>
              <p className="text-xs text-white/60">{album.eventDate}</p>
              <p className="text-xs text-zenithGold">
                {album.images?.length || 0} photos
              </p>

              <div className="flex flex-wrap gap-4 text-sm pt-2">
                <button
                  onClick={() => setOpenAlbum(true)}
                  className="text-zenithGold"
                >
                  Open Album
                </button>

                <button
                  onClick={() => setEditing(true)}
                  className="text-white/80"
                >
                  Edit
                </button>

                <button onClick={handleDelete} className="text-red-400">
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {openAlbum && (
        <div className="fixed inset-0 z-50 bg-black/80 px-4 py-10 overflow-y-auto">
          <div className="max-w-6xl mx-auto bg-zenithDeep rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">{album.title}</h2>
                <p className="text-white/60 text-sm">{album.description}</p>
              </div>

              <button
                onClick={() => setOpenAlbum(false)}
                className="text-2xl text-white/70"
              >
                ✕
              </button>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {album.images?.map((img: any) => (
                <div key={img.id} className="bg-black/30 rounded-xl p-3">
                  <div className="relative h-44 mb-3">
                    <Image
                      src={img.url}
                      alt=""
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs">
                    <button
                      onClick={() => setActiveImage(img)}
                      className="text-zenithGold"
                    >
                      View
                    </button>

                    <button
                      onClick={() => downloadImage(img)}
                      className="text-white/80"
                    >
                      Download
                    </button>

                    <button
                      onClick={() => shareImage(img)}
                      className="text-white/80"
                    >
                      Share
                    </button>

                    <button
                      onClick={() => setCover(img.id)}
                      className="text-white/50"
                    >
                      Set Cover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeImage && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center px-4">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-3xl text-white"
          >
            ✕
          </button>

          <img
            src={activeImage.url}
            alt=""
            className="max-w-full max-h-[85vh] rounded-xl"
          />
        </div>
      )}
    </>
  );
}