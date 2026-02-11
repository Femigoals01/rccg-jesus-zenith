

import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Music2,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zenithBlue border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* TOP CONTENT */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">

          {/* Church Identity */}
          <div className="lg:col-span-2 text-center md:text-left">
            <p className="text-lg font-semibold text-white mb-4">
              RCCG Jesus Zenith
            </p>

            <p className="text-white/70 text-sm leading-relaxed flex gap-2 justify-center md:justify-start">
              <MapPin size={16} className="mt-1 text-zenithGold shrink-0" />
              <span>
                Redeemed Christian Church of God – Jesus Zenith<br />
                Crimson School,<br />
                No. 8, Road B, Akilapa, Olowu Estate,<br />
                Isokan, Akobo-Ojurin, Ibadan
              </span>
            </p>

            {/* Contact */}
            <div className="mt-6 space-y-3 text-sm text-white/70">
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Phone size={16} className="text-zenithGold" />
                <a href="tel:+234803231623" className="hover:text-zenithGold">
                  +234 803 2316 623
                </a>
              </p>

              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Mail size={16} className="text-zenithGold" />
                <a
                  href="mailto:info@rccgjesuszenith.org"
                  className="hover:text-zenithGold"
                >
                rccgjesuszenith@gmail.com
                </a>
              </p>
            </div>

            <p className="mt-6 text-sm text-white/60 italic text-center md:text-left">
              “Jesus Christ the same yesterday, today, and forever.”
              <br />
              <span className="not-italic">— Hebrews 13:8</span>
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#about" className="hover:text-zenithGold">About</a></li>
              <li><a href="#pastor" className="hover:text-zenithGold">Pastor</a></li>
              <li><a href="#worship" className="hover:text-zenithGold">Worship</a></li>
              <li><a href="#ministries" className="hover:text-zenithGold">Ministries</a></li>
              <li><a href="/gallery" className="hover:text-zenithGold">Gallery</a></li>
              <li><a href="#give" className="hover:text-zenithGold">Give</a></li>
            </ul>
          </div>

          {/* Service Times */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">
              Service Times
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Sunday Worship — 8:00 AM</li>
              <li>Midweek Service — Wed 5:30 PM</li>
              <li>Special Programs — As Announced</li>
            </ul>
          </div>

          {/* Map (LAST ON MOBILE) */}
          <div className="md:col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold mb-4 text-center md:text-left">
              Find Us
            </h4>

            <div className="w-full h-52 rounded-lg overflow-hidden border border-white/10">
              <iframe
                title="RCCG Jesus Zenith Location"
                src="https://www.google.com/maps?q=Crimson%20School%20Akilapa%20Olowu%20Estate%20Isokan%20Akobo%20Ibadan&output=embed"
                loading="lazy"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col gap-6 items-center md:flex-row md:justify-between">

          <p className="text-sm text-white/60 text-center">
            © {new Date().getFullYear()} RCCG Jesus Zenith. All rights reserved.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4">

            {/* WhatsApp */}
            <a
              href="https://chat.whatsapp.com/IHpvL4uKSCM1395xsyXXBH"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center px-5 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition"
            >
              💬 Join Our WhatsApp Group
            </a>

            {/* Social Icons */}
            <div className="flex gap-3 text-white">
              <a href="https://facebook.com" target="_blank" className="social">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/rccgjesuszenith" target="_blank" className="social">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/@wearerccgjesuszenith" target="_blank" className="social">
                <Youtube size={18} />
              </a>
              <a href="https://www.tiktok.com/@rccg.jesus.zenith" target="_blank" className="social">
                <Music2 size={18} />
              </a>
              <a href="https://x.com/RCCGJesusZenith" target="_blank" className="social">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
