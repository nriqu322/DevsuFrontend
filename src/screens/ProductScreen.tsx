import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import {Param, Product, RootStackParamList} from '../types';
import ProductDetails from '../components/ProductDetails';
import {fetchApi} from '../utils/fetchApi';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Button from '../components/Button';
import Divider from '../components/Divider';
import BottomSheet from '../components/BottomSheet';

const ProductScreen = () => {
  const {
    params: {product},
  } = useRoute<Param<'Product'>>();

  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleEdit = () => {
    navigation.navigate('ProductForm', {product: product});
  };

  const handleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  const handleDelete = async () => {
    try {
      await fetchApi<Product>({
        service: `bp/products/${product.id}`,
        method: 'DELETE',
      });

      setBottomSheetVisible(false);
      Alert.alert('Producto eliminado');
      navigation.navigate('Home');
    } catch {
      Alert.alert(
        'No se pudo eliminar el producto, inténtelo de nuevo más tarde',
      );
    }
  };

  return (
    <View style={styles.container}>
      <ProductDetails product={product} />
      <View style={styles.buttonActionsContainer}>
        <View style={styles.buttonActions}>
          <Button onPress={handleEdit} title="Editar" />
          <Button
            onPress={handleBottomSheet}
            title="Eliminar"
            backgroundColor="red"
            textColor="#fff"
          />
        </View>
      </View>
      {bottomSheetVisible && (
        <BottomSheet>
          <View style={styles.bottomSheetHeader}>
            <Pressable onPress={handleBottomSheet}>
              <Text>X</Text>
            </Pressable>
          </View>
          <Divider />
          <Text style={styles.bottomSheetTitle}>
            ¿Estás seguro de eliminar el producto {product.name}?
          </Text>
          <Divider />
          <View style={styles.bottomSheetActions}>
            <Button
              onPress={handleDelete}
              title="Confirmar"
              backgroundColor="#f3e014"
            />
            <Button onPress={handleBottomSheet} title="Cancelar" />
          </View>
        </BottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetHeader: {
    padding: 12,
    paddingRight: 16,
    alignItems: 'flex-end',
  },
  bottomSheetTitle: {
    paddingVertical: 26,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  bottomSheetActions: {
    margin: 16,
    gap: 12,
  },
  buttonActionsContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 70,
  },
  buttonActions: {
    width: '100%',
    gap: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  container: {
    position: 'relative',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 35,
  },
});

export default ProductScreen;
