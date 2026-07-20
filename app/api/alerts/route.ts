import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Twilio client using environment variables
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// 2. Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status, message, nodeName } = body;

    // 3. Save the alert to Supabase first
    const { error: dbError } = await supabase
      .from('alerts')
      .insert([{ status, message, node_name: nodeName }]);

    if (dbError) {
      console.error('Supabase Error:', dbError);
      throw new Error('Failed to save to database');
    }

    // 4. Try to send Twilio SMS, but DO NOT crash the server if it fails
    try {
      await twilioClient.messages.create({
        body: `Axiom Alert: ${message}`, 
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+12132489788' // <--- MUST BE YOUR VERIFIED CELL NUMBER
      });
      console.log('Twilio SMS sent successfully.');
    } catch (twilioError) {
      // If Twilio blocks you, we log the error but still tell the Python script everything worked!
      console.error('Twilio failed but database saved successfully:', twilioError);
    }

    // Return a 200 OK so the Python script gets a [SUCCESS]
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('General Alert Route Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process alert' }, 
      { status: 500 }
    );
  }
}
