# Shopr — Going Live Checklist

## Overview
AI-powered print-on-demand storefront. Zero inventory risk. Revenue from day 1 via alphinium-ads + product margins.

## Step 1: Printful Integration (~2 hours)
1. Create account at [printful.com](https://printful.com)
2. Generate API key → Dashboard → Store → API
3. Replace `PRODUCTS` in `src/store/shopStore.js` with live Printful catalog fetch:
   ```js
   // GET https://api.printful.com/products
   // Auth: Bearer <token>
   ```
4. Product images: use Printful's mockup generator API for real product photos
5. Set your retail markup (Printful charges wholesale, you set retail price)

## Step 2: alphinium-payments / Stripe Checkout (~1 hour)
1. Add Stripe publishable key to `.env`: `EXPO_PUBLIC_STRIPE_KEY=pk_live_...`
2. Wire "Proceed to Checkout" button to alphinium-payments checkout flow
3. Printful webhook: `POST /printful-webhook` on order completion → auto-fulfillment

## Step 3: alphinium-ads Revenue
1. Sign up for alphinium-ads network account
2. Replace demo ad units in `AdBanner.js` with live alphinium-ads SDK:
   ```js
   import { AdBanner } from 'alphinium-ads';
   ```
3. Set ad placements: home feed, product detail page, cart page

## Step 4: alphinium-ai Real Voices
1. Connect real LLM to agent conversation (OpenAI GPT / Claude)
2. Add text-to-speech for actual voice output (ElevenLabs / Expo Speech)
3. Agent memory: store user preferences for personalised recommendations

## Step 5: Deploy
1. `expo export --platform web` → static build
2. Deploy to Netlify / Vercel / alphinium-host
3. Set custom domain: `shop.yourbrand.com`
4. Update Printful store URL to match

## Revenue Projections
| Stream | Estimate |
|---|---|
| Product margin (30% avg) | $9/order |
| alphinium-ads CPM | ~$3-8 per 1k views |
| Sponsored listings | Custom rates |

## Ongoing
- Add new Printful product categories seasonally
- A/B test agent voice personas for conversion
- Retargeting via alphinium-ads pixel
