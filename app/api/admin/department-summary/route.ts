

import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const departments = [
  "Ushering",
  "Sunday School Teacher",
  "Welfare",
  "Evangelism",
  "Media",
  "Prayer",
  "Choir",
  "Children Teacher",
  "Sanitation",
  "Protocol",
  "Security",
];

export async function GET() {
  const [membersRes, leadersRes] = await Promise.all([
    supabase.from("members").select("*"),
    supabase.from("department_leaders").select("*"),
  ]);

  if (membersRes.error) {
    return NextResponse.json(
      { error: membersRes.error.message },
      { status: 500 }
    );
  }

  if (leadersRes.error) {
    return NextResponse.json(
      { error: leadersRes.error.message },
      { status: 500 }
    );
  }

  const members = membersRes.data || [];
  const leaders = leadersRes.data || [];

  const summary = departments.map((department) => ({
    department,
    members: members.filter((m: any) => m.department === department).length,
    leaders: leaders.filter((l: any) => l.department === department).length,
  }));

  return NextResponse.json(summary, {
    headers: { "Cache-Control": "no-store" },
  });
}