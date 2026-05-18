import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, Star } from 'lucide-react';

interface Companion {
  name: string;
  nickname: string;
  description: string;
  category: 'خلفاء' | 'أمهات المؤمنين' | 'صحابة';
}

const COMPANIONS: Companion[] = [
  {
    name: 'أبو بكر الصديق',
    nickname: 'الصديق',
    description: 'أول من صدّق النبي ﷺ من الرجال، وصاحبه في الغار، والخليفة الأول للمسلمين. عُرف بسخائه الفائق وحبّه لرسول الله ﷺ.',
    category: 'خلفاء',
  },
  {
    name: 'عمر بن الخطاب',
    nickname: 'الفاروق',
    description: 'عزّ الله به الإسلام وجرّأ المسلمين على الصلاة في المسجد الحرام. الخليفة الثاني وثاني العشرة المبشرين بالجنة.',
    category: 'خلفاء',
  },
  {
    name: 'عثمان بن عفان',
    nickname: 'ذو النورين',
    description: 'تزوّج بنتي النبي ﷺ وجمع القرآن الكريم في مصحف موحّد. الخليفة الثالث الذي وسّع المسجد النبوي وجهّز جيش العسرة.',
    category: 'خلفاء',
  },
  {
    name: 'علي بن أبي طالب',
    nickname: 'باب مدينة العلم',
    description: 'ابن عم النبي ﷺ وزوج فاطمة الزهراء. فارس الإسلام وأحد أشجع الصحابة. الخليفة الرابع ومن أكثر الصحابة علماً وفقهاً.',
    category: 'خلفاء',
  },
  {
    name: 'خديجة بنت خويلد',
    nickname: 'أم المؤمنين',
    description: 'أول من آمن بالنبي ﷺ من الرجال والنساء. دعمته بمالها ونفسها في أصعب مراحل الدعوة. قال فيها النبي ﷺ: "ما أبدلني الله خيراً منها."',
    category: 'أمهات المؤمنين',
  },
  {
    name: 'عائشة بنت أبي بكر',
    nickname: 'حبيبة النبي',
    description: 'أحبّ نساء النبي ﷺ إليه وعالمة الإسلام الكبرى. روت آلاف الأحاديث وكانت مرجعاً للصحابة في الفقه والسيرة.',
    category: 'أمهات المؤمنين',
  },
  {
    name: 'بلال بن رباح',
    nickname: 'مؤذن الإسلام',
    description: 'العبد الحبشي الذي عذّبه أمية بن خلف فصبر حتى اشتراه أبو بكر وأعتقه. أول مؤذن في الإسلام وأحب الأصوات إلى الله.',
    category: 'صحابة',
  },
  {
    name: 'خالد بن الوليد',
    nickname: 'سيف الله المسلول',
    description: 'أعظم قائد عسكري في الإسلام لم يُهزم في معركة واحدة. أسلم قبيل فتح مكة وخاض مئات المعارك في خدمة الإسلام.',
    category: 'صحابة',
  },
  {
    name: 'سلمان الفارسي',
    nickname: 'من أهل البيت',
    description: 'الفارسي الذي قطع آلاف الأميال بحثاً عن الحق حتى أسلم. صاحب فكرة حفر الخندق في غزوة الأحزاب وقال فيه النبي ﷺ: "سلمان منّا أهل البيت."',
    category: 'صحابة',
  },
  {
    name: 'أبو ذر الغفاري',
    nickname: 'أصدق لسان',
    description: 'من أوائل المسلمين الذين أعلنوا إسلامهم جهاراً في المسجد الحرام. قال فيه النبي ﷺ: "ما أظلّت الخضراء ولا أقلّت الغبراء من رجل أصدق لهجةً من أبي ذر."',
    category: 'صحابة',
  },
  {
    name: 'عبد الله بن مسعود',
    nickname: 'أقرب الناس لهدي النبي',
    description: 'من أعلم الصحابة بالقرآن وأقربهم هدياً وسمتاً من النبي ﷺ. أول من جهر بتلاوة القرآن في مكة أمام المشركين.',
    category: 'صحابة',
  },
  {
    name: 'أنس بن مالك',
    nickname: 'خادم النبي',
    description: 'خدم النبي ﷺ عشر سنوات من الهجرة حتى الوفاة. دعا له النبي ﷺ بالبركة فكثر ماله وولده. من أكثر الصحابة رواية للحديث.',
    category: 'صحابة',
  },
];

const categoryColor: Record<string, string> = {
  'خلفاء': '#C9A84C',
  'أمهات المؤمنين': '#E8A8C8',
  'صحابة': '#A8C8E8',
};

const CompanionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen"
      style={{ background: '#030813' }}
    >
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${((i * 137.5) % 100).toFixed(1)}%`,
              top: `${((i * 97.3) % 100).toFixed(1)}%`,
              width: `${(Math.random() * 1.5 + 0.5).toFixed(1)}px`,
              height: `${(Math.random() * 1.5 + 0.5).toFixed(1)}px`,
              opacity: 0.4,
              '--dur': `${(i % 3) + 2}s`,
              '--delay': `${(i % 5) * 0.8}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="relative z-10 px-6 pt-20 pb-4">
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
          <span className="text-islamic-gold/80">الصحابة الكرام</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full font-kufi text-xs"
          style={{
            background: 'rgba(201,168,76,0.1)',
            border: '1px solid rgba(201,168,76,0.3)',
            color: '#C9A84C',
          }}
        >
          <Star size={10} />
          أصحاب النبي ﷺ
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-noto font-bold mb-3"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            color: '#C9A84C',
            textShadow: '0 0 30px rgba(201,168,76,0.4)',
          }}
        >
          الصحابة الكرام
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-noto text-white/55 max-w-xl mx-auto"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: 1.9 }}
        >
          نخبة من خيرة البشر الذين آمنوا بالنبي ﷺ وجاهدوا معه وحملوا مشعل الإسلام للعالم
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center gap-3 justify-center mt-6 opacity-30"
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANIONS.map((companion, index) => (
            <motion.div
              key={companion.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="relative rounded-2xl overflow-hidden cursor-default"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,168,76,0.15)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              }}
            >
              {/* Top accent */}
              <div
                className="h-1 w-full"
                style={{
                  background: `linear-gradient(90deg, transparent, ${categoryColor[companion.category]}, transparent)`,
                }}
              />

              <div className="p-6">
                {/* Category badge */}
                <span
                  className="font-kufi text-xs px-3 py-1 rounded-full mb-4 inline-block"
                  style={{
                    background: `${categoryColor[companion.category]}15`,
                    border: `1px solid ${categoryColor[companion.category]}30`,
                    color: categoryColor[companion.category],
                  }}
                >
                  {companion.category}
                </span>

                {/* Name */}
                <h3
                  className="font-noto font-bold mb-1"
                  style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                    color: '#C9A84C',
                    textShadow: '0 0 15px rgba(201,168,76,0.2)',
                  }}
                >
                  {companion.name}
                </h3>

                {/* Nickname */}
                <p
                  className="font-kufi mb-3"
                  style={{
                    fontSize: '0.75rem',
                    color: `${categoryColor[companion.category]}80`,
                    letterSpacing: '0.05em',
                  }}
                >
                  {companion.nickname}
                </p>

                {/* Divider */}
                <div
                  className="w-12 h-px mb-3 opacity-30"
                  style={{ background: categoryColor[companion.category] }}
                />

                {/* Description */}
                <p
                  className="font-noto text-white/60 leading-relaxed"
                  style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)', lineHeight: 1.9 }}
                >
                  {companion.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanionsPage;
