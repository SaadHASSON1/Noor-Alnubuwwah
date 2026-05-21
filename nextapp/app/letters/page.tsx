import type { Metadata } from 'next';
import LettersPage from '@/pages-src/LettersPage';

export const metadata: Metadata = { title: 'رسائل النبي للملوك والأمراء' };

export default function Page() {
  return <LettersPage />;
}
