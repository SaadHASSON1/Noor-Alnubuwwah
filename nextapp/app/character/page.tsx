import type { Metadata } from 'next';
import CharacterPage from '@/pages-src/CharacterPage';

export const metadata: Metadata = { title: 'صفات النبي محمد ﷺ' };

export default function Page() {
  return <CharacterPage />;
}
