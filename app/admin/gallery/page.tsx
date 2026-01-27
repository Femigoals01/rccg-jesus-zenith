


// "use client";

// import { useState } from "react";

// export default function GalleryUploadPage() {
//   const [files, setFiles] = useState<FileList | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   async function handleUpload() {
//     if (!files) return;

//     setLoading(true);
//     setMessage("");

//     const formData = new FormData();
//     Array.from(files).forEach((file) =>
//       formData.append("files", file)
//     );

//     formData.append("key", "jesuszenith-admin");

//     const res = await fetch("/api/gallery/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const data = await res.json();

//     if (res.ok) {
//       setMessage("Upload successful 🎉");
//       setFiles(null);
//     } else {
//       setMessage(data.error || "Upload failed");
//     }

//     setLoading(false);
//   }

//   return (
//     <section className="min-h-screen bg-zenithDeep flex items-center justify-center px-6">
//       <div className="max-w-md w-full bg-white/5 p-8 rounded-xl border border-white/10">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Upload Sunday Photos
//         </h2>

//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => setFiles(e.target.files)}
//           className="w-full mb-6 text-sm"
//         />

//         <button
//           onClick={handleUpload}
//           disabled={!files || loading}
//           className="w-full py-3 bg-zenithGold text-black font-semibold rounded-md disabled:opacity-50"
//         >
//           {loading ? "Uploading..." : "Upload Photos"}
//         </button>

//         {message && (
//           <p className="mt-4 text-sm text-center text-white/70">
//             {message}
//           </p>
//         )}

//         <p className="text-xs text-white/60 mt-4 text-center">
//           Admin access only
//         </p>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  // Upload state
  const [files, setFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Fetch albums
  useEffect(() => {
    fetch("/api/gallery/admin")
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        setLoadingAlbums(false);
      });
  }, []);

  async function handleUpload() {
    if (!files || !eventDate || !title) {
      setMessage("Please provide title, date, and images.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    Array.from(files).forEach((file) =>
      formData.append("files", file)
    );

    formData.append("title", title);
    formData.append("description", description);
    formData.append("eventDate", eventDate);
    formData.append("key", "jesuszenith-admin");

    const res = await fetch("/api/gallery/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Gallery uploaded successfully 🎉");
      setFiles(null);
      setTitle("");
      setDescription("");
      setEventDate("");

      // 🔄 Refresh albums
      const refreshed = await fetch("/api/gallery/admin").then((r) =>
        r.json()
      );
      setAlbums(refreshed);
    } else {
      setMessage(data.error || "Upload failed");
    }

    setUploading(false);
  }

  return (
    <section className="min-h-screen bg-zenithDeep px-6 py-16">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ================= UPLOAD FORM ================= */}
        <div className="max-w-md bg-white/5 p-8 rounded-xl border border-white/10 mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Upload Gallery Batch
          </h2>

          <label className="block text-sm mb-1">Event Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-black/30 border border-white/10"
          />

          <label className="block text-sm mb-1">Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-black/30 border border-white/10"
          />

          <label className="block text-sm mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-black/30 border border-white/10"
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
            className="w-full mb-6 text-sm"
          />

          <button
            onClick={handleUpload}
            disabled={!files || uploading}
            className="w-full py-3 bg-zenithGold text-black font-semibold rounded-md disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Gallery"}
          </button>

          {message && (
            <p className="mt-4 text-sm text-center text-white/70">
              {message}
            </p>
          )}
        </div>

        {/* ================= ALBUM LIST ================= */}
        <div>
          <h2 className="text-3xl font-bold mb-10 text-center">
            Uploaded Albums
          </h2>

          {loadingAlbums ? (
            <p className="text-center text-white/60">
              Loading albums…
            </p>
          ) : albums.length === 0 ? (
            <p className="text-center text-white/60">
              No albums uploaded yet.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => (
                <AlbumCard
                  key={album.groupId}
                  album={album}
                  onChange={(updated) =>
                    setAlbums((prev) =>
                      prev.map((a) =>
                        a.groupId === updated.groupId ? updated : a
                      )
                    )
                  }
                  onDelete={(groupId) =>
                    setAlbums((prev) =>
                      prev.filter((a) => a.groupId !== groupId)
                    )
                  }
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
