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
  // CUSTOMER — TESTIMONIAL / NEW LAYOUTS
  // ─────────────────────────────────────────────
  {
    id: 'c8', category: 'customer', format: 'static',
    title: 'Real Customer Review',
    headline: 'I never\nlose a stamp\ncard again.',
    subheadline: 'Verified ClientIn user · barbershop regular',
    caption: 'Real people. Real rewards. Real loyalty.\n\n#ClientIn #CustomerReview #LoyaltyApp',
    cta: 'Get ClientIn',
    layout: 'testimonial',
    accentColor: '#D97706',
    darkMode: true,
    badge: 'REVIEW',
    quote: 'I never lose a stamp card again. ClientIn is on my phone and I earn every single visit.',
    attribution: 'Marcus T.',
    platform: 'instagram',
  },
  {
    id: 'c9', category: 'customer', format: 'static',
    title: 'Before vs After',
    headline: 'Digital.\nInstant.\nAlways with you.',
    subheadline: 'Your loyalty card — upgraded.',
    caption: 'Say goodbye to paper stamp cards forever. ClientIn lives in your pocket. 📱\n\n#ClientIn #NoMorePaper #DigitalLoyalty',
    cta: 'Download Free',
    screenshot: '/3.png',
    layout: 'before-after',
    accentColor: '#D97706',
    darkMode: true,
    badge: 'UPGRADE',
    platform: 'instagram',
  },

  // ─────────────────────────────────────────────
  // BUSINESS — TESTIMONIAL / NEW LAYOUTS
  // ─────────────────────────────────────────────
  {
    id: 'b8', category: 'business', format: 'static',
    title: 'Owner Testimonial',
    headline: 'It paid for\nitself in the\nfirst week.',
    subheadline: 'Verified ClientIn business owner',
    caption: 'The businesses that grow aren\'t guessing. They\'re using ClientIn.\n\n#ClientIn #BusinessOwner #LocalGrowth',
    cta: 'Start Free',
    layout: 'testimonial',
    accentColor: '#10B981',
    darkMode: true,
    badge: 'OWNER STORY',
    quote: 'It paid for itself in the first week. My repeat rate went from 40% to 68% in a month.',
    attribution: 'Priya M. — Salon Owner',
    platform: 'linkedin',
  },
  {
    id: 'b9', category: 'business', format: 'static',
    title: 'Old Way vs ClientIn',
    headline: 'More data.\nMore repeats.\nMore revenue.',
    subheadline: 'Stop guessing. Start knowing.',
    caption: 'Paper cards can\'t tell you which customers are about to leave. ClientIn can.\n\n#ClientIn #SmallBusiness #RetentionData',
    cta: 'See the Difference',
    screenshot: '/5.png',
    layout: 'before-after',
    accentColor: '#10B981',
    darkMode: true,
    badge: 'DATA-DRIVEN',
    platform: 'linkedin',
  },

  // ─────────────────────────────────────────────
  // LAUNCH — TESTIMONIAL
  // ─────────────────────────────────────────────
  {
    id: 'l7', category: 'launch', format: 'static',
    title: 'Launch Review',
    headline: 'The loyalty app\nlocal businesses\nhave needed.',
    subheadline: 'Product Hunt · Top Launch',
    caption: 'ClientIn launched and local businesses everywhere said the same thing: finally.\n\n#ClientIn #ProductLaunch #LocalFirst',
    cta: 'Try It Free',
    layout: 'testimonial',
    accentColor: '#D97706',
    darkMode: false,
    badge: '🚀 LAUNCH',
    quote: 'Finally a loyalty app that works for local business. Not another generic SaaS.',
    attribution: 'Jamie R. — Café Owner',
    platform: 'twitter',
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

  // ─────────────────────────────────────────────
  // SOFT LAUNCH — STATIC (pre-launch teasers)
  // ─────────────────────────────────────────────
  {
    id: 'sl1', category: 'soft-launch' as const, format: 'static' as const,
    title: 'Paper Cards Are Dead',
    headline: 'Paper cards\nbelong in\n2012.',
    subheadline: 'Something better is coming. May 12.',
    caption: 'Seriously. Why is your favourite barbershop still handing out paper stamp cards in 2026?\n\nSomething\'s about to change. 👀 Follow to be first.\n\n#ComingSoon #LocalBusiness #LoyaltyApp',
    cta: 'Coming May 12',
    layout: 'type-only',
    accentColor: '#D97706',
    darkMode: true,
    badge: '� COMING SOON',
    platform: 'instagram',
  },
  {
    id: 'sl2', category: 'soft-launch' as const, format: 'static' as const,
    title: 'Coming May 12 — Countdown',
    headline: 'May\n12.',
    subheadline: 'Loyalty for local businesses. Digital. Effortless. Free.',
    caption: 'We\'ve been building quietly for 6 months.\n\nMay 12 — something drops. Follow to be first. 🧡\n\n#ClientIn #ComingSoon #LocalFirst',
    cta: 'Follow to be First',
    layout: 'split-stat',
    accentColor: '#D97706',
    darkMode: true,
    badge: '📅 SAVE THE DATE',
    stat: { value: 'May 12', label: 'mark your calendar' },
    platform: 'instagram',
  },
  {
    id: 'sl3', category: 'soft-launch' as const, format: 'static' as const,
    title: 'Built Quietly',
    headline: 'We\'ve been\nbuilding\nquietly.',
    subheadline: '6 months of work. Dropping May 12. Free for every local business.',
    caption: 'Didn\'t post much while we were building. That changes soon.\n\nMay 12. Follow to see it first 👀\n\n#BuildInPublic #ClientIn #ComingSoon',
    cta: 'Coming Soon',
    layout: 'minimal-quote',
    accentColor: '#D97706',
    darkMode: true,
    quote: 'We\'ve been building quietly. That changes May 12.',
    platform: 'twitter',
  },
  {
    id: 'sl4', category: 'soft-launch' as const, format: 'static' as const,
    title: 'The Gap in Local Business',
    headline: 'Big brands\nhave loyalty\ntech.\nLocal ones\ndon\'t.',
    subheadline: 'We\'re fixing that. May 12.',
    caption: 'A coffee chain can tell you which customers haven\'t visited in 30 days and send them a nudge.\n\nYour local café has a paper card in a drawer.\n\nThat imbalance ends May 12. Free for every local business. 🧡\n\n#LocalFirst #ClientIn #ComingSoon',
    cta: 'Coming May 12',
    screenshot: '/4.png',
    layout: 'screenshot-left',
    accentColor: '#D97706',
    darkMode: false,
    badge: '👀 TEASER',
    platform: 'instagram',
  },
  {
    id: 'sl5', category: 'soft-launch' as const, format: 'static' as const,
    title: 'Beta Feedback — Teaser',
    headline: '"I didn\'t\nexpect it\nto work\nthis fast."',
    subheadline: 'One of our beta testers. 12 customers on day one.',
    caption: 'We\'ve been quietly testing with a few local businesses.\n\nThe results? Better than we hoped.\n\nComing May 12. Free to start.\n\n#ClientIn #BetaTesting #ComingSoon #LocalBusiness',
    cta: 'Coming May 12',
    layout: 'testimonial',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🔒 BETA PREVIEW',
    quote: 'I didn\'t expect it to work this fast. 12 customers on day one.',
    attribution: 'Marcus T. — Barbershop Owner (beta user)',
    platform: 'instagram',
  },
  {
    id: 'sl6', category: 'soft-launch' as const, format: 'static' as const,
    title: 'The Problem — Before / After',
    headline: 'No system.\nNo data.\nNo way to\nbring them back.',
    subheadline: 'That\'s what most local businesses are working with. We built the fix.',
    caption: 'Most local business owners have no idea which customers are drifting away.\n\nNo system. No data. No way to act.\n\nWe built the fix. Dropping May 12.\n\n#ClientIn #CustomerRetention #LocalBusiness #ComingSoon',
    cta: 'Coming May 12',
    screenshot: '/5.png',
    layout: 'before-after',
    accentColor: '#D97706',
    darkMode: true,
    badge: '📊 THE PROBLEM',
    platform: 'linkedin',
  },

  // ─────────────────────────────────────────────
  // SOFT LAUNCH — ANIMATION CLIPS (pre-launch)
  // ─────────────────────────────────────────────
  {
    id: 'sla1', category: 'soft-launch' as const, format: 'animation-clip' as const,
    title: 'Paper Card Reel — Week 1',
    headline: 'How many\nloyalty cards\nhave you lost?',
    subheadline: 'Week 1 teaser — no product reveal. Just the pain point.',
    caption: 'You got stamped 8 times. Then it went through the wash. Then you started over.\n\nSomething\'s coming that fixes this. 👀\n\n#LoyaltyCard #LocalBusiness #ComingSoon',
    cta: 'Something\'s Coming',
    layout: 'type-only',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🎬 WEEK 1 REEL',
    animationScript: `Scene 1 (0–2s): Hands fumbling through a wallet — paper loyalty cards falling out, crumpled, faded. No music, ambient sound only.
Scene 2 (2–4s): Close-up of a paper stamp card: 8/10 stamps. Almost there.
Scene 3 (4–5s): Card crumpled. Tossed in the bin. Satisfying crumple sound.
Scene 4 (5–7s): Black screen. White text fades in: "How many this year?"
Scene 5 (7–9s): Text: "There's a better way." Amber glow from behind.
Scene 6 (9–10s): Single amber dot pulses. Text: "Coming May 12." No logo yet — pure intrigue.`,
    platform: 'instagram',
  },
  {
    id: 'sla2', category: 'soft-launch' as const, format: 'animation-clip' as const,
    title: 'App Teaser — 3 Second Look',
    headline: 'Something\'s\ncoming.',
    subheadline: 'Week 2 — first glimpse of the product. Blurred, fast, intriguing.',
    caption: 'We\'ve been building for 6 months.\n\nHere\'s a 3-second look. �\n\nDropping May 12. Follow to be first.\n\n#ClientIn #ComingSoon #LoyaltyApp',
    cta: 'May 12',
    screenshot: '/1.png',
    layout: 'screenshot-bg',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🎬 WEEK 2 TEASER',
    animationScript: `Scene 1 (0–2s): Black. Amber ambient glow builds slowly from centre. No text.
Scene 2 (2–4s): Blurred phone screen — just shapes and amber colours. Not legible yet. 3 fast cuts.
Scene 3 (4–5s): Single clear frame — ClientIn wallet with stamps. Then immediately blurred again.
Scene 4 (5–7s): Text slides in from left: "6 months of work."
Scene 5 (7–9s): Text: "Dropping May 12." Date pulses amber.
Scene 6 (9–10s): "Follow to be first." Small amber dot. Fade to black.
NOTE: Keep the product intentionally hard to read. Intrigue > clarity at this stage.`,
    platform: 'tiktok',
  },
  {
    id: 'sla3', category: 'soft-launch' as const, format: 'animation-clip' as const,
    title: 'Founder Story — Pre-Launch',
    headline: 'Why we\nstarted\nbuilding.',
    subheadline: 'Week 2 — raw founder story on LinkedIn / Instagram.',
    caption: 'I watched a great local barber lose a regular customer and have no idea it happened.\n\nNot because of bad service. Because there was no system.\n\nSo we built one. Coming May 12.\n\n#BuildInPublic #ClientIn #LocalBusiness #ComingSoon',
    cta: 'Coming May 12',
    layout: 'type-only',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🎬 FOUNDER REEL',
    animationScript: `[Founder to camera. Handheld. Natural lighting. No logo yet.]

0–5s: Direct to camera. "6 months ago I watched a really good barber lose a regular customer. And he had no idea it happened."

5–12s: "Not because of bad service. The guy just stopped coming back. And the barber had no system to notice, no way to reach out."

12–20s: [Cut to B-roll: local barbershop, café, salon — customers being served, busy environments]
Voiceover: "That gap felt wrong. Big brands have loyalty tech. Local businesses have a paper card."

20–25s: "So we built something. To level the playing field."

25–28s: Black screen. Text: "Coming May 12." Amber dot pulses.

NOTE: No product reveal. No app name yet. Pure story and emotion.`,
    platform: 'instagram',
  },
  {
    id: 'sla4', category: 'soft-launch' as const, format: 'animation-clip' as const,
    title: 'Beta POV — Week 3 Social Proof',
    headline: 'We gave\n3 businesses\nearly access.',
    subheadline: 'Week 3 — show real beta results without giving everything away.',
    caption: 'We\'ve been running a quiet beta with a few local businesses.\n\n247 customers. 75% repeat rate. 18 check-ins today.\n\nComing May 12 — free for every local business. Follow to be first 🧡\n\n#ClientIn #BetaTest #ComingSoon #LocalBusiness',
    cta: 'Coming May 12',
    screenshot: '/5.png',
    layout: 'before-after',
    accentColor: '#D97706',
    darkMode: true,
    badge: '🎬 WEEK 3 PROOF',
    animationScript: `Scene 1 (0–2s): Text: "We gave 3 businesses early access." White on black. Clean.
Scene 2 (2–5s): Screen recording of the ClientIn dashboard — numbers ticking: 247 customers, 75% repeat rate. Amber highlights.
Scene 3 (5–7s): Business owner reacts to dashboard on their phone. Natural, genuine reaction. "Wait, that's this month?"
Scene 4 (7–9s): Text overlay: "Set up in 10 minutes. Free to start."
Scene 5 (9–11s): Pull back — phone in hand, business setting visible.
Scene 6 (11–13s): Text: "Coming May 12. Free for every local business." Amber glow.
Scene 7 (13–15s): "Follow to be first." Small amber dot pulse. Fade to black.`,
    platform: 'instagram',
  },
];

export const CATEGORIES = [
  { id: 'customer' as const, label: 'Customer', emoji: '👤', desc: 'Ads that speak to customers — rewards, discovery, wallet' },
  { id: 'business' as const, label: 'Business', emoji: '💼', desc: 'Ads that speak to owners — retention, insights, setup' },
  { id: 'launch' as const, label: 'Launch', emoji: '🚀', desc: 'App launch — download CTAs, brand story, value prop' },
  { id: 'soft-launch' as const, label: 'Soft Launch', emoji: '✨', desc: 'Soft launch ads — reveal moments, founder story, early access' },
];

export const PLATFORM_FILTERS = [
  { id: 'all', label: 'All Platforms' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'twitter', label: 'Twitter / X' },
];

export const FORMAT_FILTERS = [
  { id: 'all', label: 'All Formats' },
  { id: 'static', label: 'Static Ads' },
  { id: 'animation-clip', label: 'Animation Scripts' },
];
