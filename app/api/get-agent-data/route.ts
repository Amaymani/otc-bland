import { NextResponse, NextRequest } from "next/server";
import { createHmac } from "crypto";
import connectDB from "@/config/mongo-db";
import otcData from "@/lib/models/data";
import sessionToken from "@/lib/models/session";
import axios from "axios";

function verifyWebhookSignature(
  key: string,
  data: string,
  signature: string
): boolean {
  const expectedSignature = createHmac("sha256", key)
    .update(data)
    .digest("hex");

  return expectedSignature === signature;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    const signature = req.headers.get("x-webhook-signature");
    const webhookSecret = process.env.WEBHOOK_SECRET;
    console.log("🔗 Webhook secret:", webhookSecret);

    if (!webhookSecret) {
      console.error("❌ WEBHOOK_SECRET not configured");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    if (!signature) {
      console.error("❌ Missing webhook signature");
      return NextResponse.json(
        { error: "Missing webhook signature" },
        { status: 401 }
      );
    }

    const isValid = verifyWebhookSignature(webhookSecret, rawBody, signature);

    if (!isValid) {
      console.error("❌ Invalid webhook signature");
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = JSON.parse(rawBody);

    const newData = new otcData({ data: body });
    await newData.save();
    const callId = body.call_id;

    if (!callId) {
      console.error("❌ Missing call_id in webhook payload");
      return NextResponse.json(
        { error: "Missing call_id in webhook payload" },
        { status: 400 }
      );
    }
    const newSession = new sessionToken({
      call_id: callId,
    });
    await newSession.save();


    return NextResponse.json(
      { message: "success", data: body },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Webhook error:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Invalid webhook payload" },
      { status: 500 }
    );
  }
}
