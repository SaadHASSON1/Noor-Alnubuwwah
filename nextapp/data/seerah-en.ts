/* ─────────────────────────────────────────────────────────────
   English content overlay for all Seerah events.
   Keyed by event id.  Only text fields are stored here —
   colours, types and dates stay in the Arabic source.
───────────────────────────────────────────────────────────── */

export interface SeerahEventEn {
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  fullDescription?: string;
  highlights?: string[];
  location?: string;
}

export const SEERAH_EN: Record<number, SeerahEventEn> = {

  /* ── 1 ── Birth ───────────────────────────────────────────── */
  1: {
    title: "The Prophet's Birth ﷺ",
    subtitle: 'The Year of the Elephant',
    highlight: 'The Light',
    location: 'Mecca — Valley of Banu Hashim',
    description:
      'On Monday the 12th of Rabiʼ al-Awwal in the Year of the Elephant (571 CE), the Prophet Muhammad ibn ʿAbdullah al-Hashimi ﷺ was born in Mecca. He came into the world an orphan, his father having passed before his birth. That same year Allah had repelled the army of the Elephant that sought to demolish the Kaʻah — as if purifying the earth to receive the noblest of all creations.',
    fullDescription:
      'The Prophet Muhammad ﷺ was born in Mecca on Monday, the 12th of Rabiʼ al-Awwal in the Year of the Elephant, corresponding to 571 CE. He was born in the house of his father ʿAbdullah ibn ʿAbd al-Muttalib, yet he entered the world an orphan, placed entirely under the providential care of Allah.\n\nThat year witnessed a remarkable sign: Allah sent the Ababeel birds carrying clay stones to destroy the army of Abraha the Abyssinian, who had marched toward Mecca with war elephants intending to demolish the Kaʻah. The army was annihilated — as though the Most High was cleansing the earth before the arrival of His most beloved creation.\n\nHis mother Āminah bint Wahb saw during her pregnancy a light that burst forth from her, illuminating the palaces of Syria — a divine herald of the child she carried. He was first nursed by Thuwaybah, the freed slave of his uncle Abū Lahab, then sent to the desert of Banū Saʿd to be nursed by Ḥalīmah al-Saʿdīyah. The family of Ḥalīmah was blessed with abundance from the moment he arrived.\n\nThe Prophet ﷺ used to fast on Mondays, saying this was the day he was born and the day revelation descended upon him — teaching his nation that gratitude to Allah is expressed through worship. He described himself as ‘the supplication of my father Ibrahim and the glad tidings of ʿIsa,’ affirming that his coming was foretold across the entire prophetic tradition.',
    highlights: [
      'Born in the Year of the Elephant — the very year Allah destroyed the army that came to demolish the Kaʻah',
      'His mother Āminah saw a light in a dream that illuminated the palaces of Syria, heralding his greatness',
      'Born an orphan — as though Allah willed to personally undertake his upbringing and preparation',
      'Named Muḥammad (the Praised One) and Aḥmad (the Most Praising of Allah)',
      'Ḥalīmah al-Saʿdīyah’s family was blessed with abundance from the moment he arrived',
    ],
  },

  /* ── 19 ── Opening of the Chest ──────────────────────────── */
  19: {
    title: 'The Opening of the Chest ﷺ',
    subtitle: 'Purification of the Prophet’s Heart',
    highlight: 'A Pure Heart',
    location: 'Desert of Banū Saʿd — Hawāzin',
    description:
      'While in the care of his wet nurse Ḥalīmah al-Saʿdīyah, two angels appeared to the young Muḥammad ﷺ, opened his chest, removed his heart, washed it with Zamzam water in a golden basin, extracted the portion of Satan, and restored it. This divine purification was preparation for the bearer of the Final Message.',
    fullDescription:
      'In the desert of Banū Saʿd, while around four years old, the young Muḥammad ﷺ witnessed a momentous event. Two angels in white came to him, laid him down, opened his noble chest, and removed his heart. They extracted a black clot, saying: “This is the portion of Shayṭān in you.” They washed his heart with Zamzam water in a golden basin, filled it with faith and wisdom, and returned it to its place.\n\nThe children playing nearby ran in alarm to Ḥalīmah, saying their foster-brother had collapsed. She found him pale and trembling, held him close, and returned him to his mother in Mecca.\n\nThis purification was a direct divine preparation of the Prophet’s heart ﷺ — making it the purest and most receptive vessel for revelation and the Final Message. The opening of the chest was repeated a second time on the Night of the Isrāʼ and Miʼrāj, before his ascent through the heavens.',
    highlights: [
      'The angels said “This is the portion of Shayṭān in you” — showing the Prophet ﷺ was uniquely protected from satanic influence',
      'The opening of the chest was repeated before the Night Journey — a second purification before meeting Allah',
      'Ḥalīmah’s children were so frightened they ran to her crying that their foster-brother had been harmed',
      'Allah alluded to this event: “Did We not expand your chest for you?” (Qūrʾaḥ 94:1)',
    ],
  },

  /* ── 2 ── Death of His Mother ────────────────────────────── */
  2: {
    title: 'Death of His Mother',
    subtitle: 'The Orphan Raised by Allah',
    highlight: 'Raised by His Lord',
    location: 'Al-Abwāʼ — between Mecca and Medina',
    description:
      'At six years old, the Prophet ﷺ lost his mother Āminah bint Wahb in the town of Al-Abwāʼ as she returned from visiting her husband’s grave in Medina. His orphanhood was now complete. He was taken into the care of his grandfather ʿAbd al-Muṭṭalib, and after his death, his uncle Abū Ṭālib.',
    fullDescription:
      'Barely six years old, the young Muḥammad ﷺ lost his mother Āminah bint Wahb on the road back from Medina, where she had taken him to visit his father’s grave and meet his maternal relatives among Banū ʿAdī ibn al-Najjār. She passed away in al-Abwāʼ and was buried there, far from her homeland.\n\nHe returned to Mecca with his nurse Umm Ayman Barakah, carrying a second grief added to his original orphanhood. His grandfather ʿAbd al-Muṭṭalib — chief of Quraysh — took him in and loved him deeply, seating him on his own mat in the shade of the Kaʻah. Two years later ʿAbd al-Muṭṭalib also passed, and guardianship passed to his uncle Abū Ṭālib, who sheltered and defended him for decades.\n\nYears later, the Prophet ﷺ visited his mother’s grave and wept, and those around him wept too. He said: “I asked permission to pray for her forgiveness and was not permitted; then I asked permission to visit her grave and was permitted — so visit graves, for they remind you of death.” The Qurʼān honored this journey: “Did He not find you an orphan and give you refuge?” (93:6)',
    highlights: [
      'Orphaned before birth through his father, then orphaned of his mother at six',
      'Allah said of him: “Did He not find you an orphan and give you refuge?” (Qūrʾaḥ 93:6)',
      'His grandfather ʿAbd al-Muṭṭalib seated him on his personal mat at the Kaʻah — honoring him above his own sons',
      'He later visited her grave and wept, and made visiting graves a Sunnah to remember death',
    ],
  },

  /* ── 3 ── Journey to Syria ───────────────────────────────── */
  3: {
    title: 'The Journey to Syria',
    subtitle: 'The Monk Bḥīrā Prophesies',
    highlight: 'Recognized by the Wise',
    location: 'Buṣrā — Syria',
    description:
      'At around twelve years old, the young Muḥammad ﷺ accompanied his uncle Abū Ṭālib on a trade caravan to Syria. A Christian monk named Bḥīrā recognized the signs of prophethood on him and urged Abū Ṭālib to return with him to Mecca, fearing the Romans might harm the boy upon seeing those signs.',
    highlights: [
      'The monk Bḥīrā recognized the seal of prophethood between his shoulders',
      'A cloud shadowed him alone throughout the journey — one of the earliest divine signs',
      'Bḥīrā warned Abū Ṭālib: “Take your nephew back — protect him from the Jews”',
    ],
  },

  /* ── 4 ── Hilf al-Fudul ──────────────────────────────────── */
  4: {
    title: 'The Pact of the Virtuous (Hilf al-Fuḍūl)',
    subtitle: 'The Trustworthy Young Man Defends the Oppressed',
    highlight: 'Champion of Justice',
    location: 'Mecca — House of ʿAbdullāh ibn Judʼān',
    description:
      'The young Muḥammad ﷺ participated in a noble covenant formed among the honorable men of Quraysh to defend the oppressed and ensure justice in Mecca. He later said: “I witnessed in the house of ʿAbdullāh ibn Judʼān a pact that I would not exchange for a herd of red camels; if I were called to it in Islam I would respond.”',
    highlights: [
      'The Pact was formed after a merchant from Yemen was robbed and no one helped him',
      'The Prophet ﷺ honored it throughout his life as a model of pre-Islamic virtue',
      'He said he would respond to such a pact even in Islam — showing universal justice transcends religion',
    ],
  },

  /* ── 5 ── Marriage to Khadijah ───────────────────────────── */
  5: {
    title: 'Marriage to Khadījah ،',
    subtitle: 'The First to Believe in Him',
    highlight: 'His Greatest Supporter',
    location: 'Mecca',
    description:
      'At twenty-five, Muḥammad ﷺ married the noble Khadījah bint Khuwaylid — a wealthy, respected widow who had trusted him with her trade caravans after witnessing his integrity. She was fifteen years his elder, yet their marriage was one of the most beautiful in history: a partnership of love, loyalty, and shared mission.',
    fullDescription:
      'Khadījah bint Khuwaylid ، had sent Muḥammad ﷺ on a trade journey to Syria, and her servant Maysarah reported back marveling at his honesty and the miraculous signs that accompanied him. Moved by what she heard — and by the man she had observed herself — she proposed marriage through a trusted friend. He accepted joyfully.\n\nTheir marriage lasted twenty-five years until her death — and throughout that time he took no other wife. She was his confidante, his first supporter, and the one who held him when the first revelation overwhelmed him, saying: “By Allah, He will never disgrace you. You uphold family ties, you speak the truth, you carry those who cannot carry themselves, you host the guest, and you support those who stand for justice.”\n\nShe bore him six children: two sons (al-Qāsim and ʿAbdullāh) who died in infancy, and four daughters (Zaynab, Ruqayyah, Umm Kulthūm, and Fāṭimah). The Prophet ﷺ spoke of her throughout his life with deep love: “I was given her love.”',
    highlights: [
      'She was the first person to embrace Islam — believing in him before anyone else',
      'She comforted him after the first revelation with the famous words still quoted today',
      'He never married another woman while she lived, despite it being common practice',
      'He spoke of her with love until the end of his life: “She believed in me when others denied me”',
    ],
  },

  /* ── 6 ── Placing the Black Stone ───────────────────────── */
  6: {
    title: 'Placing the Black Stone',
    subtitle: 'The Trustworthy One Resolves a Dispute',
    highlight: 'Wisdom Before Prophethood',
    location: 'The Sacred Mosque — Mecca',
    description:
      'When the Quraysh were rebuilding the Kaʻah after a flood, a fierce dispute erupted over who had the honor of placing the Black Stone back in its position. The tribe leaders agreed to let the first man to enter settle the matter. Muḥammad ﷺ entered, laid his cloak on the ground, placed the stone on it, and invited a representative of each tribe to lift a corner — then placed the stone himself, satisfying all.',
    highlights: [
      'All tribes had agreed to abide by the decision of whoever entered the Sanctuary first',
      'His inspired solution avoided a war that could have erupted over tribal honor',
      'He was thirty-five years old — five years before the first revelation',
      'His title “The Trustworthy” (Al-Amīn) was already established before prophethood',
    ],
  },

  /* ── 7 ── First Revelation ───────────────────────────────── */
  7: {
    title: 'The First Revelation',
    subtitle: 'Cave of Ḥirāʼ — Ramaḍān',
    highlight: 'Iqraʼ',
    location: 'Cave of Ḥirāʼ — Mount of Light, Mecca',
    description:
      'In the Cave of Ḥirāʼ during Ramaḍān 610 CE, the Angel Jibrīl embraced Muḥammad ﷺ three times and commanded: “Read!” He replied: “I cannot read.” Then Jibrīl recited the first verses of Sūrah al-ʿAlaq. Muḥammad ﷺ descended trembling and went to Khadījah, who wrapped him in a cloak and said: “By Allah, He will never disgrace you.”',
    fullDescription:
      'In the Cave of Ḥirāʼ on the Mountain of Light, during the holy month of Ramaḍān in 610 CE, Muḥammad ibn ʿAbdullāh ﷺ — then forty years old — received the first divine revelation that would change the world forever.\n\nThe Angel Jibrīl appeared and embraced him powerfully three times, each time commanding: “Iqraʼ! — Read!” Each time Muḥammad ﷺ replied: “Mā ana bi-qāriʼ — I do not read.” Then Jibrīl recited: “Read in the name of your Lord who created — created man from a clinging clot. Read, and your Lord is the Most Generous — who taught by the pen — taught man what he did not know.” (96:1-5)\n\nHe descended the mountain with his heart pounding and went directly to Khadījah, saying: “Cover me, cover me!” She wrapped him in a cloak until the trembling subsided, then he told her what had happened, saying: “I fear for myself.” Her response — calm, confident, and deeply loving — became one of the most celebrated statements in Islamic history: “By Allah, He will never disgrace you. You uphold family ties, you speak the truth, you carry those who cannot carry themselves, you host the guest, and you support those who stand for justice.”\n\nShe then took him to her cousin Waraqah ibn Nawfal, an elderly scholar of the Gospels, who told him: “This is the Nāmūs — the same Angel that came to Moses. Would that I were young — I wish I could be alive when your people drive you out!” The Prophet ﷺ was astonished: “Will they drive me out?” Waraqah replied: “No man has ever brought what you bring without being driven out.”',
    highlights: [
      'The command “Iqraʼ!” — Read! — was the first word of divine revelation in Islam',
      'Khadījah’s comforting response became one of the most celebrated statements in Islamic history',
      'Waraqah ibn Nawfal — a Christian scholar — confirmed that this was the same angel that had come to Moses',
      'He was forty years old when prophethood began — an age considered the height of wisdom and maturity',
      'He went to the cave seeking solitude and contemplation — a spiritual preparation for years',
    ],
  },

  /* ── 8 ── Secret Call ────────────────────────────────────── */
  8: {
    title: 'The Secret Call to Islam',
    subtitle: 'The First Believers Enter the Light',
    highlight: 'The First Believers',
    location: 'Mecca',
    description:
      'For three years the Prophet ﷺ called people to Islam quietly, sharing the new faith only with those he trusted most. The first to believe were: his wife Khadījah, his young cousin ʿAlī ibn Abī Ṭālib, his freed slave Zayd ibn Ḥārithah, and his close friend Abū Bakr al-Ṣiddīq. These four formed the earliest nucleus of the Muslim community.',
    highlights: [
      'Khadījah was the very first believer — even before the Prophet fully understood what had happened',
      'Abū Bakr immediately believed without a moment of hesitation',
      'The early gatherings were held in the House of al-Arqam ibn Abī al-Arqam',
      'Within three years, dozens had quietly entered Islam',
    ],
  },

  /* ── 9 ── Public Call ────────────────────────────────────── */
  9: {
    title: 'The Public Call to Islam',
    subtitle: 'He Climbed Al-Ṣafā and Called Out to Quraysh',
    highlight: 'The Warning',
    location: 'Mount Al-Ṣafā — Mecca',
    description:
      'After three years of private preaching, Allah commanded: “Warn your nearest kindred.” The Prophet ﷺ climbed Mount Ṣafā and called each tribe of Quraysh by name. He asked: “If I told you an army was advancing from behind this mountain, would you believe me?” They said: “Yes — you have never lied to us.” He then proclaimed the Oneness of Allah, and his uncle Abū Lahab shouted: “May you perish! Is this why you gathered us?”',
    highlights: [
      'The tribes of Quraysh confirmed: “You have never lied to us” — establishing his credibility before his message',
      'Abū Lahab’s angry rejection was later immortalized in the Qurʼān (Sūrah 111)',
      'This moment marked the beginning of open opposition from Quraysh',
      'He was fulfilling the divine command: “Warn your nearest kindred” (Qūrʾaḥ 26:214)',
    ],
  },

  /* ── 10 ── Migration to Abyssinia ────────────────────────── */
  10: {
    title: 'The Migration to Abyssinia (Ethiopia)',
    subtitle: 'A King Who Wrongs No One',
    highlight: 'The First Refuge',
    location: 'Abyssinia (Ethiopia)',
    description:
      'As persecution of early Muslims in Mecca intensified, the Prophet ﷺ advised his companions to migrate to Abyssinia, saying: “There is a king there who wrongs no one.” Two waves migrated — first fifteen, then a larger group — seeking refuge under the Christian Negus (al-Najāshī). When Quraysh sent emissaries to have them returned, the Negus heard their account of Islam and wept, refusing to hand them over.',
    highlights: [
      'The Negus wept when Jaʼfar ibn Abī Ṭālib recited verses from Sūrah Maryam about Jesus and Mary',
      'He declared: “The difference between what I believe and what you say is no greater than this line” — and drew a line on the ground',
      'Quraysh’s two envoys returned empty-handed — their gifts rejected',
      'The Negus later accepted Islam and the Prophet ﷺ led his funeral prayer in absentia in Medina',
    ],
  },

  /* ── 11 ── Conversion of Hamza ───────────────────────────── */
  11: {
    title: 'The Conversion of Ḥamzah ibn ʿAbd al-Muṭṭalib',
    subtitle: 'The Lion of Allah and His Messenger',
    highlight: 'Lion of Allah',
    location: 'Mecca',
    description:
      'When the mighty warrior Ḥamzah ibn ʿAbd al-Muṭṭalib heard that Abū Jahl had insulted and struck the Prophet ﷺ, he marched to Abū Jahl in fury and struck him with his bow, declaring: “Are you insulting him while I follow his religion? Strike me then if you can!” That fierce loyalty became the entry point for the mightiest warrior of early Islam into the faith.',
    highlights: [
      'His conversion was triggered by tribal loyalty — then became a genuine, deep faith',
      'His Islam brought great strength to the early Muslim community in Mecca',
      'He was known for extraordinary bravery and was given the title “Lion of Allah”',
      'He was martyred at Uhud and the Prophet ﷺ wept over him saying: “He is the master of the martyrs”',
    ],
  },

  /* ── 12 ── Conversion of Umar ────────────────────────────── */
  12: {
    title: 'The Conversion of ʿUmar ibn al-Khaṭṭāb',
    subtitle: 'Allah Strengthened Islam Through Him',
    highlight: 'The Turning Point',
    location: 'Mecca',
    description:
      'ʿUmar ibn al-Khaṭṭāb set out intending to kill the Prophet ﷺ. On the way he discovered his own sister Fāṭimah and her husband had embraced Islam. He struck his brother-in-law, then when his bleeding sister refused to let him touch the Qurʼān with impure hands, he washed, read Sūrah Ṭā-Hā, and wept. He went directly to the Prophet ﷺ and declared his Islam — to the great joy of the entire Muslim community.',
    fullDescription:
      'ʿUmar ibn al-Khaṭṭāb was one of the fiercest opponents of Islam. He had tormented early Muslims and was feared throughout Mecca. On the day of his conversion he left his house with a sword intending to kill the Prophet ﷺ.\n\nOn the road, a man told him to look to his own household first — his sister Fāṭimah and her husband Saʼd ibn Zayd had secretly embraced Islam. He went to their home and found them reciting pages of Sūrah Ṭā-Hā. He struck his brother-in-law in rage, and when his sister intervened he struck her too. When she bled and still refused to surrender the pages without him purifying himself first, something shifted inside him. He washed, took the pages, and read.\n\nThe words stopped him cold. He wept, then said: “Guide me to Muḥammad.” He went to the house where the Muslims were gathered — hearts pounding when they heard his knock — and declared his Islam before the Prophet ﷺ. The Muslims’ joy overflowed; ʿUmar requested that it be announced publicly, and the believers marched openly to the Kaʻah — for the first time without fear.',
    highlights: [
      'His conversion was so transformative that the Muslims made takbīr (Allahu Akbar) so loudly it echoed through Mecca',
      'He requested that his Islam be announced publicly — ending the era of hiding',
      'The Prophet ﷺ had prayed: “O Allah, strengthen Islam with either ʿUmar ibn al-Khaṭṭāb or ʿAmr ibn Hishām (Abū Jahl)”',
      'He immediately became one of the greatest pillars of Islam',
    ],
  },

  /* ── 13 ── Boycott ───────────────────────────────────────── */
  13: {
    title: 'The Boycott of Shaʼb Abī Ṭālib',
    subtitle: 'Three Years of Hunger and Isolation',
    highlight: 'Steadfast Under Siege',
    location: 'Valley of Abū Ṭālib — Mecca',
    description:
      'The leaders of Quraysh wrote a pact boycotting the Banū Hāshim and Banū ʿAbd al-Muṭṭalib: no trade, no marriage, no contact. The Prophet ﷺ, his family, and supporters were confined to a valley for three years, enduring severe hunger and hardship, until the pact was found to have been eaten by termites — a divine sign.',
    highlights: [
      'The pact was hung inside the Kaʻah to give it religious weight',
      'The Muslims were reduced to eating leaves and scraps — the cries of hungry children could be heard outside',
      'When the Quraysh came to check the pact, they found termites had eaten all words except the name of Allah',
      'Even some non-Muslim Meccans secretly passed food to them out of compassion',
    ],
  },

  /* ── 14 ── Year of Sorrow ────────────────────────────────── */
  14: {
    title: 'The Year of Sorrow (ʿAm al-Ḥuzn)',
    subtitle: 'The Deaths of Khadījah and Abū Ṭālib',
    highlight: 'Grief and Resolve',
    location: 'Mecca',
    description:
      'In the tenth year of the prophethood (619 CE), the Prophet ﷺ lost his two greatest pillars of support within weeks of each other: his beloved wife Khadījah ، — who had believed in him first and supported him through every hardship — and his uncle and protector Abū Ṭālib, whose clan standing had shielded him from Quraysh. The Prophet ﷺ named it “The Year of Sorrow.”',
    highlights: [
      'Khadījah ، was the first to believe in him, his greatest emotional support, and mother of his children',
      'Abū Ṭālib was not Muslim but protected the Prophet ﷺ through tribal loyalty for decades',
      'After Abū Ṭālib’s death, Abū Lahab briefly assumed leadership of Banū Hāshim and withdrew protection',
      'This opened the door to direct physical attacks that had not been possible before',
    ],
  },

  /* ── 15 ── Journey to Ta'if ──────────────────────────────── */
  15: {
    title: 'The Journey to Ṭāʼif',
    subtitle: 'The Hardest Day on His Heart ﷺ',
    highlight: 'Wounded but Unwavering',
    location: 'Ṭāʼif — Hijaz',
    description:
      'After the deaths of Khadījah and Abū Ṭālib, the Prophet ﷺ traveled alone on foot to Ṭāʼif to seek support for Islam. The leaders of Thaqīf rejected and mocked him, then sent their slaves and street children to drive him out with stones until his sandals ran with blood. He sat under a tree and made one of the most moving supplications in Islamic history.',
    fullDescription:
      'With Mecca now openly hostile after the deaths of his two protectors, the Prophet ﷺ walked to the mountain city of Ṭāʼif accompanied only by his freed slave Zayd ibn Ḥārithah. He spent ten days there, approaching each of the three leaders of Thaqīf in turn and inviting them to Islam. Each refused. The last one said: “If you are truly the Messenger of Allah then you are too important to speak to the likes of us; and if you are lying about Allah then we cannot speak to you.”\n\nThey then ordered their servants and street children to mob him as he left, pelting him with stones until both feet bled. He and Zayd took shelter at a nearby vineyard. There, exhausted and bleeding, he raised his hands and made a duʼāʼ that the Prophet ﷺ himself described as the hardest day of his life — harder than Uhud.\n\nHe said: “O Allah, to You I complain of my weakness, of my helplessness, and of my lowliness before men. O Most Merciful, You are the Lord of the weak and You are my Lord … I seek refuge in the light of Your face by which all darkness is dispelled … Your pleasure is mine to pursue.”\n\nAllah sent Jibrīl with the Angel of the Mountains, who offered to crush Ṭāʼif between its mountains. The Prophet ﷺ replied: “No — perhaps Allah will bring from their descendants people who worship Allah alone.” A year later, Ṭāʼif entered Islam.',
    highlights: [
      'He described this day as the hardest of his life — harder even than the day of Uhud',
      'He refused the Angel of the Mountains’ offer to destroy Ṭāʼif, hoping their children would one day accept Islam',
      'His supplication from Ṭāʼif remains one of the most beautiful prayers in Islamic tradition',
      'A Christian slave named ʿAddās brought him grapes and became the only person to accept Islam in Ṭāʼif that day',
    ],
  },

  /* ── 16 ── Night Journey ─────────────────────────────────── */
  16: {
    title: 'The Night Journey and Ascension (Al-Isrāʼ wal-Miʼrāj)',
    subtitle: 'A Journey Beyond the Heavens',
    highlight: 'Beyond the Heavens',
    location: 'Mecca → Jerusalem → The Seven Heavens',
    description:
      'On a miraculous night, the Prophet ﷺ was taken from the Sacred Mosque in Mecca to Al-Aqṣā Mosque in Jerusalem (Isrāʼ), then ascended through the seven heavens (Miʼrāj), led the prophets in prayer, passed beyond the Lote Tree of the Utmost Boundary, and was directly commanded by Allah with the five daily prayers — originally fifty, reduced through intercession to five.',
    fullDescription:
      'In a single night, the Prophet ﷺ was carried by the Burāq from the Sacred Mosque in Mecca to the Al-Aqṣā Mosque in Jerusalem — a journey that would take weeks on foot. There he led all the prophets in prayer, as their imam, in the place where they had lived and prayed. He was then taken upward through the seven heavens, meeting each prophet in turn: Adam in the first heaven, Yahyā and ʿIsā in the second, Yūsuf in the third, Idrīs in the fourth, Hārūn in the fifth, Mūsā in the sixth, and Ibrāhīm in the seventh.\n\nBeyond the Lote Tree of the Utmost Boundary — beyond which no creation passes — he was brought into the presence of the Divine and received the obligation of fifty daily prayers. As he descended, Mūsā — who had experience with the Children of Israel — urged him to return and ask for a reduction. He did so nine times until the prayers were reduced to five, yet counted with the reward of fifty.\n\nWhen the Prophet ﷺ told Quraysh the next morning, they mocked and rejected him, and many who had been wavering in their faith abandoned it. Abū Bakr — upon hearing what the Prophet ﷺ had said — immediately replied: “If he says it, then I believe it” — earning him the title “Al-Ṣiddīq,” the Great Verifier.',
    highlights: [
      'He led all the prophets in prayer in Al-Aqṣā — affirming his position as the seal of the prophets',
      'The five daily prayers were the direct divine command from this night',
      'Abū Bakr’s instant belief earned him the title “Al-Ṣiddīq” (The Great Verifier)',
      'Quraysh demanded a description of Jerusalem — which he gave perfectly though he had never been there before in daylight',
    ],
  },

  /* ── 17 ── First Pledge of Aqabah ────────────────────────── */
  17: {
    title: 'The First Pledge of ʿAqabah',
    subtitle: 'Twelve Men Carry the Seed of Medina',
    highlight: 'The First Pledge',
    location: 'ʿAqabah — near Mina, Mecca',
    description:
      'During the pilgrimage season, twelve men from Medina secretly met the Prophet ﷺ at ʿAqabah and pledged their faith — not to fight, but to worship Allah alone, abstain from major sins, and not disobey the Prophet ﷺ. He sent Muṣʼab ibn ʿUmayr with them as a teacher, and within a year Islam had spread throughout Medina.',
    highlights: [
      'Muṣʼab ibn ʿUmayr — one of the most accomplished young companions — was sent as the first Islamic missionary',
      'Within one year, almost every household in Medina had heard of Islam',
      'This pledge was limited to moral commitments — no pledge to fight or defend',
      'The following year seventy-three people came back for the Second Pledge',
    ],
  },

  /* ── 18 ── Second Pledge of Aqabah ──────────────────────── */
  18: {
    title: 'The Second Pledge of ʿAqabah',
    subtitle: 'Seventy Pledge Support and Defense',
    highlight: 'The Pledge of Victory',
    location: 'ʿAqabah — near Mina, Mecca',
    description:
      'The following year, seventy-three men and two women from Medina met the Prophet ﷺ at ʿAqabah by night and pledged to defend him as they would defend their own families. He chose twelve leaders (nuqabāʼ) from among them. When Abū Ṭālib’s son al-ʿAbbās warned the Ansār of the gravity of their commitment, they replied: “What do we gain, O Messenger of Allah?” He said: “Paradise.”',
    highlights: [
      'This was the pledge to defend the Prophet ﷺ militarily if needed',
      'He chose twelve leaders as representatives — twelve, like the number of Moses’s leaders among the Israelites',
      'Two women were among those who pledged — showing the inclusion of women in early Islamic leadership',
      'ʿAbbās warned the Ansār of the risk; they replied they accepted it fully',
    ],
  },

  /* ── 19b ── Migration to Medina ──────────────────────────── */
  20: {
    title: 'The Migration to Medina (Al-Hijrah)',
    subtitle: 'The Beginning of the Islamic Calendar',
    highlight: 'A New Beginning',
    location: 'Mecca → Cave of Thawr → Medina',
    description:
      'With Quraysh plotting his assassination, the Prophet ﷺ left Mecca with Abū Bakr under cover of night, hid for three days in the Cave of Thawr, then traveled to Medina along the western coastal route. The people of Medina came out joyfully to greet him. This migration so transformed Islamic history that ʿUmar later chose it as the start of the Islamic calendar.',
    fullDescription:
      'When Quraysh learned the Prophet ﷺ was planning to migrate to Medina, they convened in Dār al-Nadwah and resolved to send a young man from each tribe to kill him simultaneously — spreading blood-guilt across all clans. That night, Jibrīl informed the Prophet ﷺ of the plot and gave him permission to migrate.\n\nʿAlī ibn Abī Ṭālib slept in the Prophet’s bed to deceive the assassins, while the Prophet ﷺ and Abū Bakr slipped out under cover of darkness. They took a southern route to the Cave of Thawr — the opposite direction from Medina — and hid for three days. The Quraysh placed a reward of 100 camels on each of their heads. Sūrah al-Tawbah was later revealed describing that moment: “…when there were only two of them in the cave, and he said to his companion: Do not grieve — indeed Allah is with us.” (9:40)\n\nA skilled non-Muslim guide, ʿAbdullāh ibn Urayqiṭ, led them north along the western coast — an unexpected route. When they reached Qubāʼ on the outskirts of Medina, the entire city came out to receive them. Children sang from the rooftops: “Ṭalac al-badr ʼalaynā — The full moon has risen over us.”',
    highlights: [
      'The Cave of Thawr: Abū Bakr said “If one of them looks under their feet they will see us” and the Prophet ﷺ replied “What do you think of two, with Allah as their third?”',
      'Qurʼān 9:40 was revealed about this moment: “Do not grieve — indeed Allah is with us”',
      'Suraqa ibn Mālik pursued them for the reward; his horse’s hooves sank into the ground and he turned back',
      'This migration established the Hijri calendar — Year 1 AH — used by Muslims to this day',
    ],
  },

  /* ── Mosque ───────────────────────────────────────────────── */
  21: {
    title: "Building the Prophet's Mosque ﷺ",
    subtitle: 'The First Institution of the Islamic State',
    highlight: 'Foundation of a Nation',
    location: 'Medina',
    description:
      'Upon arriving in Medina, the Prophet ﷺ let his camel choose the site for the mosque — it knelt at a plot owned by two orphan boys, which he purchased. He carried bricks alongside his companions. The mosque became not only a place of worship but a school, court, parliament, and the beating heart of the emerging Islamic civilization.',
    highlights: [
      'He carried bricks personally and recited poetry of encouragement alongside his companions',
      'The mosque was built by the entire community together — no class distinction',
      'It served simultaneously as a place of prayer, a court of justice, a school, and a reception hall for delegations',
      'The first Islamic university grew out of the Ṣuffah — a shaded area where students lived and studied',
    ],
  },

  /* ── Brotherhood ─────────────────────────────────────────── */
  22: {
    title: 'The Brotherhood of the Companions (Al-Muʼākhāh)',
    subtitle: 'Brotherhood of Blood and Soul Together',
    highlight: 'United by Faith',
    location: 'Medina',
    description:
      'The Prophet ﷺ established formal brotherhood between the Muhājirūn (migrants from Mecca) and the Anṣār (hosts of Medina) — pairing each Makkan with a Medinan as true brothers in faith. The Anṣār offered to share their homes, wealth, and orchards. When ʿAbd al-Raḥmān ibn ʿAwf’s Medinan brother offered half of everything, Ibn ʿAwf replied: “Just show me the marketplace.”',
    highlights: [
      'The Anṣār offered to literally divide their wealth and homes in two — an unparalleled act of generosity',
      'Brothers in this pairing would inherit from one another in the early period — like blood brothers',
      'This bond solved the immediate economic crisis of the homeless Muhājirūn overnight',
      'It became a model of how a new society can integrate newcomers with dignity',
    ],
  },

  /* ── Adhan ───────────────────────────────────────────────── */
  23: {
    title: "Bilāl’s First Call to Prayer (Adhān)",
    subtitle: 'Aḥad Aḥad — The First Call to Prayer in Islam',
    highlight: 'Allāhu Akbar',
    location: 'Medina — the Prophet’s Mosque',
    description:
      'When the companions debated how to summon Muslims to prayer, ʿAbdullāh ibn Zayd told the Prophet ﷺ he had heard in a dream a man teaching him words to be called out. The Prophet ﷺ recognized it as a true vision and commanded Bilāl ibn Rabāḥ — who had the most powerful and beautiful voice — to be the first muʼādhdhin (caller to prayer) in Islam.',
    highlights: [
      'Bilāl was the freed Abyssinian slave who had been tortured by his master for refusing to abandon Islam',
      'His powerful voice rang across Medina five times a day for the rest of the Prophet’s life',
      "ʿUmar ibn al-Khaṭṭāb had the same dream the same night — confirming its divine origin",
      'The adhān remains one of the most recognized sounds in the world, heard 5 times daily in every Muslim land',
    ],
  },

  /* ── Medina Charter ──────────────────────────────────────── */
  24: {
    title: 'The Charter of Medina (Al-Ṣaḥīfah al-Madiniyyah)',
    subtitle: 'The First Written Constitution in History',
    highlight: 'First Constitution',
    location: 'Medina',
    description:
      'The Prophet ﷺ drafted a written covenant between the Muslims of Mecca and Medina and the Jewish tribes of Medina — establishing them as one community (ummah), guaranteeing mutual defense, defining rights and duties, and asserting that all disputes be referred to Allah and His Messenger. Historians consider it the world’s first written political constitution.',
    highlights: [
      'It recognized the Jewish tribes of Medina as part of the same community with full religious freedom',
      'It established collective security: an attack on one group was an attack on all',
      'It forbade treachery and required consultation before military action',
      'It predates Magna Carta by six centuries and deals with constitutional principles never before codified',
    ],
  },

  /* ── Qiblah ──────────────────────────────────────────────── */
  25: {
    title: 'The Change of the Qiblah (Prayer Direction)',
    subtitle: 'From Al-Aqṣā to the Sacred Kaʻah',
    highlight: 'Toward the Kaʻah',
    location: 'Medina — Mosque of Banu Salamah',
    description:
      'For sixteen months after the Hijrah, Muslims prayed facing Al-Aqṣā Mosque in Jerusalem. Then the command came to turn toward the Sacred Kaʻah in Mecca. The change happened mid-prayer in the mosque of Banū Salamah, and the congregation turned together. This mosque was renamed “Masjid al-Qiblatain” — the Mosque of Two Qiblahs.',
    highlights: [
      'The Prophet ﷺ used to turn his face to the sky longing for this command',
      'The change happened mid-prayer — those who had already bowed turned while bowing',
      'Jewish and hypocrite critics said: “What turned them from their original qiblah?” — answered directly in the Qurʼān (2:142)',
      'The Masjid al-Qiblatain in Medina stands to this day as a historical monument',
    ],
  },

  /* ── Fasting ordained ────────────────────────────────────── */
  26: {
    title: 'The Obligation of Fasting in Ramaḍān',
    subtitle: '“O you who believe, fasting has been prescribed for you”',
    highlight: 'The Month of the Qurʼān',
    location: 'Medina',
    description:
      'In the second year after the Hijrah, the obligation of fasting the month of Ramaḍān was revealed, along with the rules of Zakāt al-Fiṭr and the ʾCd al-Fiṭr prayer. Ramaḍān was designated the month of the Qurʼān, of intensified worship, and of Laylat al-Qadr — better than a thousand months.',
    highlights: [
      'The fasting was initially voluntary; then it became obligatory with the option to feed the poor as an alternative, then fully obligatory',
      'Laylat al-Qadr is hidden within the last ten nights — its concealment encouraging sustained worship',
      'The revelation of the fasting obligation came after the change of the Qiblah',
      'Fasting was also practiced by earlier religious communities — the Qurʼān explicitly connects: “As it was prescribed for those before you”',
    ],
  },

  /* ── Badr ────────────────────────────────────────────────── */
  27: {
    title: 'The Battle of Badr',
    subtitle: 'The Day of Criterion (Yawm al-Furqān)',
    highlight: 'The Day of Criterion',
    location: 'Wells of Badr — 70 km southwest of Medina',
    description:
      'On the 17th of Ramaḍān, 2 AH (624 CE), 313 ill-equipped Muslims faced a Qurayshi army of nearly 1,000 at the wells of Badr. Despite overwhelming odds, Allah sent angels to aid the believers. The Muslims won decisively, killing 70 Qurayshi leaders and capturing 70 more. The Prophet ﷺ wept with gratitude, saying: “O Allah, if this band perishes, You will be worshipped no more on earth.”',
    fullDescription:
      'The Muslims had set out to intercept a Qurayshi trade caravan returning from Syria under Abū Sufyān. When Abū Sufyān evaded them, the main Qurayshi army — nearly 1,000 warriors including the chiefs of every clan — marched out to Badr to confront the Muslims. The Prophet’s army numbered just 313, with two horses, 70 camels, and limited weapons.\n\nThe Prophet ﷺ spent the night before the battle in prayer, weeping and supplicating. He said: “O Allah, if this small band perishes today, You will be worshipped on earth no more.” Abū Bakr came and held his cloak saying: “That is enough — Allah will fulfil what He has promised you.” Then Qurʼān 8:9 was revealed: “When you sought help of your Lord and He answered: I will reinforce you with one thousand angels, following one another.”\n\nThe battle lasted a morning. The Muslim archers were positioned strategically; ʿAlī ibn Abī Ṭālib, Ḥamzah, and ʿUbaydah ibn al-Ḥārith opened with single combat against the three best Qurayshi warriors. All three Qurayshi fell. In the battle, Abū Jahl — the most vicious persecutor of early Muslims — was killed by two young men of the Anṣār. Seventy of Quraysh’s greatest warriors died. The Muslims lost fourteen men.\n\nThe impact was tectonic: the emerging Islamic state had defeated the most powerful tribe in Arabia on an open battlefield.',
    highlights: [
      'The Prophet ﷺ wept through the night in prayer before the battle',
      'Angels were sent to fight alongside the believers — the Qurʼān confirms this',
      'Abū Jahl — the greatest enemy of early Islam — was killed at Badr',
      '313 believers defeated nearly 1,000 experienced warriors',
      'This victory established the credibility and military reality of the new Islamic state',
    ],
  },

  /* ── Banu Qaynuqa ────────────────────────────────────────── */
  28: {
    title: 'The Expedition against Banū Qaynuqāʼ',
    subtitle: 'First Confrontation with the Jews of Medina',
    highlight: 'Treaty Broken',
    description:
      'After Badr, the Jewish tribe of Banū Qaynuqāʼ violated the Charter of Medina by publicly humiliating a Muslim woman and killing a Muslim man who came to her defense. The Prophet ﷺ besieged their fortress for fifteen days until they surrendered. At the intercession of ʿAbdullāh ibn Ubayy, he exiled them to Syria rather than executing them.',
    highlights: [
      'The violation began in their market — a Muslim woman was publicly shamed',
      'Their exile was to Wadī al-Qūrā in Syria',
      'They were goldsmiths and weavers — their departure changed Medina’s economic landscape',
    ],
  },

  /* ── Sawiq ───────────────────────────────────────────────── */
  29: {
    title: 'The Expedition of Al-Sawīq',
    subtitle: 'Abū Sufyān Burns and Flees',
    highlight: 'The Fleeing Raid',
    description:
      'In retaliation for Badr, Abū Sufyān ibn Ḥarb led 200 Qurayshi riders to the outskirts of Medina, burned some date palms, killed two Anṣār, and quickly fled. The Muslims pursued but they escaped, dropping sacks of sawīq (parched barley) to lighten their load — giving the expedition its name.',
    highlights: [
      'This was Abū Sufyān fulfilling a personal vow he had sworn after Badr',
      'The dropped sacks of sawīq gave the expedition its name',
      'It demonstrated Quraysh’s unwillingness to engage in open battle',
    ],
  },

  /* ── Buwat ───────────────────────────────────────────────── */
  30: {
    title: 'The Expedition of Buwāṭ',
    subtitle: 'The First Expedition Led Personally by the Prophet ﷺ',
    highlight: 'The Prophet Commands',
    description:
      'The Prophet ﷺ personally led 200 Companions toward the area of Buwāṭ to intercept a Qurayshi trade caravan. No engagement took place, but this was the first military expedition in which the Prophet ﷺ himself led the army — establishing his personal command of the Muslim forces.',
    highlights: [
      'No battle occurred — the caravan had already passed',
      'This established the precedent of the Prophet’s personal military command',
      'The expedition demonstrated the Muslim state’s reach beyond Medina',
    ],
  },

  /* ── Uhud ────────────────────────────────────────────────── */
  31: {
    title: 'The Battle of Uhud',
    subtitle: 'A Lesson in Obedience',
    highlight: 'A Bitter Lesson',
    location: 'Mount Uhud — north of Medina',
    description:
      'In Shawwāl 3 AH (625 CE), 3,000 Qurayshi warriors marched on Medina to avenge Badr. The Muslims numbered 700. After an initial Muslim success, the archers the Prophet ﷺ had stationed on a hill abandoned their post for spoils — allowing Khālid ibn al-Walīd (then a Qurayshi commander) to flank the Muslims. Seventy companions were martyred and the Prophet ﷺ was himself wounded.',
    fullDescription:
      'The Quraysh had spent a year preparing for revenge after Badr. They assembled 3,000 warriors — led by Abū Sufyān, with a cavalry wing under Khālid ibn al-Walīd — and marched on Medina. The Prophet ﷺ consulted the companions: some advised staying in Medina behind its walls; the younger companions urged marching out. He chose to march out with 1,000 men, though ʿAbdullāh ibn Ubayy withdrew with 300 hypocrites en route.\n\nThe Prophet ﷺ positioned fifty archers on a hillock (“Jabal al-Rummāh”) under ʿAbdullāh ibn Jubayr, with explicit instructions: “Do not leave your position whether we win or lose.”\n\nIn the initial engagement the Muslims drove the Qurayshi infantry back. When the Qurayshi camp appeared to flee, most of the archers abandoned their post to collect spoils — defying the explicit command. Khālid saw the hill undefended, flanked the Muslim army, killed the remaining archers, and struck from the rear. The Prophet ﷺ himself was hit by a stone that broke his tooth and cut his face. The false rumor spread that he had been killed — and many fled.\n\nSeventy companions were martyred, including Ḥamzah ibn ʿAbd al-Muṭṭalib, whose body was mutilated. The Prophet ﷺ stood over him and wept. Allah revealed: “And what struck you on the day the two armies met — it was by Allah’s permission, that He might make evident the believers and that He might make evident those who were hypocrites.” (3:166)',
    highlights: [
      'The archers abandoned their post against explicit orders — directly causing the reversal',
      'The Prophet ﷺ himself was wounded — his tooth broke and his face was cut',
      'Ḥamzah, his beloved uncle, was martyred and his body mutilated — the Prophet ﷺ wept deeply',
      'Despite the setback, the Quraysh did not enter Medina — the damage was limited',
      'The lesson of Uhud became a cornerstone of Islamic military ethics: obedience saves lives',
    ],
  },

  /* ── Banu Nadir ──────────────────────────────────────────── */
  32: {
    title: 'The Expedition against Banū al-Naḍīr',
    subtitle: 'The Assassination Plot and the Exile of the Treacherous',
    highlight: 'Treachery Foiled',
    description:
      'The Jewish tribe of Banū al-Naḍīr plotted to assassinate the Prophet ﷺ by dropping a millstone on him as he sat by their wall. Jibrīl informed him of the plot and he withdrew. After a siege of fifteen days, the tribe surrendered and was exiled to Khaybar. Their properties were used for the Muslim community.',
    highlights: [
      'Jibrīl informed the Prophet ﷺ of the plot before the stone could be dropped',
      'The tribe had been in a treaty with the Prophet ﷺ when they plotted against him',
      'Their exile strengthened Medina economically as their lands were redistributed',
      'They went on to become the organizers of the Coalition that attacked Medina in the Battle of the Trench',
    ],
  },

  /* ── Dhat al-Riqa ────────────────────────────────────────── */
  33: {
    title: "The Expedition of Dhāt al-Riqāʼ",
    subtitle: 'The Prayer of Fear Is Ordained for the First Time',
    highlight: 'Ṣalāt al-Khawf',
    description:
      'During this expedition against the Ghaṭfān and Anmār tribes, the Muslims faced potential attack during prayer. The Prayer of Fear (Ṣalāt al-Khawf) was instituted — allowing the army to pray in groups alternately while half maintained guard. This dispensation remains in Islamic jurisprudence to this day.',
    highlights: [
      'The Ṣalāt al-Khawf — Prayer of Fear — was revealed in Qūrʾaḥ 4:101-102',
      'It showed Islam’s practicality: even the highest obligation is adapted to real circumstances',
      'The prayer is still taught in military and security contexts today',
    ],
  },

  /* ── Dumat al-Jandal ─────────────────────────────────────── */
  34: {
    title: 'The Expedition of Dūmat al-Jandal',
    subtitle: 'Securing the North and Establishing Islamic Prestige',
    highlight: 'Strength Projects Peace',
    description:
      'The Prophet ﷺ led an army to Dūmat al-Jandal in northern Arabia, near the Syrian border, after reports of hostile tribal gatherings threatening northern trade routes. The tribes dispersed before engagement — demonstrating that the Islamic state’s influence now extended northward toward Byzantine territory.',
    highlights: [
      'The expedition reached within striking distance of Byzantine Syria',
      'No battle was needed — the tribes dispersed at the news of the approaching army',
      'It was the first Muslim military reach toward the north',
    ],
  },

  /* ── Trench ──────────────────────────────────────────────── */
  35: {
    title: 'The Battle of the Trench (Al-Khandaq)',
    subtitle: 'Ten Thousand Could Not Prevail',
    highlight: 'The Great Alliance Fails',
    location: 'Medina',
    description:
      'In Shawwāl 5 AH, an alliance of 10,000 warriors from Quraysh, Ghaṭfān, and other tribes besieged Medina. On the advice of Salmān al-Fārisī, the Prophet ﷺ had a trench dug around the exposed northern face of Medina. Unable to cross, the coalition was eventually broken by a fierce divine wind, internal discord, and the covert diplomacy of Nuʼaym ibn Masʼūd — after 27 days.',
    fullDescription:
      'Banū al-Naḍīr — exiled from Medina after their treachery — traveled to Quraysh and assembled the largest coalition ever mounted against the Prophet ﷺ: 10,000 fighters from Quraysh, Ghaṭfān, Banū Sulaym, Banū Asad, and others. It was called “Al-Aḥzāb” — the Confederates.\n\nSalmān al-Fārisī, a Persian companion, suggested an innovation unknown in Arabia: digging a trench across the open northern approach. The entire community dug for weeks, including the Prophet ﷺ himself, who carried dirt and recited poetry with his companions: “O Allah, life is truly the life of the Hereafter — forgive the Ansār and Muhājirūn.”\n\nThe coalition arrived and found an obstacle they had no answer for. For 27 days they camped outside, unable to cross. Internal tensions rose. Nuʼaym ibn Masʼūd — who had secretly accepted Islam — played the coalition’s factions against each other through strategic deception, sowing mutual distrust between Quraysh, Ghaṭfān, and Banū Qurayẓah.\n\nThen Allah sent a freezing wind that uprooted tents and extinguished fires. The coalition’s resolve shattered overnight. Abū Sufyān announced the retreat. The Prophet ﷺ told his companions: “Allah has handled them for us.”',
    highlights: [
      'The trench concept came from Salmān al-Fārisī — a Persian convert — showing Islam’s openness to wisdom from all cultures',
      'The Prophet ﷺ dug the trench personally alongside his companions',
      'Nuʼaym ibn Masʼūd’s covert diplomacy broke the coalition from within',
      'A divine wind on the final night caused the coalition to retreat in disarray',
      'After this battle, Quraysh never again launched a major offensive against Medina',
    ],
  },

  /* ── Banu Qurayza ────────────────────────────────────────── */
  36: {
    title: 'The Expedition against Banū Qurayẓah',
    subtitle: 'Betrayal at the Hour of Greatest Need',
    highlight: 'Betrayal Answered',
    description:
      'During the Battle of the Trench, the Jewish tribe of Banū Qurayẓah violated their treaty with the Prophet ﷺ and secretly allied with the besieging coalition, threatening the defenseless women and children of Medina from within. After the siege ended, the Prophet ﷺ besieged their fortress for 25 days. They agreed to accept the judgment of Saʼd ibn Muʼādh — the chief of their allied tribe — who ruled according to the Torah’s own law of treason.',
    highlights: [
      'Their betrayal during the siege put the women and children of Medina in direct danger',
      'They chose Saʼd ibn Muʼādh as their arbiter — the chief of their own allied tribe',
      'Saʼd ruled according to the law of the Torah itself: death for the fighters',
      'The Prophet ﷺ said of Saʼd’s ruling: “You have judged with the judgment of Allah above the seven heavens”',
    ],
  },

  /* ── Banu Mustaliq / Ifk ─────────────────────────────────── */
  37: {
    title: 'Banū al-Muṣṭaliq and the Slander Incident (Al-Ifk)',
    subtitle: "The Slander and the Innocence of ʿcĀʼisha",
    highlight: 'Innocence from Above',
    description:
      'During the return from this expedition, hypocrites led by ʿAbdullāh ibn Ubayy fabricated a slander against the Prophet’s ﷺ wife ʿcĀʼisha ،, causing anguish for a month. Allah then revealed ten verses of Sūrah al-Nūr declaring her complete innocence and prescribing the punishment for false accusations of chastity — making the incident a cornerstone of Islamic jurisprudence.',
    highlights: [
      "ʼcĀʼisha ، had been inadvertently left behind when the army departed and was escorted back by Ṣafwan ibn al-Muʼattal",
      'The Prophet ﷺ suffered deeply during the month of uncertainty — then divine revelation cleared her name',
      'Allah revealed: “Those who brought the slander are a small group among you” (Qūrʾaḥ 24:11)',
      'The incident established the highest standards of evidence before accusing someone of moral transgression',
    ],
  },

  /* ── Hudaybiyyah ─────────────────────────────────────────── */
  38: {
    title: 'The Treaty of Ḥudaybiyyah',
    subtitle: 'A Clear Victory in the Guise of Defeat',
    highlight: 'A Clear Conquest',
    location: 'Hudaybiyyah — outskirts of Mecca',
    description:
      'The Prophet ﷺ set out with 1,400 companions for ʿUmrah in 6 AH, but was stopped by Quraysh at Ḥudaybiyyah. A treaty was signed: ten-year peace, with the Muslims returning that year. The companions were devastated. ʿUmar challenged it openly. Yet Allah revealed: “We have granted you a clear conquest.” Within two years, thousands entered Islam freely, and Mecca fell.',
    fullDescription:
      'The Prophet ﷺ had a vision that he entered Mecca to perform ʿUmrah. He set out with 1,400 unarmed companions wearing the simple garments of pilgrims. Quraysh sent delegates to block them at Ḥudaybiyyah and refused them entry. Negotiations were tense.\n\nThe Prophet ﷺ sent ʿUthmān ibn ʿAffān as an envoy to Mecca. When rumors reached the camp that ʿUthmān had been killed, the Prophet ﷺ called all companions to pledge “to the death” under a tree. This was the Pledge of al-Riḍwān (Pleasure) — about which Allah revealed: “Allah was pleased with the believers when they pledged to you under the tree.” (48:18)\n\nʿUthmān was unharmed and a treaty was reached: the Muslims would return this year; they could come back next year for three days; ten-year peace; anyone who left Mecca for Medina without a guardian’s permission would be returned, but not vice versa.\n\nʿUmar openly expressed his anguish: “Are we not Muslims? Are they not polytheists? Why should we accept humiliation?” Abū Bakr replied: “Hold firm — the Prophet knows what he is doing.”\n\nYet Qurʼān chapter 48 was revealed calling it “A manifest victory” (fatḥan mubīnā). The peace opened the door to free preaching; within two years 10,000 entered Islam. Quraysh violated the treaty themselves, leading to the Conquest of Mecca.',
    highlights: [
      "ʿUmar’s anguished objection was silenced only by the Prophet’s certainty — and by history",
      'The Pledge of al-Riḍwān was praised in the Qurʼān as earning divine pleasure',
      'The peace enabled free preaching — more people entered Islam in two years than in the previous twenty',
      'Quraysh violated the treaty themselves, providing the justification for the Conquest of Mecca',
    ],
  },

  /* ── Letters to Kings ────────────────────────────────────── */
  39: {
    title: "The Prophet's Letters to the Kings ﷺ",
    subtitle: 'Islam Calls the World',
    highlight: 'The World Is Called',
    description:
      'After Ḥudaybiyyah, the Prophet ﷺ sent letters to the most powerful rulers of his era: Heraclius (Byzantine Emperor), Khosrow II (Sasanian Emperor), the Negus of Abyssinia, Muqawqis (ruler of Egypt), and others — inviting each to Islam. Heraclius’ response was measured and thoughtful; Khosrow tore the letter and was later told: “Allah has torn his kingdom.” The Negus wept and accepted Islam.',
    highlights: [
      'Heraclius secretly investigated the Prophet’s claims and concluded: “If what you say is true, he will inherit this land under my feet”',
      'Khosrow II tore the letter — and his kingdom was torn apart by civil war within years',
      'The Negus of Abyssinia accepted Islam privately and the Prophet led his funeral prayer in absentia',
      'These letters opened diplomatic relations between the emerging Islamic state and the world’s great powers',
    ],
  },

  /* ── Khaybar ─────────────────────────────────────────────── */
  40: {
    title: 'The Battle of Khaybar',
    subtitle: 'The Conquest of the Jewish Fortresses',
    highlight: 'Alī Bears the Banner',
    location: 'Khaybar — northern Hijaz',
    description:
      'In 7 AH, the Prophet ﷺ led an army to the fortresses of Khaybar — the stronghold of the exiled Banū al-Naḍīr and center of anti-Islamic agitation. Each fortress fell one by one. ʿAlī ibn Abī Ṭālib distinguished himself — the Prophet ﷺ gave him the banner saying: “I will give it to a man who loves Allah and His Messenger and is loved by them.” ʿAlī conquered the last great fortress with a single gate, famously said to be used as a shield.',
    highlights: [
      "The Prophet's words about Ali became one of the most celebrated prophetic praises",
      'The conquest ended Banū al-Naḍīr’s ability to agitate against Medina',
      'The Jewish community of Khaybar kept their land in exchange for half the annual harvest',
      'A Jewish woman attempted to poison the Prophet ﷺ with a dish of meat; he was informed by revelation',
    ],
  },

  /* ── Conversion of Khalid & Amr ──────────────────────────── */
  41: {
    title: 'The Conversion of Khālid ibn al-Walīd and ʿAmr ibn al-ʿcĀs',
    subtitle: 'The Sword of Allah and the Genius of Islam',
    highlight: 'Swords of Allah',
    location: 'Medina',
    description:
      'Two of the most formidable minds of Arabia embraced Islam before the Conquest of Mecca: Khālid ibn al-Walīd — the undefeated general who had turned the tide at Uhud — and ʿAmr ibn al-ʿcĀs, the sharp diplomat and strategist. The Prophet ﷺ greeted Khālid saying: “I have been waiting for your intelligence to lead you to Islam.” He was immediately appointed a military commander.',
    highlights: [
      "Khālid said: “I saw clearly that the Prophet ﷺ was on truth — I had resisted it out of pride”",
      'He was given the title “Sayf-ullāh” — the Sword of Allah — by the Prophet ﷺ himself',
      'ʿAmr ibn al-ʿcĀs later conquered Egypt and became one of its governors',
      'Their conversion stripped Quraysh of its two greatest military and diplomatic minds',
    ],
  },

  /* ── Umrat al-Qada ───────────────────────────────────────── */
  42: {
    title: "The ʿUmrah of Fulfillment (ʿUmrat al-Qaḍāʼ)",
    subtitle: 'Fulfilling the Promise and Entering Mecca',
    highlight: 'Returning in Peace',
    location: 'Mecca',
    description:
      'In fulfillment of the Ḥudaybiyyah treaty, the Prophet ﷺ and 2,000 companions entered Mecca for three days to perform ʿUmrah in 7 AH. The Quraysh evacuated to the surrounding hills, watching their city filled with the declaration of Allāh’s Oneness. Bilāl called the adhān from the top of the Kaʻah — the freed slave who had been tortured for his faith now calling from its summit.',
    highlights: [
      'The Quraysh evacuated the city and watched from the surrounding hills',
      'Bilāl calling the adhān from the top of the Kaʻah was one of the most powerful symbolic moments of early Islam',
      'The Prophet ﷺ married Ṣafiyyah bint Ḥuyayy during this period',
      "It demonstrated that Islam honored its commitments even when Quraysh had humiliated the Muslims",
    ],
  },

  /* ── Mu'tah ──────────────────────────────────────────────── */
  43: {
    title: "The Battle of Muʼtaḥ",
    subtitle: 'Three Thousand Against One Hundred Thousand',
    highlight: 'The Eagles of Muʼtaḥ',
    location: "Muʼtaḥ — modern Jordan",
    description:
      'In 8 AH, the Prophet ﷺ sent 3,000 fighters to the Byzantine frontier after his ambassador was killed. They faced a force of 100,000–200,000 Byzantine and allied troops. Three appointed commanders fell as martyrs: Zayd ibn Ḥārithah, then Jaʼfar ibn Abī Ṭālib (who fought with both arms severed, gaining the title “Dhū al-Janaḥayn” — The One with Two Wings), then ʿAbdullāh ibn Rawāḥah. Khālid then assumed command and conducted a brilliant tactical withdrawal.',
    highlights: [
      'Jaʼfar ibn Abī Ṭālib fought holding the banner with his arms after they were severed, then was killed with over 90 wounds',
      "The Prophet ﷺ received the news of their deaths through revelation before messengers arrived",
      'Khālid ibn al-Walīd used nine swords in the battle before managing a disciplined retreat',
      'He was given the title “Sayf-ullāh” (Sword of Allah) after this battle',
    ],
  },

  /* ── Conquest of Mecca ───────────────────────────────────── */
  44: {
    title: 'The Conquest of Mecca (Fatḥ Makkah)',
    subtitle: "‘Today Is the Day of Mercy’",
    highlight: "‘Today Is the Day of Mercy’",
    location: 'Mecca',
    description:
      'On Ramaḍān 20, 8 AH (630 CE), the Prophet ﷺ led 10,000 companions into Mecca — the city that had tortured, killed, and expelled the early Muslims — without a single drop of blood. He stood at the Kaʻah and asked: “What do you think I will do with you?” They said: “A noble brother, son of a noble brother.” He replied: “Go — you are free.”',
    fullDescription:
      'When Quraysh violated the Ḥudaybiyyah treaty by attacking the Banū Khūzāʼah — who were under the Prophet’s protection — the peace was broken and the grounds for action were clear. The Prophet ﷺ assembled the largest Muslim army ever: 10,000 men, drawn from every tribe and city.\n\nThe army moved in such secrecy that Abū Sufyān himself rode out to investigate and was captured. He spoke to the Prophet ﷺ that night and, finally, accepted Islam. The Prophet ﷺ then announced the general amnesty before the army even entered: everyone who entered Abū Sufyān’s house, or their own home, or the Sacred Mosque, would be safe.\n\nThe army entered from four directions with minimal resistance. The Prophet ﷺ entered on his camel, his head bowed in humility, reciting Sūrah al-Fatḥ (48). He went straight to the Kaʻah, circled it seven times, then entered and broke the 360 idols, reciting: “Truth has come and falsehood has departed — falsehood is ever departing.” (17:81)\n\nThen he stood at the door of the Kaʻah before the assembled Quraysh and declared the General Amnesty: “Today is the day of mercy. Go — you are free.” Those who had tortured Bilal, killed Hamzah, ordered the murder of innocent Muslims — all were pardoned. Only a handful of the worst criminals by name were excluded, and most of those were eventually pardoned too.',
    highlights: [
      '10,000 companions entered Mecca without a single Muslim casualty',
      "He bowed his head so low in humility on his camel that his beard nearly touched the saddle — reciting al-Fatḥ",
      'He broke 360 idols in the Kaʻah reciting: “Truth has come and falsehood has departed” (17:81)',
      'The General Amnesty pardoned even those who had tortured, killed, and expelled the early Muslims',
      'Bilāl called the adhān from the top of the Kaʻah — the freed slave who had been tortured for saying “One” now proclaimed it from Islam’s holiest point',
    ],
  },

  /* ── Hunayn ──────────────────────────────────────────────── */
  45: {
    title: 'The Battle of Ḥunayn',
    subtitle: 'Numbers Count for Nothing Without Trust in Allah',
    highlight: 'The Prophet Stood Firm',
    location: 'Valley of Ḥunayn — east of Mecca',
    description:
      'Days after the Conquest of Mecca, 12,000 Muslims marched into the Ḥunayn valley and were ambushed by the Hawāzin and Thaqīf tribes. An initial rout began as the surprise attack stunned the army. The Prophet ﷺ remained on his mule, calling: “I am the Prophet — this is no lie! I am the son of ʿAbd al-Muṭṭalib!” The steadfast rallied, the tide turned, and it became a decisive victory.',
    highlights: [
      'Some new Muslims said beforehand: “We will not be defeated today — we are too many.” Qurʼān 9:25 answered this: “Your great number pleased you”',
      'The Prophet ﷺ stood firm alone on his mule as thousands fled around him — one of the most heroic moments in Islamic history',
      'Abū Sufyān, newly Muslim, said “The magic has been broken today” — then later admitted “I was wrong”',
      'The Prophet ﷺ distributed the spoils so generously that new converts received more than long-standing companions',
    ],
  },

  /* ── Ta'if siege ─────────────────────────────────────────── */
  46: {
    title: 'The Siege of Ṭāʼif',
    subtitle: 'The Siege of Thaqīf and the Prophet’s Patience ﷺ',
    highlight: 'Patient Forbearance',
    location: 'Ṭāʼif',
    description:
      'After Ḥunayn, the Prophet ﷺ besieged the walled city of Ṭāʼif for about twenty days. Despite catapults and siege equipment, the city resisted. He lifted the siege, saying: “Leave them.” He was asked to curse the Thaqīf but replied: “O Allah, guide the Thaqīf and bring them.” Within a year, the entire tribe sent a delegation and entered Islam.',
    highlights: [
      'He refused to curse the Thaqīf — the same tribe that had stoned him out of the city a decade earlier',
      'His prayer “O Allah, guide the Thaqīf” was answered within a year',
      'The decision to lift the siege was military wisdom: a prolonged siege would cost more than it gained',
      'Ṭāʼif entered Islam the following year as part of the ʿcĀm al-Wufūd (Year of Delegations)',
    ],
  },

  /* ── His Mercy ───────────────────────────────────────────── */
  47: {
    title: 'His Mercy ﷺ',
    subtitle: "‘We have not sent you except as a mercy to all the worlds’",
    highlight: 'Mercy to All Worlds',
    description:
      'A reflection on the defining characteristic of the Prophet ﷺ — his boundless mercy that encompassed enemies and friends, humans and animals, the old and the young. He wept when a companion’s camel was overloaded. He forbade the burning of anthills. He said: “Those who show mercy will be shown mercy by the Most Merciful — be merciful to those on earth and He in Heaven will be merciful to you.”',
    highlights: [
      'He forbade the branding of animals on the face and required that blades be sharpened before slaughter to minimize pain',
      'He lifted prayers when he heard an infant crying so the mother could nurse',
      'He said of a man who gave water to a thirsty dog: “Allah forgave him for that act”',
      'He called for mercy even toward enemies, praying for the guidance of those who stoned him at Ṭāʼif',
      'The Qurʼān describes his mercy: “He is anxious over you, for the believers full of kindness and mercy” (9:128)',
    ],
  },

  /* ── Tabuk ───────────────────────────────────────────────── */
  48: {
    title: 'The Battle of Tabūk',
    subtitle: 'The Hour of Hardship and the Army of Hardship',
    highlight: 'The Army of Hardship',
    location: 'Tabūk — northern Hijaz',
    description:
      'In the scorching summer of 9 AH, the Prophet ﷺ called for an unprecedented march to the Byzantine frontier — against the world’s greatest power. The campaign exposed the hypocrites who refused to go and the three sincere companions who stayed behind out of laziness, were boycotted for fifty days, then forgiven with a Quranic revelation of joy and repentance.',
    fullDescription:
      'News reached Medina that the Byzantine Empire was assembling a vast army on the northern frontier. The Prophet ﷺ made an unusual decision: to announce the expedition openly and publicly call for funding and volunteers, despite the summer heat, drought, and harvest season.\n\nThe response divided the community. The munafiqūn (hypocrites) made excuse after excuse. The faithful gave generously: ʿUthmān ibn ʿAffān equipped a third of the army personally. Abū Bakr gave all his wealth. A poor companion brought only two handfuls of dates — and was mocked by the hypocrites, but the Prophet ﷺ said it was more blessed than all their donations.\n\nThree sincere companions — Kaʼb ibn Mālik, Hilāl ibn Umayyah, and Murārah ibn al-Rabīʼ — stayed behind without justification. The Prophet ﷺ ordered that no one speak to them for fifty days. Kaʼb ibn Mālik later said those fifty days were the most excruciating of his life, yet also the most spiritually transformative. Then Qurʼān 9:118 was revealed forgiving them, and Kaʼb said: “I cannot recall a greater blessing from Allah than that my heart was truthful that day when I did not lie.”',
    highlights: [
      'This was the most expensive and difficult military campaign of the Prophet’s life — called “the army of hardship (al-ʼusrah)”',
      'The hypocrites were fully exposed by their excuses — their hypocrisy became undeniable',
      "Kaʼb ibn Mālik's story of repentance and forgiveness became one of the most celebrated in the Qurʼān",
      'The Byzantine army never materialized — the show of Islamic strength deterred them',
      'After this expedition, no power ever successfully challenged the Islamic state in Arabia again',
    ],
  },

  /* ── Muadh to Yemen ──────────────────────────────────────── */
  49: {
    title: 'The Mission of Muʼādh ibn Jabal to Yemen',
    subtitle: 'The Most Knowledgeable in Ḥalāl and Ḥarām',
    highlight: 'The Teacher of Yemen',
    description:
      'The Prophet ﷺ appointed Muʼādh ibn Jabal — praised as the most knowledgeable of the companions in ḥalāl and ḥarām — as governor, judge, and teacher of Yemen. As Muʼādh rode away, the Prophet ﷺ walked alongside him and delivered final counsel. Their dialogue about the foundations of judicial reasoning became a cornerstone of Islamic legal theory.',
    highlights: [
      'The Prophet ﷺ walked alongside Muʼādh’s riding animal to delay their farewell — showing his love',
      'Their famous exchange: “By what will you judge?” “By the Book of Allah… then the Sunnah… then my own reasoning” — a foundation of Islamic jurisprudence',
      'The Prophet ﷺ said of him: “Muʼādh is the most knowledgeable of the community in ḥalāl and ḥarām”',
      'He served in Yemen until the death of the Prophet ﷺ',
    ],
  },

  /* ── Death of Ibrahim ────────────────────────────────────── */
  50: {
    title: 'The Death of His Son Ibrāhīm ﷺ',
    subtitle: "‘The Heart Grieves, the Eye Weeps’",
    highlight: 'Grief and Gratitude',
    description:
      'Ibrāhīm, the Prophet’s ﷺ son by Māriyah al-Qibṭiyyah, died as an infant of sixteen months. The Prophet ﷺ held him and wept, saying: “The heart grieves and the eye weeps, and we say nothing but what pleases our Lord. Indeed, O Ibrāhīm, we are deeply grieved by your departure.” A solar eclipse that day led some to say it was for Ibrāhīm — the Prophet ﷺ corrected them: “The sun and moon eclipse for no one’s birth or death.”',
    highlights: [
      'He combined deep human grief with complete submission: “we say nothing but what pleases our Lord”',
      'He corrected the superstition that the eclipse was connected to his son’s death — even in personal tragedy',
      "Ibrāhīm was his last child and the only child born after the Hijrah",
      'His grief over Ibrāhīm showed that prophets feel grief fully — while remaining at peace with divine decree',
    ],
  },

  /* ── Year of Delegations ─────────────────────────────────── */
  51: {
    title: 'The Year of Delegations (ʼcĀm al-Wufūd)',
    subtitle: 'The Arabs Enter Allāh’s Religion in Multitudes',
    highlight: 'In Multitudes',
    location: 'Medina',
    description:
      'In 9 AH, delegations from tribes across Arabia came to Medina to embrace Islam — fulfilling the Quranic prophecy: “When the help of Allah comes and the conquest, and you see people entering the religion of Allah in multitudes” (110:1-2). Over sixty delegations arrived. The Prophet ﷺ received each with honor, taught them the pillars of Islam, and sent teachers back with them.',
    highlights: [
      'Sūrah al-Naṣr (110) was revealed describing this moment — and is understood as a signal of the approaching end',
      'Tribes who had fought the Prophet ﷺ for years came as delegations of peace and faith',
      'The entire Arabian peninsula was now under one spiritual and political authority',
      'Abū Bakr and others understood this surah as the Prophet’s farewell signal',
    ],
  },

  /* ── Farewell Pilgrimage ─────────────────────────────────── */
  52: {
    title: 'The Farewell Pilgrimage (Ḥajjat al-Wadāʼ)',
    subtitle: 'One Hundred Thousand Companions at ʿArafat',
    highlight: 'The Eternal Charter',
    location: 'ʿArafat — Mecca',
    description:
      'In Dhul Ḥijjah 10 AH (632 CE), the Prophet ﷺ performed his first and only Hajj, leading approximately 100,000 companions. On the plain of ʿArafat he delivered his Farewell Sermon — a timeless declaration of human equality, the sanctity of life and property, the rights of women, the rejection of racism, and the finality of prophethood. He asked: “Have I delivered the message?” They said: “Yes!” He said: “O Allah, bear witness.”',
    fullDescription:
      'The Prophet ﷺ set out for Hajj in Dhul Qaʼdah 10 AH, and word spread across Arabia. Approximately 100,000 companions gathered — some say up to 140,000. It was an assembly unprecedented in history.\n\nStanding on the plain of ʿArafat on the 9th of Dhul Ḥijjah, the Prophet ﷺ delivered his Farewell Sermon from the back of his camel Al-Qaṣwāʼ. Its words encompassed the entire ethical, legal, and spiritual framework of Islam:\n\n“O people, your Lord is one and your father (Adam) is one. An Arab has no superiority over a non-Arab; nor does a non-Arab have superiority over an Arab; nor does a white person have superiority over a black person; nor does a black person have superiority over a white person, except by piety and good action.”\n\n“The blood of this day, this month, and this city are sacred — as sacred as this day forever.”\n\n“I leave with you two things; you will never go astray as long as you hold to them: the Book of Allah and the Sunnah of His Prophet.”\n\nThen he asked: “Have I delivered the message?” They replied: “Yes, O Messenger of Allah!” He raised his finger to the sky and said: “O Allah, bear witness — bear witness — bear witness.”\n\nThat day, the final revelation came: “Today I have completed your religion for you, perfected My blessing upon you, and approved for you Islam as your religion.” (5:3)',
    highlights: [
      '“An Arab has no superiority over a non-Arab … except by piety” — the most powerful declaration of human equality in the ancient world',
      'The final Quranic verse was revealed that day: “Today I have completed your religion for you” (5:3)',
      'He asked “Have I delivered the message?” three times — making all 100,000 witnesses to his mission',
      'He performed his only Hajj in his final year — it became the model for all Hajj until the end of time',
    ],
  },

  /* ── His Death ───────────────────────────────────────────── */
  53: {
    title: 'His Death ﷺ',
    subtitle: 'The 12th of Rabīʼ al-Awwal',
    highlight: 'To the Highest Companion',
    location: "Medina — ʼcĀʼisha's Room",
    description:
      'On Monday the 12th of Rabīʼ al-Awwal, 11 AH (June 8, 632 CE), the Prophet Muḥammad ﷺ passed away in Medina at the age of sixty-three, his head in the lap of his beloved wife ʼcĀʼisha ،. His final whisper: “To the Highest Companion.” ʿUmar refused to believe it — until Abū Bakr spoke from the pulpit: “Whoever worshipped Muḥammad, Muḥammad has died. Whoever worshipped Allah, Allah is living and never dies.”',
    fullDescription:
      'The Prophet ﷺ had fallen ill after returning from the Farewell Pilgrimage. The illness intensified over thirteen days. He continued to lead prayer when he could, and when he could not, he asked Abū Bakr to lead in his place.\n\nIn his final days he asked for water repeatedly and poured it over himself, then lost consciousness, then recovered and asked: “Has Abū Bakr led the people in prayer?” He was told yes. He nodded peacefully. On the last morning, he lifted the curtain of ʼcĀʼisha’s room and looked at his companions praying — his face glowed with joy and he smiled. The companions later said that smile was the last gift he gave them.\n\nHe lay back with his head in ʼcĀʼisha’s lap. She felt his weight increase. His last words, repeated three times, were: “Al-Rafīq al-Aʼlā — To the Highest Companion.” He chose death over earthly life, as had been offered to him.\n\nʼcĀʼisha said: “He passed between my collarbone and my neck — and how I could wish that I understood what it means to be chosen by Allah.”\n\nWhen the news spread, the companions were shattered. ʿUmar ibn al-Khaṭṭāb, sword drawn, declared he would kill anyone who said the Prophet ﷺ had died. Abū Bakr entered the room, kissed the Prophet’s forehead, and said: “You were beautiful in life and beautiful in death.” Then he went to the pulpit and said words that became immortal: “Whoever worshipped Muḥammad, then Muḥammad has died. But whoever worshipped Allah — Allah is Living and never dies.” ʿUmar’s legs gave way beneath him.',
    highlights: [
      'His final words: “Al-Rafīq al-Aʼlā — To the Highest Companion” — choosing the divine over the earthly',
      "ʼcĀʼisha said: “Allah gathered His Prophet’s final breath with my saliva” — a mercy within a mercy",
      "Abū Bakr's words from the pulpit became one of the most important statements in Islamic history",
      "ʿUmar's legs gave out when Abū Bakr recited: “Muhammad is only a messenger; messengers have passed before him” (3:144)",
      'He was buried in the very room where he died — now within the Prophet’s Mosque in Medina',
    ],
  },
};

/* English names for Chapter metadata */
export const CHAPTER_META_EN: Record<string, {
  name: string;
  subtitle: string;
  description: string;
  years: string;
}> = {
  'الفجر': {
    name: 'The Dawn',
    subtitle: 'Birth & Early Life',
    description:
      'From his birth ﷺ in the sacred city of Mecca to the earliest stirrings of his calling — a childhood nurtured by Allah, and a youth distinguished by truthfulness and trustworthiness',
    years: '571 — 610 CE',
  },
  'النور': {
    name: 'The Light',
    subtitle: 'The Dawn of Revelation',
    description:
      'The descent of the Qurʼān in the Cave of Ḥirāʼ and the beginning of the call — first shared in secret, then proclaimed openly in the streets of Mecca',
    years: '610 — 615 CE',
  },
  'الابتلاء': {
    name: 'The Trial',
    subtitle: 'Patience and Perseverance',
    description:
      'Years of persecution, the Boycott, and the Year of Sorrow — then the Night Journey as a divine consolation to the beloved Prophet under trial',
    years: '615 — 622 CE',
  },
  'الهجرة': {
    name: 'The Migration',
    subtitle: 'The Birth of the Islamic State',
    description:
      'The great turning from Mecca to Medina, the founding of the Muslim community, the building of the Prophet’s Mosque, and the first written constitution in history',
    years: '622 CE / 1 AH',
  },
  'المعارك': {
    name: 'The Battles',
    subtitle: 'Defense and Dignity',
    description:
      'Badr, Uḥud, and Al-Khandaq — three lessons in victory, trial, and steadfastness in the face of all the forces of Arabia',
    years: '624 — 627 CE',
  },
  'الفتح': {
    name: 'The Conquest',
    subtitle: 'Forgiveness and Victory',
    description:
      'The Treaty of Ḥudaybiyyah that concealed a great victory, then the entry into Mecca with mercy rather than the sword, and the proclamation of a general amnesty',
    years: '628 — 630 CE',
  },
  'الوداع': {
    name: 'The Farewell',
    subtitle: 'The Completion of the Mission',
    description:
      'The Farewell Pilgrimage with one hundred thousand companions, the eternal sermon at ʿArafat, and the final revelation: “Today I have completed your religion for you”',
    years: '630 — 632 CE',
  },
  'الرحيل': {
    name: 'The Departure',
    subtitle: 'To the Highest Companion',
    description:
      'The passing of the most beloved of all creation ﷺ — the moment the earth was left without its greatest mercy, and a community learned to carry his legacy forward',
    years: '632 CE / 11 AH',
  },
};
