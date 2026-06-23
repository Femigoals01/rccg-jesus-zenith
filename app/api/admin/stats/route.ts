import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const today = new Date();
  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;

  const [
    membersRes,
    unreadInboxRes,
    testimoniesRes,
    galleryRes,
    nextProgramRes,
  ] = await Promise.all([
    supabase.from("members").select("*"),
    supabase.from("inbox").select("*").eq("read", false).eq("is_archived", false),
    supabase.from("testimonies").select("*"),
    supabase.from("gallery_albums").select("*"),
    supabase
      .from("programs")
      .select("*")
      .eq("featured", true)
      .order("program_date", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);

  const members = membersRes.data || [];

  const birthdaysToday = members.filter(
    (m: any) =>
      Number(m.birth_day) === todayDay &&
      Number(m.birth_month) === todayMonth
  );

  return NextResponse.json({
    totalMembers: members.length,
    men: members.filter((m: any) => m.group_name === "Men").length,
    women: members.filter((m: any) => m.group_name === "Women").length,
    youth: members.filter((m: any) => m.group_name === "Youth").length,
    children: members.filter((m: any) => m.group_name === "Children").length,
    unreadInbox: unreadInboxRes.data?.length || 0,
    testimonies: testimoniesRes.data?.length || 0,
    galleryAlbums: galleryRes.data?.length || 0,
    birthdaysToday,
    nextProgram: nextProgramRes.data || null,
  });
}