

// import cloudinary from "../../../../lib/cloudinary";
// import { NextResponse } from "next/server";

// function parseContext(context: any) {
//   if (!context) return null;

//   if (typeof context === "object") {
//     return context.custom || context;
//   }

//   if (typeof context === "string") {
//     return context.split("|").reduce((acc: any, pair: string) => {
//       const [key, value] = pair.split("=");
//       if (key && value) acc[key] = decodeURIComponent(value);
//       return acc;
//     }, {});
//   }

//   return null;
// }

// export async function GET() {
//   const { resources } = await cloudinary.search
//     .expression("folder:rccg-jesus-zenith/gallery")
//     .with_field("context")
//     .sort_by("created_at", "desc")
//     .max_results(300)
//     .execute();

//   const albums: Record<string, any> = {};

//   resources.forEach((img: any) => {
//     const meta = parseContext(img.context);
//     if (!meta?.groupId) return;

//     if (!albums[meta.groupId]) {
//       albums[meta.groupId] = {
//         groupId: meta.groupId,
//         title: meta.title,
//         description: meta.description,
//         eventDate: meta.eventDate,
//         featured: meta.featured === "true",
//         count: 0,
//       };
//     }

//     albums[meta.groupId].count += 1;
//   });

//   return NextResponse.json(Object.values(albums));
// }



import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

function parseContext(context: any) {
  if (!context) return null;

  if (typeof context === "object") {
    return context.custom || context;
  }

  if (typeof context === "string") {
    return context.split("|").reduce((acc: any, pair: string) => {
      const [key, value] = pair.split("=");
      if (key && value) acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
  }

  return null;
}

// export async function GET() {
//   try {
//     // 🔒 ONLY ALBUM-BASED IMAGES
//     const { resources } = await cloudinary.search
//       .expression("folder:rccg-jesus-zenith/gallery")
//       .with_field("context")
//       .sort_by("created_at", "desc")
//       .max_results(300)
//       .execute();

//     const albums: Record<string, any> = {};

//     resources.forEach((img: any) => {
//       const meta = parseContext(img.context);
//       if (!meta?.groupId) return;

//       if (!albums[meta.groupId]) {
//         albums[meta.groupId] = {
//           groupId: meta.groupId,
//           title: meta.title || "",
//           description: meta.description || "",
//           eventDate: meta.eventDate || "",
//           images: [],
//         };
//       }

//       albums[meta.groupId].images.push({
//         id: img.public_id,
//         url: img.secure_url,
//       });
//     });

//     return NextResponse.json(Object.values(albums));
//   } catch (error) {
//     console.error("ADMIN GALLERY ERROR:", error);
//     return NextResponse.json(
//       { error: "Failed to load albums" },
//       { status: 500 }
//     );
//   }
// }


export async function GET() {
  try {
    const { resources } = await cloudinary.search
      .expression("folder:rccg-jesus-zenith/gallery")
      .with_field("context")
      .sort_by("created_at", "desc")
      .max_results(120)
      .execute();

    const albums: Record<string, any> = {};

    resources.forEach((img: any) => {
      const meta = parseContext(img.context);
      if (!meta?.groupId) return;

      if (!albums[meta.groupId]) {
        albums[meta.groupId] = {
          groupId: meta.groupId,
          title: meta.title || "",
          description: meta.description || "",
          eventDate: meta.eventDate || "",
          images: [],
        };
      }

      albums[meta.groupId].images.push({
        id: img.public_id,
        url: img.secure_url,
      });
    });

    return NextResponse.json(Object.values(albums));
  } catch (error) {
    console.error("ADMIN GALLERY ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load albums" },
      { status: 500 }
    );
  }
}
