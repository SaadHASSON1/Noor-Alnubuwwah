import { useState, useEffect } from 'react';
import MapComponent from './components/Map';
import Sidebar from './components/Sidebar';
import BattleSimulationOverlay from './components/BattleSimulationOverlay';
import Search from './components/Search';
import { Search as SearchIcon } from 'lucide-react';

function App() {
  const [periods, setPeriods] = useState<any[]>([]);
  const [activePeriod, setActivePeriod] = useState<any | null>(null);
  const [activeBattle, setActiveBattle] = useState<any | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    // Fetch from FastAPI backend
    fetch('https://api.noor-alnubuwwah.x13labs.com/api/periods')
      .then(res => res.json())
      .then(data => {
        setPeriods(data);
        if(data.length > 0) setActivePeriod(data[0]);
      })
      .catch(err => {
        console.error("Failed to fetch periods. Is the backend running?", err);
        // Fallback or handle error
      });
  }, []);

  const handleSimulateBattle = (battleId: number) => {
    fetch(`https://api.noor-alnubuwwah.x13labs.com/api/battles/${battleId}`)
      .then(res => res.json())
      .then(data => {
        setActiveBattle(data);
      });
  };

  const handleSelectLocationFromSearch = (location: any) => {
    // Find the period this location belongs to
    const period = periods.find(p => p.id === location.period_id);
    if (period) {
      setActivePeriod(period);
    }
    setShowSearch(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-dark-bg text-white rtl">
      <Sidebar periods={periods} activePeriod={activePeriod} setActivePeriod={setActivePeriod} />
      
      <div className="flex-1 relative">
        <MapComponent activePeriod={activePeriod} onSimulateBattle={handleSimulateBattle} />
        
        {/* Search Toggle Button */}
        {!showSearch && (
          <button 
            onClick={() => setShowSearch(true)}
            className="absolute top-4 left-4 z-10 bg-dark-panel p-3 rounded-full shadow-lg border border-islamic-gold/30 hover:bg-islamic-green/20 transition-colors"
          >
            <SearchIcon className="w-6 h-6 text-islamic-gold" />
          </button>
        )}

        {/* Search Overlay */}
        {showSearch && (
          <Search 
            onClose={() => setShowSearch(false)} 
            onSelectLocation={handleSelectLocationFromSearch} 
          />
        )}
      </div>
      
      {activeBattle && (
        <BattleSimulationOverlay 
          battle={activeBattle} 
          onClose={() => setActiveBattle(null)} 
        />
      )}
    </div>
  );
}

export default App;
