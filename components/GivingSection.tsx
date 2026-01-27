

"use client";

import { useState } from "react";

export default function GivingSection() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="give" className="py-10 px-6 bg-zenithDeep">
      <div className="max-w-4xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Give Unto the Lord
        </h2>

        {/* Giving Purpose */}
        <p className="text-white/85 mb-12 leading-relaxed">
          To give your <strong>Tithes</strong>, <strong>Offerings</strong>, or to
          support <strong>church projects and programs</strong>, kindly use the
          appropriate account details below. Your generosity helps advance the
          work of God and the vision of RCCG Jesus Zenith.
        </p>

        {/* Accounts Wrapper */}
        <div className="space-y-8">

          {/* TITHES & OFFERINGS */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left">
            <h3 className="text-xl font-semibold mb-6 text-zenithGold">
              Tithes & Offerings
            </h3>

            <div className="grid sm:grid-cols-2 gap-6 text-white/85">
              <div>
                <p className="text-sm text-white/60 mb-1">Account Name</p>
                <p className="font-semibold">
                  RCCG JESUS ZENITH
                </p>
              </div>

              <div>
                <p className="text-sm text-white/60 mb-1">Bank</p>
                <p className="font-semibold">
                  United Bank for Africa (UBA)
                </p>
              </div>

              <div>
                <p className="text-sm text-white/60 mb-1">Account Number</p>
                <div className="flex items-center gap-4">
                  <p className="font-semibold tracking-wider text-lg">
                    1029756985
                  </p>
                  <button
                    onClick={() =>
                      copyText("1029756985", "tithe")
                    }
                    className="px-3 py-1 text-sm rounded-md border border-zenithGold text-zenithGold hover:bg-zenithGold hover:text-black transition"
                  >
                    {copied === "tithe" ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-white/60 mb-1">Purpose</p>
                <p className="font-semibold"> Tithe • Offering</p>
              </div>
            </div>
          </div>

          {/* PROJECTS & SUPPORT */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left">
            <h3 className="text-xl font-semibold mb-6 text-zenithGold">
              Projects & Special Support
            </h3>

            <div className="grid sm:grid-cols-2 gap-6 text-white/85">
              <div>
                <p className="text-sm text-white/60 mb-1">Account Name</p>
                <p className="font-semibold">
                  RCCG JESUS ZENITH PROJECT
                </p>
              </div>

              <div>
                <p className="text-sm text-white/60 mb-1">Bank</p>
                <p className="font-semibold">
                  United Bank for Africa (UBA)
                </p>
              </div>

              <div>
                <p className="text-sm text-white/60 mb-1">Account Number</p>
                <div className="flex items-center gap-4">
                  <p className="font-semibold tracking-wider text-lg">
                    1029757212
                  </p>
                  <button
                    onClick={() =>
                      copyText("1029757212", "project")
                    }
                    className="px-3 py-1 text-sm rounded-md border border-zenithGold text-zenithGold hover:bg-zenithGold hover:text-black transition"
                  >
                    {copied === "project" ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-white/60 mb-1">Purpose</p>
                <p className="font-semibold">
                  Church Projects • Programs • Support
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Closing Scripture */}
        <p className="mt-12 text-white/70 text-sm italic">
          “Each of you should give what you have decided in your heart to give,
          not reluctantly or under compulsion, for God loves a cheerful giver.”
          <br />
          <span className="not-italic">— 2 Corinthians 9:7</span>
        </p>

      </div>
    </section>
  );
}
