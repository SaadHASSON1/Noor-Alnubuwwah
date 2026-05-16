import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import { Info, Swords } from 'lucide-react';

interface MapComponentProps {
  activePeriod: any;
  onSimulateBattle?: (battleId: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ activePeriod, onSimulateBattle }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Note: For production, this should be an environment variable
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN_HERE';

  useEffect(() => {
    if (map.current) return; // initialize map only once

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [39.8, 22.5], // Default center
      zoom: 5,
      pitch: 45,
      bearing: 0,
      projection: 'globe' // Display as a 3D globe initially
    });

    map.current.on('style.load', () => {
      if(!map.current) return;
      
      // Add 3D terrain
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });
      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 2.5 });

      // Add sky layer
      map.current.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });

      // Hide modern layers to create historical feel
      const modernLayers = [
        'road-primary', 'road-secondary', 'road-minor',
        'road-street', 'road-motorway', 'road-trunk',
        'road-label', 'road-number-shield',
        'building', 'building-outline',
        'poi-label', 'transit-label',
        'airport-label', 'motorway-junction',
        'road-pedestrian', 'road-steps',
        'ferry', 'ferry-auto',
        'tunnel-motorway-trunk',
        'national-park', 'landuse'
      ];
      
      modernLayers.forEach(layer => {
        if (map.current?.getLayer(layer)) {
          map.current.setLayoutProperty(layer, 'visibility', 'none');
        }
      });
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || !activePeriod) return;

    // Fly to the active period's center
    map.current.flyTo({
      center: [activePeriod.center_lng, activePeriod.center_lat],
      zoom: activePeriod.zoom_level,
      pitch: 65,
      bearing: -20,
      duration: 2500,
      essential: true,
      easing: (t) => t * (2 - t)
    });

    // Clear previous markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    if (activePeriod.locations && activePeriod.locations.length > 0) {
      activePeriod.locations.forEach((loc: any) => {
        
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'custom-marker w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-islamic-gold text-white cursor-pointer transition-transform hover:scale-110';
        
        // Define color and icon based on location type
        let bgColor = 'bg-islamic-green';
        let icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
        
        if (loc.type === 'battle') {
          bgColor = 'bg-red-800';
          icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/></svg>';
        } else if (loc.type === 'mountain') {
          bgColor = 'bg-yellow-900';
          icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>';
        }

        el.className += ` ${bgColor}`;
        el.innerHTML = icon;

        // Create Popup Content
        const popupContent = document.createElement('div');
        popupContent.className = 'w-64 rtl';
        
        // Since we are creating dynamic HTML for popup, we use react-dom to render into it
        const root = createRoot(popupContent);
        
        const PopupComponent = () => (
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-islamic-gold mb-1 border-b border-islamic-gold/20 pb-1">{loc.name_ar}</h3>
            <p className="text-sm text-gray-200 leading-relaxed">{loc.description_ar}</p>
            
            {loc.is_approximate && (
              <div className="bg-yellow-500/20 text-yellow-300 text-xs p-2 rounded flex items-start gap-1">
                <Info className="w-3 h-3 mt-0.5 shrink-0" />
                <span>الموقع التقريبي بحسب الروايات التاريخية</span>
              </div>
            )}
            
            <p className="text-xs text-gray-400 italic mt-1">المصدر: {loc.source_reference}</p>
            
            {loc.type === 'battle' && onSimulateBattle && loc.battle && (
              <button 
                onClick={() => onSimulateBattle(loc.battle.id)}
                className="mt-3 bg-red-800 hover:bg-red-700 text-white py-2 px-3 rounded text-sm font-bold flex items-center justify-center gap-2 transition-colors w-full"
              >
                <Swords className="w-4 h-4" />
                محاكاة المعركة
              </button>
            )}
          </div>
        );

        root.render(<PopupComponent />);

        const popup = new mapboxgl.Popup({ offset: 25, closeButton: true })
          .setDOMContent(popupContent);

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([loc.longitude, loc.latitude])
          .setPopup(popup)
          .addTo(map.current!);
          
        markersRef.current.push(marker);
      });
    }

  }, [activePeriod, onSimulateBattle]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-islamic-gold/5 mix-blend-overlay z-0"></div>
    </div>
  );
};

export default MapComponent;
