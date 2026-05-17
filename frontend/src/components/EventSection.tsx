import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { SeerahEvent } from '../data/seerah';
import { EventIllustration } from './EventIllustrations';

interface Props {
  event: SeerahEvent;
  index: number;
}

/* ── Chapter badge colours ── */
const CHAPTER_COLORS: Record<string, string> = {
  'الفجر':    '#C9A84C',
  'النور':    '#A8C8E8',
  'الابتلاء': '#E8A8A8',
  'الهجرة':   '#A8E8C8',
  'المعارك':  '#E8C8A8',
  'الفتح':    '#C8E8A8',
  'الوداع':   '#D4B896',
  'الرحيل':   '#8B6914',
};

/* ── Decorative Islamic diamond divider ── */
const DiamondDivider: React.FC<{ light?: boolean }> = ({ light }) => (
  <div className="flex items-center gap-3 my-6 opacity-30">
    <div className={`flex-1 h-px ${light ? 'bg-stone-700' : 'bg-islamic-gold/60'}`} />
    <div className={`w-2 h-2 rotate-45 ${light ? 'bg-stone-600' : 'bg-islamic-gold'}`} />
    <div className={`flex-1 h-px ${light ? 'bg-stone-700' : 'bg-islamic-gold/60'}`} />
  </div>
);

/* ── Type icon (SVG inline) ── */
const TypeIcon: React.FC<{ type: SeerahEvent['type']; light?: boolean }> = ({ type, light }) => {
  const color = light ? '#5a3e1b' : '#C9A84C';
  const icons: Record<string, React.ReactNode> = {
    birth: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    revelation: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    battle: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M14.5 17.5 3 6V3h3l11.5 11.5" />
        <line x1="13" y1="19" x2="19" y2="13" />
        <line x1="16" y1="16" x2="20" y2="20" />
        <line x1="19" y1="21" x2="21" y2="19" />
      </svg>
    ),
    victory: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z" />
      </svg>
    ),
    death: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    default: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={color} strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
  };
  return <>{icons[type] ?? icons.default}</>;
};

/* ══════════════════════════════════════════
   MAIN EVENT SECTION
   ══════════════════════════════════════════ */
const EventSection: React.FC<Props> = ({ event }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });

  const isLight = !!event.lightText;
  const chapterColor = CHAPTER_COLORS[event.chapter] ?? '#C9A84C';
  const textBase  = isLight ? 'text-stone-800'  : 'text-white';
  const textMuted = isLight ? 'text-stone-600'  : 'text-white/65';
  const goldColor = isLight ? '#7A5A14'         : '#C9A84C';
  const verseBg   = isLight ? 'rgba(120,90,20,0.1)' : 'rgba(201,168,76,0.06)';
  const verseBorder = isLight ? '#7A5A14'       : '#C9A84C';

  /* entrance stagger */
  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 45 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: event.bg }}
      data-event-id={event.id}
    >
      {/* Thematic SVG illustration as background watermark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: event.lightText ? 0.12 : 0.08 } : { opacity: 0 }}
        transition={{ duration: 1.5 }}
        aria-hidden="true"
      >
        <div style={{ width: '80vmin', height: '80vmin' }}>
          <EventIllustration type={event.type} light={event.lightText} />
        </div>
      </motion.div>

      {/* Left: decorative timeline dot */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-2 opacity-40">
        <div className="w-px h-16 bg-gradient-to-b from-transparent"
          style={{ background: `linear-gradient(to bottom, transparent, ${goldColor})` }} />
        <div className="w-3 h-3 rounded-full border-2 animate-dot-pulse"
          style={{ borderColor: goldColor, backgroundColor: isLight ? '#c4a882' : '#030813' }} />
        <div className="w-px h-16"
          style={{ background: `linear-gradient(to bottom, ${goldColor}, transparent)` }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16 py-24" dir="rtl">

        {/* Chapter + type icon */}
        <motion.div {...anim(0.05)} className="flex items-center gap-3 mb-5">
          <TypeIcon type={event.type} light={isLight} />
          <span
            className="font-noto text-xs tracking-widest uppercase"
            style={{ color: chapterColor }}
          >
            {event.chapter}
          </span>
          <div className="h-px flex-1 max-w-[60px] opacity-30"
            style={{ background: chapterColor }} />
        </motion.div>

        {/* Years */}
        <motion.div {...anim(0.12)} className="flex items-baseline gap-4 mb-6">
          <span className="font-noto font-bold" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', color: goldColor }}>
            {event.year_display_m}
          </span>
          <span className="font-noto" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', color: isLight ? '#8B6914' : '#C9A84C', opacity: 0.65 }}>
            {event.year_display_h}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2 {...anim(0.2)}
          className={`font-noto font-bold leading-tight mb-3 ${textBase}`}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
        >
          {event.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p {...anim(0.28)}
          className={`font-noto mb-6 ${textMuted}`}
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)' }}
        >
          {event.subtitle}
        </motion.p>

        <DiamondDivider light={isLight} />

        {/* Description */}
        <motion.p {...anim(0.36)}
          className={`font-noto leading-relaxed max-w-2xl ${textMuted}`}
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', lineHeight: 2 }}
        >
          {event.description}
        </motion.p>

        {/* Quranic verse */}
        {event.verse && (
          <motion.div {...anim(0.44)}
            className="mt-8 p-5 rounded-lg border-r-2 max-w-2xl"
            style={{ borderColor: verseBorder, background: verseBg }}
          >
            <p className="font-noto leading-loose" dir="rtl"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: goldColor }}>
              ﴿{event.verse}﴾
            </p>
            <p className="font-noto mt-2 opacity-50" style={{ fontSize: '0.8rem', color: goldColor }}>
              — {event.verse_ref}
            </p>
          </motion.div>
        )}

        {/* Highlight phrase — bottom right accent */}
        <motion.div
          {...anim(0.52)}
          className="absolute bottom-10 left-8 md:left-16"
          style={{ opacity: 0.12 }}
          aria-hidden="true"
        >
          <span className="font-noto font-bold"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: goldColor }}>
            {event.highlight}
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default EventSection;
