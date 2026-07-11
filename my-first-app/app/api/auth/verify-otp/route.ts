import { NextResponse } from 'next/server';
import { otpCache } from '@/lib/mockDb';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ success: false, message: 'Email and OTP code are required.' }, { status: 400 });
    }

    const cached = otpCache.get(email.toLowerCase());

    if (!cached) {
      return NextResponse.json({ success: false, message: 'No OTP generated for this email.' }, { status: 400 });
    }

    if (cached.expires < Date.now()) {
      otpCache.delete(email.toLowerCase());
      return NextResponse.json({ success: false, message: 'OTP has expired.' }, { status: 400 });
    }

    if (cached.code !== otp) {
      return NextResponse.json({ success: false, message: 'Invalid OTP code.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully.'
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Error verifying code.' }, { status: 500 });
  }
}
