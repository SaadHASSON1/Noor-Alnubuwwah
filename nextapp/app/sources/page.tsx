import type { Metadata } from 'next';
import SourcesPage from '@/pages-src/SourcesPage';

export const metadata: Metadata = { title: 'المصادر والمراجع' };

export default function Page() {
  return <SourcesPage />;
}
