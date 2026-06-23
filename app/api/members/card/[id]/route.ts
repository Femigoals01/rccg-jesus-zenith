



// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";
// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import { supabase } from "../../../../../lib/supabase";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// export async function GET(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params;

//   const { data: member, error } = await supabase
//     .from("members")
//     .select("*")
//     .eq("id", id)
//     .single();

//   if (error || !member) {
//     return NextResponse.json(
//       { error: "Member not found" },
//       { status: 404 }
//     );
//   }

//   /* ---------------- CREATE PDF ---------------- */
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([400, 250]);
//   const { width, height } = page.getSize();

//   const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

//   const gold = rgb(0.85, 0.65, 0.13);
//   const deepBlue = rgb(0.05, 0.1, 0.25);

//   /* ---------------- BACKGROUND ---------------- */
//   page.drawRectangle({
//     x: 0,
//     y: 0,
//     width,
//     height,
//     color: deepBlue,
//   });

//   /* ---------------- HEADER BAR ---------------- */
//   page.drawRectangle({
//     x: 0,
//     y: height - 50,
//     width,
//     height: 50,
//     color: gold,
//   });

//   /* ---------------- LOGO ---------------- */
//   try {
//     const logoPath = path.join(process.cwd(), "public", "logo.png");

//     if (fs.existsSync(logoPath)) {
//       const logoBytes = fs.readFileSync(logoPath);

//       let logoImage;
//       try {
//         logoImage = await pdfDoc.embedPng(logoBytes);
//       } catch {
//         logoImage = await pdfDoc.embedJpg(logoBytes);
//       }

//       page.drawImage(logoImage, {
//         x: 20,
//         y: height - 45,
//         width: 35,
//         height: 35,
//       });
//     }
//   } catch {
//     console.log("Logo not loaded");
//   }

//   /* ---------------- CHURCH NAME ---------------- */
//   page.drawText("RCCG JESUS ZENITH", {
//     x: 70,
//     y: height - 32,
//     size: 16,
//     font: fontBold,
//     color: rgb(0, 0, 0),
//   });

//   /* ---------------- MEMBER PHOTO ---------------- */
//   if (member.photo) {
//     try {
//       const photoBytes = await fetch(member.photo).then((res) =>
//         res.arrayBuffer()
//       );

//       let photoImage;
//       try {
//         photoImage = await pdfDoc.embedJpg(photoBytes);
//       } catch {
//         photoImage = await pdfDoc.embedPng(photoBytes);
//       }

//       page.drawImage(photoImage, {
//         x: 20,
//         y: 80,
//         width: 90,
//         height: 90,
//       });
//     } catch {
//       console.log("Photo not loaded");
//     }
//   }

//   /* ---------------- MEMBER DETAILS ---------------- */
//   const startY = 170;
//   const gap = 18;

//   page.drawText(`Name: ${member.name || "—"}`, {
//     x: 130,
//     y: startY,
//     size: 11,
//     font,
//     color: rgb(1, 1, 1),
//   });

//   page.drawText(`Email: ${member.email || "—"}`, {
//     x: 130,
//     y: startY - gap,
//     size: 11,
//     font,
//     color: rgb(1, 1, 1),
//   });

//   page.drawText(`Phone: ${member.phone || "—"}`, {
//     x: 130,
//     y: startY - gap * 2,
//     size: 11,
//     font,
//     color: rgb(1, 1, 1),
//   });

//   page.drawText(`Birthday: ${member.birth_day || "—"}/${member.birth_month || "—"}`, {
//     x: 130,
//     y: startY - gap * 3,
//     size: 11,
//     font,
//     color: rgb(1, 1, 1),
//   });

//   page.drawText(`Group: ${member.group_name || "—"}`, {
//     x: 130,
//     y: startY - gap * 4,
//     size: 11,
//     font,
//     color: rgb(1, 1, 1),
//   });

//   page.drawText(`Department: ${member.department || "—"}`, {
//     x: 130,
//     y: startY - gap * 5,
//     size: 11,
//     font,
//     color: rgb(1, 1, 1),
//   });

//   /* ---------------- FOOTER ---------------- */
//   page.drawText("Kingdom Ambassador", {
//     x: 20,
//     y: 30,
//     size: 10,
//     font: fontBold,
//     color: gold,
//   });

//   page.drawText(`Member ID: ${member.id}`, {
//     x: width - 180,
//     y: 30,
//     size: 9,
//     font,
//     color: rgb(1, 1, 1),
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
import QRCode from "qrcode";
import { supabase } from "../../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const { data: member, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !member) {
    return NextResponse.json(
      { error: "Member not found" },
      { status: 404 }
    );
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 250]);
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const gold = rgb(0.85, 0.65, 0.13);
  const deepBlue = rgb(0.05, 0.1, 0.25);

  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: deepBlue,
  });

  page.drawRectangle({
    x: 0,
    y: height - 50,
    width,
    height: 50,
    color: gold,
  });

  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");

    if (fs.existsSync(logoPath)) {
      const logoBytes = fs.readFileSync(logoPath);

      let logoImage;
      try {
        logoImage = await pdfDoc.embedPng(logoBytes);
      } catch {
        logoImage = await pdfDoc.embedJpg(logoBytes);
      }

      page.drawImage(logoImage, {
        x: 20,
        y: height - 45,
        width: 35,
        height: 35,
      });
    }
  } catch {
    console.log("Logo not loaded");
  }

  page.drawText("RCCG JESUS ZENITH", {
    x: 70,
    y: height - 32,
    size: 16,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  if (member.photo) {
    try {
      const photoBytes = await fetch(member.photo).then((res) =>
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
    } catch {
      console.log("Photo not loaded");
    }
  }

  const startY = 170;
  const gap = 18;

  page.drawText(`Name: ${member.name || "—"}`, {
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

  page.drawText(`Phone: ${member.phone || "—"}`, {
    x: 130,
    y: startY - gap * 2,
    size: 11,
    font,
    color: rgb(1, 1, 1),
  });

  page.drawText(
    `Birthday: ${member.birth_day || "—"}/${member.birth_month || "—"}`,
    {
      x: 130,
      y: startY - gap * 3,
      size: 11,
      font,
      color: rgb(1, 1, 1),
    }
  );

  page.drawText(`Group: ${member.group_name || "—"}`, {
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const profileUrl = `${siteUrl}/members/${member.id}`;

  try {
    const qrDataUrl = await QRCode.toDataURL(profileUrl);
    const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
    const qrBytes = Buffer.from(qrBase64, "base64");
    const qrImage = await pdfDoc.embedPng(qrBytes);

    page.drawImage(qrImage, {
      x: width - 80,
      y: 55,
      width: 55,
      height: 55,
    });

    page.drawText("Scan Profile", {
      x: width - 83,
      y: 45,
      size: 7,
      font,
      color: rgb(1, 1, 1),
    });
  } catch {
    console.log("QR not loaded");
  }

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