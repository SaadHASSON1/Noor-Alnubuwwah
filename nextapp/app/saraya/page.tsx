import type { Metadata } from 'next';
import SarayaPage from '@/pages-src/SarayaPage';

export const metadata: Metadata = { title: 'السرايا العسكرية في الإسلام' };

export default function Page() {
  return <SarayaPage />;
}
