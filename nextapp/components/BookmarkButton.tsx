'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks } from '@/context/BookmarksContext';

interface Props {
  eventId: number;
  accentColor?: string;
  size?: 'sm' | 'md';
}

const BookmarkButton: React.FC<Props> = ({ eventId, accentColor = '#C9A84C', size = 'md' }) => {
  const { toggle, isBookmarked } = useBookmarks();
  const saved = isBookmarked(eventId);

  const iconSize = size === 'sm' ? 14 : 16;
  const padX    = size === 'sm' ? '0.6rem' : '0.85rem';
  const padY    = size === 'sm' ? '0.35rem' : '0.5rem';
  const fontSize = size === 'sm' ? '0.72rem' : '0.82rem';

  return (
    <motion.button
      onClick={e => { e.stopPropagation(); toggle(eventId); }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.93 }}
      className="flex items-center gap-1.5 font-kufi rounded-full transition-colors duration-200"
      style={{
        padding: `${padY} ${padX}`,
        fontSize,
        background: saved ? `${accentColor}22` : 'rgba(255,255,255,0.05)',
        border: `1px solid ${saved ? accentColor + '55' : 'rgba(255,255,255,0.12)'}`,
        color: saved ? accentColor : 'rgba(255,255,255,0.55)',
      }}
      aria-label={saved ? 'إزالة من المحفوظات' : 'حفظ الحدث'}
      title={saved ? 'إزالة من المحفوظات' : 'حفظ'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {saved ? (
          <motion.span
            key="saved"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <BookmarkCheck size={iconSize} strokeWidth={2} style={{ color: accentColor }} />
            {size === 'md' && <span>محفوظ</span>}
          </motion.span>
        ) : (
          <motion.span
            key="unsaved"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Bookmark size={iconSize} strokeWidth={1.8} />
            {size === 'md' && <span>حفظ</span>}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default BookmarkButton;
