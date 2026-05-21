import type { Metadata } from 'next';
import DailyLifePage from '@/pages-src/DailyLifePage';

export const metadata: Metadata = { title: 'الحياة اليومية للنبي محمد ﷺ' };

export default function Page() {
  return <DailyLifePage />;
}
