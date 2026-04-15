import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import logoLight from '@assets/Çalışma_Yüzeyi_7@2x_1776275353444.png';

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 px-6 md:px-10 bg-black/70 backdrop-blur-xl border-b border-white/5'
          : 'py-5 px-6 md:px-10'
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={logoLight}
            alt="TOOV Games"
            className={`object-contain transition-all duration-500 ${scrolled ? 'h-7' : 'h-9'}`}
          />
        </motion.div>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center bg-white/[0.03] border border-white/[0.08] rounded-full p-0.5 overflow-hidden">
            <AnimatePresence>
              <motion.div
                className="absolute inset-y-0.5 rounded-full bg-white/10"
                initial={false}
                animate={{
                  x: language === 'EN' ? 2 : '100%',
                  width: '50%',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            </AnimatePresence>
            <button
              data-testid="button-lang-en"
              onClick={() => setLanguage('EN')}
              className={`relative z-10 px-5 py-2 text-[11px] font-semibold tracking-[0.2em] transition-colors duration-300 ${
                language === 'EN' ? 'text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              EN
            </button>
            <button
              data-testid="button-lang-tr"
              onClick={() => setLanguage('TR')}
              className={`relative z-10 px-5 py-2 text-[11px] font-semibold tracking-[0.2em] transition-colors duration-300 ${
                language === 'TR' ? 'text-white' : 'text-white/40 hover:text-white/60'
              }`}
            >
              TR
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
