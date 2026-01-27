import Image from "next/image";

export default function OutreachGalleryPage() {
  return (
    <section className="min-h-screen bg-zenithBlue py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-zenithGold">
          Outreach Gallery
        </h1>

        <p className="text-white/80 mb-12">
          Moments from our outreach and evangelism efforts.
        </p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="relative h-56 rounded-xl overflow-hidden"
            >
              <Image
                src={`/outreach${(i % 3) + 1}.jpg`}
                alt="Outreach Moment"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
