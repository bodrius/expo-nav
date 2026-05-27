import { render, screen } from '@testing-library/react-native';

import { HomeScreen } from './HomeScreen';

describe('HomeScreen', () => {
  it('renders the home title', () => {
    render(<HomeScreen />);

    expect(screen.getByText('Hello Expo Navigation')).toBeOnTheScreen();
  });
});
