export interface BattleUnit {
  id: string;
  label: string;
  count?: string;
  x: number;
  y: number;
  side: 'muslim' | 'enemy' | 'terrain';
  shape?: 'circle' | 'star' | 'diamond';
}

export interface BattleArrow {
  id: string;
  x1: number; y1: number;
  x2: number; y2: number;
  color: string;
  label?: string;
}

export interface SimPhase {
  title: string;
  description: string;
  units: BattleUnit[];
  arrows?: BattleArrow[];
}

export interface BattleSimulation {
  eventId: number;
  name: string;
  terrain: 'desert' | 'valley' | 'mountain' | 'city' | 'fortress' | 'plain';
  terrainLabel: string;
  muslimColor: string;
  enemyColor: string;
  phases: SimPhase[];
}

export const BATTLE_SIMULATIONS: BattleSimulation[] = [

  // ─── 1. غزوة بدر الكبرى (id:11) ───
  {
    eventId: 11,
    name: 'غزوة بدر الكبرى',
    terrain: 'desert',
    terrainLabel: 'وادي بدر — بئر بدر',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'التقابل عند الآبار',
        description: 'سبق المسلمون إلى آبار بدر فنزلوا عندها، وجاء جيش قريش من الشمال. فتواجه الجيشان: 313 مسلماً في الجنوب في مقابل 950 من قريش في الشمال.',
        units: [
          { id: 'wells', label: 'آبار بدر', x: 50, y: 50, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '313', x: 50, y: 78, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش', count: '950', x: 50, y: 22, side: 'enemy', shape: 'circle' },
        ],
        arrows: [],
      },
      {
        title: 'المبارزة — فرسان قريش',
        description: 'خرج من قريش عتبة وشيبة والوليد يطلبون المبارزة. فخرج من المسلمين حمزة وعلي وعبيدة. وقُتل الثلاثة من قريش في مشهد حدّد نتيجة المعركة.',
        units: [
          { id: 'wells', label: 'آبار بدر', x: 50, y: 50, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '313', x: 50, y: 75, side: 'muslim', shape: 'circle' },
          { id: 'mu', label: 'حمزة وعلي', count: '3', x: 50, y: 60, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'قريش', count: '947', x: 50, y: 25, side: 'enemy', shape: 'circle' },
          { id: 'eu', label: 'عتبة وشيبة', count: '3', x: 50, y: 42, side: 'enemy', shape: 'star' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 60, x2: 50, y2: 43, color: '#4ade80', label: 'المبارزة' },
        ],
      },
      {
        title: 'الهجوم العام — الملائكة تنزل',
        description: 'أمر النبي ﷺ بالهجوم العام وحثى التراب قائلاً: شاهت الوجوه. ونزلت الملائكة تُثبّت المسلمين. اندفع المسلمون من ثلاثة محاور نحو قريش.',
        units: [
          { id: 'wells', label: 'آبار بدر', x: 50, y: 50, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '313', x: 50, y: 55, side: 'muslim', shape: 'circle' },
          { id: 'm2', label: 'الميمنة', count: '100', x: 25, y: 48, side: 'muslim', shape: 'circle' },
          { id: 'm3', label: 'الميسرة', count: '100', x: 75, y: 48, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش', count: '950', x: 50, y: 28, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 55, x2: 50, y2: 33, color: '#4ade80', label: '' },
          { id: 'a2', x1: 25, y1: 48, x2: 30, y2: 33, color: '#4ade80', label: '' },
          { id: 'a3', x1: 75, y1: 48, x2: 70, y2: 33, color: '#4ade80', label: '' },
        ],
      },
      {
        title: 'النصر — هزيمة قريش',
        description: 'انهزمت قريش هزيمة نكراء. قُتل أبو جهل وعتبة وشيبة وسبعون من صناديد قريش. وأُسر سبعون آخرون. وغنم المسلمون غنائم عظيمة.',
        units: [
          { id: 'm1', label: 'المسلمون منتصرون', count: '313', x: 50, y: 40, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش الفارّة', count: '830', x: 25, y: 15, side: 'enemy', shape: 'circle' },
          { id: 'e2', label: 'الأسرى', count: '70', x: 75, y: 60, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 40, y1: 35, x2: 20, y2: 18, color: '#f87171', label: 'فرار قريش' },
        ],
      },
    ],
  },

  // ─── 2. غزوة أحد (id:12) ───
  {
    eventId: 12,
    name: 'غزوة أُحد',
    terrain: 'mountain',
    terrainLabel: 'جبل أُحد — شمال المدينة',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'الانتشار — الرماة على الجبيل',
        description: 'أمر النبي ﷺ خمسين رامياً بالصعود على جبيل عينين (جبل الرماة) وألا يتركوه مهما حدث. صفّ المسلمون أمام جبل أحد والمشركون في الميدان.',
        units: [
          { id: 'uhud', label: 'جبل أحد', x: 50, y: 5, side: 'terrain', shape: 'diamond' },
          { id: 'archers_hill', label: 'جبيل الرماة', x: 15, y: 30, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون 700', count: '700', x: 50, y: 38, side: 'muslim', shape: 'circle' },
          { id: 'm_arch', label: 'الرماة 50', count: '50', x: 15, y: 38, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'قريش 3000', count: '3000', x: 50, y: 72, side: 'enemy', shape: 'circle' },
          { id: 'khalid', label: 'خالد — الفرسان', count: '200', x: 82, y: 60, side: 'enemy', shape: 'star' },
        ],
      },
      {
        title: 'الهجوم الأول — المسلمون يتقدمون',
        description: 'هجم المسلمون بقوة وانهزم المشركون في البداية. نساء قريش يفرّن والغنائم في متناول اليد. أصحاب النبي ﷺ يتقدمون في الميدان.',
        units: [
          { id: 'uhud', label: 'جبل أحد', x: 50, y: 5, side: 'terrain', shape: 'diamond' },
          { id: 'archers_hill', label: 'جبيل الرماة', x: 15, y: 30, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون يتقدمون', count: '700', x: 50, y: 58, side: 'muslim', shape: 'circle' },
          { id: 'm_arch', label: 'الرماة 50', count: '50', x: 15, y: 38, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'قريش يتراجعون', count: '3000', x: 50, y: 82, side: 'enemy', shape: 'circle' },
          { id: 'khalid', label: 'خالد — ينتظر', count: '200', x: 82, y: 68, side: 'enemy', shape: 'star' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 55, x2: 50, y2: 75, color: '#4ade80', label: 'تقدم المسلمين' },
        ],
      },
      {
        title: 'ترك الرماة موقعهم',
        description: 'رأى أغلب الرماة هزيمة المشركين وبدأوا بالنزول لجمع الغنائم رغم نهي النبي ﷺ. بقي فقط عشرة على الجبل. فرأى خالد بن الوليد الفرصة.',
        units: [
          { id: 'uhud', label: 'جبل أحد', x: 50, y: 5, side: 'terrain', shape: 'diamond' },
          { id: 'archers_hill', label: 'جبيل الرماة', x: 15, y: 30, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '700', x: 50, y: 62, side: 'muslim', shape: 'circle' },
          { id: 'm_arch_left', label: 'الرماة تركوا', count: '40', x: 35, y: 52, side: 'muslim', shape: 'star' },
          { id: 'm_arch_stay', label: 'الثابتون', count: '10', x: 15, y: 38, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'قريش يتوقفون', count: '3000', x: 50, y: 80, side: 'enemy', shape: 'circle' },
          { id: 'khalid', label: 'خالد يتحرك!', count: '200', x: 82, y: 55, side: 'enemy', shape: 'star' },
        ],
        arrows: [
          { id: 'a1', x1: 82, y1: 55, x2: 20, y2: 40, color: '#f87171', label: 'خالد يلتف' },
        ],
      },
      {
        title: 'الكمين — خالد يضرب من الخلف',
        description: 'التفّ خالد بن الوليد بفرسانه على جبل الرماة من الخلف وداهم المسلمين من الجهتين. استُشهد حمزة بن عبد المطلب. وشُجّ وجه النبي ﷺ وكُسرت رباعيّته.',
        units: [
          { id: 'uhud', label: 'جبل أحد', x: 50, y: 5, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون محاصرون', count: '700', x: 50, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش — الأمام', count: '3000', x: 50, y: 75, side: 'enemy', shape: 'circle' },
          { id: 'khalid_back', label: 'خالد — الخلف', count: '200', x: 50, y: 25, side: 'enemy', shape: 'star' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 70, x2: 50, y2: 58, color: '#f87171', label: '' },
          { id: 'a2', x1: 50, y1: 30, x2: 50, y2: 43, color: '#f87171', label: '' },
        ],
      },
      {
        title: 'التراجع إلى جبل أُحد',
        description: 'تراجع النبي ﷺ ومن معه إلى جبل أحد واحتموا بصخوره. قال ﷺ لمن حوله: "ارجعوا فقاتلوا." وصمد المسلمون حتى انسحب المشركون دون فتح حاسم.',
        units: [
          { id: 'uhud', label: 'جبل أحد', x: 50, y: 5, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون على أُحد', count: '600', x: 50, y: 22, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش تنسحب', count: '3000', x: 50, y: 78, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 68, x2: 50, y2: 82, color: '#f87171', label: 'انسحاب قريش' },
        ],
      },
    ],
  },

  // ─── 3. غزوة الخندق (id:13) ───
  {
    eventId: 13,
    name: 'غزوة الخندق (الأحزاب)',
    terrain: 'plain',
    terrainLabel: 'المدينة المنورة — الخندق الشمالي',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'حفر الخندق',
        description: 'بمشورة سلمان الفارسي، حُفر خندق عميق على الجهة الشمالية من المدينة — الجهة الوحيدة المكشوفة. عمل النبي ﷺ بيده مع أصحابه 15 يوماً.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 72, side: 'terrain', shape: 'diamond' },
          { id: 'trench', label: 'الخندق', x: 50, y: 45, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون يحفرون', count: '3000', x: 50, y: 55, side: 'muslim', shape: 'circle' },
        ],
      },
      {
        title: 'الأحزاب يصلون',
        description: 'وصل جيش الأحزاب عشرة آلاف مقاتل من قريش وغطفان وحلفائهم، فوجدوا الخندق حائلاً دون الدخول. خيّموا وحاصروا المدينة قرابة شهر.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 72, side: 'terrain', shape: 'diamond' },
          { id: 'trench', label: 'الخندق', x: 50, y: 45, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '3000', x: 50, y: 60, side: 'muslim', shape: 'circle' },
          { id: 'e_q', label: 'قريش', count: '4000', x: 30, y: 20, side: 'enemy', shape: 'circle' },
          { id: 'e_g', label: 'غطفان', count: '4000', x: 70, y: 20, side: 'enemy', shape: 'circle' },
          { id: 'e_o', label: 'الحلفاء', count: '2000', x: 50, y: 15, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'التخذيل — نعيم بن مسعود',
        description: 'أسلم نعيم بن مسعود الغطفاني سراً ودبّر خطة ذكية: أوقع الشك بين بني قريظة وقريش وغطفان فرفض كل طرف الهجوم قبل الحصول على رهائن من الطرف الآخر.',
        units: [
          { id: 'medina', label: 'المدينة', x: 50, y: 72, side: 'terrain', shape: 'diamond' },
          { id: 'trench', label: 'الخندق', x: 50, y: 45, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '3000', x: 50, y: 60, side: 'muslim', shape: 'circle' },
          { id: 'nuaym', label: 'نعيم — يتنقل', count: '1', x: 50, y: 30, side: 'muslim', shape: 'star' },
          { id: 'e_q', label: 'قريش', count: '4000', x: 25, y: 18, side: 'enemy', shape: 'circle' },
          { id: 'e_g', label: 'غطفان', count: '4000', x: 75, y: 18, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 45, y1: 30, x2: 28, y2: 22, color: '#facc15', label: 'يزرع الشك' },
          { id: 'a2', x1: 55, y1: 30, x2: 72, y2: 22, color: '#facc15', label: '' },
        ],
      },
      {
        title: 'الريح الإلهية — انهيار الأحزاب',
        description: 'أرسل الله ريحاً باردة شديدة في ليلة ظلماء اقتلعت خيام المشركين وأكفأت قدورهم. فقال أبو سفيان: يا معشر قريش، إنه لا مُقام لكم، فارتحلوا.',
        units: [
          { id: 'medina', label: 'المدينة — آمنة', x: 50, y: 72, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '3000', x: 50, y: 60, side: 'muslim', shape: 'circle' },
          { id: 'e_q', label: 'قريش تفرّ', count: '4000', x: 15, y: 12, side: 'enemy', shape: 'circle' },
          { id: 'e_g', label: 'غطفان تفرّ', count: '4000', x: 85, y: 12, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 28, y1: 20, x2: 12, y2: 12, color: '#f87171', label: 'فرار الأحزاب' },
          { id: 'a2', x1: 72, y1: 20, x2: 88, y2: 12, color: '#f87171', label: '' },
        ],
      },
    ],
  },

  // ─── 4. غزوة بني قينقاع (id:29) ───
  {
    eventId: 29,
    name: 'غزوة بني قينقاع',
    terrain: 'city',
    terrainLabel: 'المدينة المنورة — سوق بني قينقاع',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'نقض العهد في السوق',
        description: 'آذى يهود بني قينقاع امرأة مسلمة في سوقهم، فجرى خلاف أفضى إلى مقتل مسلم. فنقضوا بذلك صحيفة المدينة ومعاهدة السلم.',
        units: [
          { id: 'market', label: 'سوق بني قينقاع', x: 50, y: 40, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', x: 50, y: 72, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو قينقاع', count: '700', x: 50, y: 38, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'الحصار — خمسة عشر يوماً',
        description: 'أمر النبي ﷺ بمحاصرة بني قينقاع في حصنهم. دام الحصار خمسة عشر يوماً حتى استسلموا وطلبوا الأمان.',
        units: [
          { id: 'fort', label: 'حصن بني قينقاع', x: 50, y: 38, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون يحاصرون', count: '500+', x: 50, y: 60, side: 'muslim', shape: 'circle' },
          { id: 'm2', label: 'الميمنة', x: 70, y: 40, side: 'muslim', shape: 'circle' },
          { id: 'm3', label: 'الميسرة', x: 30, y: 40, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو قينقاع محاصرون', count: '700', x: 50, y: 30, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'الإجلاء — خروجهم من المدينة',
        description: 'استسلم بنو قينقاع وأُجلوا إلى أذرعات بالشام. وأُعفي عن دمائهم لشفاعة عبد الله بن أُبيّ. وكانت هذه أول عقوبة لمن نقض الصحيفة المدنية.',
        units: [
          { id: 'm1', label: 'المسلمون', count: '500+', x: 50, y: 55, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو قينقاع يرحلون', count: '700', x: 82, y: 25, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 55, y1: 40, x2: 80, y2: 25, color: '#f87171', label: 'إجلاء إلى الشام' },
        ],
      },
    ],
  },

  // ─── 5. غزوة بني النضير (id:30) ───
  {
    eventId: 30,
    name: 'غزوة بني النضير',
    terrain: 'fortress',
    terrainLabel: 'ضواحي المدينة — حصون بني النضير',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'مؤامرة الاغتيال',
        description: 'ذهب النبي ﷺ إلى بني النضير يطلب مساعدتهم في الدية. فتآمروا على إسقاط صخرة من السطح عليه. فأطلعه الله على مؤامرتهم فانسحب.',
        units: [
          { id: 'fort', label: 'حصون بني النضير', x: 50, y: 30, side: 'terrain', shape: 'diamond' },
          { id: 'm_prophet', label: 'النبي ﷺ', count: '1', x: 50, y: 45, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'بنو النضير', count: '2000', x: 50, y: 28, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 45, x2: 50, y2: 62, color: '#4ade80', label: 'ينسحب النبي ﷺ' },
        ],
      },
      {
        title: 'الحصار',
        description: 'عاد النبي ﷺ بجيشه وحاصر بني النضير في حصونهم. ودام الحصار خمسة عشر يوماً. وقطع النبي ﷺ النخيل ليُضعف مواردهم.',
        units: [
          { id: 'fort', label: 'حصون بني النضير', x: 50, y: 28, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '1000', x: 50, y: 58, side: 'muslim', shape: 'circle' },
          { id: 'm2', label: 'الميمنة', x: 75, y: 35, side: 'muslim', shape: 'circle' },
          { id: 'm3', label: 'الميسرة', x: 25, y: 35, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو النضير', count: '2000', x: 50, y: 22, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'الإجلاء — يهدمون بيوتهم بأيديهم',
        description: 'استسلم بنو النضير وطلبوا الخروج بأموالهم. فأُذن لهم. خرجوا يهدمون بيوتهم بأيديهم ليأخذوا أخشابها — في مشهد عبّرت عنه سورة الحشر.',
        units: [
          { id: 'm1', label: 'المسلمون', count: '1000', x: 40, y: 55, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو النضير يرحلون', count: '2000', x: 80, y: 22, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 60, y1: 30, x2: 82, y2: 22, color: '#f87171', label: 'إجلاء إلى خيبر' },
        ],
      },
    ],
  },

  // ─── 6. غزوة بني المصطلق (id:31) ───
  {
    eventId: 31,
    name: 'غزوة بني المصطلق (المُرَيسيع)',
    terrain: 'desert',
    terrainLabel: 'المُرَيسيع — قرب مكة',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'استعداد بني المصطلق للهجوم',
        description: 'علم النبي ﷺ بأن الحارث بن أبي ضرار زعيم بني المصطلق يجمع قومه للإغارة على المدينة. فبادر النبي ﷺ بالتحرك قبل اكتمال استعدادهم.',
        units: [
          { id: 'water', label: 'ماء المُرَيسيع', x: 50, y: 45, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون يتقدمون', count: '700', x: 50, y: 75, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو المصطلق', count: '800', x: 50, y: 25, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'المواجهة عند الماء',
        description: 'التقى الجيشان عند ماء المُرَيسيع. فتح المسلمون الهجوم بوابل من السهام ثم حملوا حملة واحدة. ففرّ بنو المصطلق وأُسر منهم جمع كبير.',
        units: [
          { id: 'water', label: 'ماء المُرَيسيع', x: 50, y: 45, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '700', x: 50, y: 60, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو المصطلق يتراجعون', count: '500', x: 50, y: 28, side: 'enemy', shape: 'circle' },
          { id: 'e_pris', label: 'الأسرى', count: '200', x: 75, y: 48, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 58, x2: 50, y2: 35, color: '#4ade80', label: 'هجوم المسلمين' },
        ],
      },
    ],
  },

  // ─── 7. غزوة خيبر (id:33) ───
  {
    eventId: 33,
    name: 'غزوة خيبر',
    terrain: 'fortress',
    terrainLabel: 'خيبر — شمال المدينة',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'الحصار — سبعة حصون',
        description: 'خرج النبي ﷺ بألف وستمئة مقاتل إلى خيبر. نزل الجيش بين خيبر والشام قاطعاً المدد. وبدأ حصار الحصون الواحد تلو الآخر.',
        units: [
          { id: 'f1', label: 'حصن ناعم', x: 30, y: 30, side: 'terrain', shape: 'diamond' },
          { id: 'f2', label: 'حصن القموص', x: 55, y: 25, side: 'terrain', shape: 'diamond' },
          { id: 'f3', label: 'حصن الوطيح', x: 75, y: 35, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '1600', x: 50, y: 70, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'يهود خيبر', count: '10000', x: 50, y: 28, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'علي يحمل الراية',
        description: 'قال النبي ﷺ: "لأعطينّ الراية غداً رجلاً يحب الله ورسوله". فأعطاها لعلي بن أبي طالب وكان رمداً فبصق في عينيه فبرأ. فتقدم علي نحو الحصن.',
        units: [
          { id: 'f2', label: 'حصن القموص', x: 55, y: 25, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '1600', x: 50, y: 72, side: 'muslim', shape: 'circle' },
          { id: 'm_ali', label: 'علي — حامل الراية', count: '1', x: 55, y: 50, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'يهود خيبر', count: '10000', x: 50, y: 22, side: 'enemy', shape: 'circle' },
          { id: 'marhab', label: 'مرحب الأبطال', count: '1', x: 55, y: 35, side: 'enemy', shape: 'star' },
        ],
        arrows: [
          { id: 'a1', x1: 55, y1: 50, x2: 55, y2: 33, color: '#4ade80', label: 'علي يتقدم' },
        ],
      },
      {
        title: 'فتح خيبر',
        description: 'قتل علي بن أبي طالب مرحباً في المبارزة. اقتحم المسلمون الحصون واحداً واحداً. واتفق النبي ﷺ مع أهل خيبر على المزارعة: يبقون في أرضهم ويعطون نصف الغلة.',
        units: [
          { id: 'm1', label: 'المسلمون — الفاتحون', count: '1600', x: 50, y: 45, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'يهود خيبر — استسلموا', count: '10000', x: 50, y: 22, side: 'enemy', shape: 'circle' },
        ],
      },
    ],
  },

  // ─── 8. غزوة مؤتة (id:34) ───
  {
    eventId: 34,
    name: 'غزوة مؤتة',
    terrain: 'plain',
    terrainLabel: 'مؤتة — جنوب الأردن',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'اللقاء — ثلاثة آلاف أمام مئة ألف',
        description: 'التقى جيش المسلمين الثلاثة آلاف بالقوات الرومية وحلفائها التي تجاوزت مئة ألف. تصاف الجيشان في أرض مؤتة الجنوب الأردني.',
        units: [
          { id: 'm1', label: 'المسلمون', count: '3000', x: 30, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'zayd', label: 'زيد — القائد', count: '1', x: 30, y: 38, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'الروم وحلفاؤهم', count: '100000+', x: 72, y: 50, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'استشهاد القادة الثلاثة',
        description: 'استشهد زيد بن حارثة حاملاً الراية فأخذها جعفر بن أبي طالب فقُطعت يداه فضمّها بجذعيه حتى استُشهد فأخذها عبد الله بن رواحة فاستُشهد.',
        units: [
          { id: 'm1', label: 'المسلمون', count: '2900', x: 28, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'jafar', label: 'جعفر — الراية', count: '1', x: 35, y: 42, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'الروم وحلفاؤهم', count: '100000+', x: 72, y: 50, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 38, y1: 44, x2: 55, y2: 50, color: '#f87171', label: 'ضغط الأعداء' },
        ],
      },
      {
        title: 'خالد يأخذ القيادة',
        description: 'أخذ خالد بن الوليد الراية بعد استشهاد القادة الثلاثة. قاد الجيش بحكمة وأعاد تنظيمه فصمد في القتال.',
        units: [
          { id: 'm1', label: 'المسلمون', count: '2900', x: 28, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'khalid', label: 'خالد — القائد الجديد', count: '1', x: 32, y: 40, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'الروم', count: '100000+', x: 72, y: 50, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'الانسحاب المنظّم',
        description: 'أدرك خالد أن المواجهة الكاملة انتحار. فدبّر انسحاباً تكتيكياً منظّماً خدع الروم بتغيير تشكيل الجيش. وعاد المسلمون دون هزيمة كاملة.',
        units: [
          { id: 'm1', label: 'المسلمون ينسحبون', count: '2900', x: 18, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'الروم — متوقفون', count: '100000+', x: 72, y: 50, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 25, y1: 50, x2: 12, y2: 50, color: '#4ade80', label: 'انسحاب منظم' },
        ],
      },
    ],
  },

  // ─── 9. فتح مكة (id:15) ───
  {
    eventId: 15,
    name: 'فتح مكة المكرمة',
    terrain: 'city',
    terrainLabel: 'مكة المكرمة',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'الزحف بعشرة آلاف',
        description: 'خرج النبي ﷺ في رمضان سنة 8هـ بأعظم جيش عرفه الإسلام حتى ذلك الحين: عشرة آلاف مقاتل. وأشعل كل صحابي ناراً فرأى المشركون مئات الآلاف من النيران.',
        units: [
          { id: 'kaaba', label: 'الكعبة المشرفة', x: 50, y: 50, side: 'terrain', shape: 'diamond' },
          { id: 'm_n', label: 'الجيش الشمالي', count: '2500', x: 50, y: 10, side: 'muslim', shape: 'circle' },
          { id: 'm_s', label: 'الجيش الجنوبي — خالد', count: '2500', x: 50, y: 88, side: 'muslim', shape: 'circle' },
          { id: 'm_e', label: 'الجيش الشرقي', count: '2500', x: 88, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'm_w', label: 'الجيش الغربي', count: '2500', x: 12, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش', count: '?', x: 50, y: 45, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'إسلام أبي سفيان',
        description: 'خرج العباس باستقبال أبي سفيان وأدخله على النبي ﷺ فأسلم. وأعلن النبي ﷺ: من دخل دار أبي سفيان فهو آمن — فانهار الصمود المكي.',
        units: [
          { id: 'kaaba', label: 'الكعبة المشرفة', x: 50, y: 50, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'جيش الإسلام', count: '10000', x: 50, y: 22, side: 'muslim', shape: 'circle' },
          { id: 'abu_s', label: 'أبو سفيان — أسلم', count: '1', x: 50, y: 38, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'قريش — تتفرق', count: '?', x: 50, y: 55, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'الدخول — اليوم يوم المرحمة',
        description: 'دخل الجيش من أربعة محاور والنبي ﷺ خاشعاً على ناقته حتى كادت لحيته تمس الرحل شكراً لله. وقال: اليوم يوم المرحمة.',
        units: [
          { id: 'kaaba', label: 'الكعبة', x: 50, y: 50, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'النبي ﷺ وجيشه', count: '10000', x: 50, y: 35, side: 'muslim', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 35, x2: 50, y2: 47, color: '#4ade80', label: 'دخول مكة' },
        ],
      },
      {
        title: 'تطهير الكعبة — العفو العام',
        description: 'دخل ﷺ الكعبة وكسّر 360 صنماً. ثم وقف وقال لقريش: ما تظنون أني فاعل بكم؟ قالوا: أخ كريم. قال: اذهبوا فأنتم الطلقاء.',
        units: [
          { id: 'm1', label: 'المسلمون الفاتحون', count: '10000', x: 50, y: 38, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'الطلقاء — أُعفي عنهم', count: '?', x: 50, y: 62, side: 'enemy', shape: 'circle' },
        ],
      },
    ],
  },

  // ─── 10. غزوة حنين (id:35) ───
  {
    eventId: 35,
    name: 'غزوة حنين',
    terrain: 'valley',
    terrainLabel: 'وادي حنين — بين مكة والطائف',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'الكمين في الوادي',
        description: 'مشى اثنا عشر ألف مسلم بثقة عبر وادي حنين الضيق. وكان هوازن وثقيف قد نصبوا لهم كميناً في جنبات الوادي بقوس ورماية مكثفة.',
        units: [
          { id: 'valley', label: 'مضيق الوادي', x: 50, y: 50, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون يدخلون', count: '12000', x: 50, y: 72, side: 'muslim', shape: 'circle' },
          { id: 'e_r', label: 'رماة هوازن — كمين يمين', count: '3000', x: 80, y: 38, side: 'enemy', shape: 'star' },
          { id: 'e_l', label: 'رماة هوازن — كمين يسار', count: '3000', x: 20, y: 38, side: 'enemy', shape: 'star' },
          { id: 'e1', label: 'هوازن وثقيف', count: '20000', x: 50, y: 22, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 78, y1: 40, x2: 60, y2: 62, color: '#f87171', label: 'وابل السهام' },
          { id: 'a2', x1: 22, y1: 40, x2: 40, y2: 62, color: '#f87171', label: '' },
        ],
      },
      {
        title: 'الانكشاف — فرار بعض المسلمين',
        description: 'فوجئ المسلمون بوابل السهام من الجانبين فانكشفت مقدمتهم وانهزم بعضهم. وظلّ النبي ﷺ ثابتاً في أقل من عشرة من أصحابه ينادي: أنا النبي لا كذب.',
        units: [
          { id: 'm_retreat', label: 'المنهزمون', count: '?', x: 50, y: 85, side: 'muslim', shape: 'circle' },
          { id: 'm_prophet', label: 'النبي ﷺ ثابت', count: '10', x: 50, y: 55, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'هوازن يتقدمون', count: '20000', x: 50, y: 28, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 28, x2: 50, y2: 45, color: '#f87171', label: 'هجوم هوازن' },
        ],
      },
      {
        title: 'نداء العباس — المسلمون يتراجعون',
        description: 'نادى العباس بصوته الجهير: يا أصحاب السمرة! يا أصحاب سورة البقرة! فرجع المسلمون إلى النبي ﷺ كما يرجع الإبل إلى ولدها، وحملوا حملة صادقة.',
        units: [
          { id: 'm1', label: 'المسلمون يرجعون', count: '12000', x: 50, y: 48, side: 'muslim', shape: 'circle' },
          { id: 'm_prophet', label: 'النبي ﷺ', count: '1', x: 50, y: 40, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'هوازن', count: '20000', x: 50, y: 22, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 48, x2: 50, y2: 30, color: '#4ade80', label: 'الهجوم المضاد' },
        ],
      },
      {
        title: 'النصر والغنائم الكبرى',
        description: 'انتصر المسلمون انتصاراً ساحقاً. وكانت الغنائم ستة آلاف أسير وعشرون وأربعة آلاف بعير وأربعون ألف شاة. وعفا النبي ﷺ عن بني هوازن لاحقاً.',
        units: [
          { id: 'm1', label: 'المسلمون — الغالبون', count: '12000', x: 50, y: 42, side: 'muslim', shape: 'circle' },
          { id: 'e_flee', label: 'هوازن الفارّون', count: '?', x: 18, y: 15, side: 'enemy', shape: 'circle' },
          { id: 'e_pris', label: 'الأسرى 6000', count: '6000', x: 80, y: 65, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 32, y1: 25, x2: 18, y2: 15, color: '#f87171', label: 'فرار هوازن' },
        ],
      },
    ],
  },

  // ─── 11. غزوة تبوك (id:36) ───
  {
    eventId: 36,
    name: 'غزوة تبوك',
    terrain: 'desert',
    terrainLabel: 'تبوك — شمال شبه الجزيرة',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'النفير العام — جيش العسرة',
        description: 'في الصيف الحار وشحّ الأموال أعلن النبي ﷺ النفير. تسابق الصحابة: عثمان جهّز ثلاثمئة بعير، وجاء أبو بكر بماله كله. تجمّع ثلاثون ألفاً — أكبر جيش في السيرة.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 82, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'جيش العسرة', count: '30000', x: 50, y: 70, side: 'muslim', shape: 'circle' },
          { id: 'tabuk', label: 'تبوك', x: 50, y: 22, side: 'terrain', shape: 'diamond' },
          { id: 'rome', label: 'الروم البيزنطيون', count: '?', x: 50, y: 12, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'الزحف شمالاً — 700 كيلومتر',
        description: 'سار الجيش في الحر الشديد والجوع مئات الكيلومترات نحو تبوك شمالاً. يُقال إن الرجلين كانا يقتسمان التمرة الواحدة. وربط بعضهم الحجارة على بطونهم من الجوع.',
        units: [
          { id: 'medina', label: 'المدينة', x: 50, y: 82, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'الجيش يسير', count: '30000', x: 50, y: 52, side: 'muslim', shape: 'circle' },
          { id: 'tabuk', label: 'تبوك', x: 50, y: 22, side: 'terrain', shape: 'diamond' },
          { id: 'rome', label: 'الروم', count: '?', x: 50, y: 12, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 55, x2: 50, y2: 30, color: '#4ade80', label: 'الزحف شمالاً' },
        ],
      },
      {
        title: 'الوصول لتبوك — الروم يعتذرون',
        description: 'وصل الجيش الإسلامي تبوك فلم يجد الروم. كانوا قد انسحبوا بعيداً دون مواجهة. فبقي النبي ﷺ عشرين يوماً يأخذ عهود الجزية من القبائل الشمالية.',
        units: [
          { id: 'tabuk', label: 'تبوك', x: 50, y: 35, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'الجيش في تبوك', count: '30000', x: 50, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'rome', label: 'الروم انسحبوا', count: '?', x: 50, y: 12, side: 'enemy', shape: 'circle' },
          { id: 'tribes', label: 'قبائل الشمال — الجزية', count: '?', x: 80, y: 35, side: 'enemy', shape: 'star' },
        ],
      },
      {
        title: 'العودة المظفرة',
        description: 'عاد الجيش إلى المدينة وقد أثبت أن الإسلام لا يُستهان به أمام الإمبراطورية البيزنطية. وقُبلت توبة الثلاثة الذين تخلّفوا بعد خمسين يوماً من التوبة الصادقة.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 75, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'الجيش يعود', count: '30000', x: 50, y: 55, side: 'muslim', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 52, x2: 50, y2: 72, color: '#4ade80', label: 'العودة للمدينة' },
        ],
      },
    ],
  },

  // ─── 12. غزوة بواط (id:43) ───
  {
    eventId: 43,
    name: 'غزوة بواط',
    terrain: 'desert',
    terrainLabel: 'بواط — جبال جهينة',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'مسير الجيش نحو بواط',
        description: 'خرج النبي ﷺ بمئتي مقاتل من المهاجرين والأنصار متّجهاً نحو جبال جهينة للتعرّض لقافلة قريش التجارية التي يقودها أمية بن خلف في مئة وعشرين راكباً وألفي وخمسمائة بعير.',
        units: [
          { id: 'maquda', label: 'جبل بواط', x: 50, y: 25, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '200', x: 50, y: 72, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قافلة قريش', count: '120 راكب', x: 50, y: 18, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 68, x2: 50, y2: 38, color: '#4ade80', label: 'مسير المسلمين' },
        ],
      },
      {
        title: 'عودة دون لقاء',
        description: 'أخذت قافلة قريش طريقاً مختلفاً فلم يجد النبي ﷺ أحداً. فعاد بجيشه إلى المدينة دون قتال. وكانت هذه الغزوة رسالةً واضحةً بأن المسلمين يراقبون طرق التجارة.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 78, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون يعودون', count: '200', x: 50, y: 60, side: 'muslim', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 55, x2: 50, y2: 73, color: '#4ade80', label: 'العودة إلى المدينة' },
        ],
      },
    ],
  },

  // ─── 13. غزوة ذات الرقاع (id:44) ───
  {
    eventId: 44,
    name: 'غزوة ذات الرقاع',
    terrain: 'mountain',
    terrainLabel: 'نجد — جبال غطفان',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'المواجهة في نجد',
        description: 'خرج النبي ﷺ بسبعمائة مقاتل نحو قبائل غطفان وبني محارب في نجد. تمركز الجيش الإسلامي أمام تجمّعات القبائل التي كانت تستعد للإغارة على المدينة.',
        units: [
          { id: 'mt1', label: 'جبال نجد', x: 50, y: 15, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '700', x: 50, y: 65, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'غطفان وبني محارب', count: 'جموع', x: 50, y: 30, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 60, x2: 50, y2: 42, color: '#4ade80', label: 'تقدّم المسلمين' },
        ],
      },
      {
        title: 'صلاة الخوف لأول مرة',
        description: 'حضرت وقت الصلاة والجيشان متقابلان. فصلّى النبي ﷺ صلاة الخوف لأول مرة: تقدمت طائفة وصلّت ركعةً بينما أُخرى تحرس ثم تبادلتا المواقع. وكان هذا تشريعاً عظيماً ينبع من رحمة الله بعباده.',
        units: [
          { id: 'mt1', label: 'جبال نجد', x: 50, y: 15, side: 'terrain', shape: 'diamond' },
          { id: 'm_pray', label: 'طائفة تصلي', count: '350', x: 35, y: 62, side: 'muslim', shape: 'star' },
          { id: 'm_guard', label: 'طائفة تحرس', count: '350', x: 65, y: 62, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'العدو — يترقّب', count: 'جموع', x: 50, y: 28, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'انسحاب العدو',
        description: 'حين رأت القبائل جيش المسلمين وثباته تفرّقت إلى رؤوس الجبال دون مواجهة مباشرة. فعاد النبي ﷺ وقد أمّن الحدود وشرّع صلاة الخوف.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 82, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون — يعودون', count: '700', x: 50, y: 62, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'القبائل — تفرّقت', count: 'جموع', x: 22, y: 18, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 32, y1: 22, x2: 15, y2: 12, color: '#f87171', label: 'تفرّق القبائل' },
          { id: 'a2', x1: 50, y1: 58, x2: 50, y2: 77, color: '#4ade80', label: 'عودة المسلمين' },
        ],
      },
    ],
  },

  // ─── 14. غزوة دومة الجندل (id:45) ───
  {
    eventId: 45,
    name: 'غزوة دومة الجندل',
    terrain: 'plain',
    terrainLabel: 'دومة الجندل — شمال الجزيرة',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'الزحف الشمالي الكبير',
        description: 'خرج النبي ﷺ بألف مقاتل في مسيرة شاقّة طويلة عبر الصحراء نحو دومة الجندل على حدود الشام. وكان الهدف تأمين الشمال وكسر شوكة القبائل المجتمعة.',
        units: [
          { id: 'dom', label: 'دومة الجندل', x: 50, y: 18, side: 'terrain', shape: 'diamond' },
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 85, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'الجيش الإسلامي', count: '1000', x: 50, y: 65, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قبائل الشمال', count: 'جموع', x: 50, y: 22, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 60, x2: 50, y2: 32, color: '#4ade80', label: 'الزحف الشمالي' },
        ],
      },
      {
        title: 'انسحاب القبائل قبل المواجهة',
        description: 'حين وصل خبر الجيش الإسلامي إلى القبائل في الشمال، فرّت إلى البادية دون أن تجرؤ على المواجهة. فأرسى النبي ﷺ هيبة الإسلام في الشمال وعاد مظفّراً.',
        units: [
          { id: 'dom', label: 'دومة الجندل', x: 50, y: 25, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون — الشمال مُؤمَّن', count: '1000', x: 50, y: 42, side: 'muslim', shape: 'circle' },
          { id: 'e_flee', label: 'القبائل تفرّ إلى البادية', count: '?', x: 20, y: 15, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 32, y1: 18, x2: 15, y2: 12, color: '#f87171', label: 'فرار القبائل' },
        ],
      },
    ],
  },

  // ─── 15. غزوة بني قريظة (id:46) ───
  {
    eventId: 46,
    name: 'غزوة بني قريظة',
    terrain: 'fortress',
    terrainLabel: 'المدينة — حصون بني قريظة',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'بعد الخندق — أمر جبريل',
        description: 'لما انصرف الأحزاب جاء جبريل عليه السلام للنبي ﷺ أمراً بعدم وضع السلاح حتى الانتهاء من بني قريظة الذين غدروا أثناء حصار الخندق.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 30, side: 'terrain', shape: 'diamond' },
          { id: 'fort', label: 'حصون بني قريظة', x: 50, y: 75, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'جيش المسلمين', count: '3000', x: 50, y: 45, side: 'muslim', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 48, x2: 50, y2: 65, color: '#4ade80', label: 'التوجه لبني قريظة' },
        ],
      },
      {
        title: 'الحصار — خمسة وعشرون يوماً',
        description: 'ضرب المسلمون حصاراً خانقاً على حصون بني قريظة خمسةً وعشرين يوماً كاملة. بدأ الحصار يؤثر على معنوياتهم ومؤنتهم حتى نزلوا على حكم النبي ﷺ.',
        units: [
          { id: 'fort', label: 'حصون بني قريظة', x: 50, y: 40, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون — يحاصرون', count: '3000', x: 50, y: 65, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو قريظة في الحصن', count: '900+', x: 50, y: 35, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 35, y1: 60, x2: 38, y2: 45, color: '#4ade80', label: 'الحصار' },
          { id: 'a2', x1: 65, y1: 60, x2: 62, y2: 45, color: '#4ade80', label: '' },
        ],
      },
      {
        title: 'تحكيم سعد بن معاذ',
        description: 'طلب بنو قريظة الاحتكام إلى سيد الأوس سعد بن معاذ. فأتى سعد مجروحاً من الخندق. فحكم بقتل المقاتلة وسبي الذراري وتقسيم الأموال. فقال النبي ﷺ: حكمتَ بحكم الله من فوق سبع سماوات.',
        units: [
          { id: 'fort', label: 'الحصون', x: 50, y: 35, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'جيش المسلمين', count: '3000', x: 50, y: 68, side: 'muslim', shape: 'circle' },
          { id: 'saad', label: 'سعد بن معاذ — الحكم', count: '1', x: 50, y: 52, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'بنو قريظة — يستسلمون', count: '900+', x: 50, y: 28, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'وفاة سعد واهتزاز العرش',
        description: 'بعد إصداره الحكم مباشرةً انفجر جرح سعد فتوفي رضي الله عنه. فقال النبي ﷺ: اهتزّ عرش الرحمن لوفاة سعد بن معاذ. وكأنه ما بقيت له حاجة في الدنيا بعد أن أدّى ما عليه.',
        units: [
          { id: 'm1', label: 'المسلمون — حزن وفرح', count: '3000', x: 50, y: 55, side: 'muslim', shape: 'circle' },
          { id: 'saad', label: 'سعد — شهيد العرش', count: '1', x: 50, y: 40, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'بنو قريظة — استسلموا', count: '900+', x: 50, y: 22, side: 'enemy', shape: 'circle' },
        ],
      },
    ],
  },

  // ─── 16. غزوة الطائف (id:47) ───
  {
    eventId: 47,
    name: 'غزوة الطائف',
    terrain: 'mountain',
    terrainLabel: 'الطائف — الجبال المرتفعة',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'الحصار — ثقيف في حصنها',
        description: 'بعد حنين توجّه النبي ﷺ بجيشه نحو الطائف حيث تحصّنت ثقيف وفلول هوازن. وكانوا قد أعدّوا مؤونةً تكفيهم سنةً وحصنوا منازلهم تحصيناً شديداً في الجبال المرتفعة.',
        units: [
          { id: 'mt', label: 'جبال الطائف', x: 50, y: 15, side: 'terrain', shape: 'diamond' },
          { id: 'fort', label: 'حصن ثقيف', x: 50, y: 32, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'الجيش الإسلامي', count: '12000', x: 50, y: 68, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'ثقيف في الحصن', count: '?', x: 50, y: 27, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 63, x2: 50, y2: 42, color: '#4ade80', label: 'الزحف نحو الحصن' },
        ],
      },
      {
        title: 'المنجنيق والدبابة',
        description: 'أمر النبي ﷺ باستخدام المنجنيق لرمي الحصن وكانت أول مرة في السيرة. كما قدّم المسلمون الدبابة لاقتحام السور فرمتهم ثقيف بسكك الحديد المحمّاة بالنار.',
        units: [
          { id: 'fort', label: 'حصن ثقيف', x: 50, y: 28, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '12000', x: 50, y: 72, side: 'muslim', shape: 'circle' },
          { id: 'catapult', label: 'المنجنيق', count: '1', x: 30, y: 58, side: 'muslim', shape: 'star' },
          { id: 'dab', label: 'الدبابة', count: '1', x: 50, y: 48, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'ثقيف ترمي بالنار', count: '?', x: 50, y: 25, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 32, y1: 55, x2: 45, y2: 35, color: '#4ade80', label: 'قذائف المنجنيق' },
          { id: 'a2', x1: 50, y1: 22, x2: 50, y2: 38, color: '#f87171', label: 'نار ثقيف' },
        ],
      },
      {
        title: 'رفع الحصار والدعاء لثقيف',
        description: 'بعد ثمانية عشر أو عشرين يوماً رأى النبي ﷺ أن مواصلة الحصار لا طائل منه فرفعه. وحين حزن بعض الصحابة قال ﷺ: "اللهم اهدِ ثقيفاً وائتِ بهم." وجاءوا مسلمين في العام التالي.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 82, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون يعودون', count: '12000', x: 50, y: 62, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'ثقيف — لاحقاً أسلموا', count: '?', x: 50, y: 25, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 58, x2: 50, y2: 78, color: '#4ade80', label: 'العودة' },
        ],
      },
    ],
  },
  {
    eventId: 54,
    name: 'غزوة السويق',
    terrain: 'desert',
    terrainLabel: 'ضواحي المدينة',
    muslimColor: '#4ade80',
    enemyColor: '#f87171',
    phases: [
      {
        title: 'إغارة أبي سفيان وإحراق النخيل',
        description: 'خرج أبو سفيان في مئتي فارس من قريش يريد الانتقام لبدر، فأحرق نخلاً وبيوتاً في ضواحي المدينة وقتل رجلاً من الأنصار.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 75, side: 'terrain', shape: 'diamond' },
          { id: 'e1', label: 'أبو سفيان — 200 فارس', count: '200', x: 50, y: 25, side: 'enemy', shape: 'circle' },
          { id: 'e2', label: 'منطقة الإحراق', x: 50, y: 48, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 30, x2: 50, y2: 44, color: '#f87171', label: 'الإغارة' },
        ],
      },
      {
        title: 'فرار قريش وإلقاء السويق',
        description: 'حين سمع أبو سفيان بخروج النبي ﷺ في أثره أمر فرسانه بإلقاء أكياس السويق (الدقيق) ليخفّفوا الأحمال ويسرعوا الفرار. فجمعها المسلمون وسُمّيت الغزوة بالسويق.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 75, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'النبي ﷺ في المطاردة', count: '200', x: 50, y: 58, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش تفرّ شمالاً', count: '200', x: 50, y: 22, side: 'enemy', shape: 'circle' },
          { id: 'sw', label: 'السويق المُلقى', x: 50, y: 42, side: 'terrain', shape: 'diamond' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 54, x2: 50, y2: 38, color: '#4ade80', label: 'مطاردة' },
          { id: 'a2', x1: 50, y1: 30, x2: 50, y2: 16, color: '#f87171', label: 'فرار قريش' },
        ],
      },
    ],
  },
];
