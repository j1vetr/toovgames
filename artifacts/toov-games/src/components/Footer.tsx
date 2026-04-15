import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import { SiInstagram } from 'react-icons/si';
import logoHorizontal from '@assets/logo-horizontal-white.svg';
import { PrivacyModal } from './PrivacyModal';

export function Footer() {
  const { t } = useLanguage();
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="relative w-full pt-20 pb-10 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center md:items-start gap-5"
            >
              <img src={logoHorizontal} alt="TOOV Games" className="h-8 opacity-60" />
              <p className="text-sm text-white/30 max-w-xs text-center md:text-left leading-relaxed">
                {t(
                  'We believe games are art. Every pixel, every frame, every line of code.',
                  'Oyunların sanat olduğuna inanıyoruz. Her piksel, her kare, her satır kod.'
                )}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center md:items-start gap-4"
            >
              <h4 className="text-[11px] tracking-[0.3em] text-white/50 uppercase font-semibold">
                {t('Contact', 'İletişim')}
              </h4>
              <div className="flex flex-col gap-3 text-sm text-white/35">
                <a href="mailto:hello@toovgames.com" className="hover:text-white/60 transition-colors duration-300">
                  hello@toovgames.com
                </a>
                <a href="tel:+908503094769" className="hover:text-white/60 transition-colors duration-300">
                  0850 309 47 69
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center md:items-start gap-4"
            >
              <h4 className="text-[11px] tracking-[0.3em] text-white/50 uppercase font-semibold">
                {t('Follow Us', 'Bizi Takip Edin')}
              </h4>
              <a
                href="https://instagram.com/toov.games"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/35 hover:text-neon-coral/80 transition-colors duration-300 group"
              >
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-neon-coral/30 group-hover:bg-neon-coral/[0.06] transition-all duration-300">
                  <SiInstagram size={18} />
                </span>
                <span className="font-medium">@toov.games</span>
              </a>

              <div className="mt-2">
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="text-[11px] tracking-wider text-white/20 hover:text-white/40 transition-colors duration-300 uppercase"
                >
                  {t('Privacy Policy / KVKK', 'Gizlilik Politikası / KVKK')}
                </button>
              </div>
            </motion.div>
          </div>

          <div className="border-t border-white/[0.04] pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-white/20 tracking-wider">
              <span>&copy; 2026 TOOV Games. {t('All rights reserved.', 'Tüm hakları saklıdır.')}</span>
              <span className="text-neon-coral/30">
                {t('Games are art.', 'Oyunlar sanattır.')}
              </span>
            </div>
          </div>
        </div>
      </footer>

      <PrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </>
  );
}
