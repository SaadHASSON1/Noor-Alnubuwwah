import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface Props {
  verse: string;
  verseRef: string;
  bg?: string;
}

/* Helper: convert a blur MotionValue into a CSS filter string */
function useBlurFilter(blurMv: MotionValue<number>): MotionValue<string> {
  return useTransform(blurMv, v => `blur(${v}px)`);
}

/**
 * Apple-style sticky section: the verse zooms IN from huge as you scroll,
 * holds at readable size, then shrinks and fades as you scroll past.
 * Container is 220vh so scrolling takes deliberate time.
 */
const StickyVerse: React.FC<Props> = ({ verse, verseRef, bg = '#06060f' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale   = useTransform(scrollYProgress, [0.05, 0.35, 0.70, 0.95], [1.9, 1, 1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.25, 0.70, 0.95], [0,   1, 1, 0]);
  const blurRaw = useTransform(scrollYProgress, [0.05, 0.30, 0.70, 0.95], [14,  0, 0, 10]);
  const filter  = useBlurFilter(blurRaw);

  return (
    <div ref={containerRef} style={{ height: '220vh', position: 'relative' }}>
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ background: bg }}
      >
        {/* Soft radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 65%)' }} />

        {/* Arabesque subtle background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <svg viewBox="0 0 400 400" style={{ width: 600, height: 600, animation: 'arabesque-spin 70s linear infinite' }}>
            <g stroke="#C9A84C" strokeWidth="0.5" fill="none">
              {Array.from({ length: 12 }).map((_, i) => (
                <line key={i} x1="200" y1="10" x2="200" y2="390" transform={`rotate(${i * 30} 200 200)`} />
              ))}
              <circle cx="200" cy="200" r="190" />
              <circle cx="200" cy="200" r="130" />
              <circle cx="200" cy="200" r="70" />
            </g>
          </svg>
        </div>

        {/* The verse — scale + blur driven by scroll */}
        <motion.div
          style={{ scale, opacity }}
          className="text-center px-5 md:px-8 max-w-5xl mx-auto"
        >
          <motion.p
            style={{ filter }}
            className="font-noto font-bold text-center"
            dir="rtl"
          >
            <span style={{
              fontSize: 'clamp(1.4rem, 4.5vw, 3.5rem)',
              color: '#C9A84C',
              textShadow: '0 0 30px rgba(201,168,76,0.4)',
              lineHeight: 1.8,
              display: 'block',
            }}>
              ﴿{verse}﴾
            </span>
          </motion.p>
          <p className="font-noto text-islamic-gold/45 mt-4" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1rem)' }}>
            — {verseRef}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default StickyVerse;
