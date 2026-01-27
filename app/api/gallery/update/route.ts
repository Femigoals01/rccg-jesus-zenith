import cloudinary from "../../../../lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { groupId, title, description, eventDate } = await req.json();

  const { resources } = await cloudinary.search
    .expression(`folder:rccg-jesus-zenith/gallery`)
    .with_field("context")
    .execute();

  for (const img of resources) {
    if (!img.context?.includes(`groupId=${groupId}`)) continue;

    await cloudinary.uploader.explicit(img.public_id, {
      type: "upload",
      context:
        `groupId=${groupId}` +
        `|title=${encodeURIComponent(title)}` +
        `|description=${encodeURIComponent(description)}` +
        `|eventDate=${eventDate}`,
    });
  }

  return NextResponse.json({
    groupId,
    title,
    description,
    eventDate,
  });
}
