'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronUp, Search, Bookmark, BookmarkCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BookmarksProvider, useBookmarks } from '@/context/BookmarksContext';
import { ReadingModeProvider, useReadingMode } from '@/context/ReadingModeContext';
import SearchOverlay from './SearchOverlay';
import FeatureNavSidebar from './FeatureNavSidebar';
import ScrollToTop from './ScrollToTop';

const BOOKMARKABLE_PAGES: Record<string, string> = {
  '/timeline':        'التسلسل الزمني',
  '/character':       'صفاته ﷺ',
  '/daily-life':      'حياته اليومية ﷺ',
  '/hijra':           'رحلة الهجرة',
  '/battles':         'غزواته ﷺ',
  '/saraya':          'السرايا العسكرية',
  '/letters':         'رسائله للملوك',
  '/wives':           'أمهات المؤمنين',
  '/companions':      'الصحابة الكرام',
  '/miracles':        'معجزاته ﷺ',
  '/family-tree':     'شجرة النسب الشريف',
  '/quiz':            'الاختبار التفاعلي',
  '/farewell-sermon': 'خطبة الوداع الكاملة',
  '/prophecies':      'نبوءاته ﷺ',
  '/names':           'أسماؤه ﷺ',
  '/scribes':         'كتّاب الوحي',
  '/sources':         'المصادر والمراجع',
};

function BackToTop() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.12], [0, 0, 1]);
  const scale   = useTransform(scrollYProgress, [0.08, 0.14], [0.6, 1]);
  const { isReading } = useReadingMode();

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center rounded-full"
      style={{
        opacity,
        scale,
        width: 46,
        height: 46,
        background: isReading ? 'rgba(250,246,238,0.92)' : 'rgba(3,8,19,0.88)',
        border: '1px solid rgba(201,168,76,0.45)',
        color: '#C9A84C',
        boxShadow: '0 4px 20px rgba(201,168,76,0.15)',
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      aria-label="العودة للأعلى"
    >
      <ChevronUp size={20} strokeWidth={2} />
    </motion.button>
  );
}

function GlobalNav({ onSearchOpen }: { onSearchOpen: () => void }) {
  const pathname = usePathname();
  const { isPageBookmarked, togglePage } = useBookmarks();
  const { isReading } = useReadingMode();

  const pageLabel = BOOKMARKABLE_PAGES[pathname];
  const saved     = pageLabel ? isPageBookmarked(pathname) : false;

  const btnBg     = isReading ? 'rgba(250,246,238,0.92)' : 'rgba(3,8,19,0.82)';
  const btnBorder = isReading ? 'rgba(201,168,76,0.4)'   : 'rgba(201,168,76,0.22)';
  const btnShadow = isReading ? '0 2px 12px rgba(0,0,0,0.15)' : '0 2px 12px rgba(0,0,0,0.4)';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed top-5 left-5 z-[100] flex items-center gap-1.5"
      dir="rtl"
    >
      <motion.button
        onClick={onSearchOpen}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-kufi text-sm"
        style={{
          background: btnBg,
          border: `1px solid ${btnBorder}`,
          color: '#C9A84C',
          backdropFilter: 'blur(8px)',
          boxShadow: btnShadow,
        }}
      >
        <Search size={16} strokeWidth={1.8} />
        <span>بحث</span>
      </motion.button>

      <AnimatePresence>
        {pageLabel && (
          <motion.button
            key="page-bookmark"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => togglePage(pathname, pageLabel)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label={saved ? 'إزالة من المحفوظات' : 'حفظ الصفحة'}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-kufi text-sm"
            style={{
              background: saved ? 'rgba(201,168,76,0.18)' : btnBg,
              border: `1px solid ${saved ? 'rgba(201,168,76,0.5)' : btnBorder}`,
              color: '#C9A84C',
              backdropFilter: 'blur(8px)',
              boxShadow: btnShadow,
            }}
          >
            <AnimatePresence mode="wait">
              {saved ? (
                <motion.span key="saved" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                  <BookmarkCheck size={16} strokeWidth={1.8} />
                </motion.span>
              ) : (
                <motion.span key="unsaved" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                  <Bookmark size={16} strokeWidth={1.8} />
                </motion.span>
              )}
            </AnimatePresence>
            <span>{saved ? 'محفوظة' : 'حفظ'}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(v => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div dir="rtl" className="relative">
      <ScrollToTop />
      <BackToTop />
      <GlobalNav onSearchOpen={() => setSearchOpen(true)} />
      <FeatureNavSidebar />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      {children}
    </div>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BookmarksProvider>
      <ReadingModeProvider>
        <AppShell>{children}</AppShell>
      </ReadingModeProvider>
    </BookmarksProvider>
  );
}
