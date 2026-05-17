import { motion } from 'framer-motion';

import IslamicParticles  from './components/IslamicParticles';
import Hero              from './components/Hero';
import StickyVerse       from './components/StickyVerse';
import EventSection      from './components/EventSection';
import ScrollNav         from './components/ScrollNav';
import ClosingSection    from './components/ClosingSection';
import ChapterSidebar    from './components/ChapterSidebar';

import { SEERAH_EVENTS } from './data/seerah';

function App() {
  return (
    <motion.main
      dir="rtl"
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <IslamicParticles />
      <ScrollNav events={SEERAH_EVENTS} />
      <ChapterSidebar events={SEERAH_EVENTS} />

      <Hero />

      <StickyVerse
        verse="وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِلْعَالَمِينَ"
        verseRef="سورة الأنبياء: ١٠٧"
        bg="#05060f"
      />

      {SEERAH_EVENTS.map((event, i) => (
        <EventSection key={event.id} event={event} index={i} />
      ))}

      <ClosingSection />
    </motion.main>
  );
}

export default App;
