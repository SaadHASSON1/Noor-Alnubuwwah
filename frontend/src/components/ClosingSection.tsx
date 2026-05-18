import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ClosingSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });

  const anim = (delay: number) => ({
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #c4a882, #e8d5a3, #f5ead8)' }}
    >
      {/* Arabesque watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
        <svg viewBox="0 0 400 400" style={{ width: '80vmin', height: '80vmin', animation: 'arabesque-spin 80s linear infinite' }}>
          <g stroke="#7A5A14" strokeWidth="0.6" fill="none">
            <polygon points="200,12 238,88 320,88 256,136 280,212 200,166 120,212 144,136 80,88 162,88" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1="200" y1="10" x2="200" y2="390" transform={`rotate(${i * 30} 200 200)`} opacity="0.4" />
            ))}
            <circle cx="200" cy="200" r="190" />
            <circle cx="200" cy="200" r="130" />
            <circle cx="200" cy="200" r="70" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 text-center px-5 md:px-8 max-w-3xl" dir="rtl">
        {/* Crescent */}
        <motion.div {...anim(0)} className="flex justify-center mb-8">
          <svg viewBox="0 0 80 80" className="w-16 h-16 opacity-60">
            <path d="M40,6 A34,34 0 1,1 40,74 A26,26 0 1,0 40,6" fill="#7A5A14" />
            <polygon points="63,22 65,29 72,29 66,33 68,40 63,36 58,40 60,33 54,29 61,29" fill="#7A5A14" />
          </svg>
        </motion.div>

        {/* Salam */}
        <motion.p {...anim(0.1)} className="font-noto mb-4"
          style={{ fontSize: 'clamp(0.8rem, 2vw, 1rem)', color: '#8B6914', letterSpacing: '0.15em' }}>
          صلى الله عليه وسلم
        </motion.p>

        <motion.h2 {...anim(0.2)}
          className="font-noto font-bold leading-tight mb-6"
          style={{ fontSize: 'clamp(2rem, 7vw, 5rem)', color: '#5a3e1b' }}>
          وَمَا أَرْسَلْنَاكَ
          <br />
          إِلَّا رَحْمَةً لِلْعَالَمِينَ
        </motion.h2>

        <motion.p {...anim(0.3)} className="font-noto mb-10"
          style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', color: '#8B6914', opacity: 0.7 }}>
          ﴿ سورة الأنبياء: ١٠٧ ﴾
        </motion.p>

        {/* Divider */}
        <motion.div {...anim(0.4)} className="flex items-center justify-center gap-3 mb-10 opacity-60">
          <div className="w-28 bg-stone-600" style={{ height: 1.5 }} />
          <div className="w-2.5 h-2.5 rotate-45 bg-stone-600" />
          <div className="w-28 bg-stone-600" style={{ height: 1.5 }} />
        </motion.div>

        {/* Closing hadith */}
        <motion.blockquote {...anim(0.5)}
          className="font-noto leading-loose mb-6"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: '#6b4c22', lineHeight: 2 }}>
          "إِنَّمَا أَنَا رَحْمَةٌ مُهْدَاةٌ"
        </motion.blockquote>
        <motion.p {...anim(0.58)} className="font-noto"
          style={{ fontSize: '0.8rem', color: '#8B6914', opacity: 0.6 }}>
          رواه الحاكم عن أبي هريرة رضي الله عنه
        </motion.p>

        {/* Divider */}
        <motion.div {...anim(0.65)} className="flex items-center justify-center gap-3 mt-12 mb-8 opacity-45">
          <div className="w-20 bg-stone-600" style={{ height: 1.5 }} />
          <div className="w-2 h-2 rotate-45 bg-stone-600" />
          <div className="w-20 bg-stone-600" style={{ height: 1.5 }} />
        </motion.div>

        {/* Footer */}
        <motion.p {...anim(0.72)} className="font-noto opacity-40"
          style={{ fontSize: '0.7rem', color: '#5a3e1b', letterSpacing: '0.1em' }}>
          نور النبوة — خريطة حياة النبي محمد ﷺ
        </motion.p>
      </div>
    </section>
  );
};

export default ClosingSection;
