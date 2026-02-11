

// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// const filePath = path.join(process.cwd(), "data/members.json");

// /* ---------------- HELPERS ---------------- */

// function readMembers(): any[] {
//   if (!fs.existsSync(filePath)) return [];
//   return JSON.parse(fs.readFileSync(filePath, "utf-8"));
// }

// function writeMembers(data: any[]) {
//   fs.mkdirSync(path.dirname(filePath), { recursive: true });
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// }

// /* ---------------- CREATE MEMBER ---------------- */
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//   name,
//   email,
//   address,
//   phone,
//   birthDay,
//   birthMonth,
//   anniversary,
//   group,
//   department,
//   photo,
//   photoId,
// } = body;


//     // ✅ REQUIRED FIELDS
//     if (!name || !email || !phone || !birthDay || !birthMonth) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const members = readMembers();

//     // OPTIONAL: prevent duplicate registration by phone/email
//     const exists = members.find(
//       (m) => m.phone === phone || m.email === email
//     );
//     if (exists) {
//       return NextResponse.json(
//         { error: "Member already exists" },
//         { status: 409 }
//       );
//     }

//     const newMember = {
//       id: Date.now().toString(),
//       name,
//       email, // ✅ NOW SAVED
//       address: address || "",
//       phone,
//       birthDay: Number(birthDay),
//       birthMonth: Number(birthMonth),
//       anniversary: anniversary || "",
//       group: group || "",
//       department: department || "",
//       photo: photo || "",
//       photoId: photoId || "",
//       isActive: true,
//       createdAt: new Date().toISOString(),
//     };

//     members.unshift(newMember);
//     writeMembers(members);

//     // ✅ IMPORTANT: return member for redirect/profile/card
//     return NextResponse.json({
//       success: true,
//       member: newMember,
//     });
//   } catch (err) {
//     console.error("MEMBERSHIP ERROR:", err);
//     return NextResponse.json(
//       { error: "Failed to save member" },
//       { status: 500 }
//     );
//   }
// }

// /* ---------------- LIST MEMBERS (ADMIN) ---------------- */
// export async function GET() {
//   return NextResponse.json(readMembers(), {
//     headers: {
//       "Cache-Control": "no-store",
//     },
//   });
// }


// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import QRCode from "qrcode";
// import { Resend } from "resend";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// const resend = new Resend(process.env.RESEND_API_KEY);
// const filePath = path.join(process.cwd(), "data/members.json");

// function readMembers() {
//   if (!fs.existsSync(filePath)) return [];
//   return JSON.parse(fs.readFileSync(filePath, "utf-8"));
// }

// function writeMembers(data: any[]) {
//   fs.mkdirSync(path.dirname(filePath), { recursive: true });
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// }

// /* ---------------- CREATE MEMBER ---------------- */
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const {
//       name,
//       email,
//       address,
//       phone,
//       birthDay,
//       birthMonth,
//       anniversary,
//       group,
//       department,
//       photo,
//       photoId,
//     } = body;

//     if (!name || !email || !phone || !birthDay || !birthMonth) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const members = readMembers();

//     const newMember = {
//       id: Date.now().toString(),
//       name,
//       email,
//       address: address || "",
//       phone,
//       birthDay: Number(birthDay),
//       birthMonth: Number(birthMonth),
//       anniversary: anniversary || "",
//       group: group || "",
//       department: department || "",
//       photo: photo || "",
//       photoId: photoId || "",
//       isActive: true,
//       createdAt: new Date().toISOString(),
//     };

//     members.unshift(newMember);
//     writeMembers(members);

//     /* ---------------- GENERATE QR CODE ---------------- */
//     const profileUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/members/${newMember.id}`;
//     const qrImage = await QRCode.toDataURL(profileUrl);
//     const qrBytes = Buffer.from(
//       qrImage.replace(/^data:image\/png;base64,/, ""),
//       "base64"
//     );

//     /* ---------------- GENERATE CARD PDF ---------------- */
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([400, 250]);
//     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
//     const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

//     page.drawText("RCCG JESUS ZENITH", {
//       x: 120,
//       y: 210,
//       size: 16,
//       font: fontBold,
//     });

//     page.drawText(`Name: ${newMember.name}`, { x: 20, y: 170, size: 11, font });
//     page.drawText(`Email: ${newMember.email}`, { x: 20, y: 155, size: 11, font });
//     page.drawText(`Phone: ${newMember.phone}`, { x: 20, y: 140, size: 11, font });
//     page.drawText(`Group: ${newMember.group}`, { x: 20, y: 125, size: 11, font });
//     page.drawText(`Department: ${newMember.department}`, { x: 20, y: 110, size: 11, font });

//     const qrEmbed = await pdfDoc.embedPng(qrBytes);
//     page.drawImage(qrEmbed, {
//       x: 260,
//       y: 90,
//       width: 100,
//       height: 100,
//     });

//     const pdfBytes = await pdfDoc.save();
//     const pdfBuffer = Buffer.from(pdfBytes);

//     /* ---------------- EMAIL MEMBER ---------------- */
//     await resend.emails.send({
//       from: "RCCG Jesus Zenith <no-reply@rccgjesuszenith.org>",
//       to: [newMember.email],
//       subject: "🎉 Welcome to RCCG Jesus Zenith",
//       html: `
//         <h2>Welcome ${newMember.name}</h2>
//         <p>Your membership registration was successful.</p>
//         <p>You can access your profile here:</p>
//         <a href="${profileUrl}">${profileUrl}</a>
//         <p>Your membership card is attached.</p>
//       `,
//       attachments: [
//         {
//           filename: "membership-card.pdf",
//           content: pdfBuffer,
//         },
//       ],
//     });

//     return NextResponse.json({ success: true, member: newMember });
//   } catch (err) {
//     console.error("MEMBERSHIP ERROR:", err);
//     return NextResponse.json(
//       { error: "Failed to save member" },
//       { status: 500 }
//     );
//   }
// }

// /* ---------------- LIST MEMBERS ---------------- */
// export async function GET() {
//   return NextResponse.json(readMembers(), {
//     headers: { "Cache-Control": "no-store" },
//   });
// }




import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "data/members.json");

function readMembers() {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeMembers(data: any[]) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/* ---------------- CREATE MEMBER ---------------- */
export async function POST(req: Request) {
  const body = await req.json();

  const {
    name,
    email,
    address,
    phone,
    birthDay,
    birthMonth,
    anniversary,
    group,
    department,
    photo,
    photoId,
  } = body;

  if (!name || !email || !phone || !birthDay || !birthMonth) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const members = readMembers();

  const newMember = {
    id: Date.now().toString(),
    name,
    email,
    address: address || "",
    phone,
    birthDay: Number(birthDay),
    birthMonth: Number(birthMonth),
    anniversary: anniversary || "",
    group: group || "",
    department: department || "",
    photo: photo || "",
    photoId: photoId || "",
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  members.unshift(newMember);
  writeMembers(members);

  return NextResponse.json({ success: true, member: newMember });
}

/* ---------------- UPDATE MEMBER ---------------- */
export async function PUT(req: Request) {
  const body = await req.json();
  const members = readMembers();

  const index = members.findIndex((m: any) => m.id === body.id);

  if (index === -1) {
    return NextResponse.json(
      { error: "Member not found" },
      { status: 404 }
    );
  }

  members[index] = {
    ...members[index],
    ...body,
  };

  writeMembers(members);

  return NextResponse.json({ success: true });
}

/* ---------------- DELETE MEMBER ---------------- */
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const members = readMembers();

  const filtered = members.filter((m: any) => m.id !== id);

  writeMembers(filtered);

  return NextResponse.json({ success: true });
}

/* ---------------- GET ALL MEMBERS ---------------- */
export async function GET() {
  return NextResponse.json(readMembers(), {
    headers: { "Cache-Control": "no-store" },
  });
}
