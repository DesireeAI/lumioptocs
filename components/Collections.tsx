
import React from 'react';
import { CollectionItem } from '../types';

const collections: CollectionItem[] = [
  { id: '1', name: 'Linha Urban', category: 'Moderno', imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400' },
  { id: '2', name: 'Vintage Chic', category: 'Clássico', imageUrl: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=400' },
  { id: '3', name: 'Sport Pro', category: 'Performance', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400' },
  { id: '4', name: 'Minimalist', category: 'Leveza', imageUrl: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=400' },
];

const Collections: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif text-slate-900 mb-4">Coleções Exclusivas</h2>
        <div className="w-20 h-1 bg-amber-600 mx-auto mb-6"></div>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Explore as tendências globais selecionadas por nossos especialistas em visagismo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {collections.map((item) => (
          <div key={item.id} className="group relative overflow-hidden rounded-xl bg-slate-100 aspect-[3/4]">
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-1">{item.category}</span>
              <h3 className="text-white text-xl font-serif font-bold">{item.name}</h3>
              <a href="#" className="mt-4 text-white text-sm font-medium underline underline-offset-4 hover:text-amber-400 transition-colors">
                Ver Detalhes
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="inline-flex items-center space-x-2 text-slate-900 font-semibold group">
          <span>Ver todo o catálogo</span>
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Collections;
