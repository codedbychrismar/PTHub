// src/components/common/Loading.tsx
// Loading indicator component

import { cn } from '@/utils/cn';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  className?: string;
  fullScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({
  message,
  size = 'large',
  className,
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <ActivityIndicator size={size} color="#2563EB" />
        {message && (
          <Text className="mt-4 text-base text-slate-300">{message}</Text>
        )}
      </View>
    );
  }

  return (
    <View className={cn('items-center justify-center py-8', className)}>
      <ActivityIndicator size={size} color="#2563EB" />
      {message && (
        <Text className="mt-4 text-base text-slate-300">{message}</Text>
      )}
    </View>
  );
};

export default Loading;
