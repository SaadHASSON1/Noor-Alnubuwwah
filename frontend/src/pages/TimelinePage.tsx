import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';
import IslamicParticles from '../components/IslamicParticles';
import { SEERAH_EVENTS, CHAPTER_META, CHAPTERS } from '../data/seerah';
import ShareButton from '../components/ShareButton';

const TimelinePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative" dir="rtl" style={{ background: '#030813' }}>
      {/* زر المشاركة */}
      <div className="fixed top-4 left-4 z-[60]">
        <ShareButton title="التسلسل الزمني للسيرة" accentColor="#C9A84C" />
      </div>
      <IslamicParticles />

      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 right-20 z-50 flex items-center gap-2 text-sm font-kufi max-w-[calc(100vw-6rem)]"
        style={{ color: '#C9A84C' }}
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"
        >
          <Home size={14} />
          الرئيسية
        </button>
        <ChevronRight size={14} className="opacity-40" />
        <span className="opacity-90">التسلسل الزمني</span>
      </motion.nav>

      {/* Hero */}
      <div className="pt-28 pb-14 px-5 text-center relative">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex items-center gap-3 justify-center mb-6 opacity-25"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-kufi text-islamic-gold/50 text-xs tracking-widest mb-3"
        >
          سيرة خير البشر
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-noto font-bold text-islamic-gold"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
        >
          التسلسل الزمني
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-white/35 font-kufi text-sm mt-3"
        >
          من الميلاد المبارك حتى الرحيل إلى الرفيق الأعلى
        </motion.p>
      </div>

      {/* Timeline body */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 pb-32 relative">

        {/* Vertical golden line — sits to the right of the content */}
        <div
          className="absolute top-0 bottom-0 w-px"
          style={{
            right: '2rem',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(201,168,76,0.5) 8%, rgba(201,168,76,0.25) 90%, transparent 100%)',
          }}
        />

        {/* Chapters */}
        {CHAPTERS.map((chapterName) => {
          const meta = CHAPTER_META[chapterName];
          const events = SEERAH_EVENTS.filter(e => e.chapter === chapterName);
          if (!meta || events.length === 0) return null;

          return (
            <div key={chapterName} className="mb-2">

              {/* Chapter label */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-10%' }}
                transition={{ duration: 0.55 }}
                className="flex items-center gap-3 mb-5 pr-14"
              >
                <button
                  onClick={() => navigate(`/chapter/${encodeURIComponent(chapterName)}`)}
                  className="font-noto font-bold hover:opacity-80 transition-opacity"
                  style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', color: meta.accentColor }}
                >
                  {chapterName}
                </button>
                <span
                  className="font-kufi text-xs px-2.5 py-1 rounded-full opacity-70"
                  style={{ color: meta.accentColor, border: `1px solid ${meta.accentColor}30`, background: `${meta.accentColor}0f` }}
                >
                  {meta.years}
                </span>
              </motion.div>

              {/* Events */}
              <div className="space-y-4 mb-10 pr-14">
                {events.map((ev, i) => {
                  const isLight = !!ev.lightText;
                  return (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, margin: '-5%' }}
                      transition={{ duration: 0.5, delay: i * 0.04 }}
                      className="relative"
                    >
                      {/* Connector line → dot on timeline */}
                      <div
                        className="absolute flex items-center gap-0 top-5"
                        style={{ right: '-2.85rem' }}
                      >
                        <div
                          className="h-px w-5 opacity-30"
                          style={{ background: meta.accentColor }}
                        />
                        <div
                          className="w-3 h-3 rounded-full border-2 flex-shrink-0 animate-dot-pulse"
                          style={{ borderColor: meta.accentColor, background: '#030813' }}
                        />
                      </div>

                      {/* Card */}
                      <motion.button
                        onClick={() => navigate(`/event/${ev.id}`)}
                        className="w-full text-right rounded-xl overflow-hidden group"
                        style={{
                          background: ev.bg,
                          border: `1px solid ${meta.accentColor}1a`,
                        }}
                        whileHover={{ scale: 1.012, y: -2 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="p-5">
                          {/* Top row */}
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className="font-noto text-sm opacity-85"
                              style={{ color: meta.accentColor }}
                            >
                              {ev.year_display_m}
                              {ev.year_display_h && (
                                <span className="opacity-75 mr-2">{ev.year_display_h}</span>
                              )}
                            </span>
                            <span
                              className="font-kufi text-sm px-3 py-0.5 rounded-full"
                              style={{
                                color: meta.accentColor,
                                background: `${meta.accentColor}18`,
                                border: `1px solid ${meta.accentColor}30`,
                              }}
                            >
                              {ev.chapter}
                            </span>
                          </div>

                          <h3
                            className="font-noto font-bold leading-snug mb-2 group-hover:opacity-90 transition-opacity"
                            style={{
                              fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
                              color: isLight ? '#2d1e08' : 'white',
                            }}
                          >
                            {ev.title}
                          </h3>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: isLight ? '#6b4c1e' : 'rgba(255,255,255,0.7)' }}
                          >
                            {ev.subtitle}
                          </p>
                        </div>

                        {/* Bottom accent bar */}
                        <div
                          className="h-0.5 opacity-0 group-hover:opacity-40 transition-opacity"
                          style={{ background: `linear-gradient(to left, transparent, ${meta.accentColor}, transparent)` }}
                        />
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Final marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3 relative pr-14"
        >
          <div className="absolute -right-[0.5rem] -top-1">
            <div
              className="w-4 h-4 rounded-full border-2 animate-dot-pulse"
              style={{ borderColor: '#C9A84C', background: '#030813' }}
            />
          </div>
          <p
            className="font-noto text-islamic-gold/50 text-center"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 2 }}
          >
            ﴿إِنَّكَ مَيِّتٌ وَإِنَّهُم مَّيِّتُونَ﴾
          </p>
          <p className="font-kufi text-islamic-gold/25 text-xs tracking-widest">— سورة الزمر: ٣٠</p>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelinePage;
