
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
      setError("Não foi possível conectar ao serviço de IA. Verifique sua conexão ou configurações de API.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>STUDIO VIRTUAL ATIVO</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            Visualize seu novo <span className="italic">estilo</span> em segundos.
          </h2>
          
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Nossa IA exclusiva permite que você experimente qualquer modelo de nossa vitrine virtualmente. 
            Basta subir uma foto e descrever o que deseja ver em você.
          </p>

          <div className="space-y-6">
            {!image ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-3xl p-12 transition-all cursor-pointer bg-slate-800/30 text-center"
              >
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-slate-500 group-hover:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-white font-medium">Clique para selecionar sua foto</p>
                <p className="text-slate-500 text-sm mt-2">JPG, PNG ou WebP até 5MB</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ex: 'Me mostre com óculos redondo de tartaruga'"
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl px-6 py-5 focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-slate-500"
                  />
                  <button 
                    onClick={handleEdit}
                    disabled={isProcessing || !prompt}
                    className="absolute right-2 top-2 bottom-2 px-6 bg-amber-500 text-slate-900 rounded-xl font-bold hover:bg-amber-400 disabled:opacity-50 transition-all shadow-lg"
                  >
                    {isProcessing ? 'Processando...' : 'Aplicar'}
                  </button>
                </div>
                <button 
                  onClick={() => {setImage(null); setResultImage(null); setPrompt(''); setError(null);}}
                  className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  <span>Remover Foto</span>
                </button>
              </div>
            )}

            {error && (
              <div className="animate-in fade-in slide-in-from-top-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start space-x-3">
                <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div className="text-xs text-red-200 leading-relaxed">
                  <p className="font-bold mb-1 uppercase tracking-tight">Erro de Configuração</p>
                  {error}
                </div>
              </div>
            )}
          </div>

          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-square lg:aspect-[4/5] bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-800/50">
            {image ? (
              <div className="w-full h-full relative">
                <img src={resultImage || image} className="w-full h-full object-cover" alt="Visualização AI" />
                {isProcessing && (
                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 relative mb-6">
                      <div className="absolute inset-0 border-4 border-amber-500/20 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-xl font-serif text-white mb-2">Refinando seu olhar...</p>
                    <p className="text-slate-400 text-sm">O Gemini está gerando sua nova versão.</p>
                  </div>
                )}
                {resultImage && !isProcessing && (
                  <div className="absolute top-6 right-6 px-4 py-2 bg-white text-slate-900 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                    Resultado Gerado
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center">
                <div className="w-32 h-32 bg-slate-700/30 rounded-full flex items-center justify-center mb-8">
                  <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h3 className="text-slate-500 font-serif text-2xl mb-2">Preview de Estilo</h3>
                <p className="text-slate-600">Sua foto aparecerá aqui para começarmos a transformação.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIService;
