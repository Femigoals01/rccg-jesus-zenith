

"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "../../../../components/ImageLightbox";
import ShareBar from "../../ShareBar";

export default function AlbumClient({
  title,
  description,
  eventDate,
  images,
}: {
  title: string;
  description: string;
  eventDate: string;
  images: { id: string; url: string }[];
}) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className="min-h-screen bg-zenithDeep py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          {title}
        </h1>

        <p className="text-white/70 mb-1">
          {description}
        </p>

        <p className="text-sm text-white/50 mb-8">
          {eventDate}
        </p>

        <ShareBar />

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative h-40 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setActiveImage(img.url)}
            >
              <Image
                src={img.url}
                alt="Album image"
                fill
                className="object-cover hover:scale-105 transition"
              />
            </div>
          ))}
        </div>
      </div>

      {activeImage && (
        <ImageLightbox
          src={activeImage}
          onClose={() => setActiveImage(null)}
        />
      )}
    </section>
  );
}
