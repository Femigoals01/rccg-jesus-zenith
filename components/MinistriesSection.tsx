

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ministries = [
  {
    name: "Men",
    image: "/men-zen.jpeg",
    description: "Raising men of purpose, faith, and leadership.",
    link: "/ministries/men",
  },
  {
    name: "Women",
    image: "/wom-img.jpg",
    description: "Empowering women to flourish in Christ.",
    link: "/ministries/women",
  },
  {
    name: "Youth",
    image: "/youth-img.jpg",
    description: "Equipping the next generation for kingdom impact.",
    link: "/ministries/youth",
  },
  {
    name: "Children",
    image: "/child-img2.jpg",
    description: "Nurturing young hearts in the love of Christ.",
    link: "/ministries/children",
  },
];

export default function MinistriesSection() {
  return (
    <section id="ministries" className="py-10 px-6 bg-zenithBlue">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-zenithGold">
          Our Ministries
        </h2>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-4 gap-10">
          {ministries.map((ministry, i) => (
            <motion.div
              key={ministry.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              {/* Image */}
              <div className="relative h-48">
                <Image
                  src={ministry.image}
                  alt={`${ministry.name} Ministry`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>

              {/* Content */}
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold mb-2">
                  {ministry.name} Ministry
                </h4>

                <p className="text-white/75 mb-4 text-sm leading-relaxed">
                  {ministry.description}
                </p>

                <a
                  href={ministry.link}
                  className="inline-flex items-center gap-2 text-zenithGold font-medium hover:underline"
                >
                  Learn More →
                </a>
              </div>

              {/* Hover Ring */}
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
