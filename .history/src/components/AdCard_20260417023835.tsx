'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Download, Copy, Check, Film, Maximize2, X, Image as ImageIcon } from 'lucide-react';
import type { AdTemplate } from '@/types';

const PLATFORM_COLORS: Record<string, string> = {
  instagram: '#E1306C',
  tiktok: '#69C9D0',
  linkedin: '#0A66C2',
  twitter: '#1DA1F2',
};

interface Props { template: AdTemplate }

// ─── Phone mockup canvas export ───────────────────────────────────────────────
async function exportWithPhoneFrame(adEl: HTMLElement, filename: string) {
  const { toPng } = await import('html-to-image');
  const adDataUrl = await toPng(adEl, { pixelRatio: 3, cacheBust: true, backgroundColor: '#0a0a0a' });

  const SCALE = 3;
  const W = 390 * SCALE;
  const H = 844 * SCALE;
  const canvas = document.createElement('canvas');
  canvas.width = W + 40 * SCALE;
  canvas.height = H + 40 * SCALE;
  const ctx = canvas.getContext('2d')!;

  const OX = 20 * SCALE, OY = 20 * SCALE;

  // Drop shadow
  ctx.shadowColor = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = 40 * SCALE;
  ctx.shadowOffsetY = 10 * SCALE;

  // Outer body
  const r = 52 * SCALE;
  rrPath(ctx, OX, OY, W, H, r);
  ctx.fillStyle = '#1c1c1e';
  ctx.fill();
  ctx.shadowColor = 'transparent';

  // Screen inset
  const sx = OX + 10 * SCALE, sy = OY + 10 * SCALE;
  const sw = W - 20 * SCALE, sh = H - 20 * SCALE;
  const sr = 44 * SCALE;

  // Ad image clipped to screen
  const img = await loadImg(adDataUrl);
  ctx.save();
  rrPath(ctx, sx, sy, sw, sh, sr);
  ctx.clip();
  ctx.drawImage(img, sx, sy, sw, sh);
  ctx.restore();

  // Screen bezel line
  ctx.save();
  rrPath(ctx, sx, sy, sw, sh, sr);
  ctx.strokeStyle = 'rgba(255,255,255,0.06)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // Dynamic island
  ctx.fillStyle = '#000';
  const dw = 90 * SCALE, dh = 26 * SCALE;
  const dx = OX + (W - dw) / 2, dy = OY + 16 * SCALE;
  rrPath(ctx, dx, dy, dw, dh, dh / 2);
  ctx.fill();

  // Side volume buttons
  ctx.fillStyle = '#2a2a2c';
  ctx.fillRect(OX - 3 * SCALE, OY + 160 * SCALE, 4 * SCALE, 36 * SCALE);
  ctx.fillRect(OX - 3 * SCALE, OY + 210 * SCALE, 4 * SCALE, 60 * SCALE);
  ctx.fillRect(OX - 3 * SCALE, OY + 285 * SCALE, 4 * SCALE, 60 * SCALE);
  // Power button
  ctx.fillRect(OX + W - 1 * SCALE, OY + 190 * SCALE, 4 * SCALE, 80 * SCALE);

  // Screen gloss
  const gloss = ctx.createLinearGradient(sx, sy, sx, sy + sh * 0.3);
  gloss.addColorStop(0, 'rgba(255,255,255,0.07)');
  gloss.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.save();
  rrPath(ctx, sx, sy, sw, sh, sr);
  ctx.clip();
  ctx.fillStyle = gloss;
  ctx.fillRect(sx, sy, sw, sh * 0.3);
  ctx.restore();

  const a = document.createElement('a');
  a.download = filename;
  a.href = canvas.toDataURL('image/png');
  a.click();
}

function rrPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new window.Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

// ─── Copy image to clipboard ──────────────────────────────────────────────────
async function copyAdImage(adEl: HTMLElement) {
  const { toPng } = await import('html-to-image');
  const dataUrl = await toPng(adEl, { pixelRatio: 2, cacheBust: true, backgroundColor: '#0a0a0a' });
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
}

// ─── Scene parser for animation scripts ──────────────────────────────────────
function parseScenes(script: string): string[] {
  const lines = script.split('\n').filter(l => l.trim());
  const scenes: string[] = [];
  let cur = '';
  for (const line of lines) {
    if (/^scene\s*\d+/i.test(line.trim()) || (/^\[/.test(line.trim()) && cur)) {
      if (cur) scenes.push(cur.trim());
      cur = line;
    } else {
      cur += ' ' + line;
    }
  }
  if (cur) scenes.push(cur.trim());
  return scenes.length >= 2 ? scenes : lines.slice(0, 6);
}

// ─── Live animated preview ────────────────────────────────────────────────────
function AnimatedScenePreview({ template }: { template: AdTemplate }) {
  const scenes = parseScenes(template.animationScript ?? '');
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const lines = template.headline.split('\n');

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setIdx(i => (i + 1) % scenes.length), 2400);
    return () => clearInterval(t);
  }, [playing, scenes.length]);

  return (
    <div style={{ width: '100%', height: '100%', background: '#0d0d0d', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 5, background: `repeating-linear-gradient(90deg, ${template.accentColor} 0px, ${template.accentColor} 22px, transparent 22px, transparent 34px)` }} />
      {template.screenshot && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={template.screenshot} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: 0.1 }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,13,13,0.5) 0%, rgba(13,13,13,0.97) 45%)' }} />

      <div style={{ position: 'relative', flex: 1, padding: '8%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Logo accent={template.accentColor} />
          {template.badge && <Badge text={template.badge} accent={template.accentColor} />}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 26, height: 26, background: `${template.accentColor}20`, border: `1px solid ${template.accentColor}50`, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🎬</div>
            <span style={{ color: template.accentColor, fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>Scene {idx + 1} / {scenes.length}</span>
          </div>
          {lines.map((l, i) => (
            <div key={i} style={{ fontSize: 'clamp(22px, 5.5vw, 40px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: -0.8, marginBottom: 2 }}>{l}</div>
          ))}
          <div key={idx} style={{ fontSize: 11, color: 'rgba(255,255,255,0.52)', marginTop: 14, lineHeight: 1.65, borderLeft: `2px solid ${template.accentColor}55`, paddingLeft: 10, animation: 'scIn 0.3s ease' }}>
            {scenes[idx]}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {scenes.map((_, i) => (
            <button key={i} onClick={() => { setIdx(i); setPlaying(false); }}
              style={{ width: i === idx ? 18 : 5, height: 5, borderRadius: 3, background: i === idx ? template.accentColor : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
          ))}
          <button onClick={() => setPlaying(p => !p)}
            style={{ marginLeft: 'auto', fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, background: 'none', border: 'none', cursor: 'pointer' }}>
            {playing ? '⏸' : '▶'}
          </button>
        </div>
      </div>
      <style>{`@keyframes scIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

// ─── Ad canvas renderer (shared between card + modal) ────────────────────────
function AdCanvas({ template }: { template: AdTemplate }) {
  const lines = template.headline.split('\n');
  const isAnim = template.format === 'animation-clip';
  if (isAnim) return <AnimatedScenePreview template={template} />;
  if (template.layout === 'type-only') return <LayoutTypeOnly template={template} lines={lines} />;
  if (template.layout === 'minimal-quote') return <LayoutMinimalQuote template={template} />;
  if (template.layout === 'split-stat') return <LayoutSplitStat template={template} lines={lines} />;
  if (template.layout === 'screenshot-bg') return <LayoutBg template={template} lines={lines} />;
  if (template.layout === 'screenshot-left') return <LayoutSide template={template} lines={lines} side="left" />;
  if (template.layout === 'screenshot-right') return <LayoutSide template={template} lines={lines} side="right" />;
  if (template.layout === 'screenshot-center') return <LayoutCenter template={template} lines={lines} />;
  if (template.layout === 'testimonial') return <LayoutTestimonial template={template} />;
  if (template.layout === 'before-after') return <LayoutBeforeAfter template={template} lines={lines} />;
  return <LayoutSide template={template} lines={lines} side="right" />;
}

// ─── Fullscreen modal ─────────────────────────────────────────────────────────
function FullscreenModal({ template, onClose }: { template: AdTemplate; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4" onClick={onClose}>
      <div className="relative max-w-[520px] w-full" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-9 right-0 p-1.5 text-white/40 hover:text-white transition-colors">
          <X size={18} />
        </button>
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{ aspectRatio: '1/1', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
          <AdCanvas template={template} />
        </div>
        <p className="text-center text-white/20 text-[11px] mt-3">{template.title} · Esc to close</p>
      </div>
    </div>
  );
}

// ─── Main AdCard ──────────────────────────────────────────────────────────────
export default function AdCard({ template }: Props) {
  const adRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [imgCopied, setImgCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const downloadFlat = async () => {
    if (!adRef.current) return;
    const { toPng } = await import('html-to-image');
    const dataUrl = await toPng(adRef.current, { pixelRatio: 3, cacheBust: true, backgroundColor: '#0a0a0a' });
    const a = document.createElement('a');
    a.download = `clientin-${template.id}.png`;
    a.href = dataUrl;
    a.click();
  };

  const downloadPhone = async () => {
    if (!adRef.current) return;
    setExporting(true);
    try { await exportWithPhoneFrame(adRef.current, `clientin-${template.id}-phone.png`); }
    finally { setExporting(false); }
  };

  const copyCaption = async () => {
    await navigator.clipboard.writeText(template.caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyImg = useCallback(async () => {
    if (!adRef.current) return;
    try {
      await copyAdImage(adRef.current);
      setImgCopied(true);
      setTimeout(() => setImgCopied(false), 2000);
    } catch { downloadFlat(); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAnimation = template.format === 'animation-clip';

  return (
    <>
      {fullscreen && <FullscreenModal template={template} onClose={() => setFullscreen(false)} />}

      <div className="flex flex-col rounded-3xl overflow-hidden border border-white/8 bg-[#161616] hover:border-white/[0.15] transition-all group">

        {/* Ad canvas */}
        <div className="relative">
          <div
            ref={adRef}
            data-ad-id={template.id}
            className="relative w-full overflow-hidden select-none"
            style={{ aspectRatio: '1/1', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
          >
            <AdCanvas template={template} />
          </div>

          {/* Hover: expand button */}
          <button
            onClick={() => setFullscreen(true)}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white">
            <Maximize2 size={12} />
          </button>
        </div>

        {/* Footer */}
        <div className="p-4 flex flex-col gap-3 border-t border-white/6">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-white text-sm font-semibold leading-snug">{template.title}</p>
              <p className="text-white/35 text-xs mt-0.5">{template.subheadline}</p>
            </div>
            {template.platform && (
              <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border"
                style={{ color: PLATFORM_COLORS[template.platform] ?? '#fff', borderColor: `${PLATFORM_COLORS[template.platform] ?? '#fff'}40` }}>
                {template.platform}
              </span>
            )}
          </div>

          <div className="bg-white/4 rounded-xl p-3">
            <p className="text-white/50 text-[11px] leading-relaxed line-clamp-3">{template.caption}</p>
          </div>

          {isAnimation && template.animationScript && (
            <div className="bg-amber-500/6 border border-amber-500/15 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Film size={11} className="text-amber-400" />
                <p className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">Full Scene Script</p>
              </div>
              <p className="text-white/40 text-[11px] leading-relaxed line-clamp-4 whitespace-pre-line">{template.animationScript}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={copyCaption}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/8 text-xs font-medium transition-all flex-1">
              {copied ? <><Check size={11} className="text-emerald-400" /><span className="text-emerald-400">Copied</span></> : <><Copy size={11} /> Caption</>}
            </button>

            {!isAnimation && (
              <>
                <button onClick={copyImg}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/8 text-xs font-medium transition-all flex-1">
                  {imgCopied ? <><Check size={11} className="text-emerald-400" /><span className="text-emerald-400">Copied!</span></> : <><ImageIcon size={11} /> Copy</>}
                </button>

                {/* Download button with phone-frame option on hover */}
                <div className="relative group/dl flex-1">
                  <button onClick={downloadFlat} disabled={exporting}
                    className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all disabled:opacity-60">
                    <Download size={11} /> {exporting ? '…' : 'PNG'}
                  </button>
                  <button onClick={downloadPhone} disabled={exporting}
                    title="Download inside phone mockup"
                    className="absolute -top-8 left-0 right-0 opacity-0 group-hover/dl:opacity-100 transition-all flex items-center justify-center gap-1 py-1.5 rounded-lg bg-[#1e1e1e] border border-white/10 text-white/50 hover:text-white text-[10px] font-semibold whitespace-nowrap">
                    📱 Phone frame
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────
const Logo = ({ dark = true }: { accent?: string; dark?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/clientin-logo.png" alt="ClientIn" style={{ width: 28, height: 28, borderRadius: 7, objectFit: 'cover' }} />
    <span style={{ color: dark ? '#fff' : '#111', fontWeight: 700, fontSize: 13, letterSpacing: -0.3 }}>ClientIn</span>
  </div>
);

const Badge = ({ text, accent }: { text: string; accent: string }) => (
  <span style={{ display: 'inline-flex', alignSelf: 'flex-start', background: accent, color: '#000', fontSize: 9, fontWeight: 800, letterSpacing: 1.8, padding: '4px 11px', borderRadius: 100, textTransform: 'uppercase' }}>
    {text}
  </span>
);

const CTAButton = ({ text, accent }: { text: string; accent: string }) => (
  <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: accent, color: '#000', fontWeight: 800, fontSize: 12, padding: '10px 22px', borderRadius: 100, letterSpacing: -0.2 }}>
    {text} →
  </div>
);

// ─── Layouts ──────────────────────────────────────────────────────────────────

function LayoutBg({ template, lines }: { template: AdTemplate; lines: string[] }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0a0a0a', overflow: 'hidden' }}>
      {template.screenshot && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={template.screenshot} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.3 }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.97) 100%)' }} />
      <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: '60%', height: '60%', background: template.accentColor, filter: 'blur(80px)', opacity: 0.18, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', inset: 0, padding: '9%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Logo accent={template.accentColor} />
          {template.badge && <Badge text={template.badge} accent={template.accentColor} />}
        </div>
        <div>
          {lines.map((l, i) => (
            <div key={i} style={{ fontSize: 'clamp(30px, 8.5vw, 56px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: -1.5, marginBottom: 2 }}>{l}</div>
          ))}
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '14px 0 24px', lineHeight: 1.5, maxWidth: '75%' }}>{template.subheadline}</div>
          <CTAButton text={template.cta} accent={template.accentColor} />
        </div>
      </div>
    </div>
  );
}

function LayoutSide({ template, lines, side }: { template: AdTemplate; lines: string[]; side: 'left' | 'right' }) {
  const bg = template.darkMode ? '#0f0f0f' : '#FAFAF8';
  const textColor = template.darkMode ? '#fff' : '#111';
  const subColor = template.darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.4)';

  const phone = (
    <div style={{ flex: '0 0 46%', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '6%' }}>
      <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '35%', background: template.accentColor, filter: 'blur(50px)', opacity: 0.25, borderRadius: '50%' }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={template.screenshot} alt="" style={{ width: '84%', borderRadius: 26, boxShadow: '0 32px 64px rgba(0,0,0,0.45)', position: 'relative', objectFit: 'cover', objectPosition: 'top', aspectRatio: '9/19' }} />
    </div>
  );

  const text = (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: side === 'left' ? '9% 9% 9% 5%' : '9% 5% 9% 9%' }}>
      {template.badge && <div style={{ marginBottom: 16 }}><Badge text={template.badge} accent={template.accentColor} /></div>}
      {lines.map((l, i) => (
        <div key={i} style={{ fontSize: 'clamp(20px, 5vw, 38px)', fontWeight: 900, color: textColor, lineHeight: 1.0, letterSpacing: -0.8, marginBottom: 2 }}>{l}</div>
      ))}
      <div style={{ fontSize: 11.5, color: subColor, margin: '13px 0 22px', lineHeight: 1.55 }}>{template.subheadline}</div>
      <CTAButton text={template.cta} accent={template.accentColor} />
      <div style={{ marginTop: 'auto', paddingTop: 20 }}><Logo accent={template.accentColor} dark={template.darkMode} /></div>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', background: bg, display: 'flex', flexDirection: 'row', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-20%', [side === 'left' ? 'left' : 'right']: '-15%', width: '55%', aspectRatio: '1', background: template.accentColor, filter: 'blur(90px)', opacity: 0.09, borderRadius: '50%' }} />
      {side === 'left' ? <>{phone}{text}</> : <>{text}{phone}</>}
    </div>
  );
}

function LayoutCenter({ template, lines }: { template: AdTemplate; lines: string[] }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#090909', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '7%' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '50%', background: template.accentColor, filter: 'blur(100px)', opacity: 0.12, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: 24, left: 24 }}><Logo accent={template.accentColor} /></div>
      {template.badge && <div style={{ marginBottom: 18 }}><Badge text={template.badge} accent={template.accentColor} /></div>}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        {lines.map((l, i) => <div key={i} style={{ fontSize: 'clamp(24px, 6.5vw, 44px)', fontWeight: 900, color: '#fff', lineHeight: 1.0, letterSpacing: -1, marginBottom: 3 }}>{l}</div>)}
      </div>
      {template.screenshot && (
        <div style={{ position: 'relative', width: '40%' }}>
          <div style={{ position: 'absolute', bottom: '-20%', left: '5%', right: '5%', height: '40%', background: template.accentColor, filter: 'blur(35px)', opacity: 0.45, borderRadius: '50%' }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={template.screenshot} alt="" style={{ width: '100%', borderRadius: 22, boxShadow: '0 24px 64px rgba(0,0,0,0.7)', position: 'relative', objectFit: 'cover', objectPosition: 'top', aspectRatio: '9/19' }} />
        </div>
      )}
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 18, textAlign: 'center', maxWidth: '70%', lineHeight: 1.5 }}>{template.subheadline}</div>
      <div style={{ marginTop: 20 }}><CTAButton text={template.cta} accent={template.accentColor} /></div>
    </div>
  );
}

function LayoutTypeOnly({ template, lines }: { template: AdTemplate; lines: string[] }) {
  const bg = template.darkMode ? '#0a0a0a' : '#FAFAF8';
  const textColor = template.darkMode ? '#fff' : '#111';
  const subColor = template.darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  return (
    <div style={{ width: '100%', height: '100%', background: bg, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10%' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${template.darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
      <div style={{ position: 'absolute', top: 0, left: '10%', width: '30%', height: 3, background: template.accentColor }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '60%', background: template.accentColor, filter: 'blur(80px)', opacity: 0.1, borderRadius: '50%' }} />
      <div style={{ position: 'relative' }}>
        {template.badge && <div style={{ marginBottom: 20 }}><Badge text={template.badge} accent={template.accentColor} /></div>}
      </div>
      <div style={{ position: 'relative' }}>
        {template.stat && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 'clamp(52px, 16vw, 96px)', fontWeight: 900, color: template.accentColor, lineHeight: 0.9, letterSpacing: -3 }}>{template.stat.value}</div>
            <div style={{ fontSize: 13, color: subColor, marginTop: 8, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>{template.stat.label}</div>
          </div>
        )}
        {lines.map((l, i) => <div key={i} style={{ fontSize: 'clamp(26px, 7vw, 50px)', fontWeight: 900, color: textColor, lineHeight: 1.0, letterSpacing: -1, marginBottom: 3 }}>{l}</div>)}
        <div style={{ fontSize: 12, color: subColor, margin: '14px 0 26px', lineHeight: 1.6, maxWidth: '80%' }}>{template.subheadline}</div>
        <CTAButton text={template.cta} accent={template.accentColor} />
      </div>
      <div style={{ position: 'relative' }}><Logo accent={template.accentColor} dark={template.darkMode} /></div>
    </div>
  );
}

function LayoutMinimalQuote({ template }: { template: AdTemplate }) {
  const bg = template.darkMode ? '#0a0a0a' : '#FAFAF8';
  const textColor = template.darkMode ? '#fff' : '#111';
  const subColor = template.darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)';
  return (
    <div style={{ width: '100%', height: '100%', background: bg, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: '100%', height: '60%', background: template.accentColor, filter: 'blur(100px)', opacity: 0.07, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: '8%', right: '8%', fontSize: 180, color: template.accentColor, opacity: 0.08, fontFamily: 'Georgia, serif', lineHeight: 1, fontWeight: 900 }}>"</div>
      <Logo accent={template.accentColor} dark={template.darkMode} />
      <div style={{ position: 'relative' }}>
        <div style={{ width: 40, height: 4, background: template.accentColor, borderRadius: 2, marginBottom: 28 }} />
        <div style={{ fontSize: 'clamp(22px, 5.5vw, 38px)', fontWeight: 800, color: textColor, lineHeight: 1.2, letterSpacing: -0.5, fontStyle: 'italic', maxWidth: '90%' }}>
          "{template.quote}"
        </div>
        <div style={{ fontSize: 12, color: subColor, marginTop: 20, lineHeight: 1.5 }}>{template.subheadline}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <CTAButton text={template.cta} accent={template.accentColor} />
        {template.platform && <span style={{ fontSize: 10, color: subColor, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>{template.platform}</span>}
      </div>
    </div>
  );
}

function LayoutSplitStat({ template, lines }: { template: AdTemplate; lines: string[] }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1, background: template.accentColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '8%' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />
        <div style={{ position: 'relative', textAlign: 'center' }}>
          {template.badge && <Badge text={template.badge} accent="rgba(0,0,0,0.7)" />}
          <div style={{ fontSize: 'clamp(56px, 18vw, 110px)', fontWeight: 900, color: '#fff', lineHeight: 0.85, letterSpacing: -4, marginTop: 12 }}>{template.stat?.value}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 10, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}>{template.stat?.label}</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '8%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {lines.map((l, i) => <div key={i} style={{ fontSize: 'clamp(18px, 4.5vw, 32px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: -0.5, marginBottom: 2 }}>{l}</div>)}
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '10px 0 18px', lineHeight: 1.55 }}>{template.subheadline}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CTAButton text={template.cta} accent={template.accentColor} />
          <Logo accent={template.accentColor} />
        </div>
      </div>
    </div>
  );
}

// ─── NEW: Testimonial layout ──────────────────────────────────────────────────
function LayoutTestimonial({ template }: { template: AdTemplate }) {
  const bg = template.darkMode ? '#0c0c0c' : '#FAFAF8';
  const textColor = template.darkMode ? '#fff' : '#111';
  const subColor = template.darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)';
  const initials = (template.attribution ?? 'A B').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div style={{ width: '100%', height: '100%', background: bg, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${template.darkMode ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />
      <div style={{ position: 'absolute', bottom: '-30%', left: '-10%', width: '70%', height: '70%', background: template.accentColor, filter: 'blur(100px)', opacity: 0.08, borderRadius: '50%' }} />

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Logo accent={template.accentColor} dark={template.darkMode} />
        {template.badge && <Badge text={template.badge} accent={template.accentColor} />}
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
          {[...Array(5)].map((_, i) => <span key={i} style={{ color: template.accentColor, fontSize: 20 }}>★</span>)}
        </div>
        <div style={{ fontSize: 'clamp(20px, 5vw, 34px)', fontWeight: 800, color: textColor, lineHeight: 1.22, letterSpacing: -0.4, fontStyle: 'italic', maxWidth: '92%' }}>
          "{template.quote}"
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: template.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#000' }}>{initials}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: textColor, letterSpacing: -0.2 }}>{template.attribution}</div>
            <div style={{ fontSize: 11, color: subColor }}>{template.subheadline}</div>
          </div>
        </div>
        <CTAButton text={template.cta} accent={template.accentColor} />
      </div>
    </div>
  );
}

// ─── NEW: Before / After layout ───────────────────────────────────────────────
function LayoutBeforeAfter({ template, lines }: { template: AdTemplate; lines: string[] }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* BEFORE half */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {template.screenshot && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={template.screenshot} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: 0.1, filter: 'grayscale(1)' }} />
        )}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 3, color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginBottom: 8 }}>Before</div>
          <div style={{ fontSize: 'clamp(13px, 3.5vw, 20px)', fontWeight: 700, color: 'rgba(255,255,255,0.3)', lineHeight: 1.25, textDecoration: 'line-through' }}>Paper cards. No data. Guessing.</div>
        </div>
      </div>

      {/* AFTER half */}
      <div style={{ flex: 1, background: template.accentColor, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6%' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.1)' }} />
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 3, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 8 }}>After ClientIn</div>
          {lines.map((l, i) => (
            <div key={i} style={{ fontSize: 'clamp(18px, 4.5vw, 32px)', fontWeight: 900, color: '#000', lineHeight: 1.0, letterSpacing: -0.5, marginBottom: 2 }}>{l}</div>
          ))}
        </div>
      </div>

      {/* VS pill */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#0a0a0a', border: `2px solid ${template.accentColor}`, borderRadius: 100, padding: '5px 14px', zIndex: 2 }}>
        <span style={{ color: template.accentColor, fontSize: 10, fontWeight: 800, letterSpacing: 1.5 }}>VS</span>
      </div>

      {/* Logo top-left */}
      <div style={{ position: 'absolute', top: '4%', left: '5%', zIndex: 2 }}><Logo accent={template.accentColor} /></div>

      {/* CTA bottom-right */}
      <div style={{ position: 'absolute', bottom: '5%', right: '5%', zIndex: 2 }}>
        <CTAButton text={template.cta} accent="#000" />
      </div>
    </div>
  );
}
