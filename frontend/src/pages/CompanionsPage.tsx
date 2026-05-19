import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, Search, X } from 'lucide-react';
import ShareButton from '../components/ShareButton';

interface Companion {
  name: string;
  nickname: string;
  description: string;
  achievement: string;
  category: string;
  hadith?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'العشرة المبشرون': '#C9A84C',
  'المهاجرون': '#60A5FA',
  'الأنصار': '#34D399',
  'الصحابيات': '#F472B6',
  'العلماء والقرّاء': '#A78BFA',
  'الفرسان والقادة': '#FB923C',
};

const COMPANIONS: Companion[] = [
  // ── العشرة المبشرون ──
  {
    name: 'أبو بكر الصديق',
    nickname: 'الصديق — خليل النبي ﷺ',
    achievement: 'أول الخلفاء الراشدين',
    description: 'أول من صدّق النبي ﷺ من الرجال وصاحبه في الغار. أنفق ماله كله في سبيل الله وأعتق بلالاً وغيره. قال فيه النبي ﷺ: "ما نفعني مال أحد قط ما نفعني مال أبي بكر."',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "لو كنتُ متخذاً من أمتي خليلاً لاتخذتُ أبا بكر خليلاً"',
  },
  {
    name: 'عمر بن الخطاب',
    nickname: 'الفاروق — أمير المؤمنين',
    achievement: 'ثاني الخلفاء الراشدين',
    description: 'عزّ الله به الإسلام فكان إسلامه فتحاً. أول من سُمّي أمير المؤمنين. فتحت في عهده فارس والشام ومصر. كان عدله ضرباً من الكرامة الإنسانية.',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "لو كان بعدي نبيٌّ لكان عمر"',
  },
  {
    name: 'عثمان بن عفان',
    nickname: 'ذو النورين',
    achievement: 'ثالث الخلفاء — جامع القرآن',
    description: 'تزوّج ابنتي النبي ﷺ (رقية ثم أم كلثوم) فلُقّب بذي النورين. جمع القرآن في مصحف موحّد أنقذ الأمة من الاختلاف. جهّز جيش العسرة بثلث ماله.',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "ما ضرّ عثمانَ ما فعل بعد اليوم"',
  },
  {
    name: 'علي بن أبي طالب',
    nickname: 'أسد الله — أبو السبطين',
    achievement: 'رابع الخلفاء الراشدين',
    description: 'ابن عم النبي ﷺ وزوج فاطمة الزهراء. نام في فراش النبي ليلة الهجرة. أعلم الصحابة بالقضاء والفقه. قاتل في بدر وأحد والخندق وكل المشاهد.',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "أنا مدينة العلم وعلي بابها"',
  },
  {
    name: 'طلحة بن عبيدالله',
    nickname: 'طلحة الخير — طلحة الجواد',
    achievement: 'من أكرم الصحابة جوداً',
    description: 'وقى النبي ﷺ بنفسه يوم أحد فشلّت يده دفاعاً عنه. قال فيه النبي ﷺ: "طلحة ممن قضى نحبه." كان يُعطي العطاء الواسع حتى سُمّي بالفيّاض.',
    category: 'العشرة المبشرون',
  },
  {
    name: 'الزبير بن العوام',
    nickname: 'حواري النبي ﷺ',
    achievement: 'فارس الإسلام الأول',
    description: 'ابن عمة النبي ﷺ وأول من سلّ سيفه في الإسلام. قال فيه النبي ﷺ: "إن لكل نبي حوارياً وحواريّ الزبير." شهد جميع الغزوات وكان من أشجع الصحابة.',
    category: 'العشرة المبشرون',
  },
  {
    name: 'عبد الرحمن بن عوف',
    nickname: 'أحد العشرة المبشرين',
    achievement: 'تاجر الصحابة الأول',
    description: 'هاجر بلا مال فأعطاه أخوه الأنصاري نصف ماله فرفض وطلب السوق. فكسب في يومه الأول خطيبةً وتجارة. تصدّق بنصف ماله وبنصف آخر مرات عدة.',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "عبد الرحمن بن عوف في الجنة"',
  },
  {
    name: 'سعد بن أبي وقاص',
    nickname: 'فارس الإسلام الأول',
    achievement: 'أول من رمى سهماً في الإسلام',
    description: 'من أوائل المسلمين ومن السابقين إلى الإسلام. قائد معركة القادسية التي فتحت فارس. استجاب الله لدعائه حتى كانت دعوته مستجابة.',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "اللهم سدّد رميته وأجب دعوته"',
  },
  {
    name: 'سعيد بن زيد',
    nickname: 'من السابقين الأولين',
    achievement: 'من مبكّري الإسلام',
    description: 'أسلم قبل دخول دار الأرقم. زوجه أخت عمر بن الخطاب. شهد كثيراً من المشاهد وكان من أهل الشورى. جاء ذكره في البشرى النبوية الجامعة.',
    category: 'العشرة المبشرون',
  },
  {
    name: 'أبو عبيدة بن الجراح',
    nickname: 'أمين هذه الأمة',
    achievement: 'فاتح بلاد الشام',
    description: 'وصفه النبي ﷺ بأمين هذه الأمة. قائد الجيش الإسلامي في فتح الشام. كان من أشد الناس تواضعاً وأقلهم حباً للشهرة. توفي في طاعون عمواس.',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "لكل أمة أمين وأمين هذه الأمة أبو عبيدة بن الجراح"',
  },

  // ── المهاجرون ──
  {
    name: 'حمزة بن عبد المطلب',
    nickname: 'أسد الله وأسد رسوله',
    achievement: 'سيد الشهداء',
    description: 'عمّ النبي ﷺ وأخوه من الرضاعة. أسلم غيرةً للنبي ﷺ ثم أصبح من أشد المؤمنين. شهيد أحد الذي بكى عليه النبي ﷺ وقال: "سيد الشهداء."',
    category: 'المهاجرون',
    hadith: 'قال ﷺ: "حمزة سيد الشهداء يوم القيامة"',
  },
  {
    name: 'جعفر بن أبي طالب',
    nickname: 'الطيّار — ذو الجناحين',
    achievement: 'خطيب المسلمين أمام النجاشي',
    description: 'مثّل المسلمين أمام النجاشي وتلا سورة مريم ففاضت عيون القوم. استُشهد في مؤتة وقال ﷺ: "رأيته يطير في الجنة بجناحين." كان أشبه الناس بالنبي ﷺ خُلقاً وخَلقاً.',
    category: 'المهاجرون',
    hadith: 'قال ﷺ: "أشبهتَ خَلقي وخُلقي"',
  },
  {
    name: 'مصعب بن عمير',
    nickname: 'أول سفير في الإسلام',
    achievement: 'من دعاة الإسلام الأوائل',
    description: 'نشأ في النعيم والترف ثم تركه كله للإسلام. أُرسل إلى المدينة أول سفير فأسلم على يده سعد بن معاذ ومعظم قبيلته. استُشهد في أحد ولم يجدوا كفناً يغطيه.',
    category: 'المهاجرون',
  },
  {
    name: 'خباب بن الأرت',
    nickname: 'صاحب النار',
    achievement: 'من أوائل المعذَّبين في مكة',
    description: 'حدّاد أُضجع على الجمر المتّقد حتى أطفأه دمه وشحم ظهره. شكا إلى النبي ﷺ فقال ﷺ: "كان الرجل قبلكم يُنشر بالمنشار ما يصدّه ذلك عن دينه." صبر حتى جاء الفرج.',
    category: 'المهاجرون',
  },
  {
    name: 'عمّار بن ياسر',
    nickname: 'المعذَّب في الله',
    achievement: 'ابن أول شهيدة في الإسلام',
    description: 'ابن ياسر وسمية — أول أسرة كاملة تُعذَّب في الإسلام. أُكرِه على كلمة الكفر فأنزل الله عذره. قال فيه النبي ﷺ: "ملئ عمّار إيماناً من قرنه إلى قدمه."',
    category: 'المهاجرون',
  },
  {
    name: 'بلال بن رباح',
    nickname: 'مؤذن النبي ﷺ',
    achievement: 'أول مؤذن في الإسلام',
    description: 'العبد الحبشي الذي صبر على العذاب يقول: أحد أحد. اشتراه أبو بكر وأعتقه. صعد الكعبة يؤذّن يوم الفتح. كان لا ينام حتى يرى النبي ﷺ.',
    category: 'المهاجرون',
    hadith: 'قال ﷺ: "سمعتُ خشخشة نعليك في الجنة"',
  },
  {
    name: 'سلمان الفارسي',
    nickname: 'سلمان منّا أهل البيت',
    achievement: 'صاحب فكرة الخندق',
    description: 'الفارسي الذي قطع آلاف الأميال بحثاً عن الحق من المجوسية إلى النصرانية إلى الإسلام. صاحب فكرة حفر الخندق. قال فيه النبي ﷺ: "سلمان منّا أهل البيت."',
    category: 'المهاجرون',
  },
  {
    name: 'أبو ذر الغفاري',
    nickname: 'أصدق من أقلّت الغبراء',
    achievement: 'رمز الزهد والصدق',
    description: 'أتى إلى مكة من بادية غفار وأعلن إسلامه جهاراً. عرّض نفسه للأذى طلباً للحق. قال فيه النبي ﷺ: "ما أظلّت الخضراء ولا أقلّت الغبراء من ذي لهجة أصدق من أبي ذر."',
    category: 'المهاجرون',
  },
  {
    name: 'صهيب الرومي',
    nickname: 'صهيب الرومي',
    achievement: 'فدى نفسه بماله هجرةً',
    description: 'ولد روميّاً وتربّى عربياً. حين أراد الهجرة منعه المشركون فقال: أرأيتم إن تركتُ مالي؟ فتركوه. فنزلت: ﴿وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ﴾.',
    category: 'المهاجرون',
  },
  {
    name: 'أبو سلمة المخزومي',
    nickname: 'السابق إلى الهجرتين',
    achievement: 'أول من هاجر إلى المدينة',
    description: 'زوج أم سلمة قبل النبي ﷺ. أول من هاجر إلى المدينة من مكة. شهد بدراً وأُحداً وجُرح في أحد. استشهد بعدها. دعا له النبي ﷺ بعد وفاته.',
    category: 'المهاجرون',
  },

  // ── الأنصار ──
  {
    name: 'سعد بن معاذ',
    nickname: 'سيد الأوس',
    achievement: 'الذي اهتزّ لموته عرش الرحمن',
    description: 'أسلم على يد مصعب بن عمير فأسلمت قبيلته كلها. صاحب حكم غزوة بني قريظة. توفي من جرح أحد. قال ﷺ: "اهتزّ العرش لموت سعد بن معاذ."',
    category: 'الأنصار',
    hadith: 'قال ﷺ: "اهتزّ عرش الرحمن لموت سعد بن معاذ"',
  },
  {
    name: 'أبو أيوب الأنصاري',
    nickname: 'مضيف النبي ﷺ',
    achievement: 'نزل النبي ﷺ في داره',
    description: 'استضاف النبي ﷺ في بيته حين قدم المدينة مهاجراً. لم يزل يغزو حتى بلغ السبعين وتوفي قرب القسطنطينية. يُزار قبره في إسطنبول إلى اليوم.',
    category: 'الأنصار',
  },
  {
    name: 'معاذ بن جبل',
    nickname: 'أعلم الأمة بالحلال والحرام',
    achievement: 'معلّم اليمن',
    description: 'بعثه النبي ﷺ إلى اليمن معلماً وقاضياً. قال فيه: "أعلم أمتي بالحلال والحرام." كان يبكي من خشية الله ويقول: أخاف أن أكون من المنافقين.',
    category: 'الأنصار',
    hadith: 'قال ﷺ: "أعلم أمتي بالحلال والحرام معاذ بن جبل"',
  },
  {
    name: 'أبيّ بن كعب',
    nickname: 'سيد القرّاء',
    achievement: 'أقرأ الصحابة',
    description: 'أمره النبي ﷺ أن يُقرئ القرآن. كان ذا مكانة في القراءة حتى قال النبي ﷺ: "أقرأ أمتي أُبيّ." جمع القرآن في زمن النبي ﷺ قبل وفاته.',
    category: 'الأنصار',
    hadith: 'قال ﷺ: "أقرأ أمتي أُبيّ بن كعب"',
  },
  {
    name: 'أنس بن مالك',
    nickname: 'خادم النبي ﷺ',
    achievement: 'أكثر الصحابة رواية للحديث',
    description: 'خدم النبي ﷺ عشر سنين فلم يقل له قط: لمَ فعلتَ هذا؟ دعا له النبي ﷺ بالبركة في المال والولد والعمر فعاش مئة وثلاث سنين. روى أكثر من ألفي حديث.',
    category: 'الأنصار',
    hadith: 'قال ﷺ: "اللهم أكثر ماله وولده وأطل عمره"',
  },
  {
    name: 'أبو طلحة الأنصاري',
    nickname: 'الرامي الثبّات',
    achievement: 'كان صوته في الصف أشد من فرقة',
    description: 'فارس الأنصار وشاعرهم وأحد رماتهم. تزوّج أم سليم أمّه بشرط إسلامه فأسلم. ظلّل النبي ﷺ بصدره يوم أُحد. قال ﷺ: "صوت أبي طلحة في الجيش خيرٌ من فئة."',
    category: 'الأنصار',
  },
  {
    name: 'عبادة بن الصامت',
    nickname: 'نقيب الأنصار',
    achievement: 'من نقباء بيعة العقبة الثانية',
    description: 'أحد نقباء بيعة العقبة الثانية الاثني عشر. علّم أهل الصُّفّة القرآن. أول من تولى القضاء في فلسطين. روى حديث "بايعنا النبي ﷺ على السمع والطاعة."',
    category: 'الأنصار',
  },
  {
    name: 'سعد بن عبادة',
    nickname: 'سيد الخزرج',
    achievement: 'أكرم الأنصار جوداً',
    description: 'سيد الخزرج وأشرف الأنصار. كان يُطعم الناس من كرمه. منافس أبي بكر في السقيفة دفاعاً عن حق الأنصار. من أبطال بدر وأحد والخندق.',
    category: 'الأنصار',
  },
  {
    name: 'البراء بن مالك',
    nickname: 'فارس المسلمين',
    achievement: 'بطل اليمامة',
    description: 'أخو أنس بن مالك. من أبطال المسلمين في حروب الردة وفتوح الشام. يوم اليمامة قال: يا معشر المسلمين ارموني على الترس وأدخلوني من وراء الحائط — ففعلوا فقاتل حتى فُتح.',
    category: 'الأنصار',
    hadith: 'قال ﷺ: "كم من أشعث أغبر ذي طمرين لو أقسم على الله لأبرّه منهم البراء"',
  },
  {
    name: 'محمد بن مسلمة',
    nickname: 'فارس النبي ﷺ',
    achievement: 'قائد السرايا الخاصة',
    description: 'كان النبي ﷺ يُرسله في السرايا الحساسة لثقته به. قتل كعب بن الأشرف الذي كان يؤذي المسلمين بشعره. اعتزل الفتنة الكبرى بأمر النبي ﷺ.',
    category: 'الأنصار',
  },

  // ── الصحابيات ──
  {
    name: 'فاطمة الزهراء',
    nickname: 'سيدة نساء العالمين',
    achievement: 'بضعة رسول الله ﷺ',
    description: 'أحبّ أبنائه ﷺ إليه. زوجة علي وأم الحسن والحسين. قالت أم المؤمنين عائشة: "ما رأيتُ أحداً أشبه برسول الله مشياً وهدياً من فاطمة." توفيت بعد أبيها بستة أشهر.',
    category: 'الصحابيات',
    hadith: 'قال ﷺ: "فاطمة بضعة مني فمن أغضبها أغضبني"',
  },
  {
    name: 'خديجة بنت خويلد',
    nickname: 'أم المؤمنين — أول من أسلمت',
    achievement: 'أول المؤمنين رجالاً ونساءً',
    description: 'أول من آمن بالنبي ﷺ. دعمته بمالها ونفسها في أصعب مراحل الدعوة. ولدت له أبناءه. لم يتزوج غيرها حتى وفاتها. بشّرها الله ببيت في الجنة من قصب.',
    category: 'الصحابيات',
    hadith: 'قال ﷺ: "ما أبدلني الله خيراً منها — آمنتْ بي إذ كفر الناس"',
  },
  {
    name: 'عائشة بنت أبي بكر',
    nickname: 'حبيبة النبي ﷺ — عالمة الإسلام',
    achievement: 'أكثر الصحابة رواية بعد الرجال',
    description: 'أحبّ نساء النبي ﷺ إليه. روت أكثر من ألفين وألف حديث. كان الصحابة يسألونها عما أشكل عليهم. قال فيها الذهبي: "هي عالمة هذه الأمة حقاً."',
    category: 'الصحابيات',
    hadith: 'قال ﷺ: "خذوا شطر دينكم عن هذه الحُميراء"',
  },
  {
    name: 'أسماء بنت أبي بكر',
    nickname: 'ذات النطاقين',
    achievement: 'صاحبة الهجرة',
    description: 'كانت تحمل الزاد للنبي ﷺ وأبيها في الغار ليلاً. شقّت نطاقها لتربط به أمتعة الهجرة فلُقّبت بذات النطاقين. عاشت مئة سنة ولم يسقط لها سن.',
    category: 'الصحابيات',
    hadith: 'قال لها ﷺ: "لا تُوكي فيُوكَى عليكِ"',
  },
  {
    name: 'سمية بنت خباط',
    nickname: 'أول شهيدة في الإسلام',
    achievement: 'أول من استُشهد في الإسلام',
    description: 'أمّ عمار بن ياسر. عُذِّبت في الرمضاء حتى طعنها أبو جهل بحربته. أول من سُفك دمه في الإسلام. مرّ بها النبي ﷺ وهي تُعذَّب فقال: "صبراً آل ياسر موعدكم الجنة."',
    category: 'الصحابيات',
    hadith: 'قال ﷺ: "صبراً آل ياسر فإن موعدكم الجنة"',
  },
  {
    name: 'أم سلمة هند المخزومية',
    nickname: 'أم المؤمنين الفقيهة',
    achievement: 'آخر أمهات المؤمنين وفاةً',
    description: 'هاجرت إلى الحبشة ثم المدينة. تزوّجها النبي ﷺ بعد وفاة أبي سلمة. كانت من أفقه أمهات المؤمنين وأكثرهن رواية. تُوفّيت آخر أمهات المؤمنين.',
    category: 'الصحابيات',
  },
  {
    name: 'أم عمارة نسيبة بنت كعب',
    nickname: 'بطلة أحد',
    achievement: 'حاربت دفاعاً عن النبي ﷺ',
    description: 'حملت السيف والترس في أحد ووقفت تدافع عن النبي ﷺ حين انكشف الصحابة. جُرحت اثنتي عشرة جرحة. قال لها النبي ﷺ: "ما التفتُّ يميناً ولا شمالاً إلا رأيتُكِ تقاتلين دوني."',
    category: 'الصحابيات',
  },
  {
    name: 'حفصة بنت عمر',
    nickname: 'أم المؤمنين — حافظة القرآن',
    achievement: 'أُودع عندها المصحف الأول',
    description: 'ابنة عمر بن الخطاب وزوج النبي ﷺ. أُودع عندها المصحف الذي جمعه أبو بكر أمانةً. كانت صوّامة قوّامة. روى عنها عدد من الصحابة.',
    category: 'الصحابيات',
  },
  {
    name: 'صفية بنت عبد المطلب',
    nickname: 'عمّة النبي ﷺ',
    achievement: 'بطلة حصار الخندق',
    description: 'عمّة النبي ﷺ وأخت حمزة. طعنت رجلاً من اليهود كان يتجسس على حصن النساء في الخندق بعمود فقتلته. قالت للنبي ﷺ: "ادعُ لي بالشهادة."',
    category: 'الصحابيات',
  },
  {
    name: 'أم الفضل لبابة',
    nickname: 'ثاني من أسلمن بعد خديجة',
    achievement: 'أخت ميمونة ووالدة ابن عباس',
    description: 'زوجة العباس بن عبد المطلب. من أوائل من أسلمن في مكة. والدة عبد الله بن عباس حبر الأمة. كانت تُعلّم ابنها القرآن والسنة منذ صغره.',
    category: 'الصحابيات',
  },

  // ── العلماء والقرّاء ──
  {
    name: 'عبد الله بن مسعود',
    nickname: 'أقرب الناس هدياً بالنبي ﷺ',
    achievement: 'مرجع الكوفة في الفقه والقرآن',
    description: 'أول من جهر بتلاوة القرآن في مكة أمام المشركين. من أعلم الصحابة بالقرآن وأقربهم هدياً. قال ﷺ: "من أراد أن يسمع القرآن غضاً كما أُنزل فليسمعه من ابن أم عبد."',
    category: 'العلماء والقرّاء',
    hadith: 'قال ﷺ: "استقرئوا القرآن من أربعة: من عبد الله بن مسعود..."',
  },
  {
    name: 'عبد الله بن عباس',
    nickname: 'حبر الأمة — البحر',
    achievement: 'أعلم الصحابة بالتفسير',
    description: 'ابن عم النبي ﷺ الذي دعا له بقوله: "اللهم فقّهه في الدين وعلّمه التأويل." كان له حلقة علمية يؤمّها الناس من كل مكان. سُمّي بالبحر لغزارة علمه.',
    category: 'العلماء والقرّاء',
    hadith: 'قال ﷺ: "اللهم فقّهه في الدين وعلّمه التأويل"',
  },
  {
    name: 'عبد الله بن عمر',
    nickname: 'من أكثر الصحابة اتباعاً للسنة',
    achievement: 'روى أكثر من ألفين وستمئة حديث',
    description: 'ابن عمر بن الخطاب. كان شديد الاتباع للسنة حتى كان يتتبع آثار أقدام النبي ﷺ. روى كثيراً من الأحاديث. كان يمشي على منهج بالغ الدقة في التحري.',
    category: 'العلماء والقرّاء',
  },
  {
    name: 'أبو هريرة',
    nickname: 'أكثر الصحابة رواية للحديث',
    achievement: 'روى أكثر من خمسة آلاف حديث',
    description: 'أسلم وصحب النبي ﷺ نحو أربع سنوات فروى أكثر من خمسة آلاف حديث. دعا له النبي ﷺ أن لا ينسى ما يُحدّثه فكان لا ينسى. كُنّي بصديقه هرٍّ صغير.',
    category: 'العلماء والقرّاء',
    hadith: 'قال ﷺ: "اللهم لا يُنسَ ما حدثتُه"',
  },
  {
    name: 'زيد بن ثابت',
    nickname: 'كاتب الوحي',
    achievement: 'جامع القرآن بأمر أبي بكر',
    description: 'كان يكتب الوحي للنبي ﷺ. أمره أبو بكر بجمع القرآن بعد وفاة الحفّاظ في اليمامة. تعلّم العبرانية في سبعة عشر يوماً بأمر النبي ﷺ. مرجع المدينة في الفرائض.',
    category: 'العلماء والقرّاء',
    hadith: 'قال ﷺ: "أفرضكم زيد بن ثابت"',
  },
  {
    name: 'أبو موسى الأشعري',
    nickname: 'صوت داود في هذه الأمة',
    achievement: 'أحد عمّال النبي ﷺ على اليمن',
    description: 'من القادمين من اليمن. بعثه النبي ﷺ مع معاذ إلى اليمن. كان حسن الصوت بالقرآن حتى قال له النبي ﷺ: "لقد أُوتيتَ مزماراً من مزامير آل داود."',
    category: 'العلماء والقرّاء',
    hadith: 'قال ﷺ: "لقد أُوتيتَ مزماراً من مزامير آل داود"',
  },

  // ── الفرسان والقادة ──
  {
    name: 'خالد بن الوليد',
    nickname: 'سيف الله المسلول',
    achievement: 'لم يُهزم في معركة واحدة طوال حياته',
    description: 'أعظم قائد عسكري في تاريخ الإسلام. أسلم بعد الحديبية. قاد فتوح الشام والعراق. خاض مئة وثمانين موقعة لم يُهزم في واحدة. قال عند موته: "وا أسفاه أن أموت على فراشي."',
    category: 'الفرسان والقادة',
    hadith: 'قال ﷺ: "خالد سيف من سيوف الله سلّه الله على المشركين"',
  },
  {
    name: 'عمرو بن العاص',
    nickname: 'فاتح مصر',
    achievement: 'فتح مصر بأربعة آلاف مقاتل',
    description: 'من أذكى الصحابة استراتيجياً. أسلم قبيل الفتح. قاد فتح مصر بأربعة آلاف مقاتل. قال فيه معاوية: "ما رأيتُ رجلاً أحسن رأياً في أمر الحرب من عمرو."',
    category: 'الفرسان والقادة',
  },
  {
    name: 'عبد الله بن رواحة',
    nickname: 'شاعر النبي ﷺ',
    achievement: 'أحد قادة مؤتة الثلاثة',
    description: 'شاعر النبي ﷺ كان ينشد شعره ضد المشركين. أحد قادة غزوة مؤتة الثلاثة. استُشهد في مؤتة وقال قبل الاستشهاد أبياتاً تفيض بالشوق للشهادة.',
    category: 'الفرسان والقادة',
  },
  {
    name: 'المقداد بن الأسود',
    nickname: 'أول فارس في الإسلام',
    achievement: 'أول من قاتل فارساً في الإسلام',
    description: 'أول فارس في الإسلام. يوم بدر قال للنبي ﷺ وهو يستشير: "لن نقول لك كما قالت بنو إسرائيل لموسى: اذهب أنت وربك فقاتلا، بل نقاتل عن يمينك وعن شمالك." فسُرّ النبي ﷺ.',
    category: 'الفرسان والقادة',
  },
  {
    name: 'عكرمة بن أبي جهل',
    nickname: 'ابن فرعون هذه الأمة',
    achievement: 'من أبطال فتوح الشام',
    description: 'ابن أبي جهل عدوّ الإسلام. أسلم يوم الفتح وأصبح من أشدّ المقاتلين دفاعاً عن الإسلام. استُشهد في معركة اليرموك. قال: "كنتُ أقاتل على الباطل فأقاتل اليوم على الحق."',
    category: 'الفرسان والقادة',
  },
  {
    name: 'عبد الله بن جحش',
    nickname: 'قائد أول سرية',
    achievement: 'قاد أول سرية في الإسلام',
    description: 'ابن عمة النبي ﷺ. أرسله النبي ﷺ على رأس أول سرية في الإسلام. دعا الله قبل أحد بالشهادة فاستُشهد فيها. دُفن هو وحمزة في قبر واحد.',
    category: 'الفرسان والقادة',
  },
];

const ALL_CATEGORIES = ['الكل', ...Object.keys(CATEGORY_COLORS)];

/* ─── Center Modal ─── */
const CompanionModal: React.FC<{ companion: Companion; onClose: () => void }> = ({ companion, onClose }) => {
  const color = CATEGORY_COLORS[companion.category] || '#C9A84C';
  return (
    <motion.div
      key="companion-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(3,8,19,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl"
        style={{
          background: 'rgba(8,14,30,0.97)',
          border: `1px solid ${color}30`,
          boxShadow: `0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px ${color}10, 0 0 60px ${color}08`,
        }}
        onClick={e => e.stopPropagation()}
        dir="rtl"
      >
        {/* Top accent bar */}
        <div className="h-1 rounded-t-3xl" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.82)' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.07)')}
        >
          <X size={14} />
        </button>

        <div className="p-6 pt-5">
          {/* Category badge */}
          <span
            className="font-kufi text-xs px-3 py-1 rounded-full inline-block mb-4"
            style={{ background: `${color}15`, border: `1px solid ${color}35`, color }}
          >
            {companion.category}
          </span>

          {/* Name */}
          <h2 className="font-noto font-bold mb-1" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#C9A84C' }}>
            {companion.name}
          </h2>
          <p className="font-kufi mb-5" style={{ fontSize: '0.8rem', color: `${color}` }}>
            {companion.nickname}
          </p>

          {/* Achievement */}
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 mb-5"
            style={{ background: `${color}0e`, border: `1px solid ${color}20` }}
          >
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
            <p className="font-kufi" style={{ fontSize: '0.82rem', color: `${color}` }}>
              {companion.achievement}
            </p>
          </div>

          {/* Description */}
          <p
            className="font-noto mb-5"
            style={{ fontSize: '0.92rem', lineHeight: 2, color: 'rgba(255,255,255,0.95)' }}
          >
            {companion.description}
          </p>

          {/* Hadith */}
          {companion.hadith && (
            <div
              className="rounded-2xl p-4"
              style={{ background: `${color}08`, border: `1px solid ${color}20` }}
            >
              <p className="font-noto italic" style={{ fontSize: '0.88rem', color: `${color}`, lineHeight: 1.95 }}>
                {companion.hadith}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const CompanionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(null);

  const filtered = useMemo(() => {
    return COMPANIONS.filter(c => {
      const matchCat = activeCategory === 'الكل' || c.category === activeCategory;
      const q = searchQuery.trim();
      const matchSearch = !q || c.name.includes(q) || c.nickname.includes(q) || c.description.includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: '#030813' }}>
      {/* زر المشاركة */}
      <div className="fixed top-[72px] left-4 z-[60]">
        <ShareButton title="الصحابة الكرام" accentColor="#C9A84C" />
      </div>

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${((i * 137.5) % 100).toFixed(1)}%`,
              top: `${((i * 97.3) % 100).toFixed(1)}%`,
              width: `${(0.5 + (i % 3) * 0.4).toFixed(1)}px`,
              height: `${(0.5 + (i % 3) * 0.4).toFixed(1)}px`,
              opacity: 0.35,
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
          <span className="text-islamic-gold/80">الصحابة الكرام</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-8 pt-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-noto font-bold mb-3"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', color: '#C9A84C', textShadow: '0 0 30px rgba(201,168,76,0.4)' }}
        >
          الصحابة الكرام
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-noto text-white/50 max-w-lg mx-auto"
          style={{ fontSize: '1rem', lineHeight: 1.9 }}
        >
          {COMPANIONS.length} صحابياً وصحابية من خيرة البشر
        </motion.p>

        {/* Verse */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-noto text-islamic-gold/55 mt-3"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
        >
          ﴿رَّضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ﴾ — التوبة: 100
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center gap-3 justify-center mt-5 opacity-30"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>
      </div>

      {/* Search + Filter */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-6 space-y-4">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-islamic-gold/40" />
          <input
            type="text"
            placeholder="ابحث عن صحابي..."
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

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {ALL_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            const color = cat === 'الكل' ? '#C9A84C' : CATEGORY_COLORS[cat];
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.95 }}
                className="font-kufi text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: isActive ? `${color}22` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? `${color}55` : 'rgba(255,255,255,0.08)'}`,
                  color: isActive ? color : 'rgba(255,255,255,0.45)',
                }}
              >
                {cat}
                {cat !== 'الكل' && (
                  <span className="mr-1.5 opacity-60">
                    ({COMPANIONS.filter(c => c.category === cat).length})
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
          يُعرض {filtered.length} صحابي — اضغط على أي بطاقة لعرض التفاصيل
        </span>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
        <AnimatePresence mode="popLayout">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((companion, index) => {
              const color = CATEGORY_COLORS[companion.category] || '#C9A84C';
              return (
                <motion.div
                  key={companion.name}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.5) }}
                  whileHover={{ y: -4, scale: 1.015 }}
                  className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid rgba(201,168,76,0.12)`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onClick={() => setSelectedCompanion(companion)}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${color}40`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${color}10`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.12)';
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
                  }}
                >
                  {/* Top accent line */}
                  <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }} />

                  <div className="p-5">
                    {/* Category badge */}
                    <span
                      className="font-kufi text-xs px-2.5 py-1 rounded-full inline-block mb-3"
                      style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
                    >
                      {companion.category}
                    </span>

                    {/* Name */}
                    <h3 className="font-noto font-bold mb-0.5" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#C9A84C' }}>
                      {companion.name}
                    </h3>
                    <p className="font-kufi mb-3" style={{ fontSize: '0.88rem', color: `${color}`, lineHeight: 1.5 }}>
                      {companion.nickname}
                    </p>

                    {/* Achievement */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
                      <p className="font-kufi" style={{ fontSize: '0.9rem', color: `${color}` }}>
                        {companion.achievement}
                      </p>
                    </div>

                    {/* Description (truncated) */}
                    <p
                      className="font-noto text-white/55 leading-relaxed"
                      style={{
                        fontSize: '0.85rem',
                        lineHeight: 1.85,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      } as React.CSSProperties}
                    >
                      {companion.description}
                    </p>

                    {/* Tap hint */}
                    <p className="font-kufi mt-3 text-center" style={{ fontSize: '0.85rem', color: `${color}` }}>
                      اضغط لعرض الكامل ›
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-noto text-white/30 text-lg">لا نتائج مطابقة للبحث</p>
          </div>
        )}
      </div>

      {/* Center Modal */}
      <AnimatePresence>
        {selectedCompanion && (
          <CompanionModal companion={selectedCompanion} onClose={() => setSelectedCompanion(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanionsPage;
