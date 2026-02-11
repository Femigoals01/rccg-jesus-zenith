


"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const featuredProgram = {
  title: "Zonal Relationship Conference",
  dateLabel: "February 14, 2026",
  startDate: "2026-01-24T08:30:00",
  time: "8:30 AM",
  theme: "Relationship",
  description:
    "A focused gathering for youths and young adult and teenagers, marked by teaching, prayer, revival, and spiritual alignment.",
  image: "/relationship.jpeg",
};

const upcomingPrograms = [
  { title: "Sunday Worship Service", date: "Every Sunday", time: "8:00 AM" },
  { title: "Midweek Service", date: "Every Wednesday", time: "5:30 PM" },
  { title: "Monthly Thanksgiving Service", date: "Every First Sunday", time: "9:00 AM" },
];

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = +new Date(targetDate) - +new Date();

      if (diff <= 0) {
        setTimeLeft("Happening Now");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);

      setTimeLeft(`${days} days • ${hours} hrs`);
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <p className="text-zenithGold font-medium text-sm mt-1">
      ⏳ {timeLeft}
    </p>
  );
}

export default function UpcomingProgramsSection() {
  const [open, setOpen] = useState(false);

  const shareText = encodeURIComponent(
    `${featuredProgram.title}\nTheme: ${featuredProgram.theme}\nDate: ${featuredProgram.dateLabel}\nTime: ${featuredProgram.time}\n\nJoin us at RCCG Jesus Zenith`
  );

  return (
    <section id="programs" className="py-10 px-6 bg-zenithDeep">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zenithGold">
            Programs & Gatherings
          </h2>
          <p className="text-white/80 text-lg">
            Join us as God moves mightily among us.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* FEATURED PROGRAM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-2xl border border-zenithGold/40 bg-white/5"
          >
            <div className="grid sm:grid-cols-[160px_1fr] gap-6 p-6 md:p-8">

              {/* CLICKABLE FLYER */}
              <button
                onClick={() => setOpen(true)}
                className="relative w-full h-[200px] sm:h-[220px] rounded-lg overflow-hidden border border-white/10 focus:outline-none"
              >
                <Image
                  src={featuredProgram.image}
                  alt={featuredProgram.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition" />
              </button>

              {/* INFO */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="inline-block mb-2 px-3 py-1 rounded-full bg-zenithGold text-black text-xs font-semibold">
                    Featured Program
                  </span>

                  <h3 className="text-xl md:text-2xl font-bold mb-1 text-white">
                    {featuredProgram.title}
                  </h3>

                  <p className="text-zenithGold text-sm mb-1">
                    Theme: {featuredProgram.theme}
                  </p>

                  <p className="text-white/80 text-sm">
                    📅 {featuredProgram.dateLabel} • ⏰ {featuredProgram.time}
                  </p>

                  <Countdown targetDate={featuredProgram.startDate} />

                  <p className="text-white/85 mt-3 text-sm leading-relaxed">
                    {featuredProgram.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-4">
                  <a
                    href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                      featuredProgram.title
                    )}&dates=20260124T073000Z/20260124T120000Z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 text-sm rounded-md border border-white/30 hover:border-zenithGold transition text-white"
                  >
                    Add to Calendar
                  </a>

                  <a
                    href="/programs"
                    className="px-3 py-2 text-sm rounded-md bg-zenithGold text-black font-semibold"
                  >
                    View All Programs
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* UPCOMING PROGRAMS */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-white">
              Upcoming Programs
            </h3>

            <div className="space-y-4">
              {upcomingPrograms.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-zenithGold transition text-zenithGold"
                >
                  <h4 className="text-base font-semibold">
                    {p.title}
                  </h4>
                  <p className="text-white/70 text-xs mt-1">
                    📅 {p.date} • ⏰ {p.time}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Controls */}
              <div className="absolute -top-12 right-0 flex gap-3">
                {/* Download */}
                <a
                  href={featuredProgram.image}
                  download
                  className="text-white px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-zenithGold hover:text-black transition"
                >
                  ⬇ Download
                </a>

                {/* WhatsApp Share */}
                <a
                  href={`https://wa.me/?text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white transition"
                >
                  📤 Share
                </a>

                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="text-white text-2xl"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Enlarged Image */}
              <div className="relative w-full h-[70vh] rounded-xl overflow-hidden">
                <Image
                  src={featuredProgram.image}
                  alt={featuredProgram.title}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
