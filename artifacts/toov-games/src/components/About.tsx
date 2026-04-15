import { useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import mascotOutline from '@assets/Çalışma_Yüzeyi_9@2x_1776275353446.png';

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

function AnimatedParagraph({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={wordVariants}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const mascotY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const mascotRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const aboutText = t(
    'We started with a few lines of code and infinite imagination. TOOV Games was built by a team who believes in the magic of 2D games, for players. We design fluid, dynamic, and challenging experiences for those tired of complex worlds. In every game we develop, we listen to our community, shaping our games with their feedback.',
    'Birkac satir kod ve sonsuz bir hayal gucuyle basladik. TOOV Games, 2D oyunlarin buyusune inanan bir ekip tarafindan, oyuncular icin kuruldu. Karmasik dunyalardan sikilanlar icin akici, dinamik ve bir o kadar da meydan okuyucu deneyimler tasarliyoruz. Gelistirdigimiz her oyunda toplulugumuzun sesini dinliyor, oyunlarimizi bu geri bildirimlerle sekillendiriyoruz.'
  );

  const quoteText = t(
    'For us, gaming is not just a hobby \u2014 it is a form of art.',
    'Oyun bizce sadece bir hobi degil, bir sanat formudur.'
  );

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 w-full overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          <motion.div
            style={{ y: mascotY, rotate: mascotRotate }}
            className="lg:col-span-4 flex justify-center lg:justify-start relative"
          >
            <div className="relative">
              <img
                src={mascotOutline}
                alt="TOOV Mascot"
                className="w-48 md:w-64 select-none opacity-30 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                style={{ filter: 'brightness(1.5) contrast(1.2)' }}
              />
            </div>
          </motion.div>

          <div className="lg:col-span-8 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-12 h-px bg-neon-coral" />
              <span className="text-[11px] tracking-[0.3em] text-white/30 uppercase font-semibold">
                {t('Our Story', 'Hikayemiz')}
              </span>
            </motion.div>

            <AnimatedParagraph
              text={aboutText}
              className="text-lg md:text-2xl leading-relaxed text-white/70 font-light"
            />

            <motion.blockquote
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative pl-6 border-l-2 border-neon-coral/50"
            >
              <p className="text-xl md:text-2xl font-display font-semibold text-white/90 italic">
                "{quoteText}"
              </p>
            </motion.blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
