// netlify/functions/edit-image.ts
import type { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { base64Image, prompt } = JSON.parse(event.body || "{}");

    if (!base64Image || !prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing base64Image or prompt" }) };
    }

    const apiKey = process.env.VITE_API_KEY;  // ou GEMINI_API_KEY, sem VITE_ aqui (é server-side)

    if (!apiKey) {
      console.error("Missing API key");
      return { statusCode: 500, body: JSON.stringify({ error: "Server configuration error" }) };
    }

    const ai = new GoogleGenAI({ apiKey });

    const base64Data = base64Image.split(',')[1] || base64Image;
    const mimeType = base64Image.split(';')[0].split(':')[1] || 'image/jpeg';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType, data: base64Data } },
            { text: prompt },
          ],
        },
      ],
      systemInstruction: "Você é um especialista em visagismo e consultor de estilo para óculos de luxo. Sua missão é editar fotos de clientes para mostrar como eles ficariam usando modelos específicos de óculos, mantendo o máximo realismo possível.",
    });

    let imageUrl: string | undefined;
    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData?.data) {
          imageUrl = `data:${part.inlineData.mimeType || mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      return { statusCode: 500, body: JSON.stringify({ error: "Não foi possível gerar a imagem" }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        imageUrl,
        text: response.text || "Imagem gerada com sucesso.",
      }),
    };
  } catch (error: any) {
    console.error("Gemini error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Falha na IA" }),
    };
  }
};