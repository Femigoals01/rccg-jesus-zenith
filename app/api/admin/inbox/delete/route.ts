

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const inboxPath = path.join(process.cwd(), "data/inbox.json");

export async function POST(req: Request) {
  const { id } = await req.json();

  const data = JSON.parse(fs.readFileSync(inboxPath, "utf-8"));
  const filtered = data.filter((m: any) => m.id !== id);

  fs.writeFileSync(inboxPath, JSON.stringify(filtered, null, 2));

  return NextResponse.json({ success: true });
}
