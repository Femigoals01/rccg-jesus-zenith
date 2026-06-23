

// import { NextResponse } from "next/server";
// import { supabase } from "../../../../lib/supabase";

// export const runtime = "nodejs";
// export const dynamic = "force-dynamic";

// export async function GET() {
//   const { data, error } = await supabase
//     .from("attendance")
//     .select(`
//       *,
//       members (
//         id,
//         name,
//         group_name,
//         department
//       )
//     `);

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   const records = data || [];

//   const today = new Date().toISOString().slice(0, 10);
//   const todayRecords = records.filter((r: any) => r.service_date === today);

//   return NextResponse.json({
//     totalAttendanceRecords: records.length,
//     todayAttendance: todayRecords.length,
//     menToday: todayRecords.filter((r: any) => r.members?.group_name === "Men").length,
//     womenToday: todayRecords.filter((r: any) => r.members?.group_name === "Women").length,
//     youthToday: todayRecords.filter((r: any) => r.members?.group_name === "Youth").length,
//     childrenToday: todayRecords.filter((r: any) => r.members?.group_name === "Children").length,
//   });
// }




import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
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
      console.error("ATTENDANCE STATS ERROR:", error);
      return NextResponse.json(
        {
          totalAttendanceRecords: 0,
          todayAttendance: 0,
          menToday: 0,
          womenToday: 0,
          youthToday: 0,
          childrenToday: 0,
        },
        { status: 200 }
      );
    }

    const records = data || [];
    const today = new Date().toISOString().slice(0, 10);

    const todayRecords = records.filter(
      (r: any) => r.service_date === today
    );

    return NextResponse.json({
      totalAttendanceRecords: records.length,
      todayAttendance: todayRecords.length,
      menToday: todayRecords.filter(
        (r: any) => r.members?.group_name === "Men"
      ).length,
      womenToday: todayRecords.filter(
        (r: any) => r.members?.group_name === "Women"
      ).length,
      youthToday: todayRecords.filter(
        (r: any) => r.members?.group_name === "Youth"
      ).length,
      childrenToday: todayRecords.filter(
        (r: any) => r.members?.group_name === "Children"
      ).length,
    });
  } catch (err) {
    console.error("ATTENDANCE STATS ROUTE ERROR:", err);

    return NextResponse.json({
      totalAttendanceRecords: 0,
      todayAttendance: 0,
      menToday: 0,
      womenToday: 0,
      youthToday: 0,
      childrenToday: 0,
    });
  }
}