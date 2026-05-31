export const colors = {
  primary: '#0EA5E9',       // Sky blue
  primaryDark: '#0284C7',
  accent: '#F97316',        // Orange - CTA / price
  accentLight: '#FED7AA',
  success: '#22C55E',
  bg: '#F8FAFC',
  bgCard: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  sponsored: '#7C3AED',     // Purple - sponsored listings
  adBg: '#EFF6FF',
  adBorder: '#BFDBFE',
  badge: '#EF4444',
};

export const agentVoices = {
  aria:  { name: 'Aria',  emoji: '👩‍💼', color: '#EC4899', desc: 'Warm & friendly' },
  max:   { name: 'Max',   emoji: '🧑‍💼', color: '#0EA5E9', desc: 'Confident & direct' },
  sage:  { name: 'Sage',  emoji: '🧑‍🎤', color: '#8B5CF6', desc: 'Calm & minimal' },
};

export const agentResponses = {
  greeting: {
    aria: "Hi there! 👋 I'm Aria, your personal shopping assistant. What are you looking for today?",
    max:  "Hey! I'm Max. Tell me what you need and I'll find the best options for you.",
    sage: "Hello. I'm Sage. What can I help you find?",
  },
  gift: {
    aria: "Oh how lovely, a gift! 🎁 I've picked out some of our most popular gifted items. Who's the lucky person?",
    max:  "Great, I love helping find gifts. I've pulled up our top-rated options. Any budget in mind?",
    sage: "Here are curated gift options based on what people love most.",
  },
  budget: {
    aria: "Perfect! I've filtered for you. These all look amazing and won't break the bank! 💸",
    max:  "Solid choice. Here's everything under $35 — great value picks.",
    sage: "Showing items within budget.",
  },
  tshirt: {
    aria: "Tees are our bestseller! I love this category 😍 We have so many great styles.",
    max:  "T-shirts — a classic. Here are the top picks by rating.",
    sage: "T-shirt collection loaded.",
  },
  mug: {
    aria: "Mugs make the best gifts! ☕ These would look amazing on anyone's desk.",
    max:  "Good call. Mugs sell well — high margins, easy to personalise.",
    sage: "Showing mug collection.",
  },
  default: {
    aria: "Let me find something perfect for you! I've surfaced our best picks based on what you said 🛍️",
    max:  "On it. Here are the most relevant products I found.",
    sage: "Here are the results.",
  },
};
