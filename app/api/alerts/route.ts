import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize the Twilio client using Vercel Environment Variables
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: Request) {
  try {
    // Read the incoming alert data from the Linux node
    const body = await request.json();
    const { status, message, nodeName } = body;

    // Trigger the SMS text message
    const sms = await client.messages.create({
      body: `AXIOM ${status.toUpperCase()}: ${message} (Source: ${nodeName})`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: '+17372583742' // <-- CHANGE THIS TO YOUR VERIFIED CELL NUMBER
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
