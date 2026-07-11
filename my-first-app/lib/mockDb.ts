// Mock Database for LMS Pro Platform

export interface UserAccount {
  email: string;
  passwordHash: string;
  role: 'student' | 'teacher' | 'admin';
  xp: number;
}

// Pre-seeded accounts
export const usersDb: UserAccount[] = [
  {
    email: 'student@apex.academy',
    passwordHash: 'password123',
    role: 'student',
    xp: 320
  },
  {
    email: 'teacher@apex.academy',
    passwordHash: 'password123',
    role: 'teacher',
    xp: 0
  },
  {
    email: 'admin@apex.academy',
    passwordHash: 'password123',
    role: 'admin',
    xp: 0
  }
];

// In-memory OTP Cache
export interface OtpEntry {
  code: string;
  expires: number;
}

export const otpCache = new Map<string, OtpEntry>();
