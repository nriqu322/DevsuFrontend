import {RouteProp} from '@react-navigation/native';

export type Product = {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
};

export type RootStackParamList = {
  Product: {product: Product};
  ProductForm: {product?: Product};
  Home: undefined;
};

export type Param<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
