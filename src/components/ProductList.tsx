import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {Product} from '../types';
import ProductItem from './ProductItem';

type Props = {
  isLoading: boolean;
  products: Product[];
};

const ProductList = ({isLoading, products}: Props) => {
  return isLoading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ProductItem product={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 35,
    marginBottom: 150,
  },
  loading: {
    marginTop: 35,
  },
});

export default ProductList;
