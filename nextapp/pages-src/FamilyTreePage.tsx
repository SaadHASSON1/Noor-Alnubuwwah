'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Home, ChevronRight, X, Users, Heart,
  Baby, Crown,
} from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

/* ══════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════ */
interface Person {
  name: string;
  title?: string;
  relation: string;
  relationEn?: string;
  info?: string;
  infoEn?: string;
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
  { name: 'عبد الله بن عبد المطلب', relation: 'الأب', relationEn: 'Father', info: 'توفي قبل ولادة النبي ﷺ في رحلة تجارية إلى المدينة وعمره خمس وعشرون سنة', infoEn: 'Died before the birth of the Prophet ﷺ on a trade journey to Medina at the age of twenty-five.', color: '#A8C8E8' },
  { name: 'آمنة بنت وهب',           relation: 'الأم', relationEn: 'Mother', info: 'من بني زهرة من قريش، توفيت في الأبواء وعمر النبي ﷺ ست سنوات', infoEn: 'From the Banu Zuhra branch of Quraysh, she passed away in al-Abwa when the Prophet ﷺ was six years old.', color: '#E8A8C8' },
];
const GRANDFATHERS: Person[] = [
  { name: 'عبد المطلب بن هاشم',  relation: 'الجد من أب',    relationEn: 'Paternal Grandfather',  info: 'كافل النبي ﷺ بعد وفاة أمه، وكان سيد قريش وحافر بئر زمزم', infoEn: 'Guardian of the Prophet ﷺ after his mother\'s death; he was the chieftain of Quraysh and the one who excavated the Well of Zamzam.', color: '#C9A84C' },
  { name: 'وهب بن عبد مناف',      relation: 'الجد من أم',    relationEn: 'Maternal Grandfather',  info: 'سيد بني زهرة في عصره', infoEn: 'Chieftain of Banu Zuhra in his era.', color: '#C9A84C' },
  { name: 'حليمة السعدية',        relation: 'المرضعة',       relationEn: 'Foster Mother',          info: 'من بني سعد بن بكر من هوازن، أرضعته في البادية سنواتٍ وأصابتهم بركته', infoEn: 'From Banu Sa\'d ibn Bakr of Hawazin, she nursed him in the desert for years and her household was blessed by his presence.', color: '#A8E8C8' },
  { name: 'ثويبة الأسلمية',       relation: 'أول من أرضعته', relationEn: 'First Wet Nurse',        info: 'جارية أبي لهب، أرضعته أياماً قبل حليمة وأرضعت قبله حمزة بن عبد المطلب', infoEn: 'A servant of Abu Lahab; she nursed him for a few days before Halima and had previously nursed Hamza ibn Abd al-Muttalib.', color: '#A8E8C8' },
];
const UNCLES: Person[] = [
  { name: 'حمزة بن عبد المطلب',     relation: 'العم',          relationEn: 'Uncle',              info: 'أسد الله وأسد رسوله — سيد الشهداء في أحد', infoEn: 'Lion of Allah and Lion of His Messenger — the Master of Martyrs at the Battle of Uhud.', color: '#E8C8A8' },
  { name: 'العباس بن عبد المطلب',   relation: 'العم',          relationEn: 'Uncle',              info: 'جدّ الخلفاء العباسيين — أسلم قبيل فتح مكة', infoEn: 'Ancestor of the Abbasid Caliphs — he embraced Islam shortly before the Conquest of Mecca.', color: '#E8C8A8' },
  { name: 'أبو طالب بن عبد المطلب', relation: 'العم الحامي',   relationEn: 'Protecting Uncle',   info: 'كافله بعد جده ودافع عنه طوال حياته ولم يُسلم', infoEn: 'His guardian after his grandfather; he defended him throughout his life but did not embrace Islam.', color: '#C8A8E8' },
  { name: 'أبو لهب عبد العزى',      relation: 'العم العدو',    relationEn: 'Hostile Uncle',       info: 'أشد أعداء النبي ﷺ من أهله، نزلت فيه سورة المسد', infoEn: 'The most hostile of the Prophet\'s ﷺ relatives; Surah Al-Masad was revealed about him.', color: '#E8A8A8' },
];
const WIVES: Person[] = [
  { name: 'خديجة بنت خويلد',              relation: 'الزوجة الأولى',  relationEn: 'First Wife',              info: 'أول المؤمنين، عاشا معاً 25 عاماً، أم أكثر أولاده', infoEn: 'The first believer; they lived together for 25 years and she is the mother of most of his children.', color: '#FFD700' },
  { name: 'سودة بنت زمعة',                relation: 'الزوجة الثانية', relationEn: 'Second Wife',             info: 'تزوجها بعد وفاة خديجة في مكة', infoEn: 'He married her after the death of Khadijah while still in Mecca.', color: '#C9A84C' },
  { name: 'عائشة بنت أبي بكر',            relation: 'أم المؤمنين',    relationEn: 'Mother of the Believers', info: 'حبيبته وأعلم نساء الأمة، روت آلاف الأحاديث', infoEn: 'His beloved and the most learned woman of the Ummah; she narrated thousands of hadiths.', color: '#FFD700' },
  { name: 'حفصة بنت عمر',                 relation: 'أم المؤمنين',    relationEn: 'Mother of the Believers', info: 'بنت عمر بن الخطاب، حافظة القرآن', infoEn: 'Daughter of Umar ibn al-Khattab, a memoriser of the Quran.', color: '#C9A84C' },
  { name: 'زينب بنت خزيمة',               relation: 'أم المؤمنين',    relationEn: 'Mother of the Believers', info: 'لُقّبت أم المساكين لكثرة إطعامها الفقراء', infoEn: 'She was called "Mother of the Poor" due to her generous feeding of the needy.', color: '#C9A84C' },
  { name: 'أم سلمة هند بنت أبي أمية',    relation: 'أم المؤمنين',    relationEn: 'Mother of the Believers', info: 'من أكثر أمهات المؤمنين علماً وفقهاً', infoEn: 'Among the most knowledgeable of the Mothers of the Believers in religious scholarship.', color: '#C9A84C' },
  { name: 'زينب بنت جحش',                 relation: 'أم المؤمنين',    relationEn: 'Mother of the Believers', info: 'تزوجها بأمر الله في سورة الأحزاب', infoEn: 'He married her by divine command, as mentioned in Surah Al-Ahzab.', color: '#C9A84C' },
  { name: 'جويرية بنت الحارث',            relation: 'أم المؤمنين',    relationEn: 'Mother of the Believers', info: 'بنت زعيم بني المصطلق، تزوّجها فأعتق المسلمون أسراهم', infoEn: 'Daughter of the chief of Banu al-Mustaliq; when he married her, the Muslims freed their captives.', color: '#C9A84C' },
  { name: 'أم حبيبة رملة بنت أبي سفيان', relation: 'أم المؤمنين',    relationEn: 'Mother of the Believers', info: 'هاجرت إلى الحبشة وتزوجها النبي ﷺ وهي هناك', infoEn: 'She emigrated to Abyssinia and the Prophet ﷺ married her while she was there.', color: '#C9A84C' },
  { name: 'صفية بنت حيي',                 relation: 'أم المؤمنين',    relationEn: 'Mother of the Believers', info: 'من بني النضير، أسلمت بعد خيبر وتزوّجها النبي ﷺ', infoEn: 'From Banu al-Nadir; she embraced Islam after Khaybar and the Prophet ﷺ married her.', color: '#C9A84C' },
  { name: 'ميمونة بنت الحارث',            relation: 'أم المؤمنين',    relationEn: 'Mother of the Believers', info: 'آخر من تزوجها النبي ﷺ في عمرة القضاء', infoEn: 'The last woman the Prophet ﷺ married, during the Umrat al-Qada.', color: '#C9A84C' },
  { name: 'مارية القبطية',                relation: 'أم إبراهيم',     relationEn: 'Mother of Ibrahim',      info: 'أهداها المقوقس، أم ولده إبراهيم الذي مات طفلاً', infoEn: 'Gifted by the Muqawqis; mother of his son Ibrahim who died in infancy.', color: '#A8C8E8' },
];
const CHILDREN: Person[] = [
  { name: 'القاسم',                  relation: 'الابن البكر',   relationEn: 'Eldest Son',          info: 'من خديجة، مات طفلاً وبه كُني أبا القاسم', infoEn: 'Son of Khadijah; died in infancy, and the Prophet ﷺ was given the kunya Abu al-Qasim after him.', color: '#A8E8C8' },
  { name: 'عبد الله (الطاهر الطيب)', relation: 'الابن',         relationEn: 'Son',                 info: 'من خديجة، مات طفلاً، وله لقبان الطاهر والطيب', infoEn: 'Son of Khadijah; died in infancy and bore the two epithets al-Tahir and al-Tayyib.', color: '#A8E8C8' },
  { name: 'إبراهيم',                 relation: 'الابن',         relationEn: 'Son',                 info: 'من مارية القبطية، مات رضيعاً فبكى عليه النبي ﷺ', infoEn: 'Son of Maria al-Qibtiyya; he died as an infant and the Prophet ﷺ wept over him.', color: '#A8E8C8' },
  { name: 'زينب بنت محمد',           relation: 'البنت الكبرى', relationEn: 'Eldest Daughter',     info: 'تزوجت أبا العاص بن الربيع وهاجرت إلى المدينة', infoEn: 'She married Abu al-As ibn al-Rabi\' and later migrated to Medina.', color: '#E8A8C8' },
  { name: 'رقية بنت محمد',           relation: 'البنت',         relationEn: 'Daughter',            info: 'تزوجت عثمان بن عفان، ماتت يوم بدر', infoEn: 'She married Uthman ibn Affan and passed away on the day of Badr.', color: '#E8A8C8' },
  { name: 'أم كلثوم بنت محمد',       relation: 'البنت',         relationEn: 'Daughter',            info: 'تزوجت عثمان بن عفان بعد وفاة رقية فسُمّي ذا النورين', infoEn: 'She married Uthman after Ruqayya\'s death, earning him the title Dhul-Nurayn (Possessor of Two Lights).', color: '#E8A8C8' },
  { name: 'فاطمة الزهراء',           relation: 'البنت الصغرى', relationEn: 'Youngest Daughter',   info: 'سيدة نساء العالمين، زوجة علي، أم الحسن والحسين', infoEn: 'The Lady of the Women of All Worlds; wife of Ali, mother of al-Hasan and al-Husayn.', color: '#FFD700' },
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
const PersonCard: React.FC<{ person: Person; index: number; isEn?: boolean }> = React.memo(({ person, index, isEn }) => {
  const [open, setOpen] = useState(false);
  const color = person.color ?? '#C9A84C';
  const displayRelation = isEn && person.relationEn ? person.relationEn : person.relation;
  const displayInfo = isEn && person.infoEn ? person.infoEn : person.info;
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
            <p className="font-kufi text-xs mt-0.5 opacity-70" style={{ color }}>{displayRelation}</p>
            {person.info && <p className="font-kufi text-xs mt-1 opacity-35 text-white">{isEn ? 'Tap for details' : 'اضغط للتفاصيل'}</p>}
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
              className={`relative max-w-sm w-full rounded-2xl p-6 ${isEn ? 'text-left' : 'text-right'}`}
              style={{ background: '#0a0f1e', border: `1px solid ${color}35` }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 left-4 opacity-50 hover:opacity-100 transition-opacity" style={{ color }}>
                <X size={18} />
              </button>
              <div className="w-1.5 h-1.5 rounded-full mb-3" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
              <h3 className="font-noto font-bold text-white mb-1" style={{ fontSize: '1.2rem' }}>{person.name}</h3>
              <p className="font-kufi text-sm mb-4" style={{ color, opacity: 0.85 }}>{displayRelation}</p>
              <div className="h-px opacity-20 mb-4" style={{ background: color }} />
              <p className="font-noto text-white/80 leading-loose" style={{ fontSize: '0.95rem', lineHeight: 2 }}>{displayInfo}</p>
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
   مكوّن شبكة النسب (بطاقات مربعة)
══════════════════════════════════════════════ */
const LineageGrid: React.FC = () => {
  const total = LINEAGE_ORDERED.length;

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2.5" dir="rtl">
      {LINEAGE_ORDERED.map((item, i) => {
        const isLast = i === total - 1; /* محمد ﷺ */
        const progress = i / (total - 1);

        return (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.82 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-4%' }}
            transition={{ duration: 0.38, delay: (i % 6) * 0.045 }}
            whileHover={{ scale: isLast ? 1.04 : 1.06, y: -2 }}
            className="relative aspect-square rounded-2xl flex flex-col items-center justify-center p-2 select-none"
            style={{
              background: isLast
                ? 'linear-gradient(135deg, rgba(201,168,76,0.28), rgba(201,168,76,0.07))'
                : `rgba(201,168,76,${(0.02 + progress * 0.07).toFixed(3)})`,
              border: `${isLast ? 2 : 1}px solid ${
                isLast
                  ? 'rgba(201,168,76,0.65)'
                  : `rgba(201,168,76,${(0.06 + progress * 0.22).toFixed(3)})`
              }`,
              boxShadow: isLast
                ? '0 0 28px rgba(201,168,76,0.22), 0 0 60px rgba(201,168,76,0.08)'
                : 'none',
            }}
          >
            {/* رقم الجيل */}
            <span
              className="absolute top-1.5 left-1.5 font-kufi"
              style={{
                fontSize: '0.68rem',
                color: `rgba(201,168,76,${(0.22 + progress * 0.48).toFixed(3)})`,
                lineHeight: 1,
              }}
            >
              {item.gen}
            </span>

            {/* نقطة وميض لمحمد ﷺ */}
            {isLast && (
              <span
                className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: '#C9A84C' }}
              />
            )}

            {/* الاسم */}
            <p
              className="font-noto font-bold text-center leading-snug"
              style={{
                fontSize: isLast
                  ? 'clamp(1.1rem, 2.5vw, 1.45rem)'
                  : 'clamp(0.95rem, 2vw, 1.2rem)',
                color: isLast
                  ? '#C9A84C'
                  : `rgba(255,255,255,${(0.36 + progress * 0.64).toFixed(3)})`,
                textShadow: isLast ? '0 0 14px rgba(201,168,76,0.45)' : 'none',
              }}
            >
              {item.name}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ══════════════════════════════════════════════
   الصفحة الرئيسية
══════════════════════════════════════════════ */
const FamilyTreePage: React.FC = () => {
  const router = useRouter();
  const { isEn } = useLanguage();

  return (
    <div className="min-h-screen" dir={isEn ? 'ltr' : 'rtl'} style={{ background: '#030813' }}>
      {/* زر المشاركة */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'Prophetic Lineage' : 'شجرة النسب الشريف'} accentColor="#C9A84C" />
      </div>

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
          className={`absolute top-6 flex items-center gap-2 text-sm font-kufi max-w-[calc(100vw-6rem)] ${isEn ? 'left-20' : 'right-20'}`}
          style={{ color: '#C9A84C' }}
        >
          <button onClick={() => router.push('/')} className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
            <Home size={14} />{isEn ? 'Home' : 'الرئيسية'}
          </button>
          <ChevronRight size={14} className="opacity-40" />
          <span className="opacity-90">{isEn ? 'Family Tree' : 'شجرة النسب'}</span>
        </motion.nav>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-14 pt-28 text-center">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-kufi text-islamic-gold/70 tracking-widest text-sm mb-4">
            {isEn ? 'Prophetic Lineage' : 'النسب الشريف'}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-noto font-bold text-white leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', textShadow: '0 0 50px rgba(201,168,76,0.3)' }}>
            {isEn ? 'Family Tree' : 'شجرة النسب'}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="font-noto text-white/60 max-w-lg mx-auto"
            style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: 2 }}>
            {isEn ? 'From Adnan to Muhammad ﷺ — 22 generations of the noblest lineage' : 'من عدنان إلى محمد ﷺ — 22 جيلاً من أشرف النسب'}
          </motion.p>
        </div>
      </section>

      {/* ── Content ── */}
      <div className="max-w-6xl mx-auto px-5 md:px-12 py-16 space-y-24">

        {/* ① النسب الأفقي */}
        <section>
          <SectionTitle
            icon={<Crown size={20} />}
            title={isEn ? 'Prophetic Lineage' : 'النسب الشريف'}
            subtitle={isEn ? 'From Adnan to Muhammad ﷺ — 22 generations' : 'من عدنان إلى محمد ﷺ — 22 جيلاً'}
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
              { label: 'عدنان', sub: isEn ? 'Highest Ancestor' : 'الجد الأعلى', color: '#f2f3f3' },
              { label: '←', sub: isEn ? '22 generations' : '22 جيلاً', color: '#C9A84C', arrow: true },
              { label: 'محمد ﷺ', sub: isEn ? 'Seal of the Prophets' : 'خاتم الأنبياء', color: '#C9A84C' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className={`font-noto font-bold ${item.arrow ? 'text-3xl' : 'text-lg'}`} style={{ color: item.color }}>
                  {item.label}
                </p>
                <p className="font-kufi text-white/25 text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </motion.div>

          <LineageGrid />

          {/* ملاحظة */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center font-kufi text-white/20 text-xs mt-6"
          >
            {isEn ? 'His ﷺ lineage traces back to Ismail ibn Ibrahim (peace be upon them) • • •' : 'يصل نسبه ﷺ إلى إسماعيل بن إبراهيم عليهما السلام • • •'}
          </motion.p>
        </section>

        {/* ② الوالدان */}
        <section>
          <SectionTitle icon={<Heart size={20} />} title={isEn ? 'Noble Parents' : 'الوالدان الكريمان'} subtitle={isEn ? 'His father, mother, and those who nursed him' : 'أبوه وأمه ومن أرضعوه'} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {PARENTS.map((p, i) => <PersonCard key={i} person={p} index={i} isEn={isEn} />)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {GRANDFATHERS.map((p, i) => <PersonCard key={i} person={p} index={i} isEn={isEn} />)}
          </div>
        </section>

        {/* ③ الأعمام */}
        <section>
          <SectionTitle icon={<Users size={20} />} title={isEn ? 'His ﷺ Paternal Uncles' : 'أعمامه ﷺ'} subtitle={isEn ? 'His prominent paternal uncles' : 'من أعمامه البارزون'} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {UNCLES.map((p, i) => <PersonCard key={i} person={p} index={i} isEn={isEn} />)}
          </div>
        </section>

        {/* ④ أمهات المؤمنين */}
        <section>
          <SectionTitle icon={<Heart size={20} />} title={isEn ? 'Mothers of the Believers' : 'أمهات المؤمنين'} subtitle={isEn ? 'His pure wives, may Allah be pleased with them' : 'زوجاته الطاهرات رضي الله عنهن'} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WIVES.map((p, i) => <PersonCard key={i} person={p} index={i} isEn={isEn} />)}
          </div>
        </section>

        {/* ⑤ الأبناء والبنات */}
        <section>
          <SectionTitle icon={<Baby size={20} />} title={isEn ? 'His ﷺ Children' : 'أبناؤه وبناته'} subtitle={isEn ? 'His noble offspring ﷺ' : 'ذريته الكريمة ﷺ'} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHILDREN.map((p, i) => <PersonCard key={i} person={p} index={i} isEn={isEn} />)}
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
          <p className="font-noto text-islamic-gold/75 mb-2" dir="rtl" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', lineHeight: 2 }}>
            ﴿مُّحَمَّدٌ رَّسُولُ اللَّهِ ۚ وَالَّذِينَ مَعَهُ أَشِدَّاءُ عَلَى الْكُفَّارِ رُحَمَاءُ بَيْنَهُمْ﴾
          </p>
          <p className="font-kufi text-islamic-gold/45 text-sm tracking-widest">{isEn ? '— Surah Al-Fath: 29' : '— سورة الفتح: 29'}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default FamilyTreePage;
