import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN || '';
const telegramChatId = process.env.TELEGRAM_CHAT_ID || '';

async function sendTelegramAlert(payload: {
  status: string;
  message: string;
  nodeName: string;
  video_url?: string | null;
  suspect_description?: any;
  alertId?: string | number;
}) {
  if (!telegramBotToken || !telegramChatId) {
    console.warn('Telegram Bot Token or Chat ID missing in environment variables. Skipping Telegram alert.');
    return;
  }

  const hostUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://axiomnode-seven.vercel.app';
  const incidentUrl = payload.alertId ? `${hostUrl}/dashboard#alert-${payload.alertId}` : `${hostUrl}/dashboard`;

  let text = `🚨 <b>[AXIOM THREAT DETECTED]</b>\n\n`;
  text += `<b>Status:</b> ${payload.status}\n`;
  text += `<b>Camera:</b> <code>${payload.nodeName}</code>\n`;
  text += `<b>Summary:</b> ${payload.message}\n\n`;

  if (payload.suspect_description) {
    const desc = payload.suspect_description;
    text += `📋 <b>Law Enforcement Log:</b>\n`;
    if (desc.held_objects_detail) text += `• <b>Threat Item:</b> ${desc.held_objects_detail}\n`;
    if (desc.clothing_details) text += `• <b>Clothing:</b> ${desc.clothing_details}\n`;
    if (desc.estimated_height) text += `• <b>Est. Height:</b> ${desc.estimated_height}\n`;
    if (desc.physical_distinguishing_features) text += `• <b>Features:</b> ${desc.physical_distinguishing_features}\n`;
    text += `\n`;
  }

  if (payload.video_url) {
    text += `📹 <a href="${payload.video_url}">Watch 10s HD Incident Video</a>\n\n`;
  }

  text += `🔗 <a href="${incidentUrl}">Open Axiom Security Dashboard</a>`;

  try {
    const tgEndpoint = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const res = await fetch(tgEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: text,
        parse_mode: 'HTML',
        disable_web_page_preview: false
      })
    });

    const tgData = await res.json();
    if (tgData.ok) {
      console.log('✈️ [TELEGRAM DISPATCH SUCCESS] Alert delivered to chat.');
    } else {
      console.warn('Telegram API returned error:', tgData);
    }
  } catch (err: any) {
    console.error('Failed to send Telegram dispatch:', err?.message || err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { status, message, nodeName, screenshot, video_url, suspect_description } = body;

    let savedAlertId: string | number | undefined = undefined;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      const { data, error: dbError } = await supabase
        .from('alerts')
        .insert([{ 
          status: status || 'Warning', 
          message: message || 'Threat detected', 
          node_name: nodeName || 'cam-01',
          screenshot: screenshot || null,
          video_url: video_url || null,
          suspect_description: suspect_description || null
        }])
        .select();

      if (data && data.length > 0) {
        savedAlertId = data[0].id;
      }

      if (dbError) {
        console.warn('Rich insert warning, attempting fallback minimal insert:', dbError.message);
        const { data: fbData } = await supabase
          .from('alerts')
          .insert([{ 
            status: status || 'Warning', 
            message: message || 'Threat detected', 
            node_name: nodeName || 'cam-01'
          }])
          .select();
        if (fbData && fbData.length > 0) {
          savedAlertId = fbData[0].id;
        }
      }
    } else {
      console.warn('Supabase URL/Key missing in Vercel environment variables.');
    }

    await sendTelegramAlert({
      status: status || 'Warning',
      message: message || 'Threat detected',
      nodeName: nodeName || 'cam-01',
      video_url,
      suspect_description,
      alertId: savedAlertId
    });

    return NextResponse.json({ success: true, message: 'Alert processed and dispatched to Telegram' });

  } catch (error: any) {
    console.error('General Alert Route Error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to process alert' }, 
      { status: 200 }
    );
  }
}
