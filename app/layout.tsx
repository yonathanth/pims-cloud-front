import type { Metadata } from 'next';
import './globals.scss';

export const metadata: Metadata = {
  title: 'PIMS Analytics',
  description: 'Pharmacy Inventory Management System Analytics Dashboard Online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

