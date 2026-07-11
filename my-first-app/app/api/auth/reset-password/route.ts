import { NextResponse } from 'next/server';
import { usersDb, otpCache } from '@/lib/mockDb';

export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return NextResponse.json({ success: false, message: 'Email and new password are required.' }, { status: 400 });
    }

    // Locate user
    const user = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user) {
      user.passwordHash = newPassword;
    }

    // Clean up OTP cache entry
    otpCache.delete(email.toLowerCase());

    console.log(`🔑 PASSWORD RESET SUCCESS: Account ${email} password updated.`);

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully.'
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Error updating password.' }, { status: 500 });
  }
}
