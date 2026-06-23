




import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { id } = await req.json();

  const { data, error: fetchError } = await supabase
    .from("inbox")
    .select("is_public")
    .eq("id", id)
    .single();

  if (fetchError || !data) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  const { error } = await supabase
    .from("inbox")
    .update({ is_public: !data.is_public })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}