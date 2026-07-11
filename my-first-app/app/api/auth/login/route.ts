import { NextResponse } from 'next/server';
import { usersDb } from '@/lib/mockDb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Find user in database
    const user = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (user && user.passwordHash === password) {
      return NextResponse.json({
        success: true,
        message: 'Successfully authenticated.',
        user: {
          email: user.email,
          role: user.role,
          name: user.email.split('@')[0],
          token: 'mock-jwt-token-xyz'
        }
      });
    }

    // Fallback: If user registers dynamically during this session, we can dynamically search or match.
    // For ease of simulation, we also allow dynamic accounts if they match strength requirements
    if (email.includes('@') && password.length >= 6) {
      return NextResponse.json({
        success: true,
        message: 'Authenticated dynamic account.',
        user: {
          email,
          role: email.startsWith('admin') ? 'admin' : email.startsWith('teacher') ? 'teacher' : 'student',
          name: email.split('@')[0],
          token: 'mock-jwt-token-xyz'
        }
      });
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials. Pre-seeded account: student@apex.academy / password123' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Malformed request payload.' },
      { status: 500 }
    );
  }
}
