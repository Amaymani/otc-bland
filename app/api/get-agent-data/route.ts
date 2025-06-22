import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/config/mongo-db";
import otcData from "@/lib/models/data";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    console.log('📩 Webhook received:', body);

    const newData = new otcData(body); // assumes body matches schema
    await newData.save();

    return NextResponse.json(
      { message: 'success', data: body },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json(
      { error: 'Invalid webhook payload' },
      { status: 400 }
    );
  }
}
