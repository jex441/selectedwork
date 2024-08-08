'use client';

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { ClerkProvider } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
export default function RootLayout(props) {
  console.log(usePathname());
  return (
    <html>
      <body>{props.children}</body>
    </html>
  );
}
