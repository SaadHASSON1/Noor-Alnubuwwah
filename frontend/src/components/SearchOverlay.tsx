import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, ChevronLeft, Sword, Star, Zap, Heart, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEERAH_EVENTS, CHAPTER_META } from '../data/seerah';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/* ── Arabic normalisation: strip tashkeel + unify alef variants ── */
function normalise(str: string): string {
  return str
    .replace(/[ً-ٰٟ]/g, '')   // strip all harakat / tashkeel
    .replace(/[أإآ]/g, 'ا')                   // unify alef variants
    .replace(/[ىئ]/g, 'ي')                    // unify ya
    .replace(/ة/g, 'ه')                       // ta marbuta → ha
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/* ── Score a single event against query terms ── */
function scoreEvent(ev: typeof SEERAH_EVENTS[0], terms: string[]): number {
  const titleN       = normalise(ev.title);
  const subtitleN    = normalise(ev.subtitle ?? '');
  const descN        = normalise(ev.description ?? '');
  const chapterN     = normalise(ev.chapter ?? '');
  const highlightN   = normalise(ev.highlight ?? '');
  const locationN    = normalise(ev.location ?? '');

  let score = 0;
  for (const term of terms) {
    if (!term) continue;
    // Exact in title → very high
    if (titleN.includes(term))     score += titleN === term ? 100 : 60;
    // Exact in subtitle
    if (subtitleN.includes(term))  score += 30;
    // Exact in chapter
    if (chapterN.includes(term))   score += 20;
    // Highlight / location
    if (highlightN.includes(term)) score += 15;
    if (locationN.includes(term))  score += 15;
    // Description (lower weight — very long)
    if (descN.includes(term))      score += 10;
  }
  return score;
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  birth:      <Star      size={12} strokeWidth={1.8} />,
  revelation: <BookOpen  size={12} strokeWidth={1.8} />,
  battle:     <Sword     size={12} strokeWidth={1.8} />,
  hijra:      <Map       size={12} strokeWidth={1.8} />,
  victory:    <Zap       size={12} strokeWidth={1.8} />,
  death:      <Heart     size={12} strokeWidth={1.8} />,
};

const TYPE_LABELS: Record<string, string> = {
  birth: 'مولد', revelation: 'وحي', battle: 'غزوة', hijra: 'هجرة',
  victory: 'فتح', treaty: 'معاهدة', farewell: 'وداع', death: 'وفاة', life: 'حياة',
};

/* ── Highlight matching terms in original text ── */
function Highlighted({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  // Build a regex from normalised terms to find positions in original text
  // For simplicity, just bold words that contain any term
  const words = text.split(/(\s+)/);
  return (
    <>
      {words.map((w, i) => {
        const wn = normalise(w);
        const hit = terms.some(t => t && wn.includes(t));
        return hit
          ? <mark key={i} style={{ background: 'rgba(201,168,76,0.25)', color: '#FFE082', borderRadius: 2, padding: '0 1px' }}>{w}</mark>
          : <React.Fragment key={i}>{w}</React.Fragment>;
      })}
    </>
  );
}

const SearchOverlay: React.FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery('');
      setActiveIdx(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => i + 1); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(0, i - 1)); }
      if (e.key === 'Enter') {
        e.preventDefault();
        const r = results[activeIdx];
        if (r) handleSelect(r.id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, activeIdx]);

  /* ── Compute results with scoring ── */
  const results = useMemo(() => {
    const q = query.trim();
    if (!q) return [];

    const terms = normalise(q).split(/\s+/).filter(Boolean);

    const scored = SEERAH_EVENTS
      .map(ev => ({ ev, score: scoreEvent(ev, terms) }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(x => x.ev);

    return scored;
  }, [query]);

  // Clamp activeIdx
  const clampedIdx = Math.min(activeIdx, Math.max(0, results.length - 1));

  const handleSelect = (id: number) => {
    navigate(`/event/${id}`);
    onClose();
  };

  const terms = useMemo(() => normalise(query).split(/\s+/).filter(Boolean), [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] px-4"
          style={{ background: 'rgba(3,8,19,0.94)', backdropFilter: 'blur(12px)' }}
          onClick={e => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, y: -28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-xl"
            dir="rtl"
          >
            {/* ── Input bar ── */}
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl mb-2"
              style={{
                background: 'rgba(10,20,36,0.98)',
                border: '1.5px solid rgba(201,168,76,0.45)',
                boxShadow: '0 12px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.1), inset 0 1px 0 rgba(201,168,76,0.06)',
              }}
            >
              <Search size={18} color="#C9A84C" strokeWidth={1.5} className="flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => { setQuery(e.target.value); setActiveIdx(0); }}
                placeholder="ابحث في أحداث السيرة النبوية…"
                className="flex-1 bg-transparent text-white font-noto font-bold text-base outline-none placeholder:text-white/30"
                style={{ fontSize: '1.05rem' }}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                  className="opacity-40 hover:opacity-75 transition-opacity p-1 rounded-full hover:bg-white/10"
                >
                  <X size={15} color="white" />
                </button>
              )}
              <button
                onClick={onClose}
                className="font-kufi text-white/40 hover:text-white/70 transition-colors text-xs border border-white/15 hover:border-white/30 rounded-md px-2 py-1"
              >
                ESC
              </button>
            </div>

            {/* ── Results dropdown ── */}
            <AnimatePresence mode="wait">
              {results.length > 0 && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.16 }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(10,20,36,0.98)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.55)',
                  }}
                >
                  {/* Results count */}
                  <div
                    className="px-5 py-2 border-b"
                    style={{ borderColor: 'rgba(201,168,76,0.1)' }}
                  >
                    <p className="font-kufi text-islamic-gold/60" style={{ fontSize: '0.78rem' }}>
                      {results.length} نتيجة
                    </p>
                  </div>

                  {results.map((ev, i) => {
                    const meta = CHAPTER_META[ev.chapter];
                    const accent = meta?.accentColor ?? '#C9A84C';
                    const isActive = i === clampedIdx;
                    const typeIcon = TYPE_ICONS[ev.type] ?? <BookOpen size={12} strokeWidth={1.8} />;
                    const typeLabel = TYPE_LABELS[ev.type] ?? '';

                    return (
                      <button
                        key={ev.id}
                        onClick={() => handleSelect(ev.id)}
                        onMouseEnter={() => setActiveIdx(i)}
                        className="w-full flex items-center gap-4 px-5 py-3.5 text-right transition-colors group"
                        style={{
                          background: isActive ? `rgba(201,168,76,0.06)` : 'transparent',
                          borderBottom: i < results.length - 1
                            ? '1px solid rgba(255,255,255,0.04)'
                            : 'none',
                        }}
                      >
                        {/* Icon */}
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                          style={{
                            background: isActive ? `${accent}22` : `${accent}10`,
                            border: `1px solid ${accent}${isActive ? '40' : '1a'}`,
                            color: accent,
                          }}
                        >
                          {typeIcon}
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0 text-right">
                          <p className="font-noto text-white font-bold truncate leading-snug" style={{ fontSize: '0.98rem' }}>
                            <Highlighted text={ev.title} terms={terms} />
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span
                              className="font-kufi truncate"
                              style={{ fontSize: '0.78rem', color: `${accent}aa` }}
                            >
                              {ev.chapter}
                            </span>
                            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>·</span>
                            <span className="font-kufi" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                              {ev.year_display_m}
                            </span>
                            {typeLabel && (
                              <>
                                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>·</span>
                                <span
                                  className="font-kufi rounded px-1 py-0.5"
                                  style={{
                                    fontSize: '0.7rem',
                                    background: `${accent}18`,
                                    color: accent,
                                    border: `1px solid ${accent}25`,
                                  }}
                                >
                                  {typeLabel}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <ChevronLeft
                          size={14}
                          color={accent}
                          className="transition-opacity flex-shrink-0"
                          style={{ opacity: isActive ? 0.7 : 0 }}
                        />
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {query.trim() && results.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl px-5 py-12 text-center"
                  style={{
                    background: 'rgba(10,20,36,0.98)',
                    border: '1px solid rgba(201,168,76,0.15)',
                  }}
                >
                  <Search size={28} color="rgba(201,168,76,0.3)" className="mx-auto mb-3" />
                  <p className="font-noto text-white/50 text-sm mb-1">
                    لا توجد نتائج لـ «{query}»
                  </p>
                  <p className="font-kufi text-white/25" style={{ fontSize: '0.8rem' }}>
                    جرّب كلمات مختلفة أو أقصر
                  </p>
                </motion.div>
              )}

              {!query.trim() && (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center pt-4 pb-2"
                >
                  <p className="font-kufi text-white/22 tracking-widest" style={{ fontSize: '0.8rem' }}>
                    ابدأ الكتابة للبحث في أحداث السيرة
                  </p>
                  <p className="font-kufi text-white/15 mt-1" style={{ fontSize: '0.72rem' }}>
                    ↑↓ للتنقل · Enter للفتح · ESC للإغلاق
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
