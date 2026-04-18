import type { AdTemplate } from '@/types';

export const AD_TEMPLATES: AdTemplate[] = [

  // ─────────────────────────────────────────────
  // CUSTOMER — STATIC
  // ─────────────────────────────────────────────
  {
    id: 'c1', category: 'customer', format: 'static',
    title: 'Earn Every Visit',
    headline: 'Every visit\nearns you\nsomething.',
    subheadline: 'Stamps, perks & rewards — always in your pocket.',
    caption: 'Stop carrying paper loyalty cards. ClientIn keeps every stamp safe. ☕✂️💅\n\n#ClientIn #LoyaltyRewards #LocalFirst',
    cta: 'Download Free',
    screenshot: '/3.png',
    layout: 'screenshot-right',
    accentColor: '#D97706',
    darkMode: true,
    badge: 'FOR CUSTOMERS',
    platform: 'instagram',
  },
  {
    id: 'c2', category: 'customer', format: 'static',
    title: 'Discover Local Spots',
    headline: 'Find the best\nlocal shops\nnear you.',
    subheadline: 'Top-rated salons, cafés & barbers — with rewards attached.',
    caption: 'Discover hidden gems in your city and get rewarded every single time you go back. 📍\n\n#ClientIn #DiscoverLocal #Rewards',
    cta: 'Explore Now',
    screenshot: '/2.png',
    layout: 'screenshot-left',
    accentColor: '#D97706',
    darkMode: false,
    badge: 'DISCOVER',
    platform: 'instagram',
  },
  {
    id: 'c3', category: 'customer', format: 'static',
    title: 'All Your Cards. One Wallet.',
    headline: 'All your\nloyalty cards.\nOne wallet.',
    subheadline: '3 cards. 85 visits. 6 rewards ready to redeem.',
    caption: 'From your barber to your fave café — all your stamps live here. Never start from scratch again.\n\n#ClientIn #MyWallet #NeverLoseStamps',
    cta: 'Get the App',
    screenshot: '/3.png',
    layout: 'screenshot-bg',
    accentColor: '#D97706',
    darkMode: true,
    badge: 'MY WALLET',
    platform: 'instagram',
  },
  {
    id: 'c4', category: 'customer', format: 'static',
    title: '9 of 10 — Almost There',
    headline: 'You\'re\n9 of 10\nstamps in.',
    subheadline: 'One more visit. Free reward unlocked.',
    caption: 'The feeling of that last stamp hitting. ClientIn makes every visit count. 🎯\n\n#ClientIn #AlmostThere #FreeReward',
    cta: 'See Your Rewards',
    screenshot: '/3.png',
    layout: 'split-stat',
    accentColor: '#D97706',
    darkMode: true,
    stat: { value: '9/10', label: 'stamps collected' },
    platform: 'instagram',
  },
  {
    id: 'c5', category: 'customer', format: 'static',
    title: 'Your Barber Knows You',
    headline: 'Your barber\nremembers\nyour fade.',
    subheadline: 'ClientIn makes sure you never miss a reward for showing up.',
    caption: 'Loyalty should work both ways. ClientIn rewards the customers who keep showing up. 💈\n\n#ClientIn #BarberLife #LoyalCustomer',
    cta: 'Download ClientIn',
    layout: 'type-only',
    accentColor: '#D97706',
    darkMode: true,
    platform: 'instagram',
  },
  {
    id: 'c6', category: 'customer', format: 'static',
    title: 'The Loyalty App for Real Life',
    headline: 'Loyalty that\nactually fits\nyour life.',
    subheadline: 'Barbershops, cafés, salons, restaurants — all on ClientIn.',
    caption: 'One app. Every local business you love. All your rewards in one place.\n\n#ClientIn #LocalLoyalty #SmartRewards',
    cta: 'Download Free',
    screenshot: '/1.png',
    layout: 'screenshot-center',
    accentColor: '#D97706',
    darkMode: true,
    platform: 'instagram',
  },
  {
    id: 'c7', category: 'customer', format: 'static',
    title: 'Built For Regulars',
    headline: '"Built for\nthe ones\nwho show up."',
    subheadline: 'ClientIn rewards your loyalty automatically.',
    caption: 'You\'re already a regular. Time you got treated like one.\n\n#ClientIn #ForRegulars #RewardYourself',
    cta: 'Get ClientIn',
    layout: 'minimal-quote',
    accentColor: '#D97706',
    darkMode: true,
    quote: 'Built for the ones who show up.',
    platform: 'instagram',
  },

  // ─────────────────────────────────────────────
  // CUSTOMER — ANIMATION CLIPS
  // ─────────────────────────────────────────────
  {
    id: 'ca1', category: 'customer', format: 'animation-clip',
    title: 'Stamp Counter Reel',
    headline: 'Watch your\nrewards\nbuild up.',
    subheadline: '9 stamps → reward unlocked. Satisfying every time.',
    caption: 'POV: one more visit until your free coffee ☕ @clientinapp\n\n#ClientIn #LoyaltyApp #FreeReward',
    cta: 'Download ClientIn',
    screenshot: '/3.png',
    layout: 'screenshot-bg',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🎬 REEL IDEA',
    animationScript: `Scene 1 (0–2s): Black screen. Text fades in: "POV: You just got your haircut."
Scene 2 (2–4s): Close-up of phone screen — loyalty card showing 8/10 stamps.
Scene 3 (4–5s): Stamp icon animates in — 9/10. Subtle vibration.
Scene 4 (5–7s): Screen pulses amber — "1 more visit = Free Cut" glows on screen.
Scene 5 (7–9s): Text overlay: "ClientIn. Rewards that actually show up."
Scene 6 (9–10s): App icon + "Download Free" CTA. Amber background fade in.`,
    platform: 'tiktok',
  },
  {
    id: 'ca2', category: 'customer', format: 'animation-clip',
    title: 'Paper Card vs ClientIn',
    headline: 'Paper cards\nvs\nyour phone.',
    subheadline: 'One always ends up in the wash.',
    caption: 'The era of losing your stamp card at the bottom of your bag is over 👜\n\n#ClientIn #NoMorePaperCards #Upgrade',
    cta: 'Switch to ClientIn',
    layout: 'type-only',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🎬 REEL IDEA',
    animationScript: `Scene 1 (0–1s): Crumpled paper loyalty card — 8/10 stamps — shown on table.
Scene 2 (1–2s): Hand picks it up, throws it in bin. Satisfying crumple sound.
Scene 3 (2–4s): Phone screen slides in — ClientIn wallet, all cards neat and full.
Scene 4 (4–6s): Side by side: "Paper card: lost. ClientIn: always with you."
Scene 5 (6–8s): Stamp fills to 10/10 on screen — reward banner appears.
Scene 6 (8–10s): "Download free." Bold white text. Amber background.`,
    platform: 'tiktok',
  },
  {
    id: 'ca3', category: 'customer', format: 'animation-clip',
    title: 'Discover Screen Walkthrough',
    headline: 'Find your\nnew\nfavourite spot.',
    subheadline: 'Top-rated local businesses, ranked by people like you.',
    caption: 'Swipe. Discover. Earn. The best local spots are one tap away 📍\n\n#ClientIn #Discover #LocalFirst',
    cta: 'Explore Now',
    screenshot: '/2.png',
    layout: 'screenshot-bg',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🎬 STORY IDEA',
    animationScript: `Scene 1 (0–2s): Phone screen recording of ClientIn Discover tab loading — map with amber pins.
Scene 2 (2–4s): Scroll through list — Serenity Spa (4.9★), Artisan Bakery (4.8★).
Scene 3 (4–5s): Tap on a business — rewards badge: "5 visits = 15% Off".
Scene 4 (5–7s): Text overlay slides in: "Find shops that reward you for coming back."
Scene 5 (7–9s): Zoom out to map view with multiple pins glowing.
Scene 6 (9–10s): ClientIn logo + "Download free" on dark background.`,
    platform: 'instagram',
  },

  // ─────────────────────────────────────────────
  // BUSINESS — STATIC
  // ─────────────────────────────────────────────
  {
    id: 'b1', category: 'business', format: 'static',
    title: '75% Repeat Rate',
    headline: '75% of your\ncustomers\ncame back.',
    subheadline: '186 returning customers in 90 days.',
    caption: 'That\'s not luck. That\'s a loyalty program that actually works. ClientIn gives you the tools — and the data.\n\n#ClientIn #CustomerRetention #LocalBusiness',
    cta: 'Grow My Business',
    screenshot: '/4.png',
    layout: 'screenshot-right',
    accentColor: '#D97706',
    darkMode: true,
    badge: 'FOR BUSINESSES',
    stat: { value: '75%', label: 'repeat rate' },
    platform: 'instagram',
  },
  {
    id: 'b2', category: 'business', format: 'static',
    title: 'Customer Insights',
    headline: 'Stop guessing.\nStart\nknowing.',
    subheadline: '+9.9% visits this month. 12 customers need attention.',
    caption: 'ClientIn tells you who\'s slipping away before it\'s too late. Act on data, not gut feeling.\n\n#ClientIn #CustomerInsights #SmallBiz',
    cta: 'See the Dashboard',
    screenshot: '/5.png',
    layout: 'screenshot-left',
    accentColor: '#D97706',
    darkMode: false,
    badge: 'INSIGHTS',
    platform: 'instagram',
  },
  {
    id: 'b3', category: 'business', format: 'static',
    title: '247 Customers',
    headline: '247\ncustomers.\n18 today.',
    subheadline: 'Real-time dashboard. Always know who walked in.',
    caption: 'Your business, at a glance. See check-ins, repeat rates and active rewards — all from your phone.\n\n#ClientIn #BusinessDashboard #LocalBiz',
    cta: 'Get the Dashboard',
    screenshot: '/4.png',
    layout: 'split-stat',
    accentColor: '#D97706',
    darkMode: true,
    stat: { value: '247', label: 'total customers' },
    platform: 'instagram',
  },
  {
    id: 'b4', category: 'business', format: 'static',
    title: 'Build Loyalty In Minutes',
    headline: 'Your loyalty\nprogram.\nLive today.',
    subheadline: 'No hardware. No setup fees. No tech skills needed.',
    caption: 'Create a loyalty program for your business in minutes. Your customers download the app — and you keep them coming back.\n\n#ClientIn #SetupInMinutes #SmallBusinessOwner',
    cta: 'Get Started Free',
    screenshot: '/4.png',
    layout: 'screenshot-bg',
    accentColor: '#D97706',
    darkMode: true,
    badge: 'FOR OWNERS',
    platform: 'instagram',
  },
  {
    id: 'b5', category: 'business', format: 'static',
    title: 'Know Who\'s At Risk',
    headline: '12 customers\nhaven\'t been\nback.',
    subheadline: 'ClientIn flags who\'s drifting — so you can act first.',
    caption: 'The businesses that keep customers don\'t wait. They know who\'s at risk and they act.\n\n#ClientIn #RetentionStrategy #SmallBiz',
    cta: 'Try ClientIn Free',
    layout: 'type-only',
    accentColor: '#D97706',
    darkMode: true,
    stat: { value: '12', label: 'need attention' },
    platform: 'linkedin',
  },
  {
    id: 'b6', category: 'business', format: 'static',
    title: 'The Retention Platform',
    headline: '"The tool\nI wish I had\nyear one."',
    subheadline: 'Built for barbershops, cafés, salons & restaurants.',
    caption: 'ClientIn was built by people who understand local business. Not another generic SaaS.\n\n#ClientIn #BuiltForLocal #Retention',
    cta: 'See How It Works',
    layout: 'minimal-quote',
    accentColor: '#D97706',
    darkMode: true,
    quote: 'The tool I wish I had year one.',
    platform: 'linkedin',
  },
  {
    id: 'b7', category: 'business', format: 'static',
    title: 'Visit Trends Up',
    headline: '+9.9%\nvisits this\nmonth.',
    subheadline: '156 this month vs 142 last month. Trend is up.',
    caption: 'Growth you can see. ClientIn\'s insights dashboard shows you exactly what\'s working.\n\n#ClientIn #GrowthMetrics #BusinessInsights',
    cta: 'See My Growth',
    screenshot: '/5.png',
    layout: 'screenshot-right',
    accentColor: '#10B981',
    darkMode: true,
    badge: 'GROWING',
    stat: { value: '+9.9%', label: 'visits this month' },
    platform: 'instagram',
  },

  // ─────────────────────────────────────────────
  // BUSINESS — ANIMATION CLIPS
  // ─────────────────────────────────────────────
  {
    id: 'ba1', category: 'business', format: 'animation-clip',
    title: 'Dashboard Walkthrough',
    headline: 'Your business\nat a glance.',
    subheadline: 'Live check-ins, repeat rates, rewards — all in one screen.',
    caption: 'This is what running a loyalty program looks like in 2026 📊 @clientinapp\n\n#ClientIn #BusinessDashboard #LocalBusiness',
    cta: 'Get ClientIn',
    screenshot: '/4.png',
    layout: 'screenshot-bg',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🎬 REEL IDEA',
    animationScript: `Scene 1 (0–2s): Phone screen — ClientIn Dashboard loading. "Tap" barbershop. Status: Open.
Scene 2 (2–4s): Camera slowly zooms into stat tiles: 247 Customers, 18 Check-ins, 75% Repeat Rate.
Scene 3 (4–5s): Text overlay: "247 customers. 18 walked in today."
Scene 4 (5–7s): Scroll to Recent Check-ins — Emma Wilson, James Murphy, Sarah O'Connor.
Scene 5 (7–9s): Pull back — text fades in: "Know your business. Keep your customers."
Scene 6 (9–10s): ClientIn logo + "Free for your business" CTA.`,
    platform: 'tiktok',
  },
  {
    id: 'ba2', category: 'business', format: 'animation-clip',
    title: 'Insights Graph Reveal',
    headline: 'See your\ngrowth\nhappen.',
    subheadline: 'Visit trends, monthly comparison, customer risk flags.',
    caption: 'When you can see the data, you can change the outcome 📈\n\n#ClientIn #BusinessInsights #CustomerRetention',
    cta: 'Try ClientIn',
    screenshot: '/5.png',
    layout: 'screenshot-bg',
    accentColor: '#10B981',
    darkMode: true,
    badge: '🎬 REEL IDEA',
    animationScript: `Scene 1 (0–2s): Dark background. Text: "What does 9.9% growth actually look like?"
Scene 2 (2–5s): ClientIn Insights screen — bar chart animates up day by day, Mon→Sun.
Scene 3 (5–6s): Highlight Saturday bar (38 visits). Text: "Record day."
Scene 4 (6–8s): Cut to monthly comparison: 156 this month vs 142 last month. +9.9% badge.
Scene 5 (8–9s): Text overlay: "See the trend. Catch it early. Keep customers."
Scene 6 (9–10s): ClientIn logo. "Free to try."`,
    platform: 'instagram',
  },

  // ─────────────────────────────────────────────
  // LAUNCH — STATIC
  // ─────────────────────────────────────────────
  {
    id: 'l1', category: 'launch', format: 'static',
    title: 'ClientIn Is Live',
    headline: 'Loyalty,\nreinvented\nfor locals.',
    subheadline: 'The app that turns first-time customers into regulars.',
    caption: 'ClientIn is now live on iOS. Download free and start earning — or start growing. 🎉\n\n#ClientIn #NowLive #LaunchDay',
    cta: 'Download Now',
    screenshot: '/1.png',
    layout: 'screenshot-center',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🚀 NOW LIVE',
    platform: 'instagram',
  },
  {
    id: 'l2', category: 'launch', format: 'static',
    title: 'For Both Sides',
    headline: 'One app.\nTwo sides.\nEndless loyalty.',
    subheadline: 'Whether you earn rewards or build them — ClientIn is for you.',
    caption: 'Download ClientIn — free for customers, simple for businesses. The loyalty app built for real life.\n\n#ClientIn #ForEveryone #LaunchDay',
    cta: 'Get ClientIn',
    screenshot: '/1.png',
    layout: 'screenshot-right',
    accentColor: '#D97706',
    darkMode: true,
    badge: 'INTRODUCING',
    platform: 'instagram',
  },
  {
    id: 'l3', category: 'launch', format: 'static',
    title: 'First Visit, Not The Last',
    headline: 'First visit.\nNot\nthe last.',
    subheadline: 'ClientIn turns new customers into loyal regulars.',
    caption: 'We built ClientIn for the businesses that rely on people coming back. And for the customers who always do.\n\n#ClientIn #Retention #LocalFirst',
    cta: 'Download on iOS',
    screenshot: '/2.png',
    layout: 'screenshot-left',
    accentColor: '#D97706',
    darkMode: false,
    badge: 'APP LAUNCH',
    platform: 'instagram',
  },
  {
    id: 'l4', category: 'launch', format: 'static',
    title: 'Download Free',
    headline: 'Download\nClientIn.\nIt\'s free.',
    subheadline: 'iOS. Free for customers. Easy setup for businesses.',
    caption: 'Join the local businesses already building loyalty with ClientIn. Free to download. Takes minutes to set up. 📲\n\n#ClientIn #AppStore #DownloadNow',
    cta: 'Download on App Store',
    screenshot: '/3.png',
    layout: 'screenshot-bg',
    accentColor: '#D97706',
    darkMode: true,
    badge: '📲 FREE ON IOS',
    platform: 'instagram',
  },
  {
    id: 'l5', category: 'launch', format: 'static',
    title: 'The Why Behind ClientIn',
    headline: '"Local\nbusinesses\ndeserve better."',
    subheadline: 'So we built ClientIn.',
    caption: 'Paper stamp cards. Forgotten loyalty programs. Customers who drift and never come back.\n\nWe built ClientIn to fix all of it.\n\n#ClientIn #WhyWeBuild #LocalFirst',
    cta: 'Read Our Story',
    layout: 'minimal-quote',
    accentColor: '#D97706',
    darkMode: true,
    quote: 'Local businesses deserve better tools.',
    platform: 'linkedin',
  },
  {
    id: 'l6', category: 'launch', format: 'static',
    title: 'The Stats Speak',
    headline: 'Built for\nthe 75%\nwho come back.',
    subheadline: 'Repeat customers are the backbone of every local business.',
    caption: '75% repeat rate. 247 customers tracked. 18 check-ins today.\n\nThis is what ClientIn looks like in action.\n\n#ClientIn #RetentionStats #LocalBusiness',
    cta: 'See It In Action',
    layout: 'split-stat',
    accentColor: '#D97706',
    darkMode: true,
    stat: { value: '75%', label: 'average repeat rate' },
    platform: 'linkedin',
  },

  // ─────────────────────────────────────────────
  // LAUNCH — ANIMATION CLIPS
  // ─────────────────────────────────────────────
  {
    id: 'la1', category: 'launch', format: 'animation-clip',
    title: 'App Intro Reel',
    headline: 'This is\nClientIn.',
    subheadline: 'A 10-second intro reel for launch day.',
    caption: 'Introducing ClientIn — the loyalty app for local businesses. Now live on iOS 🚀\n\n#ClientIn #LaunchDay #LoyaltyApp',
    cta: 'Download Now',
    screenshot: '/1.png',
    layout: 'screenshot-bg',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🎬 LAUNCH REEL',
    animationScript: `Scene 1 (0–1s): Black. Amber dot pulses in centre — expands to fill screen.
Scene 2 (1–2s): ClientIn welcome screen slides in from bottom. "Choose how you want to use ClientIn."
Scene 3 (2–4s): Split — left panel: "I'm a Customer" card. Right panel: "I'm a Business Owner" card. Each slides in from opposite sides.
Scene 4 (4–6s): Quick cuts: Discover screen → Wallet with stamps → Dashboard stats (247 customers, 75% repeat) → Insights graph going up.
Scene 5 (6–8s): Slow zoom out on phone. Text fades in: "Loyalty. Reinvented for locals."
Scene 6 (8–10s): White ClientIn logo on amber background. "Now live on iOS. Free to download."`,
    platform: 'instagram',
  },
  {
    id: 'la2', category: 'launch', format: 'animation-clip',
    title: 'Problem → Solution Reel',
    headline: 'Paper cards\nare dead.',
    subheadline: 'The 30-second ad that explains everything.',
    caption: 'We\'ve all lost a paper stamp card. There\'s a better way 📱\n\n#ClientIn #Innovation #LocalBusiness',
    cta: 'Download ClientIn',
    layout: 'type-only',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🎬 AD CONCEPT',
    animationScript: `Scene 1 (0–2s): Messy wallet — crumpled paper cards falling out. Voiceover: "How many loyalty cards have you lost this year?"
Scene 2 (2–4s): Paper card in washing machine. Text: "This shouldn't happen in 2026."
Scene 3 (4–6s): Phone unlocks. ClientIn app opens — clean wallet with digital cards.
Scene 4 (6–8s): Stamp fills up. Reward unlocked. Subtle celebration animation.
Scene 5 (8–10s): Business owner's dashboard. 75% repeat rate. Smile.
Scene 6 (10–12s): "ClientIn. For customers and the businesses they love." Logo fade in on amber.`,
    platform: 'instagram',
  },
  {
    id: 'la3', category: 'launch', format: 'animation-clip',
    title: 'Founder Story — LinkedIn',
    headline: 'Why we\nbuilt\nClientIn.',
    subheadline: 'A 60-second founder video concept for LinkedIn.',
    caption: 'We watched great local businesses lose customers they\'d spent years earning. So we built ClientIn.\n\n#ClientIn #FounderStory #BuildingInPublic',
    cta: 'Try It Free',
    layout: 'type-only',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🎬 LINKEDIN VIDEO',
    animationScript: `[Founder to camera, natural lighting, seated in a local café or barbershop]

0–10s: "I kept seeing the same thing. Great local businesses — amazing at their craft — but struggling to get customers to come back. Not because the service was bad. Because there was no system."

10–25s: [Cut to B-roll: barbershop, café, salon — customers being served]
Voiceover: "A paper stamp card isn't a loyalty program. It's a guess."

25–40s: [Screen recording of ClientIn dashboard — 247 customers, 75% repeat, recent check-ins]
Voiceover: "We built ClientIn to give local business owners what big brands already have — real customer data, real loyalty, real retention."

40–55s: [Back to founder] "It's free to start. Takes 10 minutes to set up. And it just works."

55–60s: "That's ClientIn. For the businesses that deserve to grow." Logo card.`,
    platform: 'linkedin',
  },
];

export const CATEGORIES = [
  { id: 'customer' as const, label: 'Customer', emoji: '👤', desc: 'Ads that speak to customers — rewards, discovery, wallet' },
  { id: 'business' as const, label: 'Business', emoji: '💼', desc: 'Ads that speak to owners — retention, insights, setup' },
  { id: 'launch' as const, label: 'Launch', emoji: '🚀', desc: 'App launch — download CTAs, brand story, value prop' },
];

export const PLATFORM_FILTERS = [
  { id: 'all', label: 'All Platforms' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'linkedin', label: 'LinkedIn' },
];

export const FORMAT_FILTERS = [
  { id: 'all', label: 'All Formats' },
  { id: 'static', label: 'Static Ads' },
  { id: 'animation-clip', label: 'Animation Scripts' },
];
