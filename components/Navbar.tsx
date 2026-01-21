
import React, { useState } from 'react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Início', href: '#inicio' },
    { name: 'Coleções', href: '#colecoes' },
    { name: 'Localização', href: '#localizacao' },
    { name: 'AI Studio', href: '#studio-ai' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#inicio" className={`text-2xl font-serif font-bold tracking-tight ${scrolled ? 'text-slate-900' : 'text-slate-800'}`}>
              LUMINA<span className="font-light">OPTICS</span>
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium hover:text-amber-600 transition-colors ${
                    scrolled ? 'text-slate-600' : 'text-slate-700'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://wa.me/5511987654321"
                className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-md"
              >
                Agendar Horário
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${scrolled ? 'text-slate-700' : 'text-slate-800'}`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute w-full bg-white border-b border-slate-100 transition-all duration-300 ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-xl">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-amber-600 hover:bg-slate-50 rounded-md"
              onClick={handleLinkClick}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
