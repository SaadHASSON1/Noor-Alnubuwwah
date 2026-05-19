import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Home, ChevronRight, X, Users, Heart,
  Baby, Crown, ChevronLeft, ChevronRight as ChevronRightIcon,
} from 'lucide-react';

/* ══════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════ */
interface Person {
  name: string;
  title?: string;
  relation: string;
  info?: string;
  color?: string;
}

/* ══════════════════════════════════════════════
   DATA — النسب من عدنان إلى محمد ﷺ (أقدم → أحدث)
══════════════════════════════════════════════ */
const LINEAGE_ORDERED = [
  { name: 'عدنان',        gen: 1  },
  { name: 'مَعَد',        gen: 2  },
  { name: 'نِزار',        gen: 3  },
  { name: 'مُضَر',        gen: 4  },
  { name: 'إلياس',        gen: 5  },
  { name: 'مُدرِكة',      gen: 6  },
  { name: 'خزيمة',        gen: 7  },
  { name: 'كنانة',        gen: 8  },
  { name: 'النضر',        gen: 9  },
  { name: 'مالك',         gen: 10 },
  { name: 'فِهر — قريش', gen: 11 },
  { name: 'غالب',         gen: 12 },
  { name: 'لُؤَي',        gen: 13 },
  { name: 'كعب',          gen: 14 },
  { name: 'مُرَّة',       gen: 15 },
  { name: 'كِلاب',        gen: 16 },
  { name: 'قُصَي',        gen: 17 },
  { name: 'عبد مناف',     gen: 18 },
  { name: 'هاشم',         gen: 19 },
  { name: 'عبد المطلب',   gen: 20 },
  { name: 'عبد الله',     gen: 21 },
  { name: 'محمد ﷺ',       gen: 22 },
];

const PARENTS: Person[] = [
  { name: 'عبد الله بن عبد المطلب', relation: 'الأب', info: 'توفي قبل ولادة النبي ﷺ في رحلة تجارية إلى المدينة وعمره خمس وعشرون سنة', color: '#A8C8E8' },
  { name: 'آمنة بنت وهب',           relation: 'الأم', info: 'من بني زهرة من قريش، توفيت في الأبواء وعمر النبي ﷺ ست سنوات', color: '#E8A8C8' },
];
const GRANDFATHERS: Person[] = [
  { name: 'عبد المطلب بن هاشم',        relation: 'الجد من أب',    info: 'كافل النبي ﷺ بعد وفاة أمه، وكان سيد قريش وحافر بئر زمزم', color: '#C9A84C' },
  { name: 'وهب بن عبد مناف',           relation: 'الجد من أم',    info: 'سيد بني زهرة في عصره', color: '#C9A84C' },
  { name: 'حليمة السعدية',             relation: 'المرضعة',       info: 'من بني سعد بن بكر من هوازن، أرضعته في البادية سنواتٍ وأصابتهم بركته', color: '#A8E8C8' },
  { name: 'ثويبة الأسلمية',            relation: 'أول من أرضعته', info: 'جارية أبي لهب، أرضعته أياماً قبل حليمة وأرضعت قبله حمزة بن عبد المطلب', color: '#A8E8C8' },
];
const UNCLES: Person[] = [
  { name: 'حمزة بن عبد المطلب',       relation: 'العم',          info: 'أسد الله وأسد رسوله — سيد الشهداء في أحد', color: '#E8C8A8' },
  { name: 'العباس بن عبد المطلب',     relation: 'العم',          info: 'جدّ الخلفاء العباسيين — أسلم قبيل فتح مكة', color: '#E8C8A8' },
  { name: 'أبو طالب بن عبد المطلب',   relation: 'العم الحامي',   info: 'كافله بعد جده ودافع عنه طوال حياته ولم يُسلم', color: '#C8A8E8' },
  { name: 'أبو لهب عبد العزى',        relation: 'العم العدو',    info: 'أشد أعداء النبي ﷺ من أهله، نزلت فيه سورة المسد', color: '#E8A8A8' },
];
const WIVES: Person[] = [
  { name: 'خديجة بنت خويلد',           relation: 'الزوجة الأولى',  info: 'أول المؤمنين، عاشا معاً ٢٥ عاماً، أم أكثر أولاده', color: '#FFD700' },
  { name: 'سودة بنت زمعة',             relation: 'الزوجة الثانية', info: 'تزوجها بعد وفاة خديجة في مكة', color: '#C9A84C' },
  { name: 'عائشة بنت أبي بكر',         relation: 'أم المؤمنين',    info: 'حبيبته وأعلم نساء الأمة، روت آلاف الأحاديث', color: '#FFD700' },
  { name: 'حفصة بنت عمر',              relation: 'أم المؤمنين',    info: 'بنت عمر بن الخطاب، حافظة القرآن', color: '#C9A84C' },
  { name: 'زينب بنت خزيمة',            relation: 'أم المؤمنين',    info: 'لُقّبت أم المساكين لكثرة إطعامها الفقراء', color: '#C9A84C' },
  { name: 'أم سلمة هند بنت أبي أمية', relation: 'أم المؤمنين',    info: 'من أكثر أمهات المؤمنين علماً وفقهاً', color: '#C9A84C' },
  { name: 'زينب بنت جحش',              relation: 'أم المؤمنين',    info: 'تزوجها بأمر الله في سورة الأحزاب', color: '#C9A84C' },
  { name: 'جويرية بنت الحارث',         relation: 'أم المؤمنين',    info: 'بنت زعيم بني المصطلق، تزوّجها فأعتق المسلمون أسراهم', color: '#C9A84C' },
  { name: 'أم حبيبة رملة بنت أبي سفيان', relation: 'أم المؤمنين', info: 'هاجرت إلى الحبشة وتزوجها النبي ﷺ وهي هناك', color: '#C9A84C' },
  { name: 'صفية بنت حيي',              relation: 'أم المؤمنين',    info: 'من بني النضير، أسلمت بعد خيبر وتزوّجها النبي ﷺ', color: '#C9A84C' },
  { name: 'ميمونة بنت الحارث',         relation: 'أم المؤمنين',    info: 'آخر من تزوجها النبي ﷺ في عمرة القضاء', color: '#C9A84C' },
  { name: 'مارية القبطية',             relation: 'أم إبراهيم',     info: 'أهداها المقوقس، أم ولده إبراهيم الذي مات طفلاً', color: '#A8C8E8' },
];
const CHILDREN: Person[] = [
  { name: 'القاسم',                  relation: 'الابن البكر',   info: 'من خديجة، مات طفلاً وبه كُني أبا القاسم', color: '#A8E8C8' },
  { name: 'عبد الله (الطاهر الطيب)', relation: 'الابن',         info: 'من خديجة، مات طفلاً، وله لقبان الطاهر والطيب', color: '#A8E8C8' },
  { name: 'إبراهيم',                 relation: 'الابن',         info: 'من مارية القبطية، مات رضيعاً فبكى عليه النبي ﷺ', color: '#A8E8C8' },
  { name: 'زينب بنت محمد',           relation: 'البنت الكبرى', info: 'تزوجت أبا العاص بن الربيع وهاجرت إلى المدينة', color: '#E8A8C8' },
  { name: 'رقية بنت محمد',           relation: 'البنت',         info: 'تزوجت عثمان بن عفان، ماتت يوم بدر', color: '#E8A8C8' },
  { name: 'أم كلثوم بنت محمد',       relation: 'البنت',         info: 'تزوجت عثمان بن عفان بعد وفاة رقية فسُمّي ذا النورين', color: '#E8A8C8' },
  { name: 'فاطمة الزهراء',           relation: 'البنت الصغرى', info: 'سيدة نساء العالمين، زوجة علي، أم الحسن والحسين', color: '#FFD700' },
];

/* نجوم محسوبة مسبقاً (تفادياً لـ Math.random داخل الـ render) */
const STARS = Array.from({ length: 60 }, (_, i) => ({
  left: `${((i * 137.508) % 100).toFixed(2)}%`,
  top:  `${((i * 97.315) % 100).toFixed(2)}%`,
  size: 0.4 + (i % 4) * 0.35,
  dur:  `${2 + (i % 5) * 0.7}s`,
  del:  `${(i % 7) * 0.4}s`,
}));

/* ══════════════════════════════════════════════
   مكوّن البطاقة الشخصية
══════════════════════════════════════════════ */
const PersonCard: React.FC<{ person: Person; index: number }> = React.memo(({ person, index }) => {
  const [open, setOpen] = useState(false);
  const color = person.color ?? '#C9A84C';
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
        onClick={() => person.info && setOpen(true)}
        className={`relative rounded-xl p-4 ${person.info ? 'cursor-pointer' : ''}`}
        style={{ background: `${color}0d`, border: `1px solid ${color}25` }}
        whileHover={person.info ? { scale: 1.02, y: -2 } : {}}
        whileTap={person.info ? { scale: 0.98 } : {}}
      >
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}60` }} />
          <div className="flex-1 min-w-0">
            <p className="font-noto font-bold text-white leading-snug" style={{ fontSize: 'clamp(0.9rem,1.8vw,1.05rem)' }}>{person.name}</p>
            <p className="font-kufi text-xs mt-0.5 opacity-70" style={{ color }}>{person.relation}</p>
            {person.info && <p className="font-kufi text-xs mt-1 opacity-35 text-white">اضغط للتفاصيل</p>}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(3,8,19,0.88)', backdropFilter: 'blur(6px)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-sm w-full rounded-2xl p-6 text-right"
              style={{ background: '#0a0f1e', border: `1px solid ${color}35` }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 left-4 opacity-50 hover:opacity-100 transition-opacity" style={{ color }}>
                <X size={18} />
              </button>
              <div className="w-1.5 h-1.5 rounded-full mb-3" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
              <h3 className="font-noto font-bold text-white mb-1" style={{ fontSize: '1.2rem' }}>{person.name}</h3>
              <p className="font-kufi text-sm mb-4" style={{ color, opacity: 0.85 }}>{person.relation}</p>
              <div className="h-px opacity-20 mb-4" style={{ background: color }} />
              <p className="font-noto text-white/80 leading-loose" style={{ fontSize: '0.95rem', lineHeight: 2 }}>{person.info}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

/* ══════════════════════════════════════════════
   مكوّن عنوان القسم
══════════════════════════════════════════════ */
const SectionTitle: React.FC<{ icon: React.ReactNode; title: string; subtitle: string }> = ({ icon, title, subtitle }) => (
  <div className="text-center mb-10">
    <div className="flex items-center justify-center gap-3 mb-3">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-islamic-gold/30" />
      <div className="text-islamic-gold">{icon}</div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-islamic-gold/30" />
    </div>
    <h2 className="font-noto font-bold text-white mb-1" style={{ fontSize: 'clamp(1.5rem,3vw,2.2rem)' }}>{title}</h2>
    <p className="font-kufi text-white/50 text-sm tracking-widest">{subtitle}</p>
  </div>
);

/* ══════════════════════════════════════════════
   مكوّن النسب الأفقي
══════════════════════════════════════════════ */
const HorizontalLineage: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  /* ── في RTL: scrollLeft=0 يُظهر اليمين (عدنان)، scrollLeft=max يُظهر اليسار (محمد ﷺ) ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    /* تمرير لمحمد ﷺ (اليسار) عند التحميل */
    setTimeout(() => {
      el.scrollTo({ left: el.scrollWidth - el.clientWidth, behavior: 'smooth' });
    }, 900);
  }, []);

  const updateScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = el.scrollLeft; /* RTL normalized: 0=right(عدنان), max=left(محمد ﷺ) */
    setCanScrollLeft(pos < max - 10);   /* يمكن التمرير نحو محمد ﷺ */
    setCanScrollRight(pos > 10);        /* يمكن التمرير نحو عدنان */
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => el.removeEventListener('scroll', updateScroll);
  }, [updateScroll]);

  /* في RTL: left+300 = تمرير نحو محمد ﷺ (اليسار)، left-300 = نحو عدنان (اليمين) */
  const scroll = (dir: 'toward-prophet' | 'toward-adnan') => {
    scrollRef.current?.scrollBy({
      left: dir === 'toward-prophet' ? 300 : -300,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      {/* ── أزرار التمرير ── */}
      <AnimatePresence>
        {/* زر يسار → نحو محمد ﷺ */}
        {canScrollLeft && (
          <motion.button
            key="scroll-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scroll('toward-prophet')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(3,8,19,0.9)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="نحو محمد ﷺ"
          >
            <ChevronLeft size={18} />
          </motion.button>
        )}
        {/* زر يمين → نحو عدنان */}
        {canScrollRight && (
          <motion.button
            key="scroll-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scroll('toward-adnan')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(3,8,19,0.9)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="نحو عدنان"
          >
            <ChevronRightIcon size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── ظلال التلاشي ── */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #030813, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #030813, transparent)' }} />

      {/* ── المسار الأفقي — dir="rtl": عدنان على اليمين، محمد ﷺ على اليسار ── */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-4 px-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', direction: 'rtl' }}
      >
        <div
          className="flex items-center gap-0 py-8"
          style={{ width: 'max-content', direction: 'rtl' }}
        >
          {LINEAGE_ORDERED.map((item, i) => {
            const isLast = i === LINEAGE_ORDERED.length - 1; /* محمد ﷺ */
            const isActive = activeIdx === i;

            return (
              <React.Fragment key={item.name}>
                {/* ── العقدة ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (LINEAGE_ORDERED.length - 1 - i) * 0.03 }}
                  className="relative flex flex-col items-center gap-2 cursor-pointer group"
                  style={{ minWidth: isLast ? 100 : 80 }}
                  onClick={() => setActiveIdx(isActive ? null : i)}
                >
                  {/* رقم الجيل */}
                  <span
                    className="font-kufi opacity-30 group-hover:opacity-60 transition-opacity"
                    style={{ color: '#C9A84C', fontSize: '0.55rem' }}
                  >
                    {item.gen}
                  </span>

                  {/* الدائرة */}
                  <motion.div
                    className="relative flex items-center justify-center rounded-full font-noto font-bold text-center"
                    style={{
                      width:  isLast ? 84 : 62,
                      height: isLast ? 84 : 62,
                      background: isLast
                        ? 'linear-gradient(135deg, rgba(201,168,76,0.3), rgba(201,168,76,0.1))'
                        : isActive ? 'rgba(201,168,76,0.15)' : 'rgba(201,168,76,0.06)',
                      border: `${isLast ? 2 : 1}px solid ${
                        isLast ? 'rgba(201,168,76,0.7)' : isActive ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.2)'
                      }`,
                      color: isLast ? '#C9A84C' : 'rgba(255,255,255,0.72)',
                      fontSize: isLast ? '0.72rem' : '0.65rem',
                      boxShadow: isLast ? '0 0 30px rgba(201,168,76,0.25), 0 0 60px rgba(201,168,76,0.1)' : 'none',
                      lineHeight: 1.3,
                      padding: '4px',
                    }}
                    whileHover={{ scale: isLast ? 1.05 : 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    {isLast && (
                      <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-islamic-gold animate-pulse" />
                    )}
                  </motion.div>

                  {/* تلميح عند الضغط */}
                  <AnimatePresence>
                    {isActive && !isLast && (
                      <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-2 z-30 rounded-xl px-3 py-2 whitespace-nowrap"
                        style={{ background: 'rgba(5,11,26,0.97)', border: '1px solid rgba(201,168,76,0.25)', backdropFilter: 'blur(12px)' }}
                      >
                        <p className="font-noto text-white text-xs font-bold">{item.name}</p>
                        <p className="font-kufi mt-0.5" style={{ color: 'rgba(201,168,76,0.7)', fontSize: '0.58rem' }}>
                          الجيل {item.gen} من عدنان
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* ── السهم يشير لليسار ← (RTL: الأحدث على اليسار) ── */}
                {!isLast && (
                  <div className="flex items-center flex-shrink-0" style={{ width: 32, direction: 'ltr' }}>
                    <svg width="32" height="16" viewBox="0 0 32 16" fill="none" className="opacity-35">
                      {/* خط أفقي */}
                      <line x1="32" y1="8" x2="4" y2="8" stroke="#C9A84C" strokeWidth="1" />
                      {/* رأس السهم يشير لليسار ← */}
                      <polyline points="10,4 4,8 10,12" stroke="#C9A84C" strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── شريط التقدم ── */}
      <div className="mt-2 mx-10 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(201,168,76,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.6), rgba(201,168,76,0.2))' }}
          initial={{ width: '0%' }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
        />
      </div>

      {/* ── تلميح ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-center font-kufi text-white/20 text-xs mt-4 flex items-center justify-center gap-2"
        dir="rtl"
      >
        <ChevronRightIcon size={12} className="opacity-50" />
        اسحب يميناً لرؤية الأجداد
        <span className="opacity-30">•</span>
        اسحب يساراً نحو محمد ﷺ
        <ChevronLeft size={12} className="opacity-50" />
      </motion.p>
    </div>
  );
};

/* ══════════════════════════════════════════════
   الصفحة الرئيسية
══════════════════════════════════════════════ */
const FamilyTreePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" dir="rtl" style={{ background: '#030813' }}>

      {/* ── Hero ── */}
      <section
        className="relative min-h-[50vh] flex flex-col justify-end overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #030813 0%, #09061a 100%)' }}
      >
        {/* نجوم محسوبة مسبقاً */}
        <div className="absolute inset-0 pointer-events-none">
          {STARS.map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: s.left, top: s.top,
                width: s.size, height: s.size,
                '--dur': s.dur, '--delay': s.del,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.08) 0%, transparent 65%)' }}
        />

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-6 right-20 flex items-center gap-2 text-sm font-kufi max-w-[calc(100vw-6rem)]"
          style={{ color: '#C9A84C' }}
        >
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
            <Home size={14} />الرئيسية
          </button>
          <ChevronRight size={14} className="opacity-40" />
          <span className="opacity-90">شجرة النسب</span>
        </motion.nav>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-14 pt-28 text-center">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-kufi text-islamic-gold/70 tracking-widest text-sm mb-4">
            النسب الشريف
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-noto font-bold text-white leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', textShadow: '0 0 50px rgba(201,168,76,0.3)' }}>
            شجرة النسب
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="font-noto text-white/60 max-w-lg mx-auto"
            style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: 2 }}>
            من عدنان إلى محمد ﷺ — ٢٢ جيلاً من أشرف النسب
          </motion.p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 space-y-24">

        {/* ① النسب الأفقي */}
        <section>
          <SectionTitle
            icon={<Crown size={20} />}
            title="النسب الشريف"
            subtitle="من عدنان ← إلى محمد ﷺ — ٢٢ جيلاً"
          />

          {/* بطاقة توضيحية */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-6 mb-8 flex-wrap"
          >
            {[
              { label: 'عدنان', sub: 'الجد الأعلى', color: 'rgba(255,255,255,0.4)' },
              { label: '←', sub: '٢٢ جيلاً', color: '#C9A84C', arrow: true },
              { label: 'محمد ﷺ', sub: 'خاتم الأنبياء', color: '#C9A84C' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className={`font-noto font-bold ${item.arrow ? 'text-3xl' : 'text-lg'}`} style={{ color: item.color }}>
                  {item.label}
                </p>
                <p className="font-kufi text-white/25 text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </motion.div>

          <HorizontalLineage />

          {/* ملاحظة */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center font-kufi text-white/20 text-xs mt-6"
          >
            يصل نسبه ﷺ إلى إسماعيل بن إبراهيم عليهما السلام • • •
          </motion.p>
        </section>

        {/* ② الوالدان */}
        <section>
          <SectionTitle icon={<Heart size={20} />} title="الوالدان الكريمان" subtitle="أبوه وأمه ومن أرضعوه" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {PARENTS.map((p, i) => <PersonCard key={i} person={p} index={i} />)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GRANDFATHERS.map((p, i) => <PersonCard key={i} person={p} index={i} />)}
          </div>
        </section>

        {/* ③ الأعمام */}
        <section>
          <SectionTitle icon={<Users size={20} />} title="أعمامه ﷺ" subtitle="من أعمامه البارزون" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {UNCLES.map((p, i) => <PersonCard key={i} person={p} index={i} />)}
          </div>
        </section>

        {/* ④ أمهات المؤمنين */}
        <section>
          <SectionTitle icon={<Heart size={20} />} title="أمهات المؤمنين" subtitle="زوجاته الطاهرات رضي الله عنهن" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WIVES.map((p, i) => <PersonCard key={i} person={p} index={i} />)}
          </div>
        </section>

        {/* ⑤ الأبناء والبنات */}
        <section>
          <SectionTitle icon={<Baby size={20} />} title="أبناؤه وبناته" subtitle="ذريته الكريمة ﷺ" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHILDREN.map((p, i) => <PersonCard key={i} person={p} index={i} />)}
          </div>
        </section>

        {/* ⑥ الآية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center pt-4 pb-8"
        >
          <div className="flex items-center gap-4 mb-8 opacity-20">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
            <div className="w-2 h-2 rotate-45 bg-islamic-gold" />
            <div className="w-2 h-2 rotate-45 bg-islamic-gold opacity-50" />
            <div className="w-2 h-2 rotate-45 bg-islamic-gold" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
          </div>
          <p className="font-noto text-islamic-gold/75 mb-2" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', lineHeight: 2 }}>
            ﴿مُّحَمَّدٌ رَّسُولُ اللَّهِ ۚ وَالَّذِينَ مَعَهُ أَشِدَّاءُ عَلَى الْكُفَّارِ رُحَمَاءُ بَيْنَهُمْ﴾
          </p>
          <p className="font-kufi text-islamic-gold/45 text-sm tracking-widest">— سورة الفتح: ٢٩</p>
        </motion.div>
      </div>
    </div>
  );
};

export default FamilyTreePage;
