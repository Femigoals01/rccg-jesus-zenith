

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/next-program.json");

export async function GET() {
  if (!fs.existsSync(filePath)) {
    return NextResponse.json(null);
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

  return NextResponse.json({ success: true });
}
