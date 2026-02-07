


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
  { name: "About", href: "#about" },
//   { name: "Pastor", href: "#pastor" },
  { name: "Worship", href: "#worship" },
  { name: "Ministries", href: "#ministries" },
  { name: "Foodbank", href: "/food-bank" },
  { name: "Gallery", href: "/gallery" }, // ✅ ADD HERE
  { name: "Contact", href: "/contact" },
];


  return (
    <>
      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full z-50 bg-zenithBlue/90 backdrop-blur border-b border-white/10 text-white"
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/og-image.png"
              alt="RCCG Jesus Zenith"
              className="h-10 w-auto"
            />
            <span className="font-semibold tracking-wide">
              JESUS ZENITH
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-zenithGold transition"
              >
                {link.name}
              </a>
            ))}

            <a
              href="#give"
              className="px-5 py-2 bg-zenithGold text-black rounded-md font-semibold"
            >
              Give
            </a>
          </div>
          <a
  href="https://linktr.ee/rccgjesuszenith"
  target="_blank"
  rel="noopener noreferrer"
  className="px-5 py-2 border border-zenithGold text-zenithGold rounded-md font-semibold hover:bg-zenithGold hover:text-black transition"
>
  All Our Links
</a>


          {/* Mobile Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-2xl"
            aria-label="Open menu"
          >
            ☰
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-zenithDeep z-50 p-8 flex flex-col"
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="self-end text-2xl mb-10"
                aria-label="Close menu"
              >
                ✕
              </button>

              {/* Links */}
              <nav className="flex flex-col gap-6 text-lg">
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="hover:text-zenithGold transition"
                  >
                    {link.name}
                  </a>
                ))}

                <a
                  href="#give"
                  onClick={() => setOpen(false)}
                  className="mt-6 px-6 py-3 bg-zenithGold text-black rounded-md font-semibold text-center"
                >
                  Give
                </a>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
