
import { GoogleGenAI } from "@google/genai";
import { AIEditResponse } from "../types";

export const editImageWithAI = async (
  base64Image: string,
  prompt: string
): Promise<AIEditResponse> => {
  try {
    // Acesso direto à variável de ambiente injetada pelo Netlify
    const apiKey = process.env.VITE_API_KEY;

    if (!apiKey || apiKey === "undefined") {
      console.error("ERRO CRÍTICO: API_KEY não definida no ambiente.");
      return { 
        error: "A Chave de API (API_KEY) não foi detectada no seu navegador. Certifique-se de que configurou a variável de ambiente no Netlify e realizou um 'Clear Cache and Deploy'." 
      };
    }

    // Inicialização do SDK seguindo estritamente as diretrizes
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
            text: `Por favor, aplique estes óculos ou estilo na pessoa da foto: ${prompt}`,
          },
        ],
      },
      config: {
        systemInstruction: "Você é um estilista de óculos de luxo. Sua tarefa é editar a imagem para que a pessoa pareça estar usando os óculos descritos de forma perfeitamente realista.",
      }
    });

    let imageUrl: string | undefined;
    
    // Iteração correta sobre as partes da resposta
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    if (!imageUrl) {
      return { error: "Não foi possível gerar a prévia visual. Tente um comando mais simples." };
    }

    return { imageUrl, text: response.text };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    
    // Tratamento de erro específico para chave não autorizada/créditos
    if (error.message?.includes("API key not valid")) {
      return { error: "Chave de API inválida. Verifique se copiou a chave corretamente do Google AI Studio." };
    }
    
    return { 
      error: `Erro ao processar imagem: ${error.message || "Falha na comunicação com a IA"}` 
    };
  }
};
