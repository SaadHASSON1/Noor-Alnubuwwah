import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, ChevronDown } from 'lucide-react';
import ShareButton from '../components/ShareButton';

interface LifeSection {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  facts: string[];
}

const LIFE_SECTIONS: LifeSection[] = [
  {
    id: 'daily-routine',
    icon: '🌅',
    title: 'يومه ﷺ',
    subtitle: 'الروتين اليومي المبارك',
    color: '#C9A84C',
    facts: [
      'يستيقظ قبل الفجر للتهجد والصلاة',
      'يصلي الفجر في المسجد ثم يجلس يذكر الله حتى تطلع الشمس',
      'يتفقد أصحابه ويسأل عن المرضى والغائبين',
      'يقيل بعد الظهر — القيلولة سنة نبوية مستحبة',
      'يزور أهله ويتحدث معهم بود وحنان',
      'يصلي العصر ثم يزور الأنصار في بيوتهم',
      'بعد العشاء ينام مبكراً استعداداً لقيام الليل',
    ],
  },
  {
    id: 'food-drink',
    icon: '🍯',
    title: 'طعامه وشرابه ﷺ',
    subtitle: 'البركة في القليل',
    color: '#FFA500',
    facts: [
      'كان يأكل ما يجد ولا يرد الحلال',
      'أحب الأطعمة: الثريد والعسل والدباء (القرع) والتمر واللبن',
      'كان يأكل بيده اليمنى ويبدأ بالتسمية',
      'لم يذم طعاماً قط: "إن اشتهاه أكله وإن كرهه تركه"',
      'الشراب: الماء والعسل والنبيذ الحلال',
      'كان يشرب قاعداً في ثلاثة أنفاس متأنياً',
    ],
  },
  {
    id: 'sleep',
    icon: '🌙',
    title: 'نومه ﷺ',
    subtitle: 'راحة العبد الشاكر',
    color: '#9370DB',
    facts: [
      'كان ينام على شقه الأيمن مستقبلاً القبلة',
      'يضع يده اليمنى تحت خده الأيمن',
      'يقرأ المعوذتين والإخلاص وينفث في يديه قبل النوم',
      'كان ينام نصف الليل ويقوم ثلثه ويرقد سدسه',
      'فراشه ﷺ: حصير أو أديم محشو بليف النخل',
    ],
  },
  {
    id: 'clothing',
    icon: '👘',
    title: 'لباسه ﷺ',
    subtitle: 'البساطة والوقار',
    color: '#40C480',
    facts: [
      'كان يحب البياض ويوصي به',
      'القميص أحب الثياب إليه ﷺ',
      'العمامة ويسدلها بين كتفيه',
      'النعل: يبدأ باليمين لبساً ويبدأ بالشمال خلعاً',
      'لم يتكبر في لباسه ولم يلبس الحرير',
    ],
  },
  {
    id: 'family',
    icon: '🏡',
    title: 'معاملته لأهله ﷺ',
    subtitle: 'خير الناس لأهله',
    color: '#FF6B9D',
    facts: [
      '"خيركم خيركم لأهله وأنا خيركم لأهلي"',
      'كان يخيط ثوبه ويخصف نعله بنفسه',
      'يساعد في أعمال البيت دون تكبر',
      'يمسح دموع زوجاته ويسمع لهن باهتمام',
      'كان يتسابق مع عائشة في المشي ويسبقها مرةً وتسبقه أخرى',
    ],
  },
  {
    id: 'manners',
    icon: '🤝',
    title: 'أخلاقه مع الناس ﷺ',
    subtitle: 'رحمة للعالمين',
    color: '#00BFFF',
    facts: [
      'لم يُسمع له صوت عالٍ في أي مجلس',
      'يبدأ بالسلام على كل من لقيه صغيراً أو كبيراً',
      'لا يترك أحداً يمشي معه حتى يودّعه هو أولاً',
      'كان يمزح ولا يقول إلا حقاً في مزاحه وجدّه',
      '"كان أشد حياءً من العذراء في خِدرها"',
    ],
  },
  {
    id: 'worship',
    icon: '🕌',
    title: 'عبادته ﷺ',
    subtitle: 'العبد الشاكر',
    color: '#C9A84C',
    facts: [
      'يصلي قيام الليل حتى تتورم قدماه',
      '"أفلا أكون عبداً شكوراً؟" — قالها حين سُئل عن طول صلاته',
      'يصوم الاثنين والخميس وأيام البيض (١٣ و١٤ و١٥ من كل شهر)',
      'كان يكثر الاستغفار مئة مرة في اليوم والليلة',
      'دعاء الصباح والمساء لا يتركهما في حضر ولا سفر',
    ],
  },
  {
    id: 'health',
    icon: '💚',
    title: 'مرضه وصحته ﷺ',
    subtitle: 'الأنبياء أشد بلاءً',
    color: '#7CFC00',
    facts: [
      'كان أشد الناس مرضاً وأكثرهم صبراً',
      '"يُضرب للمريض أجران: أجر المريض وأجر الصابر"',
      'مات ﷺ بالحمى وذات الجنب في مرضه الأخير',
      'عمره ﷺ عند الوفاة: ثلاثة وستون عاماً',
    ],
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

const DailyLifePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id);
  };

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: '#030813' }}>
      {/* زر المشاركة */}
      <div className="fixed top-[72px] left-4 z-[60]">
        <ShareButton title="الحياة اليومية للنبي ﷺ" accentColor="#C9A84C" />
      </div>

      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 65 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${((i * 137.508) % 100).toFixed(2)}%`,
              top: `${((i * 93.701) % 100).toFixed(2)}%`,
              width: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`,
              height: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`,
              opacity: 0.13 + (i % 5) * 0.04,
            }}
          />
        ))}
      </div>

      {/* Radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 18%, rgba(201,168,76,0.07) 0%, transparent 55%)',
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
          <span style={{ color: 'rgba(201,168,76,0.9)' }}>الحياة اليومية</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div
            className="w-16 h-px mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
          />

          {/* Header verse */}
          <p
            className="font-noto mb-3"
            style={{
              fontSize: 'clamp(1.1rem, 3vw, 1.7rem)',
              color: '#C9A84C',
              textShadow: '0 0 30px rgba(201,168,76,0.35)',
              lineHeight: 2,
            }}
          >
            ﴿لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ﴾
          </p>
          <p
            className="font-kufi text-xs mb-8"
            style={{ color: 'rgba(201,168,76,0.55)' }}
          >
            — سورة الأحزاب: ٢١
          </p>

          <div
            className="w-16 h-px mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="font-kufi font-bold mb-3"
          style={{
            fontSize: 'clamp(1.8rem, 5.5vw, 3.2rem)',
            color: 'white',
            textShadow: '0 2px 25px rgba(0,0,0,0.6)',
          }}
        >
          الحياة اليومية للنبي ﷺ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="font-noto max-w-md mx-auto"
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
            color: 'rgba(255,255,255,0.93)',
            lineHeight: 1.9,
          }}
        >
          كيف كان يعيش سيد الأنبياء ﷺ في يومه — أسوة وقدوة لكل مسلم
        </motion.p>

        {/* Section count badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="inline-flex items-center gap-2 mt-5 px-4 py-1.5 rounded-full font-kufi text-xs"
          style={{
            background: 'rgba(201,168,76,0.07)',
            border: '1px solid rgba(201,168,76,0.2)',
            color: 'rgba(201,168,76,0.7)',
          }}
        >
          {LIFE_SECTIONS.length} أقسام — اضغط على أي قسم لعرض التفاصيل
        </motion.div>
      </div>

      {/* Sections accordion grid */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LIFE_SECTIONS.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <motion.div
                key={section.id}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                className="rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: isActive
                    ? `${section.color}18`
                    : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${isActive ? section.color + '44' : 'rgba(201,168,76,0.1)'}`,
                  transition: 'background 0.3s, border-color 0.3s',
                  boxShadow: isActive ? `0 4px 30px ${section.color}15` : 'none',
                }}
                onClick={() => toggleSection(section.id)}
              >
                {/* Section header */}
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-2xl w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: `${section.color}18`,
                        border: `1px solid ${section.color}33`,
                      }}
                    >
                      {section.icon}
                    </span>
                    <div>
                      <h3
                        className="font-kufi font-bold"
                        style={{
                          fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
                          color: isActive ? section.color : 'white',
                          transition: 'color 0.3s',
                        }}
                      >
                        {section.title}
                      </h3>
                      <p
                        className="font-noto"
                        style={{
                          fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
                          color: 'rgba(255,255,255,0.92)',
                          marginTop: '1px',
                        }}
                      >
                        {section.subtitle}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.28 }}
                    style={{ color: isActive ? section.color : 'rgba(255,255,255,0.3)' }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </div>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mx-4 mb-4 rounded-xl p-4 space-y-2.5"
                        style={{
                          background: 'rgba(0,0,0,0.2)',
                          borderRight: `3px solid ${section.color}55`,
                        }}
                      >
                        {section.facts.map((fact, fi) => (
                          <motion.div
                            key={fi}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: fi * 0.06 }}
                            className="flex items-start gap-3"
                          >
                            <span
                              className="font-kufi text-xs shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                              style={{
                                background: `${section.color}22`,
                                border: `1px solid ${section.color}44`,
                                color: section.color,
                              }}
                            >
                              {fi + 1}
                            </span>
                            <p
                              className="font-noto"
                              style={{
                                fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
                                color: 'rgba(255,255,255,0.96)',
                                lineHeight: 1.9,
                              }}
                            >
                              {fact}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Featured hadith */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 text-center p-8 rounded-2xl"
          style={{
            background: 'rgba(201,168,76,0.05)',
            border: '1px solid rgba(201,168,76,0.22)',
            boxShadow: '0 0 40px rgba(201,168,76,0.06)',
          }}
        >
          <div
            className="text-4xl mb-4"
            style={{ color: 'rgba(201,168,76,0.2)', fontFamily: 'serif' }}
          >
            ❝
          </div>
          <p
            className="font-noto mb-4"
            style={{
              fontSize: 'clamp(1rem, 2.8vw, 1.45rem)',
              color: '#C9A84C',
              textShadow: '0 0 20px rgba(201,168,76,0.3)',
              lineHeight: 2.2,
            }}
          >
            كان خُلقه القرآن
          </p>
          <p
            className="font-kufi"
            style={{ fontSize: '0.9rem', color: 'rgba(201,168,76,0.5)' }}
          >
            — السيدة عائشة رضي الله عنها — صحيح مسلم
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {[
            { value: '٦٣', unit: 'عاماً', label: 'عمره ﷺ' },
            { value: '١٠٠', unit: 'مرة', label: 'استغفاره يومياً' },
            { value: '٢٣', unit: 'سنة', label: 'مدة الرسالة' },
            { value: '١١', unit: 'زوجة', label: 'في حياته ﷺ' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="py-4 px-3 rounded-xl text-center"
              style={{
                background: 'rgba(201,168,76,0.04)',
                border: '1px solid rgba(201,168,76,0.13)',
              }}
            >
              <p
                className="font-kufi font-bold"
                style={{
                  fontSize: 'clamp(1.3rem, 3.5vw, 2rem)',
                  color: '#C9A84C',
                  textShadow: '0 0 12px rgba(201,168,76,0.3)',
                }}
              >
                {stat.value}
                <span
                  className="text-sm mr-0.5"
                  style={{ color: 'rgba(201,168,76,0.6)' }}
                >
                  {stat.unit}
                </span>
              </p>
              <p
                className="font-kufi mt-1"
                style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.92)' }}
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
          transition={{ delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p
            className="font-noto mb-6"
            style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.88rem', lineHeight: 1.8 }}
          >
            المصادر: صحيح البخاري — صحيح مسلم — الشمائل المحمدية للترمذي — مسند أحمد
          </p>
          <p
            className="font-noto mb-6"
            style={{ color: 'rgba(255,255,255,0.92)', fontSize: '0.9rem', lineHeight: 1.8 }}
          >
            اللهم صلّ وسلّم على سيدنا محمد وعلى آله وصحبه أجمعين
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

export default DailyLifePage;
