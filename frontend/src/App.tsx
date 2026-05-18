import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

import HomePage    from './pages/HomePage';
import ChapterPage from './pages/ChapterPage';
import EventPage   from './pages/EventPage';

/* ── Back-to-top (only on HomePage) ── */
function BackToTop() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.12], [0, 0, 1]);
  const scale   = useTransform(scrollYProgress, [0.08, 0.14], [0.6, 1]);

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center rounded-full"
      style={{
        opacity,
        scale,
        width: 46,
        height: 46,
        background: 'rgba(3,8,19,0.88)',
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

/* ── Page transition wrapper ── */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.35, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

import React from 'react';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();

  return (
    <div dir="rtl" className="relative">
      <ScrollToTop />
      <BackToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PageWrapper><HomePage /></PageWrapper>
          } />
          <Route path="/chapter/:chapterName" element={
            <PageWrapper><ChapterPage /></PageWrapper>
          } />
          <Route path="/event/:eventId" element={
            <PageWrapper><EventPage /></PageWrapper>
          } />
          {/* Fallback */}
          <Route path="*" element={
            <PageWrapper>
              <div
                className="min-h-screen flex items-center justify-center"
                style={{ background: '#030813' }}
              >
                <div className="text-center" dir="rtl">
                  <p className="font-noto text-white/50 text-xl mb-4">الصفحة غير موجودة</p>
                  <a
                    href="/"
                    className="font-kufi text-islamic-gold text-sm border border-islamic-gold/30 px-6 py-2 rounded-full hover:bg-islamic-gold/10 transition-colors"
                  >
                    العودة للرئيسية
                  </a>
                </div>
              </div>
            </PageWrapper>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
