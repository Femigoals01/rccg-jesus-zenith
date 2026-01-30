// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { Quote } from "lucide-react";
// import { useEffect, useState } from "react";

// // const testimonies = [
// //   {
// //     name: "Sis. Adebimpe",
// //     title: "God Healed Me Completely",
// //     category: "Healing",
// //     text: "I joined RCCG Jesus Zenith trusting God for healing. During service, prayers were made and I received instant healing. The pain never returned. Truly, God is faithful!",
// //   },
// //   {
// //     name: "Bro. Tunde",
// //     title: "Divine Financial Breakthrough",
// //     category: "Breakthrough",
// //     text: "After months of joblessness, God surprised me with a job offer beyond my expectations. I return all glory to God for His mercy.",
// //   },
// //   {
// //     name: "Sis. Funke",
// //     title: "Restored Peace and Direction",
// //     category: "Restoration",
// //     text: "Through the teachings and prayers at Jesus Zenith, God restored my peace and gave me clarity about my purpose. My life has truly changed.",
// //   },
// // ];




// export default function TestimoniesSection() {
//   const [active, setActive] = useState(0);

//   const [testimonies, setTestimonies] = useState<any[]>([]);

// useEffect(() => {
//   fetch("/api/testimonies")
//     .then((r) => r.json())
//     .then(setTestimonies);
// }, []);

// if (testimonies.length === 0) return null;

//   /* 🔁 AUTO ROTATE EVERY 6 SECONDS */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActive((prev) => (prev + 1) % testimonies.length);
//     }, 6000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section id="testimonies" className="py-32 px-6 bg-zenithBlue">
//       <div className="max-w-6xl mx-auto text-center">

//         {/* Heading */}
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-3xl md:text-4xl font-bold mb-4 text-white"
//         >
//           Testimonies
//         </motion.h2>

//         <p className="text-white/80 max-w-2xl mx-auto mb-12">
//           “They overcame by the blood of the Lamb and by the word of their testimony.”
//           <span className="block text-sm mt-2 text-white/60">
//             — Revelation 12:11
//           </span>
//         </p>

//         {/* Testimony Card */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={active}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//             className="bg-white/5 border border-white/10 rounded-2xl p-10 max-w-3xl mx-auto relative"
//           >
//             <Quote
//               className="absolute top-6 right-6 text-zenithGold opacity-40"
//               size={40}
//             />

//             <span className="inline-block mb-4 px-3 py-1 text-xs rounded-full bg-zenithGold text-black font-semibold">
//               {testimonies[active].category}
//             </span>

//             <h3 className="text-xl font-semibold mb-4 text-white">
//               {testimonies[active].title}
//             </h3>

//             <p className="text-white/85 leading-relaxed mb-6">
//               {testimonies[active].text}
//             </p>

//             <p className="text-white/60 text-sm">
//               — {testimonies[active].name}
//             </p>
//           </motion.div>
//         </AnimatePresence>

//         {/* Navigation Dots */}
//         <div className="mt-10 flex justify-center gap-3">
//           {testimonies.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setActive(i)}
//               className={`h-2.5 w-2.5 rounded-full transition
//                 ${active === i ? "bg-zenithGold scale-110" : "bg-white/40 hover:bg-white/70"}
//               `}
//               aria-label={`View testimony ${i + 1}`}
//             />
//           ))}
//         </div>

//         {/* CTA */}
//         <div className="mt-12">
//           <a
//             href="/contact"
//             className="inline-block px-8 py-3 bg-zenithGold text-black font-semibold rounded-md hover:opacity-90 transition"
//           >
//             Share Your Testimony
//           </a>
//         </div>

//       </div>
//     </section>
//   );
// }


"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";

export default function TestimoniesSection() {
  const [testimonies, setTestimonies] = useState<any[]>([]);
  const [active, setActive] = useState(0);

  /* ---------------- FETCH TESTIMONIES ---------------- */
  useEffect(() => {
    fetch("/api/testimonies")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTestimonies(data);
          setActive(0); // reset safely
        }
      })
      .catch(() => {});
  }, []);

  /* ---------------- AUTO ROTATE ---------------- */
  useEffect(() => {
    if (testimonies.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [testimonies.length]);

  if (testimonies.length === 0) return null;

  const current = testimonies[active];

  return (
    <section id="testimonies" className="py-32 px-6 bg-zenithBlue">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
        >
          Testimonies
        </motion.h2>

        <p className="text-white/80 max-w-2xl mx-auto mb-12">
          “They overcame by the blood of the Lamb and by the word of their testimony.”
          <span className="block text-sm mt-2 text-white/60">
            — Revelation 12:11
          </span>
        </p>

        {/* Testimony Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id || active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-10 max-w-3xl mx-auto relative"
          >
            <Quote
              className="absolute top-6 right-6 text-zenithGold opacity-40"
              size={40}
            />

            {current.category && (
              <span className="inline-block mb-4 px-3 py-1 text-xs rounded-full bg-zenithGold text-black font-semibold">
                {current.category}
              </span>
            )}

            <h3 className="text-xl font-semibold mb-4 text-white">
              {current.title}
            </h3>

            <p className="text-white/85 leading-relaxed mb-6">
              {current.text}
            </p>

            <p className="text-white/60 text-sm">
              — {current.name}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        {testimonies.length > 1 && (
          <div className="mt-10 flex justify-center gap-3">
            {testimonies.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2.5 w-2.5 rounded-full transition
                  ${
                    active === i
                      ? "bg-zenithGold scale-110"
                      : "bg-white/40 hover:bg-white/70"
                  }
                `}
                aria-label={`View testimony ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12">
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-zenithGold text-black font-semibold rounded-md hover:opacity-90 transition"
          >
            Share Your Testimony
          </a>
        </div>

      </div>
    </section>
  );
}
