

// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// const filePath = path.join(process.cwd(), "data/next-program.json");

// export async function GET() {
//   if (!fs.existsSync(filePath)) {
//     return NextResponse.json(null);
//   }

//   const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//   return NextResponse.json(data);
// }

// export async function POST(req: Request) {
//   const body = await req.json();

//   fs.mkdirSync(path.dirname(filePath), { recursive: true });
//   fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

//   return NextResponse.json({ success: true });
// }


// import { NextResponse } from "next/server";

// /* ---------- Detect environment ---------- */
// const isVercel = !!process.env.EDGE_CONFIG;

// /* ---------- EDGE CONFIG (PRODUCTION) ---------- */
// let edge: any = null;
// if (isVercel) {
//   const { createClient } = await import("@vercel/edge-config");
//   edge = createClient(process.env.EDGE_CONFIG!);
// }

// /* ---------- FILE SYSTEM (LOCAL DEV) ---------- */
// import fs from "fs";
// import path from "path";

// const filePath = path.join(process.cwd(), "data/next-program.json");

// /* ---------------- GET ---------------- */
// export async function GET() {
//   try {
//     // ✅ Production (Vercel)
//     if (edge) {
//       const data = await edge.get("next-program");
//       return NextResponse.json(data ?? null);
//     }

//     // ✅ Local development
//     if (!fs.existsSync(filePath)) {
//       return NextResponse.json(null);
//     }

//     const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//     return NextResponse.json(data);
//   } catch (e) {
//     console.error("GET next program failed:", e);
//     return NextResponse.json(null);
//   }
// }

// /* ---------------- POST ---------------- */
// export async function POST(req: Request) {
//   const body = await req.json();

//   try {
//     // ✅ Production (Vercel)
//     if (edge) {
//       await edge.set("next-program", body);
//       return NextResponse.json({ success: true });
//     }

//     // ✅ Local development
//     fs.mkdirSync(path.dirname(filePath), { recursive: true });
//     fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

//     return NextResponse.json({ success: true });
//   } catch (e) {
//     console.error("POST next program failed:", e);
//     return NextResponse.json(
//       { error: "Failed to save program" },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // ❗ NOT edge
export const dynamic = "force-dynamic"; // ❗ disable caching

const filePath = path.join(process.cwd(), "data/next-program.json");

export async function GET() {
  if (!fs.existsSync(filePath)) {
    return NextResponse.json(null, { status: 200 });
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

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
