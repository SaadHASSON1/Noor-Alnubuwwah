import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ════════════════════════════════════════════════════
   CENTRAL MANDALA — fits in top 50% of screen
   ViewBox: -300 -300 600 600  (center at 0,0)
   ════════════════════════════════════════════════════ */
const CentralMandala: React.FC = () => (
  <div
    className="absolute pointer-events-none select-none"
    style={{
      width: 'min(68vmin, 420px)',
      height: 'min(68vmin, 420px)',
      top: '5%',
      left: '50%',
      transform: 'translateX(-50%)',
    }}
  >
    <svg
      viewBox="-300 -300 600 600"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      <defs>
        <filter id="hGlow">
          <feGaussianBlur stdDeviation="9" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="sSoft">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="cg" cx="38%" cy="42%" r="62%">
          <stop offset="0%"   stopColor="#FFF0B0"/>
          <stop offset="55%"  stopColor="#C9A84C"/>
          <stop offset="100%" stopColor="#8B6014"/>
        </radialGradient>
        <mask id="cm">
          <rect x="-300" y="-300" width="600" height="600" fill="white"/>
          <circle cx="19" cy="0" r="57" fill="black"/>
        </mask>
      </defs>

      {/* ① Outer dotted ring */}
      <g style={{ animation: 'arabesque-spin 90s linear infinite' }}>
        <circle r="272" fill="none" stroke="#C9A84C" strokeWidth="0.35"
          strokeDasharray="1.5 19" opacity="0.22" />
        {Array.from({ length: 24 }, (_, i) => {
          const a = (i * 15) * Math.PI / 180;
          return (
            <circle key={i}
              cx={(262 * Math.cos(a)).toFixed(2)}
              cy={(262 * Math.sin(a)).toFixed(2)}
              r={i % 3 === 0 ? 2.8 : 1.6}
              fill="#C9A84C"
              opacity={i % 3 === 0 ? 0.3 : 0.15}
            />
          );
        })}
      </g>

      {/* ② Two hexagons = 12-pointed star outline */}
      <g style={{ animation: 'arabesque-spin 110s linear infinite reverse' }} opacity="0.24">
        <polygon points="210,0 105,181.9 -105,181.9 -210,0 -105,-181.9 105,-181.9"
          fill="none" stroke="#C9A84C" strokeWidth="0.75" />
        <polygon points="181.9,105 0,210 -181.9,105 -181.9,-105 0,-210 181.9,-105"
          fill="none" stroke="#C9A84C" strokeWidth="0.75" />
      </g>

      {/* ③ Middle ring */}
      <circle r="168" fill="none" stroke="#C9A84C" strokeWidth="0.45" opacity="0.18"/>

      {/* ④ 8-pointed star */}
      <g style={{ animation: 'arabesque-spin 70s linear infinite' }} opacity="0.32">
        <polygon
          points="115,0 43.4,18 81.3,81.3 18,43.4 0,115 -18,43.4 -81.3,81.3 -43.4,18 -115,0 -43.4,-18 -81.3,-81.3 -18,-43.4 0,-115 18,-43.4 81.3,-81.3 43.4,-18"
          fill="none" stroke="#C9A84C" strokeWidth="0.8"
        />
      </g>

      {/* ⑤ Inner ring */}
      <circle r="88" fill="none" stroke="#C9A84C" strokeWidth="0.4" opacity="0.22"/>

      {/* ⑥ 12 radial spokes */}
      <g opacity="0.07">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30) * Math.PI / 180;
          return (
            <line key={i} x1="0" y1="0"
              x2={(278 * Math.cos(a)).toFixed(2)}
              y2={(278 * Math.sin(a)).toFixed(2)}
              stroke="#C9A84C" strokeWidth="0.5" />
          );
        })}
      </g>

      {/* ⑦ CRESCENT */}
      <circle r="82" fill="rgba(201,168,76,0.08)" mask="url(#cm)" />
      <circle r="70" fill="url(#cg)" mask="url(#cm)" filter="url(#hGlow)" opacity="0.96"/>

      {/* ⑧ Star companion */}
      <polygon
        points="40,-54 42.4,-47.2 49.5,-47.1 43.8,-42.8 45.9,-36 40,-39.8 34.1,-36 36.2,-42.8 30.5,-47.1 37.6,-47.2"
        fill="#C9A84C"
        filter="url(#sSoft)"
        opacity="0.92"
        style={{ animation: 'arabesque-spin 22s linear infinite reverse' }}
      />
    </svg>
  </div>
);

/* ══ Atmospheric glows — centered on mandala area ══ */
const Atmosphere: React.FC = () => (
  <>
    <div
      className="absolute pointer-events-none"
      style={{
        width: 340, height: 340,
        top: '28%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.20) 0%, rgba(201,168,76,0.07) 45%, transparent 70%)',
        borderRadius: '50%',
        animation: 'glow-pulse 4s ease-in-out infinite',
      }}
    />
    <div
      className="absolute pointer-events-none"
      style={{
        width: 660, height: 660,
        top: '28%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, rgba(80,60,180,0.03) 50%, transparent 72%)',
        borderRadius: '50%',
      }}
    />
    <div
      className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, transparent, rgba(3,8,19,0.6))' }}
    />
  </>
);

/* ══ Stars ══ */
const Stars: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {Array.from({ length: 110 }, (_, i) => (
      <div
        key={`s-${i}`}
        className="absolute rounded-full bg-white animate-twinkle"
        style={{
          left: `${(Math.random() * 100).toFixed(2)}%`,
          top:  `${(Math.random() * 100).toFixed(2)}%`,
          width:  (Math.random() * 1.4 + 0.3).toFixed(2),
          height: (Math.random() * 1.4 + 0.3).toFixed(2),
          '--dur':   `${(Math.random() * 3 + 2).toFixed(1)}s`,
          '--delay': `${(Math.random() * 6).toFixed(1)}s`,
        } as React.CSSProperties}
      />
    ))}
    {[
      { l: '8%',  t: '12%' }, { l: '22%', t: '6%'  }, { l: '78%', t: '9%'  },
      { l: '91%', t: '18%' }, { l: '5%',  t: '55%' }, { l: '95%', t: '42%' },
      { l: '15%', t: '80%' }, { l: '85%', t: '75%' },
    ].map((pos, i) => (
      <div
        key={`b-${i}`}
        className="absolute rounded-full bg-white animate-twinkle"
        style={{
          left: pos.l, top: pos.t,
          width: (Math.random() * 1.5 + 2).toFixed(2),
          height: (Math.random() * 1.5 + 2).toFixed(2),
          '--dur':   `${(Math.random() * 2 + 3).toFixed(1)}s`,
          '--delay': `${(Math.random() * 4).toFixed(1)}s`,
          boxShadow: '0 0 4px 1px rgba(255,255,255,0.5)',
        } as React.CSSProperties}
      />
    ))}
  </div>
);

/* ════════════════════════════════════════════════════
   HERO SECTION
   Layout: mandala in top ~52%, text in bottom ~48%
   ════════════════════════════════════════════════════ */
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentScale   = useTransform(scrollYProgress, [0, 0.65], [1,   1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.60], [1,   0   ]);
  const contentY       = useTransform(scrollYProgress, [0, 0.65], [0,  -70  ]);

  return (
    <div ref={containerRef} style={{ height: '190vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#030813' }}>

        <Stars />
        <Atmosphere />
        <CentralMandala />

        {/* ══ Text content — bottom half of screen ══ */}
        <motion.div
          style={{ scale: contentScale, opacity: contentOpacity, y: contentY }}
          className="absolute inset-x-0 bottom-0 flex flex-col items-center text-center px-6 pb-28"
          dir="rtl"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-noto font-bold leading-none"
            style={{
              fontSize: 'clamp(3.2rem, 11vw, 9rem)',
              color: '#C9A84C',
              textShadow: '0 0 40px rgba(201,168,76,0.65), 0 0 90px rgba(201,168,76,0.25)',
            }}
          >
            نور النبوة
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2 }}
            className="font-noto text-white/65 mt-3"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.7rem)' }}
          >
            سيرة النبي محمد ﷺ
          </motion.p>

          {/* Year range */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="font-noto text-islamic-gold/45 mt-1 tracking-widest"
            style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)' }}
          >
            ٥٧١ م  —  ٦٣٢ م
          </motion.p>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 2 }}
            className="flex items-center gap-3 my-4 opacity-30"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
            <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
          </motion.div>

          {/* Quranic verse */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.2 }}
            className="font-noto text-islamic-gold/55"
            style={{ fontSize: 'clamp(0.85rem, 2vw, 1.2rem)', lineHeight: 1.9 }}
          >
            ﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
            className="font-kufi text-islamic-gold/28 mt-1"
            style={{ fontSize: '0.7rem', letterSpacing: '0.12em' }}
          >
            — سورة الأنبياء: ١٠٧
          </motion.p>
        </motion.div>

        {/* ══ Scroll indicator ══ */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <p
            className="font-kufi text-islamic-gold/35"
            style={{ fontSize: '0.62rem', letterSpacing: '0.18em' }}
          >
            مرر للأسفل
          </p>
          <motion.div
            className="w-px bg-gradient-to-b from-islamic-gold/55 to-transparent"
            style={{ height: 40 }}
            animate={{ scaleY: [1, 1.5, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>

      </div>
    </div>
  );
};

export default Hero;
