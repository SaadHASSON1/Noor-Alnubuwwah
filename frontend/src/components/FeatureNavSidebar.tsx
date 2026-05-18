import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Clock, Users, Sparkles, HelpCircle, ScrollText, X, Menu } from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: <Home size={16} />,        label: 'الرئيسية',             path: '/' },
  { icon: <Clock size={16} />,       label: 'التسلسل الزمني',       path: '/timeline' },
  { icon: <Users size={16} />,       label: 'الصحابة الكرام',        path: '/companions' },
  { icon: <Sparkles size={16} />,    label: 'معجزاته ﷺ',            path: '/miracles' },
  { icon: <HelpCircle size={16} />,  label: 'الاختبار التفاعلي',     path: '/quiz' },
  { icon: <ScrollText size={16} />,  label: 'خطبة الوداع الكاملة',   path: '/farewell-sermon' },
];

const FeatureNavSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Toggle button — top-right corner */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        onClick={() => setIsOpen(v => !v)}
        aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
        className="fixed top-5 right-5 z-[100] flex items-center justify-center rounded-full"
        style={{
          width: 40,
          height: 40,
          background: isOpen ? 'rgba(201,168,76,0.2)' : 'rgba(3,8,19,0.85)',
          border: `1px solid ${isOpen ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.25)'}`,
          color: '#C9A84C',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={16} strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <Menu size={16} strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[98]"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar"
            dir="rtl"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 340, damping: 35 }}
            className="fixed right-0 top-0 h-full z-[99] flex flex-col"
            style={{
              width: 'min(280px, 90vw)',
              background: 'rgba(3,8,19,0.97)',
              borderLeft: '1px solid rgba(201,168,76,0.2)',
              backdropFilter: 'blur(16px)',
              boxShadow: '-8px 0 40px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div
              className="px-6 pt-16 pb-6"
              style={{ borderBottom: '1px solid rgba(201,168,76,0.1)' }}
            >
              <p
                className="font-noto font-bold"
                style={{ fontSize: '1.2rem', color: '#C9A84C', textShadow: '0 0 15px rgba(201,168,76,0.3)' }}
              >
                نور النبوة
              </p>
              <p className="font-kufi text-white/30 text-xs mt-1" style={{ letterSpacing: '0.05em' }}>
                سيرة النبي محمد ﷺ
              </p>
            </div>

            {/* Navigation items */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
              {NAV_ITEMS.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.button
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index }}
                    onClick={() => handleNav(item.path)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right transition-colors"
                    style={{
                      background: isActive ? 'rgba(201,168,76,0.12)' : 'transparent',
                      border: `1px solid ${isActive ? 'rgba(201,168,76,0.3)' : 'transparent'}`,
                      color: isActive ? '#C9A84C' : 'rgba(255,255,255,0.55)',
                    }}
                    whileHover={{
                      background: 'rgba(201,168,76,0.08)',
                      color: '#C9A84C',
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span style={{ color: isActive ? '#C9A84C' : 'rgba(201,168,76,0.4)' }}>
                      {item.icon}
                    </span>
                    <span className="font-noto text-sm">{item.label}</span>
                    {isActive && (
                      <span
                        className="mr-auto w-1.5 h-1.5 rounded-full"
                        style={{ background: '#C9A84C' }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>

            {/* Footer */}
            <div
              className="px-6 py-5"
              style={{ borderTop: '1px solid rgba(201,168,76,0.1)' }}
            >
              <p
                className="font-noto text-white/20 text-xs text-center"
                style={{ lineHeight: 1.7 }}
              >
                ﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeatureNavSidebar;
