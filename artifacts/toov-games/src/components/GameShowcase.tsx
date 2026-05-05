import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import neonDodgeMenu from '@assets/WhatsApp_Image_2026-04-15_at_20.50.51_1776275500060.jpeg';
import neonDodgeIcon from '@assets/logo_1024_1777902843317.png';
import dropTheoryIcon from '@assets/512x512_1777903485749.png';
import dropTheoryMenu from '@assets/drop_theory1_1777903485749.jpeg';

gsap.registerPlugin(ScrollTrigger);

interface GameData {
  id: string;
  icon: string;
  titleLine1: string;
  titleLine2: string;
  color1: string;
  color2: string;
  glowColor: string;
  descEn: string;
  descTr: string;
  tagEn: string;
  tagTr: string;
  menuImg: string;
  videoSrc: string;
  storeUrl: string | null;
  storeTextEn: string;
  storeTextTr: string;
}

const GAMES: GameData[] = [
  {
    id: 'neon-dodge',
    icon: neonDodgeIcon,
    titleLine1: 'NEON',
    titleLine2: 'DODGE',
    color1: '#00F0FF',
    color2: '#FF0090',
    glowColor: 'rgba(0,240,255,0.15)',
    descEn: 'Survive the Neon. A fast-paced 2D dodge game set in the depths of space. Reflexes over strategy. Speed over power.',
    descTr: "Neon'dan kaç. Uzayın derinliklerinde geçen hız dolu bir 2D kaçış oyunu. Strateji değil refleks. Güç değil hız.",
    tagEn: 'Action',
    tagTr: 'Aksiyon',
    menuImg: neonDodgeMenu,
    videoSrc: 'neon-dodge-gameplay.mp4',
    storeUrl: 'https://tinyurl.com/neondodge',
    storeTextEn: 'Download on',
    storeTextTr: 'İndir',
  },
  {
    id: 'drop-theory',
    icon: dropTheoryIcon,
    titleLine1: 'DROP',
    titleLine2: 'THEORY',
    color1: '#A855F7',
    color2: '#22D3EE',
    glowColor: 'rgba(168,85,247,0.15)',
    descEn: 'Think before you drop. A relaxing yet challenging block puzzle that tests your spatial thinking. Logic over luck.',
    descTr: 'Düşmeden önce düşün. Uzamsal düşünme yeteneğinizi test eden rahatlatıcı ama zorlu bir blok bulmaca. Şans değil mantık.',
    tagEn: 'Puzzle',
    tagTr: 'Bulmaca',
    menuImg: dropTheoryMenu,
    videoSrc: 'drop-theory-gameplay.mp4',
    storeUrl: null,
    storeTextEn: 'Coming Soon on',
    storeTextTr: 'Yakında',
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
  glowColor = 'cyan',
  delay = 0,
  tiltY = -14,
}: {
  src: string;
  alt: string;
  className?: string;
  glowColor?: string;
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
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
      </div>
    </motion.div>
  );
}

function VideoPhoneMockup({
  videoSrc,
  className = '',
  glowColor = 'rgba(255,0,144,0.15)',
  delay = 0,
  tiltY = 14,
}: {
  videoSrc: string;
  className?: string;
  glowColor?: string;
  delay?: number;
  tiltY?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;
    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.src = videoSrc;
          video.load();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <motion.div
      ref={containerRef}
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
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

function GameCard({ game, isActive, onClick }: { game: GameData; isActive: boolean; onClick: () => void }) {
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
          src={game.icon}
          alt={game.titleLine1 + ' ' + game.titleLine2}
          className={`w-12 h-12 md:w-14 md:h-14 rounded-xl transition-all duration-500 ${
            isActive ? 'shadow-lg scale-105' : 'opacity-60'
          }`}
          style={{}}
        />
      </div>
      <div className="text-left">
        <div className={`text-sm md:text-base font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50'}`}>
          {game.titleLine1} {game.titleLine2}
        </div>
        <div className={`text-[10px] md:text-xs transition-colors duration-300 ${isActive ? 'text-white/50' : 'text-white/30'}`}>
          {game.tagEn}
        </div>
      </div>
      {isActive && (
        <motion.div
          layoutId="game-indicator"
          className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
          style={{ background: game.color1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}

function GameContent({ game }: { game: GameData }) {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const letters = titleRef.current.querySelectorAll('.neon-letter');

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
  }, [game.id]);

  return (
    <motion.div
      key={game.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-6 xl:gap-10">
        <div className="hidden lg:flex flex-shrink-0 justify-end">
          <PhoneMockup
            src={game.menuImg}
            alt={`${game.titleLine1} ${game.titleLine2} - Menu`}
            glowColor={game.glowColor}
            delay={0}
          />
        </div>

        <div className="flex-1 max-w-xl text-center px-4">
          <div
            ref={titleRef}
            className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-[-0.02em] leading-[0.9]"
            style={{ perspective: 600 }}
          >
            <div className="mb-2">
              {game.titleLine1.split('').map((letter, i) => (
                <span
                  key={`l1-${game.id}-${i}`}
                  className="neon-letter inline-block"
                  style={{ display: 'inline-block', color: game.color1 }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <div>
              {game.titleLine2.split('').map((letter, i) => (
                <span
                  key={`l2-${game.id}-${i}`}
                  className="neon-letter inline-block"
                  style={{ display: 'inline-block', color: game.color2 }}
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
            {t(game.descEn, game.descTr)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10"
          >
            {game.storeUrl ? (
              <a
                href={game.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 hover:scale-[1.03]"
              >
                <PlayStoreIcon />
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-wider text-white/40 uppercase leading-tight">
                    {t(game.storeTextEn, game.storeTextTr)}
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
                    {t(game.storeTextEn, game.storeTextTr)}
                  </span>
                  <span className="text-base font-semibold text-white/50 leading-tight">Google Play</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <div className="hidden lg:flex flex-shrink-0 justify-start">
          <VideoPhoneMockup
            videoSrc={`${import.meta.env.BASE_URL}${game.videoSrc}`}
            glowColor={game.glowColor}
            delay={0.2}
          />
        </div>
      </div>

      <div className="flex lg:hidden flex-col items-center gap-6 mt-10">
        <PhoneMockup
          src={game.menuImg}
          alt={`${game.titleLine1} ${game.titleLine2} - Menu`}
          glowColor={game.glowColor}
          delay={0}
        />
        <VideoPhoneMockup
          videoSrc={`${import.meta.env.BASE_URL}${game.videoSrc}`}
          glowColor={game.glowColor}
          delay={0.2}
        />
      </div>
    </motion.div>
  );
}

export function GameShowcase() {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="games" className="relative pt-16 md:pt-28 pb-24 md:pb-32 w-full overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(0,240,255,0.1)] to-transparent" />
        <div className="absolute top-1/3 left-0 w-[40%] h-[600px] bg-[radial-gradient(ellipse,rgba(0,240,255,0.04)_0%,transparent_70%)]" />
        <div className="absolute bottom-1/4 right-0 w-[40%] h-[600px] bg-[radial-gradient(ellipse,rgba(255,0,144,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-10 md:mb-14"
        >
          <div className="w-12 h-px bg-neon-cyan" />
          <span className="text-[11px] tracking-[0.3em] text-neon-cyan/60 uppercase font-semibold">
            {t('Our Games', 'Oyunlarımız')}
          </span>
          <div className="w-12 h-px bg-neon-cyan" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 md:gap-4 mb-12 md:mb-16"
        >
          {GAMES.map((game, idx) => (
            <GameCard
              key={game.id}
              game={game}
              isActive={idx === activeIdx}
              onClick={() => setActiveIdx(idx)}
            />
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <GameContent key={GAMES[activeIdx].id} game={GAMES[activeIdx]} />
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[80px]">
          <path
            d="M0,120 L0,60 Q300,0 600,60 Q900,120 1200,60 L1200,120 Z"
            fill="currentColor"
            className="text-background"
          />
          <path
            d="M0,60 Q300,0 600,60 Q900,120 1200,60"
            fill="none"
            stroke="rgba(0,240,255,0.08)"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
}
