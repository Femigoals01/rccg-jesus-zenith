


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

//     if (!title || !eventDate) {
//       return NextResponse.json(
//         { error: "Title and event date are required" },
//         { status: 400 }
//       );
//     }

//     const groupId = randomUUID();
//     const uploadedAt = new Date().toISOString();

//     // 🔥 CLOUDINARY REQUIRES CONTEXT AS STRING
//     const contextString =
//       `groupId=${groupId}` +
//       `|title=${encodeURIComponent(title)}` +
//       `|description=${encodeURIComponent(description)}` +
//       `|eventDate=${eventDate}` +
//       `|uploadedAt=${uploadedAt}`;

//     for (const file of files) {
//       if (!(file instanceof File)) continue;

//       const buffer = Buffer.from(await file.arrayBuffer());

//       await new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream(
//   {
//     folder: "rccg-jesus-zenith/gallery",

//     // ✅ TAG USED FOR SEARCH
//     tags: [`album_${groupId}`],

//     // ✅ CONTEXT USED FOR METADATA
//     context:
//       `groupId=${groupId}` +
//       `|title=${encodeURIComponent(title)}` +
//       `|description=${encodeURIComponent(description)}` +
//       `|eventDate=${eventDate}` +
//       `|uploadedAt=${uploadedAt}`,
//   },
//   (error) => {
//     if (error) reject(error);
//     else resolve(true);
//   }
// )

//           .end(buffer);
//       });
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("UPLOAD ERROR:", error);
//     return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//   }
// }




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
//     const key = formData.get("key")?.toString();

//     // 🔐 Admin protection
//     if (!key || key !== process.env.ADMIN_UPLOAD_KEY) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     if (!title || !eventDate || files.length === 0) {
//       return NextResponse.json(
//         { error: "Title, event date, and images are required" },
//         { status: 400 }
//       );
//     }

//     // ✅ GUARANTEED UNIQUE PER ALBUM
//     const groupId = randomUUID();
//     const uploadedAt = new Date().toISOString();

//     // 🔥 Cloudinary context MUST be a STRING
//     const contextString =
//       `groupId=${groupId}` +
//       `|title=${encodeURIComponent(title)}` +
//       `|description=${encodeURIComponent(description)}` +
//       `|eventDate=${eventDate}` +
//       `|uploadedAt=${uploadedAt}`;

//     // ⬆️ Upload each image
//     // for (const file of files) {
//     //   if (!(file instanceof File)) continue;

//     //   const buffer = Buffer.from(await file.arrayBuffer());

//     //   await new Promise<void>((resolve, reject) => {
//     //     cloudinary.uploader.upload_stream(
//     //       {
//     //         folder: "rccg-jesus-zenith/gallery",

//     //         // ✅ TAG = reliable search
//     //         tags: [`album_${groupId}`],

//     //         // ✅ CONTEXT = metadata
//     //         context: contextString,
//     //       },
//     //       (error) => {
//     //         if (error) reject(error);
//     //         else resolve();
//     //       }
//     //     ).end(buffer);
//     //   });
//     // }

//     await Promise.all(
//   files.map(async (file) => {
//     if (!(file instanceof File)) return;
//     const buffer = Buffer.from(await file.arrayBuffer());

//     return new Promise<void>((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         {
//           folder: "rccg-jesus-zenith/gallery",
//           tags: [`album_${groupId}`],
//           context: contextString,
//         },
//         (error) => {
//           if (error) reject(error);
//           else resolve();
//         }
//       ).end(buffer);
//     });
//   })
// );


//     return NextResponse.json({
//       success: true,
//       groupId,
//     });
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
import { randomUUID } from "crypto";

export const runtime = "nodejs";

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
    const uploadedAt = new Date().toISOString();

    for (const file of files) {
      if (!(file instanceof File)) continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      await cloudinary.uploader.upload(base64, {
        folder: "rccg-jesus-zenith/gallery",
        tags: [`album_${groupId}`],
        context:
          `groupId=${groupId}` +
          `|title=${encodeURIComponent(title)}` +
          `|description=${encodeURIComponent(description)}` +
          `|eventDate=${eventDate}` +
          `|uploadedAt=${uploadedAt}`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
