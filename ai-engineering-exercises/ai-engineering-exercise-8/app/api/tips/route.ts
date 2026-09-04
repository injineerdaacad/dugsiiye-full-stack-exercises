import { NextResponse } from "next/server";
import { listDailyTips } from "@/lib/job-store";

export async function GET() {
  return NextResponse.json({ tips: listDailyTips() });
}
