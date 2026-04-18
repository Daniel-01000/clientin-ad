import type { ContentType, Industry, Tone } from '@/types';

export function buildSystemPrompt(): string {
  return `You are a world-class marketing strategist and copywriter for ClientIn — a loyalty and customer retention platform built for local businesses like barbershops, cafés, salons, and restaurants.

Your job is to generate sharp, modern, premium marketing content that feels like it was written by a real startup marketing team — not generic AI.

Core principles:
- Always market ClientIn around OUTCOMES, not features
- Focus: turning first-time customers into regulars, rewarding repeat visits, understanding customer behaviour, helping local businesses grow smarter
- Build around loyalty and deep customer understanding — not just discounts
- Write as if you deeply understand local business owners and their daily challenges
- Avoid generic ad language, cheesy sales phrases, buzzwords, weak hooks, robotic writing
- Every piece should feel sharp, direct, confident, and modern
- Match the energy of premium consumer tech brands (Stripe, Linear, Notion vibes for local biz)`;
}

export function buildUserPrompt(
  features: string[],
  type: ContentType,
  industry: Industry,
  tone: Tone,
  count: number = 4
): string {
  const industryContext: Record<Industry, string> = {
    barbershop: 'barbershops and barbers — think loyalty between a barber and their regulars, the ritual of a weekly cut',
    café: 'independent cafés — the morning ritual, regulars who keep the lights on, the barista who knows your order',
    salon: 'hair and beauty salons — returning clients, rebooking, the relationship between stylist and client',
    restaurant: 'local restaurants — regulars who fill tables every Friday, repeat diners, the chef who knows their guests',
    general: 'local businesses across all industries',
  };

  const toneGuide: Record<Tone, string> = {
    premium: 'elevated, confident, brand-quality — like a premium SaaS product page',
    'founder-led': 'authentic, direct, personal — as if the founder is speaking to another business owner',
    direct: 'punchy, no-fluff, conversion-focused — every word earns its place',
    educational: 'insightful, teaching-focused — give real value and insight about customer retention',
    bold: 'provocative, bold, attention-grabbing — make someone stop scrolling',
  };

  const contentInstructions: Record<ContentType, string> = {
    'instagram-caption': `Generate ${count} distinct Instagram post captions. Each should have:
- A strong hook (first line stops the scroll)
- Short version (under 80 chars) and long version (2–4 paragraphs)
- 3–5 targeted hashtags
- A clear CTA
- An "angle" label (e.g. "Retention story", "Social proof", "Problem-solution")`,

    'carousel-idea': `Generate ${count} Instagram carousel post concepts. Each should include:
- A carousel title/hook slide idea
- 4–6 slide titles and what each slide covers
- The overall angle and why it works
- A final slide CTA`,

    'ad-headline': `Generate ${count} ad headline sets. Each set should include:
- Primary headline (under 10 words)
- Secondary headline variation
- A descriptor line
- The angle/strategy behind it`,

    'ad-body': `Generate ${count} ad body copy options. Each should include:
- Opening hook
- Body (2–3 short paragraphs)
- CTA
- Target platform (Facebook, Instagram, Google)
- The emotional angle being used`,

    'linkedin-post': `Generate ${count} founder-style LinkedIn posts. Each should:
- Open with a bold, personal hook
- Share a real insight about customer loyalty or local business growth
- Reference something specific from the app features provided
- End with a call-to-discussion or CTA
- Feel like a real founder writing authentically, not a corporate post`,

    'video-concept': `Generate ${count} short-form video concepts (Reels/TikTok/YouTube Shorts). Each should include:
- Video hook (first 3 seconds)
- Scene-by-scene breakdown (5–8 scenes)
- Voiceover or text overlay ideas
- Target emotion/outcome
- Suggested visual style`,

    cta: `Generate ${count} sets of CTAs. Each set should include:
- Primary CTA (button text)
- Secondary CTA variation
- Micro-copy (supporting text below the button)
- Context (where this CTA would work best)`,

    hook: `Generate ${count} hook sets for social media. Each set should include:
- Hook variation A (question-based)
- Hook variation B (bold statement)
- Hook variation C (story/relatable)
- Hook variation D (data/insight)
- The emotional trigger being used`,

    'promo-concept': `Generate ${count} premium promotional post concepts. Each should include:
- Visual concept description (what the post looks like)
- Headline
- Body copy
- CTA
- Mood/aesthetic direction
- Target audience segment`,
  };

  return `App features identified from screenshots:
${features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

Target industry: ${industryContext[industry]}
Tone: ${toneGuide[tone]}
Content type: ${type}

${contentInstructions[type]}

Return a JSON array of exactly ${count} objects. Each object must have:
- "title": short label for this content piece
- "angle": the strategic angle/reasoning (1 sentence)
- "content": the main content (formatted clearly)
- "shortCaption": (if applicable) short version under 80 chars
- "cta": suggested call-to-action
- "hashtags": array of relevant hashtags (if applicable, else empty array)

Only return valid JSON. No markdown fences, no explanation outside the JSON.`;
}
