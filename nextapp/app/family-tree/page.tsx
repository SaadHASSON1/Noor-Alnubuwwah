import type { Metadata } from 'next';
import FamilyTreePage from '@/pages-src/FamilyTreePage';

export const metadata: Metadata = { title: 'شجرة النسب الشريف' };

export default function Page() {
  return <FamilyTreePage />;
}
