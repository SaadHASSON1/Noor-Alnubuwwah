'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, Star } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface ProphetName {
  name: string;
  meaning: string; meaningEn: string;
  reference: string;
  explanation: string; explanationEn: string;
}

interface NameGroup {
  groupTitle: string; groupTitleEn: string;
  color: string;
  names: ProphetName[];
}

const NAME_GROUPS: NameGroup[] = [
  {
    groupTitle: 'الأسماء الأصيلة', groupTitleEn: 'Original Names',
    color: '#C9A84C',
    names: [
      {
        name: 'مُحَمَّد',
        meaning: 'الذي يُحمد كثيراً', meaningEn: 'The Greatly Praised',
        reference: 'القرآن — آل عمران: 144',
        explanation: 'اسمه الشريف الذي سمّاه به جدُّه عبد المطلب وهو اسم نادر قبل مبعثه ﷺ، سمّاه به ليُحمد في السماء والأرض.',
        explanationEn: 'His noble name, given by his grandfather Abd al-Muttalib — a rare name before his mission ﷺ. He named him thus so he would be praised in the heavens and on earth.',
      },
      {
        name: 'أَحْمَد',
        meaning: 'أكثر الحامدين لله', meaningEn: 'The Most Praising of Allah',
        reference: 'القرآن — الصف: 6',
        explanation: '﴿وَمُبَشِّرًا بِرَسُولٍ يَأْتِي مِن بَعْدِي اسْمُهُ أَحْمَدُ﴾ — بشّر به عيسى عليه السلام.',
        explanationEn: '﴿And giving glad tidings of a messenger to come after me whose name shall be Ahmad﴾ — foretold by Jesus (peace be upon him).',
      },
      {
        name: 'الْمَاحِي',
        meaning: 'الذي يمحو الله به الكفر', meaningEn: 'Through Whom Allah Erases Disbelief',
        reference: 'صحيح البخاري ومسلم',
        explanation: 'قال ﷺ: «أنا الماحي الذي يمحو الله بي الكفر» — محا الله به الشرك من جزيرة العرب.',
        explanationEn: 'He ﷺ said: "I am al-Mahi, through whom Allah erases disbelief" — by him, Allah eradicated polytheism from the Arabian Peninsula.',
      },
      {
        name: 'الْحَاشِر',
        meaning: 'الذي يُحشر الناس على قدمه', meaningEn: 'Before Whom People Are Gathered',
        reference: 'صحيح البخاري ومسلم',
        explanation: 'الناس يُحشرون في الآخرة على قدمه ﷺ، أي يكون أول من يُبعث يوم القيامة وفق بعض الروايات.',
        explanationEn: 'People will be gathered on the Day of Judgement following in his footsteps ﷺ — he will be the first to be raised according to some narrations.',
      },
      {
        name: 'الْعَاقِب',
        meaning: 'الذي ليس بعده نبي', meaningEn: 'The Last After Whom There Is No Prophet',
        reference: 'صحيح البخاري ومسلم',
        explanation: 'العاقب: الذي عقب الأنبياء جميعًا. خاتمهم وآخرهم ولا نبي بعده ﷺ.',
        explanationEn: 'Al-Aqib: the one who came after all the prophets. He is their seal and last — no prophet comes after him ﷺ.',
      },
    ],
  },
  {
    groupTitle: 'أسماء القرآن الكريم', groupTitleEn: 'Names from the Noble Quran',
    color: '#A8C8E8',
    names: [
      {
        name: 'الشَّاهِد',
        meaning: 'الشاهد على الأمم', meaningEn: 'Witness over the Nations',
        reference: 'القرآن — الأحزاب: 45',
        explanation: '﴿يَا أَيُّهَا النَّبِيُّ إِنَّا أَرْسَلْنَاكَ شَاهِدًا﴾ — شاهد على أمته يوم القيامة.',
        explanationEn: '﴿O Prophet, We have sent you as a witness﴾ — he will be a witness over his nation on the Day of Judgement.',
      },
      {
        name: 'الْمُبَشِّر',
        meaning: 'البشير بالجنة', meaningEn: 'The Bearer of Glad Tidings',
        reference: 'القرآن — الأحزاب: 45',
        explanation: '﴿وَمُبَشِّرًا وَنَذِيرًا﴾ — يبشّر المؤمنين بالجنة والرضوان والنصر.',
        explanationEn: '﴿And as a bearer of glad tidings and a warner﴾ — he gave the believers the good news of Paradise, Allah\'s pleasure, and victory.',
      },
      {
        name: 'النَّذِير',
        meaning: 'المحذِّر من النار', meaningEn: 'The Warner',
        reference: 'القرآن — الأحزاب: 45',
        explanation: 'أُرسل ﷺ لينذر الناس من عذاب الله ويُحذّرهم من الشرك والمعاصي.',
        explanationEn: 'He was sent ﷺ to warn people of Allah\'s punishment and caution them against polytheism and sin.',
      },
      {
        name: 'السِّرَاج الْمُنِير',
        meaning: 'النور الساطع المضيء', meaningEn: 'The Illuminating Lamp',
        reference: 'القرآن — الأحزاب: 46',
        explanation: '﴿وَسِرَاجًا مُّنِيرًا﴾ — نور يهدي الناس من الظلمات إلى النور.',
        explanationEn: '﴿And as an illuminating lamp﴾ — a light that guides people from darkness into light.',
      },
      {
        name: 'الرَّحْمَة',
        meaning: 'رحمة للعالمين', meaningEn: 'Mercy to All the Worlds',
        reference: 'القرآن — الأنبياء: 107',
        explanation: '﴿وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ﴾ — رحمته شملت الإنس والجن والبهائم.',
        explanationEn: '﴿And We have not sent you except as a mercy to the worlds﴾ — his mercy encompassed humans, jinn, and all creatures.',
      },
      {
        name: 'الدَّاعِي',
        meaning: 'الداعي إلى الله', meaningEn: 'The Caller to Allah',
        reference: 'القرآن — الأحزاب: 46',
        explanation: '﴿وَدَاعِيًا إِلَى اللَّهِ بِإِذْنِهِ﴾ — دعا الناس جميعاً إلى توحيد الله.',
        explanationEn: '﴿And a caller to Allah by His permission﴾ — he called all people to the oneness of Allah.',
      },
    ],
  },
  {
    groupTitle: 'الألقاب العليا', groupTitleEn: 'Supreme Titles',
    color: '#A8E8C8',
    names: [
      {
        name: 'النَّبِيّ',
        meaning: 'المُنبَأ بالوحي والمُنبِئ', meaningEn: 'The One Informed by Revelation',
        reference: 'القرآن — الأعراف: 157',
        explanation: 'النبي: المخبَر بالوحي من الله والمخبِر عنه، رُفعت درجته فوق درجة سائر الخلق.',
        explanationEn: 'The prophet: the one informed by revelation from Allah and conveying it — his rank was raised above all creation.',
      },
      {
        name: 'الرَّسُول',
        meaning: 'المبعوث برسالة', meaningEn: 'The Messenger Sent with a Mission',
        reference: 'القرآن — آل عمران: 144',
        explanation: 'الرسول أعلى درجة من النبي — أُرسل بشريعة كاملة لجميع الثقلين الجن والإنس.',
        explanationEn: 'Messenger is a higher rank than prophet — he was sent with a complete Shari\'ah for all mankind and jinn.',
      },
      {
        name: 'الْمُصْطَفَى',
        meaning: 'المختار من خلق الله', meaningEn: 'The Chosen One from Allah\'s Creation',
        reference: 'صحيح مسلم — كتاب الفضائل',
        explanation: '«إن الله اصطفى كنانة من ولد إسماعيل، واصطفى قريشاً من كنانة، واصطفاني من قريش».',
        explanationEn: '"Allah chose Kinana from the children of Isma\'il, chose Quraysh from Kinana, and chose me from Quraysh."',
      },
      {
        name: 'الْمُخْتَار',
        meaning: 'المنتخَب من بين الخلق', meaningEn: 'The Selected One from All Creation',
        reference: 'صحيح مسلم — كتاب الفضائل',
        explanation: 'اختاره الله تعالى من بين جميع خلقه ليكون خاتم رسله وأشرف أنبيائه.',
        explanationEn: 'Allah Most High selected him from among all of His creation to be the seal of His messengers and the noblest of His prophets.',
      },
      {
        name: 'الْأَمِين',
        meaning: 'الموثوق الصادق', meaningEn: 'The Trustworthy',
        reference: 'سيرة ابن هشام',
        explanation: 'لُقِّب بالأمين قبل البعثة لصدقه وأمانته، وكانت قريش تُودعه أماناتها.',
        explanationEn: 'He was titled al-Amin (The Trustworthy) before his mission for his truthfulness and reliability — Quraysh would entrust him with their valuables.',
      },
      {
        name: 'الصَّادِق',
        meaning: 'الصادق في كل أحواله', meaningEn: 'The Truthful in All His States',
        reference: 'صحيح البخاري — كتاب الأنبياء',
        explanation: 'لم يُعرف عنه ﷺ كذب قط لا قبل البعثة ولا بعدها، حتى شهد له أعداؤه بالصدق.',
        explanationEn: 'No lie was ever known of him ﷺ before or after his mission — even his enemies testified to his truthfulness.',
      },
    ],
  },
  {
    groupTitle: 'أسماء من الحديث الشريف', groupTitleEn: 'Names from the Noble Hadith',
    color: '#34D399',
    names: [
      {
        name: 'خَاتَم النَّبِيِّين',
        meaning: 'آخر الأنبياء والمرسلين', meaningEn: 'Seal of the Prophets and Messengers',
        reference: 'القرآن — الأحزاب: 40',
        explanation: '﴿وَخَاتَمَ النَّبِيِّينَ﴾ — قال ﷺ: «لا نبي بعدي». أُغلق باب النبوة به إلى يوم القيامة.',
        explanationEn: '﴿And the seal of the prophets﴾ — he ﷺ said: "There is no prophet after me." The door of prophethood was closed by him until the Day of Judgement.',
      },
      {
        name: 'نَبِيّ الرَّحْمَة',
        meaning: 'النبي المبعوث بالرحمة', meaningEn: 'The Prophet of Mercy',
        reference: 'صحيح مسلم',
        explanation: '«أنا نبي الرحمة، أنا نبي الملحمة» — رحمة في كل أمره حتى مع أعدائه.',
        explanationEn: '"I am the prophet of mercy, I am the prophet of the great battles" — merciful in all his affairs even with his enemies.',
      },
      {
        name: 'نَبِيّ التَّوْبَة',
        meaning: 'الذي فُتحت بنبوته باب التوبة', meaningEn: 'The Prophet of Repentance',
        reference: 'صحيح مسلم',
        explanation: 'دعا الناس إلى التوبة وجعل أمته أمة يفتح الله لها باب التوبة دائماً.',
        explanationEn: 'He called people to repentance and made his nation one for whom Allah always keeps the door of repentance open.',
      },
      {
        name: 'نَبِيّ الْمَلْحَمَة',
        meaning: 'نبي الجهاد والنصر', meaningEn: 'The Prophet of the Great Battles',
        reference: 'صحيح مسلم',
        explanation: 'بُعث بالسيف رحمةً للخلق وأُذن له بالقتال لإقامة العدل ورفع الظلم.',
        explanationEn: 'He was sent with the sword as a mercy to creation, and was permitted to fight to establish justice and remove oppression.',
      },
      {
        name: 'الشَّفِيع الْمُشَفَّع',
        meaning: 'صاحب الشفاعة العظمى', meaningEn: 'The Interceder Whose Intercession Is Accepted',
        reference: 'صحيح البخاري ومسلم',
        explanation: '«أنا سيد ولد آدم ولا فخر، وأنا أول من تنشق عنه الأرض، وأول شافع».',
        explanationEn: '"I am the master of the children of Adam and I say it not out of boasting; I am the first to rise from the earth and the first to intercede."',
      },
      {
        name: 'الْحَبِيب',
        meaning: 'حبيب الله تعالى', meaningEn: "Allah's Beloved",
        reference: 'الترمذي — صحّحه الألباني',
        explanation: 'قال ﷺ: «إبراهيم خليل الله وأنا حبيب الله، وذلك فضل الله يؤتيه من يشاء».',
        explanationEn: 'He ﷺ said: "Ibrahim is the khalil (intimate friend) of Allah, and I am the habib (beloved) of Allah — that is the bounty of Allah which He gives to whom He wills."',
      },
      {
        name: 'سَيِّد وَلَد آدَم',
        meaning: 'أشرف البشر جميعاً', meaningEn: 'Master of the Children of Adam',
        reference: 'صحيح مسلم — كتاب الفضائل',
        explanation: '«أنا سيد ولد آدم يوم القيامة ولا فخر» — تواضع ﷺ مع علو مكانته.',
        explanationEn: '"I am the master of the children of Adam on the Day of Judgement and I say it not out of boasting" — humility ﷺ despite his elevated station.',
      },
      {
        name: 'إِمَام الْمُتَّقِين',
        meaning: 'قائد أهل التقوى', meaningEn: 'Leader of the God-fearing',
        reference: 'صحيح مسلم — كتاب المساجد',
        explanation: 'أمّ الأنبياء جميعاً في ليلة الإسراء والمعراج في بيت المقدس صلاةً واحدة.',
        explanationEn: 'He led all the prophets in a single prayer on the Night of the Isra\' and Mi\'raj at al-Masjid al-Aqsa.',
      },
    ],
  },
];

const NamesPage: React.FC = () => {
  const router = useRouter();
  const { isEn } = useLanguage();
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const visibleGroups = activeGroup
    ? NAME_GROUPS.filter(g => g.groupTitle === activeGroup)
    : NAME_GROUPS;

  const totalNames = NAME_GROUPS.reduce((acc, g) => acc + g.names.length, 0);

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'Names of the Prophet ﷺ' : 'أسماء النبي ﷺ'} accentColor="#C9A84C" />
      </div>

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 55 }, (_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ left: `${((i * 127.1) % 100).toFixed(1)}%`, top: `${((i * 79.3) % 100).toFixed(1)}%`, width: `${(1 + (i % 2) * 0.8).toFixed(1)}px`, height: `${(1 + (i % 2) * 0.8).toFixed(1)}px`, opacity: 0.2 + (i % 4) * 0.08 }} />
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="relative z-10 px-6 pt-20 pb-4" style={{ paddingRight: isEn ? undefined : '5rem', paddingLeft: isEn ? '5rem' : undefined }}>
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs text-islamic-gold/50">
          <button onClick={() => router.push('/')} className="flex items-center gap-1 hover:text-islamic-gold transition-colors">
            <Home size={12} /><span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </button>
          <ChevronLeft size={10} className={isEn ? '' : 'rotate-180'} />
          <span className="text-islamic-gold/80">{isEn ? 'Names of the Prophet ﷺ' : 'أسماء النبي ﷺ'}</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-10">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 font-kufi text-xs"
          style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C' }}>
          <Star size={11} />
          {totalNames} {isEn ? 'names and titles' : 'اسمًا ولقبًا'}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
          className="font-noto font-bold mb-4"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)', color: '#C9A84C', textShadow: '0 0 50px rgba(201,168,76,0.4)' }}>
          {isEn ? 'Names of the Prophet ﷺ and Their Meanings' : 'أسماء النبي ﷺ ومعانيها'}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="font-noto text-white/55 max-w-lg mx-auto mb-6"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: 2 }}>
          {isEn ? '﴿And We have raised your remembrance﴾' : '﴿وَرَفَعْنَا لَكَ ذِكْرَكَ﴾'}
        </motion.p>

        {/* Group filters */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="flex flex-wrap justify-center gap-2 mt-4">
          <button onClick={() => setActiveGroup(null)}
            className="font-kufi text-xs px-4 py-1.5 rounded-full transition-all"
            style={{ background: activeGroup === null ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${activeGroup === null ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`, color: activeGroup === null ? '#C9A84C' : '#74777d' }}>
            {isEn ? 'All' : 'الكل'}
          </button>
          {NAME_GROUPS.map(g => (
            <button key={g.groupTitle} onClick={() => setActiveGroup(g.groupTitle)}
              className="font-kufi text-xs px-4 py-1.5 rounded-full transition-all"
              style={{ background: activeGroup === g.groupTitle ? `${g.color}22` : 'rgba(255,255,255,0.04)', border: `1px solid ${activeGroup === g.groupTitle ? `${g.color}50` : 'rgba(255,255,255,0.08)'}`, color: activeGroup === g.groupTitle ? g.color : '#74777d' }}>
              {isEn ? g.groupTitleEn : g.groupTitle}
            </button>
          ))}
        </motion.div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.55 }}
          className="flex items-center gap-3 justify-center mt-6 opacity-25">
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>
      </div>

      {/* Name groups */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24 space-y-14">
        {visibleGroups.map((group, gIndex) => (
          <motion.section key={group.groupTitle}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 * gIndex }}>
            {/* Group heading */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1" style={{ background: `linear-gradient(to ${isEn ? 'right' : 'left'}, ${group.color}40, transparent)` }} />
              <h2 className="font-noto font-bold text-center shrink-0"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', color: group.color }}>
                {isEn ? group.groupTitleEn : group.groupTitle}
              </h2>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to ${isEn ? 'left' : 'right'}, ${group.color}40, transparent)` }} />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {group.names.map((nameItem, nIndex) => (
                <motion.div key={nameItem.name}
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.06 * nIndex }}
                  onMouseEnter={() => setHoveredName(`${group.groupTitle}-${nameItem.name}`)}
                  onMouseLeave={() => setHoveredName(null)}
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="relative cursor-default rounded-2xl overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: `1px solid ${group.color}20`,
                    boxShadow: hoveredName === `${group.groupTitle}-${nameItem.name}` ? `0 8px 32px rgba(0,0,0,0.5), 0 0 40px ${group.color}20` : '0 4px 20px rgba(0,0,0,0.4)',
                    transition: 'box-shadow 0.3s ease',
                  }}>
                  <div className="h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${group.color}80, transparent)` }} />
                  <div className="p-4 text-center">
                    {/* Arabic name always shown */}
                    <div className="font-noto font-bold mb-2"
                      style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', color: group.color, textShadow: `0 0 20px ${group.color}50`, lineHeight: 1.4 }}>
                      {nameItem.name}
                    </div>
                    <p className="font-kufi text-white/60 mb-3" style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
                      {isEn ? nameItem.meaningEn : nameItem.meaning}
                    </p>
                    <div className="font-kufi text-xs px-2 py-1 rounded-full inline-block"
                      style={{ background: `${group.color}0A`, border: `1px solid ${group.color}18`, color: group.color, fontSize: '0.82rem' }}>
                      {nameItem.reference}
                    </div>
                    <AnimatePresence>
                      {hoveredName === `${group.groupTitle}-${nameItem.name}` && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden">
                          <p className="font-noto text-white/50" style={{ fontSize: '0.86rem', lineHeight: 1.8 }}>
                            {isEn ? nameItem.explanationEn : nameItem.explanation}
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
