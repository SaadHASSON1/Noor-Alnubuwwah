import React, { useState } from 'react';
import { Search as SearchIcon, MapPin, X } from 'lucide-react';

interface SearchProps {
  onSelectLocation: (location: any) => void;
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ onSelectLocation, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`https://api.noor-alnubuwwah.x13labs.com/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-4 left-4 z-20 w-80 bg-dark-panel rounded-xl border border-islamic-gold/30 shadow-2xl overflow-hidden rtl">
      <div className="p-3 bg-dark-bg border-b border-islamic-gold/20 flex items-center justify-between">
        <form onSubmit={handleSearch} className="flex-1 flex items-center bg-dark-panel rounded-lg px-3 py-2 border border-islamic-gold/10">
          <SearchIcon className="w-4 h-4 text-islamic-gold" />
          <input 
            type="text" 
            placeholder="البحث عن مكان أو حدث..." 
            className="bg-transparent border-none outline-none text-white text-sm mr-2 w-full placeholder-gray-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <button onClick={onClose} className="mr-2 text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {loading && <p className="text-center py-4 text-gray-400 text-sm">جاري البحث...</p>}
        
        {!loading && results.length > 0 && (
          <ul className="divide-y divide-islamic-gold/10">
            {results.map((loc) => (
              <li 
                key={loc.id} 
                className="p-3 hover:bg-islamic-green/20 cursor-pointer transition-colors flex items-start gap-3"
                onClick={() => onSelectLocation(loc)}
              >
                <div className="bg-dark-bg p-2 rounded-full mt-1">
                  <MapPin className="w-4 h-4 text-islamic-gold" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-amiri">{loc.name_ar}</h4>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">{loc.description_ar}</p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!loading && query && results.length === 0 && (
          <p className="text-center py-4 text-gray-400 text-sm">لا توجد نتائج مطابقة</p>
        )}
      </div>
    </div>
  );
};

export default Search;
