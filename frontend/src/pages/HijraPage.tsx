import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, MapPin, Calendar, Route } from 'lucide-react';
import ShareButton from '../components/ShareButton';

interface HijraStage {
  number: string;
  title: string;
  subtitle: string;
  color: string;
  glowColor: string;
  verse?: string;
  verseRef?: string;
  points: string[];
  icon: string;
}

const HIJRA_STAGES: HijraStage[] = [
  {
    number: '١',
    title: 'الإذن الإلهي بالهجرة',
    subtitle: 'ليلة المؤامرة الكبرى',
    color: 'rgba(201,168,76,0.15)',
    glowColor: '#C9A84C',
    verse: '﴿وَإِذْ يَمْكُرُ بِكَ الَّذِينَ كَفَرُوا لِيُثْبِتُوكَ أَوْ يَقْتُلُوكَ أَوْ يُخْرِجُوكَ﴾',
    verseRef: 'الأنفال: ٣٠',
    icon: '🌙',
    points: [
      'اجتمع المشركون في دار الندوة لاغتيال النبي ﷺ',
      'نزل جبريل يخبره بمؤامرة قريش وأذن له بالهجرة',
      'علي بن أبي طالب نام في فراشه ليوهم المشركين بأنه لا يزال في البيت',
    ],
  },
  {
    number: '٢',
    title: 'الخروج من مكة المكرمة',
    subtitle: 'وداع أحب البقاع',
    color: 'rgba(147,112,219,0.12)',
    glowColor: '#9370DB',
    verse: '﴿وَجَعَلْنَا مِن بَيْنِ أَيْدِيهِمْ سَدًّا﴾',
    verseRef: 'يس: ٩',
    icon: '🌟',
    points: [
      'خرج النبي ﷺ وأبو بكر الصديق ليلاً بإذن الله',
      'نثر التراب على رؤوس المشركين المتربصين وتلا الآية الكريمة',
      'التاريخ: ربيع الأول سنة ١ هـ (سبتمبر ٦٢٢م)',
      '"والله إنك لأحب البقاع إلى الله وأحب البقاع إليّ، ولولا أن أهلك أخرجوني منك ما خرجت"',
    ],
  },
  {
    number: '٣',
    title: 'الاختباء في غار ثور',
    subtitle: 'ثلاثة أيام في رحاب الله',
    color: 'rgba(64,196,128,0.10)',
    glowColor: '#40C480',
    verse: '﴿لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا﴾',
    verseRef: 'التوبة: ٤٠',
    icon: '🕊️',
    points: [
      'ثلاثة أيام في الغار (الجمعة والسبت والأحد)',
      'قريش تعرض مئة ناقة لمن يدل عليهما',
      'عنكبوت نسجت بيتها على فم الغار وحمامتان أشارتا إلى سلامة المكان',
      'أبو بكر قال: "يا رسول الله لو نظر أحدهم تحت قدميه لرآنا"',
      'عبد الله بن أبي بكر يأتي بالأخبار ليلاً',
      'أسماء بنت أبي بكر "ذات النطاقين" تأتي بالطعام',
    ],
  },
  {
    number: '٤',
    title: 'مسيرة ٤٥٠ كيلومتراً شمالاً',
    subtitle: 'رحلة الإيمان الكبرى',
    color: 'rgba(255,165,0,0.10)',
    glowColor: '#FFA500',
    icon: '🐪',
    points: [
      'الدليل: عبد الله بن أريقط (غير مسلم لكنه أمين موثوق)',
      'الطريق: الساحل الغربي بعيداً عن الطريق المعروف',
      'سراقة بن مالك لحق بهم طامعاً في الجائزة فغاصت قوائم فرسه في الأرض',
      'قصة سراقة وأساور كسرى — نبوءة تحققت في عهد عمر بن الخطاب',
    ],
  },
  {
    number: '٥',
    title: 'قباء — أول مسجد في الإسلام',
    subtitle: 'أُسِّسَ على التقوى',
    color: 'rgba(0,191,255,0.10)',
    glowColor: '#00BFFF',
    verse: '﴿لَمَسْجِدٌ أُسِّسَ عَلَى التَّقْوَىٰ مِنْ أَوَّلِ يَوْمٍ أَحَقُّ أَن تَقُومَ فِيهِ﴾',
    verseRef: 'التوبة: ١٠٨',
    icon: '🕌',
    points: [
      'وصل يوم الاثنين ٨ ربيع الأول',
      'أقام في قباء أربعة أيام',
      'بنى مسجد قباء — أول مسجد بُني في الإسلام',
    ],
  },
  {
    number: '٦',
    title: 'الوصول إلى المدينة المنورة',
    subtitle: 'بداية عهد النور',
    color: 'rgba(201,168,76,0.15)',
    glowColor: '#C9A84C',
    icon: '☀️',
    points: [
      'الجمعة ١٢ ربيع الأول — أول جمعة صلاها في المدينة المنورة',
      'استقبال أهل المدينة بالفرحة والبكاء والأناشيد',
      '"طلع البدر علينا من ثنيات الوداع، وجب الشكر علينا ما دعا لله داعِ"',
      'نزل في دار أبي أيوب الأنصاري ضيفاً كريماً',
      'بداية الحقبة المدنية للإسلام — انطلاقة الدولة الإسلامية',
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
};

const HijraPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: '#030813' }}>
      {/* زر المشاركة */}
      <div className="fixed top-[72px] left-4 z-[60]">
        <ShareButton title="رحلة الهجرة النبوية الشريفة" accentColor="#C9A84C" />
      </div>

      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 70 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${((i * 137.508) % 100).toFixed(2)}%`,
              top: `${((i * 89.317) % 100).toFixed(2)}%`,
              width: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`,
              height: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`,
              opacity: 0.15 + (i % 5) * 0.04,
            }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, rgba(201,168,76,0.07) 0%, transparent 55%)',
        }}
      />

      {/* Breadcrumb */}
      <div className="relative z-10 px-6 pt-20 pb-4">
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs"
          style={{ color: 'rgba(201,168,76,0.5)' }}
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 transition-colors hover:text-islamic-gold"
            style={{ color: 'rgba(201,168,76,0.65)' }}
          >
            <Home size={12} />
            <span>الرئيسية</span>
          </button>
          <ChevronLeft size={10} className="rotate-180" />
          <span style={{ color: 'rgba(201,168,76,0.9)' }}>رحلة الهجرة</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full font-kufi text-xs"
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.25)',
            color: '#C9A84C',
          }}
        >
          <Route size={12} />
          ١ هـ — ٦٢٢م
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-noto font-bold mb-4"
          style={{
            fontSize: 'clamp(1.8rem, 5.5vw, 3.2rem)',
            color: '#C9A84C',
            textShadow: '0 0 40px rgba(201,168,76,0.4)',
            lineHeight: 1.5,
          }}
        >
          رحلة الهجرة النبوية الشريفة
        </motion.h1>

        {/* Header verse */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <p
            className="font-noto mb-2"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
              color: 'rgba(201,168,76,0.85)',
              textShadow: '0 0 20px rgba(201,168,76,0.25)',
              lineHeight: 2.1,
            }}
          >
            ﴿إِلَّا تَنصُرُوهُ فَقَدْ نَصَرَهُ اللَّهُ إِذْ أَخْرَجَهُ الَّذِينَ كَفَرُوا ثَانِيَ اثْنَيْنِ﴾
          </p>
          <p className="font-kufi text-xs" style={{ color: 'rgba(201,168,76,0.5)' }}>
            — سورة التوبة: ٤٠
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          {[
            { icon: <Route size={14} />, label: 'المسافة الإجمالية', value: '٤٥٠ كيلومتراً' },
            { icon: <Calendar size={14} />, label: 'مدة الرحلة', value: 'نحو أسبوعين' },
            { icon: <MapPin size={14} />, label: 'الوجهة', value: 'المدينة المنورة' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full font-kufi text-xs"
              style={{
                background: 'rgba(201,168,76,0.06)',
                border: '1px solid rgba(201,168,76,0.18)',
                color: '#C9A84C',
              }}
            >
              {item.icon}
              <span style={{ color: 'rgba(255,255,255,0.92)' }}>{item.label}:</span>
              <span>{item.value}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center gap-3 justify-center opacity-20"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-24">
        {/* Vertical line */}
        <div
          className="absolute right-[calc(50%-1px)] top-0 bottom-0 w-0.5 hidden sm:block"
          style={{
            background: 'linear-gradient(180deg, rgba(201,168,76,0.5) 0%, rgba(201,168,76,0.1) 100%)',
          }}
        />

        <div className="space-y-10">
          {HIJRA_STAGES.map((stage, index) => (
            <motion.div
              key={stage.number}
              custom={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="relative"
            >
              {/* Step number bubble (centered on line for sm+) */}
              <div className="flex sm:justify-center mb-4 sm:mb-0">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 + 0.2, type: 'spring', stiffness: 200 }}
                  className="relative z-10 sm:absolute sm:right-1/2 sm:translate-x-1/2 sm:top-7 w-12 h-12 rounded-full flex items-center justify-center font-kufi font-bold text-lg shadow-lg"
                  style={{
                    background: '#030813',
                    border: `2px solid ${stage.glowColor}`,
                    color: stage.glowColor,
                    boxShadow: `0 0 18px ${stage.glowColor}55`,
                  }}
                >
                  {stage.number}
                </motion.div>
              </div>

              {/* Card */}
              <div
                className="rounded-2xl overflow-hidden sm:mr-0"
                style={{
                  background: stage.color,
                  border: `1px solid ${stage.glowColor}33`,
                  boxShadow: `0 4px 30px ${stage.glowColor}11`,
                }}
              >
                {/* Card header */}
                <div
                  className="px-6 pt-5 pb-4"
                  style={{
                    background: `linear-gradient(135deg, ${stage.glowColor}18, transparent)`,
                    borderBottom: `1px solid ${stage.glowColor}22`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5 shrink-0">{stage.icon}</span>
                    <div>
                      <p
                        className="font-kufi text-xs mb-1"
                        style={{ color: `${stage.glowColor}99` }}
                      >
                        المرحلة {stage.number}
                      </p>
                      <h3
                        className="font-kufi font-bold"
                        style={{
                          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                          color: stage.glowColor,
                        }}
                      >
                        {stage.title}
                      </h3>
                      <p
                        className="font-noto mt-0.5"
                        style={{
                          fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)',
                          color: 'rgba(255,255,255,0.93)',
                        }}
                      >
                        {stage.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Points list */}
                <div className="px-6 pt-4 pb-5 space-y-3">
                  {stage.points.map((point, pi) => (
                    <div key={pi} className="flex gap-3 items-start">
                      <div
                        className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: stage.glowColor, opacity: 0.7 }}
                      />
                      <p
                        className="font-noto"
                        style={{
                          fontSize: 'clamp(0.88rem, 2vw, 1rem)',
                          color: 'rgba(255,255,255,0.96)',
                          lineHeight: 1.9,
                        }}
                      >
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Verse */}
                {stage.verse && (
                  <div
                    className="mx-5 mb-5 rounded-xl p-4"
                    style={{
                      background: 'rgba(0,0,0,0.25)',
                      borderRight: `3px solid ${stage.glowColor}66`,
                    }}
                  >
                    <p
                      className="font-noto mb-2"
                      style={{
                        fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                        color: stage.glowColor,
                        textShadow: `0 0 16px ${stage.glowColor}44`,
                        lineHeight: 2,
                      }}
                    >
                      {stage.verse}
                    </p>
                    <p
                      className="font-kufi text-xs"
                      style={{ color: `${stage.glowColor}77` }}
                    >
                      — سورة {stage.verseRef}
                    </p>
                  </div>
                )}
              </div>

              {/* Connector arrow between stages */}
              {index < HIJRA_STAGES.length - 1 && (
                <div className="flex justify-center mt-4 sm:hidden">
                  <div
                    className="w-px h-6"
                    style={{ background: `linear-gradient(180deg, ${stage.glowColor}66, transparent)` }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Arrival celebration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 text-center p-8 rounded-2xl"
          style={{
            background: 'rgba(201,168,76,0.06)',
            border: '1px solid rgba(201,168,76,0.25)',
            boxShadow: '0 0 40px rgba(201,168,76,0.07)',
          }}
        >
          <p
            className="font-noto mb-4"
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
              color: '#C9A84C',
              textShadow: '0 0 20px rgba(201,168,76,0.35)',
              lineHeight: 2.2,
            }}
          >
            طلع البدر علينا من ثنيات الوداع
            <br />
            وجب الشكر علينا ما دعا لله داعِ
          </p>
          <p
            className="font-kufi text-xs"
            style={{ color: 'rgba(201,168,76,0.45)' }}
          >
            — نشيد أهل المدينة في استقبال النبي ﷺ
          </p>
        </motion.div>

        {/* Distance stat */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          {[
            { value: '٤٥٠', unit: 'كم', label: 'المسافة الإجمالية' },
            { value: '٣', unit: 'أيام', label: 'في غار ثور' },
            { value: '٦٢٢', unit: 'م', label: 'السنة الميلادية' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="py-5 px-3 rounded-xl"
              style={{
                background: 'rgba(201,168,76,0.05)',
                border: '1px solid rgba(201,168,76,0.15)',
              }}
            >
              <p
                className="font-kufi font-bold"
                style={{
                  fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
                  color: '#C9A84C',
                  textShadow: '0 0 15px rgba(201,168,76,0.3)',
                }}
              >
                {stat.value}
                <span
                  className="text-base mr-1"
                  style={{ color: 'rgba(201,168,76,0.6)' }}
                >
                  {stat.unit}
                </span>
              </p>
              <p
                className="font-kufi mt-1"
                style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.92)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p
            className="font-noto mb-6"
            style={{ color: 'rgba(255,255,255,0.92)', fontSize: '0.88rem', lineHeight: 1.8 }}
          >
            المصادر: صحيح البخاري — صحيح مسلم — السيرة النبوية لابن هشام — الرحيق المختوم
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-kufi text-sm transition-all hover:opacity-80"
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

export default HijraPage;
