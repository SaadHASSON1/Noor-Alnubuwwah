'use client';
import React from 'react';
import type { SeerahEvent } from '@/data/seerah';

type EventType = SeerahEvent['type'];

const C = '#C9A84C'; // gold
const D = '#7A5A14'; // dark gold (for light-bg sections)

/* ─────────────────────────────────────
   ⚔️  BATTLE — crossed swords + shield
   ───────────────────────────────────── */
const BattleIllustration: React.FC = () => (
  <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Sword 1 — rotate 45° (goes /) */}
    <g transform="rotate(45 250 250)" stroke={C} fill={C}>
      {/* blade */}
      <polygon points="250,35 257,255 243,255" />
      {/* guard */}
      <rect x="208" y="251" width="84" height="13" rx="5" />
      {/* handle */}
      <rect x="241" y="264" width="18" height="82" rx="6" />
      {/* pommel */}
      <circle cx="250" cy="360" r="14" />
    </g>

    {/* Sword 2 — rotate -45° (goes \) */}
    <g transform="rotate(-45 250 250)" stroke={C} fill={C}>
      <polygon points="250,35 257,255 243,255" />
      <rect x="208" y="251" width="84" height="13" rx="5" />
      <rect x="241" y="264" width="18" height="82" rx="6" />
      <circle cx="250" cy="360" r="14" />
    </g>

    {/* Shield */}
    <path d="M250,188 L305,212 L305,268 Q305,318 250,345 Q195,318 195,268 L195,212 Z"
      stroke={C} strokeWidth="5" fill="none" />
    <path d="M250,204 L291,224 L291,268 Q291,306 250,328 Q209,306 209,268 L209,224 Z"
      stroke={C} strokeWidth="2" fill="none" opacity="0.5" />
    {/* Islamic 8-point star in shield */}
    <polygon
      points="250,222 254,236 268,236 257,244 261,258 250,251 239,258 243,244 232,236 246,236"
      fill={C} opacity="0.9"
    />
  </svg>
);

/* ─────────────────────────────────────
   ✨  REVELATION — radiating light
   ───────────────────────────────────── */
const RevelationIllustration: React.FC = () => {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 22.5 * Math.PI) / 180;
    const r1 = 46;
    const r2 = i % 2 === 0 ? 230 : 185;
    return {
      x1: 250 + Math.cos(angle) * r1, y1: 250 + Math.sin(angle) * r1,
      x2: 250 + Math.cos(angle) * r2, y2: 250 + Math.sin(angle) * r2,
      thick: i % 2 === 0,
    };
  });
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[215, 165, 115, 70, 35].map((r, i) => (
        <circle key={i} cx="250" cy="250" r={r} stroke={C}
          strokeWidth={3 - i * 0.45} opacity={0.9 - i * 0.14} />
      ))}
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke={C} strokeWidth={r.thick ? 3 : 1.5} strokeLinecap="round"
          opacity={r.thick ? 0.9 : 0.45} />
      ))}
      <circle cx="250" cy="250" r="14" fill={C} />
      <circle cx="250" cy="250" r="6" fill="#FFE082" />
    </svg>
  );
};

/* ─────────────────────────────────────
   🌙  BIRTH — crescent + stars
   ───────────────────────────────────── */
const BirthIllustration: React.FC = () => {
  const stars = [
    {x:75,y:75,r:9}, {x:425,y:95,r:6}, {x:445,y:295,r:8},
    {x:55,y:345,r:5}, {x:385,y:430,r:7}, {x:115,y:435,r:4},
    {x:345,y:55,r:5}, {x:75,y:195,r:4}, {x:455,y:195,r:6}, {x:185,y:55,r:4},
  ];
  const star4 = (x: number, y: number, r: number) =>
    `M${x},${y-r} L${x+r*0.3},${y-r*0.3} L${x+r},${y} L${x+r*0.3},${y+r*0.3} L${x},${y+r} L${x-r*0.3},${y+r*0.3} L${x-r},${y} L${x-r*0.3},${y-r*0.3} Z`;

  return (
    <svg viewBox="0 0 500 500" fill={C} xmlns="http://www.w3.org/2000/svg">
      {/* Crescent */}
      <path d="M250,58 A192,192 0 1,1 250,442 A142,142 0 1,0 250,58" />
      {/* Stars */}
      {stars.map((s, i) => <path key={i} d={star4(s.x, s.y, s.r)} />)}
    </svg>
  );
};

/* ─────────────────────────────────────
   🐪  HIJRA — night journey / dunes
   ───────────────────────────────────── */
const HijraIllustration: React.FC = () => {
  const dots = [{x:80,y:78},{x:155,y:48},{x:310,y:58},{x:405,y:102},{x:455,y:52}];
  const steps = [{x:88,y:325},{x:135,y:338},{x:205,y:328},{x:265,y:312},{x:325,y:304},{x:395,y:316}];
  return (
    <svg viewBox="0 0 500 500" fill="none" stroke={C} strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      {/* Stars in night sky */}
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={3} fill={C} />)}
      {/* Moon */}
      <path d="M390,90 A52,52 0 1,1 390,194 A37,37 0 1,0 390,90" fill={C} />
      {/* Desert dunes */}
      <path d="M0,385 Q125,305 250,385 Q375,465 500,385" strokeWidth="4" opacity="0.9" />
      <path d="M0,430 Q100,360 200,408 Q300,456 400,388 Q450,360 500,378" strokeWidth="2.5" opacity="0.55" />
      {/* Journey path (dotted) */}
      <path d="M45,345 Q95,312 150,332 Q200,352 252,322 Q302,292 355,312 Q405,332 458,302"
        strokeWidth="3" strokeDasharray="11,9" opacity="0.85" />
      {/* Footsteps along path */}
      {steps.map((f, i) => (
        <ellipse key={i} cx={f.x} cy={f.y} rx="5" ry="3" fill={C}
          transform={`rotate(${i % 2 === 0 ? -20 : 20} ${f.x} ${f.y})`} />
      ))}
    </svg>
  );
};

/* ─────────────────────────────────────
   📜  TREATY — parchment scroll
   ───────────────────────────────────── */
const TreatyIllustration: React.FC = () => (
  <svg viewBox="0 0 500 500" fill="none" stroke={C} strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
    {/* Scroll body */}
    <rect x="118" y="122" width="264" height="256" rx="14" strokeWidth="4.5" />
    {/* Top rolled edge */}
    <ellipse cx="250" cy="122" rx="132" ry="24" strokeWidth="4.5" />
    <ellipse cx="250" cy="122" rx="115" ry="16" strokeWidth="2" opacity="0.45" />
    {/* Bottom rolled edge */}
    <ellipse cx="250" cy="378" rx="132" ry="24" strokeWidth="4.5" />
    <ellipse cx="250" cy="378" rx="115" ry="16" strokeWidth="2" opacity="0.45" />
    {/* Arabic-style text lines (slightly wavy) */}
    {[168, 200, 228, 256, 284, 316].map((y, i) => (
      <line key={i} x1={152} y1={y} x2={i % 3 === 2 ? 312 : 348} y2={y} strokeWidth="4.5" opacity="0.75" />
    ))}
    {/* Wax seal */}
    <circle cx="250" cy="254" r="33" strokeWidth="3" />
    <circle cx="250" cy="254" r="21" fill={C} opacity="0.5" />
    {/* Small star in seal */}
    <polygon points="250,242 253,251 263,251 255,256 258,265 250,260 242,265 245,256 237,251 247,251"
      fill={C} />
  </svg>
);

/* ─────────────────────────────────────
   ⭐  VICTORY — radiant 8-point star
   ───────────────────────────────────── */
const VictoryIllustration: React.FC = () => {
  const outerDots = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 * Math.PI) / 180;
    return { cx: 250 + Math.cos(a) * 188, cy: 250 + Math.sin(a) * 188 };
  });
  return (
    <svg viewBox="0 0 500 500" fill="none" stroke={C} xmlns="http://www.w3.org/2000/svg">
      {/* Outer 8-pointed star fill */}
      <polygon
        points="250,45 282,162 395,128 322,222 425,250 322,278 395,372 282,338 250,455 218,338 105,372 178,278 75,250 178,222 105,128 218,162"
        fill={C} opacity="0.35" strokeWidth="2"
      />
      {/* Inner star outline */}
      <polygon
        points="250,138 265,204 328,186 290,236 358,250 290,264 328,314 265,296 250,362 235,296 172,314 210,264 142,250 210,236 172,186 235,204"
        strokeWidth="3"
      />
      {/* Outer dots */}
      {outerDots.map((d, i) => <circle key={i} cx={d.cx} cy={d.cy} r={6} fill={C} />)}
      {/* Center */}
      <circle cx="250" cy="250" r="32" fill={C} />
      <circle cx="250" cy="250" r="16" fill="#FFE082" opacity="0.9" />
    </svg>
  );
};

/* ─────────────────────────────────────
   🏔️  FAREWELL — Jabal Arafat + crowd
   ───────────────────────────────────── */
const FarewellIllustration: React.FC = () => {
  const sunRays = Array.from({ length: 12 }, (_, i) => {
    const a = ((i * 30 - 90) * Math.PI) / 180;
    const r1 = 42, r2 = i % 3 === 0 ? 115 : 80;
    return {
      x1: 250 + Math.cos(a) * r1, y1: 148 + Math.sin(a) * r1,
      x2: 250 + Math.cos(a) * r2, y2: 148 + Math.sin(a) * r2,
      thick: i % 3 === 0,
    };
  });
  const crowd = Array.from({ length: 40 }, (_, i) => ({
    cx: 30 + (i % 20) * 23 + (Math.floor(i / 20) % 2) * 11,
    cy: 438 + Math.floor(i / 20) * 18,
  }));
  return (
    <svg viewBox="0 0 500 500" fill="none" stroke={C} strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      {/* Sun rays */}
      {sunRays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          strokeWidth={r.thick ? 3 : 1.5} opacity={r.thick ? 0.9 : 0.5} />
      ))}
      <circle cx="250" cy="148" r="32" strokeWidth="3.5" />

      {/* Mountain */}
      <path d="M25,420 L140,225 L172,262 L222,168 L250,92 L278,168 L328,262 L360,225 L475,420 Z"
        fill={C} fillOpacity="0.35" strokeWidth="3.5" />
      {/* Horizon line */}
      <line x1="0" y1="420" x2="500" y2="420" strokeWidth="2" opacity="0.4" />
      {/* Crowd dots */}
      {crowd.map((d, i) => <circle key={i} cx={d.cx} cy={d.cy} r={3.5} fill={C} opacity="0.65" />)}
    </svg>
  );
};

/* ─────────────────────────────────────
   🌅  DEATH — peaceful concentric light
   ───────────────────────────────────── */
const DeathIllustration: React.FC<{ light?: boolean }> = ({ light }) => {
  const color = light ? D : C;
  const softRays = Array.from({ length: 20 }, (_, i) => {
    const a = (i * 18 * Math.PI) / 180;
    return {
      x1: 250 + Math.cos(a) * 58, y1: 250 + Math.sin(a) * 58,
      x2: 250 + Math.cos(a) * 218, y2: 250 + Math.sin(a) * 218,
    };
  });
  return (
    <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Concentric circles */}
      {[210, 168, 126, 84, 48].map((r, i) => (
        <circle key={i} cx="250" cy="250" r={r} stroke={color}
          strokeWidth={2.5 - i * 0.35} opacity={0.7 - i * 0.1} />
      ))}
      {/* Soft rays */}
      {softRays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
          stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      ))}
      {/* Crescent */}
      <path d="M250,118 A92,92 0 1,1 250,382 A67,67 0 1,0 250,118"
        fill={color} opacity="0.55" />
      {/* Center */}
      <circle cx="250" cy="250" r="19" fill={color} opacity="0.7" />
    </svg>
  );
};

/* ─────────────────────────────────────
   🔷  LIFE (default) — Islamic geometry
   ───────────────────────────────────── */
const LifeIllustration: React.FC = () => {
  const outerCircles = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 * Math.PI) / 180;
    return { cx: 250 + Math.cos(a) * 160, cy: 250 + Math.sin(a) * 160 };
  });
  return (
    <svg viewBox="0 0 500 500" fill="none" stroke={C} xmlns="http://www.w3.org/2000/svg">
      <circle cx="250" cy="250" r="220" strokeWidth="2" opacity="0.35" />
      <circle cx="250" cy="250" r="160" strokeWidth="1.5" opacity="0.4" />
      <circle cx="250" cy="250" r="100" strokeWidth="1.5" opacity="0.5" />
      {outerCircles.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="42" strokeWidth="1.5" opacity="0.45" />
      ))}
      {/* 8-pointed star outline */}
      <path
        d="M250,148 L265,208 L328,188 L288,240 L358,250 L288,260 L328,312 L265,292 L250,352 L235,292 L172,312 L212,260 L142,250 L212,240 L172,188 L235,208 Z"
        strokeWidth="2.5"
      />
      <circle cx="250" cy="250" r="26" fill={C} opacity="0.55" />
    </svg>
  );
};

/* ══════════════════════════════════════
   DISPATCHER — pick illustration by type
   ══════════════════════════════════════ */
interface IllustrationProps {
  type: EventType;
  light?: boolean;
}

export const EventIllustration: React.FC<IllustrationProps> = ({ type, light }) => {
  switch (type) {
    case 'birth':      return <BirthIllustration />;
    case 'revelation': return <RevelationIllustration />;
    case 'battle':     return <BattleIllustration />;
    case 'hijra':      return <HijraIllustration />;
    case 'treaty':     return <TreatyIllustration />;
    case 'victory':    return <VictoryIllustration />;
    case 'farewell':   return <FarewellIllustration />;
    case 'death':      return <DeathIllustration light={light} />;
    default:           return <LifeIllustration />;
  }
};
