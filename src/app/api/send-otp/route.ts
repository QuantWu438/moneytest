// src/app/api/send-otp/route.ts

import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

// Check if environment variables are defined
if (!accountSid) {
  console.error('TWILIO_ACCOUNT_SID is missing');
  throw new Error('TWILIO_ACCOUNT_SID is missing');
}

if (!authToken) {
  console.error('TWILIO_AUTH_TOKEN is missing');
  throw new Error('TWILIO_AUTH_TOKEN is missing');
}

if (!verifyServiceSid) {
  console.error('TWILIO_VERIFY_SERVICE_SID is missing');
  throw new Error('TWILIO_VERIFY_SERVICE_SID is missing');
}

// At this point, TypeScript knows that accountSid, authToken, and verifyServiceSid are strings
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

    // @ts-expect-error
    await client.verify
      .services(verifyServiceSid)
      .verifications.create({ to: phoneNumber, channel: 'sms' });

    return NextResponse.json(
      { message: 'OTP sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error sending OTP:', error.message);
    } else {
      console.error('Error sending OTP:', error);
    }

    return NextResponse.json(
      { message: 'Failed to send OTP', error: errorMessage },
      { status: 500 }
    );
  }
}
