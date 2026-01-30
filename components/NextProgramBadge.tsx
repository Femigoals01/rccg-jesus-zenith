


"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

type Program = {
  title: string;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
};

export default function NextProgramBadge() {
  const [program, setProgram] = useState<Program | null>(null);
  const [step, setStep] = useState(0);
  const [now, setNow] = useState<Date>(new Date());

  /* ---------------- LOAD PROGRAM (AUTO REFRESH) ---------------- */
  useEffect(() => {
  async function load() {
    const res = await fetch("/api/programs/next", {
      cache: "no-store",
    });
    const data = await res.json();
    setProgram(data);
  }

  load();

  // 🔁 auto-refresh every 60 seconds
  const interval = setInterval(load, 60_000);
  return () => clearInterval(interval);
}, []);


  /* ---------------- CLOCK ---------------- */
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  /* ---------------- TEXT ROTATION ---------------- */
  useEffect(() => {
    const i = setInterval(() => {
      setStep((s) => (s + 1) % 3);
    }, 1800);
    return () => clearInterval(i);
  }, []);

  if (!program) return null;

  const start = new Date(`${program.date}T${program.startTime}`);
  const end = new Date(`${program.date}T${program.endTime}`);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
  return null;
}


  // Hide badge after event ends
  if (now > end) return null;

  const isLive = now >= start && now <= end;
  const diff = start.getTime() - now.getTime();

//   function formatCountdown(ms: number) {
//     const total = Math.max(ms, 0);
//     const h = Math.floor(total / 1000 / 60 / 60);
//     const m = Math.floor((total / 1000 / 60) % 60);
//     const s = Math.floor((total / 1000) % 60);
//     return `${h}h ${m}m ${s}s`;
//   }

function formatCountdown(ms: number) {
  const total = Math.max(ms, 0);
  const mins = Math.floor(total / 1000 / 60);

  if (mins <= 0) return "Starting now";
  if (mins < 60) return `Starts in ${mins} min${mins > 1 ? "s" : ""}`;

  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `Starts in ${h}h ${m}m`;
}






//   const messages = isLive
//     ? [
//         "🔴 LIVE NOW",
//         program.title,
//         `📖 ${program.topic}`,
//       ]
//     : [
//         program.title,
//         `${formatCountdown(diff)}`,
//         `${program.topic}`,
//       ];


const messages = isLive
  ? ["🔴 LIVE NOW", program.title, `${program.topic}`]
  : [program.title, formatCountdown(diff), `${program.topic}`];


  return (
    <Link href="/programs">
      <motion.div
        // className={`fixed z-40
        //   bottom-4 sm:bottom-6
        //   right-4 sm:right-6
        //   px-2 sm:px-4 py-2 sm:py-2.5
        //   rounded-full font-semibold shadow-lg cursor-pointer
        //   ${isLive ? "bg-red-600 text-white" : "bg-white text-black"}
        // `}
        // animate={{ scale: [1, 1.07, 1] }}
        // transition={{ repeat: Infinity, duration: 1.8 }}

         initial={{ opacity: 0, y: 20, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: 20, scale: 0.95 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className={`fixed z-40
    bottom-4 sm:bottom-6
    right-4 sm:right-6
    px-4 sm:px-6 py-2.5 sm:py-3
    rounded-full font-semibold shadow-xl cursor-pointer
    ${isLive ? "bg-green-600 text-white" : "bg-white text-black"}
  `}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={step}
            className="text-sm sm:text-base whitespace-nowrap"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {messages[step]}
          </motion.span>
        </AnimatePresence>

        {/* WhatsApp Share */}
        <div className=" text-center">
          <a
            href="/api/programs/whatsapp"
            target="_blank"
            className="text-[11px] underline opacity-90 hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            Share on WhatsApp
          </a>
        </div>
      </motion.div>
    </Link>
  );
}
