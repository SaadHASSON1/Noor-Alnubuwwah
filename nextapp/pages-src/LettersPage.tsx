'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import ShareButton from '@/components/ShareButton';

interface Letter {
  id: number;
  recipient: string;
  title: string;
  kingdom: string;
  year: string;
  messenger: string;
  response: 'أسلم' | 'رفض' | 'تردد' | 'أكرم ولم يسلم';
  summary: string;
  excerpt: string;
  outcome: string;
  note?: string;
}

const RESPONSE_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  'أسلم': { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.35)', text: '#34D399' },
  'رفض': { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.35)', text: '#F87171' },
  'تردد': { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.35)', text: '#FBBF24' },
  'أكرم ولم يسلم': { bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.35)', text: '#60A5FA' },
};

const LETTERS: Letter[] = [
  {
    id: 1,
    recipient: 'هرقل',
    title: 'قيصر الروم',
    kingdom: 'الإمبراطورية البيزنطية',
    year: '6 هـ / 627م',
    messenger: 'دحية بن خليفة الكلبي',
    response: 'تردد',
    summary: 'دعوة هرقل إلى الإسلام مع بيان حجج النبوة. استقبل الرسالة بإعجاب ودعا أبا سفيان للاستفسار عن النبي ﷺ.',
    excerpt: 'بسم الله الرحمن الرحيم، من محمدٍ عبد الله ورسوله إلى هرقل عظيم الروم، سلامٌ على من اتّبع الهدى. أمّا بعد، فإني أدعوك بدعاية الإسلام، أسلِمْ تسلَمْ، يُؤتِكَ الله أجرك مرّتين...',
    outcome: 'أعجب بالرسالة وصدّق بنبوة محمد ﷺ في نفسه، لكنه خاف على ملكه من الروم فلم يُعلن إسلامه.',
    note: 'سأل أبا سفيان — وكان يومئذ مشركاً — عن النبي ﷺ، فما وجد إلا الحسنى.',
  },
  {
    id: 2,
    recipient: 'كسرى أبرويز',
    title: 'ملك الفرس',
    kingdom: 'الإمبراطورية الساسانية',
    year: '6 هـ / 627م',
    messenger: 'عبد الله بن حذافة السهمي',
    response: 'رفض',
    summary: 'دعوة كسرى إلى الإسلام. مزّق الكتاب استكباراً فدعا النبي ﷺ: "مزّق الله ملكه."',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد رسول الله إلى كسرى عظيم فارس، سلامٌ على من اتّبع الهدى وآمن بالله ورسوله...',
    outcome: 'مزّق الكتاب وأرسل إلى عامله باليمن أن يأتيه بالنبي أو يقطع رأسه. فدعا عليه النبي ﷺ فقُتل كسرى بيد ابنه شيرويه. تمزّق ملك الفرس ولم يبق منه شيء.',
    note: 'قال النبي ﷺ حين بلغه خبر تمزيق الرسالة: "مزّق الله ملكه."',
  },
  {
    id: 3,
    recipient: 'المقوقس',
    title: 'حاكم مصر وعظيم القبط',
    kingdom: 'مصر البيزنطية',
    year: '6 هـ / 627م',
    messenger: 'حاطب بن أبي بلتعة',
    response: 'أكرم ولم يسلم',
    summary: 'دعوة المقوقس إلى الإسلام. استقبل الرسول بإكرام وردّ باحترام وأهدى إلى النبي ﷺ هدايا.',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد عبد الله ورسوله إلى المقوقس عظيم القبط، سلامٌ على من اتّبع الهدى. أمّا بعد، فإني أدعوك بدعاية الإسلام...',
    outcome: 'استقبل الرسول وأكرمه. قرأ الكتاب وختمه بالشمع وأحسن ردّه. أهدى إلى النبي ﷺ مارية القبطية وأختها سيرين وبغلة بيضاء وأموالاً. لم يُسلم لكنه لم يؤذِ المسلمين.',
  },
  {
    id: 4,
    recipient: 'أصحمة النجاشي',
    title: 'ملك الحبشة',
    kingdom: 'الحبشة (إثيوبيا)',
    year: '6 هـ / 627م',
    messenger: 'عمرو بن أمية الضمري',
    response: 'أسلم',
    summary: 'دعوة النجاشي إلى الإسلام. كان قد أسلم في السرّ منذ هجرة المسلمين إليه، فأعلن إسلامه.',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد رسول الله إلى النجاشي أصحمة ملك الحبشة، سلامٌ عليك. أمّا بعد، فإني أحمد إليك الله الذي لا إله إلا هو...',
    outcome: 'أعلن إسلامه وكتب إلى النبي ﷺ يُبشّره بذلك. لما مات صلّى عليه النبي ﷺ صلاة الغائب في المدينة وقال: "توفي اليوم رجل صالح."',
    note: 'أوّل ملك أسلم وفاءً للمسلمين الذين أجارهم وحماهم في بلاده.',
  },
  {
    id: 5,
    recipient: 'المنذر بن ساوى',
    title: 'حاكم البحرين',
    kingdom: 'البحرين',
    year: '6 هـ / 627م',
    messenger: 'العلاء بن الحضرمي',
    response: 'أسلم',
    summary: 'دعوة حاكم البحرين إلى الإسلام. أسلم وأسلم معه أهل البحرين جميعاً.',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد رسول الله إلى المنذر بن ساوى، سلامٌ عليك. فإني أحمد إليك الله الذي لا إله إلا هو وأشهد أن محمداً عبده ورسوله...',
    outcome: 'أسلم المنذر وأسلم معه أهل البحرين. كتب النبي ﷺ إليه يمدحه ويثني عليه، وأبقاه والياً على البحرين. من أوائل الحكام الذين أسلموا بكاملهم.',
  },
  {
    id: 6,
    recipient: 'الحارث بن أبي شمر الغساني',
    title: 'ملك الغساسنة',
    kingdom: 'الغساسنة (شمال الجزيرة)',
    year: '6 هـ / 627م',
    messenger: 'شجاع بن وهب الأسدي',
    response: 'رفض',
    summary: 'دعوة ملك الغساسنة إلى الإسلام. رفض وتهدّد بالحرب قائلاً: "من يسلب مني ملكي؟"',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد رسول الله إلى الحارث بن أبي شمر، سلامٌ على من اتّبع الهدى وآمن وصدّق...',
    outcome: 'ألقى الكتاب وقال: "من يسلب مني ملكي أنا سائر إليه." فدعا عليه النبي ﷺ: "شُغِل ملكُه." وفي الحرب مع الروم انهارت الغساسنة دون قتال يُذكر.',
    note: 'قال النبي ﷺ لما بلغه ردّه: "اللهم اشغله."',
  },
  {
    id: 7,
    recipient: 'هوذة بن علي الحنفي',
    title: 'حاكم اليمامة',
    kingdom: 'اليمامة',
    year: '6 هـ / 627م',
    messenger: 'سليط بن عمرو العامري',
    response: 'رفض',
    summary: 'دعوة حاكم اليمامة إلى الإسلام. طلب أن يُشرَك في النبوة فرفض النبي ﷺ ودعا عليه.',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد رسول الله إلى هوذة بن علي، سلامٌ على من اتّبع الهدى...',
    outcome: 'كتب إلى النبي ﷺ يطلب أن يكون شريكاً في أمره أو ولياً عهد من بعده، فرفض النبي ﷺ. ومات هوذة قبل فتح مكة دون أن يُسلم.',
    note: 'قال النبي ﷺ لما بلغه مطلبه: "لو سألني سيابة من الأرض ما فعلت."',
  },
  {
    id: 8,
    recipient: 'جيفر وعبد ابنا الجُلَنْدى',
    title: 'حاكما عُمان',
    kingdom: 'عُمان',
    year: '6 هـ / 627م',
    messenger: 'عمرو بن العاص',
    response: 'أسلم',
    summary: 'دعوة حاكمَي عُمان إلى الإسلام. أسلما ففتحا عُمان للإسلام وجمعا الزكاة.',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد بن عبد الله إلى جيفر وعبد ابني الجُلَندى، سلامٌ على من اتّبع الهدى...',
    outcome: 'أسلم جيفر أولاً ثم أسلم عبد أخوه. طرد الفرس من عُمان ودفعا الزكاة. صار عمرو بن العاص يصفهما بأنهما من أكرم من لقي.',
  },
];

const LetterCard: React.FC<{ letter: Letter; index: number }> = ({ letter, index }) => {
  const [expanded, setExpanded] = useState(false);
  const respStyle = RESPONSE_STYLES[letter.response];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4) }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(201,168,76,0.14)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C80, transparent)' }} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span
                className="font-kufi text-xs px-2.5 py-0.5 rounded-full"
                style={{ background: respStyle.bg, border: `1px solid ${respStyle.border}`, color: respStyle.text }}
              >
                {letter.response}
              </span>
              <span className="font-kufi text-xs text-white/35">{letter.year}</span>
            </div>
            <h3 className="font-noto font-bold" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', color: '#C9A84C' }}>
              كتاب إلى {letter.recipient}
            </h3>
            <p className="font-kufi mt-0.5" style={{ fontSize: '0.8rem', color: '#C9A84C' }}>
              {letter.title} — {letter.kingdom}
            </p>
          </div>
          <div
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-noto font-bold"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', fontSize: '0.85rem' }}
          >
            {index + 1}
          </div>
        </div>

        {/* Messenger */}
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3"
          style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.1)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#C9A84C' }} />
          <span className="font-kufi text-xs text-white/40">حامل الرسالة: </span>
          <span className="font-kufi text-xs" style={{ color: '#C9A84C' }}>{letter.messenger}</span>
        </div>

        {/* Summary */}
        <p className="font-noto text-white/60 mb-3" style={{ fontSize: '0.87rem', lineHeight: 1.85 }}>
          {letter.summary}
        </p>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="w-full flex items-center justify-center gap-1.5 pt-2 font-kufi text-xs transition-colors"
          style={{ color: '#C9A84C', borderTop: '1px solid #171819' }}
        >
          {expanded ? <><ChevronUp size={13} /> إخفاء التفاصيل</> : <><ChevronDown size={13} /> عرض نص الرسالة والنتيجة</>}
        </button>

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
                {/* Letter excerpt */}
                <div
                  className="rounded-2xl p-4"
                  style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.18)' }}
                >
                  <p className="font-kufi text-xs mb-2" style={{ color: '#C9A84C' }}>مقتطف من نص الرسالة</p>
                  <p className="font-noto" style={{ fontSize: '0.88rem', color: '#C9A84C', lineHeight: 2, fontStyle: 'italic' }}>
                    {letter.excerpt}
                  </p>
                </div>

                {/* Outcome */}
                <div
                  className="rounded-xl px-4 py-3"
                  style={{ background: `${respStyle.bg}`, border: `1px solid ${respStyle.border}` }}
                >
                  <p className="font-kufi text-xs mb-1.5" style={{ color: respStyle.text }}>النتيجة والرد</p>
                  <p className="font-noto text-white/65" style={{ fontSize: '0.87rem', lineHeight: 1.9 }}>
                    {letter.outcome}
                  </p>
                </div>

                {/* Note */}
                {letter.note && (
                  <div
                    className="rounded-xl px-4 py-2.5 flex items-start gap-2"
                    style={{ background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.2)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#A78BFA' }} />
                    <p className="font-noto italic text-white/55" style={{ fontSize: '0.84rem', lineHeight: 1.85 }}>
                      {letter.note}
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

const LettersPage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [responseFilter, setResponseFilter] = useState<string>('الكل');

  const filtered = useMemo(() => {
    return LETTERS.filter(l => {
      const matchResp = responseFilter === 'الكل' || l.response === responseFilter;
      const q = searchQuery.trim();
      const matchSearch = !q || l.recipient.includes(q) || l.kingdom.includes(q) || l.title.includes(q);
      return matchResp && matchSearch;
    });
  }, [searchQuery, responseFilter]);

  const stats = useMemo(() => ({
    total: LETTERS.length,
    accepted: LETTERS.filter(l => l.response === 'أسلم').length,
    rejected: LETTERS.filter(l => l.response === 'رفض').length,
    hesitated: LETTERS.filter(l => l.response === 'تردد' || l.response === 'أكرم ولم يسلم').length,
  }), []);

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share button */}
      <div className="fixed top-[72px] left-4 z-[60]">
        <ShareButton title="رسائل النبي ﷺ إلى الملوك" accentColor="#C9A84C" />
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
          <button onClick={() => router.push('/')} className="flex items-center gap-1 hover:text-islamic-gold transition-colors">
            <Home size={12} /><span>الرئيسية</span>
          </button>
          <ChevronLeft size={10} className="rotate-180" />
          <span className="text-islamic-gold/80">رسائل النبي ﷺ إلى الملوك</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-8 pt-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-noto font-bold mb-3"
          style={{ fontSize: 'clamp(1.8rem, 5.5vw, 3.5rem)', color: '#C9A84C', textShadow: '0 0 30px #52482a' }}
        >
          رسائل النبي ﷺ إلى الملوك
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-noto text-islamic-gold/55 mt-2"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
        >
          ﴿وَمَا أَرْسَلْنَاكَ إِلَّا كَافَّةً لِّلنَّاسِ بَشِيراً وَنَذِيراً﴾ — سبأ: 28
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="font-noto text-white/40 max-w-xl mx-auto mt-3"
          style={{ fontSize: '0.92rem', lineHeight: 1.85 }}
        >
          في السنة السادسة الهجرية أرسل النبي ﷺ رسائله إلى ملوك الأرض يدعوهم إلى الإسلام، مُثبتاً أن رسالته عالمية للبشرية جمعاء.
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
          transition={{ delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8"
        >
          {[
            { label: 'عدد الرسائل', value: String(stats.total) + '+', color: '#C9A84C' },
            { label: 'أسلموا', value: String(stats.accepted), color: '#34D399' },
            { label: 'رفضوا', value: String(stats.rejected), color: '#F87171' },
            { label: 'ترددوا / أكرموا', value: String(stats.hesitated), color: '#60A5FA' },
          ].map(stat => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-4 py-3 rounded-2xl"
              style={{ background: 'rgba(201,168,76,0.05)', border: `1px solid ${stat.color}22` }}
            >
              <span className="font-noto font-bold" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', color: stat.color }}>
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
            placeholder="ابحث عن رسالة..."
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

        {/* Response filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {(['الكل', 'أسلم', 'رفض', 'تردد', 'أكرم ولم يسلم'] as const).map(r => {
            const isActive = responseFilter === r;
            const style = r === 'الكل'
              ? { color: '#C9A84C', bg: '#27251d', border: '#52482a' }
              : { color: RESPONSE_STYLES[r].text, bg: RESPONSE_STYLES[r].bg, border: RESPONSE_STYLES[r].border };
            return (
              <motion.button
                key={r}
                onClick={() => setResponseFilter(r)}
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
                    ({LETTERS.filter(l => l.response === r).length})
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
          يُعرض {filtered.length} رسالة — اضغط "عرض نص الرسالة" لكل بطاقة
        </span>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((letter, index) => (
            <LetterCard key={letter.id} letter={letter} index={index} />
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

export default LettersPage;
