import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import Button from '../src/components/Button';
import '@testing-library/jest-native/extend-expect';

describe('Button', () => {
  const text = 'Test button';
  const buttonPress = jest.fn();

  beforeEach(() => {
    render(<Button onPress={buttonPress} title={text} />);
  });

  it('Button text', async () => {
    const button = await screen.findByText(text);
    expect(button).toHaveTextContent(text);
  });

  it('Button press', async () => {
    const button = await screen.findByText(text);
    fireEvent.press(button);
    expect(buttonPress).toHaveBeenCalledTimes(1);
  });
});
