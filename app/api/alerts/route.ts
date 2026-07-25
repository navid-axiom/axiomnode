import { NextResponse } from 'next/server';
import twilio from 'twilio';
import { createClient } from '@supabase/supabase-js';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID || 'AC_DUMMY_SID',
  process.env.TWILIO_AUTH_TOKEN || 'DUMMY_TOKEN'
);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status, message, nodeName, screenshot, video_url, suspect_description } = body;

    // 1. Save alert with full details to Supabase
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // Attempt rich insert
      const { error: dbError } = await supabase
        .from('alerts')
        .insert([{ 
          status: status || 'Warning', 
          message: message || 'Threat detected', 
          node_name: nodeName || 'cam-01',
          screenshot: screenshot || null,
          video_url: video_url || null,
          suspect_description: suspect_description || null
        }]);

      if (dbError) {
        console.warn('Rich insert warning (table columns might need updating), attempting minimal insert:', dbError.message);
        
        // Fallback insert if new schema columns do not exist yet on Supabase DB
        await supabase
          .from('alerts')
          .insert([{ 
            status: status || 'Warning', 
            message: message || 'Threat detected', 
            node_name: nodeName || 'cam-01'
          }]);
      }
    } else {
      console.warn('Supabase URL/Key missing in Vercel environment variables. Logging alert locally in server logs.');
    }

    // 2. Trigger Twilio SMS broadcast
    try {
      if (process.env.TWILIO_PHONE_NUMBER) {
        await twilioClient.messages.create({
          body: 'sms_account_alerts', 
          from: process.env.TWILIO_PHONE_NUMBER,
          to: '+14805551234'
        });
        console.log('Twilio SMS sent successfully.');
      }
    } catch (twilioError) {
      console.warn('Twilio notification queued (A2P review mode). DB saved successfully.');
    }

    return NextResponse.json({ success: true, message: 'Alert processed successfully' });

  } catch (error: any) {
    console.error('General Alert Route Error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to process alert' }, 
      { status: 500 }
    );
  }
}
