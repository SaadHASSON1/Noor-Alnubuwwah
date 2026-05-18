import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correct: number;
}

const QUESTIONS: Question[] = [
  {
    question: 'في أي شهر نزل الوحي على النبي ﷺ لأول مرة؟',
    options: ['رمضان', 'شعبان', 'ذو القعدة', 'محرم'],
    correct: 0,
  },
  {
    question: 'كم سنة عاش النبي ﷺ؟',
    options: ['٦٣', '٦٠', '٧٠', '٥٥'],
    correct: 0,
  },
  {
    question: 'من أول من أسلم من الرجال الكبار؟',
    options: ['أبو بكر الصديق', 'علي بن أبي طالب', 'خديجة بنت خويلد', 'زيد بن حارثة'],
    correct: 0,
  },
  {
    question: 'كم غزوة شارك فيها النبي ﷺ بنفسه؟',
    options: ['٢٧', '١٥', '٣٠', '٢٠'],
    correct: 0,
  },
  {
    question: 'في أي عام هجري وقعت غزوة بدر الكبرى؟',
    options: ['٢ هـ', '١ هـ', '٣ هـ', '٤ هـ'],
    correct: 0,
  },
  {
    question: 'ما اسم مرضعة النبي ﷺ التي أرضعته في البادية؟',
    options: ['حليمة السعدية', 'ثويبة الأسلمية', 'فاطمة بنت أسد', 'أم أيمن'],
    correct: 0,
  },
  {
    question: 'كم يوماً مكث النبي ﷺ في غار ثور مع أبي بكر الصديق؟',
    options: ['٣ أيام', '٧ أيام', 'يوم واحد', '٥ أيام'],
    correct: 0,
  },
  {
    question: 'ما اسم الدابة التي أُسري على ظهرها النبي ﷺ ليلة الإسراء والمعراج؟',
    options: ['البراق', 'الخيل الأبيض', 'الطيف', 'الريح'],
    correct: 0,
  },
];

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = QUESTIONS[current];
  const progress = ((current) / QUESTIONS.length) * 100;

  const handleSelect = (optionIndex: number) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === question.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  };

  const getScoreMessage = () => {
    const pct = score / QUESTIONS.length;
    if (pct === 1) return 'ممتاز! أنت حافظ للسيرة النبوية';
    if (pct >= 0.75) return 'جيد جداً! معلوماتك قيّمة';
    if (pct >= 0.5) return 'جيد! تحتاج مزيداً من القراءة';
    return 'واصل التعلم! السيرة كنز لا ينضب';
  };

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
          <span className="text-islamic-gold/80">الاختبار التفاعلي</span>
        </motion.nav>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          {!finished ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1
                  className="font-noto font-bold mb-2"
                  style={{
                    fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
                    color: '#C9A84C',
                    textShadow: '0 0 20px rgba(201,168,76,0.3)',
                  }}
                >
                  اختبر معلوماتك
                </h1>
                <p className="font-noto text-white/40 text-sm">
                  سؤال {current + 1} من {QUESTIONS.length}
                </p>
              </div>

              {/* Progress bar */}
              <div
                className="w-full h-1.5 rounded-full mb-8 overflow-hidden"
                style={{ background: 'rgba(201,168,76,0.1)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #C9A84C, #F0D890)' }}
                  initial={{ width: `${progress}%` }}
                  animate={{ width: `${((current + (answered ? 1 : 0)) / QUESTIONS.length) * 100}%` }}
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
                    className="rounded-2xl p-6 mb-6"
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
                      className="w-full mt-6 py-4 rounded-xl font-kufi text-sm transition-all"
                      style={{
                        background: 'rgba(201,168,76,0.15)',
                        border: '1px solid rgba(201,168,76,0.4)',
                        color: '#C9A84C',
                      }}
                    >
                      {current + 1 >= QUESTIONS.length ? 'عرض النتيجة' : 'السؤال التالي ←'}
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
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: 'rgba(201,168,76,0.1)',
                  border: '2px solid rgba(201,168,76,0.4)',
                  color: '#C9A84C',
                }}
              >
                <Award size={40} />
              </div>

              <h2
                className="font-noto font-bold mb-2"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', color: '#C9A84C' }}
              >
                {score} / {QUESTIONS.length}
              </h2>

              <p className="font-noto text-white/70 text-lg mb-2">{getScoreMessage()}</p>

              <div
                className="w-full h-2 rounded-full my-6 overflow-hidden"
                style={{ background: 'rgba(201,168,76,0.1)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #C9A84C, #F0D890)' }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${(score / QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>

              <div className="flex gap-3 justify-center mt-4">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-kufi text-sm transition-all"
                  style={{
                    background: 'rgba(201,168,76,0.12)',
                    border: '1px solid rgba(201,168,76,0.35)',
                    color: '#C9A84C',
                  }}
                >
                  <RotateCcw size={14} />
                  إعادة الاختبار
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-kufi text-sm transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  <Home size={14} />
                  الرئيسية
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage;
