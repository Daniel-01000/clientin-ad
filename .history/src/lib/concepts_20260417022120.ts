import type { AdConcept, AdCategory } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const BASE_STYLE = `Photorealistic premium social media ad, square format 1:1, clean minimal aesthetic, warm amber and dark tones, modern typography overlaid, professional studio lighting, no text unless specified, ultra high quality.`;

export const AD_CONCEPTS: Omit<AdConcept, 'id'>[] = [
  // ─── CUSTOMER ADS ────────────────────────────────────────────────────────────
  {
    category: 'customer',
    title: 'Earn While You Sip',
    description: 'Show a customer earning their stamp at a cozy café',
    caption: 'Every visit counts. Earn stamps, unlock rewards, never miss a perk. 📱☕\n\n#ClientIn #LoyaltyRewards #CaféLife',
    imagePrompt: `${BASE_STYLE} A stylish young woman at a warm independent café counter, smiling as she taps her phone to a QR code on the counter. The phone screen glows showing a loyalty stamp card filling up — 7 of 10 stamps collected. Rich espresso tones, golden hour light through café window. Text overlay: "Every visit rewarded." Bold sans-serif white text bottom-left.`,
  },
  {
    category: 'customer',
    title: 'Your Regular Spot Knows You',
    description: 'Emotional loyalty — the barber knows your name',
    caption: 'Your barber remembers your fade. ClientIn remembers your rewards. 💈\n\n#ClientIn #BarberLife #Loyalty',
    imagePrompt: `${BASE_STYLE} A confident Black man sitting in a barbershop chair, barber working on his hair, both smiling in a premium barbershop with warm amber lighting. On a small shelf nearby, a phone shows a ClientIn loyalty card: "8/10 stamps — Free Cut Next Visit". Cinematic, lifestyle photography. Text overlay: "Your regulars deserve more." White bold sans-serif.`,
  },
  {
    category: 'customer',
    title: 'Never Lose Your Stamps Again',
    description: 'Pain point — paper stamp cards are lost, digital is better',
    caption: 'No more lost paper cards. All your loyalty rewards, always in your pocket. 🎯\n\n#ClientIn #NeverMissOut #DigitalLoyalty',
    imagePrompt: `${BASE_STYLE} A split composition: left side shows a crumpled, half-stamped paper loyalty card on a table. Right side shows a modern phone with a clean digital loyalty wallet app — cards from a café and a salon stacked neatly. Warm minimal studio lighting. Text overlay: "All your rewards. One wallet." Dark background, amber accent.`,
  },
  {
    category: 'customer',
    title: 'Discover New Favourites',
    description: 'Customer discovering local businesses on the map view',
    caption: 'Find the best local spots near you — and get rewarded every time you go back. 📍\n\n#ClientIn #DiscoverLocal #Rewards',
    imagePrompt: `${BASE_STYLE} Aerial-style top-down view of a vibrant city neighbourhood map glowing on a phone screen, with amber pin markers on a spa, café, and barbershop. The hand holding the phone is relaxed, casual, on a café table with a latte. Clean, modern. Text overlay: "Discover. Visit. Get rewarded." Minimal white typography.`,
  },
  {
    category: 'customer',
    title: 'Free Dessert Is One Visit Away',
    description: 'Reward anticipation — almost at the goal',
    caption: '9 of 10 stamps. Free dessert is so close you can taste it. 🍰\n\n#ClientIn #AlmostThere #FreeRewards',
    imagePrompt: `${BASE_STYLE} Close-up of a beautifully plated restaurant dessert — dark chocolate tart with gold leaf — next to a phone showing a loyalty card progress: 9 out of 10 stamps filled, one empty circle remaining, reward shown as "Free Dessert". Warm candlelight atmosphere, fine dining setting. Text: "One visit away." Elegant serif + sans-serif mix.`,
  },

  // ─── BUSINESS OWNER ADS ──────────────────────────────────────────────────────
  {
    category: 'business',
    title: '75% Repeat Rate',
    description: 'Lead with the flagship stat from the dashboard',
    caption: '75% of your customers came back. That\'s not luck — that\'s loyalty built with ClientIn. 📊\n\n#ClientIn #CustomerRetention #GrowYourBusiness',
    imagePrompt: `${BASE_STYLE} A focused business owner, mid-30s, sits at a clean desk reviewing a dashboard on their phone showing "75% Repeat Rate — 186 returning customers." Background: their barbershop is visible through a glass partition, busy and thriving. Confident, optimistic mood. Text overlay: "75% repeat rate. Built with ClientIn." Bold dark background, amber number highlight.`,
  },
  {
    category: 'business',
    title: 'Know Who\'s At Risk',
    description: 'Insights showing 12 customers need attention',
    caption: 'ClientIn tells you which customers are slipping away — before it\'s too late. Act now. 🔔\n\n#ClientIn #CustomerInsights #SmallBusinessOwner',
    imagePrompt: `${BASE_STYLE} A salon owner standing at their front desk, glancing at their phone with a look of focused concern. Phone screen shows: "12 customers need attention — haven't visited in 30+ days." Warm salon lighting, flowers on counter. Sense of proactive control. Text overlay: "Know before they leave." White on dark.`,
  },
  {
    category: 'business',
    title: 'Your Dashboard, Always Open',
    description: 'Business dashboard with real-time check-ins',
    caption: '247 customers. 18 check-ins today. 12 active rewards. All in your pocket. 💼\n\n#ClientIn #BusinessDashboard #LocalBusiness',
    imagePrompt: `${BASE_STYLE} A restaurant owner in an apron leans against the bar early morning, reviewing a phone dashboard showing 247 customers, 18 check-ins today, 75% repeat rate. The restaurant is being prepped for opening behind them — soft morning light, organised and premium. Text overlay: "Your business, at a glance." Minimal amber on dark.`,
  },
  {
    category: 'business',
    title: 'Reward Redemption — Frictionless',
    description: 'Staff scanning a reward code at point of sale',
    caption: 'A 4-digit code. A free coffee. A customer who comes back next week. That\'s ClientIn. ☕\n\n#ClientIn #SeamlessExperience #LoyaltyProgram',
    imagePrompt: `${BASE_STYLE} Close-up of a barista's hands entering a 4-digit reward redemption code on a tablet POS system. In the background a smiling customer holds their phone. Counter is clean with fresh pastries. Warm café tones. Text overlay: "Redeem in seconds." Clean sans-serif, amber accent.`,
  },
  {
    category: 'business',
    title: 'Build a Loyalty Program in Minutes',
    description: 'Setup is fast — speak to overwhelmed small business owners',
    caption: 'No app dev. No hardware. No fuss. Your loyalty program, live in minutes. 🚀\n\n#ClientIn #SetupInMinutes #SmallBizTech',
    imagePrompt: `${BASE_STYLE} A small business owner (female, late 20s, wearing a stylish apron) sits at a café table with a coffee and laptop, smiling as she sets up a loyalty program on her phone. The screen shows a clean setup flow — business name, reward type. Sunlit indie café backdrop, plants, warm tones. Text overlay: "Live in minutes." Bold confidence.`,
  },

  // ─── APP LAUNCH ADS ──────────────────────────────────────────────────────────
  {
    category: 'launch',
    title: 'ClientIn Is Here',
    description: 'Hero launch announcement — bold and cinematic',
    caption: 'The loyalty app built for local businesses is here. Download ClientIn today. 🎉\n\n#ClientInApp #NowLive #LoyaltyApp',
    imagePrompt: `${BASE_STYLE} Dramatic dark background with a glowing amber gradient. A premium iPhone mockup shows the ClientIn welcome screen — "I\'m a Customer" and "I\'m a Business Owner" options visible. Soft light rays emanating from behind the phone. Floating micro UI elements (stamps, star ratings, reward cards) orbit the phone. Text overlay: "ClientIn. Now live." Large bold white serif headline. Cinematic launch energy.`,
  },
  {
    category: 'launch',
    title: 'For Customers & Businesses',
    description: 'Side-by-side dual audience launch post',
    caption: 'One app. Two sides. Zero lost stamps. ClientIn is built for everyone. 📱\n\n#ClientIn #ForEveryone #LaunchDay',
    imagePrompt: `${BASE_STYLE} Split-screen composition. Left side warm amber tone: a customer in a barbershop smiling, phone shows loyalty wallet with stamps. Right side deep dark tone: a business owner at their counter, phone shows the dashboard with customer stats. A clean diagonal line splits them. Center: the ClientIn logo mark. Text: "For customers. For businesses. For loyalty." Premium typographic layout.`,
  },
  {
    category: 'launch',
    title: 'Turn First-Timers Into Regulars',
    description: 'Core value prop — the transformation story',
    caption: 'Your first visit is just the beginning. ClientIn turns new customers into your most loyal ones. 🤝\n\n#ClientIn #Retention #LocalFirst',
    imagePrompt: `${BASE_STYLE} A warm lifestyle photograph of a group of friends walking into a local barbershop, laughing. One person holds a phone showing the ClientIn app discover screen with star-rated local shops. Overhead string lights, golden hour. Optimistic and community-driven energy. Text overlay: "First visit. Not the last." Bold white with amber underline accent.`,
  },
  {
    category: 'launch',
    title: 'Available on iOS',
    description: 'App store download CTA post',
    caption: 'ClientIn is live on the App Store. Download free and start earning — or start growing. 📲\n\n#ClientIn #AppStore #DownloadNow',
    imagePrompt: `${BASE_STYLE} Minimalist premium ad. Pure dark background (#1a1a1a). Center: a floating iPhone showing the ClientIn app home screen with the welcome screen and amber branding. Below the phone: a glowing white "Download on the App Store" badge. Small floating elements — stamp icons, star ratings, a reward card — subtly orbit the device. Amber glow halo behind phone. Text: "Loyalty, redefined." Ultra clean, Apple-aesthetic quality.`,
  },
];

export function getConceptsWithIds(): AdConcept[] {
  return AD_CONCEPTS.map((c) => ({ ...c, id: uuidv4() }));
}

export function getCategories(): { id: AdCategory; label: string; emoji: string; desc: string }[] {
  return [
    { id: 'customer', label: 'Customer Ads', emoji: '👤', desc: 'Speak to customers — earning rewards, discovering local spots' },
    { id: 'business', label: 'Business Ads', emoji: '💼', desc: 'Speak to owners — retention stats, dashboard, loyalty setup' },
    { id: 'launch', label: 'App Launch', emoji: '🚀', desc: 'Announce ClientIn — download CTAs, brand story, value prop' },
  ];
}
