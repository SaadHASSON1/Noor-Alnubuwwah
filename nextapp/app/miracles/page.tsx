import type { Metadata } from 'next';
import MiraclesPage from '@/pages-src/MiraclesPage';

export const metadata: Metadata = { title: 'معجزات النبي محمد ﷺ' };

export default function Page() {
  return <MiraclesPage />;
}
