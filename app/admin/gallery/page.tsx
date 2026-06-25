




"use client";

import { useEffect, useState } from "react";
import AlbumCard from "./AlbumCard";

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  const [files, setFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadAlbums() {
    try {
      const res = await fetch("/api/gallery/admin", { cache: "no-store" });
      const data = await res.json();

      if (Array.isArray(data)) {
        setAlbums(data);
      } else {
        setAlbums([]);
      }
    } catch {
      setAlbums([]);
    } finally {
      setLoadingAlbums(false);
    }
  }

  useEffect(() => {
    loadAlbums();
  }, []);

  // async function handleUpload() {
  //   if (!files || !eventDate || !title) {
  //     setMessage("Please provide title, date, and images.");
  //     return;
  //   }




  //   if (files.length > 100) {
  //     setMessage("Please upload maximum 100 images at once.");
  //     return;
  //   }

  //   setUploading(true);
  //   setMessage("Uploading images, please wait...");

  //   try {
  //     const formData = new FormData();

  //     Array.from(files).forEach((file) => {
  //       formData.append("files", file);
  //     });

  //     formData.append("title", title);
  //     formData.append("description", description);
  //     formData.append("eventDate", eventDate);
  //     formData.append("key", "jesuszenith-admin");

  //     const res = await fetch("/api/gallery/upload", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await res.json().catch(() => null);

  //     if (!res.ok) {
  //       setMessage(data?.error || "Upload failed. Please try again.");
  //       return;
  //     }

  //     setMessage("Gallery uploaded successfully 🎉");
  //     setFiles(null);
  //     setTitle("");
  //     setDescription("");
  //     setEventDate("");

  //     const fileInput = document.getElementById(
  //       "gallery-files"
  //     ) as HTMLInputElement | null;

  //     if (fileInput) fileInput.value = "";

  //     await loadAlbums();
  //   } catch (error) {
  //     console.error("GALLERY UPLOAD ERROR:", error);
  //     setMessage("Upload failed. Please check your internet or image size.");
  //   } finally {
  //     setUploading(false);
  //   }
  // }



  async function handleUpload() {
  if (!files || !eventDate || !title) {
    setMessage("Please provide title, date, and images.");
    return;
  }

  if (files.length > 100) {
    setMessage("Please upload maximum 100 images at once.");
    return;
  }

  setUploading(true);
  setMessage("Uploading images, please wait...");

  try {
    const allFiles = Array.from(files);
    const batchSize = 10;
    let groupId = "";

    for (let i = 0; i < allFiles.length; i += batchSize) {
      const batch = allFiles.slice(i, i + batchSize);
      const formData = new FormData();

      batch.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("title", title);
      formData.append("description", description);
      formData.append("eventDate", eventDate);
      formData.append("key", "jesuszenith-admin");

      if (groupId) {
        formData.append("groupId", groupId);
      }

      setMessage(
        `Uploading ${Math.min(i + batch.length, allFiles.length)} of ${
          allFiles.length
        } images...`
      );

      const res = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setMessage(data?.error || "Upload failed. Please try again.");
        return;
      }

      if (!groupId) {
        groupId = data.groupId;
      }
    }

    setMessage("Gallery uploaded successfully 🎉");
    setFiles(null);
    setTitle("");
    setDescription("");
    setEventDate("");

    const fileInput = document.getElementById(
      "gallery-files"
    ) as HTMLInputElement | null;

    if (fileInput) fileInput.value = "";

    await loadAlbums();
  } catch (error) {
    console.error("GALLERY UPLOAD ERROR:", error);
    setMessage("Upload failed. Please check your internet or image size.");
  } finally {
    setUploading(false);
  }
}



  return (
    <section className="min-h-screen bg-zenithDeep px-6 py-16">
      <div className="max-w-7xl mx-auto space-y-20">
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
            id="gallery-files"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
            className="w-full mb-3 text-sm"
          />

          {files && (
            <p className="mb-6 text-xs text-white/50">
              {files.length} image(s) selected. Maximum recommended: 8 images.
            </p>
          )}

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

        <div>
          <h2 className="text-3xl font-bold mb-10 text-center">
            Uploaded Albums
          </h2>

          {loadingAlbums ? (
            <p className="text-center text-white/60">Loading albums…</p>
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