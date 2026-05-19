import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, PenLine, Star, Search as SearchIcon } from 'lucide-react';
import ShareButton from '../components/ShareButton';

interface Scribe {
  name: string;
  role: string;
  achievement: string;
  startedWriting: string;
  notable: boolean; // chief scribe highlight
}

const SCRIBES: Scribe[] = [
  {
    name: 'زيد بن ثابت',
    role: 'كبير كتّاب الوحي',
    achievement: 'حفظ القرآن كاملاً وتولّى جمعه في عهد أبي بكر ثم نسخه في عهد عثمان. تعلّم السريانية والعبرية بأمر النبي ﷺ في سبعة عشر يوماً.',
    startedWriting: '٥ هـ',
    notable: true,
  },
  {
    name: 'أبو بكر الصديق',
    role: 'كاتب وحي وشريك نبوة',
    achievement: 'أقرب الناس إلى النبي ﷺ، كان يكتب بعض الوحي ورسائل النبي ﷺ.',
    startedWriting: 'مبكراً',
    notable: false,
  },
  {
    name: 'عمر بن الخطاب',
    role: 'كاتب وحي ورسائل',
    achievement: 'كتب الوحي ورسائل النبي ﷺ، وكان له دور في جمع القرآن إذ هو أول من أشار بذلك.',
    startedWriting: 'بعد إسلامه ٦ هـ ق.هـ',
    notable: false,
  },
  {
    name: 'عثمان بن عفان',
    role: 'كاتب وحي وجامع القرآن',
    achievement: 'كتب الوحي وأشرف لاحقاً على المصحف الإمام الذي أُرسلت نسخه لعواصم المسلمين.',
    startedWriting: 'مبكراً',
    notable: false,
  },
  {
    name: 'علي بن أبي طالب',
    role: 'كاتب وحي ورسائل',
    achievement: 'من أوائل الكتّاب وأعلمهم بالقرآن، كتب صحيفة الصلح في الحديبية.',
    startedWriting: 'مبكراً',
    notable: false,
  },
  {
    name: 'أُبيّ بن كعب',
    role: 'كاتب وحي وحافظ',
    achievement: 'من أعلم الصحابة بالقرآن وأجودهم في القراءة. قال عنه النبي ﷺ: «أقرأ أمتي أُبيّ».',
    startedWriting: 'بعد الهجرة',
    notable: false,
  },
  {
    name: 'معاوية بن أبي سفيان',
    role: 'كاتب وحي',
    achievement: 'من أكثر الصحابة كتابةً للوحي، قال له النبي ﷺ: «اللهم علّمه الكتابة والحساب».',
    startedWriting: '٨ هـ (بعد الفتح)',
    notable: false,
  },
  {
    name: 'عبد الله بن مسعود',
    role: 'كاتب وحافظ قرآن',
    achievement: 'أول من جهر بقراءة القرآن في مكة. قال ﷺ: «من أراد أن يقرأ القرآن غضاً فليقرأه على ابن أم عبد».',
    startedWriting: 'مبكراً في مكة',
    notable: false,
  },
  {
    name: 'الزبير بن العوام',
    role: 'كاتب وحي ورسائل',
    achievement: 'ابن عمة النبي ﷺ وحواريّه، كتب بعض المراسلات النبوية.',
    startedWriting: 'بعد الهجرة',
    notable: false,
  },
  {
    name: 'خالد بن سعيد بن العاص',
    role: 'كاتب وحي مبكر',
    achievement: 'من أوائل من كتبوا الوحي، أسلم قبل كثيرين وكان يكتب للنبي ﷺ في فجر الإسلام.',
    startedWriting: 'مبكراً في مكة',
    notable: false,
  },
  {
    name: 'أبان بن سعيد بن العاص',
    role: 'كاتب وحي',
    achievement: 'أخو خالد بن سعيد، كتب للنبي ﷺ وكان من الكتّاب النشطين.',
    startedWriting: 'بعد الهجرة',
    notable: false,
  },
  {
    name: 'حنظلة الأسيدي',
    role: 'كاتب وحي وشهيد',
    achievement: '«غسيل الملائكة» — استُشهد في أُحد وقد خرج من عرسه مباشرةً إلى المعركة فغسّلته الملائكة.',
    startedWriting: 'في المدينة',
    notable: false,
  },
  {
    name: 'العلاء بن الحضرمي',
    role: 'كاتب ورسول',
    achievement: 'بعثه النبي ﷺ والياً على البحرين وكاتباً لرسائله السياسية.',
    startedWriting: 'بعد الهجرة',
    notable: false,
  },
  {
    name: 'شرحبيل بن حسنة',
    role: 'كاتب رسائل وقائد',
    achievement: 'كتب رسائل النبي ﷺ إلى الملوك والأمراء، وأبلى بلاءً حسناً في فتوح الشام.',
    startedWriting: 'في المدينة',
    notable: false,
  },
  {
    name: 'عبد الله بن رواحة',
    role: 'كاتب وشاعر النبي ﷺ',
    achievement: 'شاعر النبي ﷺ المدافع عنه بلسانه وسيفه، استُشهد في غزوة مؤتة أميراً.',
    startedWriting: 'في المدينة',
    notable: false,
  },
  {
    name: 'خالد بن الوليد',
    role: 'كاتب ورسائل',
    achievement: 'سيف الله المسلول، كتب بعض رسائل النبي ﷺ العسكرية والدبلوماسية.',
    startedWriting: '٨ هـ (بعد إسلامه)',
    notable: false,
  },
  {
    name: 'عمرو بن العاص',
    role: 'كاتب ودبلوماسي',
    achievement: 'كتب رسائل النبي ﷺ للملوك وقاد السفارات الدبلوماسية، فاتح مصر لاحقاً.',
    startedWriting: '٨ هـ (بعد إسلامه)',
    notable: false,
  },
  {
    name: 'المغيرة بن شعبة',
    role: 'كاتب وسفير',
    achievement: 'كتب بعض رسائل النبي ﷺ وعُرف بالدهاء السياسي والفراسة.',
    startedWriting: '٦ هـ',
    notable: false,
  },
  {
    name: 'معاذ بن جبل',
    role: 'كاتب وفقيه الأمة',
    achievement: 'قال ﷺ: «أعلم أمتي بالحلال والحرام معاذ». بعثه النبي ﷺ قاضياً ومعلماً لليمن.',
    startedWriting: 'في المدينة',
    notable: false,
  },
  {
    name: 'جهيم بن الصلت',
    role: 'كاتب رسائل',
    achievement: 'كتب للنبي ﷺ رسائله وكان من الكتّاب المهرة في عصره.',
    startedWriting: 'في المدينة',
    notable: false,
  },
  {
    name: 'بريدة بن الحصيب',
    role: 'كاتب وقائد سرية',
    achievement: 'كتب للنبي ﷺ وقاد سرايا وكان من الصحابة الأجلاء.',
    startedWriting: 'بعد الهجرة',
    notable: false,
  },
  {
    name: 'الحصين بن النمير',
    role: 'كاتب رسائل',
    achievement: 'كتب بعض الرسائل النبوية الرسمية إلى القبائل والملوك.',
    startedWriting: 'في المدينة',
    notable: false,
  },
  {
    name: 'عبد الله بن سعد بن أبي سرح',
    role: 'كاتب وحي (ثم ارتدّ ثم تاب)',
    achievement: 'كان يكتب الوحي ثم ادّعى تحريفه وارتدّ، ثم أسلم يوم الفتح وعفا عنه النبي ﷺ وحسن إسلامه.',
    startedWriting: 'في المدينة',
    notable: false,
  },
];

const ScribesPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = SCRIBES.filter(s =>
    !search.trim() ||
    s.name.includes(search) ||
    s.role.includes(search) ||
    s.achievement.includes(search)
  );

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: '#030813' }}>
      {/* زر المشاركة */}
      <div className="fixed top-4 left-4 z-[60]">
        <ShareButton title="كتّاب الوحي" accentColor="#C9A84C" />
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
      <div className="relative z-10 px-6 pt-20 pb-4" style={{ paddingRight: '5rem' }}>
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs text-islamic-gold/50"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 hover:text-islamic-gold transition-colors"
          >
            <Home size={12} />
            <span>الرئيسية</span>
          </button>
          <ChevronLeft size={10} className="rotate-180" />
          <span className="text-islamic-gold/80">كتّاب الوحي</span>
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
          {SCRIBES.length} كاتبًا من كتّاب الوحي
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
          كتّاب الوحي
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-noto text-white/55 max-w-lg mx-auto mb-4"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 2 }}
        >
          ﴿ن ۚ وَالْقَلَمِ وَمَا يَسْطُرُونَ﴾ — القلم: ١
        </motion.p>

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
              <span style={{ color: '#C9A84C' }}>زيد بن ثابت</span> — كبير كتّاب الوحي وحافظ القرآن الكريم بأمر النبي ﷺ
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
          <SearchIcon size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-islamic-gold/40" />
          <input
            type="text"
            placeholder="ابحث عن كاتب..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full font-kufi text-sm text-white/75 pr-8 pl-3 py-2 rounded-full outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}
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
            لا توجد نتائج للبحث
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
                        {scribe.name}
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
                          كبير الكتّاب
                        </span>
                      )}
                    </div>
                    <p className="font-kufi text-white/45 mt-0.5" style={{ fontSize: '0.86rem' }}>
                      {scribe.role}
                    </p>
                  </div>
                </div>

                {/* Achievement */}
                <p
                  className="font-noto text-white/60 mb-4"
                  style={{ fontSize: 'clamp(0.78rem, 1.6vw, 0.88rem)', lineHeight: 1.9 }}
                >
                  {scribe.achievement}
                </p>

                {/* Started writing */}
                <div
                  className="inline-flex items-center gap-1.5 font-kufi text-xs px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(201,168,76,0.06)',
                    border: '1px solid rgba(201,168,76,0.14)',
                    color: 'rgba(201,168,76,0.65)',
                  }}
                >
                  <PenLine size={9} />
                  بدأ الكتابة: {scribe.startedWriting}
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
