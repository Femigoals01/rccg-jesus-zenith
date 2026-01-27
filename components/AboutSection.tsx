


"use client";

import { motion } from "framer-motion";
import AnimateIn from "./AnimateIn";

export default function AboutSection() {
  return (
    <section id="about" className="py-10 px-6 bg-zenithDeep">
      <AnimateIn>
        <div className="max-w-7xl mx-auto">

          {/* Section Heading */}
          <div className="text-center max-w-4xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3  text-white">
              About RCCG Jesus Zenith
            </h2>
            <p className="text-white/80 text-lg">
              A parish of the Redeemed Christian Church of God, rooted in purpose,
              holiness, and the global mandate of the Kingdom.
            </p>
          </div>

          {/* MAIN PREMIUM PANEL */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10">

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1530] via-[#0f2452] to-[#020617]" />
            <div className="absolute inset-0 bg-black/30" />

            {/* Content Grid */}
            <div className="relative z-10 grid lg:grid-cols-[1fr_auto_1fr] gap-16 px-8 py-20 md:px-16">

              {/* LEFT — MISSION & VISION CARD */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10">

                <div className="absolute inset-0 bg-gradient-to-br from-zenithDeep via-zenithBlue to-zenithDeep" />
                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 p-8 md:p-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-zenithGold">
                    Our Mission & Vision
                  </h3>

                  <ul className="space-y-6">
                    {[
                      "To make heaven.",
                      "To take as many people with us.",
                      "To have a member of RCCG in every family of all nations.",
                      "To accomplish this, holiness will be our lifestyle.",
                      "To plant churches within five minutes walking distance in developing nations and five minutes driving distance in developed nations.",
                      "To pursue these objectives until every nation is reached for the Lord Jesus Christ.",
                    ].map((item, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="text-zenithGold font-bold text-lg">
                          {index + 1}.
                        </span>
                        <p className="text-white/85 leading-relaxed">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ANIMATED GOLD DIVIDER */}
              <div className="hidden lg:flex items-center justify-center">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="origin-top h-full w-px bg-gradient-to-b from-transparent via-zenithGold to-transparent opacity-80"
                />
              </div>

              {/* RIGHT — WHO WE ARE CARD */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10">

                {/* <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0b1c3d] to-[#020617]" />
                <div className="absolute inset-0 bg-black/35" /> */}

                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1530] via-[#0f2452] to-[#020617]" />
            <div className="absolute inset-0 bg-black/30" />

                <div className="relative z-10 p-10 md:p-12 flex flex-col justify-center h-full">
                  <h4 className="text-2xl md:text-3xl font-bold mb-6 text-zenithGold">
                    Who We Are
                  </h4>

                  <p className="text-white/85 leading-relaxed mb-6">
                    Redeemed Christian Church of God – Jesus Zenith is a
                    Word-centered parish committed to raising believers into
                    spiritual maturity, purpose, and dominion through Christ.
                  </p>

                  <p className="text-white/75 leading-relaxed mb-6">
                    Located in Isokan Estate, Akobo, Ibadan, we exist as an
                    expression of the global RCCG vision, grounded in holiness,
                    evangelism, discipleship, and kingdom advancement.
                  </p>

                  {/* RCCG Base Scripture */}
                  <p className="italic text-white/70 mb-6">
                    “Jesus Christ the same yesterday, today, and forever.”
                    <span className="block text-sm not-italic">
                      — Hebrews 13:8
                    </span>
                  </p>

                  <p className="text-zenithGold font-medium">
                    We are known as{" "}
                    <span className="font-semibold">
                      The Kingdom Ambassadors
                    </span>,
                    living out Christ’s mandate in every sphere of life.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
