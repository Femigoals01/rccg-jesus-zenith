import cloudinary from "../../../../lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { groupId } = await req.json();

  await cloudinary.api.delete_resources_by_prefix(
    `rccg-jesus-zenith/gallery`,
    { context: `groupId=${groupId}` }
  );

  return NextResponse.json({ success: true });
}
