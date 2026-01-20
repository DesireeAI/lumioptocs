
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-white border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-serif font-bold tracking-tight text-slate-900 mb-6">
              LUMINA<span className="font-light">OPTICS</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              Elevando o padrão da ótica tradicional com tecnologia, curadoria de luxo e atendimento personalizado.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'instagram', 'twitter'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 border border-current rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6">Menu</h3>
            <ul className="space-y-4">
              {[
                { name: 'Início', href: '#inicio' },
                { name: 'Coleções', href: '#colecoes' },
                { name: 'Serviços', href: '#servicos' },
                { name: 'AI Studio', href: '#studio-ai' }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-slate-500 hover:text-amber-600 transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6">Contato</h3>
            <ul className="space-y-4 text-slate-500">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Av. Paulista, 1000 — Jardins, São Paulo/SP</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(11) 98765-4321</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>contato@luminaoptics.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-6">Newsletter</h3>
            <p className="text-sm text-slate-500 mb-4">Se inscreva para promoções exclusivas.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-amber-500 outline-none transition-all"
              />
              <button className="w-full bg-slate-900 text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-slate-800 transition-all">
                Inscrever
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:row justify-between items-center text-sm text-slate-400">
          <p>© 2024 Lumina Optics. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-amber-600 transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
