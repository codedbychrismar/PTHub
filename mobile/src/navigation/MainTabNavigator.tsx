import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import type { MainTabParamList } from './navigationTypes';
import HomeScreen from '@/screens/home/HomeScreen';
import PTHubScreen from '@/screens/pt-hub/PTHubScreen';
import FuelScreen from '@/screens/fuel/FuelScreen';
import CustomTabBar from '@/components/navigation/CustomTabBar';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="PTHub"
        component={PTHubScreen}
        options={{
          tabBarLabel: 'PT Hub',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Fuel"
        component={FuelScreen}
        options={{
          tabBarLabel: 'F.U.E.L',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
