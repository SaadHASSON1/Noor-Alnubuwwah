'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Moon, BookOpen, Swords, Footprints, Scroll,
  Crown, Mountain, Sunrise, Sparkles, ChevronLeft,
} from 'lucide-react';
import BookmarkButton from './BookmarkButton';
import type { SeerahEvent } from '@/data/seerah';

interface Props {
  event: SeerahEvent;
  accentColor: string;
  index: number;
  chapterBg?: string;   /* override ev.bg with chapter-consistent background */
}

const TYPE_ICONS: Record<string, React.ElementType> = {
  birth:      Moon,
  revelation: BookOpen,
  battle:     Swords,
  hijra:      Footprints,
  treaty:     Scroll,
  victory:    Crown,
  farewell:   Mountain,
  death:      Sunrise,
  life:       Sparkles,
};

const TYPE_LABELS: Record<string, string> = {
  birth:      'مولد',
  revelation: 'وحي',
  battle:     'غزوة',
  hijra:      'هجرة',
  treaty:     'معاهدة',
  victory:    'فتح',
  farewell:   'وداع',
  death:      'رحيل',
  life:       'حياة',
};

const EventCard: React.FC<Props> = ({ event, accentColor, index, chapterBg }) => {
  const router = useRouter();
  const Icon = TYPE_ICONS[event.type] ?? Sparkles;
  const isLight = !!event.lightText;
  const textBase  = isLight ? 'text-stone-800'  : 'text-white';
  const textMuted = isLight ? 'text-stone-600'  : 'text-white/60';

  return (
    <motion.article
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => router.push(`/event/${event.id}`)}
      className="group relative cursor-pointer overflow-hidden rounded-xl"
      style={{
        background: chapterBg ?? event.bg,
        border: `1px solid ${accentColor}25`,
      }}
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover shimmer */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ background: `linear-gradient(120deg, ${accentColor}10 0%, transparent 70%)` }}
      />

      {/* Left accent bar */}
      <div
        className="absolute right-0 top-0 bottom-0 w-0.5 rounded-l"
        style={{ background: `linear-gradient(to bottom, transparent, ${accentColor}80, transparent)` }}
      />

      <div className="relative z-10 p-6 flex flex-col gap-3">
        {/* Top row: type badge + year */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-kufi"
            style={{
              background: `${accentColor}18`,
              color: accentColor,
              border: `1px solid ${accentColor}30`,
            }}
          >
            <Icon size={13} strokeWidth={2} />
            <span>{TYPE_LABELS[event.type] ?? 'حدث'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-noto text-sm opacity-75" style={{ color: accentColor }}>
              {event.year_display_m}
            </span>
            <span className="font-noto text-sm opacity-60" style={{ color: accentColor }}>
              {event.year_display_h}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={`font-noto font-bold leading-snug ${textBase}`}
          style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}
        >
          {event.title}
        </h3>

        {/* Subtitle */}
        <p className={`text-base leading-relaxed ${textMuted}`}>
          {event.subtitle}
        </p>

        {/* Description preview */}
        <p
          className={`text-sm leading-loose line-clamp-4 ${textMuted}`}
          style={{ opacity: 0.9 }}
        >
          {event.description}
        </p>

        {/* Verse snippet */}
        {event.verse && (
          <div
            className="mt-1 px-4 py-3 rounded-lg border-r-2 text-sm font-noto"
            style={{
              borderColor: accentColor,
              background: `${accentColor}0a`,
              color: accentColor,
              lineHeight: 2.2,
            }}
          >
            ﴿{event.verse.split(' ').slice(0, 8).join(' ')}…﴾
          </div>
        )}

        {/* Bottom row: bookmark + read more */}
        <div className="flex items-center justify-between mt-1">
          <BookmarkButton eventId={event.id} accentColor={accentColor} size="sm" />
          <motion.span
            className="flex items-center gap-1.5 text-sm font-kufi opacity-70 group-hover:opacity-100 transition-opacity"
            style={{ color: accentColor }}
            initial={{ x: 0 }}
            whileHover={{ x: -4 }}
          >
            اقرأ التفاصيل
            <ChevronLeft size={14} strokeWidth={2} />
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
};

export default EventCard;
