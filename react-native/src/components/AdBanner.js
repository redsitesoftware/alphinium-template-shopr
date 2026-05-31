import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { colors } from '../theme';
import { AD_UNITS } from '../store/shopStore';

export default function AdBanner() {
  const [idx, setIdx] = useState(0);
  const opacity = new Animated.Value(1);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
        setIdx(i => (i + 1) % AD_UNITS.length);
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const ad = AD_UNITS[idx];

  return (
    <Animated.View style={[s.banner, { backgroundColor: ad.color, opacity }]}>
      <View style={s.left}>
        <Text style={s.sponsoredLabel}>📢 {ad.label}</Text>
        <Text style={s.adText}>{ad.text}</Text>
      </View>
      <TouchableOpacity style={s.cta}>
        <Text style={s.ctaText}>{ad.cta} →</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  banner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: 16, marginVertical: 6, padding: 12,
    borderRadius: 10, borderWidth: 1, borderColor: colors.adBorder,
  },
  left: { flex: 1, marginRight: 8 },
  sponsoredLabel: { fontSize: 9, color: colors.textMuted, letterSpacing: 1, marginBottom: 2 },
  adText: { fontSize: 13, color: colors.text, fontWeight: '500' },
  cta: {
    backgroundColor: colors.primary, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8,
  },
  ctaText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
