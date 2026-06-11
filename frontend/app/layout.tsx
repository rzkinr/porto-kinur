import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import LayoutWrapper from '@/components/LayoutWrapper';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Rizki Nur Rokhim — Full-Stack Developer',
    template: '%s | Rizki Nur Rokhim',
  },
  description:
    'Portfolio Rizki Nur Rokhim, full-stack developer dari Magetan, Indonesia. Berpengalaman di Next.js, Golang, dan automation.',
  keywords: [
    'Rizki Nur Rokhim',
    'Full Stack Developer',
    'Golang Developer',
    'Next.js Developer',
    'Portfolio',
  ],
  authors: [{ name: 'Rizki Nur Rokhim' }],
  openGraph: {
    title: 'Rizki Nur Rokhim — Junior Full-Stack Developer',
    description:
      'Portfolio Rizki Nur Rokhim, junior full-stack developer dari Magetan, Indonesia.',
    url: 'https://kinur.my.id',
    siteName: 'kinur.dev',
    images: [
      {
        url: 'https://kinur.my.id/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rizki Nur Rokhim — Junior Full-Stack Developer',
    description:
      'Portfolio Rizki Nur Rokhim, junior full-stack developer dari Magetan, Indonesia.',
    images: ['https://kinur.my.id/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
