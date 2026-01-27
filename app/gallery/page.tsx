


import cloudinary from "../../lib/cloudinary";
import GalleryClient from "./GalleryClient";

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

export default async function GalleryPage() {
  // 🔥 ONLY FETCH ALBUM-BASED IMAGES
  const { resources } = await cloudinary.search
    .expression("folder:rccg-jesus-zenith/gallery")
    .with_field("context")
    .sort_by("created_at", "desc")
    .max_results(120)
    .execute();

  const groups: Record<string, any> = {};

  resources.forEach((img: any) => {
    const meta = parseContext(img.context);
    if (!meta?.groupId) return;

    if (!groups[meta.groupId]) {
      groups[meta.groupId] = {
        groupId: meta.groupId,
        // title: meta.title,
        // description: meta.description,
        title: decodeURIComponent(meta.title || ""),
        description: decodeURIComponent(meta.description || ""),
         coverPublicId: meta.coverPublicId, // ✅ ADD THIS

        eventDate: meta.eventDate,
        images: [],
      };
    }

    groups[meta.groupId].images.push({
      id: img.public_id,
      url: img.secure_url,
    });
  });

  return <GalleryClient groups={Object.values(groups)} />;
}
