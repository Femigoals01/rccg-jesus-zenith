


"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    title: "Sunday Worship",
    time: "Sundays • 8:00 AM",
    image: "/imge-12.jpg",
    icon: "🙏",
  },
  {
    title: "Digging Deep/Faith Clinic",
    time: "Wednesdays • 5:30 PM",
    image: "/img5.jpg",
    icon: "📖",
  },
  {
    title: "Special Programs",
    time: "As Announced",
    image: "/imge11.jpg",
    icon: "🔥",
  },
];

export default function WorshipSection() {
  return (
    <section id="worship" className="py-7 px-6 bg-zenithBlue">
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          Worship With Us
        </h2>

        {/* Worship Image (Animated on Scroll) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative w-full h-[420px] mb-20 rounded-2xl overflow-hidden border border-white/10"
        >
          <Image
            src="/img18.jpg"
            alt="Worship at RCCG Jesus Zenith"
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Live Indicator */}
          <div className="absolute top-6 right-6 flex items-center gap-2 bg-black/60 backdrop-blur px-4 py-2 rounded-full border border-white/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
            </span>
            <span className="text-sm text-white font-medium">
              Live During Service Hours
            </span>
          </div>

          {/* Caption */}
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-zenithGold font-medium tracking-wide uppercase text-sm mb-2">
              A Place of His Presence
            </p>
            <p className="text-white text-xl md:text-2xl font-semibold">
              Encounter God in Worship, Word, and Fellowship
            </p>
          </div>
        </motion.div>

        {/* Service Cards with Images */}
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 text-zenithGold"
            >
              {/* Card Image */}
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Card Content */}
              <div className="p-6 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="text-xl font-semibold mb-2">
                  {item.title}
                </h4>
                <p className="text-white/80">
                  {item.time}
                </p>
              </div>

              {/* Hover Glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 ring-1 ring-zenithGold/40 rounded-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
