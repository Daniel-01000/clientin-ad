'use client';

import { useState } from 'react';
import { Sparkles, Download, RefreshCw, ImageIcon, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import type { AdConcept, AdCategory } from '@/types';
import { getConceptsWithIds, getCategories } from '@/lib/concepts';

const CATEGORIES = getCategories();

export default function Home() {
  const [concepts, setConcepts] = useState<AdConcept[]>(getConceptsWithIds);
  const [activeCategory, setActiveCategory] = useState<AdCategory>('customer');
  const [generating, setGenerating] = useState<Set<string>>(new Set());

  const visible = concepts.filter((c) => c.category === activeCategory);
  const allDoneForCategory = visible.every((c) => c.imageUrl);
  const anyGenerating = generating.size > 0;

  const generateImage = async (concept: AdConcept) => {
    setGenerating((prev) => new Set(prev).add(concept.id));
    setConcepts((prev) => prev.map((c) => c.id === concept.id ? { ...c, error: undefined, imageUrl: undefined } : c));
    try {
      const res = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: concept.imagePrompt }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? 'Generation failed');
      setConcepts((prev) => prev.map((c) => c.id === concept.id ? { ...c, imageUrl: data.url } : c));
    } catch (e) {
      setConcepts((prev) => prev.map((c) =>
        c.id === concept.id ? { ...c, error: e instanceof Error ? e.message : 'Failed' } : c
      ));
    } finally {
      setGenerating((prev) => { const n = new Set(prev); n.delete(concept.id); return n; });
    }
  };

  const generateAll = async () => {
    const toGenerate = visible.filter((c) => !c.imageUrl && !generating.has(c.id));
    for (const concept of toGenerate) {
      await generateImage(concept);
    }
  };

  const downloadImage = async (url: string, title: string) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `clientin-${title.toLowerCase().replace(/\s+/g, '-')}.png`;
    a.click();
  };

  const totalGenerated = concepts.filter((c) => c.imageUrl).length;

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
          {totalGenerated > 0 && (
            <span className="text-xs bg-amber-500/15 text-amber-400 border border-amber-500/20 px-3 py-1.5 rounded-full font-medium">
              {totalGenerated} / {concepts.length} ads generated
            </span>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto pt-4">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-3">
            Generate your <span className="text-amber-400">ad images</span>
          </h1>
          <p className="text-white/40 text-base leading-relaxed">
            Powered by DALL·E 3. Premium social media ads for ClientIn — customer-facing, business-facing, and app launch posts.
          </p>
        </div>

        {/* App screenshots reference strip */}
        <div>
          <p className="text-xs text-white/30 uppercase tracking-wider font-semibold mb-3">Based on these ClientIn screens</p>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { src: '/1.png', label: 'Welcome' },
              { src: '/2.png', label: 'Discover' },
              { src: '/3.png', label: 'Wallet' },
              { src: '/4.png', label: 'Dashboard' },
              { src: '/5.png', label: 'Insights' },
            ].map((s) => (
              <div key={s.src} className="shrink-0 flex flex-col items-center gap-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.label} className="h-24 w-auto rounded-xl border border-white/10 object-cover object-top" />
                <span className="text-xs text-white/30">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-3 flex-wrap">
          {CATEGORIES.map((cat) => {
            const count = concepts.filter((c) => c.category === cat.id && c.imageUrl).length;
            const total = concepts.filter((c) => c.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={clsx(
                  'flex items-center gap-2.5 px-5 py-3 rounded-2xl border text-sm font-medium transition-all',
                  activeCategory === cat.id
                    ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/8 hover:text-white'
                )}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                {count > 0 && (
                  <span className={clsx(
                    'text-xs rounded-full px-1.5 py-0.5 font-semibold',
                    activeCategory === cat.id ? 'bg-black/20 text-black' : 'bg-white/10 text-white/50'
                  )}>
                    {count}/{total}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Category header + generate all */}
        {(() => {
          const cat = CATEGORIES.find((c) => c.id === activeCategory)!;
          return (
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">{cat.label}</h2>
                <p className="text-white/40 text-sm mt-0.5">{cat.desc}</p>
              </div>
              <button
                onClick={generateAll}
                disabled={anyGenerating || allDoneForCategory}
                className={clsx(
                  'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all',
                  allDoneForCategory
                    ? 'bg-white/5 text-white/20 border border-white/10 cursor-default'
                    : anyGenerating
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/20 cursor-wait'
                    : 'bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/20'
                )}
              >
                {anyGenerating ? (
                  <><RefreshCw size={15} className="animate-spin" /> Generating…</>
                ) : allDoneForCategory ? (
                  <><CheckCircle2 size={15} /> All generated</>
                ) : (
                  <><Sparkles size={15} /> Generate all {visible.length} ads</>
                )}
              </button>
            </div>
          );
        })()}

        {/* Ad grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          {visible.map((concept) => {
            const isGen = generating.has(concept.id);
            return (
              <div key={concept.id} className="group bg-white/4 border border-white/8 rounded-3xl overflow-hidden flex flex-col hover:border-white/16 transition-all">
                {/* Image area */}
                <div className="relative aspect-square bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                  {concept.imageUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={concept.imageUrl} alt={concept.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-4">
                        <button
                          onClick={() => downloadImage(concept.imageUrl!, concept.title)}
                          className="flex items-center gap-1.5 px-3 py-2 bg-white text-black text-xs font-semibold rounded-xl hover:bg-amber-400 transition-colors"
                        >
                          <Download size={13} /> Download
                        </button>
                      </div>
                    </>
                  ) : isGen ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-2 border-amber-500/40 border-t-amber-500 rounded-full animate-spin" />
                      <span className="text-xs font-medium text-amber-400/70">Generating with DALL·E 3…</span>
                    </div>
                  ) : concept.error ? (
                    <div className="flex flex-col items-center gap-2 text-red-400/60 px-6 text-center">
                      <AlertCircle size={28} />
                      <span className="text-xs">Generation failed. Try again.</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-white/20">
                      <ImageIcon size={36} />
                      <span className="text-xs">Not yet generated</span>
                    </div>
                  )}
                </div>

                {/* Card content */}
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <div>
                    <h3 className="font-semibold text-white text-base leading-snug">{concept.title}</h3>
                    <p className="text-white/35 text-xs mt-1 leading-relaxed">{concept.description}</p>
                  </div>

                  <div className="bg-white/5 border border-white/8 rounded-xl p-3">
                    <p className="text-xs text-white/30 font-semibold uppercase tracking-wider mb-1.5">Caption</p>
                    <p className="text-white/60 text-xs leading-relaxed whitespace-pre-wrap">{concept.caption}</p>
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => generateImage(concept)}
                      disabled={isGen}
                      className={clsx(
                        'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all',
                        isGen
                          ? 'bg-amber-500/10 text-amber-400/50 cursor-wait'
                          : concept.imageUrl
                          ? 'bg-white/6 text-white/50 hover:bg-white/10 hover:text-white border border-white/10'
                          : 'bg-amber-500 text-black hover:bg-amber-400 shadow-md shadow-amber-500/20'
                      )}
                    >
                      {isGen ? (
                        <><RefreshCw size={12} className="animate-spin" /> Generating…</>
                      ) : concept.imageUrl ? (
                        <><RefreshCw size={12} /> Regenerate</>
                      ) : (
                        <><Sparkles size={12} /> Generate <ChevronRight size={12} /></>
                      )}
                    </button>
                    {concept.imageUrl && (
                      <button
                        onClick={() => downloadImage(concept.imageUrl!, concept.title)}
                        className="px-3 py-2.5 rounded-xl bg-white/6 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                      >
                        <Download size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
