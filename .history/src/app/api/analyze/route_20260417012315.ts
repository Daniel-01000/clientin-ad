import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const { screenshotId, base64Image, imageUrl } = await req.json();
    if (!base64Image && !imageUrl) return NextResponse.json({ error: 'No image provided' }, { status: 400 });

    const imageContent = base64Image
      ? { type: 'image_url' as const, image_url: { url: `data:image/jpeg;base64,${base64Image}`, detail: 'high' as const } }
      : { type: 'image_url' as const, image_url: { url: imageUrl, detail: 'high' as const } };

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `You are analyzing a screenshot of the ClientIn app — a loyalty and customer retention platform for local businesses.

Identify and list the key features, screens, flows, and UI elements visible in this screenshot.
Focus on: loyalty programs, customer tracking, rewards systems, dashboards, analytics, check-ins, wallet features, discovery/map screens, business settings.

Return a JSON array of strings. Each string describes one specific feature or screen element visible. Be specific and technical. Max 10 items. No markdown, just valid JSON array.`,
            },
            imageContent,
          ],
        },
      ],
      max_tokens: 500,
    });

    const text = response.choices[0].message.content ?? '[]';
    let features: string[] = [];
    try {
      features = JSON.parse(text);
    } catch {
      features = text.split('\n').filter(Boolean).slice(0, 10);
    }

    return NextResponse.json({ screenshotId, features });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Analysis failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
