'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import type { UploadedScreenshot } from '@/types';
import { analyzeScreenshot } from '@/lib/api';
import { clsx } from 'clsx';

interface Props {
  screenshots: UploadedScreenshot[];
  onChange: (screenshots: UploadedScreenshot[]) => void;
}

export default function ScreenshotUploader({ screenshots, onChange }: Props) {
  const [analyzing, setAnalyzing] = useState<Set<string>>(new Set());

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newScreenshots: UploadedScreenshot[] = acceptedFiles.map((file) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        analyzedFeatures: [],
      }));

      onChange([...screenshots, ...newScreenshots]);

      // Analyze each screenshot
      for (const screenshot of newScreenshots) {
        setAnalyzing((prev) => new Set(prev).add(screenshot.id));
        try {
          const reader = new FileReader();
          const base64 = await new Promise<string>((resolve, reject) => {
            reader.onload = () => {
              const result = reader.result as string;
              resolve(result.split(',')[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(screenshot.file);
          });

          const features = await analyzeScreenshot(screenshot.id, base64);
          // Update using latest screenshots via a ref-style approach
          onChange(
            screenshots.map((s) =>
              s.id === screenshot.id ? { ...s, analyzedFeatures: features } : s
            )
          );
        } catch {
          // silent fail - still usable without analysis
        } finally {
          setAnalyzing((prev) => {
            const next = new Set(prev);
            next.delete(screenshot.id);
            return next;
          });
        }
      }
    },
    [screenshots, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxSize: 10 * 1024 * 1024,
  });

  const remove = (id: string) => {
    onChange(screenshots.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={clsx(
          'border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200',
          isDragActive
            ? 'border-amber-500 bg-amber-50'
            : 'border-stone-200 bg-stone-50 hover:border-amber-400 hover:bg-amber-50/50'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-3 text-stone-400" size={32} />
        <p className="text-stone-700 font-medium text-base">
          {isDragActive ? 'Drop screenshots here' : 'Drag & drop app screenshots'}
        </p>
        <p className="text-stone-400 text-sm mt-1">PNG, JPG up to 10MB each</p>
        <button
          type="button"
          className="mt-4 px-5 py-2 bg-amber-600 text-white rounded-xl text-sm font-medium hover:bg-amber-700 transition-colors"
        >
          Browse files
        </button>
      </div>

      {screenshots.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {screenshots.map((s) => (
            <div key={s.id} className="relative group rounded-xl overflow-hidden border border-stone-200 bg-white shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.preview}
                alt={s.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-2">
                <p className="text-xs text-stone-500 truncate">{s.name}</p>
                {analyzing.has(s.id) ? (
                  <div className="flex items-center gap-1 mt-1">
                    <Loader2 size={10} className="animate-spin text-amber-500" />
                    <span className="text-xs text-amber-600">Analyzing…</span>
                  </div>
                ) : s.analyzedFeatures && s.analyzedFeatures.length > 0 ? (
                  <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                    <ImageIcon size={10} />
                    {s.analyzedFeatures.length} features found
                  </p>
                ) : null}
              </div>
              <button
                onClick={() => remove(s.id)}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
