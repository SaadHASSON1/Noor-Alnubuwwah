import type { Metadata } from 'next';
import NamesPage from '@/pages-src/NamesPage';

export const metadata: Metadata = { title: 'أسماء النبي محمد ﷺ' };

export default function Page() {
  return <NamesPage />;
}
