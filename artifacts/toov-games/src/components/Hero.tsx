import { useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import mascotColor from '@assets/Çalışma_Yüzeyi_8@2x_1776275353445.png';

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    const colors = ['rgba(0,240,255,', 'rgba(255,0,144,', 'rgba(232,87,58,', 'rgba(255,255,255,'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.03 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  useEffect(() => {
    if (!mascotRef.current) return;
    gsap.to(mascotRef.current, {
      y: -15,
      rotation: 2,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,240,255,0.06)_0%,transparent_60%)]" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,0,144,0.04)_0%,transparent_60%)]" />
      </div>

      <motion.div
        style={{ y: bgY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-6 text-center"
      >
        <motion.div
          ref={mascotRef}
          initial={{ scale: 0, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-6 md:mb-10 relative"
        >
          <img
            src={mascotColor}
            alt="TOOV Mascot"
            className="w-24 md:w-36 lg:w-44 object-contain relative z-10 drop-shadow-[0_0_40px_rgba(232,87,58,0.4)]"
          />
          <div className="absolute inset-0 scale-[2.5] bg-[radial-gradient(circle,rgba(232,87,58,0.15)_0%,transparent_60%)] z-0" />
        </motion.div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] md:text-sm tracking-[0.4em] text-white/40 uppercase mb-6 font-semibold">
            {t('A 2D Game Studio', 'Bir 2D Oyun Studyosu')}
          </p>

          <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-extrabold leading-[0.85] tracking-[-0.04em] mb-6">
            <span className="block text-white">TOOV</span>
            <span className="block text-gradient-neon">GAMES</span>
          </h1>

          <p className="text-base md:text-xl text-white/50 max-w-lg mx-auto leading-relaxed font-light">
            {t(
              'We believe games are art. Every pixel, every frame, every line of code.',
              'Oyunun bir sanat olduguna inaniyoruz. Her piksel, her kare, her satir kod.'
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 md:mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-[10px] tracking-[0.3em] text-white/25 uppercase">
              {t('Scroll to explore', 'Kesfetmek icin kaydir')}
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
