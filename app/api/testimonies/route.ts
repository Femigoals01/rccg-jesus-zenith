

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "data/testimonies.json");

function readData() {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function writeData(data: any) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/* -------- GET (Public) -------- */
export async function GET() {
  return NextResponse.json(readData());
}

/* -------- POST (Admin) -------- */
export async function POST(req: Request) {
  const body = await req.json();
  const data = readData();

  data.unshift({
    id: Date.now(),
    ...body,
    createdAt: new Date().toISOString(),
  });

  writeData(data);
  return NextResponse.json({ success: true });
}

/* -------- DELETE (Admin) -------- */
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const data = readData().filter((t: any) => t.id !== id);
  writeData(data);

  return NextResponse.json({ success: true });
}
