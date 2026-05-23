'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, ChevronDown } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface LifeSection {
  id: string;
  icon: string;
  title: string; titleEn: string;
  subtitle: string; subtitleEn: string;
  color: string;
  facts: string[];
  factsEn: string[];
}

const LIFE_SECTIONS: LifeSection[] = [
  {
    id: 'daily-routine', icon: '🌅',
    title: 'يومه ﷺ', titleEn: 'His Daily Routine ﷺ',
    subtitle: 'الروتين اليومي المبارك', subtitleEn: 'The Blessed Daily Routine',
    color: '#C9A84C',
    facts: [
      'يستيقظ قبل الفجر للتهجد والصلاة',
      'يصلي الفجر في المسجد ثم يجلس يذكر الله حتى تطلع الشمس',
      'يتفقد أصحابه ويسأل عن المرضى والغائبين',
      'يقيل بعد الظهر — القيلولة سنة نبوية مستحبة',
      'يزور أهله ويتحدث معهم بود وحنان',
      'يصلي العصر ثم يزور الأنصار في بيوتهم',
      'بعد العشاء ينام مبكراً استعداداً لقيام الليل',
    ],
    factsEn: [
      'He rose before Fajr for night prayer and worship',
      'He prayed Fajr in the mosque then sat in dhikr until sunrise',
      'He checked on his Companions, asking after the sick and absent',
      'He napped after Dhuhr — the midday rest is a recommended Sunnah',
      'He visited his family and spoke with them warmly and tenderly',
      'He prayed Asr then visited the Ansar in their homes',
      'After Isha he retired early in preparation for night prayer',
    ],
  },
  {
    id: 'food-drink', icon: '🍯',
    title: 'طعامه وشرابه ﷺ', titleEn: 'His Food and Drink ﷺ',
    subtitle: 'البركة في القليل', subtitleEn: 'Blessings in Simplicity',
    color: '#E8C8A8',
    facts: [
      'كان يأكل ما يجد ولا يرد الحلال',
      'أحب الأطعمة: الثريد والعسل والدباء (القرع) والتمر واللبن',
      'كان يأكل بيده اليمنى ويبدأ بالتسمية',
      'لم يذم طعاماً قط: "إن اشتهاه أكله وإن كرهه تركه"',
      'الشراب: الماء والعسل والنبيذ الحلال',
      'كان يشرب قاعداً في ثلاثة أنفاس متأنياً',
    ],
    factsEn: [
      'He ate whatever was available and never refused the lawful',
      'Favourite foods: tharid (bread-and-broth), honey, pumpkin, dates, and milk',
      'He ate with his right hand and began with Bismillah',
      'He never criticised food: "If he liked it he ate it; if he disliked it he left it"',
      'Drinks: water, honey, and sweet non-intoxicating beverages',
      'He drank while seated in three deliberate breaths',
    ],
  },
  {
    id: 'sleep', icon: '🌙',
    title: 'نومه ﷺ', titleEn: 'His Sleep ﷺ',
    subtitle: 'راحة العبد الشاكر', subtitleEn: 'The Rest of a Grateful Servant',
    color: '#A8C8E8',
    facts: [
      'كان ينام على شقه الأيمن مستقبلاً القبلة',
      'يضع يده اليمنى تحت خده الأيمن',
      'يقرأ المعوذتين والإخلاص وينفث في يديه قبل النوم',
      'كان ينام نصف الليل ويقوم ثلثه ويرقد سدسه',
      'فراشه ﷺ: حصير أو أديم محشو بليف النخل',
    ],
    factsEn: [
      'He slept on his right side facing the qibla',
      'He placed his right hand under his right cheek',
      'He recited al-Mu\'awwidhatain, al-Ikhlas, and blew into his hands before sleeping',
      'He slept half the night, stood in prayer a third, and rested a sixth',
      'His bed ﷺ: a mat or leather padded with palm fibres',
    ],
  },
  {
    id: 'clothing', icon: '👘',
    title: 'لباسه ﷺ', titleEn: 'His Clothing ﷺ',
    subtitle: 'البساطة والوقار', subtitleEn: 'Simplicity and Dignity',
    color: '#A8E8C8',
    facts: [
      'كان يحب البياض ويوصي به',
      'القميص أحب الثياب إليه ﷺ',
      'العمامة ويسدلها بين كتفيه',
      'النعل: يبدأ باليمين لبساً ويبدأ بالشمال خلعاً',
      'لم يتكبر في لباسه ولم يلبس الحرير',
    ],
    factsEn: [
      'He loved white clothing and recommended it',
      'The shirt (qamis) was his most beloved garment ﷺ',
      'He wore a turban and let its tail hang between his shoulders',
      'Sandals: he put on the right foot first and removed the left foot first',
      'He was never vain about his dress and did not wear silk',
    ],
  },
  {
    id: 'family', icon: '🏡',
    title: 'معاملته لأهله ﷺ', titleEn: 'His Treatment of His Family ﷺ',
    subtitle: 'خير الناس لأهله', subtitleEn: 'The Best of People to His Family',
    color: '#E8A8A8',
    facts: [
      '"خيركم خيركم لأهله وأنا خيركم لأهلي"',
      'كان يخيط ثوبه ويخصف نعله بنفسه',
      'يساعد في أعمال البيت دون تكبر',
      'يمسح دموع زوجاته ويسمع لهن باهتمام',
      'كان يتسابق مع عائشة في المشي ويسبقها مرةً وتسبقه أخرى',
    ],
    factsEn: [
      '"The best of you are those best to their families, and I am the best of you to my family"',
      'He sewed his own garments and mended his own sandals',
      'He helped with household tasks without arrogance',
      'He wiped the tears of his wives and listened to them attentively',
      'He would race \'Aisha on foot — sometimes he won, sometimes she did',
    ],
  },
  {
    id: 'manners', icon: '🤝',
    title: 'أخلاقه مع الناس ﷺ', titleEn: 'His Manners with People ﷺ',
    subtitle: 'رحمة للعالمين', subtitleEn: 'Mercy to All the Worlds',
    color: '#C8E8A8',
    facts: [
      'لم يُسمع له صوت عالٍ في أي مجلس',
      'يبدأ بالسلام على كل من لقيه صغيراً أو كبيراً',
      'لا يترك أحداً يمشي معه حتى يودّعه هو أولاً',
      'كان يمزح ولا يقول إلا حقاً في مزاحه وجدّه',
      '"كان أشد حياءً من العذراء في خِدرها"',
    ],
    factsEn: [
      'His voice was never heard raised in any gathering',
      'He initiated the greeting of peace to everyone he met, young and old',
      'He never left anyone walking with him until he himself said farewell first',
      'He joked but said only the truth whether joking or serious',
      '"He was more modest than a virgin behind her veil"',
    ],
  },
  {
    id: 'worship', icon: '🕌',
    title: 'عبادته ﷺ', titleEn: 'His Worship ﷺ',
    subtitle: 'العبد الشاكر', subtitleEn: 'The Grateful Servant',
    color: '#C9A84C',
    facts: [
      'يصلي قيام الليل حتى تتورم قدماه',
      '"أفلا أكون عبداً شكوراً؟" — قالها حين سُئل عن طول صلاته',
      'يصوم الاثنين والخميس وأيام البيض (13 و14 و15 من كل شهر)',
      'كان يكثر الاستغفار مئة مرة في اليوم والليلة',
      'دعاء الصباح والمساء لا يتركهما في حضر ولا سفر',
    ],
    factsEn: [
      'He prayed the night prayer until his feet swelled',
      '"Shall I not be a grateful servant?" — said when asked about the length of his prayer',
      'He fasted Mondays, Thursdays, and the White Days (13th, 14th, 15th of each month)',
      'He sought forgiveness a hundred times every day and night',
      'He never missed the morning and evening adhkar at home or while travelling',
    ],
  },
  {
    id: 'health', icon: '💚',
    title: 'مرضه وصحته ﷺ', titleEn: 'His Illness and Health ﷺ',
    subtitle: 'الأنبياء أشد بلاءً', subtitleEn: 'The Prophets Are Tried the Most',
    color: '#A8E8C8',
    facts: [
      'كان أشد الناس مرضاً وأكثرهم صبراً',
      '"يُضرب للمريض أجران: أجر المريض وأجر الصابر"',
      'مات ﷺ بالحمى وذات الجنب في مرضه الأخير',
      'عمره ﷺ عند الوفاة: ثلاثة وستون عاماً',
    ],
    factsEn: [
      'He was among the most severely afflicted yet the most patient of people',
      '"The sick person has two rewards: the reward of the ill and the reward of the patient"',
      'He died of fever and pleurisy in his final illness',
      'His age ﷺ at the time of his death: sixty-three years',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5 } }),
};

const DailyLifePage: React.FC = () => {
  const router = useRouter();
  const { isEn } = useLanguage();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (id: string) => setActiveSection(activeSection === id ? null : id);

  const stats = isEn
    ? [
        { value: '63', unit: 'yrs',   label: 'His Age ﷺ' },
        { value: '100', unit: 'times', label: 'Daily Forgiveness' },
        { value: '23', unit: 'yrs',   label: 'Length of Mission' },
        { value: '11', unit: 'wives', label: 'In His Lifetime ﷺ' },
      ]
    : [
        { value: '63', unit: 'عاماً', label: 'عمره ﷺ' },
        { value: '100', unit: 'مرة',  label: 'استغفاره يومياً' },
        { value: '23', unit: 'سنة',   label: 'مدة الرسالة' },
        { value: '11', unit: 'زوجة', label: 'في حياته ﷺ' },
      ];

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'Daily Life of the Prophet ﷺ' : 'الحياة اليومية للنبي ﷺ'} accentColor="#C9A84C" />
      </div>

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 65 }, (_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ left: `${((i * 137.508) % 100).toFixed(2)}%`, top: `${((i * 93.701) % 100).toFixed(2)}%`, width: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`, height: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`, opacity: 0.13 + (i % 5) * 0.04 }} />
        ))}
      </div>

      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 18%, rgba(201,168,76,0.07) 0%, transparent 55%)' }} />

      {/* Breadcrumb */}
      <div className="relative z-10 px-6 pt-20 pb-4">
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs" style={{ color: '#C9A84C' }}>
          <button onClick={() => router.push('/')} className="flex items-center gap-1 transition-colors hover:text-islamic-gold" style={{ color: '#C9A84C' }}>
            <Home size={12} /><span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </button>
          <ChevronLeft size={10} className={isEn ? '' : 'rotate-180'} />
          <span style={{ color: '#C9A84C' }}>{isEn ? 'Daily Life' : 'الحياة اليومية'}</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="flex flex-col items-center">
          <div className="w-16 h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
          <p className="font-noto mb-3" dir="rtl"
            style={{ fontSize: 'clamp(1.1rem, 3vw, 1.7rem)', color: '#C9A84C', textShadow: '0 0 30px rgba(201,168,76,0.35)', lineHeight: 2 }}>
            ﴿لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ﴾
          </p>
          {isEn && (
            <p className="font-noto text-sm mb-2" style={{ color: '#C9A84C80', lineHeight: 1.8 }}>
              "There has certainly been for you in the Messenger of Allah an excellent example."
            </p>
          )}
          <p className="font-kufi text-xs mb-8" style={{ color: '#C9A84C' }}>
            {isEn ? '— Surah Al-Ahzab: 21' : '— سورة الأحزاب: 21'}
          </p>
          <div className="w-16 h-px mb-8" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}
          className="font-kufi font-bold mb-3"
          style={{ fontSize: 'clamp(1.8rem, 5.5vw, 3.2rem)', color: 'white', textShadow: '0 2px 25px rgba(0,0,0,0.6)' }}>
          {isEn ? 'Daily Life of the Prophet ﷺ' : 'الحياة اليومية للنبي ﷺ'}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
          className="font-noto max-w-md mx-auto" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: '#edeeee', lineHeight: 1.9 }}>
          {isEn
            ? 'How the Master of Prophets ﷺ lived his day — a model and example for every Muslim'
            : 'كيف كان يعيش سيد الأنبياء ﷺ في يومه — أسوة وقدوة لكل مسلم'}
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="inline-flex items-center gap-2 mt-5 px-4 py-1.5 rounded-full font-kufi text-xs"
          style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C' }}>
          {isEn
            ? `${LIFE_SECTIONS.length} sections — tap any section to expand`
            : `${LIFE_SECTIONS.length} أقسام — اضغط على أي قسم لعرض التفاصيل`}
        </motion.div>
      </div>

      {/* Sections */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LIFE_SECTIONS.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <motion.div key={section.id} custom={index} variants={fadeUp} initial="hidden" whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                className="rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: isActive ? `${section.color}18` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? section.color + '44' : 'rgba(201,168,76,0.1)'}`,
                  transition: 'background 0.3s, border-color 0.3s',
                  boxShadow: isActive ? `0 4px 30px ${section.color}15` : 'none',
                }}
                onClick={() => toggleSection(section.id)}>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${section.color}18`, border: `1px solid ${section.color}33` }}>
                      {section.icon}
                    </span>
                    <div>
                      <h3 className="font-kufi font-bold" style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: isActive ? section.color : 'white', transition: 'color 0.3s' }}>
                        {isEn ? section.titleEn : section.title}
                      </h3>
                      <p className="font-noto" style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', color: '#ebebec', marginTop: '1px' }}>
                        {isEn ? section.subtitleEn : section.subtitle}
                      </p>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.28 }}
                    style={{ color: isActive ? section.color : '#4f525a' }}>
                    <ChevronDown size={18} />
                  </motion.div>
                </div>

                {/* Expandable */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div key="content" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: 'easeInOut' }} className="overflow-hidden">
                      <div className="mx-4 mb-4 rounded-xl p-4 space-y-2.5"
                        style={{ background: 'rgba(0,0,0,0.2)', borderRight: isEn ? 'none' : `3px solid ${section.color}55`, borderLeft: isEn ? `3px solid ${section.color}55` : 'none' }}>
                        {(isEn ? section.factsEn : section.facts).map((fact, fi) => (
                          <motion.div key={fi} initial={{ opacity: 0, x: isEn ? -10 : 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: fi * 0.06 }}
                            className="flex items-start gap-3">
                            <span className="font-kufi text-xs shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                              style={{ background: `${section.color}22`, border: `1px solid ${section.color}44`, color: section.color }}>
                              {fi + 1}
                            </span>
                            <p className="font-noto" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)', color: '#f5f5f6', lineHeight: 1.9 }}>
                              {fact}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Featured quote */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mt-14 text-center p-8 rounded-2xl"
          style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.22)', boxShadow: '0 0 40px rgba(201,168,76,0.06)' }}>
          <div className="text-4xl mb-4" style={{ color: '#C9A84C', fontFamily: 'serif' }}>❝</div>
          <p className="font-noto mb-4" dir="rtl"
            style={{ fontSize: 'clamp(1rem, 2.8vw, 1.45rem)', color: '#C9A84C', textShadow: '0 0 20px rgba(201,168,76,0.3)', lineHeight: 2.2 }}>
            كان خُلقه القرآن
          </p>
          {isEn && (
            <p className="font-noto mb-3 text-sm" style={{ color: '#C9A84C80', lineHeight: 1.8 }}>
              "His character was the Quran."
            </p>
          )}
          <p className="font-kufi" style={{ fontSize: '0.9rem', color: '#C9A84C' }}>
            {isEn
              ? '— Lady \'Aisha (may Allah be pleased with her) — Sahih Muslim'
              : '— السيدة عائشة رضي الله عنها — صحيح مسلم'}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="py-4 px-3 rounded-xl text-center"
              style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.13)' }}>
              <p className="font-kufi font-bold" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', color: '#C9A84C', textShadow: '0 0 12px rgba(201,168,76,0.3)' }}>
                {stat.value}<span className="text-sm mx-0.5" style={{ color: '#C9A84C' }}>{stat.unit}</span>
              </p>
              <p className="font-kufi mt-1" style={{ fontSize: '0.75rem', color: '#ebebec' }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-14 text-center">
          <p className="font-noto mb-6" style={{ color: '#4a4d55', fontSize: '0.88rem', lineHeight: 1.8 }}>
            {isEn
              ? 'Sources: Sahih al-Bukhari — Sahih Muslim — Al-Shamail al-Muhammadiyya — Musnad Ahmad'
              : 'المصادر: صحيح البخاري — صحيح مسلم — الشمائل المحمدية للترمذي — مسند أحمد'}
          </p>
          <p className="font-noto mb-6" dir="rtl" style={{ color: '#ebebec', fontSize: '0.9rem', lineHeight: 1.8 }}>
            اللهم صلّ وسلّم على سيدنا محمد وعلى آله وصحبه أجمعين
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

export default DailyLifePage;
