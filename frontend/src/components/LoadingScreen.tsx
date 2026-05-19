import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props { onComplete: () => void; }

/* ── 150 twinkling stars ── */
const STARS = Array.from({ length: 150 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  dur: (Math.random() * 4 + 2).toFixed(1),
  delay: (Math.random() * 6).toFixed(1),
}));

const StarField: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {STARS.map(s => (
      <div
        key={s.id}
        className="absolute rounded-full bg-white animate-twinkle"
        style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, '--dur': `${s.dur}s`, '--delay': `${s.delay}s` } as React.CSSProperties}
      />
    ))}
  </div>
);

/* ── Arabesque ring ── */
const ArabesqueRing: React.FC<{ size: number; opacity: number; dur: number; reverse?: boolean }> = ({ size, opacity, dur, reverse }) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size, height: size, opacity,
      marginLeft: -size / 2, marginTop: -size / 2,
      top: '50%', left: '50%',
      animation: `arabesque-spin ${dur}s linear infinite ${reverse ? 'reverse' : ''}`,
    }}
  >
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#C9A84C" strokeWidth="0.5" fill="none">
        <polygon points="100,6 119,44 160,44 128,68 140,106 100,83 60,106 72,68 40,44 81,44" />
        <circle cx="100" cy="100" r="92" />
        <circle cx="100" cy="100" r="68" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1="100" y1="8" x2="100" y2="192" transform={`rotate(${i * 30} 100 100)`} opacity="0.4" />
        ))}
      </g>
    </svg>
  </div>
);

/* ── Crescent moon ── */
const Crescent: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-20 h-20" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="cg"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <path d="M52,8 A42,42 0 1,1 52,92 A32,32 0 1,0 52,8" fill="#C9A84C" filter="url(#cg)" />
    <polygon points="78,27 80,34 88,34 82,39 84,46 78,41 72,46 74,39 68,34 76,34" fill="#C9A84C" filter="url(#cg)" />
  </svg>
);

/* ── Two swords clashing ── */
const SwordsClash: React.FC = () => {
  const [clashed, setClashed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setClashed(true), 1800); return () => clearTimeout(t); }, []);

  return (
    <motion.div className="flex items-center justify-center gap-2 my-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
      {/* Left sword */}
      <motion.svg viewBox="0 0 140 20" className="w-36 h-5"
        initial={{ x: -110, opacity: 0 }}
        animate={{ x: clashed ? 0 : -50, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <defs>
          <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.1"/>
            <stop offset="88%" stopColor="#C9A84C"/>
            <stop offset="100%" stopColor="#FFE082"/>
          </linearGradient>
        </defs>
        <polygon points="0,10 122,6 140,10 122,14" fill="url(#sg)" />
        <rect x="116" y="1" width="8" height="18" rx="2" fill="#C9A84C" />
        <rect x="124" y="5" width="14" height="10" rx="3" fill="#7A5A14" />
      </motion.svg>

      {/* Clash flash */}
      <motion.div
        className="relative w-5 h-5 flex-shrink-0"
        initial={{ scale: 0 }}
        animate={clashed ? { scale: [0, 2.5, 1.2] } : { scale: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 rotate-45 bg-yellow-300 rounded-sm"
          style={{ boxShadow: '0 0 24px 10px rgba(255,230,100,0.9)' }} />
        {/* sparks */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-yellow-200"
            style={{ top: '50%', left: '50%' }}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={clashed ? { opacity: 0, x: Math.cos(angle * Math.PI / 180) * 32, y: Math.sin(angle * Math.PI / 180) * 32, scale: 0 } : {}}
            transition={{ delay: 1.8 + i * 0.02, duration: 0.45, ease: 'easeOut' }}
          />
        ))}
      </motion.div>

      {/* Right sword (mirror) */}
      <motion.svg viewBox="0 0 140 20" className="w-36 h-5 scale-x-[-1]"
        initial={{ x: 110, opacity: 0 }}
        animate={{ x: clashed ? 0 : 50, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <polygon points="0,10 122,6 140,10 122,14" fill="url(#sg)" />
        <rect x="116" y="1" width="8" height="18" rx="2" fill="#C9A84C" />
        <rect x="124" y="5" width="14" height="10" rx="3" fill="#7A5A14" />
      </motion.svg>
    </motion.div>
  );
};

/* ── Floating golden motes ── */
const GoldenMotes: React.FC = () => {
  const motes = Array.from({ length: 25 }, (_, i) => ({
    id: i, x: Math.random() * 100,
    size: Math.random() * 3.5 + 1,
    dur: (Math.random() * 7 + 7).toFixed(1),
    delay: (Math.random() * 10).toFixed(1),
    drift: ((Math.random() - 0.5) * 90).toFixed(0),
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {motes.map(m => (
        <div key={m.id} className="absolute rounded-full animate-golden-float"
          style={{ left: `${m.x}%`, bottom: 0, width: m.size, height: m.size, background: '#C9A84C', boxShadow: `0 0 ${m.size * 2}px rgba(201,168,76,0.8)`, '--dur': `${m.dur}s`, '--delay': `${m.delay}s`, '--drift': `${m.drift}px` } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════
   MAIN LOADING SCREEN
   ═══════════════════════════════════════ */
const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [verseText, setVerseText] = useState('');
  const [showVerse, setShowVerse] = useState(false);
  const VERSE = 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ';

  /* start verse after 2 seconds */
  useEffect(() => { const t = setTimeout(() => setShowVerse(true), 2000); return () => clearTimeout(t); }, []);

  /* typewriter — slower than before */
  useEffect(() => {
    if (!showVerse) return;
    let i = 0;
    const iv = setInterval(() => {
      if (i < VERSE.length) { setVerseText(VERSE.slice(0, ++i)); }
      else clearInterval(iv);
    }, 80);
    return () => clearInterval(iv);
  }, [showVerse]);

  /* progress ~7 seconds total */
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setTimeout(onComplete, 800); return 100; }
        return p + (p < 70 ? 0.85 : p < 90 ? 0.5 : 0.22);
      });
    }, 40);
    return () => clearInterval(iv);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: 'radial-gradient(ellipse at 50% 35%, #0e1f3c 0%, #060e1e 55%, #020610 100%)' }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      <StarField />
      <GoldenMotes />

      {/* Arabesque rings */}
      <ArabesqueRing size={500} opacity={0.07} dur={60} />
      <ArabesqueRing size={320} opacity={0.045} dur={40} reverse />
      <ArabesqueRing size={180} opacity={0.035} dur={25} />

      {/* Corner decorations */}
      {[
        { pos: '-top-14 -right-14', size: 160, dur: 45 },
        { pos: '-bottom-14 -left-14', size: 160, dur: 45, reverse: true },
        { pos: '-top-8 -left-8', size: 100, dur: 30, reverse: true },
        { pos: '-bottom-8 -right-8', size: 100, dur: 30 },
      ].map(({ pos, size, dur, reverse }, i) => (
        <div key={i} className={`absolute ${pos} overflow-hidden opacity-[0.13]`} style={{ width: size, height: size }}>
          <div style={{ animation: `arabesque-spin ${dur}s linear infinite ${reverse ? 'reverse' : ''}` }}>
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <g stroke="#C9A84C" strokeWidth="0.6" fill="none">
                <polygon points="100,6 119,44 160,44 128,68 140,106 100,83 60,106 72,68 40,44 81,44" />
                <circle cx="100" cy="100" r="92" /><circle cx="100" cy="100" r="60" />
                {Array.from({ length: 8 }).map((_, j) => <line key={j} x1="100" y1="8" x2="100" y2="192" transform={`rotate(${j * 22.5} 100 100)`} />)}
              </g>
            </svg>
          </div>
        </div>
      ))}

      {/* Crescent */}
      <motion.div className="mb-5 relative"
        initial={{ scale: 0, rotate: -200, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.2) 0%, transparent 65%)', transform: 'scale(4)', borderRadius: '50%' }} />
        <Crescent />
      </motion.div>

      {/* Main title — Noto Naskh, very large */}
      <motion.h1
        className="font-noto font-bold text-center leading-none mb-2"
        style={{
          fontSize: 'clamp(3.5rem, 12vw, 8rem)',
          color: '#C9A84C',
          textShadow: '0 0 40px rgba(201,168,76,0.9), 0 0 80px rgba(201,168,76,0.4), 0 0 120px rgba(201,168,76,0.15)',
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6 }}
      >
        نور النبوة
      </motion.h1>

      <motion.p
        className="font-noto text-desert-sand/50 tracking-widest mb-2"
        style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
      >
        حياة النبي محمد ﷺ
      </motion.p>

      {/* Swords */}
      <SwordsClash />

      {/* Verse typewriter */}
      <motion.div className="text-center px-8 min-h-[70px] flex flex-col items-center justify-center"
        initial={{ opacity: 0 }} animate={{ opacity: showVerse ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <p className="font-noto leading-loose text-center"
          dir="rtl"
          style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: '#C9A84C', textShadow: '0 0 20px rgba(201,168,76,0.3)' }}
        >
          {verseText}
          {verseText.length < VERSE.length && (
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="text-islamic-gold">|</motion.span>
          )}
        </p>
        {verseText.length === VERSE.length && (
          <motion.p className="text-xs text-desert-sand/40 mt-1 font-noto" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            ﴿ سورة الأنبياء: 107 ﴾
          </motion.p>
        )}
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-10 w-64 flex flex-col items-center gap-2">
        <div className="w-full h-px bg-islamic-gold/12 relative overflow-hidden rounded-full">
          <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-150"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, rgba(201,168,76,0.3), #C9A84C, #FFE082)', boxShadow: '0 0 8px rgba(201,168,76,0.7)' }} />
        </div>
        <p className="font-noto text-islamic-gold/35" style={{ fontSize: '0.88rem' }}>
          {progress < 100 ? 'جاري التحميل...' : 'بسم الله الرحمن الرحيم'}
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
