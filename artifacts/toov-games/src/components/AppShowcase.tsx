import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import carsiPiyasaIcon from '@assets/Çalışma_Yüzeyi_5@2x_1777984197799.png';
import carsiPiyasaLogo from '@assets/Çalışma_Yüzeyi_2@2x_1777984197799.png';
import carsiScreen1 from '@assets/1_1777984303719.jpeg';
import carsiScreen2 from '@assets/8_1777984303720.jpeg';

gsap.registerPlugin(ScrollTrigger);

interface AppData {
  id: string;
  icon: string;
  logo?: string;
  titleLine1: string;
  titleLine2: string;
  color1: string;
  color2: string;
  glowColor: string;
  descEn: string;
  descTr: string;
  tagEn: string;
  tagTr: string;
  screen1: string;
  screen2: string;
  storeUrl: string | null;
  storeTextEn: string;
  storeTextTr: string;
}

const APPS: AppData[] = [
  {
    id: 'carsi-piyasa',
    icon: carsiPiyasaIcon,
    logo: carsiPiyasaLogo,
    titleLine1: 'ÇARŞI',
    titleLine2: 'PİYASA',
    color1: '#A3D55A',
    color2: '#FFFFFF',
    glowColor: 'rgba(163,213,90,0.18)',
    descEn: 'Live currency, gold and bullion prices at your fingertips. Track markets in real-time with detailed charts and your favorites.',
    descTr: 'Anlık döviz, altın ve külçe fiyatları parmaklarınızın ucunda. Gerçek zamanlı piyasaları detaylı grafikler ve favorilerinizle takip edin.',
    tagEn: 'Finance',
    tagTr: 'Finans',
    screen1: carsiScreen1,
    screen2: carsiScreen2,
    storeUrl: 'https://play.google.com/store/apps/details?id=com.toov1.dovizaltin&hl=tr',
    storeTextEn: 'Download on',
    storeTextTr: 'İndir',
  },
];

function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 flex-shrink-0" fill="none">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z" fill="#4285F4"/>
      <path d="M17.556 8.236l-3.764 3.764 3.764 3.764 4.252-2.428a1 1 0 0 0 0-1.736l-4.252-2.364z" fill="#FBBC04"/>
      <path d="M3.609 1.814L13.792 12l3.764-3.764L6.727.518a1.084 1.084 0 0 0-1.073.036 1 1 0 0 0-.045.026l-.001.001.001-.001v.001l-.001.001.001.252z" fill="#34A853"/>
      <path d="M13.792 12L3.61 22.186l.001.001-.001.001v-.001l.001.001a1 1 0 0 0 .045.026 1.084 1.084 0 0 0 1.073.036l10.829-5.486L13.792 12z" fill="#EA4335"/>
    </svg>
  );
}

function PhoneMockup({
  src,
  alt,
  className = '',
  glowColor,
  delay = 0,
  tiltY = 14,
}: {
  src: string;
  alt: string;
  className?: string;
  glowColor: string;
  delay?: number;
  tiltY?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: tiltY * 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotateY: tiltY }}
      whileHover={{ rotateY: tiltY * 0.4, scale: 1.02 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      <div
        className="phone-mockup phone-mockup-lg transition-shadow duration-700"
        style={{ boxShadow: `0 0 60px ${glowColor}, 0 30px 80px rgba(0,0,0,0.7)` }}
      >
        <div className="phone-screen">
          <img src={src} alt={alt} className="w-full h-full object-contain bg-white" />
        </div>
      </div>
    </motion.div>
  );
}

function AppCard({ app, isActive, onClick }: { app: AppData; isActive: boolean; onClick: () => void }) {
  const { t } = useLanguage();
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-3 md:gap-4 px-4 py-3 md:px-5 md:py-4 rounded-2xl transition-all duration-500 cursor-pointer ${
        isActive
          ? 'bg-white/[0.08] border border-white/[0.15] shadow-lg'
          : 'bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]'
      }`}
    >
      <div className="relative flex-shrink-0">
        <img
          src={app.icon}
          alt={app.titleLine1 + ' ' + app.titleLine2}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-xl object-contain transition-all duration-500 ${
            isActive ? 'shadow-lg scale-105' : 'opacity-60'
          }`}
        />
      </div>
      <div className="text-left">
        <div className={`text-sm md:text-base font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50'}`}>
          {app.titleLine1} {app.titleLine2}
        </div>
        <div className={`text-[10px] md:text-xs transition-colors duration-300 ${isActive ? 'text-white/50' : 'text-white/30'}`}>
          {t(app.tagEn, app.tagTr)}
        </div>
      </div>
      {isActive && (
        <motion.div
          layoutId="app-indicator"
          className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
          style={{ background: app.color1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}

function AppContent({ app }: { app: AppData }) {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const letters = titleRef.current.querySelectorAll('.app-letter');

    gsap.fromTo(
      letters,
      { opacity: 0, y: 40, rotationX: -60, scale: 0.7 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.04,
        ease: 'back.out(1.7)',
      }
    );
  }, [app.id]);

  return (
    <motion.div
      key={app.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 xl:gap-10">
        <div className="hidden lg:flex flex-shrink-0 justify-end">
          <PhoneMockup
            src={app.screen1}
            alt={`${app.titleLine1} ${app.titleLine2} - Detail`}
            glowColor={app.glowColor}
            delay={0}
            tiltY={14}
          />
        </div>

        <div className="flex-1 max-w-xl text-center px-4">
          <div
            ref={titleRef}
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-[-0.02em] leading-[1.05]"
            style={{ perspective: 600 }}
          >
            <div className="mb-4 md:mb-5">
              {app.titleLine1.split('').map((letter, i) => (
                <span
                  key={`l1-${app.id}-${i}`}
                  className="app-letter inline-block"
                  style={{
                    display: 'inline-block',
                    color: app.color1,
                    textShadow: `0 0 30px ${app.color1}40, 0 0 60px ${app.color1}20`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <div>
              {app.titleLine2.split('').map((letter, i) => (
                <span
                  key={`l2-${app.id}-${i}`}
                  className="app-letter inline-block"
                  style={{ display: 'inline-block', color: app.color2 }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-sm md:text-base text-white/40 max-w-md mx-auto font-light"
          >
            {t(app.descEn, app.descTr)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10"
          >
            {app.storeUrl ? (
              <a
                href={app.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:scale-[1.03]"
              >
                <PlayStoreIcon />
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-wider text-white/40 uppercase leading-tight">
                    {t(app.storeTextEn, app.storeTextTr)}
                  </span>
                  <span className="text-base font-semibold text-white/80 leading-tight group-hover:text-white transition-colors">
                    Google Play
                  </span>
                </div>
              </a>
            ) : (
              <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <PlayStoreIcon />
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-wider text-white/40 uppercase leading-tight">
                    {t(app.storeTextEn, app.storeTextTr)}
                  </span>
                  <span className="text-base font-semibold text-white/50 leading-tight">Google Play</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <div className="hidden lg:flex flex-shrink-0 justify-start">
          <PhoneMockup
            src={app.screen2}
            alt={`${app.titleLine1} ${app.titleLine2} - Home`}
            glowColor={app.glowColor}
            delay={0.2}
            tiltY={-14}
          />
        </div>
      </div>

      <div className="flex lg:hidden flex-col items-center gap-6 mt-10">
        <PhoneMockup
          src={app.screen1}
          alt={`${app.titleLine1} ${app.titleLine2} - Detail`}
          glowColor={app.glowColor}
          delay={0}
        />
        <PhoneMockup
          src={app.screen2}
          alt={`${app.titleLine1} ${app.titleLine2} - Home`}
          glowColor={app.glowColor}
          delay={0.2}
        />
      </div>
    </motion.div>
  );
}

export function AppShowcase() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);
  const accent = APPS[activeIdx].color1;

  return (
    <section className="relative pt-20 md:pt-32 pb-24 md:pb-32 w-full overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent to-transparent"
          style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent}1A, transparent)` }}
        />
        <div
          className="absolute top-1/3 right-0 w-[40%] h-[600px]"
          style={{ background: `radial-gradient(ellipse, ${accent}0A 0%, transparent 70%)` }}
        />
        <div className="absolute bottom-1/4 left-0 w-[40%] h-[600px] bg-[radial-gradient(ellipse,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-10 md:mb-14"
        >
          <div className="w-12 h-px" style={{ background: accent }} />
          <span
            className="text-[11px] tracking-[0.3em] uppercase font-semibold"
            style={{ color: `${accent}99` }}
          >
            {t('Our Apps', 'Uygulamalarımız')}
          </span>
          <div className="w-12 h-px" style={{ background: accent }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16 flex-wrap"
        >
          {APPS.map((app, idx) => (
            <AppCard
              key={app.id}
              app={app}
              isActive={idx === activeIdx}
              onClick={() => setActiveIdx(idx)}
            />
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <AppContent key={APPS[activeIdx].id} app={APPS[activeIdx]} />
        </AnimatePresence>
      </div>
    </section>
  );
}
