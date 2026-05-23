'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, ChevronDown } from 'lucide-react';
import SectionNavigator from '@/components/SectionNavigator';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface AppearanceCard {
  trait: string; traitEn: string;
  description: string; descriptionEn: string;
  hadith: string;
  source: string;
}

interface CharacterTrait {
  name: string; nameEn: string;
  icon: string;
  description: string; descriptionEn: string;
  hadith: string;
  source: string;
}

interface DailyHabit {
  time: string; timeEn: string;
  title: string; titleEn: string;
  description: string; descriptionEn: string;
  hadith?: string;
  source?: string;
}

interface CompanionTestimony {
  name: string; nameEn: string;
  role: string; roleEn: string;
  quote: string; quoteEn: string;
  source: string;
}

const APPEARANCE: AppearanceCard[] = [
  {
    trait: 'القامة والبنية', traitEn: 'Build & Stature',
    description: 'كان ﷺ مربوعاً ليس بالطويل الذاهب ولا بالقصير، بعيد ما بين المنكبين، عريض الصدر أبيضه.',
    descriptionEn: 'He ﷺ was of medium height — neither excessively tall nor short — with broad shoulders and a wide, bright chest.',
    hadith: 'كان رسول الله ﷺ أحسن الناس وجهاً وأحسنهم خَلقاً، لم يكن بالطويل البائن ولا بالقصير',
    source: 'صحيح البخاري — كتاب المناقب',
  },
  {
    trait: 'الوجه الكريم', traitEn: 'The Noble Face',
    description: 'كان وجهه ﷺ كالقمر يتلألأ — أزهر اللون مُشرب بحمرة، مستدير الوجه، واسع الجبهة.',
    descriptionEn: 'His ﷺ face shone like the moon — a bright complexion tinged with pink, round-shaped, with a wide forehead.',
    hadith: 'كان وجهه مثل الشمس والقمر، مستديراً',
    source: 'صحيح مسلم — كتاب الفضائل',
  },
  {
    trait: 'العينان الكريمتان', traitEn: 'The Blessed Eyes',
    description: 'كان ﷺ أدعج العينين — شديد سواد الحدقة — طويل الأهداب. يُقال إن عينيه كانتا تبرقان في الظلمة.',
    descriptionEn: 'His ﷺ eyes were deeply dark — with intensely black pupils and long lashes. It is said his eyes sparkled even in darkness.',
    hadith: 'كان أشكل العين — أي واسعها — وكان في عينيه حُمرة',
    source: 'السيرة النبوية لابن هشام — الشمائل المحمدية للترمذي',
  },
  {
    trait: 'الشعر المبارك', traitEn: 'The Blessed Hair',
    description: 'كان شعره ﷺ ليس بالجعد القطط ولا بالسبط — بل رَجِل كالموج. يصل إلى شحمة أذنيه أحياناً وإلى كتفيه أحياناً.',
    descriptionEn: 'His ﷺ hair was neither tightly curled nor straight — but wavy like waves. It reached his earlobes at times and his shoulders at others.',
    hadith: 'كان شعر رسول الله ﷺ إلى شحمة أذنيه، وربما بلغ كتفيه',
    source: 'صحيح البخاري — كتاب اللباس',
  },
  {
    trait: 'اليدان الشريفتان', traitEn: 'The Blessed Hands',
    description: 'كانت يداه ﷺ ضخمتين كأنهما قطنتان — ناعمتان. وصفها من لمسها بأنها أطيب من الحرير. لم يصافحه أحد إلا شعر بدفء ونور.',
    descriptionEn: 'His ﷺ hands were large and soft as cotton. Those who touched them described them as softer than silk. None shook his hand without feeling warmth and light.',
    hadith: 'ما مسستُ ديباجاً ولا حريراً ألين من كف رسول الله ﷺ',
    source: 'صحيح البخاري — كتاب الأدب',
  },
  {
    trait: 'الابتسامة النورانية', traitEn: 'The Radiant Smile',
    description: 'كان ﷺ كثير التبسّم بحيث يُرى بياض أسنانه. ولم يُر ضاحكاً قط قهقهةً. كان تبسّمه ﷺ كافياً ليملأ القلب سروراً.',
    descriptionEn: 'He ﷺ smiled so often that the whiteness of his teeth could be seen. He was never seen laughing aloud. His smile alone was enough to fill a heart with joy.',
    hadith: 'ما رأيتُ أحداً أكثر تبسماً من رسول الله ﷺ',
    source: 'الشمائل المحمدية للترمذي',
  },
  {
    trait: 'الرائحة العطرة', traitEn: 'The Fragrant Scent',
    description: 'كان ﷺ أطيب الناس رائحةً. مشى في طريق فمرّ بعده رجل فشمّ طيبه. وكان عرقه ﷺ في درّة اللؤلؤ طيباً.',
    descriptionEn: 'He ﷺ had the finest fragrance of all people. A man who walked the same path after him could smell his perfume. Even his perspiration ﷺ was as fragrant as pearls.',
    hadith: 'لم أشمّ قط عَنبراً ولا مسكاً ولا شيئاً أطيب من ريح رسول الله ﷺ',
    source: 'صحيح مسلم — كتاب الفضائل',
  },
  {
    trait: 'المشية المهيبة', traitEn: 'The Majestic Gait',
    description: 'كان ﷺ إذا مشى كأنما ينحدر من صبَب — يميل إلى الأمام برشاقة وقوة — وكان أسرع مشياً لم يُدرَك. وكان إذا أقبل أقبل جميعاً.',
    descriptionEn: 'When he ﷺ walked, it was as though he was descending a slope — leaning forward with grace and power — he walked so fast none could keep pace, and when he turned to face you, he turned completely.',
    hadith: 'كان إذا مشى تكفّأ تكفّؤاً كأنما يمشي في صَبَب، وما رأيتُ مثله قبله ولا بعده',
    source: 'الشمائل المحمدية للترمذي',
  },
];

const CHARACTER_TRAITS: CharacterTrait[] = [
  {
    name: 'الرحمة', nameEn: 'Mercy', icon: '❤',
    description: 'كان ﷺ يرحم الكبير والصغير والإنسان والحيوان. وبكى عند وفاة ابنه إبراهيم ودموعه رحمة من الله لا جزعاً.',
    descriptionEn: 'He ﷺ showed mercy to the old and young, to humans and animals alike. He wept at the death of his son Ibrahim — tears of divine mercy, not weakness.',
    hadith: 'لا تُنزع الرحمة إلا من شقيٍّ',
    source: 'سنن أبي داود — سنن الترمذي',
  },
  {
    name: 'الحلم والصبر', nameEn: 'Forbearance & Patience', icon: '☽',
    description: 'ما انتقم ﷺ لنفسه قط إلا أن تُنتهك حرمات الله. حتى من آذاه في جسده دعا له وعفا عنه يوم الفتح.',
    descriptionEn: 'He ﷺ never took revenge for himself except when the sanctities of Allah were violated. Even those who harmed him physically — he prayed for them and forgave them on the Day of Conquest.',
    hadith: 'ما انتقم رسول الله ﷺ لنفسه في شيء يُؤتى إليه قط، إلا أن تُنتهك محارم الله',
    source: 'صحيح البخاري — كتاب المناقب',
  },
  {
    name: 'الكرم', nameEn: 'Generosity', icon: '✦',
    description: 'كان ﷺ أجود الناس وأجوده في رمضان. ما سُئل شيئاً قط فقال لا. وأعطى رجلاً غنماً ملء شعب جبل.',
    descriptionEn: 'He ﷺ was the most generous of people, and most generous in Ramadan. He never refused a request with "no". He once gave a man a valley full of sheep.',
    hadith: 'كان رسول الله ﷺ أجود الناس، وكان أجود ما يكون في رمضان حين يلقاه جبريل',
    source: 'صحيح البخاري — كتاب بدء الوحي',
  },
  {
    name: 'الشجاعة', nameEn: 'Courage', icon: '⚔',
    description: 'كان ﷺ من أشجع الناس — ثبت يوم حنين بينما فرّ كثير من الصحابة. وكانوا إذا حمي الوطيس استتروا به.',
    descriptionEn: 'He ﷺ was among the bravest of people — he stood firm at the Battle of Hunayn when many Companions fled. In the heat of battle they would shelter behind him.',
    hadith: 'كنا إذا حمي الوطيس واشتدّ البأس لُذنا برسول الله ﷺ — وكان أقربنا إلى العدو',
    source: 'مسند أحمد — السيرة النبوية',
  },
  {
    name: 'التواضع', nameEn: 'Humility', icon: '◎',
    description: 'كان ﷺ يأكل مع الخادم ويجلس مع الفقراء ويعود المريض في أقصى المدينة. ونهى عن القيام له وقال: لا تُطروني.',
    descriptionEn: 'He ﷺ ate with servants, sat with the poor, and visited the sick at the far end of the city. He forbade people from standing for him and said: "Do not exaggerate in praising me."',
    hadith: 'كان رسول الله ﷺ يزور الأنصار ويُسلّم على صبيانهم ويمسح رؤوسهم',
    source: 'الشمائل المحمدية للترمذي',
  },
  {
    name: 'الصدق', nameEn: 'Truthfulness', icon: '◇',
    description: 'لُقّب بالأمين قبل النبوة بعشرين سنةً. وشهد له أعداؤه بالصدق — حتى أبو سفيان أقرّ بصدقه أمام هرقل.',
    descriptionEn: 'He was called "Al-Amin" (The Trustworthy) twenty years before prophethood. Even his enemies testified to his truthfulness — even Abu Sufyan acknowledged it before Heraclius.',
    hadith: 'سألني هرقل عن صفاته فأجبتُ، فقال: إن كان ما تقول حقاً فسيملك موضع قدمَيّ هاتين',
    source: 'صحيح البخاري — كتاب بدء الوحي',
  },
  {
    name: 'الحياء', nameEn: 'Modesty', icon: '◉',
    description: 'كان ﷺ أشدّ حياءً من العذراء في خدرها. وكان إذا كره شيئاً رُئي ذلك في وجهه ولا يصرّح به.',
    descriptionEn: 'He ﷺ was more modest than a virgin behind her veil. When he disliked something, it showed in his face but he would not say it outright.',
    hadith: 'كان رسول الله ﷺ أشدّ حياءً من العذراء في خدرها',
    source: 'صحيح البخاري — كتاب الأدب',
  },
  {
    name: 'الزهد', nameEn: 'Asceticism', icon: '☆',
    description: 'توفّي ﷺ ودرعه مرهونة عند يهودي بشعير. وكان يمرّ الشهر والشهران لا تُوقد في بيته نار. وكان يُؤثر على نفسه.',
    descriptionEn: 'He ﷺ passed away with his armour pledged to a Jew for barley. Months would pass without fire being lit in his home. He always preferred others over himself.',
    hadith: 'ما شبع آل محمد ﷺ من طعام ثلاثة أيام تباعاً حتى قُبض',
    source: 'صحيح البخاري — كتاب الرقائق',
  },
];

const DAILY_HABITS: DailyHabit[] = [
  {
    time: 'النوم والاستيقاظ', timeEn: 'Sleep & Waking',
    title: 'النوم المبارك', titleEn: 'Blessed Sleep',
    description: 'كان ﷺ يُؤخّر العشاء ويُبكّر الفجر. ينام على شقّه الأيمن مستقبلاً القبلة. ويقرأ المعوّذتين وآية الكرسي قبل نومه.',
    descriptionEn: 'He ﷺ delayed Isha and hastened to Fajr. He slept on his right side facing the qibla, and recited al-Mu\'awwidhatain and Ayat al-Kursi before sleeping.',
    hadith: 'كان ﷺ إذا أوى إلى فراشه قرأ: قل هو الله أحد والمعوّذتين ونفث في يديه ومسح بهما وجهه وما استطاع من جسده',
    source: 'صحيح البخاري — كتاب فضائل القرآن',
  },
  {
    time: 'الأكل والشرب', timeEn: 'Eating & Drinking',
    title: 'آداب الطعام', titleEn: 'Table Manners',
    description: 'كان ﷺ يأكل بيمينه ومما يليه. لم يُذمّ طعاماً قط — إن اشتهاه أكل وإلا تركه. وكان يتنفّس خارج الإناء ثلاثاً.',
    descriptionEn: 'He ﷺ ate with his right hand and from what was nearest him. He never criticised food — if he liked it he ate; otherwise he left it. He breathed outside the vessel three times.',
    hadith: 'يا غلام، سمّ الله، وكُل بيمينك، وكُل مما يليك',
    source: 'صحيح البخاري — كتاب الأطعمة',
  },
  {
    time: 'مع أهله', timeEn: 'With Family',
    title: 'في البيت', titleEn: 'At Home',
    description: 'كان ﷺ في خدمة أهله يخصف نعله ويرقع ثوبه ويحلب شاته. وكان ألطف الناس مع زوجاته ويُسابق عائشة ويمزح معها.',
    descriptionEn: 'He ﷺ served his household — mending his sandals, patching his garments, and milking his sheep. He was the gentlest of people with his wives, would race \'Aisha, and joke with her.',
    hadith: 'كان في مهنة أهله — يخصف نعله ويرقع ثوبه ويحلب شاته — فإذا حضرت الصلاة خرج إليها',
    source: 'مسند أحمد — شرح السنة للبغوي',
  },
  {
    time: 'عبادته', timeEn: 'His Worship',
    title: 'قيام الليل', titleEn: 'Night Prayer',
    description: 'كان ﷺ يقوم الليل حتى تتفطّر قدماه. فلما قيل له: ألم يغفر الله لك ما تقدّم من ذنبك؟ قال: أفلا أكون عبداً شكوراً.',
    descriptionEn: 'He ﷺ would stand in prayer through the night until his feet cracked. When asked why, since Allah had forgiven his past and future sins, he said: "Shall I not be a grateful servant?"',
    hadith: 'كان يقوم من الليل حتى تتفطّر قدماه، فقالت عائشة: يا رسول الله، لِمَ تصنع هذا وقد غفر الله لك؟ فقال: أفلا أحبّ أن أكون عبداً شكوراً',
    source: 'صحيح البخاري — كتاب التهجد',
  },
];

const TESTIMONIES: CompanionTestimony[] = [
  {
    name: 'السيدة خديجة رضي الله عنها', nameEn: 'Lady Khadijah (may Allah be pleased with her)',
    role: 'أول من آمن به ﷺ', roleEn: 'First to believe in him ﷺ',
    quote: 'كلا والله لا يُخزيك الله أبداً، إنك لتصل الرحم، وتحمل الكَل، وتكسب المعدوم، وتَقري الضيف، وتُعين على نوائب الحق',
    quoteEn: 'By Allah, He will never disgrace you. You maintain family ties, bear others\' burdens, give to the destitute, honour your guests, and assist those struck by calamities.',
    source: 'صحيح البخاري — كتاب بدء الوحي',
  },
  {
    name: 'علي بن أبي طالب رضي الله عنه', nameEn: 'Ali ibn Abi Talib (may Allah be pleased with him)',
    role: 'ابن عمه وصهره', roleEn: 'His cousin and son-in-law',
    quote: 'كان رسول الله ﷺ أوسع الناس صدراً، وأصدق الناس لهجةً، وألينهم عريكةً، وأكرمهم عِشرةً، من رآه بَديهةً هابه، ومن خالطه معرفةً أحبّه',
    quoteEn: 'The Messenger of Allah ﷺ was the most open-hearted, most truthful, the gentlest in manner, and the noblest in companionship. Whoever saw him at first was awed; whoever came to know him loved him.',
    source: 'الشمائل المحمدية للترمذي',
  },
  {
    name: 'السيدة عائشة رضي الله عنها', nameEn: 'Lady \'Aisha (may Allah be pleased with her)',
    role: 'زوجه وأعلم الناس بسيرته', roleEn: 'His wife and the most knowledgeable person about his life',
    quote: 'كان خُلقه القرآن — إذا كان مزاحاً مع أهله وإذا جدّ جدّ. وما ضرب بيده خادماً قط ولا امرأةً ولا دابةً إلا في سبيل الله',
    quoteEn: 'His character was the Quran — when he joked with his family he joked, and when he was serious he was serious. He never struck a servant, a woman, or an animal with his hand except in the cause of Allah.',
    source: 'صحيح مسلم — كتاب الفضائل',
  },
  {
    name: 'أنس بن مالك رضي الله عنه', nameEn: 'Anas ibn Malik (may Allah be pleased with him)',
    role: 'خادمه عشر سنوات', roleEn: 'His servant for ten years',
    quote: 'خدمتُ رسول الله ﷺ عشر سنين، فما قال لي لشيء فعلتُه: لِمَ فعلتَه؟ ولا لشيء تركتُه: لِمَ تركتَه؟ وكان أحسن الناس خُلقاً',
    quoteEn: 'I served the Messenger of Allah ﷺ for ten years. He never said to me about anything I did: "Why did you do that?" nor about anything I left: "Why did you leave that?" He had the finest character of all people.',
    source: 'صحيح مسلم — كتاب الفضائل',
  },
  {
    name: 'هند بن أبي هالة رضي الله عنه', nameEn: 'Hind ibn Abi Hala (may Allah be pleased with him)',
    role: 'ربيبه وصفه وصفاً دقيقاً', roleEn: 'His stepson who described him in detail',
    quote: 'كان رسول الله ﷺ متواصل الأحزان، دائم الفكرة، ليست له راحة، لا يتكلم في غير حاجة، طويل الصمت، يفتتح الكلام ويختمه بأشداقه، ويتكلم بجوامع الكَلِم',
    quoteEn: 'The Messenger of Allah ﷺ was continuously thoughtful, perpetually reflective, with no idle rest. He did not speak unless needed. He was long in silence, beginning and ending his speech with deliberateness, speaking with words of comprehensive meaning.',
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
  const router = useRouter();
  const { isEn } = useLanguage();
  const [expandedTrait, setExpandedTrait] = useState<number | null>(null);

  const CHAR_SECTIONS = [
    { id: 'chr-appearance', label: isEn ? 'Appearance'        : 'المظهر الكريم' },
    { id: 'chr-traits',     label: isEn ? 'Noble Character'   : 'أخلاقه العظيمة' },
    { id: 'chr-habits',     label: isEn ? 'Daily Habits'      : 'عاداته اليومية' },
    { id: 'chr-testimony',  label: isEn ? 'Companion Accounts': 'شهادات الصحابة' },
  ];

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen" style={{ background: '#030813' }}>
      {/* زر المشاركة */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'Character of the Prophet ﷺ' : 'شمائل النبي ﷺ'} accentColor="#C9A84C" />
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
      <div className={`absolute top-6 ${isEn ? 'left-20' : 'right-20'} z-20 max-w-[calc(100vw-6rem)]`}>
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs"
          style={{ color: '#C9A84C' }}
        >
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 transition-colors hover:text-islamic-gold"
            style={{ color: '#C9A84C' }}
          >
            <Home size={12} />
            <span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </button>
          <ChevronLeft size={10} className={isEn ? '' : 'rotate-180'} />
          <span style={{ color: '#C9A84C' }}>{isEn ? 'His Character ﷺ' : 'صفاته ﷺ'}</span>
        </motion.nav>
      </div>

      {/* Hero verse */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-16"
        style={{ background: 'linear-gradient(180deg, rgba(201,168,76,0.06) 0%, transparent 100%)' }}
      >
        <div className="w-16 h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
        <p
          className="font-noto text-center mb-3"
          dir="rtl"
          style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', color: '#C9A84C', textShadow: '0 0 30px rgba(201,168,76,0.35)', lineHeight: 2 }}
        >
          ﴿وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ﴾
        </p>
        {isEn && (
          <p className="font-noto text-center text-sm mb-1" style={{ color: '#C9A84C80', lineHeight: 1.8 }}>
            "And indeed, you are of a great moral character."
          </p>
        )}
        <p className="font-kufi text-sm" style={{ color: '#C9A84C' }}>
          {isEn ? 'Al-Qalam: 4' : 'القلم: 4'}
        </p>
        <div className="w-16 h-px mt-6" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-kufi font-bold mt-8 text-center"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'white', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
        >
          {isEn ? 'His Character ﷺ' : 'صفاته ﷺ'}
        </motion.h1>
        <p className="font-noto mt-3 text-center" style={{ color: '#d2d3d5', fontSize: '1rem' }}>
          {isEn
            ? 'The Prophetic Qualities — the image of the Chosen One ﷺ in Companion descriptions'
            : 'الشمائل المحمدية — صورة المصطفى ﷺ في أوصاف الصحابة والكتب'}
        </p>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-24 space-y-24">

        {/* Section 1: Appearance */}
        <section id="chr-appearance">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-kufi font-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#C9A84C' }}>
              {isEn ? 'His Noble Appearance ﷺ' : 'مظهره الكريم ﷺ'}
            </h2>
            <p className="font-noto mt-2 text-sm" style={{ color: '#f2f3f3' }}>
              {isEn
                ? 'As described by the Companions who saw him and lived with him'
                : 'كما وصفه الصحابة الذين رأوه وعاشوا معه'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {APPEARANCE.map((item, i) => (
              <motion.div
                key={item.trait} custom={i} variants={fadeUp}
                initial="hidden" whileInView="show" viewport={{ once: true }}
                className="rounded-2xl p-5"
                style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}
              >
                <h3 className="font-kufi font-bold mb-2 line-clamp-1" style={{ color: '#C9A84C', fontSize: '1rem' }}>
                  {isEn ? item.traitEn : item.trait}
                </h3>
                <p className="font-noto mb-3 line-clamp-3" style={{ color: '#f2f3f3', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  {isEn ? item.descriptionEn : item.description}
                </p>
                <div className="rounded-xl p-3" style={{ background: 'rgba(201,168,76,0.06)', borderRight: '2px solid rgba(201,168,76,0.4)' }}>
                  <p className="font-noto italic" dir="rtl" style={{ color: '#C9A84C', fontSize: '0.85rem', lineHeight: 1.8 }}>
                    "{item.hadith}"
                  </p>
                  <p className="font-kufi mt-1" style={{ color: '#f2f3f3', fontSize: '0.88rem' }}>
                    {item.source}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 2: Character Traits */}
        <section id="chr-traits">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-kufi font-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#C9A84C' }}>
              {isEn ? 'His Noble Character ﷺ' : 'أخلاقه العظيمة ﷺ'}
            </h2>
            <p className="font-noto mt-2 text-sm" style={{ color: '#f2f3f3' }}>
              {isEn ? '"His character was the Quran."' : 'كان خُلقه القرآن'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CHARACTER_TRAITS.map((trait, i) => (
              <motion.div
                key={trait.name} custom={i} variants={fadeUp}
                initial="hidden" whileInView="show" viewport={{ once: true }}
                className="rounded-2xl p-5 cursor-pointer transition-all"
                style={{
                  background: expandedTrait === i ? 'rgba(201,168,76,0.1)' : 'rgba(201,168,76,0.04)',
                  border: `1px solid ${expandedTrait === i ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.12)'}`,
                }}
                onClick={() => setExpandedTrait(expandedTrait === i ? null : i)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span style={{ color: '#C9A84C', fontSize: '1.2rem' }}>{trait.icon}</span>
                  <h3 className="font-kufi font-bold line-clamp-1" style={{ color: '#C9A84C' }}>
                    {isEn ? trait.nameEn : trait.name}
                  </h3>
                </div>
                <p className="font-noto line-clamp-3" style={{ color: '#e1e1e3', fontSize: '0.85rem', lineHeight: 1.8 }}>
                  {isEn ? trait.descriptionEn : trait.description}
                </p>
                <AnimatePresence>
                  {expandedTrait === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden"
                    >
                      <div className="rounded-xl p-3" style={{ background: 'rgba(0,0,0,0.2)', borderRight: '2px solid rgba(201,168,76,0.4)' }}>
                        <p className="font-noto italic" dir="rtl" style={{ color: '#C9A84C', fontSize: '0.82rem', lineHeight: 1.8 }}>
                          "{trait.hadith}"
                        </p>
                        <p className="font-kufi mt-1" style={{ color: '#f2f3f3', fontSize: '0.86rem' }}>
                          {trait.source}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="flex justify-center mt-3">
                  <motion.div animate={{ rotate: expandedTrait === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown size={14} style={{ color: '#C9A84C' }} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Daily Habits */}
        <section id="chr-habits">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-kufi font-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#C9A84C' }}>
              {isEn ? 'His Daily Habits ﷺ' : 'عاداته اليومية ﷺ'}
            </h2>
            <p className="font-noto mt-2 text-sm" style={{ color: '#f2f3f3' }}>
              {isEn ? 'How he lived in his blessed day' : 'كيف كان يعيش في يومه المبارك'}
            </p>
          </motion.div>

          <div className="relative">
            <div
              className={`absolute ${isEn ? 'left-6' : 'right-6'} top-0 bottom-0 w-px`}
              style={{ background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.3), transparent)' }}
            />
            <div className={`space-y-8 ${isEn ? 'pl-16' : 'pr-16'}`}>
              {DAILY_HABITS.map((habit, i) => (
                <motion.div
                  key={habit.title} custom={i} variants={fadeUp}
                  initial="hidden" whileInView="show" viewport={{ once: true }}
                  className="relative"
                >
                  <div
                    className={`absolute ${isEn ? '-left-10' : '-right-10'} top-5 w-4 h-4 rounded-full flex items-center justify-center`}
                    style={{ background: '#030813', border: '2px solid rgba(201,168,76,0.5)' }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: '#C9A84C' }} />
                  </div>
                  <div className="rounded-2xl p-5" style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)' }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-kufi text-xs px-2 py-1 rounded-full" style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C' }}>
                        {isEn ? habit.timeEn : habit.time}
                      </span>
                      <h3 className="font-kufi font-bold" style={{ color: 'white', fontSize: '1rem' }}>
                        {isEn ? habit.titleEn : habit.title}
                      </h3>
                    </div>
                    <p className="font-noto mb-3" style={{ color: '#e1e1e3', fontSize: '0.9rem', lineHeight: 1.8 }}>
                      {isEn ? habit.descriptionEn : habit.description}
                    </p>
                    {habit.hadith && (
                      <div className="rounded-xl p-3" style={{ background: 'rgba(201,168,76,0.05)', borderRight: '2px solid rgba(201,168,76,0.35)' }}>
                        <p className="font-noto italic" dir="rtl" style={{ color: '#C9A84C', fontSize: '0.85rem', lineHeight: 1.8 }}>
                          "{habit.hadith}"
                        </p>
                        {habit.source && (
                          <p className="font-kufi mt-1" style={{ color: '#f2f3f3', fontSize: '0.88rem' }}>
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

        {/* Section 4: Companion Testimonies */}
        <section id="chr-testimony">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-kufi font-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', color: '#C9A84C' }}>
              {isEn ? 'How the Companions Described Him' : 'كيف وصفه الصحابة'}
            </h2>
            <p className="font-noto mt-2 text-sm" style={{ color: '#f2f3f3' }}>
              {isEn
                ? 'Accounts from those who lived beside him and witnessed his light up close'
                : 'شهادات من عاشوا في كنفه ورأوا نوره عن كثب'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TESTIMONIES.map((testimony, i) => (
              <motion.div
                key={testimony.name} custom={i} variants={fadeUp}
                initial="hidden" whileInView="show" viewport={{ once: true }}
                className="rounded-2xl p-6"
                style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.15)' }}
              >
                <div className="text-3xl mb-4" style={{ color: '#C9A84C', fontFamily: 'serif', textAlign: isEn ? 'left' : 'right' }}>❝</div>
                <p className="font-noto mb-4 line-clamp-5" dir={isEn ? 'ltr' : 'rtl'} style={{ color: '#f5f5f6', fontSize: '0.95rem', lineHeight: 2 }}>
                  {isEn ? testimony.quoteEn : testimony.quote}
                </p>
                <div className="border-t pt-3" style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
                  <p className="font-kufi font-bold text-sm" style={{ color: '#C9A84C' }}>
                    {isEn ? testimony.nameEn : testimony.name}
                  </p>
                  <p className="font-noto text-xs mt-0.5" style={{ color: '#f2f3f3' }}>
                    {isEn ? testimony.roleEn : testimony.role}
                  </p>
                  <p className="font-kufi text-xs mt-1" style={{ color: '#ebebec' }}>
                    {testimony.source}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center py-10"
        >
          <div className="w-12 h-px mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }} />
          <p className="font-noto" dir="rtl" style={{ color: '#f2f3f3', fontSize: '0.9rem', lineHeight: 1.8 }}>
            اللهم صلّ وسلّم على سيدنا محمد وعلى آله وصحبه أجمعين
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-8 flex items-center gap-2 mx-auto px-6 py-2.5 rounded-full font-kufi text-sm transition-all"
            style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C' }}
          >
            <Home size={13} />
            {isEn ? 'Back to Home' : 'العودة للرئيسية'}
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default CharacterPage;
