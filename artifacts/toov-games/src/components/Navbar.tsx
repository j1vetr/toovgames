import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import logoLight from '@assets/Çalışma_Yüzeyi_7@2x_1776275353444.png';

export function Navbar() {
  const { language, setLanguage } = useLanguage();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center backdrop-blur-sm bg-background/50 border-b border-white/5"
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <img src={logoLight} alt="TOOV Games" className="h-8 md:h-10 object-contain" />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          <button
            onClick={() => setLanguage('EN')}
            className={`px-4 py-1.5 rounded-full text-xs font-display tracking-widest font-bold transition-all duration-300 ${
              language === 'EN' 
                ? 'bg-primary text-white shadow-[0_0_15px_rgba(232,87,58,0.5)]' 
                : 'text-white/50 hover:text-white'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('TR')}
            className={`px-4 py-1.5 rounded-full text-xs font-display tracking-widest font-bold transition-all duration-300 ${
              language === 'TR' 
                ? 'bg-primary text-white shadow-[0_0_15px_rgba(232,87,58,0.5)]' 
                : 'text-white/50 hover:text-white'
            }`}
          >
            TR
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
