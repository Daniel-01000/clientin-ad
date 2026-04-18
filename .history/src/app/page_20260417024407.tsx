'use client';

import { useState, useMemo } from 'react';
import { Sparkles, Download, Film, ImageIcon } from 'lucide-react';
import { clsx } from 'clsx';
import type { AdCategory } from '@/types';
import { AD_TEMPLATES, CATEGORIES, PLATFORM_FILTERS, FORMAT_FILTERS } from '@/lib/templates';
import AdCard from '@/components/AdCard';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<AdCategory | 'all'>('all');
  const [activePlatform, setActivePlatform] = useState('all');
  const [activeFormat, setActiveFormat] = useState('all');

  const filtered = useMemo(() =>
    AD_TEMPLATES.filter((t) =>
      (activeCategory === 'all' || t.category === activeCategory) &&
      (activePlatform === 'all' || t.platform === activePlatform) &&
      (activeFormat === 'all' || t.format === activeFormat)
    ), [activeCategory, activePlatform, activeFormat]);

  const downloadAllStatic = async () => {
    const { toPng } = await import('html-to-image');
    const statics = filtered.filter((t) => t.format === 'static');
    for (const t of statics) {
      const el = document.querySelector<HTMLElement>(`[data-ad-id="${t.id}"]`);
      if (!el) continue;
      const dataUrl = await toPng(el, { pixelRatio: 3, cacheBust: true, backgroundColor: '#0a0a0a' });
      const a = document.createElement('a');
      a.download = `clientin-${t.id}.png`;
      a.href = dataUrl;
      a.click();
      await new Promise((r) => setTimeout(r, 350));
    }
  };

  const staticCount = filtered.filter((t) => t.format === 'static').length;
  const animCount = filtered.filter((t) => t.format === 'animation-clip').length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/6 bg-black/60 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Sparkles size={17} className="text-black" />
            </div>
            <div>
              <span className="font-bold text-white text-[15px] tracking-tight">ClientIn</span>
              <span className="text-white/25 text-[15px]"> · Ad Maker</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/25">{filtered.length} ads shown</span>
            {staticCount > 0 && (
              <button onClick={downloadAllStatic}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/6 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white text-xs font-semibold rounded-xl transition-all">
                <Download size={12} /> Download all ({staticCount})
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* Hero */}
        <div className="max-w-2xl">
          <h1 className="text-[32px] font-black tracking-tight leading-tight mb-2">
            Your <span className="text-amber-400">ClientIn ads</span>,<br />ready to post.
          </h1>
          <p className="text-white/35 text-sm leading-relaxed">
            {AD_TEMPLATES.length} ad designs built from your real app screenshots.
            Static ads export as high-res PNG. Animation cards include full scene scripts.
          </p>
        </div>

        {/* Screenshot strip */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
          <span className="text-[11px] text-white/20 uppercase tracking-widest font-bold shrink-0">Source</span>
          {['/1.png','/2.png','/3.png','/4.png','/5.png'].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`Screen ${i+1}`}
              className="h-16 w-auto rounded-xl border border-white/8 object-cover object-top shrink-0 opacity-70 hover:opacity-100 transition-opacity" />
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="space-y-3">
          {/* Category */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-white/25 uppercase tracking-widest font-bold w-16 shrink-0">Category</span>
            {[{ id: 'all', label: 'All', emoji: '✦' }, ...CATEGORIES].map((cat) => (
              <button key={cat.id}
                onClick={() => setActiveCategory(cat.id as AdCategory | 'all')}
                className={clsx('flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all',
                  activeCategory === cat.id
                    ? 'bg-amber-500 border-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-white/4 border-white/8 text-white/50 hover:text-white hover:bg-white/8'
                )}>
                {'emoji' in cat && <span>{cat.emoji}</span>} {cat.label}
                <span className={clsx('text-[10px] rounded-full px-1', activeCategory === cat.id ? 'text-black/50' : 'text-white/25')}>
                  {cat.id === 'all' ? AD_TEMPLATES.length : AD_TEMPLATES.filter(t => t.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>

          {/* Format */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-white/25 uppercase tracking-widest font-bold w-16 shrink-0">Format</span>
            {FORMAT_FILTERS.map((f) => (
              <button key={f.id}
                onClick={() => setActiveFormat(f.id)}
                className={clsx('flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all',
                  activeFormat === f.id
                    ? 'bg-white/90 border-white/90 text-black'
                    : 'bg-white/4 border-white/8 text-white/50 hover:text-white hover:bg-white/8'
                )}>
                {f.id === 'animation-clip' ? <Film size={10} /> : f.id === 'static' ? <ImageIcon size={10} /> : null}
                {f.label}
              </button>
            ))}
          </div>

          {/* Platform */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-white/25 uppercase tracking-widest font-bold w-16 shrink-0">Platform</span>
            {PLATFORM_FILTERS.map((p) => (
              <button key={p.id}
                onClick={() => setActivePlatform(p.id)}
                className={clsx('px-4 py-1.5 rounded-full text-xs font-semibold border transition-all',
                  activePlatform === p.id
                    ? 'bg-white/90 border-white/90 text-black'
                    : 'bg-white/4 border-white/8 text-white/50 hover:text-white hover:bg-white/8'
                )}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results summary */}
        <div className="flex items-center gap-4 py-1 border-t border-white/5">
          <span className="text-white/30 text-xs">{filtered.length} results</span>
          {staticCount > 0 && <span className="flex items-center gap-1 text-white/20 text-xs"><ImageIcon size={10} /> {staticCount} static</span>}
          {animCount > 0 && <span className="flex items-center gap-1 text-amber-500/50 text-xs"><Film size={10} /> {animCount} animation scripts</span>}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/20">
            <Sparkles size={32} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No ads match these filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-20">
            {filtered.map((template) => (
              <AdCard key={template.id} template={template} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
