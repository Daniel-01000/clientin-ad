export type Industry = 'barbershop' | 'café' | 'salon' | 'restaurant' | 'general';
export type Tone = 'premium' | 'founder-led' | 'direct' | 'educational' | 'bold';
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

export interface UploadedScreenshot {
  id: string;
  file?: File;
  preview: string;
  name: string;
  analyzedFeatures?: string[];
}

export interface GeneratedContent {
  id: string;
  type: ContentType;
  industry: Industry;
  tone: Tone;
  title: string;
  angle: string;
  content: string;
  shortCaption?: string;
  longCaption?: string;
  cta?: string;
  hashtags?: string[];
  saved: boolean;
  screenshotIds: string[];
}
