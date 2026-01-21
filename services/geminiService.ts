
import { GoogleGenAI } from "@google/genai";
import { AIEditResponse } from "../types";

export const editImageWithAI = async (
  base64Image: string,
  prompt: string
): Promise<AIEditResponse> => {
  try {
    // De acordo com as diretrizes do sistema, a chave DEVE ser obtida de process.env.API_KEY
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey || apiKey === "undefined" || apiKey === "") {
      console.error("ERRO: process.env.API_KEY não encontrada no ambiente.");
      return { 
        error: "Configuração pendente: A chave de API não foi detectada. Certifique-se de que a variável API_KEY está configurada no painel do Netlify." 
      };
    }

    // Inicialização obrigatória usando o objeto de configuração nomeado { apiKey }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const base64Data = base64Image.split(',')[1] || base64Image;
    const mimeType = base64Image.split(';')[0].split(':')[1] || 'image/jpeg';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        systemInstruction: "Você é um especialista em visagismo e consultor de estilo para óculos de luxo. Sua missão é editar fotos de clientes para mostrar como eles ficariam usando modelos específicos de óculos, mantendo o máximo realismo possível.",
      }
    });

    let imageUrl: string | undefined;
    
    // Verificação de todas as partes da resposta para extrair a imagem gerada
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    if (!imageUrl) {
      return { error: "O estúdio virtual não conseguiu gerar a imagem. Tente descrever o modelo de óculos desejado com mais detalhes." };
    }

    // Retorna a imagem e o texto (acessado como propriedade, não método)
    return { imageUrl, text: response.text };
  } catch (error: any) {
    console.error("Erro na API Gemini:", error);
    return { 
      error: `Erro técnico: ${error.message || "Falha na comunicação com o serviço de IA"}` 
    };
  }
};
