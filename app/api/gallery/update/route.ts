




// import cloudinary from "../../../../lib/cloudinary";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { groupId, title, description, eventDate } = await req.json();

//   const { resources } = await cloudinary.search
//     .expression(`folder:rccg-jesus-zenith/gallery`)
//     .with_field("context")
//     .execute();

//   for (const img of resources) {
//     if (!img.context?.includes(`groupId=${groupId}`)) continue;

//     await cloudinary.uploader.explicit(img.public_id, {
//       type: "upload",
//       context:
//         `groupId=${groupId}` +
//         `|title=${encodeURIComponent(title)}` +
//         `|description=${encodeURIComponent(description)}` +
//         `|eventDate=${eventDate}`,
//     });
//   }

//   return NextResponse.json({
//     groupId,
//     title,
//     description,
//     eventDate,
//   });
// }


import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { groupId, title, description, eventDate } = await req.json();

  if (!groupId || !title || !eventDate) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("gallery_albums")
    .update({
      title,
      description: description || "",
      event_date: eventDate,
    })
    .eq("group_id", groupId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    groupId: data.group_id,
    title: data.title,
    description: data.description || "",
    eventDate: data.event_date,
    images: data.images || [],
  });
}