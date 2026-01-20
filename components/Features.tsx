
import React from 'react';

const services = [
  {
    title: "Exames de Vista",
    description: "Tecnologia de ponta para diagnosticar sua saúde ocular com precisão absoluta.",
    icon: (
      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Visagismo",
    description: "Consultoria especializada para encontrar a armação que melhor harmoniza com seu rosto.",
    icon: (
      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: "Ajuste Sob Medida",
    description: "Laboratório próprio para ajustes precisos e montagem rápida de lentes premium.",
    icon: (
      <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 00-1 1v1a2 2 0 11-4 0v-1a1 1 0 00-1-1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    )
  }
];

const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
              {service.icon}
            </div>
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">{service.title}</h3>
            <p className="text-slate-600 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
