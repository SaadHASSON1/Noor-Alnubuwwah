import type { Metadata } from 'next';
import HijraPage from '@/pages-src/HijraPage';

export const metadata: Metadata = { title: 'رحلة الهجرة النبوية الشريفة' };

export default function Page() {
  return <HijraPage />;
}
