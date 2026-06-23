



// import cloudinary from "../../../../lib/cloudinary";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { groupId } = await req.json();

//   await cloudinary.api.delete_resources_by_prefix(
//     `rccg-jesus-zenith/gallery`,
//     { context: `groupId=${groupId}` }
//   );

//   return NextResponse.json({ success: true });
// }


import cloudinary from "../../../../lib/cloudinary";
import { supabase } from "../../../../lib/supabase";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { groupId } = await req.json();

    const { data: album, error: fetchError } = await supabase
      .from("gallery_albums")
      .select("images")
      .eq("group_id", groupId)
      .single();

    if (fetchError || !album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    const publicIds = (album.images || []).map((img: any) => img.id);

    if (publicIds.length > 0) {
      await cloudinary.api.delete_resources(publicIds);
    }

    const { error } = await supabase
      .from("gallery_albums")
      .delete()
      .eq("group_id", groupId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("GALLERY DELETE ERROR:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}