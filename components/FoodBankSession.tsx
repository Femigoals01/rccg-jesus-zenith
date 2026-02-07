// "use client";

// import { motion } from "framer-motion";
// import Link from "next/link";

// export default function FoodBankSection() {
//   return (
//     <section id="food-bank" className="py-32 px-6 bg-zenithDeep">
//       <div className="max-w-6xl mx-auto text-center">

//         {/* Heading */}
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-3xl md:text-4xl font-bold mb-4 text-white"
//         >
//           Community Food Bank
//         </motion.h2>

//         <p className="text-white/80 max-w-2xl mx-auto mb-6">
//           Extending the love of Christ by providing food and essential items
//           to individuals and families in need.
//         </p>

//         <p className="text-white/60 italic mb-14 text-sm">
//           “Whoever is kind to the poor lends to the Lord.” — Proverbs 19:17
//         </p>

//         {/* Cards */}
//         <div className="grid md:grid-cols-2 gap-10 text-left">

//           {/* NEED HELP */}
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-white/5 border border-white/10 rounded-2xl p-8"
//           >
//             <h3 className="text-xl font-semibold mb-4 text-zenithGold">
//               🤲 Need Assistance?
//             </h3>

//             <p className="text-white/80 mb-6 leading-relaxed">
//               If you or someone you know is in need of food items or basic
//               essentials, our Food Bank is here to help. No shame, no judgment —
//               just love.
//             </p>

//             <Link
//               href="/contact?type=food-request"
//               className="inline-block px-6 py-3 rounded-md bg-zenithGold text-black font-semibold hover:opacity-90 transition"
//             >
//               Request Support
//             </Link>
//           </motion.div>

//           {/* GIVE */}
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-white/5 border border-white/10 rounded-2xl p-8"
//           >
//             <h3 className="text-xl font-semibold mb-4 text-zenithGold">
//               ❤️ Want to Support?
//             </h3>

//             <p className="text-white/80 mb-6 leading-relaxed">
//               You can support the Food Bank by donating food items,
//               household essentials, or by making a financial contribution.
//               Every gift makes a difference.
//             </p>

//             <div className="flex flex-wrap gap-4">
//               <Link
//                 href="/contact?type=food-donation"
//                 className="px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-zenithGold transition"
//               >
//                 Donate Items
//               </Link>

//               <Link
//                 href="#give"
//                 className="px-6 py-3 rounded-md border border-white/40 text-white hover:border-zenithGold transition"
//               >
//                 Give Financially
//               </Link>
//             </div>
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// }





"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function FoodBankSection() {
  return (
    <section id="food-bank" className="py-32 px-6 bg-zenithDeep">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Community Food Bank
          </motion.h2>

          <p className="text-white/80 max-w-2xl mx-auto mb-4">
            Extending the love of Christ by providing food and essential items
            to individuals and families in need.
          </p>

          <p className="text-white/60 italic text-sm">
            “Whoever is kind to the poor lends to the Lord.” — Proverbs 19:17
          </p>
        </div>

        {/* IMAGE + CONTENT */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[320px] rounded-3xl overflow-hidden"
          >
            <Image
              src="/foodbankhome5.png"
              alt="RCCG Jesus Zenith Food Bank Outreach"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" />
          </motion.div>

          {/* Cards */}
          <div className="grid gap-10">

            {/* NEED HELP */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold mb-4 text-zenithGold">
                Need Assistance?
              </h3>

              <p className="text-white/80 mb-6 leading-relaxed">
                If you or someone you know is in need of food items or basic
                essentials, our Food Bank is here to help. No shame, no judgment —
                just love.
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
              <h3 className="text-xl font-semibold mb-4 text-zenithGold">
                Want to Support?
              </h3>

              <p className="text-white/80 mb-6 leading-relaxed">
                You can support the Food Bank by donating food items,
                household essentials, or by making a financial contribution.
                Every gift makes a difference.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact?type=food-donation"
                  className="px-6 py-3 rounded-md bg-white text-black font-semibold hover:bg-zenithGold transition"
                >
                  Donate Items
                </Link>

                <Link
                  href="#give"
                  className="px-6 py-3 rounded-md border border-white/40 text-white hover:border-zenithGold transition"
                >
                  Give Financially
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
