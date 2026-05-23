'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, Users, MapPin, Calendar } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface SermonSection {
  title: string;
  titleEn: string;
  text: string;
  textEn: string;
}

const SERMON_SECTIONS: SermonSection[] = [
  {
    title: 'في شأن الدماء والأموال',
    titleEn: 'On the Sanctity of Blood and Property',
    text: 'يا أيها الناس، اسمعوا قولي، فإني لا أدري لعلي لا ألقاكم بعد عامي هذا بهذا الموقف أبداً. يا أيها الناس، إن دماءكم وأموالكم عليكم حرام، كحرمة يومكم هذا، في شهركم هذا، في بلدكم هذا. ألا كل شيء من أمر الجاهلية تحت قدمي موضوع.',
    textEn: 'O people, listen to my words, for I do not know whether I will meet you after this year in this place. O people, your blood and your property are sacred to one another like the sacredness of this day of yours, in this month of yours, in this land of yours. Behold, everything pertaining to the Days of Ignorance is under my feet, abolished.',
  },
  {
    title: 'في شأن الربا',
    titleEn: 'On the Abolition of Usury',
    text: 'وربا الجاهلية موضوع، وأول ربا أضع ربانا ربا عباس بن عبد المطلب، فإنه موضوع كله. واتقوا الله في النساء، فإنكم أخذتموهن بأمانة الله، واستحللتم فروجهن بكلمة الله.',
    textEn: 'All usury of the Days of Ignorance is abolished, and the first usury I abolish is that of ours — the usury of Abbas ibn Abd al-Muttalib; it is all abolished. Fear Allah regarding women, for you have taken them as a trust from Allah, and you have made their intimate relations lawful through the word of Allah.',
  },
  {
    title: 'في شأن النساء',
    titleEn: 'On the Rights of Women',
    text: 'ولهن عليكم رزقهن وكسوتهن بالمعروف. وقد تركت فيكم ما لن تضلوا بعده إن اعتصمتم به: كتاب الله. وأنتم تُسألون عني، فما أنتم قائلون؟',
    textEn: 'They have rights over you for their provisions and clothing in kindness. I have left among you that which, if you hold fast to it, you will never go astray: the Book of Allah. You will be asked about me, so what will you say?',
  },
  {
    title: 'الشهادة على البلاغ',
    titleEn: 'Testimony of Conveying the Message',
    text: 'قالوا: نشهد أنك قد بلغت وأدّيت ونصحت. فقال بإصبعه السبابة يرفعها إلى السماء وينكتها إلى الناس: اللهم اشهد، اللهم اشهد، اللهم اشهد.',
    textEn: 'They said: We bear witness that you have conveyed, fulfilled and advised. He then raised his index finger toward the sky and pointed it at the people, saying: O Allah bear witness, O Allah bear witness, O Allah bear witness.',
  },
  {
    title: 'في المساواة بين البشر',
    titleEn: 'On Human Equality',
    text: 'يا أيها الناس، إن ربكم واحد، وإن أباكم واحد، كلكم لآدم وآدم من تراب. إن أكرمكم عند الله أتقاكم، وليس لعربي فضل على عجمي إلا بالتقوى.',
    textEn: 'O people, your Lord is one and your father is one. You are all from Adam, and Adam was from dust. The most noble among you in the sight of Allah is the most God-fearing. No Arab has any superiority over a non-Arab except through piety.',
  },
  {
    title: 'وصية بالصحابة والأيام',
    titleEn: 'Enjoining the Companions and the Days',
    text: 'فليبلّغ الشاهد الغائب، فإن الشاهد عسى أن يبلّغ من هو أوعى له منه. لا ترجعوا بعدي كفاراً يضرب بعضكم رقاب بعض.',
    textEn: 'Let those who are present convey it to those who are absent, for many of those to whom it is conveyed may understand it better than some of those who heard it. Do not revert to disbelief after me by striking the necks of one another.',
  },
];

const FarewellSermonPage: React.FC = () => {
  const router = useRouter();
  const { isEn } = useLanguage();

  const contextCards = isEn
    ? [
        { icon: <Calendar size={14} />, label: 'Date', value: '9 Dhul Hijja 10 AH / 632 CE' },
        { icon: <MapPin size={14} />, label: 'Location', value: 'Mount Arafat — Farewell Pilgrimage' },
        { icon: <Users size={14} />, label: 'Audience', value: 'About one hundred thousand Companions' },
      ]
    : [
        { icon: <Calendar size={14} />, label: 'التاريخ', value: '9 ذو الحجة 10 هـ / 632 م' },
        { icon: <MapPin size={14} />, label: 'المكان', value: 'جبل عرفات — حجة الوداع' },
        { icon: <Users size={14} />, label: 'الحضور', value: 'نحو مئة ألف صحابي' },
      ];

  return (
    <div
      dir={isEn ? 'ltr' : 'rtl'}
      className="min-h-screen"
      style={{ background: '#030813' }}
    >
      {/* زر المشاركة */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'The Farewell Sermon' : 'خطبة الوداع'} accentColor="#C9A84C" />
      </div>
      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${((i * 141.4) % 100).toFixed(1)}%`,
              top: `${((i * 89.3) % 100).toFixed(1)}%`,
              width: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`,
              height: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`,
              opacity: 0.2 + (i % 4) * 0.07,
            }}
          />
        ))}
      </div>

      {/* Decorative radial glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, rgba(201,168,76,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Breadcrumb */}
      <div className="relative z-10 px-6 pt-20 pb-4" style={isEn ? { paddingLeft: '5.5rem' } : { paddingRight: '5.5rem' }}>
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs text-islamic-gold/50"
        >
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 hover:text-islamic-gold transition-colors"
          >
            <Home size={12} />
            <span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </button>
          <ChevronLeft size={10} className={isEn ? '' : 'rotate-180'} />
          <span className="text-islamic-gold/80">{isEn ? 'The Full Farewell Sermon' : 'خطبة الوداع الكاملة'}</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full font-kufi text-xs"
          style={{
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.25)',
            color: '#C9A84C',
          }}
        >
          {isEn ? '10 Dhul Hijja — 10 AH' : '10 ذو الحجة — 10 هـ'}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-noto font-bold mb-3"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: '#C9A84C',
            textShadow: '0 0 40px rgba(201,168,76,0.4)',
          }}
        >
          {isEn ? 'The Farewell Sermon' : 'خطبة الوداع'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-noto text-white/50 max-w-lg mx-auto text-lg mb-8"
          style={{ lineHeight: 1.9 }}
        >
          {isEn
            ? 'The last comprehensive address of the Prophet ﷺ before the nation — an eternal human charter'
            : 'آخر خطبة جامعة للنبي ﷺ أمام الأمة — دستور إنساني خالد'}
        </motion.p>

        {/* Context cards */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-8"
        >
          {contextCards.map((item) => (
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
              <span className="text-white/40">{item.label}:</span>
              <span>{item.value}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center gap-3 justify-center opacity-25"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>
      </div>

      {/* Opening */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center p-8 rounded-2xl"
          style={{
            background: 'rgba(201,168,76,0.04)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          <p
            className="font-noto text-white/80 mb-4"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', lineHeight: 2 }}
          >
            {isEn
              ? 'After praising and glorifying Allah, the Messenger of Allah ﷺ said:'
              : 'بعد الحمد لله والثناء عليه، قال رسول الله ﷺ:'}
          </p>
          <p
            className="font-noto"
            dir="rtl"
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
              color: '#C9A84C',
              textShadow: '0 0 20px rgba(201,168,76,0.3)',
              lineHeight: 2.1,
            }}
          >
            "أيها الناس، اسمعوا مني أبيّن لكم، فإني لا أدري لعلي لا ألقاكم بعد عامي هذا بهذا الموقف أبداً"
          </p>
          {isEn && (
            <p className="font-noto text-white/60 mt-4" style={{ fontSize: '0.95rem', lineHeight: 2, fontStyle: 'italic' }}>
              "O people, listen to me, for I do not know whether I will meet you again in this place after this year"
            </p>
          )}
        </motion.div>
      </div>

      {/* Sermon Sections */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pb-20 space-y-6">
        {SERMON_SECTIONS.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 * index + 0.9 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(201,168,76,0.12)',
            }}
          >
            {/* Accent bar */}
            <div
              className={`absolute top-0 ${isEn ? 'left-0' : 'right-0'} w-1 h-full rounded-full`}
              style={{
                background: 'linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.1))',
              }}
            />

            <div className={`p-6 ${isEn ? 'pl-8' : 'pr-8'}`}>
              {/* Section number and title */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="font-kufi text-xs px-2.5 py-1 rounded-full shrink-0"
                  style={{
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.25)',
                    color: '#C9A84C',
                  }}
                >
                  {index + 1}
                </span>
                <h3
                  className="font-kufi text-sm"
                  style={{ color: '#C9A84C', letterSpacing: '0.03em' }}
                >
                  {isEn ? section.titleEn : section.title}
                </h3>
              </div>

              {/* Text */}
              <p
                className="font-noto text-white/70"
                dir={isEn ? 'ltr' : 'rtl'}
                style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 2.1 }}
              >
                {isEn ? section.textEn : section.text}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Closing verse */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 * SERMON_SECTIONS.length + 1 }}
          className="text-center p-8 rounded-2xl mt-8"
          style={{
            background: 'rgba(201,168,76,0.05)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          <p
            className="font-noto mb-4"
            dir="rtl"
            style={{
              fontSize: 'clamp(1.1rem, 2.8vw, 1.6rem)',
              color: '#C9A84C',
              textShadow: '0 0 20px rgba(201,168,76,0.3)',
              lineHeight: 2.1,
            }}
          >
            ﴿الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا﴾
          </p>
          {isEn && (
            <p className="font-noto text-white/60 mb-3" style={{ fontSize: '0.95rem', lineHeight: 2, fontStyle: 'italic' }}>
              "This day I have perfected your religion for you, completed My blessing upon you, and chosen Islam as your religion"
            </p>
          )}
          <p
            className="font-kufi text-islamic-gold/40"
            style={{ fontSize: '0.9rem', letterSpacing: '0.1em' }}
          >
            {isEn
              ? '— Surah Al-Ma\'idah: 3 — Revealed on the day of Arafat in the 10th year of Hijra'
              : '— سورة المائدة: 3  — نزلت في يوم عرفة سنة العاشرة من الهجرة'}
          </p>
        </motion.div>

        {/* Source note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center font-kufi text-white/25"
          style={{ fontSize: '0.88rem', letterSpacing: '0.05em' }}
        >
          {isEn
            ? 'Source: Sahih al-Bukhari · Sahih Muslim · Musnad Ahmad · Seerah of Ibn Hisham'
            : 'المصدر: صحيح البخاري — صحيح مسلم — مسند أحمد — السيرة النبوية لابن هشام'}
        </motion.p>
      </div>
    </div>
  );
};

export default FarewellSermonPage;
