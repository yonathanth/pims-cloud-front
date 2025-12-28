import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '@carbon/styles/css/styles.css';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Leyuwork Pharmacy - Your Trusted Neighborhood Pharmacy',
    template: '%s | Leyuwork Pharmacy',
  },
  description: 'Licensed pharmacy in Hossana, Ethiopia. Providing prescription drugs, OTC medicines, medical supplies, and health advice.',
  keywords: ['pharmacy', 'Hossana', 'Ethiopia', 'prescription drugs', 'OTC medicines', 'medical supplies', 'health advice', 'licensed pharmacy', 'drug store'],
  authors: [{ name: 'Leyuwork Pharmacy' }],
  creator: 'Leyuwork Pharmacy',
  publisher: 'Leyuwork Pharmacy',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'Leyuwork Pharmacy',
    title: 'Leyuwork Pharmacy - Your Trusted Neighborhood Pharmacy',
    description: 'Licensed pharmacy in Hossana, Ethiopia. Providing prescription drugs, OTC medicines, medical supplies, and health advice.',
    images: [
      {
        url: '/pharma.jpg',
        width: 1200,
        height: 630,
        alt: 'Leyuwork Pharmacy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leyuwork Pharmacy - Your Trusted Neighborhood Pharmacy',
    description: 'Licensed pharmacy in Hossana, Ethiopia. Providing prescription drugs, OTC medicines, medical supplies, and health advice.',
    images: ['/pharma.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  verification: {
    // Add Google Search Console verification when available
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}

