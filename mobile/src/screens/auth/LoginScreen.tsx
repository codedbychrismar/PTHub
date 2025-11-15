// src/screens/auth/LoginScreen.tsx
// Login screen with NativeWind styling

import Button from '@/components/common/Button';
import TextInput from '@/components/common/TextInput';
import { useAuthStore } from '@/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

const LoginScreen: React.FC = () => {
  const { login, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (): Promise<void> => {
    // Clear previous errors
    setErrors({ email: '', password: '' });

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      await login({ email: email.toLowerCase().trim(), password });
      // Navigation will be handled by auth state change
    } catch (error: any) {
      Alert.alert(
        'Login Failed',
        error?.message || 'Unable to login. Please check your credentials.',
        [{ text: 'OK' }]
      );
    }
  };


  return (
    <View className="flex-1 bg-slate-950">
      <StatusBar style="light" />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header with Gradient */}
          <LinearGradient
            colors={[
              'rgb(255, 0, 0)', // Pure red at 0%
              'rgb(204, 0, 102)', // Red-purple at 30%
              'rgb(102, 0, 179)', // Purple-blue at 60%
              'rgb(0, 41, 255)', // Pure blue at 100%
            ]}
            locations={[0, 0.3, 0.6, 1.0]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ paddingTop: 48, paddingBottom: 24 }}
          >
            <View className="items-center justify-center">
              <Image
                source={require('@/assets/images/logo.png')}
                style={{ width: 120, height: 120 }}
                resizeMode="contain"
              />
              <Text className="text-3xl font-semibold text-white mb-1">
                Welcome Back
              </Text>
              <Text className="text-base text-white/90">
                Sign in to your iBulakan account
              </Text>
            </View>
          </LinearGradient>

          {/* Form Container */}
          <View className="px-6 pt-8">
            {/* Email Input */}
            <TextInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              leftIcon={<Ionicons name="mail" size={16} color="#94A3B8" />}
            />

            {/* Password Input */}
            <TextInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              showPasswordToggle
              autoCapitalize="none"
              autoComplete="password"
              leftIcon={
                <Ionicons name="lock-closed" size={16} color="#94A3B8" />
              }
            />

            {/* Login Button */}
            <Button
              title="Sign In"
              variant="gradient"
              radius="2xl"
              size="lg"
              fullWidth
              loading={isLoading}
              onPress={handleLogin}
              className="mb-4"
            />
          </View>

          {/* Spacer - pushes content below to bottom */}
          <View className="flex-1" />

          {/* Bottom Section */}
          <View>
            {/* Divider without horizontal padding */}
            <View className="h-[1px] bg-slate-700 mb-4" />

            {/* Terms message with padding */}
            <Text className="text-xs font-normal text-gray-400 text-center px-6 pb-6">
              By signing in, you agree to our Terms of Service and{'\n'}Privacy
              Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
