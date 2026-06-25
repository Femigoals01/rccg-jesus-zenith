




// import { NextResponse } from "next/server";
// import { supabase } from "../../../../lib/supabase";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// export async function GET() {
//   const { data, error } = await supabase
//     .from("gallery_albums")
//     .select("*")
//     .order("event_date", { ascending: false });

//   if (error) {
//     console.error("ADMIN GALLERY ERROR:", error);
//     return NextResponse.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }

//   const albums = (data || []).map((album) => ({
//     groupId: album.group_id,
//     title: album.title,
//     description: album.description || "",
//     eventDate: album.event_date,
//     images: album.images || [],
//   }));

//   return NextResponse.json(albums, {
//     headers: { "Cache-Control": "no-store" },
//   });
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const albums = (data || []).map((album) => ({
    groupId: album.group_id,
    title: album.title,
    description: album.description || "",
    eventDate: album.event_date,
    images: album.images || [],
    coverPublicId: album.cover_public_id,
    featured: album.featured || false,
  }));

  return NextResponse.json(albums, {
    headers: { "Cache-Control": "no-store" },
  });
}