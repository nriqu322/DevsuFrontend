import * as React from 'react';
import {render, screen} from '@testing-library/react-native';
import Divider from '../src/components/Divider';
import '@testing-library/jest-native/extend-expect';

describe('Divider', () => {
  it('Divider exist', async () => {
    render(<Divider />);
    const divider = await screen.findByTestId('divider');
    expect(divider).toBeVisible();
  });
});
