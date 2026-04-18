'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { Sparkles, Calendar, Target, Zap, Users, TrendingUp, Clock, CheckCircle, Circle, ArrowRight, Megaphone, Lock, Eye, Rocket } from 'lucide-react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = 'pre-launch' | 'launch-day' | 'post-launch';
type Status = 'done' | 'in-progress' | 'upcoming';

interface Week {
  week: string;
  dates: string;
  phase: Phase;
  theme: string;
  goal: string;
  posts: Post[];
}

interface Post {
  platform: string;
  type: string;
  hook: string;
  caption: string;
  format: 'reel' | 'static' | 'story' | 'carousel' | 'tweet';
  status: Status;
  tip?: string;
}

// ─── Campaign data ────────────────────────────────────────────────────────────
const LAUNCH_DATE = 'May 12, 2026'; // ~3.5 weeks from now — adjust as needed

const WEEKS: Week[] = [
  // ── WEEK 1 ──────────────────────────────────────────────────────────────────
  {
    week: 'Week 1',
    dates: 'Apr 21 – 27',
    phase: 'pre-launch',
    theme: 'Problem Awareness',
    goal: 'Surface the pain. No product reveal. Make people feel the problem.',
    posts: [
      {
        platform: 'Instagram / TikTok',
        type: 'Reel',
        hook: '"How many loyalty cards have you lost this year?"',
        caption: 'You got stamped 8 times. Then it went through the wash. Then you started over. There\'s a better way. 👀 Something\'s coming.\n\n#LocalBusiness #LoyaltyCard #ComingSoon',
        format: 'reel',
        status: 'upcoming',
        tip: 'Film a real paper card being crumpled/binned. No text, no product. Just the relatable moment. Add trending audio.',
      },
      {
        platform: 'Instagram',
        type: 'Static Post',
        hook: '"Paper cards belong in 2012."',
        caption: 'Seriously. Why is your favourite barbershop still giving out paper stamp cards?\n\nSomething\'s about to change. 👀\n\n#Barbershop #LoyaltyApp #ComingSoon #LocalFirst',
        format: 'static',
        status: 'upcoming',
        tip: 'Use the "Paper Card vs Digital" static template. Amber accent. Bold type. No logo reveal needed.',
      },
      {
        platform: 'Twitter / X',
        type: 'Tweet Thread',
        hook: '"Local businesses lose regulars every single day. Here\'s why."',
        caption: '1/ Local businesses lose regulars every single day.\n\nNot because their service is bad.\nNot because prices went up.\n\nBecause there was no system to keep people coming back.\n\n2/ Paper stamp cards:\n❌ Get lost\n❌ Get forgotten\n❌ Give you zero data\n❌ Don\'t work when the card stays home\n\n3/ Big brands have loyalty tech that costs £10k+/year.\n\nLocal barbers and cafés have… a laminated card.\n\n4/ That imbalance is about to change. We\'re building something. 👀\n\n#LocalBusiness #CustomerRetention',
        format: 'tweet',
        status: 'upcoming',
        tip: 'Pin this thread. Engage every reply personally — this builds the launch audience.',
      },
    ],
  },

  // ── WEEK 2 ──────────────────────────────────────────────────────────────────
  {
    week: 'Week 2',
    dates: 'Apr 28 – May 4',
    phase: 'pre-launch',
    theme: 'Teaser & Intrigue',
    goal: 'Hint at the product. Build curiosity. Get people asking "what is this?"',
    posts: [
      {
        platform: 'Instagram / TikTok',
        type: 'Teaser Reel',
        hook: '"We\'ve been building something for 6 months. Here\'s a 3-second look."',
        caption: 'Teaser. Just a teaser.\n\nDropping May 12. Link in bio to get early access 👇\n\n#ClientIn #ComingSoon #LoyaltyApp #LocalBusiness',
        format: 'reel',
        status: 'upcoming',
        tip: 'Quick cuts of the app UI — blurred edges, amber glow. 3 seconds max of actual screen. End on black with a date card: "May 12." Drives saves and shares.',
      },
      {
        platform: 'Instagram',
        type: 'Static — Countdown',
        hook: '"Coming May 12."',
        caption: 'Loyalty for local businesses. Digital. Effortless. Free to start.\n\nComing May 12. Follow to be first. 🧡\n\n#ClientIn #LocalFirst #LoyaltyApp',
        format: 'static',
        status: 'upcoming',
        tip: 'Big date. Minimal design. High contrast. This is the "save to your feed" post.',
      },
      {
        platform: 'Instagram Stories',
        type: 'Story Series — Poll',
        hook: '"Quick question for business owners 👇"',
        caption: 'Story slide 1: "Do you have a loyalty program?" YES / NO\nStory slide 2: "How do you track repeat customers?" (free response)\nStory slide 3: "Something is coming May 12 that fixes all of this. 👀 Follow to be first."',
        format: 'story',
        status: 'upcoming',
        tip: 'Stories with polls drive algorithm reach. Screenshot interesting responses and repost to add social proof.',
      },
      {
        platform: 'LinkedIn',
        type: 'Founder Post',
        hook: '"6 months ago I watched a great local barber lose a regular and have no idea it happened."',
        caption: '6 months ago I watched a great local barber lose a regular customer.\n\nNot because of bad service.\nBecause there was no system.\n\nThe customer just… stopped coming back. And the barber had no way to know, no way to reach them.\n\nBig brands have loyalty tech that fixes this. CRM, push notifications, retention analytics.\n\nLocal businesses have a paper card.\n\nThat gap felt wrong. So we built something.\n\nLaunching May 12. Free for every local business.\n\nFollow to see it first. 👇\n\n#BuildingInPublic #LocalBusiness #Startup #CustomerRetention',
        format: 'static',
        status: 'upcoming',
        tip: 'No images needed on LinkedIn. Raw founder voice performs best. End with a question: "What\'s the biggest challenge in getting customers to come back?"',
      },
    ],
  },

  // ── WEEK 3 ──────────────────────────────────────────────────────────────────
  {
    week: 'Week 3',
    dates: 'May 5 – 11',
    phase: 'pre-launch',
    theme: 'Social Proof & Early Access',
    goal: 'Show that real businesses are already using it. Build FOMO. Drive early sign-ups.',
    posts: [
      {
        platform: 'Instagram / TikTok',
        type: 'Beta Business Reel',
        hook: '"We gave 3 local businesses early access. Here\'s what happened."',
        caption: 'We\'ve been running a quiet beta.\n\nHere\'s what one barbershop saw in their first 30 days with ClientIn.\n\n247 customers tracked. 75% came back. 18 check-ins today alone.\n\nLaunching May 12 — free for every local business.\n\n#ClientIn #LocalBusiness #CustomerRetention',
        format: 'reel',
        status: 'upcoming',
        tip: 'Show a real business owner\'s reaction to the dashboard. Even a phone-screen recording with numbers works. Authentic > polished.',
      },
      {
        platform: 'Instagram',
        type: 'Testimonial Static',
        hook: '"Set up in 10 minutes. 12 customers on day one."',
        caption: '"I didn\'t expect it to work this fast."\n\nMarcus set up ClientIn in 10 minutes on a Thursday. By Friday he had 12 new stamps tracked and 3 customers already on their second visit.\n\nFree. No hardware. No subscription to start.\n\nLaunching May 12.\n\n#ClientIn #Barbershop #LocalBusiness #CustomerLoyalty',
        format: 'static',
        status: 'upcoming',
        tip: 'Use the Testimonial layout from Ad Maker. Real name, real business type. If you have a photo, even better.',
      },
      {
        platform: 'Instagram Stories',
        type: 'Countdown Story',
        hook: '"7 days."',
        caption: 'Story sequence:\nSlide 1: "7 days." — just the number, amber background\nSlide 2: "Free for every local business."\nSlide 3: Link sticker → early access waitlist / App Store pre-order',
        format: 'story',
        status: 'upcoming',
        tip: 'Run this countdown daily (7, 6, 5, 4, 3, 2, 1). Simple, consistent. It trains your audience to expect the launch.',
      },
      {
        platform: 'TikTok',
        type: 'POV Reel',
        hook: '"POV: You just earned your 10th stamp at your fave café"',
        caption: 'POV: 10th stamp. Reward unlocked. Free coffee incoming. ☕\n\nThis is ClientIn. Dropping May 12.\n\n#POV #LoyaltyApp #ClientIn #FreeCoffee',
        format: 'reel',
        status: 'upcoming',
        tip: 'Use the Stamp Counter animated template as a screen recording. POV format + a reward moment = massive shareability on TikTok.',
      },
    ],
  },

  // ── LAUNCH DAY ───────────────────────────────────────────────────────────────
  {
    week: 'Launch Day',
    dates: 'May 12',
    phase: 'launch-day',
    theme: '🚀 We\'re Live',
    goal: 'Maximum reach. Every platform. Coordinated drop. Drive downloads and sign-ups in first 24 hours.',
    posts: [
      {
        platform: 'Instagram / TikTok',
        type: 'Hero Launch Reel',
        hook: '"Today\'s the day."',
        caption: 'ClientIn is live.\n\nFree loyalty for every local business. Download now — link in bio. 🧡\n\n#ClientIn #NowLive #LoyaltyApp #LocalFirst #LaunchDay',
        format: 'reel',
        status: 'upcoming',
        tip: 'The "We\'re Live — Reveal Reel" from Soft Launch section. Amber dot → logo reveal → app screens → CTA. Post at 9am sharp.',
      },
      {
        platform: 'Instagram',
        type: 'Launch Static',
        hook: '"ClientIn is live. Free to download."',
        caption: 'We built this for the barbershop that\'s been open 8 years.\nThe café that knows your order.\nThe salon that remembers your name.\n\nClientIn is live. Free for customers. Free to start for businesses.\n\nDownload now — link in bio. 🧡\n\n#ClientIn #LaunchDay #LoyaltyApp #LocalBusiness',
        format: 'static',
        status: 'upcoming',
        tip: 'Pin this to your profile. This is your permanent launch post.',
      },
      {
        platform: 'Instagram Stories',
        type: 'Story Blitz (×5)',
        hook: '"We\'re live — swipe up to download"',
        caption: 'Story 1: "IT\'S LIVE." — amber full screen, logo\nStory 2: App Store screenshot / download button\nStory 3: Quick demo screen recording (15s)\nStory 4: "Free for every local business. Tell your favourite shop."\nStory 5: Link sticker + "Download ClientIn"',
        format: 'story',
        status: 'upcoming',
        tip: 'Post stories every 2 hours on launch day to stay top of feed. Use the countdown sticker set to 0.',
      },
      {
        platform: 'Twitter / X',
        type: 'Launch Tweet',
        hook: '"ClientIn is live. We built loyalty for local businesses."',
        caption: 'ClientIn is live.\n\nFree loyalty for local businesses. Digital stamp cards, customer insights, rewards.\n\nSet up in 10 minutes. No subscription to start.\n\nFor the barbershop. The café. The salon.\n\nDownload free → [link]\n\n#ClientIn #LaunchDay',
        format: 'tweet',
        status: 'upcoming',
        tip: 'Tag Product Hunt if you\'re doing a PH launch on the same day. Ask followers to retweet.',
      },
      {
        platform: 'LinkedIn',
        type: 'Founder Launch Post',
        hook: '"Today we launched ClientIn. Here\'s why this matters."',
        caption: 'Today we launched ClientIn.\n\nFor the past 6 months we\'ve been building a loyalty platform for local businesses — barbershops, cafés, salons, restaurants.\n\nNot because the market needed another app. Because the market needed the RIGHT app.\n\nOne that:\n✅ Works in 10 minutes\n✅ Needs no hardware\n✅ Is free to start\n✅ Actually gives owners data\n\nBig chains have had this for years. Local businesses deserve it too.\n\nWe\'re live today. Free to download.\n\nIf you know a local business owner who\'d benefit from this — please share. It would mean everything. 🙏\n\n#ClientIn #LaunchDay #LocalBusiness #Startup',
        format: 'static',
        status: 'upcoming',
        tip: 'Comment back on every single reply within the first hour. LinkedIn rewards early engagement with massive reach.',
      },
    ],
  },

  // ── POST-LAUNCH WEEK 1 ───────────────────────────────────────────────────────
  {
    week: 'Post-Launch',
    dates: 'May 13 – 19',
    phase: 'post-launch',
    theme: 'Momentum & Social Proof',
    goal: 'Extend the launch hype. Collect and post real user reactions. Drive word-of-mouth.',
    posts: [
      {
        platform: 'Instagram / TikTok',
        type: 'Day 1 Stats Reel',
        hook: '"24 hours after launch. Here\'s what happened."',
        caption: '[Replace with real numbers]\n\nDay 1 of ClientIn:\n🏪 [X] businesses signed up\n👤 [X] customers downloaded\n⭐ [X] stamps collected\n\nThank you for the love. Just getting started. 🧡\n\n#ClientIn #Day1 #LaunchDay',
        format: 'reel',
        status: 'upcoming',
        tip: 'Use the animated Dashboard Reveal template. Replace numbers with real launch day metrics. This post will perform extremely well.',
      },
      {
        platform: 'Instagram',
        type: 'Customer Reaction Repost',
        hook: '"Someone just used ClientIn for the first time 🧡"',
        caption: 'The first time someone earns a reward with ClientIn hits different.\n\nThank you to everyone who downloaded on day one. More coming. 🧡\n\n#ClientIn #CustomerLove',
        format: 'static',
        status: 'upcoming',
        tip: 'Screenshot or repost the first real customer review / App Store rating. Even a text screenshot works. Authenticity wins.',
      },
      {
        platform: 'TikTok',
        type: '"How it works" Walkthrough',
        hook: '"How a barbershop sets up ClientIn in under 5 minutes"',
        caption: 'From zero to your first customer stamp in under 5 minutes.\n\nFree. No hardware. No subscription to start.\n\nLink in bio. 💈\n\n#ClientIn #Barbershop #Tutorial #LoyaltyApp',
        format: 'reel',
        status: 'upcoming',
        tip: 'Screen-record the real onboarding flow. Talk over it casually. This is the highest-converting video type for a utility app.',
      },
    ],
  },
];

// ─── Phase config ──────────────────────────────────────────────────────────────
const PHASE_CONFIG: Record<Phase, { label: string; color: string; bg: string; border: string }> = {
  'pre-launch': { label: 'Pre-Launch', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  'launch-day': { label: '🚀 Launch Day', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  'post-launch': { label: 'Post-Launch', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
};

const FORMAT_ICONS: Record<string, string> = {
  reel: '🎬', static: '🖼️', story: '📱', carousel: '🎠', tweet: '𝕏',
};

const STATUS_CONFIG: Record<Status, { icon: typeof CheckCircle; color: string; label: string }> = {
  done: { icon: CheckCircle, color: 'text-emerald-400', label: 'Done' },
  'in-progress': { icon: Zap, color: 'text-amber-400', label: 'In Progress' },
  upcoming: { icon: Circle, color: 'text-white/20', label: 'Upcoming' },
};

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function CampaignPage() {
  const [activePhase, setActivePhase] = useState<Phase | 'all'>('all');
  const [expandedWeek, setExpandedWeek] = useState<string | null>('Week 1');

  const filtered = activePhase === 'all' ? WEEKS : WEEKS.filter(w => w.phase === activePhase);

  const totalPosts = WEEKS.flatMap(w => w.posts).length;
  const platforms = ['Instagram', 'TikTok', 'LinkedIn', 'Twitter / X', 'Stories'];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="border-b border-white/6 bg-black/60 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/clientin-logo.png" alt="ClientIn" className="w-8 h-8 rounded-xl" />
            <div className="leading-none">
              <span className="font-bold text-white text-sm tracking-tight">ClientIn</span>
              <span className="text-white/25 text-sm"> · Launch Plan</span>
            </div>
          </div>
          <Link href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/6 border border-white/10 hover:bg-white/10 text-white/50 hover:text-white text-xs font-semibold rounded-xl transition-all">
            <Sparkles size={11} />
            Ad Maker
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">

        {/* Hero */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Lock size={10} /> Internal · Pre-Launch Only
          </div>
          <h1 className="text-[28px] sm:text-[38px] font-black tracking-tight leading-tight">
            ClientIn Soft Launch<br />
            <span className="text-amber-400">Campaign Plan</span>
          </h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-xl">
            A 4-week coordinated content strategy from first teaser to launch day.
            Every post is designed, captioned, and ready to execute.
            Launch target: <span className="text-white font-semibold">{LAUNCH_DATE}</span>.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Calendar, label: 'Launch Date', value: 'May 12', sub: '~3.5 weeks away' },
            { icon: Megaphone, label: 'Total Posts', value: String(totalPosts), sub: 'across all platforms' },
            { icon: Target, label: 'Platforms', value: String(platforms.length), sub: 'IG · TikTok · X · LinkedIn' },
            { icon: TrendingUp, label: 'Goal', value: '1K+', sub: 'downloads week one' },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="bg-white/4 border border-white/8 rounded-2xl p-4">
              <Icon size={14} className="text-amber-400 mb-2" />
              <div className="text-[22px] font-black tracking-tight text-white">{value}</div>
              <div className="text-[10px] text-white/30 font-semibold uppercase tracking-wider mt-0.5">{label}</div>
              <div className="text-[10px] text-white/20 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* Strategy overview */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <Eye size={14} className="text-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">The Strategy</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                phase: 'pre-launch' as Phase,
                icon: '🌊',
                title: 'Build the Wave',
                weeks: 'Weeks 1–3',
                desc: 'Surface the problem. No product reveal yet. Make people feel the pain of paper cards and bad retention. Build an audience who wants the solution before they know what it is.',
                tactics: ['Problem-first content', 'Curiosity teasers', 'Founder voice on LinkedIn', 'Beta social proof'],
              },
              {
                phase: 'launch-day' as Phase,
                icon: '🚀',
                title: 'Drop Everything',
                weeks: 'May 12',
                desc: 'Coordinated launch across all platforms in a single day. Maximum reach window. Every post drives to one action: download the app.',
                tactics: ['Hero launch reel', 'Founder story post', 'Story blitz (5× stories)', 'Twitter/X launch thread'],
              },
              {
                phase: 'post-launch' as Phase,
                icon: '📈',
                title: 'Sustain & Convert',
                weeks: 'Week 5+',
                desc: 'Turn the launch into momentum. Post real metrics, real reactions, real user stories. The algorithm rewards consistency — keep posting daily for 7 days after launch.',
                tactics: ['Day 1 stats reveal', 'Real review reposts', 'How-it-works walkthrough', '"Meet a business" series'],
              },
            ].map(({ icon, title, weeks, desc, tactics, phase }) => (
              <div key={title} className={clsx('rounded-xl p-4 border', PHASE_CONFIG[phase].bg, PHASE_CONFIG[phase].border)}>
                <div className="text-2xl mb-3">{icon}</div>
                <div className={clsx('text-[10px] font-bold uppercase tracking-wider mb-1', PHASE_CONFIG[phase].color)}>{weeks}</div>
                <div className="text-sm font-bold text-white mb-2">{title}</div>
                <p className="text-white/40 text-[11px] leading-relaxed mb-3">{desc}</p>
                <ul className="space-y-1">
                  {tactics.map(t => (
                    <li key={t} className="flex items-center gap-1.5 text-[11px] text-white/50">
                      <div className={clsx('w-1 h-1 rounded-full shrink-0', PHASE_CONFIG[phase].color.replace('text-', 'bg-'))} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Key rules */}
        <div className="bg-amber-500/5 border border-amber-500/15 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={13} className="text-amber-400" />
            <h2 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Rules Before You Post Anything</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { rule: 'Never reveal the product name before Week 2', why: 'Curiosity drives follows. Let people ask "what is this?" first.' },
              { rule: 'Post every day in launch week', why: 'The algorithm rewards daily posts. Miss a day and you lose momentum.' },
              { rule: 'Reply to every comment in the first hour', why: 'Engagement velocity in the first 60 minutes determines total reach.' },
              { rule: 'Use trending audio on every Reel/TikTok', why: 'Algorithm distribution depends on it. Check trends the morning you post.' },
              { rule: 'Stories > Feed posts for conversion', why: 'Link stickers in stories drive the most direct installs. Post stories daily.' },
              { rule: 'Real > polished on TikTok', why: 'Authentic phone recordings outperform studio edits 3:1 on TikTok.' },
              { rule: 'LinkedIn = founder voice only', why: 'No brand polish. Personal stories about why you built this outperform everything else.' },
              { rule: 'Save your best reel for launch day', why: 'Don\'t burn your hero content in pre-launch. Save it for May 12.' },
            ].map(({ rule, why }) => (
              <div key={rule} className="flex gap-3 p-3 bg-white/4 rounded-xl border border-white/6">
                <ArrowRight size={12} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white leading-snug">{rule}</div>
                  <div className="text-[11px] text-white/35 mt-0.5 leading-relaxed">{why}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <span className="text-[10px] text-white/25 uppercase tracking-widest font-bold shrink-0">Phase</span>
          {[
            { id: 'all' as const, label: 'All Weeks', icon: <Calendar size={10} /> },
            { id: 'pre-launch' as const, label: 'Pre-Launch', icon: <Eye size={10} /> },
            { id: 'launch-day' as const, label: 'Launch Day', icon: <Rocket size={10} /> },
            { id: 'post-launch' as const, label: 'Post-Launch', icon: <TrendingUp size={10} /> },
          ].map(({ id, label, icon }) => (
            <button key={id}
              onClick={() => setActivePhase(id)}
              className={clsx('flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0',
                activePhase === id
                  ? 'bg-amber-500 border-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'bg-white/4 border-white/8 text-white/50 hover:text-white hover:bg-white/8'
              )}>
              {icon} {label}
            </button>
          ))}
        </div>

        {/* Weekly breakdown */}
        <div className="space-y-4">
          {filtered.map((week) => {
            const isOpen = expandedWeek === week.week;
            const phaseConf = PHASE_CONFIG[week.phase];

            return (
              <div key={week.week} className={clsx('border rounded-2xl overflow-hidden transition-all', isOpen ? 'border-white/15 bg-[#161616]' : 'border-white/8 bg-white/[0.02]')}>
                {/* Week header */}
                <button
                  onClick={() => setExpandedWeek(isOpen ? null : week.week)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-left">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={clsx('shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full border', phaseConf.bg, phaseConf.border, phaseConf.color)}>
                      {week.week === 'Launch Day' ? '🚀' : week.week}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-bold text-sm">{week.theme}</span>
                        <span className={clsx('text-[10px] font-semibold', phaseConf.color)}>{phaseConf.label}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-white/30 text-xs flex items-center gap-1"><Clock size={9} /> {week.dates}</span>
                        <span className="text-white/20 text-xs">{week.posts.length} posts planned</span>
                      </div>
                    </div>
                  </div>
                  <div className={clsx('shrink-0 transition-transform', isOpen ? 'rotate-90' : '')}>
                    <ArrowRight size={14} className="text-white/30" />
                  </div>
                </button>

                {/* Goal banner */}
                {isOpen && (
                  <div className="px-5 pb-2">
                    <div className={clsx('text-[11px] px-4 py-2.5 rounded-xl border leading-relaxed', phaseConf.bg, phaseConf.border)}>
                      <span className={clsx('font-bold', phaseConf.color)}>Goal: </span>
                      <span className="text-white/60">{week.goal}</span>
                    </div>
                  </div>
                )}

                {/* Posts */}
                {isOpen && (
                  <div className="px-5 pb-5 space-y-3 mt-2">
                    {week.posts.map((post, i) => {
                      const statusConf = STATUS_CONFIG[post.status];
                      const StatusIcon = statusConf.icon;
                      return (
                        <div key={i} className="bg-white/4 border border-white/8 rounded-xl overflow-hidden">
                          {/* Post header */}
                          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/6">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-base">{FORMAT_ICONS[post.format]}</span>
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-white truncate">{post.type}</div>
                                <div className="text-[10px] text-white/30">{post.platform}</div>
                              </div>
                            </div>
                            <div className={clsx('flex items-center gap-1.5 shrink-0 text-[10px] font-semibold', statusConf.color)}>
                              <StatusIcon size={10} />
                              {statusConf.label}
                            </div>
                          </div>

                          {/* Hook */}
                          <div className="px-4 pt-3 pb-1">
                            <div className="text-[10px] text-white/25 uppercase tracking-wider font-bold mb-1">Hook</div>
                            <div className="text-sm font-bold text-white leading-snug">{post.hook}</div>
                          </div>

                          {/* Caption */}
                          <div className="px-4 pt-2 pb-1">
                            <div className="text-[10px] text-white/25 uppercase tracking-wider font-bold mb-1">Caption</div>
                            <div className="text-[11px] text-white/50 leading-relaxed whitespace-pre-line">{post.caption}</div>
                          </div>

                          {/* Tip */}
                          {post.tip && (
                            <div className="mx-4 mb-3 mt-2 bg-amber-500/8 border border-amber-500/15 rounded-lg px-3 py-2">
                              <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-0.5">💡 Execution tip</div>
                              <div className="text-[11px] text-white/50 leading-relaxed">{post.tip}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA — go make the ads */}
        <div className="border border-white/8 rounded-2xl p-6 bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users size={14} className="text-amber-400" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Ready to build the ads?</span>
            </div>
            <p className="text-white font-semibold text-sm">Every static and animated post in this plan has a matching template in Ad Maker.</p>
            <p className="text-white/35 text-xs mt-0.5">Export clean PNGs and live animation previews for every week.</p>
          </div>
          <Link href="/"
            className="flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-xl transition-all shrink-0">
            <Sparkles size={13} />
            Open Ad Maker
          </Link>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
