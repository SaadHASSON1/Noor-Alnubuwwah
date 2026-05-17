import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createRoot } from 'react-dom/client';
import { Info, Swords } from 'lucide-react';

interface MapComponentProps {
  activePeriod: any;
  onSimulateBattle?: (battleId: number) => void;
}

/* Mecca & Medina coordinates */
const MECCA  = [39.8262, 21.4225] as [number, number];

/* Historical Hijra waypoints (rough coastal route) */
const HIJRA_ROUTE: [number, number][] = [
  [39.8262, 21.4225], // Mecca
  [39.5,    22.2],    // heading NW
  [39.0,    22.8],    // Red Sea coast
  [38.6,    23.5],
  [38.8,    24.0],
  [39.6142, 24.4686], // Medina
];

/* Create pulsing Mecca marker element */
const createMeccaMarker = (): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'mecca-marker';
  el.title = 'مكة المكرمة';
  el.innerHTML = `
    <div class="mecca-ring"></div>
    <div class="mecca-ring" style="animation-delay:1.25s"></div>
    <div class="mecca-core"></div>
  `;
  return el;
};

const MapComponent: React.FC<MapComponentProps> = ({ activePeriod, onSimulateBattle }) => {
  const mapContainer  = useRef<HTMLDivElement>(null);
  const map           = useRef<any>(null);
  const markersRef    = useRef<any[]>([]);
  const meccaMarkerRef = useRef<any>(null);
  const rafRef         = useRef<number>(0);

  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;
  mapboxgl.accessToken = MAPBOX_TOKEN;

  /* ── Init map ── */
  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/standard',
      center: [39.8, 22.5],
      zoom: 3,
      pitch: 50,
      bearing: 0,
      projection: 'globe' as any,
    } as any);

    map.current.on('style.load', () => {
      if (!map.current) return;

      try {
        (map.current as any).setConfig({
          lightPreset: 'day',
          showPointOfInterestLabels: true,
          showTransitLabels: false,
          showRoadLabels: false,
          showPlaceLabels: true,
        });
      } catch (_) {}

      /* Terrain */
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512, maxzoom: 14,
      });
      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      /* Warm tint */
      if (!map.current.getLayer('warm-tint')) {
        map.current.addLayer({
          id: 'warm-tint', type: 'background',
          paint: { 'background-color': 'rgba(245,210,160,0.18)', 'background-opacity': 1 },
        }, map.current.getStyle().layers?.[1]?.id);
      }

      /* Atmosphere */
      map.current.setFog({
        'color': 'rgb(240,215,165)',
        'high-color': 'rgb(70,110,190)',
        'horizon-blend': 0.05,
        'space-color': 'rgb(0,0,8)',
        'star-intensity': 0.95,
      });

      /* ── Hijra route ── */
      map.current.addSource('hijra-route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: HIJRA_ROUTE },
        },
      });

      /* glow base line */
      map.current.addLayer({
        id: 'hijra-glow',
        type: 'line',
        source: 'hijra-route',
        paint: {
          'line-color': '#C9A84C',
          'line-width': 6,
          'line-opacity': 0.15,
          'line-blur': 4,
        },
      });

      /* animated dashed line */
      map.current.addLayer({
        id: 'hijra-route-layer',
        type: 'line',
        source: 'hijra-route',
        paint: {
          'line-color': '#C9A84C',
          'line-width': 2,
          'line-opacity': 0.75,
          'line-dasharray': [4, 3],
        },
      });

      /* Animate dash march */
      const dashSeq = [
        [0, 4, 3], [0.5, 4, 2.5], [1, 4, 2], [1.5, 4, 1.5],
        [2, 4, 1], [2.5, 4, 0.5], [3, 4, 0],
        [0, 0.5, 3, 3.5], [0, 1, 3, 3], [0, 1.5, 3, 2.5],
        [0, 2, 3, 2], [0, 2.5, 3, 1.5], [0, 3, 3, 1],
        [0, 3.5, 3, 0.5], [0, 4, 3, 0],
      ];
      let step = 0;
      const animateDash = () => {
        if (!map.current || !map.current.getLayer('hijra-route-layer')) return;
        map.current.setPaintProperty('hijra-route-layer', 'line-dasharray', dashSeq[step % dashSeq.length]);
        step++;
        rafRef.current = requestAnimationFrame(animateDash);
      };
      /* slow it down — fire every 80ms via timestamp */
      let last = 0;
      const throttled = (ts: number) => {
        if (ts - last > 80) { animateDash(); last = ts; }
        else rafRef.current = requestAnimationFrame(throttled);
      };
      rafRef.current = requestAnimationFrame(throttled);

      /* ── Mecca pulsing marker ── */
      const meccaEl = createMeccaMarker();
      meccaMarkerRef.current = new mapboxgl.Marker({ element: meccaEl, anchor: 'center' })
        .setLngLat(MECCA)
        .setPopup(
          new mapboxgl.Popup({ offset: 18 }).setHTML(
            `<div dir="rtl" class="font-amiri">
              <p class="text-islamic-gold text-lg font-bold mb-1">🕋 مكة المكرمة</p>
              <p class="text-xs text-gray-300">مهبط الوحي ومسقط رأس النبي ﷺ</p>
            </div>`
          )
        )
        .addTo(map.current);
    });

    /* ── Custom right-drag rotate / pitch ── */
    const container = mapContainer.current!;
    let isRightDragging = false, lastX = 0, lastY = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 2) return;
      e.preventDefault(); isRightDragging = true; lastX = e.clientX; lastY = e.clientY;
      map.current.dragRotate.disable();
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isRightDragging || !map.current) return;
      const SPEED = 0.18;
      map.current.setBearing(map.current.getBearing() + (e.clientX - lastX) * SPEED);
      map.current.setPitch(Math.max(0, Math.min(85, map.current.getPitch() - (e.clientY - lastY) * SPEED)));
      lastX = e.clientX; lastY = e.clientY;
    };
    const onMouseUp = (e: MouseEvent) => {
      if (e.button !== 2) return; isRightDragging = false; map.current?.dragRotate.enable();
    };
    const onCtxMenu = (e: MouseEvent) => e.preventDefault();

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('contextmenu', onCtxMenu);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('contextmenu', onCtxMenu);
      if (map.current) { map.current.remove(); map.current = null; }
    };
  }, []);

  /* ── Fly to active period + draw markers ── */
  useEffect(() => {
    if (!map.current || !activePeriod) return;

    map.current.flyTo({
      center: [activePeriod.center_lng, activePeriod.center_lat],
      zoom: activePeriod.zoom_level,
      pitch: 65, bearing: -20,
      duration: 6500, essential: true,
      easing: (t: number) => t * (2 - t),
    });

    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    if (!activePeriod.locations?.length) return;

    activePeriod.locations.forEach((loc: any) => {
      const el = document.createElement('div');

      /* type config */
      const cfg: Record<string, { bg: string; icon: string }> = {
        battle: {
          bg: 'bg-red-800',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/></svg>`,
        },
        mountain: {
          bg: 'bg-yellow-900',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>`,
        },
        default: {
          bg: 'bg-islamic-green',
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
        },
      };

      const { bg, icon } = cfg[loc.type] ?? cfg.default;
      el.className = `custom-marker w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-islamic-gold text-white cursor-pointer transition-transform hover:scale-110 ${bg}`;
      el.innerHTML = icon;

      /* popup */
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

      const popup = new mapboxgl.Popup({ offset: 25, closeButton: true }).setDOMContent(popupContent);
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([loc.longitude, loc.latitude])
        .setPopup(popup)
        .addTo(map.current!);
      markersRef.current.push(marker);
    });
  }, [activePeriod, onSimulateBattle]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-islamic-gold/5 mix-blend-overlay z-0" />
    </div>
  );
};

export default MapComponent;
