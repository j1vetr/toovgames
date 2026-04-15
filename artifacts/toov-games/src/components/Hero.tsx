import React, { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import mascotGhost from '@assets/Çalışma_Yüzeyi_10@2x_1776275353447.png';
import mascotColor from '@assets/Çalışma_Yüzeyi_8@2x_1776275353445.png';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const mascotRef = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // Stars effect
    const canvas = document.getElementById('stars-canvas') as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const stars: {x: number, y: number, r: number, a: number, da: number}[] = [];
        for (let i = 0; i < 200; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5,
            a: Math.random(),
            da: (Math.random() - 0.5) * 0.05
          });
        }
        
        const render = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            star.a += star.da;
            if (star.a > 1 || star.a < 0) star.da = -star.da;
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, star.a))})`;
            ctx.fill();
          });
          requestAnimationFrame(render);
        };
        render();

        const handleResize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    }
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background z-0">
        <canvas id="stars-canvas" className="absolute inset-0 w-full h-full opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl px-6"
      >
        <div className="relative mb-8 md:mb-12 group">
          <motion.img 
            ref={mascotRef}
            src={mascotColor} 
            alt="TOOV Mascot" 
            className="w-32 md:w-48 lg:w-64 object-contain floating relative z-10 drop-shadow-[0_0_30px_rgba(232,87,58,0.5)]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-primary/20 blur-[100px] rounded-full z-0" />
        </div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center"
        >
          <div className="text-sm md:text-lg font-mono tracking-[0.3em] text-accent mb-4 uppercase">
            {t("Neon Edge — Coming Soon", "Neon Edge — Yakında")}
          </div>
          
          <h1 
            ref={textRef}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white mb-6 uppercase tracking-tighter"
          >
            <span className="glitch-effect text-shadow-neon-accent" data-text="NEON">NEON</span>
            <br />
            <span className="glitch-effect text-shadow-neon-magenta" data-text="EDGE">EDGE</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 font-light tracking-wide">
            {t("2D Games. Pure Art.", "2D Oyunlar. Saf Sanat.")}
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
