import type { ReactNode } from 'react'
import Navigation from '../../components/Navigation'
import '@/app/globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Next js</title>
      </head>
      <body>
        <Navigation/>
        {children}</body>
    </html>
  );
}
