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
  platform?: 'instagram' | 'tiktok' | 'linkedin' | 'twitter';
  animationScript?: string; // for animation-clip cards
}
