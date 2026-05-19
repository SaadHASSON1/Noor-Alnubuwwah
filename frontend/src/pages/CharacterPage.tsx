import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, ChevronDown } from 'lucide-react';
import SectionNavigator from '../components/SectionNavigator';
import ShareButton from '../components/ShareButton';

const CHAR_SECTIONS = [
  { id: 'chr-appearance', label: 'المظهر الكريم' },
  { id: 'chr-traits',     label: 'أخلاقه العظيمة' },
  { id: 'chr-habits',     label: 'عاداته اليومية' },
  { id: 'chr-testimony',  label: 'شهادات الصحابة' },
];

interface AppearanceCard {
  trait: string;
  description: string;
  hadith: string;
  source: string;
}

interface CharacterTrait {
  name: string;
  icon: string;
  description: string;
  hadith: string;
  source: string;
}

interface DailyHabit {
  time: string;
  title: string;
  description: string;
  hadith?: string;
  source?: string;
}

interface CompanionTestimony {
  name: string;
  role: string;
  quote: string;
  source: string;
}

const APPEARANCE: AppearanceCard[] = [
  {
    trait: 'القامة والبنية',
    description: 'كان ﷺ مربوعاً ليس بالطويل الذاهب ولا بالقصير، بعيد ما بين المنكبين، عريض الصدر أبيضه.',
    hadith: 'كان رسول الله ﷺ أحسن الناس وجهاً وأحسنهم خَلقاً، لم يكن بالطويل البائن ولا بالقصير',
    source: 'صحيح البخاري — كتاب المناقب',
  },
  {
    trait: 'الوجه الكريم',
    description: 'كان وجهه ﷺ كالقمر يتلألأ — أزهر اللون مُشرب بحمرة، مستدير الوجه، واسع الجبهة.',
    hadith: 'كان وجهه مثل الشمس والقمر، مستديراً',
    source: 'صحيح مسلم — كتاب الفضائل',
  },
  {
    trait: 'العينان الكريمتان',
    description: 'كان ﷺ أدعج العينين — شديد سواد الحدقة — طويل الأهداب. يُقال إن عينيه كانتا تبرقان في الظلمة.',
    hadith: 'كان أشكل العين — أي واسعها — وكان في عينيه حُمرة',
    source: 'السيرة النبوية لابن هشام — الشمائل المحمدية للترمذي',
  },
  {
    trait: 'الشعر المبارك',
    description: 'كان شعره ﷺ ليس بالجعد القطط ولا بالسبط — بل رَجِل كالموج. يصل إلى شحمة أذنيه أحياناً وإلى كتفيه أحياناً.',
    hadith: 'كان شعر رسول الله ﷺ إلى شحمة أذنيه، وربما بلغ كتفيه',
    source: 'صحيح البخاري — كتاب اللباس',
  },
  {
    trait: 'اليدان الشريفتان',
    description: 'كانت يداه ﷺ ضخمتين كأنهما قطنتان — ناعمتان. وصفها من لمسها بأنها أطيب من الحرير. لم يصافحه أحد إلا شعر بدفء ونور.',
    hadith: 'ما مسستُ ديباجاً ولا حريراً ألين من كف رسول الله ﷺ',
    source: 'صحيح البخاري — كتاب الأدب',
  },
  {
    trait: 'الابتسامة النورانية',
    description: 'كان ﷺ كثير التبسّم بحيث يُرى بياض أسنانه. ولم يُر ضاحكاً قط قهقهةً. كان تبسّمه ﷺ كافياً ليملأ القلب سروراً.',
    hadith: 'ما رأيتُ أحداً أكثر تبسماً من رسول الله ﷺ',
    source: 'الشمائل المحمدية للترمذي',
  },
  {
    trait: 'الرائحة العطرة',
    description: 'كان ﷺ أطيب الناس رائحةً. مشى في طريق فمرّ بعده رجل فشمّ طيبه. وكان عرقه ﷺ في درّة اللؤلؤ طيباً.',
    hadith: 'لم أشمّ قط عَنبراً ولا مسكاً ولا شيئاً أطيب من ريح رسول الله ﷺ',
    source: 'صحيح مسلم — كتاب الفضائل',
  },
  {
    trait: 'المشية المهيبة',
    description: 'كان ﷺ إذا مشى كأنما ينحدر من صبَب — يميل إلى الأمام برشاقة وقوة — وكان أسرع مشياً لم يُدرَك. وكان إذا أقبل أقبل جميعاً.',
    hadith: 'كان إذا مشى تكفّأ تكفّؤاً كأنما يمشي في صَبَب، وما رأيتُ مثله قبله ولا بعده',
    source: 'الشمائل المحمدية للترمذي',
  },
];

const CHARACTER_TRAITS: CharacterTrait[] = [
  {
    name: 'الرحمة',
    icon: '❤',
    description: 'كان ﷺ يرحم الكبير والصغير والإنسان والحيوان. وبكى عند وفاة ابنه إبراهيم ودموعه رحمة من الله لا جزعاً.',
    hadith: 'لا تُنزع الرحمة إلا من شقيٍّ',
    source: 'سنن أبي داود — سنن الترمذي',
  },
  {
    name: 'الحلم والصبر',
    icon: '☽',
    description: 'ما انتقم ﷺ لنفسه قط إلا أن تُنتهك حرمات الله. حتى من آذاه في جسده دعا له وعفا عنه يوم الفتح.',
    hadith: 'ما انتقم رسول الله ﷺ لنفسه في شيء يُؤتى إليه قط، إلا أن تُنتهك محارم الله',
    source: 'صحيح البخاري — كتاب المناقب',
  },
  {
    name: 'الكرم',
    icon: '✦',
    description: 'كان ﷺ أجود الناس وأجوده في رمضان. ما سُئل شيئاً قط فقال لا. وأعطى رجلاً غنماً ملء شعب جبل.',
    hadith: 'كان رسول الله ﷺ أجود الناس، وكان أجود ما يكون في رمضان حين يلقاه جبريل',
    source: 'صحيح البخاري — كتاب بدء الوحي',
  },
  {
    name: 'الشجاعة',
    icon: '⚔',
    description: 'كان ﷺ من أشجع الناس — ثبت يوم حنين بينما فرّ كثير من الصحابة. وكانوا إذا حمي الوطيس استتروا به.',
    hadith: 'كنا إذا حمي الوطيس واشتدّ البأس لُذنا برسول الله ﷺ — وكان أقربنا إلى العدو',
    source: 'مسند أحمد — السيرة النبوية',
  },
  {
    name: 'التواضع',
    icon: '◎',
    description: 'كان ﷺ يأكل مع الخادم ويجلس مع الفقراء ويعود المريض في أقصى المدينة. ونهى عن القيام له وقال: لا تُطروني.',
    hadith: 'كان رسول الله ﷺ يزور الأنصار ويُسلّم على صبيانهم ويمسح رؤوسهم',
    source: 'الشمائل المحمدية للترمذي',
  },
  {
    name: 'الصدق',
    icon: '◇',
    description: 'لُقّب بالأمين قبل النبوة بعشرين سنةً. وشهد له أعداؤه بالصدق — حتى أبو سفيان أقرّ بصدقه أمام هرقل.',
    hadith: 'سألني هرقل عن صفاته فأجبتُ، فقال: إن كان ما تقول حقاً فسيملك موضع قدمَيّ هاتين',
    source: 'صحيح البخاري — كتاب بدء الوحي',
  },
  {
    name: 'الحياء',
    icon: '◉',
    description: 'كان ﷺ أشدّ حياءً من العذراء في خدرها. وكان إذا كره شيئاً رُئي ذلك في وجهه ولا يصرّح به.',
    hadith: 'كان رسول الله ﷺ أشدّ حياءً من العذراء في خدرها',
    source: 'صحيح البخاري — كتاب الأدب',
  },
  {
    name: 'الزهد',
    icon: '☆',
    description: 'توفّي ﷺ ودرعه مرهونة عند يهودي بشعير. وكان يمرّ الشهر والشهران لا تُوقد في بيته نار. وكان يُؤثر على نفسه.',
    hadith: 'ما شبع آل محمد ﷺ من طعام ثلاثة أيام تباعاً حتى قُبض',
    source: 'صحيح البخاري — كتاب الرقائق',
  },
];

const DAILY_HABITS: DailyHabit[] = [
  {
    time: 'النوم والاستيقاظ',
    title: 'النوم المبارك',
    description: 'كان ﷺ يُؤخّر العشاء ويُبكّر الفجر. ينام على شقّه الأيمن مستقبلاً القبلة. ويقرأ المعوّذتين وآية الكرسي قبل نومه.',
    hadith: 'كان ﷺ إذا أوى إلى فراشه قرأ: قل هو الله أحد والمعوّذتين ونفث في يديه ومسح بهما وجهه وما استطاع من جسده',
    source: 'صحيح البخاري — كتاب فضائل القرآن',
  },
  {
    time: 'الأكل والشرب',
    title: 'آداب الطعام',
    description: 'كان ﷺ يأكل بيمينه ومما يليه. لم يُذمّ طعاماً قط — إن اشتهاه أكل وإلا تركه. وكان يتنفّس خارج الإناء ثلاثاً.',
    hadith: 'يا غلام، سمّ الله، وكُل بيمينك، وكُل مما يليك',
    source: 'صحيح البخاري — كتاب الأطعمة',
  },
  {
    time: 'مع أهله',
    title: 'في البيت',
    description: 'كان ﷺ في خدمة أهله يخصف نعله ويرقع ثوبه ويحلب شاته. وكان ألطف الناس مع زوجاته ويُسابق عائشة ويمزح معها.',
    hadith: 'كان في مهنة أهله — يخصف نعله ويرقع ثوبه ويحلب شاته — فإذا حضرت الصلاة خرج إليها',
    source: 'مسند أحمد — شرح السنة للبغوي',
  },
  {
    time: 'عبادته',
    title: 'قيام الليل',
    description: 'كان ﷺ يقوم الليل حتى تتفطّر قدماه. فلما قيل له: ألم يغفر الله لك ما تقدّم من ذنبك؟ قال: أفلا أكون عبداً شكوراً.',
    hadith: 'كان يقوم من الليل حتى تتفطّر قدماه، فقالت عائشة: يا رسول الله، لِمَ تصنع هذا وقد غفر الله لك؟ فقال: أفلا أحبّ أن أكون عبداً شكوراً',
    source: 'صحيح البخاري — كتاب التهجد',
  },
];

const TESTIMONIES: CompanionTestimony[] = [
  {
    name: 'السيدة خديجة رضي الله عنها',
    role: 'أول من آمن به ﷺ',
    quote: 'كلا والله لا يُخزيك الله أبداً، إنك لتصل الرحم، وتحمل الكَل، وتكسب المعدوم، وتَقري الضيف، وتُعين على نوائب الحق',
    source: 'صحيح البخاري — كتاب بدء الوحي',
  },
  {
    name: 'علي بن أبي طالب رضي الله عنه',
    role: 'ابن عمه وصهره',
    quote: 'كان رسول الله ﷺ أوسع الناس صدراً، وأصدق الناس لهجةً، وألينهم عريكةً، وأكرمهم عِشرةً، من رآه بَديهةً هابه، ومن خالطه معرفةً أحبّه',
    source: 'الشمائل المحمدية للترمذي',
  },
  {
    name: 'السيدة عائشة رضي الله عنها',
    role: 'زوجه وأعلم الناس بسيرته',
    quote: 'كان خُلقه القرآن — إذا كان مزاحاً مع أهله وإذا جدّ جدّ. وما ضرب بيده خادماً قط ولا امرأةً ولا دابةً إلا في سبيل الله',
    source: 'صحيح مسلم — كتاب الفضائل',
  },
  {
    name: 'أنس بن مالك رضي الله عنه',
    role: 'خادمه عشر سنوات',
    quote: 'خدمتُ رسول الله ﷺ عشر سنين، فما قال لي لشيء فعلتُه: لِمَ فعلتَه؟ ولا لشيء تركتُه: لِمَ تركتَه؟ وكان أحسن الناس خُلقاً',
    source: 'صحيح مسلم — كتاب الفضائل',
  },
  {
    name: 'هند بن أبي هالة رضي الله عنه',
    role: 'ربيبه وصفه وصفاً دقيقاً',
    quote: 'كان رسول الله ﷺ متواصل الأحزان، دائم الفكرة، ليست له راحة، لا يتكلم في غير حاجة، طويل الصمت، يفتتح الكلام ويختمه بأشداقه، ويتكلم بجوامع الكَلِم',
    source: 'الشمائل المحمدية للترمذي — دلائل النبوة للبيهقي',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5 },
  }),
};

const CharacterPage: React.FC = () => {
  const navigate = useNavigate();
  const [expandedTrait, setExpandedTrait] = useState<number | null>(null);

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: '#030813' }}>
      {/* زر المشاركة */}
      <div className="fixed top-[72px] left-4 z-[60]">
        <ShareButton title="شمائل النبي ﷺ" accentColor="#C9A84C" />
      </div>
      <SectionNavigator sections={CHAR_SECTIONS} accentColor="#C9A84C" />
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
      <div className="absolute top-6 right-20 z-20 max-w-[calc(100vw-6rem)]">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs"
          style={{ color: 'rgba(201,168,76,0.5)' }}
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 transition-colors hover:text-islamic-gold"
            style={{ color: 'rgba(201,168,76,0.6)' }}
          >
            <Home size={12} />
            <span>الرئيسية</span>
          </button>
          <ChevronLeft size={10} className="rotate-180" />
          <span style={{ color: 'rgba(201,168,76,0.9)' }}>صفاته ﷺ</span>
        </motion.nav>
      </div>

      {/* Hero verse */}
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
            fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
            color: '#C9A84C',
            textShadow: '0 0 30px rgba(201,168,76,0.35)',
            lineHeight: 2,
          }}
        >
          ﴿وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ﴾
        </p>
        <p className="font-kufi text-sm" style={{ color: 'rgba(201,168,76,0.6)' }}>
          القلم: 4
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
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          صفاته ﷺ
        </motion.h1>
        <p className="font-noto mt-3 text-center" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1rem' }}>
          الشمائل المحمدية — صورة المصطفى ﷺ في أوصاف الصحابة والكتب
        </p>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-24 space-y-24">

        {/* Section 1: المظهر الكريم */}
        <section id="chr-appearance">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="font-kufi font-bold"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
                color: '#C9A84C',
              }}
            >
              مظهره الكريم ﷺ
            </h2>
            <p className="font-noto mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.95)' }}>
              كما وصفه الصحابة الذين رأوه وعاشوا معه
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {APPEARANCE.map((item, i) => (
              <motion.div
                key={item.trait}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl p-5"
                style={{
                  background: 'rgba(201,168,76,0.04)',
                  border: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                <h3
                  className="font-kufi font-bold mb-2"
                  style={{ color: '#C9A84C', fontSize: '1rem' }}
                >
                  {item.trait}
                </h3>
                <p
                  className="font-noto mb-3"
                  style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.9rem', lineHeight: 1.8 }}
                >
                  {item.description}
                </p>
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: 'rgba(201,168,76,0.06)',
                    borderRight: '2px solid rgba(201,168,76,0.4)',
                  }}
                >
                  <p
                    className="font-noto italic"
                    style={{ color: 'rgba(201,168,76,0.9)', fontSize: '0.85rem', lineHeight: 1.8 }}
                  >
                    "{item.hadith}"
                  </p>
                  <p className="font-kufi mt-1" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.88rem' }}>
                    {item.source}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 2: أخلاقه العظيمة */}
        <section id="chr-traits">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="font-kufi font-bold"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#C9A84C' }}
            >
              أخلاقه العظيمة ﷺ
            </h2>
            <p className="font-noto mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.95)' }}>
              كان خُلقه القرآن
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHARACTER_TRAITS.map((trait, i) => (
              <motion.div
                key={trait.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl p-5 cursor-pointer transition-all"
                style={{
                  background: expandedTrait === i
                    ? 'rgba(201,168,76,0.1)'
                    : 'rgba(201,168,76,0.04)',
                  border: `1px solid ${expandedTrait === i ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.12)'}`,
                }}
                onClick={() => setExpandedTrait(expandedTrait === i ? null : i)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span style={{ color: '#C9A84C', fontSize: '1.2rem' }}>{trait.icon}</span>
                  <h3 className="font-kufi font-bold" style={{ color: '#C9A84C' }}>
                    {trait.name}
                  </h3>
                </div>
                <p
                  className="font-noto"
                  style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.85rem', lineHeight: 1.8 }}
                >
                  {trait.description}
                </p>
                <AnimatePresence>
                  {expandedTrait === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 overflow-hidden"
                    >
                      <div
                        className="rounded-xl p-3"
                        style={{
                          background: 'rgba(0,0,0,0.2)',
                          borderRight: '2px solid rgba(201,168,76,0.4)',
                        }}
                      >
                        <p
                          className="font-noto italic"
                          style={{ color: 'rgba(201,168,76,0.85)', fontSize: '0.82rem', lineHeight: 1.8 }}
                        >
                          "{trait.hadith}"
                        </p>
                        <p className="font-kufi mt-1" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.86rem' }}>
                          {trait.source}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex justify-center mt-3">
                  <motion.div
                    animate={{ rotate: expandedTrait === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown size={14} style={{ color: 'rgba(201,168,76,0.4)' }} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: عاداته اليومية */}
        <section id="chr-habits">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="font-kufi font-bold"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#C9A84C' }}
            >
              عاداته اليومية ﷺ
            </h2>
            <p className="font-noto mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.95)' }}>
              كيف كان يعيش في يومه المبارك
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute right-6 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.3), transparent)' }}
            />

            <div className="space-y-8 pr-16">
              {DAILY_HABITS.map((habit, i) => (
                <motion.div
                  key={habit.title}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute -right-10 top-5 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{
                      background: '#030813',
                      border: '2px solid rgba(201,168,76,0.5)',
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: '#C9A84C' }}
                    />
                  </div>

                  <div
                    className="rounded-2xl p-5"
                    style={{
                      background: 'rgba(201,168,76,0.04)',
                      border: '1px solid rgba(201,168,76,0.12)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="font-kufi text-xs px-2 py-1 rounded-full"
                        style={{
                          background: 'rgba(201,168,76,0.12)',
                          color: 'rgba(201,168,76,0.8)',
                        }}
                      >
                        {habit.time}
                      </span>
                      <h3 className="font-kufi font-bold" style={{ color: 'white', fontSize: '1rem' }}>
                        {habit.title}
                      </h3>
                    </div>
                    <p
                      className="font-noto mb-3"
                      style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.9rem', lineHeight: 1.8 }}
                    >
                      {habit.description}
                    </p>
                    {habit.hadith && (
                      <div
                        className="rounded-xl p-3"
                        style={{
                          background: 'rgba(201,168,76,0.05)',
                          borderRight: '2px solid rgba(201,168,76,0.35)',
                        }}
                      >
                        <p
                          className="font-noto italic"
                          style={{ color: 'rgba(201,168,76,0.85)', fontSize: '0.85rem', lineHeight: 1.8 }}
                        >
                          "{habit.hadith}"
                        </p>
                        {habit.source && (
                          <p className="font-kufi mt-1" style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.88rem' }}>
                            {habit.source}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: كيف وصفه الصحابة */}
        <section id="chr-testimony">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2
              className="font-kufi font-bold"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#C9A84C' }}
            >
              كيف وصفه الصحابة
            </h2>
            <p className="font-noto mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.95)' }}>
              شهادات من عاشوا في كنفه ورأوا نوره عن كثب
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TESTIMONIES.map((testimony, i) => (
              <motion.div
                key={testimony.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(201,168,76,0.04)',
                  border: '1px solid rgba(201,168,76,0.15)',
                }}
              >
                <div
                  className="text-3xl mb-4 text-right"
                  style={{ color: 'rgba(201,168,76,0.25)', fontFamily: 'serif' }}
                >
                  ❝
                </div>
                <p
                  className="font-noto mb-4"
                  style={{ color: 'rgba(255,255,255,0.96)', fontSize: '0.95rem', lineHeight: 2 }}
                >
                  {testimony.quote}
                </p>
                <div className="border-t pt-3" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                  <p className="font-kufi font-bold text-sm" style={{ color: '#C9A84C' }}>
                    {testimony.name}
                  </p>
                  <p className="font-noto text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.95)' }}>
                    {testimony.role}
                  </p>
                  <p className="font-kufi text-xs mt-1" style={{ color: 'rgba(255,255,255,0.92)' }}>
                    {testimony.source}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer verse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center py-10"
        >
          <div
            className="w-12 h-px mx-auto mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }}
          />
          <p
            className="font-noto"
            style={{ color: 'rgba(255,255,255,0.95)', fontSize: '0.9rem', lineHeight: 1.8 }}
          >
            اللهم صلّ وسلّم على سيدنا محمد وعلى آله وصحبه أجمعين
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

export default CharacterPage;
