import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoHorizontal from '@assets/logo-horizontal-white.svg';

const NAV_ITEMS = [
  { id: 'home', en: 'Home', tr: 'Ana Sayfa' },
  { id: 'about', en: 'About', tr: 'Hakkımızda' },
  { id: 'games', en: 'Games', tr: 'Oyunlar' },
  { id: 'apps', en: 'Apps', tr: 'Uygulamalar' },
  { id: 'future', en: 'Future', tr: 'Gelecek' },
  { id: 'contact', en: 'Contact', tr: 'İletişim' },
];

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = NAV_ITEMS.map((item) => item.id);
      const offset = window.innerHeight * 0.4;
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
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
        <div className="max-w-[1400px] mx-auto flex justify-between items-center gap-6">
          <motion.button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={logoHorizontal}
              alt="TOOV Games"
              className={`object-contain transition-all duration-500 opacity-80 ${scrolled ? 'h-7' : 'h-9'}`}
            />
          </motion.button>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative px-4 py-2 text-[12px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 group"
                >
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'
                    }`}
                  >
                    {t(item.en, item.tr)}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-cyan"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      style={{ boxShadow: '0 0 10px rgba(0,240,255,0.8)' }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
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
                className={`relative z-10 px-4 md:px-5 py-2 text-[11px] font-semibold tracking-[0.2em] transition-colors duration-300 ${
                  language === 'EN' ? 'text-white' : 'text-white/40 hover:text-white/60'
                }`}
              >
                EN
              </button>
              <button
                data-testid="button-lang-tr"
                onClick={() => setLanguage('TR')}
                className={`relative z-10 px-4 md:px-5 py-2 text-[11px] font-semibold tracking-[0.2em] transition-colors duration-300 ${
                  language === 'TR' ? 'text-white' : 'text-white/40 hover:text-white/60'
                }`}
              >
                TR
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/[0.08] text-white/70 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-2"
          >
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-6 py-3 text-2xl font-display font-bold tracking-[-0.01em] transition-colors duration-300 ${
                    isActive ? 'text-neon-cyan' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {t(item.en, item.tr)}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
