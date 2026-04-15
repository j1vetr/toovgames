import { useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import menuImg from '@assets/WhatsApp_Image_2026-04-15_at_20.50.51_1776275500060.jpeg';

gsap.registerPlugin(ScrollTrigger);

function PlayStoreBadge({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm ${className}`}>
      <svg viewBox="0 0 24 24" className="w-7 h-7 flex-shrink-0" fill="none">
        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z" fill="#4285F4"/>
        <path d="M17.556 8.236l-3.764 3.764 3.764 3.764 4.252-2.428a1 1 0 0 0 0-1.736l-4.252-2.364z" fill="#FBBC04"/>
        <path d="M3.609 1.814L13.792 12l3.764-3.764L6.727.518a1.084 1.084 0 0 0-1.073.036 1 1 0 0 0-.045.026l-.001.001.001-.001v.001l-.001.001.001.252z" fill="#34A853"/>
        <path d="M13.792 12L3.61 22.186l.001.001-.001.001v-.001l.001.001a1 1 0 0 0 .045.026 1.084 1.084 0 0 0 1.073.036l10.829-5.486L13.792 12z" fill="#EA4335"/>
      </svg>
      <div className="flex flex-col">
        <span className="text-[9px] tracking-wider text-white/40 uppercase leading-tight">Coming soon on</span>
        <span className="text-sm font-semibold text-white/80 leading-tight">Google Play</span>
      </div>
    </div>
  );
}

function PhoneMockup({
  src,
  alt,
  className = '',
  glowColor = 'cyan',
  delay = 0,
}: {
  src: string;
  alt: string;
  className?: string;
  glowColor?: 'cyan' | 'magenta';
  delay?: number;
}) {
  const glowStyles =
    glowColor === 'cyan'
      ? 'shadow-[0_0_60px_rgba(0,240,255,0.15),0_0_120px_rgba(0,240,255,0.05)] hover:shadow-[0_0_80px_rgba(0,240,255,0.25),0_0_160px_rgba(0,240,255,0.1)]'
      : 'shadow-[0_0_60px_rgba(255,0,144,0.15),0_0_120px_rgba(255,0,144,0.05)] hover:shadow-[0_0_80px_rgba(255,0,144,0.25),0_0_160px_rgba(255,0,144,0.1)]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotateY: glowColor === 'cyan' ? -8 : 8 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`${className}`}
      style={{ perspective: 1000 }}
    >
      <div
        className={`phone-mockup phone-mockup-lg transition-shadow duration-700 ${glowStyles}`}
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
  glowColor = 'magenta',
  delay = 0,
}: {
  videoSrc: string;
  className?: string;
  glowColor?: 'cyan' | 'magenta';
  delay?: number;
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

  const glowStyles =
    glowColor === 'cyan'
      ? 'shadow-[0_0_60px_rgba(0,240,255,0.15),0_0_120px_rgba(0,240,255,0.05)] hover:shadow-[0_0_80px_rgba(0,240,255,0.25),0_0_160px_rgba(0,240,255,0.1)]'
      : 'shadow-[0_0_60px_rgba(255,0,144,0.15),0_0_120px_rgba(255,0,144,0.05)] hover:shadow-[0_0_80px_rgba(255,0,144,0.25),0_0_160px_rgba(255,0,144,0.1)]';

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 60, rotateY: glowColor === 'cyan' ? -8 : 8 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`${className}`}
      style={{ perspective: 1000 }}
    >
      <div
        className={`phone-mockup phone-mockup-lg transition-shadow duration-700 ${glowStyles}`}
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

export function GameShowcase() {
  const { t } = useLanguage();
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const letters = titleRef.current.querySelectorAll('.neon-letter');
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      letters,
      { opacity: 0, y: 80, rotationX: -90, scale: 0.5 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      }
    );

    tl.to(letters, {
      textShadow: '0 0 20px rgba(0,240,255,0.8), 0 0 60px rgba(0,240,255,0.4), 0 0 100px rgba(0,240,255,0.2)',
      duration: 0.4,
      stagger: 0.03,
      ease: 'power2.inOut',
    }, '-=0.3');

    return () => { tl.kill(); };
  }, []);

  const neonWord = 'NEON';
  const dodgeWord = 'DODGE';

  return (
    <section className="relative py-24 md:py-40 w-full overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(0,240,255,0.1)] to-transparent" />
        <div className="absolute top-1/3 left-0 w-[40%] h-[600px] bg-[radial-gradient(ellipse,rgba(0,240,255,0.04)_0%,transparent_70%)]" />
        <div className="absolute bottom-1/4 right-0 w-[40%] h-[600px] bg-[radial-gradient(ellipse,rgba(255,0,144,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 md:mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-neon-cyan" />
            <span className="text-[11px] tracking-[0.3em] text-neon-cyan/60 uppercase font-semibold">
              {t('First Release', 'İlk Oyun')}
            </span>
            <div className="w-12 h-px bg-neon-cyan" />
          </motion.div>

          <div ref={titleRef} className="font-display text-5xl md:text-7xl lg:text-[7rem] font-extrabold tracking-[-0.02em] leading-[0.9]" style={{ perspective: 600 }}>
            <div className="mb-2">
              {neonWord.split('').map((letter, i) => (
                <span
                  key={`n-${i}`}
                  className="neon-letter inline-block text-glow-cyan"
                  style={{ display: 'inline-block', color: '#00F0FF' }}
                >
                  {letter}
                </span>
              ))}
            </div>
            <div>
              {dodgeWord.split('').map((letter, i) => (
                <span
                  key={`e-${i}`}
                  className="neon-letter inline-block text-glow-magenta"
                  style={{ display: 'inline-block', color: '#FF0090' }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-lg md:text-xl text-white/40 max-w-xl mx-auto font-light"
          >
            {t(
              'Survive the Neon. A fast-paced 2D dodge game set in the depths of space. Reflexes over strategy. Speed over power.',
              'Neon\'dan kaç. Uzayın derinliklerinde geçen hız dolu bir 2D kaçış oyunu. Strateji değil refleks. Güç değil hız.'
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10"
          >
            <PlayStoreBadge />
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-16 mb-24 md:mb-32">
          <PhoneMockup
            src={menuImg}
            alt="Neon Dodge - Menu Screen"
            glowColor="cyan"
            delay={0}
          />
          <VideoPhoneMockup
            videoSrc={`${import.meta.env.BASE_URL}neon-dodge-gameplay.mp4`}
            glowColor="magenta"
            delay={0.2}
            className="lg:mt-24"
          />
        </div>

      </div>
    </section>
  );
}
