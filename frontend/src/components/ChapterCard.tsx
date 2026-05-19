import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import type { ChapterMeta } from '../data/seerah';

interface Props {
  chapter: ChapterMeta;
  eventCount: number;
  index: number;
}

const ChapterCard: React.FC<Props> = ({ chapter, eventCount, index }) => {
  const navigate = useNavigate();
  const isLight = chapter.name === 'الرحيل';
  const textBase  = isLight ? 'text-stone-800' : 'text-white';
  const textMuted = isLight ? 'text-stone-600' : 'text-white/60';

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => navigate(`/chapter/${encodeURIComponent(chapter.name)}`)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${chapter.gradientFrom} 0%, ${chapter.gradientTo} 100%)`,
        border: `1px solid ${chapter.accentColor}22`,
        minHeight: 240,
      }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Shimmer border on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${chapter.accentColor}18 0%, transparent 60%)`,
          border: `1px solid ${chapter.accentColor}55`,
        }}
      />

      {/* Background year watermark */}
      <div
        className="absolute inset-0 flex items-end justify-start overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-noto font-bold opacity-[0.04] leading-none"
          style={{ fontSize: 'clamp(5rem, 12vw, 10rem)', color: chapter.accentColor }}
        >
          {chapter.name}
        </span>
      </div>

      {/* Arabesque dot decoration */}
      <div
        className="absolute top-4 left-4 w-20 h-20 rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${chapter.accentColor}, transparent)` }}
      />

      {/* Content */}
      <div className="relative z-10 p-7 flex flex-col h-full" style={{ minHeight: 240 }}>
        {/* Chapter number badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="font-kufi text-sm tracking-widest px-3 py-1.5 rounded-full"
            style={{
              color: chapter.accentColor,
              background: `${chapter.accentColor}18`,
              border: `1px solid ${chapter.accentColor}35`,
            }}
          >
            {eventCount} أحداث
          </span>
          <span
            className="font-noto text-sm opacity-75"
            style={{ color: chapter.accentColor }}
          >
            {chapter.years}
          </span>
        </div>

        {/* Chapter name */}
        <h2
          className={`font-noto font-bold mb-2 ${textBase}`}
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1 }}
        >
          {chapter.name}
        </h2>

        {/* Subtitle */}
        <p
          className="font-kufi text-base mb-4 tracking-wide"
          style={{ color: chapter.accentColor, opacity: 0.95 }}
        >
          {chapter.subtitle}
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 mb-4 opacity-40">
          <div className="flex-1 h-px" style={{ background: chapter.accentColor }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: chapter.accentColor }} />
        </div>

        {/* Description */}
        <p
          className={`text-sm leading-relaxed flex-1 ${textMuted}`}
          style={{ lineHeight: 2, opacity: 0.9 }}
        >
          {chapter.description}
        </p>

        {/* CTA arrow */}
        <div className="flex items-center justify-end mt-5">
          <motion.div
            className="flex items-center gap-2 text-sm font-kufi"
            style={{ color: chapter.accentColor }}
            initial={{ x: 0 }}
            whileHover={{ x: -4 }}
          >
            <span className="opacity-85">استعرض الفصل</span>
            <ChevronLeft size={16} strokeWidth={2} />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

export default ChapterCard;
