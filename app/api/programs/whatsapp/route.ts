import { NextResponse } from "next/server";

export async function GET() {
  const msg = encodeURIComponent(
    "🔔 *RCCG Jesus Zenith*\n\n" +
    "📖 *Digging Deep*\n" +
    "⏰ *LIVE NOW*\n\n" +
    "Join us and be blessed.\n\n" +
    "📍 Isokan Estate, Akobo, Ibadan"
  );

  return NextResponse.json({
    url: `https://wa.me/?text=${msg}`,
  });
}
