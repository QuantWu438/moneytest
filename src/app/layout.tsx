import type { Metadata } from "next";
import { Orbitron } from 'next/font/google';
import "./globals.css";

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: "Money Personality Quiz",
  description: "Discover your money personality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} dark`}>
      <body className="bg-black">{children}</body>
    </html>
  )
}