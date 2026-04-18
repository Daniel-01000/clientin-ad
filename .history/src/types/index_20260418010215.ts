export type AdCategory = 'customer' | 'business' | 'launch';
export type AdFormat = 'static' | 'animation-clip';
export type AdLayout =
  | 'screenshot-right'
  | 'screenshot-left'
  | 'screenshot-center'
  | 'screenshot-bg'
  | 'type-only'
  | 'split-stat'
  | 'minimal-quote'
  | 'dual-phone'
  | 'testimonial'
  | 'before-after';

export interface AdTemplate {
  id: string;
  category: AdCategory;
  format: AdFormat;
  title: string;
  headline: string;
  subheadline: string;
  caption: string;
  cta: string;
  screenshot?: string;
  layout: AdLayout;
  accentColor: string;
  darkMode: boolean;
  badge?: string;
  stat?: { value: string; label: string };
  quote?: string;
  attribution?: string; // for testimonial layout
  platform?: 'instagram' | 'tiktok' | 'linkedin' | 'twitter'; // for specifying the social media platform
  animationScript?: string; // for animation-clip cards
}

// Content generation types
export type ContentType =
  | 'instagram-caption'
  | 'carousel-idea'
  | 'ad-headline'
  | 'ad-body'
  | 'linkedin-post'
  | 'video-concept'
  | 'cta'
  | 'hook'
  | 'promo-concept';

export type Industry = 'barbershop' | 'café' | 'salon' | 'restaurant' | 'general';

export type Tone = 'premium' | 'founder-led' | 'direct' | 'educational' | 'bold';

export interface GeneratedContent {
  id: string;
  title: string;
  angle: string;
  content: string;
  shortCaption?: string;
  cta: string;
  hashtags: string[];
  type: ContentType;
  industry: Industry;
  tone: Tone;
  saved?: boolean;
  screenshotIds?: string[];
}

export interface UploadedScreenshot {
  id: string;
  file: File;
  preview: string;
  analysis?: string[];
}
