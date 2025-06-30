

import { NextResponse } from 'next/server';
import connectDB from '@/config/mongo-db';
import otcData from '@/lib/models/data';
import sessionToken from '@/lib/models/session';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const callId = url.searchParams.get('callId');
    const sessionToken = url.searchParams.get('sessionToken');

    await connectDB();

    

    return NextResponse.json(
      { message: 'Call ID received successfully', callId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}