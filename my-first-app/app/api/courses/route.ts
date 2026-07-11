import { NextResponse } from 'next/server';

export async function GET() {
  const courses = [
    {
      id: 1,
      title: 'Advanced Next.js 16 & Server Actions',
      category: 'webdev',
      level: 'Advanced',
      duration: '18 Hours',
      rating: 4.9,
      enrolled: '12.4k',
      author: { name: 'Sarah Chen', avatarBg: 'bg-violet-500', avatarText: 'SC' },
      gradient: 'from-violet-600 to-indigo-700'
    },
    {
      id: 2,
      title: 'Full-Stack Agentic AI Engineering',
      category: 'ai',
      level: 'Advanced',
      duration: '26 Hours',
      rating: 4.95,
      enrolled: '8.2k',
      author: { name: 'Liam Devlin', avatarBg: 'bg-cyan-500', avatarText: 'LD' },
      gradient: 'from-cyan-600 to-blue-700'
    },
    {
      id: 3,
      title: 'Rust for JavaScript Developers',
      category: 'systems',
      level: 'Intermediate',
      duration: '32 Hours',
      rating: 4.88,
      enrolled: '6.1k',
      author: { name: 'Morten Lind', avatarBg: 'bg-emerald-500', avatarText: 'ML' },
      gradient: 'from-emerald-600 to-teal-700'
    },
    {
      id: 4,
      title: 'Tailwind CSS v4: Advanced Design Systems',
      category: 'webdev',
      level: 'Intermediate',
      duration: '12 Hours',
      rating: 4.85,
      enrolled: '15.1k',
      author: { name: 'Emma Wilson', avatarBg: 'bg-pink-500', avatarText: 'EW' },
      gradient: 'from-pink-600 to-rose-700'
    },
    {
      id: 5,
      title: 'Retrieval Augmented Generation (RAG) Architecture',
      category: 'ai',
      level: 'Intermediate',
      duration: '15 Hours',
      rating: 4.92,
      enrolled: '9.4k',
      author: { name: 'Dr. Alan Patel', avatarBg: 'bg-amber-500', avatarText: 'AP' },
      gradient: 'from-amber-600 to-orange-700'
    },
    {
      id: 6,
      title: 'Kubernetes & Docker Container Workflows',
      category: 'systems',
      level: 'Advanced',
      duration: '22 Hours',
      rating: 4.82,
      enrolled: '5.5k',
      author: { name: 'Alex Mercer', avatarBg: 'bg-purple-500', avatarText: 'AM' },
      gradient: 'from-purple-600 to-fuchsia-700',
    }
  ];

  return NextResponse.json(courses);
}
