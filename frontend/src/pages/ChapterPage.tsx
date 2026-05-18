import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import EventCard from '../components/EventCard';
import IslamicParticles from '../components/IslamicParticles';
import { CHAPTER_META, SEERAH_EVENTS } from '../data/seerah';

/* ── Arabesque corner for chapter hero ── */
const ArabesqueCorner: React.FC<{ rotate?: number; color: string }> = ({ rotate = 0, color }) => (
  <div
    className="absolute w-44 h-44 overflow-hidden opacity-[0.08] pointer-events-none"
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <g stroke={color} strokeWidth="0.7" fill="none">
        <polygon points="100,6 119,44 160,44 128,68 140,106 100,83 60,106 72,68 40,44 81,44" />
        <circle cx="100" cy="100" r="92" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1="100" y1="8" x2="100" y2="192"
            transform={`rotate(${i * 30} 100 100)`} opacity="0.4" />
        ))}
      </g>
    </svg>
  </div>
);

const ChapterPage: React.FC = () => {
  const { chapterName } = useParams<{ chapterName: string }>();
  const navigate = useNavigate();
  const name = decodeURIComponent(chapterName ?? '');
  const meta = CHAPTER_META[name];

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#030813' }}>
        <div className="text-center" dir="rtl">
          <p className="font-noto text-white/50 text-xl mb-4">الفصل غير موجود</p>
          <button onClick={() => navigate('/')}
            className="font-kufi text-islamic-gold text-sm border border-islamic-gold/30 px-6 py-2 rounded-full hover:bg-islamic-gold/10 transition-colors">
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  const events = SEERAH_EVENTS.filter(e => e.chapter === name);
  const isLight = name === 'الرحيل';
  const textBase  = isLight ? 'text-stone-800'  : 'text-white';
  const textMuted = isLight ? 'text-stone-600'  : 'text-white/60';

  return (
    <div className="min-h-screen relative" dir="rtl" style={{ background: meta.gradientFrom }}>
      <IslamicParticles />

      {/* ══ Chapter Hero ══ */}
      <section
        className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${meta.gradientFrom} 0%, ${meta.gradientTo} 100%)`,
        }}
      >
        {/* Arabesque corners */}
        <div className="absolute top-0 right-0">
          <ArabesqueCorner rotate={0} color={meta.accentColor} />
        </div>
        <div className="absolute bottom-0 left-0">
          <ArabesqueCorner rotate={180} color={meta.accentColor} />
        </div>

        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 30% 40%, ${meta.accentColor}12 0%, transparent 60%)`,
          }}
        />

        {/* Stars */}
        {!isLight && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  width: Math.random() * 1.5 + 0.5,
                  height: Math.random() * 1.5 + 0.5,
                  '--dur': `${(Math.random() * 3 + 2).toFixed(1)}s`,
                  '--delay': `${(Math.random() * 5).toFixed(1)}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* Nav breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-6 right-6 flex items-center gap-2 text-sm font-kufi"
          style={{ color: meta.accentColor }}
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"
          >
            <Home size={14} />
            الرئيسية
          </button>
          <ChevronRight size={14} className="opacity-40" />
          <span className="opacity-90">{name}</span>
        </motion.nav>

        {/* Main hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 pb-16 pt-32">

          {/* Chapter label */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div
              className="h-px w-12 opacity-60"
              style={{ background: meta.accentColor }}
            />
            <span
              className="font-kufi text-sm tracking-widest"
              style={{ color: meta.accentColor }}
            >
              الفصل
            </span>
          </motion.div>

          {/* Chapter name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`font-noto font-bold leading-none mb-4 ${textBase}`}
            style={{
              fontSize: 'clamp(4rem, 14vw, 11rem)',
              textShadow: isLight ? 'none' : `0 0 60px ${meta.accentColor}40`,
            }}
          >
            {name}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-noto mb-3"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', color: meta.accentColor, opacity: 0.85 }}
          >
            {meta.subtitle}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex items-center gap-3 my-5 opacity-30 origin-right"
          >
            <div className="h-px w-24" style={{ background: meta.accentColor }} />
            <div className="w-1.5 h-1.5 rotate-45" style={{ background: meta.accentColor }} />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`font-noto max-w-2xl ${textMuted}`}
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)', lineHeight: 2 }}
          >
            {meta.description}
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-6 mt-8"
          >
            <div>
              <p className="font-noto font-bold text-2xl" style={{ color: meta.accentColor }}>
                {events.length}
              </p>
              <p className={`font-kufi text-xs ${textMuted}`}>حدث</p>
            </div>
            <div className="w-px h-10 opacity-20" style={{ background: meta.accentColor }} />
            <div>
              <p className="font-noto font-bold" style={{ fontSize: '1.1rem', color: meta.accentColor }}>
                {meta.years}
              </p>
              <p className={`font-kufi text-xs ${textMuted}`}>الفترة الزمنية</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ Events grid ══ */}
      <section
        className="relative py-16 px-5 md:px-12"
        style={{
          background: `linear-gradient(to bottom, ${meta.gradientTo} 0%, #030813 100%)`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-kufi text-center mb-10 tracking-widest text-sm"
            style={{ color: meta.accentColor, opacity: 0.6 }}
          >
            أحداث الفصل
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {events.map((ev, i) => (
              <EventCard
                key={ev.id}
                event={ev}
                accentColor={meta.accentColor}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChapterPage;
