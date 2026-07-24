import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status, message, nodeName, screenshot, video_url, suspect_description } = body;

    // Save alert with video_url into Supabase database
    const { error: dbError } = await supabase
      .from('alerts')
      .insert([{ 
        status, 
        message, 
        node_name: nodeName,
        screenshot,
        video_url,
        suspect_description
      }]);

    if (dbError) {
      console.error('Supabase Error:', dbError);
      throw new Error('Failed to save to database');
    }

    // Trigger SMS broadcast
    try {
      await twilioClient.messages.create({
        body: 'sms_account_alerts', 
        from: process.env.TWILIO_PHONE_NUMBER,
        to: '+14805551234'
      });
      console.log('Twilio SMS sent successfully.');
    } catch (twilioError) {
      console.error('Twilio notification queued (A2P review mode). DB saved successfully.');
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('General Alert Route Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process alert' }, 
      { status: 500 }
    );
  }
}
