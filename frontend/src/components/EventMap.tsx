import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MAP_LOCATIONS, PENINSULA_PATH, SINAI_PATH, HIJRA_ROUTE, BATTLE_ROUTES } from '../data/mapData';

interface EventMapProps {
  eventId: number;
  accentColor: string;
  isLight?: boolean;
}

/* ── Per-event configuration ── */
const EVENT_MAP_CONFIG: Record<number, {
  focusId: string;
  showIds: string[];
  routeId?: string;
  isBattle?: boolean;
  battleLabel?: string;
}> = {
  1:  { focusId: 'mecca',      showIds: ['mecca'] },
  2:  { focusId: 'mecca',      showIds: ['mecca', 'medina'] },
  3:  { focusId: 'mecca',      showIds: ['mecca'] },
  4:  { focusId: 'mecca',      showIds: ['mecca'] },
  5:  { focusId: 'mecca',      showIds: ['mecca'] },
  6:  { focusId: 'mecca',      showIds: ['mecca'] },
  7:  { focusId: 'mecca',      showIds: ['mecca'] },
  8:  { focusId: 'mecca',      showIds: ['mecca'] },
  9:  { focusId: 'mecca',      showIds: ['mecca'] },
  10: { focusId: 'medina',     showIds: ['mecca', 'medina'], routeId: 'hijra' },
  11: { focusId: 'badr',       showIds: ['medina', 'badr'], routeId: 'badr-route', isBattle: true, battleLabel: 'غزوة بدر' },
  12: { focusId: 'uhud',       showIds: ['medina', 'uhud'], isBattle: true, battleLabel: 'غزوة أحد' },
  13: { focusId: 'medina',     showIds: ['medina'], isBattle: true, battleLabel: 'غزوة الأحزاب' },
  14: { focusId: 'hudaybiyah', showIds: ['mecca', 'medina', 'hudaybiyah'] },
  15: { focusId: 'mecca',      showIds: ['mecca', 'medina'] },
  16: { focusId: 'mecca',      showIds: ['mecca', 'medina'] },
  17: { focusId: 'mecca',      showIds: ['mecca'] },
  18: { focusId: 'medina',     showIds: ['medina'] },
};

/* Compute a tight viewBox around the shown locations */
function getViewBox(showIds: string[]): string {
  const locs = MAP_LOCATIONS.filter(l => showIds.includes(l.id));
  if (locs.length === 0) return '80 190 280 240';

  const xs = locs.map(l => l.x);
  const ys = locs.map(l => l.y);
  const pad = 80;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const rawW = Math.max(...xs) - Math.min(...xs) + pad * 2;
  const rawH = Math.max(...ys) - Math.min(...ys) + pad * 2;
  /* Keep a minimum window so single-location maps aren't too tight */
  const w = Math.max(rawW, 200);
  const h = Math.max(rawH, 180);
  return `${minX} ${minY} ${w} ${h}`;
}

/* ── Battle simulation: two waves of dots converging ── */
const BattleSimulation: React.FC<{
  focusX: number;
  focusY: number;
  accentColor: string;
  playing: boolean;
}> = ({ focusX, focusY, accentColor, playing }) => {
  /* Muslims come from the east (right), enemies from the west (left) */
  const offset = 38;
  const warriors = [
    /* Muslim side — gold */
    { sx: focusX + offset, sy: focusY - 8,  ex: focusX + 6,  ey: focusY - 8,  color: accentColor,  delay: 0    },
    { sx: focusX + offset, sy: focusY + 8,  ex: focusX + 6,  ey: focusY + 8,  color: accentColor,  delay: 0.12 },
    { sx: focusX + offset, sy: focusY,      ex: focusX + 6,  ey: focusY,      color: accentColor,  delay: 0.06 },
    /* Enemy side — red */
    { sx: focusX - offset, sy: focusY - 8,  ex: focusX - 6,  ey: focusY - 8,  color: '#E05C4B',    delay: 0    },
    { sx: focusX - offset, sy: focusY + 8,  ex: focusX - 6,  ey: focusY + 8,  color: '#E05C4B',    delay: 0.12 },
    { sx: focusX - offset, sy: focusY,      ex: focusX - 6,  ey: focusY,      color: '#E05C4B',    delay: 0.06 },
  ];

  return (
    <g>
      {warriors.map((w, i) => (
        <motion.circle
          key={i}
          r={3.5}
          fill={w.color}
          opacity={0.85}
          initial={{ cx: w.sx, cy: w.sy, opacity: 0 }}
          animate={playing ? {
            cx: [w.sx, w.ex, w.ex],
            cy: [w.sy, w.ey, w.ey],
            opacity: [0, 0.9, 0],
          } : { cx: w.sx, cy: w.sy, opacity: 0 }}
          transition={{
            duration: 2.4,
            delay: w.delay,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        />
      ))}
      {/* Battle flash at impact point */}
      {playing && (
        <motion.circle
          cx={focusX}
          cy={focusY}
          r={12}
          fill={accentColor}
          opacity={0}
          animate={{ opacity: [0, 0.5, 0], r: [6, 16, 6] }}
          transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatDelay: 1.6 }}
        />
      )}
    </g>
  );
};

/* ── Khandaq trench simulation (defenders behind trench line) ── */
const KhandaqSimulation: React.FC<{
  focusX: number;
  focusY: number;
  accentColor: string;
  playing: boolean;
}> = ({ focusX, focusY, accentColor, playing }) => (
  <g>
    {/* Trench line */}
    <motion.line
      x1={focusX - 30} y1={focusY - 5}
      x2={focusX + 30} y2={focusY - 5}
      stroke={accentColor} strokeWidth={1.5} strokeDasharray="4 3"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={playing ? { pathLength: 1, opacity: 0.7 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: 1.2 }}
    />
    {/* Defenders (gold dots) behind trench */}
    {[-14, 0, 14].map((dx, i) => (
      <motion.circle
        key={i}
        cx={focusX + dx} cy={focusY + 12}
        r={3}
        fill={accentColor}
        initial={{ opacity: 0, cy: focusY + 20 }}
        animate={playing ? { opacity: [0, 0.9, 0.9], cy: [focusY + 20, focusY + 12, focusY + 12] } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8 + i * 0.15, repeat: Infinity, repeatDelay: 2.5 }}
      />
    ))}
    {/* Attackers (red) from north */}
    {[-12, 0, 12].map((dx, i) => (
      <motion.circle
        key={`a-${i}`}
        cx={focusX + dx} cy={focusY - 30}
        r={3}
        fill="#E05C4B"
        initial={{ opacity: 0, cy: focusY - 45 }}
        animate={playing ? {
          opacity: [0, 0.85, 0.85, 0],
          cy: [focusY - 45, focusY - 10, focusY - 10, focusY - 45],
        } : { opacity: 0 }}
        transition={{ duration: 2.2, delay: 1.0 + i * 0.1, repeat: Infinity, repeatDelay: 1.0 }}
      />
    ))}
  </g>
);

/* ── Animated route path ── */
const AnimatedRoute: React.FC<{
  path: string;
  color: string;
  playing: boolean;
  delay?: number;
}> = ({ path, color, playing, delay = 0 }) => (
  <motion.path
    d={path}
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeDasharray="6 4"
    strokeLinecap="round"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={playing ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
    transition={{ duration: 2.2, delay, ease: 'easeInOut' }}
  />
);

/* ── Location marker ── */
const LocationMarker: React.FC<{
  loc: typeof MAP_LOCATIONS[0];
  isFocus: boolean;
  accentColor: string;
  playing: boolean;
}> = ({ loc, isFocus, accentColor, playing }) => {
  const color = isFocus ? accentColor : 'rgba(255,255,255,0.5)';
  const r = isFocus ? 5 : 3.5;

  return (
    <g>
      {isFocus && playing && (
        <>
          <motion.circle cx={loc.x} cy={loc.y} r={r}
            fill="none" stroke={color} strokeWidth={1.2} opacity={0.5}
            animate={{ r: [r, r + 14], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.circle cx={loc.x} cy={loc.y} r={r}
            fill="none" stroke={color} strokeWidth={1} opacity={0.3}
            animate={{ r: [r, r + 24], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
          />
        </>
      )}
      <circle cx={loc.x} cy={loc.y} r={r} fill={color} opacity={isFocus ? 0.95 : 0.55} />
      {/* Label */}
      <text
        x={loc.x}
        y={loc.y - r - 5}
        textAnchor="middle"
        fontSize={isFocus ? 10 : 8}
        fill={color}
        opacity={isFocus ? 0.95 : 0.65}
        style={{ fontFamily: 'Scheherazade New, serif', direction: 'rtl' }}
      >
        {loc.arabicName}
      </text>
    </g>
  );
};

/* ════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════ */
const EventMap: React.FC<EventMapProps> = ({ eventId, accentColor, isLight }) => {
  const [playing, setPlaying] = useState(false);

  const config = EVENT_MAP_CONFIG[eventId];
  if (!config) return null;

  const focusLoc = MAP_LOCATIONS.find(l => l.id === config.focusId);
  if (!focusLoc) return null;

  const shownLocs = MAP_LOCATIONS.filter(l => config.showIds.includes(l.id));
  const viewBox = getViewBox(config.showIds);

  /* Find route if any */
  const allRoutes = [HIJRA_ROUTE, ...BATTLE_ROUTES];
  const route = config.routeId ? allRoutes.find(r => r.id === config.routeId) : null;

  const bgColor  = isLight ? '#F5F0E8' : '#050C1A';
  const landColor = isLight ? '#E8DFC8' : '#0F1A2E';
  const seaColor  = isLight ? '#B8D4D0' : '#071220';
  const borderColor = isLight ? '#C8A84C' : '#C9A84C';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-5%' }}
      transition={{ duration: 0.7 }}
      className="mb-12 rounded-2xl overflow-hidden"
      style={{
        background: bgColor,
        border: `1px solid ${accentColor}22`,
        boxShadow: `0 4px 32px ${accentColor}10`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ borderBottom: `1px solid ${accentColor}18` }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: accentColor }}
          />
          <span
            className="font-kufi text-sm"
            style={{ color: accentColor, opacity: 0.8 }}
            dir="rtl"
          >
            الموقع الجغرافي — {focusLoc.arabicName}
          </span>
        </div>
        <motion.button
          onClick={() => setPlaying(p => !p)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="font-kufi text-xs px-3 py-1.5 rounded-full"
          style={{
            color: accentColor,
            background: `${accentColor}15`,
            border: `1px solid ${accentColor}30`,
          }}
          dir="rtl"
        >
          {playing ? 'إيقاف ◼' : (config.isBattle ? '⚔ محاكاة المعركة' : route ? '▶ تشغيل المسار' : '▶ تشغيل')}
        </motion.button>
      </div>

      {/* SVG Map */}
      <div className="relative" style={{ aspectRatio: '4/3' }}>
        <svg
          viewBox={viewBox}
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sea background */}
          <rect x="-100" y="-100" width="1000" height="800" fill={seaColor} />

          {/* Peninsula */}
          <path d={PENINSULA_PATH} fill={landColor} stroke={borderColor} strokeWidth="0.6" opacity="0.9" />
          <path d={SINAI_PATH} fill={landColor} stroke={borderColor} strokeWidth="0.5" opacity="0.8" />

          {/* Subtle grid */}
          <g opacity="0.04" stroke={borderColor} strokeWidth="0.5">
            {[100, 150, 200, 250, 300, 350, 400].map(v => (
              <React.Fragment key={v}>
                <line x1={v} y1="0" x2={v} y2="600" />
                <line x1="0" y1={v} x2="700" y2={v} />
              </React.Fragment>
            ))}
          </g>

          {/* Route animation */}
          {route && (
            <AnimatedRoute path={route.path} color={route.color} playing={playing} />
          )}

          {/* Battle simulation */}
          {config.isBattle && focusLoc.id !== 'medina' && (
            <BattleSimulation
              focusX={focusLoc.x}
              focusY={focusLoc.y}
              accentColor={accentColor}
              playing={playing}
            />
          )}
          {focusLoc.id === 'medina' && config.isBattle && (
            <KhandaqSimulation
              focusX={focusLoc.x}
              focusY={focusLoc.y}
              accentColor={accentColor}
              playing={playing}
            />
          )}

          {/* Location markers */}
          {shownLocs.map(loc => (
            <LocationMarker
              key={loc.id}
              loc={loc}
              isFocus={loc.id === config.focusId}
              accentColor={accentColor}
              playing={playing}
            />
          ))}

          {/* Moving caravan dot for Hijra */}
          {route?.id === 'hijra' && playing && (
            <motion.circle
              r={4}
              fill={accentColor}
              opacity={0.9}
              initial={{ offsetDistance: '0%', opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5 }}
            >
              <animateMotion
                dur="2.4s"
                repeatCount="indefinite"
                path={route.path}
              />
            </motion.circle>
          )}
        </svg>

        {/* Legend bottom-left overlay */}
        <div
          className="absolute bottom-3 right-3 flex flex-col gap-1.5 font-kufi text-xs"
          dir="rtl"
          style={{ color: accentColor, opacity: 0.6 }}
        >
          {route?.id === 'hijra' && (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-px" style={{ background: route.color, borderTop: '1px dashed' }} />
              <span>مسار الهجرة</span>
            </div>
          )}
          {route && route.id !== 'hijra' && (
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-px" style={{ background: route.color, borderTop: '1px dashed' }} />
              <span>مسار الجيش</span>
            </div>
          )}
          {config.isBattle && (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: '#E05C4B' }} />
              <span style={{ color: '#E05C4B' }}>المشركون</span>
              <div className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
              <span>المسلمون</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventMap;
