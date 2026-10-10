


// import GalleryClient from "./GalleryClient";
// import { createClient } from "@supabase/supabase-js";

// export const dynamic = "force-dynamic";
// export const revalidate = 0;

// type GalleryImage = {
//   id: string;
//   url: string;
// };

// type GalleryAlbum = {
//   groupId: string;
//   title: string;
//   description: string;
//   eventDate: string;
//   coverPublicId?: string;
//   images: GalleryImage[];
// };

// export default async function GalleryPage() {
//   const supabaseUrl =
//     process.env.NEXT_PUBLIC_SUPABASE_URL;

//   const supabaseKey =
//     process.env.SUPABASE_SERVICE_ROLE_KEY;

//   if (!supabaseUrl || !supabaseKey) {
//     console.error(
//       "Gallery: Supabase environment variables are missing."
//     );

//     return <GalleryClient groups={[]} />;
//   }

//   const supabase = createClient(
//     supabaseUrl,
//     supabaseKey,
//     {
//       auth: {
//         persistSession: false,
//         autoRefreshToken: false,
//       },
//     }
//   );

//   const { data, error } = await supabase
//     .from("gallery_albums")
//     .select("*")
//     .order("created_at", {
//       ascending: false,
//     });

//   if (error) {
//     console.error(
//       "PUBLIC GALLERY FETCH ERROR:",
//       error.message
//     );

//     return <GalleryClient groups={[]} />;
//   }

//   const groups: GalleryAlbum[] = (data ?? []).map(
//     (album) => {
//       const images: GalleryImage[] = Array.isArray(
//         album.images
//       )
//         ? album.images
//             .filter(
//               (image: unknown) =>
//                 typeof image === "object" &&
//                 image !== null
//             )
//             .map(
//               (image: {
//                 id?: string;
//                 public_id?: string;
//                 url?: string;
//                 secure_url?: string;
//               }) => ({
//                 id:
//                   image.id ??
//                   image.public_id ??
//                   "",
//                 url:
//                   image.url ??
//                   image.secure_url ??
//                   "",
//               })
//             )
//             .filter(
//               (image: GalleryImage) =>
//                 Boolean(image.url)
//             )
//         : [];

//       return {
//         groupId:
//           album.group_id ??
//           String(album.id),

//         title:
//           album.title ??
//           "Untitled Album",

//         description:
//           album.description ?? "",

//         eventDate:
//           album.event_date ?? "",

//         coverPublicId:
//           album.cover_public_id ??
//           undefined,

//         images,
//       };
//     }
//   );

//   return <GalleryClient groups={groups} />;
// }




import GalleryClient from "./GalleryClient";
import { supabase } from "../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type GalleryImage = {
  id: string;
  url: string;
};

type GalleryAlbum = {
  groupId: string;
  title: string;
  description: string;
  eventDate: string;
  coverPublicId?: string;
  images: GalleryImage[];
};

type RawImage = {
  id?: string;
  public_id?: string;
  publicId?: string;
  url?: string;
  secure_url?: string;
  secureUrl?: string;
};

function normalizeImages(value: unknown): GalleryImage[] {
  let parsed = value;

  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .filter(
      (item): item is RawImage =>
        typeof item === "object" &&
        item !== null &&
        !Array.isArray(item)
    )
    .map((image) => ({
      id:
        image.id ??
        image.public_id ??
        image.publicId ??
        "",
      url:
        image.url ??
        image.secure_url ??
        image.secureUrl ??
        "",
    }))
    .filter((image) => Boolean(image.url));
}

export default async function GalleryPage() {
  const { data, error } = await supabase
    .from("gallery_albums")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("PUBLIC GALLERY FETCH ERROR:", error);

    return (
      <section className="flex min-h-screen items-center justify-center bg-zenithDeep px-6 text-center text-white">
        <div className="max-w-lg">
          <h1 className="text-2xl font-bold">
            Gallery Temporarily Unavailable
          </h1>

          <p className="mt-4 text-white/60">
            We could not load the photo albums at the moment.
            Please try again shortly.
          </p>
        </div>
      </section>
    );
  }

  const groups: GalleryAlbum[] = (data ?? []).map(
    (album) => ({
      groupId:
        album.group_id ??
        String(album.id),

      title:
        album.title ??
        "Untitled Album",

      description:
        album.description ?? "",

      eventDate:
        album.event_date ?? "",

      coverPublicId:
        album.cover_public_id ??
        undefined,

      images: normalizeImages(album.images),
    })
  );

  return <GalleryClient groups={groups} />;
}