'use client';

import { useState, useCallback } from 'react';
import ScreenshotUploader from '@/components/ScreenshotUploader';
import GeneratorControls from '@/components/GeneratorControls';
import ContentCard from '@/components/ContentCard';
import TabBar from '@/components/TabBar';
import type { UploadedScreenshot, GeneratedContent, Industry, Tone, ContentType } from '@/types';
import { generateContent } from '@/lib/api';
import { Sparkles, BookMarked, LayoutGrid, Zap } from 'lucide-react';
import { clsx } from 'clsx';

type Section = 'upload' | 'generate' | 'saved';

export default function Home() {
  const [screenshots, setScreenshots] = useState<UploadedScreenshot[]>([]);
  const [allContent, setAllContent] = useState<GeneratedContent[]>([]);
  const [industry, setIndustry] = useState<Industry>('general');
  const [tone, setTone] = useState<Tone>('premium');
  const [contentType, setContentType] = useState<ContentType>('instagram-caption');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [section, setSection] = useState<Section>('upload');
  const [filterType, setFilterType] = useState<string>('all');

  const handleScreenshotsChange = useCallback((updated: UploadedScreenshot[]) => {
    setScreenshots(updated);
  }, []);

  const handleGenerate = async () => {
    if (screenshots.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const results = await generateContent(screenshots, contentType, industry, tone);
      setAllContent((prev) => [...results, ...prev]);
      setSection('generate');
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
  const filteredContent =
    filterType === 'all' ? allContent : allContent.filter((c) => c.type === filterType);

  const typeOptions = [
    { id: 'all', label: 'All', count: allContent.length },
    ...([...new Set(allContent.map((c) => c.type))].map((t) => ({
      id: t,
      label: t.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      count: allContent.filter((c) => c.type === t).length,
    }))),
  ];

  const analyzedCount = screenshots.filter((s) => s.analyzedFeatures && s.analyzedFeatures.length > 0).length;

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
            {screenshots.length > 0 && (
              <span className="bg-stone-100 px-2.5 py-1 rounded-full">
                {screenshots.length} screenshot{screenshots.length !== 1 ? 's' : ''}
                {analyzedCount > 0 && ` · ${analyzedCount} analyzed`}
              </span>
            )}
            {savedContent.length > 0 && (
              <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-medium">
                {savedContent.length} saved
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-8">
        {/* Section Nav */}
        <div className="flex items-center gap-1 mb-8">
          {([
            { id: 'upload', label: 'Upload & Analyze', icon: <LayoutGrid size={14} /> },
            { id: 'generate', label: 'Generated Content', icon: <Zap size={14} />, count: allContent.length },
            { id: 'saved', label: 'Saved', icon: <BookMarked size={14} />, count: savedContent.length },
          ] as { id: Section; label: string; icon: React.ReactNode; count?: number }[]).map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={clsx(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all',
                section === s.id
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
              )}
            >
              {s.icon}
              {s.label}
              {s.count !== undefined && s.count > 0 && (
                <span className={clsx(
                  'text-xs rounded-full px-1.5 min-w-[18px] text-center',
                  section === s.id ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                )}>
                  {s.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Upload Section */}
        {section === 'upload' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-1">Upload Screenshots</h2>
                <p className="text-stone-500 text-sm">Add ClientIn app screenshots — the AI will analyze each one and identify features to base content on.</p>
              </div>
              <ScreenshotUploader screenshots={screenshots} onChange={handleScreenshotsChange} />

              {screenshots.length > 0 && analyzedCount === screenshots.length && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm text-emerald-700">
                  ✓ All {screenshots.length} screenshots analyzed. Head to Generate to create content.
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-1">Generate Content</h2>
                <p className="text-stone-500 text-sm">Configure options and generate multiple content pieces from your screenshots.</p>
              </div>
              <div className="bg-white border border-stone-100 rounded-2xl p-5 shadow-sm">
                <GeneratorControls
                  industry={industry}
                  tone={tone}
                  contentType={contentType}
                  onIndustryChange={setIndustry}
                  onToneChange={setTone}
                  onContentTypeChange={setContentType}
                  onGenerate={handleGenerate}
                  loading={loading}
                  disabled={screenshots.length === 0}
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Generated Content Section */}
        {section === 'generate' && (
          <div className="space-y-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-bold text-stone-900 mb-1">Generated Content</h2>
                <p className="text-stone-500 text-sm">{allContent.length} pieces generated across all sessions</p>
              </div>
              <button
                onClick={() => setSection('upload')}
                className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-600 hover:border-amber-300 transition-colors"
              >
                + Generate More
              </button>
            </div>

            {allContent.length === 0 ? (
              <div className="text-center py-20 text-stone-400">
                <Sparkles size={32} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium">No content yet</p>
                <p className="text-sm mt-1">Upload screenshots and generate content to see results here.</p>
              </div>
            ) : (
              <>
                <TabBar tabs={typeOptions} active={filterType} onChange={setFilterType} />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredContent.map((item) => (
                    <ContentCard key={item.id} item={item} onToggleSave={toggleSave} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Saved Section */}
        {section === 'saved' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-stone-900 mb-1">Saved Content</h2>
              <p className="text-stone-500 text-sm">Your bookmarked pieces ready to use.</p>
            </div>

            {savedContent.length === 0 ? (
              <div className="text-center py-20 text-stone-400">
                <BookMarked size={32} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium">Nothing saved yet</p>
                <p className="text-sm mt-1">Bookmark content from the Generated Content tab.</p>
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
