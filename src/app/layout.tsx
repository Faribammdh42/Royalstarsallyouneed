import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Urbanist } from 'next/font/google';
import { cn } from '@/lib/utils';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Royal Stars - Allyouneed Company',
  description: 'All You Need Music Platform by Allyouneed Company',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.png',
    apple: '/icon-512.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(urbanist.variable)}>
      <head />
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
