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
        description: 'سبق المسلمون إلى آبار بدر فنزلوا عندها، وجاء جيش قريش من الشمال. فتواجه الجيشان: ٣١٣ مسلماً في الجنوب في مقابل ٩٥٠ من قريش في الشمال.',
        units: [
          { id: 'wells', label: 'آبار بدر', x: 50, y: 50, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '٣١٣', x: 50, y: 78, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش', count: '٩٥٠', x: 50, y: 22, side: 'enemy', shape: 'circle' },
        ],
        arrows: [],
      },
      {
        title: 'المبارزة — فرسان قريش',
        description: 'خرج من قريش عتبة وشيبة والوليد يطلبون المبارزة. فخرج من المسلمين حمزة وعلي وعبيدة. وقُتل الثلاثة من قريش في مشهد حدّد نتيجة المعركة.',
        units: [
          { id: 'wells', label: 'آبار بدر', x: 50, y: 50, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '٣١٣', x: 50, y: 75, side: 'muslim', shape: 'circle' },
          { id: 'mu', label: 'حمزة وعلي', count: '٣', x: 50, y: 60, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'قريش', count: '٩٤٧', x: 50, y: 25, side: 'enemy', shape: 'circle' },
          { id: 'eu', label: 'عتبة وشيبة', count: '٣', x: 50, y: 42, side: 'enemy', shape: 'star' },
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
          { id: 'm1', label: 'المسلمون', count: '٣١٣', x: 50, y: 55, side: 'muslim', shape: 'circle' },
          { id: 'm2', label: 'الميمنة', count: '١٠٠', x: 25, y: 48, side: 'muslim', shape: 'circle' },
          { id: 'm3', label: 'الميسرة', count: '١٠٠', x: 75, y: 48, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش', count: '٩٥٠', x: 50, y: 28, side: 'enemy', shape: 'circle' },
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
          { id: 'm1', label: 'المسلمون منتصرون', count: '٣١٣', x: 50, y: 40, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش الفارّة', count: '٨٣٠', x: 25, y: 15, side: 'enemy', shape: 'circle' },
          { id: 'e2', label: 'الأسرى', count: '٧٠', x: 75, y: 60, side: 'enemy', shape: 'circle' },
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
          { id: 'm1', label: 'المسلمون ٧٠٠', count: '٧٠٠', x: 50, y: 38, side: 'muslim', shape: 'circle' },
          { id: 'm_arch', label: 'الرماة ٥٠', count: '٥٠', x: 15, y: 38, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'قريش ٣٠٠٠', count: '٣٠٠٠', x: 50, y: 72, side: 'enemy', shape: 'circle' },
          { id: 'khalid', label: 'خالد — الفرسان', count: '٢٠٠', x: 82, y: 60, side: 'enemy', shape: 'star' },
        ],
      },
      {
        title: 'الهجوم الأول — المسلمون يتقدمون',
        description: 'هجم المسلمون بقوة وانهزم المشركون في البداية. نساء قريش يفرّن والغنائم في متناول اليد. أصحاب النبي ﷺ يتقدمون في الميدان.',
        units: [
          { id: 'uhud', label: 'جبل أحد', x: 50, y: 5, side: 'terrain', shape: 'diamond' },
          { id: 'archers_hill', label: 'جبيل الرماة', x: 15, y: 30, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون يتقدمون', count: '٧٠٠', x: 50, y: 58, side: 'muslim', shape: 'circle' },
          { id: 'm_arch', label: 'الرماة ٥٠', count: '٥٠', x: 15, y: 38, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'قريش يتراجعون', count: '٣٠٠٠', x: 50, y: 82, side: 'enemy', shape: 'circle' },
          { id: 'khalid', label: 'خالد — ينتظر', count: '٢٠٠', x: 82, y: 68, side: 'enemy', shape: 'star' },
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
          { id: 'm1', label: 'المسلمون', count: '٧٠٠', x: 50, y: 62, side: 'muslim', shape: 'circle' },
          { id: 'm_arch_left', label: 'الرماة تركوا', count: '٤٠', x: 35, y: 52, side: 'muslim', shape: 'star' },
          { id: 'm_arch_stay', label: 'الثابتون', count: '١٠', x: 15, y: 38, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'قريش يتوقفون', count: '٣٠٠٠', x: 50, y: 80, side: 'enemy', shape: 'circle' },
          { id: 'khalid', label: 'خالد يتحرك!', count: '٢٠٠', x: 82, y: 55, side: 'enemy', shape: 'star' },
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
          { id: 'm1', label: 'المسلمون محاصرون', count: '٧٠٠', x: 50, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش — الأمام', count: '٣٠٠٠', x: 50, y: 75, side: 'enemy', shape: 'circle' },
          { id: 'khalid_back', label: 'خالد — الخلف', count: '٢٠٠', x: 50, y: 25, side: 'enemy', shape: 'star' },
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
          { id: 'm1', label: 'المسلمون على أُحد', count: '٦٠٠', x: 50, y: 22, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش تنسحب', count: '٣٠٠٠', x: 50, y: 78, side: 'enemy', shape: 'circle' },
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
        description: 'بمشورة سلمان الفارسي، حُفر خندق عميق على الجهة الشمالية من المدينة — الجهة الوحيدة المكشوفة. عمل النبي ﷺ بيده مع أصحابه ١٥ يوماً.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 72, side: 'terrain', shape: 'diamond' },
          { id: 'trench', label: 'الخندق', x: 50, y: 45, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون يحفرون', count: '٣٠٠٠', x: 50, y: 55, side: 'muslim', shape: 'circle' },
        ],
      },
      {
        title: 'الأحزاب يصلون',
        description: 'وصل جيش الأحزاب عشرة آلاف مقاتل من قريش وغطفان وحلفائهم، فوجدوا الخندق حائلاً دون الدخول. خيّموا وحاصروا المدينة قرابة شهر.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 72, side: 'terrain', shape: 'diamond' },
          { id: 'trench', label: 'الخندق', x: 50, y: 45, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '٣٠٠٠', x: 50, y: 60, side: 'muslim', shape: 'circle' },
          { id: 'e_q', label: 'قريش', count: '٤٠٠٠', x: 30, y: 20, side: 'enemy', shape: 'circle' },
          { id: 'e_g', label: 'غطفان', count: '٤٠٠٠', x: 70, y: 20, side: 'enemy', shape: 'circle' },
          { id: 'e_o', label: 'الحلفاء', count: '٢٠٠٠', x: 50, y: 15, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'التخذيل — نعيم بن مسعود',
        description: 'أسلم نعيم بن مسعود الغطفاني سراً ودبّر خطة ذكية: أوقع الشك بين بني قريظة وقريش وغطفان فرفض كل طرف الهجوم قبل الحصول على رهائن من الطرف الآخر.',
        units: [
          { id: 'medina', label: 'المدينة', x: 50, y: 72, side: 'terrain', shape: 'diamond' },
          { id: 'trench', label: 'الخندق', x: 50, y: 45, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '٣٠٠٠', x: 50, y: 60, side: 'muslim', shape: 'circle' },
          { id: 'nuaym', label: 'نعيم — يتنقل', count: '١', x: 50, y: 30, side: 'muslim', shape: 'star' },
          { id: 'e_q', label: 'قريش', count: '٤٠٠٠', x: 25, y: 18, side: 'enemy', shape: 'circle' },
          { id: 'e_g', label: 'غطفان', count: '٤٠٠٠', x: 75, y: 18, side: 'enemy', shape: 'circle' },
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
          { id: 'm1', label: 'المسلمون', count: '٣٠٠٠', x: 50, y: 60, side: 'muslim', shape: 'circle' },
          { id: 'e_q', label: 'قريش تفرّ', count: '٤٠٠٠', x: 15, y: 12, side: 'enemy', shape: 'circle' },
          { id: 'e_g', label: 'غطفان تفرّ', count: '٤٠٠٠', x: 85, y: 12, side: 'enemy', shape: 'circle' },
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
          { id: 'e1', label: 'بنو قينقاع', count: '٧٠٠', x: 50, y: 38, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'الحصار — خمسة عشر يوماً',
        description: 'أمر النبي ﷺ بمحاصرة بني قينقاع في حصنهم. دام الحصار خمسة عشر يوماً حتى استسلموا وطلبوا الأمان.',
        units: [
          { id: 'fort', label: 'حصن بني قينقاع', x: 50, y: 38, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون يحاصرون', count: '٥٠٠+', x: 50, y: 60, side: 'muslim', shape: 'circle' },
          { id: 'm2', label: 'الميمنة', x: 70, y: 40, side: 'muslim', shape: 'circle' },
          { id: 'm3', label: 'الميسرة', x: 30, y: 40, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو قينقاع محاصرون', count: '٧٠٠', x: 50, y: 30, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'الإجلاء — خروجهم من المدينة',
        description: 'استسلم بنو قينقاع وأُجلوا إلى أذرعات بالشام. وأُعفي عن دمائهم لشفاعة عبد الله بن أُبيّ. وكانت هذه أول عقوبة لمن نقض الصحيفة المدنية.',
        units: [
          { id: 'm1', label: 'المسلمون', count: '٥٠٠+', x: 50, y: 55, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو قينقاع يرحلون', count: '٧٠٠', x: 82, y: 25, side: 'enemy', shape: 'circle' },
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
          { id: 'm_prophet', label: 'النبي ﷺ', count: '١', x: 50, y: 45, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'بنو النضير', count: '٢٠٠٠', x: 50, y: 28, side: 'enemy', shape: 'circle' },
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
          { id: 'm1', label: 'المسلمون', count: '١٠٠٠', x: 50, y: 58, side: 'muslim', shape: 'circle' },
          { id: 'm2', label: 'الميمنة', x: 75, y: 35, side: 'muslim', shape: 'circle' },
          { id: 'm3', label: 'الميسرة', x: 25, y: 35, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو النضير', count: '٢٠٠٠', x: 50, y: 22, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'الإجلاء — يهدمون بيوتهم بأيديهم',
        description: 'استسلم بنو النضير وطلبوا الخروج بأموالهم. فأُذن لهم. خرجوا يهدمون بيوتهم بأيديهم ليأخذوا أخشابها — في مشهد عبّرت عنه سورة الحشر.',
        units: [
          { id: 'm1', label: 'المسلمون', count: '١٠٠٠', x: 40, y: 55, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو النضير يرحلون', count: '٢٠٠٠', x: 80, y: 22, side: 'enemy', shape: 'circle' },
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
          { id: 'm1', label: 'المسلمون يتقدمون', count: '٧٠٠', x: 50, y: 75, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو المصطلق', count: '٨٠٠', x: 50, y: 25, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'المواجهة عند الماء',
        description: 'التقى الجيشان عند ماء المُرَيسيع. فتح المسلمون الهجوم بوابل من السهام ثم حملوا حملة واحدة. ففرّ بنو المصطلق وأُسر منهم جمع كبير.',
        units: [
          { id: 'water', label: 'ماء المُرَيسيع', x: 50, y: 45, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '٧٠٠', x: 50, y: 60, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'بنو المصطلق يتراجعون', count: '٥٠٠', x: 50, y: 28, side: 'enemy', shape: 'circle' },
          { id: 'e_pris', label: 'الأسرى', count: '٢٠٠', x: 75, y: 48, side: 'enemy', shape: 'circle' },
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
          { id: 'm1', label: 'المسلمون', count: '١٦٠٠', x: 50, y: 70, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'يهود خيبر', count: '١٠٠٠٠', x: 50, y: 28, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'علي يحمل الراية',
        description: 'قال النبي ﷺ: "لأعطينّ الراية غداً رجلاً يحب الله ورسوله". فأعطاها لعلي بن أبي طالب وكان رمداً فبصق في عينيه فبرأ. فتقدم علي نحو الحصن.',
        units: [
          { id: 'f2', label: 'حصن القموص', x: 55, y: 25, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'المسلمون', count: '١٦٠٠', x: 50, y: 72, side: 'muslim', shape: 'circle' },
          { id: 'm_ali', label: 'علي — حامل الراية', count: '١', x: 55, y: 50, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'يهود خيبر', count: '١٠٠٠٠', x: 50, y: 22, side: 'enemy', shape: 'circle' },
          { id: 'marhab', label: 'مرحب الأبطال', count: '١', x: 55, y: 35, side: 'enemy', shape: 'star' },
        ],
        arrows: [
          { id: 'a1', x1: 55, y1: 50, x2: 55, y2: 33, color: '#4ade80', label: 'علي يتقدم' },
        ],
      },
      {
        title: 'فتح خيبر',
        description: 'قتل علي بن أبي طالب مرحباً في المبارزة. اقتحم المسلمون الحصون واحداً واحداً. واتفق النبي ﷺ مع أهل خيبر على المزارعة: يبقون في أرضهم ويعطون نصف الغلة.',
        units: [
          { id: 'm1', label: 'المسلمون — الفاتحون', count: '١٦٠٠', x: 50, y: 45, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'يهود خيبر — استسلموا', count: '١٠٠٠٠', x: 50, y: 22, side: 'enemy', shape: 'circle' },
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
          { id: 'm1', label: 'المسلمون', count: '٣٠٠٠', x: 30, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'zayd', label: 'زيد — القائد', count: '١', x: 30, y: 38, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'الروم وحلفاؤهم', count: '١٠٠٠٠٠+', x: 72, y: 50, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'استشهاد القادة الثلاثة',
        description: 'استشهد زيد بن حارثة حاملاً الراية فأخذها جعفر بن أبي طالب فقُطعت يداه فضمّها بجذعيه حتى استُشهد فأخذها عبد الله بن رواحة فاستُشهد.',
        units: [
          { id: 'm1', label: 'المسلمون', count: '٢٩٠٠', x: 28, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'jafar', label: 'جعفر — الراية', count: '١', x: 35, y: 42, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'الروم وحلفاؤهم', count: '١٠٠٠٠٠+', x: 72, y: 50, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 38, y1: 44, x2: 55, y2: 50, color: '#f87171', label: 'ضغط الأعداء' },
        ],
      },
      {
        title: 'خالد يأخذ القيادة',
        description: 'أخذ خالد بن الوليد الراية بعد استشهاد القادة الثلاثة. قاد الجيش بحكمة وأعاد تنظيمه فصمد في القتال.',
        units: [
          { id: 'm1', label: 'المسلمون', count: '٢٩٠٠', x: 28, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'khalid', label: 'خالد — القائد الجديد', count: '١', x: 32, y: 40, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'الروم', count: '١٠٠٠٠٠+', x: 72, y: 50, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'الانسحاب المنظّم',
        description: 'أدرك خالد أن المواجهة الكاملة انتحار. فدبّر انسحاباً تكتيكياً منظّماً خدع الروم بتغيير تشكيل الجيش. وعاد المسلمون دون هزيمة كاملة.',
        units: [
          { id: 'm1', label: 'المسلمون ينسحبون', count: '٢٩٠٠', x: 18, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'الروم — متوقفون', count: '١٠٠٠٠٠+', x: 72, y: 50, side: 'enemy', shape: 'circle' },
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
        description: 'خرج النبي ﷺ في رمضان سنة ٨هـ بأعظم جيش عرفه الإسلام حتى ذلك الحين: عشرة آلاف مقاتل. وأشعل كل صحابي ناراً فرأى المشركون مئات الآلاف من النيران.',
        units: [
          { id: 'kaaba', label: 'الكعبة المشرفة', x: 50, y: 50, side: 'terrain', shape: 'diamond' },
          { id: 'm_n', label: 'الجيش الشمالي', count: '٢٥٠٠', x: 50, y: 10, side: 'muslim', shape: 'circle' },
          { id: 'm_s', label: 'الجيش الجنوبي — خالد', count: '٢٥٠٠', x: 50, y: 88, side: 'muslim', shape: 'circle' },
          { id: 'm_e', label: 'الجيش الشرقي', count: '٢٥٠٠', x: 88, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'm_w', label: 'الجيش الغربي', count: '٢٥٠٠', x: 12, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'e1', label: 'قريش', count: '?', x: 50, y: 45, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'إسلام أبي سفيان',
        description: 'خرج العباس باستقبال أبي سفيان وأدخله على النبي ﷺ فأسلم. وأعلن النبي ﷺ: من دخل دار أبي سفيان فهو آمن — فانهار الصمود المكي.',
        units: [
          { id: 'kaaba', label: 'الكعبة المشرفة', x: 50, y: 50, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'جيش الإسلام', count: '١٠٠٠٠', x: 50, y: 22, side: 'muslim', shape: 'circle' },
          { id: 'abu_s', label: 'أبو سفيان — أسلم', count: '١', x: 50, y: 38, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'قريش — تتفرق', count: '?', x: 50, y: 55, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'الدخول — اليوم يوم المرحمة',
        description: 'دخل الجيش من أربعة محاور والنبي ﷺ خاشعاً على ناقته حتى كادت لحيته تمس الرحل شكراً لله. وقال: اليوم يوم المرحمة.',
        units: [
          { id: 'kaaba', label: 'الكعبة', x: 50, y: 50, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'النبي ﷺ وجيشه', count: '١٠٠٠٠', x: 50, y: 35, side: 'muslim', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 35, x2: 50, y2: 47, color: '#4ade80', label: 'دخول مكة' },
        ],
      },
      {
        title: 'تطهير الكعبة — العفو العام',
        description: 'دخل ﷺ الكعبة وكسّر ٣٦٠ صنماً. ثم وقف وقال لقريش: ما تظنون أني فاعل بكم؟ قالوا: أخ كريم. قال: اذهبوا فأنتم الطلقاء.',
        units: [
          { id: 'm1', label: 'المسلمون الفاتحون', count: '١٠٠٠٠', x: 50, y: 38, side: 'muslim', shape: 'circle' },
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
          { id: 'm1', label: 'المسلمون يدخلون', count: '١٢٠٠٠', x: 50, y: 72, side: 'muslim', shape: 'circle' },
          { id: 'e_r', label: 'رماة هوازن — كمين يمين', count: '٣٠٠٠', x: 80, y: 38, side: 'enemy', shape: 'star' },
          { id: 'e_l', label: 'رماة هوازن — كمين يسار', count: '٣٠٠٠', x: 20, y: 38, side: 'enemy', shape: 'star' },
          { id: 'e1', label: 'هوازن وثقيف', count: '٢٠٠٠٠', x: 50, y: 22, side: 'enemy', shape: 'circle' },
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
          { id: 'm_prophet', label: 'النبي ﷺ ثابت', count: '١٠', x: 50, y: 55, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'هوازن يتقدمون', count: '٢٠٠٠٠', x: 50, y: 28, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 28, x2: 50, y2: 45, color: '#f87171', label: 'هجوم هوازن' },
        ],
      },
      {
        title: 'نداء العباس — المسلمون يتراجعون',
        description: 'نادى العباس بصوته الجهير: يا أصحاب السمرة! يا أصحاب سورة البقرة! فرجع المسلمون إلى النبي ﷺ كما يرجع الإبل إلى ولدها، وحملوا حملة صادقة.',
        units: [
          { id: 'm1', label: 'المسلمون يرجعون', count: '١٢٠٠٠', x: 50, y: 48, side: 'muslim', shape: 'circle' },
          { id: 'm_prophet', label: 'النبي ﷺ', count: '١', x: 50, y: 40, side: 'muslim', shape: 'star' },
          { id: 'e1', label: 'هوازن', count: '٢٠٠٠٠', x: 50, y: 22, side: 'enemy', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 48, x2: 50, y2: 30, color: '#4ade80', label: 'الهجوم المضاد' },
        ],
      },
      {
        title: 'النصر والغنائم الكبرى',
        description: 'انتصر المسلمون انتصاراً ساحقاً. وكانت الغنائم ستة آلاف أسير وعشرون وأربعة آلاف بعير وأربعون ألف شاة. وعفا النبي ﷺ عن بني هوازن لاحقاً.',
        units: [
          { id: 'm1', label: 'المسلمون — الغالبون', count: '١٢٠٠٠', x: 50, y: 42, side: 'muslim', shape: 'circle' },
          { id: 'e_flee', label: 'هوازن الفارّون', count: '?', x: 18, y: 15, side: 'enemy', shape: 'circle' },
          { id: 'e_pris', label: 'الأسرى ٦٠٠٠', count: '٦٠٠٠', x: 80, y: 65, side: 'enemy', shape: 'circle' },
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
          { id: 'm1', label: 'جيش العسرة', count: '٣٠٠٠٠', x: 50, y: 70, side: 'muslim', shape: 'circle' },
          { id: 'tabuk', label: 'تبوك', x: 50, y: 22, side: 'terrain', shape: 'diamond' },
          { id: 'rome', label: 'الروم البيزنطيون', count: '?', x: 50, y: 12, side: 'enemy', shape: 'circle' },
        ],
      },
      {
        title: 'الزحف شمالاً — ٧٠٠ كيلومتر',
        description: 'سار الجيش في الحر الشديد والجوع مئات الكيلومترات نحو تبوك شمالاً. يُقال إن الرجلين كانا يقتسمان التمرة الواحدة. وربط بعضهم الحجارة على بطونهم من الجوع.',
        units: [
          { id: 'medina', label: 'المدينة', x: 50, y: 82, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'الجيش يسير', count: '٣٠٠٠٠', x: 50, y: 52, side: 'muslim', shape: 'circle' },
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
          { id: 'm1', label: 'الجيش في تبوك', count: '٣٠٠٠٠', x: 50, y: 50, side: 'muslim', shape: 'circle' },
          { id: 'rome', label: 'الروم انسحبوا', count: '?', x: 50, y: 12, side: 'enemy', shape: 'circle' },
          { id: 'tribes', label: 'قبائل الشمال — الجزية', count: '?', x: 80, y: 35, side: 'enemy', shape: 'star' },
        ],
      },
      {
        title: 'العودة المظفرة',
        description: 'عاد الجيش إلى المدينة وقد أثبت أن الإسلام لا يُستهان به أمام الإمبراطورية البيزنطية. وقُبلت توبة الثلاثة الذين تخلّفوا بعد خمسين يوماً من التوبة الصادقة.',
        units: [
          { id: 'medina', label: 'المدينة المنورة', x: 50, y: 75, side: 'terrain', shape: 'diamond' },
          { id: 'm1', label: 'الجيش يعود', count: '٣٠٠٠٠', x: 50, y: 55, side: 'muslim', shape: 'circle' },
        ],
        arrows: [
          { id: 'a1', x1: 50, y1: 52, x2: 50, y2: 72, color: '#4ade80', label: 'العودة للمدينة' },
        ],
      },
    ],
  },
];
