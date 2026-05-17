import React from 'react';

const ArabesqueSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
    <g stroke="#C9A84C" strokeWidth="0.6" fill="none">
      <polygon points="100,6 119,44 160,44 128,68 140,106 100,83 60,106 72,68 40,44 81,44" />
      <polygon points="100,22 114,51 146,51 122,69 131,98 100,81 69,98 78,69 54,51 86,51" />
      <circle cx="100" cy="100" r="92" />
      <circle cx="100" cy="100" r="68" />
      <circle cx="100" cy="100" r="44" />
      <circle cx="100" cy="100" r="18" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="100" y1="8" x2="100" y2="192"
          transform={`rotate(${i * 30} 100 100)`} opacity="0.35" />
      ))}
    </g>
  </svg>
);

interface PatternProps {
  size: number;
  opacity: number;
  duration: number;
  reverse?: boolean;
}

const SpinningPattern: React.FC<PatternProps> = ({ size, opacity, duration, reverse }) => (
  <div
    style={{
      width: size,
      height: size,
      opacity,
      animation: `arabesque-spin ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
    }}
  >
    <ArabesqueSVG className="w-full h-full" />
  </div>
);

const ArabesqueOverlay: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
    {/* Top-right corner */}
    <div className="absolute -top-12 -right-12">
      <SpinningPattern size={200} opacity={0.07} duration={48} />
    </div>
    {/* Bottom-left corner */}
    <div className="absolute -bottom-12 -left-12">
      <SpinningPattern size={200} opacity={0.07} duration={48} reverse />
    </div>
    {/* Top-left small */}
    <div className="absolute -top-8 -left-8">
      <SpinningPattern size={120} opacity={0.045} duration={32} reverse />
    </div>
    {/* Bottom-right small */}
    <div className="absolute -bottom-8 -right-8">
      <SpinningPattern size={120} opacity={0.045} duration={32} />
    </div>
    {/* Very subtle center accent */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <SpinningPattern size={600} opacity={0.012} duration={90} />
    </div>
  </div>
);

export default ArabesqueOverlay;
