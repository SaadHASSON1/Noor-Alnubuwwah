export interface MapLocation {
  id: string;
  arabicName: string;
  subtitle?: string;
  x: number;
  y: number;
  type: 'holy' | 'battle' | 'city';
  description: string;
  year?: string;
  eventId?: number;
  chapterName?: string;
}

export interface MapRoute {
  id: string;
  arabicName: string;
  path: string;
  color: string;
  type: 'hijra' | 'battle' | 'expedition';
}

/* ViewBox: "0 0 700 560"
   Approximate scale: x = (lon - 32) * 23, y = (35 - lat) * 23
   Peninsula covers roughly 35°E–58°E, 12°N–30°N                  */

export const PENINSULA_PATH =
  'M 72 135 L 120 118 L 180 108 L 240 105 L 300 108 L 355 118 L 380 138 ' +
  'L 420 148 L 455 162 L 478 182 L 492 205 L 500 232 L 508 260 ' +
  'L 518 285 L 532 310 L 548 330 L 558 348 ' +
  'L 545 378 L 525 408 L 495 435 L 462 455 L 428 468 ' +
  'L 390 478 L 355 484 L 320 488 L 285 490 L 252 488 ' +
  'L 220 484 L 195 478 L 175 468 ' +
  'L 158 450 L 145 428 L 138 402 L 135 375 L 135 348 ' +
  'L 138 320 L 142 295 L 145 268 L 142 240 L 138 212 ' +
  'L 132 185 L 125 165 L 118 150 L 88 140 Z';

/* Small Sinai peninsula (NW corner) */
export const SINAI_PATH =
  'M 72 135 L 58 118 L 48 100 L 56 85 L 68 98 L 75 118 Z';

export const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'mecca',
    arabicName: 'مكة المكرمة',
    subtitle: 'مسقط رأس النبي ﷺ ومهبط الوحي',
    x: 188, y: 325,
    type: 'holy',
    description: 'أم القرى وقبلة المسلمين، شهدت بداية الرسالة المحمدية وعاشت سنوات الدعوة والصبر والفتح المبين.',
  },
  {
    id: 'medina',
    arabicName: 'المدينة المنورة',
    subtitle: 'دار الهجرة وعاصمة الإسلام',
    x: 178, y: 248,
    type: 'holy',
    description: 'يثرب التي صارت المدينة المنورة، عاصمة أول دولة إسلامية ومدفن النبي ﷺ.',
  },
  {
    id: 'badr',
    arabicName: 'بـدر',
    subtitle: 'غزوة بدر الكبرى',
    x: 148, y: 270,
    type: 'battle',
    year: '2 هـ',
    description: 'أولى المعارك الفاصلة بين الإسلام والشرك، انتصر فيها 313 مسلماً على جيش قريش البالغ ألف مقاتل.',
  },
  {
    id: 'uhud',
    arabicName: 'أُحُد',
    subtitle: 'غزوة أحد',
    x: 175, y: 236,
    type: 'battle',
    year: '3 هـ',
    description: 'الجبل الذي أحبه النبي ﷺ، وشهد استشهاد سيد الشهداء حمزة بن عبد المطلب وسبعين من الصحابة.',
  },
  {
    id: 'khaybar',
    arabicName: 'خيبر',
    subtitle: 'فتح خيبر',
    x: 168, y: 210,
    type: 'battle',
    year: '7 هـ',
    description: 'قلاع اليهود في شمال الحجاز، فتحها النبي ﷺ وعلى رأسه علي بن أبي طالب ففتح الله على يديه.',
  },
  {
    id: 'tabuk',
    arabicName: 'تبوك',
    subtitle: 'غزوة تبوك',
    x: 106, y: 152,
    type: 'battle',
    year: '9 هـ',
    description: 'آخر غزوات النبي ﷺ الكبرى، قادها بنفسه شمالاً نحو الروم في أصعب الأوقات — غزوة العسرة.',
  },
  {
    id: 'taif',
    arabicName: 'الطائف',
    subtitle: 'دعوة ثقيف',
    x: 220, y: 332,
    type: 'city',
    description: 'مدينة الثقيف في الحجاز الجنوبي، رفضت دعوة النبي ﷺ يوم طاف بها وحيداً فصبر وعاد فاتحاً.',
  },
  {
    id: 'hudaybiyah',
    arabicName: 'الحديبية',
    subtitle: 'صلح الحديبية',
    x: 176, y: 314,
    type: 'city',
    year: '6 هـ',
    description: 'البئر القريبة من مكة حيث عُقد الصلح الذي وصفه القرآن بالفتح المبين وفتح الطريق لدخول مكة.',
  },
];

/* Hijra route: Mecca → south/west detour (avoiding Quraysh) → coast → Medina */
export const HIJRA_ROUTE: MapRoute = {
  id: 'hijra',
  arabicName: 'طريق الهجرة النبوية الشريفة',
  path: 'M 188 325 C 170 345, 138 342, 122 316 C 106 290, 116 268, 132 256 C 148 244, 164 244, 178 248',
  color: '#C9A84C',
  type: 'hijra',
};

/* Badr expedition route: Medina → Badr */
export const BATTLE_ROUTES: MapRoute[] = [
  {
    id: 'badr-route',
    arabicName: 'مسير غزوة بدر',
    path: 'M 178 248 L 148 270',
    color: '#E05C4B',
    type: 'battle',
  },
  {
    id: 'tabuk-route',
    arabicName: 'مسير غزوة تبوك',
    path: 'M 178 248 C 155 218, 128 188, 106 152',
    color: '#8B7EC8',
    type: 'expedition',
  },
];
