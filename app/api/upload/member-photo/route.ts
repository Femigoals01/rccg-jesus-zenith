import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "rccg-jesus-zenith/members",
        transformation: [{ width: 400, height: 400, crop: "fill" }],
      },
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    ).end(buffer);
  });

  return NextResponse.json({
    url: result.secure_url,
    publicId: result.public_id,
  });
}
