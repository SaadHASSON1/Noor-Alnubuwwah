import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Info } from 'lucide-react';

interface SidebarProps {
  periods: any[];
  activePeriod: any | null;
  setActivePeriod: (period: any) => void;
}

/* ── Crescent icon for sidebar header ── */
const CrescentSmall: React.FC = () => (
  <svg viewBox="0 0 30 30" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="sg"><feGaussianBlur stdDeviation="1.2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
    </defs>
    <path d="M16,3 A12,12 0 1,1 16,27 A9,9 0 1,0 16,3" fill="#C9A84C" filter="url(#sg)" />
    <polygon points="23,7 24,10 27,10 25,12 26,15 23,13 20,15 21,12 19,10 22,10" fill="#C9A84C" filter="url(#sg)" />
  </svg>
);

/* ── Flowing sand timeline connector ── */
const TimelineConnector: React.FC = () => (
  <div className="mx-auto w-px flex-1 timeline-line" style={{ minHeight: '1.25rem' }} />
);

/* ── Animated dot for each period ── */
const TimelineDot: React.FC<{ active: boolean }> = ({ active }) => (
  <div className="flex-shrink-0 flex justify-center" style={{ width: 16 }}>
    <div
      className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
        active
          ? 'border-islamic-gold bg-islamic-gold animate-dot-pulse'
          : 'border-islamic-gold/40 bg-dark-bg'
      }`}
      style={active ? { boxShadow: '0 0 12px rgba(201,168,76,0.7)' } : undefined}
    />
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ periods, activePeriod, setActivePeriod }) => {
  return (
    <div className="w-80 h-full bg-dark-panel border-l border-islamic-gold/20 flex flex-col z-10 shadow-2xl overflow-hidden relative">

      {/* Subtle arabesque background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <svg viewBox="0 0 400 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#C9A84C" strokeWidth="1" fill="none">
            {Array.from({ length: 6 }).map((_, i) => (
              <circle key={i} cx="200" cy={i * 160} r={60 + i * 10} />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1="200" y1="0" x2="200" y2="800"
                transform={`rotate(${i * 22.5} 200 400)`} />
            ))}
          </g>
        </svg>
      </div>

      {/* ── Header ── */}
      <div className="p-5 border-b border-islamic-gold/20 bg-gradient-to-b from-islamic-green/15 to-transparent relative flex-shrink-0">
        {/* top gold line accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-islamic-gold/60 to-transparent" />

        <div className="flex items-center gap-3 mb-1">
          <CrescentSmall />
          <h1
            className="text-3xl font-bold font-amiri animate-shimmer"
            style={{ filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.4))' }}
          >
            نور النبوة
          </h1>
        </div>
        <p className="text-sm text-gray-400 font-noto pr-9">خريطة حياة النبي محمد ﷺ التفاعلية</p>

        {/* decorative divider */}
        <div className="mt-3 flex items-center gap-2 opacity-40">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-islamic-gold/70" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold rounded-sm" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-islamic-gold/70" />
        </div>
      </div>

      {/* ── Periods list ── */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2 font-amiri">
          <Clock className="w-4 h-4 text-islamic-gold" />
          الفترات الزمنية
        </h2>

        <div className="relative">
          {periods.map((period, index) => {
            const isActive = activePeriod?.id === period.id;
            const isLast = index === periods.length - 1;

            return (
              <div key={period.id} className="flex gap-3">
                {/* Timeline column */}
                <div className="flex flex-col items-center" style={{ width: 16 }}>
                  <TimelineDot active={isActive} />
                  {!isLast && <TimelineConnector />}
                </div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  onClick={() => setActivePeriod(period)}
                  className={`flex-1 mb-3 p-4 rounded-xl cursor-pointer transition-all duration-300 border relative overflow-hidden ${
                    isActive
                      ? 'bg-islamic-green/25 border-islamic-gold/50 shadow-lg'
                      : 'bg-dark-bg/60 border-islamic-gold/10 hover:border-islamic-gold/35 hover:bg-dark-bg/80'
                  }`}
                  style={isActive ? { boxShadow: '0 0 20px rgba(201,168,76,0.08), inset 0 0 20px rgba(201,168,76,0.03)' } : undefined}
                >
                  {/* shimmer sweep on active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(105deg, transparent 30%, rgba(201,168,76,0.06) 50%, transparent 70%)',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{ backgroundPosition: ['-100% 0', '200% 0'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                    />
                  )}

                  <div className="flex justify-between items-start mb-1 relative">
                    <h3 className={`font-bold text-base font-amiri leading-tight ${isActive ? 'text-islamic-gold' : 'text-white/90'}`}>
                      {period.title_ar}
                    </h3>
                    <span className="text-xs text-islamic-gold/60 px-2 py-0.5 bg-dark-bg/60 rounded-md flex-shrink-0 mr-2 font-noto">
                      {period.start_year}–{period.end_year}م
                    </span>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-gray-300 leading-relaxed mt-2 border-t border-islamic-gold/10 pt-2 font-noto relative"
                      >
                        {period.description_ar}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="p-4 border-t border-islamic-gold/15 text-center flex-shrink-0 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-islamic-gold/40 to-transparent" />
        <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5 font-noto">
          <Info className="w-3 h-3 text-islamic-gold/60" />
          البيانات مستمدة من مصادر السيرة المعتمدة
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
