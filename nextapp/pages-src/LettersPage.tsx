'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface Letter {
  id: number;
  recipient: string; recipientEn: string;
  title: string; titleEn: string;
  kingdom: string; kingdomEn: string;
  year: string;
  messenger: string;
  response: 'أسلم' | 'رفض' | 'تردد' | 'أكرم ولم يسلم';
  summary: string; summaryEn: string;
  excerpt: string; excerptEn: string;
  outcome: string; outcomeEn: string;
  note?: string; noteEn?: string;
}

const RESPONSE_STYLES: Record<string, { bg: string; border: string; text: string }> = {
  'أسلم':            { bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.35)',  text: '#34D399' },
  'رفض':             { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.35)', text: '#F87171' },
  'تردد':            { bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.35)',  text: '#FBBF24' },
  'أكرم ولم يسلم':  { bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.35)',  text: '#60A5FA' },
};

const RESPONSE_LABELS_EN: Record<string, string> = {
  'أسلم':           'Accepted Islam',
  'رفض':            'Rejected',
  'تردد':           'Hesitated',
  'أكرم ولم يسلم': 'Honored but did not accept',
};

const LETTERS: Letter[] = [
  {
    id: 1,
    recipient: 'هرقل',
    recipientEn: 'Heraclius',
    title: 'قيصر الروم',
    titleEn: 'Emperor of Byzantium',
    kingdom: 'الإمبراطورية البيزنطية',
    kingdomEn: 'Byzantine Empire',
    year: '6 هـ / 627م',
    messenger: 'دحية بن خليفة الكلبي',
    response: 'تردد',
    summary: 'دعوة هرقل إلى الإسلام مع بيان حجج النبوة. استقبل الرسالة بإعجاب ودعا أبا سفيان للاستفسار عن النبي ﷺ.',
    summaryEn: 'Inviting Heraclius to Islam with proofs of prophethood. He received the letter with admiration and summoned Abu Sufyan to inquire about the Prophet ﷺ.',
    excerpt: 'بسم الله الرحمن الرحيم، من محمدٍ عبد الله ورسوله إلى هرقل عظيم الروم، سلامٌ على من اتّبع الهدى. أمّا بعد، فإني أدعوك بدعاية الإسلام، أسلِمْ تسلَمْ، يُؤتِكَ الله أجرك مرّتين...',
    excerptEn: 'In the name of Allah, the Most Gracious, the Most Merciful. From Muhammad, servant of Allah and His Messenger, to Heraclius, great one of Byzantium. Peace be upon whoever follows the guidance. After this: I invite you with the invitation of Islam — submit and you will be safe, Allah will give you your reward twice...',
    outcome: 'أعجب بالرسالة وصدّق بنبوة محمد ﷺ في نفسه، لكنه خاف على ملكه من الروم فلم يُعلن إسلامه.',
    outcomeEn: 'He admired the letter and privately believed in the prophethood of Muhammad ﷺ, but feared his people and kingdom, so he did not publicly declare his Islam.',
    note: 'سأل أبا سفيان — وكان يومئذ مشركاً — عن النبي ﷺ، فما وجد إلا الحسنى.',
    noteEn: 'He questioned Abu Sufyan — who was then still a polytheist — about the Prophet ﷺ, and could find nothing but good.',
  },
  {
    id: 2,
    recipient: 'كسرى أبرويز',
    recipientEn: 'Khosrow Parviz',
    title: 'ملك الفرس',
    titleEn: 'King of Persia',
    kingdom: 'الإمبراطورية الساسانية',
    kingdomEn: 'Sassanid Empire',
    year: '6 هـ / 627م',
    messenger: 'عبد الله بن حذافة السهمي',
    response: 'رفض',
    summary: 'دعوة كسرى إلى الإسلام. مزّق الكتاب استكباراً فدعا النبي ﷺ: "مزّق الله ملكه."',
    summaryEn: 'Inviting Khosrow to Islam. He tore up the letter in arrogance, so the Prophet ﷺ prayed: "May Allah tear apart his kingdom."',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد رسول الله إلى كسرى عظيم فارس، سلامٌ على من اتّبع الهدى وآمن بالله ورسوله...',
    excerptEn: 'In the name of Allah, the Most Gracious, the Most Merciful. From Muhammad, Messenger of Allah, to Khosrow, great one of Persia. Peace be upon whoever follows the guidance and believes in Allah and His Messenger...',
    outcome: 'مزّق الكتاب وأرسل إلى عامله باليمن أن يأتيه بالنبي أو يقطع رأسه. فدعا عليه النبي ﷺ فقُتل كسرى بيد ابنه شيرويه. تمزّق ملك الفرس ولم يبق منه شيء.',
    outcomeEn: 'He tore up the letter and sent word to his governor in Yemen to bring him the Prophet or cut off his head. The Prophet ﷺ prayed against him and Khosrow was killed by his own son Shiruyah. The Persian kingdom was torn apart and nothing remained of it.',
    note: 'قال النبي ﷺ حين بلغه خبر تمزيق الرسالة: "مزّق الله ملكه."',
    noteEn: 'The Prophet ﷺ said when news of the torn letter reached him: "May Allah tear apart his kingdom."',
  },
  {
    id: 3,
    recipient: 'المقوقس',
    recipientEn: 'Al-Muqawqis',
    title: 'حاكم مصر وعظيم القبط',
    titleEn: 'Ruler of Egypt and Chief of the Copts',
    kingdom: 'مصر البيزنطية',
    kingdomEn: 'Byzantine Egypt',
    year: '6 هـ / 627م',
    messenger: 'حاطب بن أبي بلتعة',
    response: 'أكرم ولم يسلم',
    summary: 'دعوة المقوقس إلى الإسلام. استقبل الرسول بإكرام وردّ باحترام وأهدى إلى النبي ﷺ هدايا.',
    summaryEn: 'Inviting al-Muqawqis to Islam. He received the messenger honorably, replied with respect, and sent gifts to the Prophet ﷺ.',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد عبد الله ورسوله إلى المقوقس عظيم القبط، سلامٌ على من اتّبع الهدى. أمّا بعد، فإني أدعوك بدعاية الإسلام...',
    excerptEn: 'In the name of Allah, the Most Gracious, the Most Merciful. From Muhammad, servant of Allah and His Messenger, to al-Muqawqis, great one of the Copts. Peace be upon whoever follows the guidance. After this: I invite you with the invitation of Islam...',
    outcome: 'استقبل الرسول وأكرمه. قرأ الكتاب وختمه بالشمع وأحسن ردّه. أهدى إلى النبي ﷺ مارية القبطية وأختها سيرين وبغلة بيضاء وأموالاً. لم يُسلم لكنه لم يؤذِ المسلمين.',
    outcomeEn: 'He received the messenger and honored him. He read the letter, sealed it with wax, and sent a respectful reply. He gifted the Prophet ﷺ Mariyah al-Qibtiyyah, her sister Sirin, a white mule, and wealth. He did not embrace Islam but did not harm the Muslims.',
  },
  {
    id: 4,
    recipient: 'أصحمة النجاشي',
    recipientEn: 'Ashama an-Najashi',
    title: 'ملك الحبشة',
    titleEn: 'King of Abyssinia',
    kingdom: 'الحبشة (إثيوبيا)',
    kingdomEn: 'Abyssinia (Ethiopia)',
    year: '6 هـ / 627م',
    messenger: 'عمرو بن أمية الضمري',
    response: 'أسلم',
    summary: 'دعوة النجاشي إلى الإسلام. كان قد أسلم في السرّ منذ هجرة المسلمين إليه، فأعلن إسلامه.',
    summaryEn: 'Inviting the Negus to Islam. He had secretly accepted Islam since the Muslim migration to his land, and now declared it openly.',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد رسول الله إلى النجاشي أصحمة ملك الحبشة، سلامٌ عليك. أمّا بعد، فإني أحمد إليك الله الذي لا إله إلا هو...',
    excerptEn: 'In the name of Allah, the Most Gracious, the Most Merciful. From Muhammad, Messenger of Allah, to the Negus Ashama, King of Abyssinia. Peace be upon you. After this: I praise to you Allah besides Whom there is no god...',
    outcome: 'أعلن إسلامه وكتب إلى النبي ﷺ يُبشّره بذلك. لما مات صلّى عليه النبي ﷺ صلاة الغائب في المدينة وقال: "توفي اليوم رجل صالح."',
    outcomeEn: 'He declared his Islam and wrote to the Prophet ﷺ with the good news. When he passed away, the Prophet ﷺ prayed the funeral prayer in absentia in Medina and said: "A righteous man has died today."',
    note: 'أوّل ملك أسلم وفاءً للمسلمين الذين أجارهم وحماهم في بلاده.',
    noteEn: 'The first king to embrace Islam, faithful to the Muslims who had taken refuge and found protection in his land.',
  },
  {
    id: 5,
    recipient: 'المنذر بن ساوى',
    recipientEn: 'Al-Mundhir ibn Sawa',
    title: 'حاكم البحرين',
    titleEn: 'Ruler of Bahrain',
    kingdom: 'البحرين',
    kingdomEn: 'Bahrain',
    year: '6 هـ / 627م',
    messenger: 'العلاء بن الحضرمي',
    response: 'أسلم',
    summary: 'دعوة حاكم البحرين إلى الإسلام. أسلم وأسلم معه أهل البحرين جميعاً.',
    summaryEn: 'Inviting the ruler of Bahrain to Islam. He accepted Islam and the entire people of Bahrain embraced Islam with him.',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد رسول الله إلى المنذر بن ساوى، سلامٌ عليك. فإني أحمد إليك الله الذي لا إله إلا هو وأشهد أن محمداً عبده ورسوله...',
    excerptEn: 'In the name of Allah, the Most Gracious, the Most Merciful. From Muhammad, Messenger of Allah, to al-Mundhir ibn Sawa. Peace be upon you. I praise to you Allah besides Whom there is no god, and I bear witness that Muhammad is His servant and Messenger...',
    outcome: 'أسلم المنذر وأسلم معه أهل البحرين. كتب النبي ﷺ إليه يمدحه ويثني عليه، وأبقاه والياً على البحرين. من أوائل الحكام الذين أسلموا بكاملهم.',
    outcomeEn: 'Al-Mundhir embraced Islam and the entire people of Bahrain followed. The Prophet ﷺ wrote praising and commending him, and kept him as governor of Bahrain. Among the first rulers whose entire people embraced Islam.',
  },
  {
    id: 6,
    recipient: 'الحارث بن أبي شمر الغساني',
    recipientEn: 'Al-Harith ibn Abi Shimr al-Ghassani',
    title: 'ملك الغساسنة',
    titleEn: 'King of the Ghassanids',
    kingdom: 'الغساسنة (شمال الجزيرة)',
    kingdomEn: 'Ghassanid Kingdom (Northern Arabia)',
    year: '6 هـ / 627م',
    messenger: 'شجاع بن وهب الأسدي',
    response: 'رفض',
    summary: 'دعوة ملك الغساسنة إلى الإسلام. رفض وتهدّد بالحرب قائلاً: "من يسلب مني ملكي؟"',
    summaryEn: 'Inviting the Ghassanid king to Islam. He rejected it and threatened war, saying: "Who will strip me of my kingdom?"',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد رسول الله إلى الحارث بن أبي شمر، سلامٌ على من اتّبع الهدى وآمن وصدّق...',
    excerptEn: 'In the name of Allah, the Most Gracious, the Most Merciful. From Muhammad, Messenger of Allah, to al-Harith ibn Abi Shimr. Peace be upon whoever follows the guidance, believes, and is sincere...',
    outcome: 'ألقى الكتاب وقال: "من يسلب مني ملكي أنا سائر إليه." فدعا عليه النبي ﷺ: "شُغِل ملكُه." وفي الحرب مع الروم انهارت الغساسنة دون قتال يُذكر.',
    outcomeEn: 'He threw the letter and said: "Who will strip me of my kingdom? I am marching to him." The Prophet ﷺ prayed against him: "May his kingdom be preoccupied." In the wars with Byzantium, the Ghassanids collapsed without noteworthy resistance.',
    note: 'قال النبي ﷺ لما بلغه ردّه: "اللهم اشغله."',
    noteEn: 'The Prophet ﷺ said when his reply reached him: "O Allah, preoccupy him."',
  },
  {
    id: 7,
    recipient: 'هوذة بن علي الحنفي',
    recipientEn: 'Hawdha ibn Ali al-Hanafi',
    title: 'حاكم اليمامة',
    titleEn: 'Ruler of al-Yamamah',
    kingdom: 'اليمامة',
    kingdomEn: 'Al-Yamamah',
    year: '6 هـ / 627م',
    messenger: 'سليط بن عمرو العامري',
    response: 'رفض',
    summary: 'دعوة حاكم اليمامة إلى الإسلام. طلب أن يُشرَك في النبوة فرفض النبي ﷺ ودعا عليه.',
    summaryEn: 'Inviting the ruler of al-Yamamah to Islam. He asked to be made a partner in the prophethood, which the Prophet ﷺ refused, and he prayed against him.',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد رسول الله إلى هوذة بن علي، سلامٌ على من اتّبع الهدى...',
    excerptEn: 'In the name of Allah, the Most Gracious, the Most Merciful. From Muhammad, Messenger of Allah, to Hawdha ibn Ali. Peace be upon whoever follows the guidance...',
    outcome: 'كتب إلى النبي ﷺ يطلب أن يكون شريكاً في أمره أو ولياً عهد من بعده، فرفض النبي ﷺ. ومات هوذة قبل فتح مكة دون أن يُسلم.',
    outcomeEn: 'He wrote to the Prophet ﷺ requesting to be a partner in his affair or his designated successor, which the Prophet ﷺ refused. Hawdha died before the conquest of Mecca without embracing Islam.',
    note: 'قال النبي ﷺ لما بلغه مطلبه: "لو سألني سيابة من الأرض ما فعلت."',
    noteEn: 'The Prophet ﷺ said when his request reached him: "If he had asked me for a span of earth, I would not have done it."',
  },
  {
    id: 8,
    recipient: 'جيفر وعبد ابنا الجُلَنْدى',
    recipientEn: "Jaifar and 'Abd, sons of al-Julanda",
    title: 'حاكما عُمان',
    titleEn: 'Rulers of Oman',
    kingdom: 'عُمان',
    kingdomEn: 'Oman',
    year: '6 هـ / 627م',
    messenger: 'عمرو بن العاص',
    response: 'أسلم',
    summary: 'دعوة حاكمَي عُمان إلى الإسلام. أسلما ففتحا عُمان للإسلام وجمعا الزكاة.',
    summaryEn: 'Inviting the two rulers of Oman to Islam. They both accepted Islam, opening Oman to Islam and collecting zakah.',
    excerpt: 'بسم الله الرحمن الرحيم، من محمد بن عبد الله إلى جيفر وعبد ابني الجُلَندى، سلامٌ على من اتّبع الهدى...',
    excerptEn: "In the name of Allah, the Most Gracious, the Most Merciful. From Muhammad ibn Abdullah to Jaifar and 'Abd, sons of al-Julanda. Peace be upon whoever follows the guidance...",
    outcome: 'أسلم جيفر أولاً ثم أسلم عبد أخوه. طرد الفرس من عُمان ودفعا الزكاة. صار عمرو بن العاص يصفهما بأنهما من أكرم من لقي.',
    outcomeEn: "Jaifar accepted Islam first, then his brother 'Abd followed. They expelled the Persians from Oman and paid the zakah. Amr ibn al-As would describe them as among the most honorable people he had ever met.",
  },
];

const LetterCard: React.FC<{ letter: Letter; index: number; isEn: boolean }> = ({ letter, index, isEn }) => {
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

      <div className="p-5" dir={isEn ? 'ltr' : 'rtl'}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span
                className="font-kufi text-xs px-2.5 py-0.5 rounded-full"
                style={{ background: respStyle.bg, border: `1px solid ${respStyle.border}`, color: respStyle.text }}
              >
                {isEn ? RESPONSE_LABELS_EN[letter.response] : letter.response}
              </span>
              <span className="font-kufi text-xs text-white/35">{letter.year}</span>
            </div>
            <h3 className="font-noto font-bold" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', color: '#C9A84C' }}>
              {isEn ? `Letter to ${letter.recipientEn}` : `كتاب إلى ${letter.recipient}`}
            </h3>
            <p className="font-kufi mt-0.5" style={{ fontSize: '0.8rem', color: '#C9A84C' }}>
              {isEn ? `${letter.titleEn} — ${letter.kingdomEn}` : `${letter.title} — ${letter.kingdom}`}
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
          <span className="font-kufi text-xs text-white/40">{isEn ? 'Messenger: ' : 'حامل الرسالة: '}</span>
          <span className="font-kufi text-xs" style={{ color: '#C9A84C' }}>{letter.messenger}</span>
        </div>

        {/* Summary */}
        <p className="font-noto text-white/60 mb-3" style={{ fontSize: '0.87rem', lineHeight: 1.85 }}>
          {isEn ? letter.summaryEn : letter.summary}
        </p>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="w-full flex items-center justify-center gap-1.5 pt-2 font-kufi text-xs transition-colors"
          style={{ color: '#C9A84C', borderTop: '1px solid #171819' }}
        >
          {expanded
            ? <><ChevronUp size={13} /> {isEn ? 'Hide details' : 'إخفاء التفاصيل'}</>
            : <><ChevronDown size={13} /> {isEn ? 'Show letter text & outcome' : 'عرض نص الرسالة والنتيجة'}</>}
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
                  dir="rtl"
                >
                  <p className="font-kufi text-xs mb-2" style={{ color: '#C9A84C' }}>
                    {isEn ? 'Excerpt from the letter' : 'مقتطف من نص الرسالة'}
                  </p>
                  <p className="font-noto" style={{ fontSize: '0.88rem', color: '#C9A84C', lineHeight: 2, fontStyle: 'italic' }}>
                    {letter.excerpt}
                  </p>
                  {isEn && (
                    <p className="font-noto mt-3" dir="ltr" style={{ fontSize: '0.85rem', color: '#C9A84C99', lineHeight: 1.9, fontStyle: 'italic' }}>
                      {letter.excerptEn}
                    </p>
                  )}
                </div>

                {/* Outcome */}
                <div
                  className="rounded-xl px-4 py-3"
                  style={{ background: `${respStyle.bg}`, border: `1px solid ${respStyle.border}` }}
                >
                  <p className="font-kufi text-xs mb-1.5" style={{ color: respStyle.text }}>
                    {isEn ? 'Outcome & Response' : 'النتيجة والرد'}
                  </p>
                  <p className="font-noto text-white/65" style={{ fontSize: '0.87rem', lineHeight: 1.9 }}>
                    {isEn ? letter.outcomeEn : letter.outcome}
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
                      {isEn ? letter.noteEn : letter.note}
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
  const { isEn } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [responseFilter, setResponseFilter] = useState<string>('الكل');

  const filtered = useMemo(() => {
    return LETTERS.filter(l => {
      const matchResp = responseFilter === 'الكل' || l.response === responseFilter;
      const q = searchQuery.trim();
      const matchSearch = !q || (
        isEn
          ? (l.recipientEn.toLowerCase().includes(q.toLowerCase()) || l.kingdomEn.toLowerCase().includes(q.toLowerCase()) || l.titleEn.toLowerCase().includes(q.toLowerCase()))
          : (l.recipient.includes(q) || l.kingdom.includes(q) || l.title.includes(q))
      );
      return matchResp && matchSearch;
    });
  }, [searchQuery, responseFilter, isEn]);

  const stats = useMemo(() => ({
    total: LETTERS.length,
    accepted: LETTERS.filter(l => l.response === 'أسلم').length,
    rejected: LETTERS.filter(l => l.response === 'رفض').length,
    hesitated: LETTERS.filter(l => l.response === 'تردد' || l.response === 'أكرم ولم يسلم').length,
  }), []);

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share button */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? "Prophet's Letters to Kings" : 'رسائل النبي ﷺ إلى الملوك'} accentColor="#C9A84C" />
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
      <div
        className="relative z-10 px-6 pt-6 pb-4"
        style={{ [isEn ? 'paddingRight' : 'paddingLeft']: '5rem' }}
      >
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs text-islamic-gold/50"
        >
          <button onClick={() => router.push('/')} className="flex items-center gap-1 hover:text-islamic-gold transition-colors">
            <Home size={12} /><span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </button>
          <ChevronLeft size={10} className={isEn ? '' : 'rotate-180'} />
          <span className="text-islamic-gold/80">
            {isEn ? "Prophet's Letters to Kings" : 'رسائل النبي ﷺ إلى الملوك'}
          </span>
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
          {isEn ? "The Prophet's Letters to Kings" : 'رسائل النبي ﷺ إلى الملوك'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-noto text-islamic-gold/55 mt-2"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
          dir="rtl"
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
          {isEn
            ? 'In the sixth year of the Hijra, the Prophet ﷺ sent letters to the kings of the earth inviting them to Islam, proving that his message was universal for all mankind.'
            : 'في السنة السادسة الهجرية أرسل النبي ﷺ رسائله إلى ملوك الأرض يدعوهم إلى الإسلام، مُثبتاً أن رسالته عالمية للبشرية جمعاء.'}
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
          {(isEn ? [
            { label: 'Letters sent', value: String(stats.total) + '+', color: '#C9A84C' },
            { label: 'Accepted Islam', value: String(stats.accepted), color: '#34D399' },
            { label: 'Rejected', value: String(stats.rejected), color: '#F87171' },
            { label: 'Hesitated / Honored', value: String(stats.hesitated), color: '#60A5FA' },
          ] : [
            { label: 'عدد الرسائل', value: String(stats.total) + '+', color: '#C9A84C' },
            { label: 'أسلموا', value: String(stats.accepted), color: '#34D399' },
            { label: 'رفضوا', value: String(stats.rejected), color: '#F87171' },
            { label: 'ترددوا / أكرموا', value: String(stats.hesitated), color: '#60A5FA' },
          ]).map(stat => (
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
          <Search
            size={14}
            className={`absolute ${isEn ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-islamic-gold/40`}
          />
          <input
            type="text"
            placeholder={isEn ? 'Search letters...' : 'ابحث عن رسالة...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full font-kufi text-sm text-white/80 py-2.5 rounded-full outline-none"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(201,168,76,0.2)',
              paddingRight: isEn ? '2rem' : '2.25rem',
              paddingLeft: isEn ? '2.25rem' : '2rem',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className={`absolute ${isEn ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60`}
            >
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
            const label = r === 'الكل' ? (isEn ? 'All' : 'الكل') : (isEn ? RESPONSE_LABELS_EN[r] : r);
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
                {label}
                {r !== 'الكل' && (
                  <span className={isEn ? 'ml-1.5' : 'mr-1.5'} style={{ opacity: 0.6 }}>
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
          {isEn
            ? `Showing ${filtered.length} letter(s) — click "Show letter text" on each card`
            : `يُعرض ${filtered.length} رسالة — اضغط "عرض نص الرسالة" لكل بطاقة`}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((letter, index) => (
            <LetterCard key={letter.id} letter={letter} index={index} isEn={isEn} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-noto text-white/30 text-lg">
              {isEn ? 'No matching results' : 'لا نتائج مطابقة للبحث'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LettersPage;
