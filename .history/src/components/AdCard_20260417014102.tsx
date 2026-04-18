'use client';

import { useRef } from 'react';
import { Download } from 'lucide-react';
import type { AdTemplate } from '@/types';

interface Props {
  template: AdTemplate;
}

export default function AdCard({ template }: Props) {
  const adRef = useRef<HTMLDivElement>(null);

  const download = async () => {
    if (!adRef.current) return;
    const { toPng } = await import('html-to-image');
    const dataUrl = await toPng(adRef.current, { pixelRatio: 3 });
    const a = document.createElement('a');
    a.download = `clientin-${template.id}-${template.title.toLowerCase().replace(/\s+/g, '-')}.png`;
    a.href = dataUrl;
    a.click();
  };

  const lines = template.headline.split('\n');

  return (
    <div className="flex flex-col gap-3">
      {/* The Ad itself */}
      <div
        ref={adRef}
        data-ad-id={template.id}
        className="relative w-full overflow-hidden select-none"
        style={{ aspectRatio: '1 / 1', borderRadius: 24, fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        {template.layout === 'screenshot-bg' ? (
          <LayoutBg template={template} lines={lines} />
        ) : template.layout === 'screenshot-left' ? (
          <LayoutSide template={template} lines={lines} side="left" />
        ) : template.layout === 'screenshot-right' ? (
          <LayoutSide template={template} lines={lines} side="right" />
        ) : template.layout === 'screenshot-center' ? (
          <LayoutCenter template={template} lines={lines} />
        ) : (
          <LayoutSide template={template} lines={lines} side="right" />
        )}
      </div>

      {/* Caption + Download */}
      <div className="bg-white/4 border border-white/8 rounded-2xl p-4 flex flex-col gap-3">
        <div>
          <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mb-1">Caption</p>
          <p className="text-white/60 text-xs leading-relaxed">{template.caption}</p>
        </div>
        <button
          onClick={download}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors"
        >
          <Download size={13} /> Download Ad (PNG)
        </button>
      </div>
    </div>
  );
}

/* ── Layout: screenshot as full background with gradient overlay ── */
function LayoutBg({ template, lines }: { template: AdTemplate; lines: string[] }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0f0f0f' }}>
      {/* Screenshot bg */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={template.screenshot}
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.35 }}
      />
      {/* Gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)' }} />

      {/* Content */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '10%' }}>
        {template.badge && (
          <div style={{ marginBottom: 16, display: 'inline-flex', alignSelf: 'flex-start' }}>
            <span style={{ background: template.accentColor, color: '#000', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, padding: '4px 10px', borderRadius: 100 }}>
              {template.badge}
            </span>
          </div>
        )}
        <div style={{ marginBottom: 12 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ fontSize: 'clamp(28px, 8vw, 52px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: -1 }}>{l}</div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 24, lineHeight: 1.4 }}>{template.subheadline}</div>
        <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: template.accentColor, color: '#000', fontWeight: 800, fontSize: 13, padding: '10px 22px', borderRadius: 100 }}>
          {template.cta} →
        </div>
        {/* Logo */}
        <div style={{ position: 'absolute', top: 28, right: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, background: template.accentColor, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✦</div>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>ClientIn</span>
        </div>
      </div>
    </div>
  );
}

/* ── Layout: side-by-side (phone left or right) ── */
function LayoutSide({ template, lines, side }: { template: AdTemplate; lines: string[]; side: 'left' | 'right' }) {
  const bg = template.darkMode ? '#111' : '#FAFAF8';
  const textColor = template.darkMode ? '#fff' : '#111';
  const subColor = template.darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';

  const phoneEl = (
    <div style={{ flex: '0 0 44%', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      {/* Phone shadow glow */}
      <div style={{ position: 'absolute', bottom: '-10%', left: '15%', right: '15%', height: '30%', background: template.accentColor, filter: 'blur(40px)', opacity: 0.3, borderRadius: '50%' }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={template.screenshot}
        alt=""
        style={{ width: '88%', borderRadius: 24, boxShadow: '0 24px 60px rgba(0,0,0,0.4)', position: 'relative', objectFit: 'cover', objectPosition: 'top' }}
      />
    </div>
  );

  const textEl = (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: side === 'left' ? '10% 10% 10% 6%' : '10% 6% 10% 10%' }}>
      {template.badge && (
        <span style={{ display: 'inline-flex', alignSelf: 'flex-start', background: template.accentColor, color: '#000', fontSize: 9, fontWeight: 800, letterSpacing: 1.5, padding: '4px 10px', borderRadius: 100, marginBottom: 16 }}>
          {template.badge}
        </span>
      )}
      {lines.map((l, i) => (
        <div key={i} style={{ fontSize: 'clamp(22px, 5.5vw, 40px)', fontWeight: 900, color: textColor, lineHeight: 1.05, letterSpacing: -0.5 }}>{l}</div>
      ))}
      <div style={{ fontSize: 12, color: subColor, margin: '14px 0 22px', lineHeight: 1.5 }}>{template.subheadline}</div>
      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: template.accentColor, color: '#000', fontWeight: 800, fontSize: 12, padding: '9px 20px', borderRadius: 100 }}>
        {template.cta} →
      </div>

      {/* Logo bottom */}
      <div style={{ position: 'absolute', bottom: 24, [side === 'left' ? 'right' : 'left']: 24, display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 22, height: 22, background: template.accentColor, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>✦</div>
        <span style={{ color: subColor, fontWeight: 700, fontSize: 11 }}>ClientIn</span>
      </div>
    </div>
  );

  return (
    <div style={{ width: '100%', height: '100%', background: bg, display: 'flex', flexDirection: 'row', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle bg accent circle */}
      <div style={{ position: 'absolute', top: '-20%', [side]: '-10%', width: '60%', aspectRatio: '1', background: template.accentColor, filter: 'blur(80px)', opacity: 0.12, borderRadius: '50%' }} />
      {side === 'left' ? <>{phoneEl}{textEl}</> : <>{textEl}{phoneEl}</>}
    </div>
  );
}

/* ── Layout: centered phone, text above and below ── */
function LayoutCenter({ template, lines }: { template: AdTemplate; lines: string[] }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '70%', height: '40%', background: template.accentColor, filter: 'blur(80px)', opacity: 0.15, borderRadius: '50%' }} />

      {/* Logo top */}
      <div style={{ position: 'absolute', top: 28, left: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, background: template.accentColor, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✦</div>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 13 }}>ClientIn</span>
      </div>

      {/* Badge */}
      {template.badge && (
        <span style={{ background: template.accentColor, color: '#000', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, padding: '5px 14px', borderRadius: 100, marginBottom: 20 }}>
          {template.badge}
        </span>
      )}

      {/* Headline */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ fontSize: 'clamp(26px, 7vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: -1 }}>{l}</div>
        ))}
      </div>

      {/* Phone */}
      <div style={{ position: 'relative', width: '42%' }}>
        <div style={{ position: 'absolute', bottom: '-20%', left: '10%', right: '10%', height: '40%', background: template.accentColor, filter: 'blur(30px)', opacity: 0.4, borderRadius: '50%' }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={template.screenshot}
          alt=""
          style={{ width: '100%', borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.6)', position: 'relative', objectFit: 'cover', objectPosition: 'top' }}
        />
      </div>

      {/* Sub + CTA */}
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 20, marginBottom: 16, textAlign: 'center', maxWidth: '70%' }}>{template.subheadline}</div>
      <div style={{ background: template.accentColor, color: '#000', fontWeight: 800, fontSize: 13, padding: '10px 28px', borderRadius: 100 }}>
        {template.cta} →
      </div>
    </div>
  );
}
