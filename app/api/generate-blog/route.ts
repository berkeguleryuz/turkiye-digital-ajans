import { NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const isApiKeyValid = apiKey && apiKey !== "PLACEHOLDER_API_KEY" && apiKey.length > 10;

export async function POST(request: Request) {
  // API key kontrolü
  if (!isApiKeyValid) {
    return NextResponse.json(
      {
        error: "GEMINI_API_KEY tanımlanmamış veya geçersiz. Lütfen .env dosyasına geçerli bir API anahtarı ekleyin."
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { topic } = body;

    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "Konu belirtilmedi" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

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
      const generatedPost = JSON.parse(response.text);
      return NextResponse.json(generatedPost);
    }

    return NextResponse.json(
      { error: "Gemini'den yanıt alınamadı" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Blog yazısı oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // API durumunu kontrol et
  return NextResponse.json({
    available: isApiKeyValid,
    message: isApiKeyValid
      ? "Gemini API hazır"
      : "GEMINI_API_KEY tanımlanmamış veya geçersiz"
  });
}
