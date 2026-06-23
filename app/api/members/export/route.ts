

// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export const runtime = "nodejs";

// const membersPath = path.join(process.cwd(), "data/members.json");

// export async function GET() {
//   if (!fs.existsSync(membersPath)) {
//     return NextResponse.json({ error: "No members found" }, { status: 404 });
//   }

//   const members = JSON.parse(fs.readFileSync(membersPath, "utf-8"));

//   if (!members.length) {
//     return NextResponse.json({ error: "No members found" }, { status: 404 });
//   }

//   const headers = [
//     "ID",
//     "Name",
//     "Email",
//     "Phone",
//     "Address",
//     "Birthday Day",
//     "Birthday Month",
//     "Anniversary",
//     "Group",
//     "Department",
//     "Active",
//     "Joined Date",
//   ];

//   const rows = members.map((m: any) => [
//     m.id,
//     m.name,
//     m.email || "",
//     m.phone || "",
//     m.address || "",
//     m.birthDay || "",
//     m.birthMonth || "",
//     m.anniversary || "",
//     m.group || "",
//     m.department || "",
//     m.isActive ? "Yes" : "No",
//     m.createdAt,
//   ]);

//   const csv =
//     headers.join(",") +
//     "\n" +
//     rows.map((r: any[]) => r.map((v) => `"${v}"`).join(",")).join("\n");

//   return new NextResponse(csv, {
//     headers: {
//       "Content-Type": "text/csv",
//       "Content-Disposition": "attachment; filename=members.csv",
//     },
//   });
// }




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
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Address",
    "Birth Day",
    "Birth Month",
    "Anniversary",
    "Group",
    "Department",
    "Photo",
    "Created At",
  ];

  const rows = (data || []).map((m: any) => [
    m.id,
    m.name,
    m.email,
    m.phone,
    m.address,
    m.birth_day,
    m.birth_month,
    m.anniversary,
    m.group_name,
    m.department,
    m.photo,
    m.created_at,
  ]);

  const csv = [
    headers.map(escapeCSV).join(","),
    ...rows.map((row) => row.map(escapeCSV).join(",")),
  ].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=members.csv",
      "Cache-Control": "no-store",
    },
  });
}