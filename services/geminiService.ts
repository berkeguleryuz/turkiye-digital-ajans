import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

// API key durumunu kontrol et
const isApiKeyValid: boolean = !!(apiKey && apiKey !== "PLACEHOLDER_API_KEY" && apiKey.length > 10);

// Sadece geçerli API key varsa client oluştur
const ai = isApiKeyValid ? new GoogleGenAI({ apiKey }) : null;

export interface GeneratedPost {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
}

/**
 * Gemini API'nin kullanılabilir olup olmadığını kontrol eder
 */
export const isGeminiAvailable = (): boolean => {
  return isApiKeyValid && ai !== null;
};

/**
 * Gemini API durumunu döner (UI'da göstermek için)
 */
export const getGeminiStatus = (): { available: boolean; message: string } => {
  if (!apiKey) {
    return {
      available: false,
      message: "GEMINI_API_KEY ortam değişkeni tanımlanmamış",
    };
  }
  if (apiKey === "PLACEHOLDER_API_KEY") {
    return {
      available: false,
      message: "GEMINI_API_KEY henüz ayarlanmamış",
    };
  }
  if (!isApiKeyValid) {
    return {
      available: false,
      message: "GEMINI_API_KEY geçersiz görünüyor",
    };
  }
  return {
    available: true,
    message: "Gemini API hazır",
  };
};

export const generateBlogPost = async (topic: string): Promise<GeneratedPost> => {
  // API kullanılabilirlik kontrolü
  if (!isApiKeyValid || !ai) {
    const status = getGeminiStatus();
    throw new Error(status.message);
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a creative, edgy, and short blog post about: ${topic}. The tone should be modern, slightly rebellious, and digital-native. The language MUST be TURKISH.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            excerpt: { type: Type.STRING },
            content: { type: Type.STRING },
            author: { type: Type.STRING },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["title", "excerpt", "content", "author", "tags"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("Gemini'den yanıt alınamadı");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Blog yazısı oluşturulurken bir hata oluştu");
  }
};
