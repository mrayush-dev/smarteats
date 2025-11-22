import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AISuggestion } from "../types";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API_KEY is missing in process.env");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const getFoodRecommendations = async (
  query: string
): Promise<AISuggestion[]> => {
  const ai = getClient();
  if (!ai) return [];

  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        dishName: { type: Type.STRING },
        reason: { type: Type.STRING, description: "Why this is a good choice based on the user request" },
        cuisine: { type: Type.STRING },
        estimatedCalories: { type: Type.STRING }
      },
      required: ["dishName", "reason", "cuisine", "estimatedCalories"]
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Suggest 3 food dishes based on this user query: "${query}". be creative and appetizing.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "You are a knowledgeable food concierge for a delivery app. Suggest specific dishes."
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return Array.isArray(data) ? data : [];
    }
    return [];

  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};