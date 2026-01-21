
import React, { useState, useRef } from 'react';
import { editImageWithAI } from '../services/geminiService';

const AIService: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;

    setIsProcessing(true);
    setError(null);
    
    try {
      const response = await editImageWithAI(image, prompt);
      
      if (response.error) {
        setError(response.error);
      } else if (response.imageUrl) {
        setResultImage(response.imageUrl);
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado ao conectar com o servidor de IA.");
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResultImage(null);
    setPrompt('');
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider">
            Tecnologia Exclusiva
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-white">AI Visual Studio</h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Nossa inteligência artificial permite que você experimente estilos e filtros antes mesmo de vir à loja. Tire uma foto e peça: <br/>
            <span className="text-amber-500 italic">"Adicione óculos estilo aviador dourados"</span> ou <span className="text-amber-500 italic">"Aplique um filtro vintage preto e branco"</span>.
          </p>
          
          <div className="space-y-4 pt-6">
            {!image ? (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-all flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Carregar minha foto</span>
              </button>
            ) : (
              <div className="space-y-4">
                <div className="relative group">
                  <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEdit()}
                    placeholder="Ex: Adicione óculos retrô vermelhos..."
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl px-6 py-4 focus:ring-2 focus:ring-amber-500 outline-none transition-all pr-12"
                  />
                  <button 
                    disabled={isProcessing || !prompt}
                    onClick={handleEdit}
                    className="absolute right-2 top-2 p-2 bg-amber-500 rounded-xl text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-400 transition-all"
                  >
                    {isProcessing ? (
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </button>
                </div>
                <button 
                  onClick={reset}
                  className="text-slate-400 hover:text-white text-sm transition-colors flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>Começar de novo</span>
                </button>
              </div>
            )}
            
            {error && (
              <div className="p-4 bg-red-900/30 border border-red-500/40 text-red-100 rounded-xl text-sm leading-relaxed">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square bg-slate-800 rounded-3xl overflow-hidden border-4 border-slate-700/50 shadow-2xl flex items-center justify-center">
          {image ? (
            <div className="relative w-full h-full">
              <img 
                src={resultImage || image} 
                alt="AI Studio Output" 
                className="w-full h-full object-cover"
              />
              {isProcessing && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-white font-medium animate-pulse text-center px-6">O Gemini está redesenhando seu estilo...</p>
                </div>
              )}
              {resultImage && !isProcessing && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Resultado IA
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-12">
              <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium">Sua foto aparecerá aqui</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIService;
