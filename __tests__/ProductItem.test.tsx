import * as React from 'react';
import {render, screen} from '@testing-library/react-native';
import ProductItem from '../src/components/ProductItem';
import {NavigationContainer} from '@react-navigation/native';
import '@testing-library/jest-native/extend-expect';

describe('Product item', () => {
  const product = {
    id: '123456',
    name: 'Product Name',
    description: 'Product description',
    logo: 'someurl',
    date_release: '17-12-2024',
    date_revision: '17-12-2025',
  };

  beforeEach(() => {
    render(
      <NavigationContainer>
        <ProductItem product={product} />
      </NavigationContainer>,
    );
  });

  it('Display product item name', async () => {
    const name = await screen.findByText(product.name);

    expect(name).toHaveTextContent(product.name);
  });

  it('Display product item id', async () => {
    const description = await screen.findByText(`ID: ${product.id}`);

    expect(description).toHaveTextContent(`ID: ${product.id}`);
  });
});
