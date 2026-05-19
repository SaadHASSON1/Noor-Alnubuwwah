import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, BookOpen, Moon, Droplets, ArrowUpCircle, TreePine, Eye, Flame, Utensils, Wind, Heart, Star, Zap, Cloud, Fish, Volume2, Shield, Search as SearchIcon, Sun, Bird, Waves, X } from 'lucide-react';
import ShareButton from '../components/ShareButton';

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
  {
    icon: <Volume2 size={28} />,
    title: 'حنين الجذع',
    subtitle: 'جذع النخلة يبكي فراقه ﷺ',
    description: 'كان النبي ﷺ يخطب متكئاً على جذع نخلة. فلما صنع له المنبر تحوّل إليه، فحنّ الجذع حنين الناقة حتى سمعه أهل المسجد وهو يبكي. فنزل النبي ﷺ ومسح عليه حتى سكت.',
    reference: 'صحيح البخاري — كتاب المناقب: "فحنّ الجذع حنين الصبي"',
    color: '#D4A870',
  },
  {
    icon: <Star size={28} />,
    title: 'شهادة الذئب بنبوّته',
    subtitle: 'الذئب يتكلم فيشهد للنبي ﷺ',
    description: 'بينما راعٍ يسوق غنمه إذ اعترضه ذئب وأخذ شاةً، فاسترجعها الراعي، فقال الذئب: "من لها يوم السبع يوم لا راعي لها غيري؟" ثم قال: "إن محمداً بيثرب نبيٌّ." فأسلم الراعي.',
    reference: 'صحيح مسلم — كتاب الفتن، حديث أبي سعيد الخدري',
    color: '#9CA3AF',
  },
  {
    icon: <Fish size={28} />,
    title: 'تكثير طعام جابر',
    subtitle: 'طعام قليل يكفي ألفاً',
    description: 'في غزوة الخندق جاء جابر بن عبدالله بشاة وصاع من شعير. فأمر النبي ﷺ بطحن الشعير وطبخ اللحم. ثم دعا الناس ودخلوا عشرةً عشرة يأكلون حتى أكل ألف رجل وبقي طعام.',
    reference: 'صحيح البخاري — كتاب المناقب: "ثم بارك فيه فأكل منه ألف رجل"',
    color: '#60A5FA',
  },
  {
    icon: <Cloud size={28} />,
    title: 'السحابة تُظلّله',
    subtitle: 'الغمامة ترافقه في طريق الشام',
    description: 'شهد الراهب بحيرى حين رأى القافلة التي فيها الصبي محمد ﷺ قبل النبوة أن غمامةً كانت تظلّله وتتحرك معه. وكان هذا أحد الأدلة التي جعلت بحيرى يُقرّ له بالنبوة القادمة.',
    reference: 'السيرة النبوية لابن هشام، ودلائل النبوة للبيهقي',
    color: '#BAE6FD',
  },
  {
    icon: <Droplets size={28} />,
    title: 'نبع بئر الحديبية',
    subtitle: 'أمر بسهمه فنبع الماء',
    description: 'في الحديبية نضب ماء البئر فأعطى النبي ﷺ سهمه لأحد الصحابة فغرزه في البئر، ففارت بالماء حتى رويَ الناس جميعاً وملأوا أسقيتهم وكانوا ألفاً وأربعمائة.',
    reference: 'صحيح البخاري — كتاب المناقب: "فجاشت البئر بالرواء"',
    color: '#67E8F9',
  },
  {
    icon: <Shield size={28} />,
    title: 'الذراع المسمومة تُحذّره',
    subtitle: 'في خيبر — اللحم يكلّمه',
    description: 'أهدت امرأة يهودية للنبي ﷺ شاةً مسمومة بعد خيبر. فلما مدّ يده ليأكل من الذراع أخبره الله أن فيها سماً. فسأل المرأة فاعترفت. وقال: "ما كان الله ليُسلّطك عليّ."',
    reference: 'صحيح البخاري — كتاب المغازي: "أن الذراع قالت إنها مسمومة"',
    color: '#6EE7B7',
  },
  {
    icon: <Eye size={28} />,
    title: 'وصف المسجد الأقصى',
    subtitle: 'يصفه من ذاكرته بدقة مذهلة',
    description: 'حين كذّبه المشركون في حادثة الإسراء طلبوا أن يصف لهم المسجد الأقصى وهو لم يكن رآه قط بعينيه. فجلاه الله أمامه فوصفه بدقة كاملة حتى شهد من رآه أنه وصفه تماماً.',
    reference: 'صحيح البخاري — كتاب المناقب: "فجلاه الله له فجعل يصفه وينظر إليه"',
    color: '#FDE68A',
  },
  {
    icon: <TreePine size={28} />,
    title: 'الشجرة تأتيه حين دعاها',
    subtitle: 'شاهد من الأرض',
    description: 'قال رجل للنبي ﷺ: ائتني بآية. فقال: "تلك الشجرة — ادعها." فدعاها فجاءت تخطّ الأرض حتى وقفت بين يديه. ثم قال لها: "ارجعي" فرجعت. فأسلم الرجل.',
    reference: 'دلائل النبوة للبيهقي، والسيرة الحلبية بإسناد حسن',
    color: '#86EFAC',
  },
  {
    icon: <Sun size={28} />,
    title: 'استسقاؤه فيُمطر',
    subtitle: 'يرفع يديه فيجيب الله فوراً',
    description: 'صعد النبي ﷺ المنبر واشتكى الناس القحط. فرفع يديه يدعو فأقبلت السحاب من كل جهة حتى أمطرت ثمانية أيام متوالية لم يُقطر فيها. ثم صعد وطلب رفعها فانقشعت فوراً.',
    reference: 'صحيح البخاري — كتاب الاستسقاء',
    color: '#93C5FD',
  },
  {
    icon: <Zap size={28} />,
    title: 'إخبار بفتح القسطنطينية',
    subtitle: 'تحقق بعد ٨٠٠ سنة',
    description: 'قال ﷺ: "لتُفتحنّ القسطنطينية فلنِعمَ الأمير أميرها ولنِعمَ الجيش ذلك الجيش." فتحها السلطان محمد الفاتح عام 1453م بعد ٨٢٠ سنة من النبوة. ووصفه العلماء بأنه نِعمَ الأمير.',
    reference: 'مسند أحمد — صحّحه الألباني وشعيب الأرنؤوط',
    color: '#C4B5FD',
  },
  {
    icon: <Heart size={28} />,
    title: 'علمه بما في القلوب',
    subtitle: 'يكشف أسرار المنافقين',
    description: 'عرّفه الله بأسماء المنافقين وفضحهم برواية حذيفة بن اليمان. قال حذيفة: "أسرّ إليّ رسول الله ﷺ أسماء اثني عشر منافقاً." وكان النبي ﷺ يعرف المنافق من ملامحه.',
    reference: 'صحيح مسلم — كتاب صفات المنافقين',
    color: '#F9A8D4',
  },
  {
    icon: <Bird size={28} />,
    title: 'شهادة العنكبوت والحمامة',
    subtitle: 'الغار في يوم الهجرة',
    description: 'حين اختبأ النبي ﷺ وأبو بكر في غار ثور أنسجت العنكبوت خيوطها على فم الغار وباضت حمامتان. فلما جاء المشركون قالوا: ما دخل هنا أحد. فكان هذا من أعظم حفظ الله لنبيّه.',
    reference: 'السيرة النبوية لابن هشام، ودلائل النبوة للبيهقي',
    color: '#D1FAE5',
  },
  {
    icon: <Wind size={28} />,
    title: 'إخبار بغزو فارس والروم',
    subtitle: 'تحقق في زمن الخليفة عمر',
    description: 'قال ﷺ: "إذا هلك كسرى فلا كسرى بعده، وإذا هلك قيصر فلا قيصر بعده." وقال: "ستفتحون فارس والروم." ففُتحتا في زمن عمر وعثمان بعد وفاته بأعوام قليلة.',
    reference: 'صحيح البخاري ومسلم — كتاب الفتن',
    color: '#FEF08A',
  },
  {
    icon: <Waves size={28} />,
    title: 'الحجر يسلّم عليه',
    subtitle: 'قبل النبوة — شاهد الجماد',
    description: 'قال ﷺ: "إني لأعرف حجراً بمكة كان يسلّم عليّ قبل أن أُبعث إنّي لأعرفه الآن." وكان ﷺ يقول: "إن هذا الحجر الأسود يأتي يوم القيامة وله عينان يُبصر بهما."',
    reference: 'صحيح مسلم — كتاب الفضائل',
    color: '#E2E8F0',
  },
  {
    icon: <Flame size={28} />,
    title: 'إخبار بمقتل عمر وعثمان',
    subtitle: 'غيب تحقق',
    description: 'أخبر النبي ﷺ عمر بن الخطاب بأنه سيُقتل، وأخبر عثمان بأنه سيلبس قميصاً لا يخلعه. وتحقق كلاهما بعد وفاة النبي ﷺ — عمر طعنه أبو لؤلؤة، وعثمان قُتل وهو يقرأ القرآن.',
    reference: 'الترمذي وابن ماجه — السلسلة الصحيحة للألباني',
    color: '#FCA5A5',
  },
  {
    icon: <Moon size={28} />,
    title: 'رؤياه تتحقق دائماً',
    subtitle: 'رؤيا الأنبياء حق',
    description: 'كانت رؤياه ﷺ تتحقق بأدق تفاصيلها: رأى في المنام دخول مكة فتحقق في صلح الحديبية ثم الفتح. ورأى فتوحاً تحققت. ورأى وجه أبي بكر في الخلافة. كل رؤيا جاءت كما رأى.',
    reference: '﴿لَقَدْ صَدَقَ اللَّهُ رَسُولَهُ الرُّؤْيَا بِالْحَقِّ﴾ — الفتح: ٢٧',
    color: '#A78BFA',
  },
];

/* ─── Center Modal ─── */
const MiracleModal: React.FC<{ miracle: Miracle; onClose: () => void }> = ({ miracle, onClose }) => (
  <motion.div
    key="miracle-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    style={{ background: 'rgba(3,8,19,0.88)', backdropFilter: 'blur(10px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 16 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl"
      style={{
        background: 'rgba(8,14,30,0.97)',
        border: `1px solid ${miracle.color}30`,
        boxShadow: `0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px ${miracle.color}10, 0 0 60px ${miracle.color}08`,
      }}
      onClick={e => e.stopPropagation()}
      dir="rtl"
    >
      {/* Top accent bar */}
      <div className="h-1 rounded-t-3xl" style={{ background: `linear-gradient(90deg, transparent, ${miracle.color}, transparent)` }} />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.82)' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
      >
        <X size={14} />
      </button>

      <div className="p-6 pt-5">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: `${miracle.color}15`, border: `1px solid ${miracle.color}30`, color: miracle.color }}
        >
          {miracle.icon}
        </div>

        {/* Title */}
        <h2 className="font-noto font-bold mb-1" style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', color: miracle.color }}>
          {miracle.title}
        </h2>
        <p className="font-kufi mb-5" style={{ fontSize: '0.92rem', color: `${miracle.color}80`, letterSpacing: '0.04em' }}>
          {miracle.subtitle}
        </p>

        {/* Description */}
        <p className="font-noto mb-5" style={{ fontSize: '0.93rem', lineHeight: 2, color: 'rgba(255,255,255,0.82)' }}>
          {miracle.description}
        </p>

        {/* Reference */}
        <div
          className="rounded-2xl p-4"
          style={{ background: `${miracle.color}08`, border: `1px solid ${miracle.color}20` }}
        >
          <p className="font-kufi text-xs mb-1" style={{ color: 'rgba(255,255,255,0.95)' }}>المصدر</p>
          <p className="font-noto" style={{ fontSize: '0.85rem', color: `${miracle.color}bb`, lineHeight: 1.8 }}>
            {miracle.reference}
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const MiraclesPage: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedMiracle, setSelectedMiracle] = useState<Miracle | null>(null);

  const filtered = MIRACLES.filter(m =>
    !search.trim() || m.title.includes(search) || m.subtitle.includes(search) || m.description.includes(search)
  );

  return (
    <div
      dir="rtl"
      className="min-h-screen"
      style={{ background: '#030813' }}
    >
      {/* زر المشاركة */}
      <div className="fixed top-[72px] left-4 z-[60]">
        <ShareButton title="معجزات النبي ﷺ" accentColor="#C9A84C" />
      </div>
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
          {MIRACLES.length} معجزة من آيات الله البيّنة دليلاً على صدق نبوّته ﷺ
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative max-w-xs mx-auto mt-6"
        >
          <SearchIcon size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-islamic-gold/40" />
          <input
            type="text"
            placeholder="ابحث عن معجزة..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full font-kufi text-sm text-white/75 pr-8 pl-3 py-2 rounded-full outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}
          />
        </motion.div>

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
        <AnimatePresence>
          {search && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="font-kufi text-xs text-white/30 text-center mb-4">
              {filtered.length} نتيجة
            </motion.p>
          )}
        </AnimatePresence>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((miracle, index) => (
            <motion.div
              key={miracle.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 * index }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${miracle.color}20`,
                boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 30px ${miracle.color}08`,
              }}
              onClick={() => setSelectedMiracle(miracle)}
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
                    fontSize: '0.88rem',
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
                  className="text-xs font-noto p-2 rounded-lg mb-3"
                  style={{
                    background: `${miracle.color}08`,
                    border: `1px solid ${miracle.color}18`,
                    color: `${miracle.color}80`,
                    lineHeight: 1.7,
                  }}
                >
                  {miracle.reference}
                </div>

                {/* Tap hint */}
                <p className="font-kufi text-center" style={{ fontSize: '0.84rem', color: `${miracle.color}45` }}>
                  اضغط للتفاصيل ›
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Center Modal */}
      <AnimatePresence>
        {selectedMiracle && (
          <MiracleModal miracle={selectedMiracle} onClose={() => setSelectedMiracle(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiraclesPage;
