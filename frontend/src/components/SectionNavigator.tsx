import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export interface NavSection {
  id: string;
  label: string;
}

interface Props {
  sections: NavSection[];
  accentColor: string;
}

const SectionNavigator: React.FC<Props> = ({ sections, accentColor }) => {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const [visible, setVisible] = useState(false);

  /* Show navigator only after scrolling past hero */
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Track active section via IntersectionObserver */
  useEffect(() => {
    if (!sections.length) return;
    const visMap = new Map<string, boolean>();

    const observers = sections.map(sec => {
      const el = document.getElementById(sec.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visMap.set(sec.id, entry.isIntersecting);
          for (const s of sections) {
            if (visMap.get(s.id)) { setActiveId(s.id); break; }
          }
        },
        { rootMargin: '-15% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach(o => o?.disconnect());
  }, [sections]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }, []);

  if (sections.length < 2) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -12 }}
      transition={{ duration: 0.35 }}
      className="fixed left-3 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      dir="ltr"
      aria-label="قائمة الأقسام"
    >
      <div className="relative">
        {/* Vertical connecting line */}
        <div
          className="absolute top-4 bottom-4 w-px pointer-events-none"
          style={{
            left: 5,
            background: `linear-gradient(to bottom, transparent, ${accentColor}35, transparent)`,
          }}
        />

        <div className="flex flex-col">
          {sections.map(sec => {
            const isActive = activeId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className="group relative flex items-center gap-2.5 py-[7px] px-1.5 rounded-xl transition-colors"
                style={{
                  background: isActive ? `${accentColor}10` : 'transparent',
                }}
                title={sec.label}
              >
                {/* Dot */}
                <motion.div
                  animate={{
                    width:  isActive ? 10 : 6,
                    height: isActive ? 10 : 6,
                    backgroundColor: isActive ? accentColor : 'rgba(255,255,255,0.22)',
                    boxShadow: isActive ? `0 0 10px ${accentColor}70` : 'none',
                  }}
                  transition={{ duration: 0.22 }}
                  className="rounded-full flex-shrink-0 relative z-10"
                  style={{ marginLeft: isActive ? 0 : 2 }}
                />

                {/* Label */}
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0.38 }}
                  className="font-kufi whitespace-nowrap transition-colors group-hover:opacity-70"
                  style={{
                    fontSize: '0.84rem',
                    color: isActive ? accentColor : 'rgba(255,255,255,0.75)',
                    fontWeight: isActive ? 700 : 400,
                    letterSpacing: isActive ? '0.02em' : 0,
                  }}
                >
                  {sec.label}
                </motion.span>

                {/* Hover right-arrow hint */}
                <motion.span
                  className="opacity-0 group-hover:opacity-40 transition-opacity font-kufi"
                  style={{ fontSize: '0.92rem', color: accentColor }}
                >
                  ›
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default SectionNavigator;
