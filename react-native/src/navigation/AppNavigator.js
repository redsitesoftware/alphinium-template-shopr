import React from 'react';
import { useStore } from '../store/shopStore';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import AgentSettingsScreen from '../screens/AgentSettingsScreen';

export default function AppNavigator() {
  const { state } = useStore();
  switch (state.phase) {
    case 'product':       return <ProductScreen />;
    case 'cart':          return <CartScreen />;
    case 'agent-settings': return <AgentSettingsScreen />;
    default:              return <HomeScreen />;
  }
}
