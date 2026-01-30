


// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export const runtime = "nodejs"; // ❗ NOT edge
// export const dynamic = "force-dynamic"; // ❗ disable caching

// const filePath = path.join(process.cwd(), "data/next-program.json");

// export async function GET() {
//   if (!fs.existsSync(filePath)) {
//     return NextResponse.json(null, { status: 200 });
//   }

//   const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

//   return NextResponse.json(data, {
//     headers: {
//       "Cache-Control": "no-store, max-age=0",
//     },
//   });
// }

// export async function POST(req: Request) {
//   const body = await req.json();

//   fs.mkdirSync(path.dirname(filePath), { recursive: true });
//   fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

//   return NextResponse.json(
//     { success: true },
//     {
//       headers: {
//         "Cache-Control": "no-store",
//       },
//     }
//   );
// }



import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // ❗ must be node (fs)
export const dynamic = "force-dynamic"; // ❗ disable caching

const filePath = path.join(process.cwd(), "data/next-program.json");

/* ---------------- GET ---------------- */
export async function GET() {
  // If file does not exist → no program
  if (!fs.existsSync(filePath)) {
    return NextResponse.json(null, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // 🔐 Safety: invalid data
  if (!data?.date || !data?.endTime) {
    fs.unlinkSync(filePath);
    return NextResponse.json(null, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  const end = new Date(`${data.date}T${data.endTime}`);

  // 🔥 AUTO-EXPIRE AFTER PROGRAM ENDS
  if (isNaN(end.getTime()) || new Date() > end) {
    fs.unlinkSync(filePath); // delete expired program
    return NextResponse.json(null, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

/* ---------------- POST ---------------- */
export async function POST(req: Request) {
  const body = await req.json();

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

  return NextResponse.json(
    { success: true },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
