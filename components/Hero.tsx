



"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import NextProgramBadge from "../components/NextProgramBadge";

/* ---------------- SLIDES ---------------- */
const slides = [
  {
    image: "/img1.jpg",
    scripture: "For the kingdom of God is not in word, but in power.",
    ref: "1 Corinthians 4:20",
  },
  {
    image: "/img3.jpg",
    scripture: "You are a chosen generation, a royal priesthood.",
    ref: "1 Peter 2:9",
  },
  {
    image: "/img4.jpg",
    scripture: "Thy kingdom come. Thy will be done on earth.",
    ref: "Matthew 6:10",
  },
];

/* ---------------- HERO TEXTS ---------------- */
const heroTexts = [
  {
    full: "Welcome to RCCG Jesus Zenith",
    highlight: "RCCG Jesus Zenith",
  },
  {
    full: "Raising a Zenith Generation in Christ",
    highlight: "Zenith Generation ",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  /* ---------- BACKGROUND SLIDES ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  /* ---------- TYPING EFFECT ---------- */
  const [textIndex, setTextIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  const current = heroTexts[textIndex];

  useEffect(() => {
    if (typing) {
      if (charIndex < current.full.length) {
        const t = setTimeout(() => {
          setTyped((prev) => prev + current.full.charAt(charIndex));
          setCharIndex((c) => c + 1);
        }, 120); // 👈 slow typing
        return () => clearTimeout(t);
      } else {
        const hold = setTimeout(() => setTyping(false), 3000);
        return () => clearTimeout(hold);
      }
    } else {
      const reset = setTimeout(() => {
        setTyped("");
        setCharIndex(0);
        setTyping(true);
        setTextIndex((i) => (i + 1) % heroTexts.length);
      }, 600);
      return () => clearTimeout(reset);
    }
  }, [charIndex, typing, current]);

  /* ---------- COLOR SPLIT ---------- */
  const before = typed.split(current.highlight)[0];
  const highlight =
    typed.includes(current.highlight) ? current.highlight : "";
  const after = typed.split(current.highlight)[1] || "";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Background Image Slider */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[index].image})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
        />
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-zenithBlue/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold leading-tight min-h-[4.5rem]"
        >
          <span className="text-white">{before}</span>
          <span className="text-zenithGold">{highlight}</span>
          <span className="text-white">{after}</span>
        </motion.h1>

        {/* Identity */}
        <p className="mt-4 text-zenithGold tracking-wide uppercase text-sm">
          The Kingdom Ambassadors
        </p>

        {/* Scripture */}
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="mt-6 text-white/90 text-lg italic"
          >
            “{slides[index].scripture}”
            <span className="block mt-2 text-sm text-white/70 not-italic">
              — {slides[index].ref}
            </span>
          </motion.blockquote>
        </AnimatePresence>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#worship"
            className="px-8 py-3 bg-zenithGold text-black font-semibold rounded-md"
          >
            Join Us This Sunday
          </a>

          <a
            href="#about"
            className="px-8 py-3 text-white border border-white/30 rounded-md hover:border-zenithGold transition"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full ${
              index === i ? "bg-zenithGold scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>

      <NextProgramBadge />
    </section>
  );
}
