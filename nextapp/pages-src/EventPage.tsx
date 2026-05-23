'use client';
import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ChevronRight, Home, MapPin, Users, BookOpen,
  BarChart2, Clock, ChevronLeft, Swords, BookText, Sun,
} from 'lucide-react';
import Link from 'next/link';
import IslamicParticles from '@/components/IslamicParticles';
import ShareButton from '@/components/ShareButton';
import BookmarkButton from '@/components/BookmarkButton';
import BattleSimulator from '@/components/BattleSimulator';
import SectionNavigator, { NavSection } from '@/components/SectionNavigator';
import { SEERAH_EVENTS, CHAPTER_META, SEERAH_EVENTS as ALL } from '@/data/seerah';
import { BATTLE_SIMULATIONS } from '@/data/battleSimulations';
import { useReadingMode } from '@/context/ReadingModeContext';
import { useLanguage } from '@/context/LanguageContext';
import { SEERAH_EN } from '@/data/seerah-en';
import { t } from '@/lib/i18n';
import type { SeerahEvent } from '@/data/seerah';

/* ── Section block wrapper ── */
const Section: React.FC<{
  id?: string;
  icon: React.ReactNode;
  title: string;
  accentColor: string;
  children: React.ReactNode;
  delay?: number;
}> = ({ id, icon, title, accentColor, children, delay = 0 }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-5%' }}
    transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="mb-12"
  >
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}35` }}
      >
        {icon}
      </div>
      <h3
        className="font-noto font-bold"
        style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: accentColor }}
      >
        {title}
      </h3>
      <div className="flex-1 h-px opacity-20" style={{ background: accentColor }} />
    </div>
    {children}
  </motion.div>
);

/* ── Diamond divider ── */
const Divider: React.FC<{ color: string }> = ({ color }) => (
  <div className="flex items-center gap-3 my-8 opacity-20" aria-hidden>
    <div className="flex-1 h-px" style={{ background: color }} />
    <div className="w-1.5 h-1.5 rotate-45" style={{ background: color }} />
    <div className="flex-1 h-px" style={{ background: color }} />
  </div>
);

const EventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const router = useRouter();
  const id = Number(eventId);
  const { isReading, toggle: toggleReading } = useReadingMode();
  const { lang, isEn } = useLanguage();

  const event: SeerahEvent | undefined = ALL.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#030813' }}>
        <div className="text-center" dir={isEn ? 'ltr' : 'rtl'}>
          <p className="font-noto text-white/50 text-xl mb-4">{t(lang, 'notFound')}</p>
          <button onClick={() => router.push('/')}
            className="font-kufi text-islamic-gold text-sm border border-islamic-gold/30 px-6 py-2 rounded-full hover:bg-islamic-gold/10 transition-colors">
            {t(lang, 'backHome')}
          </button>
        </div>
      </div>
    );
  }

  /* English overlay (may be undefined for untranslated events) */
  const enData = SEERAH_EN[event.id];

  /* Resolved text — falls back to Arabic if no English translation */
  const displayTitle       = isEn && enData ? enData.title       : event.title;
  const displaySubtitle    = isEn && enData ? enData.subtitle    : event.subtitle;
  const displayDescription = isEn && enData
    ? (enData.fullDescription ?? enData.description)
    : (event.fullDescription ?? event.description);
  const displayHighlight   = isEn && enData ? enData.highlight   : event.highlight;
  const displayHighlights  = isEn && enData?.highlights ? enData.highlights : event.highlights;
  const displayLocation    = isEn && enData?.location   ? enData.location   : event.location;

  const meta = CHAPTER_META[event.chapter];
  const accentColor = meta?.accentColor ?? '#C9A84C';
  const isLight = !!event.lightText;
  const textBase  = isReading ? 'text-stone-800' : (isLight ? 'text-stone-800'  : 'text-white');
  const textMuted = isReading ? 'text-stone-600' : (isLight ? 'text-stone-600'  : 'text-white/65');

  /* Section navigator entries — only include sections that exist for this event */
  const navSections = useMemo<NavSection[]>(() => {
    const secs: NavSection[] = [];
    if (event.highlights?.length || (isEn && enData?.highlights?.length))
                                     secs.push({ id: 'ev-highlights', label: t(lang, 'highlights') });
    if (event.stats?.length)         secs.push({ id: 'ev-stats',      label: t(lang, 'stats') });
    if (event.battleTimeline?.length) secs.push({ id: 'ev-timeline',  label: t(lang, 'battleTimeline') });
    if (BATTLE_SIMULATIONS.some(s => s.eventId === event.id))
                                     secs.push({ id: 'ev-simulation', label: t(lang, 'battleSim') });
    if (event.keyFigures?.length)    secs.push({ id: 'ev-figures',    label: t(lang, 'keyFigures') });
    if (event.hadiths?.length)       secs.push({ id: 'ev-hadiths',    label: t(lang, 'hadiths') });
    if (event.relatedVerses?.length) secs.push({ id: 'ev-verses',     label: t(lang, 'verses') });
    return secs;
  }, [event, lang, isEn, enData]);

  /* Prev / Next event */
  const allIdx = SEERAH_EVENTS.findIndex(e => e.id === id);
  const prevEvent = allIdx > 0 ? SEERAH_EVENTS[allIdx - 1] : null;
  const nextEvent = allIdx < SEERAH_EVENTS.length - 1 ? SEERAH_EVENTS[allIdx + 1] : null;

  const readBg    = '#faf6ee';
  const readText  = '#2a1a00';
  const readMuted = '#6b4c20';

  return (
    <div
      className="min-h-screen relative"
      dir={isEn ? 'ltr' : 'rtl'}
      style={{ background: isReading ? readBg : event.bg, transition: 'background 0.4s ease' }}
    >
      {!isLight && !isReading && <IslamicParticles />}
      <SectionNavigator sections={navSections} accentColor={accentColor} />

      {/* ══ Full-screen hero ══ */}
      <section
        className="relative min-h-screen flex flex-col justify-end overflow-hidden"
        style={{ background: isReading ? readBg : event.bg, transition: 'background 0.4s ease' }}
      >
        {/* Stars */}
        {!isLight && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 60 }, (_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 70}%`,
                  width: Math.random() * 1.5 + 0.3,
                  height: Math.random() * 1.5 + 0.3,
                  '--dur': `${(Math.random() * 3 + 2).toFixed(1)}s`,
                  '--delay': `${(Math.random() * 5).toFixed(1)}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* Year watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <span
            className="font-noto font-bold opacity-[0.05]"
            style={{ fontSize: 'clamp(8rem, 30vw, 40rem)', color: accentColor, lineHeight: 1 }}
          >
            {event.year_display_m}
          </span>
        </div>

        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 20% 50%, ${accentColor}10 0%, transparent 55%)`,
          }}
        />

        {/* Nav breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-4 right-16 sm:right-20 z-[20] flex items-center gap-1 text-sm font-kufi max-w-[calc(100vw-5rem)] overflow-hidden"
          style={{ color: accentColor }}
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 py-2 px-1 opacity-60 hover:opacity-100 active:opacity-100 transition-opacity flex-shrink-0"
          >
            <Home size={14} />
            {t(lang, 'home')}
          </Link>
          <ChevronRight size={14} className="opacity-40 flex-shrink-0" />
          <Link
            href={`/chapter/${event.chapter}`}
            className="py-2 px-1 opacity-60 hover:opacity-100 active:opacity-100 transition-opacity truncate"
          >
            {event.chapter}
          </Link>
          <ChevronRight size={14} className="opacity-40 flex-shrink-0" />
          <span className="opacity-90 truncate max-w-[100px]">{displayTitle}</span>
        </motion.nav>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 pb-20 pt-32">
          {/* Action buttons row */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <ShareButton
              title={displayTitle}
              accentColor={accentColor}
              quote={displayHighlight}
              description={isEn && enData ? enData.description : event.description}
            />
            <BookmarkButton eventId={event.id} accentColor={accentColor} />
            {/* Reading Mode toggle */}
            <motion.button
              onClick={toggleReading}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              className="flex items-center gap-1.5 font-kufi rounded-full transition-colors duration-200"
              style={{
                padding: '0.5rem 0.85rem',
                fontSize: '0.82rem',
                background: isReading ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isReading ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.12)'}`,
                color: isReading ? readText : 'rgba(255,255,255,0.7)',
              }}
              title={isReading ? (isEn ? 'Normal Mode' : 'إيقاف وضع القراءة') : (isEn ? 'Reading Mode' : 'وضع القراءة')}
            >
              {isReading
                ? <><Sun size={15} strokeWidth={1.8} /><span>{isEn ? 'Normal' : 'عادي'}</span></>
                : <><BookText size={15} strokeWidth={1.8} /><span>{t(lang, 'readingMode')}</span></>
              }
            </motion.button>
          </div>

          {/* Chapter + type badge */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span
              className="font-kufi text-sm px-3 py-1 rounded-full"
              style={{
                color: accentColor,
                background: `${accentColor}15`,
                border: `1px solid ${accentColor}30`,
              }}
            >
              {event.chapter}
            </span>
            {displayLocation && (
              <span
                className="font-noto text-sm flex items-center gap-1 opacity-60"
                style={{ color: accentColor }}
              >
                <MapPin size={13} />
                {displayLocation}
              </span>
            )}
          </motion.div>

          {/* Years */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-baseline gap-4 mb-4"
          >
            <span className="font-noto font-bold" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', color: accentColor }}>
              {event.year_display_m}
            </span>
            <span className="font-noto opacity-50" style={{ fontSize: 'clamp(1rem, 2vw, 1.6rem)', color: accentColor }}>
              {event.year_display_h}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className={`font-bold leading-tight mb-3 ${isEn ? 'font-sans' : 'font-noto'}`}
            style={{
              fontSize: isReading ? 'clamp(2.2rem, 7vw, 5rem)' : 'clamp(3rem, 10vw, 8rem)',
              color: isReading ? readText : (isLight ? '#2d1e08' : 'white'),
              transition: 'font-size 0.3s ease, color 0.3s ease',
            }}
          >
            {displayTitle}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
              color: isReading ? readMuted : undefined,
              marginBottom: '1.5rem',
            }}
            className={isReading ? '' : textMuted}
          >
            {displaySubtitle}
          </motion.p>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center gap-3 mb-8 origin-right"
            style={{ opacity: isReading ? 0.4 : 0.3 }}
          >
            <div className="h-px w-32" style={{ background: accentColor }} />
            <div className="w-2 h-2 rotate-45" style={{ background: accentColor }} />
            <div className="h-px flex-1 max-w-xs" style={{ background: `linear-gradient(to left, transparent, ${accentColor}60)` }} />
          </motion.div>

          {/* Description / Full Story */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontSize: isReading ? 'clamp(1.1rem, 2vw, 1.35rem)' : 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: isReading ? 2.6 : 2.2,
              color: isReading ? readText : undefined,
              maxWidth: '42rem',
              whiteSpace: 'pre-line',
            }}
            className={isReading ? '' : `max-w-2xl ${textMuted}`}
          >
            {displayDescription}
          </motion.p>

          {/* Primary Quranic verse */}
          {event.verse && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="mt-8 p-6 rounded-xl border-r-2 max-w-2xl"
              style={{
                borderColor: accentColor,
                background: `${accentColor}08`,
              }}
            >
              <p
                className="font-noto leading-loose"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: accentColor }}
              >
                ﴿{event.verse}﴾
              </p>
              {isEn && enData?.verse_en && (
                <p
                  className="font-sans italic mt-3 opacity-85"
                  style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', color: accentColor, lineHeight: 1.8 }}
                >
                  {enData.verse_en}
                </p>
              )}
              <p className="font-kufi mt-3 opacity-80 text-sm tracking-wider" style={{ color: accentColor }}>
                — {event.verse_ref}
              </p>
            </motion.div>
          )}
        </div>

        {/* Scroll down hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        >
          <p className="font-kufi text-xs tracking-widest opacity-40" style={{ color: accentColor }}>
            {isEn ? 'details' : 'التفاصيل'}
          </p>
          <motion.div
            className="w-px h-10"
            style={{ background: `linear-gradient(to bottom, ${accentColor}60, transparent)` }}
            animate={{ scaleY: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ══ Detail sections ══ */}
      <section
        className="relative py-20 px-5 md:px-12"
        style={{
          background: isReading ? readBg : (isLight ? event.bg : `linear-gradient(to bottom, ${event.bg} 0%, #030813 30%)`),
          transition: 'background 0.4s ease',
        }}
      >
        <div className="max-w-4xl mx-auto">

          {/* ── Highlights ── */}
          {displayHighlights && displayHighlights.length > 0 && (
            <motion.div
              id="ev-highlights"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-noto text-base"
                  style={{ background: `${accentColor}18`, border: `1px solid ${accentColor}35`, color: accentColor }}
                >
                  ✦
                </div>
                <h3
                  className="font-noto font-bold"
                  style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', color: accentColor }}
                >
                  {t(lang, 'highlights')}
                </h3>
                <div className="flex-1 h-px opacity-20" style={{ background: accentColor }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displayHighlights?.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{
                      background: `${accentColor}08`,
                      border: `1px solid ${accentColor}18`,
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 rotate-45"
                      style={{ background: accentColor }}
                    />
                    <p className={`text-base leading-loose ${textMuted}`} style={{ lineHeight: 2.1 }}>
                      {h}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}


          {/* ── Stats ── */}
          {event.stats && event.stats.length > 0 && (
            <Section
              id="ev-stats"
              icon={<BarChart2 size={16} color={accentColor} strokeWidth={1.5} />}
              title={t(lang, 'stats')}
              accentColor={accentColor}
              delay={0}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {event.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-xl p-5 text-center min-w-0"
                    style={{
                      background: `${accentColor}0d`,
                      border: `1px solid ${accentColor}20`,
                    }}
                  >
                    {/* Label above — bigger and prominent */}
                    <p
                      className="font-kufi tracking-wider mb-2"
                      style={{ fontSize: '0.82rem', color: `${accentColor}`, letterSpacing: '0.05em', wordBreak: 'break-word', textWrap: 'wrap' }}
                    >
                      {isEn && enData?.statsLabels ? enData.statsLabels[i] : stat.label}
                    </p>
                    {/* Value below — slightly smaller */}
                    <p
                      className="font-noto font-bold"
                      style={{ fontSize: 'clamp(1.1rem, 2.8vw, 1.9rem)', color: accentColor }}
                    >
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Section>
          )}

          {/* ── Battle timeline ── */}
          {event.battleTimeline && event.battleTimeline.length > 0 && (
            <Section
              id="ev-timeline"
              icon={<Clock size={16} color={accentColor} strokeWidth={1.5} />}
              title={t(lang, 'battleTimeline')}
              accentColor={accentColor}
              delay={0.05}
            >
              <div className="relative">
                {/* Timeline line */}
                <div
                  className="absolute right-4 top-0 bottom-0 w-px timeline-line"
                  style={{ background: `linear-gradient(to bottom, transparent, ${accentColor}60, transparent)` }}
                />
                <div className="space-y-6 pr-12">
                  {event.battleTimeline.map((phase, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="relative"
                    >
                      {/* Dot */}
                      <div
                        className="absolute -right-[2.45rem] top-1.5 w-3 h-3 rounded-full border-2 animate-dot-pulse"
                        style={{ borderColor: accentColor, background: event.bg }}
                      />
                      <h4
                        className="font-kufi text-base mb-2 font-bold"
                        style={{ color: accentColor }}
                      >
                        {isEn && enData?.battleTimelineEn ? enData.battleTimelineEn[i].phase : phase.phase}
                      </h4>
                      <p
                        className={`text-base leading-loose ${textMuted}`}
                        style={{ lineHeight: 2.1 }}
                      >
                        {isEn && enData?.battleTimelineEn ? enData.battleTimelineEn[i].detail : phase.detail}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>
          )}

          {/* ── Battle Simulation ── */}
          {(() => {
            const sim = BATTLE_SIMULATIONS.find(s => s.eventId === event.id);
            if (!sim) return null;
            return (
              <Section id="ev-simulation" icon={<Swords size={16} color={accentColor} strokeWidth={1.5} />} title={t(lang, 'battleSim')} accentColor={accentColor} delay={0.5}>
                <BattleSimulator sim={sim} accentColor={accentColor} />
              </Section>
            );
          })()}

          {/* ── Key figures ── */}
          {event.keyFigures && event.keyFigures.length > 0 && (
            <>
              <Divider color={accentColor} />
              <Section
                id="ev-figures"
                icon={<Users size={16} color={accentColor} strokeWidth={1.5} />}
                title={t(lang, 'keyFigures')}
                accentColor={accentColor}
                delay={0.1}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {event.keyFigures.map((fig, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.06 }}
                      className="flex items-center gap-4 p-4 rounded-xl min-w-0"
                      style={{
                        background: `${accentColor}09`,
                        border: `1px solid ${accentColor}18`,
                      }}
                    >
                      {/* Avatar circle */}
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-noto font-bold text-lg"
                        style={{
                          background: `${accentColor}20`,
                          color: accentColor,
                          border: `1px solid ${accentColor}35`,
                        }}
                      >
                        {fig.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-noto font-bold text-base ${textBase}`}>{fig.name}</p>
                        <p className={`font-kufi text-sm opacity-80 line-clamp-2 ${textMuted}`}>
                          {isEn && enData?.keyFiguresEn ? enData.keyFiguresEn[i].role : fig.role}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Section>
            </>
          )}

          {/* ── Hadiths ── */}
          {event.hadiths && event.hadiths.length > 0 && (
            <>
              <Divider color={accentColor} />
              <Section
                id="ev-hadiths"
                icon={<BookOpen size={16} color={accentColor} strokeWidth={1.5} />}
                title={t(lang, 'hadiths')}
                accentColor={accentColor}
                delay={0.1}
              >
                <div className="space-y-5">
                  {event.hadiths.map((hadith, i) => (
                    <motion.blockquote
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: i * 0.1 }}
                      className="relative p-6 rounded-xl border-r-4"
                      style={{
                        borderColor: accentColor,
                        background: `${accentColor}07`,
                      }}
                    >
                      {/* Opening quote mark */}
                      <div
                        className="absolute top-3 left-4 font-noto text-4xl opacity-15 leading-none pointer-events-none select-none"
                        style={{ color: accentColor }}
                        aria-hidden
                      >
                        ❝
                      </div>
                      <p
                        className={`font-noto leading-loose ${textBase}`}
                        style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 2.2 }}
                      >
                        {isEn && enData?.hadithsEn ? enData.hadithsEn[i].text : hadith.text}
                      </p>
                      <footer className="mt-4 flex items-center gap-2">
                        <div className="h-px flex-1 opacity-30" style={{ background: accentColor }} />
                        <cite
                          className="font-kufi text-sm not-italic opacity-80"
                          style={{ color: accentColor }}
                        >
                          {isEn && enData?.hadithsEn ? enData.hadithsEn[i].source : hadith.source}
                        </cite>
                      </footer>
                    </motion.blockquote>
                  ))}
                </div>
              </Section>
            </>
          )}

          {/* ── Additional verses ── */}
          {event.relatedVerses && event.relatedVerses.length > 0 && (
            <>
              <Divider color={accentColor} />
              <Section
                id="ev-verses"
                icon={<BookOpen size={16} color={accentColor} strokeWidth={1.5} />}
                title={t(lang, 'verses')}
                accentColor={accentColor}
                delay={0.1}
              >
                <div className="space-y-4">
                  {event.relatedVerses.map((v, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="p-5 rounded-xl border-r-2"
                      style={{ borderColor: accentColor, background: `${accentColor}08` }}
                    >
                      <p
                        className="font-noto leading-loose mb-2"
                        style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: accentColor }}
                      >
                        ﴿{v.verse}﴾
                      </p>
                      {isEn && enData?.relatedVersesEn && enData.relatedVersesEn[i]?.verse_translation && (
                        <p
                          className="font-sans italic mt-2 opacity-85"
                          style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.05rem)', color: accentColor, lineHeight: 1.8 }}
                        >
                          {enData.relatedVersesEn[i].verse_translation}
                        </p>
                      )}
                      <p className="font-kufi text-sm opacity-80 mt-2" style={{ color: accentColor }}>
                        — {v.ref}
                      </p>
                      {v.context && (
                        <p className={`text-sm mt-3 leading-loose opacity-90 ${textMuted}`}>
                          {isEn && enData?.relatedVersesEn ? enData.relatedVersesEn[i]?.context : v.context}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </Section>
            </>
          )}

          {/* ── No extra details placeholder ── */}
          {!event.stats && !event.hadiths && !event.keyFigures && !event.battleTimeline && !event.relatedVerses && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <p
                className="font-noto opacity-30"
                style={{ color: accentColor, fontSize: '1.1rem', lineHeight: 2 }}
              >
                التفاصيل الإضافية قيد الإضافة
              </p>
            </motion.div>
          )}

          {/* ── Prev / Next navigation ── */}
          <Divider color={accentColor} />
          <div className="flex items-stretch justify-between gap-4 mt-8">
            {nextEvent ? (
              <motion.button
                onClick={() => router.push(`/event/${nextEvent.id}`)}
                className="flex-1 flex items-center gap-3 p-4 rounded-xl text-right group"
                style={{
                  background: `${accentColor}09`,
                  border: `1px solid ${accentColor}20`,
                }}
                whileHover={{ x: isEn ? 4 : -4 }}
              >
                {isEn ? <ChevronLeft size={18} style={{ color: accentColor }} className="flex-shrink-0" /> : <ChevronRight size={18} style={{ color: accentColor }} className="flex-shrink-0" />}
                <div>
                  <p className="font-kufi text-sm opacity-70 mb-1" style={{ color: accentColor }}>{t(lang, 'nextEvent')}</p>
                  <p className={`font-noto text-base font-bold ${textBase}`}>
                    {isEn && SEERAH_EN[nextEvent.id] ? SEERAH_EN[nextEvent.id].title : nextEvent.title}
                  </p>
                </div>
              </motion.button>
            ) : <div className="flex-1" />}

            {prevEvent ? (
              <motion.button
                onClick={() => router.push(`/event/${prevEvent.id}`)}
                className="flex-1 flex items-center justify-end gap-3 p-4 rounded-xl text-left group"
                style={{
                  background: `${accentColor}09`,
                  border: `1px solid ${accentColor}20`,
                }}
                whileHover={{ x: isEn ? -4 : 4 }}
              >
                <div>
                  <p className="font-kufi text-sm opacity-70 mb-1" style={{ color: accentColor }}>{t(lang, 'prevEvent')}</p>
                  <p className={`font-noto text-base font-bold ${textBase}`}>
                    {isEn && SEERAH_EN[prevEvent.id] ? SEERAH_EN[prevEvent.id].title : prevEvent.title}
                  </p>
                </div>
                {isEn ? <ChevronRight size={18} style={{ color: accentColor }} className="flex-shrink-0" /> : <ChevronLeft size={18} style={{ color: accentColor }} className="flex-shrink-0" />}
              </motion.button>
            ) : <div className="flex-1" />}
          </div>

          {/* Back to chapter */}
          <div className="text-center mt-8">
            <button
              onClick={() => router.push(`/chapter/${encodeURIComponent(event.chapter)}`)}
              className="font-kufi text-sm px-6 py-2.5 rounded-full transition-colors"
              style={{
                color: accentColor,
                border: `1px solid ${accentColor}35`,
                background: `${accentColor}0d`,
              }}
            >
              {isEn ? `Back to: ${event.chapter}` : `العودة لفصل ${event.chapter}`}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventPage;
