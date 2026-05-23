'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';
import Hero from '@/components/Hero';
import ChapterCard from '@/components/ChapterCard';
import IslamicParticles from '@/components/IslamicParticles';
import { CHAPTERS, CHAPTER_META, SEERAH_EVENTS } from '@/data/seerah';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';

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
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="font-kufi text-islamic-gold/80 tracking-widest text-sm mb-3"
    >
      {label}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="font-noto font-bold text-white mb-3"
      style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
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
  const { lang, isEn } = useLanguage();
  const eventCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const ch of CHAPTERS) counts[ch] = 0;
    for (const ev of SEERAH_EVENTS) {
      if (counts[ev.chapter] !== undefined) counts[ev.chapter]++;
    }
    return counts;
  }, []);

  return (
    <div className="relative" dir={isEn ? 'ltr' : 'rtl'}>
      <IslamicParticles />
      <Hero />

      {/* ══ Chapters section ══ */}
      <section
        className="relative py-24 px-5 md:px-12"
        style={{ background: 'linear-gradient(to bottom, #030813 0%, #05060f 100%)' }}
      >
        <SectionHeader
          label={isEn ? 'The Life of the Best of Mankind' : 'سيرة خير البشر'}
          title={isEn ? 'Chapters of the Prophetic Biography' : 'فصول السيرة النبوية'}
          subtitle={isEn
            ? 'A journey through eight chapters of the Prophet\'s life ﷺ — from his blessed birth to his passing'
            : 'رحلة في ثمانية فصول من حياة النبي ﷺ — من مولده المبارك حتى انتقاله إلى الرفيق الأعلى'
          }
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
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <GoldDivider />
          <p
            className="font-noto text-islamic-gold/80 mb-2"
            dir="rtl"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', lineHeight: 2 }}
          >
            ﴿لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ﴾
          </p>
          {isEn && (
            <p className="font-kufi text-islamic-gold/50 text-sm mb-1" style={{ lineHeight: 1.7 }}>
              "There has certainly been for you in the Messenger of Allah an excellent pattern."
            </p>
          )}
          <p className="font-kufi text-islamic-gold/65 text-sm tracking-widest">
            {isEn ? '— Al-Ahzab: 21' : '— سورة الأحزاب: 21'}
          </p>
        </motion.div>
      </section>

      {/* ══ Credits ══ */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative py-14 px-5"
        style={{ background: '#020710', borderTop: '1px solid rgba(201,168,76,0.1)' }}
      >
        {/* subtle corner ornaments */}
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-[0.04]"
          style={{ background: 'radial-gradient(circle at top right, #C9A84C, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-[0.04]"
          style={{ background: 'radial-gradient(circle at bottom left, #C9A84C, transparent 70%)' }} />

        <div className="max-w-2xl mx-auto text-center" dir={isEn ? 'ltr' : 'rtl'}>
          {/* divider */}
          <div className="flex items-center justify-center gap-3 mb-8 opacity-20">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
            <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
          </div>

          {/* built with love */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Heart size={13} style={{ color: '#E8A8A8' }} />
            <p className="font-kufi" style={{ fontSize: '0.78rem', color: '#5c502d', letterSpacing: '0.14em' }}>
              {isEn ? 'Made with love and respect for the life of the Prophet' : 'صُنع بمحبة واحترام لسيرة النبي ﷺ'}
            </p>
            <Heart size={13} style={{ color: '#E8A8A8' }} />
          </motion.div>

          {/* developer name */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p
              className="font-noto font-bold mb-1"
              style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', color: '#C9A84C', textShadow: '0 0 20px #353021' }}
            >
              {isEn ? 'Saad Hasson' : 'سعد حسون'}
            </p>
            <p className="font-kufi" style={{ fontSize: '0.85rem', color: '#5b5e66', letterSpacing: '0.06em' }}>
              {isEn ? 'Platform developer & content creator' : 'مطوّر المنصة ومنشئ المحتوى'}
            </p>
          </motion.div>

          {/* email button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 mb-8"
          >
            <a
              href="mailto:contact@x13labs.com"
              className="inline-flex items-center gap-2.5 font-kufi rounded-full sidebar-nav-item"
              style={{
                fontSize: 'clamp(0.78rem, 1.8vw, 0.92rem)',
                padding: '0.6rem 1.4rem',
                background: 'rgba(201,168,76,0.07)',
                border: '1px solid rgba(201,168,76,0.22)',
                color: '#C9A84C',
                textDecoration: 'none',
              }}
            >
              <Mail size={14} />
              <span>contact@x13labs.com</span>
              <span style={{ color: '#4f525a', fontSize: '0.75rem' }}>
                {isEn ? '— feedback & suggestions' : '— للشكاوى والاقتراحات والتحسينات'}
              </span>
            </a>
          </motion.div>

          {/* bottom line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-kufi"
            style={{ fontSize: '0.72rem', color: '#30343d', letterSpacing: '0.1em' }}
          >
            {isEn ? 'Noor Al-Nubuwwah © 2026 — Content sourced from authenticated Islamic references'
                   : 'نور النبوة © 2026 — المحتوى موثّق من المصادر الإسلامية المعتمدة'}
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;
