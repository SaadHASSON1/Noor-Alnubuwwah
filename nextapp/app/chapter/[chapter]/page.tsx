import type { Metadata } from 'next';
import ChapterPage from '@/pages-src/ChapterPage';
import { CHAPTER_META } from '@/data/seerah';

type Props = { params: Promise<{ chapter: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapter } = await params;
  const name = decodeURIComponent(chapter);
  const meta = CHAPTER_META[name];
  return {
    title: meta ? `${meta.name} — ${meta.subtitle}` : name,
    description: meta?.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(CHAPTER_META).map(name => ({
    chapter: encodeURIComponent(name),
  }));
}

export default function Page() {
  return <ChapterPage />;
}
