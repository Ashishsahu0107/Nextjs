import { NextResponse } from 'next/server';
import { otpCache } from '@/lib/mockDb';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email address is required.' }, { status: 400 });
    }

    // Generate random 6-digit code
    const rawOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Cache with a 5 minute expiration
    otpCache.set(email.toLowerCase(), {
      code: rawOtp,
      expires: Date.now() + 5 * 60 * 1000
    });

    // Logging directly to the node compiler/server terminal console for development capture
    console.log(`\n============================================`);
    console.log(`🔑 PASSWORD RESET REQUEST`);
    console.log(`📧 User: ${email}`);
    console.log(`🔢 OTP Code: ${rawOtp} (Expires in 5 minutes)`);
    console.log(`============================================\n`);

    return NextResponse.json({
      success: true,
      message: 'OTP generated successfully.'
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Error processing payload.' }, { status: 500 });
  }
}
