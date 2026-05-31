import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { colors } from '../theme';
import { useStore } from '../store/shopStore';

export default function CartScreen() {
  const { state, dispatch } = useStore();
  const subtotal = state.cart.reduce((a, i) => a + i.price * i.qty, 0);
  const shipping = subtotal >= 50 ? 0 : 6.99;
  const total = subtotal + shipping;

  return (
    <SafeAreaView style={s.root}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => dispatch({ type: 'BACK' })}>
          <Text style={s.back}>← Keep Shopping</Text>
        </TouchableOpacity>
        <Text style={s.title}>Your Cart</Text>
        <View style={{ width: 100 }} />
      </View>

      {state.cart.length === 0 ? (
        <View style={s.empty}>
          <Text style={s.emptyEmoji}>🛒</Text>
          <Text style={s.emptyTitle}>Your cart is empty</Text>
          <Text style={s.emptySub}>Ask Aria to help you find something you'll love</Text>
          <TouchableOpacity style={s.shopBtn} onPress={() => dispatch({ type: 'BACK' })}>
            <Text style={s.shopBtnText}>Start Shopping →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            {state.cart.map(item => (
              <View key={item.id} style={s.cartItem}>
                <Text style={s.itemEmoji}>{item.emoji}</Text>
                <View style={s.itemInfo}>
                  <Text style={s.itemName}>{item.name}</Text>
                  <Text style={s.itemPrice}>${item.price.toFixed(2)} × {item.qty}</Text>
                </View>
                <View style={s.itemRight}>
                  <Text style={s.itemTotal}>${(item.price * item.qty).toFixed(2)}</Text>
                  <TouchableOpacity onPress={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}>
                    <Text style={s.removeBtn}>✕</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Order summary */}
            <View style={s.summary}>
              <Text style={s.summaryTitle}>Order Summary</Text>
              <View style={s.summaryRow}>
                <Text style={s.summaryLabel}>Subtotal</Text>
                <Text style={s.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={s.summaryRow}>
                <Text style={s.summaryLabel}>Shipping</Text>
                <Text style={[s.summaryValue, shipping === 0 && { color: colors.success }]}>
                  {shipping === 0 ? 'FREE 🎉' : `$${shipping.toFixed(2)}`}
                </Text>
              </View>
              {shipping > 0 && (
                <View style={s.freeShipBanner}>
                  <Text style={s.freeShipText}>Add ${(50 - subtotal).toFixed(2)} more for free shipping!</Text>
                </View>
              )}
              <View style={[s.summaryRow, s.totalRow]}>
                <Text style={s.totalLabel}>Total</Text>
                <Text style={s.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>

            {/* Trust signals */}
            <View style={s.trustRow}>
              {['🔒 Secure checkout', '↩️ 30-day returns', '🚚 Fast dispatch'].map(t => (
                <View key={t} style={s.trustChip}><Text style={s.trustText}>{t}</Text></View>
              ))}
            </View>

            {/* Printful + Stripe notice */}
            <View style={s.fulfillmentNote}>
              <Text style={s.fulfillmentText}>
                Orders fulfilled by <Text style={{ fontWeight: '700' }}>Printful</Text> · Payments via <Text style={{ fontWeight: '700' }}>alphinium-payments</Text> (Stripe)
              </Text>
            </View>
          </ScrollView>

          <View style={s.checkoutBar}>
            <TouchableOpacity style={s.checkoutBtn} activeOpacity={0.88}>
              <Text style={s.checkoutText}>Proceed to Checkout · ${total.toFixed(2)}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  back: { fontSize: 14, color: colors.primary, fontWeight: '600', width: 120 },
  title: { fontSize: 18, fontWeight: '800', color: colors.text },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 },
  emptyEmoji: { fontSize: 64 },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: colors.text },
  emptySub: { fontSize: 14, color: colors.textMuted, textAlign: 'center' },
  shopBtn: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14, marginTop: 8 },
  shopBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  cartItem: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: colors.border,
  },
  itemEmoji: { fontSize: 36 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '700', color: colors.text },
  itemPrice: { fontSize: 13, color: colors.textMuted, marginTop: 4 },
  itemRight: { alignItems: 'flex-end', gap: 8 },
  itemTotal: { fontSize: 16, fontWeight: '800', color: colors.text },
  removeBtn: { fontSize: 18, color: colors.textMuted, padding: 4 },
  summary: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginTop: 8, borderWidth: 1, borderColor: colors.border },
  summaryTitle: { fontSize: 16, fontWeight: '800', color: colors.text, marginBottom: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: colors.textSecondary },
  summaryValue: { fontSize: 14, fontWeight: '600', color: colors.text },
  freeShipBanner: { backgroundColor: colors.accentLight, borderRadius: 8, padding: 10, marginVertical: 6 },
  freeShipText: { fontSize: 13, color: colors.accent, fontWeight: '600', textAlign: 'center' },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, marginTop: 4 },
  totalLabel: { fontSize: 17, fontWeight: '800', color: colors.text },
  totalValue: { fontSize: 20, fontWeight: '900', color: colors.primary },
  trustRow: { flexDirection: 'row', gap: 8, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center' },
  trustChip: { backgroundColor: '#F0FDF4', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#BBF7D0' },
  trustText: { fontSize: 11, color: '#166534', fontWeight: '600' },
  fulfillmentNote: { marginTop: 12, padding: 12, backgroundColor: colors.adBg, borderRadius: 10 },
  fulfillmentText: { fontSize: 12, color: colors.textMuted, textAlign: 'center', lineHeight: 18 },
  checkoutBar: {
    padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: colors.border,
  },
  checkoutBtn: {
    backgroundColor: colors.accent, borderRadius: 14, height: 54, alignItems: 'center', justifyContent: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 17, fontWeight: '800' },
});
