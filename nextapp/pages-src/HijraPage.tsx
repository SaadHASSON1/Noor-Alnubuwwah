'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, Calendar, Route } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface HijraStage {
  number: string;
  title: string; titleEn: string;
  subtitle: string; subtitleEn: string;
  color: string;
  glowColor: string;
  gradientFrom: string;
  gradientTo: string;
  verse?: string;
  verseRef?: string; verseRefEn?: string;
  points: string[];
  pointsEn: string[];
  icon: string;
}

const HIJRA_STAGES: HijraStage[] = [
  {
    number: '1',
    title: 'الإذن الإلهي بالهجرة', titleEn: 'Divine Permission to Migrate',
    subtitle: 'ليلة المؤامرة الكبرى', subtitleEn: 'Night of the Grand Conspiracy',
    color: '#A78BFA', glowColor: '#A78BFA',
    gradientFrom: '#0d0520', gradientTo: '#16092e',
    verse: '﴿وَإِذْ يَمْكُرُ بِكَ الَّذِينَ كَفَرُوا لِيُثْبِتُوكَ أَوْ يَقْتُلُوكَ أَوْ يُخْرِجُوكَ﴾',
    verseRef: 'الأنفال: 30', verseRefEn: 'Al-Anfal: 30',
    icon: '🌙',
    points: [
      'اجتمع المشركون في دار الندوة لاغتيال النبي ﷺ',
      'نزل جبريل يخبره بمؤامرة قريش وأذن له بالهجرة',
      'علي بن أبي طالب نام في فراشه ليوهم المشركين بأنه لا يزال في البيت',
    ],
    pointsEn: [
      'The polytheists gathered in Dar al-Nadwa to assassinate the Prophet ﷺ',
      'Jibreel descended to inform him of Quraysh\'s plot and granted him permission to migrate',
      'Ali ibn Abi Talib slept in his bed to make the polytheists believe he was still in the house',
    ],
  },
  {
    number: '2',
    title: 'الخروج من مكة المكرمة', titleEn: 'Departure from Makkah al-Mukarramah',
    subtitle: 'وداع أحب البقاع', subtitleEn: 'Bidding Farewell to the Most Beloved Land',
    color: '#FBBF24', glowColor: '#FBBF24',
    gradientFrom: '#1a0e00', gradientTo: '#241500',
    verse: '﴿وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا﴾',
    verseRef: 'يس: 9', verseRefEn: 'Ya-Sin: 9',
    icon: '🌟',
    points: [
      'خرج النبي ﷺ وأبو بكر الصديق ليلاً بإذن الله',
      'نثر التراب على رؤوس المشركين المتربصين وتلا الآية الكريمة',
      'التاريخ: ربيع الأول سنة 1 هـ (سبتمبر 622م)',
      '"والله إنك لأحب البقاع إلى الله وأحب البقاع إليّ، ولولا أن أهلك أخرجوني منك ما خرجت"',
    ],
    pointsEn: [
      'The Prophet ﷺ and Abu Bakr al-Siddiq left by night with Allah\'s permission',
      'He scattered dust on the heads of the lying-in-wait polytheists and recited the noble verse',
      'Date: Rabi\' al-Awwal, 1 AH (September 622 CE)',
      '"By Allah, you are the most beloved of Allah\'s lands and the most beloved to me. Had your people not driven me out, I would never have left."',
    ],
  },
  {
    number: '3',
    title: 'الاختباء في غار ثور', titleEn: 'Taking Refuge in the Cave of Thawr',
    subtitle: 'ثلاثة أيام في رحاب الله', subtitleEn: 'Three Days in Allah\'s Shelter',
    color: '#2DD4BF', glowColor: '#2DD4BF',
    gradientFrom: '#011716', gradientTo: '#021f1c',
    verse: '﴿لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا﴾',
    verseRef: 'التوبة: 40', verseRefEn: 'Al-Tawbah: 40',
    icon: '🕊️',
    points: [
      'ثلاثة أيام في الغار (الجمعة والسبت والأحد)',
      'قريش تعرض مئة ناقة لمن يدل عليهما',
      'عنكبوت نسجت بيتها على فم الغار وحمامتان أشارتا إلى سلامة المكان',
      'أبو بكر قال: "يا رسول الله لو نظر أحدهم تحت قدميه لرآنا"',
      'عبد الله بن أبي بكر يأتي بالأخبار ليلاً',
      'أسماء بنت أبي بكر "ذات النطاقين" تأتي بالطعام',
    ],
    pointsEn: [
      'Three days in the cave (Friday, Saturday and Sunday)',
      'Quraysh offered a hundred camels for whoever would lead them to the two',
      'A spider spun its web over the cave\'s entrance and two doves indicated no one had passed',
      'Abu Bakr said: "O Messenger of Allah, if one of them were to look beneath his feet, he would see us"',
      '\'Abdullah ibn Abi Bakr came nightly with news',
      'Asma\' bint Abi Bakr — "Dhat al-Nitaqayn" — brought food',
    ],
  },
  {
    number: '4',
    title: 'مسيرة 450 كيلومتراً شمالاً', titleEn: 'A 450-Kilometre Journey Northward',
    subtitle: 'رحلة الإيمان الكبرى', subtitleEn: 'The Great Journey of Faith',
    color: '#D97706', glowColor: '#D97706',
    gradientFrom: '#160a00', gradientTo: '#1e1000',
    icon: '🐪',
    points: [
      'الدليل: عبد الله بن أريقط (غير مسلم لكنه أمين موثوق)',
      'الطريق: الساحل الغربي بعيداً عن الطريق المعروف',
      'سراقة بن مالك لحق بهم طامعاً في الجائزة فغاصت قوائم فرسه في الأرض',
      'قصة سراقة وأساور كسرى — نبوءة تحققت في عهد عمر بن الخطاب',
    ],
    pointsEn: [
      'Guide: \'Abdullah ibn Urayqit — a non-Muslim but trusted and reliable',
      'Route: the western coastal road, far from the known path',
      'Suraqah ibn Malik pursued them greedy for the reward, but his horse\'s legs sank into the ground',
      'The story of Suraqah and the bracelets of Khosrow — a prophecy fulfilled in the era of \'Umar ibn al-Khattab',
    ],
  },
  {
    number: '5',
    title: 'قباء — أول مسجد في الإسلام', titleEn: 'Quba\' — The First Mosque in Islam',
    subtitle: 'أُسِّسَ على التقوى', subtitleEn: 'Founded Upon Piety',
    color: '#34D399', glowColor: '#34D399',
    gradientFrom: '#011408', gradientTo: '#031c0c',
    verse: '﴿لَمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ﴾',
    verseRef: 'التوبة: 108', verseRefEn: 'Al-Tawbah: 108',
    icon: '🕌',
    points: [
      'وصل يوم الاثنين 8 ربيع الأول',
      'أقام في قباء أربعة أيام',
      'بنى مسجد قباء — أول مسجد بُني في الإسلام',
    ],
    pointsEn: [
      'He arrived on Monday, 8 Rabi\' al-Awwal',
      'He stayed in Quba\' for four days',
      'He built the Mosque of Quba\' — the first mosque built in Islam',
    ],
  },
  {
    number: '6',
    title: 'الوصول إلى المدينة المنورة', titleEn: 'Arrival at al-Madinah al-Munawwarah',
    subtitle: 'بداية عهد النور', subtitleEn: 'The Dawn of a New Era',
    color: '#C9A84C', glowColor: '#C9A84C',
    gradientFrom: '#150e00', gradientTo: '#1f1500',
    icon: '☀️',
    points: [
      'الجمعة 12 ربيع الأول — أول جمعة صلاها في المدينة المنورة',
      'استقبال أهل المدينة بالفرحة والبكاء والأناشيد',
      '"طلع البدر علينا من ثنيات الوداع، وجب الشكر علينا ما دعا لله داعِ"',
      'نزل في دار أبي أيوب الأنصاري ضيفاً كريماً',
      'بداية الحقبة المدنية للإسلام — انطلاقة الدولة الإسلامية',
    ],
    pointsEn: [
      'Friday, 12 Rabi\' al-Awwal — the first Friday prayer he led in Madinah',
      'The people of Madinah received him with joy, tears, and nashids',
      '"The full moon has risen over us from the passes of Wada\', and gratitude is due from us as long as a caller calls to Allah."',
      'He stayed as an honoured guest at the home of Abu Ayyub al-Ansari',
      'The beginning of the Madinan era of Islam — the launch of the Islamic state',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
};

const HijraPage: React.FC = () => {
  const router = useRouter();
  const { isEn } = useLanguage();

  const stats = isEn
    ? [
        { value: '450', unit: 'km',   label: 'Total Distance' },
        { value: '3',   unit: 'days', label: 'In the Cave of Thawr' },
        { value: '622', unit: 'CE',   label: 'Year of Migration' },
      ]
    : [
        { value: '450', unit: 'كم',   label: 'المسافة الإجمالية' },
        { value: '3',   unit: 'أيام', label: 'في غار ثور' },
        { value: '622', unit: 'م',    label: 'السنة الميلادية' },
      ];

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share button */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'The Prophetic Hijra Journey' : 'رحلة الهجرة النبوية الشريفة'} accentColor="#C9A84C" />
      </div>

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 70 }, (_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              left: `${((i * 137.508) % 100).toFixed(2)}%`,
              top: `${((i * 89.317) % 100).toFixed(2)}%`,
              width: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`,
              height: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`,
              opacity: 0.15 + (i % 5) * 0.04,
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 15%, rgba(201,168,76,0.07) 0%, transparent 55%)' }} />

      {/* Breadcrumb */}
      <div className="relative z-10 px-6 pt-20 pb-4">
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs" style={{ color: '#C9A84C' }}>
          <button onClick={() => router.push('/')} className="flex items-center gap-1 transition-colors hover:text-islamic-gold" style={{ color: '#C9A84C' }}>
            <Home size={12} />
            <span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </button>
          <ChevronLeft size={10} className={isEn ? '' : 'rotate-180'} />
          <span style={{ color: '#C9A84C' }}>{isEn ? 'The Hijra Journey' : 'رحلة الهجرة'}</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-12">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full font-kufi text-xs"
          style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C' }}>
          <Route size={12} />
          {isEn ? '1 AH — 622 CE' : '1 هـ — 622م'}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
          className="font-noto font-bold mb-4"
          style={{ fontSize: 'clamp(1.8rem, 5.5vw, 3.2rem)', color: '#C9A84C', textShadow: '0 0 40px rgba(201,168,76,0.4)', lineHeight: 1.5 }}>
          {isEn ? 'The Prophetic Hijra Journey' : 'رحلة الهجرة النبوية الشريفة'}
        </motion.h1>

        {/* Header verse */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto mb-8">
          <p className="font-noto mb-2" dir="rtl"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', color: '#C9A84C', textShadow: '0 0 20px rgba(201,168,76,0.25)', lineHeight: 2.1 }}>
            ﴿إِلَّا تَنصُرُوهُ فَقَدْ نَصَرَهُ اللَّهُ إِذْ أَخْرَجَهُ الَّذِينَ كَفَرُوا ثَانِيَ اثْنَيْنِ﴾
          </p>
          {isEn && (
            <p className="font-noto text-sm mb-1" style={{ color: '#C9A84C80', lineHeight: 1.8 }}>
              "If you do not aid him — Allah has already aided him when those who disbelieved had driven him out as one of two."
            </p>
          )}
          <p className="font-kufi text-xs" style={{ color: '#C9A84C' }}>
            {isEn ? '— Al-Tawbah: 40' : '— سورة التوبة: 40'}
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap gap-3 justify-center mb-8">
          {[
            { icon: <Route size={14} />, label: isEn ? 'Total Distance' : 'المسافة الإجمالية', value: isEn ? '450 km' : '450 كيلومتراً' },
            { icon: <Calendar size={14} />, label: isEn ? 'Journey Duration' : 'مدة الرحلة', value: isEn ? '~Two Weeks' : 'نحو أسبوعين' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 px-4 py-2.5 rounded-full font-kufi text-xs"
              style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.18)', color: '#C9A84C' }}>
              {item.icon}
              <span style={{ color: '#ebebec' }}>{item.label}:</span>
              <span>{item.value}</span>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center gap-3 justify-center opacity-20">
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        <div>
          {HIJRA_STAGES.map((stage, index) => (
            <motion.div key={stage.number} custom={index} variants={fadeUp}
              initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
              className="flex items-stretch gap-4">
              {/* Stage circle column */}
              <div className={`flex flex-col items-center shrink-0 ${isEn ? 'order-first' : 'order-last'}`} style={{ width: '3rem' }}>
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                  transition={{ delay: index * 0.12 + 0.2, type: 'spring', stiffness: 220 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center font-kufi font-bold text-lg shrink-0"
                  style={{ background: '#030813', border: `2px solid ${stage.glowColor}`, color: stage.glowColor, boxShadow: `0 0 18px ${stage.glowColor}55` }}>
                  {stage.number}
                </motion.div>
                {index < HIJRA_STAGES.length - 1 && (
                  <div className="w-0.5 flex-1 mt-1"
                    style={{ background: `linear-gradient(180deg, ${stage.glowColor}60, ${HIJRA_STAGES[index + 1].glowColor}25)`, minHeight: '1.5rem' }} />
                )}
              </div>

              {/* Card */}
              <div className="flex-1 pb-8 min-w-0">
                <div className="rounded-2xl overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${stage.gradientFrom} 0%, ${stage.gradientTo} 100%)`, border: `1px solid ${stage.glowColor}30`, boxShadow: `0 4px 30px ${stage.glowColor}18` }}>
                  {/* Card header */}
                  <div className="px-5 pt-5 pb-4"
                    style={{ background: `linear-gradient(135deg, ${stage.glowColor}18, transparent)`, borderBottom: `1px solid ${stage.glowColor}22` }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-kufi text-xs mb-1" style={{ color: stage.glowColor }}>
                          {isEn ? `Stage ${stage.number}` : `المرحلة ${stage.number}`}
                        </p>
                        <h3 className="font-kufi font-bold" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: stage.glowColor }}>
                          {isEn ? stage.titleEn : stage.title}
                        </h3>
                        <p className="font-noto mt-0.5" style={{ fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)', color: '#edeeee' }}>
                          {isEn ? stage.subtitleEn : stage.subtitle}
                        </p>
                      </div>
                      <span className="text-2xl shrink-0 mt-0.5">{stage.icon}</span>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="px-5 pt-4 pb-5 space-y-3">
                    {(isEn ? stage.pointsEn : stage.points).map((point, pi) => (
                      <div key={pi} className="flex gap-3 items-start">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: stage.glowColor, opacity: 0.7 }} />
                        <p className="font-noto" style={{ fontSize: 'clamp(0.88rem, 2vw, 1rem)', color: '#f5f5f6', lineHeight: 1.9 }}>
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Verse */}
                  {stage.verse && (
                    <div className="mx-5 mb-5 rounded-xl p-4"
                      style={{ background: 'rgba(0,0,0,0.25)', borderRight: `3px solid ${stage.glowColor}66` }}>
                      <p className="font-noto mb-2" dir="rtl"
                        style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)', color: stage.glowColor, textShadow: `0 0 16px ${stage.glowColor}44`, lineHeight: 2 }}>
                        {stage.verse}
                      </p>
                      <p className="font-kufi text-xs" style={{ color: stage.glowColor }}>
                        — {isEn ? 'Surah ' : 'سورة '}{isEn ? stage.verseRefEn : stage.verseRef}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arrival song */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mt-14 text-center p-8 rounded-2xl"
          style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', boxShadow: '0 0 40px rgba(201,168,76,0.07)' }}>
          <p className="font-noto mb-4" dir="rtl"
            style={{ fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', color: '#C9A84C', textShadow: '0 0 20px rgba(201,168,76,0.35)', lineHeight: 2.2 }}>
            طلع البدر علينا من ثنيات الوداع
            <br />
            وجب الشكر علينا ما دعا لله داعِ
          </p>
          {isEn && (
            <p className="font-noto text-sm mb-3" style={{ color: '#C9A84C80', lineHeight: 1.9 }}>
              The full moon rose over us from the passes of Wada',<br />
              and gratitude is due from us as long as a caller calls to Allah.
            </p>
          )}
          <p className="font-kufi text-xs" style={{ color: '#C9A84C' }}>
            {isEn ? '— Nashid of the people of Madinah welcoming the Prophet ﷺ' : '— نشيد أهل المدينة في استقبال النبي ﷺ'}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="py-5 px-3 rounded-xl"
              style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)' }}>
              <p className="font-kufi font-bold" style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', color: '#C9A84C', textShadow: '0 0 15px rgba(201,168,76,0.3)' }}>
                {stat.value}
                <span className="text-base mx-1" style={{ color: '#C9A84C' }}>{stat.unit}</span>
              </p>
              <p className="font-kufi mt-1" style={{ fontSize: '0.78rem', color: '#ebebec' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-14 text-center">
          <p className="font-noto mb-6" style={{ color: '#ebebec', fontSize: '0.88rem', lineHeight: 1.8 }}>
            {isEn
              ? 'Sources: Sahih al-Bukhari — Sahih Muslim — Sirah Ibn Hisham — Al-Rahiq al-Makhtum'
              : 'المصادر: صحيح البخاري — صحيح مسلم — السيرة النبوية لابن هشام — الرحيق المختوم'}
          </p>
          <button onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-kufi text-sm transition-all hover:opacity-80"
            style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C' }}>
            <Home size={13} />
            {isEn ? 'Back to Home' : 'العودة للرئيسية'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HijraPage;
