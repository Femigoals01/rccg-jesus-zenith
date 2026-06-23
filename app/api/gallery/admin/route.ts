




// export async function GET() {
//   try {
//     const { resources } = await cloudinary.search
//       .expression("folder:rccg-jesus-zenith/gallery")
//       .with_field("context")
//       .sort_by("created_at", "desc")
//       .max_results(120)
//       .execute();

//     const albums: Record<string, any> = {};

//     resources.forEach((img: any) => {
//       const meta = parseContext(img.context);
//       if (!meta?.groupId) return;

//       if (!albums[meta.groupId]) {
//         albums[meta.groupId] = {
//           groupId: meta.groupId,
//           title: meta.title || "",
//           description: meta.description || "",
//           eventDate: meta.eventDate || "",
//           images: [],
//         };
//       }

//       albums[meta.groupId].images.push({
//         id: img.public_id,
//         url: img.secure_url,
//       });
//     });

//     return NextResponse.json(Object.values(albums));
//   } catch (error) {
//     console.error("ADMIN GALLERY ERROR:", error);
//     return NextResponse.json(
//       { error: "Failed to load albums" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabase
    .from("gallery_albums")
    .select("*")
    .order("event_date", { ascending: false });

  if (error) {
    console.error("ADMIN GALLERY ERROR:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const albums = (data || []).map((album) => ({
    groupId: album.group_id,
    title: album.title,
    description: album.description || "",
    eventDate: album.event_date,
    images: album.images || [],
  }));

  return NextResponse.json(albums, {
    headers: { "Cache-Control": "no-store" },
  });
}