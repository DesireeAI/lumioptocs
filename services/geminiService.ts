import { GoogleGenAI } from "@google/genai";
import { AIEditResponse } from "../types";

export const editImageWithAI = async (
  base64Image: string,
  prompt: string
): Promise<AIEditResponse> => {
  try {
    const res = await fetch("/.netlify/functions/edit-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ base64Image, prompt }),
    });

    if (!res.ok) {
      const err = await res.json();
      return { error: err.error || "Falha na requisição" };
    }

    const data = await res.json();
    return data;  // { imageUrl, text } ou { error }
  } catch (error: any) {
    console.error("Erro ao chamar função:", error);
    return { error: "Erro de rede ou servidor" };
  }
};
