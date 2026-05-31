import { registerRootComponent } from 'expo';
import { ScrollView } from 'react-native';
if (ScrollView.defaultProps == null) ScrollView.defaultProps = {};
ScrollView.defaultProps.showsVerticalScrollIndicator = false;
ScrollView.defaultProps.showsHorizontalScrollIndicator = false;
import App from './App';
registerRootComponent(App);
