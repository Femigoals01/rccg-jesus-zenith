

import { NextResponse } from "next/server";

let notified = false; // memory flag (safe for now)

export async function GET() {
  if (notified) {
    return NextResponse.json({ skipped: true });
  }

  notified = true;

  const message = encodeURIComponent(
    "🔴 *SERVICE IS LIVE*\n\n" +
    "📖 Digging Deep\n" +
    "🏛 RCCG Jesus Zenith\n\n" +
    "Join us now!"
  );

  return NextResponse.json({
    whatsapp: `https://wa.me/?text=${message}`,
  });
}
