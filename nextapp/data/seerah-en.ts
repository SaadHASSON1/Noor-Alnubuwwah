/* ─────────────────────────────────────────────────────────────
   English content overlay for all Seerah events.
   Keyed by event id.  Only text fields are stored here —
   colours, types and dates stay in the Arabic source.
───────────────────────────────────────────────────────────── */

export interface SeerahEventEnStat { label: string; value?: string; }
export interface SeerahEventEnKeyFigure { name: string; role: string; }
export interface SeerahEventEnHadith { text: string; source: string; }
export interface SeerahEventEnBattlePhase { phase: string; detail: string; }
export interface SeerahEventEnRelatedVerse { verse_translation: string; context: string; }

export interface SeerahEventEn {
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  fullDescription?: string;
  highlights?: string[];
  location?: string;
  statsLabels?: string[];
  statsValues?: string[];
  keyFiguresEn?: SeerahEventEnKeyFigure[];
  hadithsEn?: SeerahEventEnHadith[];
  battleTimelineEn?: SeerahEventEnBattlePhase[];
  relatedVersesEn?: SeerahEventEnRelatedVerse[];
  verse_en?: string;
}

export const SEERAH_EN: Record<number, SeerahEventEn> = {

  /* ── 1 ── Birth ───────────────────────────────────────────── */
  1: {
    title: "The Prophet's Birth ﷺ",
    subtitle: 'The Year of the Elephant',
    highlight: 'The Light',
    location: 'Mecca — Valley of Banu Hashim',
    statsLabels: ['Year CE', 'Date', 'Day'],
    statsValues: ['571 CE', '12 Rabi al-Awwal', 'Monday'],
    keyFiguresEn: [
      { name: 'Āminah bint Wahb', role: 'His noble mother' },
      { name: 'ʿAbd al-Muṭṭalib', role: 'His grandfather and first guardian' },
      { name: 'Thuwaybah al-Aslamiyyah', role: 'The first woman to nurse him' },
      { name: 'Ḥalīmah al-Saʿdiyyah', role: 'His wet nurse in the desert of Hawāzin' },
    ],
    hadithsEn: [
      { text: 'The Messenger of Allah ﷺ said: "I am the supplication of my father Ibrāhīm, the glad tidings of ʿĪsā, and my mother saw at the time she carried me a light that illuminated the palaces of Syria."', source: 'Musnad Aḥmad — authenticated by Ibn Ḥibbān — cited by Ibn Kathīr in al-Sīrah al-Nabawiyyah' },
      { text: 'He ﷺ said: "I was born in Islam, and I fast on Monday because it is the day I was born and the day revelation descended upon me."', source: 'Sahih Muslim — Book of Fasting' },
    ],
    relatedVersesEn: [
      { verse_translation: '"There has certainly come to you a Messenger from among yourselves. Grievous to him is what you suffer; [he is] concerned over you and to the believers is kind and merciful."', context: 'Allah describes His Prophet ﷺ as coming from the same people, deeply concerned for them, full of kindness and mercy' },
      { verse_translation: '"And indeed, you are of a great moral character."', context: 'Allah testifies to His Prophet\'s ﷺ great character — attested by all who knew him, near and far' },
    ],
    description:
      'On Monday the 12th of Rabiʼ al-Awwal in the Year of the Elephant (571 CE), the Prophet Muhammad ibn ʿAbdullah al-Hashimi ﷺ was born in Mecca. He came into the world an orphan, his father having passed before his birth. That same year Allah had repelled the army of the Elephant that sought to demolish the Kaʻah — as if purifying the earth to receive the noblest of all creations.',
    fullDescription:
      'The Prophet Muhammad ﷺ was born in Mecca on Monday, the 12th of Rabiʼ al-Awwal in the Year of the Elephant, corresponding to 571 CE. He was born in the house of his father ʿAbdullah ibn ʿAbd al-Muttalib, yet he entered the world an orphan, placed entirely under the providential care of Allah.\n\nThat year witnessed a remarkable sign: Allah sent the Ababeel birds carrying clay stones to destroy the army of Abraha the Abyssinian, who had marched toward Mecca with war elephants intending to demolish the Kaʻah. The army was annihilated — as though the Most High was cleansing the earth before the arrival of His most beloved creation.\n\nHis mother Āminah bint Wahb saw during her pregnancy a light that burst forth from her, illuminating the palaces of Syria — a divine herald of the child she carried. He was first nursed by Thuwaybah, the freed slave of his uncle Abū Lahab, then sent to the desert of Banū Saʿd to be nursed by Ḥalīmah al-Saʿdīyah. The family of Ḥalīmah was blessed with abundance from the moment he arrived.\n\nThe Prophet ﷺ used to fast on Mondays, saying this was the day he was born and the day revelation descended upon him — teaching his nation that gratitude to Allah is expressed through worship. He described himself as 'the supplication of my father Ibrahim and the glad tidings of ʿIsa,' affirming that his coming was foretold across the entire prophetic tradition.',
    highlights: [
      'Born in the Year of the Elephant — the very year Allah destroyed the army that came to demolish the Kaʻah',
      'His mother Āminah saw a light in a dream that illuminated the palaces of Syria, heralding his greatness',
      'Born an orphan — as though Allah willed to personally undertake his upbringing and preparation',
      'Named Muḥammad (the Praised One) and Aḥmad (the Most Praising of Allah)',
      'Ḥalīmah al-Saʿdīyah's family was blessed with abundance from the moment he arrived',
    ],
  },

  /* ── 19 ── Opening of the Chest ──────────────────────────── */
  19: {
    verse_en: 'Did We not expand for you, [O Muhammad], your chest?',
    title: 'The Opening of the Chest ﷺ',
    subtitle: 'Purification of the Prophet's Heart',
    highlight: 'A Pure Heart',
    location: 'Desert of Banū Saʿd — Hawāzin',
    statsLabels: ['His age ﷺ', 'Location', 'Repeated'],
    statsValues: ['About 4 years', 'Desert of Banū Saʿd', 'Twice: in childhood and before the Miʿrāj'],
    keyFiguresEn: [
      { name: 'Ḥalīmah al-Saʿdiyyah', role: 'His wet nurse who returned him to his mother in fear' },
      { name: 'Jibrīl and Mīkāʾīl', role: 'The two angels who performed the purification' },
      { name: 'Ḍamīrah and ʿAbdullāh', role: 'Children of Ḥalīmah who witnessed the event' },
    ],
    hadithsEn: [
      { text: 'Anas ibn Mālik narrated that the Messenger of Allah ﷺ was visited by Jibrīl while he was playing with other boys. He took him, laid him down, opened his chest, extracted his heart, removed a clot from it and said: "This is the portion of Shayṭān in you." He then washed it in a golden basin with Zamzam water, stitched it, and returned it to its place.', source: 'Sahih Muslim — Book of Faith' },
      { text: 'Ḥalīmah al-Saʿdiyyah said: "I returned him to his mother and said: I fear something has happened to this boy — take him back. I told her what happened and she said: What do you fear for him? By Allah, when I was pregnant with him I saw a light emerge from me that illuminated the palaces of Syria."', source: 'Sīrah of Ibn Hishām — al-Sīrah al-Nabawiyyah' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Did We not expand for you, [O Muhammad], your chest?"', context: 'The expansion of the chest came in stages: purification in childhood, preparation before prophethood, and again on the Night of Ascent' },
    ],
    description:
      'While in the care of his wet nurse Ḥalīmah al-Saʿdīyah, two angels appeared to the young Muḥammad ﷺ, opened his chest, removed his heart, washed it with Zamzam water in a golden basin, extracted the portion of Satan, and restored it. This divine purification was preparation for the bearer of the Final Message.',
    fullDescription:
      'In the desert of Banū Saʿd, while around four years old, the young Muḥammad ﷺ witnessed a momentous event. Two angels in white came to him, laid him down, opened his noble chest, and removed his heart. They extracted a black clot, saying: “This is the portion of Shayṭān in you.” They washed his heart with Zamzam water in a golden basin, filled it with faith and wisdom, and returned it to its place.\n\nThe children playing nearby ran in alarm to Ḥalīmah, saying their foster-brother had collapsed. She found him pale and trembling, held him close, and returned him to his mother in Mecca.\n\nThis purification was a direct divine preparation of the Prophet's heart ﷺ — making it the purest and most receptive vessel for revelation and the Final Message. The opening of the chest was repeated a second time on the Night of the Isrāʼ and Miʼrāj, before his ascent through the heavens.',
    highlights: [
      'The angels said “This is the portion of Shayṭān in you” — showing the Prophet ﷺ was uniquely protected from satanic influence',
      'The opening of the chest was repeated before the Night Journey — a second purification before meeting Allah',
      'Ḥalīmah's children were so frightened they ran to her crying that their foster-brother had been harmed',
      'Allah alluded to this event: “Did We not expand your chest for you?” (Qūrʾaḥ 94:1)',
    ],
  },

  /* ── 2 ── Death of His Mother ────────────────────────────── */
  2: {
    verse_en: 'Did He not find you an orphan and give [you] refuge?',
    title: 'Death of His Mother',
    subtitle: 'The Orphan Raised by Allah',
    highlight: 'Raised by His Lord',
    location: 'Al-Abwāʼ — between Mecca and Medina',
    statsLabels: ['His age ﷺ at her death', 'Place of death', 'His guardian after her'],
    statsValues: ['6 years', 'Al-Abwāʼ — between Mecca and Medina', 'His grandfather ʿAbd al-Muṭṭalib'],
    keyFiguresEn: [
      { name: 'Āminah bint Wahb', role: 'His noble mother, may Allah have mercy on her' },
      { name: 'ʿAbd al-Muṭṭalib', role: 'His grandfather and guardian after her death' },
      { name: 'Umm Ayman Barakah', role: 'His nurse who was with him on the journey' },
    ],
    hadithsEn: [
      { text: 'Abū Hurayrah narrated: The Prophet ﷺ visited the grave of his mother and wept, and caused those around him to weep, then said: "I asked my Lord\'s permission to seek forgiveness for her and was not permitted; I asked His permission to visit her grave and was permitted — so visit graves, for they remind you of death."', source: 'Sahih Muslim — Book of Funerals' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Did He not find you an orphan and give [you] refuge? And He found you lost and guided [you]. And He found you poor and made [you] self-sufficient."', context: 'Allah mentions three blessings He bestowed on His Prophet ﷺ — his orphanhood, his guidance, and his sufficiency — honoring each trial he endured' },
    ],
    description:
      'At six years old, the Prophet ﷺ lost his mother Āminah bint Wahb in the town of Al-Abwāʼ as she returned from visiting her husband's grave in Medina. His orphanhood was now complete. He was taken into the care of his grandfather ʿAbd al-Muṭṭalib, and after his death, his uncle Abū Ṭālib.',
    fullDescription:
      'Barely six years old, the young Muḥammad ﷺ lost his mother Āminah bint Wahb on the road back from Medina, where she had taken him to visit his father's grave and meet his maternal relatives among Banū ʿAdī ibn al-Najjār. She passed away in al-Abwāʼ and was buried there, far from her homeland.\n\nHe returned to Mecca with his nurse Umm Ayman Barakah, carrying a second grief added to his original orphanhood. His grandfather ʿAbd al-Muṭṭalib — chief of Quraysh — took him in and loved him deeply, seating him on his own mat in the shade of the Kaʻah. Two years later ʿAbd al-Muṭṭalib also passed, and guardianship passed to his uncle Abū Ṭālib, who sheltered and defended him for decades.\n\nYears later, the Prophet ﷺ visited his mother's grave and wept, and those around him wept too. He said: “I asked permission to pray for her forgiveness and was not permitted; then I asked permission to visit her grave and was permitted — so visit graves, for they remind you of death.” The Qurʼān honored this journey: “Did He not find you an orphan and give you refuge?” (93:6)',
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
    statsLabels: ['His age ﷺ', 'Destination'],
    statsValues: ['12 years', 'Buṣrā — Greater Syria'],
    keyFiguresEn: [
      { name: 'Abū Ṭālib ibn ʿAbd al-Muṭṭalib', role: 'His uncle and protector on the journey' },
      { name: 'Baḥīrā the Monk', role: 'The learned Christian monk who recognized the signs of prophethood from his scriptures' },
    ],
    hadithsEn: [
      { text: 'Baḥīrā said to Abū Ṭālib: "Return with your nephew to his homeland and guard him from the Jews. By Allah, if they see him and recognize in him what I have recognized, they will seek to harm him — for this nephew of yours will have a great station."', source: 'Sīrah of Ibn Hishām — Dalāʾil al-Nubuwwah by al-Bayhaqī' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Those to whom We gave the Scripture know him as they know their own sons."', context: 'The People of the Book recognized the signs of the Prophet ﷺ from their scriptures even before his mission, just as Baḥīrā demonstrated' },
    ],
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
    statsLabels: ['His age ﷺ', 'Location', 'Participating tribes'],
    statsValues: ['About 20 years', 'House of ʿAbdullāh ibn Judʿān — Mecca', 'Banū Hāshim, Zuhrah, and Taym'],
    keyFiguresEn: [
      { name: 'Muḥammad ibn ʿAbdullāh ﷺ', role: 'Witness to the Pact and its greatest advocate' },
      { name: 'ʿAbdullāh ibn Judʿān', role: 'The man in whose house the Pact was formed' },
      { name: 'The Zubaydī merchant', role: 'The wronged man who was restored his rights through the Pact' },
    ],
    hadithsEn: [
      { text: 'The Messenger of Allah ﷺ said: "I witnessed in the house of ʿAbdullāh ibn Judʿān a pact that I would not exchange for a herd of red camels. If I were called to it in Islam I would respond — it was that rights be returned to their owners and none be permitted to oppress."', source: 'Sīrah of Ibn Hishām — authenticated by Ibn Kathīr in al-Bidāyah wal-Nihāyah' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Indeed, Allah orders justice and good conduct and giving to relatives and forbids immorality and bad conduct and oppression."', context: 'The principle of justice on which the Pact of the Virtuous was founded became a foundational pillar of Islamic legislation' },
    ],
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
    verse_en: 'And He found you poor and made [you] self-sufficient.',
    title: 'Marriage to Khadījah ،',
    subtitle: 'The First to Believe in Him',
    highlight: 'His Greatest Supporter',
    location: 'Mecca',
    statsLabels: ['His age ﷺ', 'Her age', 'Years of marriage', 'Their children'],
    statsValues: ['25 years', '40 years', '25 years', '6 children'],
    keyFiguresEn: [
      { name: 'Khadījah bint Khuwaylid', role: 'His first wife — mother of his children — first of the believers' },
      { name: 'Abū Ṭālib', role: 'Conducted the marriage contract on behalf of his nephew' },
      { name: 'Waraqah ibn Nawfal', role: 'Khadijah\'s cousin, learned in the scriptures, who foretold the prophethood' },
      { name: 'Nafīsah bint Munyah', role: 'The intermediary who proposed the marriage to Khadijah' },
    ],
    hadithsEn: [
      { text: 'The Prophet ﷺ said: "I was never given anyone over Khadījah. Allah never commanded me to take another wife while she lived."', source: 'Sahih al-Bukhārī — Book of the Virtues of the Anṣār' },
      { text: 'He ﷺ said: "Many men have reached perfection, and of women only Maryam bint ʿImrān, and Āsiyah wife of Pharaoh, and Khadījah bint Khuwaylid, and Fāṭimah bint Muḥammad."', source: 'Sahih al-Bukhārī — Book of the Prophets' },
      { text: 'ʿĀʾishah ، said: "I was never jealous of any of the Prophet\'s wives as I was jealous of Khadījah, though I never saw her. But he used to mention her constantly and speak highly of her."', source: 'Sahih al-Bukhārī — Book of the Virtues of the Anṣār' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy."', context: 'Khadijah ، was the greatest embodiment of this verse in the Prophet\'s life — a source of tranquility, affection, and mercy' },
    ],
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
    statsLabels: ['His age ﷺ', 'Duration of construction', 'Disputing tribes'],
    statsValues: ['35 years', 'Several months', 'Four Quraysh tribes'],
    keyFiguresEn: [
      { name: 'Muḥammad ibn ʿAbdullāh ﷺ', role: 'The arbiter whom all tribes agreed to accept' },
      { name: 'Chiefs of Quraysh', role: 'The tribal leaders disputing over the honor of placing the Stone' },
    ],
    hadithsEn: [
      { text: 'Ibn Isḥāq said: "When the Stone was reached, the Prophet ﷺ placed it with his hand, then said to a man from each tribe: Take hold of the corners of the cloak and lift it together. They did so until when they reached the Stone\'s position, the Messenger of Allah ﷺ took it and placed it in its spot. This was five years before the prophethood."', source: 'Sīrah of Ibn Hishām — al-Sīrah al-Nabawiyyah' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And [mention] when Ibrāhīm was raising the foundations of the House and [with him] Ismāʿīl, [saying], Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing."', context: 'The Kaʿbah was founded by Ibrāhīm and Ismāʿīl, and Muḥammad ﷺ, their descendant, restored the Stone to its place' },
    ],
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
    verse_en: 'Read in the name of your Lord who created',
    title: 'The First Revelation',
    subtitle: 'Cave of Ḥirāʼ — Ramaḍān',
    highlight: 'Iqraʼ',
    location: 'Cave of Ḥirāʼ — Mount of Light, Mecca',
    statsLabels: ['His age ﷺ', 'Month', 'First verses revealed', 'Duration of retreat'],
    statsValues: ['40 years', 'Ramaḍān', 'Sūrah al-ʿAlaq: 1–5', 'One month each year'],
    keyFiguresEn: [
      { name: 'Jibrīl (ʿalayhis-salām)', role: 'The Trustee of Revelation — first to bring the Qurʾān' },
      { name: 'Khadījah bint Khuwaylid', role: 'First to believe and comfort him when he returned trembling' },
      { name: 'Waraqah ibn Nawfal', role: 'Confirmed that this was the same angel that came to Moses' },
    ],
    hadithsEn: [
      { text: 'ʿĀʾishah narrated: "The commencement of revelation to the Messenger of Allah ﷺ was through true dreams... Then he was caused to love seclusion... The angel came to him and said: Read. He replied: I cannot read. He embraced him until he felt distress, then released him and said: Read. He replied: I cannot read. He embraced him a second time... a third time, then recited: \'Read in the name of your Lord who created...\'"', source: 'Sahih al-Bukhārī — Book of the Beginning of Revelation (the first hadith)' },
      { text: 'Khadījah ، said: "Never! By Allah, He will never disgrace you. You uphold family ties, you speak the truth, you carry those who cannot carry themselves, you host the guest, and you support those who stand for justice."', source: 'Sahih al-Bukhārī — Book of the Beginning of Revelation' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Read in the name of your Lord who created — created man from a clinging substance. Read, and your Lord is the Most Generous — who taught by the pen — taught man that which he knew not."', context: 'The first five verses to descend in the Cave of Ḥirāʾ — Revelation began with the command to read and learn' },
      { verse_translation: '"Nor does he speak from [his own] inclination. It is not but a revelation revealed."', context: 'Allah\'s testimony that all the Prophet ﷺ says is divine revelation, not personal desire' },
    ],
    description:
      'In the Cave of Ḥirāʼ during Ramaḍān 610 CE, the Angel Jibrīl embraced Muḥammad ﷺ three times and commanded: “Read!” He replied: “I cannot read.” Then Jibrīl recited the first verses of Sūrah al-ʿAlaq. Muḥammad ﷺ descended trembling and went to Khadījah, who wrapped him in a cloak and said: “By Allah, He will never disgrace you.”',
    fullDescription:
      'In the Cave of Ḥirāʼ on the Mountain of Light, during the holy month of Ramaḍān in 610 CE, Muḥammad ibn ʿAbdullāh ﷺ — then forty years old — received the first divine revelation that would change the world forever.\n\nThe Angel Jibrīl appeared and embraced him powerfully three times, each time commanding: “Iqraʼ! — Read!” Each time Muḥammad ﷺ replied: “Mā ana bi-qāriʼ — I do not read.” Then Jibrīl recited: “Read in the name of your Lord who created — created man from a clinging clot. Read, and your Lord is the Most Generous — who taught by the pen — taught man what he did not know.” (96:1-5)\n\nHe descended the mountain with his heart pounding and went directly to Khadījah, saying: “Cover me, cover me!” She wrapped him in a cloak until the trembling subsided, then he told her what had happened, saying: “I fear for myself.” Her response — calm, confident, and deeply loving — became one of the most celebrated statements in Islamic history: “By Allah, He will never disgrace you. You uphold family ties, you speak the truth, you carry those who cannot carry themselves, you host the guest, and you support those who stand for justice.”\n\nShe then took him to her cousin Waraqah ibn Nawfal, an elderly scholar of the Gospels, who told him: “This is the Nāmūs — the same Angel that came to Moses. Would that I were young — I wish I could be alive when your people drive you out!” The Prophet ﷺ was astonished: “Will they drive me out?” Waraqah replied: “No man has ever brought what you bring without being driven out.”',
    highlights: [
      'The command “Iqraʼ!” — Read! — was the first word of divine revelation in Islam',
      'Khadījah's comforting response became one of the most celebrated statements in Islamic history',
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
    statsLabels: ['Duration of secret call', 'First man to believe', 'First child to believe'],
    statsValues: ['3 years', 'Abū Bakr al-Ṣiddīq', 'ʿAlī ibn Abī Ṭālib'],
    keyFiguresEn: [
      { name: 'Khadījah bint Khuwaylid', role: 'First of all believers — first to confirm the Message' },
      { name: 'Abū Bakr al-Ṣiddīq', role: 'First free man to embrace Islam — a gifted caller to the faith' },
      { name: 'ʿAlī ibn Abī Ṭālib', role: 'First of the youth to embrace Islam at around ten years old' },
      { name: 'Zayd ibn Ḥārithah', role: 'First of the freed slaves to embrace Islam — the Prophet\'s client' },
    ],
    hadithsEn: [
      { text: 'ʿAmr ibn ʿAbasah said: I came to the Prophet ﷺ and asked: Who follows you in this matter? He said: "A free man and a slave" — meaning Abū Bakr and Bilāl.', source: 'Sahih Muslim — Book of Faith' },
      { text: 'Abū Bakr ، said: "I invited no one to Islam who hesitated or held back, except ʿUthmān ibn ʿAffān — he did not hesitate."', source: 'al-Istīʿāb by Ibn ʿAbd al-Barr' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And the first forerunners [in the faith] among the Muhājirīn and the Anṣār and those who followed them with good conduct — Allah is pleased with them and they are pleased with Him."', context: 'The earliest believers — those who accepted Islam during the secret period — are among the foremost of the forerunners' },
    ],
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
    verse_en: 'So proclaim what you are commanded and turn away from the polytheists.',
    title: 'The Public Call to Islam',
    subtitle: 'He Climbed Al-Ṣafā and Called Out to Quraysh',
    highlight: 'The Warning',
    location: 'Mount Al-Ṣafā — Mecca',
    statsLabels: ['Duration of secret call', 'His age ﷺ'],
    statsValues: ['3 years', '43 years'],
    keyFiguresEn: [
      { name: 'Abū Bakr al-Ṣiddīq', role: 'First free man to embrace Islam — a gifted caller to the faith' },
      { name: 'ʿAlī ibn Abī Ṭālib', role: 'First of the youth to embrace Islam' },
      { name: 'Abū Lahab ʿAbd al-ʿUzzā', role: 'The most hostile of the Prophet\'s kin — rejected the call with fury' },
      { name: 'Zayd ibn Ḥārithah', role: 'First of the freed slaves to embrace Islam' },
    ],
    hadithsEn: [
      { text: 'Ibn ʿAbbās narrated: "When the verse \'Warn your nearest kindred\' was revealed, the Prophet ﷺ climbed al-Ṣafā and called out: O Banū Fihr! O Banū ʿAdī! ... They gathered and he said: If I told you there was an army in this valley intending to attack you, would you believe me? They said: Yes — we have never known you to lie. He said: Then I am a warner to you of a severe punishment coming."', source: 'Sahih al-Bukhārī — Book of Tafsīr' },
    ],
    relatedVersesEn: [
      { verse_translation: '"So proclaim what you are commanded and turn away from the polytheists."', context: 'The divine command for the Prophet ﷺ to go public with the call after three years of private teaching' },
      { verse_translation: '"And warn your nearest kindred."', context: 'The verse that commanded the Prophet ﷺ to warn his close relatives first before the wider public' },
    ],
    description:
      'After three years of private preaching, Allah commanded: “Warn your nearest kindred.” The Prophet ﷺ climbed Mount Ṣafā and called each tribe of Quraysh by name. He asked: “If I told you an army was advancing from behind this mountain, would you believe me?” They said: “Yes — you have never lied to us.” He then proclaimed the Oneness of Allah, and his uncle Abū Lahab shouted: “May you perish! Is this why you gathered us?”',
    highlights: [
      'The tribes of Quraysh confirmed: “You have never lied to us” — establishing his credibility before his message',
      'Abū Lahab's angry rejection was later immortalized in the Qurʼān (Sūrah 111)',
      'This moment marked the beginning of open opposition from Quraysh',
      'He was fulfilling the divine command: “Warn your nearest kindred” (Qūrʾaḥ 26:214)',
    ],
  },

  /* ── 10 ── Migration to Abyssinia ────────────────────────── */
  10: {
    verse_en: 'And whoever emigrates for the cause of Allah will find on the earth many [alternative] locations and abundance...',
    title: 'The Migration to Abyssinia (Ethiopia)',
    subtitle: 'A King Who Wrongs No One',
    highlight: 'The First Refuge',
    location: 'Abyssinia (Ethiopia)',
    statsLabels: ['Migrants in first group', 'Migrants in second group', 'King of Abyssinia'],
    statsValues: ['15 people', 'About 101 people', 'The Negus Aṣḥamah'],
    keyFiguresEn: [
      { name: 'Jaʿfar ibn Abī Ṭālib', role: 'Spokesperson for the Muslims before the Negus' },
      { name: 'al-Najāshī Aṣḥamah', role: 'King of Abyssinia who protected the Muslims and refused to return them' },
      { name: 'ʿUthmān ibn ʿAffān', role: 'Among the earliest migrants, accompanied by his wife Ruqayyah bint Muḥammad' },
      { name: 'ʿAmr ibn al-ʿĀṣ', role: 'Quraysh\'s envoy sent to bring back the migrants — he failed' },
    ],
    hadithsEn: [
      { text: 'Jaʿfar ibn Abī Ṭālib recited to the Negus from Sūrah Maryam about Jesus ﷺ. The Negus wept until his tears soaked his beard, and said: "By Allah, what this man says and what ʿĪsā brought differ no more than this" — and he drew a line on the ground. Then he said: "You are safe in my land — go, for none shall harm you."', source: 'Sīrah of Ibn Hishām — Dalāʾil al-Nubuwwah by al-Bayhaqī' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And whoever emigrates for the cause of Allah will find on the earth many [alternative] locations and abundance. And whoever leaves his home as an emigrant to Allah and His Messenger and then death overtakes him — his reward has already become incumbent upon Allah."', context: 'Allah\'s promise of shelter and reward to all who emigrate in His cause — fulfilled through the refuge of Abyssinia' },
    ],
    description:
      'As persecution of early Muslims in Mecca intensified, the Prophet ﷺ advised his companions to migrate to Abyssinia, saying: “There is a king there who wrongs no one.” Two waves migrated — first fifteen, then a larger group — seeking refuge under the Christian Negus (al-Najāshī). When Quraysh sent emissaries to have them returned, the Negus heard their account of Islam and wept, refusing to hand them over.',
    highlights: [
      'The Negus wept when Jaʼfar ibn Abī Ṭālib recited verses from Sūrah Maryam about Jesus and Mary',
      'He declared: “The difference between what I believe and what you say is no greater than this line” — and drew a line on the ground',
      'Quraysh's two envoys returned empty-handed — their gifts rejected',
      'The Negus later accepted Islam and the Prophet ﷺ led his funeral prayer in absentia in Medina',
    ],
  },

  /* ── 11 ── Conversion of Hamza ───────────────────────────── */
  11: {
    title: 'The Conversion of Ḥamzah ibn ʿAbd al-Muṭṭalib',
    subtitle: 'The Lion of Allah and His Messenger',
    highlight: 'Lion of Allah',
    location: 'Mecca',
    statsLabels: ['Year', 'His title', 'Reason for his conversion'],
    statsValues: ['Year 6 of the mission', 'Lion of Allah and Lion of His Messenger', 'Defense of his nephew and conviction in truth'],
    keyFiguresEn: [
      { name: 'Ḥamzah ibn ʿAbd al-Muṭṭalib', role: 'The Prophet\'s uncle and foster brother — Master of the Martyrs at Uḥud' },
      { name: 'Abū Jahl ʿAmr ibn Hishām', role: 'Whose insult to the Prophet ﷺ sparked Ḥamzah\'s conversion' },
    ],
    hadithsEn: [
      { text: 'Ibn Isḥāq narrated: When Ḥamzah ، heard what Abū Jahl had done to Muḥammad ﷺ, the fire of tribal loyalty seized him — then the light of Islam followed and he embraced it. When he accepted Islam, Quraysh realized that the Messenger of Allah ﷺ had found strength and defense.', source: 'Sīrah of Ibn Hishām — al-Bidāyah wal-Nihāyah by Ibn Kathīr' },
    ],
    relatedVersesEn: [
      { verse_translation: '"...and [that] you honor and support him and follow him — perhaps you will be successful."', context: 'Ḥamzah\'s support for his nephew was a model of genuine defense and honor' },
    ],
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
    statsLabels: ['Year', 'His age at conversion', 'Immediate effect'],
    statsValues: ['About Year 6 of the mission', 'About 26 years', 'Muslims prayed openly at the Sacred Mosque'],
    keyFiguresEn: [
      { name: 'ʿUmar ibn al-Khaṭṭāb', role: 'Al-Fārūq — second of the Rightly-Guided Caliphs — Islam was strengthened through his embrace' },
      { name: 'Fāṭimah bint al-Khaṭṭāb', role: 'His sister whose Islam was the cause of his guidance' },
      { name: 'Saʿīd ibn Zayd', role: 'Her husband and a noble Companion — one of the Ten Promised Paradise' },
      { name: 'Khabbāb ibn al-Aratt', role: 'Who was teaching Fāṭimah the Qurʾān and was thus the instrument of ʿUmar\'s guidance' },
    ],
    hadithsEn: [
      { text: 'Ibn Masʿūd ، said: "We were unable to pray at the Kaʿbah until ʿUmar embraced Islam. When he did, he fought Quraysh until he prayed at the Kaʿbah and we prayed with him."', source: 'Sahih al-Bukhārī — Book of Virtues of the Companions' },
      { text: 'The Prophet ﷺ said: "O Allah, strengthen Islam with the one more beloved to You of these two men: ʿUmar ibn al-Khaṭṭāb or ʿAmr ibn Hishām." The one more beloved to Him was ʿUmar.', source: 'Sunan al-Tirmidhī — graded authentic by al-Albānī' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And he who comes with the truth and [he who] believes in it — those are the righteous."', context: 'ʿUmar ، came with truth in his Islam and did not waver or equivocate' },
    ],
    description:
      'ʿUmar ibn al-Khaṭṭāb set out intending to kill the Prophet ﷺ. On the way he discovered his own sister Fāṭimah and her husband had embraced Islam. He struck his brother-in-law, then when his bleeding sister refused to let him touch the Qurʼān with impure hands, he washed, read Sūrah Ṭā-Hā, and wept. He went directly to the Prophet ﷺ and declared his Islam — to the great joy of the entire Muslim community.',
    fullDescription:
      'ʿUmar ibn al-Khaṭṭāb was one of the fiercest opponents of Islam. He had tormented early Muslims and was feared throughout Mecca. On the day of his conversion he left his house with a sword intending to kill the Prophet ﷺ.\n\nOn the road, a man told him to look to his own household first — his sister Fāṭimah and her husband Saʼd ibn Zayd had secretly embraced Islam. He went to their home and found them reciting pages of Sūrah Ṭā-Hā. He struck his brother-in-law in rage, and when his sister intervened he struck her too. When she bled and still refused to surrender the pages without him purifying himself first, something shifted inside him. He washed, took the pages, and read.\n\nThe words stopped him cold. He wept, then said: “Guide me to Muḥammad.” He went to the house where the Muslims were gathered — hearts pounding when they heard his knock — and declared his Islam before the Prophet ﷺ. The Muslims' joy overflowed; ʿUmar requested that it be announced publicly, and the believers marched openly to the Kaʻah — for the first time without fear.',
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
    statsLabels: ['Duration of the siege', 'Signatories of the document', 'End of siege'],
    statsValues: ['3 years', 'All Quraysh leaders', "Termites consumed the document by Allah's command"],
    keyFiguresEn: [
      { name: 'Abū Ṭālib', role: 'The Prophet\'s uncle who protected the Muslims throughout the siege' },
      { name: 'Abū Jahl', role: 'Among the most vocal advocates of the siege and of coercing Banū Hāshim' },
      { name: 'Hishām ibn ʿAmr', role: 'A man of Quraysh who showed compassion and secretly sent food to those besieged' },
    ],
    hadithsEn: [
      { text: 'Khadījah ، said: "We were in the valley eating leaves and suffering severe hunger until we could hear the crying of children at night from hunger."', source: 'al-Bidāyah wal-Nihāyah by Ibn Kathīr' },
      { text: 'The Prophet ﷺ told Abū Ṭālib: "Allah has sent termites against Quraysh\'s document and they have eaten everything in it — all the injustice and oppression — except the name of Allah."', source: 'Sīrah of Ibn Hishām' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And whoever fears Allah — He will make for him a way out. And will provide for him from where he does not expect."', context: 'Allah made a miraculous way out for the besieged by sending termites to destroy the pact — relief from where none expected' },
    ],
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
    statsLabels: ['Year of sorrow', 'Years of his marriage to Khadījah', 'Abū Ṭālib\'s age at death'],
    statsValues: ['619 CE', '25 years', 'About 80 years'],
    keyFiguresEn: [
      { name: 'Khadījah bint Khuwaylid', role: 'His faithful wife who supported him for 25 years' },
      { name: 'Abū Ṭālib ibn ʿAbd al-Muṭṭalib', role: 'His uncle who protected him from Quraysh but did not embrace Islam' },
      { name: 'Fāṭimah bint Muḥammad', role: 'His daughter who washed the dust from his hair and wept' },
    ],
    hadithsEn: [
      { text: 'The Prophet ﷺ said when Khadījah passed: "She believed in me when people denied me, she trusted me when people called me a liar, she supported me with her wealth when people withheld from me, and Allah blessed me with children through her and not through others."', source: 'Musnad Aḥmad — Ibn Kathīr in al-Sīrah al-Nabawiyyah' },
      { text: 'ʿĀʾishah said: "I was never jealous of any of the Prophet\'s wives as I was jealous of Khadījah, though I never saw her. But he would mention her often, and sometimes he would slaughter a sheep and send its portions to the friends of Khadījah."', source: 'Sahih al-Bukhārī — Book of the Virtues of the Anṣār' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Did We not expand for you, [O Muhammad], your chest? And We removed from you your burden which had weighed upon your back. And raised high for you your repute."', context: 'Revealed to comfort the Prophet ﷺ in his trials, reminding him that Allah had lifted his burdens and elevated his honor' },
    ],
    description:
      'In the tenth year of the prophethood (619 CE), the Prophet ﷺ lost his two greatest pillars of support within weeks of each other: his beloved wife Khadījah ، — who had believed in him first and supported him through every hardship — and his uncle and protector Abū Ṭālib, whose clan standing had shielded him from Quraysh. The Prophet ﷺ named it “The Year of Sorrow.”',
    highlights: [
      'Khadījah ، was the first to believe in him, his greatest emotional support, and mother of his children',
      'Abū Ṭālib was not Muslim but protected the Prophet ﷺ through tribal loyalty for decades',
      'After Abū Ṭālib's death, Abū Lahab briefly assumed leadership of Banū Hāshim and withdrew protection',
      'This opened the door to direct physical attacks that had not been possible before',
    ],
  },

  /* ── 15 ── Journey to Ta\'if ──────────────────────────────── */
  15: {
    title: 'The Journey to Ṭāʼif',
    subtitle: 'The Hardest Day on His Heart ﷺ',
    highlight: 'Wounded but Unwavering',
    location: 'Ṭāʼif — Hijaz',
    statsLabels: ['Distance to Ṭāʾif', 'His companion', 'Duration of stay'],
    statsValues: ['About 80 km', 'Zayd ibn Ḥārithah', 'About ten days'],
    keyFiguresEn: [
      { name: 'Zayd ibn Ḥārithah', role: 'The faithful companion who shielded the Prophet ﷺ from the stones with his own body' },
      { name: 'ʿAbd Yālīl ibn ʿAmr', role: 'Chief of Thaqīf who rejected the call with mockery' },
      { name: 'The Angel of the Mountains', role: 'Sent by Allah offering to crush Ṭāʾif — the Prophet ﷺ refused' },
      { name: 'ʿAddās', role: 'A Christian slave who brought him grapes and embraced Islam that day' },
    ],
    hadithsEn: [
      { text: 'ʿĀʾishah asked: Was there ever a day harder upon you than the day of Uḥud? He said: "I experienced from your people what I experienced, and the hardest thing I experienced from them was the day of al-ʿAqabah when I presented myself to Ibn ʿAbd Yālīl and he rejected me in the way I most disliked."', source: 'Sahih al-Bukhārī — Book of the Beginning of Creation' },
      { text: 'He ﷺ said in his supplication at Ṭāʾif: "O Allah, to You I complain of my weakness, my helplessness, and my lowliness before men. O Most Merciful, You are the Lord of the weak and You are my Lord. To whom do You entrust me? To a distant stranger who mistreats me? Or to an enemy whom You have given power over me? If You are not angry with me then I do not care — but Your well-being is more expansive for me..."', source: 'al-Ṭabarānī in al-Muʿjam al-Kabīr — authenticated by Ibn Ḥibbān' },
    ],
    relatedVersesEn: [
      { verse_translation: '"So be patient, as were the resolute messengers patient, and do not be impatient for them."', context: 'The Prophet ﷺ was commanded to be patient like the most resolute messengers — and the day of Ṭāʾif was among his greatest trials' },
    ],
    description:
      'After the deaths of Khadījah and Abū Ṭālib, the Prophet ﷺ traveled alone on foot to Ṭāʼif to seek support for Islam. The leaders of Thaqīf rejected and mocked him, then sent their slaves and street children to drive him out with stones until his sandals ran with blood. He sat under a tree and made one of the most moving supplications in Islamic history.',
    fullDescription:
      'With Mecca now openly hostile after the deaths of his two protectors, the Prophet ﷺ walked to the mountain city of Ṭāʼif accompanied only by his freed slave Zayd ibn Ḥārithah. He spent ten days there, approaching each of the three leaders of Thaqīf in turn and inviting them to Islam. Each refused. The last one said: “If you are truly the Messenger of Allah then you are too important to speak to the likes of us; and if you are lying about Allah then we cannot speak to you.”\n\nThey then ordered their servants and street children to mob him as he left, pelting him with stones until both feet bled. He and Zayd took shelter at a nearby vineyard. There, exhausted and bleeding, he raised his hands and made a duʼāʼ that the Prophet ﷺ himself described as the hardest day of his life — harder than Uhud.\n\nHe said: “O Allah, to You I complain of my weakness, of my helplessness, and of my lowliness before men. O Most Merciful, You are the Lord of the weak and You are my Lord … I seek refuge in the light of Your face by which all darkness is dispelled … Your pleasure is mine to pursue.”\n\nAllah sent Jibrīl with the Angel of the Mountains, who offered to crush Ṭāʼif between its mountains. The Prophet ﷺ replied: “No — perhaps Allah will bring from their descendants people who worship Allah alone.” A year later, Ṭāʼif entered Islam.',
    highlights: [
      'He described this day as the hardest of his life — harder even than the day of Uhud',
      'He refused the Angel of the Mountains' offer to destroy Ṭāʼif, hoping their children would one day accept Islam',
      'His supplication from Ṭāʼif remains one of the most beautiful prayers in Islamic tradition',
      'A Christian slave named ʿAddās brought him grapes and became the only person to accept Islam in Ṭāʼif that day',
    ],
  },

  /* ── 16 ── Night Journey ─────────────────────────────────── */
  16: {
    verse_en: 'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed, to show him of Our signs.',
    title: 'The Night Journey and Ascension (Al-Isrāʼ wal-Miʼrāj)',
    subtitle: 'A Journey Beyond the Heavens',
    highlight: 'Beyond the Heavens',
    location: 'Mecca → Jerusalem → The Seven Heavens',
    statsLabels: ['Prayers ordained', 'Number of heavens', 'Wings of Jibrīl', 'Prophets he met'],
    statsValues: ['5 prayers (with the reward of 50)', '7 heavens', '600 wings', 'Ādam, Yaḥyā, ʿĪsā, Yūsuf, Idrīs, Hārūn, Ibrāhīm'],
    keyFiguresEn: [
      { name: 'Jibrīl ʿalayhi al-salām', role: 'His companion throughout the Night Journey and Ascension' },
      { name: 'Ibrāhīm ʿalayhi al-salām', role: 'Met in the seventh heaven beside the Frequented House (al-Bayt al-Maʿmūr)' },
      { name: 'Mūsā ʿalayhi al-salām', role: 'Advised him to return and request reduction of prayers — until they became five' },
      { name: 'Abū Bakr al-Ṣiddīq', role: 'Believed instantly without question, earning the title "al-Ṣiddīq" (The Great Verifier)' },
    ],
    hadithsEn: [
      { text: 'Anas ibn Mālik narrated that the Messenger of Allah ﷺ said: "I was brought al-Burāq — a white animal, larger than a donkey but smaller than a mule, which places its hoof at the limit of its gaze. I rode it until I came to Bayt al-Maqdis. I tied it at the ring where the prophets tied their mounts, then entered the mosque, prayed two rakaʿahs, then came out. Jibrīl brought me a vessel of wine and a vessel of milk and I chose the milk. Jibrīl said: You have chosen the Fiṭrah."', source: 'Sahih Muslim — Book of Faith' },
      { text: 'The Prophet ﷺ said: "Then fifty prayers were made obligatory upon me. I returned and passed by Mūsā who said: What have you done? I said: Fifty prayers have been made obligatory. He said: Return to your Lord and ask for a reduction… He kept sending me back until it became five. I returned to Mūsā and he said: Return again. I said: I am now too shy before my Lord."', source: 'Sahih al-Bukhārī — Book of Prayer' },
    ],
    battleTimelineEn: [
      { phase: 'Al-Isrāʾ: from al-Masjid al-Ḥarām to al-Aqṣā', detail: 'The Prophet ﷺ was carried on al-Burāq from the Sacred Mosque in Mecca to al-Masjid al-Aqṣā in Jerusalem in an instant — there he led all the prophets in prayer as their imam, affirming his position as the Seal of the Prophets' },
      { phase: 'Al-Miʿrāj: ascending through the seven heavens', detail: 'He ascended from al-Aqṣā through the seven heavens, meeting a prophet in each: Adam in the first, Yaḥyā and ʿIsā in the second, Yūsuf in the third, Idrīs in the fourth, Hārūn in the fifth, Mūsā in the sixth, and Ibrāhīm in the seventh' },
      { phase: 'The ordaining of the five prayers', detail: 'Allah spoke to him directly and ordained fifty daily prayers; Mūsā repeatedly urged him to request a reduction until they became five in number yet carry the reward of fifty' },
      { phase: 'The return and belief vs. rejection', detail: 'He returned before dawn and informed Quraysh; most rejected him. Abū Bakr, on hearing the account, said: "If he says it, then I believe it" — and was named al-Ṣiddīq' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed, to show him of Our signs."', context: 'Sūrah al-Isrāʾ opened with this verse honouring the miracle and establishing that the Blessed Mosque of Jerusalem is sacred in Islam' },
      { verse_translation: '"And he certainly saw him in another descent, at the Lote Tree of the Utmost Boundary — near it is the Garden of Refuge."', context: 'The Qurʾān describes the Prophet ﷺ seeing Jibrīl in his true form of 600 wings at Sidrat al-Muntahā during the ascension' },
    ],
    description:
      'On a miraculous night, the Prophet ﷺ was taken from the Sacred Mosque in Mecca to Al-Aqṣā Mosque in Jerusalem (Isrāʼ), then ascended through the seven heavens (Miʼrāj), led the prophets in prayer, passed beyond the Lote Tree of the Utmost Boundary, and was directly commanded by Allah with the five daily prayers — originally fifty, reduced through intercession to five.',
    fullDescription:
      'In a single night, the Prophet ﷺ was carried by the Burāq from the Sacred Mosque in Mecca to the Al-Aqṣā Mosque in Jerusalem — a journey that would take weeks on foot. There he led all the prophets in prayer, as their imam, in the place where they had lived and prayed. He was then taken upward through the seven heavens, meeting each prophet in turn: Adam in the first heaven, Yahyā and ʿIsā in the second, Yūsuf in the third, Idrīs in the fourth, Hārūn in the fifth, Mūsā in the sixth, and Ibrāhīm in the seventh.\n\nBeyond the Lote Tree of the Utmost Boundary — beyond which no creation passes — he was brought into the presence of the Divine and received the obligation of fifty daily prayers. As he descended, Mūsā — who had experience with the Children of Israel — urged him to return and ask for a reduction. He did so nine times until the prayers were reduced to five, yet counted with the reward of fifty.\n\nWhen the Prophet ﷺ told Quraysh the next morning, they mocked and rejected him, and many who had been wavering in their faith abandoned it. Abū Bakr — upon hearing what the Prophet ﷺ had said — immediately replied: “If he says it, then I believe it” — earning him the title “Al-Ṣiddīq,” the Great Verifier.',
    highlights: [
      'He led all the prophets in prayer in Al-Aqṣā — affirming his position as the seal of the prophets',
      'The five daily prayers were the direct divine command from this night',
      'Abū Bakr's instant belief earned him the title “Al-Ṣiddīq” (The Great Verifier)',
      'Quraysh demanded a description of Jerusalem — which he gave perfectly though he had never been there before in daylight',
    ],
  },

  /* ── 17 ── First Pledge of Aqabah ────────────────────────── */
  17: {
    title: 'The First Pledge of ʿAqabah',
    subtitle: 'Twelve Men Carry the Seed of Medina',
    highlight: 'The First Pledge',
    location: 'ʿAqabah — near Mina, Mecca',
    statsLabels: ['Number who pledged', 'Envoy sent', 'Terms of the pledge'],
    statsValues: ['Twelve men', 'Muṣʿab ibn ʿUmayr', 'Monotheism, honesty, and good character'],
    keyFiguresEn: [
      { name: 'Muṣʿab ibn ʿUmayr', role: 'First Islamic envoy — sent to Yathrib to teach the Qurʾān and spread Islam' },
      { name: 'Asʿad ibn Zurārah', role: 'Leader of the first group of Ansār who pledged at ʿAqabah' },
    ],
    hadithsEn: [
      { text: 'ʿUbādah ibn al-Ṣāmit said: "I was among those who attended the First ʿAqabah. We were twelve men and we pledged to the Messenger of Allah ﷺ that we would not associate anything with Allah, would not steal, would not commit fornication, would not kill our children, and would not disobey him in what was right."', source: 'Sahih al-Bukhārī — Book of the Virtues of the Companions' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Indeed, those who pledge allegiance to you, [O Muhammad] — they are actually pledging allegiance to Allah. The hand of Allah is over their hands."', context: 'The pledge at ʿAqabah was a covenant with Allah Himself — whoever fulfilled it would receive Paradise' },
    ],
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
    statsLabels: ['Number who pledged', 'Leaders chosen', 'Time of the pledge'],
    statsValues: ['77 including two women', 'Twelve leaders like the Tribes of Israel', 'In the depths of night, secretly from Quraysh'],
    keyFiguresEn: [
      { name: 'al-Barāʾ ibn Maʿrūr', role: 'First to extend his hand in pledge to the Prophet ﷺ at the Second ʿAqabah' },
      { name: 'ʿAbdullāh ibn Rawāḥah', role: 'One of the twelve chosen leaders (nuqabāʾ) of the Ansār' },
      { name: 'al-ʿAbbās ibn ʿAbd al-Muṭṭalib', role: 'Attended to verify the Ansār\'s commitment and capacity to protect his nephew' },
    ],
    hadithsEn: [
      { text: 'Kaʿb ibn Mālik said: "We went to Mecca among the pilgrims of our tribe of polytheists, and we had agreed to meet the Messenger of Allah ﷺ at ʿAqabah in the middle of the days of al-Tashrīq. When we had finished the Ḥajj… we pledged allegiance to him."', source: 'Musnad Aḥmad — Sīrah of Ibn Hishām' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And [remember] when those who disbelieved plotted against you to restrain you or kill you or evict you [from Mecca]. But they plan, and Allah plans. And Allah is the best of planners."', context: 'After the Second ʿAqabah pledge, Quraysh conspired to assassinate the Prophet ﷺ — leading directly to the Hijrah' },
    ],
    description:
      'The following year, seventy-three men and two women from Medina met the Prophet ﷺ at ʿAqabah by night and pledged to defend him as they would defend their own families. He chose twelve leaders (nuqabāʼ) from among them. When Abū Ṭālib's son al-ʿAbbās warned the Ansār of the gravity of their commitment, they replied: “What do we gain, O Messenger of Allah?” He said: “Paradise.”',
    highlights: [
      'This was the pledge to defend the Prophet ﷺ militarily if needed',
      'He chose twelve leaders as representatives — twelve, like the number of Moses's leaders among the Israelites',
      'Two women were among those who pledged — showing the inclusion of women in early Islamic leadership',
      'ʿAbbās warned the Ansār of the risk; they replied they accepted it fully',
    ],
  },

  /* ── 19b ── Migration to Medina ──────────────────────────── */
  20: {
    verse_en: 'If you do not aid the Prophet — Allah has already aided him when those who disbelieved had driven him out [of Mecca] as one of two, when they were in the cave and he said to his companion, "Do not grieve; indeed Allah is with us."',
    title: 'The Migration to Medina (Al-Hijrah)',
    subtitle: 'The Beginning of the Islamic Calendar',
    highlight: 'A New Beginning',
    location: 'Mecca → Cave of Thawr → Medina',
    statsLabels: ['Days hidden in Cave of Thawr', 'Distance from Mecca to Medina', 'Start of the Hijri calendar'],
    statsValues: ['3 nights', 'About 400 km', '1 Muḥarram 1 AH'],
    keyFiguresEn: [
      { name: 'Abū Bakr al-Ṣiddīq', role: 'The Prophet\'s companion in the cave and on the journey — "Do not grieve; indeed Allah is with us"' },
      { name: 'ʿAlī ibn Abī Ṭālib', role: 'Slept in the Prophet\'s bed the night of the departure to deceive the would-be assassins' },
      { name: 'Asmāʾ bint Abī Bakr', role: 'Brought food to them secretly in the cave — known as "Dhāt al-Niṭāqayn" (the one of the two belts)' },
      { name: 'ʿAbdullāh ibn Urayqiṭ', role: 'The skilled non-Muslim guide who led them safely via the western coastal route' },
    ],
    hadithsEn: [
      { text: 'Abū Bakr said while in the cave: "O Messenger of Allah, if one of them looks beneath their feet they will see us." He replied: "O Abū Bakr, what do you think of two, with Allah as their third?"', source: 'Sahih al-Bukhārī — Book of the Virtues of the Companions' },
      { text: 'Anas narrated: "When the Messenger of Allah ﷺ arrived in Medina, the city lit up. And when he passed away, the city became dark."', source: 'Sunan Ibn Mājah — Sīrah of Ibn Hishām' },
    ],
    battleTimelineEn: [
      { phase: 'The night of departure from Mecca', detail: 'The night Quraysh planned his assassination, the Prophet ﷺ slipped past them while reciting verses of Sūrah Yā-Sīn and scattering dust on their heads — not one of them saw him pass' },
      { phase: 'Hidden in the Cave of Thawr — 3 nights', detail: 'They sheltered in the cave for three nights. Asmāʾ bint Abī Bakr secretly brought provisions; ʿAbdullāh ibn Abī Bakr gathered intelligence about Quraysh\'s search parties' },
      { phase: 'The journey via the western coastal route', detail: 'They traveled with their guide ʿAbdullāh ibn Urayqiṭ along the unfamiliar western coastal road — avoiding all Qurayshi patrols — until they reached the outskirts of Medina' },
      { phase: 'Arrival in Qubāʾ and reception in Medina', detail: 'He stayed at Qubāʾ and founded its mosque — the first mosque built on taqwā. Then he entered Medina while the Ansār sang from rooftops: "Ṭalaʿa al-Badr ʿalaynā — The full moon has risen over us." His camel knelt at the site of the Prophet\'s Mosque' },
    ],
    relatedVersesEn: [
      { verse_translation: '"If you do not aid the Prophet — Allah has already aided him when those who disbelieved had driven him out as one of two, when they were in the cave and he said to his companion, \'Do not grieve; indeed Allah is with us.\'"', context: 'Allah immortalized the Cave of Thawr in the Qurʾān — affirming His direct support for the Prophet ﷺ and his companion Abū Bakr' },
    ],
    description:
      'With Quraysh plotting his assassination, the Prophet ﷺ left Mecca with Abū Bakr under cover of night, hid for three days in the Cave of Thawr, then traveled to Medina along the western coastal route. The people of Medina came out joyfully to greet him. This migration so transformed Islamic history that ʿUmar later chose it as the start of the Islamic calendar.',
    fullDescription:
      'When Quraysh learned the Prophet ﷺ was planning to migrate to Medina, they convened in Dār al-Nadwah and resolved to send a young man from each tribe to kill him simultaneously — spreading blood-guilt across all clans. That night, Jibrīl informed the Prophet ﷺ of the plot and gave him permission to migrate.\n\nʿAlī ibn Abī Ṭālib slept in the Prophet's bed to deceive the assassins, while the Prophet ﷺ and Abū Bakr slipped out under cover of darkness. They took a southern route to the Cave of Thawr — the opposite direction from Medina — and hid for three days. The Quraysh placed a reward of 100 camels on each of their heads. Sūrah al-Tawbah was later revealed describing that moment: “…when there were only two of them in the cave, and he said to his companion: Do not grieve — indeed Allah is with us.” (9:40)\n\nA skilled non-Muslim guide, ʿAbdullāh ibn Urayqiṭ, led them north along the western coast — an unexpected route. When they reached Qubāʼ on the outskirts of Medina, the entire city came out to receive them. Children sang from the rooftops: “Ṭalac al-badr ʼalaynā — The full moon has risen over us.”',
    highlights: [
      'The Cave of Thawr: Abū Bakr said “If one of them looks under their feet they will see us” and the Prophet ﷺ replied “What do you think of two, with Allah as their third?”',
      'Qurʼān 9:40 was revealed about this moment: “Do not grieve — indeed Allah is with us”',
      'Suraqa ibn Mālik pursued them for the reward; his horse's hooves sank into the ground and he turned back',
      'This migration established the Hijri calendar — Year 1 AH — used by Muslims to this day',
    ],
  },

  /* ── Mosque ───────────────────────────────────────────────── */
  21: {
    title: "Building the Prophet's Mosque ﷺ",
    subtitle: 'The First Institution of the Islamic State',
    highlight: 'Foundation of a Nation',
    location: 'Medina',
    statsLabels: ['Initial area', 'Building materials', 'Year built'],
    statsValues: ['100 × 100 cubits', 'Mud bricks, palm trunks, and palm fronds', 'Year 1 AH'],
    keyFiguresEn: [
      { name: 'Sahl and Suhayl', role: 'The two orphan boys who owned the land — the Prophet ﷺ insisted on buying it rather than accepting it as a gift' },
      { name: 'Abū Ayyūb al-Anṣārī', role: 'Hosted the Prophet ﷺ in his home while the mosque was being built' },
    ],
    hadithsEn: [
      { text: 'Anas ibn Mālik said: "I saw the Messenger of Allah ﷺ on the day the mosque was being built, carrying unbaked bricks while saying: \'This load is not like the load of Khaybar — this is more righteous, O Lord, and purer.\'"', source: 'Sahih al-Bukhārī — Book of Prayer' },
    ],
    relatedVersesEn: [
      { verse_translation: '"A mosque founded on righteousness from the first day is more worthy for you to stand in."', context: 'The Prophet\'s Mosque in Medina is identified by scholars as the mosque founded on taqwā from its first day' },
    ],
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
    statsLabels: ['Number of pairs', 'Location', 'Immediate outcome'],
    statsValues: ['About 45 pairs', 'House of Anas ibn Mālik', 'First social solidarity system in Islam'],
    keyFiguresEn: [
      { name: 'ʿAbd al-Raḥmān ibn ʿAwf', role: 'The Muhājir who declined his Ansārī brother\'s wealth and said: "Just show me the marketplace" — and prospered through honest trade' },
      { name: 'Saʿd ibn al-Rabīʿ', role: 'The Ansārī who offered to split his entire wealth and household with his Muhājir brother — an unparalleled act of generosity' },
    ],
    hadithsEn: [
      { text: 'Saʿd ibn al-Rabīʿ said to ʿAbd al-Raḥmān ibn ʿAwf: "I am the wealthiest of the Anṣār — I will divide my wealth in half for you, and I have two wives: look at whichever pleases you and I will divorce her." ʿAbd al-Raḥmān replied: "May Allah bless you in your family and wealth. Just show me the marketplace."', source: 'Sahih al-Bukhārī — Book of the Conditions' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And those who were settled in al-Madinah and [adopted] the faith before them love those who emigrated to them and find not in their hearts any need for what they were given but give [them] preference over themselves, even though they are in privation."', context: 'Allah praised the Ansār for their selflessness in giving preference to the Muhājirūn over themselves' },
    ],
    description:
      'The Prophet ﷺ established formal brotherhood between the Muhājirūn (migrants from Mecca) and the Anṣār (hosts of Medina) — pairing each Makkan with a Medinan as true brothers in faith. The Anṣār offered to share their homes, wealth, and orchards. When ʿAbd al-Raḥmān ibn ʿAwf's Medinan brother offered half of everything, Ibn ʿAwf replied: “Just show me the marketplace.”',
    highlights: [
      'The Anṣār offered to literally divide their wealth and homes in two — an unparalleled act of generosity',
      'Brothers in this pairing would inherit from one another in the early period — like blood brothers',
      'This bond solved the immediate economic crisis of the homeless Muhājirūn overnight',
      'It became a model of how a new society can integrate newcomers with dignity',
    ],
  },

  /* ── Adhan ───────────────────────────────────────────────── */
  23: {
    title: "Bilāl's First Call to Prayer (Adhān)",
    subtitle: 'Aḥad Aḥad — The First Call to Prayer in Islam',
    highlight: 'Allāhu Akbar',
    location: 'Medina — the Prophet's Mosque',
    statsLabels: ['First muʾadhdhin', 'How the adhān was revealed', 'Times called daily'],
    statsValues: ['Bilāl ibn Rabāḥ al-Ḥabashī', 'Through a true dream of ʿAbdullāh ibn Zayd al-Anṣārī', '5 times daily'],
    keyFiguresEn: [
      { name: 'Bilāl ibn Rabāḥ', role: 'The freed Abyssinian slave — chosen as Islam\'s first muʾadhdhin for his powerful, beautiful voice' },
      { name: 'ʿAbdullāh ibn Zayd', role: 'The companion who heard the words of the adhān in a true dream and reported it to the Prophet ﷺ' },
    ],
    hadithsEn: [
      { text: 'ʿAbdullāh ibn Zayd al-Anṣārī reported that he came to the Prophet ﷺ and told him: "A man came to me in a dream teaching me the call to prayer." When he described it, the Prophet ﷺ said: "Teach it to Bilāl, for his voice is louder than yours." ʿUmar ibn al-Khaṭṭāb then came and said: "I also saw the same thing in a dream last night — and I was too shy to mention it." So the Prophet ﷺ praised Allah.', source: 'Sunan al-Tirmidhī — graded ḥasan by al-Albānī' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And who is better in speech than one who invites to Allah and does righteousness and says, \'Indeed, I am of the Muslims.\'"', context: 'The adhān is the highest form of public invitation — five times a day, calling humanity to the presence of Allah' },
    ],
    description:
      'When the companions debated how to summon Muslims to prayer, ʿAbdullāh ibn Zayd told the Prophet ﷺ he had heard in a dream a man teaching him words to be called out. The Prophet ﷺ recognized it as a true vision and commanded Bilāl ibn Rabāḥ — who had the most powerful and beautiful voice — to be the first muʼādhdhin (caller to prayer) in Islam.',
    highlights: [
      'Bilāl was the freed Abyssinian slave who had been tortured by his master for refusing to abandon Islam',
      'His powerful voice rang across Medina five times a day for the rest of the Prophet's life',
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
    statsLabels: ['Number of clauses', 'Signatories', 'Year issued'],
    statsValues: ['About 47 articles', 'Emigrants, Helpers, and Jewish tribes of Yathrib', 'Year 1 AH'],
    keyFiguresEn: [
      { name: 'The Prophet Muḥammad ﷺ', role: 'The architect of the Charter — the first written political constitution in history' },
      { name: 'Banū Qaynuqāʿ, Banū al-Naḍīr, and Banū Qurayẓah', role: 'The Jewish tribes of Medina who were included in the Charter as a single community with rights and responsibilities' },
    ],
    hadithsEn: [
      { text: 'The Charter stated: "The Jews of Banū ʿAwf are one community (ummah) along with the believers. The Jews have their religion and the Muslims have their religion… Whoever is wronged — himself or his household — the community (ummah) shall stand together against the wrongdoer."', source: 'Sīrah of Ibn Hishām — al-Bidāyah wal-Nihāyah by Ibn Kathīr' },
    ],
    relatedVersesEn: [
      { verse_translation: '"O you who have believed, fulfill [all] contracts."', context: 'The Charter of Medina was the first formal political contract guaranteeing rights and duties among all communities of Medina' },
    ],
    description:
      'The Prophet ﷺ drafted a written covenant between the Muslims of Mecca and Medina and the Jewish tribes of Medina — establishing them as one community (ummah), guaranteeing mutual defense, defining rights and duties, and asserting that all disputes be referred to Allah and His Messenger. Historians consider it the world's first written political constitution.',
    highlights: [
      'It recognized the Jewish tribes of Medina as part of the same community with full religious freedom',
      'It established collective security: an attack on one group was an attack on all',
      'It forbade treachery and required consultation before military action',
      'It predates Magna Carta by six centuries and deals with constitutional principles never before codified',
    ],
  },

  /* ── Qiblah ──────────────────────────────────────────────── */
  25: {
    verse_en: 'So turn your face toward al-Masjid al-Haram. And wherever you [believers] are, turn your faces toward it [in prayer].',
    title: 'The Change of the Qiblah (Prayer Direction)',
    subtitle: 'From Al-Aqṣā to the Sacred Kaʻah',
    highlight: 'Toward the Kaʻah',
    location: 'Medina — Mosque of Banu Salamah',
    statsLabels: ['Months praying toward al-Aqṣā', 'New qiblah', 'Mosque renamed'],
    statsValues: ['About 16–17 months in Medina', 'Toward the Sacred Kaʿbah in Mecca', 'Masjid al-Qiblatain — Mosque of Two Qiblahs'],
    keyFiguresEn: [
      { name: 'The Prophet Muḥammad ﷺ', role: 'Used to turn his face toward the sky yearning for the command to face the Kaʿbah' },
    ],
    hadithsEn: [
      { text: 'Al-Barāʾ ibn ʿĀzib said: "The Prophet ﷺ prayed toward Jerusalem for sixteen or seventeen months after arriving in Medina, though he longed to face the Kaʿbah. Allah then revealed: \'So turn your face toward al-Masjid al-Ḥarām.\' The change happened while a group of people were in prayer. One of them went out and passed by another mosque while they were bowing and called out — so they all turned to face the Kaʿbah while still in their bowing position."', source: 'Sahih al-Bukhārī — Book of Prayer' },
    ],
    relatedVersesEn: [
      { verse_translation: '"So turn your face toward al-Masjid al-Haram. And wherever you are, turn your faces toward it [in prayer]. Indeed, those who have been given the Scripture well know that it is the truth from their Lord."', context: 'The change of the qiblah to Mecca affirmed the universal, final nature of Islam — and fulfilled the Prophet\'s longing' },
    ],
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
    verse_en: 'O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.',
    title: 'The Obligation of Fasting in Ramaḍān',
    subtitle: '”O you who believe, fasting has been prescribed for you”',
    highlight: 'The Month of the Qurʼān',
    location: 'Medina',
    statsLabels: ['Year ordained', 'Month of fasting', 'Night of Power'],
    statsValues: ['Year 2 AH', 'Ramaḍān — the month of the Qurʾān', 'In the last ten odd nights of Ramaḍān'],
    keyFiguresEn: [
      { name: 'The Prophet Muḥammad ﷺ', role: 'Used to intensify worship in the last ten nights, performing iʿtikāf every Ramaḍān until his death' },
    ],
    hadithsEn: [
      { text: 'The Prophet ﷺ said: “Whoever stands [in prayer] during Ramaḍān out of faith and seeking reward, his previous sins will be forgiven.”', source: 'Sahih al-Bukhārī — Book of Faith' },
      { text: 'He ﷺ said: “Seek Laylat al-Qadr in the odd-numbered nights of the last ten days of Ramaḍān.”', source: 'Sahih al-Bukhārī — Book of the Night of Power' },
    ],
    relatedVersesEn: [
      { verse_translation: '”The month of Ramadhan [is that] in which was revealed the Qur\'an, a guidance for the people and clear proofs of guidance and criterion. So whoever sights [the new moon of] the month, let him fast it.”', context: 'Ramaḍān is the month of the Qurʾān — its fasting and the revelation are inseparably linked' },
    ],
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
    verse_en: 'And victory is not except from Allah. Indeed, Allah is Exalted in Might and Wise.',
    title: 'The Battle of Badr',
    subtitle: 'The Day of Criterion (Yawm al-Furqān)',
    highlight: 'The Day of Criterion',
    location: 'Wells of Badr — 70 km southwest of Medina',
    statsLabels: ['Number of Muslims', 'Number of polytheists', 'Enemy killed', 'Enemy captured', 'Muslim martyrs'],
    statsValues: ['313', '1,000', '70', '70', '14'],
    keyFiguresEn: [
      { name: 'Ḥamzah ibn ʿAbd al-Muṭṭalib', role: 'The Lion of Allah — fought with unmatched valor' },
      { name: 'ʿAlī ibn Abī Ṭālib', role: 'The foremost warrior of the Muslims that day' },
      { name: 'Saʿd ibn Muʿādh', role: 'Chief of the Ansār — counseled the Prophet ﷺ to stand firm' },
      { name: 'Abū Jahl ʿAmr ibn Hishām', role: 'Leader of the Qurayshi army — killed in the battle' },
      { name: 'ʿUtbah ibn Rabīʿah', role: 'Qurayshi commander — killed in single combat' },
      { name: 'al-Miqdād ibn al-Aswad', role: 'The first horseman in Islam' },
    ],
    hadithsEn: [
      { text: 'ʿUmar narrated: "On the day of Badr the Messenger of Allah ﷺ looked at the polytheists — they numbered a thousand — and his companions were three hundred and a few more. He turned toward the qiblah, stretched out his hands, and cried to his Lord: \'O Allah, fulfil what You have promised me. O Allah, if this band perishes today, You will be worshipped on earth no more.\'"', source: 'Sahih Muslim — Book of Jihad' },
      { text: 'Anas said: "Abū Jahl was killed and the Prophet ﷺ said: \'He is the Pharaoh of this nation.\'"', source: 'Sahih al-Bukhārī — Book of Military Expeditions' },
    ],
    battleTimelineEn: [
      { phase: 'The departure and positioning', detail: 'The Prophet ﷺ set out on 17 Ramaḍān 2 AH with 313 fighters — 72 Muhājirūn and the rest Ansār — with only two horses and 70 camels. He accepted the tactical suggestion of al-Ḥubbāb ibn al-Mundhir to position at the water — a model of consultative leadership' },
      { phase: 'Single combat opens the battle', detail: 'Three of Quraysh\'s finest warriors — ʿUtbah, Shayba, and Abū al-Walīd — stepped forward. Ḥamzah, ʿAlī, and ʿUbaydah ibn al-Ḥārith met them and all three Qurayshis fell' },
      { phase: 'The full engagement and divine aid', detail: 'The Prophet ﷺ threw a handful of dust toward the enemy saying "May the faces be disfigured!" — and Allah said: "You did not throw when you threw, but Allah threw." (8:17). Allah sent one thousand angels fighting alongside the believers' },
      { phase: 'The decisive victory', detail: 'Seventy of Quraysh\'s greatest leaders were killed including Abū Jahl, ʿUtbah, and Shayba; seventy more were captured. Only fourteen Muslims were martyred — a victory of the powerless over the powerful by the will of Allah' },
      { phase: 'The ransoming of captives', detail: 'The Prophet ﷺ instituted a humane prisoner policy: each captive could earn freedom by teaching ten Muslim children to read and write — establishing education as the price of liberty' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And Allah had already given you victory at Badr while you were few in number. Then fear Allah; perhaps you will be grateful."', context: 'Allah reminded the believers of the miracle of Badr — victory for 313 over 1,000 — to strengthen their trust in Him for what lay ahead' },
    ],
    description:
      'On the 17th of Ramaḍān, 2 AH (624 CE), 313 ill-equipped Muslims faced a Qurayshi army of nearly 1,000 at the wells of Badr. Despite overwhelming odds, Allah sent angels to aid the believers. The Muslims won decisively, killing 70 Qurayshi leaders and capturing 70 more. The Prophet ﷺ wept with gratitude, saying: “O Allah, if this band perishes, You will be worshipped no more on earth.”',
    fullDescription:
      'The Muslims had set out to intercept a Qurayshi trade caravan returning from Syria under Abū Sufyān. When Abū Sufyān evaded them, the main Qurayshi army — nearly 1,000 warriors including the chiefs of every clan — marched out to Badr to confront the Muslims. The Prophet's army numbered just 313, with two horses, 70 camels, and limited weapons.\n\nThe Prophet ﷺ spent the night before the battle in prayer, weeping and supplicating. He said: “O Allah, if this small band perishes today, You will be worshipped on earth no more.” Abū Bakr came and held his cloak saying: “That is enough — Allah will fulfil what He has promised you.” Then Qurʼān 8:9 was revealed: “When you sought help of your Lord and He answered: I will reinforce you with one thousand angels, following one another.”\n\nThe battle lasted a morning. The Muslim archers were positioned strategically; ʿAlī ibn Abī Ṭālib, Ḥamzah, and ʿUbaydah ibn al-Ḥārith opened with single combat against the three best Qurayshi warriors. All three Qurayshi fell. In the battle, Abū Jahl — the most vicious persecutor of early Muslims — was killed by two young men of the Anṣār. Seventy of Quraysh's greatest warriors died. The Muslims lost fourteen men.\n\nThe impact was tectonic: the emerging Islamic state had defeated the most powerful tribe in Arabia on an open battlefield.',
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
    statsLabels: ['Duration of the siege', 'Outcome', 'Cause'],
    statsValues: ['15 days', 'Expulsion of Banū Qaynuqāʿ from Medina', 'Breaking the treaty and provoking the Muslims'],
    keyFiguresEn: [
      { name: 'ʿAbdullāh ibn Ubayy', role: 'The hypocrite leader who interceded for Banū Qaynuqāʿ — the Prophet ﷺ accepted his plea but exiled the tribe' },
    ],
    hadithsEn: [
      { text: 'Ibn Isḥāq reported: "When the Messenger of Allah ﷺ prevailed over Badr he gathered Banū Qaynuqāʿ and said: O Jews, beware lest Allah visit upon you the like of what He visited upon Quraysh. Embrace Islam before something similar befalls you. They replied: O Muḥammad, do not be deceived by having met men with no knowledge of war. If you fight us you will learn that we are the real warriors."', source: 'Sīrah of Ibn Hishām — al-Bidāyah wal-Nihāyah by Ibn Kathīr' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And if you fear from a people betrayal, throw [their treaty] back to them, [putting you] on equal terms. Indeed, Allah does not like traitors."', context: 'Banū Qaynuqāʿ were among the first to break their treaty with the Prophet ﷺ — this verse established the divine ruling on treachery' },
    ],
    description:
      'After Badr, the Jewish tribe of Banū Qaynuqāʼ violated the Charter of Medina by publicly humiliating a Muslim woman and killing a Muslim man who came to her defense. The Prophet ﷺ besieged their fortress for fifteen days until they surrendered. At the intercession of ʿAbdullāh ibn Ubayy, he exiled them to Syria rather than executing them.',
    highlights: [
      'The violation began in their market — a Muslim woman was publicly shamed',
      'Their exile was to Wadī al-Qūrā in Syria',
      'They were goldsmiths and weavers — their departure changed Medina's economic landscape',
    ],
  },

  /* ── Sawiq ───────────────────────────────────────────────── */
  29: {
    title: 'The Expedition of Al-Sawīq',
    subtitle: 'Abū Sufyān Burns and Flees',
    highlight: 'The Fleeing Raid',
    statsLabels: ["Abū Sufyān's force", 'Outcome', 'Why it is named al-Sawīq'],
    statsValues: ['200 horsemen led by Abū Sufyān', 'Abū Sufyān fled without confrontation', 'Bags of sawīq (roasted barley) abandoned in flight'],
    keyFiguresEn: [
      { name: 'Abū Sufyān ibn Ḥarb', role: 'Led the raid to fulfill his vow of revenge for Badr — burned and fled without engaging' },
      { name: 'Salamah ibn al-Akwaʿ', role: 'One of the swiftest companions in pursuit of the retreating Qurayshis' },
    ],
    hadithsEn: [
      { text: 'Ibn ʿAbbās said: "Abū Sufyān set out with 200 riders, burned the homes of some Ansār in the area of al-ʿUrayḍ and killed a man and his companion from the Ansār who were in their field. Then when the Muslims pursued him he ordered his men to throw down the sawīq (parched barley) they were carrying to lighten their loads and escape — so it was named the expedition of al-Sawīq."', source: 'Sīrah of Ibn Hishām — al-Maghāzī of al-Wāqidī' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And do not weaken in pursuit of the enemy. If you are suffering, lo, they suffer even as you suffer, and you hope from Allah that for which they cannot hope."', context: 'The Muslim pursuit of Abū Sufyān after the raid demonstrated that Medina would never be left undefended' },
    ],
    description:
      'In retaliation for Badr, Abū Sufyān ibn Ḥarb led 200 Qurayshi riders to the outskirts of Medina, burned some date palms, killed two Anṣār, and quickly fled. The Muslims pursued but they escaped, dropping sacks of sawīq (parched barley) to lighten their load — giving the expedition its name.',
    highlights: [
      'This was Abū Sufyān fulfilling a personal vow he had sworn after Badr',
      'The dropped sacks of sawīq gave the expedition its name',
      'It demonstrated Quraysh's unwillingness to engage in open battle',
    ],
  },

  /* ── Buwat ───────────────────────────────────────────────── */
  30: {
    title: 'The Expedition of Buwāṭ',
    subtitle: 'The First Expedition Led Personally by the Prophet ﷺ',
    highlight: 'The Prophet Commands',
    statsLabels: ['Number of Muslim fighters', 'Target caravan', 'Outcome'],
    statsValues: ['200 fighters', '2,500 camels', 'Return without encounter — caravan had taken a different route'],
    keyFiguresEn: [
      { name: 'Umayyah ibn Khalaf al-Jumaḥī', role: 'Leader of the Qurayshi caravan that was the target of the expedition' },
      { name: 'Saʿd ibn Abī Waqqāṣ', role: 'One of the standard-bearers of the Muslim army in this expedition' },
    ],
    hadithsEn: [
      { text: 'The expedition of Buwāṭ took place in Ṣafar of the second year of the Hijrah. The Prophet ﷺ led 200 fighters of the Muhājirūn toward the area of Buwāṭ in Juhaynah territory, seeking the Qurayshi caravan of Umayyah ibn Khalaf with 2,500 camels. The caravan had taken a different route and the Muslims returned to Medina without engagement.', source: 'al-Maghāzī of al-Wāqidī — Sīrah of Ibn Hishām' },
    ],
    battleTimelineEn: [
      { phase: 'Departure from Medina', detail: 'The Prophet ﷺ led 200 fighters toward Buwāṭ seeking the large Qurayshi trade caravan that was funding Quraysh\'s war against Islam — this was the first time he personally commanded the army in the field' },
      { phase: 'Return without engagement', detail: 'The caravan had taken a different route — the Prophet ﷺ found no one to engage and returned to Medina. The expedition nonetheless sent a clear message that the Islamic state would challenge Quraysh\'s economic dominance' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Permission [to fight] has been given to those who are being fought, because they were wronged. And indeed, Allah is competent to give them victory."', context: 'The first verse permitting fighting was the divine authorization for these early expeditions — a response to years of oppression in Mecca' },
    ],
    description:
      'The Prophet ﷺ personally led 200 Companions toward the area of Buwāṭ to intercept a Qurayshi trade caravan. No engagement took place, but this was the first military expedition in which the Prophet ﷺ himself led the army — establishing his personal command of the Muslim forces.',
    highlights: [
      'No battle occurred — the caravan had already passed',
      'This established the precedent of the Prophet's personal military command',
      'The expedition demonstrated the Muslim state's reach beyond Medina',
    ],
  },

  /* ── Uhud ────────────────────────────────────────────────── */
  31: {
    title: 'The Battle of Uhud',
    subtitle: 'A Lesson in Obedience',
    highlight: 'A Bitter Lesson',
    location: 'Mount Uhud — north of Medina',
    statsLabels: ['Number of Muslims', 'Number of polytheists', 'Muslim martyrs', 'Archers stationed on the hill'],
    statsValues: ['700', '3,000', '70', '50'],
    keyFiguresEn: [
      { name: 'Ḥamzah ibn ʿAbd al-Muṭṭalib', role: 'Master of the Martyrs — killed at Uḥud; his body was mutilated' },
      { name: 'Muṣʿab ibn ʿUmayr', role: 'Bearer of the Islamic standard — martyred defending the Prophet ﷺ' },
      { name: 'ʿAbdullāh ibn Jubayr', role: 'Commander of the archers — strictly ordered never to leave their position' },
      { name: 'Khālid ibn al-Walīd', role: 'Led the Qurayshi cavalry flank attack after the archers abandoned their post (before his Islam)' },
      { name: 'Abū Sufyān Ṣakhr ibn Ḥarb', role: 'Commander of the polytheist army' },
    ],
    hadithsEn: [
      { text: 'Anas narrated: "The tooth of the Prophet ﷺ was broken at Uḥud and his face was cut. He began wiping away the blood saying: \'How can a people prosper when they have wounded their prophet and broken his tooth while he invites them to Allah?\' So Allah revealed: \'You have no say in the matter.\'"', source: 'Sahih al-Bukhārī — Book of Military Expeditions' },
      { text: 'Jābir said: "When the day of Uḥud came, the Messenger of Allah ﷺ passed by Ḥamzah ibn ʿAbd al-Muṭṭalib who had been mutilated. He said: \'Were it not that Ṣafiyyah would be grieved, I would have left him until Allah resurrects him from the bellies of the birds and the beasts.\'"', source: 'Sīrah of Ibn Hishām' },
    ],
    battleTimelineEn: [
      { phase: 'Deployment and the archers\'  command', detail: 'The Prophet ﷺ positioned fifty archers on a hillock under ʿAbdullāh ibn Jubayr and ordered: "Do not leave your position whether we win or lose." He then deployed 700 fighters against 3,000 Qurayshis' },
      { phase: 'The initial Muslim victory', detail: 'The Muslim forces drove the Qurayshi infantry back; the Qurayshi camp appeared to be in full flight. Most archers then abandoned their post to collect spoils — in direct defiance of the Prophet\'s explicit command' },
      { phase: 'The flanking attack and reversal', detail: 'Khālid ibn al-Walīd saw the hill unguarded, flanked with his cavalry, killed the remaining archers, and struck the Muslim army from the rear. The false rumour spread that the Prophet ﷺ had been killed — causing chaos' },
      { phase: 'The Prophet ﷺ is wounded but stands firm', detail: 'The Prophet ﷺ was struck by a stone — his tooth broke and his face was cut — yet he stood firm calling his companions to him. A small band of heroes surrounded him with their bodies: Abū Dujānah, Ṭalḥah ibn ʿUbaydullāh, and Saʿd ibn Abī Waqqāṣ' },
      { phase: 'The eternal lesson', detail: 'Allah revealed 60 verses of Sūrah Āl ʿImrān analysing the battle: "Until when you lost heart and disputed about the matter and disobeyed after He had shown you that which you love." (3:152) — obedience to the Prophet ﷺ is not optional' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And what struck you on the day the two armies met was by permission of Allah, and that He might make evident the [true] believers."', context: 'Allah declared that the trial of Uḥud was divinely permitted to separate the sincere believers from the wavering and reveal the hypocrites' },
    ],
    description:
      'In Shawwāl 3 AH (625 CE), 3,000 Qurayshi warriors marched on Medina to avenge Badr. The Muslims numbered 700. After an initial Muslim success, the archers the Prophet ﷺ had stationed on a hill abandoned their post for spoils — allowing Khālid ibn al-Walīd (then a Qurayshi commander) to flank the Muslims. Seventy companions were martyred and the Prophet ﷺ was himself wounded.',
    fullDescription:
      'The Quraysh had spent a year preparing for revenge after Badr. They assembled 3,000 warriors — led by Abū Sufyān, with a cavalry wing under Khālid ibn al-Walīd — and marched on Medina. The Prophet ﷺ consulted the companions: some advised staying in Medina behind its walls; the younger companions urged marching out. He chose to march out with 1,000 men, though ʿAbdullāh ibn Ubayy withdrew with 300 hypocrites en route.\n\nThe Prophet ﷺ positioned fifty archers on a hillock (“Jabal al-Rummāh”) under ʿAbdullāh ibn Jubayr, with explicit instructions: “Do not leave your position whether we win or lose.”\n\nIn the initial engagement the Muslims drove the Qurayshi infantry back. When the Qurayshi camp appeared to flee, most of the archers abandoned their post to collect spoils — defying the explicit command. Khālid saw the hill undefended, flanked the Muslim army, killed the remaining archers, and struck from the rear. The Prophet ﷺ himself was hit by a stone that broke his tooth and cut his face. The false rumor spread that he had been killed — and many fled.\n\nSeventy companions were martyred, including Ḥamzah ibn ʿAbd al-Muṭṭalib, whose body was mutilated. The Prophet ﷺ stood over him and wept. Allah revealed: “And what struck you on the day the two armies met — it was by Allah's permission, that He might make evident the believers and that He might make evident those who were hypocrites.” (3:166)',
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
    statsLabels: ['Duration of the siege', 'Outcome', 'Destination of exile'],
    statsValues: ['About 15 days', 'Expulsion of Banū al-Naḍīr', 'Khaybar and the Levant'],
    keyFiguresEn: [
      { name: 'Ḥuyayy ibn Akhṭab', role: 'Chief of Banū al-Naḍīr — who later organized the coalition against Medina at the Battle of the Trench' },
    ],
    hadithsEn: [
      { text: 'Jibrīl informed the Prophet ﷺ of the assassination plot — that Banū al-Naḍīr planned to drop a millstone on him as he sat beneath their wall. He stood and left immediately without informing them. He then sent word ordering them to leave Medina. They refused at first, then agreed after fifteen days of siege.', source: 'Sīrah of Ibn Hishām — al-Bidāyah wal-Nihāyah by Ibn Kathīr' },
    ],
    relatedVersesEn: [
      { verse_translation: '"It is He who expelled the ones who disbelieved among the People of the Scripture from their homes at the first gathering."', context: 'Sūrah al-Ḥashr was revealed entirely about the exile of Banū al-Naḍīr, describing how they left their fortresses thinking no one could dislodge them' },
    ],
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
    statsLabels: ['Year', 'Tribes engaged', 'Significance'],
    statsValues: ['Year 4 AH', 'Ghaṭafān and Anmār', 'First legislation of the Prayer of Fear (Ṣalāt al-Khawf)'],
    keyFiguresEn: [
      { name: 'The Prophet Muḥammad ﷺ', role: 'Personally led the expedition and instituted Ṣalāt al-Khawf' },
    ],
    hadithsEn: [
      { text: 'Ṣāliḥ ibn Khawwāt reported from those who prayed the Prayer of Fear with the Messenger of Allah ﷺ at Dhāt al-Riqāʿ: One group stood in a row and another faced the enemy. The Prophet ﷺ led those behind him in one rakʿah, then they took the position of the others facing the enemy, while the others came and he led them in one rakʿah. Each group had therefore prayed one rakʿah each with the Prophet ﷺ, and each completed the second rakʿah on their own.', source: 'Sahih al-Bukhārī — Book of the Prayer of Fear' },
    ],
    battleTimelineEn: [
      { phase: 'The march to Najd', detail: 'The Prophet ﷺ led an expedition to Najd after reports of hostile gatherings by the Ghaṭfān and Anmār tribes. No major battle took place — the tribes dispersed upon the approach of the Muslim army' },
      { phase: 'Institution of Ṣalāt al-Khawf', detail: 'During the expedition, Qurʾān 4:101-102 was revealed ordaining the Prayer of Fear: an adaptation of the five prayers for combat situations — one group prays while the other maintains guard, then they switch' },
      { phase: 'Return to Medina', detail: 'The expedition demonstrated the reach of the Islamic state into Najd and established a lasting jurisprudential ruling: the prayer is never abandoned even in the midst of battle' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And when you travel throughout the land, there is no blame upon you for shortening the prayer, [especially] if you fear that those who disbelieve may disrupt [or attack] you."', context: 'The verse of the Prayer of Fear was revealed during this expedition — showing Islam\'s practical mercy even in the highest of its obligations' },
    ],
    description:
      'During this expedition against the Ghaṭfān and Anmār tribes, the Muslims faced potential attack during prayer. The Prayer of Fear (Ṣalāt al-Khawf) was instituted — allowing the army to pray in groups alternately while half maintained guard. This dispensation remains in Islamic jurisprudence to this day.',
    highlights: [
      'The Ṣalāt al-Khawf — Prayer of Fear — was revealed in Qūrʾaḥ 4:101-102',
      'It showed Islam's practicality: even the highest obligation is adapted to real circumstances',
      'The prayer is still taught in military and security contexts today',
    ],
  },

  /* ── Dumat al-Jandal ─────────────────────────────────────── */
  34: {
    title: 'The Expedition of Dūmat al-Jandal',
    subtitle: 'Securing the North and Establishing Islamic Prestige',
    highlight: 'Strength Projects Peace',
    statsLabels: ['Year', 'Target region', 'Outcome'],
    statsValues: ['Year 5 AH', 'Dūmat al-Jandal — northern Hijaz near Syria', 'Tribes withdrew before any confrontation'],
    keyFiguresEn: [
      { name: 'The Prophet Muḥammad ﷺ', role: 'Personally led the northernmost Muslim military reach — toward Byzantine Syria' },
    ],
    hadithsEn: [
      { text: 'The Messenger of Allah ﷺ marched to Dūmat al-Jandal in Rabīʿ al-Awwal of the fifth year AH, leading 1,000 fighters. He reached the area and found the tribes had dispersed. He stayed for several days then appointed ʿAbd al-Raḥmān ibn ʿAwf in charge and returned.', source: 'al-Maghāzī of al-Wāqidī — Sīrah of Ibn Hishām' },
    ],
    battleTimelineEn: [
      { phase: 'The march northward', detail: 'After intelligence reports of hostile tribal concentrations at Dūmat al-Jandal near the Syrian border threatening northern trade routes, the Prophet ﷺ led 1,000 fighters northward — the farthest reach of the Islamic state at that point' },
      { phase: 'The tribes disperse without battle', detail: 'The tribal forces at Dūmat al-Jandal scattered upon hearing of the approaching Muslim army — demonstrating that the Islamic state\'s military reputation was itself a deterrent requiring no combat' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And prepare against them whatever you are able of power and of steeds of war by which you may terrify the enemy of Allah and your enemy."', context: 'The expedition to Dūmat al-Jandal embodied this principle: the very readiness and reach of the Muslim army projected peace without a single blow being struck' },
    ],
    description:
      'The Prophet ﷺ led an army to Dūmat al-Jandal in northern Arabia, near the Syrian border, after reports of hostile tribal gatherings threatening northern trade routes. The tribes dispersed before engagement — demonstrating that the Islamic state's influence now extended northward toward Byzantine territory.',
    highlights: [
      'The expedition reached within striking distance of Byzantine Syria',
      'No battle was needed — the tribes dispersed at the news of the approaching army',
      'It was the first Muslim military reach toward the north',
    ],
  },

  /* ── Trench ──────────────────────────────────────────────── */
  35: {
    verse_en: 'And sufficient was Allah for the believers in [their] battle, and ever is Allah Powerful and Exalted in Might.',
    title: 'The Battle of the Trench (Al-Khandaq)',
    subtitle: 'Ten Thousand Could Not Prevail',
    highlight: 'The Great Alliance Fails',
    location: 'Medina',
    statsLabels: ['Number in the coalition', 'Number of Muslims', 'Duration of the siege', 'Length of the trench'],
    statsValues: ['10,000 fighters', 'About 3,000', 'About one month', 'About 5 km'],
    keyFiguresEn: [
      { name: 'Salmān al-Fārisī', role: 'The Persian companion who proposed the trench — every faction claimed: "Salmān is one of ours"' },
      { name: 'Nuʿaym ibn Masʿud', role: 'Secretly accepted Islam and used strategic deception to sow distrust between Quraysh, Ghaṭfān, and Banū Qurayẓah — breaking the coalition from within' },
      { name: 'ʿAlī ibn Abī Ḱālib', role: 'Killed ʿAmr ibn ʿAbd Wudd — the only warrior who managed to cross the trench' },
      { name: 'Abū Sufyān', role: 'Commander of the 10,000-strong coalition' },
      { name: 'Ḥuyayy ibn Akhyṭab', role: 'Chief of Banū al-Naḍīr who organized the coalition and convinced Banū Qurayẓah to betray their treaty' },
    ],
    hadithsEn: [
      { text: 'al-Barāʾ ibn ʿÁzib said: "I saw the Messenger of Allah ﷺ on the day of the Trench carrying dirt until the dust covered the skin of his belly. He had abundant hair, and I heard him reciting the lines of Ibn Rawāḥah: \"O Allah, were it not for You we would not be guided, nor would we give in charity nor pray…\""', source: 'Sahih al-Bukhārī — Book of Military Expeditions' },
      { text: 'After the Confederates withdrew, the Prophet ﷺ said: "Now we will raid them and they will not raid us — we will march to them."', source: 'Sahih al-Bukhārī — Book of Military Expeditions' },
    ],
    battleTimelineEn: [
      { phase: 'The great coalition assembles', detail: 'The exiled Banū al-Naḍīr traveled to Quraysh and Ghaṭfān, spent their wealth rallying tribes, and assembled an unprecedented 10,000 warriors — the largest coalition ever mounted against the Prophet ﷺ' },
      { phase: 'Digging the trench', detail: 'On the advice of Salmān al-Fārisī, the entire community dug a trench across the open northern approach for weeks. The Prophet ﷺ himself dug alongside them, a stone tied to his belly from hunger, reciting poetry to raise spirits' },
      { phase: 'Nuʿaym's covert diplomacy', detail: 'Nuʿaym ibn Masʿud secretly accepted Islam and — with the Prophet's permission — sowed doubt among all three coalition parties: each became suspicious of the others and none would strike without guarantees' },
      { phase: 'The divine wind and the coalition's collapse', detail: 'Allah sent a fierce, freezing wind that uprooted tents, extinguished fires, and overturned cooking pots. The coalition's morale shattered overnight — Abū Sufyān announced the retreat and 10,000 warriors went home having achieved nothing' },
    ],
    relatedVersesEn: [
      { verse_translation: '"O you who have believed, remember the favor of Allah upon you when armies came to [attack] you and We sent upon them a wind and armies [of angels] you did not see."', context: 'Allah reminded the believers that it was His invisible armies — wind and angels — that broke the greatest coalition ever assembled against Islam' },
    ],
    description:
      'In Shawwāl 5 AH, an alliance of 10,000 warriors from Quraysh, Ghaṭfān, and other tribes besieged Medina. On the advice of Salmān al-Fārisī, the Prophet ﷺ had a trench dug around the exposed northern face of Medina. Unable to cross, the coalition was eventually broken by a fierce divine wind, internal discord, and the covert diplomacy of Nuʼaym ibn Masʼūd — after 27 days.',
    fullDescription:
      'Banū al-Naḍīr — exiled from Medina after their treachery — traveled to Quraysh and assembled the largest coalition ever mounted against the Prophet ﷺ: 10,000 fighters from Quraysh, Ghaṭfān, Banū Sulaym, Banū Asad, and others. It was called “Al-Aḥzāb” — the Confederates.\n\nSalmān al-Fārisī, a Persian companion, suggested an innovation unknown in Arabia: digging a trench across the open northern approach. The entire community dug for weeks, including the Prophet ﷺ himself, who carried dirt and recited poetry with his companions: “O Allah, life is truly the life of the Hereafter — forgive the Ansār and Muhājirūn.”\n\nThe coalition arrived and found an obstacle they had no answer for. For 27 days they camped outside, unable to cross. Internal tensions rose. Nuʼaym ibn Masʼūd — who had secretly accepted Islam — played the coalition's factions against each other through strategic deception, sowing mutual distrust between Quraysh, Ghaṭfān, and Banū Qurayẓah.\n\nThen Allah sent a freezing wind that uprooted tents and extinguished fires. The coalition's resolve shattered overnight. Abū Sufyān announced the retreat. The Prophet ﷺ told his companions: “Allah has handled them for us.”',
    highlights: [
      'The trench concept came from Salmān al-Fārisī — a Persian convert — showing Islam's openness to wisdom from all cultures',
      'The Prophet ﷺ dug the trench personally alongside his companions',
      'Nuʼaym ibn Masʼūd's covert diplomacy broke the coalition from within',
      'A divine wind on the final night caused the coalition to retreat in disarray',
      'After this battle, Quraysh never again launched a major offensive against Medina',
    ],
  },

  /* ── Banu Qurayza ────────────────────────────────────────── */
  36: {
    verse_en: 'And He brought down those who supported them among the People of the Scripture from their fortresses and cast terror into their hearts.',
    title: 'The Expedition against Banū Qurayẓah',
    subtitle: 'Betrayal at the Hour of Greatest Need',
    highlight: 'Betrayal Answered',
    statsLabels: ['Duration of the siege', 'Ruling', 'Cause'],
    statsValues: ['25 days', 'Arbitration by Saʿd ibn Muʿādh', 'Treaty betrayal during the Battle of the Trench'],
    keyFiguresEn: [
      { name: 'Saʿd ibn Muʿádh', role: 'Chief of the Aws — appointed as arbiter by Banū Qurayẓah themselves; ruled according to the Torah and died of his wound immediately after' },
      { name: 'Ḥuyayy ibn Akhyṭab', role: 'Chief of Banū al-Naḍīr who persuaded Banū Qurayẓah to break their treaty — was executed alongside them' },
      { name: 'Kaʿb ibn Asad', role: 'Chief of Banū Qurayẓah who opened the door to Ḥuyayy ibn Akhyṭab and agreed to the betrayal' },
    ],
    hadithsEn: [
      { text: 'The Prophet ﷺ said when informed of the death of Saʿd ibn Muʿádh: "The Throne of the Most Merciful trembled at the death of Saʿd ibn Muʿádh."', source: 'Sahih al-Bukhārī — Book of the Virtues of the Companions; Sahih Muslim — Book of the Virtues of the Companions' },
      { text: 'ʿÁʿishah said: "When the Messenger of Allah ﷺ returned from the Trench and had put down his weapons and bathed, Jibrīl came to him — as though shaking dust from his head — and said: \"You have put down your weapons? By Allah, I have not put down mine. Go out to them.\" He said: \"Where?\" He pointed toward Banū Qurayẓah."', source: 'Sahih al-Bukhārī — Book of Military Expeditions' },
    ],
    battleTimelineEn: [
      { phase: 'The betrayal during the Trench', detail: 'While Medina was under its most dire siege, Ḥuyayy ibn Akhyṭab convinced the chief of Banū Qurayẓah, Kaʿb ibn Asad, to break their treaty with the Prophet ﷺ and supply the coalition with weapons and men at the most critical moment' },
      { phase: 'Jibrīl's command: do not lay down arms', detail: 'When the Confederates withdrew, Jibrīl came to the Prophet ﷺ — still with dust on his head from digging — and commanded him to march immediately on Banū Qurayẓah without rest' },
      { phase: 'The siege of 25 days', detail: 'The Muslims besieged the fortresses of Banū Qurayẓah for 25 days until they could endure no longer and submitted, requesting that their ally tribe, the Aws, supply the arbiter for their fate' },
      { phase: 'The ruling of Saʿd and his death', detail: 'Saʿd ibn Muʿádh ruled according to the Torah's own law of treason: death for the combatants, captivity for the women and children. The Prophet ﷺ said: "You have judged with the judgment of Allah above the seven heavens." Saʿd's wound then reopened and he died — "the Throne of the Most Merciful trembled at his death"' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And He brought down those who supported them among the People of the Scripture from their fortresses and cast terror into their hearts — a party you killed, and you took captive a party."', context: 'Allah described the fall of Banū Qurayẓah as His own act — their fortresses did not protect them from divine judgment after their betrayal' },
    ],
    description:
      'During the Battle of the Trench, the Jewish tribe of Banū Qurayẓah violated their treaty with the Prophet ﷺ and secretly allied with the besieging coalition, threatening the defenseless women and children of Medina from within. After the siege ended, the Prophet ﷺ besieged their fortress for 25 days. They agreed to accept the judgment of Saʼd ibn Muʼādh — the chief of their allied tribe — who ruled according to the Torah's own law of treason.',
    highlights: [
      'Their betrayal during the siege put the women and children of Medina in direct danger',
      'They chose Saʼd ibn Muʼādh as their arbiter — the chief of their own allied tribe',
      'Saʼd ruled according to the law of the Torah itself: death for the fighters',
      'The Prophet ﷺ said of Saʼd's ruling: “You have judged with the judgment of Allah above the seven heavens”',
    ],
  },

  /* ── Banu Mustaliq / Ifk ─────────────────────────────────── */
  37: {
    title: 'Banū al-Muṣṭaliq and the Slander Incident (Al-Ifk)',
    subtitle: "The Slander and the Innocence of ʿcĀʼisha",
    highlight: 'Innocence from Above',
    statsLabels: ['Tribe of Banū al-Muṣṭaliq', 'The slander incident', 'Year'],
    statsValues: ['From Khuzāʿah, led by al-Ḥārith ibn Abī Ḍirār', 'A month of grief then divine vindication', 'Year 5 or 6 AH'],
    keyFiguresEn: [
      { name: 'ʿĀʾishah bint Abī Bakr', role: 'The Mother of the Believers whose innocence Allah declared in the Qurʾān — verses recited until the Day of Judgment' },
      { name: 'ʿAbdullāh ibn Ubayy', role: 'Leader of the hypocrites who spread the slander across Medina for a month' },
      { name: 'Ṣafwān ibn al-Muʿaṭṭal', role: 'The companion falsely accused — Allah cleared his name in the Qurʾān' },
      { name: 'Juwayriyyah bint al-Ḥārith', role: 'Daughter of the chief of Banū al-Muṣṭaliq — accepted Islam and the Prophet ﷺ married her, freeing all their captives' },
    ],
    hadithsEn: [
      { text: 'ʿĀʾishah said: "By Allah, the Messenger of Allah ﷺ would ask me: \'How are you, O ʿĀʾishah?\' while I was unaware of the slander, until Allah revealed the Qurʾān clearing me. He came to me with my parents present and said: \'Rejoice, O ʿĀʾishah — Allah has revealed your innocence.\'"', source: 'Sahih al-Bukhārī — Book of Military Expeditions' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Indeed, those who came with the slander are a group among you. Do not think it bad for you; rather, it is good for you."', context: 'The first of ten Qurʾānic verses in Sūrah al-Nūr declaring ʿĀʾishah\'s innocence — and establishing the highest standards of evidence for accusations of immorality' },
    ],
    description:
      'During the return from this expedition, hypocrites led by ʿAbdullāh ibn Ubayy fabricated a slander against the Prophet's ﷺ wife ʿcĀʼisha ،, causing anguish for a month. Allah then revealed ten verses of Sūrah al-Nūr declaring her complete innocence and prescribing the punishment for false accusations of chastity — making the incident a cornerstone of Islamic jurisprudence.',
    highlights: [
      "ʼcĀʼisha ، had been inadvertently left behind when the army departed and was escorted back by Ṣafwan ibn al-Muʼattal",
      'The Prophet ﷺ suffered deeply during the month of uncertainty — then divine revelation cleared her name',
      'Allah revealed: “Those who brought the slander are a small group among you” (Qūrʾaḥ 24:11)',
      'The incident established the highest standards of evidence before accusing someone of moral transgression',
    ],
  },

  /* ── Hudaybiyyah ─────────────────────────────────────────── */
  38: {
    verse_en: 'Indeed, We have given you, [O Muhammad], a clear conquest.',
    title: 'The Treaty of Ḥudaybiyyah',
    subtitle: 'A Clear Victory in the Guise of Defeat',
    highlight: 'A Clear Conquest',
    location: 'Hudaybiyyah — outskirts of Mecca',
    statsLabels: ['Number of companions', 'Duration of the truce', 'Year'],
    statsValues: ['1,400 Companions', '10 years', '6 AH — 628 CE'],
    keyFiguresEn: [
      { name: 'ʿUthmān ibn ʿAffān', role: "The Prophet's envoy to Quraysh — when rumors of his death spread, the Pledge of al-Riḍwān was taken" },
      { name: 'Suhayl ibn ʿAmr', role: "Quraysh's negotiator who insisted on removing 'Messenger of Allah' from the treaty text" },
      { name: 'ʿUmar ibn al-Khaṭṭāb', role: "Openly challenged the treaty terms — then admitted it was the greatest of victories when he saw its fruits" },
      { name: 'Abū Bakr al-Ṣiddīq', role: "Supported the Prophet ﷺ and reminded ʿUmar: 'Hold firm — the Prophet knows what he is doing'" },
    ],
    hadithsEn: [
      { text: 'Anas narrated: "When the treaty was being written, ʿUmar said: O Messenger of Allah, are we not Muslims and they polytheists? He replied: Yes. He said: Then why do we accept humiliation in our religion? He replied: I am the slave of Allah and His Messenger — I will not disobey His command and He will not abandon me."', source: 'Sahih al-Bukhārī — Book of Conditions' },
      { text: 'The Prophet ﷺ said about Ḥudaybiyyah: "It is indeed a victory" — and he was right: in those two years of peace, more people entered Islam than in the previous six years combined.', source: 'Sahih al-Bukhārī — Book of Military Expeditions' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Indeed, We have given you, [O Muhammad], a clear conquest — that Allah may forgive for you what preceded of your sin and what will follow and complete His favor upon you and guide you to a straight path."', context: 'Allah called Ḥudaybiyyah a "clear conquest" (fatḥan mubīnan) — teaching that the greatest victories are sometimes those that look like defeats to the eye' },
    ],
    description:
      'The Prophet ﷺ set out with 1,400 companions for ʿUmrah in 6 AH, but was stopped by Quraysh at Ḥudaybiyyah. A treaty was signed: ten-year peace, with the Muslims returning that year. The companions were devastated. ʿUmar challenged it openly. Yet Allah revealed: “We have granted you a clear conquest.” Within two years, thousands entered Islam freely, and Mecca fell.',
    fullDescription:
      'The Prophet ﷺ had a vision that he entered Mecca to perform ʿUmrah. He set out with 1,400 unarmed companions wearing the simple garments of pilgrims. Quraysh sent delegates to block them at Ḥudaybiyyah and refused them entry. Negotiations were tense.\n\nThe Prophet ﷺ sent ʿUthmān ibn ʿAffān as an envoy to Mecca. When rumors reached the camp that ʿUthmān had been killed, the Prophet ﷺ called all companions to pledge “to the death” under a tree. This was the Pledge of al-Riḍwān (Pleasure) — about which Allah revealed: “Allah was pleased with the believers when they pledged to you under the tree.” (48:18)\n\nʿUthmān was unharmed and a treaty was reached: the Muslims would return this year; they could come back next year for three days; ten-year peace; anyone who left Mecca for Medina without a guardian's permission would be returned, but not vice versa.\n\nʿUmar openly expressed his anguish: “Are we not Muslims? Are they not polytheists? Why should we accept humiliation?” Abū Bakr replied: “Hold firm — the Prophet knows what he is doing.”\n\nYet Qurʼān chapter 48 was revealed calling it “A manifest victory” (fatḥan mubīnā). The peace opened the door to free preaching; within two years 10,000 entered Islam. Quraysh violated the treaty themselves, leading to the Conquest of Mecca.',
    highlights: [
      "ʿUmar's anguished objection was silenced only by the Prophet's certainty — and by history",
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
    statsLabels: ['Number of letters sent', 'Most prominent recipients', 'Fate of Khosrow'],
    statsValues: ['Six or more letters to rulers', 'Heraclius, Khosrow, Muqawqis, and the Negus', 'He tore the letter so Allah tore his kingdom'],
    keyFiguresEn: [
      { name: 'Heraclius (Byzantine Emperor)', role: 'Read the letter seriously, investigated the Prophet\'s claims, and concluded he was a true prophet — but did not embrace Islam for fear of losing his throne' },
      { name: 'Khosrow II (Sasanian Emperor)', role: 'Tore the letter in arrogance — the Prophet ﷺ said "Allah has torn his kingdom" — and within years his own son killed him and the empire collapsed' },
      { name: 'al-Negus (King of Abyssinia)', role: 'Confirmed his Islam and wrote to the Prophet ﷺ — the Prophet ﷺ led his funeral prayer in absentia when he died' },
      { name: 'Diḥyah al-Kalbī', role: 'The handsome companion who carried the letter to Heraclius' },
    ],
    hadithsEn: [
      { text: 'Heraclius said: "I asked Abū Sufyān about the qualities of this Prophet, and he answered me with nothing except what confirmed to me that he is a true prophet. And I said: If what you say is true, he will inherit the ground under my two feet."', source: 'Sahih al-Bukhārī — Book of the Beginning of Revelation' },
      { text: 'The Prophet ﷺ said when news reached him that Khosrow had torn the letter: "Allah has torn his kingdom."', source: 'Sahih al-Bukhārī — Book of Military Expeditions' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And We have not sent you except comprehensively to mankind as a bringer of good tidings and a warner."', context: 'The letters to the kings embodied this verse — Islam addressed the entire world, not just the Arabs, from its earliest days' },
    ],
    description:
      'After Ḥudaybiyyah, the Prophet ﷺ sent letters to the most powerful rulers of his era: Heraclius (Byzantine Emperor), Khosrow II (Sasanian Emperor), the Negus of Abyssinia, Muqawqis (ruler of Egypt), and others — inviting each to Islam. Heraclius' response was measured and thoughtful; Khosrow tore the letter and was later told: “Allah has torn his kingdom.” The Negus wept and accepted Islam.',
    highlights: [
      'Heraclius secretly investigated the Prophet's claims and concluded: “If what you say is true, he will inherit this land under my feet”',
      'Khosrow II tore the letter — and his kingdom was torn apart by civil war within years',
      'The Negus of Abyssinia accepted Islam privately and the Prophet led his funeral prayer in absentia',
      'These letters opened diplomatic relations between the emerging Islamic state and the world's great powers',
    ],
  },

  /* ── Khaybar ─────────────────────────────────────────────── */
  40: {
    title: 'The Battle of Khaybar',
    subtitle: 'The Conquest of the Jewish Fortresses',
    highlight: 'Alī Bears the Banner',
    location: 'Khaybar — northern Hijaz',
    statsLabels: ['Size of the Muslim army', 'Number of fortresses', 'Outcome'],
    statsValues: ['1,600 fighters', 'Seven fortified strongholds', 'Complete conquest of Khaybar'],
    keyFiguresEn: [
      { name: 'ʿAlī ibn Abī Ṭālib', role: 'Bearer of the banner — the Prophet ﷺ cured his eye infection, gave him the standard, and Allah granted victory on his hands' },
      { name: 'Marḥab al-Yahūdī', role: "Khaybar's most feared warrior — killed by ʿAlī ibn Abī Ṭālib in single combat" },
      { name: 'Ṣafiyyah bint Ḥuyayy', role: 'Daughter of the chief of Banū al-Naḍīr — accepted Islam and the Prophet ﷺ married her; her emancipation was her dowry' },
    ],
    hadithsEn: [
      { text: 'Salamah ibn al-Akwaʿ said: "The Messenger of Allah ﷺ said: \\"I will give this banner tomorrow to a man who loves Allah and His Messenger and is loved by Allah and His Messenger, through whose hands Allah will grant victory.\\" We spent that night wondering which of us it would be. In the morning the Prophet ﷺ asked: \\"Where is ʿAlī?\\" He was brought with inflamed eyes. The Prophet ﷺ spat into his eyes, gave him the banner, and Allah granted victory through him."', source: 'Sahih al-Bukhārī — Book of Military Expeditions' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Allah was pleased with the believers when they pledged allegiance to you under the tree — He knew what was in their hearts, so He sent down tranquility upon them and rewarded them with an imminent conquest."', context: 'The Battle of Khaybar was among the first fruits of the Pledge of al-Riḍwān — a promise Allah kept' },
    ],
    description:
      'In 7 AH, the Prophet ﷺ led an army to the fortresses of Khaybar — the stronghold of the exiled Banū al-Naḍīr and center of anti-Islamic agitation. Each fortress fell one by one. ʿAlī ibn Abī Ṭālib distinguished himself — the Prophet ﷺ gave him the banner saying: “I will give it to a man who loves Allah and His Messenger and is loved by them.” ʿAlī conquered the last great fortress with a single gate, famously said to be used as a shield.',
    highlights: [
      "The Prophet's words about Ali became one of the most celebrated prophetic praises",
      'The conquest ended Banū al-Naḍīr's ability to agitate against Medina',
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
    statsLabels: ['Year of conversion', 'Khālid\'s title', 'ʿAmr\'s role afterward'],
    statsValues: ['Year 7 AH', 'Sword of Allah (Sayf Allāh)', 'Governor and conqueror of Egypt'],
    keyFiguresEn: [
      { name: 'Khālid ibn al-Walīd', role: 'The undefeated general who had flanked the Muslims at Uḥud — now given the title "Sayf-ullāh" (Sword of Allah) by the Prophet ﷺ himself' },
      { name: 'ʿAmr ibn al-ʿĀṣ', role: 'The sharp diplomat and strategist who later conquered Egypt and governed it' },
    ],
    hadithsEn: [
      { text: 'Khālid ibn al-Walīd said: "I saw clearly that Muḥammad ﷺ was on truth — I had resisted it out of pride and stubbornness. When I presented myself to the Prophet ﷺ and said I give you my allegiance, he stretched out his hand. I said: On the condition that my past sins be forgiven. He said: \\"Do you not know, O Khālid, that Islam erases all that came before it?\\""', source: 'Musnad Aḥmad — al-Bidāyah wal-Nihāyah by Ibn Kathīr' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Say to those who have disbelieved [that] if they cease, what has previously occurred will be forgiven for them."', context: 'Khālid and ʿAmr came to Islam after years of opposition — and Islam wiped their slates clean, transforming them into the greatest warriors and statesmen of their age' },
    ],
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
    statsLabels: ['Number of companions', 'Duration in Mecca', 'Year'],
    statsValues: ['About 2,000 Muslims', 'Three full days', 'Dhul-Qaʿdah 7 AH'],
    keyFiguresEn: [
      { name: 'Bilāl ibn Rabāḥ', role: 'Called the adhān from atop the Kaʿbah — the freed slave who had been tortured for saying "One" now proclaimed it from Islam\'s holiest summit' },
    ],
    hadithsEn: [
      { text: 'When the Prophet ﷺ entered Mecca for the ʿUmrat al-Qaḍāʾ, Quraysh withdrew to the surrounding hills and watched. He entered declaring: "Labbaykallahumma labbayk" — Here I am, O Allah, here I am. The companions entered with him, performing the Ṭawāf while he rode al-Qaṣwāʾ.', source: 'Sahih al-Bukhārī — Book of Ḥajj; Sīrah of Ibn Hishām' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Certainly has Allah showed His Messenger the vision in truth. You will surely enter al-Masjid al-Haram, if Allah wills, in safety, with your heads shaved and [hair] shortened, not fearing [anyone]."', context: 'The ʿUmrat al-Qaḍāʾ fulfilled this divine vision that had seemed impossible — a lesson that every promise of Allah comes to pass' },
    ],
    description:
      'In fulfillment of the Ḥudaybiyyah treaty, the Prophet ﷺ and 2,000 companions entered Mecca for three days to perform ʿUmrah in 7 AH. The Quraysh evacuated to the surrounding hills, watching their city filled with the declaration of Allāh's Oneness. Bilāl called the adhān from the top of the Kaʻah — the freed slave who had been tortured for his faith now calling from its summit.',
    highlights: [
      'The Quraysh evacuated the city and watched from the surrounding hills',
      'Bilāl calling the adhān from the top of the Kaʻah was one of the most powerful symbolic moments of early Islam',
      'The Prophet ﷺ married Ṣafiyyah bint Ḥuyayy during this period',
      "It demonstrated that Islam honored its commitments even when Quraysh had humiliated the Muslims",
    ],
  },

  /* ── Mu\'tah ──────────────────────────────────────────────── */
  43: {
    title: "The Battle of Muʼtaḥ",
    subtitle: 'Three Thousand Against One Hundred Thousand',
    highlight: 'The Eagles of Muʼtaḥ',
    location: "Muʼtaḥ — modern Jordan",
    statsLabels: ['Muslim fighters', 'Byzantine and allied forces', 'Year'],
    statsValues: ['3,000 fighters', '100,000 or more', '8 AH'],
    keyFiguresEn: [
      { name: 'Zayd ibn Ḥārithah', role: 'First appointed commander — martyred leading the charge' },
      { name: 'Jaʿfar ibn Abī Ṭālib', role: 'Second commander — fought holding the banner with both arms after they were severed; titled "Dhū al-Janaḥayn" (The One with Two Wings)' },
      { name: 'ʿAbdullāh ibn Rawāḥah', role: 'Third commander — martyred after the two before him' },
      { name: 'Khālid ibn al-Walīd', role: 'Assumed command after all three appointed leaders fell; conducted a brilliant tactical withdrawal earning the title "Sayf-ullāh"' },
    ],
    hadithsEn: [
      { text: 'The Prophet ﷺ announced the deaths of the three commanders from the pulpit in Medina — by revelation — before the messengers had arrived with the news. He said: "Zayd took the banner and was struck — then Jaʿfar took it and was struck — then Ibn Rawāḥah took it and was struck" — and his eyes were filled with tears.', source: 'Sahih al-Bukhārī — Book of Military Expeditions' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And never think of those who have been killed in the cause of Allah as dead. Rather, they are alive with their Lord, receiving provision."', context: 'Zayd, Jaʿfar, and ʿAbdullāh — the three eagles of Muʾtah — are among those whose martyrdom this verse addresses' },
    ],
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
    verse_en: 'And say: Truth has come, and falsehood has departed. Indeed is falsehood, [by nature], ever bound to depart.',
    title: 'The Conquest of Mecca (Fatḥ Makkah)',
    subtitle: "'Today Is the Day of Mercy'",
    highlight: "'Today Is the Day of Mercy'",
    location: 'Mecca',
    statsLabels: ['Number of companions', 'Muslim casualties', 'Idols in the Kaʿbah'],
    statsValues: ['10,000', 'Almost none', '360 idols'],
    keyFiguresEn: [
      { name: 'Abū Sufyān ibn Ḥarb', role: 'Captured on the night before the conquest — finally accepted Islam; the Prophet ﷺ honored him by declaring his house a place of safety' },
      { name: 'Bilāl ibn Rabāḥ', role: 'Called the adhān from the roof of the Kaʿbah after the conquest — the freed slave who had been tortured for his faith now called from its summit' },
      { name: 'ʿIkrimah ibn Abī Jahl', role: 'Son of the Prophet\'s greatest enemy — fled to Yemen, then returned and embraced Islam; was pardoned and became a noble companion' },
    ],
    hadithsEn: [
      { text: 'Ibn Masʿūd said: "The Prophet ﷺ entered Mecca on the Day of Conquest while there were 360 idols around the Kaʿbah. He began striking them with a stick he had, saying: \\"Truth has come and falsehood has vanished. Indeed, falsehood is ever bound to vanish.\\"" (17:81)', source: 'Sahih al-Bukhārī — Book of Military Expeditions' },
      { text: 'The Prophet ﷺ stood at the door of the Kaʿbah on the Day of Conquest and said to the assembled Quraysh: "What do you think I will do with you?" They said: "A noble brother, son of a noble brother." He said: "Go — you are free."', source: 'al-Bidāyah wal-Nihāyah by Ibn Kathīr — Sīrah of Ibn Hishām' },
    ],
    battleTimelineEn: [
      { phase: 'The secret mobilization', detail: 'After Quraysh violated the Ḥudaybiyyah treaty by attacking Banū Khuzāʿah, the Prophet ﷺ assembled 10,000 companions in secrecy — the largest Muslim army ever. Abū Sufyān rode out to investigate and was captured' },
      { phase: 'Abū Sufyān\'s conversion and the amnesty proclamation', detail: 'Abū Sufyān accepted Islam before the army entered. The Prophet ﷺ then proclaimed general amnesty: anyone in Abū Sufyān\'s house, their own home, or the Sacred Mosque would be safe' },
      { phase: 'Entry from four directions', detail: 'The 10,000-strong army entered Mecca from four directions simultaneously, with minimal resistance. The Prophet ﷺ entered on his camel, head bowed in humility, reciting Sūrah al-Fatḥ' },
      { phase: 'Breaking the idols and the general amnesty', detail: 'The Prophet ﷺ circled the Kaʿbah seven times, then broke the 360 idols reciting 17:81. Then standing at the Kaʿbah door he declared: "Go — you are free" — pardoning even those who had tortured and killed the early Muslims' },
      { phase: 'Bilāl\'s adhān from the Kaʿbah roof', detail: 'The freed Abyssinian slave who had been tortured for saying "One" was commanded by the Prophet ﷺ to mount the Kaʿbah and call the adhān — one of the most powerful symbolic moments in Islamic history' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And say: Truth has come and falsehood has departed. Indeed, falsehood is ever bound to depart."', context: 'The Prophet ﷺ recited this verse as he struck the idols of the Kaʿbah — 360 fell one by one as he walked around it' },
    ],
    description:
      'On Ramaḍān 20, 8 AH (630 CE), the Prophet ﷺ led 10,000 companions into Mecca — the city that had tortured, killed, and expelled the early Muslims — without a single drop of blood. He stood at the Kaʻah and asked: “What do you think I will do with you?” They said: “A noble brother, son of a noble brother.” He replied: “Go — you are free.”',
    fullDescription:
      'When Quraysh violated the Ḥudaybiyyah treaty by attacking the Banū Khūzāʼah — who were under the Prophet's protection — the peace was broken and the grounds for action were clear. The Prophet ﷺ assembled the largest Muslim army ever: 10,000 men, drawn from every tribe and city.\n\nThe army moved in such secrecy that Abū Sufyān himself rode out to investigate and was captured. He spoke to the Prophet ﷺ that night and, finally, accepted Islam. The Prophet ﷺ then announced the general amnesty before the army even entered: everyone who entered Abū Sufyān's house, or their own home, or the Sacred Mosque, would be safe.\n\nThe army entered from four directions with minimal resistance. The Prophet ﷺ entered on his camel, his head bowed in humility, reciting Sūrah al-Fatḥ (48). He went straight to the Kaʻah, circled it seven times, then entered and broke the 360 idols, reciting: “Truth has come and falsehood has departed — falsehood is ever departing.” (17:81)\n\nThen he stood at the door of the Kaʻah before the assembled Quraysh and declared the General Amnesty: “Today is the day of mercy. Go — you are free.” Those who had tortured Bilal, killed Hamzah, ordered the murder of innocent Muslims — all were pardoned. Only a handful of the worst criminals by name were excluded, and most of those were eventually pardoned too.',
    highlights: [
      '10,000 companions entered Mecca without a single Muslim casualty',
      "He bowed his head so low in humility on his camel that his beard nearly touched the saddle — reciting al-Fatḥ",
      'He broke 360 idols in the Kaʻah reciting: “Truth has come and falsehood has departed” (17:81)',
      'The General Amnesty pardoned even those who had tortured, killed, and expelled the early Muslims',
      'Bilāl called the adhān from the top of the Kaʻah — the freed slave who had been tortured for saying “One” now proclaimed it from Islam's holiest point',
    ],
  },

  /* ── Hunayn ──────────────────────────────────────────────── */
  45: {
    title: 'The Battle of Ḥunayn',
    subtitle: 'Numbers Count for Nothing Without Trust in Allah',
    highlight: 'The Prophet Stood Firm',
    location: 'Valley of Ḥunayn — east of Mecca',
    statsLabels: ['Muslim fighters', 'Opposing tribes', 'Year'],
    statsValues: ['12,000 fighters', 'Hawāzin and Thaqīf', '8 AH — shortly after the Conquest of Mecca'],
    keyFiguresEn: [
      { name: 'The Prophet Muḥammad ﷺ', role: 'Remained on his mule alone as thousands fled around him — calling: "I am the Prophet, no lie — I am the son of ʿAbd al-Muṭṭalib"' },
      { name: 'al-ʿAbbās ibn ʿAbd al-Muṭṭalib', role: 'Cried out with his powerful voice at the Prophet\'s command, rallying the fleeing companions back' },
    ],
    hadithsEn: [
      { text: 'al-Barāʾ ibn ʿĀzib said: "By Allah, when the battle became intense we took the Prophet ﷺ as our shield. The bravest of us was he who stood closest to the Messenger of Allah ﷺ."', source: 'Sahih Muslim — Book of Jihad' },
      { text: 'Abu ʿĀmir al-Ashʿarī said: When some new Muslims said before the battle "We will not be defeated today — we are too many," Allah revealed: "Your great number pleased you, but it availed you nothing, and the earth, despite its vastness, was straitened for you." (9:25)', source: 'Sahih Muslim — Book of Military Expeditions' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Allah has already given you victory in many regions and on the day of Hunayn, when your great number pleased you, but it availed you nothing and the earth was straitened for you despite its vastness."', context: 'Allah reminded the believers at Ḥunayn that numbers mean nothing without trust in Him — a lesson for all time' },
    ],
    description:
      'Days after the Conquest of Mecca, 12,000 Muslims marched into the Ḥunayn valley and were ambushed by the Hawāzin and Thaqīf tribes. An initial rout began as the surprise attack stunned the army. The Prophet ﷺ remained on his mule, calling: “I am the Prophet — this is no lie! I am the son of ʿAbd al-Muṭṭalib!” The steadfast rallied, the tide turned, and it became a decisive victory.',
    highlights: [
      'Some new Muslims said beforehand: “We will not be defeated today — we are too many.” Qurʼān 9:25 answered this: “Your great number pleased you”',
      'The Prophet ﷺ stood firm alone on his mule as thousands fled around him — one of the most heroic moments in Islamic history',
      'Abū Sufyān, newly Muslim, said “The magic has been broken today” — then later admitted “I was wrong”',
      'The Prophet ﷺ distributed the spoils so generously that new converts received more than long-standing companions',
    ],
  },

  /* ── Ta\'if siege ─────────────────────────────────────────── */
  46: {
    title: 'The Siege of Ṭāʼif',
    subtitle: 'The Siege of Thaqīf and the Prophet\'s Patience ﷺ',
    highlight: 'Patient Forbearance',
    location: 'Ṭāʼif',
    statsLabels: ['Duration of the siege', 'Outcome', 'When they entered Islam'],
    statsValues: ['18–20 days', 'Siege lifted without conquest', 'Thaqīf embraced Islam voluntarily after a year'],
    keyFiguresEn: [
      { name: 'The Prophet Muḥammad ﷺ', role: 'Refused to curse the Thaqīf who had stoned him out of the city a decade earlier — and prayed: "O Allah, guide the Thaqīf and bring them"' },
    ],
    hadithsEn: [
      { text: 'When the companions asked the Prophet ﷺ to curse the Thaqīf, he raised his hands and said: "O Allah, guide the Thaqīf and bring them to us."', source: 'Sunan al-Tirmidhī — graded ḥasan by al-Albānī; Musnad Aḥmad' },
    ],
    battleTimelineEn: [
      { phase: 'The march to Ṭāʾif after Ḥunayn', detail: 'After the victory at Ḥunayn, the Prophet ﷺ pursued the fleeing Hawāzin and Thaqīf to the walled city of Ṭāʾif — the same city that had driven him out with stones a decade earlier' },
      { phase: 'The siege and the catapults', detail: 'The Muslims used siege equipment including a manjanīq (catapult) for the first time in Islamic warfare. The city was well-fortified and the siege lasted around twenty days without decisive breakthrough' },
      { phase: 'Lifting the siege with wisdom', detail: 'The Prophet ﷺ decided to lift the siege, saying: "Leave them." When asked to curse them he refused, praying instead for their guidance. Within a year the entire Thaqīf tribe sent a delegation to Medina and entered Islam' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And it is He who restrained their hands from you and your hands from them within [the area of] Makkah after He caused you to overcome them."', context: 'Allah\'s mercy was seen in how He gave the Prophet ﷺ the wisdom to lift the siege — and within a year Ṭāʾif entered Islam peacefully, exactly as he had hoped' },
    ],
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
    verse_en: 'And We have not sent you, [O Muhammad], except as a mercy to the worlds.',
    title: 'His Mercy ﷺ',
    subtitle: "'We have not sent you except as a mercy to all the worlds'",
    highlight: 'Mercy to All Worlds',
    hadithsEn: [
      { text: 'The Prophet ﷺ said: "Those who show mercy will be shown mercy by the Most Merciful. Be merciful to those on earth and He who is in Heaven will be merciful to you."', source: 'Sunan al-Tirmidhī — graded ṣaḥīḥ by al-Albānī' },
      { text: 'He ﷺ said about a man who gave water to a thirsty dog: "Allah forgave him his sins for that act." They said: O Messenger of Allah, is there reward for us in [being kind to] animals? He said: "In every living creature there is reward."', source: 'Sahih al-Bukhārī — Book of Watering' },
    ],
    relatedVersesEn: [
      { verse_translation: '"There has certainly come to you a Messenger from among yourselves. Grievous to him is what you suffer; [he is] concerned over you and to the believers is kind and merciful."', context: 'Allah testified to His Prophet\'s ﷺ all-encompassing mercy — a mercy that extended beyond Muslims to all of humanity, and indeed to all creation' },
    ],
    description:
      'A reflection on the defining characteristic of the Prophet ﷺ — his boundless mercy that encompassed enemies and friends, humans and animals, the old and the young. He wept when a companion's camel was overloaded. He forbade the burning of anthills. He said: “Those who show mercy will be shown mercy by the Most Merciful — be merciful to those on earth and He in Heaven will be merciful to you.”',
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
    statsLabels: ['Year', 'Muslim army size', 'Outcome'],
    statsValues: ['9 AH', '30,000 fighters', 'Byzantine army deterred — no confrontation'],
    keyFiguresEn: [
      { name: 'ʿUthmān ibn ʿAffān', role: 'Equipped one-third of the entire army personally with his own wealth — earning the Prophet\'s ﷺ declaration that nothing could harm him after this' },
      { name: 'Abū Bakr al-Ṣiddīq', role: 'Gave all his wealth when asked: "What have you left for your family?" He replied: "Allah and His Messenger"' },
      { name: 'Kaʿb ibn Mālik', role: 'The sincere companion who stayed behind without excuse, was boycotted for fifty days, then pardoned by divine revelation' },
    ],
    hadithsEn: [
      { text: 'Kaʿb ibn Mālik said: "Those fifty days were the most excruciating of my life. When the revelation came forgiving me, I cannot recall a blessing from Allah greater than that my tongue was truthful — that I did not lie to the Prophet ﷺ when I had the chance to lie."', source: 'Sahih al-Bukhārī — Book of Military Expeditions' },
      { text: 'The Prophet ﷺ said about ʿUthmān: "O Allah, be pleased with ʿUthmān — I am pleased with him."', source: 'Sunan al-Tirmidhī — al-Jāmiʿ al-Kabīr' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And [He also forgave] the three who were left behind [and regretted their error] to the point that the earth closed in on them in spite of its vastness and their souls confined them… then He turned to them so they could repent."', context: 'The Qurʾān preserved the story of Kaʿb ibn Mālik and his two companions forever — a lesson in the value of truthfulness and the mercy of Allah toward honest repentance' },
    ],
    description:
      'In the scorching summer of 9 AH, the Prophet ﷺ called for an unprecedented march to the Byzantine frontier — against the world's greatest power. The campaign exposed the hypocrites who refused to go and the three sincere companions who stayed behind out of laziness, were boycotted for fifty days, then forgiven with a Quranic revelation of joy and repentance.',
    fullDescription:
      'News reached Medina that the Byzantine Empire was assembling a vast army on the northern frontier. The Prophet ﷺ made an unusual decision: to announce the expedition openly and publicly call for funding and volunteers, despite the summer heat, drought, and harvest season.\n\nThe response divided the community. The munafiqūn (hypocrites) made excuse after excuse. The faithful gave generously: ʿUthmān ibn ʿAffān equipped a third of the army personally. Abū Bakr gave all his wealth. A poor companion brought only two handfuls of dates — and was mocked by the hypocrites, but the Prophet ﷺ said it was more blessed than all their donations.\n\nThree sincere companions — Kaʼb ibn Mālik, Hilāl ibn Umayyah, and Murārah ibn al-Rabīʼ — stayed behind without justification. The Prophet ﷺ ordered that no one speak to them for fifty days. Kaʼb ibn Mālik later said those fifty days were the most excruciating of his life, yet also the most spiritually transformative. Then Qurʼān 9:118 was revealed forgiving them, and Kaʼb said: “I cannot recall a greater blessing from Allah than that my heart was truthful that day when I did not lie.”',
    highlights: [
      'This was the most expensive and difficult military campaign of the Prophet's life — called “the army of hardship (al-ʼusrah)”',
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
    statsLabels: ['Year sent', 'His roles', 'His distinction'],
    statsValues: ['Year 10 AH', 'Teacher, governor, and judge', 'The most knowledgeable of ḥalāl and ḥarām'],
    keyFiguresEn: [
      { name: 'Muʿādh ibn Jabal', role: 'The Prophet\'s most trusted teacher — sent as governor, judge, and teacher of Yemen; described as the most knowledgeable of ḥalāl and ḥarām' },
    ],
    hadithsEn: [
      { text: 'The Prophet ﷺ said to Muʿādh: "By what will you judge?" He replied: "By the Book of Allah." He asked: "If you do not find it?" He said: "By the Sunnah of the Messenger of Allah." He asked: "If you do not find it?" He said: "I will exercise my own judgment (ijtihād)." The Prophet ﷺ struck his chest and said: "Praise be to Allah who guided the messenger of the Messenger of Allah to what the Messenger of Allah loves."', source: 'Sunan Abī Dāwūd — graded ḥasan by al-Albānī' },
      { text: 'The Prophet ﷺ said: "The most knowledgeable of my community in ḥalāl and ḥarām is Muʿādh ibn Jabal."', source: 'Sunan Ibn Mājah — authenticated by al-Albānī' },
    ],
    relatedVersesEn: [
      { verse_translation: '"And it is not for the believers to go forth [to battle] all at once. For there should separate from every division of them a group [remaining] to obtain understanding in the religion and warn their people when they return to them that they might be cautious."', context: 'Muʿādh\'s mission to Yemen embodied this divine command — a scholar sent to teach, guide, and raise the level of understanding among those who had newly embraced Islam' },
    ],
    description:
      'The Prophet ﷺ appointed Muʼādh ibn Jabal — praised as the most knowledgeable of the companions in ḥalāl and ḥarām — as governor, judge, and teacher of Yemen. As Muʼādh rode away, the Prophet ﷺ walked alongside him and delivered final counsel. Their dialogue about the foundations of judicial reasoning became a cornerstone of Islamic legal theory.',
    highlights: [
      'The Prophet ﷺ walked alongside Muʼādh's riding animal to delay their farewell — showing his love',
      'Their famous exchange: “By what will you judge?” “By the Book of Allah… then the Sunnah… then my own reasoning” — a foundation of Islamic jurisprudence',
      'The Prophet ﷺ said of him: “Muʼādh is the most knowledgeable of the community in ḥalāl and ḥarām”',
      'He served in Yemen until the death of the Prophet ﷺ',
    ],
  },

  /* ── Death of Ibrahim ────────────────────────────────────── */
  50: {
    title: 'The Death of His Son Ibrāhīm ﷺ',
    subtitle: "'The Heart Grieves, the Eye Weeps'",
    highlight: 'Grief and Gratitude',
    statsLabels: ['Age of Ibrāhīm at death', 'His mother', 'Event that coincided'],
    statsValues: ['17 or 18 months', 'Māriyah al-Qibṭiyyah', 'Solar eclipse on the day of his death'],
    keyFiguresEn: [
      { name: 'Ibrāhīm ibn Muḥammad ﷺ', role: 'His last child — son of Māriyah al-Qibṭiyyah; the only child born after the Hijrah; died at sixteen months' },
      { name: 'Māriyah al-Qibṭiyyah', role: 'His mother — given to the Prophet ﷺ as a gift by al-Muqawqis of Egypt; embraced Islam' },
    ],
    hadithsEn: [
      { text: 'The Prophet ﷺ took Ibrāhīm in his arms when he was dying and his eyes filled with tears. ʿAbd al-Raḥmān ibn ʿAwf said: "O Prophet of Allah, even you weep?" He replied: "O Ibn ʿAwf, this is mercy." Then he wept again and said: "The eye weeps and the heart grieves, and we say nothing but what pleases our Lord. Indeed, O Ibrāhīm, we are deeply grieved by your departure."', source: 'Sahih al-Bukhārī — Book of Funerals' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Verily with hardship comes ease. Verily with hardship comes ease."', context: 'The Prophet ﷺ bore the grief of losing his last son — the son he had named after his forefather Ibrāhīm — with the same certainty of divine mercy that he had always lived by' },
    ],
    description:
      'Ibrāhīm, the Prophet's ﷺ son by Māriyah al-Qibṭiyyah, died as an infant of sixteen months. The Prophet ﷺ held him and wept, saying: “The heart grieves and the eye weeps, and we say nothing but what pleases our Lord. Indeed, O Ibrāhīm, we are deeply grieved by your departure.” A solar eclipse that day led some to say it was for Ibrāhīm — the Prophet ﷺ corrected them: “The sun and moon eclipse for no one's birth or death.”',
    highlights: [
      'He combined deep human grief with complete submission: “we say nothing but what pleases our Lord”',
      'He corrected the superstition that the eclipse was connected to his son's death — even in personal tragedy',
      "Ibrāhīm was his last child and the only child born after the Hijrah",
      'His grief over Ibrāhīm showed that prophets feel grief fully — while remaining at peace with divine decree',
    ],
  },

  /* ── Year of Delegations ─────────────────────────────────── */
  51: {
    title: 'The Year of Delegations (ʼcĀm al-Wufūd)',
    subtitle: 'The Arabs Enter Allāh\'s Religion in Multitudes',
    highlight: 'In Multitudes',
    location: 'Medina',
    statsLabels: ['Year', 'Number of delegations', 'Scope'],
    statsValues: ['Year 9 AH', 'More than 70 delegations', 'Unification of the entire Arabian Peninsula'],
    keyFiguresEn: [
      { name: 'The delegation of Thaqīf', role: 'The tribe of Ṭāʾif — who had stoned the Prophet ﷺ out of their city — came as a delegation of faith and entered Islam in 9 AH' },
    ],
    hadithsEn: [
      { text: 'The Prophet ﷺ received each delegation with honor, taught them the pillars of Islam, assigned a teacher to accompany them back, and appointed each tribe\'s leader when appropriate. He said: "The people have entered the religion of Allah in multitudes."', source: 'al-Bidāyah wal-Nihāyah by Ibn Kathīr — Dalāʾil al-Nubuwwah by al-Bayhaqī' },
    ],
    relatedVersesEn: [
      { verse_translation: '"When the victory of Allah has come and the conquest, and you see the people entering into the religion of Allah in multitudes, then exalt [Him] with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of Repentance."', context: 'The Year of Delegations was the living fulfillment of Sūrah al-Naṣr — and those who understood its meaning, like Abū Bakr, recognized it as the Prophet\'s farewell signal' },
    ],
    description:
      'In 9 AH, delegations from tribes across Arabia came to Medina to embrace Islam — fulfilling the Quranic prophecy: “When the help of Allah comes and the conquest, and you see people entering the religion of Allah in multitudes” (110:1-2). Over sixty delegations arrived. The Prophet ﷺ received each with honor, taught them the pillars of Islam, and sent teachers back with them.',
    highlights: [
      'Sūrah al-Naṣr (110) was revealed describing this moment — and is understood as a signal of the approaching end',
      'Tribes who had fought the Prophet ﷺ for years came as delegations of peace and faith',
      'The entire Arabian peninsula was now under one spiritual and political authority',
      'Abū Bakr and others understood this surah as the Prophet's farewell signal',
    ],
  },

  /* ── Farewell Pilgrimage ─────────────────────────────────── */
  52: {
    verse_en: 'This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion.',
    title: 'The Farewell Pilgrimage (Ḥajjat al-Wadāʼ)',
    subtitle: 'One Hundred Thousand Companions at ʿArafat',
    highlight: 'The Eternal Charter',
    location: 'ʿArafat — Mecca',
    statsLabels: ['Number of companions', 'Location of the sermon', 'Year'],
    statsValues: ['More than 100,000', 'Plain of ʿArafat — Mount Raḥmah', '10 AH — 632 CE'],
    keyFiguresEn: [
      { name: 'The Prophet Muḥammad ﷺ', role: 'Delivered the Farewell Sermon — a timeless declaration of human equality, the sanctity of life, the rights of women, and the finality of prophethood' },
      { name: 'Bilāl ibn Rabāḥ', role: 'Repeated the Prophet\'s words to those who could not hear — a human microphone for the greatest sermon in history' },
    ],
    hadithsEn: [
      { text: 'The Prophet ﷺ said in his Farewell Sermon: "O people, your Lord is one and your father is one. An Arab has no superiority over a non-Arab, nor a non-Arab over an Arab, nor white over black, nor black over white — except by piety and good deeds."', source: 'Musnad Aḥmad — authenticated by al-Albānī; cited in al-Bidāyah wal-Nihāyah' },
      { text: 'He ﷺ said: "I leave with you two things — you will never go astray as long as you hold to them: the Book of Allah and the Sunnah of His Prophet." Then he asked: "Have I delivered the message?" They said: "Yes!" He raised his finger to the sky: "O Allah, bear witness — bear witness — bear witness."', source: 'al-Muwaṭṭāʾ of Imām Mālik; Mustadrak al-Ḥākim' },
    ],
    relatedVersesEn: [
      { verse_translation: '"This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as religion."', context: 'The final revelation of the Qurʾān came on the Day of ʿArafah — sealing the prophetic mission and announcing that the religion was now complete' },
    ],
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
    verse_en: 'Muhammad is not but a messenger. [Other] messengers have passed on before him. So if he was to die or be killed, would you turn back on your heels [to unbelief]?',
    title: 'His Death ﷺ',
    subtitle: 'The 12th of Rabīʼ al-Awwal',
    highlight: 'To the Highest Companion',
    location: "Medina — ʼcĀʼisha's Room",
    statsLabels: ['Date of his passing', 'His age', 'Location'],
    statsValues: ['12 Rabīʿ al-Awwal 11 AH', '63 years', "ʿĀʾishah's room — adjacent to the Prophet's Mosque, Medina"],
    keyFiguresEn: [
      { name: 'ʿĀʾishah bint Abī Bakr', role: 'He passed with his head in her lap — she said: "Allah gathered His Prophet\'s final breath with my saliva"' },
      { name: 'Abū Bakr al-Ṣiddīq', role: 'Kissed the Prophet\'s forehead saying "You were beautiful in life and beautiful in death" — then delivered the immortal words from the pulpit that steadied the entire community' },
      { name: 'ʿUmar ibn al-Khaṭṭāb', role: 'His legs gave way beneath him when Abū Bakr recited: "Muhammad is only a messenger — messengers have passed on before him"' },
    ],
    hadithsEn: [
      { text: 'ʿĀʾishah said: "The Messenger of Allah ﷺ passed away while his head was resting between my collarbone and my neck." And she said: "He passed away on the day he was in my house, in my turn, and between my collarbone and my neck."', source: 'Sahih al-Bukhārī — Book of the Virtues of the Companions' },
      { text: 'Abū Bakr said from the pulpit: "Whoever worshipped Muḥammad — Muḥammad has died. But whoever worshipped Allah — Allah is Living and never dies." Then he recited: "And Muḥammad is not but a messenger. Messengers have passed on before him." (3:144) — and ʿUmar\'s legs gave out beneath him.', source: 'Sahih al-Bukhārī — Book of the Prophet\'s Death' },
    ],
    relatedVersesEn: [
      { verse_translation: '"Muhammad is not but a messenger. [Other] messengers have passed on before him. So if he was to die or be killed, would you turn back on your heels [to unbelief]?"', context: 'Abū Bakr recited this verse when the companions were shattered by the news — reminding them that the Prophet ﷺ was mortal, but the One he worshipped is eternal' },
    ],
    description:
      'On Monday the 12th of Rabīʼ al-Awwal, 11 AH (June 8, 632 CE), the Prophet Muḥammad ﷺ passed away in Medina at the age of sixty-three, his head in the lap of his beloved wife ʼcĀʼisha ،. His final whisper: “To the Highest Companion.” ʿUmar refused to believe it — until Abū Bakr spoke from the pulpit: “Whoever worshipped Muḥammad, Muḥammad has died. Whoever worshipped Allah, Allah is living and never dies.”',
    fullDescription:
      'The Prophet ﷺ had fallen ill after returning from the Farewell Pilgrimage. The illness intensified over thirteen days. He continued to lead prayer when he could, and when he could not, he asked Abū Bakr to lead in his place.\n\nIn his final days he asked for water repeatedly and poured it over himself, then lost consciousness, then recovered and asked: “Has Abū Bakr led the people in prayer?” He was told yes. He nodded peacefully. On the last morning, he lifted the curtain of ʼcĀʼisha's room and looked at his companions praying — his face glowed with joy and he smiled. The companions later said that smile was the last gift he gave them.\n\nHe lay back with his head in ʼcĀʼisha's lap. She felt his weight increase. His last words, repeated three times, were: “Al-Rafīq al-Aʼlā — To the Highest Companion.” He chose death over earthly life, as had been offered to him.\n\nʼcĀʼisha said: “He passed between my collarbone and my neck — and how I could wish that I understood what it means to be chosen by Allah.”\n\nWhen the news spread, the companions were shattered. ʿUmar ibn al-Khaṭṭāb, sword drawn, declared he would kill anyone who said the Prophet ﷺ had died. Abū Bakr entered the room, kissed the Prophet's forehead, and said: “You were beautiful in life and beautiful in death.” Then he went to the pulpit and said words that became immortal: “Whoever worshipped Muḥammad, then Muḥammad has died. But whoever worshipped Allah — Allah is Living and never dies.” ʿUmar's legs gave way beneath him.',
    highlights: [
      'His final words: “Al-Rafīq al-Aʼlā — To the Highest Companion” — choosing the divine over the earthly',
      "ʼcĀʼisha said: “Allah gathered His Prophet's final breath with my saliva” — a mercy within a mercy",
      "Abū Bakr's words from the pulpit became one of the most important statements in Islamic history",
      "ʿUmar's legs gave out when Abū Bakr recited: “Muhammad is only a messenger; messengers have passed before him” (3:144)",
      'He was buried in the very room where he died — now within the Prophet's Mosque in Medina',
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
      'The great turning from Mecca to Medina, the founding of the Muslim community, the building of the Prophet's Mosque, and the first written constitution in history',
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
