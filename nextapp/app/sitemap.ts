import type { MetadataRoute } from 'next';
import { SEERAH_EVENTS, CHAPTER_META } from '@/data/seerah';

const BASE_URL = 'https://noor-alnubuwwah.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/', '/timeline', '/map', '/companions', '/miracles', '/quiz',
    '/farewell-sermon', '/family-tree', '/character', '/wives',
    '/prophecies', '/names', '/scribes', '/sources', '/battles',
    '/saraya', '/letters', '/hijra', '/daily-life',
  ].map(path => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
  }));

  const chapterRoutes = Object.keys(CHAPTER_META).map(name => ({
    url: `${BASE_URL}/chapter/${encodeURIComponent(name)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const eventRoutes = SEERAH_EVENTS.map(e => ({
    url: `${BASE_URL}/event/${e.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...chapterRoutes, ...eventRoutes];
}
