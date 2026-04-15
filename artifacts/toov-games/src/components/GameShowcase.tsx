import { useRef, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gameplayImg from '@assets/WhatsApp_Image_2026-04-15_at_20.50.50_1776275500060.jpeg';
import menuImg from '@assets/WhatsApp_Image_2026-04-15_at_20.50.51_1776275500060.jpeg';

gsap.registerPlugin(ScrollTrigger);

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
  const edgeWord = 'EDGE';

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
              {edgeWord.split('').map((letter, i) => (
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
              'Neondan kaç. Uzayın derinliklerinde geçen hız dolu bir 2D kaçış oyunu. Strateji değil refleks. Güç değil hız.'
            )}
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-16 mb-24 md:mb-32">
          <PhoneMockup
            src={menuImg}
            alt="Neon Edge - Menu Screen"
            glowColor="cyan"
            delay={0}
          />
          <PhoneMockup
            src={gameplayImg}
            alt="Neon Edge - Gameplay"
            glowColor="magenta"
            delay={0.2}
            className="lg:mt-24"
          />
        </div>

      </div>
    </section>
  );
}
