// src/components/common/PhoneInput.tsx
// Phone input component for Philippine mobile numbers (+63 9XX XXX XXXX)

import React from 'react';
import { Text } from 'react-native';
import TextInput from './TextInput';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const PhoneInput = React.forwardRef<any, PhoneInputProps>(
  (
    {
      value,
      onChangeText,
      label = 'Phone Number',
      error,
      required = false,
      placeholder = 'XXX XXX XXXX',
      ...props
    },
    ref
  ) => {

    /**
     * Formats phone number as: XXX XXX XXXX
     * - Only accepts digits
     * - First digit must be 9
     * - Maximum 10 digits
     */
    const formatPhoneNumber = (text: string): string => {
      // Remove all non-digit characters
      const digitsOnly = text.replace(/[^0-9]/g, '');

      // If first character is not 9, reject it
      if (digitsOnly.length > 0 && digitsOnly[0] !== '9') {
        return value; // Return previous value
      }

      // Limit to 10 digits (9XX XXX XXXX)
      const limitedDigits = digitsOnly.slice(0, 10);

      // Format based on length
      let formatted = limitedDigits;

      if (limitedDigits.length > 6) {
        // Format: XXX XXX XXXX
        formatted = `${limitedDigits.slice(0, 3)} ${limitedDigits.slice(
          3,
          6
        )} ${limitedDigits.slice(6)}`;
      } else if (limitedDigits.length > 3) {
        // Format: XXX XXX
        formatted = `${limitedDigits.slice(0, 3)} ${limitedDigits.slice(3)}`;
      }

      return formatted;
    };

    const handleChangeText = (text: string) => {
      const formatted = formatPhoneNumber(text);
      onChangeText(formatted);
    };

    return (
      <TextInput
        ref={ref}
        label={label}
        error={error}
        required={required}
        value={value}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        keyboardType="phone-pad"
        maxLength={12} // "XXX XXX XXXX" = 12 characters with spaces
        leftIcon={
          <Text className="text-gray-600 dark:text-slate-400 text-base">
            +63
          </Text>
        }
        {...props}
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;