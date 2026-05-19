import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, CheckCircle, XCircle, Award, RotateCcw, Shuffle } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
  category: 'مكة' | 'المدينة' | 'الغزوات' | 'الصحابة' | 'القرآن' | 'الشمائل';
}

const QUESTION_POOL: Question[] = [
  // مكة
  {
    question: 'في أي عام وُلد النبي ﷺ؟',
    options: ['٥٧١ م', '٥٦٠ م', '٥٨٠ م', '٥٥٠ م'],
    correct: 0,
    category: 'مكة',
  },
  {
    question: 'في أي غار نزل الوحي على النبي ﷺ لأول مرة؟',
    options: ['غار حراء', 'غار ثور', 'غار الكهف', 'غار النور'],
    correct: 0,
    category: 'مكة',
  },
  {
    question: 'كم استمرت الدعوة السرية في مكة؟',
    options: ['ثلاث سنوات', 'سنة واحدة', 'خمس سنوات', 'سبع سنوات'],
    correct: 0,
    category: 'مكة',
  },
  {
    question: 'ما اسم أبي النبي ﷺ؟',
    options: ['عبدالله بن عبد المطلب', 'عبد المطلب', 'عبد مناف', 'أبو طالب'],
    correct: 0,
    category: 'مكة',
  },
  {
    question: 'في أي شهر نزل الوحي على النبي ﷺ لأول مرة؟',
    options: ['رمضان', 'شعبان', 'ذو القعدة', 'محرم'],
    correct: 0,
    category: 'القرآن',
  },
  {
    question: 'ما اسم مرضعة النبي ﷺ التي أرضعته في البادية؟',
    options: ['حليمة السعدية', 'ثويبة الأسلمية', 'فاطمة بنت أسد', 'أم أيمن'],
    correct: 0,
    category: 'مكة',
  },
  {
    question: 'ما اسم الحادثة التي أراد فيها أبرهة هدم الكعبة؟',
    options: ['حادثة الفيل', 'حادثة الغراب', 'حادثة البئر', 'حادثة السيل'],
    correct: 0,
    category: 'مكة',
  },
  // المدينة
  {
    question: 'في أي عام هاجر النبي ﷺ إلى المدينة المنورة؟',
    options: ['٦٢٢ م', '٦٢٠ م', '٦١٨ م', '٦٢٥ م'],
    correct: 0,
    category: 'المدينة',
  },
  {
    question: 'كم يوماً مكث النبي ﷺ في غار ثور مع أبي بكر الصديق؟',
    options: ['٣ أيام', '٧ أيام', 'يوم واحد', '٥ أيام'],
    correct: 0,
    category: 'المدينة',
  },
  {
    question: 'أين بنى النبي ﷺ أول مسجد له في المدينة؟',
    options: ['قباء', 'بني سالم', 'بني النجار', 'بطحاء المدينة'],
    correct: 0,
    category: 'المدينة',
  },
  {
    question: 'ما اسم الدابة التي أُسري على ظهرها النبي ﷺ ليلة الإسراء والمعراج؟',
    options: ['البراق', 'الخيل الأبيض', 'الطيف', 'الريح'],
    correct: 0,
    category: 'المدينة',
  },
  {
    question: 'ما اسم من آخى النبي ﷺ بينه وبين عبد الرحمن بن عوف؟',
    options: ['سعد بن الربيع', 'أبو طلحة الأنصاري', 'سعد بن معاذ', 'عبادة بن الصامت'],
    correct: 0,
    category: 'المدينة',
  },
  // الغزوات
  {
    question: 'في أي عام هجري وقعت غزوة بدر الكبرى؟',
    options: ['٢ هـ', '١ هـ', '٣ هـ', '٤ هـ'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'كم كان عدد المسلمين في غزوة بدر الكبرى؟',
    options: ['٣١٣', '٣٠٠', '٥٠٠', '٧٠٠'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'من صاحب فكرة حفر الخندق في غزوة الأحزاب؟',
    options: ['سلمان الفارسي', 'عمر بن الخطاب', 'علي بن أبي طالب', 'سعد بن معاذ'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'كم عدد المقاتلين الذين خرج بهم النبي ﷺ في فتح مكة؟',
    options: ['عشرة آلاف', 'ستة آلاف', 'ثلاثة آلاف', 'ألف وأربعمئة'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'في أي غزوة شُرّعت صلاة الخوف لأول مرة؟',
    options: ['ذات الرقاع', 'بدر', 'أحد', 'الخندق'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'ما كان اسم القائد الذي التفّ بفرسان قريش من الخلف في غزوة أحد؟',
    options: ['خالد بن الوليد', 'أبو سفيان', 'عمرو بن العاص', 'عكرمة بن أبي جهل'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'كم يوماً دام حصار بني قريظة؟',
    options: ['خمسة وعشرون يوماً', 'خمسة عشر يوماً', 'عشرة أيام', 'ثلاثون يوماً'],
    correct: 0,
    category: 'الغزوات',
  },
  {
    question: 'ما الغزوة التي وقع فيها حادثة الإفك؟',
    options: ['غزوة بني المصطلق', 'غزوة أحد', 'غزوة بدر', 'غزوة الخندق'],
    correct: 0,
    category: 'الغزوات',
  },
  // الصحابة
  {
    question: 'من أول من أسلم من الرجال الكبار؟',
    options: ['أبو بكر الصديق', 'علي بن أبي طالب', 'خديجة بنت خويلد', 'زيد بن حارثة'],
    correct: 0,
    category: 'الصحابة',
  },
  {
    question: 'كم غزوة شارك فيها النبي ﷺ بنفسه؟',
    options: ['٢٧', '١٥', '٣٠', '٢٠'],
    correct: 0,
    category: 'الصحابة',
  },
  {
    question: 'من صحب النبي ﷺ في رحلة الهجرة من مكة إلى المدينة؟',
    options: ['أبو بكر الصديق', 'عمر بن الخطاب', 'علي بن أبي طالب', 'عثمان بن عفان'],
    correct: 0,
    category: 'الصحابة',
  },
  {
    question: 'من لُقّب بـ"سيف الله المسلول"؟',
    options: ['خالد بن الوليد', 'علي بن أبي طالب', 'الزبير بن العوام', 'عمرو بن العاص'],
    correct: 0,
    category: 'الصحابة',
  },
  {
    question: 'من قال لما مات النبي ﷺ: "من كان يعبد محمداً فإن محمداً قد مات"؟',
    options: ['أبو بكر الصديق', 'عمر بن الخطاب', 'علي بن أبي طالب', 'عثمان بن عفان'],
    correct: 0,
    category: 'الصحابة',
  },
  // القرآن
  {
    question: 'ما أول ما نزل من القرآن الكريم؟',
    options: ['اقرأ باسم ربك الذي خلق', 'يا أيها المدثر', 'بسم الله الرحمن الرحيم', 'الحمد لله رب العالمين'],
    correct: 0,
    category: 'القرآن',
  },
  {
    question: 'كم سنة استغرق نزول القرآن الكريم؟',
    options: ['٢٣ سنة', '١٣ سنة', '١٠ سنوات', '٣٠ سنة'],
    correct: 0,
    category: 'القرآن',
  },
  {
    question: 'ما آخر آية نزلت في القرآن الكريم وفق الجمهور؟',
    options: ['اليوم أكملت لكم دينكم', 'واتقوا يوماً ترجعون فيه إلى الله', 'إذا جاء نصر الله والفتح', 'وما محمد إلا رسول'],
    correct: 0,
    category: 'القرآن',
  },
  // الشمائل
  {
    question: 'كم سنة عاش النبي ﷺ؟',
    options: ['٦٣', '٦٠', '٧٠', '٥٥'],
    correct: 0,
    category: 'الشمائل',
  },
  {
    question: 'ما اللقب الذي أطلقه الناس على النبي ﷺ قبل البعثة؟',
    options: ['الأمين', 'الصادق', 'الكريم', 'الحكيم'],
    correct: 0,
    category: 'الشمائل',
  },
  {
    question: 'في أي بيت توفي النبي ﷺ؟',
    options: ['بيت السيدة عائشة', 'بيت السيدة خديجة', 'بيت السيدة فاطمة', 'بيت السيدة زينب'],
    correct: 0,
    category: 'الشمائل',
  },
  {
    question: 'ما آخر كلمة قالها النبي ﷺ قبل وفاته؟',
    options: ['اللهم الرفيق الأعلى', 'الصلاة الصلاة', 'أمتي أمتي', 'لا إله إلا الله'],
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
  'مكة': '#E8A84C',
  'المدينة': '#4CA8E8',
  'الغزوات': '#E84C4C',
  'الصحابة': '#4CE88C',
  'القرآن': '#A84CE8',
  'الشمائل': '#E84CA8',
};

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
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
    if (pct === 1) return { text: 'ممتاز! أنت حافظ السيرة النبوية', color: '#4ade80' };
    if (pct >= 0.8) return { text: 'رائع جداً! معلوماتك قيّمة ومتميزة', color: '#a3e635' };
    if (pct >= 0.6) return { text: 'جيد! مزيد من القراءة يُكمّل العلم', color: '#fbbf24' };
    if (pct >= 0.4) return { text: 'حسن! السيرة النبوية تستحق مزيداً من الاهتمام', color: '#fb923c' };
    return { text: 'واصل التعلم! السيرة كنز لا ينضب', color: '#f87171' };
  };

  const categoryColor = CATEGORY_COLORS[question?.category] ?? '#C9A84C';

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col"
      style={{ background: '#030813' }}
    >
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
          style={{ color: 'rgba(201,168,76,0.5)' }}
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 hover:text-islamic-gold transition-colors"
            style={{ color: 'rgba(201,168,76,0.6)' }}
          >
            <Home size={12} />
            <span>الرئيسية</span>
          </button>
          <ChevronLeft size={10} className="rotate-180" />
          <span style={{ color: 'rgba(201,168,76,0.9)' }}>الاختبار التفاعلي</span>
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
                  اختبر معلوماتك
                </h1>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <p className="font-noto text-white/40 text-sm">
                    السؤال {current + 1} من {totalQ}
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
                      {question.category}
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
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
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
                      {question.question}
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
                          className="w-full flex items-center gap-3 px-5 py-4 rounded-xl text-right transition-colors"
                          style={{
                            background: bg,
                            border: `1px solid ${borderColor}`,
                            color: textColor,
                            cursor: answered ? 'default' : 'pointer',
                          }}
                        >
                          <span className="font-kufi text-xs opacity-50 shrink-0 w-5 text-center">
                            {['أ', 'ب', 'ج', 'د'][idx]}
                          </span>
                          <span className="font-noto flex-1" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
                            {option}
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
                      {current + 1 >= totalQ ? 'عرض النتيجة' : 'السؤال التالي ←'}
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

                    {/* Score breakdown message */}
                    <div
                      className="rounded-2xl p-4 mb-6 text-right"
                      style={{
                        background: 'rgba(201,168,76,0.04)',
                        border: '1px solid rgba(201,168,76,0.15)',
                      }}
                    >
                      <p className="font-kufi text-xs mb-1" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        تقييمك
                      </p>
                      <p className="font-noto text-sm" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
                        أجبتَ على {score} أسئلة صحيحة من أصل {totalQ} — نسبتك {Math.round(pct)}٪
                        {pct < 70 ? ' — استمر في قراءة السيرة لتحسين نتيجتك!' : ' — بارك الله فيك!'}
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
                        اختبار جديد (أسئلة مختلفة)
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
                          color: 'rgba(255,255,255,0.82)',
                        }}
                      >
                        <RotateCcw size={14} />
                        إعادة نفس الأسئلة
                      </button>
                      <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-6 py-3 rounded-full font-kufi text-sm transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(255,255,255,0.75)',
                        }}
                      >
                        <Home size={14} />
                        الرئيسية
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
