import React from 'react';
import { motion } from 'framer-motion';
import { Map, Clock, Info } from 'lucide-react';

interface SidebarProps {
  periods: any[];
  activePeriod: any | null;
  setActivePeriod: (period: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ periods, activePeriod, setActivePeriod }) => {
  return (
    <div className="w-80 h-full bg-dark-panel border-l border-islamic-gold/20 flex flex-col z-10 shadow-2xl overflow-y-auto">
      <div className="p-6 border-b border-islamic-gold/20 bg-islamic-green/10">
        <h1 className="text-3xl font-bold text-islamic-gold mb-2 font-arabic tracking-wide">نور النبوة</h1>
        <p className="text-sm text-gray-300">خريطة حياة النبي محمد ﷺ التفاعلية</p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-islamic-gold" />
          الفترات الزمنية
        </h2>

        <div className="space-y-3">
          {periods.map((period, index) => {
            const isActive = activePeriod?.id === period.id;
            return (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                key={period.id}
                onClick={() => setActivePeriod(period)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 border-r-4 ${
                  isActive 
                    ? 'bg-islamic-green/30 border-islamic-gold shadow-lg shadow-islamic-gold/5' 
                    : 'bg-dark-bg border-transparent hover:bg-dark-bg/80 hover:border-islamic-gold/50'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className={`font-bold text-lg ${isActive ? 'text-islamic-gold' : 'text-white'}`}>
                    {period.title_ar}
                  </h3>
                  <span className="text-xs text-islamic-gold/70 px-2 py-1 bg-dark-bg rounded-md">
                    {period.start_year}-{period.end_year}م
                  </span>
                </div>
                {isActive && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm text-gray-300 leading-relaxed mt-2 border-t border-islamic-gold/10 pt-2"
                  >
                    {period.description_ar}
                  </motion.p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="p-4 border-t border-islamic-gold/20 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
        <Info className="w-4 h-4" />
        البيانات مستمدة من مصادر السيرة المعتمدة
      </div>
    </div>
  );
};

export default Sidebar;
