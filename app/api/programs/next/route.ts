
// import { NextResponse } from "next/server";
// import fs from "fs";
// import path from "path";

// export const runtime = "nodejs"; // ❗ must be node (fs)
// export const dynamic = "force-dynamic"; // ❗ disable caching

// const filePath = path.join(process.cwd(), "data/next-program.json");

// /* ---------------- GET ---------------- */
// export async function GET() {
//   // If file does not exist → no program
//   if (!fs.existsSync(filePath)) {
//     return NextResponse.json(null, {
//       headers: { "Cache-Control": "no-store" },
//     });
//   }

//   const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

//   // 🔐 Safety: invalid data
//   if (!data?.date || !data?.endTime) {
//     fs.unlinkSync(filePath);
//     return NextResponse.json(null, {
//       headers: { "Cache-Control": "no-store" },
//     });
//   }

//   const end = new Date(`${data.date}T${data.endTime}`);

//   // 🔥 AUTO-EXPIRE AFTER PROGRAM ENDS
//   if (isNaN(end.getTime()) || new Date() > end) {
//     fs.unlinkSync(filePath); // delete expired program
//     return NextResponse.json(null, {
//       headers: { "Cache-Control": "no-store" },
//     });
//   }

//   return NextResponse.json(data, {
//     headers: {
//       "Cache-Control": "no-store, max-age=0",
//     },
//   });
// }

// /* ---------------- POST ---------------- */
// export async function POST(req: Request) {
//   const body = await req.json();

//   fs.mkdirSync(path.dirname(filePath), { recursive: true });
//   fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

//   return NextResponse.json(
//     { success: true },
//     {
//       headers: {
//         "Cache-Control": "no-store",
//       },
//     }
//   );
// }



import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("featured", true)
    .order("program_date", { ascending: true })
    .order("start_time", { ascending: true })
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json(null, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  const end = new Date(`${data.program_date}T${data.end_time}`);

  if (new Date() > end) {
    await supabase
      .from("programs")
      .update({ featured: false })
      .eq("id", data.id);

    return NextResponse.json(null, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  return NextResponse.json(
    {
      id: data.id,
      title: data.title,
      topic: data.topic,
      date: data.program_date,
      startTime: data.start_time,
      endTime: data.end_time,
      featured: data.featured,
    },
    {
      headers: { "Cache-Control": "no-store" },
    }
  );
}

export async function POST(req: Request) {
  const body = await req.json();

  const { title, topic, date, startTime, endTime, featured } = body;

  if (!title || !date || !startTime || !endTime) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  await supabase
    .from("programs")
    .update({ featured: false })
    .eq("featured", true);

  const { error } = await supabase.from("programs").insert({
    title,
    topic: topic || "",
    program_date: date,
    start_time: startTime,
    end_time: endTime,
    featured: featured ?? true,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}