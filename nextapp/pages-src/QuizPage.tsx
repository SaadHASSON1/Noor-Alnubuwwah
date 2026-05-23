'use client';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, CheckCircle, XCircle, Award, RotateCcw, Shuffle } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface Question {
  question: string; questionEn: string;
  options: string[]; optionsEn: string[];
  correct: number;
  category: 'مكة' | 'المدينة' | 'الغزوات' | 'الصحابة' | 'القرآن' | 'الشمائل';
}

const CATEGORY_LABELS_EN: Record<string, string> = {
  'مكة':      'Mecca',
  'المدينة':  'Medina',
  'الغزوات':  'Battles',
  'الصحابة':  'Companions',
  'القرآن':   'Quran',
  'الشمائل':  'Character',
};

const QUESTION_POOL: Question[] = [
  // مكة / Mecca
  {
    question: 'في أي عام وُلد النبي ﷺ؟',
    questionEn: 'In which year was the Prophet ﷺ born?',
    options: ['571 م', '560 م', '580 م', '550 م'],
    optionsEn: ['571 CE', '560 CE', '580 CE', '550 CE'],
    correct: 0,
    category: 'مكة',
  },
  {
    question: 'في أي غار نزل الوحي على النبي ﷺ لأول مرة؟',
    questionEn: 'In which cave did revelation first descend upon the Prophet ﷺ?',
    options: ['غار حراء', 'غار ثور', 'غار الكهف', 'غار النور'],
    optionsEn: ["Cave of Hira'", 'Cave of Thawr', 'Cave of the Sleepers', 'Cave of Light'],
    correct: 0,
    category: 'مكة',
  },
  {
    question: 'كم استمرت الدعوة السرية في مكة؟',
    questionEn: 'How long did the secret preaching in Mecca last?',
    options: ['ثلاث سنوات', 'سنة واحدة', 'خمس سنوات', 'سبع سنوات'],
    optionsEn: ['Three years', 'One year', 'Five years', 'Seven years'],
    correct: 0,
    category: 'مكة',
  },
  {
    question: 'ما اسم أبي النبي ﷺ؟',
    questionEn: "What was the name of the Prophet's ﷺ father?",
    options: ['عبدالله بن عبد المطلب', 'عبد المطلب', 'عبد مناف', 'أبو طالب'],
    optionsEn: ['Abdullah ibn Abd al-Muttalib', 'Abd al-Muttalib', 'Abd Manaf', 'Abu Talib'],
    correct: 0,
    category: 'مكة',
  },
  {
    question: 'ما اسم مرضعة النبي ﷺ التي أرضعته في البادية؟',
    questionEn: "What was the name of the Prophet's ﷺ wet nurse who nursed him in the desert?",
    options: ['حليمة السعدية', 'ثويبة الأسلمية', 'فاطمة بنت أسد', 'أم أيمن'],
    optionsEn: ["Halimah al-Sa'diyyah", 'Thuwaybah al-Aslamiyyah', 'Fatimah bint Asad', 'Umm Ayman'],
    correct: 0,
    category: 'مكة',
  },
  {
    question: 'ما اسم الحادثة التي أراد فيها أبرهة هدم الكعبة؟',
    questionEn: 'What is the name of the event in which Abraha attempted to demolish the Kaaba?',
    options: ['حادثة الفيل', 'حادثة الغراب', 'حادثة البئر', 'حادثة السيل'],
    optionsEn: ['Incident of the Elephant', 'Incident of the Crow', 'Incident of the Well', 'Incident of the Flood'],
    correct: 0,
    category: 'مكة',
  },
  // المدينة / Medina
  {
    question: 'في أي عام هاجر النبي ﷺ إلى المدينة المنورة؟',
    questionEn: 'In which year did the Prophet ﷺ migrate to Medina?',
    options: ['622 م', '620 م', '618 م', '625 م'],
    optionsEn: ['622 CE', '620 CE', '618 CE', '625 CE'],
    correct: 0,
    category: 'المدينة',
  },
  {
    question: 'كم يوماً مكث النبي ﷺ في غار ثور مع أبي بكر الصديق؟',
    questionEn: 'How many days did the Prophet ﷺ stay in the Cave of Thawr with Abu Bakr al-Siddiq?',
    options: ['3 أيام', '7 أيام', 'يوم واحد', '5 أيام'],
    optionsEn: ['3 days', '7 days', '1 day', '5 days'],
    correct: 0,
    category: 'المدينة',
  },
  {
    question: 'أين بنى النبي ﷺ أول مسجد له في المدينة؟',
    questionEn: 'Where did the Prophet ﷺ build his first mosque upon arriving in Medina?',
    options: ['قباء', 'بني سالم', 'بني النجار', 'بطحاء المدينة'],
    optionsEn: ['Quba', 'Banu Salim', 'Banu al-Najjar', 'Batha of Medina'],
    correct: 0,
    category: 'المدينة',
  },
  {
    question: 'ما اسم الدابة التي أُسري على ظهرها النبي ﷺ ليلة الإسراء والمعراج؟',
    questionEn: 'What was the name of the creature the Prophet ﷺ rode on the Night Journey and Ascension?',
    options: ['البراق', 'الخيل الأبيض', 'الطيف', 'الريح'],
    optionsEn: ['Al-Buraq', 'The White Horse', 'Al-Tayf', 'Al-Rih'],
    correct: 0,
    category: 'المدينة',
  },
  {
    question: 'ما اسم من آخى النبي ﷺ بينه وبين عبد الرحمن بن عوف؟',
    questionEn: 'Who did the Prophet ﷺ pair with Abd al-Rahman ibn Awf in the brotherhood pact?',
    options: ['سعد بن الربيع', 'أبو طلحة الأنصاري', 'سعد بن معاذ', 'عبادة بن الصامت'],
    optionsEn: ["Sa'd ibn al-Rabi'", 'Abu Talhah al-Ansari', "Sa'd ibn Mu'adh", "'Ubadah ibn al-Samit"],
    correct: 0,
    category: 'المدينة',
  },
  // الغزوات / Battles
  {
    question: 'في أي عام هجري وقعت غزوة بدر الكبرى؟',
    questionEn: 'In which Hijri year did the Battle of Badr take place?',
    options: ['2 هـ', '1 هـ', '3 هـ', '4 هـ'],
    optionsEn: ['2 AH', '1 AH', '3 AH', '4 AH'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'كم كان عدد المسلمين في غزوة بدر الكبرى؟',
    questionEn: 'How many Muslims fought in the Battle of Badr?',
    options: ['313', '300', '500', '700'],
    optionsEn: ['313', '300', '500', '700'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'من صاحب فكرة حفر الخندق في غزوة الأحزاب؟',
    questionEn: 'Who proposed the idea of digging the trench in the Battle of the Confederates?',
    options: ['سلمان الفارسي', 'عمر بن الخطاب', 'علي بن أبي طالب', 'سعد بن معاذ'],
    optionsEn: ['Salman al-Farisi', 'Umar ibn al-Khattab', 'Ali ibn Abi Talib', "Sa'd ibn Mu'adh"],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'كم عدد المقاتلين الذين خرج بهم النبي ﷺ في فتح مكة؟',
    questionEn: 'How many fighters did the Prophet ﷺ march with in the Conquest of Mecca?',
    options: ['عشرة آلاف', 'ستة آلاف', 'ثلاثة آلاف', 'ألف وأربعمئة'],
    optionsEn: ['Ten thousand', 'Six thousand', 'Three thousand', 'Fourteen hundred'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'في أي غزوة شُرّعت صلاة الخوف لأول مرة؟',
    questionEn: 'In which battle was the Fear Prayer first prescribed?',
    options: ['ذات الرقاع', 'بدر', 'أحد', 'الخندق'],
    optionsEn: ['Dhat al-Riqa', 'Badr', 'Uhud', 'al-Khandaq'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'ما كان اسم القائد الذي التفّ بفرسان قريش من الخلف في غزوة أحد؟',
    questionEn: "Who led the Quraysh cavalry in a flanking maneuver from behind at the Battle of Uhud?",
    options: ['خالد بن الوليد', 'أبو سفيان', 'عمرو بن العاص', 'عكرمة بن أبي جهل'],
    optionsEn: ['Khalid ibn al-Walid', 'Abu Sufyan', 'Amr ibn al-As', 'Ikrimah ibn Abi Jahl'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'كم يوماً دام حصار بني قريظة؟',
    questionEn: 'How many days did the siege of Banu Qurayza last?',
    options: ['خمسة وعشرون يوماً', 'خمسة عشر يوماً', 'عشرة أيام', 'ثلاثون يوماً'],
    optionsEn: ['Twenty-five days', 'Fifteen days', 'Ten days', 'Thirty days'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'ما الغزوة التي وقع فيها حادثة الإفك؟',
    questionEn: 'In which battle did the Incident of the Slander (al-Ifk) occur?',
    options: ['غزوة بني المصطلق', 'غزوة أحد', 'غزوة بدر', 'غزوة الخندق'],
    optionsEn: ['Battle of Banu al-Mustaliq', 'Battle of Uhud', 'Battle of Badr', 'Battle of al-Khandaq'],
    correct: 0,
    category: 'الغزوات',
  },
  // الصحابة / Companions
  {
    question: 'من أول من أسلم من الرجال الكبار؟',
    questionEn: 'Who was the first adult free man to embrace Islam?',
    options: ['أبو بكر الصديق', 'علي بن أبي طالب', 'خديجة بنت خويلد', 'زيد بن حارثة'],
    optionsEn: ['Abu Bakr al-Siddiq', 'Ali ibn Abi Talib', 'Khadijah bint Khuwaylid', 'Zayd ibn Harithah'],
    correct: 0,
    category: 'الصحابة',
  },
  {
    question: 'كم غزوة شارك فيها النبي ﷺ بنفسه؟',
    questionEn: 'How many battles did the Prophet ﷺ personally participate in?',
    options: ['27', '15', '30', '20'],
    optionsEn: ['27', '15', '30', '20'],
    correct: 0,
    category: 'الصحابة',
  },
  {
    question: 'من صحب النبي ﷺ في رحلة الهجرة من مكة إلى المدينة؟',
    questionEn: 'Who accompanied the Prophet ﷺ on the migration journey from Mecca to Medina?',
    options: ['أبو بكر الصديق', 'عمر بن الخطاب', 'علي بن أبي طالب', 'عثمان بن عفان'],
    optionsEn: ['Abu Bakr al-Siddiq', 'Umar ibn al-Khattab', 'Ali ibn Abi Talib', 'Uthman ibn Affan'],
    correct: 0,
    category: 'الصحابة',
  },
  {
    question: 'من لُقّب بـ"سيف الله المسلول"؟',
    questionEn: 'Who was given the title "Sword of Allah Unsheathed"?',
    options: ['خالد بن الوليد', 'علي بن أبي طالب', 'الزبير بن العوام', 'عمرو بن العاص'],
    optionsEn: ['Khalid ibn al-Walid', 'Ali ibn Abi Talib', 'Al-Zubayr ibn al-Awwam', 'Amr ibn al-As'],
    correct: 0,
    category: 'الصحابة',
  },
  {
    question: 'من قال لما مات النبي ﷺ: "من كان يعبد محمداً فإن محمداً قد مات"؟',
    questionEn: 'Who said after the Prophet\'s ﷺ death: "Whoever worshipped Muhammad, Muhammad has died"?',
    options: ['أبو بكر الصديق', 'عمر بن الخطاب', 'علي بن أبي طالب', 'عثمان بن عفان'],
    optionsEn: ['Abu Bakr al-Siddiq', 'Umar ibn al-Khattab', 'Ali ibn Abi Talib', 'Uthman ibn Affan'],
    correct: 0,
    category: 'الصحابة',
  },
  // القرآن / Quran
  {
    question: 'في أي شهر نزل الوحي على النبي ﷺ لأول مرة؟',
    questionEn: 'In which month did revelation first descend upon the Prophet ﷺ?',
    options: ['رمضان', 'شعبان', 'ذو القعدة', 'محرم'],
    optionsEn: ['Ramadan', "Sha'ban", "Dhu al-Qi'dah", 'Muharram'],
    correct: 0,
    category: 'القرآن',
  },
  {
    question: 'ما أول ما نزل من القرآن الكريم؟',
    questionEn: 'What was the first verse of the Quran to be revealed?',
    options: ['اقرأ باسم ربك الذي خلق', 'يا أيها المدثر', 'بسم الله الرحمن الرحيم', 'الحمد لله رب العالمين'],
    optionsEn: ['"Read in the name of your Lord who created"', '"O you wrapped in garments"', '"In the name of Allah, the Most Gracious"', '"All praise be to Allah, Lord of all worlds"'],
    correct: 0,
    category: 'القرآن',
  },
  {
    question: 'كم سنة استغرق نزول القرآن الكريم؟',
    questionEn: 'How many years did the revelation of the Quran take in total?',
    options: ['23 سنة', '13 سنة', '10 سنوات', '30 سنة'],
    optionsEn: ['23 years', '13 years', '10 years', '30 years'],
    correct: 0,
    category: 'القرآن',
  },
  {
    question: 'ما آخر آية نزلت في القرآن الكريم وفق الجمهور؟',
    questionEn: 'According to the majority of scholars, what was the last Quranic verse revealed?',
    options: ['اليوم أكملت لكم دينكم', 'واتقوا يوماً ترجعون فيه إلى الله', 'إذا جاء نصر الله والفتح', 'وما محمد إلا رسول'],
    optionsEn: ['"Today I have perfected your religion for you"', '"Fear a Day when you will be returned to Allah"', '"When the victory of Allah comes and the conquest"', '"Muhammad is not but a messenger"'],
    correct: 0,
    category: 'القرآن',
  },
  // الشمائل / Character
  {
    question: 'كم سنة عاش النبي ﷺ؟',
    questionEn: 'How many years did the Prophet ﷺ live?',
    options: ['63', '60', '70', '55'],
    optionsEn: ['63', '60', '70', '55'],
    correct: 0,
    category: 'الشمائل',
  },
  {
    question: 'ما اللقب الذي أطلقه الناس على النبي ﷺ قبل البعثة؟',
    questionEn: "What title did people give the Prophet ﷺ before his prophethood?",
    options: ['الأمين', 'الصادق', 'الكريم', 'الحكيم'],
    optionsEn: ['Al-Amin (The Trustworthy)', 'Al-Sadiq (The Truthful)', 'Al-Karim (The Generous)', 'Al-Hakim (The Wise)'],
    correct: 0,
    category: 'الشمائل',
  },
  {
    question: 'في أي بيت توفي النبي ﷺ؟',
    questionEn: "In whose house did the Prophet ﷺ pass away?",
    options: ['بيت السيدة عائشة', 'بيت السيدة خديجة', 'بيت السيدة فاطمة', 'بيت السيدة زينب'],
    optionsEn: ["Lady Aisha's house", "Lady Khadijah's house", "Lady Fatimah's house", "Lady Zaynab's house"],
    correct: 0,
    category: 'الشمائل',
  },
  {
    question: 'ما آخر كلمة قالها النبي ﷺ قبل وفاته؟',
    questionEn: 'What were the last words the Prophet ﷺ uttered before his death?',
    options: ['اللهم الرفيق الأعلى', 'الصلاة الصلاة', 'أمتي أمتي', 'لا إله إلا الله'],
    optionsEn: ['"O Allah, the Highest Companion"', '"The prayer, the prayer"', '"My nation, my nation"', '"There is no god but Allah"'],
    correct: 0,
    category: 'الشمائل',
  },
];

const QUIZ_SIZE = 10;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickQuestions(): Question[] {
  return shuffleArray(QUESTION_POOL).slice(0, QUIZ_SIZE);
}

const CATEGORY_COLORS: Record<string, string> = {
  'مكة':      '#E8A84C',
  'المدينة':  '#4CA8E8',
  'الغزوات':  '#E84C4C',
  'الصحابة':  '#4CE88C',
  'القرآن':   '#A84CE8',
  'الشمائل':  '#E84CA8',
};

const QuizPage: React.FC = () => {
  const router = useRouter();
  const { isEn } = useLanguage();
  const [questions, setQuestions] = useState<Question[]>(() => pickQuestions());
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = questions[current];
  const totalQ = questions.length;

  const handleSelect = (optionIndex: number) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === question.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= totalQ) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = useCallback(() => {
    setQuestions(pickQuestions());
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  }, []);

  const getScoreMessage = () => {
    const pct = score / totalQ;
    if (isEn) {
      if (pct === 1)   return { text: 'Perfect! You are a true Seerah scholar!', color: '#4ade80' };
      if (pct >= 0.8)  return { text: 'Excellent! Your knowledge is impressive!', color: '#a3e635' };
      if (pct >= 0.6)  return { text: 'Good! More reading will complete your knowledge.', color: '#fbbf24' };
      if (pct >= 0.4)  return { text: 'Keep going! The Seerah deserves more attention.', color: '#fb923c' };
      return { text: 'Keep learning! The Seerah is a treasure that never ends.', color: '#f87171' };
    } else {
      if (pct === 1)   return { text: 'ممتاز! أنت حافظ السيرة النبوية', color: '#4ade80' };
      if (pct >= 0.8)  return { text: 'رائع جداً! معلوماتك قيّمة ومتميزة', color: '#a3e635' };
      if (pct >= 0.6)  return { text: 'جيد! مزيد من القراءة يُكمّل العلم', color: '#fbbf24' };
      if (pct >= 0.4)  return { text: 'حسن! السيرة النبوية تستحق مزيداً من الاهتمام', color: '#fb923c' };
      return { text: 'واصل التعلم! السيرة كنز لا ينضب', color: '#f87171' };
    }
  };

  const categoryColor = CATEGORY_COLORS[question?.category] ?? '#C9A84C';

  return (
    <div
      dir={isEn ? 'ltr' : 'rtl'}
      className="min-h-screen flex flex-col"
      style={{ background: '#030813' }}
    >
      {/* Share button */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'Test Your Knowledge' : 'اختبر معلوماتك'} accentColor="#C9A84C" />
      </div>

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${((i * 123.4) % 100).toFixed(1)}%`,
              top: `${((i * 79.6) % 100).toFixed(1)}%`,
              width: `${(0.5 + (i % 2) * 0.8).toFixed(1)}px`,
              height: `${(0.5 + (i % 2) * 0.8).toFixed(1)}px`,
              opacity: 0.25 + (i % 4) * 0.05,
            }}
          />
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="relative z-10 px-6 pt-6 pb-2">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs"
          style={{ color: '#C9A84C' }}
        >
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 hover:text-islamic-gold transition-colors"
            style={{ color: '#C9A84C' }}
          >
            <Home size={12} />
            <span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </button>
          <ChevronLeft size={10} className={isEn ? '' : 'rotate-180'} />
          <span style={{ color: '#C9A84C' }}>{isEn ? 'Interactive Quiz' : 'الاختبار التفاعلي'}</span>
        </motion.nav>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          {!finished ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h1
                  className="font-noto font-bold mb-1"
                  style={{
                    fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                    color: '#C9A84C',
                    textShadow: '0 0 20px rgba(201,168,76,0.3)',
                  }}
                >
                  {isEn ? 'Test Your Knowledge' : 'اختبر معلوماتك'}
                </h1>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <p className="font-noto text-white/40 text-sm">
                    {isEn
                      ? `Question ${current + 1} of ${totalQ}`
                      : `السؤال ${current + 1} من ${totalQ}`}
                  </p>
                  {question && (
                    <span
                      className="font-kufi text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: `${CATEGORY_COLORS[question.category]}18`,
                        color: CATEGORY_COLORS[question.category],
                        border: `1px solid ${CATEGORY_COLORS[question.category]}30`,
                      }}
                    >
                      {isEn ? CATEGORY_LABELS_EN[question.category] : question.category}
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div
                className="w-full h-1.5 rounded-full mb-6 overflow-hidden"
                style={{ background: 'rgba(201,168,76,0.1)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}80)`,
                  }}
                  initial={{ width: `${(current / totalQ) * 100}%` }}
                  animate={{ width: `${((current + (answered ? 1 : 0)) / totalQ) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: isEn ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isEn ? 30 : -30 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Question */}
                  <div
                    className="rounded-2xl p-6 mb-5"
                    style={{
                      background: 'rgba(201,168,76,0.05)',
                      border: '1px solid rgba(201,168,76,0.2)',
                    }}
                  >
                    <p
                      className="font-noto text-white text-center"
                      style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', lineHeight: 1.9 }}
                    >
                      {isEn ? question.questionEn : question.question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-3">
                    {question.options.map((option, idx) => {
                      let borderColor = 'rgba(201,168,76,0.2)';
                      let bg = 'rgba(255,255,255,0.02)';
                      let textColor = 'rgba(255,255,255,0.7)';
                      let icon = null;

                      if (answered) {
                        if (idx === question.correct) {
                          borderColor = 'rgba(100,200,120,0.6)';
                          bg = 'rgba(100,200,120,0.08)';
                          textColor = 'rgb(100,220,120)';
                          icon = <CheckCircle size={18} className="shrink-0" style={{ color: 'rgb(100,220,120)' }} />;
                        } else if (idx === selected && idx !== question.correct) {
                          borderColor = 'rgba(220,80,80,0.6)';
                          bg = 'rgba(220,80,80,0.08)';
                          textColor = 'rgb(220,100,100)';
                          icon = <XCircle size={18} className="shrink-0" style={{ color: 'rgb(220,100,100)' }} />;
                        }
                      } else if (selected === idx) {
                        borderColor = 'rgba(201,168,76,0.5)';
                        bg = 'rgba(201,168,76,0.1)';
                        textColor = '#C9A84C';
                      }

                      return (
                        <motion.button
                          key={idx}
                          onClick={() => handleSelect(idx)}
                          whileHover={!answered ? { scale: 1.01 } : undefined}
                          whileTap={!answered ? { scale: 0.99 } : undefined}
                          className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl transition-colors ${isEn ? 'text-left' : 'text-right'}`}
                          style={{
                            background: bg,
                            border: `1px solid ${borderColor}`,
                            color: textColor,
                            cursor: answered ? 'default' : 'pointer',
                          }}
                        >
                          <span className="font-kufi text-xs opacity-50 shrink-0 w-5 text-center">
                            {isEn ? ['A', 'B', 'C', 'D'][idx] : ['أ', 'ب', 'ج', 'د'][idx]}
                          </span>
                          <span className="font-noto flex-1" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                            {isEn ? question.optionsEn[idx] : option}
                          </span>
                          {icon}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Next button */}
                  {answered && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleNext}
                      className="w-full mt-5 py-4 rounded-xl font-kufi text-sm transition-all"
                      style={{
                        background: 'rgba(201,168,76,0.15)',
                        border: '1px solid rgba(201,168,76,0.4)',
                        color: '#C9A84C',
                      }}
                    >
                      {current + 1 >= totalQ
                        ? (isEn ? 'Show Results' : 'عرض النتيجة')
                        : (isEn ? '→ Next Question' : 'السؤال التالي ←')}
                    </motion.button>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            /* Results */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              {(() => {
                const { text, color } = getScoreMessage();
                const pct = (score / totalQ) * 100;
                return (
                  <>
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{
                        background: `${color}18`,
                        border: `2px solid ${color}60`,
                        color,
                      }}
                    >
                      <Award size={40} />
                    </div>

                    <h2
                      className="font-noto font-bold mb-2"
                      style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color }}
                    >
                      {score} / {totalQ}
                    </h2>

                    <p className="font-noto text-white/70 text-lg mb-2">{text}</p>

                    <div
                      className="w-full h-2 rounded-full my-6 overflow-hidden"
                      style={{ background: 'rgba(201,168,76,0.1)' }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${color}, ${color}99)` }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </div>

                    {/* Score breakdown */}
                    <div
                      className={`rounded-2xl p-4 mb-6 ${isEn ? 'text-left' : 'text-right'}`}
                      style={{
                        background: 'rgba(201,168,76,0.04)',
                        border: '1px solid rgba(201,168,76,0.15)',
                      }}
                    >
                      <p className="font-kufi text-xs mb-1" style={{ color: '#f2f3f3' }}>
                        {isEn ? 'Your Score' : 'تقييمك'}
                      </p>
                      <p className="font-noto text-sm" style={{ color: '#f2f3f3', lineHeight: 1.8 }}>
                        {isEn
                          ? `You answered ${score} out of ${totalQ} correctly — score: ${Math.round(pct)}%${pct < 70 ? ' — Keep reading the Seerah to improve!' : ' — May Allah bless you!'}`
                          : `أجبتَ على ${score} أسئلة صحيحة من أصل ${totalQ} — نسبتك ${Math.round(pct)}٪${pct < 70 ? ' — استمر في قراءة السيرة لتحسين نتيجتك!' : ' — بارك الله فيك!'}`}
                      </p>
                    </div>

                    <div className="flex gap-3 justify-center mt-4 flex-wrap">
                      <button
                        onClick={handleRestart}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-kufi text-sm transition-all"
                        style={{
                          background: 'rgba(201,168,76,0.12)',
                          border: '1px solid rgba(201,168,76,0.35)',
                          color: '#C9A84C',
                        }}
                      >
                        <Shuffle size={14} />
                        {isEn ? 'New Quiz (Different Questions)' : 'اختبار جديد (أسئلة مختلفة)'}
                      </button>
                      <button
                        onClick={() => {
                          setQuestions(pickQuestions());
                          setCurrent(0);
                          setSelected(null);
                          setScore(0);
                          setFinished(false);
                          setAnswered(false);
                        }}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-kufi text-sm transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#d2d3d5',
                        }}
                      >
                        <RotateCcw size={14} />
                        {isEn ? 'Repeat Same Questions' : 'إعادة نفس الأسئلة'}
                      </button>
                      <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-kufi text-sm transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#f2f3f3',
                        }}
                      >
                        <Home size={14} />
                        {isEn ? 'Home' : 'الرئيسية'}
                      </button>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;
