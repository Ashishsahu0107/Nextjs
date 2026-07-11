import { NextResponse } from 'next/server';
import { usersDb } from '@/lib/mockDb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        { success: false, message: 'Email, password, and role are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const exists = usersDb.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return NextResponse.json(
        { success: false, message: 'Email already registered.' },
        { status: 409 }
      );
    }

    // Add to mock database
    usersDb.push({
      email,
      passwordHash: password,
      role: role as 'student' | 'teacher' | 'admin',
      xp: 0
    });

    return NextResponse.json({
      success: true,
      message: 'Account successfully registered.',
      user: {
        email,
        role,
        verified: true
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Malformed request payload.' },
      { status: 500 }
    );
  }
}
