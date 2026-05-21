<div dir="rtl">

# نور النبوة ﷺ

**موسوعة تفاعلية شاملة للسيرة النبوية الشريفة**

[![Live](https://img.shields.io/badge/الموقع-noor--alnubuwwah.x13labs.com-C9A84C?style=flat-square)](https://noor-alnubuwwah.x13labs.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com)

</div>

---

## عن المشروع

**نور النبوة** موسوعة ويب تفاعلية مبنية بأسلوب عصري، تأخذ الزائر في رحلة متكاملة عبر السيرة النبوية الشريفة — من المولد الكريم حتى الوفاة — مع تفاصيل دقيقة، ومصادر موثقة، وتجربة بصرية أنيقة تليق بعظمة الموضوع.

---

## الصفحات والمحتوى

| الصفحة | المحتوى |
|---|---|
| 🏠 الرئيسية | مدخل بصري مع ترحيب وروابط |
| 📅 التسلسل الزمني | خط زمني تفاعلي لأحداث السيرة |
| ✦ صفاته ﷺ | الأوصاف الجسدية والأخلاقية |
| ☀️ حياته اليومية ﷺ | عاداته وطريقة حياته ﷺ |
| 🗺️ رحلة الهجرة | مسار الهجرة إلى المدينة |
| ⚔️ غزواته ﷺ | الغزوات مع محاكاة المعارك |
| 🛡️ السرايا العسكرية | السرايا التي أرسلها ﷺ |
| 📜 رسائله للملوك | رسائل الدعوة للملوك والأمراء |
| 👑 أمهات المؤمنين | تراجم زوجاته الكريمات ﷺ |
| 👥 الصحابة الكرام | مشاهير الصحابة رضوان الله عليهم |
| ✨ معجزاته ﷺ | المعجزات الحسية والمعنوية |
| 🌳 شجرة النسب الشريف | النسب الكريم تفاعلياً |
| ❓ الاختبار التفاعلي | اختبر معلوماتك عن السيرة |
| 📖 خطبة الوداع | النص الكامل مع التفسير |
| 🔮 نبوءاته ﷺ | النبوءات وتحققها |
| 📛 أسماؤه ﷺ | أسماء النبي ﷺ ومعانيها |
| 🖊️ كتّاب الوحي | الصحابة الذين كتبوا الوحي |
| 📚 المصادر والمراجع | المراجع والمصادر المعتمدة |

---

## التقنيات المستخدمة

```
Next.js 16        — App Router + SSG (86 صفحة مُولَّدة مسبقاً)
React 19          — واجهة المستخدم
Tailwind CSS v4   — التصميم (CSS-first config)
Framer Motion 11  — الحركات والانتقالات
Mapbox GL         — خرائط تفاعلية
Lucide React      — أيقونات
TypeScript        — نظام الأنواع
Vercel            — النشر والاستضافة
```

---

## هيكل المشروع

```
├── nextapp/                  # تطبيق Next.js الرئيسي
│   ├── app/                  # App Router (صفحات + metadata)
│   │   ├── layout.tsx        # Root layout
│   │   ├── sitemap.ts        # Sitemap تلقائي
│   │   └── [page]/page.tsx   # صفحات المحتوى
│   ├── pages-src/            # مكونات الصفحات (منطق + UI)
│   ├── components/           # مكونات مشتركة
│   ├── context/              # React Context (Bookmarks, ReadingMode)
│   ├── data/                 # بيانات السيرة (seerah.ts)
│   └── public/               # ملفات ثابتة (favicon, صور)
├── backend/                  # خادم API (Node.js)
└── vercel.json               # إعداد Vercel (monorepo)
```

---

## تشغيل المشروع محلياً

```bash
# استنساخ المستودع
git clone https://github.com/SaadHASSON1/Noor-Alnubuwwah.git
cd Noor-Alnubuwwah/nextapp

# تثبيت المكتبات
npm install --legacy-peer-deps

# إعداد متغيرات البيئة
cp .env.example .env.local
# أضف NEXT_PUBLIC_MAPBOX_TOKEN في .env.local

# تشغيل بيئة التطوير
npm run dev
```

---

## المميزات التقنية

- **SEO كامل** — كل صفحة لها `<title>` و `<description>` و Open Graph
- **SSG** — 86 صفحة HTML مُولَّدة مسبقاً للسرعة الكاملة
- **وضع القراءة** — تحويل الموقع لخلفية فاتحة للقراءة المريحة
- **المحفوظات** — حفظ الأحداث والصفحات في localStorage
- **بحث عالمي** — بحث فوري عبر كل محتوى السيرة (Ctrl+K)
- **تصميم RTL** — مبني من الأساس للعربية
- **Sitemap تلقائي** — مُدرج في Google Search Console

---

## النشر

المشروع منشور تلقائياً على Vercel عند كل `push` إلى `main`.

🔗 **الموقع المباشر:** [noor-alnubuwwah.x13labs.com](https://noor-alnubuwwah.x13labs.com)

---

<div align="center">

صلى الله على سيدنا محمد وعلى آله وصحبه أجمعين

</div>
