import type { Metadata } from 'next';
import ChapterPage from '@/pages-src/ChapterPage';
import { CHAPTER_META } from '@/data/seerah';

type Props = { params: Promise<{ chapterName: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapterName } = await params;
  const name = decodeURIComponent(chapterName);
  const meta = CHAPTER_META[name];
  return {
    title: meta ? `${meta.name} — ${meta.subtitle}` : name,
    description: meta?.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(CHAPTER_META).map(name => ({
    chapterName: encodeURIComponent(name),
  }));
}

export default function Page() {
  return <ChapterPage />;
}
