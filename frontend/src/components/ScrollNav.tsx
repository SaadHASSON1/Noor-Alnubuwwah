import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SeerahEvent } from '../data/seerah';

interface Props { events: SeerahEvent[]; }

const ScrollNav: React.FC<Props> = ({ events }) => {
  const [activeId, setActiveId] = useState<number>(1);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const sections = events.map(e => document.querySelector(`[data-event-id="${e.id}"]`));

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = Number((entry.target as HTMLElement).dataset.eventId);
            setActiveId(id);
          }
        }
      },
      { threshold: 0.4 }
    );

    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, [events]);

  return (
    <div
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-2.5 hidden md:flex"
      dir="ltr"
    >
      {events.map(ev => {
        const isActive = ev.id === activeId;
        const isHovered = ev.id === hovered;

        return (
          <div
            key={ev.id}
            className="relative flex items-center"
            onMouseEnter={() => setHovered(ev.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute left-6 whitespace-nowrap font-noto text-xs px-2 py-1 rounded"
                  style={{ background: 'rgba(10,15,30,0.9)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15 }}
                  dir="rtl"
                >
                  <span style={{ color: 'rgba(201,168,76,0.5)', marginLeft: 4 }}>{ev.year_display_m}</span>
                  {' '}{ev.title}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.button
              onClick={() => {
                document.querySelector(`[data-event-id="${ev.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                background: isActive ? '#C9A84C' : 'rgba(201,168,76,0.3)',
                boxShadow: isActive ? '0 0 10px rgba(201,168,76,0.7)' : 'none',
              }}
              animate={{ scale: isActive ? 1 : 1 }}
              whileHover={{ scale: 1.4 }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ScrollNav;
