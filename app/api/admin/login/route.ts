

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { key } = await req.json();

//   if (key === process.env.ADMIN_UPLOAD_KEY) {
//     const res = NextResponse.json({ success: true });
//     res.cookies.set("admin_auth", "true", {
//       path: "/",
//       httpOnly: true,
//       sameSite: "lax",
//     });
//     return res;
//   }

//   return NextResponse.json(
//     { error: "Invalid admin key" },
//     { status: 401 }
//   );
// }



import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { key } = await req.json();

  if (!key) {
    return NextResponse.json(
      { error: "Missing key" },
      { status: 400 }
    );
  }

  if (key === process.env.ADMIN_UPLOAD_KEY) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_auth", "true", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    return res;
  }

  return NextResponse.json(
    { error: "Invalid admin key" },
    { status: 401 }
  );
}
