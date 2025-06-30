import { NextResponse } from "next/server";
import connectDB from "@/config/mongo-db";
import otcData from "@/lib/models/data";

export async function GET(request: Request) {
  try {
    await connectDB();

    const latestEntry = await otcData
      .findOne({})
      .sort({ createdAt: -1 });

    if (!latestEntry) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }

    return NextResponse.json(latestEntry.data.analysis, { status: 200 });
  } catch (error) {
    console.error("Error fetching latest otcData:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
