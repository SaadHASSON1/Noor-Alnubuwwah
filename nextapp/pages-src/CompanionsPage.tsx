'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, Search, X } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface Companion {
  name: string;
  nameEn: string;
  nickname: string;
  nicknameEn: string;
  description: string;
  descriptionEn: string;
  achievement: string;
  achievementEn: string;
  category: string;
  hadith?: string;
  hadithEn?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'العشرة المبشرون': '#C9A84C',
  'المهاجرون': '#A8C8E8',
  'الأنصار': '#A8E8C8',
  'الصحابيات': '#E8A8A8',
  'العلماء والقرّاء': '#E8C8A8',
  'الفرسان والقادة': '#C8E8A8',
};

const CATEGORY_LABELS_EN: Record<string, string> = {
  'العشرة المبشرون': 'The Ten Promised Paradise',
  'المهاجرون': 'The Emigrants',
  'الأنصار': 'The Helpers',
  'الصحابيات': 'Women Companions',
  'العلماء والقرّاء': 'Scholars & Reciters',
  'الفرسان والقادة': 'Warriors & Commanders',
};

const COMPANIONS: Companion[] = [
  // ── العشرة المبشرون ──
  {
    name: 'أبو بكر الصديق', nameEn: 'Abu Bakr al-Siddiq',
    nickname: 'الصديق — خليل النبي ﷺ',
    nicknameEn: 'Al-Ṣiddīq — The Truthful, Companion in the Cave',
    achievement: 'أول الخلفاء الراشدين',
    achievementEn: 'First Caliph of Islam',
    description: 'أول من صدّق النبي ﷺ من الرجال وصاحبه في الغار. أنفق ماله كله في سبيل الله وأعتق بلالاً وغيره. قال فيه النبي ﷺ: "ما نفعني مال أحد قط ما نفعني مال أبي بكر."',
    descriptionEn: 'The first man to believe in the Prophet ﷺ and his companion in the cave. He spent his entire wealth in the cause of Allāh and freed Bilāl and others. The Prophet ﷺ said: "No wealth has benefited me as much as Abū Bakr\'s wealth."',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "لو كنتُ متخذاً من أمتي خليلاً لاتخذتُ أبا بكر خليلاً"',
    hadithEn: 'The Prophet ﷺ said: "Had I taken a close friend from my nation, I would have taken Abū Bakr as a close friend."',
  },
  {
    name: 'عمر بن الخطاب', nameEn: 'Umar ibn al-Khattab',
    nickname: 'الفاروق — أمير المؤمنين',
    nicknameEn: 'Al-Fārūq — Commander of the Faithful',
    achievement: 'ثاني الخلفاء الراشدين',
    achievementEn: 'Second Caliph of Islam',
    description: 'عزّ الله به الإسلام فكان إسلامه فتحاً. أول من سُمّي أمير المؤمنين. فتحت في عهده فارس والشام ومصر. كان عدله ضرباً من الكرامة الإنسانية.',
    descriptionEn: 'Allāh honored Islam through him; his embrace of Islam was itself a conquest. The first to be called Commander of the Faithful. Persia, the Levant, and Egypt were opened in his era. His justice was a model of human dignity.',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "لو كان بعدي نبيٌّ لكان عمر"',
    hadithEn: 'The Prophet ﷺ said: "If there were a prophet after me, it would have been ʿUmar."',
  },
  {
    name: 'عثمان بن عفان', nameEn: 'Uthman ibn Affan',
    nickname: 'ذو النورين',
    nicknameEn: 'Dhū al-Nūrayn — Possessor of Two Lights',
    achievement: 'ثالث الخلفاء — جامع القرآن',
    achievementEn: 'Third Caliph — Compiler of the Qurʾān',
    description: 'تزوّج ابنتي النبي ﷺ (رقية ثم أم كلثوم) فلُقّب بذي النورين. جمع القرآن في مصحف موحّد أنقذ الأمة من الاختلاف. جهّز جيش العسرة بثلث ماله.',
    descriptionEn: 'He married two daughters of the Prophet ﷺ (Ruqayyah, then Umm Kulthūm), earning the title "Possessor of Two Lights." He compiled the Qurʾān into a unified muṣḥaf that saved the nation from discord. He equipped the Army of Hardship with a third of his wealth.',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "ما ضرّ عثمانَ ما فعل بعد اليوم"',
    hadithEn: 'The Prophet ﷺ said: "Whatever ʿUthmān does after today will not harm him."',
  },
  {
    name: 'علي بن أبي طالب', nameEn: 'Ali ibn Abi Talib',
    nickname: 'أسد الله — أبو السبطين',
    nicknameEn: 'Lion of Allāh — Father of the Two Grandsons',
    achievement: 'رابع الخلفاء الراشدين',
    achievementEn: 'Fourth Caliph of Islam',
    description: 'ابن عم النبي ﷺ وزوج فاطمة الزهراء. نام في فراش النبي ليلة الهجرة. أعلم الصحابة بالقضاء والفقه. قاتل في بدر وأحد والخندق وكل المشاهد.',
    descriptionEn: 'Cousin of the Prophet ﷺ and husband of Fāṭimah al-Zahrāʾ. He slept in the Prophet\'s bed on the night of the Hijrah. The most knowledgeable Companion in jurisprudence and adjudication. He fought in Badr, Uḥud, the Trench, and every battle.',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "أنا مدينة العلم وعلي بابها"',
    hadithEn: 'The Prophet ﷺ said: "I am the city of knowledge and ʿAlī is its gate."',
  },
  {
    name: 'طلحة بن عبيدالله', nameEn: 'Talhah ibn Ubaydallah',
    nickname: 'طلحة الخير — طلحة الجواد',
    nicknameEn: 'Ṭalḥah the Good — Ṭalḥah the Generous',
    achievement: 'من أكرم الصحابة جوداً',
    achievementEn: 'Among the most generous of the Companions',
    description: 'وقى النبي ﷺ بنفسه يوم أحد فشلّت يده دفاعاً عنه. قال فيه النبي ﷺ: "طلحة ممن قضى نحبه." كان يُعطي العطاء الواسع حتى سُمّي بالفيّاض.',
    descriptionEn: 'He shielded the Prophet ﷺ with his own body at Uḥud until his hand was paralyzed in defense of him. The Prophet ﷺ said: "Ṭalḥah is among those who have fulfilled their vow." He was so lavish in giving that he was called "the Overflowing."',
    category: 'العشرة المبشرون',
  },
  {
    name: 'الزبير بن العوام', nameEn: 'al-Zubayr ibn al-Awwam',
    nickname: 'حواري النبي ﷺ',
    nicknameEn: 'Disciple of the Prophet ﷺ',
    achievement: 'فارس الإسلام الأول',
    achievementEn: 'First Champion of Islam',
    description: 'ابن عمة النبي ﷺ وأول من سلّ سيفه في الإسلام. قال فيه النبي ﷺ: "إن لكل نبي حوارياً وحواريّ الزبير." شهد جميع الغزوات وكان من أشجع الصحابة.',
    descriptionEn: 'Son of the Prophet\'s ﷺ paternal aunt and the first to draw his sword in Islam. The Prophet ﷺ said: "Every prophet has a disciple, and my disciple is al-Zubayr." He witnessed every battle and was among the bravest of the Companions.',
    category: 'العشرة المبشرون',
  },
  {
    name: 'عبد الرحمن بن عوف', nameEn: 'Abd al-Rahman ibn Awf',
    nickname: 'أحد العشرة المبشرين',
    nicknameEn: 'One of the Ten Promised Paradise',
    achievement: 'تاجر الصحابة الأول',
    achievementEn: 'Foremost Merchant of the Companions',
    description: 'هاجر بلا مال فأعطاه أخوه الأنصاري نصف ماله فرفض وطلب السوق. فكسب في يومه الأول خطيبةً وتجارة. تصدّق بنصف ماله وبنصف آخر مرات عدة.',
    descriptionEn: 'He emigrated penniless; his Anṣārī brother offered him half his wealth, which he declined, asking only to be shown the market. He earned a bride and a trade on his very first day. He donated half his wealth multiple times over.',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "عبد الرحمن بن عوف في الجنة"',
    hadithEn: 'The Prophet ﷺ said: "ʿAbd al-Raḥmān ibn ʿAwf is in Paradise."',
  },
  {
    name: 'سعد بن أبي وقاص', nameEn: 'Sad ibn Abi Waqqas',
    nickname: 'فارس الإسلام الأول',
    nicknameEn: 'First Archer of Islam',
    achievement: 'أول من رمى سهماً في الإسلام',
    achievementEn: 'First to shoot an arrow in Islam',
    description: 'من أوائل المسلمين ومن السابقين إلى الإسلام. قائد معركة القادسية التي فتحت فارس. استجاب الله لدعائه حتى كانت دعوته مستجابة.',
    descriptionEn: 'Among the earliest Muslims and the first to embrace Islam. Commander at the Battle of Qādisiyyah which opened Persia. Allāh answered his prayers, so his supplication was always granted.',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "اللهم سدّد رميته وأجب دعوته"',
    hadithEn: 'The Prophet ﷺ said: "O Allāh, make his arrow true and answer his supplication."',
  },
  {
    name: 'سعيد بن زيد', nameEn: 'Said ibn Zayd',
    nickname: 'من السابقين الأولين',
    nicknameEn: 'Among the First Believers',
    achievement: 'من مبكّري الإسلام',
    achievementEn: 'Among the earliest converts to Islam',
    description: 'أسلم قبل دخول دار الأرقم. زوجه أخت عمر بن الخطاب. شهد كثيراً من المشاهد وكان من أهل الشورى. جاء ذكره في البشرى النبوية الجامعة.',
    descriptionEn: 'Embraced Islam before the Companions entered the House of al-Arqam. His wife was ʿUmar ibn al-Khaṭṭāb\'s sister. He witnessed many battles and was among the people of consultation. He is mentioned in the great Prophetic glad tidings.',
    category: 'العشرة المبشرون',
  },
  {
    name: 'أبو عبيدة بن الجراح', nameEn: 'Abu Ubayda ibn al-Jarrah',
    nickname: 'أمين هذه الأمة',
    nicknameEn: 'Trustee of this Nation',
    achievement: 'فاتح بلاد الشام',
    achievementEn: 'Conqueror of Greater Syria',
    description: 'وصفه النبي ﷺ بأمين هذه الأمة. قائد الجيش الإسلامي في فتح الشام. كان من أشد الناس تواضعاً وأقلهم حباً للشهرة. توفي في طاعون عمواس.',
    descriptionEn: 'The Prophet ﷺ described him as the "trustee of this nation." Commander of the Islamic army in the conquest of the Levant. Among the most humble and least fame-seeking of people. He died in the Plague of Amwās.',
    category: 'العشرة المبشرون',
    hadith: 'قال ﷺ: "لكل أمة أمين وأمين هذه الأمة أبو عبيدة بن الجراح"',
    hadithEn: 'The Prophet ﷺ said: "Every nation has a trustee, and the trustee of this nation is Abū ʿUbaydah ibn al-Jarrāḥ."',
  },

  // ── المهاجرون ──
  {
    name: 'حمزة بن عبد المطلب', nameEn: 'Hamzah ibn Abd al-Muttalib',
    nickname: 'أسد الله وأسد رسوله',
    nicknameEn: 'Lion of Allāh and Lion of His Messenger',
    achievement: 'سيد الشهداء',
    achievementEn: 'Master of Martyrs',
    description: 'عمّ النبي ﷺ وأخوه من الرضاعة. أسلم غيرةً للنبي ﷺ ثم أصبح من أشد المؤمنين. شهيد أحد الذي بكى عليه النبي ﷺ وقال: "سيد الشهداء."',
    descriptionEn: 'Uncle of the Prophet ﷺ and his foster-brother. He embraced Islam out of chivalry for the Prophet ﷺ, then became one of the most ardent believers. The martyr of Uḥud whom the Prophet ﷺ wept over, saying: "The Master of Martyrs."',
    category: 'المهاجرون',
    hadith: 'قال ﷺ: "حمزة سيد الشهداء يوم القيامة"',
    hadithEn: 'The Prophet ﷺ said: "Ḥamzah is the Master of Martyrs on the Day of Resurrection."',
  },
  {
    name: 'جعفر بن أبي طالب', nameEn: 'Jafar ibn Abi Talib',
    nickname: 'الطيّار — ذو الجناحين',
    nicknameEn: 'Al-Ṭayyār — The Two-Winged',
    achievement: 'خطيب المسلمين أمام النجاشي',
    achievementEn: 'Spokesman of Muslims before the Negus',
    description: 'مثّل المسلمين أمام النجاشي وتلا سورة مريم ففاضت عيون القوم. استُشهد في مؤتة وقال ﷺ: "رأيته يطير في الجنة بجناحين." كان أشبه الناس بالنبي ﷺ خُلقاً وخَلقاً.',
    descriptionEn: 'Represented the Muslims before the Negus and recited Surah Maryam, causing the assembly to weep. Martyred at Muʾtah; the Prophet ﷺ said: "I saw him flying in Paradise with two wings." He was the most resembling of all people to the Prophet ﷺ in character and appearance.',
    category: 'المهاجرون',
    hadith: 'قال ﷺ: "أشبهتَ خَلقي وخُلقي"',
    hadithEn: 'The Prophet ﷺ said to him: "You resemble me in appearance and character."',
  },
  {
    name: 'مصعب بن عمير', nameEn: 'Musab ibn Umayr',
    nickname: 'أول سفير في الإسلام',
    nicknameEn: 'First Ambassador in Islam',
    achievement: 'من دعاة الإسلام الأوائل',
    achievementEn: 'Among the earliest callers to Islam',
    description: 'نشأ في النعيم والترف ثم تركه كله للإسلام. أُرسل إلى المدينة أول سفير فأسلم على يده سعد بن معاذ ومعظم قبيلته. استُشهد في أحد ولم يجدوا كفناً يغطيه.',
    descriptionEn: 'Raised in luxury and comfort, then left it all for Islam. Sent to Madinah as the first ambassador; Saʿd ibn Muʿādh and most of his tribe embraced Islam at his hands. Martyred at Uḥud with no shroud large enough to cover him.',
    category: 'المهاجرون',
  },
  {
    name: 'خباب بن الأرت', nameEn: 'Khabbab ibn al-Aratt',
    nickname: 'صاحب النار',
    nicknameEn: 'The Companion of Fire',
    achievement: 'من أوائل المعذَّبين في مكة',
    achievementEn: 'Among the earliest tortured in Makkah',
    description: 'حدّاد أُضجع على الجمر المتّقد حتى أطفأه دمه وشحم ظهره. شكا إلى النبي ﷺ فقال ﷺ: "كان الرجل قبلكم يُنشر بالمنشار ما يصدّه ذلك عن دينه." صبر حتى جاء الفرج.',
    descriptionEn: 'A blacksmith who was laid on burning embers until his own blood and back fat extinguished them. He complained to the Prophet ﷺ, who replied: "Men before you were sawn in half and it did not turn them from their faith." He remained steadfast until relief came.',
    category: 'المهاجرون',
  },
  {
    name: 'عمّار بن ياسر', nameEn: 'Ammar ibn Yasir',
    nickname: 'المعذَّب في الله',
    nicknameEn: 'The One Tortured for Allāh',
    achievement: 'ابن أول شهيدة في الإسلام',
    achievementEn: 'Son of the first martyr-family in Islam',
    description: 'ابن ياسر وسمية — أول أسرة كاملة تُعذَّب في الإسلام. أُكرِه على كلمة الكفر فأنزل الله عذره. قال فيه النبي ﷺ: "ملئ عمّار إيماناً من قرنه إلى قدمه."',
    descriptionEn: 'Son of Yāsir and Sumayyah — the first complete family to be tortured in Islam. Forced to utter words of disbelief, Allāh revealed his excuse. The Prophet ﷺ said: "ʿAmmār is filled with faith from head to toe."',
    category: 'المهاجرون',
  },
  {
    name: 'بلال بن رباح', nameEn: 'Bilal ibn Rabah',
    nickname: 'مؤذن النبي ﷺ',
    nicknameEn: 'Muezzin of the Prophet ﷺ',
    achievement: 'أول مؤذن في الإسلام',
    achievementEn: 'First muezzin in Islam',
    description: 'العبد الحبشي الذي صبر على العذاب يقول: أحد أحد. اشتراه أبو بكر وأعتقه. صعد الكعبة يؤذّن يوم الفتح. كان لا ينام حتى يرى النبي ﷺ.',
    descriptionEn: 'The Abyssinian slave who endured torture repeating "One, One." Abū Bakr bought and freed him. He climbed the Kaʿbah to give the call to prayer on the Day of Conquest. He would not sleep until he had seen the Prophet ﷺ.',
    category: 'المهاجرون',
    hadith: 'قال ﷺ: "سمعتُ خشخشة نعليك في الجنة"',
    hadithEn: 'The Prophet ﷺ said: "I heard the shuffling of your sandals in Paradise."',
  },
  {
    name: 'سلمان الفارسي', nameEn: 'Salman al-Farisi',
    nickname: 'سلمان منّا أهل البيت',
    nicknameEn: 'Salmān — From the Ahl al-Bayt',
    achievement: 'صاحب فكرة الخندق',
    achievementEn: 'The one who suggested the Trench',
    description: 'الفارسي الذي قطع آلاف الأميال بحثاً عن الحق من المجوسية إلى النصرانية إلى الإسلام. صاحب فكرة حفر الخندق. قال فيه النبي ﷺ: "سلمان منّا أهل البيت."',
    descriptionEn: 'The Persian who traveled thousands of miles in search of truth — from Zoroastrianism to Christianity to Islam. He proposed digging the Trench. The Prophet ﷺ said: "Salmān is one of us, the Ahl al-Bayt."',
    category: 'المهاجرون',
  },
  {
    name: 'أبو ذر الغفاري', nameEn: 'Abu Dharr al-Ghifari',
    nickname: 'أصدق من أقلّت الغبراء',
    nicknameEn: 'The Most Truthful under the Sky',
    achievement: 'رمز الزهد والصدق',
    achievementEn: 'Symbol of asceticism and truthfulness',
    description: 'أتى إلى مكة من بادية غفار وأعلن إسلامه جهاراً. عرّض نفسه للأذى طلباً للحق. قال فيه النبي ﷺ: "ما أظلّت الخضراء ولا أقلّت الغبراء من ذي لهجة أصدق من أبي ذر."',
    descriptionEn: 'He came to Makkah from the Ghifār desert and declared his Islam openly. He exposed himself to harm in pursuit of truth. The Prophet ﷺ said: "Neither the sky has shaded nor the earth has borne one more truthful of tongue than Abū Dharr."',
    category: 'المهاجرون',
  },
  {
    name: 'صهيب الرومي', nameEn: 'Suhayb al-Rumi',
    nickname: 'صهيب الرومي',
    nicknameEn: 'Ṣuhayb the Roman',
    achievement: 'فدى نفسه بماله هجرةً',
    achievementEn: 'Ransomed himself with his wealth to emigrate',
    description: 'ولد روميّاً وتربّى عربياً. حين أراد الهجرة منعه المشركون فقال: أرأيتم إن تركتُ مالي؟ فتركوه. فنزلت: ﴿وَمِنَ النَّاسِ مَن يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ﴾.',
    descriptionEn: 'Born Roman and raised Arab. When the polytheists blocked his emigration he said: "What if I leave you my wealth?" They let him go. Then was revealed: ﴿And of the people is he who sells himself seeking Allāh\'s approval﴾.',
    category: 'المهاجرون',
  },
  {
    name: 'أبو سلمة المخزومي', nameEn: 'Abu Salamah al-Makhzumi',
    nickname: 'السابق إلى الهجرتين',
    nicknameEn: 'The First to Both Hijrahs',
    achievement: 'أول من هاجر إلى المدينة',
    achievementEn: 'First to emigrate to Madinah',
    description: 'زوج أم سلمة قبل النبي ﷺ. أول من هاجر إلى المدينة من مكة. شهد بدراً وأُحداً وجُرح في أحد. استشهد بعدها. دعا له النبي ﷺ بعد وفاته.',
    descriptionEn: 'Husband of Umm Salamah before the Prophet ﷺ. The first to emigrate to Madinah from Makkah. He witnessed Badr and Uḥud and was wounded at Uḥud. He died from his wound, and the Prophet ﷺ prayed for him after his death.',
    category: 'المهاجرون',
  },

  // ── الأنصار ──
  {
    name: 'سعد بن معاذ', nameEn: 'Sad ibn Muadh',
    nickname: 'سيد الأوس',
    nicknameEn: 'Chief of the Aws',
    achievement: 'الذي اهتزّ لموته عرش الرحمن',
    achievementEn: 'He whose death made the Throne of the Merciful tremble',
    description: 'أسلم على يد مصعب بن عمير فأسلمت قبيلته كلها. صاحب حكم غزوة بني قريظة. توفي من جرح أحد. قال ﷺ: "اهتزّ العرش لموت سعد بن معاذ."',
    descriptionEn: 'He embraced Islam at the hands of Muṣʿab ibn ʿUmayr and his entire tribe followed. He arbitrated the affair of Banū Qurayẓah. He died from his Uḥud wound. The Prophet ﷺ said: "The Throne trembled at the death of Saʿd ibn Muʿādh."',
    category: 'الأنصار',
    hadith: 'قال ﷺ: "اهتزّ عرش الرحمن لموت سعد بن معاذ"',
    hadithEn: 'The Prophet ﷺ said: "The Throne of the Merciful trembled at the death of Saʿd ibn Muʿādh."',
  },
  {
    name: 'أبو أيوب الأنصاري', nameEn: 'Abu Ayyub al-Ansari',
    nickname: 'مضيف النبي ﷺ',
    nicknameEn: 'Host of the Prophet ﷺ',
    achievement: 'نزل النبي ﷺ في داره',
    achievementEn: 'The Prophet ﷺ lodged in his home',
    description: 'استضاف النبي ﷺ في بيته حين قدم المدينة مهاجراً. لم يزل يغزو حتى بلغ السبعين وتوفي قرب القسطنطينية. يُزار قبره في إسطنبول إلى اليوم.',
    descriptionEn: 'He hosted the Prophet ﷺ in his home when he arrived in Madinah as a migrant. He continued fighting until he was seventy and died near Constantinople. His tomb in Istanbul is visited to this day.',
    category: 'الأنصار',
  },
  {
    name: 'معاذ بن جبل', nameEn: 'Muadh ibn Jabal',
    nickname: 'أعلم الأمة بالحلال والحرام',
    nicknameEn: 'Most Knowledgeable in Lawful and Unlawful',
    achievement: 'معلّم اليمن',
    achievementEn: 'Teacher of Yemen',
    description: 'بعثه النبي ﷺ إلى اليمن معلماً وقاضياً. قال فيه: "أعلم أمتي بالحلال والحرام." كان يبكي من خشية الله ويقول: أخاف أن أكون من المنافقين.',
    descriptionEn: 'Sent by the Prophet ﷺ to Yemen as teacher and judge. The Prophet ﷺ said: "The most knowledgeable of my nation in lawful and unlawful matters." He would weep from fear of Allāh and say: "I fear I may be among the hypocrites."',
    category: 'الأنصار',
    hadith: 'قال ﷺ: "أعلم أمتي بالحلال والحرام معاذ بن جبل"',
    hadithEn: 'The Prophet ﷺ said: "The most knowledgeable of my nation in lawful and unlawful matters is Muʿādh ibn Jabal."',
  },
  {
    name: 'أبيّ بن كعب', nameEn: 'Ubayy ibn Kab',
    nickname: 'سيد القرّاء',
    nicknameEn: 'Master of the Reciters',
    achievement: 'أقرأ الصحابة',
    achievementEn: 'The best reciter among the Companions',
    description: 'أمره النبي ﷺ أن يُقرئ القرآن. كان ذا مكانة في القراءة حتى قال النبي ﷺ: "أقرأ أمتي أُبيّ." جمع القرآن في زمن النبي ﷺ قبل وفاته.',
    descriptionEn: 'The Prophet ﷺ commanded him to lead others in reciting the Qurʾān. He held such distinction in recitation that the Prophet ﷺ said: "The best reciter of my nation is Ubayy." He completed the Qurʾān in the Prophet\'s ﷺ lifetime before his death.',
    category: 'الأنصار',
    hadith: 'قال ﷺ: "أقرأ أمتي أُبيّ بن كعب"',
    hadithEn: 'The Prophet ﷺ said: "The best reciter of my nation is Ubayy ibn Kaʿb."',
  },
  {
    name: 'أنس بن مالك', nameEn: 'Anas ibn Malik',
    nickname: 'خادم النبي ﷺ',
    nicknameEn: 'Servant of the Prophet ﷺ',
    achievement: 'أكثر الصحابة رواية للحديث',
    achievementEn: 'Companion who narrated the most ḥadīths',
    description: 'خدم النبي ﷺ عشر سنين فلم يقل له قط: لمَ فعلتَ هذا؟ دعا له النبي ﷺ بالبركة في المال والولد والعمر فعاش مئة وثلاث سنين. روى أكثر من ألفي حديث.',
    descriptionEn: 'He served the Prophet ﷺ for ten years and the Prophet ﷺ never once said to him: "Why did you do this?" The Prophet ﷺ prayed for blessing in his wealth, children, and life; he lived 103 years and narrated over two thousand ḥadīths.',
    category: 'الأنصار',
    hadith: 'قال ﷺ: "اللهم أكثر ماله وولده وأطل عمره"',
    hadithEn: 'The Prophet ﷺ said: "O Allāh, increase his wealth and children and lengthen his life."',
  },
  {
    name: 'أبو طلحة الأنصاري', nameEn: 'Abu Talhah al-Ansari',
    nickname: 'الرامي الثبّات',
    nicknameEn: 'The Steadfast Archer',
    achievement: 'كان صوته في الصف أشد من فرقة',
    achievementEn: 'His voice in the ranks was worth a whole battalion',
    description: 'فارس الأنصار وشاعرهم وأحد رماتهم. تزوّج أم سليم أمّه بشرط إسلامه فأسلم. ظلّل النبي ﷺ بصدره يوم أُحد. قال ﷺ: "صوت أبي طلحة في الجيش خيرٌ من فئة."',
    descriptionEn: 'Cavalier, poet, and archer of the Anṣār. He married Umm Sulaym on the condition of his embracing Islam. He shielded the Prophet ﷺ with his chest at Uḥud. The Prophet ﷺ said: "Abū Ṭalḥah\'s voice in the army is better than a whole unit."',
    category: 'الأنصار',
  },
  {
    name: 'عبادة بن الصامت', nameEn: 'Ubadah ibn al-Samit',
    nickname: 'نقيب الأنصار',
    nicknameEn: 'Steward of the Anṣār',
    achievement: 'من نقباء بيعة العقبة الثانية',
    achievementEn: 'One of the stewards at the Second Pledge of ʿAqabah',
    description: 'أحد نقباء بيعة العقبة الثانية الاثني عشر. علّم أهل الصُّفّة القرآن. أول من تولى القضاء في فلسطين. روى حديث "بايعنا النبي ﷺ على السمع والطاعة."',
    descriptionEn: 'One of the twelve stewards of the Second Pledge of ʿAqabah. He taught the Qurʾān to the People of the Bench (Ahl al-Ṣuffah). The first judge in Palestine. He narrated the ḥadīth: "We pledged allegiance to the Prophet ﷺ to hear and obey."',
    category: 'الأنصار',
  },
  {
    name: 'سعد بن عبادة', nameEn: 'Sad ibn Ubadah',
    nickname: 'سيد الخزرج',
    nicknameEn: 'Chief of the Khazraj',
    achievement: 'أكرم الأنصار جوداً',
    achievementEn: 'Most generous of the Anṣār',
    description: 'سيد الخزرج وأشرف الأنصار. كان يُطعم الناس من كرمه. منافس أبي بكر في السقيفة دفاعاً عن حق الأنصار. من أبطال بدر وأحد والخندق.',
    descriptionEn: 'Chief of the Khazraj and noblest of the Anṣār. He fed the people from his generosity. He contested Abū Bakr at the Saqīfah in defense of the Anṣār\'s right. Among the heroes of Badr, Uḥud, and the Trench.',
    category: 'الأنصار',
  },
  {
    name: 'البراء بن مالك', nameEn: "al-Bara' ibn Malik",
    nickname: 'فارس المسلمين',
    nicknameEn: 'Champion of the Muslims',
    achievement: 'بطل اليمامة',
    achievementEn: 'Hero of Yamāmah',
    description: 'أخو أنس بن مالك. من أبطال المسلمين في حروب الردة وفتوح الشام. يوم اليمامة قال: يا معشر المسلمين ارموني على الترس وأدخلوني من وراء الحائط — ففعلوا فقاتل حتى فُتح.',
    descriptionEn: 'Brother of Anas ibn Mālik. Among the heroes of the Ridda wars and the conquests of the Levant. At Yamāmah he said: "O Muslims, throw me onto a shield and hurl me over the wall" — they did, and he fought until it was conquered.',
    category: 'الأنصار',
    hadith: 'قال ﷺ: "كم من أشعث أغبر ذي طمرين لو أقسم على الله لأبرّه منهم البراء"',
    hadithEn: 'The Prophet ﷺ said: "How many a dishevelled, dusty man in worn garments — if he were to swear by Allāh He would fulfil his oath — among them is al-Barāʾ."',
  },
  {
    name: 'محمد بن مسلمة', nameEn: 'Muhammad ibn Maslamah',
    nickname: 'فارس النبي ﷺ',
    nicknameEn: 'Knight of the Prophet ﷺ',
    achievement: 'قائد السرايا الخاصة',
    achievementEn: 'Commander of the Special Expeditions',
    description: 'كان النبي ﷺ يُرسله في السرايا الحساسة لثقته به. قتل كعب بن الأشرف الذي كان يؤذي المسلمين بشعره. اعتزل الفتنة الكبرى بأمر النبي ﷺ.',
    descriptionEn: 'The Prophet ﷺ sent him on sensitive expeditions due to his trust in him. He killed Kaʿb ibn al-Ashraf who was harming the Muslims with his poetry. He abstained from the great civil strife by the Prophet\'s ﷺ command.',
    category: 'الأنصار',
  },

  // ── الصحابيات ──
  {
    name: 'فاطمة الزهراء', nameEn: 'Fatimah al-Zahra',
    nickname: 'سيدة نساء العالمين',
    nicknameEn: 'Mistress of the Women of the Worlds',
    achievement: 'بضعة رسول الله ﷺ',
    achievementEn: 'The piece of the Messenger of Allāh ﷺ',
    description: 'أحبّ أبنائه ﷺ إليه. زوجة علي وأم الحسن والحسين. قالت أم المؤمنين عائشة: "ما رأيتُ أحداً أشبه برسول الله مشياً وهدياً من فاطمة." توفيت بعد أبيها بستة أشهر.',
    descriptionEn: 'The most beloved of his ﷺ children to him. Wife of ʿAlī and mother of al-Ḥasan and al-Ḥusayn. ʿĀʾishah said: "I have never seen anyone more resembling the Messenger of Allāh in gait and conduct than Fāṭimah." She passed away six months after her father.',
    category: 'الصحابيات',
    hadith: 'قال ﷺ: "فاطمة بضعة مني فمن أغضبها أغضبني"',
    hadithEn: 'The Prophet ﷺ said: "Fāṭimah is a part of me; whoever angers her angers me."',
  },
  {
    name: 'خديجة بنت خويلد', nameEn: 'Khadijah bint Khuwaylid',
    nickname: 'أم المؤمنين — أول من أسلمت',
    nicknameEn: 'Mother of the Faithful — First to Embrace Islam',
    achievement: 'أول المؤمنين رجالاً ونساءً',
    achievementEn: 'First of the believers, man or woman',
    description: 'أول من آمن بالنبي ﷺ. دعمته بمالها ونفسها في أصعب مراحل الدعوة. ولدت له أبناءه. لم يتزوج غيرها حتى وفاتها. بشّرها الله ببيت في الجنة من قصب.',
    descriptionEn: 'The first to believe in the Prophet ﷺ. She supported him with her wealth and herself in the most difficult stages of the mission. She bore all his children. He married no one else during her lifetime. Allāh gave her glad tidings of a home in Paradise of hollow pearl.',
    category: 'الصحابيات',
    hadith: 'قال ﷺ: "ما أبدلني الله خيراً منها — آمنتْ بي إذ كفر الناس"',
    hadithEn: 'The Prophet ﷺ said: "Allāh did not replace her with anyone better — she believed in me when people disbelieved."',
  },
  {
    name: 'عائشة بنت أبي بكر', nameEn: 'Aishah bint Abi Bakr',
    nickname: 'حبيبة النبي ﷺ — عالمة الإسلام',
    nicknameEn: 'Beloved of the Prophet ﷺ — Scholar of Islam',
    achievement: 'أكثر الصحابة رواية بعد الرجال',
    achievementEn: 'The most prolific female narrator of ḥadīth',
    description: 'أحبّ نساء النبي ﷺ إليه. روت أكثر من ألفين وألف حديث. كان الصحابة يسألونها عما أشكل عليهم. قال فيها الذهبي: "هي عالمة هذه الأمة حقاً."',
    descriptionEn: 'The most beloved of the Prophet\'s ﷺ wives to him. She narrated over two thousand ḥadīths. The Companions would ask her about matters that puzzled them. Al-Dhahabī said: "She is truly the female scholar of this nation."',
    category: 'الصحابيات',
    hadith: 'قال ﷺ: "خذوا شطر دينكم عن هذه الحُميراء"',
    hadithEn: 'The Prophet ﷺ said: "Take half your religion from this woman — the Ḥumayra."',
  },
  {
    name: 'أسماء بنت أبي بكر', nameEn: "Asma' bint Abi Bakr",
    nickname: 'ذات النطاقين',
    nicknameEn: 'Dhāt al-Niṭāqayn — She of the Two Belts',
    achievement: 'صاحبة الهجرة',
    achievementEn: 'Companion of the Hijrah',
    description: 'كانت تحمل الزاد للنبي ﷺ وأبيها في الغار ليلاً. شقّت نطاقها لتربط به أمتعة الهجرة فلُقّبت بذات النطاقين. عاشت مئة سنة ولم يسقط لها سن.',
    descriptionEn: 'She carried provisions to the Prophet ﷺ and her father in the cave at night. She tore her belt to tie the Hijrah supplies, earning the title "She of the Two Belts." She lived a hundred years without losing a single tooth.',
    category: 'الصحابيات',
    hadith: 'قال لها ﷺ: "لا تُوكي فيُوكَى عليكِ"',
    hadithEn: 'The Prophet ﷺ said to her: "Do not hoard, lest it be hoarded from you."',
  },
  {
    name: 'سمية بنت خباط', nameEn: 'Sumayyah bint Khayyat',
    nickname: 'أول شهيدة في الإسلام',
    nicknameEn: 'First Martyr in Islam',
    achievement: 'أول من استُشهد في الإسلام',
    achievementEn: 'First to shed blood for Islam',
    description: 'أمّ عمار بن ياسر. عُذِّبت في الرمضاء حتى طعنها أبو جهل بحربته. أول من سُفك دمه في الإسلام. مرّ بها النبي ﷺ وهي تُعذَّب فقال: "صبراً آل ياسر موعدكم الجنة."',
    descriptionEn: 'Mother of ʿAmmār ibn Yāsir. She was tortured on the scorching sand until Abū Jahl speared her. The first blood to be shed in Islam. The Prophet ﷺ passed by her while she was being tortured and said: "Be patient, O family of Yāsir — your appointment is Paradise."',
    category: 'الصحابيات',
    hadith: 'قال ﷺ: "صبراً آل ياسر فإن موعدكم الجنة"',
    hadithEn: 'The Prophet ﷺ said: "Be patient, O family of Yāsir — for your appointment is Paradise."',
  },
  {
    name: 'أم سلمة هند المخزومية', nameEn: 'Umm Salamah Hind al-Makhzumiyyah',
    nickname: 'أم المؤمنين الفقيهة',
    nicknameEn: 'The Jurisprudent Mother of the Faithful',
    achievement: 'آخر أمهات المؤمنين وفاةً',
    achievementEn: 'Last of the Mothers of the Faithful to die',
    description: 'هاجرت إلى الحبشة ثم المدينة. تزوّجها النبي ﷺ بعد وفاة أبي سلمة. كانت من أفقه أمهات المؤمنين وأكثرهن رواية. تُوفّيت آخر أمهات المؤمنين.',
    descriptionEn: 'She emigrated to Abyssinia then Madinah. The Prophet ﷺ married her after Abū Salamah\'s death. She was among the most jurisprudentially knowledgeable and prolific in narration of the Mothers of the Faithful. She was the last of them to die.',
    category: 'الصحابيات',
  },
  {
    name: 'أم عمارة نسيبة بنت كعب', nameEn: 'Umm Ammarah Nusaybah bint Kab',
    nickname: 'بطلة أحد',
    nicknameEn: 'Heroine of Uḥud',
    achievement: 'حاربت دفاعاً عن النبي ﷺ',
    achievementEn: 'She fought in defense of the Prophet ﷺ',
    description: 'حملت السيف والترس في أحد ووقفت تدافع عن النبي ﷺ حين انكشف الصحابة. جُرحت اثنتي عشرة جرحة. قال لها النبي ﷺ: "ما التفتُّ يميناً ولا شمالاً إلا رأيتُكِ تقاتلين دوني."',
    descriptionEn: 'She bore sword and shield at Uḥud and stood defending the Prophet ﷺ when the Companions wavered. She received twelve wounds. The Prophet ﷺ said to her: "I turned neither right nor left without seeing you fighting in my defense."',
    category: 'الصحابيات',
  },
  {
    name: 'حفصة بنت عمر', nameEn: 'Hafsah bint Umar',
    nickname: 'أم المؤمنين — حافظة القرآن',
    nicknameEn: 'Mother of the Faithful — Guardian of the Qurʾān',
    achievement: 'أُودع عندها المصحف الأول',
    achievementEn: 'The first muṣḥaf was entrusted to her',
    description: 'ابنة عمر بن الخطاب وزوج النبي ﷺ. أُودع عندها المصحف الذي جمعه أبو بكر أمانةً. كانت صوّامة قوّامة. روى عنها عدد من الصحابة.',
    descriptionEn: 'Daughter of ʿUmar ibn al-Khaṭṭāb and wife of the Prophet ﷺ. The muṣḥaf compiled by Abū Bakr was entrusted to her as a trust. She was assiduous in fasting and night prayer. A number of Companions narrated from her.',
    category: 'الصحابيات',
  },
  {
    name: 'صفية بنت عبد المطلب', nameEn: 'Safiyyah bint Abd al-Muttalib',
    nickname: 'عمّة النبي ﷺ',
    nicknameEn: 'Paternal Aunt of the Prophet ﷺ',
    achievement: 'بطلة حصار الخندق',
    achievementEn: 'Heroine of the Siege of the Trench',
    description: 'عمّة النبي ﷺ وأخت حمزة. طعنت رجلاً من اليهود كان يتجسس على حصن النساء في الخندق بعمود فقتلته. قالت للنبي ﷺ: "ادعُ لي بالشهادة."',
    descriptionEn: 'Paternal aunt of the Prophet ﷺ and sister of Ḥamzah. During the Trench she struck and killed a Jewish spy scouting the women\'s fortress with a tent pole. She asked the Prophet ﷺ: "Pray for martyrdom for me."',
    category: 'الصحابيات',
  },
  {
    name: 'أم الفضل لبابة', nameEn: 'Umm al-Fadl Lubabah',
    nickname: 'ثاني من أسلمن بعد خديجة',
    nicknameEn: 'Second Woman to Embrace Islam after Khadījah',
    achievement: 'أخت ميمونة ووالدة ابن عباس',
    achievementEn: 'Sister of Maymūnah and mother of Ibn ʿAbbās',
    description: 'زوجة العباس بن عبد المطلب. من أوائل من أسلمن في مكة. والدة عبد الله بن عباس حبر الأمة. كانت تُعلّم ابنها القرآن والسنة منذ صغره.',
    descriptionEn: 'Wife of al-ʿAbbās ibn ʿAbd al-Muṭṭalib. Among the earliest women to embrace Islam in Makkah. Mother of ʿAbdullāh ibn ʿAbbās, the scholar of the nation. She taught her son the Qurʾān and the Sunnah from his youth.',
    category: 'الصحابيات',
  },

  // ── العلماء والقرّاء ──
  {
    name: 'عبد الله بن مسعود', nameEn: 'Abdullah ibn Masud',
    nickname: 'أقرب الناس هدياً بالنبي ﷺ',
    nicknameEn: 'Closest to the Prophet\'s ﷺ Way',
    achievement: 'مرجع الكوفة في الفقه والقرآن',
    achievementEn: 'Reference of Kūfah in jurisprudence and Qurʾān',
    description: 'أول من جهر بتلاوة القرآن في مكة أمام المشركين. من أعلم الصحابة بالقرآن وأقربهم هدياً. قال ﷺ: "من أراد أن يسمع القرآن غضاً كما أُنزل فليسمعه من ابن أم عبد."',
    descriptionEn: 'First to recite the Qurʾān aloud before the polytheists in Makkah. Among the most knowledgeable of the Companions in the Qurʾān and closest in conduct. The Prophet ﷺ said: "Whoever wishes to hear the Qurʾān fresh as revealed, let him hear it from Ibn Umm ʿAbd."',
    category: 'العلماء والقرّاء',
    hadith: 'قال ﷺ: "استقرئوا القرآن من أربعة: من عبد الله بن مسعود..."',
    hadithEn: 'The Prophet ﷺ said: "Receive the Qurʾān from four: from ʿAbdullāh ibn Masʿūd..."',
  },
  {
    name: 'عبد الله بن عباس', nameEn: 'Abdullah ibn Abbas',
    nickname: 'حبر الأمة — البحر',
    nicknameEn: 'Ḥibr al-Ummah — The Ocean',
    achievement: 'أعلم الصحابة بالتفسير',
    achievementEn: 'Most knowledgeable Companion in Qurʾānic exegesis',
    description: 'ابن عم النبي ﷺ الذي دعا له بقوله: "اللهم فقّهه في الدين وعلّمه التأويل." كان له حلقة علمية يؤمّها الناس من كل مكان. سُمّي بالبحر لغزارة علمه.',
    descriptionEn: 'Cousin of the Prophet ﷺ, for whom he prayed: "O Allāh, grant him deep understanding of the religion and teach him interpretation." He held a scholarly circle attended by people from everywhere. He was called "the Ocean" for the vastness of his knowledge.',
    category: 'العلماء والقرّاء',
    hadith: 'قال ﷺ: "اللهم فقّهه في الدين وعلّمه التأويل"',
    hadithEn: 'The Prophet ﷺ said: "O Allāh, grant him deep understanding of the religion and teach him interpretation."',
  },
  {
    name: 'عبد الله بن عمر', nameEn: 'Abdullah ibn Umar',
    nickname: 'من أكثر الصحابة اتباعاً للسنة',
    nicknameEn: 'Most Diligent in Following the Sunnah',
    achievement: 'روى أكثر من ألفين وستمئة حديث',
    achievementEn: 'Narrated over two thousand six hundred ḥadīths',
    description: 'ابن عمر بن الخطاب. كان شديد الاتباع للسنة حتى كان يتتبع آثار أقدام النبي ﷺ. روى كثيراً من الأحاديث. كان يمشي على منهج بالغ الدقة في التحري.',
    descriptionEn: 'Son of ʿUmar ibn al-Khaṭṭāb. He followed the Sunnah so meticulously that he would trace the Prophet\'s ﷺ very footsteps. He narrated many ḥadīths and walked an extremely precise path of thoroughness and verification.',
    category: 'العلماء والقرّاء',
  },
  {
    name: 'أبو هريرة', nameEn: 'Abu Hurayrah',
    nickname: 'أكثر الصحابة رواية للحديث',
    nicknameEn: 'Most Prolific Narrator of Ḥadīth',
    achievement: 'روى أكثر من خمسة آلاف حديث',
    achievementEn: 'Narrated over five thousand ḥadīths',
    description: 'أسلم وصحب النبي ﷺ نحو أربع سنوات فروى أكثر من خمسة آلاف حديث. دعا له النبي ﷺ أن لا ينسى ما يُحدّثه فكان لا ينسى. كُنّي بصديقه هرٍّ صغير.',
    descriptionEn: 'He embraced Islam and accompanied the Prophet ﷺ for about four years, narrating over five thousand ḥadīths. The Prophet ﷺ prayed for him never to forget what he was told, and he never forgot. He was nicknamed after his kitten friend.',
    category: 'العلماء والقرّاء',
    hadith: 'قال ﷺ: "اللهم لا يُنسَ ما حدثتُه"',
    hadithEn: 'The Prophet ﷺ said: "O Allāh, let him not forget what I have told him."',
  },
  {
    name: 'زيد بن ثابت', nameEn: 'Zayd ibn Thabit',
    nickname: 'كاتب الوحي',
    nicknameEn: 'Scribe of Revelation',
    achievement: 'جامع القرآن بأمر أبي بكر',
    achievementEn: 'Compiler of the Qurʾān at Abū Bakr\'s command',
    description: 'كان يكتب الوحي للنبي ﷺ. أمره أبو بكر بجمع القرآن بعد وفاة الحفّاظ في اليمامة. تعلّم العبرانية في سبعة عشر يوماً بأمر النبي ﷺ. مرجع المدينة في الفرائض.',
    descriptionEn: 'He wrote the revelation for the Prophet ﷺ. Abū Bakr commanded him to compile the Qurʾān after the ḥuffāẓ fell at Yamāmah. He learned Hebrew in seventeen days at the Prophet\'s ﷺ command. He was Madinah\'s reference in inheritance law.',
    category: 'العلماء والقرّاء',
    hadith: 'قال ﷺ: "أفرضكم زيد بن ثابت"',
    hadithEn: 'The Prophet ﷺ said: "The most knowledgeable of you in inheritance law is Zayd ibn Thābit."',
  },
  {
    name: 'أبو موسى الأشعري', nameEn: 'Abu Musa al-Ashari',
    nickname: 'صوت داود في هذه الأمة',
    nicknameEn: 'The Voice of Dāwūd in this Nation',
    achievement: 'أحد عمّال النبي ﷺ على اليمن',
    achievementEn: 'One of the Prophet\'s ﷺ governors over Yemen',
    description: 'من القادمين من اليمن. بعثه النبي ﷺ مع معاذ إلى اليمن. كان حسن الصوت بالقرآن حتى قال له النبي ﷺ: "لقد أُوتيتَ مزماراً من مزامير آل داود."',
    descriptionEn: 'Among those who came from Yemen. The Prophet ﷺ sent him with Muʿādh to Yemen. He had a beautiful voice in reciting the Qurʾān; the Prophet ﷺ said to him: "You have been given a flute from the flutes of the family of Dāwūd."',
    category: 'العلماء والقرّاء',
    hadith: 'قال ﷺ: "لقد أُوتيتَ مزماراً من مزامير آل داود"',
    hadithEn: 'The Prophet ﷺ said: "You have been given a flute from the flutes of the family of Dāwūd."',
  },

  // ── الفرسان والقادة ──
  {
    name: 'خالد بن الوليد', nameEn: 'Khalid ibn al-Walid',
    nickname: 'سيف الله المسلول',
    nicknameEn: 'The Drawn Sword of Allāh',
    achievement: 'لم يُهزم في معركة واحدة طوال حياته',
    achievementEn: 'Never lost a single battle in his life',
    description: 'أعظم قائد عسكري في تاريخ الإسلام. أسلم بعد الحديبية. قاد فتوح الشام والعراق. خاض مئة وثمانين موقعة لم يُهزم في واحدة. قال عند موته: "وا أسفاه أن أموت على فراشي."',
    descriptionEn: 'The greatest military commander in Islamic history. He embraced Islam after Ḥudaybiyyah. He led the conquests of the Levant and Iraq. He fought 180 engagements without losing one. At his deathbed he said: "How sorrowful — to die in my bed."',
    category: 'الفرسان والقادة',
    hadith: 'قال ﷺ: "خالد سيف من سيوف الله سلّه الله على المشركين"',
    hadithEn: 'The Prophet ﷺ said: "Khālid is a sword from the swords of Allāh that He has drawn against the polytheists."',
  },
  {
    name: 'عمرو بن العاص', nameEn: 'Amr ibn al-As',
    nickname: 'فاتح مصر',
    nicknameEn: 'Conqueror of Egypt',
    achievement: 'فتح مصر بأربعة آلاف مقاتل',
    achievementEn: 'Conquered Egypt with four thousand fighters',
    description: 'من أذكى الصحابة استراتيجياً. أسلم قبيل الفتح. قاد فتح مصر بأربعة آلاف مقاتل. قال فيه معاوية: "ما رأيتُ رجلاً أحسن رأياً في أمر الحرب من عمرو."',
    descriptionEn: 'Among the most strategically brilliant of the Companions. He embraced Islam just before the Conquest. He led the conquest of Egypt with four thousand fighters. Muʿāwiyah said: "I have never seen a man with better judgment in war than ʿAmr."',
    category: 'الفرسان والقادة',
  },
  {
    name: 'عبد الله بن رواحة', nameEn: 'Abdullah ibn Rawahah',
    nickname: 'شاعر النبي ﷺ',
    nicknameEn: 'Poet of the Prophet ﷺ',
    achievement: 'أحد قادة مؤتة الثلاثة',
    achievementEn: 'One of the three commanders at Muʾtah',
    description: 'شاعر النبي ﷺ كان ينشد شعره ضد المشركين. أحد قادة غزوة مؤتة الثلاثة. استُشهد في مؤتة وقال قبل الاستشهاد أبياتاً تفيض بالشوق للشهادة.',
    descriptionEn: 'Poet of the Prophet ﷺ who chanted against the polytheists. One of the three commanders at the Battle of Muʾtah. He was martyred there and recited verses brimming with longing for martyrdom before his death.',
    category: 'الفرسان والقادة',
  },
  {
    name: 'المقداد بن الأسود', nameEn: 'al-Miqdad ibn al-Aswad',
    nickname: 'أول فارس في الإسلام',
    nicknameEn: 'First Cavalier in Islam',
    achievement: 'أول من قاتل فارساً في الإسلام',
    achievementEn: 'First to fight as a cavalier in Islam',
    description: 'أول فارس في الإسلام. يوم بدر قال للنبي ﷺ وهو يستشير: "لن نقول لك كما قالت بنو إسرائيل لموسى: اذهب أنت وربك فقاتلا، بل نقاتل عن يمينك وعن شمالك." فسُرّ النبي ﷺ.',
    descriptionEn: 'First cavalier in Islam. At Badr he said to the Prophet ﷺ consulting them: "We will not say as the Children of Israel said to Moses: \'Go, you and your Lord, and fight\' — rather, we will fight at your right and at your left." The Prophet ﷺ was delighted.',
    category: 'الفرسان والقادة',
  },
  {
    name: 'عكرمة بن أبي جهل', nameEn: 'Ikrimah ibn Abi Jahl',
    nickname: 'ابن فرعون هذه الأمة',
    nicknameEn: 'Son of the Pharaoh of this Nation',
    achievement: 'من أبطال فتوح الشام',
    achievementEn: 'Among the heroes of the conquests of the Levant',
    description: 'ابن أبي جهل عدوّ الإسلام. أسلم يوم الفتح وأصبح من أشدّ المقاتلين دفاعاً عن الإسلام. استُشهد في معركة اليرموك. قال: "كنتُ أقاتل على الباطل فأقاتل اليوم على الحق."',
    descriptionEn: 'Son of Abū Jahl, the enemy of Islam. He embraced Islam on the Day of Conquest and became among the fiercest fighters in defense of Islam. Martyred at the Battle of Yarmouk. He said: "I used to fight for falsehood; today I fight for truth."',
    category: 'الفرسان والقادة',
  },
  {
    name: 'عبد الله بن جحش', nameEn: 'Abdullah ibn Jahsh',
    nickname: 'قائد أول سرية',
    nicknameEn: 'Commander of the First Expedition',
    achievement: 'قاد أول سرية في الإسلام',
    achievementEn: 'Led the first military expedition in Islam',
    description: 'ابن عمة النبي ﷺ. أرسله النبي ﷺ على رأس أول سرية في الإسلام. دعا الله قبل أحد بالشهادة فاستُشهد فيها. دُفن هو وحمزة في قبر واحد.',
    descriptionEn: 'Son of the Prophet\'s ﷺ paternal aunt. The Prophet ﷺ sent him at the head of the first military expedition in Islam. He prayed for martyrdom before Uḥud and was martyred there. He and Ḥamzah were buried in one grave.',
    category: 'الفرسان والقادة',
  },
];

const ALL_CATEGORIES = ['الكل', ...Object.keys(CATEGORY_COLORS)];

/* ─── Center Modal ─── */
const CompanionModal: React.FC<{ companion: Companion; onClose: () => void; isEn: boolean }> = ({ companion, onClose, isEn }) => {
  const color = CATEGORY_COLORS[companion.category] || '#C9A84C';
  const categoryLabel = isEn ? CATEGORY_LABELS_EN[companion.category] : companion.category;
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
        dir={isEn ? 'ltr' : 'rtl'}
      >
        {/* Top accent bar */}
        <div className="h-1 rounded-t-3xl" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{
            [isEn ? 'right' : 'left']: '1rem',
            background: 'rgba(255,255,255,0.07)',
            color: '#d2d3d5',
          }}
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
            {categoryLabel}
          </span>

          {/* Name */}
          <h2 className="font-noto font-bold mb-1" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: '#C9A84C' }}>
            {isEn ? companion.nameEn : companion.name}
          </h2>
          <p className="font-kufi mb-5" style={{ fontSize: '0.8rem', color }}>
            {isEn ? companion.nicknameEn : companion.nickname}
          </p>

          {/* Achievement */}
          <div
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 mb-5"
            style={{ background: `${color}0e`, border: `1px solid ${color}20` }}
          >
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
            <p className="font-kufi" style={{ fontSize: '0.82rem', color }}>
              {isEn ? companion.achievementEn : companion.achievement}
            </p>
          </div>

          {/* Description */}
          <p
            className="font-noto mb-5"
            style={{ fontSize: '0.92rem', lineHeight: 2, color: '#f2f3f3' }}
          >
            {isEn ? companion.descriptionEn : companion.description}
          </p>

          {/* Hadith */}
          {companion.hadith && (
            <div
              className="rounded-2xl p-4"
              style={{ background: `${color}08`, border: `1px solid ${color}20` }}
            >
              <p className="font-noto" dir="rtl" style={{ fontSize: '0.88rem', color, lineHeight: 1.95 }}>
                {companion.hadith}
              </p>
              {isEn && companion.hadithEn && (
                <p className="font-kufi mt-2 text-white/50" dir="ltr" style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>
                  {companion.hadithEn}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const CompanionsPage: React.FC = () => {
  const router = useRouter();
  const { isEn } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(null);

  const filtered = useMemo(() => {
    return COMPANIONS.filter(c => {
      const matchCat = activeCategory === 'الكل' || c.category === activeCategory;
      const q = searchQuery.trim();
      const matchSearch = !q || (isEn
        ? (c.nameEn.toLowerCase().includes(q.toLowerCase()) || c.nicknameEn.toLowerCase().includes(q.toLowerCase()) || c.descriptionEn.toLowerCase().includes(q.toLowerCase()))
        : (c.name.includes(q) || c.nickname.includes(q) || c.description.includes(q)));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery, isEn]);

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share Button */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'The Noble Companions' : 'الصحابة الكرام'} accentColor="#C9A84C" />
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
      <div className="relative z-10 px-6 pt-6 pb-4" style={{ [isEn ? 'paddingLeft' : 'paddingRight']: '5rem' }}>
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs text-islamic-gold/50"
        >
          <button onClick={() => router.push('/')} className="flex items-center gap-1 hover:text-islamic-gold transition-colors">
            <Home size={12} /><span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </button>
          <ChevronLeft size={10} className={isEn ? '' : 'rotate-180'} />
          <span className="text-islamic-gold/80">{isEn ? 'Noble Companions' : 'الصحابة الكرام'}</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-8 pt-8">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-noto font-bold mb-3"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', color: '#C9A84C', textShadow: '0 0 30px #52482a' }}
        >
          {isEn ? 'The Noble Companions' : 'الصحابة الكرام'}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-noto text-white/50 max-w-lg mx-auto"
          style={{ fontSize: '1rem', lineHeight: 1.9 }}
        >
          {isEn
            ? `${COMPANIONS.length} Companions — the finest of humanity`
            : `${COMPANIONS.length} صحابياً وصحابية من خيرة البشر`}
        </motion.p>

        {/* Verse */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-noto text-islamic-gold/55 mt-2"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
          dir="rtl"
        >
          ﴿رَّضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ﴾
        </motion.p>
        {isEn && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="font-kufi text-white/30 mt-1"
            style={{ fontSize: '0.8rem' }}
          >
            "Allāh is pleased with them and they are pleased with Him." — Al-Tawbah: 100
          </motion.p>
        )}
        {!isEn && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="font-noto text-white/30 mt-1"
            style={{ fontSize: '0.82rem' }}
          >
            — التوبة: 100
          </motion.p>
        )}

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
          <Search
            size={14}
            className={`absolute ${isEn ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-islamic-gold/40`}
          />
          <input
            type="text"
            placeholder={isEn ? 'Search companions...' : 'ابحث عن صحابي...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full font-kufi text-sm text-white/80 py-2.5 rounded-full outline-none"
            style={{
              paddingRight: isEn ? '2rem' : '2.25rem',
              paddingLeft: isEn ? '2.25rem' : '2rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(201,168,76,0.2)',
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

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {ALL_CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            const color = cat === 'الكل' ? '#C9A84C' : CATEGORY_COLORS[cat];
            const label = cat === 'الكل'
              ? (isEn ? 'All' : 'الكل')
              : (isEn ? CATEGORY_LABELS_EN[cat] : cat);
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileTap={{ scale: 0.95 }}
                className="font-kufi text-xs px-3 py-1.5 rounded-full transition-all"
                style={{
                  background: isActive ? `${color}22` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? `${color}55` : 'rgba(255,255,255,0.08)'}`,
                  color: isActive ? color : '#74777d',
                }}
              >
                {label}
                {cat !== 'الكل' && (
                  <span className={`${isEn ? 'ml-1.5' : 'mr-1.5'} opacity-60`}>
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
          {isEn
            ? `Showing ${filtered.length} companion${filtered.length !== 1 ? 's' : ''} — tap any card for details`
            : `يُعرض ${filtered.length} صحابي — اضغط على أي بطاقة لعرض التفاصيل`}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
        <AnimatePresence mode="popLayout">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((companion, index) => {
              const color = CATEGORY_COLORS[companion.category] || '#C9A84C';
              const categoryLabel = isEn ? CATEGORY_LABELS_EN[companion.category] : companion.category;
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
                      {categoryLabel}
                    </span>

                    {/* Name */}
                    <h3 className="font-noto font-bold mb-0.5 line-clamp-1" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#C9A84C' }}>
                      {isEn ? companion.nameEn : companion.name}
                    </h3>
                    <p className="font-kufi mb-3 line-clamp-2" style={{ fontSize: '0.88rem', color, lineHeight: 1.5 }}>
                      {isEn ? companion.nicknameEn : companion.nickname}
                    </p>

                    {/* Achievement */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
                      <p className="font-kufi line-clamp-1" style={{ fontSize: '0.9rem', color }}>
                        {isEn ? companion.achievementEn : companion.achievement}
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
                      {isEn ? companion.descriptionEn : companion.description}
                    </p>

                    {/* Tap hint */}
                    <p className="font-kufi mt-3 text-center" style={{ fontSize: '0.85rem', color }}>
                      {isEn ? 'Tap for full details ›' : 'اضغط لعرض الكامل ›'}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-noto text-white/30 text-lg">
              {isEn ? 'No matching results' : 'لا نتائج مطابقة للبحث'}
            </p>
          </div>
        )}
      </div>

      {/* Center Modal */}
      <AnimatePresence>
        {selectedCompanion && (
          <CompanionModal companion={selectedCompanion} onClose={() => setSelectedCompanion(null)} isEn={isEn} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanionsPage;
