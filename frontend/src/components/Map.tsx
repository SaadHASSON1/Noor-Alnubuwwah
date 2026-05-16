import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createRoot } from 'react-dom/client';
import { Info, Swords } from 'lucide-react';

interface MapComponentProps {
  activePeriod: any;
  onSimulateBattle?: (battleId: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ activePeriod, onSimulateBattle }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Note: For production, this should be an environment variable
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;
  mapboxgl.accessToken = MAPBOX_TOKEN;

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [39.8, 22.5],
      zoom: 3,
      pitch: 45,
      bearing: 0,
      projection: 'globe' as any
    } as any);

    map.current.on('style.load', () => {
      if (!map.current) return;

      // 3D terrain
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 14
      });
      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Atmosphere: warm desert tones + starry space
      map.current.setFog({
        'color': 'rgb(230, 205, 155)',
        'high-color': 'rgb(70, 110, 190)',
        'horizon-blend': 0.05,
        'space-color': 'rgb(0, 0, 8)',
        'star-intensity': 0.95
      });
    });

    // ── Custom right-click rotate/pitch (slow + correct direction) ────────
    const container = mapContainer.current!;
    let isRightDragging = false;
    let lastX = 0;
    let lastY = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 2) {
        e.preventDefault();
        isRightDragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        map.current.dragRotate.disable();
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isRightDragging || !map.current) return;
      const SPEED = 0.18;
      const dx = (e.clientX - lastX) * SPEED;
      const dy = (e.clientY - lastY) * SPEED;
      // +dx  →  drag right = rotate clockwise (correct)
      // -dy  →  drag up    = increase pitch   (correct)
      map.current.setBearing(map.current.getBearing() + dx);
      map.current.setPitch(Math.max(0, Math.min(85, map.current.getPitch() - dy)));
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 2) {
        isRightDragging = false;
        map.current?.dragRotate.enable();
      }
    };

    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('contextmenu', onContextMenu);

    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('contextmenu', onContextMenu);
      if (map.current) { map.current.remove(); map.current = null; }
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
      duration: 6500,
      essential: true,
      easing: (t: number) => t * (2 - t)
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
        
        const root = createRoot(popupContent);
        
        const PopupComponent = () => (
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-islamic-gold mb-1 border-b border-islamic-gold/20 pb-1 font-amiri">{loc.name_ar}</h3>
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
