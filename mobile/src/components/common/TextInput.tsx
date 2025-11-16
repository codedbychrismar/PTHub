// src/components/common/TextInput.tsx
// Reusable text input component with NativeWind

import { cn } from '@/utils/cn';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  Text,
  View,
  useColorScheme,
  type TextInputProps as RNTextInputProps,
} from 'react-native';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  showPasswordToggle?: boolean;
}

const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      error,
      required = false,
      leftIcon,
      rightIcon,
      containerClassName,
      inputClassName,
      showPasswordToggle = false,
      secureTextEntry,
      ...props
    },
    ref
  ) => {
    const colorScheme = useColorScheme();

    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [hasTyped, setHasTyped] = useState(false);

    const hasError = !!error && !hasTyped;

    const handleChangeText = (text: string) => {
      setHasTyped(true);
      props.onChangeText?.(text);
    };

    // Reset hasTyped when error changes
    React.useEffect(() => {
      if (error) {
        setHasTyped(false);
      }
    }, [error]);

    return (
      <View className={cn('mb-4', containerClassName)}>
        {/* Label */}
        {label && (
          <View className="mb-2">
            <Text className="text-sm font-medium text-gray-700 dark:text-slate-300">
              {label}
              {required && <Text className="text-red-500"> *</Text>}
            </Text>
          </View>
        )}

        {/* Input Container */}
        <View
          className={cn(
            'flex-row items-center rounded-2xl border px-5 py-5 bg-slate-50 dark:bg-gray-900',
            isFocused && !hasError && 'border-slate-600 dark:border-indigo-300',
            hasError && 'border-red-500',
            !isFocused && !hasError && 'border-slate-200 dark:border-slate-800'
          )}
        >
          {/* Left Icon */}
          {leftIcon && <View className="mr-4">{leftIcon}</View>}

          {/* Text Input */}
          <RNTextInput
            ref={ref}
            className={cn(
              'flex-1 text-base leading-5 text-gray-900 dark:text-slate-100',
              inputClassName
            )}
            style={{ padding: 0, margin: 0, height: 24 }}
            placeholderTextColor={colorScheme === 'dark' ? '#94A3B8' : '#9CA3AF'}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            secureTextEntry={
              showPasswordToggle ? !isPasswordVisible : secureTextEntry
            }
            {...props}
            onChangeText={handleChangeText}
          />

          {/* Password Toggle */}
          {showPasswordToggle && (
            <Pressable
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="ml-2"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={20}
                color={colorScheme === 'dark' ? '#94A3B8' : '#6B7280'}
              />
            </Pressable>
          )}

          {/* Right Icon */}
          {rightIcon && !showPasswordToggle && (
            <View className="ml-2">{rightIcon}</View>
          )}
        </View>

        {/* Error Message */}
        {hasError && (
          <View className="mt-1 px-1">
            <Text className="text-xs text-red-500">{error}</Text>
          </View>
        )}
      </View>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
