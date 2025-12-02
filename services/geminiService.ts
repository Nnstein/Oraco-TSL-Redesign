import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("Gemini API Key is missing. Chat functionality will be disabled.");
      return null;
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
};

export const generateResponse = async (userMessage: string): Promise<string> => {
  try {
    const client = getAiClient();
    if (!client) {
      return "I'm currently offline. Please contact us via email.";
    }

    const response = await client.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: userMessage,
      config: {
        systemInstruction: `You are OracoBot, the friendly and professional AI assistant for Oraco Africa. 
        Oraco Africa is a leading technology consultancy firm.
        
        Your tone should be:
        - Professional yet approachable (like Grammarly's voice).
        - Concise and helpful.
        - Enthusiastic about technology and African innovation.

        Key Company Info:
        - Services: Web Development, Mobile Apps, Data Analytics, Cloud Infrastructure, Digital Strategy, Cyber Security.
        - Mission: Empowering African businesses through digital innovation.
        - Contact: info@oracoafrica.com.

        If asked about specific pricing, say you can't provide quotes but can arrange a consultation.
        Keep answers short (under 3 sentences unless asked for detail).`,
      },
    });

    return response.text || "I apologize, I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};