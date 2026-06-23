






// import { NextResponse } from "next/server";
// import cloudinary from "../../../../lib/cloudinary";
// import { randomUUID } from "crypto";

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     const files = formData.getAll("files");
//     const title = formData.get("title")?.toString();
//     const description = formData.get("description")?.toString() || "";
//     const eventDate = formData.get("eventDate")?.toString();
//     const key = formData.get("key");

//     if (key !== process.env.ADMIN_UPLOAD_KEY) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     if (!files.length || !title || !eventDate) {
//       return NextResponse.json(
//         { error: "Title, date, and images are required" },
//         { status: 400 }
//       );
//     }

//     const groupId = randomUUID();
//     const uploadedAt = new Date().toISOString();

//     for (const file of files) {
//       if (!(file instanceof File)) continue;

//       const buffer = Buffer.from(await file.arrayBuffer());
//       const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

//       await cloudinary.uploader.upload(base64, {
//         folder: "rccg-jesus-zenith/gallery",
//         tags: [`album_${groupId}`],
//         context:
//           `groupId=${groupId}` +
//           `|title=${encodeURIComponent(title)}` +
//           `|description=${encodeURIComponent(description)}` +
//           `|eventDate=${eventDate}` +
//           `|uploadedAt=${uploadedAt}`,
//       });
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("UPLOAD ERROR:", error);
//     return NextResponse.json(
//       { error: "Upload failed" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";
import { supabase } from "../../../../lib/supabase";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files");
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString() || "";
    const eventDate = formData.get("eventDate")?.toString();
    const key = formData.get("key");

    if (key !== process.env.ADMIN_UPLOAD_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!files.length || !title || !eventDate) {
      return NextResponse.json(
        { error: "Title, date, and images are required" },
        { status: 400 }
      );
    }

    const groupId = randomUUID();
    const uploadedImages: any[] = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploaded = await cloudinary.uploader.upload(base64, {
        folder: "rccg-jesus-zenith/gallery",
        tags: [`album_${groupId}`],
      });

      uploadedImages.push({
        id: uploaded.public_id,
        url: uploaded.secure_url,
      });
    }

    const { error } = await supabase.from("gallery_albums").insert({
      group_id: groupId,
      title,
      description,
      event_date: eventDate,
      images: uploadedImages,
      featured: false,
      cover_public_id: uploadedImages[0]?.id || null,
    });

    if (error) {
      console.error("SUPABASE GALLERY INSERT ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, groupId });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}