'use client';

import { useState } from 'react';
import { Copy, Check, Bookmark, BookmarkCheck, ChevronDown, ChevronUp } from 'lucide-react';
import type { GeneratedContent } from '@/types';
import { clsx } from 'clsx';

const typeLabels: Record<string, string> = {
  'instagram-caption': 'Instagram Caption',
  'carousel-idea': 'Carousel Idea',
  'ad-headline': 'Ad Headline',
  'ad-body': 'Ad Body Copy',
  'linkedin-post': 'LinkedIn Post',
  'video-concept': 'Video Concept',
  cta: 'CTA',
  hook: 'Hook',
  'promo-concept': 'Promo Concept',
};

const typeColors: Record<string, string> = {
  'instagram-caption': 'bg-pink-100 text-pink-700',
  'carousel-idea': 'bg-purple-100 text-purple-700',
  'ad-headline': 'bg-blue-100 text-blue-700',
  'ad-body': 'bg-indigo-100 text-indigo-700',
  'linkedin-post': 'bg-sky-100 text-sky-700',
  'video-concept': 'bg-red-100 text-red-700',
  cta: 'bg-green-100 text-green-700',
  hook: 'bg-orange-100 text-orange-700',
  'promo-concept': 'bg-amber-100 text-amber-700',
};

interface Props {
  item: GeneratedContent;
  onToggleSave: (id: string) => void;
}

export default function ContentCard({ item, onToggleSave }: Props) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(item.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const preview = item.content.slice(0, 180);
  const isLong = item.content.length > 180;

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className={clsx('text-xs font-medium px-2.5 py-0.5 rounded-full', typeColors[item.type] ?? 'bg-stone-100 text-stone-600')}>
              {typeLabels[item.type] ?? item.type}
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 capitalize">
              {item.industry}
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-500 capitalize">
              {item.tone}
            </span>
          </div>
          <h3 className="font-semibold text-stone-800 text-sm leading-snug">{item.title}</h3>
        </div>
        <button
          onClick={() => onToggleSave(item.id)}
          className={clsx('shrink-0 p-1.5 rounded-lg transition-colors', item.saved ? 'text-amber-600 bg-amber-50' : 'text-stone-300 hover:text-amber-500')}
        >
          {item.saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
      </div>

      {item.angle && (
        <p className="text-xs text-stone-400 italic border-l-2 border-amber-200 pl-2">
          {item.angle}
        </p>
      )}

      <div className="text-stone-700 text-sm leading-relaxed whitespace-pre-wrap">
        {expanded || !isLong ? item.content : `${preview}…`}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-amber-600 font-medium text-xs inline-flex items-center gap-0.5 hover:underline"
          >
            {expanded ? (<><ChevronUp size={12} /> Less</>) : (<><ChevronDown size={12} /> More</>)}
          </button>
        )}
      </div>

      {item.cta && (
        <div className="bg-amber-50 rounded-xl px-3 py-2 text-xs text-amber-800 font-medium">
          CTA: {item.cta}
        </div>
      )}

      {item.hashtags && item.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {item.hashtags.map((tag) => (
            <span key={tag} className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              {tag.startsWith('#') ? tag : `#${tag}`}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-end pt-1 border-t border-stone-50">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-amber-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-amber-50"
        >
          {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
