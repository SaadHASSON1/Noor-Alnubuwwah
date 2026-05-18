import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

interface Wife {
  number: number;
  name: string;
  nickname: string;
  marriageYear: string;
  specialStatus: string;
  shortDescription: string;
  fullStory: string;
  achievement: string;
  quote: string;
  quoteSource: string;
  bg: string;
  accentColor: string;
}

const WIVES: Wife[] = [
  {
    number: 1,
    name: 'خديجة بنت خويلد',
    nickname: 'أم المؤمنين — الكبرى',
    marriageYear: '٥٩٥ م — قبل البعثة بخمس عشرة سنة',
    specialStatus: 'أول من آمن بالنبي ﷺ من الرجال والنساء',
    shortDescription: 'سيدة قريش وأعظم نساء الدنيا — الزوجة الأولى والحبيبة الخالدة في قلبه ﷺ',
    fullStory: 'كانت خديجة رضي الله عنها سيدة قريش وأشرفهن حسباً وأكثرهن مالاً. أرسلت إلى النبي ﷺ تعرض عليه الزواج فقبل. تزوّجها وعمرها أربعون وعمره خمس وعشرون. وكانت أول من آمنت به وأول من صدّقه — آزرته في أحلك الساعات حين أتاه الوحي فارتجف. ودعمته بمالها ونفسها وكلامها الطيب. لم يتزوج عليها في حياتها. وتوفّيت قبل الهجرة في ما عُرف بعام الحزن. وكان ﷺ يذكرها بعد وفاتها ويُكرم أصدقاءها وكلما ذبح الشاة أهدى منها لأحبائها. وقالت عائشة: ما غرتُ من امرأة ما غرتُ من خديجة.',
    achievement: 'أول من آمن بالنبي ﷺ ودعمته بمالها وروحها في أحلك ساعات الدعوة',
    quote: 'كلا والله لا يُخزيك الله أبداً، إنك لتصل الرحم وتحمل الكَل وتكسب المعدوم وتَقري الضيف وتُعين على نوائب الحق',
    quoteSource: 'صحيح البخاري — كتاب بدء الوحي',
    bg: '#1a0d00',
    accentColor: 'rgba(201,168,76,0.7)',
  },
  {
    number: 2,
    name: 'سودة بنت زمعة',
    nickname: 'أم المؤمنين — الصابرة',
    marriageYear: '٦٢٠ م — بعد وفاة خديجة',
    specialStatus: 'أول من تزوجها ﷺ بعد خديجة',
    shortDescription: 'الزوجة الثانية التي كانت مُهاجرة صبوراً ووهبت يومها لعائشة',
    fullStory: 'كانت سودة رضي الله عنها من المهاجرين الأوائل إلى الحبشة مع زوجها السكران بن عمرو. فلما توفي زوجها في الحبشة عادت وحيدةً. فتزوّجها النبي ﷺ بعد وفاة خديجة مباشرةً. كانت سيدةً طاعنةً في السن هاجرت في سبيل الله وضحّت بكل شيء. ولما كبرت وخافت أن يُطلّقها وهبت يومها لعائشة رضي الله عنها حباً للنبي ﷺ وحرصاً على القرب منه. فكان النبي ﷺ يقسم لعائشة يومها ويومَ سودة وقلبه مليء بالتقدير لهذه الصحابية الجليلة.',
    achievement: 'من المهاجرات الأوائل إلى الحبشة ومثال فريد في التضحية والإيثار',
    quote: 'اللهم إني وهبتُ يومي لعائشة حتى يرضى عني رسول الله ﷺ',
    quoteSource: 'صحيح البخاري — كتاب النكاح',
    bg: '#100d1a',
    accentColor: 'rgba(180,160,220,0.7)',
  },
  {
    number: 3,
    name: 'عائشة بنت أبي بكر',
    nickname: 'حميراء — أُمّ المؤمنين',
    marriageYear: '٦٢٣ م — السنة الثانية من الهجرة',
    specialStatus: 'أحبّ نساء النبي ﷺ إليه وعالمة الأمة',
    shortDescription: 'زوجته وحبيبته ومُحدِّثة الإسلام الأولى — روت آلاف الأحاديث وأفتت الصحابة',
    fullStory: 'تزوّجها النبي ﷺ وهي صغيرة ودخل بها بعد الهجرة. كانت من أذكى الناس وأحفظهم وأعرفهم بأحكام الإسلام. كانت مرجعاً للصحابة في الفقه والسيرة والحديث — يقصدونها من كل مكان يسألونها. روت أكثر من ألفين ومئتي حديث. توفي النبي ﷺ في بيتها وبين يديها. ومن فضائلها: نزل القرآن في براءتها من الإفك. وقال عنها ﷺ: "فضل عائشة على النساء كفضل الثريد على سائر الطعام." عاشت بعده ﷺ تُعلّم الأمة حتى توفيت رضي الله عنها.',
    achievement: 'روت أكثر من ٢٢٠٠ حديث وكانت مرجع الأمة في الفقه والسيرة لعقود بعد وفاته ﷺ',
    quote: 'فضلُ عائشة على النساء كفضل الثريد على سائر الطعام',
    quoteSource: 'صحيح البخاري — كتاب المناقب',
    bg: '#0d1520',
    accentColor: 'rgba(160,200,240,0.7)',
  },
  {
    number: 4,
    name: 'حفصة بنت عمر',
    nickname: 'حافظة القرآن',
    marriageYear: '٦٢٥ م — السنة الثالثة من الهجرة',
    specialStatus: 'كانت صوّامةً قوّامةً وعُهد إليها بحفظ المصحف',
    shortDescription: 'ابنة الفاروق عمر بن الخطاب — الصوّامة القوّامة التي أُودع عندها المصحف',
    fullStory: 'كانت حفصة رضي الله عنها ابنة عمر بن الخطاب وقد أُسلمت إلى زوجها خُنيس بن حذافة فاستُشهد في أُحد. فزوّجها أبوها من النبي ﷺ. كانت ذات دين وعلم — صوّامةً قوّامةً. وكانت لديها شجاعة أبيها فكانت تُراجع النبي ﷺ. وأودع عثمان بن عفان رضي الله عنه المصحف الإمام الأصلي عندها بعد جمع القرآن. فكانت بذلك حارسةً لكتاب الله. وشهد لها النبي ﷺ بأنها صوّامة قوّامة.',
    achievement: 'أودع عثمان عندها المصحف الإمام الأصلي فكانت حارسةً لكتاب الله الكريم',
    quote: 'حفصة صوّامة قوّامة — وهي زوجتي في الجنة',
    quoteSource: 'المستدرك للحاكم — صحّحه',
    bg: '#0a1810',
    accentColor: 'rgba(100,200,140,0.7)',
  },
  {
    number: 5,
    name: 'زينب بنت خزيمة',
    nickname: 'أم المساكين',
    marriageYear: '٦٢٥ م — السنة الرابعة من الهجرة',
    specialStatus: 'لُقّبت بأم المساكين لكثرة صدقتها وكرمها',
    shortDescription: 'أم المساكين — الزوجة التي توفيت بعد زواجها بأشهر قليلة',
    fullStory: 'كانت زينب بنت خزيمة رضي الله عنها أرملة عبيدة بن الحارث الذي استُشهد في بدر. كانت مشهورةً بكثرة الصدقة والجود حتى لُقّبت في الجاهلية قبل الإسلام بأم المساكين. تزوّجها النبي ﷺ رحمةً بها وتكريماً لأرملة الشهيد. غير أنها لم تعش إلا أشهراً قليلة بعد زواجها إذ توفيت في حياة النبي ﷺ. وكانت وفاتها من مصائب النبي ﷺ فصلى عليها ودفنها رضي الله عنها.',
    achievement: 'لُقّبت بأم المساكين في الجاهلية والإسلام لكثرة جودها وكرمها على الفقراء',
    quote: 'لُقّبت بأم المساكين في الجاهلية والإسلام لكثرة إطعامها للمساكين',
    quoteSource: 'طبقات ابن سعد — البداية والنهاية',
    bg: '#180800',
    accentColor: 'rgba(220,160,100,0.7)',
  },
  {
    number: 6,
    name: 'أم سلمة هند المخزومية',
    nickname: 'ذات العقل والرأي',
    marriageYear: '٦٢٦ م — السنة الرابعة من الهجرة',
    specialStatus: 'كانت من أفقه أمهات المؤمنين وصاحبة الرأي السديد',
    shortDescription: 'أحكم أمهات المؤمنين رأياً وأعمقهن حكمةً — صاحبة الرأي في الحديبية',
    fullStory: 'كانت أم سلمة رضي الله عنها ابنةَ أبي أمية وزوجةَ أبي سلمة الذي استُشهد. هاجرت مع زوجها ففرّق المشركون بينها وبين ابنها لفترة. فلما توفي زوجها خطبها أبو بكر فردّت وخطبها عمر فردّت فخطبها النبي ﷺ فتزوّجها. كانت من أفضل نساء زمانها رأياً وعقلاً. وأبدى رأيها في الحديبية حين حزن الصحابة فقالت: انحر ﷺ وقد تحلّل — فانحر فاحتذى الصحابة به. كانت آخر أزواجه وفاةً رضي الله عنها.',
    achievement: 'صاحبة الرأي المشهور في الحديبية الذي أنقذ الموقف وحلّ إشكال الصحابة',
    quote: 'قومي يا رسول الله فانحر، فقام ونحر — ففعل الصحابة مثله',
    quoteSource: 'صحيح البخاري — كتاب الشروط',
    bg: '#1a0d08',
    accentColor: 'rgba(200,140,100,0.7)',
  },
  {
    number: 7,
    name: 'زينب بنت جحش',
    nickname: 'من زوّجها الله من فوق سبع سماوات',
    marriageYear: '٦٢٧ م — السنة الخامسة من الهجرة',
    specialStatus: 'زوّجها الله في القرآن وكانت تفتخر بذلك على سائر نساء النبي ﷺ',
    shortDescription: 'ابنة عمة النبي ﷺ التي زوّجها الله في القرآن ونزلت في شأنها آيات الأحزاب',
    fullStory: 'كانت زينب بنت جحش رضي الله عنها ابنةَ عمة النبي ﷺ أُميمة بنت عبد المطلب. زوّجها النبي ﷺ من مولاه زيد بن حارثة لكسر الحواجز الطبقية. فلما طلّقها زيد تزوّجها النبي ﷺ بأمر الله الصريح في القرآن: ﴿فَلَمَّا قَضَىٰ زَيْدٌ مِّنْهَا وَطَرًا زَوَّجْنَاكَهَا﴾ لتكون ولايةً للنبي ﷺ وقطعاً لعادة التبنّي الجاهلي. وكانت تفتخر قائلةً: زوّجكنّ آباؤكنّ وزوّجني الله من فوق سبع سماوات. وكانت من أكثر الأزواج صدقةً وكرماً.',
    achievement: 'زوّجها الله في القرآن الكريم وكانت من أكثر أمهات المؤمنين صدقةً وعملاً باليدين',
    quote: 'زوّجكنّ آباؤكنّ وأهاليكنّ وزوّجني الله من فوق سبع سماوات',
    quoteSource: 'صحيح البخاري — كتاب التوحيد',
    bg: '#080e20',
    accentColor: 'rgba(140,180,240,0.7)',
  },
  {
    number: 8,
    name: 'جويرية بنت الحارث',
    nickname: 'المباركة على قومها',
    marriageYear: '٦٢٧ م — السنة الخامسة من الهجرة',
    specialStatus: 'زواجها كان سبباً في إعتاق مئة أسير من بني المصطلق',
    shortDescription: 'التي كان زواجها رحمةً لمئة أسير أُعتقوا لأنهم صاروا أصهار رسول الله ﷺ',
    fullStory: 'كانت جويرية رضي الله عنها ابنة الحارث بن أبي ضرار سيد بني المصطلق. وقعت في الأسر في غزوة بني المصطلق فأتت النبي ﷺ تطلب مساعدتها في فداء نفسها. فأعتقها النبي ﷺ وتزوّجها. فلما علم الصحابة أنها أصبحت ربيبةَ رسول الله ﷺ أعتقوا جميعَ ما في أيديهم من أسرى بني المصطلق إكراماً لرسول الله ﷺ. فأُعتق بسبب زواجها مئةُ بيت. قالت عائشة: ما أعلم امرأةً كانت أعظم بركةً على قومها من جويرية.',
    achievement: 'كان زواجها سبباً لعتق مئة بيت من بني المصطلق وهو ما لم يُسمع بمثله',
    quote: 'ما أعلم امرأةً كانت أعظم بركةً على قومها منها',
    quoteSource: 'سنن أبي داود — مسند أحمد',
    bg: '#1a0a00',
    accentColor: 'rgba(220,180,80,0.7)',
  },
  {
    number: 9,
    name: 'أم حبيبة رملة بنت أبي سفيان',
    nickname: 'المهاجرة الصابرة',
    marriageYear: '٦٢٨ م — السنة السادسة من الهجرة',
    specialStatus: 'هاجرت إلى الحبشة وارتدّ زوجها فصبرت وثبتت على دينها',
    shortDescription: 'ابنة أبي سفيان التي هاجرت إلى الحبشة وثبتت على الإسلام رغم ردة زوجها',
    fullStory: 'كانت أم حبيبة رضي الله عنها ابنة أبي سفيان سيد قريش وعدوّ الإسلام. أسلمت مع زوجها عبيدالله بن جحش وهاجرا إلى الحبشة. فارتدّ زوجها هناك وأصبح نصرانياً ومات على ذلك. فبقيت وحيدةً في الحبشة غريبةً بلا زوج. فأرسل النبي ﷺ رسالةً إلى النجاشي يطلب منه تزويجها فزوّجها النجاشي من النبي ﷺ نيابةً عنه وأمهرها أربعة آلاف درهم من ماله. فجاءت إلى المدينة وكانت من أثبت الناس وأصبرهم.',
    achievement: 'ثبتت على الإسلام رغم ردة زوجها في الحبشة وهجرانها — وزوّجها النجاشي نيابةً عن النبي ﷺ',
    quote: 'اللهم أمتّعني بأبي سفيان وبأخي معاوية — دعت لهم بعد إسلامهم',
    quoteSource: 'صحيح مسلم — كتاب البر والصلة',
    bg: '#0d1800',
    accentColor: 'rgba(160,220,120,0.7)',
  },
  {
    number: 10,
    name: 'صفية بنت حيي',
    nickname: 'بنت النبيّين',
    marriageYear: '٦٢٨ م — بعد خيبر',
    specialStatus: 'من نسل هارون بن عمران عليه السلام وتزوّجها النبي ﷺ بعد خيبر إكراماً لها',
    shortDescription: 'اليهودية التي أسلمت وتزوّجها النبي ﷺ تكريماً لنسبها الشريف',
    fullStory: 'كانت صفية رضي الله عنها ابنة حيي بن أخطب سيد بني النضير، وكانت من أشرف نسب في بني إسرائيل — تنتسب إلى هارون بن عمران عليه السلام. وقعت في السبي بعد خيبر فأسلمت. واختارها النبي ﷺ لنفسه وأعتقها وجعل عتقها صداقها. وعيّرتها بعض أمهات المؤمنين بأنها يهودية فجاءت إلى النبي ﷺ تبكي فقال لها: "ألا قلتِ: وكيف تكونين دوني وأبي هارون وعمي موسى وزوجي محمد؟"',
    achievement: 'من نسل الأنبياء — وقال لها النبي ﷺ قولاً يفخر به الإنسان إلى آخر الدهر',
    quote: 'كيف تكونين دوني وأبوكِ هارون وعمّكِ موسى وزوجكِ محمد؟',
    quoteSource: 'سنن الترمذي — صحّحه',
    bg: '#0a1220',
    accentColor: 'rgba(140,180,240,0.7)',
  },
  {
    number: 11,
    name: 'ميمونة بنت الحارث',
    nickname: 'آخر من تزوّجها النبي ﷺ',
    marriageYear: '٦٢٩ م — عمرة القضاء',
    specialStatus: 'آخر من تزوّجها النبي ﷺ وعقد عليها في مكة المكرمة في عمرة القضاء',
    shortDescription: 'آخر زوجات النبي ﷺ وعقد عليها في مكة وبنى بها في سرف',
    fullStory: 'كانت ميمونة رضي الله عنها ابنةَ الحارث وأختَ لبابة الكبرى زوج العباس بن عبد المطلب. عرضت نفسها على النبي ﷺ فتزوجها وهو حلال في عمرة القضاء. وكانت آخر من تزوّجها النبي ﷺ. وكانت فاضلةً تقيةً من أكثر أمهات المؤمنين صلةً للرحم. سمّاها النبي ﷺ ميمونة — وكان اسمها برّة — تيمّناً. وتوفّيت في سرف نفس المكان الذي بنى بها فيه النبي ﷺ وكأنها أرادت الموت في ذلك المكان المقدّس لها.',
    achievement: 'كانت من أوصل أمهات المؤمنين للرحم وأكثرهن صدقةً وتقوى في آخر حياتها',
    quote: 'عرضتُ نفسي على رسول الله ﷺ — فرزقني الله خير رجل على الأرض',
    quoteSource: 'طبقات ابن سعد — البداية والنهاية',
    bg: '#1a1000',
    accentColor: 'rgba(220,200,120,0.7)',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5 },
  }),
};

const WivesPage: React.FC = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: '#030813' }}>
      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${((i * 137.5) % 100).toFixed(1)}%`,
              top: `${((i * 93.7) % 100).toFixed(1)}%`,
              width: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`,
              height: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`,
              opacity: 0.15 + (i % 5) * 0.04,
            }}
          />
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="absolute top-6 right-16 z-20">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs"
          style={{ color: 'rgba(201,168,76,0.5)' }}
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 transition-colors"
            style={{ color: 'rgba(201,168,76,0.6)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,168,76,0.6)')}
          >
            <Home size={12} />
            <span>الرئيسية</span>
          </button>
          <ChevronLeft size={10} className="rotate-180" />
          <span style={{ color: 'rgba(201,168,76,0.9)' }}>أمهات المؤمنين</span>
        </motion.nav>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-16"
        style={{
          background: 'linear-gradient(180deg, rgba(201,168,76,0.06) 0%, transparent 100%)',
        }}
      >
        <div
          className="w-16 h-px mb-6"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
        />
        <p
          className="font-noto text-center mb-3"
          style={{
            fontSize: 'clamp(1.2rem, 3.5vw, 2rem)',
            color: '#C9A84C',
            textShadow: '0 0 30px rgba(201,168,76,0.35)',
            lineHeight: 2,
          }}
        >
          ﴿النَّبِيُّ أَوْلَىٰ بِالْمُؤْمِنِينَ مِنْ أَنفُسِهِمْ ۖ وَأَزْوَاجُهُ أُمَّهَاتُهُمْ﴾
        </p>
        <p className="font-kufi text-sm" style={{ color: 'rgba(201,168,76,0.6)' }}>
          الأحزاب: ٦
        </p>
        <div
          className="w-16 h-px mt-6"
          style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
        />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-kufi font-bold mt-8 text-center"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: 'white',
          }}
        >
          أمهات المؤمنين
        </motion.h1>
        <p className="font-noto mt-3 text-center" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>
          زوجات النبي ﷺ — نساء علّمن الأمة وبنين الإسلام في أول بيوته
        </p>
        <div
          className="mt-6 px-4 py-2 rounded-full font-kufi text-sm"
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.2)',
            color: 'rgba(201,168,76,0.7)',
          }}
        >
          ١١ أم كريمة — اضغط على أي منهن لعرض قصتها كاملة
        </div>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WIVES.map((wife, i) => (
            <motion.div
              key={wife.number}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden cursor-pointer transition-all"
              style={{
                background: wife.bg,
                border: `1px solid ${expanded === i ? wife.accentColor : 'rgba(255,255,255,0.06)'}`,
                boxShadow: expanded === i ? `0 0 20px ${wife.accentColor.replace('0.7)', '0.1)')}` : 'none',
              }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              {/* Card header */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span
                      className="font-kufi text-xs px-2 py-0.5 rounded-full mb-2 inline-block"
                      style={{
                        background: `${wife.accentColor.replace('0.7)', '0.12)')}`,
                        color: wife.accentColor,
                      }}
                    >
                      الزوجة {wife.number === 1 ? 'الأولى' : wife.number === 2 ? 'الثانية' : wife.number === 3 ? 'الثالثة' : wife.number === 4 ? 'الرابعة' : wife.number === 5 ? 'الخامسة' : wife.number === 6 ? 'السادسة' : wife.number === 7 ? 'السابعة' : wife.number === 8 ? 'الثامنة' : wife.number === 9 ? 'التاسعة' : wife.number === 10 ? 'العاشرة' : 'الحادية عشرة'}
                    </span>
                    <h3
                      className="font-kufi font-bold"
                      style={{ color: 'white', fontSize: '1.05rem' }}
                    >
                      {wife.name}
                    </h3>
                    <p className="font-noto text-xs mt-0.5" style={{ color: wife.accentColor, opacity: 0.9 }}>
                      {wife.nickname}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expanded === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="mt-1 shrink-0"
                  >
                    {expanded === i
                      ? <ChevronUp size={16} style={{ color: wife.accentColor }} />
                      : <ChevronDown size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
                    }
                  </motion.div>
                </div>

                <p
                  className="font-noto"
                  style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.7 }}
                >
                  {wife.shortDescription}
                </p>

                {/* Marriage year */}
                <div className="flex items-center gap-1.5 mt-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: wife.accentColor }}
                  />
                  <p className="font-kufi text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {wife.marriageYear}
                  </p>
                </div>
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-5 pb-5 space-y-4"
                      style={{ borderTop: `1px solid ${wife.accentColor.replace('0.7)', '0.15)')}` }}
                    >
                      {/* Special status */}
                      <div className="pt-4">
                        <div
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-3"
                          style={{
                            background: `${wife.accentColor.replace('0.7)', '0.1)')}`,
                            border: `1px solid ${wife.accentColor.replace('0.7)', '0.25)')}`,
                          }}
                        >
                          <span className="font-kufi text-xs" style={{ color: wife.accentColor }}>
                            {wife.specialStatus}
                          </span>
                        </div>

                        {/* Full story */}
                        <p
                          className="font-noto"
                          style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', lineHeight: 1.9 }}
                        >
                          {wife.fullStory}
                        </p>
                      </div>

                      {/* Achievement */}
                      <div
                        className="rounded-xl p-3"
                        style={{
                          background: 'rgba(0,0,0,0.2)',
                          borderRight: `2px solid ${wife.accentColor}`,
                        }}
                      >
                        <p className="font-kufi text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          أبرز إسهامها
                        </p>
                        <p
                          className="font-noto"
                          style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', lineHeight: 1.7 }}
                        >
                          {wife.achievement}
                        </p>
                      </div>

                      {/* Quote */}
                      <div
                        className="rounded-xl p-4"
                        style={{
                          background: `${wife.accentColor.replace('0.7)', '0.06)')}`,
                          border: `1px solid ${wife.accentColor.replace('0.7)', '0.2)')}`,
                        }}
                      >
                        <p
                          className="font-noto italic mb-2"
                          style={{ color: wife.accentColor, fontSize: '0.88rem', lineHeight: 1.9 }}
                        >
                          "{wife.quote}"
                        </p>
                        <p className="font-kufi text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          {wife.quoteSource}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 py-8"
        >
          <div
            className="w-12 h-px mx-auto mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }}
          />
          <p
            className="font-noto"
            style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', lineHeight: 1.8 }}
          >
            رضي الله عن أمهات المؤمنين جميعاً — فضلُهنّ على الأمة لا يُحصى ولا يُقدَّر
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-8 flex items-center gap-2 mx-auto px-6 py-2.5 rounded-full font-kufi text-sm transition-all"
            style={{
              background: 'rgba(201,168,76,0.08)',
              border: '1px solid rgba(201,168,76,0.25)',
              color: 'rgba(201,168,76,0.7)',
            }}
          >
            <Home size={13} />
            العودة للرئيسية
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WivesPage;
