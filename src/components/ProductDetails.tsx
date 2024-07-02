import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Product} from '../types';

const ProductDetails = ({product}: {product: Product}) => {
  return (
    <View>
      <Text style={styles.id}>ID: {product.id}</Text>
      <Text style={styles.infoExtraTitle}>Información extra</Text>
      <View style={styles.infoExtraContainer}>
        <View style={styles.infoExtraSubContainer}>
          <Text>Nombre</Text>
          <Text style={styles.data}>{product.name}</Text>
        </View>
        <View style={styles.infoExtraSubContainer}>
          <Text>Descripción</Text>
          <Text style={styles.data}>{product.description}</Text>
        </View>
        <View style={styles.infoLogoContainer}>
          <Text>Logo</Text>
          <Image src={product.logo} style={styles.image} />
        </View>
        <View style={styles.infoExtraSubContainer}>
          <Text>Fecha liberación</Text>
          <Text style={styles.data}>
            {new Date(product.date_release).toDateString()}
          </Text>
        </View>
        <View style={styles.infoExtraSubContainer}>
          <Text>Fecha revisión</Text>
          <Text style={styles.data}>
            {new Date(product.date_revision).toDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  id: {
    fontSize: 18,
    fontWeight: '600',
  },
  infoExtraTitle: {
    fontSize: 12,
  },
  infoExtraContainer: {
    gap: 20,
    padding: 16,
    paddingTop: 50,
  },
  infoExtraSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLogoContainer: {
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'center',
  },
  image: {
    width: 210,
    height: 130,
    alignSelf: 'center',
  },
  data: {
    fontWeight: 'bold',
  },
});

export default ProductDetails;
