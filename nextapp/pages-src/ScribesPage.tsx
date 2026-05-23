'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, PenLine, Star, Search as SearchIcon } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface Scribe {
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  achievement: string;
  achievementEn: string;
  startedWriting: string;
  startedWritingEn: string;
  notable: boolean;
}

const SCRIBES: Scribe[] = [
  {
    name: 'زيد بن ثابت', nameEn: 'Zayd ibn Thabit',
    role: 'كبير كتّاب الوحي',
    roleEn: 'Chief Scribe of Revelation',
    achievement: 'حفظ القرآن كاملاً وتولّى جمعه في عهد أبي بكر ثم نسخه في عهد عثمان. تعلّم السريانية والعبرية بأمر النبي ﷺ في سبعة عشر يوماً.',
    achievementEn: 'Memorized the entire Qurʾān and oversaw its compilation under Abū Bakr, then its standardization under ʿUthmān. Learned Syriac and Hebrew at the Prophet\'s ﷺ command within seventeen days.',
    startedWriting: '5 هـ',
    startedWritingEn: '5 AH',
    notable: true,
  },
  {
    name: 'أبو بكر الصديق', nameEn: 'Abu Bakr al-Siddiq',
    role: 'كاتب وحي وشريك نبوة',
    roleEn: 'Scribe of Revelation and Prophetic Companion',
    achievement: 'أقرب الناس إلى النبي ﷺ، كان يكتب بعض الوحي ورسائل النبي ﷺ.',
    achievementEn: 'The closest of all people to the Prophet ﷺ; he wrote some of the revelation and the Prophet\'s ﷺ letters.',
    startedWriting: 'مبكراً',
    startedWritingEn: 'Early',
    notable: false,
  },
  {
    name: 'عمر بن الخطاب', nameEn: 'Umar ibn al-Khattab',
    role: 'كاتب وحي ورسائل',
    roleEn: 'Scribe of Revelation and Letters',
    achievement: 'كتب الوحي ورسائل النبي ﷺ، وكان له دور في جمع القرآن إذ هو أول من أشار بذلك.',
    achievementEn: 'Wrote the revelation and the Prophet\'s ﷺ letters; was the first to suggest compiling the Qurʾān.',
    startedWriting: 'بعد إسلامه 6 هـ ق.هـ',
    startedWritingEn: 'After his Islam (6 BH)',
    notable: false,
  },
  {
    name: 'عثمان بن عفان', nameEn: 'Uthman ibn Affan',
    role: 'كاتب وحي وجامع القرآن',
    roleEn: 'Scribe of Revelation and Compiler of the Qurʾān',
    achievement: 'كتب الوحي وأشرف لاحقاً على المصحف الإمام الذي أُرسلت نسخه لعواصم المسلمين.',
    achievementEn: 'Wrote the revelation and later supervised the Master Muṣḥaf, copies of which were sent to all Muslim capitals.',
    startedWriting: 'مبكراً',
    startedWritingEn: 'Early',
    notable: false,
  },
  {
    name: 'علي بن أبي طالب', nameEn: 'Ali ibn Abi Talib',
    role: 'كاتب وحي ورسائل',
    roleEn: 'Scribe of Revelation and Letters',
    achievement: 'من أوائل الكتّاب وأعلمهم بالقرآن، كتب صحيفة الصلح في الحديبية.',
    achievementEn: 'Among the earliest and most knowledgeable scribes of the Qurʾān; wrote the Treaty of Ḥudaybiyyah.',
    startedWriting: 'مبكراً',
    startedWritingEn: 'Early',
    notable: false,
  },
  {
    name: 'أُبيّ بن كعب', nameEn: "Ubayy ibn Ka'b",
    role: 'كاتب وحي وحافظ',
    roleEn: 'Scribe of Revelation and Ḥāfiẓ',
    achievement: 'من أعلم الصحابة بالقرآن وأجودهم في القراءة. قال عنه النبي ﷺ: «أقرأ أمتي أُبيّ».',
    achievementEn: 'Among the most knowledgeable Companions in the Qurʾān and the finest reciter. The Prophet ﷺ said: "The best reciter of my nation is Ubayy."',
    startedWriting: 'بعد الهجرة',
    startedWritingEn: 'After the Hijrah',
    notable: false,
  },
  {
    name: 'معاوية بن أبي سفيان', nameEn: 'Muawiyah ibn Abi Sufyan',
    role: 'كاتب وحي',
    roleEn: 'Scribe of Revelation',
    achievement: 'من أكثر الصحابة كتابةً للوحي، قال له النبي ﷺ: «اللهم علّمه الكتابة والحساب».',
    achievementEn: 'Among the most prolific scribes of revelation. The Prophet ﷺ said: "O Allāh, teach him writing and arithmetic."',
    startedWriting: '8 هـ (بعد الفتح)',
    startedWritingEn: '8 AH (after the Conquest)',
    notable: false,
  },
  {
    name: 'عبد الله بن مسعود', nameEn: "Abdullah ibn Mas'ud",
    role: 'كاتب وحافظ قرآن',
    roleEn: 'Scribe and Qurʾānic Ḥāfiẓ',
    achievement: 'أول من جهر بقراءة القرآن في مكة. قال ﷺ: «من أراد أن يقرأ القرآن غضاً فليقرأه على ابن أم عبد».',
    achievementEn: 'First to recite the Qurʾān aloud in Makkah. The Prophet ﷺ said: "Whoever wishes to recite the Qurʾān fresh as revealed, let him recite it as Ibn Umm ʿAbd recites it."',
    startedWriting: 'مبكراً في مكة',
    startedWritingEn: 'Early in Makkah',
    notable: false,
  },
  {
    name: 'الزبير بن العوام', nameEn: 'Al-Zubayr ibn al-Awwam',
    role: 'كاتب وحي ورسائل',
    roleEn: 'Scribe of Revelation and Letters',
    achievement: 'ابن عمة النبي ﷺ وحواريّه، كتب بعض المراسلات النبوية.',
    achievementEn: 'Son of the Prophet\'s ﷺ paternal aunt and his "disciple"; wrote some of the Prophetic correspondence.',
    startedWriting: 'بعد الهجرة',
    startedWritingEn: 'After the Hijrah',
    notable: false,
  },
  {
    name: 'خالد بن سعيد بن العاص', nameEn: "Khalid ibn Sa'id ibn al-'As",
    role: 'كاتب وحي مبكر',
    roleEn: 'Early Scribe of Revelation',
    achievement: 'من أوائل من كتبوا الوحي، أسلم قبل كثيرين وكان يكتب للنبي ﷺ في فجر الإسلام.',
    achievementEn: 'Among the earliest to write the revelation; embraced Islam before many others and served as scribe in the dawn of Islam.',
    startedWriting: 'مبكراً في مكة',
    startedWritingEn: 'Early in Makkah',
    notable: false,
  },
  {
    name: 'أبان بن سعيد بن العاص', nameEn: "Aban ibn Sa'id ibn al-'As",
    role: 'كاتب وحي',
    roleEn: 'Scribe of Revelation',
    achievement: 'أخو خالد بن سعيد، كتب للنبي ﷺ وكان من الكتّاب النشطين.',
    achievementEn: 'Brother of Khālid ibn Saʿīd; wrote for the Prophet ﷺ and was among the active scribes.',
    startedWriting: 'بعد الهجرة',
    startedWritingEn: 'After the Hijrah',
    notable: false,
  },
  {
    name: 'حنظلة الأسيدي', nameEn: 'Hanzalah al-Usayyidi',
    role: 'كاتب وحي وشهيد',
    roleEn: 'Scribe of Revelation and Martyr',
    achievement: '«غسيل الملائكة» — استُشهد في أُحد وقد خرج من عرسه مباشرةً إلى المعركة فغسّلته الملائكة.',
    achievementEn: '"Washed by the Angels" — martyred at Uḥud having gone directly from his wedding to the battlefield, so the angels washed him.',
    startedWriting: 'في المدينة',
    startedWritingEn: 'In Madinah',
    notable: false,
  },
  {
    name: 'العلاء بن الحضرمي', nameEn: "Al-'Ala' ibn al-Hadrami",
    role: 'كاتب ورسول',
    roleEn: 'Scribe and Emissary',
    achievement: 'بعثه النبي ﷺ والياً على البحرين وكاتباً لرسائله السياسية.',
    achievementEn: 'The Prophet ﷺ sent him as governor of Bahrain and scribe for his political letters.',
    startedWriting: 'بعد الهجرة',
    startedWritingEn: 'After the Hijrah',
    notable: false,
  },
  {
    name: 'شرحبيل بن حسنة', nameEn: 'Shurahbil ibn Hasanah',
    role: 'كاتب رسائل وقائد',
    roleEn: 'Scribe of Letters and Commander',
    achievement: 'كتب رسائل النبي ﷺ إلى الملوك والأمراء، وأبلى بلاءً حسناً في فتوح الشام.',
    achievementEn: 'Wrote the Prophet\'s ﷺ letters to kings and princes; distinguished himself in the conquests of the Levant.',
    startedWriting: 'في المدينة',
    startedWritingEn: 'In Madinah',
    notable: false,
  },
  {
    name: 'عبد الله بن رواحة', nameEn: 'Abdullah ibn Rawahah',
    role: 'كاتب وشاعر النبي ﷺ',
    roleEn: 'Scribe and Poet of the Prophet ﷺ',
    achievement: 'شاعر النبي ﷺ المدافع عنه بلسانه وسيفه، استُشهد في غزوة مؤتة أميراً.',
    achievementEn: 'Poet-defender of the Prophet ﷺ with tongue and sword; martyred as commander at the Battle of Muʾtah.',
    startedWriting: 'في المدينة',
    startedWritingEn: 'In Madinah',
    notable: false,
  },
  {
    name: 'خالد بن الوليد', nameEn: 'Khalid ibn al-Walid',
    role: 'كاتب ورسائل',
    roleEn: 'Scribe and Correspondence',
    achievement: 'سيف الله المسلول، كتب بعض رسائل النبي ﷺ العسكرية والدبلوماسية.',
    achievementEn: 'The Drawn Sword of Allāh; wrote some of the Prophet\'s ﷺ military and diplomatic letters.',
    startedWriting: '8 هـ (بعد إسلامه)',
    startedWritingEn: '8 AH (after his Islam)',
    notable: false,
  },
  {
    name: 'عمرو بن العاص', nameEn: "Amr ibn al-'As",
    role: 'كاتب ودبلوماسي',
    roleEn: 'Scribe and Diplomat',
    achievement: 'كتب رسائل النبي ﷺ للملوك وقاد السفارات الدبلوماسية، فاتح مصر لاحقاً.',
    achievementEn: 'Wrote the Prophet\'s ﷺ letters to kings and led diplomatic missions; later conqueror of Egypt.',
    startedWriting: '8 هـ (بعد إسلامه)',
    startedWritingEn: '8 AH (after his Islam)',
    notable: false,
  },
  {
    name: 'المغيرة بن شعبة', nameEn: "Al-Mughirah ibn Shu'bah",
    role: 'كاتب وسفير',
    roleEn: 'Scribe and Ambassador',
    achievement: 'كتب بعض رسائل النبي ﷺ وعُرف بالدهاء السياسي والفراسة.',
    achievementEn: 'Wrote some of the Prophet\'s ﷺ letters; renowned for his political shrewdness and discernment.',
    startedWriting: '6 هـ',
    startedWritingEn: '6 AH',
    notable: false,
  },
  {
    name: 'معاذ بن جبل', nameEn: 'Muadh ibn Jabal',
    role: 'كاتب وفقيه الأمة',
    roleEn: 'Scribe and Jurist of the Nation',
    achievement: 'قال ﷺ: «أعلم أمتي بالحلال والحرام معاذ». بعثه النبي ﷺ قاضياً ومعلماً لليمن.',
    achievementEn: 'The Prophet ﷺ said: "The most knowledgeable in lawful and unlawful matters is Muʿādh." Sent as judge and teacher to Yemen.',
    startedWriting: 'في المدينة',
    startedWritingEn: 'In Madinah',
    notable: false,
  },
  {
    name: 'جهيم بن الصلت', nameEn: 'Juhaym ibn al-Salt',
    role: 'كاتب رسائل',
    roleEn: 'Scribe of Letters',
    achievement: 'كتب للنبي ﷺ رسائله وكان من الكتّاب المهرة في عصره.',
    achievementEn: 'Wrote the Prophet\'s ﷺ letters and was among the skilled scribes of his era.',
    startedWriting: 'في المدينة',
    startedWritingEn: 'In Madinah',
    notable: false,
  },
  {
    name: 'بريدة بن الحصيب', nameEn: 'Buraydah ibn al-Husayb',
    role: 'كاتب وقائد سرية',
    roleEn: 'Scribe and Expedition Commander',
    achievement: 'كتب للنبي ﷺ وقاد سرايا وكان من الصحابة الأجلاء.',
    achievementEn: 'Wrote for the Prophet ﷺ, led expeditions, and was among the noble Companions.',
    startedWriting: 'بعد الهجرة',
    startedWritingEn: 'After the Hijrah',
    notable: false,
  },
  {
    name: 'الحصين بن النمير', nameEn: 'Al-Husayn ibn al-Numayr',
    role: 'كاتب رسائل',
    roleEn: 'Scribe of Letters',
    achievement: 'كتب بعض الرسائل النبوية الرسمية إلى القبائل والملوك.',
    achievementEn: 'Wrote some of the official Prophetic letters to tribes and kings.',
    startedWriting: 'في المدينة',
    startedWritingEn: 'In Madinah',
    notable: false,
  },
  {
    name: 'عبد الله بن سعد بن أبي سرح', nameEn: "Abdullah ibn Sa'd ibn Abi Sarh",
    role: 'كاتب وحي (ثم ارتدّ ثم تاب)',
    roleEn: 'Scribe of Revelation (then apostatized, then repented)',
    achievement: 'كان يكتب الوحي ثم ادّعى تحريفه وارتدّ، ثم أسلم يوم الفتح وعفا عنه النبي ﷺ وحسن إسلامه.',
    achievementEn: 'Wrote the revelation then claimed to have altered it and apostatized; embraced Islam on the Day of Conquest and the Prophet ﷺ pardoned him, and his Islam became sincere.',
    startedWriting: 'في المدينة',
    startedWritingEn: 'In Madinah',
    notable: false,
  },
];

const ScribesPage: React.FC = () => {
  const router = useRouter();
  const { isEn } = useLanguage();
  const [search, setSearch] = useState('');

  const filtered = SCRIBES.filter(s => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return isEn
      ? (s.name.includes(search) || s.roleEn.toLowerCase().includes(q) || s.achievementEn.toLowerCase().includes(q))
      : (s.name.includes(search) || s.role.includes(search) || s.achievement.includes(search));
  });

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share Button */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'Scribes of Revelation' : 'كتّاب الوحي'} accentColor="#C9A84C" />
      </div>

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 65 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${((i * 143.7) % 100).toFixed(1)}%`,
              top: `${((i * 87.5) % 100).toFixed(1)}%`,
              width: `${(1 + (i % 2) * 0.6).toFixed(1)}px`,
              height: `${(1 + (i % 2) * 0.6).toFixed(1)}px`,
              opacity: 0.2 + (i % 3) * 0.08,
            }}
          />
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="relative z-10 px-6 pt-20 pb-4" style={{ [isEn ? 'paddingLeft' : 'paddingRight']: '5rem' }}>
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
            <span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </button>
          <ChevronLeft size={10} className={isEn ? '' : 'rotate-180'} />
          <span className="text-islamic-gold/80">{isEn ? 'Scribes of Revelation' : 'كتّاب الوحي'}</span>
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
          <PenLine size={12} />
          {isEn ? `${SCRIBES.length} Scribes of Revelation` : `${SCRIBES.length} كاتبًا من كتّاب الوحي`}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-noto font-bold mb-4"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.8rem)',
            color: '#C9A84C',
            textShadow: '0 0 40px rgba(201,168,76,0.4)',
          }}
        >
          {isEn ? 'Scribes of Revelation' : 'كتّاب الوحي'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-noto text-white/55 max-w-lg mx-auto mb-1"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 2 }}
          dir="rtl"
        >
          ﴿ن ۚ وَالْقَلَمِ وَمَا يَسْطُرُونَ﴾
        </motion.p>
        {isEn && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="font-kufi text-white/35 max-w-lg mx-auto mb-4"
            style={{ fontSize: '0.82rem' }}
          >
            "Nūn. By the pen and what they inscribe." — Al-Qalam: 1
          </motion.p>
        )}
        {!isEn && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="font-noto text-white/35 max-w-lg mx-auto mb-4"
            style={{ fontSize: '0.85rem' }}
          >
            — القلم: 1
          </motion.p>
        )}

        {/* Chief scribe note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
          className="inline-block max-w-md mx-auto px-5 py-3 rounded-xl mb-6"
          style={{
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          <div className="flex items-center gap-2 justify-center">
            <Star size={12} className="text-islamic-gold" />
            <p className="font-kufi text-xs text-white/60">
              <span style={{ color: '#C9A84C' }}>زيد بن ثابت</span>
              {isEn
                ? ' — Chief Scribe of Revelation and Guardian of the Qurʾān by the Prophet\'s ﷺ command'
                : ' — كبير كتّاب الوحي وحافظ القرآن الكريم بأمر النبي ﷺ'}
            </p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="relative max-w-xs mx-auto"
        >
          <SearchIcon
            size={13}
            className={`absolute ${isEn ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-islamic-gold/40`}
          />
          <input
            type="text"
            placeholder={isEn ? 'Search scribes...' : 'ابحث عن كاتب...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full font-kufi text-sm text-white/75 py-2 rounded-full outline-none"
            style={{
              paddingRight: isEn ? '0.75rem' : '2rem',
              paddingLeft: isEn ? '2rem' : '0.75rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
          />
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-3 justify-center mt-6 opacity-25"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>
      </div>

      {/* Scribes Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 font-kufi text-white/30 text-sm"
          >
            {isEn ? 'No results found' : 'لا توجد نتائج للبحث'}
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((scribe, index) => (
            <motion.div
              key={scribe.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 * index }}
              whileHover={{ y: -5, scale: 1.015 }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: scribe.notable
                  ? 'rgba(201,168,76,0.06)'
                  : 'rgba(255,255,255,0.025)',
                border: scribe.notable
                  ? '1px solid rgba(201,168,76,0.35)'
                  : '1px solid rgba(201,168,76,0.12)',
                boxShadow: scribe.notable
                  ? '0 4px 32px rgba(0,0,0,0.5), 0 0 50px rgba(201,168,76,0.12)'
                  : '0 4px 20px rgba(0,0,0,0.4)',
              }}
            >
              {/* Top bar */}
              <div
                className="h-0.5"
                style={{
                  background: scribe.notable
                    ? 'linear-gradient(90deg, transparent, #C9A84C, transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
                }}
              />

              <div className="p-5">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  {/* Quill icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: 'rgba(201,168,76,0.1)',
                      border: '1px solid rgba(201,168,76,0.2)',
                    }}
                  >
                    <PenLine size={18} style={{ color: '#C9A84C' }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3
                        className="font-noto font-bold"
                        style={{
                          fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
                          color: '#C9A84C',
                          lineHeight: 1.4,
                        }}
                      >
                        {isEn ? scribe.nameEn : scribe.name}
                      </h3>
                      {scribe.notable && (
                        <span
                          className="flex items-center gap-1 font-kufi text-xs px-2 py-0.5 rounded-full shrink-0"
                          style={{
                            background: 'rgba(201,168,76,0.15)',
                            border: '1px solid rgba(201,168,76,0.3)',
                            color: '#C9A84C',
                          }}
                        >
                          <Star size={9} />
                          {isEn ? 'Chief Scribe' : 'كبير الكتّاب'}
                        </span>
                      )}
                    </div>
                    <p className="font-kufi text-white/45 mt-0.5 line-clamp-1" style={{ fontSize: '0.86rem' }}>
                      {isEn ? scribe.roleEn : scribe.role}
                    </p>
                  </div>
                </div>

                {/* Achievement */}
                <p
                  className="font-noto text-white/60 mb-4 line-clamp-3"
                  style={{ fontSize: 'clamp(0.78rem, 1.6vw, 0.88rem)', lineHeight: 1.9 }}
                >
                  {isEn ? scribe.achievementEn : scribe.achievement}
                </p>

                {/* Started writing */}
                <div
                  className="inline-flex items-center gap-1.5 font-kufi text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(201,168,76,0.06)',
                    border: '1px solid rgba(201,168,76,0.14)',
                    color: '#C9A84C',
                  }}
                >
                  <PenLine size={9} />
                  {isEn
                    ? `Started writing: ${scribe.startedWritingEn}`
                    : `بدأ الكتابة: ${scribe.startedWriting}`}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScribesPage;
