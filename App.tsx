
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import AIService from './components/AIService';
import Features from './components/Features';
import StoreLocator from './components/StoreLocator';
import Blog from './components/Blog';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar scrolled={scrolled} />
      
      <main>
        <div id="inicio">
          <Hero />
        </div>

        <section id="colecoes" className="py-24 bg-white">
          <Collections />
        </section>

        <section id="servicos" className="py-24 bg-slate-50">
          <Features />
        </section>

        {/* Novo: Localização Física */}
        <StoreLocator />

        <section id="studio-ai" className="py-24 bg-slate-900 text-white overflow-hidden">
          <AIService />
        </section>

        <section className="py-24 bg-white">
          <Blog />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
