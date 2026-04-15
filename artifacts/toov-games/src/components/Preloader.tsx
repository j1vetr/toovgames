import { useState } from 'react';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import preloaderData from '@assets/preloader-lottie.json';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [done, setDone] = useState(false);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={(def: any) => {
            if (def?.opacity === 0) onComplete();
          }}
        >
          <div className="w-40 md:w-56">
            <Lottie
              animationData={preloaderData}
              loop={false}
              autoplay
              onComplete={() => setDone(true)}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
