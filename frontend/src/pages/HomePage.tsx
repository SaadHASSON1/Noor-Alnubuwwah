import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ChapterCard from '../components/ChapterCard';
import IslamicParticles from '../components/IslamicParticles';
import { CHAPTERS, CHAPTER_META, SEERAH_EVENTS } from '../data/seerah';
import {
  Coffee, Navigation, Sword, Shield, Mail, ScrollText,
  Heart, Sparkles, Star, BookOpen, PenTool, Crown,
  Users, GitBranch, HelpCircle, Library,
} from 'lucide-react';

/* ── Diamond divider ── */
const GoldDivider: React.FC = () => (
  <div className="flex items-center gap-4 my-8 opacity-25" aria-hidden>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
    <div className="w-2 h-2 rotate-45 bg-islamic-gold" />
    <div className="w-2 h-2 rotate-45 bg-islamic-gold opacity-50" />
    <div className="w-2 h-2 rotate-45 bg-islamic-gold" />
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
  </div>
);

/* ── بطاقة موضوعاتية ── */
interface TopicCard {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  period: string;
  path: string;
  color: string;
}

/* الأحداث الزمنية — مرتبة تاريخياً */
const EVENT_TOPICS: TopicCard[] = [
  {
    icon: <Coffee size={22} />,
    title: 'حياته اليومية ﷺ',
    subtitle: 'طعامه ونومه ولباسه وعبادته',
    period: 'طوال حياته ﷺ',
    path: '/daily-life',
    color: '#A8C8E8',
  },
  {
    icon: <Navigation size={22} />,
    title: 'رحلة الهجرة الشريفة',
    subtitle: 'من مكة إلى المدينة خطوة بخطوة',
    period: '١ هـ / ٦٢٢ م',
    path: '/hijra',
    color: '#86EFAC',
  },
  {
    icon: <Sword size={22} />,
    title: 'غزواته ﷺ',
    subtitle: 'بدر، أحد، الخندق، خيبر، الفتح...',
    period: '٢ — ٩ هـ',
    path: '/battles',
    color: '#FCA5A5',
  },
  {
    icon: <Shield size={22} />,
    title: 'السرايا العسكرية',
    subtitle: 'البعثات التي لم يقدها ﷺ بنفسه',
    period: '١ — ١١ هـ',
    path: '/saraya',
    color: '#FDBA74',
  },
  {
    icon: <Mail size={22} />,
    title: 'رسائله إلى الملوك',
    subtitle: 'هرقل، كسرى، المقوقس، النجاشي...',
    period: '٦ هـ / ٦٢٨ م',
    path: '/letters',
    color: '#C4B5FD',
  },
  {
    icon: <ScrollText size={22} />,
    title: 'خطبة الوداع الكاملة',
    subtitle: 'آخر خطبة جامعة لرسول الله ﷺ',
    period: '١٠ هـ / ٦٣٢ م',
    path: '/farewell-sermon',
    color: '#C9A84C',
  },
];

/* المواضيع الثابتة */
const THEME_TOPICS: TopicCard[] = [
  {
    icon: <Heart size={22} />,
    title: 'صفاته ﷺ',
    subtitle: 'خلقه وشمائله وجماله',
    period: 'السيرة الشاملة',
    path: '/character',
    color: '#F9A8D4',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'معجزاته ﷺ',
    subtitle: '٢٥+ معجزة موثقة',
    period: 'السيرة الشاملة',
    path: '/miracles',
    color: '#6EE7B7',
  },
  {
    icon: <Star size={22} />,
    title: 'نبوءاته ﷺ',
    subtitle: 'أخبار أخبر بها فتحققت',
    period: 'السيرة الشاملة',
    path: '/prophecies',
    color: '#FDE68A',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'أسماؤه ﷺ',
    subtitle: 'معاني أسمائه ولقبه الشريف',
    period: 'السيرة الشاملة',
    path: '/names',
    color: '#A5B4FC',
  },
  {
    icon: <PenTool size={22} />,
    title: 'كتّاب الوحي',
    subtitle: '٢٣ صحابياً كتبوا الوحي',
    period: 'المرحلة المدنية',
    path: '/scribes',
    color: '#C9A84C',
  },
  {
    icon: <Crown size={22} />,
    title: 'أمهات المؤمنين',
    subtitle: 'زوجاته الطاهرات ﷺ',
    period: 'السيرة الشاملة',
    path: '/wives',
    color: '#FCA5A5',
  },
  {
    icon: <Users size={22} />,
    title: 'الصحابة الكرام',
    subtitle: '٥٠+ صحابي من خيرة البشر',
    period: 'السيرة الشاملة',
    path: '/companions',
    color: '#86EFAC',
  },
  {
    icon: <GitBranch size={22} />,
    title: 'شجرة النسب الشريف',
    subtitle: '٢٢ جداً من عدنان إلى محمد ﷺ',
    period: 'النسب الشريف',
    path: '/family-tree',
    color: '#C9A84C',
  },
  {
    icon: <HelpCircle size={22} />,
    title: 'الاختبار التفاعلي',
    subtitle: 'اختبر معلوماتك عن السيرة',
    period: 'تفاعلي',
    path: '/quiz',
    color: '#67E8F9',
  },
  {
    icon: <Library size={22} />,
    title: 'المصادر والمراجع',
    subtitle: 'الكتب والمراجع المعتمدة',
    period: 'المصادر',
    path: '/sources',
    color: '#D1D5DB',
  },
];

const TopicCardItem: React.FC<{ card: TopicCard; index: number }> = ({ card, index }) => {
  const navigate = useNavigate();
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.45, delay: (index % 5) * 0.06 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(card.path)}
      className="relative flex flex-col items-start text-right p-5 rounded-2xl w-full cursor-pointer"
      style={{
        background: `${card.color}0d`,
        border: `1px solid ${card.color}28`,
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 8px 32px ${card.color}18`)}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      {/* أيقونة */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
        style={{ background: `${card.color}18`, color: card.color }}
      >
        {card.icon}
      </div>

      {/* المحتوى */}
      <p className="font-noto font-bold text-white text-right mb-1" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)' }}>
        {card.title}
      </p>
      <p className="font-kufi text-right mb-2" style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
        {card.subtitle}
      </p>

      {/* السنة */}
      <span
        className="font-kufi rounded-full px-2.5 py-0.5 mt-auto"
        style={{ fontSize: '0.72rem', background: `${card.color}18`, color: card.color, border: `1px solid ${card.color}30` }}
      >
        {card.period}
      </span>
    </motion.button>
  );
};

/* ── سكشن هيدر ── */
const SectionHeader: React.FC<{ label: string; title: string; subtitle: string }> = ({ label, title, subtitle }) => (
  <div className="max-w-6xl mx-auto text-center mb-12">
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.6 }}
      className="font-kufi text-islamic-gold/80 tracking-widest text-sm mb-3"
    >
      {label}
    </motion.p>
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="font-noto font-bold text-white mb-3"
      style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="text-white/70 max-w-lg mx-auto font-kufi"
      style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)', lineHeight: 2 }}
    >
      {subtitle}
    </motion.p>
    <GoldDivider />
  </div>
);

const HomePage: React.FC = () => {
  const eventCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const ch of CHAPTERS) counts[ch] = 0;
    for (const ev of SEERAH_EVENTS) {
      if (counts[ev.chapter] !== undefined) counts[ev.chapter]++;
    }
    return counts;
  }, []);

  return (
    <div className="relative" dir="rtl">
      <IslamicParticles />
      <Hero />

      {/* ══ القسم الأول: فصول السيرة الثمانية ══ */}
      <section
        className="relative py-24 px-5 md:px-12"
        style={{ background: 'linear-gradient(to bottom, #030813 0%, #05060f 100%)' }}
      >
        <SectionHeader
          label="سيرة خير البشر"
          title="فصول السيرة النبوية"
          subtitle="رحلة في ثمانية فصول من حياة النبي ﷺ — من مولده المبارك حتى انتقاله إلى الرفيق الأعلى"
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CHAPTERS.map((ch, i) => (
            <ChapterCard
              key={ch}
              chapter={CHAPTER_META[ch]}
              eventCount={eventCounts[ch]}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ══ القسم الثاني: أبرز الأحداث (بالترتيب الزمني) ══ */}
      <section
        className="relative py-20 px-5 md:px-12"
        style={{ background: 'linear-gradient(to bottom, #05060f 0%, #060810 100%)' }}
      >
        <SectionHeader
          label="مرتبة زمنياً"
          title="أبرز أحداث السيرة"
          subtitle="من الهجرة حتى خطبة الوداع — محطات زمنية تفصيلية"
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EVENT_TOPICS.map((card, i) => (
            <TopicCardItem key={card.path} card={card} index={i} />
          ))}
        </div>
      </section>

      {/* ══ القسم الثالث: شخصيات ومواضيع ══ */}
      <section
        className="relative py-20 px-5 md:px-12"
        style={{ background: 'linear-gradient(to bottom, #060810 0%, #030813 100%)' }}
      >
        <SectionHeader
          label="الشخصيات والمواضيع"
          title="مواضيع السيرة الشاملة"
          subtitle="الصحابة والزوجات والمعجزات والنبوءات وكل ما يتعلق بسيرته ﷺ"
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {THEME_TOPICS.map((card, i) => (
            <TopicCardItem key={card.path} card={card} index={i} />
          ))}
        </div>
      </section>

      {/* ── آية ختامية ── */}
      <section
        className="py-16 px-5"
        style={{ background: '#030813' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <GoldDivider />
          <p
            className="font-noto text-islamic-gold/80 mb-2"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)', lineHeight: 2 }}
          >
            ﴿لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ﴾
          </p>
          <p className="font-kufi text-islamic-gold/65 text-sm tracking-widest">
            — سورة الأحزاب: ٢١
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
