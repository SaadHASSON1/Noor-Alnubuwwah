import type { Metadata } from 'next';
import MapPage from '@/pages-src/MapPage';

export const metadata: Metadata = { title: 'خريطة السيرة النبوية التفاعلية' };

export default function Page() {
  return <MapPage />;
}
