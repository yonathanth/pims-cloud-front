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
  title: 'Leyuwork Pharmacy - Your Trusted Neighborhood Pharmacy',
  description: 'Licensed pharmacy in Hossana, Ethiopia. Providing prescription drugs, OTC medicines, medical supplies, and health advice.',
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

