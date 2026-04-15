import React, { useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';

import mascotOutline from '@assets/Çalışma_Yüzeyi_9@2x_1776275353446.png';

export function About() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full py-32 flex items-center bg-background z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,87,58,0.05),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          style={{ opacity, y: y1 }}
          className="relative"
        >
          <img 
            src={mascotOutline} 
            alt="Mascot Outline" 
            className="w-full max-w-md mx-auto opacity-30 invert" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight">
            <span className="text-primary block mb-2">ART.</span>
            CODE.
            <br />
            <span className="text-white/50 block mt-2">MAGIC.</span>
          </h2>
          
          <div className="w-16 h-1 bg-accent" />
          
          <p className="text-lg md:text-xl leading-relaxed text-white/80 font-light">
            {t(
              "We started with a few lines of code and infinite imagination. TOOV Games is a team built for players, who believes in the magic of 2D games.",
              "Birkaç satır kod ve sonsuz bir hayal gücüyle başladık. TOOV Games, 2D oyunların büyüsüne inanan bir ekip tarafından, oyuncular için kuruldu."
            )}
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-white/80 font-light">
            {t(
              "We design fluid, dynamic, and challenging experiences for those tired of complex worlds. In every game we develop, we listen to our community, shaping our games with their feedback.",
              "Karmaşık dünyalardan sıkılanlar için akıcı, dinamik ve bir o kadar da meydan okuyucu deneyimler tasarlıyoruz. Geliştirdiğimiz her oyunda topluluğumuzun sesini dinliyor, oyunlarımızı bu geri bildirimlerle şekillendiriyoruz."
            )}
          </p>
          <p className="text-xl md:text-2xl text-white font-medium italic border-l-4 border-primary pl-6 py-2">
            {t(
              "For us, gaming is not just a hobby — it is a form of art.",
              "Oyun bizce sadece bir hobi değil, bir sanat formudur."
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
