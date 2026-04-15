import { useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import mascotWhite from '@assets/Çalışma_Yüzeyi_10@2x_1776275353447.png';

export function FutureTeaser() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-40 md:py-56 w-full flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,87,58,0.03)_0%,transparent_60%)]" />
      </div>

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 text-center max-w-3xl px-6"
      >
        <div className="mb-12 relative">
          <motion.img
            src={mascotWhite}
            alt="Mystery"
            className="w-24 h-24 md:w-36 md:h-36 mx-auto select-none"
            style={{ opacity: 0.35, filter: 'brightness(1.8) drop-shadow(0 0 20px rgba(255,255,255,0.15))' }}
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 scale-[2] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white/80 tracking-tight leading-tight">
            {t('Something else', 'Baska bir sey')}
            <br />
            <span className="text-white/30">
              {t('is being crafted...', 'uretiliyor...')}
            </span>
          </h2>

          <p className="text-base md:text-lg text-white/25 max-w-md mx-auto font-light">
            {t(
              'Stay close. The next chapter is being written.',
              'Yakin ol. Bir sonraki bolum yaziliyor.'
            )}
          </p>

          <div className="flex justify-center gap-1.5 pt-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white/20"
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
