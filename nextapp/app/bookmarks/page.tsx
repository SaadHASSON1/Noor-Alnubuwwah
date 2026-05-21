import type { Metadata } from 'next';
import BookmarksPage from '@/pages-src/BookmarksPage';

export const metadata: Metadata = { title: 'محفوظاتي' };

export default function Page() {
  return <BookmarksPage />;
}
