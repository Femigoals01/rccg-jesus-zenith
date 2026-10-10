




// "use client";

// import { useEffect, useState } from "react";
// import AlbumCard from "./AlbumCard";

// export default function AdminGalleryPage() {
//   const [albums, setAlbums] = useState<any[]>([]);
//   const [loadingAlbums, setLoadingAlbums] = useState(true);

//   const [files, setFiles] = useState<FileList | null>(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [eventDate, setEventDate] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");

//   async function loadAlbums() {
//     try {
//       const res = await fetch("/api/gallery/admin", { cache: "no-store" });
//       const data = await res.json();

//       if (Array.isArray(data)) {
//         setAlbums(data);
//       } else {
//         setAlbums([]);
//       }
//     } catch {
//       setAlbums([]);
//     } finally {
//       setLoadingAlbums(false);
//     }
//   }

//   useEffect(() => {
//     loadAlbums();
//   }, []);

//   // async function handleUpload() {
//   //   if (!files || !eventDate || !title) {
//   //     setMessage("Please provide title, date, and images.");
//   //     return;
//   //   }




//   //   if (files.length > 100) {
//   //     setMessage("Please upload maximum 100 images at once.");
//   //     return;
//   //   }

//   //   setUploading(true);
//   //   setMessage("Uploading images, please wait...");

//   //   try {
//   //     const formData = new FormData();

//   //     Array.from(files).forEach((file) => {
//   //       formData.append("files", file);
//   //     });

//   //     formData.append("title", title);
//   //     formData.append("description", description);
//   //     formData.append("eventDate", eventDate);
//   //     formData.append("key", "jesuszenith-admin");

//   //     const res = await fetch("/api/gallery/upload", {
//   //       method: "POST",
//   //       body: formData,
//   //     });

//   //     const data = await res.json().catch(() => null);

//   //     if (!res.ok) {
//   //       setMessage(data?.error || "Upload failed. Please try again.");
//   //       return;
//   //     }

//   //     setMessage("Gallery uploaded successfully 🎉");
//   //     setFiles(null);
//   //     setTitle("");
//   //     setDescription("");
//   //     setEventDate("");

//   //     const fileInput = document.getElementById(
//   //       "gallery-files"
//   //     ) as HTMLInputElement | null;

//   //     if (fileInput) fileInput.value = "";

//   //     await loadAlbums();
//   //   } catch (error) {
//   //     console.error("GALLERY UPLOAD ERROR:", error);
//   //     setMessage("Upload failed. Please check your internet or image size.");
//   //   } finally {
//   //     setUploading(false);
//   //   }
//   // }



//   async function handleUpload() {
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
//     const allFiles = Array.from(files);
//     const batchSize = 10;
//     let groupId = "";

//     for (let i = 0; i < allFiles.length; i += batchSize) {
//       const batch = allFiles.slice(i, i + batchSize);
//       const formData = new FormData();

//       batch.forEach((file) => {
//         formData.append("files", file);
//       });

//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("eventDate", eventDate);
//       formData.append("key", "jesuszenith-admin");

//       if (groupId) {
//         formData.append("groupId", groupId);
//       }

//       setMessage(
//         `Uploading ${Math.min(i + batch.length, allFiles.length)} of ${
//           allFiles.length
//         } images...`
//       );

//       const res = await fetch("/api/gallery/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json().catch(() => null);

//       if (!res.ok) {
//         setMessage(data?.error || "Upload failed. Please try again.");
//         return;
//       }

//       if (!groupId) {
//         groupId = data.groupId;
//       }
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



//   return (
//     <section className="min-h-screen bg-zenithDeep px-6 py-16">
//       <div className="max-w-7xl mx-auto space-y-20">
//         <div className="max-w-md bg-white/5 p-8 rounded-xl border border-white/10 mx-auto">
//           <h2 className="text-2xl font-bold mb-6 text-center">
//             Upload Gallery Batch
//           </h2>

//           <label className="block text-sm mb-1">Event Title</label>
//           <input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full mb-4 p-2 rounded bg-black/30 border border-white/10"
//           />

//           <label className="block text-sm mb-1">Event Date</label>
//           <input
//             type="date"
//             value={eventDate}
//             onChange={(e) => setEventDate(e.target.value)}
//             className="w-full mb-4 p-2 rounded bg-black/30 border border-white/10"
//           />

//           <label className="block text-sm mb-1">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full mb-4 p-2 rounded bg-black/30 border border-white/10"
//           />

//           <input
//             id="gallery-files"
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={(e) => setFiles(e.target.files)}
//             className="w-full mb-3 text-sm"
//           />

//           {files && (
//             <p className="mb-6 text-xs text-white/50">
//               {files.length} image(s) selected. Maximum recommended: 8 images.
//             </p>
//           )}

//           <button
//             onClick={handleUpload}
//             disabled={!files || uploading}
//             className="w-full py-3 bg-zenithGold text-black font-semibold rounded-md disabled:opacity-50"
//           >
//             {uploading ? "Uploading..." : "Upload Gallery"}
//           </button>

//           {message && (
//             <p className="mt-4 text-sm text-center text-white/70">
//               {message}
//             </p>
//           )}
//         </div>

//         <div>
//           <h2 className="text-3xl font-bold mb-10 text-center">
//             Uploaded Albums
//           </h2>

//           {loadingAlbums ? (
//             <p className="text-center text-white/60">Loading albums…</p>
//           ) : albums.length === 0 ? (
//             <p className="text-center text-white/60">
//               No albums uploaded yet.
//             </p>
//           ) : (
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {albums.map((album) => (
//                 <AlbumCard
//                   key={album.groupId}
//                   album={album}
//                   onChange={(updated) =>
//                     setAlbums((prev) =>
//                       prev.map((a) =>
//                         a.groupId === updated.groupId ? updated : a
//                       )
//                     )
//                   }
//                   onDelete={(groupId) =>
//                     setAlbums((prev) =>
//                       prev.filter((a) => a.groupId !== groupId)
//                     )
//                   }
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }





"use client";

import { useEffect, useRef, useState } from "react";
import AlbumCard from "./AlbumCard";

const MAX_PHOTOS = 250;
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const MAX_RETRIES = 3;

type GalleryImage = {
  id: string;
  url: string;
};

type Album = {
  groupId: string;
  title: string;
  description: string;
  eventDate: string;
  images: GalleryImage[];
  coverPublicId?: string;
  featured?: boolean;
};

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(0);
  const [failed, setFailed] = useState(0);

  const [resumeGroupId, setResumeGroupId] = useState("");
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  async function loadAlbums() {
    try {
      const response = await fetch("/api/gallery/admin", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to load albums.");
      }

      const data = await response.json();

      setAlbums(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("LOAD ALBUMS ERROR:", error);
      setMessage("Unable to load existing albums.");
    } finally {
      setLoadingAlbums(false);
    }
  }

  useEffect(() => {
    void loadAlbums();
  }, []);

  function handleFileSelection(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = Array.from(event.target.files || []);

    if (selected.length > MAX_PHOTOS) {
      setFiles([]);
      setMessage(
        `You can select a maximum of ${MAX_PHOTOS} photographs.`
      );
      event.target.value = "";
      return;
    }

    const invalid = selected.find(
      (file) =>
        !["image/jpeg", "image/png", "image/webp"].includes(
          file.type
        ) || file.size > MAX_FILE_SIZE
    );

    if (invalid) {
      setFiles([]);
      setMessage(
        `Please use JPG, PNG or WebP images under 3 MB each. Check: ${invalid.name}`
      );
      event.target.value = "";
      return;
    }

    setFiles(selected);
    setPendingFiles([]);
    setResumeGroupId("");
    setCompleted(0);
    setFailed(0);
    setMessage(
      selected.length
        ? `${selected.length} photographs ready to upload.`
        : ""
    );
  }

  async function uploadOne(
    file: File,
    groupId: string
  ): Promise<string> {
    const formData = new FormData();

    formData.append("files", file);
    formData.append("title", title.trim());
    formData.append("description", description);
    formData.append("eventDate", eventDate);

    // Uses the existing upload-key configuration.
    formData.append("key", "jesuszenith-admin");

    if (groupId) {
      formData.append("groupId", groupId);
    }

    const response = await fetch("/api/gallery/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success) {
      const error = new Error(
        data?.error || `Upload failed: ${file.name}`
      ) as Error & { status?: number };

      error.status = response.status;
      throw error;
    }

    if (!data.groupId) {
      throw new Error("Upload response did not include an album ID.");
    }

    return data.groupId as string;
  }

  async function uploadWithRetry(
    file: File,
    groupId: string
  ) {
    let lastError: unknown;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await uploadOne(file, groupId);
      } catch (error) {
        lastError = error;

        const status = (
          error as Error & { status?: number }
        ).status;

        // Do not retry authorization or validation failures.
        if (
          status === 400 ||
          status === 401 ||
          status === 403 ||
          status === 404 ||
          status === 413
        ) {
          break;
        }

        if (attempt < MAX_RETRIES) {
          setMessage(
            `Retrying ${file.name} (${attempt}/${MAX_RETRIES - 1})...`
          );

          await wait(attempt * 1500);
        }
      }
    }

    throw lastError;
  }

  async function handleUpload() {
    if (uploading) return;

    if (!title.trim() || !eventDate || files.length === 0) {
      setMessage(
        "Please provide the event title, date and photographs."
      );
      return;
    }

    setUploading(true);
    setFailed(0);

    const isResuming =
      Boolean(resumeGroupId) && pendingFiles.length > 0;

    const uploadFiles = isResuming ? pendingFiles : files;

    let groupId = isResuming ? resumeGroupId : "";
    let successful = isResuming
      ? files.length - pendingFiles.length
      : 0;

    const remaining: File[] = [];
    let failureCount = 0;
    let lastError = "";

    setCompleted(successful);

    try {
      for (let index = 0; index < uploadFiles.length; index++) {
        const file = uploadFiles[index];

        setMessage(
          `Uploading photograph ${successful + failureCount + 1} of ${files.length}: ${file.name}`
        );

        try {
          groupId = await uploadWithRetry(file, groupId);

          successful++;
          setCompleted(successful);
          setResumeGroupId(groupId);
        } catch (error) {
          console.error("PHOTO UPLOAD ERROR:", error);

          remaining.push(file);
          failureCount++;
          setFailed(failureCount);

          lastError =
            error instanceof Error
              ? error.message
              : "Unknown upload error.";

          // If the first photograph could not create an album,
          // stop instead of creating a second album.
          if (!groupId) {
            remaining.push(
              ...uploadFiles.slice(index + 1)
            );
            break;
          }
        }
      }

      setPendingFiles(remaining);

      await loadAlbums();

      if (remaining.length === 0) {
        setMessage(
          `Success! All ${files.length} photographs have been uploaded.`
        );

        setFiles([]);
        setTitle("");
        setDescription("");
        setEventDate("");
        setResumeGroupId("");
        setPendingFiles([]);
        setCompleted(0);
        setFailed(0);

        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } else {
        setMessage(
          `${successful} of ${files.length} photographs uploaded. ` +
          `${remaining.length} need another attempt. ` +
          `Last error: ${lastError}`
        );
      }
    } finally {
      setUploading(false);
    }
  }

  const progress =
    files.length > 0
      ? Math.round((completed / files.length) * 100)
      : 0;

  return (
    <section className="min-h-screen bg-zenithDeep px-5 py-20 text-white sm:px-6">
      <div className="mx-auto max-w-7xl space-y-20">

        {/* Upload panel */}

        <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl sm:p-9">

          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zenithGold">
              Gallery Management
            </p>

            <h1 className="text-3xl font-bold">
              Upload Photo Album
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/55">
              Upload up to 250 photographs per session.
              Images are saved individually to improve
              reliability.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="gallery-title"
                className="mb-2 block text-sm font-medium"
              >
                Event Title
              </label>

              <input
                id="gallery-title"
                value={title}
                disabled={uploading || Boolean(resumeGroupId)}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="e.g. Sunday Thanksgiving Service"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-zenithGold/50 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="gallery-date"
                className="mb-2 block text-sm font-medium"
              >
                Event Date
              </label>

              <input
                id="gallery-date"
                type="date"
                value={eventDate}
                disabled={uploading || Boolean(resumeGroupId)}
                onChange={(event) =>
                  setEventDate(event.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-zenithGold/50 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="gallery-description"
                className="mb-2 block text-sm font-medium"
              >
                Description
              </label>

              <textarea
                id="gallery-description"
                value={description}
                disabled={uploading || Boolean(resumeGroupId)}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                rows={3}
                placeholder="Describe the event..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-zenithGold/50 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="gallery-files"
                className="mb-2 block text-sm font-medium"
              >
                Select Photographs
              </label>

              <input
                ref={inputRef}
                id="gallery-files"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                disabled={uploading || Boolean(resumeGroupId)}
                onChange={handleFileSelection}
                className="block w-full rounded-xl border border-dashed border-white/20 bg-black/20 p-4 text-sm text-white/70 file:mr-4 file:rounded-lg file:border-0 file:bg-zenithGold file:px-4 file:py-2 file:font-semibold file:text-black disabled:opacity-50"
              />

              <p className="mt-2 text-xs text-white/45">
                Maximum 250 photographs. JPG, PNG or WebP.
                Maximum 3 MB per photograph.
              </p>
            </div>

            {files.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">
                    Upload Progress
                  </span>

                  <span className="text-sm font-semibold text-zenithGold">
                    {progress}%
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-zenithGold transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-white/60">
                  <span>
                    {completed} / {files.length} uploaded
                  </span>

                  {failed > 0 && (
                    <span className="text-red-300">
                      {failed} failed
                    </span>
                  )}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleUpload}
              disabled={
                uploading ||
                files.length === 0 ||
                !title.trim() ||
                !eventDate
              }
              className="w-full rounded-xl bg-zenithGold px-6 py-4 font-bold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading
                ? "Uploading Photographs..."
                : pendingFiles.length > 0
                  ? `Retry ${pendingFiles.length} Remaining Photographs`
                  : `Upload ${files.length || ""} Photographs`}
            </button>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm leading-6 text-white/75"
              >
                {message}
              </p>
            )}

            {uploading && (
              <p className="text-center text-xs text-amber-200/80">
                Keep this page open until the upload finishes.
              </p>
            )}
          </div>
        </div>

        {/* Existing albums */}

        <div>
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zenithGold">
              Photo Library
            </p>

            <h2 className="text-3xl font-bold">
              Uploaded Albums
            </h2>

            <p className="mt-3 text-sm text-white/50">
              Manage photographs, album details and covers.
            </p>
          </div>

          {loadingAlbums ? (
            <p className="text-center text-white/60">
              Loading albums...
            </p>
          ) : albums.length === 0 ? (
            <p className="text-center text-white/60">
              No albums uploaded yet.
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => (
                <AlbumCard
                  key={album.groupId}
                  album={album}
                  onChange={(updated: Album) =>
                    setAlbums((previous) =>
                      previous.map((item) =>
                        item.groupId === updated.groupId
                          ? updated
                          : item
                      )
                    )
                  }
                  onDelete={(groupId: string) =>
                    setAlbums((previous) =>
                      previous.filter(
                        (item) => item.groupId !== groupId
                      )
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
