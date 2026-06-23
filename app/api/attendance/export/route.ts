

import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeCSV(value: any) {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  const { data, error } = await supabase
    .from("attendance")
    .select(`
      *,
      members (
        name,
        email,
        phone,
        group_name,
        department
      )
    `)
    .order("service_date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const headers = [
    "Attendance ID",
    "Service Title",
    "Service Date",
    "Status",
    "Member Name",
    "Email",
    "Phone",
    "Group",
    "Department",
    "Created At",
  ];

  const rows = (data || []).map((r: any) => [
    r.id,
    r.service_title,
    r.service_date,
    r.status,
    r.members?.name || "",
    r.members?.email || "",
    r.members?.phone || "",
    r.members?.group_name || "",
    r.members?.department || "",
    r.created_at,
  ]);

  const csv = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.map(escapeCSV).join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=attendance.csv",
      "Cache-Control": "no-store",
    },
  });
}