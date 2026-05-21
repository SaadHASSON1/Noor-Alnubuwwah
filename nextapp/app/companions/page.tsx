import type { Metadata } from 'next';
import CompanionsPage from '@/pages-src/CompanionsPage';

export const metadata: Metadata = { title: 'الصحابة الكرام' };

export default function Page() {
  return <CompanionsPage />;
}
