




// import cloudinary from "../../../../lib/cloudinary";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { groupId, featured } = await req.json();

//   const { resources } = await cloudinary.search
//     .expression("folder:rccg-jesus-zenith/gallery")
//     .with_field("context")
//     .max_results(300)
//     .execute();

//   for (const img of resources) {
//     if (!img.context?.includes(`groupId=${groupId}`)) continue;

//     // preserve existing context but update featured
//     const ctx = img.context
//       .split("|")
//       .filter((x: string) => !x.startsWith("featured="))
//       .join("|");

//     const newContext = `${ctx}|featured=${featured}`;

//     await cloudinary.uploader.explicit(img.public_id, {
//       type: "upload",
//       context: newContext,
//     });
//   }

//   return NextResponse.json({ success: true });
// }


import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { groupId, featured } = await req.json();

  const { error } = await supabase
    .from("gallery_albums")
    .update({ featured: Boolean(featured) })
    .eq("group_id", groupId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}