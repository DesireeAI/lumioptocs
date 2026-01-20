
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import AIService from './components/AIService';
import Features from './components/Features';
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
        {/* Seção Início */}
        <div id="inicio">
          <Hero />
        </div>

        {/* Seção Coleções */}
        <section id="colecoes" className="py-24 bg-white">
          <Collections />
        </section>

        {/* Seção Serviços */}
        <section id="servicos" className="py-24 bg-slate-50">
          <Features />
        </section>

        {/* Seção AI Studio */}
        <section id="studio-ai" className="py-24 bg-slate-900 text-white overflow-hidden">
          <AIService />
        </section>
      </main>

      {/* Seção Contato integrada no Footer */}
      <Footer />
    </div>
  );
};

export default App;
