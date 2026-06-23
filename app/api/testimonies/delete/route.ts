



// import { NextResponse } from "next/server";
// import { supabase } from "../../../../lib/supabase";

// export const runtime = "nodejs";

// export async function POST(req: Request) {
//   const { id } = await req.json();

//   const { error } = await supabase
//     .from("testimonies")
//     .delete()
//     .eq("id", id);

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json({ success: true });
// }


import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing testimony id" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("testimonies")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE TESTIMONY ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE TESTIMONY ROUTE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to delete testimony" },
      { status: 500 }
    );
  }
}