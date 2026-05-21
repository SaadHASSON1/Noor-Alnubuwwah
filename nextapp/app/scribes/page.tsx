import type { Metadata } from 'next';
import ScribesPage from '@/pages-src/ScribesPage';

export const metadata: Metadata = { title: 'كتّاب الوحي' };

export default function Page() {
  return <ScribesPage />;
}
