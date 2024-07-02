import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProductList from '../components/ProductList';
import {fetchApi} from '../utils/fetchApi';
import {Product, RootStackParamList} from '../types';
import filter from 'lodash.filter';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Button from '../components/Button';

const HomeScreen = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const data = await fetchApi<Product[]>({service: 'bp/products'});
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      Alert.alert('There is an error fetching products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchKeyword(text);
    const keyword = text.toLowerCase();
    const filterProducts = filter(products, (product: Product) => {
      return productListSearchKeyword(product, keyword);
    });
    setFilteredProducts(filterProducts);
  };

  const productListSearchKeyword = (product: Product, keyword: string) => {
    return (
      product.name.toLowerCase().includes(keyword) ||
      product.id.includes(keyword)
    );
  };

  const handleAddProduct = () => {
    navigation.navigate('ProductForm', {});
  };

  useEffect(() => {
    getProducts();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search..."
        autoCapitalize="none"
        value={searchKeyword}
        onChangeText={text => handleSearch(text)}
        style={styles.input}
      />
      {filteredProducts.length > 0 ? (
        <ProductList products={filteredProducts} isLoading={isLoading} />
      ) : (
        <View style={styles.noData}>
          <Text>No data</Text>
        </View>
      )}
      <View style={styles.buttonActionsContainer}>
        <View style={styles.buttonActions}>
          <Button
            onPress={handleAddProduct}
            title="Agregar"
            backgroundColor="#f3e014"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    position: 'relative',
  },
  noData: {
    paddingTop: 35,
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
  input: {
    fontSize: 14,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
  },
});

export default HomeScreen;
