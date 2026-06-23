




import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabase
    .from("inbox")
    .select("*")
    .eq("is_archived", false)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const messages = (data || []).map((m) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    phone: m.phone,
    message: m.message,
    type: m.type,
    read: m.read,
    isPublic: m.is_public,
    isArchived: m.is_archived,
    date: m.created_at,
  }));

  return NextResponse.json(messages, {
    headers: { "Cache-Control": "no-store" },
  });
}