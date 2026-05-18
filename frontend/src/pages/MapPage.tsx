import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronRight, Play, RotateCcw, X, MapPin } from 'lucide-react';
import {
  PENINSULA_PATH,
  SINAI_PATH,
  MAP_LOCATIONS,
  HIJRA_ROUTE,
  BATTLE_ROUTES,
  type MapLocation,
} from '../data/mapData';

/* ── Pulsing location marker ── */
const LocationMarker: React.FC<{
  loc: MapLocation;
  selected: boolean;
  onClick: () => void;
}> = ({ loc, selected, onClick }) => {
  const typeColors: Record<string, string> = {
    holy:   '#C9A84C',
    battle: '#E05C4B',
    city:   '#7EC8A4',
  };
  const color = typeColors[loc.type] ?? '#C9A84C';
  const r = loc.type === 'holy' ? 7 : 5;

  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* Pulse ring */}
      <motion.circle
        cx={loc.x} cy={loc.y} r={r + 6}
        fill="none" stroke={color} strokeWidth="1"
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ opacity: 0, scale: 1.8 }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: Math.random() * 2 }}
      />
      {/* Outer ring */}
      {selected && (
        <circle cx={loc.x} cy={loc.y} r={r + 4} fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      )}
      {/* Main dot */}
      <motion.circle
        cx={loc.x} cy={loc.y} r={r}
        fill={color}
        stroke="rgba(250,240,210,0.9)"
        strokeWidth={selected ? 2 : 1.5}
        whileHover={{ scale: 1.3 }}
        animate={{ scale: selected ? 1.25 : 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      {/* Center dot for holy cities */}
      {loc.type === 'holy' && (
        <circle cx={loc.x} cy={loc.y} r={2.5} fill="rgba(250,240,210,0.9)" />
      )}
    </g>
  );
};

/* ── Arabic label for a location ── */
const MapLabel: React.FC<{ loc: MapLocation; selected: boolean }> = ({ loc, selected }) => {
  const offsetX = loc.x > 300 ? -10 : 10;
  const anchor = loc.x > 300 ? 'end' : 'start';
  return (
    <text
      x={loc.x + offsetX}
      y={loc.y + 4}
      textAnchor={anchor}
      fontSize={selected ? '11' : '10'}
      fontFamily="Scheherazade New, serif"
      fill={selected ? '#C9A84C' : 'rgba(80,55,20,0.85)'}
      fontWeight={selected ? 'bold' : 'normal'}
      style={{ pointerEvents: 'none', userSelect: 'none' }}
    >
      {loc.arabicName}
    </text>
  );
};

/* ── Animated route path ── */
const AnimatedRoute: React.FC<{
  route: { path: string; color: string; arabicName: string };
  playing: boolean;
  dashed?: boolean;
}> = ({ route, playing, dashed = false }) => (
  <motion.path
    d={route.path}
    stroke={route.color}
    strokeWidth={dashed ? 2 : 2.5}
    fill="none"
    strokeDasharray={dashed ? '6 5' : '8 5'}
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: playing ? 1 : 0, opacity: playing ? 1 : 0 }}
    transition={{ duration: dashed ? 2 : 3.5, ease: 'easeInOut', delay: dashed ? 1 : 0 }}
  />
);

const MapPage: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<MapLocation | null>(null);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(false);
  const playTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePlay = () => {
    setPlaying(true);
    setPlayed(true);
    if (playTimeout.current) clearTimeout(playTimeout.current);
  };

  const handleReset = () => {
    setPlaying(false);
    setPlayed(false);
    if (playTimeout.current) clearTimeout(playTimeout.current);
    setTimeout(() => {}, 50);
  };

  const handleMarkerClick = (loc: MapLocation) => {
    setSelected(prev => prev?.id === loc.id ? null : loc);
  };

  const typeLabel: Record<string, string> = {
    holy:   'مدينة مقدسة',
    battle: 'موقع معركة',
    city:   'مدينة تاريخية',
  };

  const typeColor: Record<string, string> = {
    holy:   '#C9A84C',
    battle: '#E05C4B',
    city:   '#7EC8A4',
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ background: '#030813' }}>

      {/* ── Top bar ── */}
      <div
        className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ background: 'rgba(3,8,19,0.9)', borderBottom: '1px solid rgba(201,168,76,0.12)' }}
      >
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-kufi" style={{ color: '#C9A84C' }}>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"
          >
            <Home size={14} />
            الرئيسية
          </button>
          <ChevronRight size={14} className="opacity-40" />
          <span className="opacity-90">الخريطة التفاعلية</span>
        </nav>

        {/* Title */}
        <h1 className="font-noto font-bold text-islamic-gold hidden md:block" style={{ fontSize: '1.3rem' }}>
          خريطة السيرة النبوية
        </h1>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {!played ? (
            <motion.button
              onClick={handlePlay}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-kufi text-sm"
              style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C' }}
            >
              <Play size={14} fill="#C9A84C" strokeWidth={0} />
              تشغيل المسارات
            </motion.button>
          ) : (
            <motion.button
              onClick={handleReset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-kufi text-sm"
              style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C' }}
            >
              <RotateCcw size={13} strokeWidth={2} />
              إعادة
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden" style={{ minHeight: 0 }}>

        {/* Map SVG */}
        <div className="flex-1 relative overflow-hidden" style={{ background: '#8AADAA' }}>

          {/* Parchment texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(240,220,170,0.04) 0%, transparent 70%)',
            }}
          />

          <svg
            viewBox="0 0 700 560"
            className="w-full h-full"
            style={{ display: 'block' }}
          >
            <defs>
              {/* Parchment filter */}
              <filter id="parchment">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noiseOut" />
                <feDisplacementMap in="SourceGraphic" in2="noiseOut" scale="2" xChannelSelector="R" yChannelSelector="G" />
              </filter>
              {/* Glow filter */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Sea background */}
            <rect width="700" height="560" fill="#7EAAA8" />

            {/* Sea subtle pattern */}
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={i}
                x1="0" y1={i * 40} x2="700" y2={i * 40}
                stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 18 }).map((_, i) => (
              <line
                key={i}
                x1={i * 40} y1="0" x2={i * 40} y2="560"
                stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"
              />
            ))}

            {/* Sinai peninsula */}
            <path
              d={SINAI_PATH}
              fill="#E5D4A8"
              stroke="#B8965A"
              strokeWidth="0.8"
              opacity="0.85"
            />

            {/* Arabian Peninsula */}
            <path
              d={PENINSULA_PATH}
              fill="#EADCB2"
              stroke="#A07830"
              strokeWidth="1.2"
              opacity="0.92"
              filter="url(#parchment)"
            />

            {/* Peninsula inner shadow / terrain feel */}
            <path
              d={PENINSULA_PATH}
              fill="none"
              stroke="#C4A055"
              strokeWidth="3"
              opacity="0.12"
              strokeLinejoin="round"
            />

            {/* Red Sea label */}
            <text x="60" y="320" fontSize="9" fill="rgba(250,248,240,0.45)" fontFamily="Scheherazade New, serif"
              transform="rotate(-75 60 320)" style={{ userSelect: 'none' }}>
              البحر الأحمر
            </text>

            {/* Arabian Sea label */}
            <text x="390" y="510" fontSize="9" fill="rgba(250,248,240,0.45)" fontFamily="Scheherazade New, serif"
              style={{ userSelect: 'none' }}>
              بحر العرب
            </text>

            {/* Persian Gulf label */}
            <text x="450" y="185" fontSize="8.5" fill="rgba(250,248,240,0.4)" fontFamily="Scheherazade New, serif"
              style={{ userSelect: 'none' }}>
              الخليج العربي
            </text>

            {/* Battle routes */}
            {playing && BATTLE_ROUTES.map(r => (
              <AnimatedRoute key={r.id} route={r} playing={playing} dashed />
            ))}

            {/* Hijra route — main animated path */}
            <AnimatedRoute route={HIJRA_ROUTE} playing={playing} />

            {/* Hijra route label */}
            {playing && (
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                x="135" y="295"
                fontSize="8.5"
                fill="#C9A84C"
                fontFamily="Scheherazade New, serif"
                style={{ userSelect: 'none' }}
              >
                طريق الهجرة ﷺ
              </motion.text>
            )}

            {/* Location labels (shown always) */}
            {MAP_LOCATIONS.map(loc => (
              <MapLabel key={loc.id} loc={loc} selected={selected?.id === loc.id} />
            ))}

            {/* Location markers */}
            {MAP_LOCATIONS.map(loc => (
              <LocationMarker
                key={loc.id}
                loc={loc}
                selected={selected?.id === loc.id}
                onClick={() => handleMarkerClick(loc)}
              />
            ))}
          </svg>

          {/* Legend */}
          <div
            className="absolute bottom-4 left-4 rounded-xl px-4 py-3 text-xs font-kufi space-y-1.5 z-20"
            style={{ background: 'rgba(3,8,19,0.82)', border: '1px solid rgba(201,168,76,0.18)', backdropFilter: 'blur(6px)' }}
          >
            {[
              { color: '#C9A84C', label: 'مدينة مقدسة' },
              { color: '#E05C4B', label: 'موقع معركة' },
              { color: '#7EC8A4', label: 'مدينة تاريخية' },
              { color: '#C9A84C', label: 'مسار الهجرة', dashed: true },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                {item.dashed ? (
                  <svg width="20" height="6">
                    <line x1="0" y1="3" x2="20" y2="3" stroke={item.color} strokeWidth="1.5" strokeDasharray="4 3" />
                  </svg>
                ) : (
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />
                )}
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Tap hint */}
          {!played && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 font-kufi text-xs px-3 py-1.5 rounded-full z-20"
              style={{ background: 'rgba(3,8,19,0.75)', color: 'rgba(201,168,76,0.65)', border: '1px solid rgba(201,168,76,0.2)' }}
            >
              اضغط على أي موقع لمعرفة تفاصيله
            </motion.div>
          )}
        </div>

        {/* ── Info panel ── */}
        <div
          className="w-full md:w-80 flex-shrink-0 flex flex-col overflow-y-auto"
          style={{ background: 'rgba(8,16,36,0.98)', borderRight: '1px solid rgba(201,168,76,0.1)' }}
        >
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.28 }}
                className="p-6 flex-1"
                dir="rtl"
              >
                {/* Close */}
                <div className="flex items-start justify-between mb-5">
                  <button
                    onClick={() => setSelected(null)}
                    className="opacity-30 hover:opacity-60 transition-opacity mt-1"
                  >
                    <X size={16} color="white" />
                  </button>
                  <span
                    className="font-kufi text-xs px-3 py-1 rounded-full"
                    style={{
                      color: typeColor[selected.type],
                      background: `${typeColor[selected.type]}15`,
                      border: `1px solid ${typeColor[selected.type]}30`,
                    }}
                  >
                    {typeLabel[selected.type]}
                  </span>
                </div>

                {/* Location icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background: `${typeColor[selected.type]}18`,
                    border: `1px solid ${typeColor[selected.type]}35`,
                  }}
                >
                  <MapPin size={22} color={typeColor[selected.type]} strokeWidth={1.5} />
                </div>

                {/* Name */}
                <h2
                  className="font-noto font-bold mb-1"
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', color: typeColor[selected.type] }}
                >
                  {selected.arabicName}
                </h2>
                {selected.subtitle && (
                  <p className="font-kufi text-xs mb-4 opacity-55" style={{ color: typeColor[selected.type] }}>
                    {selected.subtitle}
                  </p>
                )}

                {/* Year */}
                {selected.year && (
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4"
                    style={{ background: `${typeColor[selected.type]}0f`, border: `1px solid ${typeColor[selected.type]}20` }}
                  >
                    <span className="font-noto font-bold text-sm" style={{ color: typeColor[selected.type] }}>
                      {selected.year}
                    </span>
                    <span className="text-white/30 text-xs font-kufi">هجرية</span>
                  </div>
                )}

                {/* Divider */}
                <div className="h-px w-full mb-4 opacity-15" style={{ background: typeColor[selected.type] }} />

                {/* Description */}
                <p className="text-sm leading-loose" style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 2 }}>
                  {selected.description}
                </p>

                {/* Navigate button */}
                {selected.chapterName && (
                  <motion.button
                    onClick={() => navigate(`/chapter/${encodeURIComponent(selected.chapterName!)}`)}
                    className="mt-6 w-full py-3 rounded-xl font-kufi text-sm"
                    style={{
                      color: typeColor[selected.type],
                      border: `1px solid ${typeColor[selected.type]}35`,
                      background: `${typeColor[selected.type]}0d`,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    عرض أحداث الفصل
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 flex-1 flex flex-col justify-between"
                dir="rtl"
              >
                {/* Header */}
                <div>
                  <p className="font-kufi text-islamic-gold/40 text-xs tracking-widest mb-2">الخريطة التفاعلية</p>
                  <h2
                    className="font-noto font-bold text-islamic-gold mb-4"
                    style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}
                  >
                    جغرافيا السيرة النبوية
                  </h2>
                  <p className="text-sm leading-loose text-white/35">
                    استكشف مواقع الأحداث التاريخية التي شكّلت مسيرة الدعوة الإسلامية في شبه الجزيرة العربية.
                  </p>

                  <div className="mt-6 space-y-2">
                    {MAP_LOCATIONS.map(loc => (
                      <button
                        key={loc.id}
                        onClick={() => setSelected(loc)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-right hover:bg-white/[0.04] transition-colors"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: typeColor[loc.type] }}
                        />
                        <span className="font-noto text-sm text-white/60 truncate">{loc.arabicName}</span>
                        {loc.year && (
                          <span className="font-kufi text-xs opacity-35 mr-auto flex-shrink-0" style={{ color: typeColor[loc.type] }}>
                            {loc.year}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom hint */}
                {!played && (
                  <div
                    className="mt-6 p-4 rounded-xl text-center"
                    style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.18)' }}
                  >
                    <p className="font-kufi text-islamic-gold/50 text-xs leading-loose">
                      اضغط "تشغيل المسارات" لمشاهدة طريق الهجرة النبوية متحركاً
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
