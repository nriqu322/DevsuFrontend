import React from 'react';
import {Control, Controller} from 'react-hook-form';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

type Props = TextInputProps & {
  control?: Control<any>;
  label?: string;
  error?: string;
  name: string;
  rules?: any;
};

const Input = ({
  control,
  name,
  error,
  label,
  rules,
  style,
  placeholder,
  ...props
}: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur, ref}}) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            {...props}
            placeholder={placeholder ?? label}
            style={[styles.input, style]}
            value={value}
            onChangeText={val => onChange(val)}
            onBlur={onBlur}
            ref={ref}
          />

          {error && <Text style={styles.error}>{error}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    fontSize: 14,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  error: {
    fontSize: 12,
    color: 'red',
    lineHeight: 18,
  },
});

export default Input;
