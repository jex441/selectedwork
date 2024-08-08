import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { ClerkProvider } from '@clerk/nextjs';
import Home from './home';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
