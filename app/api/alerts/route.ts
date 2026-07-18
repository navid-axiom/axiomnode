import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// 2. Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status, message, nodeName } = body;

    // 3. Save the alert to Supabase
    const { error: dbError } = await supabase
      .from('alerts')
      .insert([{ status, message, node_name: nodeName }]);

    if (dbError) {
      console.error('Supabase Error:', dbError);
      throw new Error('Failed to save to database');
    }

    // 4. Send Twilio SMS (Generic template for trial limits)
    const sms = await twilioClient.messages.create({
      body: 'sms_account_alerts', 
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+12132489788' // <--- MUST BE YOUR VERIFIED CELL NUMBER
    });

    return NextResponse.json({ success: true, messageId: sms.sid });

  } catch (error) {
    console.error('Alert Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process alert' }, 
      { status: 500 }
    );
  }
}
