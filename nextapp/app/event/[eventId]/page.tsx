import type { Metadata } from 'next';
import EventPage from '@/pages-src/EventPage';
import { SEERAH_EVENTS } from '@/data/seerah';

type Props = { params: Promise<{ eventId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventId } = await params;
  const event = SEERAH_EVENTS.find(e => e.id === Number(eventId));
  return {
    title: event ? event.title : 'حدث من السيرة',
    description: event?.subtitle,
  };
}

export async function generateStaticParams() {
  return SEERAH_EVENTS.map(e => ({ eventId: String(e.id) }));
}

export default function Page() {
  return <EventPage />;
}
