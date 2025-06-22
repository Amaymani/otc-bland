import { NextResponse, NextRequest } from "next/server";
import { createHmac } from "crypto";
import connectDB from "@/config/mongo-db";
import otcData from "@/lib/models/data";

function verifyWebhookSignature(key: string, data: string, signature: string): boolean {
  const expectedSignature = createHmac('sha256', key)
    .update(data)
    .digest('hex');

  return expectedSignature === signature;
}

export async function POST(req: NextRequest) {
  try {
    // Get the raw body as text for signature verification
        const rawBody = await req.text();
    
    // Get the signature from headers
    const signature = req.headers.get('x-webhook-signature');
    const webhookSecret = process.env.WEBHOOK_SECRET;
    console.log('🔗 Webhook secret:', webhookSecret);

    // Verify webhook signature
    if (!webhookSecret) {
      console.error('❌ WEBHOOK_SECRET not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    if (!signature) {
      console.error('❌ Missing webhook signature');
      return NextResponse.json(
        { error: 'Missing webhook signature' },
        { status: 401 }
      );
    }

    const isValid = verifyWebhookSignature(webhookSecret, rawBody, signature);
    
    if (!isValid) {
      console.error('❌ Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    console.log('✅ Webhook signature verified');

    // Connect to database
    await connectDB();

    // Parse the verified body
    const body = JSON.parse(rawBody);
    console.log('📩 Webhook received:', body);

    // Wrap body in `data` to match the schema
    const newData = new otcData({ data: body });
    await newData.save();

    return NextResponse.json(
      { message: 'success', data: body },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('❌ Webhook error:', error.message || error);
    return NextResponse.json(
      { error: error.message || 'Invalid webhook payload' },
      { status: 500 }
    );
  }
}