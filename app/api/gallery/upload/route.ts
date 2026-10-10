


// import { NextResponse } from "next/server";
// import cloudinary from "../../../../lib/cloudinary";
// import { supabase } from "../../../../lib/supabase";
// import { randomUUID } from "crypto";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     const files = formData.getAll("files");
//     const title = formData.get("title")?.toString();
//     const description = formData.get("description")?.toString() || "";
//     const eventDate = formData.get("eventDate")?.toString();
//     const key = formData.get("key");
//     const existingGroupId = formData.get("groupId")?.toString();

//     if (key !== process.env.ADMIN_UPLOAD_KEY) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     if (!files.length || !title || !eventDate) {
//       return NextResponse.json(
//         { error: "Title, date, and images are required" },
//         { status: 400 }
//       );
//     }

//     const groupId = existingGroupId || randomUUID();
//     const uploadedImages: any[] = [];

//     for (const file of files) {
//       if (!(file instanceof File)) continue;

//       const buffer = Buffer.from(await file.arrayBuffer());
//       const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

//       const uploaded = await cloudinary.uploader.upload(base64, {
//         folder: "rccg-jesus-zenith/gallery",
//         tags: [`album_${groupId}`],
//       });

//       uploadedImages.push({
//         id: uploaded.public_id,
//         url: uploaded.secure_url,
//       });
//     }

//     if (existingGroupId) {
//       const { data: album, error: fetchError } = await supabase
//         .from("gallery_albums")
//         .select("*")
//         .eq("group_id", existingGroupId)
//         .single();

//       if (fetchError || !album) {
//         return NextResponse.json({ error: "Album not found" }, { status: 404 });
//       }

//       const currentImages = album.images || [];
//       const newImages = [...currentImages, ...uploadedImages];

//       const { error } = await supabase
//         .from("gallery_albums")
//         .update({
//           images: newImages,
//           cover_public_id: album.cover_public_id || newImages[0]?.id || null,
//         })
//         .eq("group_id", existingGroupId);

//       if (error) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//       }

//       return NextResponse.json({ success: true, groupId: existingGroupId });
//     }

//     const { error } = await supabase.from("gallery_albums").insert({
//       group_id: groupId,
//       title,
//       description,
//       event_date: eventDate,
//       images: uploadedImages,
//       featured: false,
//       cover_public_id: uploadedImages[0]?.id || null,
//     });

//     if (error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }

//     return NextResponse.json({ success: true, groupId });
//   } catch (error) {
//     console.error("UPLOAD ERROR:", error);
//     return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//   }
// }




import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";
import { supabase } from "../../../../lib/supabase";
import { randomUUID } from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILES_PER_REQUEST = 1;
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files");
    const title = formData.get("title")?.toString().trim();
    const description =
      formData.get("description")?.toString() || "";
    const eventDate = formData.get("eventDate")?.toString();
    const key = formData.get("key");
    const existingGroupId =
      formData.get("groupId")?.toString();

    if (
      !process.env.ADMIN_UPLOAD_KEY ||
      key !== process.env.ADMIN_UPLOAD_KEY
    ) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!title || !eventDate || files.length === 0) {
      return NextResponse.json(
        {
          error: "Title, event date and photograph are required.",
        },
        { status: 400 }
      );
    }

    if (files.length > MAX_FILES_PER_REQUEST) {
      return NextResponse.json(
        {
          error: "Only one photograph is allowed per request.",
        },
        { status: 400 }
      );
    }

    const file = files[0];

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Invalid photograph." },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Only JPG, PNG and WebP photographs are supported.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `${file.name} exceeds the 3 MB upload limit.`,
        },
        { status: 400 }
      );
    }

    const groupId = existingGroupId || randomUUID();

    // Confirm the album exists before uploading into it.
    if (existingGroupId) {
      const { data: existingAlbum, error } = await supabase
        .from("gallery_albums")
        .select("group_id")
        .eq("group_id", existingGroupId)
        .maybeSingle();

      if (error || !existingAlbum) {
        return NextResponse.json(
          { error: "Album not found." },
          { status: 404 }
        );
      }
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const base64 =
      `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploaded = await cloudinary.uploader.upload(base64, {
      folder: "rccg-jesus-zenith/gallery",
      tags: [`album_${groupId}`],
      resource_type: "image",
    });

    const image = {
      id: uploaded.public_id,
      url: uploaded.secure_url,
    };

    let databaseError: string | null = null;

    if (existingGroupId) {
      const { data: album, error: fetchError } = await supabase
        .from("gallery_albums")
        .select("images, cover_public_id")
        .eq("group_id", groupId)
        .single();

      if (fetchError || !album) {
        databaseError =
          fetchError?.message || "Album not found.";
      } else {
        const currentImages = Array.isArray(album.images)
          ? album.images
          : [];

        const newImages = [...currentImages, image];

        const { error } = await supabase
          .from("gallery_albums")
          .update({
            images: newImages,
            cover_public_id:
              album.cover_public_id || newImages[0]?.id || null,
          })
          .eq("group_id", groupId);

        if (error) {
          databaseError = error.message;
        }
      }
    } else {
      const { error } = await supabase
        .from("gallery_albums")
        .insert({
          group_id: groupId,
          title,
          description,
          event_date: eventDate,
          images: [image],
          featured: false,
          cover_public_id: image.id,
        });

      if (error) {
        databaseError = error.message;
      }
    }

    if (databaseError) {
      // Avoid leaving an unreferenced Cloudinary image.
      try {
        await cloudinary.uploader.destroy(uploaded.public_id);
      } catch (cleanupError) {
        console.error(
          "CLOUDINARY CLEANUP ERROR:",
          cleanupError
        );
      }

      return NextResponse.json(
        { error: databaseError },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      groupId,
      uploaded: 1,
    });
  } catch (error) {
    console.error("GALLERY UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        error:
          "Photograph upload failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
