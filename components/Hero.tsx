
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Abstract Shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 space-y-8 animate-fade-in-up">
            <div className="inline-block px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider">
              Nova Coleção 2024
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight">
              A clareza que o seu <span className="italic text-amber-600">olhar</span> merece.
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Curadoria exclusiva de marcas internacionais e design artesanal. Na Lumina Optics, transformamos visão em expressão de estilo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#colecoes" 
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
              >
                Ver Coleções
              </a>
              <a 
                href="#studio-ai" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-full font-medium hover:bg-slate-50 transition-all"
              >
                Visualizar com AI
              </a>
            </div>
            
            <div className="flex items-center space-x-8 pt-8 border-t border-slate-200">
              <div>
                <p className="text-2xl font-serif font-bold text-slate-900">15+</p>
                <p className="text-sm text-slate-500 uppercase tracking-tighter">Marcas Premium</p>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div>
                <p className="text-2xl font-serif font-bold text-slate-900">8k+</p>
                <p className="text-sm text-slate-500 uppercase tracking-tighter">Clientes Felizes</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block h-[600px]">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800" 
                alt="Elegant eyewear model" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-[200px]">
              <div className="flex space-x-1 mb-2">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm font-medium text-slate-800">"Melhor experiência de compra de óculos que já tive."</p>
              <p className="text-xs text-slate-500 mt-1">— Mariana Costa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
