import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import DatePickerUI from 'react-native-date-picker';

type Props = {
  label?: string;
  mode?: 'date' | 'datetime' | 'time';
  onChange: (value: Date) => void;
  value: Date;
};

const DatePicker = ({label, mode = 'date', onChange, value}: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleConfirm = (date: Date) => {
    if (onChange) {
      onChange(date);
    }
    setOpen(false);
  };

  return (
    <View testID="datepicker" style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value.toDateString()}
        onPress={() => setOpen(true)}
        style={styles.input}
        readOnly
      />

      <DatePickerUI
        modal
        mode={mode}
        open={open}
        date={value}
        onConfirm={handleConfirm}
        onCancel={() => {
          setOpen(false);
        }}
        minimumDate={new Date()}
      />
    </View>
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
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8,
  },
  error: {
    fontSize: 12,
    color: 'red',
    lineHeight: 18,
  },
});

export default DatePicker;
