import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, Search, X, ChevronDown } from 'lucide-react';
import ShareButton from '../components/ShareButton';

interface Sariya {
  id: number;
  name: string;
  commander: string;
  yearH: string;
  yearM: string;
  troops?: string;
  result: 'انتصار' | 'شهادة' | 'بدون قتال' | 'مهمة خاصة';
  significance: string;
  details: string;
  note?: string;
  verse?: string;
  martyrs?: string;
}

const RESULT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'انتصار':      { bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.35)',  text: '#34D399' },
  'شهادة':       { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.35)', text: '#F87171' },
  'بدون قتال':   { bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.35)',  text: '#60A5FA' },
  'مهمة خاصة':  { bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.35)',  text: '#FBBF24' },
};

const SARAYA: Sariya[] = [
  {
    id: 1,
    name: 'سرية سيف البحر',
    commander: 'عبيدة بن الحارث',
    yearH: '1 هـ',
    yearM: '623م',
    troops: '60 - 80 مقاتلاً',
    result: 'بدون قتال',
    significance: 'أول سرية في الإسلام — مراقبة قريش على الساحل',
    details: 'أرسل النبي ﷺ عبيدة بن الحارث على رأس ستين إلى ثمانين مقاتلاً لمراقبة تحركات قريش على ساحل البحر. لم يحدث قتال، وعاد الجيش سالماً دون اشتباك مع العدو.',
    note: 'سعد بن أبي وقاص رمى في هذه السرية أول سهم في الإسلام',
  },
  {
    id: 2,
    name: 'سرية رابغ',
    commander: 'حمزة بن عبد المطلب',
    yearH: '1 هـ',
    yearM: '623م',
    troops: '30 راكباً',
    result: 'بدون قتال',
    significance: 'اعتراض قافلة أبي جهل التجارية',
    details: 'بعث النبي ﷺ عمه حمزة بن عبد المطلب بثلاثين راكباً لاعتراض قافلة أبي جهل القادمة من الشام. التقى الجمعان على الساحل وتوسط مجدي بن عمرو الجهني لمنع القتال، فانصرف كل فريق دون اشتباك.',
  },
  {
    id: 3,
    name: 'سرية الخرار',
    commander: 'سعد بن أبي وقاص',
    yearH: '1 هـ',
    yearM: '623م',
    troops: '8 رجال',
    result: 'بدون قتال',
    significance: 'أول سرية بقيادة سعد بن أبي وقاص',
    details: 'أرسل النبي ﷺ سعد بن أبي وقاص على رأس ثمانية رجال لاعتراض قافلة لقريش في منطقة الخرار. وصل المسلمون إلى المكان لكنهم لم يجدوا أحداً، إذ كانت القافلة قد مرت قبل وصولهم بيوم.',
    note: 'أول سرية يقودها سعد بن أبي وقاص رضي الله عنه',
  },
  {
    id: 4,
    name: 'سرية نخلة',
    commander: 'عبد الله بن جحش',
    yearH: '2 هـ',
    yearM: '624م',
    troops: '12 رجلاً',
    result: 'انتصار',
    significance: 'أول دم وأول أسير وأول غنيمة في الإسلام',
    details: 'وجّه النبي ﷺ عبد الله بن جحش بكتاب مختوم أمره بفتحه بعد يومين من السير. فلما فتحه وجد أمراً بالتوجه إلى نخلة بين مكة والطائف لمراقبة قريش. التقوا بقافلة لقريش في آخر يوم من رجب ففاجأتهم الظروف، وكانت أول مواجهة مسلحة تسفر عن قتيل وأسير وغنيمة.',
    note: 'أول قتال في الإسلام خلال الأشهر الحرم — أثار جدلاً واسعاً',
    verse: '﴿يَسْأَلُونَكَ عَنِ الشَّهْرِ الْحَرَامِ قِتَالٍ فِيهِ﴾ — البقرة: 217',
  },
  {
    id: 5,
    name: 'سرية الرجيع',
    commander: 'مرثد بن أبي مرثد الغنوي',
    yearH: '4 هـ',
    yearM: '625م',
    troops: '10 رجال',
    result: 'شهادة',
    significance: 'غدر ونكث عهد — استُشهد معظمهم وأُسر اثنان',
    details: 'طلبت قبيلة هذيل من النبي ﷺ أن يبعث معهم رجالاً يعلمونهم القرآن والسنة. فبعث ﷺ عشرة رجال من أصحابه، فلما وصلوا إلى الرجيع أحاطت بهم قبيلة بني لحيان وطلبوا استسلامهم. استبسل الصحابة لكنهم قُتلوا جميعاً إلا عاصم بن ثابت الذي قاتل حتى الشهادة، وأُسر خبيب بن عدي وزيد بن الدثنة فبيعا في مكة وصُلبا.',
    martyrs: 'خبيب بن عدي (صُلب في مكة)، زيد بن الدثنة، وغيرهم',
    note: 'مكيدة من بني لحيان — طلبوا معلمين للقرآن ثم غدروا بهم',
  },
  {
    id: 6,
    name: 'سرية بئر معونة',
    commander: 'المنذر بن عمرو',
    yearH: '4 هـ',
    yearM: '625م',
    troops: '70 من حفّاظ القرآن',
    result: 'شهادة',
    significance: 'مقتل سبعين حافظاً للقرآن في غدر مروّع',
    details: 'طلب عامر بن الطفيل — وهو سيد قبيلتي بني عامر وسليم — من النبي ﷺ أن يبعث رجالاً يدعون إلى الإسلام. فبعث ﷺ سبعين من خيار أصحابه وحفّاظ القرآن. لما وصلوا إلى بئر معونة أحاطت بهم القبائل المتحالفة مع عامر بن الطفيل وقاتلوهم حتى استُشهدوا جميعاً — ما عدا كعب بن زيد الذي نجا جريحاً.',
    martyrs: 'سبعون من حفّاظ القرآن استُشهدوا جميعاً',
    note: 'قنت النبي ﷺ شهراً كاملاً في الصلوات يدعو على القاتلين',
  },
  {
    id: 7,
    name: 'سرية عبد الله بن عتيك',
    commander: 'عبد الله بن عتيك',
    yearH: '5 هـ',
    yearM: '626م',
    result: 'مهمة خاصة',
    significance: 'تصفية أبي رافع اليهودي الذي يؤلّب على المسلمين',
    details: 'كان أبو رافع سلام بن أبي الحقيق اليهودي من المخيريق وأشد الناس تحريضاً للمشركين على قتال المسلمين وجمعاً للأحلاف ضدهم. أرسل النبي ﷺ عبد الله بن عتيك وعدة رجال من الأنصار في مهمة سرية إلى حصنه في خيبر. نفّذوا المهمة بنجاح وعادوا سالمين.',
  },
  {
    id: 8,
    name: 'سرية محمد بن مسلمة لكعب بن الأشرف',
    commander: 'محمد بن مسلمة',
    yearH: '3 هـ',
    yearM: '625م',
    result: 'مهمة خاصة',
    significance: 'تصفية كعب بن الأشرف الذي يهجو النبي ﷺ ويحرّض المشركين',
    details: 'كان كعب بن الأشرف اليهودي يؤلف الشعر يهجو فيه النبي ﷺ وصحابته ويذهب إلى مكة يحرّض قريشاً على المسلمين بعد موقعة بدر. استأذن محمد بن مسلمة النبيَّ ﷺ في قتله، فأذن له. توجه مع عدة رجال وأوهموا كعباً بحاجتهم إليه، فخرج معهم وقضوا عليه.',
  },
  {
    id: 9,
    name: 'سرية زيد بن حارثة إلى القردة',
    commander: 'زيد بن حارثة',
    yearH: '3 هـ',
    yearM: '624م',
    result: 'انتصار',
    significance: 'اعتراض قافلة قريش التجارية وتحقيق غنيمة كبيرة',
    details: 'علم النبي ﷺ بقافلة تجارية لقريش تسير عبر طريق العراق بدلاً من الطريق المعتاد هروباً من المسلمين. أرسل ﷺ زيد بن حارثة لاعتراضها فأدركها عند القردة وغنم ما فيها. فرّ أصحاب القافلة إلا مرشدهم فياض النضري الذي أُسر ثم أسلم.',
    note: 'غنيمة كبيرة وفرار القافلة وأسر مرشدها',
  },
  {
    id: 10,
    name: 'سرية زيد بن حارثة إلى الحسمى',
    commander: 'زيد بن حارثة',
    yearH: '6 هـ',
    yearM: '628م',
    result: 'انتصار',
    significance: 'رد عدوان بني فزارة على المسلمين',
    details: 'أغارت بني فزارة على المسلمين وقتلوا بعضهم وجرحوا أمّ قرفة. أرسل النبي ﷺ زيد بن حارثة لمعاقبتهم. توجّه زيد إلى الحسمى وهزم القبيلة وعاد بالغنائم والأسرى.',
  },
  {
    id: 11,
    name: 'سرية زيد بن حارثة إلى وادي القرى',
    commander: 'زيد بن حارثة',
    yearH: '6 هـ',
    yearM: '628م',
    result: 'شهادة',
    significance: 'معركة شديدة مع فزارة في وادي القرى',
    details: 'أوفد النبي ﷺ زيد بن حارثة في سرية إلى وادي القرى فكمنت لهم بنو فزارة. دارت معركة شديدة استُشهد فيها عدد من المسلمين وجُرح زيد بن حارثة، فعاد المسلمون بعد خسائر فادحة.',
    martyrs: 'عدد من المسلمين استُشهدوا في الكمين',
  },
  {
    id: 12,
    name: 'سرية عكاشة بن محصن إلى الغمر',
    commander: 'عكاشة بن محصن',
    yearH: '6 هـ',
    yearM: '627م',
    troops: '40 رجلاً',
    result: 'بدون قتال',
    significance: 'انسحاب العدو وتحقيق غنيمة دون اشتباك',
    details: 'أرسل النبي ﷺ عكاشة بن محصن بأربعين رجلاً إلى الغمر حيث حشود بني أسد. سمعت القبيلة بقدوم المسلمين فأخلت المنطقة وفرّت بأسرها. وجد المسلمون مواشي كثيرة تركوها فساقوها غنيمة وعادوا.',
    note: 'فرار العدو قبل الاشتباك وغنيمة وفيرة',
  },
  {
    id: 13,
    name: 'سرية أبي عبيدة بن الجراح إلى ذي القصة',
    commander: 'أبو عبيدة بن الجراح',
    yearH: '7 هـ',
    yearM: '628م',
    troops: '40 رجلاً',
    result: 'انتصار',
    significance: 'صمود المسلمين رغم الإصابات والمقاومة الشديدة',
    details: 'وجّه النبي ﷺ أبا عبيدة بن الجراح بأربعين رجلاً إلى ذي القصة لمواجهة بعض القبائل المعادية. رغم المقاومة الشديدة وإصابة عدد من المسلمين صمد الجيش وأتم مهمته وعاد.',
  },
  {
    id: 14,
    name: 'سرية عبد الله بن رواحة إلى خيبر',
    commander: 'عبد الله بن رواحة',
    yearH: '7 هـ',
    yearM: '628م',
    result: 'مهمة خاصة',
    significance: 'تصفية أسير بن رزام اليهودي الذي يجمع الأحلاف ضد المسلمين',
    details: 'كان أسير بن رزام اليهودي يسعى بين القبائل ليجمعها على قتال المسلمين في خيبر بعد جلاء بني النضير. أرسل النبي ﷺ عبد الله بن رواحة مع جماعة من الصحابة في مهمة سرية. استدرجوا أسير بن رزام وأوهموه بمفاوضات ثم قضوا عليه وعادوا سالمين.',
  },
  {
    id: 15,
    name: 'سرية مؤتة',
    commander: 'زيد بن حارثة (ثم جعفر، ثم ابن رواحة، ثم خالد)',
    yearH: '8 هـ',
    yearM: '629م',
    troops: '3000 مسلم',
    result: 'شهادة',
    significance: 'أعظم سرية في الإسلام — أول مواجهة مباشرة مع الروم',
    details: 'أوفد النبي ﷺ جيشاً من ثلاثة آلاف مقاتل لمواجهة جيش بيزنطي يُقدَّر بمئتي ألف محارب. أمّر عليهم زيد بن حارثة، فإن قُتل فجعفر بن أبي طالب، فإن قُتل فعبد الله بن رواحة. استُشهد الأمراء الثلاثة واحداً تلو الآخر. أخذ الراية خالد بن الوليد بعد إذن الصحابة فأدار المعركة بدهاء عسكري فائق وانسحب بالجيش سالماً. أخبر النبي ﷺ الصحابة بالنبأ قبل وصول الجيش من خيبر.',
    martyrs: 'زيد بن حارثة، جعفر بن أبي طالب (ذو الجناحين — قُطعت يداه)، عبد الله بن رواحة',
    note: 'خالد بن الوليد لُقِّب بسيف الله المسلول بعد هذه المعركة',
  },
  {
    id: 16,
    name: 'سرية ذات السلاسل',
    commander: 'عمرو بن العاص',
    yearH: '8 هـ',
    yearM: '629م',
    troops: '300 - 500 ثم أُضيف 200 مهاجر بقيادة أبي عبيدة',
    result: 'بدون قتال',
    significance: 'انسحاب قبائل قضاعة دون اشتباك بعد وصول التعزيزات',
    details: 'أرسل النبي ﷺ عمرو بن العاص — لأن أمه من قبيلة قضاعة — في سرية إلى أرض قضاعة قرب الشام لاستمالتها. لما رأى كثرة العدو طلب مدداً فأرسل النبي ﷺ أبا عبيدة بن الجراح بمئتي مهاجر. اختلف الأميران في القيادة فأتم كل منهما صلاحياته، وانسحبت القبائل دون قتال كبير.',
  },
  {
    id: 17,
    name: 'سرية الخبط',
    commander: 'أبو عبيدة بن الجراح',
    yearH: '8 هـ',
    yearM: '629م',
    troops: '300 رجل',
    result: 'انتصار',
    significance: 'قصة الحوت العجيبة — أكل منه الجيش شهراً كاملاً',
    details: 'أرسل النبي ﷺ أبا عبيدة بن الجراح بثلاثمائة رجل إلى سواحل الجحفة. نفد الزاد وأصابهم جوع شديد حتى أكلوا أوراق الشجر (الخبط) فسُمّيت السرية بذلك. ألقى البحر على الساحل حوتاً عظيماً يُسمى العنبر، فأكل منه الجيش كله ثمانية عشر يوماً وادّخروا منه. لما عادوا وأخبر أبو عبيدة النبيَّ ﷺ قال: "هو رزق أخرجه الله لكم."',
    note: 'وجدوا حوتاً عظيماً على الشاطئ أكلوا منه وادخروا — بركة من الله',
  },
  {
    id: 18,
    name: 'سرية أسامة بن زيد',
    commander: 'أسامة بن زيد',
    yearH: '11 هـ',
    yearM: '632م',
    result: 'انتصار',
    significance: 'آخر سرية أُعِدَّت بأمر النبي ﷺ قبيل وفاته',
    details: 'أمّر النبي ﷺ أسامة بن زيد — وهو في التاسعة عشرة من عمره — على جيش لغزو أرض البلقاء في الشام انتقاماً لمقتل أبيه زيد في مؤتة. طعن بعض الصحابة في إمارته لصغر سنه، فخطب النبي ﷺ ودافع عنه. أُخّرت السرية بسبب مرض النبي ﷺ حتى توفي. أمر أبو بكر الصديق بإنفاذها تنفيذاً لوصية النبي ﷺ، فانطلقت وعادت منتصرة.',
    note: 'أتمّها أبو بكر الصديق تنفيذاً لوصية النبي ﷺ — انتصار وعودة سالمة',
  },
  /* ── السرايا الإضافية ── */
  {
    id: 19,
    name: 'سرية طلحة بن عبيد الله',
    commander: 'طلحة بن عبيد الله',
    yearH: '1 هـ',
    yearM: '623م',
    result: 'بدون قتال',
    significance: 'من أوائل السرايا — تحسس أخبار قريش نحو العراق',
    details: 'أرسل النبي ﷺ طلحة بن عبيد الله ونفراً من الصحابة للتجسس على أخبار قريش في الطريق الشمالي نحو العراق. عادوا بمعلومات قيّمة دون اشتباك مسلح.',
  },
  {
    id: 20,
    name: 'سرية خالد بن الوليد إلى بني جذيمة',
    commander: 'خالد بن الوليد',
    yearH: '8 هـ',
    yearM: '630م',
    troops: '350 مقاتلاً',
    result: 'مهمة خاصة',
    significance: 'حادثة خلافية — تجاوز القائد حدود المهمة',
    details: 'بعث النبي ﷺ خالد بن الوليد داعياً لا مقاتلاً بعد فتح مكة. استسلمت بنو جذيمة لكنهم لم يجيدوا التعبير عن إسلامهم فقالوا "صبأنا" بدل "أسلمنا." أساء خالد تأويلها وأمر بقتل بعضهم. بلغ الخبر النبيَّ ﷺ فرفع يديه وقال: "اللهم إني أبرأ إليك مما صنع خالد!" وأرسل علياً لدية القتلى وتعويض الأذى.',
    note: 'النبي ﷺ تبرّأ من التجاوز وأرسل علياً لإصلاح الخطأ',
    verse: '﴿وَلَا تَقُولُوا لِمَنْ أَلْقَىٰ إِلَيْكُمُ السَّلَامَ لَسْتَ مُؤْمِنًا﴾ — النساء: ٩٤',
  },
  {
    id: 21,
    name: 'سرية علي بن أبي طالب إلى اليمن',
    commander: 'علي بن أبي طالب',
    yearH: '10 هـ',
    yearM: '631م',
    result: 'انتصار',
    significance: 'إسلام قبيلة همدان كلها في يوم واحد',
    details: 'أرسل النبي ﷺ علياً إلى اليمن للدعوة وجمع الزكاة. قرأ كتاب النبي ﷺ على قبيلة همدان فأسلمت بأكملها في يوم واحد. كتب علي إلى النبي ﷺ يخبره بذلك فسجد شكراً لله وقال: "السلام على همدان." ثم عادت بقية قبائل اليمن تتسابق إلى الإسلام.',
    note: 'إسلام همدان جميعاً في يوم واحد — فرح النبي ﷺ وسجد شكراً',
  },
  {
    id: 22,
    name: 'سرية جرير بن عبد الله البجلي إلى ذي الخلصة',
    commander: 'جرير بن عبد الله البجلي',
    yearH: '10 هـ',
    yearM: '631م',
    troops: '150 فارساً',
    result: 'انتصار',
    significance: 'هدم كعبة اليمامة وتطهير الجزيرة من آخر الأصنام الكبرى',
    details: 'كان ذو الخلصة صنماً عظيماً تعبده خثعم وبجيلة وسُمّي "كعبة اليمامة" أو "الكعبة الشامية" لعظمته. أرسل النبي ﷺ جرير بن عبد الله البجلي بمئة وخمسين فارساً فأحرق هذا الصنم وهدم مكانه. قال جرير مازحاً: "والله ما زلت منذ أسلمت حتى هدّ الله هذا الصنم ثلاثاً وثلاثين ضربة بالسيف."',
  },
  {
    id: 23,
    name: 'سرية أبي موسى الأشعري إلى اليمن',
    commander: 'أبو موسى الأشعري',
    yearH: '9 هـ',
    yearM: '630م',
    result: 'مهمة خاصة',
    significance: 'تعليم الإسلام وجمع الزكاة وإرساء الحكم الإسلامي في اليمن',
    details: 'عيّن النبي ﷺ أبا موسى الأشعري والياً ومعلماً لمنطقة زبيد وعدن في اليمن. اشتُهر بحسن معاملته للناس وتعليمهم الصلاة والقرآن. مكث سنوات ينشر الإسلام ويجمع الصدقات ويفض النزاعات حتى استقرت البلاد.',
    note: 'أرسل النبي ﷺ معاذ بن جبل إلى صنعاء وأبا موسى إلى زبيد — إسلام اليمن',
  },
  {
    id: 24,
    name: 'سرية قطبة بن عامر الأنصاري',
    commander: 'قطبة بن عامر الأنصاري',
    yearH: '9 هـ',
    yearM: '630م',
    troops: '20 رجلاً',
    result: 'انتصار',
    significance: 'مداهمة بني خثعم في تبالة وردع غاراتهم على المسلمين',
    details: 'كانت بنو خثعم تغير على المسلمين وتؤوي الفارين. أرسل النبي ﷺ قطبة بن عامر في عشرين رجلاً ليلاً إلى تبالة. أغار على الحي وغنم الإبل والغنم وأسر عدداً منهم. بعضهم قُتل وبعضهم هرب. عاد بالغنائم والأسرى إلى المدينة.',
  },
];

const SariyaCard: React.FC<{ sariya: Sariya; index: number }> = ({ sariya, index }) => {
  const [expanded, setExpanded] = useState(false);
  const resultStyle = RESULT_COLORS[sariya.result];

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
                {sariya.result}
              </span>
              <span className="font-kufi text-xs text-white/35">{sariya.yearH} / {sariya.yearM}</span>
            </div>
            <h3 className="font-noto font-bold" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)', color: '#C9A84C' }}>
              {sariya.name}
            </h3>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: 'rgba(201,168,76,0.45)', flexShrink: 0, marginTop: 4 }}
          >
            <ChevronDown size={16} />
          </motion.span>
        </div>

        {/* Commander & Troops */}
        <div
          className="rounded-xl p-3 mb-3"
          style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}
        >
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <div>
              <p className="font-kufi text-xs text-white/35 mb-0.5">القائد</p>
              <p className="font-noto text-sm text-white/80">{sariya.commander}</p>
            </div>
            {sariya.troops && (
              <div>
                <p className="font-kufi text-xs text-white/35 mb-0.5">العدد</p>
                <p className="font-noto text-sm" style={{ color: '#34D399' }}>{sariya.troops}</p>
              </div>
            )}
          </div>
        </div>

        {/* Significance */}
        <p className="font-kufi mb-4" style={{ fontSize: '0.82rem', color: 'rgba(201,168,76,0.7)', lineHeight: 1.65 }}>
          {sariya.significance}
        </p>

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
                  {sariya.details}
                </p>

                {sariya.martyrs && (
                  <div
                    className="rounded-xl px-4 py-2.5 flex items-start gap-2"
                    style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#F87171' }} />
                    <div>
                      <p className="font-kufi text-xs mb-0.5" style={{ color: '#F87171' }}>الشهداء</p>
                      <p className="font-noto text-white/60" style={{ fontSize: '0.83rem', lineHeight: 1.75 }}>
                        {sariya.martyrs}
                      </p>
                    </div>
                  </div>
                )}

                {sariya.note && (
                  <div
                    className="rounded-xl px-4 py-2.5 flex items-start gap-2"
                    style={{ background: 'rgba(96,165,250,0.07)', border: '1px solid rgba(96,165,250,0.2)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#60A5FA' }} />
                    <div>
                      <p className="font-kufi text-xs mb-0.5" style={{ color: '#60A5FA' }}>ملاحظة</p>
                      <p className="font-noto text-white/60" style={{ fontSize: '0.83rem', lineHeight: 1.75 }}>
                        {sariya.note}
                      </p>
                    </div>
                  </div>
                )}

                {sariya.verse && (
                  <div
                    className="rounded-xl px-4 py-3"
                    style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}
                  >
                    <p className="font-kufi text-xs mb-1.5" style={{ color: 'rgba(201,168,76,0.6)' }}>الآية الكريمة</p>
                    <p className="font-noto italic" style={{ fontSize: '0.88rem', color: 'rgba(201,168,76,0.9)', lineHeight: 1.95 }}>
                      {sariya.verse}
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

const SarayaPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState<string>('الكل');

  const filtered = useMemo(() => {
    return SARAYA.filter(s => {
      const matchResult = resultFilter === 'الكل' || s.result === resultFilter;
      const q = searchQuery.trim();
      const matchSearch = !q || s.name.includes(q) || s.commander.includes(q) || s.significance.includes(q);
      return matchResult && matchSearch;
    });
  }, [searchQuery, resultFilter]);

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share button */}
      <div className="fixed top-[72px] left-4 z-[60]">
        <ShareButton title="السرايا العسكرية" accentColor="#C9A84C" />
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
          <span className="text-islamic-gold/80">السرايا</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-8 pt-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-noto font-bold mb-3"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)', color: '#C9A84C', textShadow: '0 0 30px rgba(201,168,76,0.4)' }}
        >
          السرايا العسكرية
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-noto text-islamic-gold/55 mt-2"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
        >
          ﴿وَأَعِدُّوا لَهُمْ مَا اسْتَطَعْتُمْ مِن قُوَّةٍ﴾ — الأنفال: ٦٠
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
            { label: 'عدد السرايا الإجمالي', value: '~60' },
            { label: 'المعروضة هنا', value: String(SARAYA.length) },
            { label: 'أول سرية', value: '1 هـ' },
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
            placeholder="ابحث عن سرية..."
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
          {(['الكل', 'انتصار', 'شهادة', 'بدون قتال', 'مهمة خاصة'] as const).map(r => {
            const isActive = resultFilter === r;
            const style = r === 'الكل'
              ? { color: '#C9A84C', bg: 'rgba(201,168,76,0.18)', border: 'rgba(201,168,76,0.4)' }
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
                  color: isActive ? style.color : 'rgba(255,255,255,0.45)',
                }}
              >
                {r}
                {r !== 'الكل' && (
                  <span className="mr-1.5 opacity-60">
                    ({SARAYA.filter(s => s.result === r).length})
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
          يُعرض {filtered.length} سرية — انقر على البطاقة لعرض التفاصيل
        </span>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((sariya, index) => (
            <SariyaCard key={sariya.id} sariya={sariya} index={index} />
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

export default SarayaPage;
