import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: 'No prompt provided' }, { status: 400 });

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'hd',
      style: 'vivid',
    });

    const url = response.data?.[0]?.url;
    if (!url) return NextResponse.json({ error: 'No image returned' }, { status: 500 });

    return NextResponse.json({ url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Image generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
