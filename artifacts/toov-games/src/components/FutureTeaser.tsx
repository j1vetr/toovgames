import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';

import mascotWhite from '@assets/Çalışma_Yüzeyi_10@2x_1776275353447.png';

export function FutureTeaser() {
  const { t } = useLanguage();

  return (
    <section className="relative py-40 w-full bg-background flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] mix-blend-screen pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl px-6"
      >
        <img 
          src={mascotWhite} 
          alt="Ghost Mascot" 
          className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-12 opacity-50 floating mix-blend-screen"
        />
        
        <h2 className="text-3xl md:text-5xl font-display text-white/90 mb-6 tracking-wide">
          {t("Something else is coming...", "Başka bir şey geliyor...")}
        </h2>
        
        <p className="text-xl text-white/40 font-light">
          {t("Stay close. The next chapter is being written.", "Yakın ol. Bir sonraki bölüm yazılıyor.")}
        </p>
      </motion.div>
    </section>
  );
}
