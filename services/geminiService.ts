
import { GoogleGenAI } from "@google/genai";
import { AIEditResponse } from "../types";

export const editImageWithAI = async (
  base64Image: string,
  prompt: string
): Promise<AIEditResponse> => {
  try {
    // O nome correto da variável deve ser API_KEY
    // O SDK será inicializado sempre antes da chamada para garantir o uso da chave atual
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      return { error: "A chave API_KEY não foi configurada nas variáveis de ambiente." };
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
            text: `System: You are a professional eyewear stylist for Lumina Optics.
            User Request: ${prompt}. 
            Instruction: Modify the image to fulfill the request. Make the glasses look natural and high-end.`,
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
    return { error: "Não foi possível processar a imagem. Verifique sua chave API_KEY no Netlify." };
  }
};
