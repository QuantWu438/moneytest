// src/app/api/verify-otp/route.ts

import { NextResponse } from 'next/server';
import twilio from 'twilio';

interface VerifyOtpBody {
  phoneNumber: string;
  otp: string;
}

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

if (!accountSid || !authToken || !verifyServiceSid) {
  console.error('Twilio credentials are missing in environment variables.');
}

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  try {
    const body: VerifyOtpBody = await request.json();

    const { phoneNumber, otp } = body;

    console.log('Received phoneNumber:', phoneNumber);
    console.log('Received otp:', otp);
    console.log('Using Verify Service SID:', verifyServiceSid);

    // Validate required fields
    if (!phoneNumber || !otp) {
      return NextResponse.json(
        { message: 'Missing required fields: phoneNumber and otp.' },
        { status: 400 }
      );
    }

    // Verify OTP using Twilio Verify API
    const verificationCheck = await client.verify
      .services(verifyServiceSid)
      .verificationChecks.create({ to: phoneNumber, code: otp });

    console.log('Verification status:', verificationCheck.status);

    if (verificationCheck.status === 'approved') {
      return NextResponse.json(
        { message: 'OTP verified successfully.' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Invalid OTP. Please try again.' },
        { status: 400 }
      );
    }
  } catch (error) {
    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error verifying OTP:', error.message);
    } else {
      console.error('Error verifying OTP:', error);
    }

    return NextResponse.json(
      { message: 'Failed to verify OTP.', error: errorMessage },
      { status: 500 }
    );
  }
}
