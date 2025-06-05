import { Footer, NavBar } from '@/components/index';
import { ThemeProvider } from '@/components/theme-provider';
import SiteConfig from '@/config/site';
import { AuthProvider } from '@/lib/AuthProvider';
import { ToastProvider } from '@/components/ui/toast-context';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          'scroll-p-20 scroll-smooth'
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />
          <ToastProvider>
            <AuthProvider>
              <div className='flex flex-col justify-between w-full mx-auto min-h-[90vh]'>
                <NavBar /> 
                {children}
                <Footer />
              </div>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
