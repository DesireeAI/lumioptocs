
import { GoogleGenAI } from "@google/genai";
import { AIEditResponse } from "../types";

export const editImageWithAI = async (
  base64Image: string,
  prompt: string
): Promise<AIEditResponse> => {
  try {
    // Verificação segura da API Key para evitar crash do React
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
    
    if (!apiKey) {
      return { error: "API Key não encontrada. Configure a variável de ambiente API_KEY." };
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
    console.error("Gemini Error:", error);
    return { error: "Erro na IA. Verifique sua conexão ou chave de API." };
  }
};
