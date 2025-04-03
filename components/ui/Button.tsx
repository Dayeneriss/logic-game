import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

type ButtonProps = {
  mode?: 'text' | 'outlined' | 'contained';
  onPress: () => void;
  style?: object;
  labelStyle?: object;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
};

export default function Button({
  mode = 'contained',
  onPress,
  style,
  labelStyle,
  disabled = false,
  loading = false,
  children,
}: ButtonProps) {
  return (
    <PaperButton
      mode={mode}
      onPress={onPress}
      style={[styles.button, style]}
      labelStyle={[styles.label, labelStyle]}
      disabled={disabled}
      loading={loading}
    >
      {children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    paddingVertical: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});