import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const PROMPTS = {
  fr: "Tu es un expert automobile. Analyse cette photo de véhicule et extrais en JSON : brand (marque), model (modèle), color (couleur), estimated_year (année estimée, nombre), body_type (type de carrosserie), visible_plate (plaque visible ou null), visible_damage (liste de dommages visibles, tableau de strings). Réponds UNIQUEMENT en JSON valide, sans texte autour.",
  en: "You are an automotive expert. Analyze this vehicle photo and extract as JSON: brand, model, color, estimated_year (number), body_type, visible_plate (or null), visible_damage (list of strings). Reply ONLY with valid JSON, no surrounding text.",
};

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(null);
    }

    const { imageBase64, mimeType, locale } = await req.json();
    if (!imageBase64) {
      return NextResponse.json(null);
    }

    const client = new Anthropic({ apiKey });
    const prompt = PROMPTS[locale as keyof typeof PROMPTS] || PROMPTS.en;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mimeType || "image/jpeg",
                data: imageBase64,
              },
            },
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(null);
    }

    const jsonStr = textBlock.text.trim();
    const parsed = JSON.parse(jsonStr);

    return NextResponse.json({
      brand: parsed.brand || null,
      model: parsed.model || null,
      color: parsed.color || null,
      estimatedYear: parsed.estimated_year || null,
      bodyType: parsed.body_type || null,
      visiblePlate: parsed.visible_plate || null,
      visibleDamage: parsed.visible_damage || [],
      confidence: "high",
    });
  } catch {
    return NextResponse.json(null);
  }
}
