import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function FuelScreen() {
  // Animation values
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation for background circle
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Float animation for main icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <LinearGradient
      colors={['#ffffff', '#f8fafc']}
      className="flex-1"
    >
      {/* Header */}
      <View className="pt-12 pb-6 items-center">
        <Text className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
          F.U.E.L
        </Text>
        <Text className="text-sm text-slate-600 font-medium">
          Your fitness evolution hub
        </Text>
      </View>

      {/* Main Content - Centered */}
      <View className="flex-1 items-center justify-center px-6 pb-20">
        {/* Illustration */}
        <View className="w-52 h-52 items-center justify-center mb-10">
          {/* Pulsing Background Circle */}
          <Animated.View
            style={{
              transform: [{ scale: pulseAnim }],
            }}
            className="absolute w-44 h-44 rounded-full opacity-80"
          >
            <LinearGradient
              colors={['rgba(27, 196, 188, 0.15)', 'rgba(77, 2, 160, 0.15)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-full h-full rounded-full"
            />
          </Animated.View>

          {/* Main Icon - Floating */}
          <Animated.View
            style={{
              transform: [{ translateY: floatAnim }],
            }}
            className="z-10"
          >
            <LinearGradient
              colors={['#1bc4bc', '#4d02a0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="w-24 h-24 rounded-full items-center justify-center"
              style={{
                shadowColor: '#1bc4bc',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.4,
                shadowRadius: 30,
                elevation: 10,
              }}
            >
              <Ionicons name="flash" size={48} color="#ffffff" />
            </LinearGradient>
          </Animated.View>

          {/* Side Icons */}
          <View className="absolute top-5 left-0 w-14 h-14 bg-white rounded-full items-center justify-center border-3 border-slate-100"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 5,
            }}
          >
            <Ionicons name="pulse" size={24} color="#1bc4bc" />
          </View>

          <View className="absolute bottom-5 right-0 w-14 h-14 bg-white rounded-full items-center justify-center border-3 border-slate-100"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 5,
            }}
          >
            <Ionicons name="fitness" size={24} color="#1bc4bc" />
          </View>
        </View>

        {/* Coming Soon Text */}
        <Text className="text-4xl font-extrabold text-teal-500 mb-4 tracking-tight uppercase">
          Coming Soon
        </Text>

        <Text className="text-base text-slate-700 text-center leading-6 font-medium max-w-xs mb-8">
          Get ready to fuel your fitness journey with personalized nutrition plans and tracking
        </Text>

        {/* Feature Hints */}
        <View className="flex-row flex-wrap justify-center gap-3 mt-6">
          <View className="bg-teal-50 border border-teal-200 px-4 py-2 rounded-full">
            <Text className="text-xs font-semibold text-teal-600 tracking-wide">
              Meal Planning
            </Text>
          </View>
          <View className="bg-teal-50 border border-teal-200 px-4 py-2 rounded-full">
            <Text className="text-xs font-semibold text-teal-600 tracking-wide">
              Calorie Tracking
            </Text>
          </View>
          <View className="bg-teal-50 border border-teal-200 px-4 py-2 rounded-full">
            <Text className="text-xs font-semibold text-teal-600 tracking-wide">
              Recipes
            </Text>
          </View>
          <View className="bg-teal-50 border border-teal-200 px-4 py-2 rounded-full">
            <Text className="text-xs font-semibold text-teal-600 tracking-wide">
              Hydration
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
