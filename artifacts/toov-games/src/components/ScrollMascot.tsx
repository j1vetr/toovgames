import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import lottie1 from '@assets/mascot-lottie-1.json';
import lottie2 from '@assets/mascot-lottie-2.json';
import lottie3 from '@assets/mascot-lottie-3.json';

const animations = [lottie1, lottie2, lottie3];

interface MascotStage {
  scrollStart: number;
  scrollEnd: number;
  x: string;
  y: string;
  scale: number;
  opacity: number;
  rotate: number;
  lottieIndex: number;
}

const stages: MascotStage[] = [
  { scrollStart: 0, scrollEnd: 0.08, x: '85vw', y: '30vh', scale: 0, opacity: 0, rotate: 0, lottieIndex: 0 },
  { scrollStart: 0.08, scrollEnd: 0.15, x: '85vw', y: '35vh', scale: 0.9, opacity: 1, rotate: -5, lottieIndex: 0 },
  { scrollStart: 0.15, scrollEnd: 0.25, x: '10vw', y: '50vh', scale: 1, opacity: 1, rotate: 10, lottieIndex: 0 },
  { scrollStart: 0.25, scrollEnd: 0.35, x: '5vw', y: '45vh', scale: 0.85, opacity: 1, rotate: -3, lottieIndex: 1 },
  { scrollStart: 0.35, scrollEnd: 0.50, x: '80vw', y: '30vh', scale: 1.1, opacity: 1, rotate: 5, lottieIndex: 1 },
  { scrollStart: 0.50, scrollEnd: 0.65, x: '85vw', y: '55vh', scale: 0.9, opacity: 1, rotate: -8, lottieIndex: 2 },
  { scrollStart: 0.65, scrollEnd: 0.78, x: '50vw', y: '40vh', scale: 1, opacity: 1, rotate: 0, lottieIndex: 2 },
  { scrollStart: 0.78, scrollEnd: 0.88, x: '85vw', y: '60vh', scale: 0.8, opacity: 0.6, rotate: 10, lottieIndex: 2 },
  { scrollStart: 0.88, scrollEnd: 1.0, x: '50vw', y: '80vh', scale: 0, opacity: 0, rotate: 20, lottieIndex: 2 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function parseVw(val: string) {
  return parseFloat(val);
}

function interpolateStage(progress: number) {
  for (let i = 0; i < stages.length - 1; i++) {
    const curr = stages[i];
    const next = stages[i + 1];
    if (progress >= curr.scrollStart && progress < next.scrollStart) {
      const t = (progress - curr.scrollStart) / (next.scrollStart - curr.scrollStart);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      return {
        x: lerp(parseVw(curr.x), parseVw(next.x), eased),
        y: lerp(parseVw(curr.y), parseVw(next.y), eased),
        scale: lerp(curr.scale, next.scale, eased),
        opacity: lerp(curr.opacity, next.opacity, eased),
        rotate: lerp(curr.rotate, next.rotate, eased),
        lottieIndex: progress < (curr.scrollStart + next.scrollStart) / 2 ? curr.lottieIndex : next.lottieIndex,
      };
    }
  }
  const last = stages[stages.length - 1];
  return {
    x: parseVw(last.x),
    y: parseVw(last.y),
    scale: last.scale,
    opacity: last.opacity,
    rotate: last.rotate,
    lottieIndex: last.lottieIndex,
  };
}

export function ScrollMascot() {
  const { scrollYProgress } = useScroll();
  const [state, setState] = useState({
    x: 85, y: 30, scale: 0, opacity: 0, rotate: 0, lottieIndex: 0,
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
      className="fixed z-40 pointer-events-none"
      style={{
        left: `${state.x}vw`,
        top: `${state.y}vh`,
        transform: `translate(-50%, -50%) scale(${state.scale}) rotate(${state.rotate}deg)`,
        opacity: state.opacity,
        transition: 'none',
        willChange: 'transform, opacity, left, top',
      }}
    >
      <div className="w-24 md:w-32 lg:w-40 drop-shadow-[0_0_30px_rgba(232,87,58,0.4)]">
        <Lottie
          lottieRef={lottieRef}
          animationData={animations[activeLottie]}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
