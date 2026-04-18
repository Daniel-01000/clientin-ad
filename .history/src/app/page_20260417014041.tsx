'use client';

import { useState } from 'react';
import { Sparkles, Download } from 'lucide-react';
import { clsx } from 'clsx';
import type { AdCategory } from '@/types';
import { AD_TEMPLATES, CATEGORIES } from '@/lib/templates';
import AdCard from '@/components/AdCard';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<AdCategory>('customer');
  const visible = AD_TEMPLATES.filter((t) => t.category === activeCategory);

  const downloadAll = async () => {
    const { toPng } = await import('html-to-image');
    for (const t of visible) {
      const el = document.getElementById(`ad-${t.id}`);
      if (!el) continue;
      const dataUrl = await toPng(el, { pixelRatio: 3 });
      const a = document.createElement('a');
      a.download = `clientin-${t.id}.png`;
      a.href = dataUrl;
      a.click();
      await new Promise((r) => setTimeout(r, 400));
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <header className="border-b border-white/8 bg-black/40 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Sparkles size={18} className="text-black" />
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">ClientIn</span>
              <span className="text-white/30 text-base font-normal"> · Ad Maker</span>
            </div>
          </div>
          <button
            onClick={downloadAll}
            className="flex items-center gap-2 px-4 py-2 bg-white/8 border border-white/10 hover:bg-white/12 text-white/70 hover:text-white text-xs font-semibold rounded-xl transition-all"
          >
            <Download size={13} /> Download all {visible.length}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Hero */}
        <div className="max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Your <span className="text-amber-400">ClientIn ads</span>, ready to post.
          </h1>
          <p className="text-white/40 text-sm leading-relaxed">
            {AD_TEMPLATES.length} ad designs built from your app screenshots. Download any as a high-res PNG and post instantly.
          </p>
        </div>

        {/* Screenshot strip */}
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {['/1.png','/2.png','/3.png','/4.png','/5.png'].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt={`Screen ${i+1}`}
              className="h-20 w-auto rounded-xl border border-white/10 object-cover object-top shrink-0" />
          ))}
          <div className="shrink-0 flex items-center pl-2">
            <span className="text-xs text-white/20 italic">used as source material</span>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-3 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={clsx(
                'flex items-center gap-2 px-5 py-2.5 rounded-2xl border text-sm font-semibold transition-all',
                activeCategory === cat.id
                  ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/8 hover:text-white'
              )}
            >
              <span>{cat.emoji}</span> {cat.label}
              <span className={clsx('text-xs rounded-full px-1.5',
                activeCategory === cat.id ? 'bg-black/15 text-black' : 'bg-white/10 text-white/40'
              )}>
                {AD_TEMPLATES.filter(t => t.category === cat.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Category desc */}
        <div className="flex items-center justify-between">
          <p className="text-white/35 text-sm">{CATEGORIES.find(c => c.id === activeCategory)?.desc}</p>
        </div>

        {/* Ad grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
          {visible.map((template) => (
            <div key={template.id}>
              <div id={`ad-${template.id}`}>
                <AdCard template={template} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
