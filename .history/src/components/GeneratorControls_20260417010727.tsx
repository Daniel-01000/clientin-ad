'use client';

import { clsx } from 'clsx';
import type { Industry, Tone, ContentType } from '@/types';

interface Props {
  industry: Industry;
  tone: Tone;
  contentType: ContentType;
  onIndustryChange: (v: Industry) => void;
  onToneChange: (v: Tone) => void;
  onContentTypeChange: (v: ContentType) => void;
  onGenerate: () => void;
  loading: boolean;
  disabled: boolean;
}

const industries: { value: Industry; label: string; emoji: string }[] = [
  { value: 'general', label: 'General', emoji: '🏪' },
  { value: 'barbershop', label: 'Barbershop', emoji: '✂️' },
  { value: 'café', label: 'Café', emoji: '☕' },
  { value: 'salon', label: 'Salon', emoji: '💅' },
  { value: 'restaurant', label: 'Restaurant', emoji: '🍽️' },
];

const tones: { value: Tone; label: string; desc: string }[] = [
  { value: 'premium', label: 'Premium', desc: 'Elevated & brand-quality' },
  { value: 'founder-led', label: 'Founder-Led', desc: 'Authentic & personal' },
  { value: 'direct', label: 'Direct', desc: 'Punchy & no-fluff' },
  { value: 'educational', label: 'Educational', desc: 'Insightful & value-first' },
  { value: 'bold', label: 'Bold', desc: 'Stop-scroll energy' },
];

const contentTypes: { value: ContentType; label: string; group: string }[] = [
  { value: 'instagram-caption', label: 'Instagram Caption', group: 'Social' },
  { value: 'carousel-idea', label: 'Carousel Idea', group: 'Social' },
  { value: 'hook', label: 'Hook Variations', group: 'Social' },
  { value: 'ad-headline', label: 'Ad Headlines', group: 'Ads' },
  { value: 'ad-body', label: 'Ad Body Copy', group: 'Ads' },
  { value: 'promo-concept', label: 'Promo Concept', group: 'Ads' },
  { value: 'cta', label: 'CTA Sets', group: 'Ads' },
  { value: 'linkedin-post', label: 'LinkedIn Post', group: 'Long-form' },
  { value: 'video-concept', label: 'Video Concept', group: 'Video' },
];

export default function GeneratorControls({
  industry,
  tone,
  contentType,
  onIndustryChange,
  onToneChange,
  onContentTypeChange,
  onGenerate,
  loading,
  disabled,
}: Props) {
  const groups = [...new Set(contentTypes.map((c) => c.group))];

  return (
    <div className="space-y-6">
      {/* Industry */}
      <div>
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
          Target Industry
        </label>
        <div className="flex flex-wrap gap-2">
          {industries.map((i) => (
            <button
              key={i.value}
              onClick={() => onIndustryChange(i.value)}
              className={clsx(
                'px-3.5 py-2 rounded-xl text-sm font-medium border transition-all',
                industry === i.value
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-amber-300'
              )}
            >
              {i.emoji} {i.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div>
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
          Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {tones.map((t) => (
            <button
              key={t.value}
              onClick={() => onToneChange(t.value)}
              title={t.desc}
              className={clsx(
                'px-3.5 py-2 rounded-xl text-sm font-medium border transition-all',
                tone === t.value
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Type */}
      <div>
        <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
          Content Type
        </label>
        <div className="space-y-2">
          {groups.map((group) => (
            <div key={group}>
              <p className="text-xs text-stone-400 mb-1.5">{group}</p>
              <div className="flex flex-wrap gap-2">
                {contentTypes.filter((c) => c.group === group).map((c) => (
                  <button
                    key={c.value}
                    onClick={() => onContentTypeChange(c.value)}
                    className={clsx(
                      'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all',
                      contentType === c.value
                        ? 'bg-amber-50 text-amber-700 border-amber-300'
                        : 'bg-white text-stone-600 border-stone-200 hover:border-amber-200'
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={disabled || loading}
        className={clsx(
          'w-full py-3.5 rounded-xl font-semibold text-sm transition-all',
          disabled || loading
            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
            : 'bg-amber-600 text-white hover:bg-amber-700 shadow-sm hover:shadow-md'
        )}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating…
          </span>
        ) : (
          '✦ Generate Content'
        )}
      </button>

      {disabled && (
        <p className="text-xs text-stone-400 text-center">
          Upload screenshots to start generating
        </p>
      )}
    </div>
  );
}
