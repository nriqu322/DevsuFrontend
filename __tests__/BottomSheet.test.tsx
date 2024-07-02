import * as React from 'react';
import {render, screen} from '@testing-library/react-native';
import BottomSheet from '../src/components/BottomSheet';
import {Text} from 'react-native';

describe('BottomSheet', () => {
  const children = <Text>Hi</Text>;
  beforeEach(() => {
    render(<BottomSheet>{children}</BottomSheet>);
  });

  it('BottomSheet exist', async () => {
    const bottomSheet = await screen.findByTestId('bottomSheet');
    expect(bottomSheet).toBeTruthy();
  });

  it('BottomSheet Has a children', async () => {
    const bottomSheetChildren = await screen.findByText('Hi');
    expect(bottomSheetChildren).toBeTruthy();
  });
});
