import type { Metadata } from 'next';
import TimelinePage from '@/pages-src/TimelinePage';

export const metadata: Metadata = { title: 'التسلسل الزمني للسيرة النبوية الشريفة' };

export default function Page() {
  return <TimelinePage />;
}
