import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
// import Footer from '@/components/footer';
import { bgGradiat } from './page.const';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'AI Powered PDF Reader',
  description: 'Used for summarizing PDF documents',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className={`flex-1 ${bgGradiat}`}>{children}</main>
            <Toaster position="top-right" expand={true} />
            {/* <Footer /> */}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
