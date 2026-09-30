import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SovereignGodGenerator from "../../components/SovereignGodGenerator";

export const metadata: Metadata = {
  title: "Sovereign God Choir Concert",
  description:
    "Join RCCG Jesus Zenith for Sovereign God, a special choir concert in Akobo-Ojurin, Ibadan. Create your personalized I Will Be Attending card.",
  openGraph: {
    title: "Sovereign God | RCCG Jesus Zenith",
    description:
      "Sovereign God Choir Concert — Sunday, October 11 at 11AM. Create your personalized attendance card and join us.",
    images: ["/sovereign-god.jpg"],
  },
};

export default function SovereignGodPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zenithDeep text-white">

        {/* =========================================
            EVENT HERO
        ========================================= */}

        <section className="relative overflow-hidden pt-28">

          {/* Decorative glows */}
          <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-yellow-400/10 blur-[120px]" />
          <div className="pointer-events-none absolute -right-32 top-40 h-96 w-96 rounded-full bg-pink-600/10 blur-[120px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">

            {/* CONTENT */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zenithGold/30 bg-zenithGold/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-zenithGold" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-zenithGold">
                  Jesus Zenith Choir Concert
                </span>
              </div>

              <h1 className="max-w-2xl text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">
                SOVEREIGN
                <span className="block text-[#ed007a]">
                  GOD
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                An atmosphere of worship, music and celebration as
                voices rise together in honour of the Sovereign God.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                  <span className="block text-xs uppercase tracking-wider text-white/40">
                    Date
                  </span>

                  <strong className="mt-1 block">
                    Sunday, October 11
                  </strong>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
                  <span className="block text-xs uppercase tracking-wider text-white/40">
                    Time
                  </span>

                  <strong className="mt-1 block">
                    11:00 AM
                  </strong>
                </div>

              </div>

              <p className="mt-6 max-w-lg text-sm leading-6 text-white/50">
                Crimson School, No. 8 Road B, Akinlapa Olowu Estate,
                Isokan, Akobo-Ojurin, Ibadan.
              </p>

              <a
                href="#create-card"
                className="mt-9 inline-flex items-center rounded-xl bg-zenithGold px-7 py-4 font-bold text-black transition hover:brightness-105"
              >
                Create My “I’m Attending” Card
                <span className="ml-3">↓</span>
              </a>
            </div>

            {/* ORIGINAL FLYER */}
            <div className="relative mx-auto w-full max-w-md">

              <div className="absolute inset-8 rounded-full bg-zenithGold/20 blur-[90px]" />

              <div className="relative rotate-[1.5deg] overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-2 shadow-[0_35px_100px_rgba(0,0,0,0.55)] transition duration-500 hover:rotate-0">

                <img
                  src="/sovereign-god.jpg"
                  alt="Sovereign God Choir Concert at RCCG Jesus Zenith"
                  className="h-auto w-full rounded-[24px]"
                />

              </div>

              <div className="absolute -bottom-5 -left-5 rounded-2xl border border-white/10 bg-black/80 px-5 py-4 shadow-xl backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Featuring
                </p>

                <p className="mt-1 text-sm font-bold text-white">
                  Lara Glorious & Choirs
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================
            GENERATOR
        ========================================= */}

        <div
          id="create-card"
          className="scroll-mt-24 border-t border-white/10"
        >
          <SovereignGodGenerator />
        </div>

      </main>

      <Footer />
    </>
  );
}