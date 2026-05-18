import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronUp, Search } from 'lucide-react';
import React, { useState, useEffect } from 'react';

import HomePage           from './pages/HomePage';
import ChapterPage        from './pages/ChapterPage';
import EventPage          from './pages/EventPage';
import TimelinePage       from './pages/TimelinePage';
import MapPage            from './pages/MapPage';
import CompanionsPage     from './pages/CompanionsPage';
import MiraclesPage       from './pages/MiraclesPage';
import QuizPage           from './pages/QuizPage';
import FarewellSermonPage from './pages/FarewellSermonPage';
import FamilyTreePage     from './pages/FamilyTreePage';
import SearchOverlay      from './components/SearchOverlay';
import ScrollToTop        from './components/ScrollToTop';
import FeatureNavSidebar  from './components/FeatureNavSidebar';

/* ── Back-to-top (scroll-linked) ── */
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

/* ── Global floating nav ── */
function GlobalNav({ onSearchOpen }: { onSearchOpen: () => void }) {
  const location = useLocation();

  const navItems = [
    { icon: Search, label: 'بحث', action: onSearchOpen, path: null },
    // { icon: Map, label: 'الخريطة', action: () => navigate('/map'), path: '/map' }, // مؤقتاً مخفي
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed top-5 left-5 z-[100] flex items-center gap-1.5"
      dir="rtl"
    >
      {navItems.map(({ icon: Icon, label, action, path }) => {
        const isActive = path && location.pathname === path;
        return (
          <motion.button
            key={label}
            onClick={action}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-kufi text-sm"
            style={{
              background: isActive ? 'rgba(201,168,76,0.2)' : 'rgba(3,8,19,0.82)',
              border: `1px solid ${isActive ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.22)'}`,
              color: '#C9A84C',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
            }}
          >
            <Icon size={16} strokeWidth={1.8} />
            <span>{label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

/* ── Page transition wrapper ── */
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  /* Ctrl+K / Cmd+K opens search */
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
          <Route path="/timeline" element={
            <PageWrapper><TimelinePage /></PageWrapper>
          } />
          <Route path="/map" element={
            <PageWrapper><MapPage /></PageWrapper>
          } />
          <Route path="/companions" element={
            <PageWrapper><CompanionsPage /></PageWrapper>
          } />
          <Route path="/miracles" element={
            <PageWrapper><MiraclesPage /></PageWrapper>
          } />
          <Route path="/quiz" element={
            <PageWrapper><QuizPage /></PageWrapper>
          } />
          <Route path="/farewell-sermon" element={
            <PageWrapper><FarewellSermonPage /></PageWrapper>
          } />
          <Route path="/family-tree" element={
            <PageWrapper><FamilyTreePage /></PageWrapper>
          } />
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
