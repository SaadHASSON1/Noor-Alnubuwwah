'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PanelRight } from 'lucide-react';
import type { SeerahEvent } from '@/data/seerah';

const CHAPTER_COLORS: Record<string, string> = {
  'الفجر':    '#C9A84C',
  'النور':    '#A8C8E8',
  'الابتلاء': '#E8A8A8',
  'الهجرة':   '#A8E8C8',
  'المعارك':  '#E8C8A8',
  'الفتح':    '#C8E8A8',
  'الوداع':   '#D4B896',
  'الرحيل':   '#C9A84C',
};

const CHAPTER_ICONS: Record<string, string> = {
  'الفجر':    '🌙',
  'النور':    '✨',
  'الابتلاء': '🔥',
  'الهجرة':   '🌿',
  'المعارك':  '⚔️',
  'الفتح':    '🏆',
  'الوداع':   '⛰️',
  'الرحيل':   '🕊️',
};

interface Props {
  events: SeerahEvent[];
}

const ChapterSidebar: React.FC<Props> = ({ events }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(1);
  const [expandedChapter, setExpandedChapter] = useState<string | null>('الفجر');

  // Track active section
  useEffect(() => {
    const els = events.map(e => document.querySelector(`[data-event-id="${e.id}"]`));
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(Number((entry.target as HTMLElement).dataset.eventId));
          }
        }
      },
      { threshold: 0.4 }
    );
    els.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [events]);

  // Group events by chapter preserving order
  const chapters: { name: string; events: SeerahEvent[] }[] = [];
  const seen = new Set<string>();
  for (const ev of events) {
    if (!seen.has(ev.chapter)) {
      seen.add(ev.chapter);
      chapters.push({ name: ev.chapter, events: [] });
    }
    chapters.find(c => c.name === ev.chapter)!.events.push(ev);
  }

  const scrollTo = (id: number) => {
    document.querySelector(`[data-event-id="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle button — always visible on RIGHT side */}
      <motion.button
        onClick={() => setIsOpen(v => !v)}
        className="fixed top-1/2 right-0 -translate-y-1/2 z-50 flex items-center justify-center"
        style={{
          width: 36,
          height: 72,
          background: 'rgba(3,8,19,0.92)',
          border: '1px solid rgba(201,168,76,0.35)',
          borderRight: 'none',
          borderRadius: '12px 0 0 12px',
          color: '#C9A84C',
          boxShadow: '-4px 0 20px rgba(201,168,76,0.1)',
        }}
        whileHover={{ width: 44 }}
        transition={{ duration: 0.2 }}
        aria-label="فتح/إغلاق القائمة"
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={16} /></motion.div>
            : <motion.div key="p" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><PanelRight size={16} /></motion.div>
          }
        </AnimatePresence>
      </motion.button>

      {/* Sidebar panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop — all screens */}
            <motion.div
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.55)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel — slides from RIGHT */}
            <motion.div
              className="fixed top-0 right-0 h-full z-50 flex flex-col overflow-hidden"
              style={{
                width: 'min(300px, 85vw)',
                background: 'rgba(5,10,22,0.98)',
                borderLeft: '1px solid rgba(201,168,76,0.2)',
                boxShadow: '-4px 0 40px rgba(0,0,0,0.6)',
              }}
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              {/* Gold top line */}
              <div style={{ height: 2, background: 'linear-gradient(to left, #C9A84C, transparent)' }} />

              {/* Header */}
              <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
                <h2 className="font-amiri text-xl" style={{ color: '#C9A84C' }}>نور النبوة</h2>
                <p className="font-noto text-xs mt-0.5" style={{ color: '#f2f3f3' }}>
                  السيرة النبوية المشرفة
                </p>
              </div>

              {/* Chapters list */}
              <div className="flex-1 overflow-y-auto py-3 px-3" dir="rtl">
                {chapters.map((chapter) => {
                  const color = CHAPTER_COLORS[chapter.name] ?? '#C9A84C';
                  const icon  = CHAPTER_ICONS[chapter.name]  ?? '◆';
                  const isExpanded = expandedChapter === chapter.name;
                  const hasActive = chapter.events.some(e => e.id === activeId);

                  return (
                    <div key={chapter.name} className="mb-1">
                      {/* Chapter header */}
                      <button
                        onClick={() => setExpandedChapter(isExpanded ? null : chapter.name)}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-200 text-right"
                        style={{
                          background: hasActive ? `${color}15` : isExpanded ? 'rgba(255,255,255,0.04)' : 'transparent',
                          border: `1px solid ${hasActive ? color + '40' : 'transparent'}`,
                        }}
                      >
                        <span className="text-base" style={{ lineHeight: 1 }}>{icon}</span>
                        <span className="font-kufi flex-1 text-sm" style={{ color: hasActive ? color : isExpanded ? '#d9dadc' : '#818489' }}>
                          {chapter.name}
                        </span>
                        <span className="text-xs font-noto" style={{ color: '#ebebec' }}>
                          {chapter.events.length}
                        </span>
                        <svg
                          viewBox="0 0 10 10" width={10} height={10}
                          style={{
                            color: '#f2f3f3',
                            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s',
                            flexShrink: 0,
                          }}
                        >
                          <path d="M3 2 L7 5 L3 8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                        </svg>
                      </button>

                      {/* Events under chapter */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div className="mr-3 pr-3 mt-0.5 mb-1" style={{ borderRight: `1px solid ${color}30` }}>
                              {chapter.events.map(ev => {
                                const isActive = ev.id === activeId;
                                return (
                                  <button
                                    key={ev.id}
                                    onClick={() => { scrollTo(ev.id); }}
                                    className="w-full text-right px-3 py-2 rounded-lg mb-0.5 flex items-center gap-2 transition-all duration-150"
                                    style={{
                                      background: isActive ? `${color}20` : 'transparent',
                                    }}
                                  >
                                    {isActive && (
                                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                                    )}
                                    <span
                                      className="font-noto text-sm flex-1"
                                      style={{ color: isActive ? color : '#9a9ca1' }}
                                    >
                                      {ev.title}
                                    </span>
                                    <span className="font-noto text-xs" style={{ color: '#ebebec' }}>
                                      {ev.year_display_m}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 border-t" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                <p className="font-noto text-xs text-center" style={{ color: '#ebebec' }}>
                  18 محطة في السيرة النبوية
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChapterSidebar;
