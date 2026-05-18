import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, X, Users, Heart, Baby, Crown } from 'lucide-react';

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
   DATA
══════════════════════════════════════════════ */

const LINEAGE: string[] = [
  'محمد ﷺ',
  'عبد الله',
  'عبد المطلب',
  'هاشم',
  'عبد مناف',
  'قُصَي',
  'كِلاب',
  'مُرَّة',
  'كعب',
  'لُؤَي',
  'غالب',
  'فِهر — قريش',
  'مالك',
  'النضر',
  'كنانة',
  'خزيمة',
  'مُدرِكة',
  'إلياس',
  'مُضَر',
  'نِزار',
  'مَعَد',
  'عدنان',
];

const PARENTS: Person[] = [
  {
    name: 'عبد الله بن عبد المطلب',
    relation: 'الأب',
    info: 'توفي قبل ولادة النبي ﷺ في رحلة تجارية إلى المدينة وعمره خمس وعشرون سنة',
    color: '#A8C8E8',
  },
  {
    name: 'آمنة بنت وهب',
    relation: 'الأم',
    info: 'من بني زهرة من قريش، توفيت في الأبواء وعمر النبي ﷺ ست سنوات',
    color: '#E8A8C8',
  },
];

const GRANDFATHERS: Person[] = [
  {
    name: 'عبد المطلب بن هاشم',
    relation: 'الجد من أب',
    info: 'كافل النبي ﷺ بعد وفاة أمه، وكان سيد قريش وحافر بئر زمزم',
    color: '#C9A84C',
  },
  {
    name: 'وهب بن عبد مناف',
    relation: 'الجد من أم',
    info: 'سيد بني زهرة في عصره',
    color: '#C9A84C',
  },
  {
    name: 'حليمة بنت أبي ذؤيب السعدية',
    relation: 'المرضعة في البادية',
    info: 'من بني سعد بن بكر من هوازن، أرضعته في البادية سنواتٍ وأصابتهم بركته',
    color: '#A8E8C8',
  },
  {
    name: 'ثويبة الأسلمية',
    relation: 'أول من أرضعته',
    info: 'جارية أبي لهب، أرضعته أياماً قبل حليمة وأرضعت قبله حمزة بن عبد المطلب',
    color: '#A8E8C8',
  },
];

const UNCLES: Person[] = [
  { name: 'حمزة بن عبد المطلب', relation: 'العم', info: 'أسد الله وأسد رسوله — سيد الشهداء في أحد', color: '#E8C8A8' },
  { name: 'العباس بن عبد المطلب', relation: 'العم', info: 'جدّ الخلفاء العباسيين — أسلم قبيل فتح مكة', color: '#E8C8A8' },
  { name: 'أبو طالب بن عبد المطلب', relation: 'العم الحامي', info: 'كافله بعد جده ودافع عنه طوال حياته ولم يُسلم', color: '#C8A8E8' },
  { name: 'أبو لهب عبد العزى', relation: 'العم العدو', info: 'أشد أعداء النبي ﷺ من أهله، نزلت فيه سورة المسد', color: '#E8A8A8' },
];

const WIVES: Person[] = [
  { name: 'خديجة بنت خويلد', relation: 'الزوجة الأولى', info: 'أول المؤمنين، عاشا معاً ٢٥ عاماً، أم أكثر أولاده', color: '#FFD700' },
  { name: 'سودة بنت زمعة', relation: 'الزوجة الثانية', info: 'تزوجها بعد وفاة خديجة في مكة', color: '#C9A84C' },
  { name: 'عائشة بنت أبي بكر', relation: 'أم المؤمنين', info: 'حبيبته وأعلم نساء الأمة، روت آلاف الأحاديث', color: '#FFD700' },
  { name: 'حفصة بنت عمر', relation: 'أم المؤمنين', info: 'بنت عمر بن الخطاب، حافظة القرآن', color: '#C9A84C' },
  { name: 'زينب بنت خزيمة', relation: 'أم المؤمنين', info: 'لُقّبت أم المساكين لكثرة إطعامها الفقراء', color: '#C9A84C' },
  { name: 'أم سلمة هند بنت أبي أمية', relation: 'أم المؤمنين', info: 'من أكثر أمهات المؤمنين علماً وفقهاً', color: '#C9A84C' },
  { name: 'زينب بنت جحش', relation: 'أم المؤمنين', info: 'تزوجها بأمر الله في سورة الأحزاب', color: '#C9A84C' },
  { name: 'جويرية بنت الحارث', relation: 'أم المؤمنين', info: 'بنت زعيم بني المصطلق، تزوّجها فأعتق المسلمون أسراهم', color: '#C9A84C' },
  { name: 'أم حبيبة رملة بنت أبي سفيان', relation: 'أم المؤمنين', info: 'هاجرت إلى الحبشة وتزوجها النبي ﷺ وهي هناك', color: '#C9A84C' },
  { name: 'صفية بنت حيي', relation: 'أم المؤمنين', info: 'من بني النضير، أسلمت بعد خيبر وتزوّجها النبي ﷺ', color: '#C9A84C' },
  { name: 'ميمونة بنت الحارث', relation: 'أم المؤمنين', info: 'آخر من تزوجها النبي ﷺ في عمرة القضاء', color: '#C9A84C' },
  { name: 'مارية القبطية', relation: 'أم إبراهيم', info: 'أهداها المقوقس، أم ولده إبراهيم الذي مات طفلاً', color: '#A8C8E8' },
];

const CHILDREN: Person[] = [
  { name: 'القاسم', relation: 'الابن البكر', info: 'من خديجة، مات طفلاً وبه كُني أبا القاسم', color: '#A8E8C8' },
  { name: 'عبد الله (الطاهر الطيب)', relation: 'الابن', info: 'من خديجة، مات طفلاً، وله لقبان الطاهر والطيب', color: '#A8E8C8' },
  { name: 'إبراهيم', relation: 'الابن', info: 'من مارية القبطية، مات رضيعاً فبكى عليه النبي ﷺ', color: '#A8E8C8' },
  { name: 'زينب بنت محمد', relation: 'البنت الكبرى', info: 'تزوجت أبا العاص بن الربيع وهاجرت إلى المدينة', color: '#E8A8C8' },
  { name: 'رقية بنت محمد', relation: 'البنت', info: 'تزوجت عثمان بن عفان، ماتت يوم بدر', color: '#E8A8C8' },
  { name: 'أم كلثوم بنت محمد', relation: 'البنت', info: 'تزوجت عثمان بن عفان بعد وفاة رقية فسُمّي ذا النورين', color: '#E8A8C8' },
  { name: 'فاطمة الزهراء', relation: 'البنت الصغرى', info: 'سيدة نساء العالمين، زوجة علي، أم الحسن والحسين، ماتت بعده بأشهر', color: '#FFD700' },
];

/* ══════════════════════════════════════════════
   SUB-COMPONENTS
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

const PersonCard: React.FC<{ person: Person; index: number }> = ({ person, index }) => {
  const [open, setOpen] = useState(false);
  const color = person.color ?? '#C9A84C';
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-5%' }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        onClick={() => person.info && setOpen(true)}
        className={`relative rounded-xl p-4 ${person.info ? 'cursor-pointer' : ''}`}
        style={{
          background: `${color}0d`,
          border: `1px solid ${color}25`,
        }}
        whileHover={person.info ? { scale: 1.02, y: -2 } : {}}
        whileTap={person.info ? { scale: 0.98 } : {}}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-2 h-2 rounded-full mt-2 shrink-0"
            style={{ background: color, boxShadow: `0 0 6px ${color}60` }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-noto font-bold text-white leading-snug" style={{ fontSize: 'clamp(0.95rem,1.8vw,1.1rem)' }}>
              {person.name}
            </p>
            <p className="font-kufi text-xs mt-0.5 opacity-70" style={{ color }}>{person.relation}</p>
            {person.info && (
              <p className="font-kufi text-xs mt-1 opacity-40 text-white">اضغط للتفاصيل</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Detail overlay */}
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
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 left-4 opacity-50 hover:opacity-100 transition-opacity"
                style={{ color }}
              >
                <X size={18} />
              </button>
              <div
                className="w-1.5 h-1.5 rounded-full mb-3"
                style={{ background: color, boxShadow: `0 0 8px ${color}` }}
              />
              <h3 className="font-noto font-bold text-white mb-1" style={{ fontSize: '1.2rem' }}>{person.name}</h3>
              <p className="font-kufi text-sm mb-4" style={{ color, opacity: 0.85 }}>{person.relation}</p>
              <div className="h-px opacity-20 mb-4" style={{ background: color }} />
              <p className="font-noto text-white/80 leading-loose" style={{ fontSize: '0.95rem', lineHeight: 2 }}>
                {person.info}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ══════════════════════════════════════════════
   MAIN PAGE
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
        {/* Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 60 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${((i * 137.5) % 100).toFixed(1)}%`,
                top: `${((i * 97.3) % 100).toFixed(1)}%`,
                width: `${0.5 + (i % 4) * 0.3}px`,
                height: `${0.5 + (i % 4) * 0.3}px`,
                '--dur': `${2 + (i % 4) * 0.8}s`,
                '--delay': `${(i % 6) * 0.5}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.08) 0%, transparent 65%)' }}
        />

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-6 right-6 flex items-center gap-2 text-sm font-kufi"
          style={{ color: '#C9A84C' }}
        >
          <button onClick={() => navigate('/')} className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
            <Home size={14} />
            الرئيسية
          </button>
          <ChevronRight size={14} className="opacity-40" />
          <span className="opacity-90">شجرة النسب</span>
        </motion.nav>

        {/* Hero text */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-14 pt-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-kufi text-islamic-gold/70 tracking-widest text-sm mb-4"
          >
            النسب الشريف
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-noto font-bold text-white leading-none mb-4"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', textShadow: '0 0 50px rgba(201,168,76,0.3)' }}
          >
            شجرة النسب
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-noto text-white/60 max-w-lg mx-auto"
            style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: 2 }}
          >
            نسب النبي محمد ﷺ وأسرته الكريمة — الآباء والأمهات والأزواج والأبناء
          </motion.p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 space-y-24">

        {/* ① النسب الشريف — الخط العمودي */}
        <section>
          <SectionTitle
            icon={<Crown size={20} />}
            title="النسب الشريف"
            subtitle="من محمد ﷺ إلى عدنان"
          />
          <div className="relative flex flex-col items-center gap-0">
            {LINEAGE.map((name, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-4%' }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="relative flex flex-col items-center"
              >
                {/* Node */}
                <div
                  className="relative z-10 px-6 py-2.5 rounded-full font-noto font-bold text-center"
                  style={{
                    background: i === 0
                      ? 'linear-gradient(135deg, rgba(201,168,76,0.25), rgba(201,168,76,0.12))'
                      : 'rgba(201,168,76,0.06)',
                    border: `1px solid ${i === 0 ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.2)'}`,
                    color: i === 0 ? '#C9A84C' : 'rgba(255,255,255,0.75)',
                    fontSize: i === 0 ? 'clamp(1rem, 2vw, 1.2rem)' : 'clamp(0.85rem, 1.6vw, 0.95rem)',
                    minWidth: 180,
                    boxShadow: i === 0 ? '0 0 20px rgba(201,168,76,0.15)' : 'none',
                  }}
                >
                  {name}
                  {i === 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-islamic-gold animate-pulse" />
                  )}
                </div>

                {/* Connector line (not after last) */}
                {i < LINEAGE.length - 1 && (
                  <div
                    className="w-px"
                    style={{
                      height: 28,
                      background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), rgba(201,168,76,0.15))',
                    }}
                  />
                )}
              </motion.div>
            ))}
            {/* Trailing dots */}
            <div className="flex flex-col items-center gap-1.5 mt-2 opacity-30">
              {[0,1,2].map(i => (
                <div key={i} className="w-1 h-1 rounded-full bg-islamic-gold" style={{ opacity: 1 - i * 0.3 }} />
              ))}
            </div>
            <p className="font-kufi text-islamic-gold/40 text-xs mt-2 tracking-widest">يصل نسبه إلى إسماعيل وإبراهيم عليهما السلام</p>
          </div>
        </section>

        {/* ② الوالدان */}
        <section>
          <SectionTitle
            icon={<Heart size={20} />}
            title="الوالدان الكريمان"
            subtitle="أبوه وأمه ومن أرضعوه"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {PARENTS.map((p, i) => <PersonCard key={i} person={p} index={i} />)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GRANDFATHERS.map((p, i) => <PersonCard key={i} person={p} index={i} />)}
          </div>
        </section>

        {/* ③ الأعمام */}
        <section>
          <SectionTitle
            icon={<Users size={20} />}
            title="أعمامه ﷺ"
            subtitle="من أعمامه البارزون"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {UNCLES.map((p, i) => <PersonCard key={i} person={p} index={i} />)}
          </div>
        </section>

        {/* ④ زوجاته */}
        <section>
          <SectionTitle
            icon={<Heart size={20} />}
            title="أمهات المؤمنين"
            subtitle="زوجاته الطاهرات رضي الله عنهن"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WIVES.map((p, i) => <PersonCard key={i} person={p} index={i} />)}
          </div>
        </section>

        {/* ⑤ أبناؤه وبناته */}
        <section>
          <SectionTitle
            icon={<Baby size={20} />}
            title="أبناؤه وبناته"
            subtitle="ذريته الكريمة ﷺ"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHILDREN.map((p, i) => <PersonCard key={i} person={p} index={i} />)}
          </div>
        </section>

        {/* ⑥ Bottom verse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
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
