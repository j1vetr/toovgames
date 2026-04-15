import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import lottie1 from '@assets/mascot-lottie-1.json';
import lottie2 from '@assets/mascot-lottie-2.json';
import lottie3 from '@assets/mascot-lottie-3.json';

const animations = [lottie1, lottie2, lottie3];

interface MascotStage {
  scrollStart: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  rotate: number;
  lottieIndex: number;
}

const stages: MascotStage[] = [
  { scrollStart: 0,    x: 92, y: 50, scale: 0,    opacity: 0,   rotate: 0,   lottieIndex: 0 },
  { scrollStart: 0.08, x: 92, y: 50, scale: 0.7,  opacity: 0.8, rotate: -3,  lottieIndex: 0 },
  { scrollStart: 0.18, x: 5,  y: 80, scale: 0.75, opacity: 0.8, rotate: 5,   lottieIndex: 0 },
  { scrollStart: 0.28, x: 5,  y: 80, scale: 0,    opacity: 0,   rotate: 0,   lottieIndex: 0 },
  { scrollStart: 0.38, x: 92, y: 75, scale: 0,    opacity: 0,   rotate: 0,   lottieIndex: 1 },
  { scrollStart: 0.42, x: 92, y: 75, scale: 0.8,  opacity: 0.8, rotate: -5,  lottieIndex: 1 },
  { scrollStart: 0.55, x: 5,  y: 70, scale: 0.7,  opacity: 0.8, rotate: 8,   lottieIndex: 1 },
  { scrollStart: 0.62, x: 5,  y: 70, scale: 0,    opacity: 0,   rotate: 0,   lottieIndex: 1 },
  { scrollStart: 0.70, x: 92, y: 50, scale: 0,    opacity: 0,   rotate: 0,   lottieIndex: 2 },
  { scrollStart: 0.75, x: 92, y: 50, scale: 0.75, opacity: 0.7, rotate: -3,  lottieIndex: 2 },
  { scrollStart: 0.85, x: 92, y: 80, scale: 0.6,  opacity: 0.5, rotate: 5,   lottieIndex: 2 },
  { scrollStart: 0.92, x: 92, y: 80, scale: 0,    opacity: 0,   rotate: 10,  lottieIndex: 2 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function interpolateStage(progress: number) {
  if (progress <= stages[0].scrollStart) {
    const s = stages[0];
    return { x: s.x, y: s.y, scale: s.scale, opacity: s.opacity, rotate: s.rotate, lottieIndex: s.lottieIndex };
  }

  for (let i = 0; i < stages.length - 1; i++) {
    const curr = stages[i];
    const next = stages[i + 1];
    if (progress >= curr.scrollStart && progress < next.scrollStart) {
      const t = easeInOutQuad((progress - curr.scrollStart) / (next.scrollStart - curr.scrollStart));
      return {
        x: lerp(curr.x, next.x, t),
        y: lerp(curr.y, next.y, t),
        scale: lerp(curr.scale, next.scale, t),
        opacity: lerp(curr.opacity, next.opacity, t),
        rotate: lerp(curr.rotate, next.rotate, t),
        lottieIndex: t < 0.5 ? curr.lottieIndex : next.lottieIndex,
      };
    }
  }

  const last = stages[stages.length - 1];
  return { x: last.x, y: last.y, scale: last.scale, opacity: last.opacity, rotate: last.rotate, lottieIndex: last.lottieIndex };
}

export function ScrollMascot() {
  const { scrollYProgress } = useScroll();
  const [state, setState] = useState({
    x: 92, y: 50, scale: 0, opacity: 0, rotate: 0, lottieIndex: 0,
  });
  const [activeLottie, setActiveLottie] = useState(0);
  const prevLottieRef = useRef(0);
  const lottieRef = useRef<any>(null);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const result = interpolateStage(v);
    setState(result);

    if (result.lottieIndex !== prevLottieRef.current) {
      prevLottieRef.current = result.lottieIndex;
      setActiveLottie(result.lottieIndex);
    }
  });

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.goToAndPlay(0);
    }
  }, [activeLottie]);

  if (state.opacity < 0.01) return null;

  return (
    <div
      className="fixed z-30 pointer-events-none"
      style={{
        left: `${state.x}vw`,
        top: `${state.y}vh`,
        transform: `translate(-50%, -50%) scale(${state.scale}) rotate(${state.rotate}deg)`,
        opacity: state.opacity,
        willChange: 'transform, opacity, left, top',
      }}
    >
      <div className="w-20 md:w-28 lg:w-32 drop-shadow-[0_0_25px_rgba(232,87,58,0.3)]">
        <Lottie
          lottieRef={lottieRef}
          animationData={animations[activeLottie]}
          loop={false}
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
