import type { ContentType, Industry, Tone, GeneratedContent, UploadedScreenshot } from '@/types';

export async function generateContent(
  screenshots: UploadedScreenshot[],
  type: ContentType,
  industry: Industry,
  tone: Tone
): Promise<GeneratedContent[]> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      screenshots: screenshots.map((s) => ({
        id: s.id,
        analyzedFeatures: s.analyzedFeatures ?? [],
      })),
      type,
      industry,
      tone,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error ?? 'Generation failed');
  }

  const data = await response.json();
  return data.results as GeneratedContent[];
}

export async function analyzeScreenshot(screenshotId: string, base64Image: string): Promise<string[]> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ screenshotId, base64Image }),
  });

  if (!response.ok) throw new Error('Analysis failed');
  const data = await response.json();
  return data.features as string[];
}
