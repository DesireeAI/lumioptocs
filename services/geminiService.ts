
import { GoogleGenAI } from "@google/genai";
import { AIEditResponse } from "../types";

export const editImageWithAI = async (
  base64Image: string,
  prompt: string
): Promise<AIEditResponse> => {
  try {
    // Inicialização direta conforme diretrizes: o ambiente deve fornecer process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
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
    return { error: "Ocorreu um erro na comunicação com a IA. Certifique-se de que a API_KEY está configurada corretamente no painel do Netlify." };
  }
};
