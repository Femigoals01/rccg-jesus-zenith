// import "./globals.css";

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: {
//     default: "RCCG Jesus Zenith | Isokan Estate, Akobo, Ibadan",
//     template: "%s | RCCG Jesus Zenith",
//   },
//   description:
//     "Redeemed Christian Church of God (RCCG) Jesus Zenith is a Word-centered parish in Isokan Estate, Akobo, Ibadan, committed to raising a Zenith generation in Christ.",
//   keywords: [
//     "RCCG",
//     "RCCG Jesus Zenith",
//     "Church in Akobo Ibadan",
//     "Christian Church Ibadan",
//     "Redeemed Christian Church of God",
//     "Pentecostal Church Nigeria",
//   ],
//   authors: [{ name: "RCCG Jesus Zenith" }],
//   creator: "RCCG Jesus Zenith",
//   metadataBase: new URL("https://www.rccgjesuszenith.org"), // change when deployed
// };


// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "RCCG Jesus Zenith | Isokan Estate, Akobo, Ibadan",
    template: "%s | RCCG Jesus Zenith",
  },
  description:
    "Redeemed Christian Church of God (RCCG) Jesus Zenith is a Word-centered parish in Isokan Estate, Akobo, Ibadan, committed to raising a Zenith generation in Christ.",
  keywords: [
    "RCCG",
    "RCCG Jesus Zenith",
    "Church in Akobo Ibadan",
    "Christian Church Ibadan",
    "Redeemed Christian Church of God",
    "Pentecostal Church Nigeria",
  ],
  authors: [{ name: "RCCG Jesus Zenith" }],
  creator: "RCCG Jesus Zenith",

  // Update this when you deploy
  metadataBase: new URL("https://www.rccgjesuszenith.org"),

  // ✅ Open Graph (WhatsApp / Facebook / LinkedIn)
  openGraph: {
    title: "RCCG Jesus Zenith",
    description:
      "Raising a Zenith Generation in Christ. Join us for worship and the Word at Isokan Estate, Akobo, Ibadan.",
    url: "https://www.rccgjesuszenith.org",
    siteName: "RCCG Jesus Zenith",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RCCG Jesus Zenith Church",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  // ✅ Twitter / X preview
  twitter: {
    card: "summary_large_image",
    title: "RCCG Jesus Zenith",
    description:
      "Raising a Zenith Generation in Christ. A parish of the Redeemed Christian Church of God in Akobo, Ibadan.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}

        {/* ✅ Structured Data for Church (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              name: "RCCG Jesus Zenith",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Akobo",
                addressRegion: "Ibadan",
                addressCountry: "NG",
              },
              denomination: "Redeemed Christian Church of God",
              url: "https://www.rccgjesuszenith.org",
            }),
          }}
        />
      </body>
    </html>
  );
}
