import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Navigation from '../../components/Navigation';
import '../../app/globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Apex Learning | Premium AI-Powered LMS Platform',
  description: 'Master in-demand tech skills with interactive paths, hands-on environments, and personalized AI mentoring. Start learning for free today.',
  keywords: 'LMS, e-learning, AI tutor, coding bootcamps, tech courses, online education, developer paths',
  openGraph: {
    title: 'Apex Learning | Premium AI-Powered LMS Platform',
    description: 'Master in-demand tech skills with interactive paths, hands-on environments, and personalized AI mentoring.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} dark`}>
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-violet-500/30 selection:text-violet-200">
        <Navigation />
        {children}
      </body>
    </html>
  );
}

