
import { GoogleGenAI } from "@google/genai";
import { AIEditResponse } from "../types";

export const editImageWithAI = async (
  base64Image: string,
  prompt: string
): Promise<AIEditResponse> => {
  try {
    /**
     * IMPORTANTE: Seguindo as diretrizes obrigatórias do sistema, 
     * a chave deve ser obtida exclusivamente de process.env.API_KEY.
     * Em ambientes modernos de deployment, esta variável é injetada 
     * sem a necessidade do prefixo VITE_ para evitar exposição no bundle final.
     */
    const apiKey = process.env.API_KEY;

    if (!apiKey || apiKey === "undefined") {
      console.error("ERRO: process.env.API_KEY não detectada.");
      return { 
        error: "Configuração pendente: A chave de API não foi detectada. Verifique se a variável 'API_KEY' está configurada corretamente no painel do seu provedor." 
      };
    }

    // Inicialização do SDK conforme as regras (usando objeto nomeado)
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
            text: `Aplique os seguintes óculos nesta foto: ${prompt}. Mantenha o estilo realista e luxuoso.`,
          },
        ],
      },
      config: {
        systemInstruction: "Você é um especialista em visagismo para óticas de luxo. Sua tarefa é modificar a imagem do usuário para que ele apareça usando os óculos descritos de forma perfeitamente integrada e realista.",
      }
    });

    let imageUrl: string | undefined;
    
    // Iteração segura pelas partes da resposta para encontrar a imagem
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    if (!imageUrl) {
      return { error: "O Studio não conseguiu processar sua imagem agora. Tente descrever o modelo de óculos com outros termos." };
    }

    // Acessando .text como propriedade conforme as regras do SDK
    return { imageUrl, text: response.text };
  } catch (error: any) {
    console.error("Gemini Critical Error:", error);
    return { 
      error: `Erro no Studio AI: ${error.message || "Falha técnica na geração da imagem"}` 
    };
  }
};
