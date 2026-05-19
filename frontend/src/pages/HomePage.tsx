import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ChapterCard from '../components/ChapterCard';
import IslamicParticles from '../components/IslamicParticles';
import { CHAPTERS, CHAPTER_META, SEERAH_EVENTS } from '../data/seerah';

/* ── Diamond divider ── */
const GoldDivider: React.FC = () => (
  <div className="flex items-center gap-4 my-8 opacity-25" aria-hidden>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
    <div className="w-2 h-2 rotate-45 bg-islamic-gold" />
    <div className="w-2 h-2 rotate-45 bg-islamic-gold opacity-50" />
    <div className="w-2 h-2 rotate-45 bg-islamic-gold" />
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
  </div>
);

/* ── سكشن هيدر ── */
const SectionHeader: React.FC<{ label: string; title: string; subtitle: string }> = ({ label, title, subtitle }) => (
  <div className="max-w-6xl mx-auto text-center mb-12">
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
      className="font-kufi text-islamic-gold/80 tracking-widest text-sm mb-3"
    >
      {label}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="font-noto font-bold text-white mb-3"
      style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="text-white/70 max-w-lg mx-auto font-kufi"
      style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)', lineHeight: 2 }}
    >
      {subtitle}
    </motion.p>
    <GoldDivider />
  </div>
);

const HomePage: React.FC = () => {
  const eventCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const ch of CHAPTERS) counts[ch] = 0;
    for (const ev of SEERAH_EVENTS) {
      if (counts[ev.chapter] !== undefined) counts[ev.chapter]++;
    }
    return counts;
  }, []);

  return (
    <div className="relative" dir="rtl">
      <IslamicParticles />
      <Hero />

      {/* ══ القسم الأول: فصول السيرة الثمانية ══ */}
      <section
        className="relative py-24 px-5 md:px-12"
        style={{ background: 'linear-gradient(to bottom, #030813 0%, #05060f 100%)' }}
      >
        <SectionHeader
          label="سيرة خير البشر"
          title="فصول السيرة النبوية"
          subtitle="رحلة في ثمانية فصول من حياة النبي ﷺ — من مولده المبارك حتى انتقاله إلى الرفيق الأعلى"
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CHAPTERS.map((ch, i) => (
            <ChapterCard
              key={ch}
              chapter={CHAPTER_META[ch]}
              eventCount={eventCounts[ch]}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ── آية ختامية ── */}
      <section
        className="py-16 px-5"
        style={{ background: '#030813' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <GoldDivider />
          <p
            className="font-noto text-islamic-gold/80 mb-2"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', lineHeight: 2 }}
          >
            ﴿لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ﴾
          </p>
          <p className="font-kufi text-islamic-gold/65 text-sm tracking-widest">
            — سورة الأحزاب: 21
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
