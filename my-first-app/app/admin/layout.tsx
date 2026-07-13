import React from "react";
import Navigation from "@/components/Navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>My First App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
