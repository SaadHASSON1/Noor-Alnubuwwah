import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Youtube, ExternalLink, BookMarked, Scroll, Library, Star } from 'lucide-react';
import IslamicParticles from '../components/IslamicParticles';

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
    note: 'قناة الشيخ أحمد السيد على يوتيوب',
    link: 'https://www.youtube.com/@Ahmed_Alsayed',
  },
  {
    id: 17,
    type: 'video',
    title: 'الطريق إلى الله — دروس في السيرة',
    author: 'الشيخ أحمد السيد',
    description:
      'دروس تفصيلية تتناول جوانب النبوة والمعجزات والشمائل النبوية بمنهج علمي دقيق يجمع بين الرواية والدراية.',
    note: 'متاح على قناة الشيخ على يوتيوب',
    link: 'https://www.youtube.com/@Ahmed_Alsayed',
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
   مكوّن البطاقة
══════════════════════════════════════════ */
const SourceCard: React.FC<{ source: Source; index: number }> = ({ source, index }) => {
  const color = TYPE_COLORS[source.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-2xl p-5 flex flex-col gap-3 group"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${color}18`,
        transition: 'border-color 0.3s, background 0.3s',
      }}
      whileHover={{ background: `rgba(255,255,255,0.04)`, borderColor: `${color}35` }}
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
          <p className="font-kufi text-xs mt-0.5" style={{ color: `${color}aa` }}>
            {source.author}
          </p>
        </div>

        {/* أيقونة النوع */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}12`, border: `1px solid ${color}20`, color }}
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
          style={{ background: `${color}12`, color, border: `1px solid ${color}20` }}
        >
          {TYPE_LABELS[source.type]}
        </span>
        {source.badge && (
          <span className="font-kufi text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1"
            style={{ background: 'rgba(201,168,76,0.08)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.2)' }}
          >
            <Star size={10} />
            {source.badge}
          </span>
        )}
      </div>

      {/* الوصف */}
      <p className="font-noto text-white/55 leading-relaxed" style={{ fontSize: '0.82rem' }}>
        {source.description}
      </p>

      {/* رابط */}
      {source.link && (
        <a
          href={source.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-kufi text-xs w-fit px-3 py-1.5 rounded-full mt-1 transition-colors"
          style={{ color, background: `${color}10`, border: `1px solid ${color}25` }}
          onClick={e => e.stopPropagation()}
        >
          {source.type === 'video' ? <Youtube size={13} /> : <ExternalLink size={13} />}
          {source.note ?? 'زيارة المصدر'}
        </a>
      )}
    </motion.div>
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
      <IslamicParticles />

      {/* نجوم الخلفية */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
        {Array.from({ length: 55 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 1.4 + 0.3,
              height: Math.random() * 1.4 + 0.3,
              '--dur': `${(Math.random() * 3 + 2).toFixed(1)}s`,
              '--delay': `${(Math.random() * 5).toFixed(1)}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 text-center px-6 overflow-hidden">
        {/* توهّج خلفي */}
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

          <p className="font-noto text-white/50 max-w-xl mx-auto leading-relaxed" style={{ fontSize: '1rem' }}>
            المصادر العلمية المعتمدة في بناء محتوى موقع نور النبوة، من كتب السيرة والحديث والتفسير،
            إضافةً إلى المصادر المرئية المتخصّصة.
          </p>

          {/* إحصاء */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {[
              { label: 'كتاب سيرة', count: SOURCES.filter(s => s.type === 'book').length, color: '#C9A84C' },
              { label: 'كتاب حديث', count: SOURCES.filter(s => s.type === 'hadith').length, color: '#60A5FA' },
              { label: 'تفسير',     count: SOURCES.filter(s => s.type === 'tafsir').length, color: '#A78BFA' },
              { label: 'مرئي',      count: SOURCES.filter(s => s.type === 'video').length,  color: '#F87171' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-noto font-bold text-2xl" style={{ color: stat.color }}>
                  {stat.count}
                </div>
                <div className="font-kufi text-white/30 text-xs mt-0.5">{stat.label}</div>
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
        <p className="font-noto text-white/30 text-sm leading-loose">
          ﴿ لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ ﴾
        </p>
        <p className="font-kufi text-white/20 text-xs mt-1">سورة الأحزاب — الآية 21</p>
      </motion.div>

      {/* ── فلاتر الفئات ── */}
      <div className="sticky top-0 z-20 py-4 px-6" style={{ backdropFilter: 'blur(16px)', background: 'rgba(3,8,19,0.85)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar justify-center flex-wrap">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.key;
              const color = cat.key === 'all' ? '#C9A84C'
                : TYPE_COLORS[cat.key] ?? '#C9A84C';
              return (
                <motion.button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-kufi text-xs whitespace-nowrap transition-colors flex-shrink-0"
                  style={{
                    background: isActive ? `${color}18` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isActive ? color + '40' : 'rgba(255,255,255,0.08)'}`,
                    color: isActive ? color : 'rgba(255,255,255,0.45)',
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
        {/* مجموعة قائمة التشغيل — مميّزة */}
        {(activeCategory === 'all' || activeCategory === 'video') && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.25)', color: '#F87171' }}
              >
                <Youtube size={16} />
              </div>
              <h2 className="font-noto font-bold text-white/80" style={{ fontSize: '1.1rem' }}>
                قائمة تشغيل الشيخ أحمد السيد
              </h2>
              <div className="flex-1 h-px opacity-10 bg-white" />
            </div>

            {/* بطاقة مميّزة للشيخ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl p-6 mb-4 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(248,113,113,0.08) 0%, rgba(3,8,19,0.9) 60%)',
                border: '1px solid rgba(248,113,113,0.2)',
              }}
            >
              {/* زخرفة خلفية */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(248,113,113,0.08) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
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
                      style={{ background: 'rgba(248,113,113,0.12)', color: '#F87171', border: '1px solid rgba(248,113,113,0.2)' }}
                    >
                      <Star size={10} />
                      قائمة التشغيل
                    </span>
                  </div>
                  <p className="font-kufi text-sm" style={{ color: 'rgba(248,113,113,0.8)' }}>
                    الشيخ أحمد السيد — قناة يوتيوب
                  </p>
                  <p className="font-noto text-white/50 text-sm mt-2 leading-relaxed">
                    سلسلة علمية متكاملة تتناول السيرة النبوية الشريفة بعمق ومنهجية، تغطّي حياة النبي ﷺ
                    من المولد الشريف حتى الوفاة مع دروس الاستنباط والتحليل.
                  </p>
                </div>

                <a
                  href="https://www.youtube.com/@Ahmed_Alsayed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-kufi text-sm whitespace-nowrap transition-all self-start md:self-auto"
                  style={{
                    background: 'rgba(248,113,113,0.12)',
                    border: '1px solid rgba(248,113,113,0.3)',
                    color: '#F87171',
                  }}
                >
                  <Youtube size={15} />
                  زيارة القناة
                </a>
              </div>
            </motion.div>

            {/* باقي مصادر الفيديو */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SOURCES.filter(s => s.type === 'video').slice(1).map((source, i) => (
                <SourceCard key={source.id} source={source} index={i} />
              ))}
            </div>
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
                <h2 className="font-noto font-bold text-white/80" style={{ fontSize: '1.1rem' }}>
                  {label}
                </h2>
                <div className="flex-1 h-px opacity-10 bg-white" />
                <span className="font-kufi text-xs opacity-30">{items.length} مصدر</span>
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
        <p className="font-noto text-white/20 text-xs leading-loose">
          جميع المصادر من تراث العلماء الأجلاء — رحمهم الله وجزاهم خير الجزاء
        </p>
        <p className="font-kufi text-white/10 text-xs mt-1">نور النبوة — ﷺ</p>
      </div>
    </div>
  );
};

export default SourcesPage;
