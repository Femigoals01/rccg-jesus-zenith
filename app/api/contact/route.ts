







import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message, type } = body;

    if (!name || !email || !message || !type) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("inbox").insert({
      name,
      email,
      phone: phone || "",
      message,
      type,
      read: false,
      is_public: type !== "prayer",
      is_archived: false,
    });

    if (error) {
      console.error("SUPABASE CONTACT ERROR:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "RCCG Jesus Zenith <no-reply@rccgjesuszenith.org>",
        to: ["rccgjesuszenith@gmail.com"],
        subject: `📩 New ${type.toUpperCase()} Message`,
        html: `
          <strong>Name:</strong> ${name}<br/>
          <strong>Email:</strong> ${email}<br/>
          <strong>Phone:</strong> ${phone || "—"}<br/>
          <strong>Type:</strong> ${type}<br/>
          <p>${message}</p>
        `,
      });

      await resend.emails.send({
        from: "RCCG Jesus Zenith <no-reply@rccgjesuszenith.org>",
        to: [email],
        subject: "We’ve received your message 🙏",
        html: `
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to RCCG Jesus Zenith.</p>
          <p>We have received your message and will respond shortly.</p>
          <p>God bless you.</p>
          <br/>
          <strong>RCCG Jesus Zenith</strong>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CONTACT ERROR:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}