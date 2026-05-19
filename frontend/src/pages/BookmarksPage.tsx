import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, Bookmark, BookmarkCheck, BookmarkX, FileText } from 'lucide-react';
import { useBookmarks } from '../context/BookmarksContext';
import { SEERAH_EVENTS, CHAPTER_META } from '../data/seerah';
import EventCard from '../components/EventCard';

const BookmarksPage: React.FC = () => {
  const navigate = useNavigate();
  const { bookmarks, clear, count, pageBookmarks, clearPages, pageCount, totalCount } = useBookmarks();

  const savedEvents = SEERAH_EVENTS.filter(e => bookmarks.has(e.id));

  return (
    <div className="min-h-screen relative" dir="rtl" style={{ background: '#030813' }}>

      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-6 right-20 z-50 flex items-center gap-2 text-sm font-kufi"
        style={{ color: '#C9A84C' }}
      >
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
          <Home size={14} />الرئيسية
        </button>
        <ChevronRight size={14} className="opacity-40" />
        <span className="opacity-90">المحفوظات</span>
      </motion.nav>

      {/* Hero */}
      <div className="pt-28 pb-12 px-5 text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center gap-3 justify-center mb-6 opacity-25"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Bookmark size={18} style={{ color: '#C9A84C' }} />
          <p className="font-kufi text-islamic-gold/50 text-xs tracking-widest">المحفوظات الشخصية</p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-noto font-bold text-islamic-gold mb-3"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          محفوظاتي
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="font-kufi text-sm mt-2"
          style={{ color: '#8e9095' }}
        >
          {totalCount > 0
            ? `${count > 0 ? `${count} حدث` : ''}${count > 0 && pageCount > 0 ? ' · ' : ''}${pageCount > 0 ? `${pageCount} صفحة` : ''} محفوظ`
            : 'لا توجد محفوظات بعد'}
        </motion.p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-5 md:px-10 pb-28">
        {totalCount === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.15)' }}
            >
              <Bookmark size={32} style={{ color: 'rgba(201,168,76,0.4)' }} strokeWidth={1.5} />
            </div>
            <p className="font-noto text-xl mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              لم تحفظ أي حدث بعد
            </p>
            <p className="font-kufi text-sm mb-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
              اضغط على أيقونة الحفظ في أي حدث لإضافته هنا
            </p>
            <button
              onClick={() => navigate('/')}
              className="font-kufi text-sm px-7 py-3 rounded-full transition-all"
              style={{
                background: 'rgba(201,168,76,0.1)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: '#C9A84C',
              }}
            >
              تصفّح السيرة النبوية ←
            </button>
          </motion.div>
        ) : (
          <>
            {/* Clear all button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-end mb-6"
            >
              <button
                onClick={() => { if (confirm('هل تريد مسح جميع المحفوظات؟')) { clear(); clearPages(); } }}
                className="flex items-center gap-2 font-kufi text-sm px-4 py-2 rounded-full transition-all"
                style={{
                  background: 'rgba(255,80,80,0.07)',
                  border: '1px solid rgba(255,80,80,0.2)',
                  color: 'rgba(255,120,120,0.8)',
                }}
              >
                <BookmarkX size={14} />
                مسح الكل
              </button>
            </motion.div>

            {/* ── الصفحات المحفوظة ── */}
            {pageCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-5">
                  <FileText size={16} style={{ color: '#C9A84C' }} />
                  <h2 className="font-noto font-bold" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: '#C9A84C' }}>
                    الصفحات المحفوظة
                  </h2>
                  <div className="flex-1 h-px opacity-15" style={{ background: '#C9A84C' }} />
                  <span className="font-kufi text-xs" style={{ color: '#C9A84C', opacity: 0.6 }}>
                    {pageCount} صفحة
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[...pageBookmarks.entries()].map(([path, label], i) => (
                    <motion.button
                      key={path}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * i, duration: 0.2 }}
                      onClick={() => navigate(path)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center gap-2 font-kufi text-sm px-5 py-3 rounded-xl"
                      style={{
                        background: 'rgba(201,168,76,0.07)',
                        border: '1px solid rgba(201,168,76,0.25)',
                        color: '#C9A84C',
                      }}
                    >
                      <BookmarkCheck size={14} strokeWidth={1.8} />
                      {label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── أحداث السيرة المحفوظة ── */}
            {count > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 mb-5"
              >
                <Bookmark size={16} style={{ color: '#C9A84C' }} />
                <h2 className="font-noto font-bold" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: '#C9A84C' }}>
                  أحداث السيرة المحفوظة
                </h2>
                <div className="flex-1 h-px opacity-15" style={{ background: '#C9A84C' }} />
                <span className="font-kufi text-xs" style={{ color: '#C9A84C', opacity: 0.6 }}>
                  {count} حدث
                </span>
              </motion.div>
            )}

            {/* Events grid — grouped by chapter */}
            {Object.entries(
              savedEvents.reduce<Record<string, typeof savedEvents>>((acc, ev) => {
                (acc[ev.chapter] = acc[ev.chapter] || []).push(ev);
                return acc;
              }, {})
            ).map(([chapter, events], gi) => {
              const meta = CHAPTER_META[chapter];
              return (
                <div key={chapter} className="mb-12">
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: gi * 0.05 }}
                    className="flex items-center gap-3 mb-5"
                  >
                    <button
                      onClick={() => navigate(`/chapter/${encodeURIComponent(chapter)}`)}
                      className="font-noto font-bold hover:opacity-75 transition-opacity"
                      style={{ fontSize: 'clamp(1.3rem, 3vw, 1.8rem)', color: meta?.accentColor ?? '#C9A84C' }}
                    >
                      {chapter}
                    </button>
                    <div className="flex-1 h-px opacity-15" style={{ background: meta?.accentColor ?? '#C9A84C' }} />
                    <span className="font-kufi text-xs" style={{ color: meta?.accentColor ?? '#C9A84C', opacity: 0.6 }}>
                      {events.length} حدث
                    </span>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events.map((ev, i) => (
                      <EventCard
                        key={ev.id}
                        event={ev}
                        accentColor={meta?.accentColor ?? '#C9A84C'}
                        chapterBg={meta?.gradientFrom}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
