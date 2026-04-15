import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { SiInstagram } from 'react-icons/si';
import logoHorizontal from '@assets/logo-horizontal-white.svg';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative w-full py-16 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <img src={logoHorizontal} alt="TOOV Games" className="h-7 opacity-50" />
          </motion.div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[12px] text-white/25 tracking-wider">
            <span>&copy; 2026 TOOV Games</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span>{t('All rights reserved.', 'Tüm hakları saklıdır.')}</span>
            <span className="hidden md:inline text-white/10">|</span>
            <span className="text-neon-coral/40">
              {t('Games are art.', 'Oyunlar sanattır.')}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              data-testid="link-instagram"
              href="https://instagram.com/toov.games"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-white/60 transition-colors duration-300"
            >
              <SiInstagram size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
