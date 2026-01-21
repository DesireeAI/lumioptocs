
import { GoogleGenAI } from "@google/genai";
import { AIEditResponse } from "../types";

export const editImageWithAI = async (
  base64Image: string,
  prompt: string
): Promise<AIEditResponse> => {
  try {
    // Verificação de diagnóstico no console (F12)
    console.log("Tentando inicializar Gemini com API_KEY...");
    
    // Inicialização direta conforme a regra obrigatória do SDK
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

    if (!imageUrl && !textOutput) {
      throw new Error("A IA não retornou nenhum dado. Tente um prompt diferente.");
    }

    return { imageUrl, text: textOutput };
  } catch (error: any) {
    // Log detalhado para o desenvolvedor no console do navegador
    console.error("ERRO DETALHADO GEMINI:", error);
    
    let userFriendlyError = "Erro ao processar imagem.";
    
    if (!process.env.API_KEY) {
      userFriendlyError = "A API_KEY não foi detectada pelo navegador. Verifique o build no Netlify.";
    } else if (error.message?.includes("API key not valid")) {
      userFriendlyError = "A chave de API configurada é inválida.";
    } else if (error.message?.includes("model not found")) {
      userFriendlyError = "O modelo Gemini 2.5 Flash Image não está disponível para esta chave.";
    } else {
      userFriendlyError = `Erro da API: ${error.message || "Falha desconhecida"}`;
    }

    return { error: userFriendlyError };
  }
};
