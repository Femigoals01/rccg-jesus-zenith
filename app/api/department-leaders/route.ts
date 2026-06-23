import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabase
    .from("department_leaders")
    .select(`
      *,
      members (
        name,
        phone,
        email,
        department,
        group_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(req: Request) {
  const { memberId, department, role } = await req.json();

  if (!memberId || !department) {
    return NextResponse.json(
      { error: "Member and department are required" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("department_leaders").insert({
    member_id: memberId,
    department,
    role: role || "Leader",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { error } = await supabase
    .from("department_leaders")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}