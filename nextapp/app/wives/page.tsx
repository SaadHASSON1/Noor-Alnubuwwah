import type { Metadata } from 'next';
import WivesPage from '@/pages-src/WivesPage';

export const metadata: Metadata = { title: 'أمهات المؤمنين' };

export default function Page() {
  return <WivesPage />;
}
