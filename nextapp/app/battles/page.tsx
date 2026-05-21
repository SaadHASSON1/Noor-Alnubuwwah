import type { Metadata } from 'next';
import BattlesPage from '@/pages-src/BattlesPage';

export const metadata: Metadata = { title: 'غزوات النبي محمد ﷺ' };

export default function Page() {
  return <BattlesPage />;
}
