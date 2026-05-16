import React from 'react';
import { motion } from 'framer-motion';
import { X, Swords, Users, Shield } from 'lucide-react';

interface BattleSimulationProps {
  battle: any;
  onClose: () => void;
}

const BattleSimulationOverlay: React.FC<BattleSimulationProps> = ({ battle, onClose }) => {
  if (!battle) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm rtl p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-5xl h-[85vh] bg-dark-panel border border-islamic-gold/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-dark-bg/50 hover:bg-red-500/20 text-white rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 border-b border-islamic-gold/20 bg-gradient-to-r from-islamic-green/40 to-dark-panel flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-islamic-gold flex items-center gap-3">
              <Swords className="w-8 h-8" />
              محاكاة المعركة
            </h2>
            <p className="text-gray-300 mt-1">{battle.outcome}</p>
          </div>
          {battle.quran_verse && (
            <div className="text-left bg-dark-bg/50 p-3 rounded-lg border border-islamic-gold/10 max-w-md">
              <p className="text-islamic-gold font-arabic text-lg italic">"{battle.quran_verse}"</p>
              <p className="text-xs text-gray-400 mt-1">— سورة {battle.quran_surah}</p>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Simulation Map Area */}
          <div className="flex-1 bg-dark-bg relative overflow-hidden border-b md:border-b-0 md:border-l border-islamic-gold/20 flex items-center justify-center">
            {/* Mocked Tactical Map */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            <div className="text-center p-8 bg-dark-panel/80 rounded-xl border border-islamic-gold/30 shadow-2xl backdrop-blur-md">
              <Swords className="w-16 h-16 text-islamic-gold mx-auto mb-4 opacity-50" />
              <p className="text-xl text-white">خريطة المعركة التكتيكية</p>
              <p className="text-sm text-gray-400 mt-2">سيتم دمج Mapbox بوضعية Pitch: 70 مع حركة الجيوش هنا</p>
              
              <div className="flex items-center justify-center gap-8 mt-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                  <span className="text-sm text-blue-300">المسلمون</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]"></div>
                  <span className="text-sm text-red-300">العدو</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info & Timeline Sidebar */}
          <div className="w-full md:w-96 bg-dark-panel p-6 overflow-y-auto">
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-dark-bg p-4 rounded-xl border border-blue-900/30">
                <h4 className="text-blue-400 text-sm mb-1 flex items-center gap-1"><Shield className="w-4 h-4"/> جيش المسلمين</h4>
                <p className="text-2xl font-bold text-white">{battle.muslim_count.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">القائد: {battle.muslim_commander}</p>
              </div>
              <div className="bg-dark-bg p-4 rounded-xl border border-red-900/30">
                <h4 className="text-red-400 text-sm mb-1 flex items-center gap-1"><Users className="w-4 h-4"/> جيش العدو</h4>
                <p className="text-2xl font-bold text-white">{battle.enemy_count.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">القائد: {battle.enemy_commander}</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-islamic-gold mb-4 border-b border-islamic-gold/20 pb-2">التسلسل الزمني</h3>
            
            <div className="space-y-4">
              {battle.key_moments.map((moment: any, idx: number) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (idx * 0.1) }}
                  key={idx} 
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-islamic-gold"></div>
                    {idx < battle.key_moments.length - 1 && <div className="w-px h-full bg-islamic-gold/30 my-1"></div>}
                  </div>
                  <div className="pb-4">
                    <span className="text-xs font-bold text-islamic-gold bg-islamic-gold/10 px-2 py-1 rounded">
                      {moment.time}
                    </span>
                    <p className="text-sm text-gray-300 mt-2">{moment.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BattleSimulationOverlay;
