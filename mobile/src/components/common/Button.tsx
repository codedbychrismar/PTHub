// src/components/common/Button.tsx
// Reusable button component with NativeWind + CVA

import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  type PressableProps,
} from 'react-native';

const buttonVariants = cva(
  'flex-row items-center justify-center active:opacity-80 overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600',
        secondary: 'bg-slate-700',
        outline: 'bg-transparent border-2 border-blue-600',
        ghost: 'bg-transparent',
        danger: 'bg-red-600',
        gradient: 'bg-transparent',
      },
      size: {
        sm: 'py-2 px-4 min-h-[36px]',
        md: 'py-3 px-5 min-h-[44px]',
        lg: 'py-4 px-6 min-h-[52px]',
      },
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        full: 'rounded-full',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'opacity-50',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      radius: 'xl',
      fullWidth: false,
      disabled: false,
    },
  }
);

const textVariants = cva('font-semibold', {
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'text-white',
      outline: 'text-blue-600',
      ghost: 'text-blue-600',
      danger: 'text-white',
      gradient: 'text-white',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface ButtonProps
  extends Omit<PressableProps, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  title: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  textClassName?: string;
}

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(
  (
    {
      title,
      variant,
      size,
      fullWidth,
      radius,
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      className,
      textClassName,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const isGradient = variant === 'gradient';

    const buttonContent = loading ? (
      <ActivityIndicator
        color={
          variant === 'outline' || variant === 'ghost' ? '#2563EB' : '#FFFFFF'
        }
        size="small"
      />
    ) : (
      <>
        {leftIcon}
        <Text
          className={cn(
            textVariants({ variant, size }),
            leftIcon && 'ml-2',
            rightIcon && 'mr-2',
            textClassName
          )}
        >
          {title}
        </Text>
        {rightIcon}
      </>
    );

    if (isGradient) {
      const sizeStyles = {
        sm: { paddingVertical: 8, paddingHorizontal: 16, minHeight: 36 },
        md: { paddingVertical: 12, paddingHorizontal: 20, minHeight: 44 },
        lg: { paddingVertical: 16, paddingHorizontal: 24, minHeight: 52 },
      };
      const radiusStyles = {
        none: 0,
        sm: 2,
        md: 6,
        lg: 8,
        xl: 12,
        '2xl': 16,
        '3xl': 24,
        full: 9999,
      };

      return (
        <Pressable
          ref={ref}
          disabled={isDisabled}
          className={cn(fullWidth && 'w-full', className)}
          {...props}
        >
          <LinearGradient
            colors={[
              'rgb(255, 0, 0)',
              'rgb(204, 0, 102)',
              'rgb(102, 0, 179)',
              'rgb(0, 41, 255)',
            ]}
            locations={[0, 0.3, 0.6, 1.0]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              ...sizeStyles[size || 'md'],
              borderRadius: radiusStyles[radius || 'xl'],
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isDisabled ? 0.5 : 1,
            }}
          >
            {buttonContent}
          </LinearGradient>
        </Pressable>
      );
    }

    return (
      <Pressable
        ref={ref}
        disabled={isDisabled}
        className={cn(
          buttonVariants({
            variant,
            size,
            radius,
            fullWidth,
            disabled: isDisabled,
          }),
          className
        )}
        {...props}
      >
        {buttonContent}
      </Pressable>
    );
  }
);

Button.displayName = 'Button';

export default Button;
