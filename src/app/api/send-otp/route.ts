// src/app/api/send-otp/route.ts

import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

if (!accountSid || !authToken || !verifyServiceSid) {
  console.error('Twilio credentials are missing');
}

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { message: 'Phone number is required' },
        { status: 400 }
      );
    }

    await client.verify
      .services(verifyServiceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });

    return NextResponse.json(
      { message: 'OTP sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { message: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
