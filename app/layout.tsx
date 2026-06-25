

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
//      "RCCG Akobo",
//     "Church in Ibadan",
//     "Church near me",
//     "RCCG Ibadan",
//     "Pentecostal Church",
//     "Prayer Request",
//     "Christian Fellowship",
//     "Sunday Service",
//     "Bible Study",
//   ],
//   authors: [{ name: "RCCG Jesus Zenith" }],
//   creator: "RCCG Jesus Zenith",

//   metadataBase: new URL("https://www.rccgjesuszenith.org"),

//   openGraph: {
//     title: "RCCG Jesus Zenith",
//     description:
//       "Raising a Zenith Generation in Christ. Join us for worship and the Word at Isokan Estate, Akobo, Ibadan.",
//     url: "https://www.rccgjesuszenith.org",
//     siteName: "RCCG Jesus Zenith",
//     images: [
//       {
//         url: "/og-image.png",
//         width: 1200,
//         height: 630,
//         alt: "RCCG Jesus Zenith Church",
//       },
//     ],
//     locale: "en_NG",
//     type: "website",
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "RCCG Jesus Zenith",
//     description:
//       "Raising a Zenith Generation in Christ. A parish of the Redeemed Christian Church of God in Akobo, Ibadan.",
//     images: ["/og-image.png"],
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       {/* ✅ Fix hydration mismatch caused by browser extensions */}
//       <body className="antialiased" suppressHydrationWarning>
//         {children}

//         {/* ✅ Structured Data for Church (SEO) */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "Church",
//               name: "RCCG Jesus Zenith",
//               address: {
//                 "@type": "PostalAddress",
//                 addressLocality: "Akobo",
//                 addressRegion: "Ibadan",
//                 addressCountry: "NG",
//               },
//               denomination: "Redeemed Christian Church of God",
//               url: "https://www.rccgjesuszenith.org",
//             }),
//           }}
//         />
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
    "RCCG Jesus Zenith is a Word-centered parish of the Redeemed Christian Church of God in Isokan Estate, Akobo, Ibadan, committed to raising a Zenith Generation in Christ through worship, prayer, discipleship and kingdom impact.",
  keywords: [
    "RCCG Jesus Zenith",
    "RCCG Akobo",
    "RCCG Ibadan",
    "RCCG church in Akobo",
    "Church in Akobo Ibadan",
    "Church in Ibadan",
    "Church near me in Ibadan",
    "Pentecostal Church Ibadan",
    "Redeemed Christian Church of God Ibadan",
    "Sunday Service Akobo",
    "Bible Study Ibadan",
    "Prayer Request Ibadan",
    "Christian Fellowship Ibadan",
    "Food Bank Ibadan",
    "Youth Church Ibadan",
  ],
  authors: [{ name: "RCCG Jesus Zenith" }],
  creator: "RCCG Jesus Zenith",
  publisher: "RCCG Jesus Zenith",
  category: "Church",

  metadataBase: new URL("https://www.rccgjesuszenith.com"),

  alternates: {
    canonical: "https://www.rccgjesuszenith.com",
  },

  openGraph: {
    title: "RCCG Jesus Zenith | Akobo, Ibadan",
    description:
      "Raising a Zenith Generation in Christ. Join RCCG Jesus Zenith for worship, prayer and the Word at Isokan Estate, Akobo, Ibadan.",
    url: "https://www.rccgjesuszenith.com",
    siteName: "RCCG Jesus Zenith",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RCCG Jesus Zenith Church in Akobo Ibadan",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RCCG Jesus Zenith | Akobo, Ibadan",
    description:
      "A Word-centered RCCG parish in Akobo, Ibadan raising a Zenith Generation in Christ.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const churchSchema = {
    "@context": "https://schema.com",
    "@type": "Church",
    name: "RCCG Jesus Zenith",
    alternateName: "Redeemed Christian Church of God Jesus Zenith",
    description:
      "A Word-centered parish of the Redeemed Christian Church of God in Isokan Estate, Akobo, Ibadan.",
    url: "https://www.rccgjesuszenith.com",
    logo: "https://www.rccgjesuszenith.com/logo.png",
    image: "https://www.rccgjesuszenith.com/og-image.png",
    denomination: "Redeemed Christian Church of God",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Crimson School, No. 8, Road B, Akilapa, Olowu Estate, Isokan",
      addressLocality: "Akobo-Ojurin",
      addressRegion: "Ibadan",
      addressCountry: "NG",
    },
    areaServed: ["Akobo", "Ibadan", "Oyo State", "Nigeria"],
    sameAs: ["https://linktr.ee/rccgjesuszenith"],
  };

  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(churchSchema),
          }}
        />
      </body>
    </html>
  );
}