import { useState } from 'react';
import { LanguageProvider } from '@/lib/LanguageContext';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { About } from './About';
import { GameShowcase } from './GameShowcase';
import { FutureTeaser } from './FutureTeaser';
import { Footer } from './Footer';
import { Preloader } from './Preloader';

export function Layout() {
  const [loaded, setLoaded] = useState(false);

  return (
    <LanguageProvider>
      <Preloader onComplete={() => setLoaded(true)} />
      <div className={`min-h-[100dvh] w-full relative ${loaded ? '' : 'overflow-hidden max-h-[100dvh]'}`}>
        <div className="grain-overlay" />
        <Navbar />
        <main>
          <Hero />
          <About />
          <GameShowcase />
          <FutureTeaser />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
