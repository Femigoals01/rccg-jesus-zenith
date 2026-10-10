

// "use client";

// import { useState, memo } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import ImageLightbox from "../../components/ImageLightbox";

// type ImageItem = {
//   id: string;
//   url: string;
// };

// type Album = {
//   groupId: string;
//   title: string;
//   description?: string;
//   eventDate?: string;
//   coverPublicId?: string;
//   images: ImageItem[];
// };

// function GalleryClient({ groups }: { groups: Album[] }) {
//   const [activeImage, setActiveImage] = useState<string | null>(null);

//   if (!groups || groups.length === 0) {
//     return (
//       <section className="min-h-screen bg-zenithDeep flex items-center justify-center">
//         <p className="text-white/70">No photo albums available yet.</p>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-screen bg-zenithDeep py-24 px-6">
//       <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
//         {groups.map((album) => {
//           const cover =
//             album.images.find(
//               (img) => img.id === album.coverPublicId
//             ) || album.images[0];

//           return (
//             <div
//               key={album.groupId}
//               className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
//             >
//               <div
//                 className="relative h-56 cursor-pointer"
//                 onClick={() => cover && setActiveImage(cover.url)}
//               >
//                 {cover && (
//                   <Image
//                     src={cover.url}
//                     alt={album.title}
//                     fill
//                     className="object-cover"
//                   />
//                 )}
//               </div>

//               <div className="p-6">
//                 <h3 className="text-xl font-semibold">
//                   {decodeURIComponent(album.title)}
//                 </h3>

//                 <p className="text-white/60 text-sm">
//                   {album.eventDate}
//                 </p>

//                 <p className="text-white/70 text-sm mt-2">
//                   {decodeURIComponent(album.description || "")}
//                 </p>

//                 <Link
//                   href={`/gallery/album/${album.groupId}`}
//                   className="inline-block mt-4 px-4 py-2 bg-zenithGold text-black rounded-md font-medium"
//                 >
//                   View Full Album →
//                 </Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {activeImage && (
//         <ImageLightbox
//           src={activeImage}
//           onClose={() => setActiveImage(null)}
//         />
//       )}
//     </section>
//   );
// }

// export default memo(GalleryClient);


"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

type ImageItem = {
  id: string;
  url: string;
};

type Album = {
  groupId: string;
  title: string;
  description?: string;
  eventDate?: string;
  coverPublicId?: string;
  images: ImageItem[];
};

function safeDecode(value?: string) {
  if (!value) return "";

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function formatEventDate(value?: string) {
  if (!value) return "";

  // Preserve date-only strings without timezone conversion.
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/;

  if (dateOnly.test(value)) {
    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString(
      "en-NG",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function GalleryClient({ groups }: { groups: Album[] }) {
  const albums = groups ?? [];

  return (
    <section className="relative min-h-screen overflow-hidden bg-zenithDeep px-5 pb-24 pt-28 text-white sm:px-6">
      {/* Background decorations */}

      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 top-[450px] h-[500px] w-[500px] rounded-full bg-zenithGold/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Back navigation */}

        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-zenithGold"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Back to Home
        </Link>

        {/* Heading */}

        <div className="mb-12 mt-10 max-w-3xl">
          <div className="mb-5 inline-flex items-center rounded-full border border-zenithGold/20 bg-zenithGold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-zenithGold">
            Moments of Grace
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our Church{" "}
            <span className="text-zenithGold">Gallery</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-white/60">
            Explore beautiful moments from our worship services,
            celebrations, outreach programmes and special events
            at RCCG Jesus Zenith.
          </p>
        </div>

        {/* Empty state */}

        {albums.length === 0 ? (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-[28px] border border-dashed border-white/15 bg-white/[0.03] px-6 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-zenithGold/20 bg-zenithGold/10 text-3xl">
              📷
            </div>

            <h2 className="text-xl font-semibold text-white">
              No Photo Albums Yet
            </h2>

            <p className="mt-3 max-w-md text-sm leading-7 text-white/50">
              Our gallery is being updated. Please check back
              soon for memorable moments from our church
              activities.
            </p>

            <Link
              href="/"
              className="mt-7 rounded-xl bg-zenithGold px-6 py-3 text-sm font-bold text-black transition hover:brightness-110"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <>
            {/* Album count */}

            <div className="mb-7 flex items-center justify-between gap-4">
              <p className="text-sm text-white/50">
                Showing{" "}
                <span className="font-semibold text-white">
                  {albums.length}
                </span>{" "}
                {albums.length === 1 ? "album" : "albums"}
              </p>

              <span className="hidden text-xs uppercase tracking-[0.18em] text-white/35 sm:block">
                RCCG Jesus Zenith
              </span>
            </div>

            {/* Album grid */}

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => {
                const cover =
                  album.images.find(
                    (image) =>
                      image.id === album.coverPublicId
                  ) ?? album.images[0];

                const albumUrl = `/gallery/album/${encodeURIComponent(
                  album.groupId
                )}`;

                return (
                  <article
                    key={album.groupId}
                    className="group overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.045] shadow-[0_15px_50px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-zenithGold/35 hover:bg-white/[0.07]"
                  >
                    {/* Cover */}

                    <Link
                      href={albumUrl}
                      aria-label={`View album ${safeDecode(
                        album.title
                      )}`}
                      className="relative block h-64 overflow-hidden bg-black/30"
                    >
                      {cover ? (
                        <Image
                          src={cover.url}
                          alt={safeDecode(album.title)}
                          fill
                          unoptimized
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-950 to-black/70">
                          <span className="text-5xl opacity-40">
                            📷
                          </span>
                        </div>
                      )}

                      {/* Gradient */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* Photo count */}

                      <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                        {album.images.length}{" "}
                        {album.images.length === 1
                          ? "Photo"
                          : "Photos"}
                      </div>

                      {/* Open indicator */}

                      <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/15 text-lg text-white backdrop-blur-md transition group-hover:border-zenithGold group-hover:bg-zenithGold group-hover:text-black">
                        ↗
                      </div>
                    </Link>

                    {/* Album information */}

                    <div className="p-6">
                      {album.eventDate && (
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-zenithGold">
                          {formatEventDate(album.eventDate)}
                        </p>
                      )}

                      <h2 className="line-clamp-2 text-xl font-bold leading-snug text-white">
                        {safeDecode(album.title)}
                      </h2>

                      {album.description && (
                        <p className="mt-3 line-clamp-3 min-h-[48px] text-sm leading-6 text-white/55">
                          {safeDecode(album.description)}
                        </p>
                      )}

                      <div className="mt-6 border-t border-white/10 pt-5">
                        <Link
                          href={albumUrl}
                          className="inline-flex items-center gap-2 text-sm font-bold text-zenithGold transition hover:gap-3"
                        >
                          View Full Album
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        {/* Bottom navigation */}

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-white/40">
            Every picture tells a story of God&apos;s faithfulness.
          </p>
        </div>
      </div>
    </section>
  );
}

export default memo(GalleryClient);