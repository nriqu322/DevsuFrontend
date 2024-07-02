import React from 'react';
import {
  ButtonProps,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

type Props = ButtonProps & {
  backgroundColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  textColor?: string;
  title?: string;
};

const Button = ({
  onPress,
  backgroundColor = 'lightgray',
  title = 'Guardar',
  textColor,
  ...props
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, {backgroundColor: backgroundColor}]}
      {...props}>
      <Text style={[styles.text, {color: textColor}]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    letterSpacing: 0.25,
    fontWeight: 500,
  },
});

export default Button;
