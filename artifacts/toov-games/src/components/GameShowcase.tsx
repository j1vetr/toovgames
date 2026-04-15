import { useState, useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import gameplayImg from '@assets/WhatsApp_Image_2026-04-15_at_20.50.50_1776275500060.jpeg';
import menuImg from '@assets/WhatsApp_Image_2026-04-15_at_20.50.51_1776275500060.jpeg';

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
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const titleX = useTransform(scrollYProgress, [0, 0.3], [-60, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section ref={sectionRef} className="relative py-24 md:py-40 w-full overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(0,240,255,0.1)] to-transparent" />
        <div className="absolute top-1/3 left-0 w-[40%] h-[600px] bg-[radial-gradient(ellipse,rgba(0,240,255,0.04)_0%,transparent_70%)]" />
        <div className="absolute bottom-1/4 right-0 w-[40%] h-[600px] bg-[radial-gradient(ellipse,rgba(255,0,144,0.04)_0%,transparent_70%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-neon-cyan" />
            <span className="text-[11px] tracking-[0.3em] text-neon-cyan/60 uppercase font-semibold">
              {t('First Release', 'Ilk Oyun')}
            </span>
          </motion.div>

          <motion.h2
            style={{ x: titleX, opacity: titleOpacity }}
            className="font-display text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-[-0.04em] leading-[0.9]"
          >
            <span className="glitch-text text-glow-cyan" data-text="NEON">
              NEON
            </span>
            <br />
            <span className="glitch-text text-glow-magenta" data-text="EDGE">
              EDGE
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-white/40 max-w-xl font-light"
          >
            {t(
              'Survive the Neon. A fast-paced 2D dodge game set in the depths of space. Reflexes over strategy. Speed over power.',
              'Neondan kac. Uzayin derinliklerinde gecen hizli tempolu bir 2D kacis oyunu. Strateji degil refleks. Guc degil hiz.'
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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative p-8 md:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-magenta/20 to-transparent" />

            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-neon-coral animate-pulse" />
              <span className="text-[11px] tracking-[0.3em] text-white/30 uppercase font-semibold">
                {t('Coming Soon', 'Yakinda')}
              </span>
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              {t('Be the first to play', 'Ilk oynayan sen ol')}
            </h3>
            <p className="text-white/40 mb-8 text-sm">
              {t(
                'Drop your email. We will notify you when Neon Edge launches.',
                'E-posta adresini birak. Neon Edge ciktiginda seni haberdar edelim.'
              )}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3" data-testid="form-notify">
              <input
                data-testid="input-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('your@email.com', 'senin@email.com')}
                required
                className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-neon-cyan/40 focus:ring-1 focus:ring-neon-cyan/20 transition-all duration-300"
              />
              <button
                data-testid="button-notify"
                type="submit"
                className="relative px-8 py-3.5 bg-white text-black text-sm font-semibold tracking-wide rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              >
                <span className="relative z-10">
                  {submitted
                    ? t('Done!', 'Tamam!')
                    : t('Notify Me', 'Haberdar Et')}
                </span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
