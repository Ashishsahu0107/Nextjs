import type { Metadata } from "next";
import "./globals.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "My First Full Stack Project Using Next.js",
  description: "This is my first full stack projects using Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
