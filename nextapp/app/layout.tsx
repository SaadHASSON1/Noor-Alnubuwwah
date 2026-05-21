import type { Metadata } from 'next';
import { Scheherazade_New, Reem_Kufi, Amiri } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const scheherazade = Scheherazade_New({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--loaded-noto',
  display: 'swap',
});

const reemKufi = Reem_Kufi({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--loaded-kufi',
  display: 'swap',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--loaded-amiri',
  display: 'swap',
});

export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
  title: {
    default: '‏نور النبوة — السيرة النبوية الشريفة',
    template: '‏%s | نور النبوة',
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
    <html lang="ar" dir="rtl" className={`${scheherazade.variable} ${reemKufi.variable} ${amiri.variable}`}>
      <head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css" rel="stylesheet" />
      </head>
      <body className="bg-dark-bg text-white font-noto antialiased overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
