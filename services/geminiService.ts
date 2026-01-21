
import { GoogleGenAI } from "@google/genai";
import { AIEditResponse } from "../types";

export const editImageWithAI = async (
  base64Image: string,
  prompt: string
): Promise<AIEditResponse> => {
  try {
    // Verificação da presença da chave conforme as diretrizes
    const apiKey = process.env.API_KEY;

    if (!apiKey || apiKey === "undefined" || apiKey === "") {
      console.error("ERRO: process.env.API_KEY não detectada.");
      return { 
        error: "Ambiente não configurado: A chave de API não foi detectada. Verifique as configurações de variáveis de ambiente." 
      };
    }

    // Fix: Create a new GoogleGenAI instance right before the call and use process.env.API_KEY directly
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    const base64Data = base64Image.split(',')[1] || base64Image;
    const mimeType = base64Image.split(';')[0].split(':')[1] || 'image/jpeg';

    // Fix: Move system-level instructions to config.systemInstruction
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
        systemInstruction: "You are an expert luxury eyewear stylist. Your task is to generate a realistic image of the person wearing the requested glasses based on the provided image and prompt.",
      }
    });

    let imageUrl: string | undefined;
    // Fix: Iterate through all parts to correctly find the generated image data
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    if (!imageUrl) {
      return { error: "A IA processou o pedido mas não gerou uma nova imagem. Tente ser mais específico no modelo dos óculos." };
    }

    // Fix: Use response.text (property, not method) to retrieve any text response from the model
    return { imageUrl, text: response.text };
  } catch (error: any) {
    console.error("Gemini Critical Error:", error);
    return { 
      error: `Falha técnica: ${error.message || "Erro desconhecido na API"}` 
    };
  }
};
