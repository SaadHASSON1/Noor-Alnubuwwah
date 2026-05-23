'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, Search, X, ChevronDown } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface Battle {
  id: number;
  name: string;
  nameEn: string;
  year: string;
  muslimForce: string;
  enemyForce: string;
  enemyName: string;
  enemyNameEn: string;
  result: 'نصر' | 'هزيمة جزئية' | 'بدون قتال';
  significance: string;
  significanceEn: string;
  details: string;
  detailsEn: string;
  hadith?: string;
  hadithEn?: string;
  martyrs?: string;
  martyrsEn?: string;
  casualties?: string;
  casualtiesEn?: string;
}

const RESULT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  'نصر': { bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.35)', text: '#34D399' },
  'هزيمة جزئية': { bg: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.35)', text: '#FBBF24' },
  'بدون قتال': { bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.35)', text: '#60A5FA' },
};

const RESULT_LABELS_EN: Record<string, string> = {
  'نصر': 'Victory',
  'هزيمة جزئية': 'Partial Setback',
  'بدون قتال': 'No Battle',
};

const BATTLES: Battle[] = [
  {
    id: 1,
    name: 'غزوة بدر الكبرى',
    nameEn: 'Battle of Badr',
    year: '2 هـ / 624م',
    muslimForce: '313',
    enemyForce: '950 - 1000',
    enemyName: 'قريش',
    enemyNameEn: 'Quraysh',
    result: 'نصر',
    significance: 'أول غزوة كبرى في الإسلام — يوم الفرقان',
    significanceEn: 'First great battle in Islam — the Day of Criterion',
    details: 'أول المعارك الكبرى في تاريخ الإسلام. خرج المسلمون ابتداءً لاعتراض قافلة قريش، فتحوّل الأمر إلى معركة فاصلة. نصر الله فيها المسلمين بأعداد قليلة على جيش قريش المتكبّر. سُمّيت يوم الفرقان لأن الله فرّق فيها بين الحق والباطل.',
    detailsEn: 'The first major battle in Islamic history. The Muslims initially set out to intercept a Quraysh trade caravan, but it became a decisive engagement. Allāh granted the outnumbered Muslims victory over the arrogant army of Quraysh. It was called the Day of Criterion because Allāh distinguished truth from falsehood.',
    hadith: '"هذا جبريل آخذ برأس فرسه عليه أداة الحرب" — رواه البخاري',
    hadithEn: '"That is Jibrīl holding the head of his horse, equipped for battle." — Narrated by al-Bukhārī',
    martyrs: '14 شهيداً',
    martyrsEn: '14 martyrs',
    casualties: '70 قتيلاً و70 أسيراً من المشركين',
    casualtiesEn: '70 killed and 70 taken prisoner from the polytheists',
  },
  {
    id: 2,
    name: 'غزوة أُحد',
    nameEn: 'Battle of Uḥud',
    year: '3 هـ / 625م',
    muslimForce: '700',
    enemyForce: '3000',
    enemyName: 'قريش',
    enemyNameEn: 'Quraysh',
    result: 'هزيمة جزئية',
    significance: 'درس في طاعة القيادة وعدم الطمع في الغنيمة',
    significanceEn: 'A lesson in obeying leadership and not being greedy for spoils',
    details: 'خرجت قريش بثلاثة آلاف مقاتل انتقاماً لبدر. أمر النبي ﷺ الرماة بالبقاء على الجبل مهما كان، فلما ظنّوا أن المعركة قد حُسمت نزل بعضهم طمعاً في الغنيمة، فانقلب الميزان وجُرح النبي ﷺ. الدرس الأعظم: الطاعة وعدم مخالفة أوامر القائد.',
    detailsEn: 'Quraysh marched with three thousand fighters in revenge for Badr. The Prophet ﷺ ordered the archers to remain on the hill no matter what. When some thought the battle was won they descended seeking spoils — the tide turned and the Prophet ﷺ was wounded. The greatest lesson: obedience and never disobeying the commander\'s orders.',
    martyrs: '70 شهيداً بينهم حمزة بن عبد المطلب سيد الشهداء',
    martyrsEn: '70 martyrs, among them Ḥamzah ibn ʿAbd al-Muṭṭalib, Master of Martyrs',
  },
  {
    id: 3,
    name: 'غزوة الخندق (الأحزاب)',
    nameEn: 'Battle of the Trench (Al-Aḥzāb)',
    year: '5 هـ / 627م',
    muslimForce: '3000',
    enemyForce: '10,000',
    enemyName: 'الأحزاب المتحالفة',
    enemyNameEn: 'The Allied Confederates',
    result: 'نصر',
    significance: 'حصار فاشل — انسحاب الأحزاب بعد شهر من الحصار',
    significanceEn: 'Failed siege — the confederates withdrew after a month-long blockade',
    details: 'تحالفت قبائل الأحزاب لاستئصال المسلمين نهائياً. اقترح سلمان الفارسي حفر الخندق فكان حاجزاً منيعاً. أرسل الله ريحاً وجنوداً لا تُرى فأصابت الأحزاب بالرعب والفوضى وانسحبوا. بعدها قال النبي ﷺ: "الآن نغزوهم ولا يغزوننا."',
    detailsEn: 'The confederate tribes allied to annihilate the Muslims completely. Salmān al-Fārisī suggested digging a trench, which proved an impregnable barrier. Allāh sent a wind and unseen forces that struck the confederates with terror and chaos, and they withdrew. Afterwards the Prophet ﷺ said: "Now we will march against them; they will not march against us."',
  },
  {
    id: 4,
    name: 'غزوة خيبر',
    nameEn: 'Battle of Khaybar',
    year: '7 هـ / 628م',
    muslimForce: '1400 - 1600',
    enemyForce: 'حصون خيبر',
    enemyName: 'يهود خيبر',
    enemyNameEn: 'Jews of Khaybar',
    result: 'نصر',
    significance: 'فتح حصون خيبر — بداية الجزية والمصالحة',
    significanceEn: 'Conquest of Khaybar\'s fortresses — beginning of the poll tax and settlement',
    details: 'خيبر كانت مركز القوة اليهودية المسلّحة التي تدبّر المؤامرات ضد المسلمين. فتح المسلمون حصونها واحداً تلو الآخر. أعطى النبي ﷺ الراية لعلي بن أبي طالب الذي فتح الحصن الأخير، فأطعن باب الحصن ترساً له. أُعقدت بعدها معاهدة الجزية مع اليهود.',
    detailsEn: 'Khaybar was the armed centre of Jewish power that plotted conspiracies against the Muslims. The Muslims captured its fortresses one by one. The Prophet ﷺ gave the banner to ʿAlī ibn Abī Ṭālib who captured the final fortress, using the fortress door as a shield. Afterwards a treaty was concluded with the Jews under jizya.',
    hadith: '"لأُعطيَنَّ الراية غداً رجلاً يحب الله ورسوله ويحبه الله ورسوله"',
    hadithEn: '"I will surely give the banner tomorrow to a man who loves Allāh and His Messenger and whom Allāh and His Messenger love."',
  },
  {
    id: 5,
    name: 'غزوة مؤتة',
    nameEn: 'Battle of Muʾtah',
    year: '8 هـ / 629م',
    muslimForce: '3000',
    enemyForce: '200,000',
    enemyName: 'الروم وحلفاؤهم',
    enemyNameEn: 'Byzantines and Their Allies',
    result: 'هزيمة جزئية',
    significance: 'أول مواجهة مع الروم — استشهاد القادة الثلاثة',
    significanceEn: 'First confrontation with Byzantium — martyrdom of the three commanders',
    details: 'أرسل النبي ﷺ جيشاً من ثلاثة آلاف لمواجهة جيش روماني هائل. استُشهد الأمراء الثلاثة بالتتابع: زيد بن حارثة، ثم جعفر بن أبي طالب الذي قاتل حتى قُطعت يداه فحمل الراية بصدره، ثم عبد الله بن رواحة. فتولّى خالد بن الوليد القيادة وانسحب بالجيش بكفاءة فائقة.',
    detailsEn: 'The Prophet ﷺ sent an army of three thousand to face a massive Byzantine force. The three commanders were martyred in succession: Zayd ibn Ḥārithah, then Jaʿfar ibn Abī Ṭālib who fought until both arms were severed and held the banner with his chest, then ʿAbdullāh ibn Rawāḥah. Khālid ibn al-Walīd then took command and withdrew the army with exceptional skill.',
    martyrs: 'الأمراء الثلاثة: زيد بن حارثة، جعفر بن أبي طالب، عبد الله بن رواحة',
    martyrsEn: 'The three commanders: Zayd ibn Ḥārithah, Jaʿfar ibn Abī Ṭālib, ʿAbdullāh ibn Rawāḥah',
  },
  {
    id: 6,
    name: 'فتح مكة المكرمة',
    nameEn: 'Conquest of Makkah',
    year: '8 هـ / 630م',
    muslimForce: '10,000',
    enemyForce: 'مكة المكرمة',
    enemyName: 'قريش',
    enemyNameEn: 'Quraysh',
    result: 'نصر',
    significance: 'أعظم فتح في الإسلام — العفو العام عن أعداء الله',
    significanceEn: 'The greatest conquest in Islam — the general amnesty for the enemies of Allāh',
    details: 'دخل النبي ﷺ مكة بعشرة آلاف صحابي دون إراقة دماء تقريباً. وقف على باب الكعبة وقال للمكيين الذين آذوه سنواتٍ: "ما تظنون أني فاعل بكم؟" قالوا: أخٌ كريم وابن أخ كريم. فقال ﷺ: "اذهبوا فأنتم الطلقاء." وطاف بالكعبة وحطّم الأصنام وهو يتلو: ﴿وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ﴾.',
    detailsEn: 'The Prophet ﷺ entered Makkah with ten thousand Companions with virtually no bloodshed. He stood at the door of the Kaʿbah and said to the Makkans who had persecuted him for years: "What do you think I will do to you?" They said: "A noble brother and son of a noble brother." He said ﷺ: "Go, for you are the freed ones." He circumambulated the Kaʿbah and smashed the idols while reciting: ﴿Truth has come and falsehood has departed﴾.',
    hadith: '"اذهبوا فأنتم الطلقاء"',
    hadithEn: '"Go, for you are the freed ones."',
    casualties: 'تحطيم 360 صنماً حول الكعبة',
    casualtiesEn: '360 idols around the Kaʿbah destroyed',
  },
  {
    id: 7,
    name: 'غزوة حنين',
    nameEn: 'Battle of Ḥunayn',
    year: '8 هـ / 630م',
    muslimForce: '12,000',
    enemyForce: '~20,000',
    enemyName: 'هوازن وثقيف',
    enemyNameEn: 'Hawāzin and Thaqīf',
    result: 'نصر',
    significance: 'نصر بعد انكشاف أوّلي — درس في التواضع وعدم الاغترار بالعدد',
    significanceEn: 'Victory after an initial rout — a lesson in humility and not being deceived by numbers',
    details: 'خرج المسلمون بعد فتح مكة بعدد كبير لم يروا مثله قط. ففاجأتهم قبائل هوازن وثقيف بكمين في الوادي فانكشف المسلمون في البداية. ثبت النبي ﷺ على بغلته وصاح: "أنا النبي لا كذب أنا ابن عبد المطلب." فثبت معه الصحابة وانقلبت الموازين.',
    detailsEn: 'The Muslims marched after the Conquest of Makkah with a force they had never seen the like of. The tribes of Hawāzin and Thaqīf ambushed them in the valley and the Muslims were initially routed. The Prophet ﷺ held firm on his mule and called out: "I am the Prophet — no lie! I am the son of ʿAbd al-Muṭṭalib!" The Companions rallied around him and the tide turned.',
    casualties: 'غنائم: 6000 أسير، 24,000 ناقة، 40,000 شاة',
    casualtiesEn: 'Spoils: 6,000 captives, 24,000 camels, 40,000 sheep',
  },
  {
    id: 8,
    name: 'غزوة تبوك',
    nameEn: 'Battle of Tabūk',
    year: '9 هـ / 631م',
    muslimForce: '30,000 (جيش العسرة)',
    enemyForce: 'الجيش الروماني',
    enemyName: 'الروم',
    enemyNameEn: 'Byzantines',
    result: 'بدون قتال',
    significance: 'الصمود رغم الشدة — فضح المنافقين وتوبة الثلاثة الذين خُلّفوا',
    significanceEn: 'Endurance despite hardship — exposure of the hypocrites and repentance of the three who stayed behind',
    details: 'خرج النبي ﷺ في قيظ الصيف وشُح الزاد نحو تبوك لمواجهة الروم. تخلّف المنافقون بأعذار واهية. انسحب الروم دون قتال حين سمعوا بالجيش الإسلامي الضخم. عاد النبي ﷺ وقد ثبتت هيبة الإسلام في الشمال. وكانت هذه آخر غزوات النبي ﷺ.',
    detailsEn: 'The Prophet ﷺ marched in the blazing summer heat and scarcity of provisions toward Tabūk to face Byzantium. The hypocrites stayed behind with flimsy excuses. The Byzantines withdrew without battle upon hearing of the vast Muslim army. The Prophet ﷺ returned having established Islam\'s prestige in the north. This was the last of the Prophet\'s ﷺ battles.',
    hadith: '"لا يدخل الجنة إلا نفس مسلمة" — قالها ﷺ وهو يتجهّز للغزوة',
    hadithEn: '"None shall enter Paradise except a Muslim soul" — said by him ﷺ while preparing for the battle',
  },
  {
    id: 9,
    name: 'غزوة الأبواء (ودان)',
    nameEn: 'Battle of Al-Abwāʾ (Waddān)',
    year: '1 هـ / 623م',
    muslimForce: '70',
    enemyForce: 'قافلة قريش',
    enemyName: 'قريش',
    enemyNameEn: 'Quraysh',
    result: 'بدون قتال',
    significance: 'أول غزوة يخرج فيها النبي ﷺ بنفسه',
    significanceEn: 'First battle in which the Prophet ﷺ personally led',
    details: 'خرج النبي ﷺ في سبعين رجلاً من المهاجرين يعترض قافلة لقريش في منطقة الأبواء (ودان). صالح في طريقه بني ضمرة وعقد معهم ميثاقاً على عدم الاعتداء والنصرة عند الحاجة. لم يلتقِ بالقافلة وعاد دون قتال. وكانت هذه أول مرة يخرج فيها النبي ﷺ بنفسه قائداً.',
    detailsEn: 'The Prophet ﷺ marched with seventy emigrants to intercept a Quraysh caravan in the area of al-Abwāʾ (Waddān). Along the way he made a treaty with Banū Ḍamrah pledging non-aggression and mutual aid when needed. He did not encounter the caravan and returned without battle. This was the first time the Prophet ﷺ personally led as commander.',
  },
  {
    id: 10,
    name: 'غزوة بني النضير',
    nameEn: 'Battle of Banū al-Naḍīr',
    year: '4 هـ / 625م',
    muslimForce: '~1000',
    enemyForce: 'حصون بني النضير',
    enemyName: 'بنو النضير',
    enemyNameEn: 'Banū al-Naḍīr',
    result: 'نصر',
    significance: 'إجلاء بني النضير وتفريق مؤامرتهم على النبي ﷺ',
    significanceEn: 'Expulsion of Banū al-Naḍīr and foiling their conspiracy against the Prophet ﷺ',
    details: 'بعد التحالف مع يهود بني النضير، دبّروا مؤامرة لإلقاء حجر على النبي ﷺ من سطح دار. أطلعه جبريل عليه السلام على المؤامرة فانسحب. أرسل النبي ﷺ إليهم يأمرهم بالجلاء. تحصّنوا في بيوتهم، وبعد حصار خمسة عشر يوماً طلبوا الجلاء فأُجلوا إلى خيبر والشام. نزلت في شأنهم سورة الحشر.',
    detailsEn: 'After allying with the Jews of Banū al-Naḍīr, they plotted to drop a boulder on the Prophet ﷺ from a rooftop. Jibrīl, peace be upon him, informed him of the plot and he withdrew. The Prophet ﷺ sent word commanding them to leave. They fortified themselves in their homes; after a fifteen-day siege they asked to be expelled and were expelled to Khaybar and Syria. Surah al-Ḥashr was revealed concerning them.',
    hadith: '﴿هُوَ الَّذِي أَخْرَجَ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ﴾ — الحشر: 2',
    hadithEn: '﴿It is He who expelled the disbelievers among the People of the Scripture﴾ — Al-Ḥashr: 2',
  },
  {
    id: 11,
    name: 'غزوة ذات الرقاع',
    nameEn: 'Battle of Dhāt al-Riqāʿ',
    year: '4 هـ / 626م',
    muslimForce: '400 - 700',
    enemyForce: 'بنو محارب وبنو ثعلبة',
    enemyName: 'بنو محارب وثعلبة',
    enemyNameEn: 'Banū Muḥārib and Banū Thaʿlabah',
    result: 'بدون قتال',
    significance: 'أول تشريع لصلاة الخوف في الإسلام',
    significanceEn: 'First legislation of the Fear Prayer in Islam',
    details: 'بلغ النبي ﷺ أن قبائل من أنمار وثعلبة ومحارب تجمّعت في نجد. خرج بأربعمائة (وقيل سبعمائة) لتفريق تجمّعهم. لم يحدث قتال كبير لكن الموقف استدعى اليقظة الدائمة. شرّع الله في هذه الغزوة صلاة الخوف حيث يصلي الجيش على أشكال خاصة دون ترك موقعه. سُمّيت بذات الرقاع لأن أقدامهم تشقّقت فلفّوها بالخرق.',
    detailsEn: 'The Prophet ﷺ was informed that tribes of Anmār, Thaʿlabah and Muḥārib had gathered in Najd. He marched with four hundred (some say seven hundred) to disperse their gathering. No major fighting occurred but the situation demanded constant vigilance. Allāh legislated the Fear Prayer in this battle, in which the army prays in special formations without abandoning their positions. It was called Dhāt al-Riqāʿ because their feet cracked and they wrapped them in rags.',
    hadith: '﴿وَإِذَا كُنتَ فِيهِمْ فَأَقَمْتَ لَهُمُ الصَّلَاةَ﴾ — النساء: 102',
    hadithEn: '﴿And when you are among them and lead them in prayer﴾ — Al-Nisāʾ: 102',
  },
  {
    id: 12,
    name: 'غزوة بني قريظة',
    nameEn: 'Battle of Banū Qurayẓah',
    year: '5 هـ / 627م',
    muslimForce: '3000',
    enemyForce: 'حصون بني قريظة',
    enemyName: 'بنو قريظة',
    enemyNameEn: 'Banū Qurayẓah',
    result: 'نصر',
    significance: 'عقاب الخيانة العظمى — نقض العهد في غزوة الخندق',
    significanceEn: 'Punishment for supreme betrayal — breaking the covenant at the Battle of the Trench',
    details: 'خان بنو قريظة العهد مع المسلمين أثناء غزوة الخندق وفتحوا بابهم للأحزاب. لما انسحبت الأحزاب نزل جبريل على النبي ﷺ يأمره بالمسير إليهم فوراً. حاصرهم المسلمون خمساً وعشرين ليلة. طلب بنو قريظة الاحتكام إلى سعد بن معاذ حليفهم القديم، فحكم بأن يُقتل مقاتلتهم وتُسبى ذراريهم وتُوزَّع أموالهم.',
    detailsEn: 'Banū Qurayẓah betrayed their covenant with the Muslims during the Battle of the Trench and opened their gates to the confederates. When the confederates withdrew, Jibrīl descended on the Prophet ﷺ commanding him to march against them immediately. The Muslims besieged them for twenty-five nights. Banū Qurayẓah asked to be judged by Saʿd ibn Muʿādh, their old ally, who ruled that their fighters be executed, their women and children taken captive, and their wealth distributed.',
    casualties: 'تنفيذ حكم سعد بن معاذ في المقاتلين',
    casualtiesEn: 'Execution of Saʿd ibn Muʿādh\'s verdict on the combatants',
  },
  {
    id: 13,
    name: 'غزوة بني المصطلق (المريسيع)',
    nameEn: 'Battle of Banū al-Muṣṭaliq (Al-Muraysīʿ)',
    year: '6 هـ / 628م',
    muslimForce: '~700',
    enemyForce: 'بنو المصطلق',
    enemyName: 'بنو المصطلق',
    enemyNameEn: 'Banū al-Muṣṭaliq',
    result: 'نصر',
    significance: 'أحداثها كثيرة: نزول آيات الإفك وتشريع التيمم وزواجه ﷺ من جويرية',
    significanceEn: 'Its events are many: revelation of the Slander verses, legislation of tayammum, and the marriage to Juwayriyyah',
    details: 'بلغ النبي ﷺ أن بني المصطلق يجمعون لقتاله، فبادر وخرج إليهم. انتهت المعركة بسرعة بنصر المسلمين. غير أن الطريق عُرفت بأحداث خطيرة: تشاجر رجل من المهاجرين مع رجل من الأنصار فصرخ كل منهما "يا للمهاجرين! يا للأنصار!" وكادت الفتنة تشتعل لولا النبي ﷺ. وفيها تخلّفت عائشة رضي الله عنها وتحدّث المنافقون فنزلت آيات الإفك، وتشريع التيمم حين ضاع عقدها.',
    detailsEn: 'The Prophet ﷺ was informed that Banū al-Muṣṭaliq were gathering to fight him, so he set out first. The battle ended swiftly with the Muslims\' victory. However, the march was marked by grave events: an emigrant quarrelled with a Helper and each cried out their faction\'s name — near-sedition that the Prophet ﷺ averted. On this march ʿĀʾishah fell behind and the hypocrites slandered her; the Slander verses were revealed, as was the legislation of tayammum when her necklace was lost.',
    hadith: '﴿إِنَّ الَّذِينَ جَاءُوا بِالْإِفْكِ عُصْبَةٌ مِّنكُمْ﴾ — النور: 11',
    hadithEn: '﴿Indeed, those who brought the slander are a group among you﴾ — Al-Nūr: 11',
  },
  {
    id: 14,
    name: 'صلح الحديبية',
    nameEn: 'Treaty of Ḥudaybiyyah',
    year: '6 هـ / 628م',
    muslimForce: '1400 (أصحاب الشجرة)',
    enemyForce: 'مكة المكرمة',
    enemyName: 'قريش',
    enemyNameEn: 'Quraysh',
    result: 'بدون قتال',
    significance: '﴿فَتْحٌ مُّبِينٌ﴾ — الفتح الأعظم رغم ظاهره',
    significanceEn: '﴿A Clear Conquest﴾ — the greatest opening despite its apparent terms',
    details: 'خرج النبي ﷺ في أربع عشرة مائة من أصحابه معتمرين لا محاربين. صدّتهم قريش. جرت مفاوضات طويلة أسفرت عن معاهدة هدنة عشر سنوات. بايع الصحابة النبيَّ ﷺ تحت الشجرة بيعة الرضوان على عدم الفرار. بدت بنود الصلح في ظاهرها لصالح قريش فحزن بعض الصحابة، لكن النبي ﷺ أخبرهم بعظيم الفتح فيها. نزلت سورة الفتح بعدها مباشرة.',
    detailsEn: 'The Prophet ﷺ set out with fourteen hundred Companions as pilgrims, not fighters. Quraysh blocked them. Long negotiations resulted in a ten-year truce. The Companions pledged allegiance to the Prophet ﷺ under the tree — the Pledge of Riḍwān — vowing not to flee. The treaty\'s terms appeared to favour Quraysh outwardly, and some Companions were grieved, but the Prophet ﷺ told them of the great opening within it. Surah al-Fatḥ was revealed immediately afterwards.',
    hadith: '"إني رسول الله ولست أعصيه وهو ناصري"',
    hadithEn: '"I am the Messenger of Allāh and I do not disobey Him and He is my helper."',
    casualties: 'بيعة الرضوان تحت الشجرة — رضي الله عنهم',
    casualtiesEn: 'The Pledge of Riḍwān under the tree — may Allāh be pleased with them',
  },
  {
    id: 15,
    name: 'غزوة الطائف',
    nameEn: 'Battle of al-Ṭāʾif',
    year: '8 هـ / 630م',
    muslimForce: '12,000',
    enemyForce: 'ثقيف داخل الحصن',
    enemyName: 'بنو ثقيف',
    enemyNameEn: 'Banū Thaqīf',
    result: 'بدون قتال',
    significance: 'حصار فاشل للحصن — رفع الحصار ودعاء النبي ﷺ لثقيف بالهداية',
    significanceEn: 'Failed siege — the Prophet ﷺ raised the siege and prayed for Thaqīf\'s guidance',
    details: 'بعد موقعة حنين لجأت بقايا هوازن وثقيف إلى حصن الطائف المنيع. حاصره المسلمون مدة تزيد على الشهر وأطلقوا المجانيق لكن الحصن صمد. قال بعضهم للنبي ﷺ: "ادعُ عليهم!" فقال ﷺ: "اللهم اهدِ ثقيفاً وائتِ بهم." رفع الحصار وانسحب المسلمون، فجاء أهل الطائف بعد أشهر مسلمين.',
    detailsEn: 'After Ḥunayn, the remnants of Hawāzin and Thaqīf took refuge in the impregnable fortress of al-Ṭāʾif. The Muslims besieged it for over a month and launched catapults but the fortress held. Someone said to the Prophet ﷺ: "Curse them!" He replied: "O Allāh, guide Thaqīf and bring them." He lifted the siege and the Muslims withdrew; the people of al-Ṭāʾif came as Muslims months later.',
    hadith: '"اللهم اهدِ ثقيفاً وائتِ بهم" — دعاء النبي ﷺ لأعدائه بالهداية',
    hadithEn: '"O Allāh, guide Thaqīf and bring them." — The Prophet\'s ﷺ prayer for his enemies\' guidance',
  },
];

interface BattleCardProps { battle: Battle; index: number; isEn: boolean; }

const BattleCard: React.FC<BattleCardProps> = ({ battle, index, isEn }) => {
  const [expanded, setExpanded] = useState(false);
  const resultStyle = RESULT_COLORS[battle.result];
  const resultLabel = isEn ? RESULT_LABELS_EN[battle.result] : battle.result;

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
                {resultLabel}
              </span>
              <span className="font-kufi text-xs text-white/35">{battle.year}</span>
            </div>
            <h3 className="font-noto font-bold line-clamp-2" style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)', color: '#C9A84C' }}>
              {isEn ? battle.nameEn : battle.name}
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
        <p className="font-kufi mb-4 line-clamp-2" style={{ fontSize: '0.82rem', color: '#C9A84C', lineHeight: 1.65 }}>
          {isEn ? battle.significanceEn : battle.significance}
        </p>

        {/* Forces comparison */}
        <div
          className="grid grid-cols-2 gap-2 rounded-xl p-3 mb-4"
          style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}
        >
          <div className="text-center">
            <p className="font-kufi text-xs text-white/35 mb-1">{isEn ? 'Muslims' : 'المسلمون'}</p>
            <p className="font-noto font-bold" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#34D399' }}>
              {battle.muslimForce}
            </p>
          </div>
          <div className="text-center">
            <p className="font-kufi text-xs text-white/35 mb-1">
              {isEn ? battle.enemyNameEn : battle.enemyName}
            </p>
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
                <p className="font-noto text-white/65" style={{ fontSize: '0.88rem', lineHeight: 2 }}>
                  {isEn ? battle.detailsEn : battle.details}
                </p>

                {(isEn ? battle.martyrsEn : battle.martyrs) && (
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
                        {isEn ? battle.martyrsEn : battle.martyrs}
                      </p>
                    </div>
                  </div>
                )}

                {(isEn ? battle.casualtiesEn : battle.casualties) && (
                  <div
                    className="rounded-xl px-4 py-2.5 flex items-start gap-2"
                    style={{ background: 'rgba(96,165,250,0.07)', border: '1px solid rgba(96,165,250,0.2)' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: '#60A5FA' }} />
                    <div>
                      <p className="font-kufi text-xs mb-0.5" style={{ color: '#60A5FA' }}>
                        {isEn ? 'Notes' : 'ملاحظات'}
                      </p>
                      <p className="font-noto text-white/60" style={{ fontSize: '0.83rem', lineHeight: 1.75 }}>
                        {isEn ? battle.casualtiesEn : battle.casualties}
                      </p>
                    </div>
                  </div>
                )}

                {battle.hadith && (
                  <div
                    className="rounded-xl px-4 py-3"
                    style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.2)' }}
                  >
                    <p className="font-kufi text-xs mb-1.5" style={{ color: '#C9A84C' }}>
                      {isEn ? 'Ḥadīth / Saying' : 'حديث / قول'}
                    </p>
                    <p className="font-noto" dir="rtl" style={{ fontSize: '0.88rem', color: '#C9A84C', lineHeight: 1.95 }}>
                      {battle.hadith}
                    </p>
                    {isEn && battle.hadithEn && (
                      <p className="font-kufi mt-1.5 text-white/50" dir="ltr" style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>
                        {battle.hadithEn}
                      </p>
                    )}
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
  const router = useRouter();
  const { isEn } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState<string>('الكل');

  const filtered = useMemo(() => {
    return BATTLES.filter(b => {
      const matchResult = resultFilter === 'الكل' || b.result === resultFilter;
      const q = searchQuery.trim();
      const matchSearch = !q || (isEn
        ? (b.nameEn.toLowerCase().includes(q.toLowerCase()) || b.significanceEn.toLowerCase().includes(q.toLowerCase()))
        : (b.name.includes(q) || b.significance.includes(q)));
      return matchResult && matchSearch;
    });
  }, [searchQuery, resultFilter, isEn]);

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share button */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'Battles of the Prophet ﷺ' : 'غزوات النبي ﷺ'} accentColor="#C9A84C" />
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
          <span className="text-islamic-gold/80">{isEn ? 'Battles of the Prophet ﷺ' : 'غزوات النبي ﷺ'}</span>
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
          {isEn ? 'Battles of the Prophet ﷺ' : 'غزوات النبي ﷺ'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-noto text-islamic-gold/55 mt-2"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
          dir="rtl"
        >
          ﴿وَأَعِدُّوا لَهُمْ مَا اسْتَطَعْتُمْ مِن قُوَّةٍ﴾
        </motion.p>
        {isEn && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="font-kufi text-white/30 mt-1"
            style={{ fontSize: '0.8rem' }}
          >
            "Prepare against them whatever force you can." — Al-Anfāl: 60
          </motion.p>
        )}
        {!isEn && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="font-noto text-white/30 mt-1"
            style={{ fontSize: '0.82rem' }}
          >
            — الأنفال: 60
          </motion.p>
        )}

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
            { label: 'Total Battles', value: '27' },
            { label: 'Led by the Prophet ﷺ', value: '27' },
            { label: 'Presented here', value: String(BATTLES.length) },
          ] : [
            { label: 'عدد الغزوات الكلي', value: '27' },
            { label: 'حضرها ﷺ بنفسه (الكبرى)', value: '27' },
            { label: 'المعروضة هنا', value: String(BATTLES.length) },
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
            placeholder={isEn ? 'Search battles...' : 'ابحث عن غزوة...'}
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

        {/* Result filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {(['الكل', 'نصر', 'هزيمة جزئية', 'بدون قتال'] as const).map(r => {
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
                  <span className={`${isEn ? 'ml-1.5' : 'mr-1.5'} opacity-60`}>
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
          {isEn
            ? `Showing ${filtered.length} battle${filtered.length !== 1 ? 's' : ''} — click a card for details`
            : `يُعرض ${filtered.length} غزوة — انقر على البطاقة لعرض التفاصيل`}
        </span>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((battle, index) => (
            <BattleCard key={battle.id} battle={battle} index={index} isEn={isEn} />
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

export default BattlesPage;
