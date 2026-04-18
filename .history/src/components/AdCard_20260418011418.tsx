'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Download, Copy, Check, Maximize2, X, Image as ImageIcon } from 'lucide-react';
import type { AdTemplate } from '@/types';

const PLATFORM_COLORS: Record<string, string> = {
  instagram: '#E1306C',
  tiktok: '#69C9D0',
  linkedin: '#0A66C2',
  twitter: '#1DA1F2',
};

interface Props { template: AdTemplate }

// ─── Copy image to clipboard ──────────────────────────────────────────────────
async function copyAdImage(adEl: HTMLElement) {
  const { toPng } = await import('html-to-image');
  const dataUrl = await toPng(adEl, { pixelRatio: 2, cacheBust: true, backgroundColor: '#0a0a0a' });
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
}

// ─── Scene parser for animation scripts ──────────────────────────────────────

// ─── Real animated ad layouts ─────────────────────────────────────────────────

// Stamp counter animation — stamps pop in one by one then reward fires
function AnimStampCounter({ template }: { template: AdTemplate }) {
  const [phase, setPhase] = useState(0);
  // phase 0: stamps counting, phase 1: reward unlocked
  useEffect(() => {
    const t = setTimeout(() => setPhase(p => (p + 1) % 2), phase === 0 ? 3000 : 2000);
    return () => clearTimeout(t);
  }, [phase]);
  const stamps = 10;
  const filled = phase === 0 ? 9 : 10;
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '10%' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '80%', height: '80%', background: template.accentColor, filter: 'blur(110px)', opacity: phase === 1 ? 0.22 : 0.1, borderRadius: '50%', transition: 'opacity 0.8s ease' }} />
      <div style={{ position: 'absolute', top: 24, left: 24 }}><Logo accent={template.accentColor} /></div>

      <div style={{ position: 'relative', textAlign: 'center' }}>
        {/* Stamp grid */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 220, margin: '0 auto 28px' }}>
          {Array.from({ length: stamps }).map((_, i) => (
            <div key={i} style={{
              width: 34, height: 34, borderRadius: 10,
              background: i < filled ? template.accentColor : 'rgba(255,255,255,0.07)',
              border: `2px solid ${i < filled ? template.accentColor : 'rgba(255,255,255,0.12)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
              transform: i === filled - 1 && phase === 0 ? 'scale(1.25)' : 'scale(1)',
              transition: `all 0.35s ease ${i * 0.07}s`,
              boxShadow: i < filled ? `0 0 14px ${template.accentColor}60` : 'none',
            }}>
              {i < filled ? '✦' : ''}
            </div>
          ))}
        </div>

        {phase === 0 ? (
          <div style={{ animation: 'fadeUp 0.4s ease' }}>
            <div style={{ fontSize: 42, fontWeight: 900, color: '#fff', letterSpacing: -1.5, lineHeight: 1 }}>9 <span style={{ fontSize: 18, opacity: 0.4 }}>/ 10</span></div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>One more visit = free reward</div>
          </div>
        ) : (
          <div style={{ animation: 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: template.accentColor, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>🎉 Reward Unlocked</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: -1, lineHeight: 1.1 }}>Free Cut,<br />on the house.</div>
          </div>
        )}
      </div>

      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <CTAButton text={template.cta} accent={template.accentColor} />
      </div>

      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @keyframes popIn{from{opacity:0;transform:scale(0.7)}to{opacity:1;transform:scale(1)}}
      `}</style>
    </div>
  );
}

// Paper card being binned → ClientIn wallet appears
function AnimPaperVsDigital({ template }: { template: AdTemplate }) {
  const [phase, setPhase] = useState(0);
  // 0: paper card shown, 1: card exits (binned), 2: ClientIn wallet slides in
  useEffect(() => {
    const delays = [2200, 900, 3000];
    const t = setTimeout(() => setPhase(p => (p + 1) % 3), delays[phase]);
    return () => clearTimeout(t);
  }, [phase]);
  return (
    <div style={{ width: '100%', height: '100%', background: '#0f0f0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '10%' }}>
      <div style={{ position: 'absolute', top: 24, left: 24 }}><Logo accent={template.accentColor} /></div>

      {/* Phase 0 & 1: Paper card */}
      {phase <= 1 && (
        <div style={{
          textAlign: 'center',
          transform: phase === 1 ? 'translateY(140%) rotate(12deg)' : 'none',
          opacity: phase === 1 ? 0 : 1,
          transition: 'all 0.55s cubic-bezier(0.4,0,1,1)',
        }}>
          <div style={{ width: 200, height: 110, background: '#1e1e1e', border: '2px dashed rgba(255,255,255,0.12)', borderRadius: 16, margin: '0 auto 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Loyalty Card</div>
            <div style={{ display: 'flex', gap: 6 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ width: 16, height: 16, borderRadius: 4, background: i < 6 ? 'rgba(255,255,255,0.2)' : 'transparent', border: '1.5px solid rgba(255,255,255,0.12)' }} />
              ))}
            </div>
          </div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', textDecoration: 'line-through' }}>Paper. Lost. Forgotten.</div>
        </div>
      )}

      {/* Phase 2: Digital wallet */}
      {phase === 2 && (
        <div style={{ textAlign: 'center', animation: 'slideUp 0.5s cubic-bezier(0.34,1.56,0.64,1)' }}>
          <div style={{ width: 200, background: '#1a1a1a', border: `2px solid ${template.accentColor}40`, borderRadius: 20, margin: '0 auto 20px', padding: '16px 20px' }}>
            <div style={{ fontSize: 10, color: template.accentColor, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>ClientIn Wallet</div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{ width: 22, height: 22, borderRadius: 6, background: template.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, boxShadow: `0 0 8px ${template.accentColor}60` }}>✦</div>
              ))}
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>10/10 · Reward ready 🎉</div>
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Always with you.</div>
        </div>
      )}

      <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <CTAButton text={template.cta} accent={template.accentColor} />
      </div>

      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

// Dashboard stat counter ticking up
function AnimDashboardReveal({ template }: { template: AdTemplate }) {
  const [tick, setTick] = useState(0);
  const [phase, setPhase] = useState(0); // 0: count up, 1: show insight
  useEffect(() => {
    if (phase === 0) {
      const t = setInterval(() => setTick(v => {
        if (v >= 100) { clearInterval(t); setTimeout(() => setPhase(1), 400); return 100; }
        return v + 3;
      }), 30);
      return () => clearInterval(t);
    } else {
      const t = setTimeout(() => { setTick(0); setPhase(0); }, 3000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const customers = Math.round(tick * 2.47);
  const repeats = Math.round(tick * 0.75);

  return (
    <div style={{ width: '100%', height: '100%', background: '#090909', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', padding: '9%' }}>
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60%', height: '60%', background: template.accentColor, filter: 'blur(90px)', opacity: 0.12, borderRadius: '50%' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Logo accent={template.accentColor} />
        <Badge text="LIVE DATA" accent={template.accentColor} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
        {/* Stat tiles */}
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: 4 }}>Customers</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: '#fff', letterSpacing: -1, lineHeight: 1 }}>{customers}</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: `1px solid ${template.accentColor}30`, borderRadius: 14, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginBottom: 4 }}>Repeat Rate</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: template.accentColor, letterSpacing: -1, lineHeight: 1 }}>{repeats}%</div>
          </div>
        </div>

        {phase === 1 && (
          <div style={{ animation: 'fadeUp 0.4s ease', background: `${template.accentColor}12`, border: `1px solid ${template.accentColor}30`, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, color: template.accentColor, fontWeight: 700 }}>📈 +9.9% vs last month</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>156 visits this month · 18 today</div>
          </div>
        )}
      </div>

      <CTAButton text={template.cta} accent={template.accentColor} />
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

// App intro — screens slide in sequence
function AnimAppIntro({ template }: { template: AdTemplate }) {
  const [phase, setPhase] = useState(0);
  const screens = [
    { label: 'Welcome', desc: 'The loyalty app for local life', icon: '✦' },
    { label: 'Discover', desc: 'Top-rated spots near you', icon: '📍' },
    { label: 'Wallet', desc: '3 cards · 27 stamps collected', icon: '💳' },
    { label: 'Dashboard', desc: '247 customers · 75% repeat', icon: '📊' },
  ];
  useEffect(() => {
    const t = setInterval(() => setPhase(p => (p + 1) % screens.length), 1800);
    return () => clearInterval(t);
  }, [screens.length]);
  const s = screens[phase];
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '10%' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '70%', height: '70%', background: template.accentColor, filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', top: 24, left: 24 }}><Logo accent={template.accentColor} /></div>
      <Badge text="NOW LIVE" accent={template.accentColor} />

      <div key={phase} style={{ textAlign: 'center', margin: '24px 0', animation: 'screenIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>{s.icon}</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -0.8, lineHeight: 1.1 }}>{s.label}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>{s.desc}</div>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
        {screens.map((_, i) => (
          <div key={i} style={{ width: i === phase ? 20 : 6, height: 6, borderRadius: 3, background: i === phase ? template.accentColor : 'rgba(255,255,255,0.15)', transition: 'all 0.3s ease' }} />
        ))}
      </div>

      <CTAButton text={template.cta} accent={template.accentColor} />
      <style>{`@keyframes screenIn{from{opacity:0;transform:scale(0.85) translateY(12px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

// Problem → Solution split
function AnimProblemSolution({ template }: { template: AdTemplate }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setPhase(p => (p + 1) % 2), phase === 0 ? 2800 : 2800);
    return () => clearTimeout(t);
  }, [phase]);
  return (
    <div style={{ width: '100%', height: '100%', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: phase === 1 ? template.accentColor : '#0a0a0a', transition: 'background 0.7s ease' }} />
      <div style={{ position: 'absolute', inset: 0, padding: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 24, left: 24 }}>
          <Logo accent={template.accentColor} dark={phase === 0} />
        </div>

        {phase === 0 ? (
          <div key="problem" style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 16 }}>The Problem</div>
            <div style={{ fontSize: 'clamp(26px, 7vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: -1 }}>Paper cards<br />get lost.<br /><span style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>Customers forget.</span></div>
          </div>
        ) : (
          <div key="solution" style={{ animation: 'fadeUp 0.5s ease' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: 'rgba(0,0,0,0.4)', textTransform: 'uppercase', marginBottom: 16 }}>The Solution</div>
            <div style={{ fontSize: 'clamp(26px, 7vw, 48px)', fontWeight: 900, color: '#000', lineHeight: 1.1, letterSpacing: -1 }}>ClientIn.<br />Loyalty that<br />actually works.</div>
            <div style={{ marginTop: 24 }}><CTAButton text={template.cta} accent="#000" /></div>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

// Founder story text sequence
function AnimFounderStory({ template }: { template: AdTemplate }) {
  const lines = [
    'Great local businesses lose customers they spent years earning.',
    'Not because the service was bad.',
    'Because there was no system.',
    'So we built one.',
    'ClientIn. Free to start. Takes 10 minutes.',
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setIdx(i => (i + 1) % lines.length), 2400);
    return () => clearTimeout(t);
  }, [idx, lines.length]);
  return (
    <div style={{ width: '100%', height: '100%', background: '#070707', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '60%', height: '60%', background: template.accentColor, filter: 'blur(90px)', opacity: 0.09, borderRadius: '50%' }} />
      <Logo accent={template.accentColor} />
      <div key={idx} style={{ animation: 'fadeUp 0.45s ease' }}>
        <div style={{ width: 36, height: 3, background: template.accentColor, borderRadius: 2, marginBottom: 24 }} />
        <div style={{ fontSize: 'clamp(22px, 5.5vw, 36px)', fontWeight: 800, color: '#fff', lineHeight: 1.25, letterSpacing: -0.5, fontStyle: idx < 4 ? 'italic' : 'normal' }}>
          {idx < 4 ? `"${lines[idx]}"` : lines[idx]}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {lines.map((_, i) => <div key={i} style={{ height: 3, flex: i === idx ? 2 : 1, borderRadius: 2, background: i === idx ? template.accentColor : 'rgba(255,255,255,0.1)', transition: 'all 0.3s ease' }} />)}
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

// Insights graph bars animating up
function AnimInsightsGraph({ template }: { template: AdTemplate }) {
  const [progress, setProgress] = useState(0);
  const [showStat, setShowStat] = useState(false);
  useEffect(() => {
    setProgress(0); setShowStat(false);
    const t = setInterval(() => setProgress(p => {
      if (p >= 100) { clearInterval(t); setTimeout(() => setShowStat(true), 300); return 100; }
      return p + 2;
    }), 25);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (showStat) { const t = setTimeout(() => { setProgress(0); setShowStat(false); }, 3000); return () => clearTimeout(t); }
  }, [showStat]);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const heights = [52, 60, 45, 70, 58, 100, 82];

  return (
    <div style={{ width: '100%', height: '100%', background: '#090909', display: 'flex', flexDirection: 'column', padding: '9%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: 0, right: '-10%', width: '50%', height: '50%', background: template.accentColor, filter: 'blur(80px)', opacity: 0.1, borderRadius: '50%' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'auto' }}>
        <Logo accent={template.accentColor} />
        <Badge text="INSIGHTS" accent={template.accentColor} />
      </div>

      {showStat && (
        <div style={{ animation: 'fadeUp 0.4s ease', marginBottom: 12 }}>
          <div style={{ fontSize: 36, fontWeight: 900, color: template.accentColor, letterSpacing: -1, lineHeight: 1 }}>+9.9%</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>visits vs last month</div>
        </div>
      )}

      {/* Bar chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90, marginBottom: 6 }}>
        {days.map((d, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: '100%',
              height: Math.round(heights[i] * (progress / 100)) + '%',
              background: i === 5 ? template.accentColor : `${template.accentColor}50`,
              borderRadius: '4px 4px 0 0',
              transition: 'height 0.05s linear',
              boxShadow: i === 5 ? `0 0 12px ${template.accentColor}60` : 'none',
              minHeight: 2,
            }} />
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>{d}</div>
          </div>
        ))}
      </div>
      <CTAButton text={template.cta} accent={template.accentColor} />
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

// ─── Scene parser (kept for script display only) ──────────────────────────────
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
// keep parseScenes available for any future use
void parseScenes;

// ─── Ad canvas router ────────────────────────────────────────────────────────
function AdCanvas({ template }: { template: AdTemplate }) {
  const lines = template.headline.split('\n');
  const isAnim = template.format === 'animation-clip';
  if (isAnim) {
    if (template.id === 'ca1') return <AnimStampCounter template={template} />;
    if (template.id === 'ca2') return <AnimPaperVsDigital template={template} />;
    if (template.id === 'ca3') return <AnimAppIntro template={template} />;
    if (template.id === 'ba1') return <AnimDashboardReveal template={template} />;
    if (template.id === 'ba2') return <AnimInsightsGraph template={template} />;
    if (template.id === 'la1') return <AnimAppIntro template={template} />;
    if (template.id === 'la2') return <AnimProblemSolution template={template} />;
    if (template.id === 'la3') return <AnimFounderStory template={template} />;
    // fallback
    return <AnimStampCounter template={template} />;
  }
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
                <span className="text-amber-400 text-[11px]">🎬</span>
                <p className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">Animation Ad</p>
              </div>
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

                {/* Download flat PNG */}
                <button onClick={downloadFlat} disabled={exporting}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all disabled:opacity-60 flex-1">
                  <Download size={11} /> {exporting ? '…' : 'PNG'}
                </button>
              </>
            )}
          </div>

          {/* Phone frame export — always visible row (important on mobile where hover doesn't exist) */}
          {!isAnimation && (
            <button onClick={downloadPhone} disabled={exporting}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/4 border border-white/8 text-white/40 hover:text-white hover:bg-white/8 text-xs font-semibold transition-all disabled:opacity-50">
              📱 <span>Phone mockup export</span>
            </button>
          )}
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
