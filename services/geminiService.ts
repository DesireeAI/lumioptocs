
import { GoogleGenAI } from "@google/genai";
import { AIEditResponse } from "../types";

export const editImageWithAI = async (
  base64Image: string,
  prompt: string
): Promise<AIEditResponse> => {
  try {
    // Acesso ultra-seguro à API Key para evitar crash em browsers/Netlify
    let apiKey: string | undefined;
    
    try {
      // Tenta acessar via process.env (padrão Node/Bundlers)
      if (typeof process !== 'undefined' && process.env) {
        apiKey = process.env.API_KEY;
      }
      // Fallback para variáveis globais injetadas
      if (!apiKey && (window as any)._env_?.API_KEY) {
        apiKey = (window as any)._env_.API_KEY;
      }
    } catch (e) {
      console.warn("Ambiente não possui objeto process. Tentando alternativas...");
    }
    
    if (!apiKey) {
      return { error: "Configuração pendente: A chave de API não foi detectada no ambiente." };
    }

    const ai = new GoogleGenAI({ apiKey });
    
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
            text: `System: You are a professional eyewear stylist.
            User Request: ${prompt}. 
            Instruction: Modify the image to fulfill the request. Fit the glasses realistically.`,
          },
        ],
      },
    });

    let imageUrl: string | undefined;
    let textOutput: string | undefined;

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        } else if (part.text) {
          textOutput = part.text;
        }
      }
    }

    return { imageUrl, text: textOutput };
  } catch (error: any) {
    console.error("Erro Crítico Gemini:", error);
    return { error: "A IA encontrou um problema técnico. Tente novamente em instantes." };
  }
};
