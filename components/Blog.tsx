
import React from 'react';

const posts = [
  {
    id: 1,
    title: "Como escolher óculos pelo formato do rosto",
    excerpt: "Descubra as regras de ouro do visagismo para destacar sua beleza natural através da armação ideal.",
    category: "Guia de Estilo",
    date: "12 Mar, 2024",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "Tendências 2024: O retorno do retrô-futurismo",
    excerpt: "Lentes coloridas e armações translúcidas estão dominando as passarelas europeias este ano.",
    category: "Tendências",
    date: "08 Mar, 2024",
    image: "https://images.unsplash.com/photo-1509100194014-d49809396daa?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "A importância do filtro de luz azul no dia a dia",
    excerpt: "Passamos mais de 8 horas em telas. Saiba como proteger sua visão do cansaço digital.",
    category: "Saúde Ocular",
    date: "01 Mar, 2024",
    image: "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?auto=format&fit=crop&q=80&w=600"
  }
];

const Blog: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-serif text-slate-900 mb-4">Magazine Lumina</h2>
          <p className="text-slate-600">Dicas de especialistas sobre visão, moda e tecnologia para o seu olhar.</p>
        </div>
        <a href="#" className="mt-4 md:mt-0 text-amber-600 font-bold hover:text-amber-700 transition-colors flex items-center space-x-2 group">
          <span>Ver todos os artigos</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {posts.map((post) => (
          <article key={post.id} className="group cursor-pointer">
            <div className="relative aspect-[16/10] mb-6 overflow-hidden rounded-2xl">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <span className="text-xs text-slate-400 font-medium">{post.date}</span>
              <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-900 underline underline-offset-4 decoration-amber-500/30 group-hover:decoration-amber-500 transition-all">
                  Ler matéria completa
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
