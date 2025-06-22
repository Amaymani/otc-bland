//get request which searches sid from query in otcData collection
import { NextResponse } from "next/server";
import connectDB from "@/config/mongo-db";
import otcData from "@/lib/models/data";

export async function GET(request: Request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const sid = url.searchParams.get("sid");

    if (!sid) {
      return NextResponse.json({ error: "Missing sid parameter" }, { status: 400 });
    }

    const data = await otcData.findOne({ sid });

    if (!data) {
      return NextResponse.json({ error: "No data found for the provided sid" }, { status: 404 });
    }

    return NextResponse.json(data.analysis, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}