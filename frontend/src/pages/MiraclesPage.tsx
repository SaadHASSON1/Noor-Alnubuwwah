import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, BookOpen, Moon, Droplets, ArrowUpCircle, TreePine, Eye, Flame, Utensils } from 'lucide-react';

interface Miracle {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  reference: string;
  color: string;
}

const MIRACLES: Miracle[] = [
  {
    icon: <BookOpen size={28} />,
    title: 'القرآن الكريم',
    subtitle: 'المعجزة الخالدة',
    description: 'أعظم معجزات النبي ﷺ وأبقاها. كتاب أعجز فصحاء العرب وبلغاءهم أن يأتوا بسورة من مثله. محفوظ بحفظ الله إلى يوم القيامة لم يتغيّر فيه حرف واحد منذ نزوله.',
    reference: '﴿إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ﴾ — الحجر: ٩',
    color: '#C9A84C',
  },
  {
    icon: <Moon size={28} />,
    title: 'شقّ القمر',
    subtitle: 'إصبعه يشقّ القمر',
    description: 'طلب كفار قريش آيةً فأشار النبي ﷺ بإصبعه إلى القمر فانشقّ فرقتين، وظلّ كذلك حتى رأى الناس جبل حراء بينهما. شهد بذلك حتى الكفار وقالوا: "سحر مستمر."',
    reference: '﴿اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ﴾ — القمر: ١',
    color: '#A8C8E8',
  },
  {
    icon: <Droplets size={28} />,
    title: 'نبع الماء من أصابعه',
    subtitle: 'في غزوة الحديبية وغيرها',
    description: 'في مواضع متعددة نبع الماء من بين أصابع النبي ﷺ ليروي آلاف الصحابة وركابهم. ففي غزوة الحديبية بضع عشرة ألفاً توضّأوا وشربوا من ماء نبع بين يديه ﷺ.',
    reference: 'صحيح البخاري — كتاب المناقب: "رأيت الماء ينبع من بين أصابع رسول الله ﷺ"',
    color: '#A8E8C8',
  },
  {
    icon: <ArrowUpCircle size={28} />,
    title: 'الإسراء والمعراج',
    subtitle: 'رحلة ما فوق السماوات',
    description: 'أُسري بالنبي ﷺ ليلاً من المسجد الحرام إلى المسجد الأقصى، ثم عُرج به إلى السماوات السبع فصلّى بالأنبياء إماماً، ورأى الجنة والنار، وكلّمه الله تعالى وفرضت عليه الصلوات الخمس.',
    reference: '﴿سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى﴾ — الإسراء: ١',
    color: '#E8C8A8',
  },
  {
    icon: <TreePine size={28} />,
    title: 'حديث الشجر والحجر',
    subtitle: 'يشهدان بالنبوة',
    description: 'كانت الأشجار والأحجار تسلّم على النبي ﷺ وتشهد بنبوّته. وكانت جذع نخلة يبكي كالطفل حين تركه النبي ﷺ حتى نزل وضمّه بيديه فسكن. قال الصحابة: "سمعنا الجذع يحنّ."',
    reference: 'صحيح البخاري — كتاب المناقب: "فحنّ الجذع حنين الناقة"',
    color: '#C8E8A8',
  },
  {
    icon: <Eye size={28} />,
    title: 'إخبار الغيب',
    subtitle: 'أخبار تحققت بدقة',
    description: 'أخبر النبي ﷺ عن أحداث غيبية تحققت بعد وفاته بمئات السنين كفتح القسطنطينية وفارس والروم، وظهور الفتن، وعلامات الساعة. كل ذلك تحقّق بدقة فائقة لا يملكها إلا نبي.',
    reference: '﴿وَمَا يَنطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ﴾ — النجم: ٣-٤',
    color: '#E8A8C8',
  },
  {
    icon: <Flame size={28} />,
    title: 'شفاء عين علي في خيبر',
    subtitle: 'بريق النبي ﷺ',
    description: 'كان علي بن أبي طالب رضي الله عنه مصاباً بالرمد يوم خيبر. فبصق النبي ﷺ في عينيه ومسح عليهما فبرأ كأن لم يكن به شيء. ثم أعطاه الراية وفتح الله عليه خيبر بعدها بساعات.',
    reference: 'صحيح البخاري — كتاب المغازي: "فبصق في عينيه فبرأ من ساعته"',
    color: '#F0C060',
  },
  {
    icon: <Utensils size={28} />,
    title: 'طعام يمدّ جيشاً بأكمله',
    subtitle: 'خبز أم سليم في غزوة تبوك',
    description: 'في غزوة تبوك أتت أم سليم بخبز يسير، فأمر النبي ﷺ بفتح الجُرُب وتفريقها على الجيش وبلغ نحو ثلاثمائة رجل أو يزيدون. وأكلوا جميعاً حتى شبعوا وبقي طعام.',
    reference: 'صحيح البخاري — كتاب المناقب: "فأكل منه ثلاثون وثلاثمائة حتى شبعوا"',
    color: '#A8D8B0',
  },
];

const MiraclesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen"
      style={{ background: '#030813' }}
    >
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 70 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${((i * 113.7) % 100).toFixed(1)}%`,
              top: `${((i * 83.1) % 100).toFixed(1)}%`,
              width: `${(1 + (i % 2) * 0.8).toFixed(1)}px`,
              height: `${(1 + (i % 2) * 0.8).toFixed(1)}px`,
              opacity: 0.3 + (i % 3) * 0.1,
            }}
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
          <span className="text-islamic-gold/80">معجزاته ﷺ</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-noto font-bold mb-3"
          style={{
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            color: '#C9A84C',
            textShadow: '0 0 30px rgba(201,168,76,0.4)',
          }}
        >
          معجزاته ﷺ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-noto text-white/55 max-w-xl mx-auto"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: 1.9 }}
        >
          آيات الله البيّنة التي أيّد بها نبيّه ﷺ برهاناً على صدق نبوّته ورسالته للعالمين
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-3 justify-center mt-6 opacity-30"
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>
      </div>

      {/* Miracles Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MIRACLES.map((miracle, index) => (
            <motion.div
              key={miracle.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 * index }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${miracle.color}20`,
                boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 30px ${miracle.color}08`,
              }}
            >
              {/* Gradient top */}
              <div
                className="h-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${miracle.color}, transparent)`,
                }}
              />

              <div className="p-5">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `${miracle.color}12`,
                    border: `1px solid ${miracle.color}25`,
                    color: miracle.color,
                  }}
                >
                  {miracle.icon}
                </div>

                {/* Title */}
                <h3
                  className="font-noto font-bold mb-1"
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                    color: miracle.color,
                  }}
                >
                  {miracle.title}
                </h3>

                {/* Subtitle */}
                <p
                  className="font-kufi mb-3 opacity-60"
                  style={{
                    fontSize: '0.7rem',
                    color: miracle.color,
                    letterSpacing: '0.04em',
                  }}
                >
                  {miracle.subtitle}
                </p>

                {/* Description */}
                <p
                  className="font-noto text-white/55 mb-4"
                  style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.85rem)', lineHeight: 1.9 }}
                >
                  {miracle.description}
                </p>

                {/* Reference */}
                <div
                  className="text-xs font-noto p-2 rounded-lg"
                  style={{
                    background: `${miracle.color}08`,
                    border: `1px solid ${miracle.color}18`,
                    color: `${miracle.color}80`,
                    lineHeight: 1.7,
                  }}
                >
                  {miracle.reference}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiraclesPage;
