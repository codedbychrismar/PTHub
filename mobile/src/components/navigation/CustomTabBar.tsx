import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();

  return (
    <View
      className="flex-row items-end px-2 pt-3 border-t-[0.5px] border-tabbar-border dark:border-tabbar-border-dark bg-tabbar-bg dark:bg-tabbar-bg-dark"
      style={{
        paddingBottom: Math.max(insets.bottom, 8),
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Icon and text colors based on focus state (using Tailwind semantic colors)
        const iconColor = isFocused
          ? '#1bc4bc' // icon-active
          : colorScheme === 'dark'
          ? '#9ca3af' // icon-inactive-dark
          : '#6b7280'; // icon-inactive

        const textColor = iconColor;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            className="flex-1 items-center"
          >
            <View className="items-center justify-center gap-0.5">
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: iconColor,
                  size: 22,
                })}
              <Text
                className="text-[10px] font-medium mt-0.5"
                style={{ color: textColor }}
              >
                {typeof label === 'string' ? label : route.name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
