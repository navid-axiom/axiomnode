// @ts-nocheck
export async function sendAlertSms(message) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  
  const toNumber = "+1234567890"; // <--- CHANGE THIS TO YOUR REAL CELL PHONE NUMBER!

  if (!sid || !token || !fromNumber) return false;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(sid + ':' + token),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ To: toNumber, From: fromNumber, Body: message })
    });
    return true;
  } catch (error) {
    return false;
  }
}
