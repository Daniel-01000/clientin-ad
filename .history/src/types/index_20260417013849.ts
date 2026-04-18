export type AdCategory = 'customer' | 'business' | 'launch';

export interface AdTemplate {
  id: string;
  category: AdCategory;
  title: string;
  headline: string;
  subheadline: string;
  caption: string;
  cta: string;
  screenshot: string; // path to public image
  layout: 'screenshot-left' | 'screenshot-right' | 'screenshot-center' | 'screenshot-bg' | 'dual-phone';
  accentColor: string;
  darkMode: boolean;
  badge?: string;
}
