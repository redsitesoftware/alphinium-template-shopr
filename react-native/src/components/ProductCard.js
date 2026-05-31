import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function ProductCard({ product, onPress }) {
  const savings = product.compareAt
    ? Math.round(100 - (product.price / product.compareAt) * 100)
    : null;

  return (
    <TouchableOpacity style={s.card} onPress={() => onPress(product)} activeOpacity={0.85}>
      {product.sponsored && (
        <View style={s.sponsoredBadge}><Text style={s.sponsoredText}>SPONSORED</Text></View>
      )}
      {product.badge && !product.sponsored && (
        <View style={[s.badge, product.badge === 'New' ? s.badgeNew : s.badgeHot]}>
          <Text style={s.badgeText}>{product.badge}</Text>
        </View>
      )}
      <View style={s.emoji}><Text style={{ fontSize: 44 }}>{product.emoji}</Text></View>
      <Text style={s.name} numberOfLines={2}>{product.name}</Text>
      <View style={s.ratingRow}>
        <Text style={s.stars}>★ {product.rating}</Text>
        <Text style={s.reviews}>({product.reviews.toLocaleString()})</Text>
      </View>
      <View style={s.priceRow}>
        <Text style={s.price}>${product.price.toFixed(2)}</Text>
        {product.compareAt && (
          <Text style={s.compareAt}>${product.compareAt.toFixed(2)}</Text>
        )}
        {savings && <View style={s.savingsBadge}><Text style={s.savingsText}>-{savings}%</Text></View>}
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: '#fff', borderRadius: 14, padding: 12, margin: 6,
    width: 160, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  emoji: { alignItems: 'center', marginVertical: 8 },
  name: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  stars: { fontSize: 12, color: '#F59E0B', fontWeight: '700' },
  reviews: { fontSize: 11, color: colors.textMuted },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  price: { fontSize: 15, fontWeight: '800', color: colors.text },
  compareAt: { fontSize: 12, color: colors.textMuted, textDecorationLine: 'line-through' },
  savingsBadge: { backgroundColor: '#DCFCE7', borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2 },
  savingsText: { fontSize: 10, color: '#16A34A', fontWeight: '700' },
  sponsoredBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: colors.sponsored, borderRadius: 4, paddingHorizontal: 5, paddingVertical: 2 },
  sponsoredText: { fontSize: 8, color: '#fff', fontWeight: '700', letterSpacing: 0.5 },
  badge: { position: 'absolute', top: 8, left: 8, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  badgeHot: { backgroundColor: '#FEE2E2' },
  badgeNew: { backgroundColor: '#DBEAFE' },
  badgeText: { fontSize: 9, fontWeight: '700', color: colors.text },
});
