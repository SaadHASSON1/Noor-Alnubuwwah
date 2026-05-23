'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, BookOpen, Moon, Droplets, ArrowUpCircle, TreePine, Eye, Flame, Utensils, Wind, Heart, Star, Zap, Cloud, Fish, Volume2, Shield, Search as SearchIcon, Sun, Bird, Waves, X } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface Miracle {
  icon: React.ReactNode;
  title: string; titleEn: string;
  subtitle: string; subtitleEn: string;
  description: string; descriptionEn: string;
  reference: string;
  color: string;
}

const MIRACLES: Miracle[] = [
  {
    icon: <BookOpen size={28} />,
    title: 'القرآن الكريم', titleEn: 'The Noble Quran',
    subtitle: 'المعجزة الخالدة', subtitleEn: 'The Eternal Miracle',
    description: 'أعظم معجزات النبي ﷺ وأبقاها. كتاب أعجز فصحاء العرب وبلغاءهم أن يأتوا بسورة من مثله. محفوظ بحفظ الله إلى يوم القيامة لم يتغيّر فيه حرف واحد منذ نزوله.',
    descriptionEn: 'The greatest and most enduring of the Prophet\'s ﷺ miracles. A book that challenged the eloquent Arabs to produce a single surah like it — and they could not. Preserved by Allah\'s protection until the Day of Judgement; not a single letter has changed since its revelation.',
    reference: '﴿إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ﴾ — الحجر: 9',
    color: '#C9A84C',
  },
  {
    icon: <Moon size={28} />,
    title: 'شقّ القمر', titleEn: 'The Splitting of the Moon',
    subtitle: 'إصبعه يشقّ القمر', subtitleEn: 'His finger split the moon',
    description: 'طلب كفار قريش آيةً فأشار النبي ﷺ بإصبعه إلى القمر فانشقّ فرقتين، وظلّ كذلك حتى رأى الناس جبل حراء بينهما. شهد بذلك حتى الكفار وقالوا: "سحر مستمر."',
    descriptionEn: 'The Quraysh unbelievers demanded a sign, so the Prophet ﷺ pointed his finger at the moon — it split in two, remaining so until people could see Mount Hira\' between the halves. Even the disbelievers witnessed it and called it: "Persistent sorcery."',
    reference: '﴿اقْتَرَبَتِ السَّاعَةُ وَانشَقَّ الْقَمَرُ﴾ — القمر: 1',
    color: '#A8C8E8',
  },
  {
    icon: <Droplets size={28} />,
    title: 'نبع الماء من أصابعه', titleEn: 'Water Springing from His Fingers',
    subtitle: 'في غزوة الحديبية وغيرها', subtitleEn: 'At Hudaybiyyah and elsewhere',
    description: 'في مواضع متعددة نبع الماء من بين أصابع النبي ﷺ ليروي آلاف الصحابة وركابهم. ففي غزوة الحديبية بضع عشرة ألفاً توضّأوا وشربوا من ماء نبع بين يديه ﷺ.',
    descriptionEn: 'In multiple incidents water gushed from between the Prophet\'s ﷺ fingers to quench thousands of Companions and their mounts. At Hudaybiyyah, over fourteen thousand people performed ablution and drank from water that sprung from his blessed hands ﷺ.',
    reference: 'صحيح البخاري — كتاب المناقب: "رأيت الماء ينبع من بين أصابع رسول الله ﷺ"',
    color: '#A8E8C8',
  },
  {
    icon: <ArrowUpCircle size={28} />,
    title: 'الإسراء والمعراج', titleEn: 'The Night Journey and Ascension',
    subtitle: 'رحلة ما فوق السماوات', subtitleEn: 'A Journey Beyond the Heavens',
    description: 'أُسري بالنبي ﷺ ليلاً من المسجد الحرام إلى المسجد الأقصى، ثم عُرج به إلى السماوات السبع فصلّى بالأنبياء إماماً، ورأى الجنة والنار، وكلّمه الله تعالى وفرضت عليه الصلوات الخمس.',
    descriptionEn: 'The Prophet ﷺ was transported by night from al-Masjid al-Haram to al-Masjid al-Aqsa, then ascended through the seven heavens, led the prophets in prayer, witnessed Paradise and Hellfire, was spoken to by Allah, and the five daily prayers were ordained upon him.',
    reference: '﴿سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى﴾ — الإسراء: 1',
    color: '#E8C8A8',
  },
  {
    icon: <TreePine size={28} />,
    title: 'حديث الشجر والحجر', titleEn: 'Trees and Rocks Bearing Witness',
    subtitle: 'يشهدان بالنبوة', subtitleEn: 'Testifying to his Prophethood',
    description: 'كانت الأشجار والأحجار تسلّم على النبي ﷺ وتشهد بنبوّته. وكانت جذع نخلة يبكي كالطفل حين تركه النبي ﷺ حتى نزل وضمّه بيديه فسكن. قال الصحابة: "سمعنا الجذع يحنّ."',
    descriptionEn: 'Trees and rocks would greet the Prophet ﷺ and testify to his prophethood. The trunk of a palm tree wept like a child when the Prophet ﷺ left it — until he descended and embraced it with his hands and it fell silent. The Companions said: "We heard the trunk moaning."',
    reference: 'صحيح البخاري — كتاب المناقب: "فحنّ الجذع حنين الناقة"',
    color: '#C8E8A8',
  },
  {
    icon: <Eye size={28} />,
    title: 'إخبار الغيب', titleEn: 'Knowledge of the Unseen',
    subtitle: 'أخبار تحققت بدقة', subtitleEn: 'Prophecies fulfilled with precision',
    description: 'أخبر النبي ﷺ عن أحداث غيبية تحققت بعد وفاته بمئات السنين كفتح القسطنطينية وفارس والروم، وظهور الفتن، وعلامات الساعة. كل ذلك تحقّق بدقة فائقة لا يملكها إلا نبي.',
    descriptionEn: 'The Prophet ﷺ foretold unseen events fulfilled centuries after his death — the conquests of Constantinople, Persia, and Rome; the appearance of trials; and the signs of the Final Hour. All was fulfilled with extraordinary precision possible only for a prophet.',
    reference: '﴿وَمَا يَنطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ﴾ — النجم: 3-4',
    color: '#E8A8C8',
  },
  {
    icon: <Flame size={28} />,
    title: 'شفاء عين علي في خيبر', titleEn: "Healing Ali's Eye at Khaybar",
    subtitle: 'بريق النبي ﷺ', subtitleEn: 'His Blessed Saliva ﷺ',
    description: 'كان علي بن أبي طالب رضي الله عنه مصاباً بالرمد يوم خيبر. فبصق النبي ﷺ في عينيه ومسح عليهما فبرأ كأن لم يكن به شيء. ثم أعطاه الراية وفتح الله عليه خيبر بعدها بساعات.',
    descriptionEn: 'Ali ibn Abi Talib (may Allah be pleased with him) was suffering from eye pain at Khaybar. The Prophet ﷺ applied his saliva to Ali\'s eyes and wiped them — and he was healed as though nothing had afflicted him. He then gave him the banner and Allah granted victory at Khaybar hours later.',
    reference: 'صحيح البخاري — كتاب المغازي: "فبصق في عينيه فبرأ من ساعته"',
    color: '#F0C060',
  },
  {
    icon: <Utensils size={28} />,
    title: 'طعام يمدّ جيشاً بأكمله', titleEn: 'Food That Fed an Entire Army',
    subtitle: 'خبز أم سليم في غزوة تبوك', subtitleEn: "Umm Sulaym's bread at the Battle of Tabuk",
    description: 'في غزوة تبوك أتت أم سليم بخبز يسير، فأمر النبي ﷺ بفتح الجُرُب وتفريقها على الجيش وبلغ نحو ثلاثمائة رجل أو يزيدون. وأكلوا جميعاً حتى شبعوا وبقي طعام.',
    descriptionEn: 'At the Battle of Tabuk, Umm Sulaym brought a small amount of bread. The Prophet ﷺ had the food pouches opened and distributed among the army of some three hundred men or more. They all ate until they were full — and food still remained.',
    reference: 'صحيح البخاري — كتاب المناقب: "فأكل منه ثلاثون وثلاثمائة حتى شبعوا"',
    color: '#A8D8B0',
  },
  {
    icon: <Volume2 size={28} />,
    title: 'حنين الجذع', titleEn: 'The Moaning of the Palm Trunk',
    subtitle: 'جذع النخلة يبكي فراقه ﷺ', subtitleEn: 'The palm trunk weeps at his separation ﷺ',
    description: 'كان النبي ﷺ يخطب متكئاً على جذع نخلة. فلما صنع له المنبر تحوّل إليه، فحنّ الجذع حنين الناقة حتى سمعه أهل المسجد وهو يبكي. فنزل النبي ﷺ ومسح عليه حتى سكت.',
    descriptionEn: 'The Prophet ﷺ used to deliver his sermon leaning against a palm trunk. When a pulpit was made for him and he moved to it, the trunk moaned like a camel — so loudly that the congregation heard it weeping. The Prophet ﷺ descended and embraced it until it fell silent.',
    reference: 'صحيح البخاري — كتاب المناقب: "فحنّ الجذع حنين الصبي"',
    color: '#D4A870',
  },
  {
    icon: <Star size={28} />,
    title: "شهادة الذئب بنبوّته", titleEn: "The Wolf's Testimony of His Prophethood",
    subtitle: 'الذئب يتكلم فيشهد للنبي ﷺ', subtitleEn: 'The wolf speaks and bears witness ﷺ',
    description: 'بينما راعٍ يسوق غنمه إذ اعترضه ذئب وأخذ شاةً، فاسترجعها الراعي، فقال الذئب: "من لها يوم السبع يوم لا راعي لها غيري؟" ثم قال: "إن محمداً بيثرب نبيٌّ." فأسلم الراعي.',
    descriptionEn: 'While a shepherd was herding his flock, a wolf seized a sheep. He retrieved it, but the wolf spoke: "Who will guard them on the Day of the Beast when there is no shepherd but me?" Then it said: "Muhammad at Yathrib is a prophet." The shepherd embraced Islam.',
    reference: 'صحيح مسلم — كتاب الفتن، حديث أبي سعيد الخدري',
    color: '#9CA3AF',
  },
  {
    icon: <Fish size={28} />,
    title: 'تكثير طعام جابر', titleEn: "Multiplying Jabir's Food",
    subtitle: 'طعام قليل يكفي ألفاً', subtitleEn: 'A small amount sufficient for a thousand',
    description: 'في غزوة الخندق جاء جابر بن عبدالله بشاة وصاع من شعير. فأمر النبي ﷺ بطحن الشعير وطبخ اللحم. ثم دعا الناس ودخلوا عشرةً عشرة يأكلون حتى أكل ألف رجل وبقي طعام.',
    descriptionEn: 'During the Battle of the Trench, Jabir ibn \'Abdillah brought a sheep and a sa\' of barley. The Prophet ﷺ had the barley ground and the meat cooked, then invited people ten at a time. A thousand men ate until they were full — and food still remained.',
    reference: 'صحيح البخاري — كتاب المناقب: "ثم بارك فيه فأكل منه ألف رجل"',
    color: '#60A5FA',
  },
  {
    icon: <Cloud size={28} />,
    title: 'السحابة تُظلّله', titleEn: 'The Cloud Shading Him',
    subtitle: 'الغمامة ترافقه في طريق الشام', subtitleEn: 'The cloud accompanying him on the way to Syria',
    description: 'شهد الراهب بحيرى حين رأى القافلة التي فيها الصبي محمد ﷺ قبل النبوة أن غمامةً كانت تظلّله وتتحرك معه. وكان هذا أحد الأدلة التي جعلت بحيرى يُقرّ له بالنبوة القادمة.',
    descriptionEn: 'The monk Bahira witnessed — when he saw the caravan carrying the young Muhammad ﷺ before his prophethood — that a cloud was shading him and moving with him. This was one of the signs that led Bahira to acknowledge the prophethood to come.',
    reference: 'السيرة النبوية لابن هشام، ودلائل النبوة للبيهقي',
    color: '#BAE6FD',
  },
  {
    icon: <Droplets size={28} />,
    title: "نبع بئر الحديبية", titleEn: "The Spring of Hudaybiyyah's Well",
    subtitle: 'أمر بسهمه فنبع الماء', subtitleEn: 'He commanded with his arrow and water sprang forth',
    description: 'في الحديبية نضب ماء البئر فأعطى النبي ﷺ سهمه لأحد الصحابة فغرزه في البئر، ففارت بالماء حتى رويَ الناس جميعاً وملأوا أسقيتهم وكانوا ألفاً وأربعمائة.',
    descriptionEn: 'At Hudaybiyyah the well ran dry, so the Prophet ﷺ gave his arrow to a Companion who placed it in the well — and the well overflowed with water until all one thousand four hundred people quenched their thirst and filled their water skins.',
    reference: 'صحيح البخاري — كتاب المناقب: "فجاشت البئر بالرواء"',
    color: '#67E8F9',
  },
  {
    icon: <Shield size={28} />,
    title: 'الذراع المسمومة تُحذّره', titleEn: 'The Poisoned Shoulder Warning Him',
    subtitle: 'في خيبر — اللحم يكلّمه', subtitleEn: 'At Khaybar — the meat speaks to him',
    description: 'أهدت امرأة يهودية للنبي ﷺ شاةً مسمومة بعد خيبر. فلما مدّ يده ليأكل من الذراع أخبره الله أن فيها سماً. فسأل المرأة فاعترفت. وقال: "ما كان الله ليُسلّطك عليّ."',
    descriptionEn: 'A Jewish woman gifted the Prophet ﷺ a poisoned sheep after the conquest of Khaybar. When he reached out to eat from the shoulder, Allah informed him it contained poison. He questioned the woman and she confessed. He said: "Allah would not permit you to harm me."',
    reference: 'صحيح البخاري — كتاب المغازي: "أن الذراع قالت إنها مسمومة"',
    color: '#6EE7B7',
  },
  {
    icon: <Eye size={28} />,
    title: 'وصف المسجد الأقصى', titleEn: 'Describing al-Masjid al-Aqsa',
    subtitle: 'يصفه من ذاكرته بدقة مذهلة', subtitleEn: 'Describing it from memory with astonishing accuracy',
    description: 'حين كذّبه المشركون في حادثة الإسراء طلبوا أن يصف لهم المسجد الأقصى وهو لم يكن رآه قط بعينيه. فجلاه الله أمامه فوصفه بدقة كاملة حتى شهد من رآه أنه وصفه تماماً.',
    descriptionEn: 'When the polytheists denied the Night Journey, they asked him to describe al-Masjid al-Aqsa — which he had never seen with his eyes. Allah revealed it before him and he described it with complete accuracy, until those who had seen it testified that his description was perfect.',
    reference: 'صحيح البخاري — كتاب المناقب: "فجلاه الله له فجعل يصفه وينظر إليه"',
    color: '#FDE68A',
  },
  {
    icon: <TreePine size={28} />,
    title: 'الشجرة تأتيه حين دعاها', titleEn: 'The Tree Coming When He Called It',
    subtitle: 'شاهد من الأرض', subtitleEn: 'A witness from the earth',
    description: 'قال رجل للنبي ﷺ: ائتني بآية. فقال: "تلك الشجرة — ادعها." فدعاها فجاءت تخطّ الأرض حتى وقفت بين يديه. ثم قال لها: "ارجعي" فرجعت. فأسلم الرجل.',
    descriptionEn: 'A man said to the Prophet ﷺ: "Show me a sign." He replied: "That tree — call it." The man called it and it came, dragging along the ground, until it stood before him. He then said to it: "Return" and it returned. The man embraced Islam.',
    reference: 'دلائل النبوة للبيهقي، والسيرة الحلبية بإسناد حسن',
    color: '#86EFAC',
  },
  {
    icon: <Sun size={28} />,
    title: 'استسقاؤه فيُمطر', titleEn: 'His Prayer for Rain Is Answered',
    subtitle: 'يرفع يديه فيجيب الله فوراً', subtitleEn: 'He raises his hands and Allah answers immediately',
    description: 'صعد النبي ﷺ المنبر واشتكى الناس القحط. فرفع يديه يدعو فأقبلت السحاب من كل جهة حتى أمطرت ثمانية أيام متوالية لم يُقطر فيها. ثم صعد وطلب رفعها فانقشعت فوراً.',
    descriptionEn: 'The Prophet ﷺ ascended the pulpit as the people complained of drought. He raised his hands in supplication and clouds gathered from every direction, bringing rain for eight consecutive days. Then he ascended again and asked for it to be lifted — and it cleared instantly.',
    reference: 'صحيح البخاري — كتاب الاستسقاء',
    color: '#93C5FD',
  },
  {
    icon: <Zap size={28} />,
    title: 'إخبار بفتح القسطنطينية', titleEn: 'Prophecy of the Conquest of Constantinople',
    subtitle: 'تحقق بعد 800 سنة', subtitleEn: 'Fulfilled 800 years later',
    description: 'قال ﷺ: "لتُفتحنّ القسطنطينية فلنِعمَ الأمير أميرها ولنِعمَ الجيش ذلك الجيش." فتحها السلطان محمد الفاتح عام 1453م بعد 820 سنة من النبوة. ووصفه العلماء بأنه نِعمَ الأمير.',
    descriptionEn: 'He ﷺ said: "Constantinople shall surely be conquered. How excellent its commander will be, and how excellent that army." Sultan Muhammad al-Fatih conquered it in 1453 CE — 820 years after the prophecy. Scholars described him as exactly the commander the hadith praised.',
    reference: 'مسند أحمد — صحّحه الألباني وشعيب الأرنؤوط',
    color: '#C4B5FD',
  },
  {
    icon: <Heart size={28} />,
    title: 'علمه بما في القلوب', titleEn: 'His Knowledge of What Is in Hearts',
    subtitle: 'يكشف أسرار المنافقين', subtitleEn: 'Revealing the secrets of the hypocrites',
    description: 'عرّفه الله بأسماء المنافقين وفضحهم برواية حذيفة بن اليمان. قال حذيفة: "أسرّ إليّ رسول الله ﷺ أسماء اثني عشر منافقاً." وكان النبي ﷺ يعرف المنافق من ملامحه.',
    descriptionEn: 'Allah informed him of the names of the hypocrites, as narrated by Hudhayfa ibn al-Yaman who said: "The Messenger of Allah ﷺ confided to me the names of twelve hypocrites." The Prophet ﷺ could recognise the hypocrite from his features.',
    reference: 'صحيح مسلم — كتاب صفات المنافقين',
    color: '#F9A8D4',
  },
  {
    icon: <Bird size={28} />,
    title: 'شهادة العنكبوت والحمامة', titleEn: 'The Testimony of the Spider and the Dove',
    subtitle: 'الغار في يوم الهجرة', subtitleEn: 'The cave on the day of the Hijra',
    description: 'حين اختبأ النبي ﷺ وأبو بكر في غار ثور أنسجت العنكبوت خيوطها على فم الغار وباضت حمامتان. فلما جاء المشركون قالوا: ما دخل هنا أحد. فكان هذا من أعظم حفظ الله لنبيّه.',
    descriptionEn: 'When the Prophet ﷺ and Abu Bakr took refuge in the Cave of Thawr, a spider spun its web across the entrance and two doves nested there. When the polytheists came, they said: "No one has entered here." This was among the greatest of Allah\'s protections of His prophet.',
    reference: 'السيرة النبوية لابن هشام، ودلائل النبوة للبيهقي',
    color: '#D1FAE5',
  },
  {
    icon: <Wind size={28} />,
    title: 'إخبار بغزو فارس والروم', titleEn: 'Prophecy of Conquering Persia and Rome',
    subtitle: 'تحقق في زمن الخليفة عمر', subtitleEn: 'Fulfilled in the time of Caliph Umar',
    description: 'قال ﷺ: "إذا هلك كسرى فلا كسرى بعده، وإذا هلك قيصر فلا قيصر بعده." وقال: "ستفتحون فارس والروم." ففُتحتا في زمن عمر وعثمان بعد وفاته بأعوام قليلة.',
    descriptionEn: 'He ﷺ said: "When Khosrow perishes, there shall be no Khosrow after him; and when Caesar perishes, there shall be no Caesar after him." And: "You shall conquer Persia and Rome." Both were conquered in the eras of Umar and Uthman, just years after his passing.',
    reference: 'صحيح البخاري ومسلم — كتاب الفتن',
    color: '#FEF08A',
  },
  {
    icon: <Waves size={28} />,
    title: 'الحجر يسلّم عليه', titleEn: 'The Rock Greeting Him',
    subtitle: 'قبل النبوة — شاهد الجماد', subtitleEn: 'Before prophethood — the inert bearing witness',
    description: 'قال ﷺ: "إني لأعرف حجراً بمكة كان يسلّم عليّ قبل أن أُبعث إنّي لأعرفه الآن." وكان ﷺ يقول: "إن هذا الحجر الأسود يأتي يوم القيامة وله عينان يُبصر بهما."',
    descriptionEn: 'He ﷺ said: "I know a rock in Makkah that used to greet me before I was sent as a prophet — I can recognise it even now." And he ﷺ said: "The Black Stone will come on the Day of Resurrection with two eyes with which it sees."',
    reference: 'صحيح مسلم — كتاب الفضائل',
    color: '#E2E8F0',
  },
  {
    icon: <Flame size={28} />,
    title: 'إخبار بمقتل عمر وعثمان', titleEn: 'Prophecy of the Killings of Umar and Uthman',
    subtitle: 'غيب تحقق', subtitleEn: 'Unseen news fulfilled',
    description: 'أخبر النبي ﷺ عمر بن الخطاب بأنه سيُقتل، وأخبر عثمان بأنه سيلبس قميصاً لا يخلعه. وتحقق كلاهما بعد وفاة النبي ﷺ — عمر طعنه أبو لؤلؤة، وعثمان قُتل وهو يقرأ القرآن.',
    descriptionEn: 'The Prophet ﷺ informed Umar that he would be killed and informed Uthman that he would wear a garment he would never remove. Both came to pass after the Prophet\'s ﷺ death — Umar was stabbed by Abu Lu\'lu\'a, and Uthman was killed while reading the Quran.',
    reference: 'الترمذي وابن ماجه — السلسلة الصحيحة للألباني',
    color: '#FCA5A5',
  },
  {
    icon: <Moon size={28} />,
    title: 'رؤياه تتحقق دائماً', titleEn: 'His Visions Always Come True',
    subtitle: 'رؤيا الأنبياء حق', subtitleEn: 'The visions of prophets are true',
    description: 'كانت رؤياه ﷺ تتحقق بأدق تفاصيلها: رأى في المنام دخول مكة فتحقق في صلح الحديبية ثم الفتح. ورأى فتوحاً تحققت. ورأى وجه أبي بكر في الخلافة. كل رؤيا جاءت كما رأى.',
    descriptionEn: 'His ﷺ visions were fulfilled in their finest details: he saw the entry into Makkah — fulfilled at the Treaty of Hudaybiyyah and then the Conquest. He saw conquests that came true. He saw Abu Bakr\'s face in the Caliphate. Every vision came exactly as he saw it.',
    reference: '﴿لَقَدْ صَدَقَ اللَّهُ رَسُولَهُ الرُّؤْيَا بِالْحَقِّ﴾ — الفتح: 27',
    color: '#A78BFA',
  },
];

/* ─── Modal ─── */
const MiracleModal: React.FC<{ miracle: Miracle; onClose: () => void; isEn: boolean }> = ({ miracle, onClose, isEn }) => (
  <motion.div
    key="miracle-overlay"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
    style={{ background: 'rgba(3,8,19,0.88)', backdropFilter: 'blur(10px)' }}
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 16 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl"
      style={{ background: 'rgba(8,14,30,0.97)', border: `1px solid ${miracle.color}30`, boxShadow: `0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px ${miracle.color}10, 0 0 60px ${miracle.color}08` }}
      onClick={e => e.stopPropagation()}
      dir={isEn ? 'ltr' : 'rtl'}
    >
      <div className="h-1 rounded-t-3xl" style={{ background: `linear-gradient(90deg, transparent, ${miracle.color}, transparent)` }} />
      <button onClick={onClose}
        className={`absolute top-4 ${isEn ? 'right-4' : 'left-4'} z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors`}
        style={{ background: 'rgba(255,255,255,0.07)', color: '#d2d3d5' }}>
        <X size={14} />
      </button>
      <div className="p-6 pt-5">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: `${miracle.color}15`, border: `1px solid ${miracle.color}30`, color: miracle.color }}>
          {miracle.icon}
        </div>
        <h2 className="font-noto font-bold mb-1" style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', color: miracle.color }}>
          {isEn ? miracle.titleEn : miracle.title}
        </h2>
        <p className="font-kufi mb-5" style={{ fontSize: '0.92rem', color: miracle.color, letterSpacing: '0.04em' }}>
          {isEn ? miracle.subtitleEn : miracle.subtitle}
        </p>
        <p className="font-noto mb-5" style={{ fontSize: '0.93rem', lineHeight: 2, color: '#d2d3d5' }}>
          {isEn ? miracle.descriptionEn : miracle.description}
        </p>
        <div className="rounded-2xl p-4" style={{ background: `${miracle.color}08`, border: `1px solid ${miracle.color}20` }}>
          <p className="font-kufi text-xs mb-1" style={{ color: '#f2f3f3' }}>{isEn ? 'Source' : 'المصدر'}</p>
          <p className="font-noto" dir="rtl" style={{ fontSize: '0.85rem', color: miracle.color, lineHeight: 1.8 }}>
            {miracle.reference}
          </p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const MiraclesPage: React.FC = () => {
  const router = useRouter();
  const { isEn } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedMiracle, setSelectedMiracle] = useState<Miracle | null>(null);

  const filtered = MIRACLES.filter(m => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return isEn
      ? (m.titleEn.toLowerCase().includes(q) || m.subtitleEn.toLowerCase().includes(q) || m.descriptionEn.toLowerCase().includes(q))
      : (m.title.includes(q) || m.subtitle.includes(q) || m.description.includes(q));
  });

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'Miracles of the Prophet ﷺ' : 'معجزات النبي ﷺ'} accentColor="#C9A84C" />
      </div>

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 70 }, (_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{ left: `${((i * 113.7) % 100).toFixed(1)}%`, top: `${((i * 83.1) % 100).toFixed(1)}%`, width: `${(1 + (i % 2) * 0.8).toFixed(1)}px`, height: `${(1 + (i % 2) * 0.8).toFixed(1)}px`, opacity: 0.3 + (i % 3) * 0.1 }} />
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="relative z-10 px-6 pt-20 pb-4">
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs text-islamic-gold/50">
          <button onClick={() => router.push('/')} className="flex items-center gap-1 hover:text-islamic-gold transition-colors">
            <Home size={12} />
            <span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </button>
          <ChevronLeft size={10} className={isEn ? '' : 'rotate-180'} />
          <span className="text-islamic-gold/80">{isEn ? 'His Miracles ﷺ' : 'معجزاته ﷺ'}</span>
        </motion.nav>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center px-6 pb-12">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
          className="font-noto font-bold mb-3"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', color: '#C9A84C', textShadow: '0 0 30px rgba(201,168,76,0.4)' }}>
          {isEn ? 'His Miracles ﷺ' : 'معجزاته ﷺ'}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="font-noto text-white/55 max-w-xl mx-auto"
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', lineHeight: 1.9 }}>
          {isEn
            ? `${MIRACLES.length} miracles — clear signs from Allah testifying to the truth of his prophethood ﷺ`
            : `${MIRACLES.length} معجزة من آيات الله البيّنة دليلاً على صدق نبوّته ﷺ`}
        </motion.p>

        {/* Search */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="relative max-w-xs mx-auto mt-6">
          <SearchIcon size={13} className={`absolute ${isEn ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-islamic-gold/40`} />
          <input type="text"
            placeholder={isEn ? 'Search miracles...' : 'ابحث عن معجزة...'}
            value={search} onChange={e => setSearch(e.target.value)}
            className={`w-full font-kufi text-sm text-white/75 ${isEn ? 'pl-8 pr-3' : 'pr-8 pl-3'} py-2 rounded-full outline-none`}
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)' }} />
        </motion.div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-3 justify-center mt-6 opacity-30">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-islamic-gold" />
          <div className="w-1.5 h-1.5 rotate-45 bg-islamic-gold" />
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-islamic-gold" />
        </motion.div>
      </div>

      {/* Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <AnimatePresence>
          {search && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="font-kufi text-xs text-white/30 text-center mb-4">
              {filtered.length} {isEn ? 'result(s)' : 'نتيجة'}
            </motion.p>
          )}
        </AnimatePresence>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((miracle, index) => (
            <motion.div key={miracle.title}
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 * index }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
              style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${miracle.color}20`, boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 30px ${miracle.color}08` }}
              onClick={() => setSelectedMiracle(miracle)}>
              <div className="h-1" style={{ background: `linear-gradient(90deg, transparent, ${miracle.color}, transparent)` }} />
              <div className="p-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${miracle.color}12`, border: `1px solid ${miracle.color}25`, color: miracle.color }}>
                  {miracle.icon}
                </div>
                <h3 className="font-noto font-bold mb-1 line-clamp-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: miracle.color }}>
                  {isEn ? miracle.titleEn : miracle.title}
                </h3>
                <p className="font-kufi mb-3 opacity-60 line-clamp-1" style={{ fontSize: '0.88rem', color: miracle.color, letterSpacing: '0.04em' }}>
                  {isEn ? miracle.subtitleEn : miracle.subtitle}
                </p>
                <p className="font-noto text-white/55 mb-4 line-clamp-4" style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.85rem)', lineHeight: 1.9 }}>
                  {isEn ? miracle.descriptionEn : miracle.description}
                </p>
                <div className="text-xs font-noto p-2 rounded-lg mb-3" dir="rtl"
                  style={{ background: `${miracle.color}08`, border: `1px solid ${miracle.color}18`, color: miracle.color, lineHeight: 1.7 }}>
                  {miracle.reference}
                </div>
                <p className="font-kufi text-center" style={{ fontSize: '0.84rem', color: miracle.color }}>
                  {isEn ? 'Tap for details ›' : 'اضغط للتفاصيل ›'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMiracle && (
          <MiracleModal miracle={selectedMiracle} onClose={() => setSelectedMiracle(null)} isEn={isEn} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MiraclesPage;
