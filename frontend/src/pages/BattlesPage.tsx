import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, Search, X, ChevronDown } from 'lucide-react';
import ShareButton from '../components/ShareButton';

interface Battle {
  id: number;
  name: string;
  year: string;
  muslimForce: string;
  enemyForce: string;
  enemyName: string;
  result: 'نصر' | 'هزيمة جزئية' | 'بدون قتال';
  significance: string;
  details: string;
  hadith?: string;
  martyrs?: string;
  casualties?: string;
}

const RESULT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'نصر': { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.35)', text: '#34D399' },
  'هزيمة جزئية': { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.35)', text: '#FBBF24' },
  'بدون قتال': { bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.35)', text: '#60A5FA' },
};

const BATTLES: Battle[] = [
  {
    id: 1,
    name: 'غزوة بدر الكبرى',
    year: '2 هـ / 624م',
    muslimForce: '313',
    enemyForce: '950 - 1000',
    enemyName: 'قريش',
    result: 'نصر',
    significance: 'أول غزوة كبرى في الإسلام — يوم الفرقان',
    details: 'أول المعارك الكبرى في تاريخ الإسلام. خرج المسلمون ابتداءً لاعتراض قافلة قريش، فتحوّل الأمر إلى معركة فاصلة. نصر الله فيها المسلمين بأعداد قليلة على جيش قريش المتكبّر. سُمّيت يوم الفرقان لأن الله فرّق فيها بين الحق والباطل.',
    hadith: '"هذا جبريل آخذ برأس فرسه عليه أداة الحرب" — رواه البخاري',
    martyrs: '14 شهيداً',
    casualties: '70 قتيلاً و70 أسيراً من المشركين',
  },
  {
    id: 2,
    name: 'غزوة أُحد',
    year: '3 هـ / 625م',
    muslimForce: '700',
    enemyForce: '3000',
    enemyName: 'قريش',
    result: 'هزيمة جزئية',
    significance: 'درس في طاعة القيادة وعدم الطمع في الغنيمة',
    details: 'خرجت قريش بثلاثة آلاف مقاتل انتقاماً لبدر. أمر النبي ﷺ الرماة بالبقاء على الجبل مهما كان، فلما ظنّوا أن المعركة قد حُسمت نزل بعضهم طمعاً في الغنيمة، فانقلب الميزان وجُرح النبي ﷺ. الدرس الأعظم: الطاعة وعدم مخالفة أوامر القائد.',
    martyrs: '70 شهيداً بينهم حمزة بن عبد المطلب سيد الشهداء',
  },
  {
    id: 3,
    name: 'غزوة الخندق (الأحزاب)',
    year: '5 هـ / 627م',
    muslimForce: '3000',
    enemyForce: '10,000',
    enemyName: 'الأحزاب المتحالفة',
    result: 'نصر',
    significance: 'حصار فاشل — انسحاب الأحزاب بعد شهر من الحصار',
    details: 'تحالفت قبائل الأحزاب لاستئصال المسلمين نهائياً. اقترح سلمان الفارسي حفر الخندق فكان حاجزاً منيعاً. أرسل الله ريحاً وجنوداً لا تُرى فأصابت الأحزاب بالرعب والفوضى وانسحبوا. بعدها قال النبي ﷺ: "الآن نغزوهم ولا يغزوننا."',
  },
  {
    id: 4,
    name: 'غزوة خيبر',
    year: '7 هـ / 628م',
    muslimForce: '1400 - 1600',
    enemyForce: 'حصون خيبر',
    enemyName: 'يهود خيبر',
    result: 'نصر',
    significance: 'فتح حصون خيبر — بداية الجزية والمصالحة',
    details: 'خيبر كانت مركز القوة اليهودية المسلّحة التي تدبّر المؤامرات ضد المسلمين. فتح المسلمون حصونها واحداً تلو الآخر. أعطى النبي ﷺ الراية لعلي بن أبي طالب الذي فتح الحصن الأخير، فأطعن باب الحصن ترساً له. أُعقدت بعدها معاهدة الجزية مع اليهود.',
    hadith: '"لأُعطيَنَّ الراية غداً رجلاً يحب الله ورسوله ويحبه الله ورسوله"',
  },
  {
    id: 5,
    name: 'غزوة مؤتة',
    year: '8 هـ / 629م',
    muslimForce: '3000',
    enemyForce: '200,000',
    enemyName: 'الروم وحلفاؤهم',
    result: 'هزيمة جزئية',
    significance: 'أول مواجهة مع الروم — استشهاد القادة الثلاثة',
    details: 'أرسل النبي ﷺ جيشاً من ثلاثة آلاف لمواجهة جيش روماني هائل. استُشهد الأمراء الثلاثة بالتتابع: زيد بن حارثة، ثم جعفر بن أبي طالب الذي قاتل حتى قُطعت يداه فحمل الراية بصدره، ثم عبد الله بن رواحة. فتولّى خالد بن الوليد القيادة وانسحب بالجيش بكفاءة فائقة.',
    martyrs: 'الأمراء الثلاثة: زيد بن حارثة، جعفر بن أبي طالب، عبد الله بن رواحة',
  },
  {
    id: 6,
    name: 'فتح مكة المكرمة',
    year: '8 هـ / 630م',
    muslimForce: '10,000',
    enemyForce: 'مكة المكرمة',
    enemyName: 'قريش',
    result: 'نصر',
    significance: 'أعظم فتح في الإسلام — العفو العام عن أعداء الله',
    details: 'دخل النبي ﷺ مكة بعشرة آلاف صحابي دون إراقة دماء تقريباً. وقف على باب الكعبة وقال للمكيين الذين آذوه سنواتٍ: "ما تظنون أني فاعل بكم؟" قالوا: أخٌ كريم وابن أخ كريم. فقال ﷺ: "اذهبوا فأنتم الطلقاء." وطاف بالكعبة وحطّم الأصنام وهو يتلو: ﴿وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ﴾.',
    hadith: '"اذهبوا فأنتم الطلقاء"',
    casualties: 'تحطيم 360 صنماً حول الكعبة',
  },
  {
    id: 7,
    name: 'غزوة حنين',
    year: '8 هـ / 630م',
    muslimForce: '12,000',
    enemyForce: '~20,000',
    enemyName: 'هوازن وثقيف',
    result: 'نصر',
    significance: 'نصر بعد انكشاف أوّلي — درس في التواضع وعدم الاغترار بالعدد',
    details: 'خرج المسلمون بعد فتح مكة بعدد كبير لم يروا مثله قط. ففاجأتهم قبائل هوازن وثقيف بكمين في الوادي فانكشف المسلمون في البداية. ثبت النبي ﷺ على بغلته وصاح: "أنا النبي لا كذب أنا ابن عبد المطلب." فثبت معه الصحابة وانقلبت الموازين.',
    casualties: 'غنائم: 6000 أسير، 24,000 ناقة، 40,000 شاة',
  },
  {
    id: 8,
    name: 'غزوة تبوك',
    year: '9 هـ / 631م',
    muslimForce: '30,000 (جيش العسرة)',
    enemyForce: 'الجيش الروماني',
    enemyName: 'الروم',
    result: 'بدون قتال',
    significance: 'الصمود رغم الشدة — فضح المنافقين وتوبة الثلاثة الذين خُلّفوا',
    details: 'خرج النبي ﷺ في قيظ الصيف وشُح الزاد نحو تبوك لمواجهة الروم. تخلّف المنافقون بأعذار واهية. انسحب الروم دون قتال حين سمعوا بالجيش الإسلامي الضخم. عاد النبي ﷺ وقد ثبتت هيبة الإسلام في الشمال. وكانت هذه آخر غزوات النبي ﷺ.',
    hadith: '"لا يدخل الجنة إلا نفس مسلمة" — قالها ﷺ وهو يتجهّز للغزوة',
  },
  /* ── الغزوات المتبقية ── */
  {
    id: 9,
    name: 'غزوة الأبواء (ودان)',
    year: '1 هـ / 623م',
    muslimForce: '70',
    enemyForce: 'قافلة قريش',
    enemyName: 'قريش',
    result: 'بدون قتال',
    significance: 'أول غزوة يخرج فيها النبي ﷺ بنفسه',
    details: 'خرج النبي ﷺ في سبعين رجلاً من المهاجرين يعترض قافلة لقريش في منطقة الأبواء (ودان). صالح في طريقه بني ضمرة وعقد معهم ميثاقاً على عدم الاعتداء والنصرة عند الحاجة. لم يلتقِ بالقافلة وعاد دون قتال. وكانت هذه أول مرة يخرج فيها النبي ﷺ بنفسه قائداً.',
  },
  {
    id: 10,
    name: 'غزوة بني النضير',
    year: '4 هـ / 625م',
    muslimForce: '~1000',
    enemyForce: 'حصون بني النضير',
    enemyName: 'بنو النضير',
    result: 'نصر',
    significance: 'إجلاء بني النضير وتفريق مؤامرتهم على النبي ﷺ',
    details: 'بعد التحالف مع يهود بني النضير، دبّروا مؤامرة لإلقاء حجر على النبي ﷺ من سطح دار. أطلعه جبريل عليه السلام على المؤامرة فانسحب. أرسل النبي ﷺ إليهم يأمرهم بالجلاء. تحصّنوا في بيوتهم، وبعد حصار خمسة عشر يوماً طلبوا الجلاء فأُجلوا إلى خيبر والشام. نزلت في شأنهم سورة الحشر.',
    hadith: '﴿هُوَ الَّذِي أَخْرَجَ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ﴾ — الحشر: 2',
  },
  {
    id: 11,
    name: 'غزوة ذات الرقاع',
    year: '4 هـ / 626م',
    muslimForce: '400 - 700',
    enemyForce: 'بنو محارب وبنو ثعلبة',
    enemyName: 'بنو محارب وثعلبة',
    result: 'بدون قتال',
    significance: 'أول تشريع لصلاة الخوف في الإسلام',
    details: 'بلغ النبي ﷺ أن قبائل من أنمار وثعلبة ومحارب تجمّعت في نجد. خرج بأربعمائة (وقيل سبعمائة) لتفريق تجمّعهم. لم يحدث قتال كبير لكن الموقف استدعى اليقظة الدائمة. شرّع الله في هذه الغزوة صلاة الخوف حيث يصلي الجيش على أشكال خاصة دون ترك موقعه. سُمّيت بذات الرقاع لأن أقدامهم تشقّقت فلفّوها بالخرق.',
    hadith: '﴿وَإِذَا كُنتَ فِيهِمْ فَأَقَمْتَ لَهُمُ الصَّلَاةَ﴾ — النساء: 102',
  },
  {
    id: 12,
    name: 'غزوة بني قريظة',
    year: '5 هـ / 627م',
    muslimForce: '3000',
    enemyForce: 'حصون بني قريظة',
    enemyName: 'بنو قريظة',
    result: 'نصر',
    significance: 'عقاب الخيانة العظمى — نقض العهد في غزوة الخندق',
    details: 'خان بنو قريظة العهد مع المسلمين أثناء غزوة الخندق وفتحوا بابهم للأحزاب. لما انسحبت الأحزاب نزل جبريل على النبي ﷺ يأمره بالمسير إليهم فوراً. حاصرهم المسلمون خمساً وعشرين ليلة. طلب بنو قريظة الاحتكام إلى سعد بن معاذ حليفهم القديم، فحكم بأن يُقتل مقاتلتهم وتُسبى ذراريهم وتُوزَّع أموالهم.',
    casualties: 'تنفيذ حكم سعد بن معاذ في المقاتلين',
  },
  {
    id: 13,
    name: 'غزوة بني المصطلق (المريسيع)',
    year: '6 هـ / 628م',
    muslimForce: '~700',
    enemyForce: 'بنو المصطلق',
    enemyName: 'بنو المصطلق',
    result: 'نصر',
    significance: 'أحداثها كثيرة: نزول آيات الإفك وتشريع التيمم وزواجه ﷺ من جويرية',
    details: 'بلغ النبي ﷺ أن بني المصطلق يجمعون لقتاله، فبادر وخرج إليهم. انتهت المعركة بسرعة بنصر المسلمين. غير أن الطريق عُرفت بأحداث خطيرة: تشاجر رجل من المهاجرين مع رجل من الأنصار فصرخ كل منهما "يا للمهاجرين! يا للأنصار!" وكادت الفتنة تشتعل لولا النبي ﷺ. وفيها تخلّفت عائشة رضي الله عنها وتحدّث المنافقون فنزلت آيات الإفك، وتشريع التيمم حين ضاع عقدها.',
    hadith: '﴿إِنَّ الَّذِينَ جَاءُوا بِالْإِفْكِ عُصْبَةٌ مِّنكُمْ﴾ — النور: 11',
  },
  {
    id: 14,
    name: 'صلح الحديبية',
    year: '6 هـ / 628م',
    muslimForce: '1400 (أصحاب الشجرة)',
    enemyForce: 'مكة المكرمة',
    enemyName: 'قريش',
    result: 'بدون قتال',
    significance: '﴿فَتْحٌ مُّبِينٌ﴾ — الفتح الأعظم رغم ظاهره',
    details: 'خرج النبي ﷺ في أربع عشرة مائة من أصحابه معتمرين لا محاربين. صدّتهم قريش. جرت مفاوضات طويلة أسفرت عن معاهدة هدنة عشر سنوات. بايع الصحابة النبيَّ ﷺ تحت الشجرة بيعة الرضوان على عدم الفرار. بدت بنود الصلح في ظاهرها لصالح قريش فحزن بعض الصحابة، لكن النبي ﷺ أخبرهم بعظيم الفتح فيها. نزلت سورة الفتح بعدها مباشرة.',
    hadith: '"إني رسول الله ولست أعصيه وهو ناصري"',
    casualties: 'بيعة الرضوان تحت الشجرة — رضي الله عنهم',
  },
  {
    id: 15,
    name: 'غزوة الطائف',
    year: '8 هـ / 630م',
    muslimForce: '12,000',
    enemyForce: 'ثقيف داخل الحصن',
    enemyName: 'بنو ثقيف',
    result: 'بدون قتال',
    significance: 'حصار فاشل للحصن — رفع الحصار ودعاء النبي ﷺ لثقيف بالهداية',
    details: 'بعد موقعة حنين لجأت بقايا هوازن وثقيف إلى حصن الطائف المنيع. حاصره المسلمون مدة تزيد على الشهر وأطلقوا المجانيق لكن الحصن صمد. قال بعضهم للنبي ﷺ: "ادعُ عليهم!" فقال ﷺ: "اللهم اهدِ ثقيفاً وائتِ بهم." رفع الحصار وانسحب المسلمون، فجاء أهل الطائف بعد أشهر مسلمين.',
    hadith: '"اللهم اهدِ ثقيفاً وائتِ بهم" — دعاء النبي ﷺ لأعدائه بالهداية',
  },
];

const BattleCard: React.FC<{ battle: Battle; index: number }> = ({ battle, index }) => {
  const [expanded, setExpanded] = useState(false);
  const resultStyle = RESULT_COLORS[battle.result];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
      onClick={() => setExpanded(v => !v)}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: expanded ? 'rgba(201,168,76,0.05)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${expanded ? 'rgba(201,168,76,0.28)' : 'rgba(201,168,76,0.14)'}`,
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        transition: 'background 0.25s, border-color 0.25s',
      }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C80, transparent)' }} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span
                className="font-kufi text-xs px-2.5 py-0.5 rounded-full"
                style={{ background: resultStyle.bg, border: `1px solid ${resultStyle.border}`, color: resultStyle.text }}
              >
                {battle.result}
              </span>
              <span className="font-kufi text-xs text-white/35">{battle.year}</span>
            </div>
            <h3 className="font-noto font-bold" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)', color: '#C9A84C' }}>
              {battle.name}
            </h3>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: '#C9A84C', flexShrink: 0, marginTop: 4 }}
          >
            <ChevronDown size={16} />
          </motion.span>
        </div>

        {/* Significance */}
        <p className="font-kufi mb-4" style={{ fontSize: '0.82rem', color: '#C9A84C', lineHeight: 1.65 }}>
          {battle.significance}
        </p>

        {/* Forces comparison */}
        <div
          className="grid grid-cols-2 gap-2 rounded-xl p-3 mb-4"
          style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}
        >
          <div className="text-center">
            <p className="font-kufi text-xs text-white/35 mb-1">المسلمون</p>
            <p className="font-noto font-bold" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#34D399' }}>
              {battle.muslimForce}
            </p>
          </div>
          <div className="text-center">
            <p className="font-kufi text-xs text-white/35 mb-1">{battle.enemyName}</p>
            <p className="font-noto font-bold" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#F87171' }}>
              {battle.enemyForce}
            </p>
          </div>
        </div>


        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div className="pt-4 space-y-3">
                <p
                  className="font-noto text-white/65"
                  style={{ fontSize: '0.88rem', lineHeight: 2 }}
                >
                  {battle.details}
                </p>

                {battle.martyrs && (
                  <div
                    className="rounded-xl px-4 py-2.5 flex items-start gap-2"
                    style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#F87171' }} />
                    <div>
                      <p className="font-kufi text-xs mb-0.5" style={{ color: '#F87171' }}>الشهداء</p>
                      <p className="font-noto text-white/60" style={{ fontSize: '0.83rem', lineHeight: 1.75 }}>
                        {battle.martyrs}
                      </p>
                    </div>
                  </div>
                )}

                {battle.casualties && (
                  <div
                    className="rounded-xl px-4 py-2.5 flex items-start gap-2"
                    style={{ background: 'rgba(96,165,250,0.07)', border: '1px solid rgba(96,165,250,0.2)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#60A5FA' }} />
                    <div>
                      <p className="font-kufi text-xs mb-0.5" style={{ color: '#60A5FA' }}>ملاحظات</p>
                      <p className="font-noto text-white/60" style={{ fontSize: '0.83rem', lineHeight: 1.75 }}>
                        {battle.casualties}
                      </p>
                    </div>
                  </div>
                )}

                {battle.hadith && (
                  <div
                    className="rounded-xl px-4 py-3"
                    style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}
                  >
                    <p className="font-kufi text-xs mb-1.5" style={{ color: '#C9A84C' }}>حديث / قول</p>
                    <p className="font-noto italic" style={{ fontSize: '0.88rem', color: '#C9A84C', lineHeight: 1.95 }}>
                      {battle.hadith}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const BattlesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState<string>('الكل');

  const filtered = useMemo(() => {
    return BATTLES.filter(b => {
      const matchResult = resultFilter === 'الكل' || b.result === resultFilter;
      const q = searchQuery.trim();
      const matchSearch = !q || b.name.includes(q) || b.significance.includes(q);
      return matchResult && matchSearch;
    });
  }, [searchQuery, resultFilter]);

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share button */}
      <div className="fixed top-[72px] left-4 z-[60]">
        <ShareButton title="غزوات النبي ﷺ" accentColor="#C9A84C" />
      </div>

      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 55 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${((i * 137.508) % 100).toFixed(1)}%`,
              top: `${((i * 97.3) % 100).toFixed(1)}%`,
              width: `${(0.5 + (i % 3) * 0.4).toFixed(1)}px`,
              height: `${(0.5 + (i % 3) * 0.4).toFixed(1)}px`,
              opacity: 0.3,
              '--dur': `${(i % 3) + 2}s`,
              '--delay': `${(i % 5) * 0.8}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="relative z-10 px-6 pt-6 pb-4" style={{ paddingRight: '5rem' }}>
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs text-islamic-gold/50"
        >
          <button onClick={() => navigate('/')} className="flex items-center gap-1 hover:text-islamic-gold transition-colors">
            <Home size={12} /><span>الرئيسية</span>
          </button>
          <ChevronLeft size={10} className="rotate-180" />
          <span className="text-islamic-gold/80">غزوات النبي ﷺ</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-8 pt-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-noto font-bold mb-3"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)', color: '#C9A84C', textShadow: '0 0 30px #52482a' }}
        >
          غزوات النبي ﷺ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-noto text-islamic-gold/55 mt-2"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
        >
          ﴿وَأَعِدُّوا لَهُمْ مَا اسْتَطَعْتُمْ مِن قُوَّةٍ﴾ — الأنفال: 60
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-3 justify-center mt-5 opacity-30"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          {[
            { label: 'عدد الغزوات الكلي', value: '27' },
            { label: 'حضرها ﷺ بنفسه (الكبرى)', value: '27' },
            { label: 'المعروضة هنا', value: String(BATTLES.length) },
          ].map(stat => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-5 py-3 rounded-2xl"
              style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.18)' }}
            >
              <span className="font-noto font-bold" style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#C9A84C' }}>
                {stat.value}
              </span>
              <span className="font-kufi text-xs text-white/40 mt-0.5">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Search + Filter */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pb-6 space-y-4">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-islamic-gold/40" />
          <input
            type="text"
            placeholder="ابحث عن غزوة..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full font-kufi text-sm text-white/80 pr-9 pl-8 py-2.5 rounded-full outline-none"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(201,168,76,0.2)',
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
              <X size={13} />
            </button>
          )}
        </div>

        {/* Result filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {(['الكل', 'نصر', 'هزيمة جزئية', 'بدون قتال'] as const).map(r => {
            const isActive = resultFilter === r;
            const style = r === 'الكل'
              ? { color: '#C9A84C', bg: '#27251d', border: '#52482a' }
              : { color: RESULT_COLORS[r].text, bg: RESULT_COLORS[r].bg, border: RESULT_COLORS[r].border };
            return (
              <motion.button
                key={r}
                onClick={() => setResultFilter(r)}
                whileTap={{ scale: 0.95 }}
                className="font-kufi text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: isActive ? style.bg : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? style.border : 'rgba(255,255,255,0.08)'}`,
                  color: isActive ? style.color : '#74777d',
                }}
              >
                {r}
                {r !== 'الكل' && (
                  <span className="mr-1.5 opacity-60">
                    ({BATTLES.filter(b => b.result === r).length})
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Count */}
      <div className="relative z-10 text-center mb-6">
        <span className="font-kufi text-xs text-white/30">
          يُعرض {filtered.length} غزوة — انقر على البطاقة لعرض التفاصيل
        </span>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((battle, index) => (
            <BattleCard key={battle.id} battle={battle} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-noto text-white/30 text-lg">لا نتائج مطابقة للبحث</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BattlesPage;
