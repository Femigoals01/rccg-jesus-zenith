

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const inboxPath = path.join(process.cwd(), "data/inbox.json");

export async function GET() {
  if (!fs.existsSync(inboxPath)) {
    return NextResponse.json([]);
  }

  const data = JSON.parse(fs.readFileSync(inboxPath, "utf-8"));
  return NextResponse.json(data);
}
