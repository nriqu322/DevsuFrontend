import React from 'react';
import {StyleSheet, View} from 'react-native';

const Divider = () => {
  return <View testID="divider" style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1.5,
    borderColor: 'lightgray',
    width: '100%',
  },
});

export default Divider;
