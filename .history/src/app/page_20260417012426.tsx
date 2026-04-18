'use client';

import { useState, useEffect } from 'react';
import GeneratorControls from '@/components/GeneratorControls';
import ContentCard from '@/components/ContentCard';
import TabBar from '@/components/TabBar';
import type { UploadedScreenshot, GeneratedContent, Industry, Tone, ContentType } from '@/types';
import { generateContent, analyzeScreenshotUrl } from '@/lib/api';
import { Sparkles, BookMarked, Zap, CheckCircle2, Circle, Loader2, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';

type Section = 'generate' | 'saved';

const APP_SCREENSHOTS: { id: string; src: string; label: string }[] = [
  { id: 'ss-1', src: '/1.png', label: 'Welcome Screen' },
  { id: 'ss-2', src: '/2.png', label: 'Discover / Map' },
  { id: 'ss-3', src: '/3.png', label: 'My Wallet' },
  { id: 'ss-4', src: '/4.png', label: 'Business Dashboard' },
  { id: 'ss-5', src: '/5.png', label: 'Customer Insights' },
];

export default function Home() {
  const [screenshots, setScreenshots] = useState<UploadedScreenshot[]>(
    APP_SCREENSHOTS.map((s) => ({ id: s.id, preview: s.src, name: s.label, analyzedFeatures: [] }))
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(APP_SCREENSHOTS.map((s) => s.id)));
  const [analyzing, setAnalyzing] = useState<Set<string>>(new Set());
  const [allContent, setAllContent] = useState<GeneratedContent[]>([]);
  const [industry, setIndustry] = useState<Industry>('general');
  const [tone, setTone] = useState<Tone>('premium');
  const [contentType, setContentType] = useState<ContentType>('instagram-caption');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [section, setSection] = useState<Section>('generate');
  const [filterType, setFilterType] = useState<string>('all');

  // Auto-analyze all screenshots on mount
  useEffect(() => {
    const analyze = async () => {
      for (const ss of APP_SCREENSHOTS) {
        setAnalyzing((prev) => new Set(prev).add(ss.id));
        try {
          // Use absolute URL so OpenAI can fetch it — fall back to relative for local
          const origin = typeof window !== 'undefined' ? window.location.origin : '';
          const features = await analyzeScreenshotUrl(ss.id, `${origin}${ss.src}`);
          setScreenshots((prev) =>
            prev.map((s) => (s.id === ss.id ? { ...s, analyzedFeatures: features } : s))
          );
        } catch {
          // silent — still usable
        } finally {
          setAnalyzing((prev) => { const n = new Set(prev); n.delete(ss.id); return n; });
        }
      }
    };
    analyze();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedScreenshots = screenshots.filter((s) => selectedIds.has(s.id));
  const analyzedCount = screenshots.filter((s) => (s.analyzedFeatures?.length ?? 0) > 0).length;
  const isAnalyzing = analyzing.size > 0;

  const handleGenerate = async () => {
    if (selectedScreenshots.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const results = await generateContent(selectedScreenshots, contentType, industry, tone);
      setAllContent((prev) => [...results, ...prev]);
      setFilterType(contentType);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = (id: string) => {
    setAllContent((prev) => prev.map((c) => (c.id === id ? { ...c, saved: !c.saved } : c)));
  };

  const savedContent = allContent.filter((c) => c.saved);
  const filteredContent = filterType === 'all' ? allContent : allContent.filter((c) => c.type === filterType);

  const typeOptions = [
    { id: 'all', label: 'All', count: allContent.length },
    ...([...new Set(allContent.map((c) => c.type))].map((t) => ({
      id: t,
      label: t.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      count: allContent.filter((c) => c.type === t).length,
    }))),
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="border-b border-stone-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-stone-900 text-base">ClientIn</span>
              <span className="text-stone-400 text-base font-normal"> · Ad Maker</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-400">
            {isAnalyzing ? (
              <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                <Loader2 size={10} className="animate-spin" />
                Analyzing screenshots…
              </span>
            ) : analyzedCount > 0 ? (
              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-medium">
                ✓ {analyzedCount}/{APP_SCREENSHOTS.length} analyzed
              </span>
            ) : null}
            {savedContent.length > 0 && (
              <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                {savedContent.length} saved
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-8 space-y-8">
        {/* Screenshot selector */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold text-stone-700">App Screenshots</h2>
              <p className="text-xs text-stone-400 mt-0.5">Select the screens to base content on</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setSelectedIds(new Set(APP_SCREENSHOTS.map((s) => s.id)))} className="text-xs text-stone-500 hover:text-stone-800 transition-colors">Select all</button>
              <span className="text-stone-200">|</span>
              <button onClick={() => setSelectedIds(new Set())} className="text-xs text-stone-500 hover:text-stone-800 transition-colors">Clear</button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {APP_SCREENSHOTS.map((ss) => {
              const data = screenshots.find((s) => s.id === ss.id);
              const isSelected = selectedIds.has(ss.id);
              const isBeingAnalyzed = analyzing.has(ss.id);
              const featureCount = data?.analyzedFeatures?.length ?? 0;
              return (
                <button
                  key={ss.id}
                  onClick={() => toggleSelect(ss.id)}
                  className={clsx(
                    'relative rounded-2xl overflow-hidden border-2 transition-all group text-left',
                    isSelected ? 'border-amber-500 shadow-md' : 'border-stone-100 opacity-60 hover:opacity-80'
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ss.src} alt={ss.label} className="w-full aspect-[9/19] object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-white text-xs font-medium leading-tight">{ss.label}</p>
                    {isBeingAnalyzed ? (
                      <span className="flex items-center gap-1 mt-0.5">
                        <Loader2 size={8} className="animate-spin text-amber-400" />
                        <span className="text-amber-300 text-[10px]">Analyzing</span>
                      </span>
                    ) : featureCount > 0 ? (
                      <span className="text-emerald-400 text-[10px] mt-0.5 block">{featureCount} features</span>
                    ) : null}
                  </div>
                  <div className="absolute top-2 right-2">
                    {isSelected
                      ? <CheckCircle2 size={18} className="text-amber-400 drop-shadow" />
                      : <Circle size={18} className="text-white/60" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section nav */}
        <div className="flex items-center gap-1">
          {([
            { id: 'generate' as Section, label: 'Generate & Browse', icon: <Zap size={14} />, count: allContent.length },
            { id: 'saved' as Section, label: 'Saved', icon: <BookMarked size={14} />, count: savedContent.length },
          ]).map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={clsx(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                section === s.id ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
              )}
            >
              {s.icon}
              {s.label}
              {s.count > 0 && (
                <span className={clsx('text-xs rounded-full px-1.5 min-w-[18px] text-center', section === s.id ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600')}>
                  {s.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Generate section */}
        {section === 'generate' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Controls sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm sticky top-24">
                <GeneratorControls
                  industry={industry}
                  tone={tone}
                  contentType={contentType}
                  onIndustryChange={setIndustry}
                  onToneChange={setTone}
                  onContentTypeChange={setContentType}
                  onGenerate={handleGenerate}
                  loading={loading}
                  disabled={selectedScreenshots.length === 0}
                />
                {error && (
                  <div className="mt-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}
                {selectedScreenshots.length === 0 && (
                  <p className="text-xs text-stone-400 text-center mt-3">Select at least one screenshot above</p>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3 space-y-5">
              {allContent.length === 0 ? (
                <div className="text-center py-24 text-stone-400">
                  <Sparkles size={36} className="mx-auto mb-4 opacity-20" />
                  <p className="font-semibold text-stone-500">Ready to generate</p>
                  <p className="text-sm mt-1">Pick your settings and hit Generate.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <TabBar tabs={typeOptions} active={filterType} onChange={setFilterType} />
                    <button
                      onClick={handleGenerate}
                      disabled={loading || selectedScreenshots.length === 0}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-500 hover:text-stone-800 border border-stone-200 rounded-xl hover:border-stone-300 transition-all disabled:opacity-40"
                    >
                      <RefreshCw size={12} className={clsx(loading && 'animate-spin')} />
                      Regenerate
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredContent.map((item) => (
                      <ContentCard key={item.id} item={item} onToggleSave={toggleSave} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Saved section */}
        {section === 'saved' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-1">Saved Content</h2>
              <p className="text-stone-500 text-sm">Your bookmarked pieces ready to use.</p>
            </div>
            {savedContent.length === 0 ? (
              <div className="text-center py-20 text-stone-400">
                <BookMarked size={32} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium">Nothing saved yet</p>
                <p className="text-sm mt-1">Bookmark content from the Generate tab.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {savedContent.map((item) => (
                  <ContentCard key={item.id} item={item} onToggleSave={toggleSave} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
