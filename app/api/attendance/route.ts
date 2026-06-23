

import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabase
    .from("attendance")
    .select(`
      *,
      members (
        name,
        phone,
        email,
        group_name,
        department
      )
    `)
    .order("service_date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

// export async function POST(req: Request) {
//   const { serviceTitle, serviceDate, memberIds } = await req.json();

//   if (!serviceTitle || !serviceDate || !memberIds?.length) {
//     return NextResponse.json(
//       { error: "Service title, date and members are required" },
//       { status: 400 }
//     );
//   }

//   const rows = memberIds.map((memberId: string) => ({
//     member_id: memberId,
//     service_title: serviceTitle,
//     service_date: serviceDate,
//     status: "present",
//   }));

//   const { error } = await supabase.from("attendance").insert(rows);

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json({ success: true });
// }




export async function POST(req: Request) {
  const { serviceTitle, serviceDate, memberIds } = await req.json();

  if (!serviceTitle || !serviceDate || !memberIds?.length) {
    return NextResponse.json(
      { error: "Service title, date and members are required" },
      { status: 400 }
    );
  }

  const rows = memberIds.map((memberId: string) => ({
    member_id: memberId,
    service_title: serviceTitle,
    service_date: serviceDate,
    status: "present",
  }));

  const { error } = await supabase
    .from("attendance")
    .upsert(rows, {
      onConflict: "member_id,service_title,service_date",
      ignoreDuplicates: true,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    message: "Attendance saved. Duplicate entries were ignored.",
  });
}



export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Attendance ID is required" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("attendance")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}