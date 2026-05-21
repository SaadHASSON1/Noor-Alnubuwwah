import type { Metadata } from 'next';
import PropheciesPage from '@/pages-src/PropheciesPage';

export const metadata: Metadata = { title: 'نبوءات النبي محمد ﷺ' };

export default function Page() {
  return <PropheciesPage />;
}
