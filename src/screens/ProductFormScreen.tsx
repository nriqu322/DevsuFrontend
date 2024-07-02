import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import {Param, Product, RootStackParamList} from '../types';
import Input from '../components/Input';
import {useForm} from 'react-hook-form';
import Button from '../components/Button';
import DatePicker from '../components/DatePicker';
import {fetchApi} from '../utils/fetchApi';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type FormData = {
  id: string;
  name: string;
  description: string;
  logo: string;
};

const ProductFormScreen = () => {
  const {
    params: {product},
  } = useRoute<Param<'ProductForm'>>();

  const getRevisionDate = () => {
    if (product?.date_revision) {
      return new Date(product.date_revision);
    } else {
      return new Date();
    }
  };

  const getReleaseDate = () => {
    if (product?.date_release) {
      return new Date(product.date_release);
    } else {
      return new Date();
    }
  };

  const [revisionDate, setRevisionDate] = useState<Date>(getRevisionDate());
  const [releaseDate, setReleaseDate] = useState<Date>(getReleaseDate());

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      id: product?.id ?? '',
      name: product?.name ?? '',
      description: product?.description ?? '',
      logo: product?.logo ?? '',
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log('data', data);
    const newProduct = {
      ...data,
      date_release: releaseDate.toISOString().split('T')[0],
      date_revision: revisionDate.toISOString().split('T')[0],
    };

    if (product) {
      console.log('inside edit product');
      try {
        const response = await fetchApi<Product>({
          service: `bp/products/${product.id}`,
          method: 'PUT',
          body: newProduct,
        });

        if (!response) {
          throw new Error('No se pudo editar el registro');
        }

        navigation.navigate('Home');
        Alert.alert('Producto editado exitosamente');
      } catch (error: any) {
        Alert.alert(error.message);
      }
    } else {
      try {
        console.log('inside new product');
        const response = await fetchApi<Product>({
          service: 'bp/products',
          method: 'POST',
          body: newProduct,
        });

        if (!response) {
          throw new Error('No se pudo ingresar el registro');
        }

        navigation.navigate('Home');
        Alert.alert('Producto agregado exitosamente');
      } catch (error: any) {
        Alert.alert(error.message);
      }
    }
  };

  const handleReset = () => {
    reset();
  };

  const handleRevisionDate = (date: Date) => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + 1);
    setRevisionDate(newDate);
  };

  const validateProductId = async () => {
    if (!product) {
      const id = watch('id');
      const result = await fetchApi({
        service: `bp/products/verification/${id}`,
      });

      if (result) {
        return 'ID ya existe';
      }

      return !result;
    }
  };

  useEffect(() => {
    handleRevisionDate(releaseDate);
  }, [releaseDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {product ? 'Editar Registro' : 'Formulario de Registro'}
      </Text>
      <View style={styles.formContainer}>
        <Input
          defaultValue={product?.id}
          control={control}
          error={errors.id?.message}
          name="id"
          label="ID"
          readOnly={Boolean(product)}
          style={product && styles.disabled}
          rules={{
            required: {
              value: true,
              message: 'ID no válido',
            },
            minLength: {
              value: 3,
              message: 'Mínimo 3 caracteres',
            },
            maxLength: {
              value: 10,
              message: 'Máximo 10 caracteres',
            },
            validate: {validateProductId},
          }}
        />
        <Input
          control={control}
          error={errors.name?.message}
          name="name"
          label="Nombre"
          rules={{
            required: {
              value: true,
              message: 'Este campo es requerido',
            },
            minLength: {
              value: 5,
              message: 'Mínimo 5 caracteres',
            },
            maxLength: {
              value: 100,
              message: 'Máximo 100 caracteres',
            },
          }}
        />
        <Input
          control={control}
          error={errors.description?.message}
          name="description"
          label="Descripción"
          rules={{
            required: {
              value: true,
              message: 'Este campo es requerido',
            },
            minLength: {
              value: 10,
              message: 'Mínimo 10 caracteres',
            },
            maxLength: {
              value: 200,
              message: 'Máximo 200 caracteres',
            },
          }}
        />
        <Input
          control={control}
          error={errors.logo?.message}
          name="logo"
          label="Logo"
          rules={{
            required: {
              value: true,
              message: 'Este campo es requerido',
            },
          }}
        />
        <DatePicker
          onChange={setReleaseDate}
          value={releaseDate}
          label="Fecha Liberación"
        />
        <View>
          <Text style={styles.label}>Fecha Revisión</Text>
          <TextInput
            readOnly
            style={styles.input}
            value={revisionDate.toDateString()}
          />
        </View>
      </View>
      <View style={styles.actionButtons}>
        <Button
          title="Enviar"
          onPress={handleSubmit(onSubmit)}
          backgroundColor="#f3e014"
        />
        <Button title="Reiniciar" onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: 0.25,
  },
  container: {
    padding: 16,
  },
  formContainer: {
    paddingVertical: 20,
    gap: 16,
  },
  actionButtons: {
    paddingTop: 10,
    gap: 10,
  },
  input: {
    fontSize: 14,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
    backgroundColor: 'lightgray',
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 8,
  },
  disabled: {
    backgroundColor: 'lightgray',
  },
});

export default ProductFormScreen;
