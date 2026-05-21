'use client';
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Maximize2, Minimize2, Swords } from 'lucide-react';
import type { BattleSimulation } from '@/data/battleSimulations';

const SVG_W = 800;
const SVG_H = 500;

function px(v: number, max: number) { return (v / 100) * max; }

const TERRAIN_BG: Record<string, string> = {
  desert:   'linear-gradient(180deg, #3d2010 0%, #5a3818 50%, #3d2010 100%)',
  valley:   'linear-gradient(180deg, #12200e 0%, #1e3614 50%, #12200e 100%)',
  mountain: 'linear-gradient(180deg, #141428 0%, #202040 50%, #141428 100%)',
  city:     'linear-gradient(180deg, #141414 0%, #282828 50%, #141414 100%)',
  fortress: 'linear-gradient(180deg, #201010 0%, #341818 50%, #201010 100%)',
  plain:    'linear-gradient(180deg, #0e180e 0%, #162414 50%, #0e180e 100%)',
};

interface Props { sim: BattleSimulation; accentColor: string; }

const BattleSimulator: React.FC<Props> = ({ sim, accentColor }) => {
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalPhases = sim.phases.length;
  const currentPhase = sim.phases[phase];

  const goNext = useCallback(() => {
    setPhase(p => {
      if (p < totalPhases - 1) return p + 1;
      setPlaying(false);
      return p;
    });
  }, [totalPhases]);

  useEffect(() => {
    if (playing) {
      timerRef.current = setTimeout(goNext, 4000 / speed);
    }
    return () => clearTimeout(timerRef.current ?? undefined);
  }, [playing, phase, speed, goNext]);

  const handleReset = () => { setPhase(0); setPlaying(false); };
  const handlePlayPause = () => setPlaying(v => !v);
  const handlePrev = () => { setPhase(p => Math.max(0, p - 1)); setPlaying(false); };
  const handleNext = () => { setPhase(p => Math.min(totalPhases - 1, p + 1)); setPlaying(false); };

  const terrainBg = TERRAIN_BG[sim.terrain] ?? TERRAIN_BG.plain;

  return (
    <div
      className={`rounded-2xl overflow-hidden ${fullscreen ? 'fixed inset-0 z-[200] rounded-none' : 'relative'}`}
      style={{ background: '#0a0d18', border: `1px solid ${accentColor}25` }}
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${accentColor}18` }}>
        <div className="flex items-center gap-2">
          <Swords size={16} style={{ color: accentColor }} />
          <span className="font-noto font-bold text-white" style={{ fontSize: 'clamp(0.9rem,2vw,1.1rem)' }}>
            محاكاة {sim.name}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-kufi text-xs opacity-50" style={{ color: accentColor }}>{sim.terrainLabel}</span>
          <button onClick={() => setFullscreen(v => !v)} style={{ color: accentColor }} className="opacity-60 hover:opacity-100">
            {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* SVG Battlefield */}
      <div className="relative w-full" style={{ background: terrainBg }}>
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          style={{ display: 'block', maxHeight: fullscreen ? '55vh' : '380px' }}
        >
          <defs>
            <marker id={`arrow-m-${sim.eventId}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={sim.muslimColor} opacity="0.8"/>
            </marker>
            <marker id={`arrow-e-${sim.eventId}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={sim.enemyColor} opacity="0.8"/>
            </marker>
            <marker id={`arrow-g-${sim.eventId}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#facc15" opacity="0.8"/>
            </marker>
            <pattern id={`grid-${sim.eventId}`} width="80" height="50" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
            </pattern>
          </defs>

          {/* Grid */}
          <rect width={SVG_W} height={SVG_H} fill={`url(#grid-${sim.eventId})`} />

          {/* Terrain label */}
          <text x={SVG_W/2} y={SVG_H - 12} textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="11" fontFamily="sans-serif">
            {sim.terrainLabel}
          </text>

          {/* Arrows */}
          <AnimatePresence mode="wait">
            {currentPhase.arrows?.map(arr => {
              const x1 = px(arr.x1, SVG_W), y1 = px(arr.y1, SVG_H);
              const x2 = px(arr.x2, SVG_W), y2 = px(arr.y2, SVG_H);
              const isGold = arr.color === '#facc15';
              const isMuslim = arr.color !== '#f87171' && !isGold;
              const markerId = isGold ? `arrow-g-${sim.eventId}` : isMuslim ? `arrow-m-${sim.eventId}` : `arrow-e-${sim.eventId}`;
              return (
                <motion.path
                  key={`${phase}-${arr.id}`}
                  d={`M ${x1} ${y1} L ${x2} ${y2}`}
                  stroke={arr.color}
                  strokeWidth="2.5"
                  strokeDasharray="8 4"
                  fill="none"
                  markerEnd={`url(#${markerId})`}
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 0.8, pathLength: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              );
            })}
          </AnimatePresence>

          {/* Units */}
          {currentPhase.units.map(unit => {
            const cx = px(unit.x, SVG_W);
            const cy = px(unit.y, SVG_H);
            const isMuslim = unit.side === 'muslim';
            const isTerrain = unit.side === 'terrain';
            const r = isTerrain ? 12 : unit.shape === 'star' ? 18 : 28;
            const color = isTerrain ? accentColor : isMuslim ? sim.muslimColor : sim.enemyColor;
            const label = unit.label.length > 8 ? unit.label.slice(0, 8) + '…' : unit.label;
            return (
              <motion.g
                key={`${phase}-${unit.id}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                {isTerrain ? (
                  <polygon
                    points={`${cx},${cy-r} ${cx+r},${cy} ${cx},${cy+r} ${cx-r},${cy}`}
                    fill={`${color}20`}
                    stroke={color}
                    strokeWidth="1.5"
                    opacity={0.9}
                  />
                ) : (
                  <circle
                    cx={cx} cy={cy} r={r}
                    fill={`${color}25`}
                    stroke={color}
                    strokeWidth="2"
                  />
                )}
                {/* Unit count */}
                {unit.count && (
                  <text
                    x={cx} y={cy + 1}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={color} fontSize={r < 20 ? 9 : 11} fontWeight="bold"
                  >
                    {unit.count}
                  </text>
                )}
                {/* Unit label below */}
                <text
                  x={cx} y={cy + r + 14}
                  textAnchor="middle"
                  fill={color} fontSize="10"
                  opacity={0.85}
                  style={{ fontFamily: 'Noto Naskh Arabic, serif' }}
                >
                  {label}
                </text>
              </motion.g>
            );
          })}

          {/* Legend */}
          <g>
            <circle cx="30" cy="22" r="7" fill={`${sim.muslimColor}30`} stroke={sim.muslimColor} strokeWidth="1.5"/>
            <text x="42" y="26" fill={sim.muslimColor} fontSize="10" style={{ fontFamily: 'sans-serif' }}>المسلمون</text>
            <circle cx="130" cy="22" r="7" fill={`${sim.enemyColor}30`} stroke={sim.enemyColor} strokeWidth="1.5"/>
            <text x="142" y="26" fill={sim.enemyColor} fontSize="10" style={{ fontFamily: 'sans-serif' }}>الأعداء</text>
          </g>
        </svg>
      </div>

      {/* Phase info */}
      <div className="px-4 py-3" style={{ borderBottom: `1px solid ${accentColor}15`, minHeight: '100px' }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            {sim.phases.map((_, i) => (
              <button
                key={i}
                onClick={() => { setPhase(i); setPlaying(false); }}
                className="rounded-full transition-all"
                style={{
                  width: i === phase ? 20 : 8,
                  height: 8,
                  background: i === phase ? accentColor : `${accentColor}35`,
                }}
              />
            ))}
          </div>
          <span className="font-kufi text-xs opacity-60" style={{ color: accentColor }}>
            {phase + 1} / {totalPhases}
          </span>
          <span className="font-noto font-bold" style={{ color: accentColor, fontSize: 'clamp(0.9rem,2vw,1.05rem)' }}>
            {currentPhase.title}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="font-noto text-white/70 leading-loose"
            style={{ fontSize: 'clamp(0.82rem,1.6vw,0.95rem)', lineHeight: '1.9' }}
          >
            {currentPhase.description}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 py-3 flex-wrap gap-3">
        {/* Playback buttons */}
        <div className="flex items-center gap-2">
          <button onClick={handleReset} className="opacity-60 hover:opacity-100 transition-opacity" style={{ color: accentColor }}>
            <RotateCcw size={16} />
          </button>
          <button onClick={handlePrev} disabled={phase === 0}
            className="opacity-60 hover:opacity-100 disabled:opacity-20 transition-opacity" style={{ color: accentColor }}>
            <SkipBack size={18} />
          </button>
          <motion.button
            onClick={handlePlayPause}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
            className="flex items-center justify-center rounded-full"
            style={{
              width: 42, height: 42,
              background: playing ? `${accentColor}25` : `${accentColor}15`,
              border: `1.5px solid ${accentColor}50`,
              color: accentColor,
            }}
          >
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </motion.button>
          <button onClick={handleNext} disabled={phase === totalPhases - 1}
            className="opacity-60 hover:opacity-100 disabled:opacity-20 transition-opacity" style={{ color: accentColor }}>
            <SkipForward size={18} />
          </button>
        </div>

        {/* Speed selector */}
        <div className="flex items-center gap-1">
          <span className="font-kufi text-xs opacity-50 mr-1" style={{ color: accentColor }}>السرعة:</span>
          {[0.5, 1, 1.5, 2, 3].map(s => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className="font-kufi text-xs px-2 py-1 rounded-full transition-all"
              style={{
                background: speed === s ? `${accentColor}25` : 'transparent',
                border: `1px solid ${speed === s ? accentColor : `${accentColor}30`}`,
                color: speed === s ? accentColor : `${accentColor}70`,
              }}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattleSimulator;
