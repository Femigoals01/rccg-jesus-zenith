// import fs from "fs";
// import path from "path";

// export async function GET() {
//   const filePath = path.join(process.cwd(), "data/members.json");
//   if (!fs.existsSync(filePath)) return new Response("");

//   const members = JSON.parse(fs.readFileSync(filePath, "utf-8"));
//   const csv =
//     "Name,Phone,BirthDay,BirthMonth\n" +
//     members.map((m: any) =>
//       `${m.name},${m.phone},${m.birthDay},${m.birthMonth}`
//     ).join("\n");

//   return new Response(csv, {
//     headers: {
//       "Content-Type": "text/csv",
//       "Content-Disposition": "attachment; filename=members.csv",
//     },
//   });
// }


import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const membersPath = path.join(process.cwd(), "data/members.json");

export async function GET() {
  if (!fs.existsSync(membersPath)) {
    return NextResponse.json({ error: "No members found" }, { status: 404 });
  }

  const members = JSON.parse(fs.readFileSync(membersPath, "utf-8"));

  if (!members.length) {
    return NextResponse.json({ error: "No members found" }, { status: 404 });
  }

  const headers = [
    "ID",
    "Name",
    "Email",
    "Phone",
    "Address",
    "Birthday Day",
    "Birthday Month",
    "Anniversary",
    "Group",
    "Department",
    "Active",
    "Joined Date",
  ];

  const rows = members.map((m: any) => [
    m.id,
    m.name,
    m.email || "",
    m.phone || "",
    m.address || "",
    m.birthDay || "",
    m.birthMonth || "",
    m.anniversary || "",
    m.group || "",
    m.department || "",
    m.isActive ? "Yes" : "No",
    m.createdAt,
  ]);

  const csv =
    headers.join(",") +
    "\n" +
    rows.map((r: any[]) => r.map((v) => `"${v}"`).join(",")).join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=members.csv",
    },
  });
}
