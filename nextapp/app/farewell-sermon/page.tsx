import type { Metadata } from 'next';
import FarewellSermonPage from '@/pages-src/FarewellSermonPage';

export const metadata: Metadata = { title: 'خطبة الوداع الكاملة' };

export default function Page() {
  return <FarewellSermonPage />;
}
