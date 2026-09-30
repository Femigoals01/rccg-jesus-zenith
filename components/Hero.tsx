



// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect, useState } from "react";
// import NextProgramBadge from "../components/NextProgramBadge";

// /* ---------------- SLIDES ---------------- */
// const slides = [
//   {
//     image: "/img1.jpg",
//     scripture: "For the kingdom of God is not in word, but in power.",
//     ref: "1 Corinthians 4:20",
//   },
//   {
//     image: "/img3.jpg",
//     scripture: "You are a chosen generation, a royal priesthood.",
//     ref: "1 Peter 2:9",
//   },
//   {
//     image: "/img4.jpg",
//     scripture: "Thy kingdom come. Thy will be done on earth.",
//     ref: "Matthew 6:10",
//   },
// ];

// /* ---------------- HERO TEXTS ---------------- */
// const heroTexts = [
//   {
//     full: "Welcome to RCCG Jesus Zenith",
//     highlight: "RCCG Jesus Zenith",
//   },
//   {
//     full: "Raising a Zenith Generation in Christ",
//     highlight: "Zenith Generation ",
//   },
// ];

// export default function Hero() {
//   const [index, setIndex] = useState(0);

//   /* ---------- BACKGROUND SLIDES ---------- */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % slides.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   /* ---------- TYPING EFFECT ---------- */
//   const [textIndex, setTextIndex] = useState(0);
//   const [typed, setTyped] = useState("");
//   const [charIndex, setCharIndex] = useState(0);
//   const [typing, setTyping] = useState(true);

//   const current = heroTexts[textIndex];

//   useEffect(() => {
//     if (typing) {
//       if (charIndex < current.full.length) {
//         const t = setTimeout(() => {
//           setTyped((prev) => prev + current.full.charAt(charIndex));
//           setCharIndex((c) => c + 1);
//         }, 120);

//         return () => clearTimeout(t);
//       } else {
//         const hold = setTimeout(() => setTyping(false), 3000);
//         return () => clearTimeout(hold);
//       }
//     } else {
//       const reset = setTimeout(() => {
//         setTyped("");
//         setCharIndex(0);
//         setTyping(true);
//         setTextIndex((i) => (i + 1) % heroTexts.length);
//       }, 600);

//       return () => clearTimeout(reset);
//     }
//   }, [charIndex, typing, current]);

//   /* ---------- COLOR SPLIT ---------- */
//   const before = typed.split(current.highlight)[0];
//   const highlight = typed.includes(current.highlight)
//     ? current.highlight
//     : "";
//   const after = typed.split(current.highlight)[1] || "";

//   return (
//     <section
//       id="home"
//       className="relative min-h-screen flex items-center justify-center px-6 py-28 lg:py-0 overflow-hidden"
//     >
//       {/* Background Image Slider */}
//       <AnimatePresence>
//         <motion.div
//           key={index}
//           className="absolute inset-0 bg-cover bg-center"
//           style={{ backgroundImage: `url(${slides[index].image})` }}
//           initial={{ opacity: 0, rotateY: -90, scale: 1.05 }}
//           animate={{ opacity: 1, rotateY: 0, scale: 1 }}
//           exit={{ opacity: 0, rotateY: 90, scale: 1.05 }}
//           transition={{ duration: 1.2, ease: "easeInOut" }}
//         />
//       </AnimatePresence>

//       {/* Overlays */}
//       <div className="absolute inset-0 bg-zenithBlue/70" />
//       <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/60" />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

//       {/* Decorative Gold Glow */}
//       <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border border-zenithGold/30 blur-sm opacity-60" />
//       <div className="absolute top-24 right-16 w-40 h-40 rounded-full bg-zenithGold/10 blur-3xl" />

//       {/* Main Hero Layout */}
//       <div className="relative z-20 w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
//         {/* LEFT CONTENT */}
//         <div className="text-center lg:text-left">
//           <motion.h1
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//             className="text-4xl md:text-6xl font-bold leading-tight min-h-[4.5rem]"
//           >
//             <span className="text-white">{before}</span>
//             <span className="text-zenithGold">{highlight}</span>
//             <span className="text-white">{after}</span>
//           </motion.h1>

//           <p className="mt-4 text-zenithGold tracking-[0.35em] uppercase text-xs md:text-sm">
//             The Kingdom Ambassadors
//           </p>

//           {/* Anniversary Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//             className="mt-6 inline-flex flex-col sm:flex-row items-center gap-2 rounded-full border border-zenithGold/40 bg-black/35 px-6 py-3 backdrop-blur-md shadow-lg"
//           >
//             <span className="text-zenithGold text-xs font-bold uppercase tracking-[0.2em]">
//               6 Months Anniversary
//             </span>

//             <span className="hidden sm:block h-4 w-px bg-white/30" />

//             <span className="text-white text-sm font-medium">
//               Celebrating God’s Faithfulness
//             </span>
//           </motion.div>

//           {/* Scripture */}
//           <AnimatePresence mode="wait">
//             <motion.blockquote
//               key={index}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.6 }}
//               className="mt-8 text-white/90 text-lg italic max-w-2xl mx-auto lg:mx-0"
//             >
//               “{slides[index].scripture}”
//               <span className="block mt-2 text-sm text-zenithGold not-italic">
//                 — {slides[index].ref}
//               </span>
//             </motion.blockquote>
//           </AnimatePresence>

//           {/* CTAs */}
//           <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//             <a
//               href="#worship"
//               className="px-8 py-3 bg-zenithGold text-black font-semibold rounded-md hover:opacity-90 transition"
//             >
//               Join Us This Sunday
//             </a>

//             <a
//               href="#about"
//               className="px-8 py-3 text-white border border-white/30 rounded-md hover:border-zenithGold transition"
//             >
//               Learn More
//             </a>
//           </div>
//         </div>

//         {/* RIGHT ANNIVERSARY CARD */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={{
//             opacity: 1,
//             x: 0,
//             rotateY: [0, 360],
//           }}
//           transition={{
//             opacity: { duration: 1 },
//             x: { duration: 1 },
//             rotateY: {
//               duration: 5,
//               repeat: Infinity,
//               ease: "easeInOut",
//             },
//           }}
//           className="flex justify-center [perspective:1200px] mt-8 lg:mt-0"
//         >
//           <div className="relative [transform-style:preserve-3d]">
//             {/* Back ghost cards */}
//             <div className="absolute inset-0 translate-x-6 translate-y-3 rotate-3 rounded-3xl border border-zenithGold/20 bg-black/30 blur-[1px] opacity-40 lg:translate-x-14 lg:translate-y-4" />
//             <div className="absolute inset-0 translate-x-10 translate-y-5 rotate-6 rounded-3xl border border-white/10 bg-black/20 blur-[2px] opacity-25 lg:translate-x-28 lg:translate-y-8" />

//             {/* Main card */}
//             <div className="relative w-[230px] sm:w-[270px] lg:w-[310px] rounded-3xl border border-zenithGold/60 bg-black/40 p-2 shadow-[0_0_45px_rgba(250,204,21,0.25)] [backface-visibility:hidden]">
//               <img
//                 src="/anniversary.jpg"
//                 alt="RCCG Jesus Zenith 6 Months Anniversary"
//                 className="w-full rounded-2xl object-cover"
//               />

//               <div className="absolute -top-5 -right-5 rounded-full border border-zenithGold/50 bg-black/70 px-4 py-2 text-xs text-zenithGold font-bold backdrop-blur">
//                 @6
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Indicators */}
//       <div className="absolute bottom-10 z-20 flex gap-3">
//         {slides.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setIndex(i)}
//             aria-label={`Go to slide ${i + 1}`}
//             className={`h-2.5 w-2.5 rounded-full transition ${
//               index === i ? "bg-zenithGold scale-110" : "bg-white/50"
//             }`}
//           />
//         ))}
//       </div>

//       <NextProgramBadge />
//     </section>
//   );
// }





"use client";

import { AnimatePresence, motion } from "framer-motion";
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
    }, 3000);

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
        }, 120);

        return () => clearTimeout(t);
      }

      const hold = setTimeout(() => {
        setTyping(false);
      }, 3000);

      return () => clearTimeout(hold);
    }

    const reset = setTimeout(() => {
      setTyped("");
      setCharIndex(0);
      setTyping(true);
      setTextIndex((i) => (i + 1) % heroTexts.length);
    }, 600);

    return () => clearTimeout(reset);
  }, [charIndex, typing, current]);

  /* ---------- COLOR SPLIT ---------- */
  const before = typed.split(current.highlight)[0];

  const highlight = typed.includes(current.highlight)
    ? current.highlight
    : "";

  const after = typed.split(current.highlight)[1] || "";

  return (
    <section
      id="home"
      className="
        relative
        flex
        min-h-[100svh]
        items-center
        justify-center
        overflow-hidden
        px-5
        pb-24
        pt-28
        sm:px-6
        lg:px-8
        lg:pb-16
        lg:pt-24
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE SLIDER
      ===================================================== */}

      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slides[index].image})`,
          }}
          initial={{
            opacity: 0,
            rotateY: -90,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            rotateY: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            rotateY: 90,
            scale: 1.05,
          }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
        />
      </AnimatePresence>

      {/* =====================================================
          OVERLAYS
      ===================================================== */}

      <div className="absolute inset-0 bg-zenithBlue/70" />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/60" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* =====================================================
          DECORATIVE GOLD GLOW
      ===================================================== */}

      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full border border-zenithGold/30 opacity-60 blur-sm" />

      <div className="absolute right-16 top-24 h-40 w-40 rounded-full bg-zenithGold/10 blur-3xl" />

      {/* =====================================================
          MAIN HERO LAYOUT
      ===================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          grid
          w-full
          max-w-7xl
          items-center
          gap-14
          lg:grid-cols-[1.08fr_0.92fr]
          lg:gap-10
          xl:gap-16
        "
      >
        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="text-center lg:text-left">
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="
              min-h-[4.5rem]
              text-4xl
              font-bold
              leading-tight
              md:text-6xl
            "
          >
            <span className="text-white">
              {before}
            </span>

            <span className="text-zenithGold">
              {highlight}
            </span>

            <span className="text-white">
              {after}
            </span>
          </motion.h1>

          <p className="mt-4 text-xs uppercase tracking-[0.35em] text-zenithGold md:text-sm">
            The Kingdom Ambassadors
          </p>

          {/* Anniversary Badge */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.6,
              duration: 0.8,
            }}
            className="
              mt-6
              inline-flex
              flex-col
              items-center
              gap-2
              rounded-full
              border
              border-zenithGold/40
              bg-black/35
              px-6
              py-3
              shadow-lg
              backdrop-blur-md
              sm:flex-row
            "
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zenithGold">
              6 Months Anniversary
            </span>

            <span className="hidden h-4 w-px bg-white/30 sm:block" />

            <span className="text-sm font-medium text-white">
              Celebrating God’s Faithfulness
            </span>
          </motion.div>

          {/* Scripture */}

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                mx-auto
                mt-8
                max-w-2xl
                text-lg
                italic
                text-white/90
                lg:mx-0
              "
            >
              “{slides[index].scripture}”

              <span className="mt-2 block text-sm not-italic text-zenithGold">
                — {slides[index].ref}
              </span>
            </motion.blockquote>
          </AnimatePresence>

          {/* CTAs */}

          <div
            className="
              mt-10
              flex
              flex-col
              justify-center
              gap-4
              sm:flex-row
              lg:justify-start
            "
          >
            <a
              href="#worship"
              className="
                rounded-md
                bg-zenithGold
                px-8
                py-3
                font-semibold
                text-black
                transition
                hover:opacity-90
              "
            >
              Join Us This Sunday
            </a>

            <a
              href="#about"
              className="
                rounded-md
                border
                border-white/30
                px-8
                py-3
                text-white
                transition
                hover:border-zenithGold
              "
            >
              Learn More
            </a>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            lg:-translate-y-1
          "
        >
          {/* =================================================
              ROTATING FLYER AREA
          ================================================= */}

          <div
            className="
              relative
              flex
              w-full
              justify-center
              [perspective:1400px]
            "
          >
            {/* Soft gold glow */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[75%]
                w-[65%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-zenithGold/15
                blur-[65px]
              "
            />

            {/* =================================================
                ROTATING DOUBLE-SIDED CARD
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: [0, 360],
              }}
              transition={{
                opacity: {
                  duration: 1,
                },

                x: {
                  duration: 1,
                },

                rotateY: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="
                relative
                h-[300px]
                w-[240px]
                [transform-style:preserve-3d]
                sm:h-[338px]
                sm:w-[270px]
                lg:h-[363px]
                lg:w-[290px]
                xl:h-[388px]
                xl:w-[310px]
              "
            >
              {/* =================================================
                  GHOST EFFECTS
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  translate-x-4
                  translate-y-3
                  rotate-3
                  rounded-[26px]
                  border
                  border-zenithGold/20
                  bg-black/30
                  opacity-35
                  blur-[1px]
                  lg:translate-x-8
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  translate-x-7
                  translate-y-5
                  rotate-6
                  rounded-[26px]
                  border
                  border-white/10
                  bg-black/20
                  opacity-20
                  blur-[2px]
                  lg:translate-x-14
                "
              />

              {/* =================================================
                  FRONT FACE
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  z-20
                  rounded-[26px]
                  border
                  border-zenithGold/60
                  bg-black/40
                  p-1.5
                  shadow-[0_0_45px_rgba(250,204,21,0.25)]
                  [backface-visibility:hidden]
                  [-webkit-backface-visibility:hidden]
                "
              >
                <img
                  src="/sovereign-god.jpg"
                  alt="Sovereign God Choir Concert - RCCG Jesus Zenith"
                  className="
                    block
                    h-full
                    w-full
                    rounded-[20px]
                    object-cover
                  "
                />
              </div>

              {/* =================================================
                  BACK FACE

                  Same flyer, rotated 180 degrees before the
                  parent rotates. Therefore when the parent
                  reaches its back side, this face is forward.
              ================================================= */}

              <div
                className="
                  absolute
                  inset-0
                  z-10
                  rounded-[26px]
                  border
                  border-zenithGold/60
                  bg-black/40
                  p-1.5
                  shadow-[0_0_45px_rgba(250,204,21,0.25)]
                  [backface-visibility:hidden]
                  [-webkit-backface-visibility:hidden]
                  [transform:rotateY(180deg)]
                "
              >
                <img
                  src="/sovereign-god.jpg"
                  alt=""
                  aria-hidden="true"
                  className="
                    block
                    h-full
                    w-full
                    rounded-[20px]
                    object-cover
                  "
                />
              </div>
            </motion.div>
          </div>

          {/* =================================================
              ATTENDANCE CARD CTA
              DOES NOT ROTATE
          ================================================= */}

          <motion.a
            href="/choir-concert"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.8,
              duration: 0.7,
            }}
            whileHover={{
              y: -2,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              group
              relative
              mt-5
              inline-flex
              min-w-[250px]
              items-center
              justify-between
              gap-4
              overflow-hidden
              rounded-full
              border
              border-zenithGold/60
              bg-black/65
              px-5
              py-3
              shadow-[0_10px_30px_rgba(0,0,0,0.30)]
              backdrop-blur-md
              transition
              hover:border-zenithGold
              sm:min-w-[280px]
            "
          >
            {/* Hover fill */}

            <span
              className="
                absolute
                inset-0
                origin-left
                scale-x-0
                bg-zenithGold
                transition-transform
                duration-300
                group-hover:scale-x-100
              "
            />

            {/* Text */}

            <span
              className="
                relative
                z-10
                text-sm
                font-bold
                text-white
                transition-colors
                duration-300
                group-hover:text-black
              "
            >
              Generate Your Attendance Card
            </span>

            {/* Arrow */}

            <span
              className="
                relative
                z-10
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-zenithGold
                text-sm
                font-black
                text-black
                transition
                duration-300
                group-hover:bg-black
                group-hover:text-zenithGold
              "
            >
              →
            </span>
          </motion.a>
        </div>
      </div>

      {/* =====================================================
          SLIDE INDICATORS
      ===================================================== */}

      <div
        className="
          absolute
          bottom-7
          left-1/2
          z-20
          flex
          -translate-x-1/2
          gap-3
          lg:bottom-6
        "
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index === i
                ? "scale-110 bg-zenithGold"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>

      <NextProgramBadge />
    </section>
  );
}