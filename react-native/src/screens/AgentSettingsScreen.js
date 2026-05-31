import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors, agentVoices } from '../theme';
import { useStore } from '../store/shopStore';

export default function AgentSettingsScreen() {
  const { state, dispatch } = useStore();

  return (
    <SafeAreaView style={s.root}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => dispatch({ type: 'BACK' })}>
          <Text style={s.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={s.title}>Your AI Agent</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.heading}>Choose Your Shopping Voice</Text>
        <Text style={s.sub}>Your AI sales agent will help you find the perfect products using the voice style you pick.</Text>

        {Object.entries(agentVoices).map(([id, voice]) => {
          const active = state.agentVoice === id;
          return (
            <TouchableOpacity
              key={id}
              style={[s.voiceCard, active && { borderColor: voice.color, backgroundColor: voice.color + '12' }]}
              onPress={() => dispatch({ type: 'SET_VOICE', voice: id })}
              activeOpacity={0.85}
            >
              <View style={[s.voiceAvatar, { backgroundColor: voice.color }]}>
                <Text style={{ fontSize: 40 }}>{voice.emoji}</Text>
              </View>
              <View style={s.voiceInfo}>
                <Text style={[s.voiceName, active && { color: voice.color }]}>{voice.name}</Text>
                <Text style={s.voiceDesc}>{voice.desc}</Text>
                <Text style={s.voicePersona}>{id === 'aria' ? 'Friendly & enthusiastic, great for gifting' : id === 'max' ? 'Direct & efficient, great for deal hunting' : 'Calm & minimal, great for curated picks'}</Text>
              </View>
              {active && (
                <View style={[s.checkmark, { backgroundColor: voice.color }]}>
                  <Text style={{ color: '#fff', fontWeight: '900', fontSize: 14 }}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* alphinium-ai addon callout */}
        <View style={s.addonCard}>
          <Text style={s.addonTitle}>⚡ Powered by alphinium-ai</Text>
          <Text style={s.addonText}>
            AI voice agents are a core alphinium addon. Add natural language product discovery, voice recommendations, and personalised shopping to any storefront with a single integration.
          </Text>
          <View style={s.addonFeatures}>
            {['Natural language search', 'Personalised recommendations', 'Voice persona customisation', 'Product Q&A', 'Upsell & cross-sell flows'].map(f => (
              <View key={f} style={s.addonFeatureRow}>
                <Text style={s.addonCheck}>✓</Text>
                <Text style={s.addonFeatureText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* alphinium-ads callout */}
        <View style={[s.addonCard, { borderColor: colors.sponsored + '40', backgroundColor: '#FAF5FF' }]}>
          <Text style={[s.addonTitle, { color: colors.sponsored }]}>📢 Powered by alphinium-ads</Text>
          <Text style={s.addonText}>
            Shopr monetises through alphinium-ads — banner units, sponsored listings, and native ad cards. Zero code needed, plug-and-play revenue.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  back: { fontSize: 14, color: colors.primary, fontWeight: '600' },
  title: { fontSize: 18, fontWeight: '800', color: colors.text },
  content: { padding: 20, gap: 14 },
  heading: { fontSize: 22, fontWeight: '900', color: colors.text },
  sub: { fontSize: 14, color: colors.textMuted, lineHeight: 20 },
  voiceCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    borderWidth: 2, borderColor: colors.border,
  },
  voiceAvatar: { width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center' },
  voiceInfo: { flex: 1 },
  voiceName: { fontSize: 18, fontWeight: '800', color: colors.text },
  voiceDesc: { fontSize: 13, color: colors.textMuted, marginVertical: 2 },
  voicePersona: { fontSize: 12, color: colors.textSecondary, fontStyle: 'italic' },
  checkmark: {
    width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center',
  },
  addonCard: {
    backgroundColor: '#EFF6FF', borderRadius: 14, padding: 16,
    borderWidth: 1.5, borderColor: colors.adBorder, gap: 8,
  },
  addonTitle: { fontSize: 15, fontWeight: '800', color: colors.primary },
  addonText: { fontSize: 13, color: colors.textSecondary, lineHeight: 20 },
  addonFeatures: { gap: 6 },
  addonFeatureRow: { flexDirection: 'row', gap: 8 },
  addonCheck: { color: colors.primary, fontWeight: '700' },
  addonFeatureText: { fontSize: 13, color: colors.textSecondary },
});
