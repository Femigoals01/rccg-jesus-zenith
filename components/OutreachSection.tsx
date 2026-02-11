

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function OutreachSection() {
  return (
    <section id="outreach" className="py-28 px-6 bg-zenithBlue">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zenithGold">
            Outreach & Evangelism
          </h2>
          <p className="text-white/80 text-lg">
            Extending the love of Christ beyond the church walls through action,
            compassion, and the Gospel.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — TEXT + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">
              Reaching Lives, Transforming Communities
            </h3>

            <p className="text-white/85 leading-relaxed mb-6">
              At RCCG Jesus Zenith, outreach is a lifestyle. Through evangelism,
              community service, and targeted outreach programs, we bring hope,
              healing, and salvation to lives within and beyond our environment.
            </p>

            <p className="text-white/75 leading-relaxed mb-6">
              Our outreach efforts include neighborhood evangelism, charity
              outreaches, prayer walks, and special community interventions.
            </p>

            <p className="italic text-white/70 mb-8">
              “Go ye therefore, and teach all nations…”
              <span className="block text-sm not-italic mt-1">
                — Matthew 28:19
              </span>
            </p>

            <h1 className="text-bold text-4xl  text-zenithGold">Watchout</h1>

            {/* CTA Buttons */}
            {/* <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="px-6 py-3 bg-zenithGold text-black font-semibold rounded-md"
              >
                Join Our Outreach
              </a>

              <a
                href="#give"
                className="px-6 py-3 border border-white/30 rounded-md hover:border-zenithGold transition text-white"
              >
                Support Outreach
              </a>
            </div> */}
          </motion.div>

          {/* RIGHT — IMAGES */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="relative h-48 rounded-xl overflow-hidden">
              <Image
                src="/prison1.jpg"
                alt="Community Outreach"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative h-48 rounded-xl overflow-hidden">
              <Image
                src="/hospt2.jpg"
                alt="Evangelism Outreach"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative col-span-2 h-56 rounded-xl overflow-hidden">
              <Image
                src="/ophan2.jpg"
                alt="RCCG Jesus Zenith Outreach"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* MONTHLY HIGHLIGHTS */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold mb-10 text-center text-white">
            Outreach Highlights
          </h3>

          <div className="grid md:grid-cols-3 gap-8 text-zenithGold">
            {[
              {
                title: "April Outreach",
                desc: "Charity support and gospel outreach to local families.",
              },
              {
                title: "September Outreach",
                desc: "Ophanage/Hospital/Prison Visitation.",
              },
              {
                title: "December Outreach",
                desc: "Street outreach.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* VIDEO RECAP */}
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold mb-6 text-white">
            Outreach Video Recap
          </h3>

          <div className="max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden border border-white/10">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="Outreach Video"
              className="w-full h-full"
              allowFullScreen
            />
          </div>

          <p className="text-sm text-white/60 mt-4">
            Watch highlights from our recent outreach programs.
          </p>
        </div>

        {/* GALLERY LINK */}
        <div className="mt-10 text-center">
          <a
            href="/outreach"
            className="inline-block px-8 py-3 bg-white/10 border border-white/20 rounded-md hover:border-zenithGold transition text-zenithGold"
          >
            View Outreach Gallery →
          </a>
        </div>

      </div>
    </section>
  );
}
