import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: 'SelectedWork',
    default: 'SelectedWork',
  },
  description: 'Launch your portfolio in minutes.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>SelectedWork</title>
          <meta
            name="description"
            content="Launch your portfolio in minutes."
          />
        </head>
        <body className={`${inter.className} antialiased`}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
