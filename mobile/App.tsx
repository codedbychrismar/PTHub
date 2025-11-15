import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'nativewind';
import RootNavigator from './src/navigation/RootNavigator';
import { useThemeStore } from './src/store/themeStore';
import './global.css';

export default function App() {
  const { theme, loadTheme } = useThemeStore();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    setColorScheme(theme);
  }, [theme]);

  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}
