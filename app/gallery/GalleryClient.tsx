


// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import ImageLightbox from "../../components/ImageLightbox";

// type Album = {
//   groupId: string;
//   title: string;
//   description?: string;
//   eventDate?: string;
//   images: { url: string }[];
// };

// export default function GalleryClient({ groups }: { groups: Album[] }) {
//   const [activeImage, setActiveImage] = useState<string | null>(null);

//   // ✅ Empty state protection
//   if (!groups || groups.length === 0) {
//     return (
//       <section className="min-h-screen bg-zenithDeep flex items-center justify-center px-6">
//         <p className="text-white/70 text-lg">
//           No photo albums available yet.
//         </p>
//       </section>
//     );
//   }

//   function formatDate(date?: string) {
//     if (!date) return "";
//     try {
//       return new Date(date).toLocaleDateString("en-NG", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       });
//     } catch {
//       return date;
//     }
//   }

//   return (
//     <section className="min-h-screen bg-zenithDeep py-24 px-6">
//       <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

//         {groups.map((album) => {
//         //   const cover = album.images?.[0]?.url;
//         const coverImage =
//             album.images.find(
//                 (img: any) => img.id === album.coverPublicId
//             ) || album.images[0];


//           return (
//             <div
//               key={album.groupId}
//               className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-zenithGold transition"
//             >
//               {/* Album Cover */}
//               <div
//                 className="relative h-56 cursor-pointer group"
//                 onClick={() => coverImage && setActiveImage(coverImage)}
//               >
//                 {coverImage ? (
//                   <Image
//                     src={coverImage.url}
//                     alt={decodeURIComponent(album.title)}
//                     fill
//                     className="object-cover group-hover:scale-105 transition duration-500"
//                   />
//                 ) : (
//                   <div className="flex items-center justify-center h-full text-white/40">
//                     No Image
//                   </div>
//                 )}

//                 <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
//               </div>

//               {/* Album Info */}
//               <div className="p-6">
//                 <h3 className="text-xl font-semibold mb-1">
//                   {decodeURIComponent(album.title)}
//                 </h3>

//                 {album.eventDate && (
//                   <p className="text-white/60 text-sm mb-2">
//                     {formatDate(album.eventDate)}
//                   </p>
//                 )}

//                 {album.description && (
//                   <p className="text-white/70 text-sm mb-4">
//                     {decodeURIComponent(album.description)}
//                   </p>
//                 )}

//                 <Link
//                   href={`/gallery/album/${album.groupId}`}
//                   className="inline-block mt-2 px-4 py-2 bg-zenithGold text-black rounded-md font-medium hover:opacity-90 transition"
//                 >
//                   View Full Album →
//                 </Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Image Lightbox */}
//       {activeImage && (
//         <ImageLightbox
//           src={coverImage.url}
//           onClose={() => setActiveImage(null)}
//         />
//       )}
//     </section>
//   );
// }


"use client";

import { useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageLightbox from "../../components/ImageLightbox";

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

function GalleryClient({ groups }: { groups: Album[] }) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!groups || groups.length === 0) {
    return (
      <section className="min-h-screen bg-zenithDeep flex items-center justify-center">
        <p className="text-white/70">No photo albums available yet.</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-zenithDeep py-24 px-6">
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((album) => {
          const cover =
            album.images.find(
              (img) => img.id === album.coverPublicId
            ) || album.images[0];

          return (
            <div
              key={album.groupId}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div
                className="relative h-56 cursor-pointer"
                onClick={() => cover && setActiveImage(cover.url)}
              >
                {cover && (
                  <Image
                    src={cover.url}
                    alt={album.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">
                  {decodeURIComponent(album.title)}
                </h3>

                <p className="text-white/60 text-sm">
                  {album.eventDate}
                </p>

                <p className="text-white/70 text-sm mt-2">
                  {decodeURIComponent(album.description || "")}
                </p>

                <Link
                  href={`/gallery/album/${album.groupId}`}
                  className="inline-block mt-4 px-4 py-2 bg-zenithGold text-black rounded-md font-medium"
                >
                  View Full Album →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {activeImage && (
        <ImageLightbox
          src={activeImage}
          onClose={() => setActiveImage(null)}
        />
      )}
    </section>
  );
}

export default memo(GalleryClient);
