import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEERAH_EVENTS, CHAPTER_META } from '../data/seerah';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const results = query.trim()
    ? SEERAH_EVENTS.filter(ev =>
        ev.title.includes(query) ||
        ev.subtitle?.includes(query) ||
        ev.description.includes(query) ||
        ev.chapter.includes(query)
      ).slice(0, 7)
    : [];

  const handleSelect = (id: number) => {
    navigate(`/event/${id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4"
          style={{ background: 'rgba(3,8,19,0.93)', backdropFilter: 'blur(10px)' }}
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-xl"
            dir="rtl"
          >
            {/* Input bar */}
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-2"
              style={{
                background: 'rgba(13,27,42,0.98)',
                border: '1px solid rgba(201,168,76,0.4)',
                boxShadow: '0 12px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.08)',
              }}
            >
              <Search size={18} color="#C9A84C" strokeWidth={1.5} className="flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="ابحث في أحداث السيرة النبوية…"
                className="flex-1 bg-transparent text-white font-noto text-base outline-none placeholder:text-white/25"
                style={{ fontSize: '1.05rem' }}
              />
              {query && (
                <button onClick={() => setQuery('')} className="opacity-40 hover:opacity-70 transition-opacity">
                  <X size={15} color="white" />
                </button>
              )}
              <button
                onClick={onClose}
                className="opacity-30 hover:opacity-60 transition-opacity font-kufi text-white text-xs border border-white/20 rounded px-1.5 py-0.5"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <AnimatePresence mode="wait">
              {results.length > 0 && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(13,27,42,0.98)',
                    border: '1px solid rgba(201,168,76,0.18)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  }}
                >
                  {results.map((ev, i) => {
                    const meta = CHAPTER_META[ev.chapter];
                    const accent = meta?.accentColor ?? '#C9A84C';
                    return (
                      <button
                        key={ev.id}
                        onClick={() => handleSelect(ev.id)}
                        className="w-full flex items-center gap-4 px-5 py-3.5 text-right hover:bg-white/[0.04] transition-colors group"
                        style={{
                          borderBottom: i < results.length - 1
                            ? '1px solid rgba(255,255,255,0.045)'
                            : 'none',
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${accent}15`, border: `1px solid ${accent}28` }}
                        >
                          <BookOpen size={13} color={accent} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0 text-right">
                          <p className="font-noto text-white text-sm font-bold truncate leading-snug">
                            {ev.title}
                          </p>
                          <p className="font-kufi text-xs opacity-45 truncate mt-0.5" style={{ color: accent }}>
                            {ev.chapter} · {ev.year_display_m}
                          </p>
                        </div>
                        <ChevronLeft size={14} color={accent} className="opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0" />
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {query && results.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl px-5 py-10 text-center"
                  style={{
                    background: 'rgba(13,27,42,0.98)',
                    border: '1px solid rgba(201,168,76,0.15)',
                  }}
                >
                  <p className="font-noto text-white/25 text-sm">
                    لا توجد نتائج لـ «{query}»
                  </p>
                </motion.div>
              )}

              {!query && (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center font-kufi text-white/18 text-xs mt-5 tracking-widest"
                >
                  ابدأ الكتابة للبحث · ESC للإغلاق
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
