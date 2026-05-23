'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, ChevronLeft, X } from 'lucide-react';
import ShareButton from '@/components/ShareButton';
import { useLanguage } from '@/context/LanguageContext';

interface Wife {
  number: number;
  name: string;
  nameEn: string;
  nickname: string;
  nicknameEn: string;
  marriageYear: string;
  marriageYearEn: string;
  specialStatus: string;
  specialStatusEn: string;
  shortDescription: string;
  shortDescriptionEn: string;
  fullStory: string;
  fullStoryEn: string;
  achievement: string;
  achievementEn: string;
  quote: string;
  quoteEn: string;
  quoteSource: string;
  quoteSourceEn: string;
  bg: string;
  accentColor: string;
}

const WIVES: Wife[] = [
  {
    number: 1,
    name: 'خديجة بنت خويلد', nameEn: 'Khadijah bint Khuwaylid',
    nickname: 'أم المؤمنين — الكبرى',
    nicknameEn: 'Mother of the Faithful — The Elder',
    marriageYear: '595 م — قبل البعثة بخمس عشرة سنة',
    marriageYearEn: '595 CE — Fifteen years before the Prophethood',
    specialStatus: 'أول من آمن بالنبي ﷺ من الرجال والنساء',
    specialStatusEn: 'First to believe in the Prophet ﷺ, man or woman',
    shortDescription: 'سيدة قريش وأعظم نساء الدنيا — الزوجة الأولى والحبيبة الخالدة في قلبه ﷺ',
    shortDescriptionEn: 'Lady of Quraysh and the greatest woman of the world — the first wife and eternal beloved in his ﷺ heart',
    fullStory: 'كانت خديجة رضي الله عنها سيدة قريش وأشرفهن حسباً وأكثرهن مالاً. أرسلت إلى النبي ﷺ تعرض عليه الزواج فقبل. تزوّجها وعمرها أربعون وعمره خمس وعشرون. وكانت أول من آمنت به وأول من صدّقه — آزرته في أحلك الساعات حين أتاه الوحي فارتجف. ودعمته بمالها ونفسها وكلامها الطيب. لم يتزوج عليها في حياتها. وتوفّيت قبل الهجرة في ما عُرف بعام الحزن. وكان ﷺ يذكرها بعد وفاتها ويُكرم أصدقاءها وكلما ذبح الشاة أهدى منها لأحبائها. وقالت عائشة: ما غرتُ من امرأة ما غرتُ من خديجة.',
    fullStoryEn: 'Khadījah, may Allāh be pleased with her, was the lady of Quraysh — the noblest in lineage and wealthiest of them. She sent to the Prophet ﷺ proposing marriage and he accepted. He married her when she was forty and he was twenty-five. She was the first to believe in him and the first to affirm him — she supported him in the darkest hour when revelation came and he trembled. She backed him with her wealth, her self, and her kind words. He married no one else during her lifetime. She died before the Hijrah in what became known as the Year of Grief. After her death he would remember her, honour her friends, and whenever he slaughtered a sheep he would send portions to her loved ones. ʿĀʾishah said: "I was never more jealous of any woman than I was of Khadījah."',
    achievement: 'أول من آمن بالنبي ﷺ ودعمته بمالها وروحها في أحلك ساعات الدعوة',
    achievementEn: 'First to believe in the Prophet ﷺ and support him with her wealth and soul in the most difficult hours of the mission',
    quote: 'كلا والله لا يُخزيك الله أبداً، إنك لتصل الرحم وتحمل الكَل وتكسب المعدوم وتَقري الضيف وتُعين على نوائب الحق',
    quoteEn: 'By Allāh, He will never disgrace you. You uphold family ties, carry the burdens of others, earn for those who cannot, receive guests generously, and aid on the path of truth.',
    quoteSource: 'صحيح البخاري — كتاب بدء الوحي',
    quoteSourceEn: 'Ṣaḥīḥ al-Bukhārī — Book of the Beginning of Revelation',
    bg: '#1a0d00',
    accentColor: 'rgba(201,168,76,0.7)',
  },
  {
    number: 2,
    name: 'سودة بنت زمعة', nameEn: "Sawdah bint Zam'ah",
    nickname: 'أم المؤمنين — الصابرة',
    nicknameEn: 'Mother of the Faithful — The Patient',
    marriageYear: '620 م — بعد وفاة خديجة',
    marriageYearEn: '620 CE — After the death of Khadījah',
    specialStatus: 'أول من تزوجها ﷺ بعد خديجة',
    specialStatusEn: 'First to be married by the Prophet ﷺ after Khadījah',
    shortDescription: 'الزوجة الثانية التي كانت مُهاجرة صبوراً ووهبت يومها لعائشة',
    shortDescriptionEn: 'The second wife — a steadfast emigrant who gifted her day to ʿĀʾishah',
    fullStory: 'كانت سودة رضي الله عنها من المهاجرين الأوائل إلى الحبشة مع زوجها السكران بن عمرو. فلما توفي زوجها في الحبشة عادت وحيدةً. فتزوّجها النبي ﷺ بعد وفاة خديجة مباشرةً. كانت سيدةً طاعنةً في السن هاجرت في سبيل الله وضحّت بكل شيء. ولما كبرت وخافت أن يُطلّقها وهبت يومها لعائشة رضي الله عنها حباً للنبي ﷺ وحرصاً على القرب منه. فكان النبي ﷺ يقسم لعائشة يومها ويومَ سودة وقلبه مليء بالتقدير لهذه الصحابية الجليلة.',
    fullStoryEn: 'Sawdah, may Allāh be pleased with her, was among the first emigrants to Abyssinia with her husband al-Sakan ibn ʿAmr. When her husband died in Abyssinia she returned alone. The Prophet ﷺ married her immediately after Khadījah\'s death. She was an elderly woman who had emigrated for the sake of Allāh and sacrificed everything. When she grew old and feared he might divorce her, she gifted her day to ʿĀʾishah out of love for the Prophet ﷺ and desire to remain close to him. So the Prophet ﷺ would give ʿĀʾishah both her day and Sawdah\'s day, his heart full of appreciation for this noble Companion.',
    achievement: 'من المهاجرات الأوائل إلى الحبشة ومثال فريد في التضحية والإيثار',
    achievementEn: 'Among the first female emigrants to Abyssinia and a unique example of self-sacrifice and altruism',
    quote: 'اللهم إني وهبتُ يومي لعائشة حتى يرضى عني رسول الله ﷺ',
    quoteEn: 'O Allāh, I have gifted my day to ʿĀʾishah so that the Messenger of Allāh ﷺ may be pleased with me.',
    quoteSource: 'صحيح البخاري — كتاب النكاح',
    quoteSourceEn: 'Ṣaḥīḥ al-Bukhārī — Book of Marriage',
    bg: '#100d1a',
    accentColor: 'rgba(180,160,220,0.7)',
  },
  {
    number: 3,
    name: 'عائشة بنت أبي بكر', nameEn: 'Aishah bint Abi Bakr',
    nickname: 'حميراء — أُمّ المؤمنين',
    nicknameEn: 'Ḥumayra — Mother of the Faithful',
    marriageYear: '623 م — السنة الثانية من الهجرة',
    marriageYearEn: '623 CE — Year Two of the Hijrah',
    specialStatus: 'أحبّ نساء النبي ﷺ إليه وعالمة الأمة',
    specialStatusEn: 'The most beloved of the Prophet\'s ﷺ wives and scholar of the nation',
    shortDescription: 'زوجته وحبيبته ومُحدِّثة الإسلام الأولى — روت آلاف الأحاديث وأفتت الصحابة',
    shortDescriptionEn: 'His wife, his beloved, and the foremost narrator of Islam — she narrated thousands of ḥadīths and gave legal opinions to the Companions',
    fullStory: 'تزوّجها النبي ﷺ وهي صغيرة ودخل بها بعد الهجرة. كانت من أذكى الناس وأحفظهم وأعرفهم بأحكام الإسلام. كانت مرجعاً للصحابة في الفقه والسيرة والحديث — يقصدونها من كل مكان يسألونها. روت أكثر من ألفين ومئتي حديث. توفي النبي ﷺ في بيتها وبين يديها. ومن فضائلها: نزل القرآن في براءتها من الإفك. وقال عنها ﷺ: "فضل عائشة على النساء كفضل الثريد على سائر الطعام." عاشت بعده ﷺ تُعلّم الأمة حتى توفيت رضي الله عنها.',
    fullStoryEn: 'The Prophet ﷺ married her young and consummated the marriage after the Hijrah. She was among the most intelligent, most retentive, and most knowledgeable of people in Islamic rulings. She was a reference for the Companions in jurisprudence, biography, and ḥadīth — they would come to her from every direction with questions. She narrated more than 2,200 ḥadīths. The Prophet ﷺ died in her home and in her arms. Among her virtues: the Qurʾān was revealed declaring her innocence from the slander. The Prophet ﷺ said: "The excellence of ʿĀʾishah over other women is like the excellence of tharīd over other foods." She lived after him ﷺ teaching the nation until she died, may Allāh be pleased with her.',
    achievement: 'روت أكثر من 2200 حديث وكانت مرجع الأمة في الفقه والسيرة لعقود بعد وفاته ﷺ',
    achievementEn: 'Narrated over 2,200 ḥadīths and was the nation\'s reference in jurisprudence and biography for decades after his ﷺ death',
    quote: 'فضلُ عائشة على النساء كفضل الثريد على سائر الطعام',
    quoteEn: 'The excellence of ʿĀʾishah over other women is like the excellence of tharīd over other foods.',
    quoteSource: 'صحيح البخاري — كتاب المناقب',
    quoteSourceEn: 'Ṣaḥīḥ al-Bukhārī — Book of the Virtues',
    bg: '#0d1520',
    accentColor: 'rgba(160,200,240,0.7)',
  },
  {
    number: 4,
    name: 'حفصة بنت عمر', nameEn: "Hafsah bint 'Umar",
    nickname: 'حافظة القرآن',
    nicknameEn: 'Guardian of the Qurʾān',
    marriageYear: '625 م — السنة الثالثة من الهجرة',
    marriageYearEn: '625 CE — Year Three of the Hijrah',
    specialStatus: 'كانت صوّامةً قوّامةً وعُهد إليها بحفظ المصحف',
    specialStatusEn: 'A devout faster and night-prayer keeper entrusted with preserving the Muṣḥaf',
    shortDescription: 'ابنة الفاروق عمر بن الخطاب — الصوّامة القوّامة التي أُودع عندها المصحف',
    shortDescriptionEn: 'Daughter of ʿUmar ibn al-Khaṭṭāb — the devout faster and night-prayer keeper entrusted with the original Muṣḥaf',
    fullStory: 'كانت حفصة رضي الله عنها ابنة عمر بن الخطاب وقد أُسلمت إلى زوجها خُنيس بن حذافة فاستُشهد في أُحد. فزوّجها أبوها من النبي ﷺ. كانت ذات دين وعلم — صوّامةً قوّامةً. وكانت لديها شجاعة أبيها فكانت تُراجع النبي ﷺ. وأودع عثمان بن عفان رضي الله عنه المصحف الإمام الأصلي عندها بعد جمع القرآن. فكانت بذلك حارسةً لكتاب الله. وشهد لها النبي ﷺ بأنها صوّامة قوّامة.',
    fullStoryEn: 'Ḥafṣah, may Allāh be pleased with her, was the daughter of ʿUmar ibn al-Khaṭṭāb; she had been given in marriage to Khunays ibn Hudhayfah who was martyred at Uḥud. Her father gave her in marriage to the Prophet ﷺ. She was a woman of religion and knowledge — assiduous in fasting and night prayer. She had her father\'s courage and would speak her mind to the Prophet ﷺ. ʿUthmān ibn ʿAffān entrusted her with the original Master Muṣḥaf after the compilation of the Qurʾān, making her the guardian of Allāh\'s Book. The Prophet ﷺ testified that she was assiduous in fasting and night prayer.',
    achievement: 'أودع عثمان عندها المصحف الإمام الأصلي فكانت حارسةً لكتاب الله الكريم',
    achievementEn: 'ʿUthmān entrusted her with the original Master Muṣḥaf, making her a guardian of the Noble Book of Allāh',
    quote: 'حفصة صوّامة قوّامة — وهي زوجتي في الجنة',
    quoteEn: 'Ḥafṣah is a devout faster and night-prayer keeper — and she is my wife in Paradise.',
    quoteSource: 'المستدرك للحاكم — صحّحه',
    quoteSourceEn: 'Al-Mustadrak by al-Ḥākim — declared sound',
    bg: '#0a1810',
    accentColor: 'rgba(100,200,140,0.7)',
  },
  {
    number: 5,
    name: 'زينب بنت خزيمة', nameEn: 'Zaynab bint Khuzaymah',
    nickname: 'أم المساكين',
    nicknameEn: 'Mother of the Poor',
    marriageYear: '625 م — السنة الرابعة من الهجرة',
    marriageYearEn: '625 CE — Year Four of the Hijrah',
    specialStatus: 'لُقّبت بأم المساكين لكثرة صدقتها وكرمها',
    specialStatusEn: 'Nicknamed Mother of the Poor for her abundant charity and generosity',
    shortDescription: 'أم المساكين — الزوجة التي توفيت بعد زواجها بأشهر قليلة',
    shortDescriptionEn: 'Mother of the Poor — the wife who passed away just months after their marriage',
    fullStory: 'كانت زينب بنت خزيمة رضي الله عنها أرملة عبيدة بن الحارث الذي استُشهد في بدر. كانت مشهورةً بكثرة الصدقة والجود حتى لُقّبت في الجاهلية قبل الإسلام بأم المساكين. تزوّجها النبي ﷺ رحمةً بها وتكريماً لأرملة الشهيد. غير أنها لم تعش إلا أشهراً قليلة بعد زواجها إذ توفيت في حياة النبي ﷺ. وكانت وفاتها من مصائب النبي ﷺ فصلى عليها ودفنها رضي الله عنها.',
    fullStoryEn: 'Zaynab bint Khuzaymah, may Allāh be pleased with her, was the widow of ʿUbaydah ibn al-Ḥārith who was martyred at Badr. She was renowned for her abundant charity and generosity, having been nicknamed "Mother of the Poor" even in the pre-Islamic era. The Prophet ﷺ married her out of compassion and in honour of a martyr\'s widow. However, she lived only a few months after their marriage, dying during the Prophet\'s ﷺ lifetime. Her death was a grief to the Prophet ﷺ, who prayed over her and buried her, may Allāh be pleased with her.',
    achievement: 'لُقّبت بأم المساكين في الجاهلية والإسلام لكثرة جودها وكرمها على الفقراء',
    achievementEn: 'Nicknamed "Mother of the Poor" in both pre-Islamic and Islamic eras for her lavish generosity to the destitute',
    quote: 'لُقّبت بأم المساكين في الجاهلية والإسلام لكثرة إطعامها للمساكين',
    quoteEn: 'She was nicknamed "Mother of the Poor" in pre-Islamic and Islamic times for her abundant feeding of the poor.',
    quoteSource: 'طبقات ابن سعد — البداية والنهاية',
    quoteSourceEn: 'Ṭabaqāt Ibn Saʿd — Al-Bidāyah wa al-Nihāyah',
    bg: '#180800',
    accentColor: 'rgba(220,160,100,0.7)',
  },
  {
    number: 6,
    name: 'أم سلمة هند المخزومية', nameEn: 'Umm Salamah Hind al-Makhzumiyyah',
    nickname: 'ذات العقل والرأي',
    nicknameEn: 'The Wise Counsellor',
    marriageYear: '626 م — السنة الرابعة من الهجرة',
    marriageYearEn: '626 CE — Year Four of the Hijrah',
    specialStatus: 'كانت من أفقه أمهات المؤمنين وصاحبة الرأي السديد',
    specialStatusEn: 'The wisest and most insightful of the Mothers of the Faithful',
    shortDescription: 'أحكم أمهات المؤمنين رأياً وأعمقهن حكمةً — صاحبة الرأي في الحديبية',
    shortDescriptionEn: 'The most sagacious of the Mothers of the Faithful in judgment and wisdom — whose counsel saved Ḥudaybiyyah',
    fullStory: 'كانت أم سلمة رضي الله عنها ابنةَ أبي أمية وزوجةَ أبي سلمة الذي استُشهد. هاجرت مع زوجها ففرّق المشركون بينها وبين ابنها لفترة. فلما توفي زوجها خطبها أبو بكر فردّت وخطبها عمر فردّت فخطبها النبي ﷺ فتزوّجها. كانت من أفضل نساء زمانها رأياً وعقلاً. وأبدى رأيها في الحديبية حين حزن الصحابة فقالت: انحر ﷺ وقد تحلّل — فانحر فاحتذى الصحابة به. كانت آخر أزواجه وفاةً رضي الله عنها.',
    fullStoryEn: 'Umm Salamah, may Allāh be pleased with her, was the daughter of Abū Umayyah and the wife of Abū Salamah who was martyred. She emigrated with her husband, and the polytheists separated her from her son for a time. When her husband died, Abū Bakr proposed but she declined, then ʿUmar proposed but she declined, then the Prophet ﷺ proposed and she married him. She was among the finest women of her time in judgment and mind. She offered her counsel at Ḥudaybiyyah when the Companions were distressed, saying: "Sacrifice, O Messenger of Allāh, and consider yourself released from iḥrām" — he sacrificed, and the Companions followed him. She was the last of his wives to die, may Allāh be pleased with her.',
    achievement: 'صاحبة الرأي المشهور في الحديبية الذي أنقذ الموقف وحلّ إشكال الصحابة',
    achievementEn: 'Her famous counsel at Ḥudaybiyyah rescued the situation and resolved the Companions\' dilemma',
    quote: 'قومي يا رسول الله فانحر، فقام ونحر — ففعل الصحابة مثله',
    quoteEn: 'Rise, O Messenger of Allāh, and sacrifice — so he rose and sacrificed, and the Companions followed his example.',
    quoteSource: 'صحيح البخاري — كتاب الشروط',
    quoteSourceEn: 'Ṣaḥīḥ al-Bukhārī — Book of Conditions',
    bg: '#1a0d08',
    accentColor: 'rgba(200,140,100,0.7)',
  },
  {
    number: 7,
    name: 'زينب بنت جحش', nameEn: 'Zaynab bint Jahsh',
    nickname: 'من زوّجها الله من فوق سبع سماوات',
    nicknameEn: 'She Whom Allāh Married Above Seven Heavens',
    marriageYear: '627 م — السنة الخامسة من الهجرة',
    marriageYearEn: '627 CE — Year Five of the Hijrah',
    specialStatus: 'زوّجها الله في القرآن وكانت تفتخر بذلك على سائر نساء النبي ﷺ',
    specialStatusEn: 'Allāh married her to the Prophet ﷺ in the Qurʾān and she would boast of this above the other wives',
    shortDescription: 'ابنة عمة النبي ﷺ التي زوّجها الله في القرآن ونزلت في شأنها آيات الأحزاب',
    shortDescriptionEn: 'The Prophet\'s ﷺ cousin whom Allāh married to him in the Qurʾān and in whose regard verses of al-Aḥzāb were revealed',
    fullStory: 'كانت زينب بنت جحش رضي الله عنها ابنةَ عمة النبي ﷺ أُميمة بنت عبد المطلب. زوّجها النبي ﷺ من مولاه زيد بن حارثة لكسر الحواجز الطبقية. فلما طلّقها زيد تزوّجها النبي ﷺ بأمر الله الصريح في القرآن: ﴿فَلَمَّا قَضَىٰ زَيْدٌ مِّنْهَا وَطَرًا زَوَّجْنَاكَهَا﴾ لتكون ولايةً للنبي ﷺ وقطعاً لعادة التبنّي الجاهلي. وكانت تفتخر قائلةً: زوّجكنّ آباؤكنّ وزوّجني الله من فوق سبع سماوات. وكانت من أكثر الأزواج صدقةً وكرماً.',
    fullStoryEn: 'Zaynab bint Jaḥsh, may Allāh be pleased with her, was the daughter of the Prophet\'s ﷺ paternal aunt Umaymah bint ʿAbd al-Muṭṭalib. The Prophet ﷺ gave her in marriage to his freed slave Zayd ibn Ḥārithah to break class barriers. When Zayd divorced her, the Prophet ﷺ married her by Allāh\'s explicit command in the Qurʾān: ﴿So when Zayd had dissolved from her his obligation, We married her to you﴾ — to serve as a guardianship for the Prophet ﷺ and an abolition of the pre-Islamic custom of adoption. She would boast saying: "Your fathers gave you in marriage and your families — but Allāh married me above seven heavens." She was among the most charitable of the wives.',
    achievement: 'زوّجها الله في القرآن الكريم وكانت من أكثر أمهات المؤمنين صدقةً وعملاً باليدين',
    achievementEn: 'Allāh married her to the Prophet ﷺ in the Noble Qurʾān, and she was among the most charitable of the Mothers of the Faithful',
    quote: 'زوّجكنّ آباؤكنّ وأهاليكنّ وزوّجني الله من فوق سبع سماوات',
    quoteEn: 'Your fathers gave you in marriage and your families — but Allāh married me above seven heavens.',
    quoteSource: 'صحيح البخاري — كتاب التوحيد',
    quoteSourceEn: 'Ṣaḥīḥ al-Bukhārī — Book of Tawḥīd',
    bg: '#080e20',
    accentColor: 'rgba(140,180,240,0.7)',
  },
  {
    number: 8,
    name: 'جويرية بنت الحارث', nameEn: 'Juwayriyyah bint al-Harith',
    nickname: 'المباركة على قومها',
    nicknameEn: 'Blessed to Her People',
    marriageYear: '627 م — السنة الخامسة من الهجرة',
    marriageYearEn: '627 CE — Year Five of the Hijrah',
    specialStatus: 'زواجها كان سبباً في إعتاق مئة أسير من بني المصطلق',
    specialStatusEn: 'Her marriage was the reason a hundred captives from Banū al-Muṣṭaliq were freed',
    shortDescription: 'التي كان زواجها رحمةً لمئة أسير أُعتقوا لأنهم صاروا أصهار رسول الله ﷺ',
    shortDescriptionEn: 'Whose marriage was a mercy to a hundred captives who were freed because they became in-laws of the Messenger of Allāh ﷺ',
    fullStory: 'كانت جويرية رضي الله عنها ابنة الحارث بن أبي ضرار سيد بني المصطلق. وقعت في الأسر في غزوة بني المصطلق فأتت النبي ﷺ تطلب مساعدتها في فداء نفسها. فأعتقها النبي ﷺ وتزوّجها. فلما علم الصحابة أنها أصبحت ربيبةَ رسول الله ﷺ أعتقوا جميعَ ما في أيديهم من أسرى بني المصطلق إكراماً لرسول الله ﷺ. فأُعتق بسبب زواجها مئةُ بيت. قالت عائشة: ما أعلم امرأةً كانت أعظم بركةً على قومها من جويرية.',
    fullStoryEn: 'Juwayriyyah, may Allāh be pleased with her, was the daughter of al-Ḥārith ibn Abī Ḍirār, chief of Banū al-Muṣṭaliq. She was taken captive in the expedition against Banū al-Muṣṭaliq and came to the Prophet ﷺ seeking help with her ransom. The Prophet ﷺ freed her and married her. When the Companions learned she had become a member of the Messenger of Allāh\'s ﷺ household, they freed all the captives of Banū al-Muṣṭaliq in their possession, in honour of the Messenger of Allāh ﷺ. A hundred households were thus freed through her marriage. ʿĀʾishah said: "I know no woman who was a greater blessing to her people than Juwayriyyah."',
    achievement: 'كان زواجها سبباً لعتق مئة بيت من بني المصطلق وهو ما لم يُسمع بمثله',
    achievementEn: 'Her marriage was the reason a hundred households of Banū al-Muṣṭaliq were freed — the likes of which had never been heard before',
    quote: 'ما أعلم امرأةً كانت أعظم بركةً على قومها منها',
    quoteEn: 'I know no woman who was a greater blessing to her people than her.',
    quoteSource: 'سنن أبي داود — مسند أحمد',
    quoteSourceEn: 'Sunan Abī Dāwūd — Musnad Aḥmad',
    bg: '#1a0a00',
    accentColor: 'rgba(220,180,80,0.7)',
  },
  {
    number: 9,
    name: 'أم حبيبة رملة بنت أبي سفيان', nameEn: 'Umm Habibah Ramlah bint Abi Sufyan',
    nickname: 'المهاجرة الصابرة',
    nicknameEn: 'The Patient Emigrant',
    marriageYear: '628 م — السنة السادسة من الهجرة',
    marriageYearEn: '628 CE — Year Six of the Hijrah',
    specialStatus: 'هاجرت إلى الحبشة وارتدّ زوجها فصبرت وثبتت على دينها',
    specialStatusEn: 'She emigrated to Abyssinia, her husband apostasized, yet she remained steadfast in Islam',
    shortDescription: 'ابنة أبي سفيان التي هاجرت إلى الحبشة وثبتت على الإسلام رغم ردة زوجها',
    shortDescriptionEn: 'Daughter of Abū Sufyān who emigrated to Abyssinia and remained steadfast in Islam despite her husband\'s apostasy',
    fullStory: 'كانت أم حبيبة رضي الله عنها ابنة أبي سفيان سيد قريش وعدوّ الإسلام. أسلمت مع زوجها عبيدالله بن جحش وهاجرا إلى الحبشة. فارتدّ زوجها هناك وأصبح نصرانياً ومات على ذلك. فبقيت وحيدةً في الحبشة غريبةً بلا زوج. فأرسل النبي ﷺ رسالةً إلى النجاشي يطلب منه تزويجها فزوّجها النجاشي من النبي ﷺ نيابةً عنه وأمهرها أربعة آلاف درهم من ماله. فجاءت إلى المدينة وكانت من أثبت الناس وأصبرهم.',
    fullStoryEn: 'Umm Ḥabībah, may Allāh be pleased with her, was the daughter of Abū Sufyān, chief of Quraysh and enemy of Islam. She embraced Islam with her husband ʿUbaydullāh ibn Jaḥsh and they emigrated to Abyssinia. Her husband apostatized there, becoming a Christian, and died in that state. She remained alone in Abyssinia, a stranger with no husband. The Prophet ﷺ sent a letter to the Negus requesting him to give her in marriage, and the Negus married her to the Prophet ﷺ as his proxy, providing a dowry of four thousand dirhams from his own wealth. She came to Madinah and was among the most steadfast and patient of people.',
    achievement: 'ثبتت على الإسلام رغم ردة زوجها في الحبشة وهجرانها — وزوّجها النجاشي نيابةً عن النبي ﷺ',
    achievementEn: 'She remained steadfast in Islam despite her husband\'s apostasy and her isolation in Abyssinia — and the Negus gave her in marriage as the Prophet\'s ﷺ proxy',
    quote: 'اللهم أمتّعني بأبي سفيان وبأخي معاوية — دعت لهم بعد إسلامهم',
    quoteEn: 'O Allāh, let me enjoy my father Abū Sufyān and my brother Muʿāwiyah — she prayed for them after their Islam.',
    quoteSource: 'صحيح مسلم — كتاب البر والصلة',
    quoteSourceEn: 'Ṣaḥīḥ Muslim — Book of Righteousness and Kinship',
    bg: '#0d1800',
    accentColor: 'rgba(160,220,120,0.7)',
  },
  {
    number: 10,
    name: 'صفية بنت حيي', nameEn: 'Safiyyah bint Huyayy',
    nickname: 'بنت النبيّين',
    nicknameEn: 'Daughter of the Prophets',
    marriageYear: '628 م — بعد خيبر',
    marriageYearEn: '628 CE — After Khaybar',
    specialStatus: 'من نسل هارون بن عمران عليه السلام وتزوّجها النبي ﷺ بعد خيبر إكراماً لها',
    specialStatusEn: 'Descended from Hārūn ibn ʿImrān, peace be upon him; married by the Prophet ﷺ after Khaybar in honour of her noble lineage',
    shortDescription: 'اليهودية التي أسلمت وتزوّجها النبي ﷺ تكريماً لنسبها الشريف',
    shortDescriptionEn: 'The Jewish woman who embraced Islam and whom the Prophet ﷺ married in honour of her noble lineage',
    fullStory: 'كانت صفية رضي الله عنها ابنة حيي بن أخطب سيد بني النضير، وكانت من أشرف نسب في بني إسرائيل — تنتسب إلى هارون بن عمران عليه السلام. وقعت في السبي بعد خيبر فأسلمت. واختارها النبي ﷺ لنفسه وأعتقها وجعل عتقها صداقها. وعيّرتها بعض أمهات المؤمنين بأنها يهودية فجاءت إلى النبي ﷺ تبكي فقال لها: "ألا قلتِ: وكيف تكونين دوني وأبي هارون وعمي موسى وزوجي محمد؟"',
    fullStoryEn: 'Ṣafiyyah, may Allāh be pleased with her, was the daughter of Ḥuyayy ibn Akhṭab, chief of Banū al-Naḍīr, of the noblest lineage among the Children of Israel — descended from Hārūn ibn ʿImrān, peace be upon him. She was captured after Khaybar and embraced Islam. The Prophet ﷺ chose her for himself, freed her, and made her freedom her dowry. Some of the Mothers of the Faithful taunted her for being Jewish, and she came to the Prophet ﷺ weeping, whereupon he said: "Why did you not say: How could you be above me when my father is Hārūn, my uncle is Mūsā, and my husband is Muḥammad?"',
    achievement: 'من نسل الأنبياء — وقال لها النبي ﷺ قولاً يفخر به الإنسان إلى آخر الدهر',
    achievementEn: 'Of prophetic lineage — and the Prophet ﷺ said to her a word that a person may take pride in until the end of time',
    quote: 'كيف تكونين دوني وأبوكِ هارون وعمّكِ موسى وزوجكِ محمد؟',
    quoteEn: 'How could you be below when your father is Hārūn, your uncle is Mūsā, and your husband is Muḥammad?',
    quoteSource: 'سنن الترمذي — صحّحه',
    quoteSourceEn: 'Sunan al-Tirmidhī — declared sound',
    bg: '#0a1220',
    accentColor: 'rgba(140,180,240,0.7)',
  },
  {
    number: 11,
    name: 'ميمونة بنت الحارث', nameEn: 'Maymunah bint al-Harith',
    nickname: 'آخر من تزوّجها النبي ﷺ',
    nicknameEn: 'The Last to Be Married by the Prophet ﷺ',
    marriageYear: '629 م — عمرة القضاء',
    marriageYearEn: '629 CE — The ʿUmrat al-Qaḍāʾ',
    specialStatus: 'آخر من تزوّجها النبي ﷺ وعقد عليها في مكة المكرمة في عمرة القضاء',
    specialStatusEn: 'The last to be married by the Prophet ﷺ; the contract was made in Makkah during the ʿUmrat al-Qaḍāʾ',
    shortDescription: 'آخر زوجات النبي ﷺ وعقد عليها في مكة وبنى بها في سرف',
    shortDescriptionEn: 'The last of the Prophet\'s ﷺ wives; the contract was made in Makkah and the marriage consummated in Sarif',
    fullStory: 'كانت ميمونة رضي الله عنها ابنةَ الحارث وأختَ لبابة الكبرى زوج العباس بن عبد المطلب. عرضت نفسها على النبي ﷺ فتزوجها وهو حلال في عمرة القضاء. وكانت آخر من تزوّجها النبي ﷺ. وكانت فاضلةً تقيةً من أكثر أمهات المؤمنين صلةً للرحم. سمّاها النبي ﷺ ميمونة — وكان اسمها برّة — تيمّناً. وتوفّيت في سرف نفس المكان الذي بنى بها فيه النبي ﷺ وكأنها أرادت الموت في ذلك المكان المقدّس لها.',
    fullStoryEn: 'Maymūnah, may Allāh be pleased with her, was the daughter of al-Ḥārith and sister of Lubābah al-Kubrā, wife of al-ʿAbbās ibn ʿAbd al-Muṭṭalib. She offered herself to the Prophet ﷺ and he married her, in a lawful state, during the ʿUmrat al-Qaḍāʾ. She was the last to be married by the Prophet ﷺ. She was virtuous and pious — among the Mothers of the Faithful most devoted to keeping kinship ties. The Prophet ﷺ renamed her Maymūnah — her name had been Barrah — as a good omen. She died in Sarif, the very place where the Prophet ﷺ had consummated their marriage, as if she had wished to die in that sacred place.',
    achievement: 'كانت من أوصل أمهات المؤمنين للرحم وأكثرهن صدقةً وتقوى في آخر حياتها',
    achievementEn: 'Among the most devoted of the Mothers of the Faithful in kinship ties, most charitable, and most pious in her later life',
    quote: 'عرضتُ نفسي على رسول الله ﷺ — فرزقني الله خير رجل على الأرض',
    quoteEn: 'I offered myself to the Messenger of Allāh ﷺ — and Allāh blessed me with the best man on earth.',
    quoteSource: 'طبقات ابن سعد — البداية والنهاية',
    quoteSourceEn: 'Ṭabaqāt Ibn Saʿd — Al-Bidāyah wa al-Nihāyah',
    bg: '#1a1000',
    accentColor: 'rgba(220,200,120,0.7)',
  },
];

const ORDINALS = ['الأولى','الثانية','الثالثة','الرابعة','الخامسة','السادسة','السابعة','الثامنة','التاسعة','العاشرة','الحادية عشرة'];
const ORDINALS_EN = ['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eighth','Ninth','Tenth','Eleventh'];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5 },
  }),
};

/* ─── Center Modal ─── */
const WifeModal: React.FC<{ wife: Wife; onClose: () => void; isEn: boolean }> = ({ wife, onClose, isEn }) => {
  const accent = wife.accentColor;
  const ordinal = isEn ? ORDINALS_EN[wife.number - 1] : ORDINALS[wife.number - 1];
  const badgeLabel = isEn ? `Wife #${ordinal}` : `الزوجة ${ordinal}`;
  return (
    <motion.div
      key="wife-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(3,8,19,0.9)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-3xl"
        style={{
          background: wife.bg,
          border: `1px solid ${accent.replace('0.7)', '0.35)')}`,
          boxShadow: `0 24px 64px rgba(0,0,0,0.75), 0 0 60px ${accent.replace('0.7)', '0.06)')}`,
        }}
        onClick={e => e.stopPropagation()}
        dir={isEn ? 'ltr' : 'rtl'}
      >
        {/* Top accent bar */}
        <div
          className="h-1 rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />

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
          {/* Badge */}
          <span
            className="font-kufi text-xs px-3 py-1 rounded-full inline-block mb-4"
            style={{ background: accent.replace('0.7)', '0.12)'), border: `1px solid ${accent.replace('0.7)', '0.3)')}`, color: accent }}
          >
            {badgeLabel}
          </span>

          {/* Name */}
          <h2 className="font-kufi font-bold mb-1" style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', color: 'white' }}>
            {isEn ? wife.nameEn : wife.name}
          </h2>
          <p className="font-noto mb-2" style={{ fontSize: '0.82rem', color: accent }}>
            {isEn ? wife.nicknameEn : wife.nickname}
          </p>
          <p className="font-kufi text-xs mb-5" style={{ color: '#f2f3f3' }}>
            {isEn ? wife.marriageYearEn : wife.marriageYear}
          </p>

          {/* Special status */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-5"
            style={{ background: accent.replace('0.7)', '0.1)'), border: `1px solid ${accent.replace('0.7)', '0.25)')}` }}
          >
            <span className="font-kufi text-xs" style={{ color: accent }}>
              {isEn ? wife.specialStatusEn : wife.specialStatus}
            </span>
          </div>

          {/* Full story */}
          <p className="font-noto mb-5" style={{ color: '#f2f3f3', fontSize: '0.9rem', lineHeight: 1.95 }}>
            {isEn ? wife.fullStoryEn : wife.fullStory}
          </p>

          {/* Achievement */}
          <div
            className="rounded-xl p-3 mb-4"
            style={{
              background: 'rgba(0,0,0,0.25)',
              borderRight: isEn ? 'none' : `2px solid ${accent}`,
              borderLeft: isEn ? `2px solid ${accent}` : 'none',
            }}
          >
            <p className="font-kufi text-xs mb-1" style={{ color: '#f2f3f3' }}>
              {isEn ? 'Key Contribution' : 'أبرز إسهامها'}
            </p>
            <p className="font-noto" style={{ color: '#d2d3d5', fontSize: '0.87rem', lineHeight: 1.75 }}>
              {isEn ? wife.achievementEn : wife.achievement}
            </p>
          </div>

          {/* Quote */}
          <div
            className="rounded-2xl p-4"
            style={{ background: accent.replace('0.7)', '0.06)'), border: `1px solid ${accent.replace('0.7)', '0.2)')}` }}
          >
            <p className="font-noto italic mb-2" style={{ color: accent, fontSize: '0.9rem', lineHeight: 1.9 }}>
              "{isEn ? wife.quoteEn : wife.quote}"
            </p>
            <p className="font-kufi text-xs" style={{ color: '#f2f3f3' }}>
              {isEn ? wife.quoteSourceEn : wife.quoteSource}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const WivesPage: React.FC = () => {
  const router = useRouter();
  const { isEn } = useLanguage();
  const [selectedWife, setSelectedWife] = useState<Wife | null>(null);

  return (
    <div dir={isEn ? 'ltr' : 'rtl'} className="min-h-screen" style={{ background: '#030813' }}>
      {/* Share Button */}
      <div className={`fixed top-[5.5rem] ${isEn ? 'right-4' : 'left-4'} z-[60]`}>
        <ShareButton title={isEn ? 'Mothers of the Faithful' : 'أمهات المؤمنين'} accentColor="#C9A84C" />
      </div>

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${((i * 137.5) % 100).toFixed(1)}%`,
              top: `${((i * 93.7) % 100).toFixed(1)}%`,
              width: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`,
              height: `${(0.5 + (i % 3) * 0.5).toFixed(1)}px`,
              opacity: 0.15 + (i % 5) * 0.04,
            }}
          />
        ))}
      </div>

      {/* Breadcrumb */}
      <div
        className="absolute top-6 z-20 max-w-[calc(100vw-6rem)]"
        style={{ [isEn ? 'left' : 'right']: '5rem' }}
      >
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 font-kufi text-xs"
          style={{ color: '#C9A84C' }}
        >
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-1 transition-colors"
            style={{ color: '#C9A84C' }}
          >
            <Home size={12} />
            <span>{isEn ? 'Home' : 'الرئيسية'}</span>
          </button>
          <ChevronLeft size={10} className={isEn ? '' : 'rotate-180'} />
          <span style={{ color: '#C9A84C' }}>
            {isEn ? 'Mothers of the Faithful' : 'أمهات المؤمنين'}
          </span>
        </motion.nav>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-16"
        style={{ background: 'linear-gradient(180deg, rgba(201,168,76,0.06) 0%, transparent 100%)' }}
      >
        <div className="w-16 h-px mb-6" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
        <p
          className="font-noto text-center mb-3"
          style={{
            fontSize: 'clamp(1.2rem, 3.5vw, 2rem)',
            color: '#C9A84C',
            textShadow: '0 0 30px rgba(201,168,76,0.35)',
            lineHeight: 2,
          }}
          dir="rtl"
        >
          ﴿النَّبِيُّ أَوْلَىٰ بِالْمُؤْمِنِينَ مِنْ أَنفُسِهِمْ ۖ وَأَزْوَاجُهُ أُمَّهَاتُهُمْ﴾
        </p>
        {isEn && (
          <p className="font-kufi text-sm text-white/40 text-center mb-1" style={{ maxWidth: '28rem' }}>
            "The Prophet is more worthy of the believers than themselves, and his wives are their mothers." — Al-Aḥzāb: 6
          </p>
        )}
        <p className="font-kufi text-sm" style={{ color: '#C9A84C' }}>
          {isEn ? 'Al-Aḥzāb: 6' : 'الأحزاب: 6'}
        </p>
        <div className="w-16 h-px mt-6" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)' }} />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-kufi font-bold mt-8 text-center"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: 'white' }}
        >
          {isEn ? 'Mothers of the Faithful' : 'أمهات المؤمنين'}
        </motion.h1>
        <p className="font-noto mt-3 text-center" style={{ color: '#d2d3d5', fontSize: '1rem' }}>
          {isEn
            ? 'Wives of the Prophet ﷺ — women who taught the nation and built Islam in its earliest homes'
            : 'زوجات النبي ﷺ — نساء علّمن الأمة وبنين الإسلام في أول بيوته'}
        </p>
        <div
          className="mt-6 px-4 py-2 rounded-full font-kufi text-sm"
          style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C' }}
        >
          {isEn
            ? '11 noble Mothers — tap any card for her full story'
            : '11 أم كريمة — اضغط على أي بطاقة لعرض قصتها كاملة'}
        </div>
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WIVES.map((wife, i) => (
            <motion.div
              key={wife.number}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.015 }}
              className="rounded-2xl overflow-hidden cursor-pointer select-none"
              style={{
                background: wife.bg,
                border: `1px solid rgba(255,255,255,0.06)`,
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onClick={() => setSelectedWife(wife)}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = wife.accentColor.replace('0.7)', '0.35)');
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.5)`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              {/* Top accent line */}
              <div className="h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${wife.accentColor}, transparent)` }} />

              {/* Card content */}
              <div className="p-5">
                <span
                  className="font-kufi text-xs px-2 py-0.5 rounded-full mb-3 inline-block"
                  style={{ background: wife.accentColor.replace('0.7)', '0.12)'), color: wife.accentColor }}
                >
                  {isEn ? `Wife #${ORDINALS_EN[wife.number - 1]}` : `الزوجة ${ORDINALS[wife.number - 1]}`}
                </span>
                <h3 className="font-kufi font-bold mb-0.5" style={{ color: 'white', fontSize: '1.05rem' }}>
                  {isEn ? wife.nameEn : wife.name}
                </h3>
                <p className="font-noto text-xs mb-3" style={{ color: wife.accentColor, opacity: 0.9 }}>
                  {isEn ? wife.nicknameEn : wife.nickname}
                </p>

                <p className="font-noto mb-3" style={{ color: '#dedfe0', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  {isEn ? wife.shortDescriptionEn : wife.shortDescription}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: wife.accentColor }} />
                    <p className="font-kufi text-xs" style={{ color: '#f2f3f3' }}>
                      {isEn ? wife.marriageYearEn : wife.marriageYear}
                    </p>
                  </div>
                  <p className="font-kufi" style={{ fontSize: '0.84rem', color: wife.accentColor.replace('0.7)', '0.45)') }}>
                    {isEn ? 'Tap for details ›' : 'اضغط للتفاصيل ›'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 py-8"
        >
          <div className="w-12 h-px mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }} />
          <p className="font-noto" style={{ color: '#f2f3f3', fontSize: '0.9rem', lineHeight: 1.8 }}>
            {isEn
              ? 'May Allāh be pleased with all the Mothers of the Faithful — their virtue upon the nation is beyond measure'
              : 'رضي الله عن أمهات المؤمنين جميعاً — فضلُهنّ على الأمة لا يُحصى ولا يُقدَّر'}
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-8 flex items-center gap-2 mx-auto px-6 py-2.5 rounded-full font-kufi text-sm transition-all"
            style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C' }}
          >
            <Home size={13} />
            {isEn ? 'Back to Home' : 'العودة للرئيسية'}
          </button>
        </motion.div>
      </div>

      {/* Center Modal */}
      <AnimatePresence>
        {selectedWife && (
          <WifeModal wife={selectedWife} onClose={() => setSelectedWife(null)} isEn={isEn} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WivesPage;
