import { LanguageProvider } from '@/lib/LanguageContext';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { About } from './About';
import { GameShowcase } from './GameShowcase';
import { FutureTeaser } from './FutureTeaser';
import { Footer } from './Footer';

export function Layout() {
  return (
    <LanguageProvider>
      <div className="min-h-[100dvh] w-full relative">
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
