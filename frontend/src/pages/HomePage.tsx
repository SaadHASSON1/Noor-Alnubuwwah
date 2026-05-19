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

const HomePage: React.FC = () => {
  /* Count events per chapter */
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

      {/* ── Hero (existing full-screen entry) ── */}
      <Hero />

      {/* ── Chapter cards section ── */}
      <section
        className="relative py-24 px-5 md:px-12"
        style={{ background: 'linear-gradient(to bottom, #030813 0%, #05060f 100%)' }}
      >
        {/* Section header */}
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="font-kufi text-islamic-gold/80 tracking-widest text-sm mb-4"
          >
            سيرة خير البشر
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-noto font-bold text-white mb-4"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          >
            فصول السيرة النبوية
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/70 max-w-xl mx-auto"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', lineHeight: 2.1 }}
          >
            رحلة في ثمانية فصول من حياة النبي ﷺ — من مولده المبارك حتى انتقاله إلى الرفيق الأعلى
          </motion.p>

          <GoldDivider />
        </div>

        {/* Chapter grid */}
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

        {/* Bottom decorative verse */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-3xl mx-auto text-center mt-20"
        >
          <GoldDivider />
          <p
            className="font-noto text-islamic-gold/80 mb-2"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', lineHeight: 2 }}
          >
            ﴿لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ﴾
          </p>
          <p className="font-kufi text-islamic-gold/65 text-sm tracking-widest">
            — سورة الأحزاب: ٢١
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
