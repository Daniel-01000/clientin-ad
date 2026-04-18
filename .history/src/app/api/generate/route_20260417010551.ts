import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buildSystemPrompt, buildUserPrompt } from '@/lib/prompts';
import type { ContentType, Industry, Tone, GeneratedContent } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { screenshots, type, industry, tone } = await req.json() as {
      screenshots: { id: string; analyzedFeatures: string[] }[];
      type: ContentType;
      industry: Industry;
      tone: Tone;
    };

    const allFeatures = screenshots.flatMap((s) => s.analyzedFeatures).filter(Boolean);
    const screenshotIds = screenshots.map((s) => s.id);

    const userPrompt = buildUserPrompt(allFeatures, type, industry, tone, 4);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 3000,
      temperature: 0.85,
    });

    const raw = response.choices[0].message.content ?? '[]';
    let parsed: Omit<GeneratedContent, 'id' | 'saved' | 'screenshotIds' | 'type' | 'industry' | 'tone'>[] = [];
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    const results: GeneratedContent[] = parsed.map((item) => ({
      ...item,
      id: uuidv4(),
      type,
      industry,
      tone,
      saved: false,
      screenshotIds,
      hashtags: item.hashtags ?? [],
    }));

    return NextResponse.json({ results });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
