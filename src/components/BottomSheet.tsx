import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

type Props = {
  children: JSX.Element[] | JSX.Element;
};

const BottomSheet = ({children}: Props) => {
  return (
    <View testID="bottomSheet" style={styles.background}>
      <View style={styles.bottomSheetContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    flex: 1,
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheetContainer: {
    backgroundColor: '#fff',
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
  },
});

export default BottomSheet;
