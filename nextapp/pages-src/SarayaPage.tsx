'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, Search, X, ChevronDown } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface Sariya {
  id: number;
  name: string; nameEn: string;
  commander: string;
  yearH: string;
  yearM: string;
  troops?: string;
  result: 'انتصار' | 'شهادة' | 'بدون قتال' | 'مهمة خاصة';
  significance: string; significanceEn: string;
  details: string; detailsEn: string;
  note?: string; noteEn?: string;
  verse?: string;
  martyrs?: string; martyrsEn?: string;
}

const RESULT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'انتصار':      { bg: 'rgba(52,211,153,0.12)',  border: 'rgba(52,211,153,0.35)',  text: '#34D399' },
  'شهادة':       { bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.35)', text: '#F87171' },
  'بدون قتال':   { bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.35)',  text: '#60A5FA' },
  'مهمة خاصة':  { bg: 'rgba(251,191,36,0.12)',  border: 'rgba(251,191,36,0.35)',  text: '#FBBF24' },
};

const RESULT_LABELS_EN: Record<string, string> = {
  'انتصار':    'Victory',
  'شهادة':     'Martyrdom',
  'بدون قتال': 'No Battle',
  'مهمة خاصة':'Special Mission',
};

const SARAYA: Sariya[] = [
  {
    id: 1,
    name: 'سرية سيف البحر',
    nameEn: 'Expedition of Sayf al-Bahr',
    commander: 'عبيدة بن الحارث',
    yearH: '1 هـ',
    yearM: '623م',
    troops: '60 - 80 مقاتلاً',
    result: 'بدون قتال',
    significance: 'أول سرية في الإسلام — مراقبة قريش على الساحل',
    significanceEn: 'First expedition in Islam — monitoring Quraysh on the coast',
    details: 'أرسل النبي ﷺ عبيدة بن الحارث على رأس ستين إلى ثمانين مقاتلاً لمراقبة تحركات قريش على ساحل البحر. لم يحدث قتال، وعاد الجيش سالماً دون اشتباك مع العدو.',
    detailsEn: 'The Prophet ﷺ sent Ubaydah ibn al-Harith with sixty to eighty fighters to monitor Quraysh movements on the seacoast. No fighting took place, and the army returned safely without engaging the enemy.',
    note: 'سعد بن أبي وقاص رمى في هذه السرية أول سهم في الإسلام',
    noteEn: "Sa'd ibn Abi Waqqas shot the first arrow in Islam during this expedition",
  },
  {
    id: 2,
    name: 'سرية رابغ',
    nameEn: 'Expedition of Rabigh',
    commander: 'حمزة بن عبد المطلب',
    yearH: '1 هـ',
    yearM: '623م',
    troops: '30 راكباً',
    result: 'بدون قتال',
    significance: 'اعتراض قافلة أبي جهل التجارية',
    significanceEn: "Intercepting Abu Jahl's trade caravan",
    details: 'بعث النبي ﷺ عمه حمزة بن عبد المطلب بثلاثين راكباً لاعتراض قافلة أبي جهل القادمة من الشام. التقى الجمعان على الساحل وتوسط مجدي بن عمرو الجهني لمنع القتال، فانصرف كل فريق دون اشتباك.',
    detailsEn: "The Prophet ﷺ sent his uncle Hamzah ibn Abd al-Muttalib with thirty riders to intercept Abu Jahl's caravan returning from Syria. The two groups met on the coast, and Majdi ibn Amr al-Juhani mediated to prevent fighting, so each party departed without conflict.",
  },
  {
    id: 3,
    name: 'سرية الخرار',
    nameEn: 'Expedition of al-Kharrar',
    commander: 'سعد بن أبي وقاص',
    yearH: '1 هـ',
    yearM: '623م',
    troops: '8 رجال',
    result: 'بدون قتال',
    significance: 'أول سرية بقيادة سعد بن أبي وقاص',
    significanceEn: "First expedition led by Sa'd ibn Abi Waqqas",
    details: 'أرسل النبي ﷺ سعد بن أبي وقاص على رأس ثمانية رجال لاعتراض قافلة لقريش في منطقة الخرار. وصل المسلمون إلى المكان لكنهم لم يجدوا أحداً، إذ كانت القافلة قد مرت قبل وصولهم بيوم.',
    detailsEn: 'The Prophet ﷺ sent Sa\'d ibn Abi Waqqas with eight men to intercept a Quraysh caravan in the al-Kharrar area. The Muslims reached the location but found no one, as the caravan had passed the day before.',
    note: 'أول سرية يقودها سعد بن أبي وقاص رضي الله عنه',
    noteEn: "First expedition led by Sa'd ibn Abi Waqqas, may Allah be pleased with him",
  },
  {
    id: 4,
    name: 'سرية نخلة',
    nameEn: 'Expedition of Nakhlah',
    commander: 'عبد الله بن جحش',
    yearH: '2 هـ',
    yearM: '624م',
    troops: '12 رجلاً',
    result: 'انتصار',
    significance: 'أول دم وأول أسير وأول غنيمة في الإسلام',
    significanceEn: 'First blood, first captive, and first spoils in Islam',
    details: 'وجّه النبي ﷺ عبد الله بن جحش بكتاب مختوم أمره بفتحه بعد يومين من السير. فلما فتحه وجد أمراً بالتوجه إلى نخلة بين مكة والطائف لمراقبة قريش. التقوا بقافلة لقريش في آخر يوم من رجب ففاجأتهم الظروف، وكانت أول مواجهة مسلحة تسفر عن قتيل وأسير وغنيمة.',
    detailsEn: "The Prophet ﷺ sent Abdullah ibn Jahsh with a sealed letter, instructing him to open it after two days of travel. Inside he found orders to proceed to Nakhlah, between Mecca and Ta'if, to observe Quraysh. They encountered a Quraysh caravan on the last day of Rajab under ambiguous circumstances — it was the first armed confrontation resulting in a casualty, a captive, and spoils.",
    note: 'أول قتال في الإسلام خلال الأشهر الحرم — أثار جدلاً واسعاً',
    noteEn: 'First combat in Islam during the sacred months — sparked wide debate',
    verse: '﴿يَسْأَلُونَكَ عَنِ الشَّهْرِ الْحَرَامِ قِتَالٍ فِيهِ﴾ — البقرة: 217',
  },
  {
    id: 5,
    name: 'سرية الرجيع',
    nameEn: "Expedition of al-Raji'",
    commander: 'مرثد بن أبي مرثد الغنوي',
    yearH: '4 هـ',
    yearM: '625م',
    troops: '10 رجال',
    result: 'شهادة',
    significance: 'غدر ونكث عهد — استُشهد معظمهم وأُسر اثنان',
    significanceEn: 'Betrayal and treachery — most were martyred, two were captured',
    details: 'طلبت قبيلة هذيل من النبي ﷺ أن يبعث معهم رجالاً يعلمونهم القرآن والسنة. فبعث ﷺ عشرة رجال من أصحابه، فلما وصلوا إلى الرجيع أحاطت بهم قبيلة بني لحيان وطلبوا استسلامهم. استبسل الصحابة لكنهم قُتلوا جميعاً إلا عاصم بن ثابت الذي قاتل حتى الشهادة، وأُسر خبيب بن عدي وزيد بن الدثنة فبيعا في مكة وصُلبا.',
    detailsEn: "The Hudhayl tribe asked the Prophet ﷺ to send men to teach them the Quran and Sunnah. He sent ten companions, but when they reached al-Raji', the Banu Lihyan tribe surrounded them and demanded their surrender. The companions fought valiantly but were killed. Asim ibn Thabit fought until martyrdom; Khubayb ibn Adi and Zayd ibn al-Dithna were captured, sold in Mecca, and crucified.",
    martyrs: 'خبيب بن عدي (صُلب في مكة)، زيد بن الدثنة، وغيرهم',
    martyrsEn: 'Khubayb ibn Adi (crucified in Mecca), Zayd ibn al-Dithna, and others',
    note: 'مكيدة من بني لحيان — طلبوا معلمين للقرآن ثم غدروا بهم',
    noteEn: 'A trap by Banu Lihyan — they requested Quran teachers then betrayed them',
  },
  {
    id: 6,
    name: 'سرية بئر معونة',
    nameEn: "Expedition of Bi'r Ma'unah",
    commander: 'المنذر بن عمرو',
    yearH: '4 هـ',
    yearM: '625م',
    troops: '70 من حفّاظ القرآن',
    result: 'شهادة',
    significance: 'مقتل سبعين حافظاً للقرآن في غدر مروّع',
    significanceEn: 'Seventy Quran memorizers slaughtered in a horrific act of treachery',
    details: 'طلب عامر بن الطفيل — وهو سيد قبيلتي بني عامر وسليم — من النبي ﷺ أن يبعث رجالاً يدعون إلى الإسلام. فبعث ﷺ سبعين من خيار أصحابه وحفّاظ القرآن. لما وصلوا إلى بئر معونة أحاطت بهم القبائل المتحالفة مع عامر بن الطفيل وقاتلوهم حتى استُشهدوا جميعاً — ما عدا كعب بن زيد الذي نجا جريحاً.',
    detailsEn: "Amir ibn al-Tufayl — chieftain of Banu Amir and Sulaym — asked the Prophet ﷺ to send men to call people to Islam. He sent seventy of his finest companions and Quran memorizers. Upon reaching Bi'r Ma'unah, allied tribes surrounded them at the instigation of Amir ibn al-Tufayl and fought them until all were martyred — except Ka'b ibn Zayd who survived wounded.",
    martyrs: 'سبعون من حفّاظ القرآن استُشهدوا جميعاً',
    martyrsEn: 'Seventy Quran memorizers were all martyred',
    note: 'قنت النبي ﷺ شهراً كاملاً في الصلوات يدعو على القاتلين',
    noteEn: 'The Prophet ﷺ performed Qunut prayers for a full month cursing the perpetrators',
  },
  {
    id: 7,
    name: 'سرية عبد الله بن عتيك',
    nameEn: 'Expedition of Abdullah ibn Atik',
    commander: 'عبد الله بن عتيك',
    yearH: '5 هـ',
    yearM: '626م',
    result: 'مهمة خاصة',
    significance: 'تصفية أبي رافع اليهودي الذي يؤلّب على المسلمين',
    significanceEn: "Eliminating Abu Rafi' the Jew who was inciting enemies against Muslims",
    details: 'كان أبو رافع سلام بن أبي الحقيق اليهودي من المخيريق وأشد الناس تحريضاً للمشركين على قتال المسلمين وجمعاً للأحلاف ضدهم. أرسل النبي ﷺ عبد الله بن عتيك وعدة رجال من الأنصار في مهمة سرية إلى حصنه في خيبر. نفّذوا المهمة بنجاح وعادوا سالمين.',
    detailsEn: "Abu Rafi' Sallam ibn Abi al-Huqayq was among the most active in inciting the polytheists against Muslims and gathering alliances against them. The Prophet ﷺ sent Abdullah ibn Atik and several Ansar companions on a covert mission to his fortress in Khaybar. They completed the mission successfully and returned safely.",
  },
  {
    id: 8,
    name: 'سرية محمد بن مسلمة لكعب بن الأشرف',
    nameEn: "Expedition Against Ka'b ibn al-Ashraf",
    commander: 'محمد بن مسلمة',
    yearH: '3 هـ',
    yearM: '625م',
    result: 'مهمة خاصة',
    significance: 'تصفية كعب بن الأشرف الذي يهجو النبي ﷺ ويحرّض المشركين',
    significanceEn: "Eliminating Ka'b ibn al-Ashraf who mocked the Prophet ﷺ and incited the polytheists",
    details: 'كان كعب بن الأشرف اليهودي يؤلف الشعر يهجو فيه النبي ﷺ وصحابته ويذهب إلى مكة يحرّض قريشاً على المسلمين بعد موقعة بدر. استأذن محمد بن مسلمة النبيَّ ﷺ في قتله، فأذن له. توجه مع عدة رجال وأوهموا كعباً بحاجتهم إليه، فخرج معهم وقضوا عليه.',
    detailsEn: "Ka'b ibn al-Ashraf the Jew composed poetry mocking the Prophet ﷺ and his companions, and traveled to Mecca to incite Quraysh against Muslims after the Battle of Badr. Muhammad ibn Maslamah requested the Prophet's permission to deal with him, which was granted. He went with several men, deceived Ka'b into coming out, and eliminated him.",
  },
  {
    id: 9,
    name: 'سرية زيد بن حارثة إلى القردة',
    nameEn: 'Expedition to al-Qardah',
    commander: 'زيد بن حارثة',
    yearH: '3 هـ',
    yearM: '624م',
    result: 'انتصار',
    significance: 'اعتراض قافلة قريش التجارية وتحقيق غنيمة كبيرة',
    significanceEn: 'Intercepting a Quraysh trade caravan and capturing great spoils',
    details: 'علم النبي ﷺ بقافلة تجارية لقريش تسير عبر طريق العراق بدلاً من الطريق المعتاد هروباً من المسلمين. أرسل ﷺ زيد بن حارثة لاعتراضها فأدركها عند القردة وغنم ما فيها. فرّ أصحاب القافلة إلا مرشدهم فياض النضري الذي أُسر ثم أسلم.',
    detailsEn: 'The Prophet ﷺ learned of a Quraysh trade caravan traveling via the Iraq route instead of the usual road to evade Muslims. He sent Zayd ibn Harithah to intercept it. Zayd caught the caravan at al-Qardah and captured its goods. The caravan guards fled except their guide Furat al-Nadri who was captured and later accepted Islam.',
    note: 'غنيمة كبيرة وفرار القافلة وأسر مرشدها',
    noteEn: 'Great spoils captured; the caravan fled and its guide was taken prisoner',
  },
  {
    id: 10,
    name: 'سرية زيد بن حارثة إلى الحسمى',
    nameEn: 'Expedition to al-Husma',
    commander: 'زيد بن حارثة',
    yearH: '6 هـ',
    yearM: '628م',
    result: 'انتصار',
    significance: 'رد عدوان بني فزارة على المسلمين',
    significanceEn: 'Repelling the Banu Fazarah attack on Muslims',
    details: 'أغارت بني فزارة على المسلمين وقتلوا بعضهم وجرحوا أمّ قرفة. أرسل النبي ﷺ زيد بن حارثة لمعاقبتهم. توجّه زيد إلى الحسمى وهزم القبيلة وعاد بالغنائم والأسرى.',
    detailsEn: 'Banu Fazarah raided Muslims, killing some and wounding Umm Qirfah. The Prophet ﷺ sent Zayd ibn Harithah to punish them. Zayd marched to al-Husma, defeated the tribe, and returned with spoils and prisoners.',
  },
  {
    id: 11,
    name: 'سرية زيد بن حارثة إلى وادي القرى',
    nameEn: 'Expedition to Wadi al-Qura',
    commander: 'زيد بن حارثة',
    yearH: '6 هـ',
    yearM: '628م',
    result: 'شهادة',
    significance: 'معركة شديدة مع فزارة في وادي القرى',
    significanceEn: 'Fierce battle with Fazarah in Wadi al-Qura',
    details: 'أوفد النبي ﷺ زيد بن حارثة في سرية إلى وادي القرى فكمنت لهم بنو فزارة. دارت معركة شديدة استُشهد فيها عدد من المسلمين وجُرح زيد بن حارثة، فعاد المسلمون بعد خسائر فادحة.',
    detailsEn: 'The Prophet ﷺ dispatched Zayd ibn Harithah on an expedition to Wadi al-Qura, where Banu Fazarah ambushed them. A fierce battle ensued in which several Muslims were martyred and Zayd ibn Harithah was wounded. The Muslims withdrew after suffering heavy losses.',
    martyrs: 'عدد من المسلمين استُشهدوا في الكمين',
    martyrsEn: 'Several Muslims were martyred in the ambush',
  },
  {
    id: 12,
    name: 'سرية عكاشة بن محصن إلى الغمر',
    nameEn: 'Expedition to al-Ghamr',
    commander: 'عكاشة بن محصن',
    yearH: '6 هـ',
    yearM: '627م',
    troops: '40 رجلاً',
    result: 'بدون قتال',
    significance: 'انسحاب العدو وتحقيق غنيمة دون اشتباك',
    significanceEn: 'Enemy withdrawal and capturing spoils without engagement',
    details: 'أرسل النبي ﷺ عكاشة بن محصن بأربعين رجلاً إلى الغمر حيث حشود بني أسد. سمعت القبيلة بقدوم المسلمين فأخلت المنطقة وفرّت بأسرها. وجد المسلمون مواشي كثيرة تركوها فساقوها غنيمة وعادوا.',
    detailsEn: "The Prophet ﷺ sent Ukkashah ibn Mihsan with forty men to al-Ghamr where Banu Asad were massing. When the tribe heard of the Muslims' approach, they evacuated the area and fled entirely. The Muslims found abundant livestock left behind, which they took as spoils and returned.",
    note: 'فرار العدو قبل الاشتباك وغنيمة وفيرة',
    noteEn: 'Enemy fled before engagement; abundant spoils captured',
  },
  {
    id: 13,
    name: 'سرية أبي عبيدة بن الجراح إلى ذي القصة',
    nameEn: 'Expedition to Dhu al-Qassah',
    commander: 'أبو عبيدة بن الجراح',
    yearH: '7 هـ',
    yearM: '628م',
    troops: '40 رجلاً',
    result: 'انتصار',
    significance: 'صمود المسلمين رغم الإصابات والمقاومة الشديدة',
    significanceEn: 'Muslims held firm despite casualties and fierce resistance',
    details: 'وجّه النبي ﷺ أبا عبيدة بن الجراح بأربعين رجلاً إلى ذي القصة لمواجهة بعض القبائل المعادية. رغم المقاومة الشديدة وإصابة عدد من المسلمين صمد الجيش وأتم مهمته وعاد.',
    detailsEn: 'The Prophet ﷺ sent Abu Ubaydah ibn al-Jarrah with forty men to Dhu al-Qassah to confront some hostile tribes. Despite fierce resistance and several Muslims being wounded, the army held its ground, completed its mission, and returned.',
  },
  {
    id: 14,
    name: 'سرية عبد الله بن رواحة إلى خيبر',
    nameEn: 'Expedition to Khaybar (ibn Rawahah)',
    commander: 'عبد الله بن رواحة',
    yearH: '7 هـ',
    yearM: '628م',
    result: 'مهمة خاصة',
    significance: 'تصفية أسير بن رزام اليهودي الذي يجمع الأحلاف ضد المسلمين',
    significanceEn: 'Eliminating Usayr ibn Rizam the Jew who was gathering alliances against Muslims',
    details: 'كان أسير بن رزام اليهودي يسعى بين القبائل ليجمعها على قتال المسلمين في خيبر بعد جلاء بني النضير. أرسل النبي ﷺ عبد الله بن رواحة مع جماعة من الصحابة في مهمة سرية. استدرجوا أسير بن رزام وأوهموه بمفاوضات ثم قضوا عليه وعادوا سالمين.',
    detailsEn: "Usayr ibn Rizam the Jew was traveling between tribes to gather them against Muslims in Khaybar after the expulsion of Banu al-Nadir. The Prophet ﷺ sent Abdullah ibn Rawahah with a group of companions on a covert mission. They lured Usayr ibn Rizam under pretense of negotiations and eliminated him, returning safely.",
  },
  {
    id: 15,
    name: 'سرية مؤتة',
    nameEn: "Expedition of Mu'tah",
    commander: 'زيد بن حارثة (ثم جعفر، ثم ابن رواحة، ثم خالد)',
    yearH: '8 هـ',
    yearM: '629م',
    troops: '3000 مسلم',
    result: 'شهادة',
    significance: 'أعظم سرية في الإسلام — أول مواجهة مباشرة مع الروم',
    significanceEn: 'Greatest expedition in Islam — first direct confrontation with the Byzantines',
    details: 'أوفد النبي ﷺ جيشاً من ثلاثة آلاف مقاتل لمواجهة جيش بيزنطي يُقدَّر بمئتي ألف محارب. أمّر عليهم زيد بن حارثة، فإن قُتل فجعفر بن أبي طالب، فإن قُتل فعبد الله بن رواحة. استُشهد الأمراء الثلاثة واحداً تلو الآخر. أخذ الراية خالد بن الوليد بعد إذن الصحابة فأدار المعركة بدهاء عسكري فائق وانسحب بالجيش سالماً. أخبر النبي ﷺ الصحابة بالنبأ قبل وصول الجيش من خيبر.',
    detailsEn: "The Prophet ﷺ dispatched an army of three thousand fighters to face a Byzantine force estimated at two hundred thousand warriors. He appointed Zayd ibn Harithah as commander; if killed, then Ja'far ibn Abi Talib; if killed, then Abdullah ibn Rawahah. All three commanders were martyred one after another. Khalid ibn al-Walid took the banner with the companions' consent, managed the battle with extraordinary military genius, and withdrew the army safely. The Prophet ﷺ informed the companions of the news before the army returned.",
    martyrs: 'زيد بن حارثة، جعفر بن أبي طالب (ذو الجناحين — قُطعت يداه)، عبد الله بن رواحة',
    martyrsEn: "Zayd ibn Harithah, Ja'far ibn Abi Talib (Dhu al-Jananayn — both arms were cut off), Abdullah ibn Rawahah",
    note: 'خالد بن الوليد لُقِّب بسيف الله المسلول بعد هذه المعركة',
    noteEn: 'Khalid ibn al-Walid was given the title "Sword of Allah" after this battle',
  },
  {
    id: 16,
    name: 'سرية ذات السلاسل',
    nameEn: 'Expedition of Dhat al-Salasil',
    commander: 'عمرو بن العاص',
    yearH: '8 هـ',
    yearM: '629م',
    troops: '300 - 500 ثم أُضيف 200 مهاجر بقيادة أبي عبيدة',
    result: 'بدون قتال',
    significance: 'انسحاب قبائل قضاعة دون اشتباك بعد وصول التعزيزات',
    significanceEn: "Quda'ah tribes withdrew without major engagement after reinforcements arrived",
    details: 'أرسل النبي ﷺ عمرو بن العاص — لأن أمه من قبيلة قضاعة — في سرية إلى أرض قضاعة قرب الشام لاستمالتها. لما رأى كثرة العدو طلب مدداً فأرسل النبي ﷺ أبا عبيدة بن الجراح بمئتي مهاجر. اختلف الأميران في القيادة فأتم كل منهما صلاحياته، وانسحبت القبائل دون قتال كبير.',
    detailsEn: "The Prophet ﷺ sent Amr ibn al-As — whose mother was from the Quda'ah tribe — on an expedition to Quda'ah territory near Syria to win them over. Seeing the enemy's large numbers, he requested reinforcements, so the Prophet ﷺ sent Abu Ubaydah ibn al-Jarrah with two hundred Muhajirin. The two commanders disagreed about leadership, each completing his own duties. The tribes withdrew without major fighting.",
  },
  {
    id: 17,
    name: 'سرية الخبط',
    nameEn: 'Expedition of al-Khabt',
    commander: 'أبو عبيدة بن الجراح',
    yearH: '8 هـ',
    yearM: '629م',
    troops: '300 رجل',
    result: 'انتصار',
    significance: 'قصة الحوت العجيبة — أكل منه الجيش شهراً كاملاً',
    significanceEn: 'The miraculous whale — the army ate from it for a full month',
    details: 'أرسل النبي ﷺ أبا عبيدة بن الجراح بثلاثمائة رجل إلى سواحل الجحفة. نفد الزاد وأصابهم جوع شديد حتى أكلوا أوراق الشجر (الخبط) فسُمّيت السرية بذلك. ألقى البحر على الساحل حوتاً عظيماً يُسمى العنبر، فأكل منه الجيش كله ثمانية عشر يوماً وادّخروا منه. لما عادوا وأخبر أبو عبيدة النبيَّ ﷺ قال: "هو رزق أخرجه الله لكم."',
    detailsEn: 'The Prophet ﷺ sent Abu Ubaydah ibn al-Jarrah with three hundred men to the shores of al-Juhfah. Their provisions ran out and they suffered severe hunger until they ate tree leaves (khabt), giving the expedition its name. The sea cast ashore an enormous whale; the entire army ate from it for eighteen days and stored provisions from it. When they returned and Abu Ubaydah told the Prophet ﷺ, he said: "It is provision that Allah brought out for you."',
    note: 'وجدوا حوتاً عظيماً على الشاطئ أكلوا منه وادخروا — بركة من الله',
    noteEn: 'They found a giant whale on the shore, ate from it, and stored provisions — a blessing from Allah',
  },
  {
    id: 18,
    name: 'سرية أسامة بن زيد',
    nameEn: 'Expedition of Usamah ibn Zayd',
    commander: 'أسامة بن زيد',
    yearH: '11 هـ',
    yearM: '632م',
    result: 'انتصار',
    significance: 'آخر سرية أُعِدَّت بأمر النبي ﷺ قبيل وفاته',
    significanceEn: "Last expedition ordered by the Prophet ﷺ before his death",
    details: 'أمّر النبي ﷺ أسامة بن زيد — وهو في التاسعة عشرة من عمره — على جيش لغزو أرض البلقاء في الشام انتقاماً لمقتل أبيه زيد في مؤتة. طعن بعض الصحابة في إمارته لصغر سنه، فخطب النبي ﷺ ودافع عنه. أُخّرت السرية بسبب مرض النبي ﷺ حتى توفي. أمر أبو بكر الصديق بإنفاذها تنفيذاً لوصية النبي ﷺ، فانطلقت وعادت منتصرة.',
    detailsEn: "The Prophet ﷺ appointed Usamah ibn Zayd — then nineteen years old — to lead an army to raid the land of al-Balqa' in Syria, avenging his father Zayd's death at Mu'tah. Some companions objected to his command due to his young age, so the Prophet ﷺ gave a sermon defending him. The expedition was delayed due to the Prophet's illness until he passed away. Abu Bakr al-Siddiq ordered it to proceed in fulfillment of the Prophet's instruction; it set out and returned victorious.",
    note: 'أتمّها أبو بكر الصديق تنفيذاً لوصية النبي ﷺ — انتصار وعودة سالمة',
    noteEn: "Abu Bakr al-Siddiq completed it in fulfillment of the Prophet's instruction — victory and safe return",
  },
  {
    id: 19,
    name: 'سرية طلحة بن عبيد الله',
    nameEn: 'Expedition of Talhah ibn Ubaydullah',
    commander: 'طلحة بن عبيد الله',
    yearH: '1 هـ',
    yearM: '623م',
    result: 'بدون قتال',
    significance: 'من أوائل السرايا — تحسس أخبار قريش نحو العراق',
    significanceEn: 'Among the earliest expeditions — scouting Quraysh movements toward Iraq',
    details: 'أرسل النبي ﷺ طلحة بن عبيد الله ونفراً من الصحابة للتجسس على أخبار قريش في الطريق الشمالي نحو العراق. عادوا بمعلومات قيّمة دون اشتباك مسلح.',
    detailsEn: 'The Prophet ﷺ sent Talhah ibn Ubaydullah and a group of companions to gather intelligence on Quraysh movements on the northern route toward Iraq. They returned with valuable information without armed conflict.',
  },
  {
    id: 20,
    name: 'سرية خالد بن الوليد إلى بني جذيمة',
    nameEn: 'Expedition to Banu Judhaimah',
    commander: 'خالد بن الوليد',
    yearH: '8 هـ',
    yearM: '630م',
    troops: '350 مقاتلاً',
    result: 'مهمة خاصة',
    significance: 'حادثة خلافية — تجاوز القائد حدود المهمة',
    significanceEn: "A controversial incident — the commander exceeded his mission's boundaries",
    details: 'بعث النبي ﷺ خالد بن الوليد داعياً لا مقاتلاً بعد فتح مكة. استسلمت بنو جذيمة لكنهم لم يجيدوا التعبير عن إسلامهم فقالوا "صبأنا" بدل "أسلمنا." أساء خالد تأويلها وأمر بقتل بعضهم. بلغ الخبر النبيَّ ﷺ فرفع يديه وقال: "اللهم إني أبرأ إليك مما صنع خالد!" وأرسل علياً لدية القتلى وتعويض الأذى.',
    detailsEn: 'The Prophet ﷺ sent Khalid ibn al-Walid as a caller to Islam, not as a fighter, after the conquest of Mecca. Banu Judhaimah surrendered but could not properly express their conversion, saying "Saba\'na" instead of "Aslamna." Khalid misinterpreted this and ordered some of them killed. The news reached the Prophet ﷺ who raised his hands and said: "O Allah, I disavow to You what Khalid has done!" He sent Ali to pay blood money and compensate for the harm.',
    note: 'النبي ﷺ تبرّأ من التجاوز وأرسل علياً لإصلاح الخطأ',
    noteEn: 'The Prophet ﷺ disavowed the transgression and sent Ali to rectify the error',
    verse: '﴿وَلَا تَقُولُوا لِمَنْ أَلْقَىٰ إِلَيْكُمُ السَّلَامَ لَسْتَ مُؤْمِنًا﴾ — النساء: 94',
  },
  {
    id: 21,
    name: 'سرية علي بن أبي طالب إلى اليمن',
    nameEn: 'Expedition of Ali to Yemen',
    commander: 'علي بن أبي طالب',
    yearH: '10 هـ',
    yearM: '631م',
    result: 'انتصار',
    significance: 'إسلام قبيلة همدان كلها في يوم واحد',
    significanceEn: 'The entire Hamdan tribe embraced Islam in a single day',
    details: 'أرسل النبي ﷺ علياً إلى اليمن للدعوة وجمع الزكاة. قرأ كتاب النبي ﷺ على قبيلة همدان فأسلمت بأكملها في يوم واحد. كتب علي إلى النبي ﷺ يخبره بذلك فسجد شكراً لله وقال: "السلام على همدان." ثم عادت بقية قبائل اليمن تتسابق إلى الإسلام.',
    detailsEn: "The Prophet ﷺ sent Ali to Yemen for da'wah and to collect zakah. He read the Prophet's letter to the Hamdan tribe and they all accepted Islam in a single day. Ali wrote to the Prophet ﷺ informing him, who prostrated in gratitude to Allah and said: \"Peace be upon Hamdan.\" Then the rest of Yemen's tribes hastened to embrace Islam.",
    note: 'إسلام همدان جميعاً في يوم واحد — فرح النبي ﷺ وسجد شكراً',
    noteEn: 'All of Hamdan embraced Islam in one day — the Prophet ﷺ rejoiced and prostrated in gratitude',
  },
  {
    id: 22,
    name: 'سرية جرير بن عبد الله البجلي إلى ذي الخلصة',
    nameEn: 'Expedition to Dhu al-Khalasah',
    commander: 'جرير بن عبد الله البجلي',
    yearH: '10 هـ',
    yearM: '631م',
    troops: '150 فارساً',
    result: 'انتصار',
    significance: 'هدم كعبة اليمامة وتطهير الجزيرة من آخر الأصنام الكبرى',
    significanceEn: "Demolishing the 'Ka'bah of Yemen' and purging the peninsula of the last major idol",
    details: 'كان ذو الخلصة صنماً عظيماً تعبده خثعم وبجيلة وسُمّي "كعبة اليمامة" أو "الكعبة الشامية" لعظمته. أرسل النبي ﷺ جرير بن عبد الله البجلي بمئة وخمسين فارساً فأحرق هذا الصنم وهدم مكانه. قال جرير مازحاً: "والله ما زلت منذ أسلمت حتى هدّ الله هذا الصنم ثلاثاً وثلاثين ضربة بالسيف."',
    detailsEn: "Dhu al-Khalasah was a great idol worshipped by Khath'am and Bajilah tribes, called the 'Ka'bah of Yemen' due to its grandeur. The Prophet ﷺ sent Jarir ibn Abdullah al-Bajali with one hundred and fifty horsemen, who burned this idol and demolished its site. Jarir said jokingly: \"By Allah, I have not stopped since I accepted Islam until Allah demolished this idol — with thirty-three sword strikes.\"",
  },
  {
    id: 23,
    name: 'سرية أبي موسى الأشعري إلى اليمن',
    nameEn: "Expedition of Abu Musa al-Ash'ari to Yemen",
    commander: 'أبو موسى الأشعري',
    yearH: '9 هـ',
    yearM: '630م',
    result: 'مهمة خاصة',
    significance: 'تعليم الإسلام وجمع الزكاة وإرساء الحكم الإسلامي في اليمن',
    significanceEn: 'Teaching Islam, collecting zakah, and establishing Islamic governance in Yemen',
    details: 'عيّن النبي ﷺ أبا موسى الأشعري والياً ومعلماً لمنطقة زبيد وعدن في اليمن. اشتُهر بحسن معاملته للناس وتعليمهم الصلاة والقرآن. مكث سنوات ينشر الإسلام ويجمع الصدقات ويفض النزاعات حتى استقرت البلاد.',
    detailsEn: "The Prophet ﷺ appointed Abu Musa al-Ash'ari as governor and teacher for the Zabid and Aden region of Yemen. He was known for his excellent treatment of people and his teaching of prayer and Quran. He remained for years spreading Islam, collecting alms, and resolving disputes until the land was stable.",
    note: 'أرسل النبي ﷺ معاذ بن جبل إلى صنعاء وأبا موسى إلى زبيد — إسلام اليمن',
    noteEn: "The Prophet ﷺ sent Mu'adh ibn Jabal to Sana'a and Abu Musa to Zabid — the Islamization of Yemen",
  },
  {
    id: 24,
    name: 'سرية قطبة بن عامر الأنصاري',
    nameEn: 'Expedition of Qutbah ibn Amir al-Ansari',
    commander: 'قطبة بن عامر الأنصاري',
    yearH: '9 هـ',
    yearM: '630م',
    troops: '20 رجلاً',
    result: 'انتصار',
    significance: 'مداهمة بني خثعم في تبالة وردع غاراتهم على المسلمين',
    significanceEn: "Night raid on Banu Khath'am at Tabalah, deterring their raids on Muslims",
    details: 'كانت بنو خثعم تغير على المسلمين وتؤوي الفارين. أرسل النبي ﷺ قطبة بن عامر في عشرين رجلاً ليلاً إلى تبالة. أغار على الحي وغنم الإبل والغنم وأسر عدداً منهم. بعضهم قُتل وبعضهم هرب. عاد بالغنائم والأسرى إلى المدينة.',
    detailsEn: "Banu Khath'am were raiding Muslims and harboring fugitives. The Prophet ﷺ sent Qutbah ibn Amir with twenty men by night to Tabalah. They raided the settlement and captured camels, sheep, and prisoners. Some were killed and others fled. He returned with the spoils and prisoners to Medina.",
  },
];

const SariyaCard: React.FC<{ sariya: Sariya; index: number; isEn: boolean }> = ({ sariya, index, isEn }) => {
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

      <div className="p-5" dir={isEn ? 'ltr' : 'rtl'}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span
                className="font-kufi text-xs px-2.5 py-0.5 rounded-full"
                style={{ background: resultStyle.bg, border: `1px solid ${resultStyle.border}`, color: resultStyle.text }}
              >
                {isEn ? RESULT_LABELS_EN[sariya.result] : sariya.result}
              </span>
              <span className="font-kufi text-xs text-white/35">{sariya.yearH} / {sariya.yearM}</span>
            </div>
            <h3 className="font-noto font-bold line-clamp-2" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)', color: '#C9A84C' }}>
              {isEn ? sariya.nameEn : sariya.name}
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

        {/* Commander & Troops */}
        <div
          className="rounded-xl p-3 mb-3"
          style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}
        >
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <div>
              <p className="font-kufi text-xs text-white/35 mb-0.5">{isEn ? 'Commander' : 'القائد'}</p>
              <p className="font-noto text-sm text-white/80">{sariya.commander}</p>
            </div>
            {sariya.troops && (
              <div>
                <p className="font-kufi text-xs text-white/35 mb-0.5">{isEn ? 'Force' : 'العدد'}</p>
                <p className="font-noto text-sm" style={{ color: '#34D399' }}>{sariya.troops}</p>
              </div>
            )}
          </div>
        </div>

        {/* Significance */}
        <p className="font-kufi mb-4 line-clamp-2" style={{ fontSize: '0.82rem', color: '#C9A84C', lineHeight: 1.65 }}>
          {isEn ? sariya.significanceEn : sariya.significance}
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
                  {isEn ? sariya.detailsEn : sariya.details}
                </p>

                {sariya.martyrs && (
                  <div
                    className="rounded-xl px-4 py-2.5 flex items-start gap-2"
                    style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.2)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#F87171' }} />
                    <div>
                      <p className="font-kufi text-xs mb-0.5" style={{ color: '#F87171' }}>
                        {isEn ? 'Martyrs' : 'الشهداء'}
                      </p>
                      <p className="font-noto text-white/60" style={{ fontSize: '0.83rem', lineHeight: 1.75 }}>
                        {isEn ? sariya.martyrsEn : sariya.martyrs}
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
                      <p className="font-kufi text-xs mb-0.5" style={{ color: '#60A5FA' }}>
                        {isEn ? 'Note' : 'ملاحظة'}
                      </p>
                      <p className="font-noto text-white/60" style={{ fontSize: '0.83rem', lineHeight: 1.75 }}>
                        {isEn ? sariya.noteEn : sariya.note}
                      </p>
                    </div>
                  </div>
                )}

                {sariya.verse && (
                  <div
                    className="rounded-xl px-4 py-3"
                    style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}
                    dir="rtl"
                  >
                    <p className="font-kufi text-xs mb-1.5" style={{ color: '#C9A84C' }}>الآية الكريمة</p>
                    <p className="font-noto italic" style={{ fontSize: '0.88rem', color: '#C9A84C', lineHeight: 1.95 }}>
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
  const router = useRouter();
  const { isEn } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState<string>('الكل');

  const filtered = useMemo(() => {
    return SARAYA.filter(s => {
      const matchResult = resultFilter === 'الكل' || s.result === resultFilter;
      const q = searchQuery.trim();
      const matchSearch = !q || (
        isEn
          ? (s.nameEn.toLowerCase().includes(q.toLowerCase()) || s.commander.toLowerCase().includes(q.toLowerCase()) || s.significanceEn.toLowerCase().includes(q.toLowerCase()))
          : (s.name.includes(q) || s.commander.includes(q) || s.significance.includes(q))
      );
      return matchResult && matchSearch;
    });
  }, [searchQuery, resultFilter, isEn]);

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share button */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'Military Expeditions' : 'السرايا العسكرية'} accentColor="#C9A84C" />
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
          <span className="text-islamic-gold/80">{isEn ? 'Expeditions' : 'السرايا'}</span>
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
          {isEn ? 'Military Expeditions' : 'السرايا العسكرية'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-noto text-islamic-gold/55 mt-2"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
          dir="rtl"
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
          {(isEn ? [
            { label: 'Total expeditions', value: '~60' },
            { label: 'Shown here', value: String(SARAYA.length) },
            { label: 'First expedition', value: '1 AH' },
          ] : [
            { label: 'عدد السرايا الإجمالي', value: '~60' },
            { label: 'المعروضة هنا', value: String(SARAYA.length) },
            { label: 'أول سرية', value: '1 هـ' },
          ]).map(stat => (
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
          <Search
            size={14}
            className={`absolute ${isEn ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-islamic-gold/40`}
          />
          <input
            type="text"
            placeholder={isEn ? 'Search expeditions...' : 'ابحث عن سرية...'}
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

        {/* Result filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {(['الكل', 'انتصار', 'شهادة', 'بدون قتال', 'مهمة خاصة'] as const).map(r => {
            const isActive = resultFilter === r;
            const style = r === 'الكل'
              ? { color: '#C9A84C', bg: '#27251d', border: '#52482a' }
              : { color: RESULT_COLORS[r].text, bg: RESULT_COLORS[r].bg, border: RESULT_COLORS[r].border };
            const label = r === 'الكل' ? (isEn ? 'All' : 'الكل') : (isEn ? RESULT_LABELS_EN[r] : r);
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
                {label}
                {r !== 'الكل' && (
                  <span className={isEn ? 'ml-1.5' : 'mr-1.5'} style={{ opacity: 0.6 }}>
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
          {isEn
            ? `Showing ${filtered.length} expedition(s) — click a card to expand`
            : `يُعرض ${filtered.length} سرية — انقر على البطاقة لعرض التفاصيل`}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((sariya, index) => (
            <SariyaCard key={sariya.id} sariya={sariya} index={index} isEn={isEn} />
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

export default SarayaPage;
