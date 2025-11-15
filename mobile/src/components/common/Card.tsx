// src/components/common/Card.tsx
// Reusable card component with NativeWind

import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { View, type ViewProps } from 'react-native';

const cardVariants = cva('rounded-lg', {
  variants: {
    variant: {
      default: 'bg-slate-800',
      outlined: 'bg-transparent border-2 border-slate-700',
      elevated: 'bg-slate-800',
    },
    padding: {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
});

interface CardProps extends ViewProps, VariantProps<typeof cardVariants> {
  className?: string;
  children: React.ReactNode;
}

const Card = React.forwardRef<View, CardProps>(
  ({ variant, padding, className, children, style, ...props }, ref) => {
    const shadowStyle =
      variant === 'elevated'
        ? {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }
        : undefined;

    return (
      <View
        ref={ref}
        className={cn(cardVariants({ variant, padding }), className)}
        style={[shadowStyle, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';

export default Card;
