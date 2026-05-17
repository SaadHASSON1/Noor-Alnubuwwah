import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Props { onComplete: () => void; }

/* ── Stars ── */
const STARS = Array.from({ length: 140 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.2 + 0.4,
  dur: (Math.random() * 3 + 2).toFixed(1),
  delay: (Math.random() * 5).toFixed(1),
}));

const StarField: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {STARS.map(s => (
      <div
        key={s.id}
        className="absolute rounded-full bg-white animate-twinkle"
        style={{
          left: `${s.x}%`,
          top: `${s.y}%`,
          width: s.size,
          height: s.size,
          '--dur': `${s.dur}s`,
          '--delay': `${s.delay}s`,
        } as React.CSSProperties}
      />
    ))}
  </div>
);

/* ── Arabesque SVG pattern ── */
const ArabesqueSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <g stroke="#C9A84C" strokeWidth="0.6" fill="none">
      <polygon points="100,6 119,44 160,44 128,68 140,106 100,83 60,106 72,68 40,44 81,44" />
      <polygon points="100,22 114,51 146,51 122,69 131,98 100,81 69,98 78,69 54,51 86,51" />
      <circle cx="100" cy="100" r="92" />
      <circle cx="100" cy="100" r="70" />
      <circle cx="100" cy="100" r="46" />
      <circle cx="100" cy="100" r="20" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="100" y1="8" x2="100" y2="192"
          transform={`rotate(${i * 30} 100 100)`} opacity="0.4" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i}
          d={`M100,8 Q${110 + Math.cos(i) * 15},100 100,192`}
          transform={`rotate(${i * 45} 100 100)`} opacity="0.3" />
      ))}
    </g>
  </svg>
);

/* ── Crescent + Star ── */
const CrescentIcon: React.FC = () => (
  <div className="relative w-24 h-24">
    <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="ld-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* crescent */}
      <path
        d="M52,8 A42,42 0 1,1 52,92 A32,32 0 1,0 52,8"
        fill="#C9A84C" filter="url(#ld-glow)"
      />
      {/* star */}
      <polygon
        points="80,28 82,35 90,35 84,40 86,47 80,43 74,47 76,40 70,35 78,35"
        fill="#C9A84C" filter="url(#ld-glow)"
      />
    </svg>
  </div>
);

/* ── Two swords clashing ── */
const SwordsClash: React.FC = () => {
  const gradId = 'sg';
  return (
    <motion.div
      className="flex items-center justify-center gap-3 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
    >
      {/* Left sword */}
      <motion.svg
        viewBox="0 0 130 22" className="w-36 h-5"
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.55, type: 'spring', stiffness: 220, damping: 18 }}
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.1" />
            <stop offset="85%" stopColor="#C9A84C" stopOpacity="1" />
            <stop offset="100%" stopColor="#F5E6C0" stopOpacity="1" />
          </linearGradient>
        </defs>
        <polygon points="0,11 114,7 130,11 114,15" fill={`url(#${gradId})`} />
        <rect x="108" y="2" width="7" height="18" rx="2" fill="#C9A84C" />
        <rect x="115" y="6" width="14" height="10" rx="3" fill="#7A5A14" />
      </motion.svg>

      {/* Clash point — sparks */}
      <motion.div
        className="relative w-4 h-4 flex-shrink-0"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 2, 1] }}
        transition={{ delay: 2.25, duration: 0.3 }}
      >
        <div
          className="absolute inset-0 rotate-45 bg-islamic-gold rounded-sm"
          style={{ boxShadow: '0 0 20px 8px rgba(201,168,76,0.9)' }}
        />
        {/* tiny sparks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-yellow-200"
            style={{
              top: '50%', left: '50%',
              '--tx': `${Math.cos(angle * Math.PI / 180) * 28}px`,
              '--ty': `${Math.sin(angle * Math.PI / 180) * 28}px`,
            } as React.CSSProperties}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x: `${Math.cos(angle * Math.PI / 180) * 28}px`, y: `${Math.sin(angle * Math.PI / 180) * 28}px`, scale: 0 }}
            transition={{ delay: 2.25 + i * 0.02, duration: 0.4, ease: 'easeOut' }}
          />
        ))}
      </motion.div>

      {/* Right sword (mirror) */}
      <motion.svg
        viewBox="0 0 130 22" className="w-36 h-5 scale-x-[-1]"
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.55, type: 'spring', stiffness: 220, damping: 18 }}
      >
        <polygon points="0,11 114,7 130,11 114,15" fill={`url(#${gradId})`} />
        <rect x="108" y="2" width="7" height="18" rx="2" fill="#C9A84C" />
        <rect x="115" y="6" width="14" height="10" rx="3" fill="#7A5A14" />
      </motion.svg>
    </motion.div>
  );
};

/* ── Shield decorations ── */
const ShieldDeco: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
  <motion.svg
    viewBox="0 0 50 60" className="w-10 h-12 opacity-30"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 0.3, scale: 1 }}
    transition={{ delay: 2.8, duration: 0.5 }}
    style={{ transform: side === 'right' ? 'scaleX(-1)' : undefined }}
  >
    <path
      d="M25,4 L46,14 L46,32 Q46,50 25,58 Q4,50 4,32 L4,14 Z"
      stroke="#C9A84C" strokeWidth="1.5" fill="rgba(201,168,76,0.08)"
    />
    <path d="M25,12 L38,20 L38,32 Q38,44 25,50 Q12,44 12,32 L12,20 Z"
      stroke="#C9A84C" strokeWidth="0.7" fill="none" opacity="0.5" />
    <line x1="25" y1="12" x2="25" y2="50" stroke="#C9A84C" strokeWidth="0.7" opacity="0.5" />
    <line x1="12" y1="28" x2="38" y2="28" stroke="#C9A84C" strokeWidth="0.7" opacity="0.5" />
  </motion.svg>
);

/* ── Golden floating particles ── */
const GoldenMotes: React.FC = () => {
  const motes = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 3.5 + 1,
    dur: (Math.random() * 6 + 6).toFixed(1),
    delay: (Math.random() * 8).toFixed(1),
    drift: ((Math.random() - 0.5) * 80).toFixed(0),
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {motes.map(m => (
        <div
          key={m.id}
          className="absolute rounded-full animate-golden-float"
          style={{
            left: `${m.x}%`,
            bottom: '-4px',
            width: m.size,
            height: m.size,
            background: '#C9A84C',
            boxShadow: `0 0 ${m.size * 2}px rgba(201,168,76,0.8)`,
            '--dur': `${m.dur}s`,
            '--delay': `${m.delay}s`,
            '--drift': `${m.drift}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN LOADING SCREEN
   ═══════════════════════════════════════════════ */
const LoadingScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [verseText, setVerseText] = useState('');
  const [showVerse, setShowVerse] = useState(false);
  const VERSE = 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ';

  /* start verse typewriter after crescent appears */
  useEffect(() => {
    const t = setTimeout(() => setShowVerse(true), 1300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showVerse) return;
    let i = 0;
    const iv = setInterval(() => {
      if (i < VERSE.length) { setVerseText(VERSE.slice(0, ++i)); }
      else clearInterval(iv);
    }, 55);
    return () => clearInterval(iv);
  }, [showVerse]);

  /* progress bar — eases at the end */
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setTimeout(onComplete, 700); return 100; }
        return p + (p < 70 ? 1.6 : p < 90 ? 0.9 : 0.35);
      });
    }, 33);
    return () => clearInterval(iv);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #0d1f3a 0%, #060e1c 55%, #020610 100%)' }}
      exit={{ opacity: 0, scale: 1.06 }}
      transition={{ duration: 0.85, ease: 'easeInOut' }}
    >
      <StarField />
      <GoldenMotes />

      {/* Rotating arabesque backgrounds */}
      <motion.div
        className="absolute animate-arabesque opacity-[0.07]"
        style={{ width: 440, height: 440, '--dur': '55s' } as React.CSSProperties}
      >
        <ArabesqueSVG className="w-full h-full" />
      </motion.div>
      <motion.div
        className="absolute opacity-[0.04]"
        style={{
          width: 260, height: 260,
          animation: 'arabesque-spin 35s linear infinite reverse',
        }}
      >
        <ArabesqueSVG className="w-full h-full" />
      </motion.div>

      {/* Corner arabesques */}
      {[
        { pos: 'top-0 right-0',    size: 140, dir: 1  },
        { pos: 'bottom-0 left-0',  size: 140, dir: -1 },
        { pos: 'top-0 left-0',     size: 90,  dir: -1 },
        { pos: 'bottom-0 right-0', size: 90,  dir: 1  },
      ].map(({ pos, size, dir }, i) => (
        <div key={i} className={`absolute ${pos} opacity-[0.12] overflow-hidden`}
          style={{ width: size, height: size }}>
          <div style={{ animation: `arabesque-spin ${30 + i * 5}s linear infinite ${dir < 0 ? 'reverse' : ''}` }}>
            <ArabesqueSVG className="w-full h-full" />
          </div>
        </div>
      ))}

      {/* Crescent */}
      <motion.div
        className="mb-5 relative"
        initial={{ scale: 0, rotate: -200, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 65%)', transform: 'scale(3.5)' }} />
        <CrescentIcon />
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-6xl md:text-7xl font-bold font-amiri text-center mb-2 animate-glow-pulse"
        style={{ color: '#C9A84C', textShadow: '0 0 30px rgba(201,168,76,0.9), 0 0 70px rgba(201,168,76,0.4)' }}
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.55, ease: 'easeOut' }}
      >
        نور النبوة
      </motion.h1>

      <motion.p
        className="text-desert-sand/55 text-sm tracking-widest mb-5 font-noto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
      >
        خريطة حياة النبي محمد ﷺ التفاعلية
      </motion.p>

      {/* Swords */}
      <SwordsClash />

      {/* Shields + verse */}
      <div className="flex items-center gap-4 px-6 min-h-[90px] mb-6">
        <ShieldDeco side="left" />

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: showVerse ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <p
            className="text-xl md:text-2xl font-amiri leading-loose"
            dir="rtl"
            style={{ color: 'rgba(201,168,76,0.88)', textShadow: '0 0 18px rgba(201,168,76,0.35)' }}
          >
            {verseText}
            {verseText.length < VERSE.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="text-islamic-gold"
              >|</motion.span>
            )}
          </p>
          {verseText.length === VERSE.length && (
            <motion.p
              className="text-xs text-desert-sand/40 mt-1 font-noto"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              ﴿ سورة الأنبياء: ١٠٧ ﴾
            </motion.p>
          )}
        </motion.div>

        <ShieldDeco side="right" />
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-10 w-60 flex flex-col items-center gap-2">
        <div className="w-full h-px bg-islamic-gold/15 relative overflow-hidden rounded-full">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, rgba(201,168,76,0.4), #C9A84C, #F5E6C0)',
              boxShadow: '0 0 10px rgba(201,168,76,0.8)',
            }}
          />
        </div>
        <p className="text-islamic-gold/40 text-xs font-amiri">
          {progress < 100 ? 'جاري التحميل...' : 'بسم الله الرحمن الرحيم'}
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
