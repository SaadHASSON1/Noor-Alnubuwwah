import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Youtube, ExternalLink, BookMarked, Scroll, Library, Star, X } from 'lucide-react';
import IslamicParticles from '../components/IslamicParticles';
import ShareButton from '../components/ShareButton';

/* ══════════════════════════════════════════
   بيانات المصادر
══════════════════════════════════════════ */
interface Source {
  id: number;
  title: string;
  author: string;
  type: 'book' | 'hadith' | 'video' | 'tafsir';
  description: string;
  note?: string;
  link?: string;
  badge?: string;
}

const SOURCES: Source[] = [
  /* ── كتب السيرة ── */
  {
    id: 1,
    type: 'book',
    title: 'السيرة النبوية',
    author: 'ابن هشام (ت 218هـ)',
    description:
      'أشهر كتب السيرة النبوية وأوسعها، يُعدّ المرجع الأول لكل باحث في سيرة المصطفى ﷺ. اعتمد على رواية ابن إسحاق وهذّبها.',
    badge: 'المرجع الأول',
  },
  {
    id: 2,
    type: 'book',
    title: 'الرحيق المختوم',
    author: 'الشيخ صفي الرحمن المباركفوري (ت 1427هـ)',
    description:
      'حاز جائزة رابطة العالم الإسلامي الأولى. سيرة شاملة ومتكاملة بأسلوب علمي سلس، يجمع بين التحقيق والتوثيق.',
    badge: 'جائزة رابطة العالم الإسلامي',
  },
  {
    id: 3,
    type: 'book',
    title: 'البداية والنهاية — السيرة',
    author: 'الحافظ ابن كثير (ت 774هـ)',
    description:
      'موسوعة تاريخية إسلامية تضمّ السيرة النبوية بتفاصيلها الدقيقة مع تخريج الأحاديث والروايات.',
  },
  {
    id: 4,
    type: 'book',
    title: 'فقه السيرة النبوية',
    author: 'الشيخ محمد الغزالي (ت 1416هـ)',
    description:
      'يستخرج من السيرة دروساً وفقهاً حيّاً للأمة الإسلامية المعاصرة، بأسلوب خطابي قوي.',
  },
  {
    id: 5,
    type: 'book',
    title: 'فقه السيرة',
    author: 'الشيخ محمد سعيد رمضان البوطي (ت 1434هـ)',
    description:
      'دراسة منهجية معمّقة لسيرة النبي ﷺ تجمع بين التحليل الفقهي والاستنباط العملي.',
  },
  {
    id: 6,
    type: 'book',
    title: 'نور اليقين في سيرة سيد المرسلين',
    author: 'الشيخ محمد الخضري بك (ت 1345هـ)',
    description:
      'كتاب مختصر وجامع، اشتُهر في المدارس الدينية، وصيغ بأسلوب واضح مرتّب على الأحداث.',
  },
  {
    id: 7,
    type: 'book',
    title: 'زاد المعاد في هدي خير العباد',
    author: 'الإمام ابن قيّم الجوزية (ت 751هـ)',
    description:
      'يتناول هدي النبي ﷺ في عباداته وحياته اليومية وغزواته، ويستنبط الأحكام الفقهية منها.',
    badge: 'الهدي النبوي',
  },
  {
    id: 8,
    type: 'book',
    title: 'الشمائل المحمدية',
    author: 'الإمام الترمذي (ت 279هـ)',
    description:
      'أبرز كتاب في وصف شمائل النبي ﷺ وخُلُقه وصفاته الجسدية والخُلُقية، بأسانيد محتجّ بها.',
  },
  {
    id: 9,
    type: 'book',
    title: 'دلائل النبوة',
    author: 'الإمام البيهقي (ت 458هـ)',
    description:
      'يُعنى بجمع المعجزات والدلائل الكاشفة عن نبوة محمد ﷺ، مع التخريج والتوثيق العلمي.',
    badge: 'المعجزات والنبوة',
  },
  /* ── كتب الحديث ── */
  {
    id: 10,
    type: 'hadith',
    title: 'صحيح البخاري',
    author: 'الإمام البخاري (ت 256هـ)',
    description:
      'أصحّ كتاب بعد القرآن الكريم. يضمّ أحاديث السيرة والمغازي والشمائل في أبواب مخصّصة.',
  },
  {
    id: 11,
    type: 'hadith',
    title: 'صحيح مسلم',
    author: 'الإمام مسلم (ت 261هـ)',
    description:
      'ثاني أصحّ كتب الحديث. يحتوي على أحاديث السيرة والفضائل النبوية مع منهجية عالية.',
  },
  {
    id: 12,
    type: 'hadith',
    title: 'سنن أبي داود',
    author: 'الإمام أبو داود (ت 275هـ)',
    description:
      'من كتب السنن الكبرى التي تضمّ أحاديث في الفقه والسيرة والغزوات.',
  },
  {
    id: 13,
    type: 'hadith',
    title: 'مسند الإمام أحمد',
    author: 'الإمام أحمد بن حنبل (ت 241هـ)',
    description:
      'من أكبر كتب الحديث حجماً، يضمّ أربعين ألف حديث تقريباً ويُعدّ مرجعاً للأحاديث النبوية.',
  },
  /* ── التفسير ── */
  {
    id: 14,
    type: 'tafsir',
    title: 'تفسير ابن كثير',
    author: 'الحافظ ابن كثير (ت 774هـ)',
    description:
      'أشهر كتب التفسير، يستشهد بأحاديث السيرة لتفسير الآيات المتعلقة بغزوات النبي ﷺ وأحداث حياته.',
  },
  {
    id: 15,
    type: 'tafsir',
    title: 'في ظلال القرآن',
    author: 'الشيخ سيد قطب (ت 1966م)',
    description:
      'تفسير أدبي حركي يربط معاني الآيات بأحداث السيرة والواقع الإسلامي المعاصر.',
  },
  /* ── المصادر المرئية ── */
  {
    id: 16,
    type: 'video',
    title: 'سلسلة السيرة النبوية الكاملة',
    author: 'الشيخ أحمد السيد',
    description:
      'سلسلة متكاملة تتناول السيرة النبوية الشريفة بأسلوب علمي منهجي محبّب، تضمّ دروساً مفصّلة عن حياة النبي ﷺ من المولد حتى الوفاة مع التحليل والاستنباط.',
    badge: 'قائمة التشغيل',
    note: 'قائمة التشغيل على يوتيوب',
    link: 'https://www.youtube.com/playlist?list=PLZmiPrHYOIsQKAjv6rhq5clGlihS1Xlgu',
  },
];

/* ══════════════════════════════════════════
   إعدادات الفئات
══════════════════════════════════════════ */
const CATEGORIES = [
  { key: 'all',    label: 'الكل',          icon: <Library size={14} /> },
  { key: 'book',   label: 'كتب السيرة',    icon: <BookOpen size={14} /> },
  { key: 'hadith', label: 'كتب الحديث',    icon: <Scroll size={14} /> },
  { key: 'tafsir', label: 'التفسير',        icon: <BookMarked size={14} /> },
  { key: 'video',  label: 'مصادر مرئية',   icon: <Youtube size={14} /> },
];

const TYPE_COLORS: Record<string, string> = {
  book:   '#C9A84C',
  hadith: '#60A5FA',
  tafsir: '#A78BFA',
  video:  '#F87171',
};

const TYPE_LABELS: Record<string, string> = {
  book:   'كتاب سيرة',
  hadith: 'كتاب حديث',
  tafsir: 'تفسير',
  video:  'مصدر مرئي',
};

/* ══════════════════════════════════════════
   مكوّن المودال
══════════════════════════════════════════ */
const SourceModal: React.FC<{ source: Source; onClose: () => void }> = ({ source, onClose }) => {
  const color = TYPE_COLORS[source.type];
  return (
    <motion.div
      key="source-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(3,8,19,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl"
        style={{
          background: 'rgba(8,14,30,0.98)',
          border: `1px solid ${color}35`,
          boxShadow: `0 0 60px rgba(0,0,0,0.6), 0 0 40px ${color}12`,
        }}
        onClick={e => e.stopPropagation()}
        dir="rtl"
      >
        {/* شريط لوني علوي */}
        <div
          className="h-1 rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />

        <div className="p-6">
          {/* زر إغلاق */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: `${color}15`, color }}
          >
            <X size={16} />
          </button>

          {/* رأس */}
          <div className="flex items-start gap-4 mb-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
            >
              {source.type === 'book'   && <BookOpen size={20} />}
              {source.type === 'hadith' && <Scroll size={20} />}
              {source.type === 'tafsir' && <BookMarked size={20} />}
              {source.type === 'video'  && <Youtube size={20} />}
            </div>
            <div className="flex-1">
              <h2 className="font-noto font-bold text-white text-xl leading-snug mb-1">{source.title}</h2>
              <p className="font-kufi text-sm" style={{ color: `${color}` }}>{source.author}</p>
            </div>
          </div>

          {/* الشارات */}
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <span
              className="font-kufi text-xs px-3 py-1 rounded-full"
              style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
            >
              {TYPE_LABELS[source.type]}
            </span>
            {source.badge && (
              <span
                className="font-kufi text-xs px-3 py-1 rounded-full flex items-center gap-1"
                style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}
              >
                <Star size={10} />
                {source.badge}
              </span>
            )}
          </div>

          {/* فاصل */}
          <div className="h-px mb-5" style={{ background: `${color}20` }} />

          {/* الوصف */}
          <p
            className="font-noto leading-loose text-white"
            style={{ fontSize: '0.95rem', lineHeight: 2 }}
          >
            {source.description}
          </p>

          {/* رابط */}
          {source.link && (
            <a
              href={source.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-kufi text-sm px-4 py-2.5 rounded-xl mt-5 transition-colors"
              style={{ color, background: `${color}12`, border: `1px solid ${color}30` }}
              onClick={e => e.stopPropagation()}
            >
              {source.type === 'video' ? <Youtube size={15} /> : <ExternalLink size={15} />}
              {source.note ?? 'زيارة المصدر'}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════
   مكوّن البطاقة
══════════════════════════════════════════ */
const SourceCard: React.FC<{ source: Source; index: number }> = ({ source, index }) => {
  const [open, setOpen] = useState(false);
  const color = TYPE_COLORS[source.type];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 0.5, delay: (index % 6) * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative rounded-2xl p-5 flex flex-col gap-3 group cursor-pointer"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${color}20`,
        }}
        whileHover={{ background: `rgba(255,255,255,0.055)`, scale: 1.015, y: -3 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(true)}
      >
        {/* شريط اللون العلوي */}
        <div
          className="absolute top-0 right-0 left-0 h-0.5 rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
        />

        {/* رأس البطاقة */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-noto font-bold text-white" style={{ fontSize: '1rem', lineHeight: 1.5 }}>
              {source.title}
            </h3>
            <p className="font-kufi text-sm mt-0.5 font-medium" style={{ color: `${color}` }}>
              {source.author}
            </p>
          </div>

          {/* أيقونة النوع */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${color}15`, border: `1px solid ${color}25`, color }}
          >
            {source.type === 'book'   && <BookOpen size={16} />}
            {source.type === 'hadith' && <Scroll size={16} />}
            {source.type === 'tafsir' && <BookMarked size={16} />}
            {source.type === 'video'  && <Youtube size={16} />}
          </div>
        </div>

        {/* شارات */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-kufi text-xs px-2.5 py-0.5 rounded-full"
            style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
          >
            {TYPE_LABELS[source.type]}
          </span>
          {source.badge && (
            <span className="font-kufi text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1"
              style={{ background: 'rgba(201,168,76,0.1)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.22)' }}
            >
              <Star size={10} />
              {source.badge}
            </span>
          )}
        </div>

        {/* الوصف */}
        <p className="font-noto text-white leading-relaxed" style={{ fontSize: '0.85rem', opacity: 0.82 }}>
          {source.description}
        </p>

        {/* تلميح الضغط */}
        <p className="font-kufi text-xs mt-auto" style={{ color: `${color}` }}>
          اضغط لعرض التفاصيل ›
        </p>
      </motion.div>

      <AnimatePresence>
        {open && <SourceModal source={source} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

/* ══════════════════════════════════════════
   الصفحة الرئيسية
══════════════════════════════════════════ */
const SourcesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? SOURCES
    : SOURCES.filter(s => s.type === activeCategory);

  return (
    <div className="min-h-screen relative" dir="rtl" style={{ background: '#030813' }}>
      {/* زر المشاركة */}
      <div className="fixed top-[72px] left-4 z-[60]">
        <ShareButton title="المصادر والمراجع" accentColor="#C9A84C" />
      </div>
      <IslamicParticles />

      {/* نجوم الخلفية */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {Array.from({ length: 55 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${((i * 137.508) % 100).toFixed(2)}%`,
              top:  `${((i * 97.315) % 100).toFixed(2)}%`,
              width:  0.3 + (i % 4) * 0.35,
              height: 0.3 + (i % 4) * 0.35,
              '--dur':   `${2 + (i % 5) * 0.7}s`,
              '--delay': `${(i % 7) * 0.4}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 text-center px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.08) 0%, transparent 65%)' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)' }}
          >
            <Library size={28} style={{ color: '#C9A84C' }} />
          </div>

          <h1
            className="font-noto font-bold mb-4"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              color: '#C9A84C',
              textShadow: '0 0 40px rgba(201,168,76,0.3)',
            }}
          >
            المصادر والمراجع
          </h1>

          <p className="font-noto text-white max-w-xl mx-auto leading-relaxed" style={{ fontSize: '1rem', opacity: 0.82 }}>
            المصادر العلمية المعتمدة في بناء محتوى موقع نور النبوة، من كتب السيرة والحديث والتفسير،
            إضافةً إلى المصادر المرئية المتخصّصة.
          </p>

          {/* إحصاء */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {[
              { label: 'كتاب سيرة', count: SOURCES.filter(s => s.type === 'book').length,   color: '#C9A84C' },
              { label: 'كتاب حديث', count: SOURCES.filter(s => s.type === 'hadith').length, color: '#60A5FA' },
              { label: 'تفسير',     count: SOURCES.filter(s => s.type === 'tafsir').length, color: '#A78BFA' },
              { label: 'مرئي',      count: SOURCES.filter(s => s.type === 'video').length,  color: '#F87171' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-noto font-bold text-2xl" style={{ color: stat.color }}>
                  {stat.count}
                </div>
                <div className="font-kufi text-white text-xs mt-0.5" style={{ opacity: 0.7 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── آية ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center py-8 px-6"
        style={{ borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}
      >
        <p className="font-noto text-white text-sm leading-loose" style={{ opacity: 0.95 }}>
          ﴿ لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ ﴾
        </p>
        <p className="font-kufi text-white text-xs mt-1" style={{ opacity: 0.85 }}>سورة الأحزاب — الآية 21</p>
      </motion.div>

      {/* ── فلاتر الفئات ── */}
      <div className="sticky top-0 z-20 py-4 px-6" style={{ backdropFilter: 'blur(16px)', background: 'rgba(3,8,19,0.85)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar justify-center flex-wrap">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.key;
              const color = cat.key === 'all' ? '#C9A84C' : TYPE_COLORS[cat.key] ?? '#C9A84C';
              return (
                <motion.button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-kufi text-xs whitespace-nowrap transition-colors flex-shrink-0"
                  style={{
                    background: isActive ? `${color}18` : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${isActive ? color + '40' : 'rgba(255,255,255,0.12)'}`,
                    color: isActive ? color : '#b8babd',
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {cat.icon}
                  {cat.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── شبكة البطاقات ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-10 pb-24">
        {/* بطاقة الشيخ المميّزة */}
        {(activeCategory === 'all' || activeCategory === 'video') && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.25)', color: '#F87171' }}
              >
                <Youtube size={16} />
              </div>
              <h2 className="font-noto font-bold text-white" style={{ fontSize: '1.1rem' }}>
                قائمة تشغيل الشيخ أحمد السيد
              </h2>
              <div className="flex-1 h-px bg-white opacity-10" />
            </div>

            {/* البطاقة المميّزة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl p-6 mb-4 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(248,113,113,0.08) 0%, rgba(3,8,19,0.9) 60%)',
                border: '1px solid rgba(248,113,113,0.22)',
              }}
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(248,113,113,0.07) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
              />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.25)', color: '#F87171' }}
                >
                  <Youtube size={28} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-noto font-bold text-white text-lg">
                      سلسلة السيرة النبوية الكاملة
                    </h3>
                    <span
                      className="font-kufi text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1"
                      style={{ background: 'rgba(248,113,113,0.12)', color: '#F87171', border: '1px solid rgba(248,113,113,0.22)' }}
                    >
                      <Star size={10} />
                      قائمة التشغيل
                    </span>
                  </div>
                  <p className="font-kufi text-sm font-medium" style={{ color: '#F87171' }}>
                    الشيخ أحمد السيد — قائمة يوتيوب
                  </p>
                  <p className="font-noto text-white text-sm mt-2 leading-relaxed" style={{ opacity: 0.82 }}>
                    سلسلة علمية متكاملة تتناول السيرة النبوية الشريفة بعمق ومنهجية، تغطّي حياة النبي ﷺ
                    من المولد الشريف حتى الوفاة مع دروس الاستنباط والتحليل.
                  </p>
                </div>

                <a
                  href="https://www.youtube.com/playlist?list=PLZmiPrHYOIsQKAjv6rhq5clGlihS1Xlgu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-kufi text-sm whitespace-nowrap transition-all self-start md:self-auto"
                  style={{
                    background: 'rgba(248,113,113,0.14)',
                    border: '1px solid rgba(248,113,113,0.32)',
                    color: '#F87171',
                  }}
                >
                  <Youtube size={15} />
                  فتح قائمة التشغيل
                </a>
              </div>
            </motion.div>
          </div>
        )}

        {/* باقي الفئات */}
        {['book', 'hadith', 'tafsir'].map(type => {
          const items = filtered.filter(s => s.type === type);
          if (!items.length) return null;
          const color = TYPE_COLORS[type];
          const label = type === 'book' ? 'كتب السيرة النبوية'
            : type === 'hadith' ? 'كتب الحديث النبوي الشريف'
            : 'كتب التفسير';
          const Icon = type === 'book' ? BookOpen : type === 'hadith' ? Scroll : BookMarked;

          return (
            <div key={type} className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${color}12`, border: `1px solid ${color}25`, color }}
                >
                  <Icon size={16} />
                </div>
                <h2 className="font-noto font-bold text-white" style={{ fontSize: '1.1rem' }}>
                  {label}
                </h2>
                <div className="flex-1 h-px bg-white opacity-10" />
                <span className="font-kufi text-xs text-white opacity-50">{items.length} مصدر</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((source, i) => (
                  <SourceCard key={source.id} source={source} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* تذييل */}
      <div
        className="text-center py-8 px-6"
        style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}
      >
        <p className="font-noto text-white text-xs leading-loose" style={{ opacity: 0.88 }}>
          جميع المصادر من تراث العلماء الأجلاء — رحمهم الله وجزاهم خير الجزاء
        </p>
        <p className="font-kufi text-white text-xs mt-1" style={{ opacity: 0.75 }}>نور النبوة — ﷺ</p>
      </div>
    </div>
  );
};

export default SourcesPage;
