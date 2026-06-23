



// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// const filePath = path.join(process.cwd(), "data/members.json");

// function readMembers() {
//   if (!fs.existsSync(filePath)) return [];
//   return JSON.parse(fs.readFileSync(filePath, "utf-8"));
// }

// function writeMembers(data: any[]) {
//   fs.mkdirSync(path.dirname(filePath), { recursive: true });
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// }

// /* ---------------- CREATE MEMBER ---------------- */
// export async function POST(req: Request) {
//   const body = await req.json();

//   const {
//     name,
//     email,
//     address,
//     phone,
//     birthDay,
//     birthMonth,
//     anniversary,
//     group,
//     department,
//     photo,
//     photoId,
//   } = body;

//   if (!name || !email || !phone || !birthDay || !birthMonth) {
//     return NextResponse.json(
//       { error: "Missing required fields" },
//       { status: 400 }
//     );
//   }

//   const members = readMembers();

//   const newMember = {
//     id: Date.now().toString(),
//     name,
//     email,
//     address: address || "",
//     phone,
//     birthDay: Number(birthDay),
//     birthMonth: Number(birthMonth),
//     anniversary: anniversary || "",
//     group: group || "",
//     department: department || "",
//     photo: photo || "",
//     photoId: photoId || "",
//     isActive: true,
//     createdAt: new Date().toISOString(),
//   };

//   members.unshift(newMember);
//   writeMembers(members);

//   return NextResponse.json({ success: true, member: newMember });
// }

// /* ---------------- UPDATE MEMBER ---------------- */
// export async function PUT(req: Request) {
//   const body = await req.json();
//   const members = readMembers();

//   const index = members.findIndex((m: any) => m.id === body.id);

//   if (index === -1) {
//     return NextResponse.json(
//       { error: "Member not found" },
//       { status: 404 }
//     );
//   }

//   members[index] = {
//     ...members[index],
//     ...body,
//   };

//   writeMembers(members);

//   return NextResponse.json({ success: true });
// }

// /* ---------------- DELETE MEMBER ---------------- */
// export async function DELETE(req: Request) {
//   const { id } = await req.json();
//   const members = readMembers();

//   const filtered = members.filter((m: any) => m.id !== id);

//   writeMembers(filtered);

//   return NextResponse.json({ success: true });
// }

// /* ---------------- GET ALL MEMBERS ---------------- */
// export async function GET() {
//   return NextResponse.json(readMembers(), {
//     headers: { "Cache-Control": "no-store" },
//   });
// }




import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ---------------- CREATE MEMBER ---------------- */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      address,
      phone,
      birthDay,
      birthMonth,
      anniversary,
      group,
      department,
      photo,
    } = body;

    if (!name || !email || !phone || !birthDay || !birthMonth) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // const { data, error } = await supabase
    //   .from("members")
    //   .insert({
    //     name,
    //     email,
    //     phone,
    //     address: address || "",
    //     birthDay: Number(birthDay),
    //     birthMonth: Number(birthMonth),
    //     anniversary: anniversary || "",
    //     group_name: group || "",
    //     department: department || "",
    //     photo: photo || "",
    //   })
    //   .select()
    //   .single();


    const { data, error } = await supabase
  .from("members")
  .insert({
    name,
    email,
    phone,
    address: address || "",
    birth_day: Number(birthDay),
    birth_month: Number(birthMonth),
    anniversary: anniversary || "",
    group_name: group || "",
    department: department || "",
    photo: photo || "",
  })
  .select()
  .single();

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      member: {
        ...data,
        group: data.group_name,
        createdAt: data.created_at,
      },
    });
  } catch (err) {
    console.error("MEMBERSHIP ERROR:", err);
    return NextResponse.json(
      { error: "Failed to save member" },
      { status: 500 }
    );
  }
}

/* ---------------- LIST MEMBERS ---------------- */
export async function GET() {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // const members = data.map((m) => ({
  //   ...m,
  //   group: m.group_name,
  //   createdAt: m.created_at,
  // }));


  const members = data.map((m) => ({
  ...m,
  birthDay: m.birth_day,
  birthMonth: m.birth_month,
  group: m.group_name,
  createdAt: m.created_at,
}));

  return NextResponse.json(members, {
    headers: { "Cache-Control": "no-store" },
  });
}

/* ---------------- UPDATE MEMBER ---------------- */
export async function PUT(req: Request) {
  const body = await req.json();

  const { id, group, createdAt, ...rest } = body;

  const { error } = await supabase
    .from("members")
    .update({
      ...rest,
      group_name: group || body.group_name || "",
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/* ---------------- DELETE MEMBER ---------------- */
export async function DELETE(req: Request) {
  const { id } = await req.json();

  const { error } = await supabase
    .from("members")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}