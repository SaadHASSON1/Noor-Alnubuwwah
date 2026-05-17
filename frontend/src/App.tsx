import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import LoadingScreen   from './components/LoadingScreen';
import IslamicParticles from './components/IslamicParticles';
import Hero            from './components/Hero';
import StickyVerse     from './components/StickyVerse';
import EventSection    from './components/EventSection';
import ScrollNav       from './components/ScrollNav';
import ClosingSection  from './components/ClosingSection';

import { SEERAH_EVENTS } from './data/seerah';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* ── Loading / intro screen ── */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* ── Main scroll page ── */}
      {!loading && (
        <main dir="rtl" className="relative">

          {/* Golden dust particles — visible on dark sections */}
          <IslamicParticles />

          {/* Side navigation dots */}
          <ScrollNav events={SEERAH_EVENTS} />

          {/* ══ 1. Hero ══ */}
          <Hero />

          {/* ══ 2. Opening verse — Apple sticky zoom ══ */}
          <StickyVerse
            verse="وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ"
            verseRef="سورة الأنبياء: ١٠٧"
            bg="#05060f"
          />

          {/* ══ 3. Seerah timeline events ══ */}
          {SEERAH_EVENTS.map((event, i) => (
            <EventSection key={event.id} event={event} index={i} />
          ))}

          {/* ══ 4. Closing section ══ */}
          <ClosingSection />

        </main>
      )}
    </>
  );
}

export default App;
