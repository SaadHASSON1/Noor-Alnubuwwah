'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, Star } from 'lucide-react';
import ShareButton from '@/components/ShareButton';

interface ProphetName {
  name: string;
  meaning: string;
  reference: string;
  explanation: string;
}

interface NameGroup {
  groupTitle: string;
  color: string;
  names: ProphetName[];
}

const NAME_GROUPS: NameGroup[] = [
  {
    groupTitle: 'الأسماء الأصيلة',
    color: '#C9A84C',
    names: [
      {
        name: 'مُحَمَّد',
        meaning: 'الذي يُحمد كثيراً',
        reference: 'القرآن — آل عمران: 144',
        explanation: 'اسمه الشريف الذي سمّاه به جدُّه عبد المطلب وهو اسم نادر قبل مبعثه ﷺ، سمّاه به ليُحمد في السماء والأرض.',
      },
      {
        name: 'أَحْمَد',
        meaning: 'أكثر الحامدين لله',
        reference: 'القرآن — الصف: 6',
        explanation: '﴿وَمُبَشِّرًا بِرَسُولٍ يَأْتِي مِن بَعْدِي اسْمُهُ أَحْمَدُ﴾ — بشّر به عيسى عليه السلام.',
      },
      {
        name: 'الْمَاحِي',
        meaning: 'الذي يمحو الله به الكفر',
        reference: 'صحيح البخاري ومسلم',
        explanation: 'قال ﷺ: «أنا الماحي الذي يمحو الله بي الكفر» — محا الله به الشرك من جزيرة العرب.',
      },
      {
        name: 'الْحَاشِر',
        meaning: 'الذي يُحشر الناس على قدمه',
        reference: 'صحيح البخاري ومسلم',
        explanation: 'الناس يُحشرون في الآخرة على قدمه ﷺ، أي يكون أول من يُبعث يوم القيامة وفق بعض الروايات.',
      },
      {
        name: 'الْعَاقِب',
        meaning: 'الذي ليس بعده نبي',
        reference: 'صحيح البخاري ومسلم',
        explanation: 'العاقب: الذي عقب الأنبياء جميعًا. خاتمهم وآخرهم ولا نبي بعده ﷺ.',
      },
    ],
  },
  {
    groupTitle: 'أسماء القرآن الكريم',
    color: '#A8C8E8',
    names: [
      {
        name: 'الشَّاهِد',
        meaning: 'الشاهد على الأمم',
        reference: 'القرآن — الأحزاب: 45',
        explanation: '﴿يَا أَيُّهَا النَّبِيُّ إِنَّا أَرْسَلْنَاكَ شَاهِدًا﴾ — شاهد على أمته يوم القيامة.',
      },
      {
        name: 'الْمُبَشِّر',
        meaning: 'البشير بالجنة',
        reference: 'القرآن — الأحزاب: 45',
        explanation: '﴿وَمُبَشِّرًا وَنَذِيرًا﴾ — يبشّر المؤمنين بالجنة والرضوان والنصر.',
      },
      {
        name: 'النَّذِير',
        meaning: 'المحذِّر من النار',
        reference: 'القرآن — الأحزاب: 45',
        explanation: 'أُرسل ﷺ لينذر الناس من عذاب الله ويُحذّرهم من الشرك والمعاصي.',
      },
      {
        name: 'السِّرَاج الْمُنِير',
        meaning: 'النور الساطع المضيء',
        reference: 'القرآن — الأحزاب: 46',
        explanation: '﴿وَسِرَاجًا مُّنِيرًا﴾ — نور يهدي الناس من الظلمات إلى النور.',
      },
      {
        name: 'الرَّحْمَة',
        meaning: 'رحمة للعالمين',
        reference: 'القرآن — الأنبياء: 107',
        explanation: '﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾ — رحمته شملت الإنس والجن والبهائم.',
      },
      {
        name: 'الدَّاعِي',
        meaning: 'الداعي إلى الله',
        reference: 'القرآن — الأحزاب: 46',
        explanation: '﴿وَدَاعِيًا إِلَى اللَّهِ بِإِذْنِهِ﴾ — دعا الناس جميعاً إلى توحيد الله.',
      },
    ],
  },
  {
    groupTitle: 'الألقاب العليا',
    color: '#A8E8C8',
    names: [
      {
        name: 'النَّبِيّ',
        meaning: 'المُنبَأ بالوحي والمُنبِئ',
        reference: 'القرآن — الأعراف: 157',
        explanation: 'النبي: المخبَر بالوحي من الله والمخبِر عنه، رُفعت درجته فوق درجة سائر الخلق.',
      },
      {
        name: 'الرَّسُول',
        meaning: 'المبعوث برسالة',
        reference: 'القرآن — آل عمران: 144',
        explanation: 'الرسول أعلى درجة من النبي — أُرسل بشريعة كاملة لجميع الثقلين الجن والإنس.',
      },
      {
        name: 'الْمُصْطَفَى',
        meaning: 'المختار من خلق الله',
        reference: 'صحيح مسلم — كتاب الفضائل',
        explanation: '«إن الله اصطفى كنانة من ولد إسماعيل، واصطفى قريشاً من كنانة، واصطفاني من قريش».',
      },
      {
        name: 'الْمُخْتَار',
        meaning: 'المنتخَب من بين الخلق',
        reference: 'صحيح مسلم — كتاب الفضائل',
        explanation: 'اختاره الله تعالى من بين جميع خلقه ليكون خاتم رسله وأشرف أنبيائه.',
      },
      {
        name: 'الْأَمِين',
        meaning: 'الموثوق الصادق',
        reference: 'سيرة ابن هشام',
        explanation: 'لُقِّب بالأمين قبل البعثة لصدقه وأمانته، وكانت قريش تُودعه أماناتها.',
      },
      {
        name: 'الصَّادِق',
        meaning: 'الصادق في كل أحواله',
        reference: 'صحيح البخاري — كتاب الأنبياء',
        explanation: 'لم يُعرف عنه ﷺ كذب قط لا قبل البعثة ولا بعدها، حتى شهد له أعداؤه بالصدق.',
      },
    ],
  },
  {
    groupTitle: 'أسماء من الحديث الشريف',
    color: '#34D399',
    names: [
      {
        name: 'خَاتَم النَّبِيِّين',
        meaning: 'آخر الأنبياء والمرسلين',
        reference: 'القرآن — الأحزاب: 40',
        explanation: '﴿وَخَاتَمَ النَّبِيِّينَ﴾ — قال ﷺ: «لا نبي بعدي». أُغلق باب النبوة به إلى يوم القيامة.',
      },
      {
        name: 'نَبِيّ الرَّحْمَة',
        meaning: 'النبي المبعوث بالرحمة',
        reference: 'صحيح مسلم',
        explanation: '«أنا نبي الرحمة، أنا نبي الملحمة» — رحمة في كل أمره حتى مع أعدائه.',
      },
      {
        name: 'نَبِيّ التَّوْبَة',
        meaning: 'الذي فُتحت بنبوته باب التوبة',
        reference: 'صحيح مسلم',
        explanation: 'دعا الناس إلى التوبة وجعل أمته أمة يفتح الله لها باب التوبة دائماً.',
      },
      {
        name: 'نَبِيّ الْمَلْحَمَة',
        meaning: 'نبي الجهاد والنصر',
        reference: 'صحيح مسلم',
        explanation: 'بُعث بالسيف رحمةً للخلق وأُذن له بالقتال لإقامة العدل ورفع الظلم.',
      },
      {
        name: 'الشَّفِيع الْمُشَفَّع',
        meaning: 'صاحب الشفاعة العظمى',
        reference: 'صحيح البخاري ومسلم',
        explanation: '«أنا سيد ولد آدم ولا فخر، وأنا أول من تنشق عنه الأرض، وأول شافع».',
      },
      {
        name: 'الْحَبِيب',
        meaning: 'حبيب الله تعالى',
        reference: 'الترمذي — صحّحه الألباني',
        explanation: 'قال ﷺ: «إبراهيم خليل الله وأنا حبيب الله، وذلك فضل الله يؤتيه من يشاء».',
      },
      {
        name: 'سَيِّد وَلَد آدَم',
        meaning: 'أشرف البشر جميعاً',
        reference: 'صحيح مسلم — كتاب الفضائل',
        explanation: '«أنا سيد ولد آدم يوم القيامة ولا فخر» — تواضع ﷺ مع علو مكانته.',
      },
      {
        name: 'إِمَام الْمُتَّقِين',
        meaning: 'قائد أهل التقوى',
        reference: 'صحيح مسلم — كتاب المساجد',
        explanation: 'أمّ الأنبياء جميعاً في ليلة الإسراء والمعراج في بيت المقدس صلاةً واحدة.',
      },
    ],
  },
];

const NamesPage: React.FC = () => {
  const router = useRouter();
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const visibleGroups = activeGroup
    ? NAME_GROUPS.filter(g => g.groupTitle === activeGroup)
    : NAME_GROUPS;

  const totalNames = NAME_GROUPS.reduce((acc, g) => acc + g.names.length, 0);

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: '#030813' }}>
      {/* زر المشاركة */}
      <div className="fixed top-[5.5rem] left-4 z-[60]">
        <ShareButton title="أسماء النبي ﷺ" accentColor="#C9A84C" />
      </div>
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 55 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${((i * 127.1) % 100).toFixed(1)}%`,
              top: `${((i * 79.3) % 100).toFixed(1)}%`,
              width: `${(1 + (i % 2) * 0.8).toFixed(1)}px`,
              height: `${(1 + (i % 2) * 0.8).toFixed(1)}px`,
              opacity: 0.2 + (i % 4) * 0.08,
            }}
          />
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="relative z-10 px-6 pt-20 pb-4" style={{ paddingRight: '5rem' }}>
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs text-islamic-gold/50"
        >
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 hover:text-islamic-gold transition-colors"
          >
            <Home size={12} />
            <span>الرئيسية</span>
          </button>
          <ChevronLeft size={10} className="rotate-180" />
          <span className="text-islamic-gold/80">أسماء النبي ﷺ</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 font-kufi text-xs"
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            color: '#C9A84C',
          }}
        >
          <Star size={11} />
          {totalNames} اسمًا ولقبًا
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-noto font-bold mb-4"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.8rem)',
            color: '#C9A84C',
            textShadow: '0 0 50px rgba(201,168,76,0.4)',
          }}
        >
          أسماء النبي ﷺ ومعانيها
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-noto text-white/55 max-w-lg mx-auto mb-6"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: 2 }}
        >
          ﴿وَرَفَعْنَا لَكَ ذِكْرَكَ﴾
        </motion.p>

        {/* Group filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex flex-wrap justify-center gap-2 mt-4"
        >
          <button
            onClick={() => setActiveGroup(null)}
            className="font-kufi text-xs px-4 py-1.5 rounded-full transition-all"
            style={{
              background: activeGroup === null ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeGroup === null ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: activeGroup === null ? '#C9A84C' : '#74777d',
            }}
          >
            الكل
          </button>
          {NAME_GROUPS.map(g => (
            <button
              key={g.groupTitle}
              onClick={() => setActiveGroup(g.groupTitle)}
              className="font-kufi text-xs px-4 py-1.5 rounded-full transition-all"
              style={{
                background: activeGroup === g.groupTitle ? `${g.color}22` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeGroup === g.groupTitle ? `${g.color}50` : 'rgba(255,255,255,0.08)'}`,
                color: activeGroup === g.groupTitle ? g.color : '#74777d',
              }}
            >
              {g.groupTitle}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
          className="flex items-center gap-3 justify-center mt-6 opacity-25"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>
      </div>

      {/* Name groups */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24 space-y-14">
        {visibleGroups.map((group, gIndex) => (
          <motion.section
            key={group.groupTitle}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 * gIndex }}
          >
            {/* Group heading */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${group.color}40, transparent)` }} />
              <h2
                className="font-noto font-bold text-center shrink-0"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: group.color }}
              >
                {group.groupTitle}
              </h2>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${group.color}40, transparent)` }} />
            </div>

            {/* Name cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {group.names.map((nameItem, nIndex) => (
                <motion.div
                  key={nameItem.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.06 * nIndex }}
                  onMouseEnter={() => setHoveredName(`${group.groupTitle}-${nameItem.name}`)}
                  onMouseLeave={() => setHoveredName(null)}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="relative cursor-default rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: `1px solid ${group.color}20`,
                    boxShadow:
                      hoveredName === `${group.groupTitle}-${nameItem.name}`
                        ? `0 8px 32px rgba(0,0,0,0.5), 0 0 40px ${group.color}20`
                        : '0 4px 20px rgba(0,0,0,0.4)',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  {/* Top gradient line */}
                  <div
                    className="h-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${group.color}80, transparent)` }}
                  />

                  <div className="p-4 text-center">
                    {/* Name */}
                    <div
                      className="font-noto font-bold mb-2"
                      style={{
                        fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
                        color: group.color,
                        textShadow: `0 0 20px ${group.color}50`,
                        lineHeight: 1.4,
                      }}
                    >
                      {nameItem.name}
                    </div>

                    {/* Meaning */}
                    <p
                      className="font-kufi text-white/60 mb-3"
                      style={{ fontSize: '0.88rem', lineHeight: 1.6 }}
                    >
                      {nameItem.meaning}
                    </p>

                    {/* Reference */}
                    <div
                      className="font-kufi text-xs px-2 py-1 rounded-full inline-block"
                      style={{
                        background: `${group.color}0A`,
                        border: `1px solid ${group.color}18`,
                        color: `${group.color}`,
                        fontSize: '0.82rem',
                      }}
                    >
                      {nameItem.reference}
                    </div>

                    {/* Hover explanation */}
                    <AnimatePresence>
                      {hoveredName === `${group.groupTitle}-${nameItem.name}` && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 overflow-hidden"
                        >
                          <p
                            className="font-noto text-white/50"
                            style={{ fontSize: '0.86rem', lineHeight: 1.8 }}
                          >
                            {nameItem.explanation}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default NamesPage;
