import { notFound } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import AlbumClient from "./AlbumClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type GalleryImage = {
  id: string;
  url: string;
};

type RawImage = {
  id?: string;
  public_id?: string;
  publicId?: string;
  url?: string;
  secure_url?: string;
  secureUrl?: string;
};

function normalizeImages(value: unknown): GalleryImage[] {
  let parsed = value;

  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      return [];
    }
  }

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed
    .filter(
      (item): item is RawImage =>
        typeof item === "object" &&
        item !== null &&
        !Array.isArray(item)
    )
    .map((image) => ({
      id:
        image.id ??
        image.public_id ??
        image.publicId ??
        "",
      url:
        image.url ??
        image.secure_url ??
        image.secureUrl ??
        "",
    }))
    .filter((image) => Boolean(image.url));
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;

  const { data: album, error } = await supabase
    .from("gallery_albums")
    .select("*")
    .eq("group_id", groupId)
    .maybeSingle();

  if (error) {
    console.error("PUBLIC ALBUM FETCH ERROR:", error);

    return (
      <section className="flex min-h-screen items-center justify-center bg-zenithDeep px-6 text-center text-white">
        <div>
          <h1 className="text-2xl font-bold">
            Unable to Load Album
          </h1>

          <p className="mt-3 text-white/60">
            Something went wrong while loading this album.
            Please try again shortly.
          </p>

          <a
            href="/gallery"
            className="mt-6 inline-block rounded-xl bg-zenithGold px-5 py-3 font-semibold text-black"
          >
            Back to Gallery
          </a>
        </div>
      </section>
    );
  }

  if (!album) {
    notFound();
  }

  const images = normalizeImages(album.images);

  return (
    <AlbumClient
      groupId={album.group_id}
      title={album.title || "Untitled Album"}
      description={album.description || ""}
      eventDate={album.event_date || ""}
      images={images}
    />
  );
}