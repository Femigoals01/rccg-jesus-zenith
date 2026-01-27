

"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-zenithBlue py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Get in Touch
          </h1>

          <p className="text-white/80 mb-8 leading-relaxed">
            We would love to hear from you. Whether you have a prayer request,
            a testimony, or you’d like to connect with RCCG Jesus Zenith,
            please reach out.
          </p>

          <div className="space-y-4 text-white/70">
            <p>
              <strong className="text-white">Address:</strong><br />
              RCCG Jesus Zenith, Crimson School,<br />
              No. 8, Road B, Akilapa, Olowu Estate,<br />
              Isokan, Akobo-Ojurin, Ibadan
            </p>

            <p>
              <strong className="text-white">Email:</strong><br />
              info@rccgjesuszenith.org
            </p>

            <p>
              <strong className="text-white">Service Times:</strong><br />
              Sunday Worship — 8:00 AM<br />
              Midweek Service — Wed 6:00 PM
            </p>
          </div>

          {/* Linktree Button */}
          <a
            href="https://linktr.ee/rccgjesuszenith"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 px-6 py-3 rounded-md bg-zenithGold text-black font-semibold hover:opacity-90 transition"
          >
            🔗 All Our Social Media Links
          </a>
        </motion.div>

        {/* Right: Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you! Your message has been received.");
          }}
        >
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              required
              type="text"
              className="w-full rounded-md bg-black/30 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zenithGold"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              required
              type="email"
              className="w-full rounded-md bg-black/30 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zenithGold"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              required
              rows={5}
              className="w-full rounded-md bg-black/30 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zenithGold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-zenithGold text-black font-semibold hover:opacity-90 transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
