import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import MapComponent from './components/Map';
import Sidebar from './components/Sidebar';
import BattleSimulationOverlay from './components/BattleSimulationOverlay';
import Search from './components/Search';
import LoadingScreen from './components/LoadingScreen';
import IslamicParticles from './components/IslamicParticles';
import ArabesqueOverlay from './components/ArabesqueOverlay';
import { Search as SearchIcon } from 'lucide-react';

function App() {
  const [loading, setLoading]         = useState(true);
  const [periods, setPeriods]         = useState<any[]>([]);
  const [activePeriod, setActivePeriod] = useState<any | null>(null);
  const [activeBattle, setActiveBattle] = useState<any | null>(null);
  const [showSearch, setShowSearch]   = useState(false);

  useEffect(() => {
    fetch('https://api.noor-alnubuwwah.x13labs.com/api/periods')
      .then(res => res.json())
      .then(data => {
        setPeriods(data);
        if (data.length > 0) setActivePeriod(data[0]);
      })
      .catch(err => console.error('Failed to fetch periods:', err));
  }, []);

  const handleSimulateBattle = (battleId: number) => {
    fetch(`https://api.noor-alnubuwwah.x13labs.com/api/battles/${battleId}`)
      .then(res => res.json())
      .then(data => setActiveBattle(data));
  };

  const handleSelectLocationFromSearch = (location: any) => {
    const period = periods.find(p => p.id === location.period_id);
    if (period) setActivePeriod(period);
    setShowSearch(false);
  };

  return (
    <>
      {/* ── Loading / intro screen ── */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* ── Main app (renders behind loading screen, fades in after) ── */}
      {!loading && (
        <>
          {/* Global atmosphere layers */}
          <IslamicParticles />
          <ArabesqueOverlay />

          <div className="flex h-screen w-screen overflow-hidden bg-dark-bg text-white rtl relative z-[3]">
            <Sidebar
              periods={periods}
              activePeriod={activePeriod}
              setActivePeriod={setActivePeriod}
            />

            <div className="flex-1 relative">
              <MapComponent activePeriod={activePeriod} onSimulateBattle={handleSimulateBattle} />

              {/* Search toggle */}
              {!showSearch && (
                <button
                  onClick={() => setShowSearch(true)}
                  className="absolute top-4 left-4 z-10 bg-dark-panel/90 p-3 rounded-full shadow-lg border border-islamic-gold/30 hover:bg-islamic-green/20 transition-colors backdrop-blur-sm"
                  style={{ boxShadow: '0 0 12px rgba(201,168,76,0.1)' }}
                >
                  <SearchIcon className="w-5 h-5 text-islamic-gold" />
                </button>
              )}

              {showSearch && (
                <Search
                  onClose={() => setShowSearch(false)}
                  onSelectLocation={handleSelectLocationFromSearch}
                />
              )}
            </div>

            <AnimatePresence>
              {activeBattle && (
                <BattleSimulationOverlay
                  battle={activeBattle}
                  onClose={() => setActiveBattle(null)}
                />
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </>
  );
}

export default App;
