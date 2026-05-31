import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { colors, agentVoices } from '../theme';
import { useStore } from '../store/shopStore';
import AdBanner from '../components/AdBanner';

export default function ProductScreen() {
  const { state, dispatch } = useStore();
  const p = state.currentProduct;
  const [added, setAdded] = useState(false);
  const bounce = useRef(new Animated.Value(1)).current;
  const voice = agentVoices[state.agentVoice];

  if (!p) return null;

  const savings = p.compareAt ? (p.compareAt - p.price).toFixed(2) : null;
  const savingsPct = p.compareAt ? Math.round(100 - (p.price / p.compareAt) * 100) : null;

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', product: p });
    setAdded(true);
    Animated.sequence([
      Animated.timing(bounce, { toValue: 1.15, duration: 120, useNativeDriver: true }),
      Animated.timing(bounce, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();
  };

  const fakeReviews = [
    { name: 'Sarah M.', rating: 5, text: 'Absolutely love it! Great quality, fast shipping.' },
    { name: 'James K.', rating: 5, text: 'Bought this as a gift — they were thrilled. Will order again.' },
    { name: 'Priya T.', rating: 4, text: 'Good quality, slightly smaller than expected but very happy.' },
  ];

  return (
    <SafeAreaView style={s.root}>
      {/* Back */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => dispatch({ type: 'BACK' })}>
          <Text style={s.backText}>← Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.cartBtn} onPress={() => dispatch({ type: 'GO_CART' })}>
          <Text style={s.cartEmoji}>🛒</Text>
          {state.cart.length > 0 && (
            <View style={s.cartBadge}><Text style={s.cartBadgeText}>{state.cart.reduce((a,i)=>a+i.qty,0)}</Text></View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Hero */}
        <View style={s.hero}>
          {p.sponsored && <View style={s.sponsoredTag}><Text style={s.sponsoredTagText}>SPONSORED</Text></View>}
          <Text style={s.heroEmoji}>{p.emoji}</Text>
          {p.badge && <View style={s.heroBadge}><Text style={s.heroBadgeText}>{p.badge}</Text></View>}
        </View>

        {/* Info */}
        <View style={s.info}>
          <Text style={s.productName}>{p.name}</Text>
          <View style={s.ratingRow}>
            <Text style={s.stars}>★★★★{p.rating >= 5 ? '★' : '☆'}</Text>
            <Text style={s.ratingNum}>{p.rating}</Text>
            <Text style={s.reviews}>· {p.reviews.toLocaleString()} reviews</Text>
          </View>

          {/* Price block */}
          <View style={s.priceBlock}>
            <Text style={s.mainPrice}>${p.price.toFixed(2)}</Text>
            {p.compareAt && (
              <View style={s.priceDetails}>
                <Text style={s.compareAt}>Was ${p.compareAt.toFixed(2)}</Text>
                <View style={s.savingChip}>
                  <Text style={s.savingText}>Save ${savings} ({savingsPct}% off)</Text>
                </View>
              </View>
            )}
          </View>

          {/* Shipping */}
          <View style={s.shippingRow}>
            <Text style={s.shippingIcon}>🚚</Text>
            <Text style={s.shippingText}>Free shipping · Ships within 3–5 business days · Fulfilled by Printful</Text>
          </View>

          {/* AI Agent callout */}
          <TouchableOpacity style={[s.agentCallout, { borderColor: voice.color }]}
            onPress={() => dispatch({ type: 'OPEN_AGENT' })}>
            <Text style={s.agentCalloutEmoji}>{voice.emoji}</Text>
            <Text style={[s.agentCalloutText, { color: voice.color }]}>
              Ask {voice.name} about this product
            </Text>
            <Text style={[s.agentCalloutArrow, { color: voice.color }]}>→</Text>
          </TouchableOpacity>

          {/* Description */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>About this item</Text>
            <Text style={s.desc}>{p.desc}</Text>
          </View>

          {/* Features */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Why you'll love it</Text>
            {['Print-on-demand — made fresh for you', 'Eco-friendly production', '30-day returns, no questions asked', 'Ships worldwide via Printful'].map(f => (
              <View key={f} style={s.featureRow}>
                <Text style={s.featureCheck}>✓</Text>
                <Text style={s.featureText}>{f}</Text>
              </View>
            ))}
          </View>

          {/* Ad unit */}
          <AdBanner />

          {/* Reviews */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Customer Reviews</Text>
            {fakeReviews.map((r, i) => (
              <View key={i} style={s.review}>
                <View style={s.reviewHeader}>
                  <View style={s.reviewAvatar}><Text style={{ color: '#fff', fontWeight: '700' }}>{r.name[0]}</Text></View>
                  <Text style={s.reviewName}>{r.name}</Text>
                  <Text style={s.reviewStars}>{'★'.repeat(r.rating)}</Text>
                </View>
                <Text style={s.reviewText}>{r.text}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={s.stickyBar}>
        <TouchableOpacity style={s.wishlist}>
          <Text style={s.wishlistText}>♡</Text>
        </TouchableOpacity>
        <Animated.View style={{ flex: 1, transform: [{ scale: bounce }] }}>
          <TouchableOpacity
            style={[s.addBtn, added && s.addedBtn]}
            onPress={addToCart}
            activeOpacity={0.85}
          >
            <Text style={s.addBtnText}>{added ? '✓ Added to Cart' : '🛒 Add to Cart'}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backBtn: { padding: 4 },
  backText: { fontSize: 15, color: colors.primary, fontWeight: '600' },
  cartBtn: { position: 'relative', padding: 4 },
  cartEmoji: { fontSize: 26 },
  cartBadge: { position: 'absolute', top: 0, right: 0, backgroundColor: colors.badge, borderRadius: 8, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  cartBadgeText: { color: '#fff', fontSize: 9, fontWeight: '800' },
  hero: { backgroundColor: '#fff', padding: 24, alignItems: 'center', position: 'relative' },
  heroEmoji: { fontSize: 100 },
  sponsoredTag: { position: 'absolute', top: 12, right: 12, backgroundColor: colors.sponsored, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 },
  sponsoredTagText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  heroBadge: { marginTop: 8, backgroundColor: '#FEE2E2', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  heroBadgeText: { fontSize: 12, fontWeight: '700', color: colors.text },
  info: { padding: 16 },
  productName: { fontSize: 22, fontWeight: '800', color: colors.text, marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  stars: { fontSize: 14, color: '#F59E0B' },
  ratingNum: { fontSize: 14, fontWeight: '700', color: colors.text },
  reviews: { fontSize: 13, color: colors.textMuted },
  priceBlock: { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 14, marginBottom: 12 },
  mainPrice: { fontSize: 32, fontWeight: '900', color: colors.text },
  priceDetails: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 6, flexWrap: 'wrap' },
  compareAt: { fontSize: 14, color: colors.textMuted, textDecorationLine: 'line-through' },
  savingChip: { backgroundColor: '#DCFCE7', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  savingText: { fontSize: 13, color: '#16A34A', fontWeight: '700' },
  shippingRow: { flexDirection: 'row', gap: 8, alignItems: 'flex-start', marginBottom: 12 },
  shippingIcon: { fontSize: 16 },
  shippingText: { flex: 1, fontSize: 13, color: colors.textSecondary, lineHeight: 18 },
  agentCallout: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    borderWidth: 2, borderRadius: 12, padding: 12, marginBottom: 16,
  },
  agentCalloutEmoji: { fontSize: 24 },
  agentCalloutText: { flex: 1, fontSize: 14, fontWeight: '600' },
  agentCalloutArrow: { fontSize: 18, fontWeight: '700' },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 10 },
  desc: { fontSize: 14, color: colors.textSecondary, lineHeight: 22 },
  featureRow: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  featureCheck: { color: colors.success, fontWeight: '700', fontSize: 16 },
  featureText: { fontSize: 13, color: colors.textSecondary, flex: 1 },
  review: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: colors.border },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  reviewAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  reviewName: { fontWeight: '700', fontSize: 13, color: colors.text, flex: 1 },
  reviewStars: { color: '#F59E0B', fontSize: 12 },
  reviewText: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  stickyBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', flexDirection: 'row', padding: 16, gap: 12,
    borderTopWidth: 1, borderTopColor: colors.border,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, shadowOffset: { width: 0, height: -4 },
  },
  wishlist: {
    width: 50, height: 50, borderRadius: 25,
    borderWidth: 2, borderColor: colors.border, alignItems: 'center', justifyContent: 'center',
  },
  wishlistText: { fontSize: 24, color: colors.textMuted },
  addBtn: {
    flex: 1, backgroundColor: colors.primary, borderRadius: 14,
    height: 50, alignItems: 'center', justifyContent: 'center',
  },
  addedBtn: { backgroundColor: colors.success },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
