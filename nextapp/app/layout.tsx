import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
  title: {
    default: 'نور النبوة — السيرة النبوية الشريفة',
    template: '%s | نور النبوة',
  },
  description: 'موقع تفاعلي شامل للسيرة النبوية الشريفة — تسلسل زمني، خرائط، غزوات، معجزات، وأحداث حياة النبي محمد ﷺ',
  keywords: ['سيرة نبوية', 'نور النبوة', 'محمد', 'النبي', 'الإسلام', 'السيرة الشريفة'],
  metadataBase: new URL('https://noor-alnubuwwah.x13labs.com'),
  openGraph: {
    title: 'نور النبوة — السيرة النبوية الشريفة',
    description: 'موقع تفاعلي شامل للسيرة النبوية الشريفة',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;500;600;700&family=Reem+Kufi:wght@400;500;700&family=Amiri:ital,wght@0,400;0,700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css" rel="stylesheet" />
      </head>
      <body className="bg-dark-bg text-white font-noto antialiased overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
