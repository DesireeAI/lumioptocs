
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Elementos decorativos de luxo */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100/50 -skew-x-12 translate-x-1/4 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-10 animate-fade-in-up">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="h-px w-12 bg-amber-600"></span>
                <span className="text-amber-700 text-xs font-bold uppercase tracking-[0.3em]">Excluvidade & Design</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif text-slate-900 leading-[1.1] tracking-tight">
                A arte de ver com <br/>
                <span className="italic text-amber-600">perfeição.</span>
              </h1>
            </div>
            
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed font-light">
              Muito além de uma ótica, uma consultoria de visagismo completa. 
              Unimos tecnologia de precisão com a curadoria das marcas mais desejadas do mundo.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <a 
                href="https://wa.me/5511987654321" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 bg-slate-900 text-white rounded-full font-bold hover:bg-amber-600 transition-all shadow-2xl hover:-translate-y-1 group"
              >
                <span>Agendar Consulta</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a 
                href="#colecoes" 
                className="inline-flex items-center justify-center px-10 py-5 border-2 border-slate-200 text-slate-900 rounded-full font-bold hover:bg-white hover:border-slate-900 transition-all"
              >
                Explorar Vitrine
              </a>
            </div>
            
            <div className="pt-12 grid grid-cols-3 gap-8 border-t border-slate-200 max-w-lg">
              <div>
                <p className="text-3xl font-serif text-slate-900">25</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Anos de História</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-slate-900">10k</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Clientes Féis</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-slate-900">100%</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Satisfação</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)]">
              <img 
                src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800" 
                alt="Eyewear Collection" 
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
            
            {/* Badge flutuante */}
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl max-w-[240px] border border-slate-100">
              <div className="flex items-center space-x-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-slate-800 font-serif italic text-lg leading-snug">"O melhor atendimento que já tive em São Paulo."</p>
              <div className="mt-4 flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dr. Ricardo M.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
