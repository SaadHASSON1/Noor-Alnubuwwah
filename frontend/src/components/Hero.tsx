import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/* ── Stat card data ── */
const STATS = [
  { value: '٦٣ عاماً',  label: 'عمره ﷺ' },
  { value: '٢٣ عاماً',  label: 'مدة النبوة' },
  { value: '٢٧ غزوة',   label: 'غزواته ﷺ' },
  { value: '٨ فصول',    label: 'فصول السيرة' },
];

/* ── Star particles — deterministic positions ── */
const Stars: React.FC = () => {
  const stars = useMemo(() => (
    Array.from({ length: 80 }, (_, i) => ({
      left: `${((i * 137.508) % 100).toFixed(2)}%`,
      top:  `${((i * 97.314) % 100).toFixed(2)}%`,
      size: `${(0.5 + (i % 5) * 0.28).toFixed(2)}px`,
      dur:  `${2 + (i % 4) * 0.75}s`,
      delay: `${(i % 7) * 0.6}s`,
      glow: i % 9 === 0,
    }))
  ), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            '--dur':   s.dur,
            '--delay': s.delay,
            boxShadow: s.glow ? '0 0 4px 1px rgba(255,255,255,0.4)' : undefined,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

/* ── Decorative golden lines ── */
const GeometricAccents: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Top-left arc */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 1.5 }}
      className="absolute"
      style={{
        top: -80, left: -80,
        width: 300, height: 300,
        borderRadius: '50%',
        border: '1px solid rgba(201,168,76,0.08)',
      }}
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1.5 }}
      className="absolute"
      style={{
        top: -40, left: -40,
        width: 200, height: 200,
        borderRadius: '50%',
        border: '1px solid rgba(201,168,76,0.06)',
      }}
    />
    {/* Bottom-right arc */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1.5 }}
      className="absolute"
      style={{
        bottom: -80, right: -80,
        width: 280, height: 280,
        borderRadius: '50%',
        border: '1px solid rgba(201,168,76,0.07)',
      }}
    />
    {/* Center glow */}
    <div
      className="absolute"
      style={{
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50vw', height: '50vw',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'glow-pulse 5s ease-in-out infinite',
      }}
    />
  </div>
);

/* ════════════════════════════════════════════════════
   HERO — Starry Night Shrine concept
   ════════════════════════════════════════════════════ */
const Hero: React.FC = () => {
  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: '100vh', background: '#030813' }}
      dir="rtl"
    >
      <Stars />
      <GeometricAccents />

      {/* ── Main content stack ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-6 px-4 py-1.5 rounded-full font-kufi text-xs"
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.22)',
            color: 'rgba(201,168,76,0.7)',
            letterSpacing: '0.1em',
          }}
        >
          سيرة النبي محمد ﷺ  •  ٥٧١ م — ٦٣٢ م
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.3, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-noto font-bold leading-none mb-4"
          style={{
            fontSize: 'clamp(4rem, 14vw, 10rem)',
            color: '#C9A84C',
            textShadow: '0 0 50px rgba(201,168,76,0.6), 0 0 100px rgba(201,168,76,0.2)',
          }}
        >
          نور النبوة
        </motion.h1>

        {/* Golden divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.5 }}
          className="flex items-center gap-3 mb-8 opacity-35"
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-2 h-2 rotate-45 bg-islamic-gold" />
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.9 + i * 0.1 }}
              className="flex flex-col items-center px-5 py-3 rounded-full"
              style={{
                background: 'rgba(201,168,76,0.06)',
                border: '1px solid rgba(201,168,76,0.22)',
              }}
            >
              <span
                className="font-noto font-bold"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#C9A84C' }}
              >
                {stat.value}
              </span>
              <span
                className="font-kufi text-white/40"
                style={{ fontSize: '0.68rem', letterSpacing: '0.06em' }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Verse */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.3 }}
          className="mb-8"
        >
          <p
            className="font-noto text-islamic-gold/55 mb-1"
            style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.4rem)', lineHeight: 1.9 }}
          >
            ﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾
          </p>
          <p
            className="font-kufi text-islamic-gold/28"
            style={{ fontSize: '0.68rem', letterSpacing: '0.14em' }}
          >
            — سورة الأنبياء: ١٠٧
          </p>
        </motion.div>

        {/* CTA button */}
        <motion.button
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          onClick={handleScrollDown}
          whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(201,168,76,0.3)' }}
          whileTap={{ scale: 0.96 }}
          className="font-kufi text-sm px-8 py-3.5 rounded-full transition-all"
          style={{
            background: 'rgba(201,168,76,0.12)',
            border: '1px solid rgba(201,168,76,0.4)',
            color: '#C9A84C',
            letterSpacing: '0.06em',
          }}
        >
          ابدأ الرحلة ←
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p
          className="font-kufi text-islamic-gold/30"
          style={{ fontSize: '0.58rem', letterSpacing: '0.2em' }}
        >
          مرّر للأسفل
        </p>
        <motion.div
          className="w-px bg-gradient-to-b from-islamic-gold/50 to-transparent"
          style={{ height: 36 }}
          animate={{ scaleY: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
