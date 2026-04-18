'use client';

import { useRef, useState } from 'react';
import { Download, Copy, Check, Film } from 'lucide-react';
import type { AdTemplate } from '@/types';
import { clsx } from 'clsx';

const PLATFORM_COLORS: Record<string, string> = {
  instagram: '#E1306C',
  tiktok: '#010101',
  linkedin: '#0A66C2',
  twitter: '#1DA1F2',
};

interface Props { template: AdTemplate }

export default function AdCard({ template }: Props) {
  const adRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const download = async () => {
    if (!adRef.current) return;
    const { toPng } = await import('html-to-image');
    const dataUrl = await toPng(adRef.current, { pixelRatio: 3, cacheBust: true });
    const a = document.createElement('a');
    a.download = `clientin-${template.id}.png`;
    a.href = dataUrl;
    a.click();
  };

  const copyCaption = async () => {
    await navigator.clipboard.writeText(template.caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = template.headline.split('\n');
  const isAnimation = template.format === 'animation-clip';

  return (
    <div className="flex flex-col gap-0 rounded-3xl overflow-hidden border border-white/8 bg-[#161616] hover:border-white/15 transition-all">

      {/* The ad canvas */}
      <div
        ref={adRef}
        data-ad-id={template.id}
        className="relative w-full overflow-hidden select-none"
        style={{ aspectRatio: '1/1', fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
      >
        {isAnimation ? (
          <LayoutAnimationScript template={template} lines={lines} />
        ) : template.layout === 'type-only' ? (
          <LayoutTypeOnly template={template} lines={lines} />
        ) : template.layout === 'minimal-quote' ? (
          <LayoutMinimalQuote template={template} />
        ) : template.layout === 'split-stat' ? (
          <LayoutSplitStat template={template} lines={lines} />
        ) : template.layout === 'screenshot-bg' ? (
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

      {/* Card footer */}
      <div className="p-4 flex flex-col gap-3 border-t border-white/6">
        {/* Title + platform */}
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

        {/* Caption */}
        <div className="bg-white/4 rounded-xl p-3">
          <p className="text-white/50 text-[11px] leading-relaxed line-clamp-3">{template.caption}</p>
        </div>

        {/* Animation script preview */}
        {isAnimation && template.animationScript && (
          <div className="bg-amber-500/6 border border-amber-500/15 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <Film size={11} className="text-amber-400" />
              <p className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">Scene Script</p>
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
            <button onClick={download}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all flex-1">
              <Download size={11} /> Download PNG
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Shared helpers ───────────────────────────────────────────────────────────
const Logo = ({ accent, dark = true }: { accent: string; dark?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
    <div style={{ width: 26, height: 26, background: accent, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900 }}>✦</div>
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

// ─── Layout: Screenshot as background ────────────────────────────────────────
function LayoutBg({ template, lines }: { template: AdTemplate; lines: string[] }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0a0a0a', overflow: 'hidden' }}>
      {template.screenshot && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={template.screenshot} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', opacity: 0.3 }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.97) 100%)' }} />
      {/* Accent glow */}
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

// ─── Layout: Side-by-side (phone left or right) ───────────────────────────────
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

// ─── Layout: Center phone ─────────────────────────────────────────────────────
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

// ─── Layout: Typography only ─────────────────────────────────────────────────
function LayoutTypeOnly({ template, lines }: { template: AdTemplate; lines: string[] }) {
  const bg = template.darkMode ? '#0a0a0a' : '#FAFAF8';
  const textColor = template.darkMode ? '#fff' : '#111';
  const subColor = template.darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  return (
    <div style={{ width: '100%', height: '100%', background: bg, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10%' }}>
      {/* Subtle grid texture via repeated dots */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `radial-gradient(${template.darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
      {/* Accent line */}
      <div style={{ position: 'absolute', top: 0, left: '10%', width: '30%', height: 3, background: template.accentColor, borderRadius: 0 }} />
      {/* Glow */}
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

// ─── Layout: Minimal quote ────────────────────────────────────────────────────
function LayoutMinimalQuote({ template }: { template: AdTemplate }) {
  const bg = template.darkMode ? '#0a0a0a' : '#FAFAF8';
  const textColor = template.darkMode ? '#fff' : '#111';
  const subColor = template.darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)';

  return (
    <div style={{ width: '100%', height: '100%', background: bg, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '60%', background: template.accentColor, filter: 'blur(100px)', opacity: 0.07, borderRadius: '50%' }} />
      {/* Large quote mark */}
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
        {template.platform && (
          <span style={{ fontSize: 10, color: subColor, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>{template.platform}</span>
        )}
      </div>
    </div>
  );
}

// ─── Layout: Big stat split ───────────────────────────────────────────────────
function LayoutSplitStat({ template, lines }: { template: AdTemplate; lines: string[] }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Top half — big stat */}
      <div style={{ flex: 1, background: template.accentColor, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '8%' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />
        <div style={{ position: 'relative', textAlign: 'center' }}>
          {template.badge && <Badge text={template.badge} accent="rgba(0,0,0,0.7)" />}
          <div style={{ fontSize: 'clamp(56px, 18vw, 110px)', fontWeight: 900, color: '#fff', lineHeight: 0.85, letterSpacing: -4, marginTop: 12 }}>{template.stat?.value}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 10, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}>{template.stat?.label}</div>
        </div>
      </div>
      {/* Bottom half — text */}
      <div style={{ flex: 1, padding: '8%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
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

// ─── Layout: Animation Script Card ───────────────────────────────────────────
function LayoutAnimationScript({ template, lines }: { template: AdTemplate; lines: string[] }) {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0d0d0d', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Film strip top accent */}
      <div style={{ height: 6, background: `repeating-linear-gradient(90deg, ${template.accentColor} 0px, ${template.accentColor} 24px, transparent 24px, transparent 36px)` }} />
      {/* Screenshot bg if available */}
      {template.screenshot && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={template.screenshot} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', opacity: 0.12 }} />
      )}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,13,13,0.6) 0%, rgba(13,13,13,0.97) 50%)' }} />

      <div style={{ position: 'relative', flex: 1, padding: '8%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Logo accent={template.accentColor} />
          {template.badge && <Badge text={template.badge} accent={template.accentColor} />}
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 28, height: 28, background: `${template.accentColor}20`, border: `1px solid ${template.accentColor}50`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🎬</div>
            <span style={{ color: template.accentColor, fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>Animation Script</span>
          </div>
          {lines.map((l, i) => <div key={i} style={{ fontSize: 'clamp(24px, 6vw, 42px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: -0.8, marginBottom: 2 }}>{l}</div>)}
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 12, lineHeight: 1.5 }}>{template.subheadline}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {template.platform && (
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 1.5, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: 100 }}>{template.platform}</span>
          )}
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>Script included below ↓</span>
        </div>
      </div>
    </div>
  );
}
