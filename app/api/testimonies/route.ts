



// import { NextResponse } from "next/server";
// import { supabase } from "../../../lib/supabase";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// export async function GET() {
//   const { data, error } = await supabase
//     .from("testimonies")
//     .select("*")
//     .eq("approved", true)
//     .order("created_at", { ascending: false });

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json(data || [], {
//     headers: { "Cache-Control": "no-store" },
//   });
// }

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { name, title, category, text } = body;

//   if (!name || !title || !text) {
//     return NextResponse.json(
//       { error: "Missing required fields" },
//       { status: 400 }
//     );
//   }

//   const { error } = await supabase.from("testimonies").insert({
//     name,
//     title,
//     category: category || "",
//     text,
//     approved: true,
//   });

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json({ success: true });
// }



import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabase
    .from("testimonies")
    .select("*")
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || [], {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, title, category, text } = body;

  if (!name || !title || !text) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("testimonies").insert({
    name,
    title,
    category: category || "",
    text,
    approved: true,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}