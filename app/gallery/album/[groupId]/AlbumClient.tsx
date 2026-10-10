
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  Images,
  Share2,
  X,
  Loader2,
} from "lucide-react";

import ShareBar from "../../ShareBar";

type GalleryImage = {
  id: string;
  url: string;
};

type AlbumClientProps = {
  groupId: string;
  title: string;
  description: string;
  eventDate: string;
  images: GalleryImage[];
};

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function formatDate(value: string) {
  if (!value) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString(
      "en-NG",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getImageExtension(mimeType: string) {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/gif") return "gif";
  if (mimeType === "image/avif") return "avif";

  return "jpg";
}

export default function AlbumClient({
  groupId,
  title,
  description,
  eventDate,
  images,
}: AlbumClientProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    null
  );

  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);

  const albumTitle = safeDecode(title);
  const albumDescription = safeDecode(description);

  const activeImage =
    activeIndex !== null ? images[activeIndex] : null;

  const albumPath =
    `/gallery/album/${encodeURIComponent(groupId)}`;

  const albumUrl =
    `https://www.rccgjesuszenith.com${albumPath}`;

  const shareText =
    `A beautiful moment from ${albumTitle} at RCCG Jesus Zenith.\n\n` +
    `View the complete photo album:\n${albumUrl}`;

  function nextImage() {
    setActiveIndex((current) => {
      if (current === null || images.length === 0) {
        return null;
      }

      return (current + 1) % images.length;
    });
  }

  function previousImage() {
    setActiveIndex((current) => {
      if (current === null || images.length === 0) {
        return null;
      }

      return (current - 1 + images.length) % images.length;
    });
  }

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight" && images.length > 0) {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft" && images.length > 0) {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current - 1 + images.length) % images.length
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length]);

  async function downloadImage(image: GalleryImage) {
    if (downloading) return;

    setDownloading(true);

    try {
      const response = await fetch(image.url);

      if (!response.ok) {
        throw new Error("Unable to download photograph.");
      }

      const blob = await response.blob();

      const extension = getImageExtension(blob.type);

      const objectUrl = URL.createObjectURL(blob);

      const safeTitle = albumTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const filename =
        `${safeTitle || "jesus-zenith"}-photo-` +
        `${Math.max(1, images.indexOf(image) + 1)}.${extension}`;

      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      link.remove();

      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 1000);
    } catch (error) {
      console.error("DOWNLOAD ERROR:", error);

      window.open(
        image.url,
        "_blank",
        "noopener,noreferrer"
      );
    } finally {
      setDownloading(false);
    }
  }

  async function shareImage(image: GalleryImage) {
    if (sharing) return;

    setSharing(true);

    try {
      /*
       * Download the actual image from Cloudinary.
       * File sharing requires browser support and
       * cross-origin access to the image.
       */
      const response = await fetch(image.url);

      if (!response.ok) {
        throw new Error("Unable to fetch photograph.");
      }

      const blob = await response.blob();

      if (!blob.type.startsWith("image/")) {
        throw new Error("The fetched file is not an image.");
      }

      const extension = getImageExtension(blob.type);

      const safeTitle = albumTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const filename =
        `${safeTitle || "jesus-zenith"}-photo-` +
        `${Math.max(1, images.indexOf(image) + 1)}.${extension}`;

      const file = new File(
        [blob],
        filename,
        { type: blob.type }
      );

      /*
       * Share the actual photograph together with
       * the album invitation, where supported.
       */
      if (
        navigator.share &&
        navigator.canShare?.({ files: [file] })
      ) {
        try {
          await navigator.share({
            title: `${albumTitle} | RCCG Jesus Zenith`,
            text: shareText,
            files: [file],
          });

          return;
        } catch (error) {
          if (
            error instanceof DOMException &&
            error.name === "AbortError"
          ) {
            return;
          }

          console.error("IMAGE SHARE ERROR:", error);
        }
      }

      /*
       * Fallback: share album invitation text.
       */
      if (navigator.share) {
        try {
          await navigator.share({
            title: `${albumTitle} | RCCG Jesus Zenith`,
            text: shareText,
          });

          return;
        } catch (error) {
          if (
            error instanceof DOMException &&
            error.name === "AbortError"
          ) {
            return;
          }
        }
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText);

        alert(
          "Album invitation copied! You can download the photograph and share it with the copied message."
        );

        return;
      }

      window.prompt(
        "Copy this album invitation:",
        shareText
      );
    } catch (error) {
      console.error("SHARE ERROR:", error);

      /*
       * Cloudinary may block browser fetch requests
       * because of cross-origin restrictions.
       */
      try {
        if (navigator.share) {
          await navigator.share({
            title: `${albumTitle} | RCCG Jesus Zenith`,
            text: shareText,
          });

          return;
        }

        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(shareText);

          alert("Album invitation copied.");
          return;
        }

        window.prompt(
          "Copy this album invitation:",
          shareText
        );
      } catch (fallbackError) {
        if (
          fallbackError instanceof DOMException &&
          fallbackError.name === "AbortError"
        ) {
          return;
        }

        window.prompt(
          "Copy this album link:",
          albumUrl
        );
      }
    } finally {
      setSharing(false);
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-zenithDeep px-5 pb-24 pt-28 text-white sm:px-6">
      {/* Background effects */}

      <div className="pointer-events-none absolute -left-32 top-20 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-32 top-96 h-[400px] w-[400px] rounded-full bg-zenithGold/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Back navigation */}

        <Link
          href="/gallery"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-zenithGold"
        >
          <ArrowLeft
            size={17}
            className="transition group-hover:-translate-x-1"
          />
          Back to Gallery
        </Link>

        {/* Album header */}

        <div className="mt-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-zenithGold/20 bg-zenithGold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-zenithGold">
            <Images size={15} />
            Jesus Zenith Photo Album
          </div>

          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            {albumTitle}
          </h1>

          {albumDescription && (
            <p className="mt-5 max-w-3xl text-base leading-8 text-white/60">
              {albumDescription}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {eventDate && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65">
                <CalendarDays
                  size={16}
                  className="text-zenithGold"
                />
                {formatDate(eventDate)}
              </div>
            )}

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/65">
              <Images
                size={16}
                className="text-zenithGold"
              />

              {images.length}{" "}
              {images.length === 1
                ? "Photograph"
                : "Photographs"}
            </div>
          </div>
        </div>

        {/* Album sharing */}

        <div className="mt-8">
          <ShareBar />
        </div>

        {/* Gallery heading */}

        <div className="mb-6 mt-12 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zenithGold">
              Moments Captured
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Explore Photographs
            </h2>
          </div>

          <p className="text-sm text-white/40">
            Click any photograph to view it.
          </p>
        </div>

        {/* Photo grid */}

        {images.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-6 py-20 text-center text-white/60">
            No photographs have been added to this album yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image, index) => (
              <button
                type="button"
                key={`${image.id}-${index}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View photograph ${index + 1}`}
                className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/30 text-left transition hover:border-zenithGold/40 sm:rounded-2xl"
              >
                <Image
                  src={image.url}
                  alt={`${albumTitle} - Photograph ${index + 1}`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />

                <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                  View Photo
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Bottom navigation */}

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zenithGold hover:underline"
          >
            <ArrowLeft size={16} />
            Explore More Albums
          </Link>
        </div>
      </div>

      {/* Full-screen lightbox */}

      {activeImage && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photograph viewer"
          className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-xl"
        >
          {/* Toolbar */}

          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {albumTitle}
              </p>

              <p className="mt-1 text-xs text-white/50">
                {activeIndex + 1} of {images.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Download */}

              <button
                type="button"
                onClick={() => downloadImage(activeImage)}
                disabled={downloading}
                aria-label="Download photograph"
                title="Download photograph"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {downloading ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Download size={18} />
                )}
              </button>

              {/* Share actual photograph */}

              <button
                type="button"
                onClick={() => shareImage(activeImage)}
                disabled={sharing}
                aria-label="Share photograph"
                title="Share photograph"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {sharing ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Share2 size={18} />
                )}
              </button>

              {/* Close */}

              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                aria-label="Close photograph viewer"
                title="Close"
                className="ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-red-500/70"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Large photograph */}

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 py-5 sm:px-20">
            <Image
              key={`${activeImage.id}-${activeIndex}`}
              src={activeImage.url}
              alt={`${albumTitle} - Photograph ${activeIndex + 1}`}
              fill
              unoptimized
              sizes="100vw"
              className="object-contain p-3 sm:p-6"
            />

            {images.length > 1 && (
              <>
                {/* Previous */}

                <button
                  type="button"
                  onClick={previousImage}
                  aria-label="Previous photograph"
                  className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:bg-zenithGold hover:text-black sm:left-6 sm:h-12 sm:w-12"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Next */}

                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next photograph"
                  className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white transition hover:bg-zenithGold hover:text-black sm:right-6 sm:h-12 sm:w-12"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Bottom controls */}

          <div className="flex items-center justify-center gap-5 border-t border-white/10 px-4 py-4">
            <button
              type="button"
              onClick={previousImage}
              disabled={images.length <= 1}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-zenithGold disabled:opacity-30"
            >
              <ArrowLeft size={16} />
              Previous
            </button>

            <span className="text-xs font-medium text-white/40">
              {activeIndex + 1} / {images.length}
            </span>

            <button
              type="button"
              onClick={nextImage}
              disabled={images.length <= 1}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-zenithGold disabled:opacity-30"
            >
              Next
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
