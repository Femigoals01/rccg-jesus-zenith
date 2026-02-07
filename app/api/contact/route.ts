



// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// const filePath = path.join(process.cwd(), "data/inbox.json");

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { name, email, message, type } = body;

//     if (!name || !email || !message || !type) {
//       return NextResponse.json(
//         { error: "Missing fields" },
//         { status: 400 }
//       );
//     }

//     const newMessage = {
//       id: crypto.randomUUID(),
//       name,
//       email,
//       message,
//       type,
//       isPublic: type !== "prayer",
//       read: false,
//       date: new Date().toISOString(),
//     };

//     fs.mkdirSync(path.dirname(filePath), { recursive: true });

//     const existing = fs.existsSync(filePath)
//       ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
//       : [];

//     existing.unshift(newMessage);

//     fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("CONTACT ERROR:", error);
//     return NextResponse.json(
//       { error: "Failed to save message" },
//       { status: 500 }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// const inboxPath = path.join(process.cwd(), "data/inbox.json");

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name, email, phone, message, type } = body;

//     if (!name || !email || !message || !type) {
//       return NextResponse.json(
//         { error: "Missing fields" },
//         { status: 400 }
//       );
//     }

//     const newMessage = {
//       id: Date.now().toString(),
//       name,
//       email,
//       phone,
//       message,
//       type,
//       isRead: false,
//       isArchived: false,
//       isPublic: type !== "prayer",
//       date: new Date().toISOString(),
//     };

//     // Save to inbox
//     let inbox: any[] = [];
//     if (fs.existsSync(inboxPath)) {
//       inbox = JSON.parse(fs.readFileSync(inboxPath, "utf-8"));
//     }

//     inbox.unshift(newMessage);
//     fs.mkdirSync(path.dirname(inboxPath), { recursive: true });
//     fs.writeFileSync(inboxPath, JSON.stringify(inbox, null, 2));


//     const whatsappText = encodeURIComponent(
//   `📢 New ${type.toUpperCase()} Message\n\nFrom: ${name}\n\n${message.slice(0, 200)}`
// );

// fetch(
//   `https://wa.me/2348032316623?text=${whatsappText}`
// ).catch(() => {});


//     /* ---------------- ADMIN EMAIL ---------------- */
//     await resend.emails.send({
//       from: "RCCG Jesus Zenith <no-reply@rccgjesuszenith.org>",
//       to: ["rccgjesuszenith@gmail.com"],
//       subject: `📩 New ${type.toUpperCase()} Message`,
//       html: `
//         <strong>Name:</strong> ${name}<br/>
//         <strong>Email:</strong> ${email}<br/>
//         <strong>Type:</strong> ${type}<br/>
//         <p>${message}</p>
//       `,
//     });

//     /* ---------------- AUTO-REPLY ---------------- */
//     await resend.emails.send({
//       from: "RCCG Jesus Zenith <no-reply@rccgjesuszenith.org>",
//       to: [email],
//       subject: "We’ve received your message 🙏",
//       html: `
//         <p>Dear ${name},</p>
//         <p>Thank you for reaching out to RCCG Jesus Zenith.</p>
//         <p>We have received your message and will respond shortly.</p>
//         <p>God bless you.</p>
//         <br/>
//         <strong>RCCG Jesus Zenith</strong>
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("CONTACT ERROR:", err);
//     return NextResponse.json(
//       { error: "Failed to send message" },
//       { status: 500 }
//     );
//   }
// }





import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY!);

// 📁 Local inbox storage
const inboxPath = path.join(process.cwd(), "data/inbox.json");

// ☎️ Pastor WhatsApp (international format)
const PASTOR_WHATSAPP = "2348032316623";

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, type } = await req.json();

    if (!name || !email || !message || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    /* ---------------- SAVE TO ADMIN INBOX ---------------- */
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || "",
      message,
      type,
      isRead: false,
      isArchived: false,
      isPublic: type !== "prayer", // 🔒 prayers are private
      date: new Date().toISOString(),
    };

    let inbox: any[] = [];

    if (fs.existsSync(inboxPath)) {
      inbox = JSON.parse(fs.readFileSync(inboxPath, "utf-8"));
    }

    inbox.unshift(newMessage);

    fs.mkdirSync(path.dirname(inboxPath), { recursive: true });
    fs.writeFileSync(inboxPath, JSON.stringify(inbox, null, 2));

    /* ---------------- ADMIN EMAIL ---------------- */
    await resend.emails.send({
      from: "RCCG Jesus Zenith <no-reply@rccgjesuszenith.org>",
      to: ["rccgjesuszenith@gmail.com"],
      subject: `📩 New ${type.toUpperCase()} Message`,
      html: `
        <h2>New ${type.toUpperCase()} Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    /* ---------------- AUTO-REPLY TO USER ---------------- */
    await resend.emails.send({
      from: "RCCG Jesus Zenith <no-reply@rccgjesuszenith.org>",
      to: [email],
      subject: "🙏 We’ve received your message",
      html: `
        <p>Dear ${name},</p>

        <p>Thank you for reaching out to <strong>RCCG Jesus Zenith</strong>.</p>

        <p>We have received your message and our team will respond shortly.</p>

        <p>May the Lord bless you richly.</p>

        <p>
          <strong>RCCG Jesus Zenith</strong><br/>
          Raising a Zenith Generation in Christ
        </p>
      `,
    });

    /* ---------------- WHATSAPP ALERT ---------------- */
    const whatsappText = encodeURIComponent(
      `📢 New ${type.toUpperCase()} Message\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        (phone ? `Phone: ${phone}\n` : "") +
        `Message:\n${message.substring(0, 500)}`
    );

    // 🔕 Fire-and-forget (no blocking)
    fetch(`https://wa.me/${PASTOR_WHATSAPP}?text=${whatsappText}`).catch(
      () => {}
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
