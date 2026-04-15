import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { motion } from 'framer-motion';

import gameplayImg from '@assets/WhatsApp_Image_2026-04-15_at_20.50.50_1776275500060.jpeg';
import menuImg from '@assets/WhatsApp_Image_2026-04-15_at_20.50.51_1776275500060.jpeg';

export function GameShowcase() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="relative py-32 w-full bg-black overflow-hidden border-t border-white/5">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px] opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-magenta/10 rounded-full blur-[150px] opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block border border-accent/30 bg-accent/5 px-4 py-1.5 rounded-full text-accent text-sm font-mono tracking-widest mb-6"
          >
            {t("FIRST TITLE", "İLK OYUN")}
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter"
          >
            NEON <span className="text-accent text-shadow-neon-accent">EDGE</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto"
          >
            {t("Survive the Neon. Dodge or die.", "Neon'dan kaç. Dodge et ya da öl.")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group rounded-xl overflow-hidden border border-white/10 aspect-video"
          >
            <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
            <img src={menuImg} alt="Neon Edge Menu" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-20" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative group rounded-xl overflow-hidden border border-white/10 aspect-video lg:translate-y-12"
          >
            <div className="absolute inset-0 bg-magenta/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
            <img src={gameplayImg} alt="Neon Edge Gameplay" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-20" />
          </motion.div>
        </div>

        {/* Notify Form */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-magenta" />
          
          <h3 className="text-2xl font-display font-bold text-white mb-2">
            {t("Coming Soon", "Yakında")}
          </h3>
          <p className="text-white/60 mb-8">
            {t("Get notified when Neon Edge launches.", "Neon Edge çıktığında haberdar ol.")}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("Enter your email...", "E-posta adresiniz...")}
              required
              className="flex-1 bg-black/50 border border-white/20 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300"
            />
            <button 
              type="submit"
              className="relative px-8 py-4 bg-primary text-white font-bold tracking-wider rounded-lg overflow-hidden group"
            >
              <span className="relative z-10">{submitted ? t("Done!", "Eklendi!") : t("Notify Me", "Haberdar Et")}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
