import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import './global.css';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}
