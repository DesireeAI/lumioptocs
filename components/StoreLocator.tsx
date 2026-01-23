
import React from 'react';

const StoreLocator: React.FC = () => {
  return (
    <section id="localizacao" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em]">Onde a Magia Acontece</span>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">Uma experiência <br/><span className="italic">além das lentes.</span></h2>
              <p className="text-slate-600 leading-relaxed text-lg max-w-lg">
                Visite nosso showroom nos Jardins. Mais que uma loja, um espaço de consultoria onde cada detalhe é pensado para sua harmonia facial.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Localização
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Av. Paulista, 1000 — Jardins<br/>
                  São Paulo, SP
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 flex items-center">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                  Horários
                </h4>
                <p className="text-slate-500 text-sm">
                  Seg — Sex: 09h às 20h<br/>
                  Sábados: 10h às 18h
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-xl group"
              >
                <span>Traçar Rota</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              </a>
              <a 
                href="https://wa.me/5511987654321"
                className="inline-flex items-center space-x-3 border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-full font-bold hover:border-slate-900 transition-all"
              >
                <span>Falar com Consultor</span>
              </a>
            </div>
          </div>

          <div className="relative h-[500px] group">
            <div className="absolute inset-0 bg-amber-600 rounded-[3rem] translate-x-4 translate-y-4 -z-10 opacity-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform"></div>
            <div className="h-full bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative border border-slate-200">
              <img 
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&q=80&w=800" 
                alt="Nossa Loja" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-10">
                <p className="text-white font-serif italic text-2xl">"Onde o clássico encontra o amanhã."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreLocator;
