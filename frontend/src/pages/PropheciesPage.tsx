import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, Search as SearchIcon, CheckCircle, ArrowLeft } from 'lucide-react';
import ShareButton from '../components/ShareButton';

interface Prophecy {
  title: string;
  prophesied: string;
  fulfilled: string;
  hadith: string;
  source: string;
  detail: string;
}

const PROPHECIES: Prophecy[] = [
  {
    title: 'فتح القسطنطينية',
    prophesied: '~628م',
    fulfilled: '1453م',
    hadith: '«لَتُفْتَحَنَّ الْقُسْطَنْطِينِيَّةُ، فَلَنِعْمَ الْأَمِيرُ أَمِيرُهَا، وَلَنِعْمَ الْجَيْشُ ذَلِكَ الْجَيْشُ»',
    source: 'مسند أحمد — صحّحه الألباني',
    detail: 'فتحها السلطان محمد الفاتح عام 1453م بعد أكثر من ثمانمائة سنة من النبوة.',
  },
  {
    title: 'فتح فارس والروم',
    prophesied: '~627م',
    fulfilled: '637–641م',
    hadith: '«إِذَا هَلَكَ كِسْرَى فَلَا كِسْرَى بَعْدَهُ، وَإِذَا هَلَكَ قَيْصَرُ فَلَا قَيْصَرَ بَعْدَهُ»',
    source: 'صحيح البخاري — كتاب الجزية',
    detail: 'فُتحت فارس في زمن عمر، وانهارت الإمبراطورية الرومانية الشرقية في الشام ومصر.',
  },
  {
    title: 'الفتنة بين المسلمين ومقتل عثمان',
    prophesied: '~645م',
    fulfilled: '656م',
    hadith: '«إِنَّهُ سَتَكُونُ فِتْنَةٌ، الْقَاعِدُ فِيهَا خَيْرٌ مِنَ الْقَائِمِ، وَالْقَائِمُ خَيْرٌ مِنَ الْمَاشِي»',
    source: 'صحيح البخاري — كتاب الفتن',
    detail: 'تحقق بمقتل عثمان بن عفان رضي الله عنه وما تبعه من الفتن الكبرى.',
  },
  {
    title: 'كثرة المال حتى لا يقبله أحد',
    prophesied: '~630م',
    fulfilled: 'عهد عمر بن عبد العزيز',
    hadith: '«لَا تَقُومُ السَّاعَةُ حَتَّى يَكْثُرَ الْمَالُ وَيَفِيضَ، حَتَّى يَخْرُجَ الرَّجُلُ بِزَكَاةِ مَالِهِ فَلَا يَجِدُ أَحَدًا يَقْبَلُهَا»',
    source: 'صحيح البخاري — كتاب الزكاة',
    detail: 'وقع هذا بالفعل في خلافة عمر بن عبد العزيز حين بحث عماله عمن يقبل الزكاة فلم يجدوا.',
  },
  {
    title: 'ظهور الفحش وانتشاره',
    prophesied: '~632م',
    fulfilled: 'العصر الحديث',
    hadith: '«لَمْ تَظْهَرِ الْفَاحِشَةُ فِي قَوْمٍ قَطُّ حَتَّى يُعْلِنُوا بِهَا إِلَّا فَشَا فِيهِمُ الطَّاعُونُ وَالْأَوْجَاعُ»',
    source: 'سنن ابن ماجه — صحّحه الألباني',
    detail: 'تحقق بانتشار الفاحشة علنًا في وسائل الإعلام والفضاء الإلكتروني وما تبعه من أوبئة.',
  },
  {
    title: 'انتشار الربا',
    prophesied: '~632م',
    fulfilled: 'العصر الحديث',
    hadith: '«لَيَأْتِيَنَّ عَلَى النَّاسِ زَمَانٌ لَا يَبْقَى أَحَدٌ إِلَّا أَكَلَ الرِّبَا، فَإِنْ لَمْ يَأْكُلْهُ أَصَابَهُ مِنْ غُبَارِهِ»',
    source: 'سنن أبي داود والنسائي — صحّحه الألباني',
    detail: 'انتشر الربا في البنوك والمعاملات العالمية حتى بات يكاد لا يخلو منه اقتصاد.',
  },
  {
    title: 'التطاول في بناء المساجد',
    prophesied: '~620م',
    fulfilled: 'العصر الحديث',
    hadith: '«مِنْ أَشْرَاطِ السَّاعَةِ أَنْ يَتَبَاهَى النَّاسُ فِي الْمَسَاجِدِ»',
    source: 'سنن أبي داود والنسائي وابن ماجه — صحيح',
    detail: 'نرى اليوم مسابقة المدن والدول في بناء أفخم المساجد وأكثرها زخرفةً.',
  },
  {
    title: 'قتال الترك',
    prophesied: '~630م',
    fulfilled: '~1218–1258م',
    hadith: '«لَا تَقُومُ السَّاعَةُ حَتَّى تُقَاتِلُوا التُّرْكَ، صِغَارَ الْأَعْيُنِ، حُمْرَ الْوُجُوهِ، ذُلْفَ الْأُنُوفِ»',
    source: 'صحيح البخاري ومسلم — كتاب الفتن',
    detail: 'قاتل المسلمون المغول الترك وتحقق وصف النبي ﷺ الدقيق لصفاتهم.',
  },
  {
    title: 'نار الحجاز تُضيء أعناق الإبل ببُصرى',
    prophesied: '~630م',
    fulfilled: '654هـ / 1256م',
    hadith: '«لَا تَقُومُ السَّاعَةُ حَتَّى تَخْرُجَ نَارٌ مِنْ أَرْضِ الْحِجَازِ تُضِيءُ أَعْنَاقَ الْإِبِلِ بِبُصْرَى»',
    source: 'صحيح البخاري ومسلم',
    detail: 'ثار بركان المدينة عام 654هـ وامتدت حممه أميالاً وظلت مضيئةً كما وصف ﷺ.',
  },
  {
    title: 'اتخاذ القبور مساجد',
    prophesied: '~632م',
    fulfilled: 'القرن الأول الهجري فما بعده',
    hadith: '«لَعَنَ اللَّهُ الْيَهُودَ وَالنَّصَارَى اتَّخَذُوا قُبُورَ أَنْبِيَائِهِمْ مَسَاجِدَ»، قَالَتْ عَائِشَةُ: يُحَذِّرُ مَا صَنَعُوا',
    source: 'صحيح البخاري ومسلم',
    detail: 'تحقق هذا في أقوام كثيرة بنوا الأضرحة والمشاهد على القبور.',
  },
  {
    title: 'وفاة النبي ﷺ بمرض لا بقتل',
    prophesied: 'في مرضه',
    fulfilled: '12 ربيع الأول 11هـ',
    hadith: '«مَا مِنْ نَبِيٍّ إِلَّا وَقَدْ أُعْطِيَ الِاخْتِيَارَ بَيْنَ الدُّنْيَا وَالْآخِرَةِ، وَإِنِّي أَخْتَرْتُ الْآخِرَةَ»',
    source: 'صحيح البخاري — كتاب المغازي',
    detail: 'أخبر ﷺ قبل وفاته أنه سيتوفى بمرض لا بسيف وتحقق ذلك تمامًا.',
  },
  {
    title: 'حفاة عراة يتطاولون في البنيان',
    prophesied: '~620م (حديث جبريل)',
    fulfilled: 'العصر الحديث',
    hadith: '«أَنْ تَرَى الْحُفَاةَ الْعُرَاةَ الْعَالَةَ رِعَاءَ الشَّاءِ يَتَطَاوَلُونَ فِي الْبُنْيَانِ»',
    source: 'صحيح مسلم — حديث جبريل الشهير',
    detail: 'تحقق بدول الخليج التي كانت صحراء فأصبحت تمتلك أعلى الأبراج في العالم.',
  },
  {
    title: 'كثرة القتل حتى لا يعرف القاتل فيم قتل',
    prophesied: '~632م',
    fulfilled: 'العصور المتأخرة',
    hadith: '«لَا تَقُومُ السَّاعَةُ حَتَّى يَكْثُرَ الْهَرْجُ». قَالُوا: وَمَا الْهَرْجُ؟ قَالَ: «الْقَتْلُ، الْقَتْلُ»',
    source: 'صحيح البخاري ومسلم — كتاب الفتن',
    detail: 'نُفِّذ هذا في القرن العشرين بالحروب العالمية والأهلية التي قتلت الملايين.',
  },
  {
    title: 'ظهور الكذابين المدّعين للنبوة',
    prophesied: '~632م',
    fulfilled: 'منذ عهد أبي بكر فإلى اليوم',
    hadith: '«لَا تَقُومُ السَّاعَةُ حَتَّى يُبْعَثَ دَجَّالُونَ كَذَّابُونَ، قَرِيبٌ مِنْ ثَلَاثِينَ»',
    source: 'صحيح البخاري ومسلم — كتاب الفتن',
    detail: 'ظهر مسيلمة الكذاب وطليحة والعجلي والأسود العنسي وغيرهم فور وفاة النبي ﷺ.',
  },
  {
    title: 'انتشار الجهل ورفع العلم',
    prophesied: '~632م',
    fulfilled: 'مستمر',
    hadith: '«إِنَّ مِنْ أَشْرَاطِ السَّاعَةِ أَنْ يُرْفَعَ الْعِلْمُ وَيَثْبُتَ الْجَهْلُ، وَيُشْرَبَ الْخَمْرُ، وَيَظْهَرَ الزِّنَا»',
    source: 'صحيح البخاري — كتاب العلم',
    detail: 'يتحقق بموت العلماء الربانيين وشيوع الجهل الديني مع كثرة المعلومات الدنيوية.',
  },
];

const PropheciesPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = PROPHECIES.filter(p =>
    !search.trim() ||
    p.title.includes(search) ||
    p.detail.includes(search) ||
    p.source.includes(search)
  );

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: '#030813' }}>
      {/* زر المشاركة */}
      <div className="fixed top-[72px] left-4 z-[60]">
        <ShareButton title="نبوءات تحققت" accentColor="#C9A84C" />
      </div>
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${((i * 137.5) % 100).toFixed(1)}%`,
              top: `${((i * 91.3) % 100).toFixed(1)}%`,
              width: `${(1 + (i % 2) * 0.7).toFixed(1)}px`,
              height: `${(1 + (i % 2) * 0.7).toFixed(1)}px`,
              opacity: 0.25 + (i % 3) * 0.1,
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
          <span className="text-islamic-gold/80">دلائل النبوة</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 font-kufi text-xs"
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            color: '#C9A84C',
          }}
        >
          <CheckCircle size={12} />
          {PROPHECIES.length} نبوءة تحققت
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-noto font-bold mb-3"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.8rem)',
            color: '#C9A84C',
            textShadow: '0 0 40px rgba(201,168,76,0.35)',
          }}
        >
          دلائل النبوة
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="font-noto text-white/40 text-sm mb-2"
          style={{ fontStyle: 'italic' }}
        >
          النبوءات التي تحققت
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-noto text-white/60 max-w-lg mx-auto mb-6"
          style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', lineHeight: 2 }}
        >
          ﴿وَمَا يَنطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ﴾
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative max-w-xs mx-auto mt-4"
        >
          <SearchIcon size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-islamic-gold/40" />
          <input
            type="text"
            placeholder="ابحث عن نبوءة..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full font-kufi text-sm text-white/75 pr-8 pl-3 py-2 rounded-full outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}
          />
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

      {/* Timeline */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        {/* Vertical line */}
        <div
          className="absolute right-1/2 top-0 bottom-0 w-px hidden md:block"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.2), transparent)' }}
        />

        <div className="space-y-8">
          {filtered.map((prophecy, index) => (
            <motion.div
              key={prophecy.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.07 * index }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(201,168,76,0.15)',
                boxShadow: '0 4px 32px rgba(0,0,0,0.5), 0 0 40px rgba(201,168,76,0.04)',
              }}
            >
              {/* Top gold bar */}
              <div className="h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C60, transparent)' }} />

              <div className="p-6">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <h3
                    className="font-noto font-bold"
                    style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', color: '#C9A84C' }}
                  >
                    {prophecy.title}
                  </h3>

                  {/* Badge */}
                  <span
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full font-kufi text-xs font-semibold shrink-0"
                    style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}
                  >
                    <CheckCircle size={11} />
                    تحقق
                  </span>
                </div>

                {/* Timeline arrow */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span
                    className="font-kufi text-xs px-3 py-1 rounded-lg"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.18)', color: '#C9A84C' }}
                  >
                    قيلت: {prophecy.prophesied}
                  </span>
                  <ArrowLeft size={14} className="text-islamic-gold/40 rotate-180" />
                  <span
                    className="font-kufi text-xs px-3 py-1 rounded-lg"
                    style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', color: '#4ade80' }}
                  >
                    تحققت: {prophecy.fulfilled}
                  </span>
                </div>

                {/* Hadith */}
                <div
                  className="rounded-xl p-4 mb-4"
                  style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}
                >
                  <p
                    className="font-noto text-white/80"
                    style={{ fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)', lineHeight: 2.1, fontStyle: 'italic' }}
                  >
                    {prophecy.hadith}
                  </p>
                </div>

                {/* Detail */}
                <p
                  className="font-noto text-white/55 mb-3"
                  style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.88rem)', lineHeight: 1.9 }}
                >
                  {prophecy.detail}
                </p>

                {/* Source */}
                <div
                  className="inline-block font-kufi text-xs px-3 py-1 rounded-full"
                  style={{ background: 'rgba(201,168,76,0.06)', color: 'rgba(201,168,76,0.6)', border: '1px solid rgba(201,168,76,0.12)' }}
                >
                  {prophecy.source}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 font-kufi text-white/30 text-sm"
          >
            لا توجد نتائج للبحث
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PropheciesPage;
