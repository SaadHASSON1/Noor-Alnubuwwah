import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

import IslamicParticles  from './components/IslamicParticles';
import Hero              from './components/Hero';
import StickyVerse       from './components/StickyVerse';
import EventSection      from './components/EventSection';
import ScrollNav         from './components/ScrollNav';
import ClosingSection    from './components/ClosingSection';
import ChapterSidebar    from './components/ChapterSidebar';

import { SEERAH_EVENTS } from './data/seerah';

/* ── Back-to-top button ── */
function BackToTop() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.12], [0, 0, 1]);
  const scale   = useTransform(scrollYProgress, [0.08, 0.14], [0.6, 1]);

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center rounded-full"
      style={{
        opacity,
        scale,
        width: 46,
        height: 46,
        background: 'rgba(3,8,19,0.88)',
        border: '1px solid rgba(201,168,76,0.45)',
        color: '#C9A84C',
        boxShadow: '0 4px 20px rgba(201,168,76,0.15)',
      }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      aria-label="العودة للأعلى"
    >
      <ChevronUp size={20} strokeWidth={2} />
    </motion.button>
  );
}

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
      <BackToTop />

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
