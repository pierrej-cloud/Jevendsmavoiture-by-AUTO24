import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const PROMPTS = {
  fr: (data: string) => `Tu es un expert en évaluation automobile qui travaille pour AUTO24.
Génère un rapport d'estimation positif et valorisant pour ce véhicule :
${data}

Le rapport doit contenir exactement 3 sections en JSON :
1. "points_forts" : liste de 3-4 points positifs du véhicule (ce qui justifie sa valeur), chaque point est une string courte
2. "justification_prix" : 2-3 phrases qui expliquent la fourchette de prix de façon positive et rassurante, sans dévaloriser
3. "conseil_vendeur" : 1 conseil bienveillant pour optimiser la vente

Ton : professionnel, positif, rassurant. Ne jamais utiliser de mots négatifs. Réponds UNIQUEMENT en JSON valide.`,

  en: (data: string) => `You are an automotive valuation expert working for AUTO24.
Generate a positive and value-focused estimation report for this vehicle:
${data}

The report must contain exactly 3 sections as JSON:
1. "points_forts" : list of 3-4 positive points about the vehicle (what justifies its value), each a short string
2. "justification_prix" : 2-3 sentences explaining the price range in a positive, reassuring way
3. "conseil_vendeur" : 1 helpful tip to optimize the sale

Tone: professional, positive, reassuring. Never use negative words. Reply ONLY with valid JSON.`,
};

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(null);
    }

    const body = await req.json();
    const { vehicleInfo, vehicleCondition, vehicleOptions, estimation, locale } = body;

    const vehicleData = [
      `Brand: ${vehicleInfo?.brand || "Unknown"}`,
      `Model: ${vehicleInfo?.model || "Unknown"}`,
      `Year: ${vehicleInfo?.year || "Unknown"}`,
      `Mileage: ${vehicleInfo?.mileage || "Unknown"}`,
      `Fuel: ${vehicleInfo?.fuelType || "Unknown"}`,
      `Transmission: ${vehicleInfo?.transmission || "Unknown"}`,
      `Color: ${vehicleInfo?.color || "Unknown"}`,
      `Condition: ${vehicleCondition?.generalCondition || "Unknown"}`,
      `Accident history: ${vehicleCondition?.accidentHistory ? "Yes" : "No"}`,
      `Mechanical issues: ${vehicleCondition?.mechanicalIssues ? "Yes" : "No"}`,
      `Drivable: ${vehicleCondition?.isDrivable ? "Yes" : "No"}`,
      `Service book: ${vehicleOptions?.serviceBook || "Unknown"}`,
      `Keys: ${vehicleOptions?.keys || "Unknown"}`,
      `Accessories: ${vehicleOptions?.accessories?.join(", ") || "None specified"}`,
      `Estimation: ${estimation?.min || 0} - ${estimation?.max || 0} ${estimation?.currency || "XOF"}`,
    ].join("\n");

    const promptFn = PROMPTS[locale as keyof typeof PROMPTS] || PROMPTS.en;
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: promptFn(vehicleData),
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(null);
    }

    const parsed = JSON.parse(textBlock.text.trim());

    return NextResponse.json({
      strengths: parsed.points_forts || [],
      priceJustification: parsed.justification_prix || "",
      sellerTip: parsed.conseil_vendeur || "",
    });
  } catch {
    return NextResponse.json(null);
  }
}
