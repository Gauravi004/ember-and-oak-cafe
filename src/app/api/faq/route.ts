import { NextRequest, NextResponse } from "next/server";
import { CAFE_KNOWLEDGE_BASE } from "@/data/faq-knowledge";
import { CAFE_CONFIG } from "@/data/cafe-config";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string" || !question.trim()) {
      return NextResponse.json(
        { error: "A question string is required." },
        { status: 400 }
      );
    }

    const cleanQuestion = question.trim();
    const geminiKey = process.env.GEMINI_API_KEY;
    const n8nFaqUrl = process.env.N8N_FAQ_WEBHOOK_URL;

    // 1. Try Gemini API directly if key is configured
    if (geminiKey) {
      try {
        const knowledgeText = CAFE_KNOWLEDGE_BASE.map(
          (k) => `Q: ${k.question}\nA: ${k.answer}`
        ).join("\n\n");

        const prompt = `You are the knowledgeable, polite, and elegant Head Sommelier at "EMBER & OAK", a luxury specialty coffee roastery in London.
Brand Details:
- Name: ${CAFE_CONFIG.brand.name}
- Tagline: ${CAFE_CONFIG.brand.tagline}
- Address: ${CAFE_CONFIG.contact.address.street}, ${CAFE_CONFIG.contact.address.city}
- Roasting: 12kg micro-batches in cast iron, rested 72 hours in charred French Oak barrels.
- Hours: Mon-Fri 07:00-17:30, Sat 08:00-18:30, Sun 08:30-17:00. Oak Hour: Thu & Fri 18:00-22:00.

Verified Roastery Knowledge Base:
${knowledgeText}

CRITICAL RULES:
1. Ground your answer ONLY in the facts provided above.
2. If the user asks about anything not in the cafe's records or menu, politely decline: "I can only speak to documented Ember & Oak coffee sourcing, roasting, hours, and bookings. Please reach out to hello@emberandoak.com."
3. Never invent facts or hallucinate business policies.
4. Keep answers concise (under 80 words), poetic yet precise.

User Question: "${cleanQuestion}"`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const answer =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (answer) {
            return NextResponse.json({
              answer: answer.trim(),
              source: "gemini-ai",
            });
          }
        }
      } catch (geminiErr) {
        console.error("[Gemini API Error]", geminiErr);
      }
    }

    // 2. Try n8n FAQ webhook if configured
    if (n8nFaqUrl) {
      try {
        const n8nRes = await fetch(n8nFaqUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: cleanQuestion }),
        });

        if (n8nRes.ok) {
          const n8nData = await n8nRes.json();
          if (n8nData?.answer) {
            return NextResponse.json({
              answer: n8nData.answer,
              source: "n8n-workflow",
            });
          }
        }
      } catch (n8nErr) {
        console.error("[n8n FAQ Error]", n8nErr);
      }
    }

    // 3. Built-in Grounded Local Knowledge Matcher
    const qLower = cleanQuestion.toLowerCase();
    const scoredMatches = CAFE_KNOWLEDGE_BASE.map((item) => {
      let score = 0;
      const questionWords = item.question
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .split(" ");
      const answerWords = item.answer
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .split(" ");

      questionWords.forEach((word) => {
        if (word.length > 3 && qLower.includes(word)) score += 3;
      });

      if (qLower.includes(item.category)) score += 2;

      answerWords.forEach((word) => {
        if (word.length > 4 && qLower.includes(word)) score += 1;
      });

      return { item, score };
    });

    scoredMatches.sort((a, b) => b.score - a.score);
    const bestMatch = scoredMatches[0];

    if (bestMatch && bestMatch.score > 3) {
      return NextResponse.json({
        answer: bestMatch.item.answer,
        source: "grounded-knowledge-base",
      });
    }

    return NextResponse.json({
      answer:
        "I can only speak to verified Ember & Oak roastery operations, 72-hour oak maturation, table bookings, and our specialty coffee menu. For specific inquiries, our team is at hello@emberandoak.com.",
      source: "grounded-fallback",
    });
  } catch (err: unknown) {
    console.error("[API/FAQ Error]", err);
    return NextResponse.json(
      { error: "Error answering FAQ question." },
      { status: 500 }
    );
  }
}
