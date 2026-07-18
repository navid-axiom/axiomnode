import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize the Twilio client using Vercel Environment Variables
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status, message, nodeName } = body;

    // Trigger the SMS text message
    const sms = await client.messages.create({
      // TWILIO FREE TRIAL RESTRICTION: We must use a predefined template keyword.
      // Once you upgrade the Twilio account, you can change this back to your custom AXIOM text.
      body: 'sms_account_alerts', 
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+12132489788' // <-- PUT YOUR VERIFIED CELL NUMBER HERE AGAIN
    });

    // Send a success response back to the node
    return NextResponse.json({ 
      success: true, 
      messageId: sms.sid 
    });

  } catch (error) {
    console.error('Alert Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process alert and send SMS' }, 
      { status: 500 }
    );
  }
}
