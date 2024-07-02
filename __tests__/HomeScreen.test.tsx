import * as React from 'react';
import {render, screen} from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';

describe('Home screen', () => {
  beforeEach(() => {
    render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );
  });

  it('Button to add product exist', async () => {
    const button = await screen.findByText('Agregar');
    expect(button).toBeTruthy();
  });

  it('Search bar exists', async () => {
    const searchInput = await screen.findByPlaceholderText('Search...');
    expect(searchInput).toBeTruthy();
  });
});
