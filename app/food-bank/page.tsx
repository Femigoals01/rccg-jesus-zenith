"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const galleryImages = [
  "/foodbank1.jpg",
  "/foodbank2.jpg",
  "/foodbank3.jpg",
  "/foodbank4.jpg",
];

export default function FoodBankPage() {
  return (
    <section className="min-h-screen bg-zenithDeep px-6 py-28">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Community Food Bank
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto leading-relaxed">
            The RCCG Jesus Zenith Food Bank exists to support individuals and
            families in need by providing food items, groceries, and essential
            supplies — showing the love of Christ in practical ways.
          </p>

          <p className="mt-4 text-white/60 italic text-sm">
            “Give, and it will be given to you.” — Luke 6:38
          </p>
        </motion.div>

        {/* ACTION CARDS */}
        <div className="grid md:grid-cols-2 gap-10 mb-24">

          {/* NEED HELP */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-zenithGold mb-4">
              🤲 Need Assistance?
            </h3>

            <p className="text-white/80 mb-6 leading-relaxed">
              If you are currently facing food shortages or need essential
              household items, our Food Bank is here for you.
              Requests are treated with dignity, privacy, and care.
            </p>

            <Link
              href="/contact?type=food-request"
              className="inline-block px-6 py-3 rounded-md bg-zenithGold text-black font-semibold hover:opacity-90 transition"
            >
              Request Support
            </Link>
          </motion.div>

          {/* GIVE */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-zenithGold mb-4">
              ❤️ Want to Give?
            </h3>

            <p className="text-white/80 mb-6 leading-relaxed">
              You can support the Food Bank by donating food items, groceries,
              toiletries, or by contributing financially to sustain the ministry.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact?type=food-donation"
                className="px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-zenithGold transition"
              >
                Donate Items
              </Link>

              <Link
                href="/#give"
                className="px-6 py-3 rounded-md border border-white/40 text-white hover:border-zenithGold transition"
              >
                Give Financially
              </Link>
            </div>
          </motion.div>
        </div>

        {/* GALLERY */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">
            Food Bank in Action
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className="relative h-48 rounded-xl overflow-hidden border border-white/10"
              >
                <Image
                  src={src}
                  alt="Food Bank Outreach"
                  fill
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-white/80 mb-6">
            Together, we can make sure no one is left behind.
          </p>

          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-zenithGold text-black font-semibold rounded-md hover:opacity-90 transition"
          >
            Contact the Food Bank Team
          </Link>
        </div>

      </div>
    </section>
  );
}
