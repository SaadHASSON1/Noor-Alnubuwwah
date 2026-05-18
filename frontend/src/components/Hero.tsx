import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Crescent + Star ── */
const CrescentHero: React.FC = () => (
  <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-32 md:h-32" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="hg">
        <feGaussianBlur stdDeviation="3" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <path d="M62,10 A50,50 0 1,1 62,110 A38,38 0 1,0 62,10" fill="#C9A84C" filter="url(#hg)" />
    <polygon points="96,32 99,42 110,42 101,49 104,59 96,53 88,59 91,49 82,42 93,42" fill="#C9A84C" filter="url(#hg)" />
  </svg>
);

/* ── Radial glow behind crescent ── */
const GlowBehind: React.FC = () => (
  <div
    className="absolute pointer-events-none"
    style={{
      width: 500, height: 500,
      top: '50%', left: '50%',
      transform: 'translate(-50%, -55%)',
      background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, transparent 65%)',
    }}
  />
);

/* ── Arabesque corner accents ── */
const HeroArabesque: React.FC = () => (
  <>
    {[
      { pos: 'top-0 right-0',   rot: 0,   size: 200 },
      { pos: 'bottom-0 left-0', rot: 180, size: 200 },
      { pos: 'top-0 left-0',    rot: 90,  size: 130 },
      { pos: 'bottom-0 right-0',rot: 270, size: 130 },
    ].map(({ pos, rot, size }, i) => (
      <div key={i} className={`absolute ${pos} overflow-hidden opacity-[0.07] pointer-events-none`}
        style={{ width: size, height: size }}>
        <svg viewBox="0 0 200 200" className="w-full h-full"
          style={{ transform: `rotate(${rot}deg)`, animation: `arabesque-spin ${40 + i * 8}s linear infinite ${i % 2 ? 'reverse' : ''}` }}>
          <g stroke="#C9A84C" strokeWidth="0.6" fill="none">
            <polygon points="100,6 119,44 160,44 128,68 140,106 100,83 60,106 72,68 40,44 81,44" />
            <circle cx="100" cy="100" r="92" />
            {Array.from({ length: 12 }).map((_, j) => (
              <line key={j} x1="100" y1="8" x2="100" y2="192" transform={`rotate(${j * 30} 100 100)`} opacity="0.35" />
            ))}
          </g>
        </svg>
      </div>
    ))}
  </>
);

/* ══════════════════════════════════════
   HERO SECTION
   ══════════════════════════════════════ */
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Scroll-linked animations inside the sticky container */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentScale   = useTransform(scrollYProgress, [0, 0.7], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.7], [0, -80]);

  return (
    /* tall container — scrolling through it drives the sticky animation */
    <div ref={containerRef} style={{ height: '180vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#030813' }}>

        <GlowBehind />
        <HeroArabesque />

        {/* Stars layer */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 80 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                '--dur': `${(Math.random() * 3 + 2).toFixed(1)}s`,
                '--delay': `${(Math.random() * 5).toFixed(1)}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Content — scale + fade as you scroll away */}
        <motion.div
          style={{ scale: contentScale, opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center"
        >
          {/* Crescent */}
          <motion.div
            initial={{ scale: 0, rotate: -160, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 pointer-events-none rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%)', transform: 'scale(4)' }} />
            <CrescentHero />
          </motion.div>

          {/* Big title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6 }}
            className="font-noto font-bold leading-none text-center"
            style={{
              fontSize: 'clamp(3rem, 12vw, 11rem)',
              color: '#C9A84C',
              textShadow: '0 0 50px rgba(201,168,76,0.7), 0 0 100px rgba(201,168,76,0.3)',
            }}
          >
            نور النبوة
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.2 }}
            className="font-noto text-white/70"
            style={{ fontSize: 'clamp(1.1rem, 3vw, 2rem)' }}
          >
            سيرة النبي محمد ﷺ
          </motion.p>

          {/* Year range */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="font-noto text-islamic-gold/50 tracking-widest"
            style={{ fontSize: 'clamp(0.75rem, 1.8vw, 1rem)' }}
          >
            ٥٧١ م  —  ٦٣٢ م
          </motion.div>

          {/* Gold divider */}
          <motion.div
            className="flex items-center gap-3 mt-2 opacity-30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 2 }}
          >
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
            <div className="w-2 h-2 rotate-45 bg-islamic-gold" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        >
          <p className="font-noto text-islamic-gold/40" style={{ fontSize: '0.7rem', letterSpacing: '0.15em' }}>
            مرر للأسفل
          </p>
          <motion.div
            className="w-px bg-gradient-to-b from-islamic-gold/60 to-transparent"
            style={{ height: 50 }}
            animate={{ scaleY: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
