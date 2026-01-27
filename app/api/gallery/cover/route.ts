

// import { NextResponse } from "next/server";
// import cloudinary from "../../../../lib/cloudinary";

// export async function POST(req: Request) {
//   const { publicId } = await req.json();

//   if (!publicId) {
//     return NextResponse.json({ error: "Invalid request" }, { status: 400 });
//   }

//   await cloudinary.uploader.explicit(publicId, {
//     type: "upload",
//     context: {
//       cover: "true",
//     },
//   });

//   return NextResponse.json({ success: true });
// }



import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

export async function POST(req: Request) {
  const { groupId, publicId } = await req.json();

  if (!groupId || !publicId) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // 1️⃣ Find ONE image in this album to store album metadata
  const { resources } = await cloudinary.search
    .expression(`tags=album_${groupId}`)
    .max_results(1)
    .execute();

  if (!resources.length) {
    return NextResponse.json({ error: "Album not found" }, { status: 404 });
  }

  // 2️⃣ Update album metadata on the FIRST image only
  await cloudinary.uploader.explicit(resources[0].public_id, {
    type: "upload",
    context: {
      coverPublicId: publicId,
    },
  });

  return NextResponse.json({ success: true });
}
