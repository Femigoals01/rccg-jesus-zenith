

import cloudinary from "../../../../lib/cloudinary";
import AlbumClient from "./AlbumClient";

/* ------------------ Helpers ------------------ */
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

export default async function AlbumPage(props: {
  params: Promise<{ groupId: string }>;
}) {
  // ✅ Next.js 16: params are async
  const { groupId } = await props.params;

  const { resources } = await cloudinary.search
    .expression(
      `folder:rccg-jesus-zenith/gallery AND tags:album_${groupId}`
    )
    .with_field("context")
    .sort_by("created_at", "asc")
    .max_results(200)
    .execute();

  if (!resources || resources.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zenithDeep text-white">
        Album not found.
      </div>
    );
  }

  const meta = parseContext(resources[0].context);

  return (
    <AlbumClient
      title={meta?.title || ""}
      description={meta?.description || ""}
      eventDate={meta?.eventDate || ""}
      images={resources.map((img: any) => ({
        id: img.public_id,
        url: img.secure_url,
      }))}
    />
  );
}
