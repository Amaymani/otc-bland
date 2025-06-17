import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest){

    try{
        const body = await req.json();

        console.log('Webhook received: ', body);

        return NextResponse.json({ status: 'success', received: true });

    } catch (error) {
    console.error('❌ Webhook error:', error);
    return NextResponse.json({ error: 'Invalid webhook payload' }, { status: 400 });
  }
}