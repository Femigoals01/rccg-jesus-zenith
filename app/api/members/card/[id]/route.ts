


// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// export const runtime = "nodejs";

// const membersPath = path.join(process.cwd(), "data/members.json");

// export async function GET(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;

//   if (!fs.existsSync(membersPath)) {
//     return NextResponse.json({ error: "No members found" }, { status: 404 });
//   }

//   const members = JSON.parse(fs.readFileSync(membersPath, "utf-8"));
//   const member = members.find((m: any) => m.id === id);

//   if (!member) {
//     return NextResponse.json({ error: "Member not found" }, { status: 404 });
//   }

//   /* ---------------- CREATE PDF ---------------- */
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([350, 220]);
//   const { width, height } = page.getSize();

//   const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

//   /* ---------------- BACKGROUND ---------------- */
//   page.drawRectangle({
//     x: 0,
//     y: 0,
//     width,
//     height,
//     color: rgb(0.05, 0.1, 0.25), // Deep blue
//   });

//   /* ---------------- GOLD HEADER ---------------- */
//   page.drawRectangle({
//     x: 0,
//     y: height - 40,
//     width,
//     height: 40,
//     color: rgb(0.8, 0.65, 0),
//   });

//   page.drawText("RCCG JESUS ZENITH", {
//     x: 20,
//     y: height - 28,
//     size: 14,
//     font: fontBold,
//     color: rgb(0, 0, 0),
//   });

//   /* ---------------- MEMBER PHOTO ---------------- */
//   if (member.photo) {
//     const photoBytes = await fetch(member.photo).then(res => res.arrayBuffer());
//     const photoImage = await pdfDoc.embedJpg(photoBytes).catch(async () =>
//       pdfDoc.embedPng(photoBytes)
//     );

//     page.drawImage(photoImage, {
//       x: 20,
//       y: 70,
//       width: 70,
//       height: 70,
//     });
//   }

//   /* ---------------- MEMBER DETAILS ---------------- */
//   page.drawText(`Name: ${member.name}`, {
//     x: 110,
//     y: 150,
//     size: 10,
//     font,
//     color: rgb(1, 1, 1),
//   });

//   page.drawText(`Email: ${member.email || "—"}`, {
//     x: 110,
//     y: 135,
//     size: 10,
//     font,
//     color: rgb(1, 1, 1),
//   });

//   page.drawText(`Phone: ${member.phone}`, {
//     x: 110,
//     y: 120,
//     size: 10,
//     font,
//     color: rgb(1, 1, 1),
//   });

//   page.drawText(
//     `Birthday: ${member.birthDay}/${member.birthMonth}`,
//     {
//       x: 110,
//       y: 105,
//       size: 10,
//       font,
//       color: rgb(1, 1, 1),
//     }
//   );

//   page.drawText(`Group: ${member.group || "—"}`, {
//   x: 110,
//   y: 90,
//   size: 10,
//   font,
//   color: rgb(1, 1, 1),
// });

// page.drawText(`Department: ${member.department || "—"}`, {
//   x: 110,
//   y: 75,
//   size: 10,
//   font,
//   color: rgb(1, 1, 1),
// });


//   /* ---------------- FOOTER ---------------- */
//   page.drawText("Kingdom Ambassador", {
//     x: 20,
//     y: 30,
//     size: 9,
//     font: fontBold,
//     color: rgb(0.8, 0.65, 0),
//   });

//   const pdfBytes = await pdfDoc.save();
//   const buffer = Buffer.from(pdfBytes);

//   return new NextResponse(buffer, {
//     headers: {
//       "Content-Type": "application/pdf",
//       "Content-Disposition": `inline; filename="membership-card-${id}.pdf"`,
//     },
//   });
// }


import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const runtime = "nodejs";

const membersPath = path.join(process.cwd(), "data/members.json");

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!fs.existsSync(membersPath)) {
    return NextResponse.json({ error: "No members found" }, { status: 404 });
  }

  const members = JSON.parse(fs.readFileSync(membersPath, "utf-8"));
  const member = members.find((m: any) => m.id === id);

  if (!member) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  /* ---------------- CREATE PDF ---------------- */
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 250]);
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const gold = rgb(0.85, 0.65, 0.13);
  const deepBlue = rgb(0.05, 0.1, 0.25);

  /* ---------------- BACKGROUND ---------------- */
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: deepBlue,
  });

  /* ---------------- HEADER BAR ---------------- */
  page.drawRectangle({
    x: 0,
    y: height - 50,
    width,
    height: 50,
    color: gold,
  });

  /* ---------------- LOGO ---------------- */
  try {
    const logoPath = path.join(process.cwd(), "public/logo.png");
    if (fs.existsSync(logoPath)) {
      const logoBytes = fs.readFileSync(logoPath);
      const logoImage = await pdfDoc.embedPng(logoBytes);

      page.drawImage(logoImage, {
        x: 20,
        y: height - 45,
        width: 35,
        height: 35,
      });
    }
  } catch (err) {
    console.log("Logo not loaded");
  }

  /* ---------------- CHURCH NAME ---------------- */
  page.drawText("RCCG JESUS ZENITH", {
    x: 70,
    y: height - 32,
    size: 16,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  /* ---------------- MEMBER PHOTO ---------------- */
  if (member.photo) {
    try {
      const photoBytes = await fetch(member.photo).then(res =>
        res.arrayBuffer()
      );

      let photoImage;

      try {
        photoImage = await pdfDoc.embedJpg(photoBytes);
      } catch {
        photoImage = await pdfDoc.embedPng(photoBytes);
      }

      page.drawImage(photoImage, {
        x: 20,
        y: 80,
        width: 90,
        height: 90,
      });
    } catch (err) {
      console.log("Photo not loaded");
    }
  }

  /* ---------------- MEMBER DETAILS ---------------- */
  const startY = 170;
  const gap = 18;

  page.drawText(`Name: ${member.name}`, {
    x: 130,
    y: startY,
    size: 11,
    font,
    color: rgb(1, 1, 1),
  });

  page.drawText(`Email: ${member.email || "—"}`, {
    x: 130,
    y: startY - gap,
    size: 11,
    font,
    color: rgb(1, 1, 1),
  });

  page.drawText(`Phone: ${member.phone}`, {
    x: 130,
    y: startY - gap * 2,
    size: 11,
    font,
    color: rgb(1, 1, 1),
  });

  page.drawText(
    `Birthday: ${member.birthDay}/${member.birthMonth}`,
    {
      x: 130,
      y: startY - gap * 3,
      size: 11,
      font,
      color: rgb(1, 1, 1),
    }
  );

  page.drawText(`Group: ${member.group || "—"}`, {
    x: 130,
    y: startY - gap * 4,
    size: 11,
    font,
    color: rgb(1, 1, 1),
  });

  page.drawText(`Department: ${member.department || "—"}`, {
    x: 130,
    y: startY - gap * 5,
    size: 11,
    font,
    color: rgb(1, 1, 1),
  });

  /* ---------------- FOOTER ---------------- */
  page.drawText("Kingdom Ambassador", {
    x: 20,
    y: 30,
    size: 10,
    font: fontBold,
    color: gold,
  });

  page.drawText(`Member ID: ${member.id}`, {
    x: width - 180,
    y: 30,
    size: 9,
    font,
    color: rgb(1, 1, 1),
  });

  const pdfBytes = await pdfDoc.save();
  const buffer = Buffer.from(pdfBytes);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="membership-card-${id}.pdf"`,
    },
  });
}
