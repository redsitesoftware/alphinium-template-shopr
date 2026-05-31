import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, TextInput, Modal, FlatList, KeyboardAvoidingView, Platform
} from 'react-native';
import { colors, agentVoices, agentResponses } from '../theme';
import { useStore, CATEGORIES } from '../store/shopStore';
import ProductCard from '../components/ProductCard';
import AdBanner from '../components/AdBanner';
import AgentBubble from '../components/AgentBubble';

function AgentModal() {
  const { state, dispatch } = useStore();
  const [input, setInput] = useState('');
  const voice = agentVoices[state.agentVoice];
  const scrollRef = React.useRef();

  // Auto-greeting on first open
  React.useEffect(() => {
    if (state.agentOpen && state.agentMessages.length === 0) {
      setTimeout(() => {
        dispatch({
          type: 'SEND_MESSAGE',
          text: '',
          responses: { default: agentResponses.greeting, gift: agentResponses.greeting, budget: agentResponses.greeting, tshirt: agentResponses.greeting, mug: agentResponses.greeting },
        });
      }, 500);
    }
  }, [state.agentOpen]);

  const send = () => {
    if (!input.trim()) return;
    dispatch({ type: 'SEND_MESSAGE', text: input.trim(), responses: agentResponses });
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 200);
  };

  const suggestions = ['Looking for a gift 🎁', 'Under $30 💸', 'Best sellers ⭐', 'Mugs ☕', 'Sport gear 🏋️'];

  return (
    <Modal visible={state.agentOpen} animationType="slide" transparent>
      <KeyboardAvoidingView style={s.modalOverlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={s.agentModal}>
          {/* Header */}
          <View style={[s.agentHeader, { backgroundColor: voice.color }]}>
            <View style={s.agentHeaderLeft}>
              <Text style={s.agentEmoji}>{voice.emoji}</Text>
              <View>
                <Text style={s.agentName}>{voice.name}</Text>
                <Text style={s.agentDesc}>{voice.desc} · Shopping Assistant</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => dispatch({ type: 'CLOSE_AGENT' })}>
              <Text style={s.closeBtn}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView ref={scrollRef} style={s.msgList} contentContainerStyle={{ padding: 16 }}>
            {state.agentMessages.map(msg => (
              <View key={msg.id}>
                <View style={[s.msgBubble, msg.role === 'user' ? s.userBubble : [s.agentBubbleMsg, { borderColor: voice.color + '40' }]]}>
                  {msg.role === 'agent' && <Text style={[s.agentLabel, { color: voice.color }]}>{voice.emoji} {voice.name}</Text>}
                  <Text style={[s.msgText, msg.role === 'user' && { color: '#fff' }]}>{msg.text || agentResponses.greeting[state.agentVoice]}</Text>
                </View>
                {/* Inline product cards from agent */}
                {msg.role === 'agent' && msg.products && msg.products.length > 0 && (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                    {msg.products.map(p => (
                      <TouchableOpacity key={p.id} style={s.miniCard}
                        onPress={() => { dispatch({ type: 'CLOSE_AGENT' }); dispatch({ type: 'VIEW_PRODUCT', product: p }); }}>
                        <Text style={{ fontSize: 28 }}>{p.emoji}</Text>
                        <Text style={s.miniName} numberOfLines={2}>{p.name}</Text>
                        <Text style={s.miniPrice}>${p.price.toFixed(2)}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
              </View>
            ))}
          </ScrollView>

          {/* Suggestions */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.suggestions}>
            {suggestions.map(s2 => (
              <TouchableOpacity key={s2} style={s.suggChip}
                onPress={() => { dispatch({ type: 'SEND_MESSAGE', text: s2, responses: agentResponses }); }}>
                <Text style={s.suggText}>{s2}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Input */}
          <View style={s.inputRow}>
            <TextInput
              style={s.input} placeholder={`Ask ${voice.name}...`} value={input}
              onChangeText={setInput} onSubmitEditing={send}
            />
            <TouchableOpacity style={[s.sendBtn, { backgroundColor: voice.color }]} onPress={send}>
              <Text style={s.sendText}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default function HomeScreen() {
  const { state, dispatch } = useStore();

  return (
    <SafeAreaView style={s.root}>
      {/* Top bar */}
      <View style={s.topBar}>
        <View>
          <Text style={s.logo}>Shopr</Text>
          <Text style={s.tagline}>AI-Powered Shopping</Text>
        </View>
        <TouchableOpacity style={s.cartBtn} onPress={() => dispatch({ type: 'GO_CART' })}>
          <Text style={s.cartEmoji}>🛒</Text>
          {state.cart.length > 0 && (
            <View style={s.cartCount}><Text style={s.cartCountText}>{state.cart.reduce((a,i)=>a+i.qty,0)}</Text></View>
          )}
        </TouchableOpacity>
      </View>

      {/* Agent CTA banner */}
      <TouchableOpacity style={s.agentCTA} onPress={() => dispatch({ type: 'OPEN_AGENT' })} activeOpacity={0.9}>
        <Text style={s.agentCTAEmoji}>{agentVoices[state.agentVoice].emoji}</Text>
        <View style={s.agentCTAText}>
          <Text style={s.agentCTATitle}>Ask {agentVoices[state.agentVoice].name} to help you shop</Text>
          <Text style={s.agentCTASub}>Tell your AI agent what you're looking for</Text>
        </View>
        <Text style={s.agentCTAArrow}>→</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Ad unit */}
        <AdBanner />

        {/* Category pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.catScroll} contentContainerStyle={{ paddingHorizontal: 12 }}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[s.catPill, state.category === cat.id && s.catPillActive]}
              onPress={() => dispatch({ type: 'SET_CATEGORY', cat: cat.id })}
            >
              <Text style={s.catEmoji}>{cat.emoji}</Text>
              <Text style={[s.catLabel, state.category === cat.id && s.catLabelActive]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Section header */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>
            {state.category === 'all' ? '🔥 Featured Products' : `${CATEGORIES.find(c=>c.id===state.category)?.emoji} ${CATEGORIES.find(c=>c.id===state.category)?.label}`}
          </Text>
          <Text style={s.sectionCount}>{state.filteredProducts.length} items</Text>
        </View>

        {/* Product grid */}
        <View style={s.grid}>
          {state.filteredProducts.map((product, idx) => (
            <React.Fragment key={product.id}>
              <ProductCard product={product} onPress={p => dispatch({ type: 'VIEW_PRODUCT', product: p })} />
              {/* Inject ad after every 6th product */}
              {(idx + 1) % 6 === 0 && <View style={{ width: '100%' }}><AdBanner /></View>}
            </React.Fragment>
          ))}
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <Text style={s.footerText}>Powered by alphinium-ads · alphinium-ai · alphinium-payments</Text>
          <TouchableOpacity onPress={() => dispatch({ type: 'GO_AGENT_SETTINGS' })}>
            <Text style={s.changeAgent}>Change AI Agent Voice →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AgentBubble />
      <AgentModal />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#fff',
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  logo: { fontSize: 24, fontWeight: '900', color: colors.primary, letterSpacing: -0.5 },
  tagline: { fontSize: 11, color: colors.textMuted },
  cartBtn: { position: 'relative', padding: 4 },
  cartEmoji: { fontSize: 28 },
  cartCount: {
    position: 'absolute', top: 0, right: 0,
    backgroundColor: colors.badge, borderRadius: 9, width: 18, height: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  cartCountText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  agentCTA: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.primary, marginHorizontal: 16, marginTop: 12, marginBottom: 4,
    padding: 14, borderRadius: 14,
  },
  agentCTAEmoji: { fontSize: 32 },
  agentCTAText: { flex: 1 },
  agentCTATitle: { color: '#fff', fontWeight: '700', fontSize: 14 },
  agentCTASub: { color: 'rgba(255,255,255,0.75)', fontSize: 12 },
  agentCTAArrow: { color: '#fff', fontSize: 20, fontWeight: '700' },
  catScroll: { marginVertical: 8 },
  catPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    backgroundColor: '#fff', borderWidth: 1.5, borderColor: colors.border,
    marginRight: 8,
  },
  catPillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  catEmoji: { fontSize: 14 },
  catLabel: { fontSize: 13, color: colors.text, fontWeight: '600' },
  catLabelActive: { color: '#fff' },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, marginTop: 4, marginBottom: 4,
  },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: colors.text },
  sectionCount: { fontSize: 12, color: colors.textMuted },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10, paddingBottom: 100,
    justifyContent: 'center',
  },
  footer: { padding: 20, alignItems: 'center', gap: 8 },
  footerText: { fontSize: 11, color: colors.textMuted, textAlign: 'center' },
  changeAgent: { fontSize: 13, color: colors.primary, fontWeight: '600' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  agentModal: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, height: '85%' },
  agentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  agentHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  agentEmoji: { fontSize: 36 },
  agentName: { color: '#fff', fontWeight: '800', fontSize: 18 },
  agentDesc: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  closeBtn: { color: '#fff', fontSize: 22, fontWeight: '700', padding: 4 },
  msgList: { flex: 1 },
  msgBubble: { borderRadius: 14, padding: 12, marginBottom: 8, maxWidth: '88%' },
  userBubble: { backgroundColor: colors.primary, alignSelf: 'flex-end' },
  agentBubbleMsg: { backgroundColor: '#F8FAFC', alignSelf: 'flex-start', borderLeftWidth: 3 },
  agentLabel: { fontSize: 11, fontWeight: '700', marginBottom: 4 },
  msgText: { fontSize: 14, color: colors.text, lineHeight: 20 },
  miniCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 10, width: 110, marginRight: 8, marginBottom: 8,
    borderWidth: 1, borderColor: colors.border, alignItems: 'center',
  },
  miniName: { fontSize: 11, color: colors.text, textAlign: 'center', marginVertical: 4 },
  miniPrice: { fontSize: 13, fontWeight: '800', color: colors.accent },
  suggestions: { borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 10, paddingHorizontal: 12 },
  suggChip: { backgroundColor: colors.bg, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 7, marginRight: 8, borderWidth: 1, borderColor: colors.border },
  suggText: { fontSize: 12, color: colors.text },
  inputRow: { flexDirection: 'row', padding: 12, gap: 8, borderTopWidth: 1, borderTopColor: colors.border },
  input: { flex: 1, backgroundColor: colors.bg, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, borderWidth: 1, borderColor: colors.border },
  sendBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  sendText: { color: '#fff', fontSize: 20, fontWeight: '700' },
});
