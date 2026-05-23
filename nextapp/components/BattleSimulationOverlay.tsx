'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BattleSimulationProps {
  battle: any;
  onClose: () => void;
}

/* ── Web Audio sword-clash sound ── */
const playSwordClash = () => {
  try {
    const ac = new AudioContext();

    /* metallic oscillator sweep */
    const osc = ac.createOscillator();
    const oscGain = ac.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(900, ac.currentTime);
    osc.frequency.exponentialRampToValueAtTime(180, ac.currentTime + 0.5);
    oscGain.gain.setValueAtTime(0.22, ac.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.9);
    osc.connect(oscGain); oscGain.connect(ac.destination);
    osc.start(); osc.stop(ac.currentTime + 0.9);

    /* noise burst for metal */
    const buf = ac.createBuffer(1, ac.sampleRate * 0.25, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const noise = ac.createBufferSource();
    noise.buffer = buf;
    const bpf = ac.createBiquadFilter();
    bpf.type = 'bandpass'; bpf.frequency.value = 4000; bpf.Q.value = 0.6;
    const ng = ac.createGain();
    ng.gain.setValueAtTime(0.45, ac.currentTime);
    ng.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.35);
    noise.connect(bpf); bpf.connect(ng); ng.connect(ac.destination);
    noise.start(); noise.stop(ac.currentTime + 0.35);

    setTimeout(() => ac.close(), 2000);
  } catch (_) { /* browser may block autoplay before interaction */ }
};

/* ── Sparks burst at clash point ── */
const Sparks: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  const sparks = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 360;
    const dist  = 35 + Math.random() * 55;
    return {
      id: i,
      tx: Math.cos(angle * Math.PI / 180) * dist,
      ty: Math.sin(angle * Math.PI / 180) * dist,
      size: Math.random() * 4 + 2,
      dur:  Math.random() * 0.35 + 0.25,
      hue:  35 + Math.random() * 25,
      light: 55 + Math.random() * 35,
    };
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {sparks.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            width: s.size, height: s.size,
            background: `hsl(${s.hue}, 100%, ${s.light}%)`,
            boxShadow: `0 0 ${s.size * 2}px hsl(${s.hue}, 100%, ${s.light}%)`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: s.tx, y: s.ty, opacity: 0, scale: 0 }}
          transition={{ duration: s.dur, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

/* ── Sword clash hero ── */
const SwordClashHero: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [clashed, setClashed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setClashed(true);
      playSwordClash();
      setTimeout(onDone, 800);
    }, 600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="relative h-24 flex items-center justify-center overflow-hidden">
      {/* Left sword */}
      <motion.div
        className="absolute"
        initial={{ x: '-120%', opacity: 0 }}
        animate={{ x: clashed ? '-18px' : '-80px', opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 160 24" className="w-40 h-6" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bl" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.1" />
              <stop offset="90%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#F5E6C0" />
            </linearGradient>
          </defs>
          <polygon points="0,12 142,7 160,12 142,17" fill="url(#bl)" />
          <rect x="135" y="2" width="8" height="20" rx="2" fill="#C9A84C" />
          <rect x="143" y="6" width="16" height="12" rx="3" fill="#7A5A14" />
        </svg>
      </motion.div>

      {/* Clash glow + sparks */}
      <AnimatePresence>
        {clashed && (
          <motion.div
            className="absolute z-10 w-8 h-8 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 3, 1.5], opacity: [1, 1, 0] }}
            transition={{ duration: 0.6 }}
            style={{ background: 'radial-gradient(circle, #FFE082, #C9A84C, transparent)', boxShadow: '0 0 40px 20px rgba(201,168,76,0.7)' }}
          />
        )}
      </AnimatePresence>
      <Sparks active={clashed} />

      {/* Right sword (mirror) */}
      <motion.div
        className="absolute scale-x-[-1]"
        initial={{ x: '120%', opacity: 0 }}
        animate={{ x: clashed ? '18px' : '80px', opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 160 24" className="w-40 h-6" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,12 142,7 160,12 142,17" fill="url(#bl)" />
          <rect x="135" y="2" width="8" height="20" rx="2" fill="#C9A84C" />
          <rect x="143" y="6" width="16" height="12" rx="3" fill="#7A5A14" />
        </svg>
      </motion.div>
    </div>
  );
};

/* ── Waving flag ── */
const WavingFlag: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className="relative h-10 flex items-center">
      <div className="w-0.5 h-10 bg-gray-500 rounded" />
      <div
        className="absolute left-0.5 top-0 h-5 w-10 animate-flag rounded-sm"
        style={{ background: color, transformOrigin: 'left center', boxShadow: `0 0 8px ${color}55` }}
      />
    </div>
    <span className="text-xs font-noto" style={{ color }}>{label}</span>
  </div>
);

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════ */
const BattleSimulationOverlay: React.FC<BattleSimulationProps> = ({ battle, onClose }) => {
  const [phase, setPhase] = useState<'clash' | 'content'>('clash');
  const { isEn } = useLanguage();

  if (!battle) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 ${isEn ? 'ltr' : 'rtl'}`}
    >
      <motion.div
        initial={{ scale: 0.88, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-5xl h-[88vh] bg-dark-panel border border-islamic-gold/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
        style={{ boxShadow: '0 0 60px rgba(201,168,76,0.08), 0 25px 60px rgba(0,0,0,0.7)' }}
      >
        {/* Arabesque corner accent */}
        <div className="absolute top-0 left-0 w-24 h-24 opacity-10 pointer-events-none overflow-hidden rounded-2xl">
          <svg viewBox="0 0 200 200" className="w-full h-full" style={{ animation: 'arabesque-spin 30s linear infinite' }}>
            <g stroke="#C9A84C" strokeWidth="1" fill="none">
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={i} x1="100" y1="0" x2="100" y2="200" transform={`rotate(${i * 22.5} 100 100)`} />
              ))}
              <circle cx="100" cy="100" r="90" /><circle cx="100" cy="100" r="60" />
            </g>
          </svg>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 p-2 bg-dark-bg/60 hover:bg-red-500/25 text-white rounded-full transition-colors z-20 ${isEn ? 'right-4' : 'left-4'}`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* ── CLASH INTRO ── */}
        <AnimatePresence>
          {phase === 'clash' && (
            <motion.div
              key="clash"
              className="absolute inset-0 z-30 bg-dark-bg/95 flex flex-col items-center justify-center gap-4"
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
            >
              <motion.p
                className="text-islamic-gold/60 text-sm font-amiri"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              >
                محاكاة المعركة
              </motion.p>
              <motion.h2
                className="text-4xl font-bold font-amiri text-center animate-glow-pulse"
                style={{ color: '#C9A84C', textShadow: '0 0 30px #8e783b' }}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              >
                {battle.name_ar || 'المعركة'}
              </motion.h2>

              <SwordClashHero onDone={() => setPhase('content')} />

              <motion.p
                className="text-desert-sand/40 text-xs font-noto"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              >
                {battle.date_ar || battle.year}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── HEADER ── */}
        <div className="p-5 border-b border-islamic-gold/20 bg-gradient-to-l from-dark-panel via-islamic-green/20 to-dark-panel flex justify-between items-center flex-shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-islamic-gold font-amiri flex items-center gap-3">
              {/* SVG sword icon inline */}
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14.5 17.5 3 6V3h3l11.5 11.5" /><line x1="13" y1="19" x2="19" y2="13" />
                <line x1="16" y1="16" x2="20" y2="20" /><line x1="19" y1="21" x2="21" y2="19" />
              </svg>
              {battle.name_ar || 'المعركة'}
            </h2>
            <p className="text-gray-400 text-sm mt-1 font-noto">{battle.outcome}</p>
          </div>

          <div className="flex items-center gap-4">
            <WavingFlag color="#3b82f6" label="المسلمون" />
            <WavingFlag color="#ef4444" label="العدو" />
            {battle.quran_verse && (
              <div className="bg-dark-bg/60 p-3 rounded-lg border border-islamic-gold/15 max-w-xs hidden md:block">
                <p className="text-islamic-gold/80 font-amiri text-base leading-relaxed" dir="rtl">
                  "{battle.quran_verse}"
                </p>
                <p className="text-xs text-gray-500 mt-1">— سورة {battle.quran_surah}</p>
              </div>
            )}
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

          {/* Tactical map area */}
          <div className="flex-1 bg-dark-bg relative overflow-hidden border-b md:border-b-0 md:border-l border-islamic-gold/15 flex items-center justify-center">
            {/* grid texture */}
            <div className="absolute inset-0 opacity-[0.06]"
              style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            {/* compass rose */}
            <div className="absolute top-4 right-4 opacity-20">
              <svg viewBox="0 0 60 60" className="w-12 h-12" fill="none" stroke="#C9A84C" strokeWidth="1">
                <circle cx="30" cy="30" r="28" />
                <line x1="30" y1="2" x2="30" y2="58" /><line x1="2" y1="30" x2="58" y2="30" />
                <polygon points="30,4 33,22 27,22" fill="#C9A84C" />
              </svg>
            </div>

            <motion.div
              className="text-center p-8 bg-dark-panel/80 rounded-2xl border border-islamic-gold/25 shadow-2xl backdrop-blur-sm max-w-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: phase === 'content' ? 1 : 0, scale: phase === 'content' ? 1 : 0.9 }}
              transition={{ delay: 0.3 }}
            >
              <svg viewBox="0 0 24 24" className="w-16 h-16 mx-auto mb-4 text-islamic-gold opacity-40"
                fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14.5 17.5 3 6V3h3l11.5 11.5" /><line x1="13" y1="19" x2="19" y2="13" />
                <line x1="16" y1="16" x2="20" y2="20" /><line x1="19" y1="21" x2="21" y2="19" />
              </svg>
              <p className="text-lg text-white font-amiri mb-1">خريطة المعركة التكتيكية</p>
              <p className="text-xs text-gray-500 font-noto">عرض حركة الجيوش والمواقع</p>

              <div className="flex justify-center gap-10 mt-6">
                <motion.div
                  className="flex flex-col items-center gap-2"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="w-7 h-7 rounded-full bg-blue-500"
                    style={{ boxShadow: '0 0 18px rgba(59,130,246,0.7)' }} />
                  <span className="text-xs text-blue-300 font-noto">المسلمون</span>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center gap-2"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <div className="w-7 h-7 rounded-full bg-red-500"
                    style={{ boxShadow: '0 0 18px rgba(239,68,68,0.7)' }} />
                  <span className="text-xs text-red-300 font-noto">العدو</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Info sidebar */}
          <motion.div
            className="w-full md:w-96 bg-dark-panel p-6 overflow-y-auto flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: phase === 'content' ? 1 : 0, x: phase === 'content' ? 0 : 20 }}
            transition={{ delay: 0.2 }}
          >
            {/* Army cards */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              <motion.div
                className="bg-dark-bg p-4 rounded-xl border border-blue-900/40 relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              >
                <div className="absolute inset-0 opacity-5"
                  style={{ background: 'radial-gradient(circle at 50% 50%, #3b82f6, transparent)' }} />
                <h4 className="text-blue-400 text-xs mb-2 flex items-center gap-1 font-noto">
                  <Shield className="w-3.5 h-3.5" /> جيش المسلمين
                </h4>
                <p className="text-2xl font-bold text-white">{battle.muslim_count?.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1 font-noto">القائد: {battle.muslim_commander}</p>
              </motion.div>

              <motion.div
                className="bg-dark-bg p-4 rounded-xl border border-red-900/40 relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              >
                <div className="absolute inset-0 opacity-5"
                  style={{ background: 'radial-gradient(circle at 50% 50%, #ef4444, transparent)' }} />
                <h4 className="text-red-400 text-xs mb-2 flex items-center gap-1 font-noto">
                  <Users className="w-3.5 h-3.5" /> جيش العدو
                </h4>
                <p className="text-2xl font-bold text-white">{battle.enemy_count?.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1 font-noto">القائد: {battle.enemy_commander}</p>
              </motion.div>
            </div>

            {/* Mercy verse if available */}
            {battle.mercy_note && (
              <motion.div
                className="mb-6 p-3 rounded-lg border border-islamic-gold/20 bg-islamic-green/10"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              >
                <p className="text-sm text-desert-sand/80 font-amiri leading-relaxed" dir="rtl">
                  🕊️ {battle.mercy_note}
                </p>
              </motion.div>
            )}

            {/* Timeline */}
            <h3 className="text-lg font-bold text-islamic-gold mb-4 border-b border-islamic-gold/20 pb-2 font-amiri flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
              </svg>
              التسلسل الزمني
            </h3>

            <div className="space-y-0">
              {battle.key_moments?.map((moment: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.12 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-3 h-3 rounded-full border-2 border-islamic-gold bg-dark-bg mt-1 animate-dot-pulse flex-shrink-0"
                      style={{ boxShadow: '0 0 8px rgba(201,168,76,0.5)' }}
                    />
                    {idx < battle.key_moments.length - 1 && (
                      <div className="w-px flex-1 timeline-line my-1" style={{ minHeight: '2rem' }} />
                    )}
                  </div>
                  <div className="pb-5">
                    <span className="text-xs font-bold text-islamic-gold bg-islamic-gold/10 px-2 py-0.5 rounded font-noto">
                      {moment.time}
                    </span>
                    <p className="text-sm text-gray-300 mt-1.5 leading-relaxed font-noto">{moment.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BattleSimulationOverlay;
