import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Product, RootStackParamList} from '../types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  product: Product;
};

const ProductItem = ({product}: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('Product', {product});
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View>
          <Text>{product.name}</Text>
          <Text style={styles.secondaryText}>ID: {product.id}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Text style={styles.secondaryText}>{'>'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
  },
  arrowContainer: {
    color: 'gray',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  secondaryText: {
    color: 'gray',
  },
});

export default ProductItem;
