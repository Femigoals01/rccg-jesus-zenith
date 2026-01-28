


// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function NextProgramBadge() {
//   /* ------------------ STATE ------------------ */
//   const [program, setProgram] = useState<any>(null);
//   const [step, setStep] = useState(0);
//   const [now, setNow] = useState(new Date());
//   const [notified, setNotified] = useState(false);

//   /* ------------------ FETCH NEXT PROGRAM ------------------ */
//   useEffect(() => {
//     fetch("/api/programs/next")
//       .then((r) => r.json())
//       .then(setProgram)
//       .catch(() => {});
//   }, []);

//   /* ------------------ CLOCK ------------------ */
//   useEffect(() => {
//     const t = setInterval(() => setNow(new Date()), 1000);
//     return () => clearInterval(t);
//   }, []);

//   /* ------------------ ROTATING TEXT ------------------ */
//   useEffect(() => {
//     const i = setInterval(() => {
//       setStep((s) => (s + 1) % 3);
//     }, 1800);
//     return () => clearInterval(i);
//   }, []);

//   /* ------------------ DERIVED VALUES (SAFE) ------------------ */
//   const start = program
//     ? new Date(`${program.date}T${program.startTime}`)
//     : null;

//   const end = program
//     ? new Date(`${program.date}T${program.endTime}`)
//     : null;

//   const isLive =
//     !!program && start && end && now >= start && now <= end;

//   const hasEnded =
//     !!program && end && now > end;

//   const diff =
//     !!program && start
//       ? start.getTime() - now.getTime()
//       : 0;

//   /* ------------------ AUTO WHATSAPP NOTIFY ------------------ */
//   useEffect(() => {
//     if (isLive && !notified) {
//       fetch("/api/programs/notify").catch(() => {});
//       setNotified(true);
//     }
//   }, [isLive, notified]);

//   /* ------------------ HELPERS ------------------ */
//   function formatCountdown(ms: number) {
//     const total = Math.max(ms, 0);
//     const h = Math.floor(total / 1000 / 60 / 60);
//     const m = Math.floor((total / 1000 / 60) % 60);
//     const s = Math.floor((total / 1000) % 60);
//     return `${h}h ${m}m ${s}s`;
//   }

//   /* ------------------ RENDER GUARD ------------------ */
//   if (!program || hasEnded) return null;

//   const messages = isLive
//     ? [
//         "🔴 LIVE NOW",
//         program.title,
//         `📖 ${program.topic}`,
//       ]
//     : [
//         `🔔 ${program.title}`,
//         `⏳ ${formatCountdown(diff)}`,
//         `📖 ${program.topic}`,
//       ];

//   /* ------------------ UI ------------------ */
//   return (
//     <Link href="#programs">
//       <motion.div
//         className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40
//           px-6 py-3 rounded-full font-semibold shadow-lg cursor-pointer
//           ${isLive ? "bg-red-600 text-white" : "bg-green-600 text-black"}
//         `}
//         animate={{ scale: [1, 1.07, 1] }}
//         transition={{ repeat: Infinity, duration: 1.8 }}
//       >
//         <AnimatePresence mode="wait">
//           <motion.span
//             key={step}
//             initial={{ opacity: 0, y: 6 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -6 }}
//             transition={{ duration: 0.3 }}
//           >
//             {messages[step]}
//           </motion.span>
//         </AnimatePresence>

//         {/* WhatsApp Share */}
//         <div className="mt-2 text-center">
//           <a
//             href="/api/programs/whatsapp"
//             target="_blank"
//             className="text-xs underline opacity-90 hover:opacity-100"
//             onClick={(e) => e.stopPropagation()}
//           >
//             Share on WhatsApp
//           </a>
//         </div>
//       </motion.div>
//     </Link>
//   );
// }


"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NextProgramBadge() {
  const [program, setProgram] = useState<any>(null);
  const [step, setStep] = useState(0);
  const [now, setNow] = useState(new Date());

  /* ---------------- FETCH NEXT PROGRAM ---------------- */
  useEffect(() => {
    fetch("/api/programs/next")
      .then((r) => r.json())
      .then(setProgram)
      .catch(() => {});
  }, []);

  /* ---------------- CLOCK TICK ---------------- */
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

  // Hide badge after event ends
  if (now > end) return null;

  const isLive = now >= start && now <= end;
  const diff = start.getTime() - now.getTime();

  function formatCountdown(ms: number) {
    const total = Math.max(ms, 0);
    const h = Math.floor(total / 1000 / 60 / 60);
    const m = Math.floor((total / 1000 / 60) % 60);
    const s = Math.floor((total / 1000) % 60);
    return `${h}h ${m}m ${s}s`;
  }

  const messages = isLive
    ? [
        "🔴 LIVE NOW",
        program.title,
        `📖 ${program.topic}`,
      ]
    : [
        `${program.title}`,
        `${formatCountdown(diff)}`,
        `${program.topic}`,
      ];

  return (
    <Link href="#programs">
      <motion.div
        className={`fixed z-40
          bottom-4 sm:bottom-6
          right-4 sm:right-6
          sm:left-auto left-1/2 sm:translate-x-0 -translate-x-1/2
          px-4 sm:px-6 py-2.5 sm:py-3
          rounded-full font-semibold shadow-lg cursor-pointer
          ${isLive ? "bg-red-600 text-white" : "bg-green-600 text-white"}
        `}
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
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
            className="text-xs underline opacity-90 hover:opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            Share on WhatsApp
          </a>
        </div>
        
      </motion.div>
    </Link>
  );
}
