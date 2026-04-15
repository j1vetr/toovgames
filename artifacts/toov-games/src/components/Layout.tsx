import React from 'react';
import { LanguageProvider } from '@/lib/LanguageContext';
import { Navbar } from './Navbar';
import { CustomCursor } from './CustomCursor';
import { Hero } from './Hero';
import { About } from './About';
import { GameShowcase } from './GameShowcase';
import { FutureTeaser } from './FutureTeaser';
import { Footer } from './Footer';

export function Layout() {
  return (
    <LanguageProvider>
      <div className="min-h-[100dvh] w-full selection:bg-primary/30 selection:text-white">
        <CustomCursor />
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
