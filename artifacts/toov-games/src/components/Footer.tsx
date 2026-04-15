import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { SiInstagram, SiX } from 'react-icons/si';

import logoLight from '@assets/Çalışma_Yüzeyi_7@2x_1776275353444.png';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-black py-12 px-6 md:px-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex items-center gap-4">
          <img src={logoLight} alt="TOOV Games" className="h-8 opacity-80" />
        </div>

        <div className="text-white/40 text-sm md:text-base text-center md:text-left flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <span>© 2026 TOOV Games.</span>
          <span className="hidden md:inline">|</span>
          <span>{t("All rights reserved.", "Tüm hakları saklıdır.")}</span>
          <span className="hidden md:inline">|</span>
          <span className="text-primary/80">{t("Games are art.", "Oyunlar sanattır.")}</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-white/50 hover:text-white hover:scale-110 transition-all duration-300">
            <SiInstagram size={20} />
          </a>
          <a href="#" className="text-white/50 hover:text-white hover:scale-110 transition-all duration-300">
            <SiX size={20} />
          </a>
        </div>

      </div>
    </footer>
  );
}
