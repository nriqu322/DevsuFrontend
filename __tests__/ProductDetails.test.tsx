import * as React from 'react';
import {render, screen} from '@testing-library/react-native';
import ProductDetails from '../src/components/ProductDetails';
import '@testing-library/jest-native/extend-expect';

describe('Product details', () => {
  const product = {
    id: '123456',
    name: 'Product Name',
    description: 'Product description',
    logo: 'someurl',
    date_release: '17-12-2024',
    date_revision: '17-12-2025',
  };

  beforeEach(() => {
    render(<ProductDetails product={product} />);
  });

  it('Display product name', async () => {
    const label = await screen.findByText('Nombre');
    const name = await screen.findByText(product.name);

    expect(label).toBeTruthy();
    expect(name).toHaveTextContent(product.name);
  });

  it('Display product description', async () => {
    const label = await screen.findByText('Descripción');
    const description = await screen.findByText(product.description);

    expect(label).toBeTruthy();
    expect(description).toHaveTextContent(product.description);
  });

  it('Display product id', async () => {
    const id = await screen.findByText(`ID: ${product.id}`);

    expect(id).toHaveTextContent(`ID: ${product.id}`);
  });

  it('Display product logo', async () => {
    const label = await screen.findByText('Logo');

    expect(label).toBeTruthy();
  });

  it('Display product release date', async () => {
    const label = await screen.findByText('Fecha liberación');

    expect(label).toBeTruthy();
  });

  it('Display product revision date', async () => {
    const label = await screen.findByText('Fecha revisión');

    expect(label).toBeTruthy();
  });
});
