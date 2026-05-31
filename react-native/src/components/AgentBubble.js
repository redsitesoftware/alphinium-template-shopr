import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { agentVoices } from '../theme';
import { useStore } from '../store/shopStore';

export default function AgentBubble() {
  const { state, dispatch } = useStore();
  const pulse = useRef(new Animated.Value(1)).current;
  const voice = agentVoices[state.agentVoice];

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.12, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, []);

  return (
    <TouchableOpacity
      style={[s.fab, { backgroundColor: voice.color }]}
      onPress={() => dispatch({ type: 'OPEN_AGENT' })}
      activeOpacity={0.9}
    >
      <Animated.View style={{ transform: [{ scale: pulse }] }}>
        <Text style={s.emoji}>{voice.emoji}</Text>
      </Animated.View>
      {state.cart.length > 0 && (
        <View style={s.cartBadge}><Text style={s.cartBadgeText}>{state.cart.reduce((a,i) => a+i.qty, 0)}</Text></View>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  fab: {
    position: 'absolute', bottom: 24, right: 20,
    width: 60, height: 60, borderRadius: 30,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 12, shadowOffset: { width: 0, height: 4 },
    elevation: 8, zIndex: 100,
  },
  emoji: { fontSize: 28 },
  cartBadge: {
    position: 'absolute', top: -4, right: -4,
    backgroundColor: '#EF4444', borderRadius: 10, width: 20, height: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  cartBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
});
