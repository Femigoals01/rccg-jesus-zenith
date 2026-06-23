
import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { email, phone } = await req.json();

  if (!email || !phone) {
    return NextResponse.json(
      { error: "Email and phone are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("email", email)
    .eq("phone", phone)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json(
      { error: "Member not found. Please check your email and phone number." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    member: {
      ...data,
      birthDay: data.birth_day,
      birthMonth: data.birth_month,
      group: data.group_name,
      createdAt: data.created_at,
    },
  });
}