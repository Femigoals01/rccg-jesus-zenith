

import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabase
    .from("attendance")
    .select(`
      *,
      members (
        id,
        name,
        group_name,
        department
      )
    `);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const records = data || [];

  const today = new Date().toISOString().slice(0, 10);
  const todayRecords = records.filter((r: any) => r.service_date === today);

  return NextResponse.json({
    totalAttendanceRecords: records.length,
    todayAttendance: todayRecords.length,
    menToday: todayRecords.filter((r: any) => r.members?.group_name === "Men").length,
    womenToday: todayRecords.filter((r: any) => r.members?.group_name === "Women").length,
    youthToday: todayRecords.filter((r: any) => r.members?.group_name === "Youth").length,
    childrenToday: todayRecords.filter((r: any) => r.members?.group_name === "Children").length,
  });
}