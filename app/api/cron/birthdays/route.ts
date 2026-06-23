

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  const { data: members, error } = await supabase
    .from("members")
    .select("*")
    .eq("birth_day", day)
    .eq("birth_month", month);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!members || members.length === 0) {
    return NextResponse.json({
      success: true,
      message: "No birthdays today",
    });
  }

  if (process.env.RESEND_API_KEY) {
    for (const member of members) {
      if (!member.email) continue;

      await resend.emails.send({
        from: "RCCG Jesus Zenith <no-reply@rccgjesuszenith.org>",
        to: [member.email],
        subject: "🎉 Happy Birthday from RCCG Jesus Zenith",
        html: `
          <p>Dear ${member.name},</p>
          <p>Happy Birthday! 🎉</p>
          <p>We celebrate God's faithfulness over your life today.</p>
          <p>May this new year bring you joy, strength, favour, and a deeper walk with Christ.</p>
          <br/>
          <strong>RCCG Jesus Zenith</strong>
        `,
      });
    }
  }

  const pastorText = encodeURIComponent(
    `🎉 Birthday Reminder\n\nToday:\n${members
      .map((m) => `- ${m.name} (${m.phone || "No phone"})`)
      .join("\n")}`
  );

  return NextResponse.json({
    success: true,
    count: members.length,
    whatsapp: `https://wa.me/2348032316623?text=${pastorText}`,
  });
}