
"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Music,
  Shirt,
  BookOpen,
} from "lucide-react";

export default function NewHereSection() {
  const items = [
    {
      icon: Music,
      title: "Spirit-Led Worship",
      text: "Expect heartfelt worship, prayer, and a powerful atmosphere of God’s presence.",
    },
    {
      icon: BookOpen,
      title: "Bible-Based Teaching",
      text: "Practical, Word-centered teachings that help you grow spiritually and live victoriously.",
    },
    {
      icon: Shirt,
      title: "Come As You Are",
      text: "No dress code. Come comfortable — what matters is your heart, not your outfit.",
    },
    {
      icon: Clock,
      title: "Service Time",
      text: "Sunday Worship — 8:00 AM • Midweek Service — Wednesdays 6:00 PM",
    },
  ];

  return (
    <section id="new-here" className="py-32 px-6 bg-zenithDeep">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT — WELCOME MESSAGE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            New Here? You’re Welcome 🤍
          </h2>

          <p className="text-white/85 text-lg leading-relaxed mb-8">
            Whether this is your first time in church or you’re looking for a
            place to grow deeper in Christ, RCCG Jesus Zenith is a family where
            you belong.
          </p>

          <p className="text-white/70 mb-10">
            We are known as <span className="text-zenithGold font-medium">
              The Kingdom Ambassadors
            </span>, passionate about raising believers who live out God’s
            purpose in every area of life.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#worship"
              className="px-8 py-3 bg-zenithGold text-black font-semibold rounded-md text-center hover:opacity-90 transition"
            >
              Plan Your Visit
            </a>

            <a
              href="https://chat.whatsapp.com/IHpvL4uKSCM1395xsyXXBH"
              target="_blank"
              className="px-8 py-3 border border-white/30 rounded-md text-center hover:border-zenithGold transition"
            >
              Join Our WhatsApp Community
            </a>
          </div>
        </motion.div>

        {/* RIGHT — WHAT TO EXPECT */}
        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-zenithGold transition"
              >
                <Icon className="text-zenithGold mb-4" size={28} />
                <h4 className="text-lg font-semibold mb-2">
                  {item.title}
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* LOCATION FOOTNOTE */}
      <div className="mt-20 text-center text-white/70 text-sm">
        <MapPin className="inline-block mr-2 text-zenithGold" size={16} />
        Crimson School, No. 8 Road B, Akilapa, Olowu Estate, Isokan, Akobo-Ojurin, Ibadan
      </div>
    </section>
  );
}
