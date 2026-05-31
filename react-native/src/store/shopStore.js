import React, { createContext, useContext, useReducer, useRef } from 'react';

// ─── Product catalog (Printful-style print-on-demand) ──────────────────────
export const PRODUCTS = [
  // Apparel
  { id: 'p1', name: 'Classic Crew Tee', category: 'apparel', emoji: '👕', price: 29.99, compareAt: 42.00, rating: 4.8, reviews: 1240, badge: 'Bestseller', sponsored: false, desc: 'Soft 100% cotton crew neck. Printed to order. Available in 18 colours.', tags: ['gift','tshirt','apparel'] },
  { id: 'p2', name: 'Premium Hoodie', category: 'apparel', emoji: '🧥', price: 54.99, compareAt: 79.00, rating: 4.9, reviews: 876, badge: 'Top Rated', sponsored: true, desc: 'Heavyweight 80% cotton blend. Kangaroo pocket, ribbed cuffs. Unisex fit.', tags: ['gift','hoodie','apparel','warm'] },
  { id: 'p3', name: 'Fitted Cap', category: 'apparel', emoji: '🧢', price: 24.99, compareAt: null, rating: 4.6, reviews: 432, badge: null, sponsored: false, desc: 'Structured 6-panel cap. Embroidered logo, adjustable strap.', tags: ['gift','hat','apparel','cap'] },
  { id: 'p4', name: 'Slim Fit Polo', category: 'apparel', emoji: '👔', price: 34.99, compareAt: 48.00, rating: 4.5, reviews: 218, badge: null, sponsored: false, desc: 'Pique cotton polo. 3-button placket, side vents. Smart-casual versatile.', tags: ['gift','polo','apparel'] },

  // Accessories
  { id: 'p5', name: 'Canvas Tote Bag', category: 'accessories', emoji: '👜', price: 18.99, compareAt: 28.00, rating: 4.7, reviews: 2108, badge: 'Bestseller', sponsored: false, desc: 'Natural cotton canvas. 38cm × 42cm. Reinforced handles. Print-on-demand.', tags: ['gift','bag','eco','tote'] },
  { id: 'p6', name: 'Phone Case', category: 'accessories', emoji: '📱', price: 19.99, compareAt: null, rating: 4.6, reviews: 985, badge: null, sponsored: true, desc: 'Slim hardshell case. Available for all major iPhone & Samsung models. Matte finish.', tags: ['gift','phone','tech','case'] },
  { id: 'p7', name: 'Drawstring Backpack', category: 'accessories', emoji: '🎒', price: 22.99, compareAt: 32.00, rating: 4.4, reviews: 367, badge: null, sponsored: false, desc: 'Lightweight polyester. 10L capacity. Great for gym or day trips.', tags: ['gift','bag','backpack','sport'] },
  { id: 'p8', name: 'AirPods Case', category: 'accessories', emoji: '🎧', price: 14.99, compareAt: null, rating: 4.5, reviews: 521, badge: null, sponsored: false, desc: 'Hardshell case for AirPods Pro & Gen 3. Custom printed. Carabiner included.', tags: ['gift','tech','audio','airpods'] },

  // Home & Living
  { id: 'p9',  name: 'Ceramic Mug', category: 'home', emoji: '☕', price: 16.99, compareAt: 24.00, rating: 4.9, reviews: 3421, badge: 'Most Gifted', sponsored: false, desc: '325ml ceramic mug. Dishwasher safe. Full wrap print. Great gift.', tags: ['gift','mug','coffee','home','kitchen'] },
  { id: 'p10', name: 'Framed Poster', category: 'home', emoji: '🖼️', price: 39.99, compareAt: 55.00, rating: 4.7, reviews: 654, badge: null, sponsored: true, desc: 'A3/A4/A2 sizes. Matt finish. Solid wood frame. Ready to hang.', tags: ['gift','art','print','decor','home'] },
  { id: 'p11', name: 'Throw Pillow Cover', category: 'home', emoji: '🛋️', price: 27.99, compareAt: null, rating: 4.6, reviews: 441, badge: null, sponsored: false, desc: '45cm × 45cm cushion cover. Spun polyester. Invisible zip closure.', tags: ['gift','cushion','home','decor'] },
  { id: 'p12', name: 'Enamel Pin Set', category: 'home', emoji: '📌', price: 12.99, compareAt: 19.00, rating: 4.8, reviews: 872, badge: 'New', sponsored: false, desc: 'Set of 3 hard enamel pins. Butterfly clasp backing. Collector quality.', tags: ['gift','pin','accessories','novelty'] },

  // Sport & Outdoor
  { id: 'p13', name: 'Performance Water Bottle', category: 'sport', emoji: '🍶', price: 29.99, compareAt: 40.00, rating: 4.8, reviews: 1876, badge: 'Top Rated', sponsored: false, desc: '750ml stainless steel. Double-wall insulated. Keeps drinks cold 24hrs.', tags: ['gift','sport','outdoor','bottle','fitness'] },
  { id: 'p14', name: 'Gym Duffle Bag', category: 'sport', emoji: '🏋️', price: 44.99, compareAt: 65.00, rating: 4.6, reviews: 543, badge: null, sponsored: true, desc: '30L capacity. Wet/dry pocket separation. Woven custom label.', tags: ['gift','sport','gym','bag','fitness'] },
  { id: 'p15', name: 'Yoga Mat', category: 'sport', emoji: '🧘', price: 34.99, compareAt: null, rating: 4.5, reviews: 291, badge: null, sponsored: false, desc: '6mm thickness, non-slip TPE material. 183cm × 61cm. Includes carry strap.', tags: ['gift','sport','yoga','fitness','wellness'] },
  { id: 'p16', name: 'Running Cap', category: 'sport', emoji: '🏃', price: 19.99, compareAt: 28.00, rating: 4.4, reviews: 187, badge: null, sponsored: false, desc: 'Moisture-wicking technical fabric. Reflective logo detail. Adjustable back.', tags: ['gift','sport','running','hat','fitness'] },
];

export const CATEGORIES = [
  { id: 'all',         label: 'All',        emoji: '🛍️' },
  { id: 'apparel',     label: 'Apparel',    emoji: '👕' },
  { id: 'accessories', label: 'Accessories',emoji: '👜' },
  { id: 'home',        label: 'Home',       emoji: '🏠' },
  { id: 'sport',       label: 'Sport',      emoji: '🏋️' },
];

export const AD_UNITS = [
  { id: 'a1', label: 'Sponsored', text: 'alphinium-ads: Free Shipping on Orders $50+', cta: 'Shop Now', color: '#EFF6FF' },
  { id: 'a2', label: 'Sponsored', text: 'alphinium-ads: New Arrivals Just Dropped 🔥', cta: 'See Deals', color: '#FFF7ED' },
  { id: 'a3', label: 'Promoted',  text: 'alphinium-ads: Top Brands, Best Prices 🏷️',  cta: 'Explore',  color: '#F0FDF4' },
];

// ─── Store ──────────────────────────────────────────────────────────────────
const initialState = {
  agentVoice: 'aria',
  agentOpen: false,
  agentMessages: [],
  category: 'all',
  searchQuery: '',
  filteredProducts: PRODUCTS,
  cart: [],
  currentProduct: null,
  phase: 'home',   // home | product | cart | agent-settings
};

function getAgentKey(msg) {
  const m = msg.toLowerCase();
  if (m.includes('gift')) return 'gift';
  if (m.includes('under') || m.includes('cheap') || m.includes('budget') || m.includes('$')) return 'budget';
  if (m.includes('tee') || m.includes('shirt') || m.includes('t-shirt')) return 'tshirt';
  if (m.includes('mug') || m.includes('coffee') || m.includes('cup')) return 'mug';
  return 'default';
}

function filterByKey(key, query) {
  if (!query) return PRODUCTS;
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.tags.some(t => q.includes(t)) ||
    p.name.toLowerCase().includes(q) ||
    p.category.includes(q) ||
    (q.includes('under') && parseFloat(q.match(/\d+/)?.[0]) >= p.price)
  );
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_VOICE':
      return { ...state, agentVoice: action.voice };
    case 'OPEN_AGENT':
      return { ...state, agentOpen: true };
    case 'CLOSE_AGENT':
      return { ...state, agentOpen: false };
    case 'SEND_MESSAGE': {
      const { text, responses } = action;
      const key = getAgentKey(text);
      const reply = responses[key][state.agentVoice];
      const filtered = filterByKey(key, text);
      const msgs = [
        ...state.agentMessages,
        { id: Date.now() + 'u', role: 'user', text },
        { id: Date.now() + 'a', role: 'agent', text: reply, voice: state.agentVoice, products: filtered.slice(0, 4) },
      ];
      return { ...state, agentMessages: msgs, filteredProducts: filtered };
    }
    case 'SET_CATEGORY': {
      const filtered = action.cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === action.cat);
      return { ...state, category: action.cat, filteredProducts: filtered };
    }
    case 'VIEW_PRODUCT':
      return { ...state, currentProduct: action.product, phase: 'product' };
    case 'BACK':
      return { ...state, phase: 'home', currentProduct: null };
    case 'GO_CART':
      return { ...state, phase: 'cart' };
    case 'GO_AGENT_SETTINGS':
      return { ...state, phase: 'agent-settings' };
    case 'ADD_TO_CART': {
      const exists = state.cart.find(i => i.id === action.product.id);
      const cart = exists
        ? state.cart.map(i => i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state.cart, { ...action.product, qty: 1 }];
      return { ...state, cart, phase: 'home' };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.id !== action.id) };
    default:
      return state;
  }
}

const StoreCtx = createContext(null);
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <StoreCtx.Provider value={{ state, dispatch }}>{children}</StoreCtx.Provider>;
}
export const useStore = () => useContext(StoreCtx);
